const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
import { AppError } from "../middlewares/errorHandler";
import CloudinaryService from "./CloudinaryUpload";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../../.env") });

class ImageGeneratorService {
	private readonly clarifaiModel: typeof ClarifaiStub;
	private readonly clarifaiMetadata;
	private readonly cloudinaryService: CloudinaryService;

	constructor() {
		this.cloudinaryService = new CloudinaryService();
		this.clarifaiModel = ClarifaiStub.grpc();
		this.clarifaiMetadata = new grpc.Metadata();
		this.clarifaiMetadata.set("authorization", "Key " + process.env.PAT);
	}

	private clarifaiImageModelConfig(prompt: string) {
		return {
			user_app_id: {
				user_id: process.env.USER_ID,
				app_id: process.env.APP_ID,
			},
			model_id: process.env.MODEL_ID,
			version_id: process.env.MODEL_VERSION_ID,
			inputs: [
				{
					data: {
						text: {
							raw: prompt,
						},
					},
				},
			],
		};
	}

	async generateImage(prompt: string) {
		try {
			const ImageResponse = new Promise((resolve, reject) => {
				this.clarifaiModel.PostModelOutputs(
					this.clarifaiImageModelConfig(prompt),
					this.clarifaiMetadata,
					async (err: any, response: any) => {
						if (err) {
							console.error("Clarifai API error:", err);
							return reject(new AppError("Clarifai API error", 500));
						}
						if (response.status.code !== 10000) {
							console.error("Clarifai API response error:", response.status);
							console.error("Clarifai API response details:", response);
							return reject(
								new AppError(
									`Clarifai API response error: ${response.status.description}`,
									500
								)
							);
						}
						if (
							!response.outputs ||
							!response.outputs[0] ||
							!response.outputs[0].data ||
							!response.outputs[0].data.image
						) {
							console.error("Invalid response structure:", response);
							return reject(
								new AppError(
									"Invalid response structure from Clarifai API",
									500
								)
							);
						}
						const imageBuffer = response.outputs[0].data.image.base64;
						try {
							const imageUrl =
								await this.cloudinaryService.uploadImageBufferToCloud(
									Buffer.from(imageBuffer, "base64")
								);
							resolve(imageUrl);
						} catch (uploadError) {
							console.error("Cloudinary upload error:", uploadError);
							reject(new AppError("Cloudinary upload error", 500));
						}
					}
				);
			});
			return ImageResponse;
		} catch (err) {
			console.error("Error generating image:", err);
			throw new AppError("Could not generate image", 500);
		}
	}
}

export default ImageGeneratorService;

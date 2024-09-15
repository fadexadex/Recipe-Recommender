import { ConfigOptions, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { AppError } from "../middlewares/errorHandler";

dotenv.config();

class CloudinaryService {
	private cloudinary: ConfigOptions;

	constructor() {
		this.cloudinary = cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
	}

	async uploadImageBufferToCloud(buffer: Buffer): Promise<string | undefined> {
		try {
			const response = await new Promise<string | undefined>(
				(resolve, reject) => {
					const cloudStreamUpload = cloudinary.uploader.upload_stream(
						{
							folder: "food-images",
						},
						(error, result) => {
							if (error) {
								console.error("Cloudinary upload error:", error);
								reject(new AppError("Could not save image to the cloud", 500));
							} else {
								resolve(result?.secure_url);
							}
						}
					);
					streamifier.createReadStream(buffer).pipe(cloudStreamUpload);
				}
			);
			return response;
		} catch (error) {
			console.error("Upload image buffer to cloud error:", error);
			throw new AppError("Could not save image to the cloud", 500);
		}
	}
}

export default CloudinaryService;

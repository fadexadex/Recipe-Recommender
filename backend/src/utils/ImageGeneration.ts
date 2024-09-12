const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
import { AppError } from ".././middlewares/errorHandler";
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
              reject(err);
            }
            if (response.status.code !== 10000) {
              reject(err);
            }
            const imageBuffer = response.outputs[0].data.image.base64;
            const imageUrl =
              await this.cloudinaryService.uploadImageBufferToCloud(
                imageBuffer
              );
            resolve(imageUrl);
          }
        );
      });
      return ImageResponse;
    } catch (err) {
      throw new AppError(err.message, 500);
    }
  }
}


export default ImageGeneratorService;

import { ConfigOptions, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { AppError } from ".././middlewares/errorHandler";

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
      const response = await new Promise((resolve, reject) => {
        let cloudStreamUpload = cloudinary.uploader.upload_stream(
          {
            folder: "food-images",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result?.secure_url);
            }
          }
        );
        streamifier.createReadStream(buffer).pipe(cloudStreamUpload);
      });
      if (typeof response === "string") {
        return response;
      }
      return "";
    } catch (error) {
      throw new AppError("Could not save image to the cloud", 500);
    }
  }
}

export default CloudinaryService;

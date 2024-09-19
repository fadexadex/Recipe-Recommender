import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { AppError } from "../middlewares/errorHandler";
import RecipeService from "../services/RecipeService";
import ChatService from "../services/ChatService";
import FileService from "../services/FileService";
import { RequestWithSocket } from "index";
import fs from "fs";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

config();

class RecipeController {
  private recipeService: RecipeService;
  private chatService: ChatService;
  private fileService: FileService;
  private genAI: GoogleGenerativeAI;
  private Model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.Model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    this.recipeService = new RecipeService(this.Model);
    this.chatService = new ChatService(this.Model);
    this.fileService = new FileService(this.Model);
  }

  generateMeals = async (
    req: RequestWithSocket,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredients, allergies } = req.body;

      if (!ingredients) {
        next(new AppError("Please provide ingredients", 400));
      }

      const finalRecipes = await this.recipeService.generateMeals(
        ingredients,
        allergies,
        req.io
      );
      res.status(200).json({ response: finalRecipes });
    } catch (error) {
      next(error);
    }
  };

  chat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, recipeContext } = req.body;
      if(!message && !recipeContext) { 
        next(new AppError("Please provide message and recipe context", 400));
       }
      const responseText = await this.chatService.chat(message, recipeContext);
      res.status(200).json({ response: responseText });
    } catch (error) {
      next(error);
    }
  };

  downloadIngredientList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { ingredients } = req.body;
      if (!ingredients) {
        next(new AppError("Please provide ingredients", 400));
      }
      const filePath = await this.fileService.downloadIngredientList(
        ingredients
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="ingredients.txt"'
      );
      res.setHeader("Content-Type", "text/plain");

      return res.download(filePath, "ingredients.txt", (err) => {
        if (err) {
          next(
            new AppError(
              "An error occurred with downloading the ingredient list, Try Again",
              500
            )
          );
        }
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Failed to delete the file:", unlinkErr);
          }
        });
      });
    } catch (error) {
      next(error);
    }
  };

  cookPhoto = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        next(new AppError("No image uploaded", 400));
      }

      const file = req.file;
      const cookingDetails = await this.fileService.cookPhoto(file);

      return res.status(200).json({ response: cookingDetails });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      console.error(error.message);
      next(error);
    }
  };
}

export default RecipeController;

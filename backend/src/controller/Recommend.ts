import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { AppError } from "../middlewares/errorHandler";
import ImageGeneratorService from "../utils/ImageGeneration";
import { RequestWithSocket } from "index";
import fs from "fs";
import path from "path";
import { IRecipe } from "../index";

config();

//gemini-1.5-pro

class RecipeController {
  private readonly genAI: GoogleGenerativeAI;
  private readonly Model: GenerativeModel;
  private readonly ImageGenerator: ImageGeneratorService;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.ImageGenerator = new ImageGeneratorService();
    this.Model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
  }

  private generateImagePrompt = (recipe: IRecipe) => {
    return `Create a high-quality, appetizing image of ${recipe.dishName}. 
    Description: ${recipe.shortDescription}
    Key ingredients: ${recipe.ingredients.slice(0, 5).join(", ")}
    Style: Professional food photography, overhead view
    Lighting: Soft, natural light
    Background: Blurred kitchen or rustic wooden table
    Props: Include relevant utensils or garnishes
    Color palette: Vibrant and fresh`;
  };

  generateMeals = async (
    req: RequestWithSocket,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredients, allergies } = req.body;
      const prompt = `You are a professional cook with extensive experience in both traditional and modern cuisine. I want you to generate recipe recommendations based on the following ingredients: ${ingredients}. Each recommendation should avoid any dishes that contain the following allergens: ${allergies}.

     1. **Dish Name**
     2. **Short Description**: A brief description of the dish.
     3. **Ingredients**: A detailed list of ingredients required.
     4. **Steps**: In-depth steps on how to prepare the dish.

     Begin each recommendation with three relevant hashtags. Please ensure each section is clearly labeled and separated by '###' to facilitate easy parsing and manipulation.
     Give a maximum of 4 recommendations, if a user inputs a nonsensical input, provide random recommendations

    Ouput the recommendations in a JSON format for easy parsing and manipulation
    make it like so(it should be an array of objects):

    [{
            "hashtags": [
                "YamFry",
                "WestAfrican",
                "SideDish"
            ],
            "dishName": "Dish Name\nFried Yams",
            "shortDescription": "Short Description\nSimple yet flavourful fried yam, seasoned to perfection. A popular West African side dish.",
            "ingredients": [
                "Ingredients",
                "* 1 large yam, peeled and cut into 1-inch thick slices",
                "* 1/2 cup vegetable oil (or any neutral oil)",
                "* Salt to taste"
            ],
            "steps": [
                "Steps",
                "1. Rinse the yam slices under cold water and pat them dry with paper towels.",
                "2. Heat the oil in a large skillet over medium-high heat.",
                "3. Carefully place the yam slices in the hot oil, making sure not to overcrowd the pan.",
                "4. Fry for about 4-5 minutes on each side, or until golden brown and crispy.",
                "5. Remove from the pan and place on a plate lined with paper towels to drain excess oil.",
                "6. Season generously with salt while still hot and serve immediately."
            ],
    }, next recommendation goes here, and so on..]

`;

      const result = await this.Model.generateContent(prompt);
      const responseText = result.response
        .text()
        .replace(/```json\s*|\s*```/g, "")
        .trim();
      const recipes = JSON.parse(responseText);

      const finalRecipes = await Promise.all(
        recipes.map(async (recipe: IRecipe, index: number) => {
          const dishUrl = await this.ImageGenerator.generateImage(
            this.generateImagePrompt(recipe)
          );
          const progress = Math.round((index / recipes.length) * 100);
          req.io?.emit("progress", progress);

          if (!dishUrl) {
            next(
              new AppError(
                "An error occurred with generating an image for the recipe, Try Again",
                500
              )
            );
          }

          return {
            ...recipe,
            dishUrl,
          };
        })
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
      const { dishName, shortDescription, ingredients, steps } = recipeContext;

      // Construct a prompt that includes the recipe context for the AI
      const prompt = `
        You are a professional chef. A user is currently preparing the following dish:

        **Dish Name**: ${dishName}
        **Description**: ${shortDescription}
        **Ingredients**: ${ingredients.join(", ")}
        **Steps**: ${steps.join(". ")}

        The user asked: "${message}". 

        Provide a detailed response based on the meal context.
      `;

      const result = await this.Model.generateContent(prompt);
      const responseText = result.response.text();

      if (!responseText) {
        next(
          new AppError(
            "An error occurred with generating a response, Try Again",
            500
          )
        );
      }

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
        next(new AppError("No ingredients provided", 400));
      }

      const filePath = path.join(__dirname, "ingredients.txt");
      await fs.promises.writeFile(filePath, ingredients);

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
        next(new AppError("No image uploaded", 400)) 
      }

      const file = req.file;

      const prompt = `You are a professional cook with extensive experience in both traditional and modern cuisine.
      Based on the image provided, generate ingredients and steps for a recipe. Provide the following sections

      if a nonsensical image is provided, output false

      **Ingredients**: A detailed list of ingredients required.
      **Steps**: In-depth steps on how to prepare the dish.

     Output the ingredients and steps in a JSON format for easy parsing and manipulation, like so:
      {"ingredients": [
                "1 large yam, peeled and diced",
                "1 tablespoon olive oil",
                "1 teaspoon ground cumin",
                "1/2 teaspoon ground turmeric",
                "1/4 teaspoon salt",
                "1/4 teaspoon black pepper",
                "Juice of 1 lemon",
                "2 tablespoons chopped fresh cilantro",
                "2 tablespoons toasted sesame seeds",
                "Optional: 1/2 cup chopped red onion, 1/4 cup chopped red bell pepper"
            ],
            "steps": [
                "In a large skillet or pan, heat the olive oil over medium heat. Add the diced yam and cook for about 5 minutes, or until slightly softened and lightly browned.",
                "Add the cumin, turmeric, salt, and pepper. Stir and cook for 1 minute more, or until fragrant.",
                "Transfer the cooked yam to a bowl. Let it cool slightly.",
                "In a small bowl, whisk together the lemon juice, cilantro, and toasted sesame seeds.",
                "Pour the dressing over the yam and toss to coat.",
                "Serve immediately, or chill for later."
    ]}

        `;

      const result = await this.Model.generateContent([
        prompt,
        {
          inlineData: {
            data: Buffer.from(fs.readFileSync(file.path)).toString("base64"),
            mimeType: file.mimetype,
          },
        },
      ]);

      const responseText = result.response
        .text()
        .replace(/```json\s*|\s*```/g, "")
        .trim();

      const cookingDetails = JSON.parse(responseText);
      fs.unlinkSync(file.path);

      if (!responseText) {
        next(
          new AppError(
            "An error occurred with generating a response, Try Again",
            500
          )
        );
      }

      return res.status(200).json({ response: cookingDetails });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;

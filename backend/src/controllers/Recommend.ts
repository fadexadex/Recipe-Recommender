import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { AppError } from ".././middlewares/errorHandler";

config();

//Incase we implement a photo cook
// const result = await model.generateContent([
//     "What is in this photo?",
//     {inlineData: {data: Buffer.from(fs.readFileSync('path/to/image.png')).toString("base64"),
//     mimeType: 'image/png'}}]
//     );

class RecipeController {
  private readonly genAI: GoogleGenerativeAI;
  private readonly textModel: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.textModel = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  }
  private parseRecipe(recipe: string) {
    const sections = recipe.split("###").map((section) => section.trim());
    const [
      hashtags,
      nameSection,
      descriptionSection,
      ingredientsSection,
      ...stepsSection
    ] = sections;

    const dishName = this.extractSectionContent(nameSection, "Dish Name");
    const shortDescription = this.extractSectionContent(
      descriptionSection,
      "Short Description"
    );
    const ingredients = this.extractListContent(
      ingredientsSection,
      "Ingredients"
    );
    const steps = this.extractListContent(stepsSection.join(""), "Steps");

    return {
      hashtags: hashtags.split(/\s+/).map((tag) => tag.replace("#", "").trim()),
      dishName,
      shortDescription,
      ingredients,
      steps,
    };
  }

  private extractSectionContent(section: string, label: string): string {
    return section.replace(`${label}:`, "").trim();
  }

  private extractListContent(section: string, label: string): string[] {
    return section
      .replace(`${label}:`, "")
      .trim()
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  generateMeals = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { ingredients, allergies } = req.body;
      const prompt = `You are a professional cook with extensive experience in both traditional and modern cuisine. I want you to generate recipe recommendations based on the following ingredients: ${ingredients}. Each recommendation should avoid any dishes that contain the following allergens: ${allergies}.

    For each recipe recommendation, provide the following sections, separated by '###':

    1. **Dish Name**
    2. **Short Description**: A brief description of the dish.
    3. **Ingredients**: A detailed list of ingredients required.
    4. **Steps**: In-depth steps on how to prepare the dish.

    Begin each recommendation with three relevant hashtags. Please ensure each section is clearly labeled and separated by '###' to facilitate easy parsing and manipulation.
`;

      const result = await this.textModel.generateContent(prompt);
      const responseText = result.response.text();

      if (!responseText) {
        throw new Error(
          "An error occurred with generating recommendations, Try Again"
        );
      }

      const recipes = responseText.split(/##\s+#/).filter(Boolean);
      const parsedRecipes = recipes.map((recipe) => this.parseRecipe(recipe));

      res.status(200).json({ response: parsedRecipes });
    } catch (error) {
      next(error);
    }
  };
}

export default RecipeController;

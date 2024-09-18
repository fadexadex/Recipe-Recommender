import fs from "fs";
import path from "path";
import { AppError } from "../middlewares/errorHandler";
import { GenerativeModel } from "@google/generative-ai";
import { ICookDetails } from "index";

class FileService {
  private readonly Model: GenerativeModel;
  constructor(model: GenerativeModel) {
    this.Model = model;
  }

  async downloadIngredientList(ingredients: string[]): Promise<string> {
    if (!ingredients) {
      throw new AppError("No ingredients provided", 400);
    }

    const filePath = path.join(__dirname, "ingredients.txt");
    const formattedIngredients = ingredients
      .map((ingredient, index) => `${index + 1}. ${ingredient}`)
      .join("\n");

    const ingredientsList = `Ingredients\n${formattedIngredients}`;
    await fs.promises.writeFile(filePath, ingredientsList);
    return filePath;
  }

  async cookPhoto(file: Express.Multer.File): Promise<ICookDetails> {
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

    console.log(cookingDetails);

    if (!responseText) {
      throw new AppError(
        "An error occurred with generating a response, Try Again",
        500
      );
    }

    return cookingDetails;
  }
}

export default FileService;

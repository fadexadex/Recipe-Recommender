import {  GenerativeModel } from "@google/generative-ai";
import { IRecipe } from "../index";
import ImageGeneratorService from "../utils/ImageGeneration";
import { AppError } from "../middlewares/errorHandler";

class RecipeService {
  private readonly Model: GenerativeModel;
  private readonly ImageGenerator: ImageGeneratorService;

  constructor(model: GenerativeModel) {
    this.Model = model;
    this.ImageGenerator = new ImageGeneratorService();
  }

  private generateImagePrompt(recipe: IRecipe): string {
    return `Create a high-quality, appetizing image of ${recipe.dishName}. 
    Description: ${recipe.shortDescription}
    Key ingredients: ${recipe.ingredients.slice(0, 5).join(", ")}
    Style: Professional food photography, overhead view
    Lighting: Soft, natural light
    Background: Blurred kitchen or rustic wooden table
    Props: Include relevant utensils or garnishes
    Color palette: Vibrant and fresh`;
  }

  async generateMeals(
    ingredients: string,
    allergies: string,
    io: any
  ): Promise<IRecipe[]> {
    const prompt = `You are a professional cook with extensive experience in both traditional and modern cuisine. I want you to generate recipe recommendations based on the following ingredients: ${ingredients}. Each recommendation should avoid any dishes that contain the following allergens: ${allergies}.

     1. **Dish Name**
     2. **Short Description**: A brief description of the dish.
     3. **Ingredients**: A detailed list of ingredients required.
     4. **Steps**: In-depth steps on how to prepare the dish.

     Begin each recommendation with three relevant hashtags. Please ensure each section is clearly labeled and separated by '###' to facilitate easy parsing and manipulation.
     Give a maximum of 4 recommendations, if a user inputs a nonsensical input, provide random recommendations

    Output the recommendations in a JSON format for easy parsing and manipulation
    make it like so(it should be an array of objects):

     Please format the output strictly as valid JSON, without any markdown or special characters.

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
        io?.emit("progress", progress);

        if (!dishUrl) {
          throw new AppError(
            "An error occurred with generating an image for the recipe, Try Again",
            500
          );
        }

        return {
          ...recipe,
          dishUrl,
        };
      })
    );

    return finalRecipes;
  }
}

export default RecipeService;

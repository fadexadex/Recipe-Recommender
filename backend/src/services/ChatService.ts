import { GenerativeModel } from "@google/generative-ai";
import { AppError } from "../middlewares/errorHandler";

class ChatService {
  private readonly Model: GenerativeModel;

  constructor(model: GenerativeModel) {
    this.Model = model;
  }

  async chat(message: string, recipeContext: any): Promise<string> {
    const { dishName, shortDescription, ingredients, steps } = recipeContext;

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
      throw new AppError(
        "An error occurred with generating a response, Try Again",
        500
      );
    }

    return responseText;
  }
}

export default ChatService;
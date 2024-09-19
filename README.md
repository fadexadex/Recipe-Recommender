# Recipe Recommender

### Problem Statement
One of the biggest challenges people face in the kitchen is deciding what to cook, especially when they have limited ingredients or specific dietary needs. People often struggle to come up with new meal ideas that match their available ingredients or align with their dietary restrictions. Moreover, planning meals and gathering the required ingredients can be time-consuming, leading to frustration and lack of variety in meals. Additionally, users may come across meals they'd like to cook but don't know the ingredients or cooking steps involved, making it harder for them to recreate the dish.

### How Recipe Recommender Solves This
Recipe Recommender is designed to address these common cooking challenges by leveraging the power of the Gemini 1.5 Pro AI model to generate personalized recipes based on the user's inputs. It simplifies meal planning, helps users discover new meal ideas, and provides clear, step-by-step cooking instructions.

- **Personalized Meal Suggestions**: Recipe Recommender allows users to input their available ingredients and any dietary restrictions they might have. The app then generates tailored meal ideas that suit these inputs, helping users utilize what they already have while maintaining their dietary preferences.

- **Ingredient List Generation**: The app allows users to download the list of ingredients for any recipe they choose. This makes it easy to shop for ingredients or plan meals without needing to manually copy down the information.

- **Image-Based Recipe Suggestions**: Users can upload an image of a meal they want to cook, and the AI will analyze the image to provide relevant recipe suggestions, including ingredients and cooking steps. This is especially useful for users who encounter dishes but don't know how to prepare them.

- **Interactive Chat**: With the AI-powered chat feature, users can ask questions about their chosen recipe, such as ingredient substitutions, nutritional information, or additional cooking tips. This ensures a more personalized cooking experience by offering on-the-spot support as users prepare their meals.

Deployed URL - [Recipe Recommender](https://recipe-recommender-ai.vercel.app)

## Running it on your machine

### Prerequisites
- Node.js
- npm or yarn
  
1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend server**:
    ```bash
    npm start
    ```

4. The application will be available at `http://localhost:3000`.

## Project Structure
- **Backend**: Handles API requests, communicates with AI models, and serves data.
- **Frontend**: React app where users input preferences and view generated recipes.


## Authors
- Taiwo Ayomide
- Fadehan Daniel

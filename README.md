# Recipe Recommender

### Problem Statement
One of the biggest challenges people face in the kitchen is deciding what to cook, especially when they have limited ingredients or specific dietary needs. People often struggle to come up with new meal ideas that match their available ingredients or align with their dietary restrictions. Moreover, planning meals and gathering the required ingredients can be time-consuming, leading to frustration and lack of variety in meals. Additionally, users may come across meals they'd like to cook but don't know the ingredients or cooking steps involved, making it harder for them to recreate the dish.

### How Recipe Recommender Solves This
Recipe Recommender is designed to address these common cooking challenges by leveraging the power of the Gemini 1.5 Pro AI model to generate personalized recipes based on the user's inputs. It simplifies meal planning, helps users discover new meal ideas, and provides clear, step-by-step cooking instructions.

- **Personalized Meal Suggestions**: Recipe Recommender allows users to input their available ingredients and any dietary restrictions they might have. The app then generates tailored meal ideas aided with images, that suit these inputs, helping users utilize what they already have while maintaining their dietary preferences.

- **Ingredient List Generation**: The app allows users to download the list of ingredients for any recipe they choose. This makes it easy to shop for ingredients or plan meals without needing to manually copy down the information.

- **Image-Based Recipe Suggestions**: Users can upload an image of a meal they want to cook, and the AI will analyze the image to provide relevant recipe suggestions, including ingredients and cooking steps. This is especially useful for users who encounter dishes but don't know how to prepare them.

- **Interactive Chat**: With the AI-powered chat feature, users can ask questions about their chosen recipe, such as ingredient substitutions, nutritional information, or additional cooking tips. This ensures a more personalized cooking experience by offering on-the-spot support as users prepare their meals.

### Technologies Used

- **Node.js**: Used for building the backend API to handle requests, process user inputs, and communicate with the AI model.
- **React**: The frontend framework used to build the user interface, providing an interactive and responsive experience for users.
- **Gemini 1.5 Pro AI**: Used for generating personalized recipe suggestions based on user inputs like ingredients, dietary restrictions, and images.
- **Clarifai API**: Used to communicate with the **Imagen** image generation model to generate images for recommended dishes.
- **Cloudinary**: For image storage and optimization, ensuring fast and reliable delivery of image assets.
- **Express.js**: A backend framework used to create RESTful APIs that manage recipe data, ingredient lists, and user inputs.
- **Socket.IO**: Enables real-time communication of the backend with the front-end to display progress with recommendation generation.
- **Vercel**: Used for deploying the frontend.
- **Railway**: Used for deploying the backend.

**Deployed URL** - [Recipe Recommender](https://recipe-recommender-ai.vercel.app)

[Watch the video walkthrough](https://www.loom.com/share/847bbcbf78834934b0660caa93eb46e3?sid=76b05568-d090-49ed-bcd0-355d1e8d40ce)

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


## Authors
- Taiwo Ayomide
- Fadehan Daniel

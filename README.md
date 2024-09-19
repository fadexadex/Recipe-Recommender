# Recipe Recommender

### Problem Statement
One of the biggest challenges people face in the kitchen is deciding what to cook, especially when they have limited ingredients or specific dietary needs. People often struggle to come up with new meal ideas that match their available ingredients or align with their dietary restrictions. Moreover, planning meals and gathering the required ingredients can be time-consuming, leading to frustration and lack of variety in meals. Additionally, users may come across meals they'd like to cook but don't know the ingredients or cooking steps involved, making it harder for them to recreate the dish.

### How Recipe Recommender Solves This
Recipe Recommender is designed to address these common cooking challenges by leveraging the power of the Gemini 1.5 Pro AI model to generate personalized recipes based on the user's inputs. It simplifies meal planning, helps users discover new meal ideas, and provides clear, step-by-step cooking instructions.

- **Personalized Meal Suggestions**: Recipe Recommender allows users to input their available ingredients and any dietary restrictions they might have. The app then generates tailored meal ideas that suit these inputs, helping users utilize what they already have while maintaining their dietary preferences.

- **Ingredient List Generation**: The app allows users to download the list of ingredients for any recipe they choose. This makes it easy to shop for ingredients or plan meals without needing to manually copy down the information.

- **Image-Based Recipe Suggestions**: Users can upload an image of a meal they want to cook, and the AI will analyze the image to provide relevant recipe suggestions, including ingredients and cooking steps. This is especially useful for users who encounter dishes but don't know how to prepare them.

- **Interactive Chat**: With the AI-powered chat feature, users can ask questions about their chosen recipe, such as ingredient substitutions, nutritional information, or additional cooking tips. This ensures a more personalized cooking experience by offering on-the-spot support as users prepare their meals.


## Running it on your machine

### Prerequisites
- Node.js
- npm or yarn
- Docker (optional)

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/fadexadex/Recipe-Recommender.git
    cd Recipe-Recommender/backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the necessary configurations

- **Google AI Studio API Key** (can be obtained from [Google AI Studio](https://aistudio.google.com/app/apikey))
  ```bash
  GOOGLE_API_KEY=<your_google_api_key>
  ```
- **Application port** 
  ```bash
  PORT=<your_preferred_port>
  ```
- **Clarifai Personal Access Token**(can be obtained from [Clarifai Account's Security section](https://clarifai.com/)) 
  ```bash
  PAT=<your_clarifai_pat>
  ```
- **Clarifai Image Generation Model Details**
  ```bash
  USER_ID=gcp
  APP_ID=generate
  MODEL_ID=Imagen
  MODEL_VERSION_ID=8d5508722cc8444385af839b98fdf883
  ```
- Cloudinary Configuration (can be obtained from [Cloudinary Page](https://cloudinary.com/)
  ```bash
  CLOUDINARY_NAME=<your_cloudinary_name>
  CLOUDINARY_API_KEY=<your_cloudinary_api_key>
  CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
  ```
    

5. **Run the backend**:
    ```bash
    npm start
    ```

6. **Optional: Run using Docker**:
    Ensure Docker is installed and run the following command:
    ```bash
    docker-compose up --build
    ```

### Frontend Setup

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

## Contributing
Feel free to open issues or submit pull requests!

## License
This project is licensed under the MIT License.

## Authors
- Taiwo Ayomide
- Fadehan Daniel

# Recipe Recommender

## Project Overview
Recipe Recommender is a full-stack application that allows users to generate personalized meal recipes. The project consists of a **backend** that interacts with an AI model to generate recipes and a **frontend** where users can interact with the app.

### Prerequisites
- Node.js
- npm or yarn
- Docker (optional)

## Backend Setup

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

## Frontend Setup

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

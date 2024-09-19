import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client"; 

const socket = io("https://recipe-recommender-production.up.railway.app");

function Recommendations() {
    const [recipes, setRecipes] = useState([]);
    const [progress, setProgress] = useState(0); 
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to WebSocket server");
        });

        socket.on("progress", (recipe) => {
            console.log("Received recipe:", recipe);
            setRecipes((prevRecipes) => [...prevRecipes, recipe]);
            setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from WebSocket server");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (location.state && location.state.recipes) {
            console.log("Received recipes from navigation:", location.state.recipes);
            setRecipes(location.state.recipes);
        }
    }, [location.state]);

    const handleCardClick = (recipe) => {
        navigate(`/recipe/${recipe.dishName}`, { state: { recipe } });
    };

    return (
        <div className="mt-8 min-h-screen p-8">
            <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
                Meal Recommendations Based On Your Preferences
            </h1>

            {progress > 0 && progress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
                    <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:w-[80%] lg:m-auto gap-8">
                {recipes.length === 0 ? (
                    <p>No recommendations available.</p>
                ) : (
                    recipes.map((recipe, index) => (
                        <div
                            key={index}
                            className="card-body bg-white hover:bg-blue-50 shadow-lg shadow-blue-200 p-6 rounded-lg transition-transform transform hover:scale-105 cursor-pointer hover:shadow-2xl"
                            onClick={() => handleCardClick(recipe)}
                        >
                            <div className="card-title-tag flex flex-col justify-between mb-4">
                                <h2 className="card-title font-bold text-xl text-gray-800 drop-shadow-sm">
                                    {recipe.dishName.replace(/\*/g, "")}
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    {Array.isArray(recipe.hashtags)
                                        ? recipe.hashtags.map((tag, i) => (
                                                <span key={i}>#{tag} </span>
                                          ))
                                        : recipe.hashtags
                                                .split(/(?=[A-Z])/)
                                                .map((tag, i) => <span key={i}>#{tag} </span>)}
                                </p>
                            </div>

                            <div className="mb-4">
                                {recipe.dishUrl && (
                                    <img
                                        src={recipe.dishUrl}
                                        alt={recipe.dishName}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    {recipe.shortDescription.replace(/\*/g, "")}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Recommendations;
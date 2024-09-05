import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/background.jpg";
import LoadingSpinner from "./LoadingSpinner";

function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!ingredients) {
      alert("Please enter an ingredient.");
      return;
    }
    setLoading(true);
    const response = await fetch("http://localhost:4000/recommend-dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients, allergies }),
    });

    const data = await response.json();

    setTimeout(() => {
      setLoading(false);
      navigate("/recipes", { state: { recipes: data.response } });
    }, 3000);
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-70"></div>

      {/* Content */}
      <div className="min-h-screen flex flex-col">
        <div className="relative p-6 w-full max-w-lg mx-auto">
          <div className="p-8 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            {/* Ingredients Input */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="ingredients"
                className="text-gray-900 font-bold mb-2"
              >
                🍲 Ingredients
              </label>
              <input
                id="ingredients"
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients"
                className="rounded-lg px-4 py-2 bg-blue-200 focus:outline-purple-400 focus:bg-purple-50 transition-all duration-300 ease-in-out shadow-md"
              />
            </div>

            {/* Allergies Input */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="allergies"
                className="text-gray-900 font-bold mb-2"
              >
                ⚠️ Allergies
              </label>
              <input
                id="allergies"
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="Enter allergies"
                className="rounded-lg px-4 py-2 bg-purple-200 focus:outline-blue-400  focus:bg-blue-50 transition-all duration-300 ease-in-out shadow-md"
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg px-6 py-3 font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={handleGenerate}
            >
              Generate Recipes
            </button>
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
}

export default HeroSection;

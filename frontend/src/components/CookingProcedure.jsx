import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatHelper from "../components/ChatHelper";
import { AiOutlineDownload } from "react-icons/ai";

function CookingProcedure() {
	const location = useLocation();
	const recipe = location.state?.recipe;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const downloadIngredients = async () => {
		try {
			setIsLoading(true);
			const url = `https://recipe-recommender-production.up.railway.app/download-ingredient-list`;
			console.log("Fetching URL:", url);

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ingredients: recipe.ingredients }),
			});

			if (!response.ok) {
				console.error("Response status:", response.status); 
				throw new Error("Network response was not ok");
			}

			const blob = await response.blob();
			const downloadUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.setAttribute("download", "ingredients.txt");
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Error downloading the ingredients list:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen p-8">
			<button
				onClick={() => navigate(-1)}
				className="p-2 bg-[blue] text-white rounded-lg"
			>
				Go Back
			</button>

			<div className="center text-center mb-8">
				<h1 className="font-extrabold text-4xl text-gray-800">
					{recipe.dishName.replace(/\*/g, "")}
				</h1>
				<p className="text-gray-500 mt-2 text-lg">
					{recipe.shortDescription.replace(/\*/g, "")}
				</p>
			</div>

			<h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
				Required Ingredients
			</h2>
			<div className="card-body w-[90%] m-auto bg-white shadow-lg shadow-blue-200 p-6 rounded-lg relative">
				<button
					onClick={downloadIngredients}
					className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-md"
					disabled={isLoading}
				>
					<AiOutlineDownload size={24} />
				</button>
				<ul className="list-disc list-inside text-gray-600 text-lg">
					{recipe.ingredients.map((ingredient, index) => (
						<li key={index} className="mb-2">
							{ingredient.replace(/\*/g, "")}
						</li>
					))}
				</ul>
			</div>

			<div className="my-12">
				<h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
					Cooking Steps
				</h2>
				<div className="card-body w-[90%] m-auto bg-white shadow-lg shadow-purple-300 p-6 rounded-lg">
					<ul className="list-inside text-gray-600 text-lg">
						{recipe.steps.map((step, index) => (
							<li key={index} className="mb-4">
								{step.replace(/\*/g, "")}
							</li>
						))}
					</ul>
				</div>
			</div>
			<ChatHelper />
		</div>
	);
}

export default CookingProcedure;

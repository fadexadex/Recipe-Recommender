import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CookingProcedure() {
	const location = useLocation();
	const recipe = location.state?.recipe;
	const navigate = useNavigate();

	return (
		<div className=" min-h-screen  p-8">
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
			<div className="card-body w-[90%] m-auto bg-white shadow-lg shadow-blue-200 p-6 rounded-lg">
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
		</div>
	);
}

export default CookingProcedure;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Recommendations() {
	const location = useLocation();
	const recipes = location.state?.recipes || [];
	const navigate = useNavigate();

	const handleCardClick = (recipe) => {
		navigate(`/recipe/${recipe.dishName}`, { state: { recipe } });
	};

	return (
		<div className="mt-8 min-h-screen p-8">
			<h1 className="text-center text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
				Meal Recommendations Based On Your Preferences
			</h1>
			<div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{recipes.map((recipe, index) => (
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
						<div>
							<p className="text-gray-500">
								{recipe.shortDescription.replace(/\*/g, "")}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Recommendations;

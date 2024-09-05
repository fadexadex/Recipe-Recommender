import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function Recommendations () {
  const location = useLocation();
  const recipes = location.state?.recipes || [];
  const navigate = useNavigate();
  const handleCardClick = (recipe) => {
    navigate(`/recipe/${recipe.dishName}`, { state: { recipe } });
  };
 
  return (
		<div className="mt-8">
			<h1 className="text-center">
				MEAL RECOMMENDATIONS BASED ON YOUR PREFERENCES
			</h1>
      <div className="cards  flex flex-col gap-4">
        {recipes.map((recipe, index) => (
          <div key={index} className="card-title-tag flex justify-between" onClick={() => handleCardClick(recipe)}>
            <div className="card-title-tag flex justify-between">
								<h2 className="card-title font-bold">{recipe.dishName}</h2>
								<p className="text-gray-300 text-[12px]">
									#{recipe.hashtags}
								</p>
            </div>
            <p className="text-gray-300 text-[12px]">{recipe.shortDescription}</p>
          </div>))}
        
				
			</div>
		</div>
	);
}

export default Recommendations

import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function ImageCook() {
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [recipe, setRecipe] = useState(null); 

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			setErrorMessage("Please upload a valid image file.");
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!image) {
			setErrorMessage("Please upload an image.");
			return;
		}

		setLoading(true);
		setErrorMessage("");

		const formData = new FormData();
		formData.append("image", image);

		try {
			const response = await fetch("http://localhost:4000/cook-photo", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image. Please try again.");
			}

			const data = await response.json();
			console.log("Received data:", data); 

			if (data.error) {
				throw new Error(data.error); 
			}

			setRecipe(data.response);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setErrorMessage(error.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h2 className="text-2xl font-bold mb-4">
				Upload an Image to Find Recipes
			</h2>

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
			>
				<div className="mb-4">
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>
				</div>

				{imagePreview && (
					<div className="mb-4">
						<img
							src={imagePreview}
							alt="Preview"
							className="w-full h-auto rounded-md"
						/>
					</div>
				)}

				{errorMessage && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
						<strong className="font-bold">Error: </strong>
						<span>{errorMessage}</span>
					</div>
				)}

				<button
					type="submit"
					className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					{loading ? "Fetching Cooking Steps..." : "Find Recipes"}
				</button>
			</form>

			{loading && (
				<div className="mt-4">
					<LoadingSpinner />
				</div>
			)}

			{recipe && (
				<div className="min-h-screen  p-8">
					<div className="my-12">
						<h2 className="text-center text-2xl font-bold text-gray-700 mb-4">
							Ingredients
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
			)}
		</div>
	);
}

export default ImageCook;

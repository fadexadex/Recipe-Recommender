import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage1 from "../images/background1.jpg";
import backgroundImage2 from "../images/background2.jpg";
import backgroundImage3 from "../images/background3.jpg";
import backgroundImage4 from "../images/background4.jpg";
import backgroundImage5 from "../images/background5.jpg";
import backgroundImage6 from "../images/background6.jpg";
import backgroundImage7 from "../images/background7.jpg";
import LoadingSpinner from "./LoadingSpinner";

function HeroSection() {
	const [loading, setLoading] = useState(false);
	const [ingredients, setIngredients] = useState("");
	const [allergies, setAllergies] = useState("");
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [fade, setFade] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [progress, setProgress] = useState(0); 
	const navigate = useNavigate();

	const backgroundImages = [
		backgroundImage1,
		backgroundImage2,
		backgroundImage3,
		backgroundImage4,
		backgroundImage5,
		backgroundImage6,
		backgroundImage7,
	];

	useEffect(() => {
		const intervalId = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setCurrentImageIndex((prevIndex) =>
					prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
				);
				setFade(true);
			}, 300);
		}, 5000);

		return () => clearInterval(intervalId);
	}, [backgroundImages.length]);

	const handleGenerate = async () => {
		if (!ingredients) {
			setErrorMessage("Please enter an ingredient.");
			return;
		}

		setLoading(true);
		setErrorMessage("");
		setProgress(0); 

		const simulateProgress = () => {
			setProgress((prevProgress) => {
				if (prevProgress >= 90) {
					return prevProgress;
				}
				return prevProgress + 1;
			});
		};

		const progressInterval = setInterval(simulateProgress, 100);

		try {
			const response = await fetch("http://localhost:4000/recommend-dishes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ingredients, allergies }),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch recipes. Please try again.");
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(data.error); 
			}

			console.log("Received data:", data);

			clearInterval(progressInterval);
			setProgress(100); 

			setTimeout(() => {
				setLoading(false);
				navigate("/recipes", { state: { recipes: data.response } });
			}, 500);
		} catch (error) {
			clearInterval(progressInterval);
			setLoading(false);
			setErrorMessage(error.message); 
		}
	};

	return (
		<div
			className={`relative h-screen bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
				fade ? "opacity-100" : "opacity-50"
			}`}
			style={{
				backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{/* Content */}
			<div className="min-h-screen flex flex-col justify-center items-center text-center">
				<div className="relative p-6 w-full max-w-lg">
					<div className="p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
						<h1 className="text-3xl font-bold text-gray-800 mb-6">
							Find Delicious Recipes!
						</h1>

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
								className="rounded-lg px-4 py-2 bg-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-shadow duration-300 ease-in-out shadow-md"
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
								className="rounded-lg px-4 py-2 bg-purple-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow duration-300 ease-in-out shadow-md"
							/>
						</div>

						{/* Error Message */}
						{errorMessage && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
								<strong className="font-bold">Error: </strong>
								<span>{errorMessage}</span>
							</div>
						)}

						{/* Generate Button */}
						<button
							type="submit"
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg px-6 py-3 font-semibold transform hover:scale-105 transition-transform duration-300 ease-in-out"
							onClick={handleGenerate}
						>
							Generate Recipes
						</button>

						{/* Progress Bar */}
						{loading && (
							<div className="w-full bg-gray-200 h-2 mt-4">
								<div
									className="bg-blue-600 h-2"
									style={{ width: `${progress}%` }}
								></div>
							</div>
						)}
					</div>
				</div>
			</div>

			{loading && <LoadingSpinner />}
		</div>
	);
}

export default HeroSection;

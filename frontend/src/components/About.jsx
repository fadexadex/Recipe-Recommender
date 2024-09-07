import React from "react";

function About() {
	return (
		<div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
			<div className="max-w-4xl bg-white p-10 shadow-lg rounded-lg">
				<h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
					About Recipe Recommender
				</h1>
				<p className="text-lg text-gray-600 mb-8 text-center">
					Welcome to Recipe Recommender, your go-to app for personalized meal
					suggestions based on your dietary preferences, allergies, and
					available ingredients! We aim to make meal planning simple, healthy,
					and tailored to your specific needs.
				</p>

				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Project Overview
				</h2>
				<p className="text-lg text-gray-600 mb-6">
					This application leverages advanced AI algorithms to recommend
					delicious recipes that are perfect for your unique preferences.
					Whether you're looking for inspiration for dinner or want to avoid
					certain ingredients due to allergies, Recipe Recommender has got you
					covered!
				</p>

				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Technology Stack
				</h2>
				<p className="text-lg text-gray-600 mb-6">
					We built Recipe Recommender using cutting-edge technologies:
				</p>
				<ul className="list-disc list-inside text-lg text-gray-600 mb-8">
					<li>Frontend: React, Tailwind CSS for a seamless user experience</li>
					<li>
						Backend: AI-powered algorithms for personalized recommendations
					</li>
					<li>Node.js for handling API requests and data processing</li>
				</ul>

				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Meet the Team
				</h2>
				<div className="flex flex-col space-y-4 text-lg text-gray-600">
					<p>
						<strong>Frontend Developer:</strong> Taiwo Ayomide - Responsible for
						the user interface and ensuring the app is responsive and intuitive.
					</p>
					<p>
						<strong>Backend Developer:</strong> Fadehan Daniel - Handles the
						backend operations, including AI integration for recipe
						recommendations and API management.
					</p>
                </div>
                
			</div>
		</div>
	);
}

export default About;

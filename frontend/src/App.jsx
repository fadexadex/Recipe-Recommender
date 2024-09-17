import React from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Recommendations from "./components/Recommendations";
import CookingProcedure from "./components/CookingProcedure";
import About from "./components/About";
import Contact from "./components/Contact";
import ChatHelper from "./components/ChatHelper";
import ImageCook from "./components/ImageCook"

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<HeroSection />
						</>
					}
				/>
				
				<Route
					path="/about"
					element={
						<>
							<About />
						</>
					}
				/>
				<Route
					path="/contact"
					element={
						<>
							<Contact />
						</>
					}
				/>
				<Route
					path="/imagecook"
					element={
						<>
							<ImageCook />
						</>
					}
				/>
				<Route
					path="/recipes"
					element={
						<>
							<Recommendations />
						</>
					}
				/>
				<Route
					path="/recipe/:id"
					element={
						<>
							<CookingProcedure />
						</>
					}
				/>
				<Route
					path="/chat"
					element={
						<>
							<ChatHelper />
						</>
					}
				/>
				<Route
					path="/imagecook"
					element={
						<>
							<ImageCook />
						</>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;

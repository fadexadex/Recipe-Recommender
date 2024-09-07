import React from "react";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Recommendations from "./components/Recommendations";
import CookingProcedure from "./components/CookingProcedure";
import About from "./components/About";
import Contact from "./components/Contact";

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
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
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
			</Routes>
		</Router>
	);
};

export default App;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="p-2 md:px-16 border-b-[2px] border-gray-200  w-full">
			<div className="flex justify-between p-4 m-auto  border-gray-200 lg:justify-start lg:gap-16">
				<div className="text-xl font-bold">
					<Link to="/">Recipe Recommender</Link>
				</div>
				<div className="block lg:hidden">
					<button onClick={toggleMenu} className="focus:outline-none">
						<FontAwesomeIcon
							icon={isOpen ? faTimes : faBars}
							className="text-2xl text-[#2667FF]"
						/>
					</button>
				</div>
				<div className="hidden lg:flex space-x-8 items-center">
					<a href="#" className="text-sm font-medium hover:text-[#2667FF]">
						Home
					</a>
					<a href="#" className="text-sm font-medium hover:text-[#2667FF]">
						About
					</a>
					<a href="#" className="text-sm font-medium hover:text-[#2667FF]">
						Contact
					</a>
				</div>
			</div>

			{/* Mobile Screen */}
			<div
				className={`fixed inset-0 bg-white z-50 transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform lg:hidden`}
			>
				<div className="flex justify-between p-4 m-auto border-b-[2px] border-gray-200">
					<div className="text-xl font-bold">
						<Link to="/">Recipe Recommender</Link>
					</div>
					<button onClick={toggleMenu} className="focus:outline-none">
						<FontAwesomeIcon
							icon={faTimes}
							className="text-2xl text-[#2667FF]"
						/>
					</button>
				</div>
				<div className="flex flex-col space-y-4 p-4 items-center gap-8">
					<a href="#" className="text-lg font-medium hover:text-[#2667FF]">
						Home
					</a>
					<a href="#" className="text-lg font-medium hover:text-[#2667FF]">
						About
					</a>
					<a href="#" className="text-lg font-medium hover:text-[#2667FF]">
						Contact
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

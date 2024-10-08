import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="p-2 md:px-16 border-b-[2px] border-gray-200  w-full">
			<div className="flex justify-between p-4 m-auto  border-gray-200 ">
				<div className="text-xl font-bold">
					<Link to="/" className="flex items-center hover:text-[blue]">
						<img
							src={logo}
							alt="Logo"
							className="w-[50px] h-auto m-auto mr-2"
						/>
						Recipe Recommender
					</Link>
				</div>
				<div className="lg:hidden flex items-center justify-center">
					<button onClick={toggleMenu} className="focus:outline-none">
						<FontAwesomeIcon
							icon={isOpen ? faTimes : faBars}
							className="text-2xl text-[#2667FF]"
						/>
					</button>
				</div>
				<div className="hidden lg:flex space-x-8 items-center">
					<Link to="/" className="text-sm font-medium hover:text-[blue]">
						Home
					</Link>
					<Link to="/about" className="text-sm font-medium hover:text-[blue]">
						About
					</Link>
					<Link to="/contact" className="text-sm font-medium hover:text-[blue]">
						Contact
					</Link>
					<Link
						to="/imagecook"
						className="text-sm font-medium hover:text-[blue]"
					>
						ImageCook
					</Link>
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
						<Link to="/" className="flex items-center hover:text-[blue]">
							<img
								src={logo}
								alt="Logo"
								className="w-[50px] h-auto m-auto mr-2"
							/>
							Recipe Recommender
						</Link>
					</div>
					<button onClick={toggleMenu} className="focus:outline-none">
						<FontAwesomeIcon
							icon={faTimes}
							className="text-2xl text-[#2667FF]"
						/>
					</button>
				</div>
				<div className="flex flex-col space-y-4 p-4 items-center gap-8">
					<Link to="/" className="text font-medium hover:text-[blue]">
						Home
					</Link>
					<Link to="/about" className="text font-medium hover:text-[blue]">
						About
					</Link>
					<Link to="/contact" className="text font-medium hover:text-[blue]">
						Contact
					</Link>
					<Link to="/imagecook" className="text font-medium hover:text-[blue]">
						ImageCook
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

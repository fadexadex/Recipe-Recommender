import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Image1 from "../images/frontend-dev.jpg";
import Image2 from "../images/backend-dev.jpg";

const developers = [
	{
		name: "Taiwo Ayomide",
		image: Image1,
		role: "Frontend Developer",
		github: "https://github.com/dev-ayomide",
		linkedin: "https://linkedin.com/in/taiwoayomide",
	},

	{
		name: "Fadehan Daniel",
		image: Image2,
		role: "Backend Developer",
		github: "https://github.com/fadexadex",
		linkedin: "https://linkedin.com/in/danielfadehan",
	},
];

const Contact = () => {
	return (
		<div className="min-h-screen flex flex-col items-center bg-gray-100 p-8">
			<h1 className="text-4xl font-bold mb-10 text-center">
				Meet the Developers
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{developers.map((developer, index) => (
					<div
						key={index}
						className=" bg-white w-64 p-6 mx-auto hover:bg-blue-50 shadow-lg shadow-blue-200 rounded-lg transition-transform transform hover:scale-105"
					>
						<img
							src={developer.image}
							alt={developer.name}
							className="max-w-[100%] max-h-[100%] mx-auto"
						/>
						<h2 className="text-2xl font-semibold mt-4 text-center">
							{developer.name}
						</h2>
						<p className="text-gray-600 text-center">{developer.role}</p>

						<div className="flex justify-center mt-4 space-x-4">
							<a
								href={developer.github}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									target="_blank"
									className="text-2xl text-[blue]"
								/>
							</a>

							<a
								href={developer.linkedin}
								target="_blank"
								rel="noopener noreferrer"
							>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="text-2xl text-[blue]"
								/>
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Contact;

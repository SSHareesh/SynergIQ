import React from "react";
import { Link } from "react-router-dom";

export const Roadmaps = () => {
    const recommendedRoadmaps = [
        {
            name: "Frontend Development",
            description: "Learn how to build beautiful and responsive user interfaces.",
            link: "#"
        },
        {
            name: "Backend Development",
            description: "Master the skills needed to build powerful server-side applications.",
            link: "/backend-roadmap"
        },
        {
            name: "Full Stack Development",
            description: "Become a full-stack developer with both frontend and backend skills.",
            link: "#"
        }
    ];

    const otherRoadmaps = [
        {
            name: "Mobile Development",
            description: "Build mobile apps for iOS and Android using frameworks like React Native.",
            link: "#"
        },
        {
            name: "AI & Machine Learning",
            description: "Dive deep into AI, data science, and machine learning algorithms.",
            link: "#"
        },
        {
            name: "Cybersecurity",
            description: "Protect systems and data from potential cyber threats and attacks.",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-white py-14 px-4 pb-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-black py-8">Recommended Roadmaps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedRoadmaps.map((roadmap, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-black mb-4">{roadmap.name}</h3>
                        <p className="text-lg text-gray-700 mb-6">{roadmap.description}</p>
                        <Link
                            to={roadmap.link}
                            className="w-full py-3 px-6 bg-orange-500 text-white text-center rounded-md transition-colors hover:bg-black"
                        >
                            Start Roadmap
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-4xl font-bold text-black">Other Roadmaps</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {otherRoadmaps.map((roadmap, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-black mb-4">{roadmap.name}</h3>
                        <p className="text-lg text-gray-700 mb-6">{roadmap.description}</p>
                        <Link
                            to={roadmap.link}
                            className="w-full py-3 px-6 bg-orange-500 text-white text-center rounded-md transition-colors hover:bg-black"
                        >
                            Start Roadmap
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmaps;

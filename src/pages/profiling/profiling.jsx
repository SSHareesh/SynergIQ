import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const questions = [
    { id: "likes_creative_visuals", text: "Do you enjoy designing or working with creative visuals?", type: "boolean" },
    { id: "likes_logical_puzzles", text: "Do you like solving logical puzzles and challenges?", type: "boolean" },
    { id: "likes_data_patterns", text: "Do you enjoy working with data and finding patterns in it?", type: "boolean" },
    { id: "likes_user_interaction_apps", text: "Would you prefer to build applications that people interact with daily?", type: "boolean" },
    { id: "likes_system_connections", text: "Do you like understanding how different systems work and connect?", type: "boolean" },
    { id: "interested_in_ai_automation", text: "Are you curious about how artificial intelligence and automation work?", type: "boolean" },
    { id: "interested_in_cybersecurity", text: "Does the idea of protecting data and systems from hackers interest you?", type: "boolean" },
    { id: "likes_structuring_data", text: "Do you enjoy organizing and structuring large sets of information?", type: "boolean" },
    { id: "learning_new_things", text: "Are you comfortable with learning new things frequently?", type: "scale" },
    { id: "structured_or_creative", text: "Do you prefer structured tasks or open-ended creative projects?", type: "choice", options: ["Structured", "Creative"] },
    { id: "likes_experimenting_solutions", text: "When solving a problem, do you like experimenting with different solutions?", type: "boolean" },
    { id: "independent_or_team", text: "Do you prefer working independently or in a team?", type: "choice", options: ["Individually", "In a team"] },
    { id: "likes_troubleshooting", text: "Do you enjoy troubleshooting and fixing issues in systems?", type: "boolean" },
    { id: "interested_in_web_mobile", text: "Would you like to build applications that run on the web or mobile?", type: "boolean" },
    { id: "prefers_look_or_function", text: "Are you more interested in how things look or how things function behind the scenes?", type: "choice", options: ["Looks", "Function"] }
];

const Profiling = () => {
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const handleAnswer = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/predict/", answers);
            navigate("/results");
        } catch (error) {
            console.error("Error submitting data", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
            <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-black text-center mb-6">Please Answer the Following Questions</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {questions.map((q) => (
                        <div key={q.id} className="bg-gray-100 p-6 rounded-lg shadow-md space-y-6">
                            <p className="text-lg font-medium text-black">{q.text}</p>

                            {/* Boolean Questions (Yes/No) */}
                            {q.type === "boolean" && (
                                <div className="flex gap-4 justify-between">
                                    <button
                                        onClick={() => handleAnswer(q.id, "Yes")}
                                        className={`w-1/2 px-6 py-3 rounded-md transition-colors ${answers[q.id] === "Yes" ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => handleAnswer(q.id, "No")}
                                        className={`w-1/2 px-6 py-3 rounded-md transition-colors ${answers[q.id] === "No" ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                                    >
                                        No
                                    </button>
                                </div>
                            )}

                            {/* Scale Questions (1-5) */}
                            {q.type === "scale" && (
                                <div className="w-full flex flex-col items-center">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={answers[q.id] || 3}
                                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                                        className="w-3/4"
                                    />
                                    <div className="flex justify-between w-3/4 mt-2">
                                        <span>1</span>
                                        <span>5</span>
                                    </div>
                                </div>
                            )}

                            {/* Choice Questions (Options like Structured/Creative) */}
                            {q.type === "choice" && (
                                <div className="flex gap-4">
                                    {q.options.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(q.id, option)}
                                            className={`w-1/2 px-6 py-3 rounded-md transition-colors ${answers[q.id] === option ? "bg-orange-500 text-white" : "bg-gray-300 text-black"}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-8 w-full px-6 py-3 bg-black text-white rounded-md hover:bg-orange-500 transition-colors"
                >
                    Submit Answers
                </button>
            </div>
        </div>
    );
};

export default Profiling;

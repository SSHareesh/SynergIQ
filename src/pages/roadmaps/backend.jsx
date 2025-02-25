import React, { useState } from 'react';
import { FileText, Youtube, Code, Plus, Star } from 'lucide-react';

const BackendRoadmap = () => {
    const [progress, setProgress] = useState({
        completed: 0,
        total: 31
    });

    const [modules, setModules] = useState([
        {
            title: "Step 1: Programming Fundamentals",
            progress: "0/31",
            topics: [
                {
                    name: "Basic Syntax and Variables",
                    completed: false,
                    article: "https://example.com/articles/basic-syntax",
                    video: "https://youtube.com/watch?v=example1",
                    notes: "https://example.com/notes/basic-syntax",
                    difficulty: "Easy"
                },
                {
                    name: "Control Structures",
                    completed: false,
                    article: "https://example.com/articles/control-structures",
                    video: "https://youtube.com/watch?v=example2",
                    notes: "https://example.com/notes/control-structures",
                    difficulty: "Easy"
                },
                {
                    name: "Functions and Methods",
                    completed: false,
                    article: "https://example.com/articles/functions",
                    video: "https://youtube.com/watch?v=example3",
                    notes: "https://example.com/notes/functions",
                    difficulty: "Medium"
                }
            ]
        },
        {
            title: "Step 2: Web Fundamentals",
            progress: "0/25",
            topics: [
                {
                    name: "HTTP/HTTPS Protocols",
                    completed: false,
                    article: "https://example.com/articles/http-protocols",
                    video: "https://youtube.com/watch?v=example4",
                    notes: "https://example.com/notes/http-protocols",
                    difficulty: "Medium"
                },
                {
                    name: "RESTful APIs",
                    completed: false,
                    article: "https://example.com/articles/restful-apis",
                    video: "https://youtube.com/watch?v=example5",
                    notes: "https://example.com/notes/restful-apis",
                    difficulty: "Medium"
                }
            ]
        },
        {
            title: "Step 3: Databases",
            progress: "0/40",
            topics: [
                {
                    name: "SQL Basics",
                    completed: false,
                    article: "https://example.com/articles/sql-basics",
                    video: "https://youtube.com/watch?v=example6",
                    notes: "https://example.com/notes/sql-basics",
                    difficulty: "Easy"
                },
                {
                    name: "Database Design",
                    completed: false,
                    article: "https://example.com/articles/database-design",
                    video: "https://youtube.com/watch?v=example7",
                    notes: "https://example.com/notes/database-design",
                    difficulty: "Hard"
                }
            ]
        }
    ]);

    const handleTopicComplete = (moduleIndex, topicIndex) => {
        const updatedModules = [...modules];
        updatedModules[moduleIndex].topics[topicIndex].completed =
            !updatedModules[moduleIndex].topics[topicIndex].completed;

        setModules(updatedModules);
        updateProgress(updatedModules);
    };

    const updateProgress = (currentModules) => {
        const totalCompleted = currentModules.reduce((acc, module) => {
            return acc + module.topics.filter(topic => topic.completed).length;
        }, 0);

        setProgress(prev => ({
            ...prev,
            completed: totalCompleted
        }));
    };

    const handleCompleteAll = () => {
        const updatedModules = modules.map(module => ({
            ...module,
            topics: module.topics.map(topic => ({
                ...topic,
                completed: true
            }))
        }));

        setModules(updatedModules);
        setProgress(prev => ({
            ...prev,
            completed: prev.total
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold">Backend Development Roadmap</h1>
                        <button
                            onClick={handleCompleteAll}
                            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                            Complete All
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Master backend development with our comprehensive roadmap. Follow the structured path from basics to advanced concepts.
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Your Progress: {progress.completed}/{progress.total}</span>
                            <span className="text-sm font-medium text-orange-500">
                                {Math.round((progress.completed / progress.total) * 100)}% complete
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Modules */}
                    {modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{module.title}</h2>
                                <span className="text-sm text-gray-500">{module.progress}</span>
                            </div>

                            <div className="bg-white rounded-lg border">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b bg-gray-50">
                                            <th className="px-4 py-3 text-left">Status</th>
                                            <th className="px-4 py-3 text-left">Topic</th>
                                            <th className="px-4 py-3 text-center">Article</th>
                                            <th className="px-4 py-3 text-center">Video</th>
                                            <th className="px-4 py-3 text-center">Notes</th>
                                            <th className="px-4 py-3 text-center">Difficulty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {module.topics.map((topic, topicIndex) => (
                                            <tr key={topicIndex} className="border-b last:border-b-0">
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={topic.completed}
                                                        onChange={() => handleTopicComplete(moduleIndex, topicIndex)}
                                                        className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">{topic.name}</td>
                                                <td className="px-4 py-3 text-center">
                                                    {topic.article && (
                                                        <a
                                                            href={topic.article}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-600 hover:text-orange-500"
                                                        >
                                                            <FileText className="w-5 h-5 inline-block" />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <a
                                                        href={topic.video}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Youtube className="w-5 h-5 inline-block" />
                                                    </a>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    {topic.notes && (
                                                        <a
                                                            href={topic.notes}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-600 hover:text-orange-500"
                                                        >
                                                            <Plus className="w-5 h-5 inline-block" />
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-sm
                            ${topic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                            topic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'}`}>
                                                        {topic.difficulty}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackendRoadmap;
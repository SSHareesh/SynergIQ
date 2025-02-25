import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Plus, ArrowRight, Trash2 } from 'lucide-react';

const motivationalQuotes = [
    {
        text: "Learning must be sought for with ardor and attended to with diligence.",
        author: "Abigail Adams"
    },
    {
        text: "The beautiful thing about learning is that no one can take it away from you.",
        author: "B.B. King"
    },
    {
        text: "Education is not preparation for life; education is life itself.",
        author: "John Dewey"
    },
    {
        text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        author: "Dr. Seuss"
    }
];

const enrolledSkills = [
    {
        id: 1,
        name: "Flask Developer",
        progress: 65,
        totalHours: 40,
        completedHours: 26,
        nextLesson: "Advanced Hooks"
    },
    {
        id: 2,
        name: "Node.js Fundamentals",
        progress: 30,
        totalHours: 35,
        completedHours: 10.5,
        nextLesson: "Express.js Basics"
    },
    {
        id: 3,
        name: "UI/UX Design",
        progress: 85,
        totalHours: 25,
        completedHours: 21.25,
        nextLesson: "User Research Methods"
    }
];

const completedSkills = [
    "JavaScript Basics",
    "HTML & CSS",
    "Git Version Control",
    "Python Programming",
    "Data Structures"
];

const LearnHub = () => {
    const [currentQuote, setCurrentQuote] = React.useState(0);
    const [newPlan, setNewPlan] = useState('');
    const [learningPlans, setLearningPlans] = useState([
        { id: 1, text: "Complete AWS Certification", completed: false },
        { id: 2, text: "Learn GraphQL basics", completed: false },
        { id: 3, text: "Practice TypeScript with real projects", completed: false }
    ]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleAddPlan = (e) => {
        e.preventDefault();
        if (newPlan.trim()) {
            setLearningPlans([
                ...learningPlans,
                { id: Date.now(), text: newPlan.trim(), completed: false }
            ]);
            setNewPlan('');
        }
    };

    const togglePlan = (id) => {
        setLearningPlans(plans =>
            plans.filter(plan => plan.id !== id)
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Motivational Carousel */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 mb-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        key={currentQuote}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-12"
                    >
                        <p className="text-2xl font-serif italic text-gray-800 mb-4">
                            "{motivationalQuotes[currentQuote].text}"
                        </p>
                        <p className="text-gray-600">
                            - {motivationalQuotes[currentQuote].author}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Enrolled Skills */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <BookOpen className="mr-2 text-orange-500" />
                        Currently Learning
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrolledSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-4">{skill.name}</h3>
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>{skill.completedHours} hours completed</span>
                                        <span>{skill.totalHours} hours total</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-orange-500 h-2 rounded-full"
                                            style={{ width: `${skill.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-orange-500">
                                        {skill.progress}% Complete
                                    </p>
                                    <button
                                        className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-orange-500 transition-colors text-sm"
                                    >
                                        Continue
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                                <p className="mt-3 text-sm text-gray-600">
                                    Next: {skill.nextLesson}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Learning Plans */}
                <div className="mb-12 bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">Learning Plans</h2>
                    <form onSubmit={handleAddPlan} className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newPlan}
                                onChange={(e) => setNewPlan(e.target.value)}
                                placeholder="Add a new learning plan..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                    <div className="space-y-3">
                        {learningPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="flex items-center justify-between p-3 bg-orange-50 rounded-md"
                            >
                                <span className="text-gray-800">{plan.text}</span>
                                <button
                                    onClick={() => togglePlan(plan.id)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <CheckCircle2 className="mr-2 text-green-500" />
                        Completed Skills
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {completedSkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default LearnHub;
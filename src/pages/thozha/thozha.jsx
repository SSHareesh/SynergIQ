import React, { useState } from 'react';
import { ArrowRight, MessageSquareMore, Search, ExternalLink } from 'lucide-react';

export const ThozhaPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const communities = [
        {
            name: "Python Developers Hub",
            description: "Connect with Python enthusiasts from your college. Share knowledge, discuss projects, and grow together.",
            category: "Programming",
            discordLink: "#", // Add your Discord link here
            members: 250
        },
        {
            name: "Chennai.py",
            description: "Join the largest Python developer community in Chennai. Regular meetups, workshops, and networking opportunities.",
            category: "Programming",
            discordLink: "#", // Add your Discord link here
            members: 1500
        },
        {
            name: "Web Development Circle",
            description: "A community for aspiring web developers. Learn frontend, backend, and everything in between.",
            category: "Web Development",
            discordLink: "#", // Add your Discord link here
            members: 300
        },
        {
            name: "AI/ML Enthusiasts",
            description: "Explore the world of Artificial Intelligence and Machine Learning with fellow learners.",
            category: "AI/ML",
            discordLink: "#", // Add your Discord link here
            members: 400
        },
        // Add more communities as needed
    ];

    const categories = Array.from(new Set(communities.map(c => c.category)));

    const filteredCommunities = communities.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">Thozha Community Hub</h1>
                            <p className="text-xl opacity-90">Connect, Learn, and Grow with Like-minded Peers</p>
                        </div>
                        <MessageSquareMore className="h-20 w-20 opacity-80" />
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search communities by name, description, or category..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Communities Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {categories.map(category => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">{category}</h2>
                        <div className="grid gap-6">
                            {filteredCommunities
                                .filter(community => community.category === category)
                                .map((community, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                                                <p className="text-gray-600 mb-4">{community.description}</p>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span>{community.members.toLocaleString()} members</span>
                                                </div>
                                            </div>
                                            <a
                                                href={community.discordLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-[#5865F2] text-white rounded-md hover:bg-[#4752C4] transition-colors ml-4"
                                            >
                                                Join Discord
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ThozhaPage;
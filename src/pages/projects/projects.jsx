import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Github, Plus, Clock, CheckCircle2 } from 'lucide-react';

// Sample data - replace with your actual data
const openSourceProjects = [
    {
        id: 1,
        title: 'SynergIQ Learning Platform',
        description: 'An AI-powered educational platform for personalized learning',
        tech: ['React', 'Node.js', 'TensorFlow'],
        githubUrl: 'https://github.com/SSHareesh/SynergIQ.git'
    },
    {
        id: 2,
        title: 'Community Forum Backend',
        description: 'Backend services for the Thozha community forum',
        tech: ['Express', 'MongoDB', 'WebSocket'],
        githubUrl: 'https://github.com/synergiq/community-forum'
    },
    // Add more open source projects as needed
];

const myProjects = {
    ongoing: [
        {
            id: 1,
            title: 'AI Content Generator',
            description: 'Developing an AI-powered content generation system',
            progress: 75,
            tech: ['Python', 'OpenAI', 'React'],
            startDate: '2024-02-01'
        },
        // Add more ongoing projects
    ],
    completed: [
        {
            id: 1,
            title: 'Student Profile Analytics',
            description: 'Analytics dashboard for student learning patterns',
            tech: ['React', 'D3.js', 'Firebase'],
            completionDate: '2024-01-15'
        },
        // Add more completed projects
    ]
};

export const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Projects</h1>

                {/* Open Source Projects Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-6">Open Source Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {openSourceProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-gray-700 hover:text-black"
                                >
                                    <Github className="h-5 w-5 mr-2" />
                                    View on GitHub
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* My Projects Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">My Projects</h2>
                        <Link
                            to="/newproject"
                            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-orange-500 transition-colors">
                            <Plus className="h-5 w-5 mr-2" onClick={() => Navigate} />
                            Add New Project
                        </Link>
                    </div>

                    {/* Ongoing Projects */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            Ongoing Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myProjects.ongoing.map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Started: {project.startDate}</span>
                                        <span className="text-sm font-medium text-orange-500">{project.progress}% Complete</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Completed Projects */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            Completed Projects
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myProjects.completed.map((project) => (
                                <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                                    <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Completed: {project.completionDate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectsPage;
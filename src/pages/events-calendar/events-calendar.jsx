import React from 'react';
import { Video, Calendar, Briefcase, ExternalLink } from 'lucide-react';

// Sample data - replace with your actual data
const clubEvents = [
    {
        id: 1,
        title: 'Web Development Workshop',
        description: 'Learn modern web development with React and Node.js',
        club: 'Tech Club',
        date: '2024-03-15',
        time: '14:00',
        status: 'upcoming',
    },
    {
        id: 2,
        title: 'AI/ML Fundamentals',
        description: 'Introduction to artificial intelligence and machine learning',
        club: 'AI Club',
        date: '2024-02-28',
        time: '15:30',
        status: 'completed',
        recordingUrl: 'https://example.com/recording/ai-ml-fundamentals'
    }
];

const otherEvents = [
    {
        id: 1,
        title: 'Industry Expert Talk',
        description: 'Discussion on emerging technologies with industry leaders',
        organizer: 'Department of Computer Science',
        date: '2024-03-20',
        time: '11:00'
    },
    {
        id: 2,
        title: 'Hackathon 2024',
        description: '24-hour coding competition',
        organizer: 'College Technical Committee',
        date: '2024-04-05',
        time: '09:00'
    }
];

const internships = [
    {
        id: 1,
        title: 'Frontend Developer Intern',
        company: 'xyz company',
        description: 'Work on modern web applications using React',
        deadline: '2024-03-25',
        duration: '3 months',
        applyUrl: 'https://example.com/apply'
    },

];

export const EventCalendarPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-12">Event Calendar</h1>

                {/* Club Events Section */}
                <section className="mb-16">
                    <div className="flex items-center mb-6">
                        <Calendar className="h-6 w-6 mr-2 text-orange-500" />
                        <h2 className="text-2xl font-semibold">Club Events</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {clubEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <div className="mb-4">
                                    <p className="text-gray-600"><strong>Club:</strong> {event.club}</p>
                                    <p className="text-gray-600">
                                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-gray-600"><strong>Time:</strong> {event.time}</p>
                                </div>
                                {event.status === 'completed' && event.recordingUrl && (
                                    <a
                                        href={event.recordingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-orange-500 hover:text-orange-600"
                                    >
                                        <Video className="h-5 w-5 mr-2" />
                                        Watch Recording
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Other Events Section */}
                <section className="mb-16">
                    <div className="flex items-center mb-6">
                        <Calendar className="h-6 w-6 mr-2 text-orange-500" />
                        <h2 className="text-2xl font-semibold">Other Events</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {otherEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                                <p className="text-gray-600 mb-4">{event.description}</p>
                                <div className="mb-4">
                                    <p className="text-gray-600"><strong>Organizer:</strong> {event.organizer}</p>
                                    <p className="text-gray-600">
                                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-gray-600"><strong>Time:</strong> {event.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Internships Section */}
                <section>
                    <div className="flex items-center mb-6">
                        <Briefcase className="h-6 w-6 mr-2 text-orange-500" />
                        <h2 className="text-2xl font-semibold">Internships</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {internships.map((internship) => (
                            <div key={internship.id} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                                <p className="text-lg text-orange-500 mb-3">{internship.company}</p>
                                <p className="text-gray-600 mb-4">{internship.description}</p>
                                <div className="mb-4">
                                    <p className="text-gray-600"><strong>Duration:</strong> {internship.duration}</p>
                                    <p className="text-gray-600"><strong>Stipend:</strong> {internship.stipend}</p>
                                    <p className="text-gray-600">
                                        <strong>Apply by:</strong> {new Date(internship.deadline).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <a
                                    href={internship.applyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-orange-500 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Apply Now
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventCalendarPage;
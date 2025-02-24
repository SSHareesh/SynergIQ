import { ArrowRight, BookOpen, Users, Settings, HelpCircle, Map, GraduationCap, FileAudio2, MessageSquareMore, Code, CalendarCheck, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';


const images = [
  "src/assets/content.png",
  "src/assets/events.jpg",
  "src/assets/learnhub.jpg",
  "src/assets/rewards.png"
];
const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                EVERYTHING THERE IS<br />
                TO KNOW ABOUT SYNERGIQ
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                SynergIQ is a platform for revolutionizing skill-based learning with AI-powered personalized education. Our platform adapts to each student's requirements, offering multi-format resources, mentorship, and real-world project collaboration. With rewards, community-driven support, and career opportunities, we make learning engaging, efficient, and rewarding. Join us to upskill smarter and unlock endless possibilities!
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/start-learning"
                  className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-orange-500 transition-colors">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-orange-100 rounded-lg p-6 transform hover:-translate-y-2 transition-transform">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* EDI 101 Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Profiling",
                description: "A quiz based profiling system for students.",
                icon: "Users"
              },
              {
                title: "Roadmaps",
                description: "Skill based roadmaps for students",
                icon: "Map"
              },
              {
                title: "Learn Hub",
                description: "A one-stop place for learning with suitable notes and videos",
                icon: "GraduationCap"
              },
              {
                title: "Content Flow",
                description: "AI to generate audio , video and a chatbot for the respective study material",
                icon: "FileAudio"
              },
              {
                title: "Thozha",
                description: "A community forum where every student connects according to their interests.",
                icon: "MessageSquareMore"
              },
              {
                title: "Projects",
                description: "",
                icon: "Code"
              },
              {
                title: "Events Calendar",
                description: "Get to know about the events and the recordings of it organised by the tech clubs of your college",
                icon: "CalendarCheck"
              },
              {
                title: "Rewards",
                description: "Get exciting rewards , turn them into money and buy tasty",
                icon: "IndianRupee"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow">
                <div className="text-orange-500 mb-4">
                  {item.icon === "Map" && <Map className="h-8 w-8 mx-auto" />}
                  {item.icon === "Users" && <Users className="h-8 w-8 mx-auto" />}
                  {item.icon === "Code" && <Code className="h-8 w-8 mx-auto" />}
                  {item.icon === "GraduationCap" && <GraduationCap className="h-8 w-8 mx-auto" />}
                  {item.icon === "IndianRupee" && <IndianRupee className="h-8 w-8 mx-auto" />}
                  {item.icon === "CalendarCheck" && <CalendarCheck className="h-8 w-8 mx-auto" />}
                  {item.icon === "MessageSquareMore" && <MessageSquareMore className="h-8 w-8 mx-auto" />}
                  {item.icon === "FileAudio" && <FileAudio2 className="h-8 w-8 mx-auto" />}




                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  to={`/edi-101/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-orange-500 hover:text-orange-600 inline-flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
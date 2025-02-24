import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDown, Zap } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">SYNERGIQ</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-orange-500 transition-colors">
                About
              </Link>

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center hover:text-orange-500 transition-colors">
                  Solutions
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Profiling"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}>
                        Profiling
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Roadmap"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Roadmap
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/LearnHub"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        LearnHub
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Content Flow"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Content Flow
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Thozha"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Thozha
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Projects"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Projects
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/events-calendar"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Events Calendar
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/solutions/Rewards"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}   >
                        Rewards
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center hover:text-orange-500 transition-colors">
                  Contribute
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/resources/StudyMaterials"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}>
                        Study Materials
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/resources/Feedback"
                        className={`${active ? 'bg-orange-50 text-orange-500' : ''
                          } block px-4 py-2`}>
                        Feedback
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>

              <Link to="/contact" className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-black transition-colors">
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, ArrowUpRight, Rocket, Code, BrainCircuit, Phone } from 'lucide-react';

interface Skill {
  technical: string[];
  tools: string[];
  soft: string[];
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills: Skill = {
    technical: ['C++', 'Java', 'Python', 'MATLAB', 'Haskell', 'HTML/CSS', 'JavaScript', 'MySQL'],
    tools: ['Docker', 'Git/GitHub', 'VS Code', 'AWS', 'Firebase', 'React/Node.js', 'MongoDB'],
    soft: [
      'Communication',
      'Team Collaboration',
      'Problem Solving',
      'Critical Thinking',
      'Leadership',
    ]
  };

  const projects: Project[] = [
    {
      name: 'SmartHealth Connect',
      description: 'AI-powered health monitoring system',
      tech: ['Python', 'TensorFlow', 'React', 'MongoDB'],
      link: 'github.com/dummy/smart-health'
    },
    {
      name: 'EcoTrack',
      description: 'Environmental data visualization platform',
      tech: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
      link: 'github.com/dummy/eco-track'
    },
    {
      name: 'CodeMentor',
      description: 'Programming learning platform',
      tech: ['MERN Stack', 'WebSocket'],
      link: 'github.com/dummy/code-mentor'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">VV</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.name.toLowerCase()
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    aria-current={activeSection === item.name.toLowerCase() ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.name.toLowerCase()
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeSection === item.name.toLowerCase() ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900"
        style={{ transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="grid grid-cols-3 gap-4 text-2xl font-mono text-blue-500/20">
            {Array(15).fill('').map((_, i) => (
              <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                {'{ }'}
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="border border-gray-700 rounded-lg p-8 bg-gray-900/80 backdrop-blur">
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-500 font-mono">portfolio.tsx</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Vishnu Vardhan Theegela
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              2nd year CSE Student at Amrita Vishwa Vidyapeetham
            </p>

            <div className="flex justify-center space-x-4 mb-8">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full transition-colors flex items-center space-x-2">
                <Code size={20} />
                <span>Contact Me</span>
              </a>
              <a href="#projects" className="border border-blue-600 hover:bg-blue-600/20 px-6 py-3 rounded-full transition-colors flex items-center space-x-2">
                <Rocket size={20} />
                <span>View Projects</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur animate-pulse">
                <Rocket className="text-blue-500 mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-400">Problem Solver</p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur animate-pulse" style={{ animationDelay: '0.2s' }}>
                <Code className="text-purple-500 mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-400">Code Enthusiast</p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-gray-800/50 backdrop-blur animate-pulse" style={{ animationDelay: '0.4s' }}>
                <BrainCircuit className="text-pink-500 mx-auto mb-2" size={32} />
                <p className="text-sm text-gray-400">Tech Explorer</p>
              </div>
            </div>
          </div>

          {scrollY < 100 && (
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center">
                <ChevronDown size={24} className="text-blue-500" strokeWidth={3} />
                <ChevronDown size={24} className="text-blue-400 -mt-3" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                I'm a passionate Computer Science student with a love for coding in C++ and Java.
                When I'm not coding, you'll find me on the tennis court or immersed in fiction books.
                As an athlete, I bring the same discipline and dedication to my technical projects.
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <strong>Education:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-300 ml-4">
                  <li>B.Tech in CSE - Amrita Vishwa Vidyapeetham</li>
                  <li>BSc in Data Science - IIT Madras</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-500" size={20} />
                <a href="mailto:theegelavishnuvardhan22@gmail.com" className="text-gray-300 hover:text-white underline">
                  theegelavishnuvardhan22@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="text-blue-500" size={20} />
                <a href="https://github.com/vTg2208" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="text-blue-500" size={20} />
                <a href="https://www.linkedin.com/in/vishnu-vardhan-theegela-486710290/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white underline">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-500" size={20} />
                <a href="tel:+916302043223" className="text-gray-300 hover:text-white">
                  +91 6302043223
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill) => (
                  <span key={skill} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
                  <span key={tool} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill) => (
                  <span key={skill} className="bg-pink-600/20 text-pink-400 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.name} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://${project.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                >
                  <span>View Project</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Student Developer</h3>
              <p className="text-gray-400 mb-4">Amrita Vishwa Vidyapeetham • 2023 - Present</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Led development of university's event management system</li>
                <li>Collaborated with team of 5 developers on multiple projects</li>
                <li>Implemented responsive design patterns using React and Tailwind</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Contact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:theegelavishnuvardhan22@gmail.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Mail size={20} />
                  <span>theegelavishnuvardhan22@gmail.com</span>
                </a>
                <a
                  href="tel:+916302043223"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <Phone size={20} />
                  <span>+91 6302043223</span>
                </a>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
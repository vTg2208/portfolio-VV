import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, ArrowUpRight, Rocket, Code, BrainCircuit, Phone, Sun, Moon } from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Improved section detection logic
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      
      // Get all section elements and their positions
      const sectionPositions = sections.map(id => {
        const element = document.getElementById(id);
        if (!element) return { id, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY
        };
      });
      
      // Find the section that is currently in view
      // We check if scrollY is between the top of the section and the bottom
      // with a slight offset to improve usability
      const offset = 150; // Adjust this value as needed
      const currentSection = sectionPositions.find(section => 
        window.scrollY >= (section.top - offset) && 
        window.scrollY < (section.bottom - offset)
      );
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for saved theme preference in localStorage or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    tools: [ 'Git/GitHub', 'VS Code', 'Firebase', 'React/Node.js', 'MongoDB'],
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
      name: 'AmritaAttend',
      description: 'Attendance for faculty at Amrita Vishwa Vidyapeetham using phone fingerprint authentication.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL','Flutter'],
      link: 'https://github.com/vTg2208/AmritaAttend'
    },
    {
      name: 'VV-Verse',
      description: 'My personal portfolio showcasing my academic journey and expertise at Amrita Vishwa Vidyapeetham.',
      "tech": ["TypeScript", "Node.js", "Vite", "React", "Tailwind CSS"],
      link: 'https://github.com/vTg2208/portfolio-VV'
    }
  ];

  // Smooth scroll function for navigation links
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Adding offset to account for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  // Theme-dependent styles
  const themeStyles = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    navBackground: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    navText: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    navActiveBackground: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    navActiveText: isDarkMode ? 'text-white' : 'text-gray-900',
    sectionBackground: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    cardBackground: isDarkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    inputBackground: isDarkMode ? 'bg-gray-900' : 'bg-white',
    inputBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    secondaryText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    heroTerminal: isDarkMode ? 'bg-gray-900/80' : 'bg-white/90',
    skillTag: {
      technical: isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      tools: isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      soft: isDarkMode ? 'bg-pink-600/20 text-pink-400' : 'bg-pink-100 text-pink-700'
    },
    projectCard: isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    linkHover: isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} transition-colors duration-300`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      
      {/* Navigation */}
      <nav className={`fixed w-full ${themeStyles.navBackground} backdrop-blur z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">VTG</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex space-x-4 mr-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.name.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.name.toLowerCase()
                        ? `${themeStyles.navActiveBackground} ${themeStyles.navActiveText}`
                        : `${themeStyles.navText} hover:bg-gray-700`
                    }`}
                    aria-current={activeSection === item.name.toLowerCase() ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Theme Toggle - Desktop */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  onClick={(e) => scrollToSection(e, item.name.toLowerCase())}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.name.toLowerCase()
                      ? `${themeStyles.navActiveBackground} ${themeStyles.navActiveText}`
                      : `${themeStyles.navText} hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-white`
                  }`}
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
        className={`min-h-screen flex items-center justify-center relative overflow-hidden ${themeStyles.background}`}
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
          <div className={`border ${themeStyles.cardBorder} rounded-lg p-8 ${themeStyles.heroTerminal} backdrop-blur transition-colors duration-300`}>
            <div className={`flex items-center justify-between mb-6 border-b ${themeStyles.cardBorder} pb-2`}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm text-gray-500 font-mono">portfolio.tsx</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight py-3">
              Vishnu Vardhan Theegela
            </h1>
            
            <p className={`text-xl md:text-2xl ${themeStyles.secondaryText} mb-8`}>
              2nd year CSE Student at Amrita Vishwa Vidyapeetham
            </p>

            <div className="flex justify-center space-x-4 mb-8">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
              >
                <Code size={20} />
                <span>Contact Me</span>
              </a>
              <a 
                href="#projects" 
                onClick={(e) => scrollToSection(e, 'projects')}
                className={`border border-blue-600 hover:bg-blue-600/20 px-6 py-3 rounded-full transition-colors flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-blue-600'}`}
              >
                <Rocket size={20} />
                <span>View Projects</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} backdrop-blur animate-pulse`}>
                <Rocket className="text-blue-500 mx-auto mb-2" size={32} />
                <p className={themeStyles.secondaryText}>Problem Solver</p>
              </div>
              <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} backdrop-blur animate-pulse`} style={{ animationDelay: '0.2s' }}>
                <Code className="text-purple-500 mx-auto mb-2" size={32} />
                <p className={themeStyles.secondaryText}>Code Enthusiast</p>
              </div>
              <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} backdrop-blur animate-pulse`} style={{ animationDelay: '0.4s' }}>
                <BrainCircuit className="text-pink-500 mx-auto mb-2" size={32} />
                <p className={themeStyles.secondaryText}>Tech Explorer</p>
              </div>
            </div>
          </div>

          {scrollY < 100 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center">
                <ChevronDown size={24} className="text-blue-500" strokeWidth={3} />
                <ChevronDown size={24} className="text-blue-400 -mt-3" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${themeStyles.sectionBackground} pt-32 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                I'm a passionate Computer Science student with a love for coding in C++ and Java.
                When I'm not coding, you'll find me on the tennis court or immersed in fiction books.
                As an athlete, I bring the same discipline and dedication to my technical projects.
              </p>
              <div className="space-y-2">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Education:</strong>
                </p>
                <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ml-4`}>
                  <li>B.Tech in CSE - Amrita Vishwa Vidyapeetham</li>
                  <li>BSc in Data Science - IIT Madras</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="text-blue-500" size={20} />
                <a href="mailto:theegelavishnuvardhan22@gmail.com" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover} underline`}>
                  theegelavishnuvardhan22@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="text-blue-500" size={20} />
                <a href="https://github.com/vTg2208" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover} underline`}>
                  GitHub Profile
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpRight className="text-blue-500" size={20} />
                <a href="https://www.linkedin.com/in/vishnu-vardhan-theegela-486710290/" target="_blank" rel="noopener noreferrer" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover} underline`}>
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-blue-500" size={20} />
                <a href="tel:+916302043223" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover}`}>
                  +91 6302043223
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 ${themeStyles.background} pt-32 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map((skill) => (
                  <span key={skill} className={`${themeStyles.skillTag.technical} px-3 py-1 rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
                  <span key={tool} className={`${themeStyles.skillTag.tools} px-3 py-1 rounded-full text-sm`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill) => (
                  <span key={skill} className={`${themeStyles.skillTag.soft} px-3 py-1 rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${themeStyles.sectionBackground} pt-32 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.name} className={`${themeStyles.projectCard} rounded-lg p-6 border shadow-md transition-colors duration-300`}>
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className={`${themeStyles.secondaryText} mb-4`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className={`${themeStyles.skillTag.technical} px-3 py-1 rounded-full text-sm`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 flex items-center space-x-2"
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
      <section id="experience" className={`py-20 ${themeStyles.background} pt-32 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
          <div className="space-y-8">
            <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
              <h3 className="text-xl font-semibold mb-2">Mobile Application Developer</h3>
              <p className={`${themeStyles.secondaryText} mb-4`}>Sony SSUP Project • 2024 - Present</p>
              <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                <li>Collaborated with team of 5 developers</li>
                <li>Developing a mobile app that monitors vegetable status in a polyhouse with real-time temperature and humidity data</li>
                <li>Implemented responsive design patterns using Flutter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${themeStyles.sectionBackground} pt-32 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Contact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:theegelavishnuvardhan22@gmail.com"
                  className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover}`}
                >
                  <Mail size={20} />
                  <span>theegelavishnuvardhan22@gmail.com</span>
                </a>
                <a
                  href="tel:+916302043223"
                  className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} ${themeStyles.linkHover}`}
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
                  className={`w-full px-4 py-2 ${themeStyles.inputBackground} border ${themeStyles.inputBorder} rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full px-4 py-2 ${themeStyles.inputBackground} border ${themeStyles.inputBorder} rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className={`w-full px-4 py-2 ${themeStyles.inputBackground} border ${themeStyles.inputBorder} rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300`}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with theme attribution */}
      <footer className={`py-6 text-center ${themeStyles.secondaryText} transition-colors duration-300`}>
        <p>© 2024 Vishnu Vardhan Theegela | <span className="cursor-pointer underline" onClick={toggleTheme}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </span></p>
      </footer>
    </div>
  );
};

export default Portfolio;
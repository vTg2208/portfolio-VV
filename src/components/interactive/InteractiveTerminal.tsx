import React, { useState, useEffect, useRef } from 'react';
import { Terminal, User, Folder, FileText, Mail, Github, Linkedin } from 'lucide-react';
import { ThemeStyles } from '../../types';
import { CONTACT_INFO, PROJECTS, SKILLS, BLOG_INFO } from '../../constants';
import { scrollToSection } from '../../utils';

interface InteractiveTerminalProps {
  themeStyles: ThemeStyles;
  isDarkMode: boolean;
}

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ themeStyles, isDarkMode }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Welcome to Vishnu\'s Portfolio Terminal! Type "help" to see available commands.', type: 'output' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Available commands
  const commands = {
    help: () => [
      { text: 'Available commands:', type: 'output' as const },
      { text: '  whoami          - Display personal information', type: 'output' as const },
      { text: '  skills          - Show technical skills', type: 'output' as const },
      { text: '  projects        - List all projects', type: 'output' as const },
      { text: '  blogs           - Show Medium blog articles', type: 'output' as const },
      { text: '  contact         - Show contact information', type: 'output' as const },
      { text: '  experience      - Display work experience', type: 'output' as const },
      { text: '  clear           - Clear terminal screen', type: 'output' as const },
      { text: '  github          - Open GitHub profile', type: 'output' as const },
      { text: '  linkedin        - Open LinkedIn profile', type: 'output' as const },
      { text: '  medium          - Open Medium profile', type: 'output' as const }
    ],

    whoami: () => [
      { text: 'Vishnu Vardhan Theegela', type: 'output' as const },
      { text: 'CSE Undergrad at Amrita Vishwa Vidyapeetham', type: 'output' as const },
      { text: 'Passionate developer and problem solver', type: 'output' as const }
    ],

    skills: () => [
      { text: 'Technical Skills:', type: 'output' as const },
      { text: `  Languages: ${SKILLS.technical.join(', ')}`, type: 'output' as const },
      { text: `  Tools: ${SKILLS.tools.join(', ')}`, type: 'output' as const },
      { text: `  Soft Skills: ${SKILLS.soft.join(', ')}`, type: 'output' as const }
    ],

    projects: () => [
      { text: 'Featured Projects:', type: 'output' as const },
      ...PROJECTS.map(project => ({
        text: `  ${project.name} - ${project.description}`,
        type: 'output' as const
      }))
    ],

    contact: () => [
      { text: 'Contact Information:', type: 'output' as const },
      { text: `  Email: ${CONTACT_INFO.email}`, type: 'output' as const },
      { text: `  Phone: ${CONTACT_INFO.phone}`, type: 'output' as const },
      { text: '  GitHub: https://github.com/vTg2208', type: 'output' as const },
      { text: '  LinkedIn: https://www.linkedin.com/in/vishnu-vardhan-theegela-486710290/', type: 'output' as const }
    ],

    experience: () => [
      { text: 'Work Experience:', type: 'output' as const },
      { text: '  Mobile Application Developer - Sony SSUP Project (2024 - Present)', type: 'output' as const },
      { text: '  • Collaborated with team of 5 developers', type: 'output' as const },
      { text: '  • Developing IoT-based mobile app for polyhouse monitoring', type: 'output' as const }
    ],

    

    clear: () => [],

    github: () => {
      window.open(CONTACT_INFO.github, '_blank');
      return [{ text: 'Opening GitHub profile...', type: 'output' as const }];
    },

    linkedin: () => {
      window.open(CONTACT_INFO.linkedin, '_blank');
      return [{ text: 'Opening LinkedIn profile...', type: 'output' as const }];
    },

    blogs: () => [
    { text: 'Recent Blog Articles on Medium:', type: 'output' as const },
    { text: '', type: 'output' as const }, // Empty line for spacing
    ...BLOG_INFO.blogs.map((blog, index) => [
        { text: `${index + 1}. ${blog.title}`, type: 'output' as const },
        { text: `   ${blog.description}`, type: 'output' as const },
        { text: `   Published: ${new Date(blog.date).toLocaleDateString()} • ${blog.readTime}`, type: 'output' as const },
        { text: `   Tags: ${blog.tags.join(', ')}`, type: 'output' as const },
        { text: `   Link: ${blog.url}`, type: 'output' as const },
        { text: '', type: 'output' as const } // Empty line between blogs
    ]).flat(),
    { text: 'Type "medium" to open my Medium profile or click any blog link above!', type: 'output' as const }
    ],

    medium: () => {
    window.open(BLOG_INFO.medium_profile, '_blank');
    return [{ text: 'Opening Medium profile...', type: 'output' as const }];
    }
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const inputLine: TerminalLine = { text: `visitor@portfolio:~$ ${command}`, type: 'input' };

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[cmd as keyof typeof commands]) {
      const output = commands[cmd as keyof typeof commands]();
      setHistory(prev => [...prev, inputLine, ...output]);
    } else if (cmd === '') {
      setHistory(prev => [...prev, inputLine]);
    } else {
      setHistory(prev => [...prev, 
        inputLine,
        { text: `Command not found: ${command}. Type "help" for available commands.`, type: 'error' }
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'input': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'output': return isDarkMode ? 'text-gray-300' : 'text-gray-900';
      default: return isDarkMode ? 'text-gray-300' : 'text-gray-900';
    }
  };

  return (
    <div className={`border ${themeStyles.cardBorder} rounded-lg overflow-hidden ${themeStyles.heroTerminal} backdrop-blur transition-colors duration-300`}>
      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${themeStyles.cardBorder} ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/80'}`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <Terminal size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            portfolio-terminal
          </span>
        </div>
        <div className={`text-xs font-mono ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          Interactive Mode
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 font-mono text-sm h-80 overflow-y-auto cursor-text"
        onClick={handleTerminalClick}
      >
        {/* Command History */}
        <div className="space-y-1">
          {history.map((line, index) => (
            <div key={index} className={`${getLineColor(line.type)} whitespace-pre-wrap break-words`}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Current Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-green-400 mr-2">visitor@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            className={`
              flex-1 bg-transparent outline-none
              ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}
              caret-green-400
            `}
            placeholder="Type a command..."
            autoFocus
          />
          <span className="animate-pulse text-green-400 ml-1">|</span>
        </form>
      </div>

      {/* Quick Command Buttons (Optional) */}
      <div className={`px-4 py-2 border-t ${themeStyles.cardBorder} ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50/80'}`}>
        <div className="flex flex-wrap gap-2">
          {['help', 'skills', 'projects','blogs', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setCurrentInput(cmd);
                executeCommand(cmd);
                setCurrentInput('');
              }}
              className={`
                px-2 py-1 text-xs rounded
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }
                transition-colors
              `}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

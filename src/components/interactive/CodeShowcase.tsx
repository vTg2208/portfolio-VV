import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';
import { ThemeStyles } from '../../types';

interface CodeShowcaseProps {
  themeStyles: ThemeStyles;
}

export const CodeShowcase: React.FC<CodeShowcaseProps> = ({ themeStyles }) => {
  const [activeFile, setActiveFile] = useState('hooks.ts');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const codeFiles = {
    'hooks.ts': `// Custom React Hook for Theme Management
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
  }, []);
  
  const toggle = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };
  
  return { isDark, toggle };
};`,

    'utils.ts': `// Utility Functions for Smooth Interactions
export const scrollToSection = (
  e: MouseEvent, 
  sectionId: string
) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  
  if (element) {
    const offset = element.offsetTop - 80;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
};

export const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  };
};`,

    'components.tsx': `// Modern React Component with TypeScript
import React, { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface ContactProps {
  onSubmit: (data: FormData) => void;
}

export const ContactForm: React.FC<ContactProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form implementation */}
    </form>
  );
};`
  };

  const copyToClipboard = async (code: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedFile(fileName);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`${themeStyles.cardBackground} rounded-lg overflow-hidden border ${themeStyles.cardBorder} shadow-lg`}>
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-400" />
          <span className="text-white text-sm font-medium">Code Showcase</span>
        </div>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* File Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 flex space-x-1">
        {Object.keys(codeFiles).map((fileName) => (
          <button
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={`
              px-4 py-2 text-sm rounded-t-lg transition-colors relative
              ${activeFile === fileName 
                ? 'bg-gray-900 text-white border-t-2 border-blue-500' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }
            `}
          >
            {fileName}
            {activeFile === fileName && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => copyToClipboard(codeFiles[activeFile as keyof typeof codeFiles], activeFile)}
            className={`
              flex items-center space-x-2 px-3 py-1 rounded 
              ${copiedFile === activeFile 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } 
              transition-colors text-sm
            `}
          >
            {copiedFile === activeFile ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="bg-gray-900 p-6 text-sm overflow-x-auto text-gray-300 leading-relaxed">
          <code className="language-typescript">
            {codeFiles[activeFile as keyof typeof codeFiles]}
          </code>
        </pre>
      </div>

      {/* Footer */}
      <div className={`${themeStyles.cardBackground} px-4 py-2 border-t ${themeStyles.cardBorder}`}>
        <p className={`text-xs ${themeStyles.secondaryText}`}>
          💡 This portfolio uses modern React patterns, TypeScript, and Tailwind CSS
        </p>
      </div>
    </div>
  );
};
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isMobile?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  isDarkMode, 
  toggleTheme, 
  isMobile = false 
}) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${
        isMobile ? 'w-full text-left' : ''
      }`}
      aria-label="Toggle theme"
    >
      <div className={`flex items-center ${isMobile ? 'space-x-3' : ''}`}>
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        {isMobile && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
      </div>
    </button>
  );
};

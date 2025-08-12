import React from 'react';
import { ThemeStyles } from '../../types';

interface FooterProps {
  themeStyles: ThemeStyles;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ themeStyles, isDarkMode, toggleTheme }) => {
  return (
    <footer className={`py-6 text-center ${themeStyles.secondaryText} transition-colors duration-300`}>
      <p>
        © 2024 Vishnu Vardhan Theegela | 
        <span className="cursor-pointer underline ml-1" onClick={toggleTheme}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </span>
      </p>
    </footer>
  );
};

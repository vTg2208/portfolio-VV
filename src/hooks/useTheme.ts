import { useState, useEffect } from 'react';
import { ThemeStyles } from '../types';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeStyles = (): ThemeStyles => ({
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    navBackground: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    navText: isDarkMode ? 'text-gray-300' : 'text-gray-800',
    navActiveBackground: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    navActiveText: isDarkMode ? 'text-white' : 'text-gray-900',
    sectionBackground: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
    cardBackground: isDarkMode ? 'bg-gray-800' : 'bg-white/80',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    inputBackground: isDarkMode ? 'bg-gray-900' : 'bg-white',
    inputBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    secondaryText: isDarkMode ? 'text-gray-400' : 'text-gray-800',
    heroTerminal: isDarkMode ? 'bg-gray-900/80' : 'bg-white/90',
    skillTag: {
      technical: isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700',
      tools: isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700',
      soft: isDarkMode ? 'bg-pink-600/20 text-pink-400' : 'bg-pink-100 text-pink-700'
    },
    projectCard: isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    linkHover: isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'
  });

  return {
    isDarkMode,
    toggleTheme,
    themeStyles: getThemeStyles()
  };
};
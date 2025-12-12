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
    background: isDarkMode ? 'bg-slate-950' : 'bg-slate-50',
    text: isDarkMode ? 'text-slate-100' : 'text-slate-900',
    navBackground: isDarkMode ? 'bg-slate-950/95' : 'bg-white/95',
    navText: isDarkMode ? 'text-slate-300' : 'text-slate-800',
    navActiveBackground: isDarkMode ? 'bg-slate-800' : 'bg-slate-200',
    navActiveText: isDarkMode ? 'text-white' : 'text-slate-900',
    sectionBackground: isDarkMode ? 'bg-slate-900' : 'bg-slate-100',
    cardBackground: isDarkMode ? 'bg-slate-900' : 'bg-white/80',
    cardBorder: isDarkMode ? 'border-slate-800' : 'border-slate-200',
    inputBackground: isDarkMode ? 'bg-slate-950' : 'bg-white',
    inputBorder: isDarkMode ? 'border-slate-800' : 'border-slate-300',
    secondaryText: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    heroTerminal: isDarkMode ? 'bg-slate-900/80' : 'bg-white/90',
    skillTag: {
      technical: isDarkMode ? 'bg-cyan-900/30 text-cyan-300' : 'bg-cyan-100 text-cyan-700',
      tools: isDarkMode ? 'bg-violet-900/30 text-violet-300' : 'bg-violet-100 text-violet-700',
      soft: isDarkMode ? 'bg-fuchsia-900/30 text-fuchsia-300' : 'bg-fuchsia-100 text-fuchsia-700'
    },
    projectCard: isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    linkHover: isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'
  });

  return {
    isDarkMode,
    toggleTheme,
    themeStyles: getThemeStyles()
  };
};
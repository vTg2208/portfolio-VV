import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeStyles } from '../../types';
import { NAVIGATION_ITEMS } from '../../constants';
import { scrollToSection } from '../../utils';
import PillNav from '../ui/PillNav';

interface NavigationProps {
  activeSection: string;
  themeStyles: ThemeStyles;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  themeStyles,
  isDarkMode,
  toggleTheme,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Remove the '#' if present for the section ID lookup
    const targetId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    scrollToSection(e, targetId);
  };

  const navItems = NAVIGATION_ITEMS.map(item => ({
    label: item.name,
    href: item.href
  }));

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center gap-4">
        <PillNav
          items={navItems}
          activeHref={`#${activeSection}`}
          onItemClick={handleNavClick}
          baseColor={isDarkMode ? '#0f172a' : '#ffffff'}
          hoverColor={isDarkMode ? '#ffffff' : '#000000'}
          pillColor={isDarkMode ? '#1e293b' : '#f1f5f9'}
          pillTextColor={isDarkMode ? '#e2e8f0' : '#334155'}
          hoveredPillTextColor={isDarkMode ? '#000000' : '#ffffff'}
          className="shadow-lg rounded-full"
        />
        <div className={`p-1 rounded-full ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-lg`}>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
};

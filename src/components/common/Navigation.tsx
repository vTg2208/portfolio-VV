import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeStyles } from '../../types';
import { NAVIGATION_ITEMS } from '../../constants';
import { scrollToSection } from '../../utils';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    scrollToSection(e, sectionId, () => setIsMenuOpen(false));
  };

  return (
    <nav className={`fixed w-full ${themeStyles.navBackground} backdrop-blur z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">VTG</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-4 mr-4">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
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

            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            
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
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
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
  );
};

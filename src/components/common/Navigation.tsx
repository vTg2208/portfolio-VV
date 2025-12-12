import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeStyles } from '../../types';
import { NAVIGATION_ITEMS } from '../../constants';
import { scrollToSection } from '../../utils';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavToggle,
  MobileNavMenu,
} from '../ui/ResizableNavbar';

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

  const navItems = NAVIGATION_ITEMS.map(item => ({
    name: item.name,
    link: item.href
  }));

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">VTG</span>
        </NavbarLogo>
        
        <NavItems 
            items={navItems} 
            activeItem={activeSection} 
            onItemClick={handleNavClick} 
        />

        <div className="hidden md:flex items-center gap-3">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </div>

        <MobileNav>
            <div className="mr-2">
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
            <MobileNavToggle isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </MobileNav>
      </NavBody>

      <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        {navItems.map((item) => (
            <a
            key={item.name}
            href={item.link}
            onClick={(e) => handleNavClick(e, item.name.toLowerCase())}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.name.toLowerCase()
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
            }`}
            >
            {item.name}
            </a>
        ))}
      </MobileNavMenu>
    </Navbar>
  );
};

import React, { useState } from 'react';
import { Plus, Download, Github, Linkedin, Mail, X } from 'lucide-react';
import { ThemeStyles } from '../../types';
import { CONTACT_INFO } from '../../constants';
import { scrollToSection } from '../../utils';

interface FloatingMenuProps {
  themeStyles: ThemeStyles;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ themeStyles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      icon: Download, 
      label: 'Download CV', 
      action: () => {
        // You can replace this with your actual CV download link
        window.open('/cv.pdf', '_blank');
      },
      color: 'bg-green-600 hover:bg-green-700'
    },
    { 
      icon: Github, 
      label: 'View GitHub', 
      action: () => window.open(CONTACT_INFO.github, '_blank'),
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    { 
      icon: Linkedin, 
      label: 'Connect', 
      action: () => window.open(CONTACT_INFO.linkedin, '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      icon: Mail, 
      label: 'Email Me', 
      action: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection(e as any, 'contact');
        setIsOpen(false);
      },
      color: 'bg-purple-600 hover:bg-purple-700'
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div className={`flex flex-col-reverse space-y-3 space-y-reverse mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {menuItems.map((item, index) => (
          <div
            key={item.label}
            className="relative group"
            style={{ 
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              transition: 'all 0.3s ease-out'
            }}
          >
            {/* Tooltip */}
            <div className={`
              absolute right-full mr-3 top-1/2 transform -translate-y-1/2
              ${themeStyles.cardBackground} border ${themeStyles.cardBorder}
              px-3 py-2 rounded-lg whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none
            `}>
              <span className="text-sm">{item.label}</span>
              {/* Arrow */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-700" />
            </div>

            {/* Menu Item */}
            <button
              onClick={item.action}
              className={`
                ${item.color} text-white p-3 rounded-full shadow-lg 
                transition-all duration-300 transform
                hover:scale-110 hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              aria-label={item.label}
            >
              <item.icon size={20} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg 
          transition-all duration-300 transform
          ${isOpen ? 'rotate-45 bg-red-600 hover:bg-red-700' : 'hover:scale-110'}
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { SCROLL_CONFIG } from '../constants';

export const useScrollSpy = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          
          const sectionPositions = sections.map(id => {
            const element = document.getElementById(id);
            if (!element) return { id, top: 0, bottom: 0 };
            
            const rect = element.getBoundingClientRect();
            return {
              id,
              top: rect.top + window.scrollY,
              bottom: rect.bottom + window.scrollY
            };
          });
          
          const currentSection = sectionPositions.find(section => 
            window.scrollY >= (section.top - SCROLL_CONFIG.OFFSET) && 
            window.scrollY < (section.bottom - SCROLL_CONFIG.OFFSET)
          ) || sectionPositions.find(section => 
            Math.abs(window.scrollY - section.top) < SCROLL_CONFIG.OFFSET
          );
          
          if (currentSection) {
            setActiveSection(currentSection.id);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return { activeSection, scrollY };
};
import React from 'react';
import { Mail, ArrowUpRight, Phone } from 'lucide-react';
import { CodeShowcase } from '../interactive/CodeShowcase'; // ADD THIS IMPORT
import { ThemeStyles } from '../../types';
import { CONTACT_INFO } from '../../constants';

interface AboutProps {
  themeStyles: ThemeStyles;
}

export const About: React.FC<AboutProps> = ({ themeStyles }) => {
  return (
    <section id="about" className={`py-20 ${themeStyles.sectionBackground} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12"> {/* ADD mb-12 */}
          <div>
            <p className={`${themeStyles.secondaryText} mb-4`}>
              I'm a passionate Computer Science student with a love for coding in C++ and Java.
              When I'm not coding, you'll find me on the tennis court or immersed in fiction books.
              As an athlete, I bring the same discipline and dedication to my technical projects.
            </p>
            <div className="space-y-2">
              <p className={themeStyles.secondaryText}>
                <strong>Education:</strong>
              </p>
              <ul className={`list-disc list-inside ${themeStyles.secondaryText} ml-4`}>
                <li>B.Tech in CSE - Amrita Vishwa Vidyapeetham</li>
                <li>BSc in Data Science - IIT Madras</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-500" size={20} />
              <a 
                href={`mailto:${CONTACT_INFO.email}`} 
                className={`${themeStyles.secondaryText} ${themeStyles.linkHover} underline`}
              >
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <ArrowUpRight className="text-blue-500" size={20} />
              <a 
                href={CONTACT_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${themeStyles.secondaryText} ${themeStyles.linkHover} underline`}
              >
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <ArrowUpRight className="text-blue-500" size={20} />
              <a 
                href={CONTACT_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${themeStyles.secondaryText} ${themeStyles.linkHover} underline`}
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-blue-500" size={20} />
              <a 
                href={`tel:${CONTACT_INFO.phone}`} 
                className={`${themeStyles.secondaryText} ${themeStyles.linkHover}`}
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
        
        {/* ADD THIS NEW SECTION */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Code Showcase</h3>
          <CodeShowcase themeStyles={themeStyles} />
        </div>
      </div>
    </section>
  );
};

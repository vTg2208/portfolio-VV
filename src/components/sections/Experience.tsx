import React from 'react';
import { ThemeStyles } from '../../types';

interface ExperienceProps {
  themeStyles: ThemeStyles;
}

export const Experience: React.FC<ExperienceProps> = ({ themeStyles }) => {
  return (
    <section id="experience" className={`py-20 ${themeStyles.background} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
        <div className="space-y-8">
          <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
            <h3 className="text-xl font-semibold mb-2">Mobile Application Developer</h3>
            <p className={`${themeStyles.secondaryText} mb-4`}>Sony SSUP Project • 2024 - Present</p>
            <ul className={`list-disc list-inside ${themeStyles.secondaryText} space-y-2`}>
              <li>Collaborated with team of 5 developers</li>
              <li>Developing a mobile app that monitors vegetable status in a polyhouse with real-time temperature and humidity data</li>
              <li>Implemented responsive design patterns using Flutter</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

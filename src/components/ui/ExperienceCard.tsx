import React from 'react';
import { ThemeStyles } from '../../types';

interface ExperienceData {
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceCardProps {
  experience: ExperienceData;
  themeStyles: ThemeStyles;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, themeStyles }) => {
  return (
    <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
      <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
      <p className={`${themeStyles.secondaryText} mb-4`}>
        {experience.company} • {experience.duration}
      </p>
      
      <ul className={`list-disc list-inside ${themeStyles.secondaryText} space-y-2 mb-4`}>
        {experience.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span 
              key={tech} 
              className={`${themeStyles.skillTag.technical} px-3 py-1 rounded-full text-sm`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

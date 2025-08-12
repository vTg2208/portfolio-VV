import React from 'react';
import { ThemeStyles } from '../../types';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  themeStyles: ThemeStyles;
  category: 'technical' | 'tools' | 'soft';
}

export const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  skills, 
  themeStyles, 
  category 
}) => {
  return (
    <div className={`${themeStyles.cardBackground} p-6 rounded-lg shadow-md transition-colors duration-300`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className={`${themeStyles.skillTag[category]} px-3 py-1 rounded-full text-sm`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

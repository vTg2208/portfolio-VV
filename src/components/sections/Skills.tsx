import React from 'react';
import { SkillCategory } from '../ui/SkillCategory';
import { ThemeStyles } from '../../types';
import { SKILLS } from '../../constants';

interface SkillsProps {
  themeStyles: ThemeStyles;
}

export const Skills: React.FC<SkillsProps> = ({ themeStyles }) => {
  return (
    <section id="skills" className={`py-20 ${themeStyles.background} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <SkillCategory
            title="Technical Skills"
            skills={SKILLS.technical}
            themeStyles={themeStyles}
            category="technical"
          />
          <SkillCategory
            title="Tools & Technologies"
            skills={SKILLS.tools}
            themeStyles={themeStyles}
            category="tools"
          />
          <SkillCategory
            title="Soft Skills"
            skills={SKILLS.soft}
            themeStyles={themeStyles}
            category="soft"
          />
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ProjectFolders } from '../ui/ProjectFolder';
import { ThemeStyles } from '../../types';
import { PROJECTS } from '../../constants';

interface ProjectsProps {
  themeStyles: ThemeStyles;
}

export const Projects: React.FC<ProjectsProps> = ({ themeStyles }) => {
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <section id="projects" className={`py-20 ${themeStyles.sectionBackground} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        <ProjectFolders projects={PROJECTS} isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

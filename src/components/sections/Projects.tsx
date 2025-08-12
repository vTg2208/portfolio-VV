import React from 'react';
import { ProjectTimeline } from '../ui/ProjectTimeline';
import { ThemeStyles } from '../../types';
import { PROJECTS } from '../../constants';

interface ProjectsProps {
  themeStyles: ThemeStyles;
}

export const Projects: React.FC<ProjectsProps> = ({ themeStyles }) => {
  return (
    <section id="projects" className={`py-20 ${themeStyles.sectionBackground} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        <ProjectTimeline projects={PROJECTS} themeStyles={themeStyles} />
      </div>
    </section>
  );
};

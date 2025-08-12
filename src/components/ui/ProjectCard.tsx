import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project, ThemeStyles } from '../../types';
import { useMagneticEffect } from '../../hooks/useMagneticEffect'; // ADD THIS IMPORT

interface ProjectCardProps {
  project: Project;
  themeStyles: ThemeStyles;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, themeStyles }) => {
  const magneticRef = useMagneticEffect(0.3); // ADD THIS LINE

  return (
    <div 
      ref={magneticRef} // ADD THIS REF
      className={`${themeStyles.projectCard} rounded-lg p-6 border shadow-md transition-colors duration-300 hover:shadow-xl cursor-pointer group`}
    >
      {/* Keep all existing content exactly the same */}
      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
      <p className={`${themeStyles.secondaryText} mb-4`}>{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span key={tech} className={`${themeStyles.skillTag.technical} px-3 py-1 rounded-full text-sm`}>
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-400 flex items-center space-x-2"
      >
        <span>View Project</span>
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
};

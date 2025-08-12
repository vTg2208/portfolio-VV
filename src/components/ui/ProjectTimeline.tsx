import React from 'react';
import { ArrowUpRight, Calendar, Code, ExternalLink } from 'lucide-react';
import { Project, ThemeStyles } from '../../types';
import { use3DTilt } from '../../hooks/use3DTilt';

interface ProjectTimelineProps {
  projects: Project[];
  themeStyles: ThemeStyles;
}

interface TimelineItemProps {
  project: Project;
  index: number;
  themeStyles: ThemeStyles;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ project, index, themeStyles }) => {
  const { ref } = use3DTilt({ maxTilt: 10, scale: 1.02 });
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'} mb-12`}>
      {/* Timeline Line Connector */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
      
      {/* Timeline Node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 z-10" />
      
      {/* Project Card */}
      <div 
        ref={ref}
        className={`
          w-full max-w-md mx-8
          ${themeStyles.cardBackground} border ${themeStyles.cardBorder}
          rounded-lg p-6 shadow-lg transition-all duration-300
          hover:shadow-xl group cursor-pointer
          ${isEven ? 'ml-auto mr-0' : 'mr-auto ml-0'}
        `}
        onClick={() => window.open(project.link, '_blank')}
      >
        {/* Project Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors">
              {project.name}
            </h3>
            <div className={`flex items-center space-x-2 text-sm ${themeStyles.secondaryText}`}>
              <Calendar size={14} />
              <span>Project #{index + 1}</span>
            </div>
          </div>
          <ExternalLink 
            size={20} 
            className={`${themeStyles.secondaryText} group-hover:text-blue-500 transition-colors`} 
          />
        </div>

        {/* Project Description */}
        <p className={`${themeStyles.secondaryText} mb-4 leading-relaxed`}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className={`flex items-center space-x-2 mb-2 text-sm ${themeStyles.secondaryText}`}>
            <Code size={14} />
            <span>Technologies:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className={`${themeStyles.skillTag.technical} px-3 py-1 rounded-full text-xs`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* View Project Link */}
        <div className="flex items-center justify-between">
          <span className="text-blue-500 hover:text-blue-400 flex items-center space-x-1 text-sm font-medium">
            <span>View Project</span>
            <ArrowUpRight size={14} />
          </span>
          
          {/* Project Status */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`text-xs ${themeStyles.secondaryText}`}>Live</span>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects, themeStyles }) => {
  return (
    <div className="relative">
      {/* Main Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
      
      {/* Timeline Items */}
      <div className="relative">
        {projects.map((project, index) => (
          <TimelineItem
            key={project.name}
            project={project}
            index={index}
            themeStyles={themeStyles}
          />
        ))}
      </div>

      {/* Timeline End Cap */}
      <div className="relative flex justify-center">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-900" />
      </div>
    </div>
  );
};
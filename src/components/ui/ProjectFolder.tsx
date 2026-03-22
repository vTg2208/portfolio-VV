import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Github } from 'lucide-react';

interface FolderProject {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  color?: string;
}

interface ProjectFolderProps {
  project: FolderProject;
  index: number;
  isDarkMode: boolean;
}

export const ProjectFolder: React.FC<ProjectFolderProps> = ({ project, index, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const folderColors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#10b981', // green
    '#f59e0b', // amber
  ];

  const color = project.color || folderColors[index % folderColors.length];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
    >
      <div className="relative w-full h-64 cursor-pointer perspective-1000">
        {/* Folder Base */}
        <motion.div
          className={`absolute inset-0 rounded-lg overflow-hidden ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
          } backdrop-blur-sm border ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          } shadow-lg`}
          animate={{
            rotateX: isOpen ? -10 : 0,
            z: isOpen ? 20 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Folder Tab */}
          <div
            className="h-8 w-24 rounded-t-lg"
            style={{ backgroundColor: color }}
          />

          {/* Content */}
          <div className="h-[calc(100%-2rem)] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <Folder size={32} style={{ color }} />
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-200/80'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-gray-200/80'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
                  </a>
                )}
              </div>
            </div>

            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {project.name}
            </h3>

            <div className="relative flex-1 min-h-0">
              <div className="h-full overflow-y-auto pr-2 pb-6">
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode
                          ? 'bg-slate-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-2 h-10 ${
                  isDarkMode
                    ? 'bg-gradient-to-t from-slate-800/95 to-transparent'
                    : 'bg-gradient-to-t from-white/95 to-transparent'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Paper layers inside folder */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-lg ${
                  isDarkMode ? 'bg-slate-700/30' : 'bg-gray-50/30'
                } -z-10`}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -5, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className={`absolute inset-0 rounded-lg ${
                  isDarkMode ? 'bg-slate-600/20' : 'bg-gray-100/20'
                } -z-20`}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -10, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface ProjectFoldersProps {
  projects: FolderProject[];
  isDarkMode: boolean;
}

export const ProjectFolders: React.FC<ProjectFoldersProps> = ({ projects, isDarkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectFolder
          key={index}
          project={project}
          index={index}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

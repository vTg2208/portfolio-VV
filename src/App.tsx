import React from 'react';
import { Navigation } from './components/common/Navigation';
import { ScrollProgress } from './components/common/ScrollProgress';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { GitHubActivity } from './components/sections/GitHubActivity';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/common/Footer';
import { FloatingMenu } from './components/common/FloatingMenu';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Blogs } from './components/sections/Blogs';

const Portfolio: React.FC = () => {
  const { isDarkMode, toggleTheme, themeStyles } = useTheme();
  const { activeSection, scrollY } = useScrollSpy(['home', 'about', 'skills', 'projects', 'experience', 'blogs', 'github', 'contact']);

  return (
    <div className={`min-h-screen ${themeStyles.background} ${themeStyles.text} transition-colors duration-300`}>
      <ScrollProgress />
      
      <Navigation 
        activeSection={activeSection}
        themeStyles={themeStyles}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <Hero themeStyles={themeStyles} scrollY={scrollY} isDarkMode={isDarkMode}/>
      <About themeStyles={themeStyles} />
      <Skills themeStyles={themeStyles} />
      <Projects themeStyles={themeStyles} />
      <Experience themeStyles={themeStyles} />
      <Blogs themeStyles={themeStyles} />
      <GitHubActivity themeStyles={themeStyles} />
      <Contact themeStyles={themeStyles} />
      <Footer themeStyles={themeStyles} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <FloatingMenu themeStyles={themeStyles} />
    </div>
  );
};

export default Portfolio;

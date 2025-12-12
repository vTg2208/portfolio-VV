import React from 'react';
import { ChevronDown, Code, Rocket, BrainCircuit } from 'lucide-react';
import { GridScanBackground } from '../common/GridScanBackground';
import { InteractiveTerminal } from '../interactive/InteractiveTerminal';
import { FlipText } from '../ui/FlipText';
import { ThemeStyles } from '../../types';
import { scrollToSection } from '../../utils';

interface HeroProps {
  themeStyles: ThemeStyles;
  scrollY: number;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ themeStyles, scrollY, isDarkMode }) => {
  const roles = ['Problem Solver', 'Code Enthusiast', 'Tech Explorer'];

  return (
    <section 
      id="home" 
      className={`min-h-screen flex flex-col relative overflow-hidden ${themeStyles.background}`}
      style={{ transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)` }}
    >
      <GridScanBackground />
      
      {/* Top Section - Name and Subtitle */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight py-3">
            Vishnu Vardhan Theegela
          </h1>
          
          {/* Animated role text */}
          <div className="text-xl md:text-2xl mb-4 flex items-center justify-center gap-2">
            <span className={`${isDarkMode ? themeStyles.secondaryText : 'text-gray-800'}`}>
              I'm a
            </span>
            <div className={`
              px-4 py-2.5 rounded-2xl min-w-[180px] inline-flex items-center justify-center
              backdrop-blur-xl
              ${isDarkMode 
                ? 'bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' 
                : 'bg-white/90 border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
              }
              hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.3)] hover:border-blue-400/50 transition-all duration-300
            `}>
              <FlipText
                words={roles}
                interval={2500}
                textClassName="font-semibold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                animationDuration={600}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Terminal and Content */}
      <div className="flex-1 flex items-end pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Interactive Terminal */}
          <div className="mb-8">
            <InteractiveTerminal themeStyles={themeStyles} isDarkMode={isDarkMode} />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2"
            >
              <Code size={20} />
              <span>Contact Me</span>
            </a>
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`border border-blue-600 hover:bg-blue-600/20 px-6 py-3 rounded-full transition-colors flex items-center space-x-2 text-blue-600`}
            >
              <Rocket size={20} />
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ChevronDown, Code, Rocket, BrainCircuit } from 'lucide-react';
import DotGrid from '../common/DotGrid';
import { InteractiveTerminal } from '../interactive/InteractiveTerminal';
import GlassSurface from '../ui/GlassSurface';
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
      <DotGrid
        dotSize={5}
        gap={24}
        baseColor={isDarkMode ? "#ffffff" : "#000000"}
        style={{ position: 'absolute', inset: 0, opacity: 0.15 }}
      />
      
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
            <GlassSurface
              borderRadius={35}
              borderWidth={0.1}
              backgroundOpacity={0}
              opacity={0}
              width="auto"
              height="auto"
              className="px-4 py-2.5 min-w-[180px] inline-flex items-center justify-center border-2 border-white/10 hover:border-blue-400/60 transition-all duration-300"
            >
              <FlipText
                words={roles}
                interval={2500}
                animationDuration={600}
              />
            </GlassSurface>
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

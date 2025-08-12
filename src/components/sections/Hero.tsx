import React from 'react';
import { ChevronDown, Code, Rocket, BrainCircuit } from 'lucide-react';
import { AnimatedBackground } from '../common/AnimatedBackground';
import { InteractiveTerminal } from '../interactive/InteractiveTerminal';
import { ThemeStyles } from '../../types';
import { scrollToSection } from '../../utils';

interface HeroProps {
  themeStyles: ThemeStyles;
  scrollY: number;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ themeStyles, scrollY, isDarkMode }) => {
  return (
    <section 
      id="home" 
      className={`min-h-screen flex flex-col relative overflow-hidden ${themeStyles.background}`}
      style={{ transform: `translateY(${Math.min(scrollY * 0.5, 100)}px)` }}
    >
      <AnimatedBackground />
      
      {/* Top Section - Name and Subtitle */}
      <div className="relative z-10 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight py-3">
            Vishnu Vardhan Theegela
          </h1>
          
          {/* <p className={`text-xl md:text-2xl ${isDarkMode ? themeStyles.secondaryText : 'text-gray-800'} mb-4`}>
            CSE Undergrad from Amrita Vishwa Vidyapeetham
          </p> */}

          {/* Quick intro badges */}
          {/* <div className="flex justify-center space-x-4 flex-wrap">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Problem Solver
            </span>
            <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              Code Enthusiast
            </span>
            <span className="bg-pink-600/20 text-pink-400 px-3 py-1 rounded-full text-sm">
              Tech Explorer
            </span>
          </div> */}
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

          {/* Feature Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${themeStyles.cardBackground} backdrop-blur flex flex-col items-center text-center`}>
                <Rocket className={`${isDarkMode ? 'text-blue-500' : 'text-blue-600'} mx-auto mb-2`} size={32} />
                <p className={`${themeStyles.secondaryText} text-sm font-medium`}>Problem Solver</p>
            </div>
            <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${themeStyles.cardBackground} backdrop-blur flex flex-col items-center text-center`}>
                <Code className={`${isDarkMode ? 'text-purple-500' : 'text-purple-600'} mx-auto mb-2`} size={32} />
                <p className={`${themeStyles.secondaryText} text-sm font-medium`}>Code Enthusiast</p>
            </div>
            <div className={`p-4 border ${themeStyles.cardBorder} rounded-lg ${themeStyles.cardBackground} backdrop-blur flex flex-col items-center text-center`}>
                <BrainCircuit className={`${isDarkMode ? 'text-pink-500' : 'text-pink-600'} mx-auto mb-2`} size={32} />
                <p className={`${themeStyles.secondaryText} text-sm font-medium`}>Tech Explorer</p>
            </div>
          </div>

          {/* Scroll Indicator */}
          {scrollY < 100 && (
            <div className="flex justify-center">
              <div className="animate-bounce">
                <div className="flex flex-col items-center">
                  <ChevronDown size={24} className="text-blue-500" strokeWidth={3} />
                  <ChevronDown size={24} className="text-blue-400 -mt-3" strokeWidth={3} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

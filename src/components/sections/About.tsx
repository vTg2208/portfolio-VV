import React from 'react';
import { ThemeStyles } from '../../types';

interface AboutProps {
  themeStyles: ThemeStyles;
}

export const About: React.FC<AboutProps> = ({ themeStyles }) => {
  return (
    <section id="about" className={`py-20 ${themeStyles.sectionBackground} pt-40 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl mb-8">
          <span className="font-bold">About </span>
          <span className="text-blue-600 font-extrabold italic">me</span>
        </h2>
        <div className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div>
              <p className={`${themeStyles.secondaryText} mb-4`}>
                I'm a passionate Computer Science student with a love for coding in C++ and Java.
                When I'm not coding, you'll find me on the tennis court or immersed in fiction books.
                As an athlete, I bring the same discipline and dedication to my technical projects.
              </p>
              <div className="space-y-2">
                <p className={themeStyles.secondaryText}>
                  <strong>Education:</strong>
                </p>
                <ul className={`list-disc list-inside ${themeStyles.secondaryText} ml-4`}>
                  <li>B.Tech in CSE - Amrita Vishwa Vidyapeetham</li>
                  <li>BSc in Data Science - IIT Madras</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center -ml-16">
              <img 
                src="/about_me.png" 
                alt="About me" 
                className="rounded-lg max-w-md w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

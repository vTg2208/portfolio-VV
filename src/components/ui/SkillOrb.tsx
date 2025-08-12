import React, { useState } from 'react';
import { ThemeStyles } from '../../types';

interface SkillOrbProps {
  skill: string;
  level: number;
  category: 'technical' | 'tools' | 'soft';
  themeStyles: ThemeStyles;
}

export const SkillOrb: React.FC<SkillOrbProps> = ({ skill, level, category, themeStyles }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCategoryColor = () => {
    switch (category) {
      case 'technical': return 'blue';
      case 'tools': return 'purple';
      case 'soft': return 'pink';
      default: return 'blue';
    }
  };

  const color = getCategoryColor();
  const circumference = 2 * Math.PI * 36;
  const strokeDasharray = `${(level / 100) * circumference} ${circumference}`;

  return (
    <div 
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Orb */}
      <div className={`
        relative w-24 h-24 rounded-full border-4 border-${color}-500 
        flex items-center justify-center
        transition-all duration-300 transform
        ${isHovered ? 'scale-110 shadow-2xl shadow-' + color + '-500/50' : ''}
        bg-gray-800/50 backdrop-blur
      `}>
        <span className="text-xs font-bold text-center leading-tight px-2">
          {skill}
        </span>
      </div>
      
      {/* Progress Ring */}
      <svg className="absolute inset-0 w-24 h-24 -rotate-90 pointer-events-none">
        <circle
          cx="48" cy="48" r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          className={`text-${color}-500 transition-all duration-1000 opacity-70`}
          strokeLinecap="round"
        />
      </svg>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className={`
          absolute top-full mt-3 left-1/2 transform -translate-x-1/2
          ${themeStyles.cardBackground} border ${themeStyles.cardBorder}
          px-3 py-2 rounded-lg shadow-lg z-10
          transition-all duration-200
        `}>
          <div className="text-center">
            <div className="text-sm font-semibold">{skill}</div>
            <div className={`text-xs ${themeStyles.secondaryText}`}>
              Proficiency: {level}%
            </div>
          </div>
          {/* Tooltip Arrow */}
          <div className={`
            absolute bottom-full left-1/2 transform -translate-x-1/2
            w-0 h-0 border-l-4 border-r-4 border-b-4
            border-transparent border-b-gray-700
          `} />
        </div>
      )}

      {/* Floating Particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-${color}-400 rounded-full animate-ping`}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
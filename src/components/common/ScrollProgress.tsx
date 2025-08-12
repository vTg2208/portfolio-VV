import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const progressPercentage = Math.min((scrolled / maxHeight) * 100, 100);
      setProgress(progressPercentage);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Circular Progress Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            {/* Background circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-gray-300 dark:stroke-gray-700"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-blue-500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progress * 1.005} 100.48`}
              style={{ transition: 'stroke-dasharray 0.3s ease-in-out' }}
            />
          </svg>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

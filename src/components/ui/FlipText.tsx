import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipTextProps {
  words: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export const FlipText: React.FC<FlipTextProps> = ({
  words,
  interval = 3000,
  className = '',
  textClassName = '',
  animationDuration = 700,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words.length, interval]);

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ rotateX: 90, rotateY: -15, opacity: 0, y: 20 }}
          animate={{ rotateX: 0, rotateY: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, rotateY: 15, opacity: 0, y: -20 }}
          transition={{
            duration: animationDuration / 1000,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className={`inline-block ${textClassName}`}
          style={{ 
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

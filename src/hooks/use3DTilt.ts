import { useRef, useEffect } from 'react';

export const use3DTilt = (options: { 
  maxTilt?: number; 
  perspective?: number; 
  scale?: number; 
} = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * maxTilt;
      const rotateY = ((centerX - x) / centerX) * maxTilt;
      
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(${scale}, ${scale}, ${scale})
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      element.style.transition = 'transform 0.5s ease-out';
    };

    const handleMouseEnter = () => {
      element.style.transition = 'none';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [maxTilt, perspective, scale]);

  return { ref, handleMouseMove: () => {} };
};
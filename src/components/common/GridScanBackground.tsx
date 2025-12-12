import React, { useEffect, useRef } from 'react';

interface GridScanBackgroundProps {
  className?: string;
}

export const GridScanBackground: React.FC<GridScanBackgroundProps> = ({ 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scanLineY = 0;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Calculate grid size to fit 9-10 rows
    const getGridSize = () => {
      return Math.floor(window.innerHeight / 9.5);
    };
    
    let gridSize = getGridSize();
    const scanSpeed = 4;
    const scanHeight = 150;

    const animate = () => {
      gridSize = getGridSize(); // Update grid size dynamically
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.15)';
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw scanning line with gradient
      const gradient = ctx.createLinearGradient(0, scanLineY - scanHeight / 2, 0, scanLineY + scanHeight / 2);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.8)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLineY - scanHeight / 2, canvas.width, scanHeight);

      // Highlight grid lines in scan area
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 2;

      // Highlighted vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        if (Math.abs((scanLineY % canvas.height) - (x % canvas.height)) < scanHeight) {
          ctx.beginPath();
          ctx.moveTo(x, Math.max(0, scanLineY - scanHeight / 2));
          ctx.lineTo(x, Math.min(canvas.height, scanLineY + scanHeight / 2));
          ctx.stroke();
        }
      }

      // Highlighted horizontal lines
      for (let y = Math.max(0, scanLineY - scanHeight / 2); y <= Math.min(canvas.height, scanLineY + scanHeight / 2); y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update scan line position
      scanLineY += scanSpeed;
      if (scanLineY > canvas.height + scanHeight / 2) {
        scanLineY = -scanHeight / 2;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 dark:via-black/10 dark:to-black/40" />
    </div>
  );
};

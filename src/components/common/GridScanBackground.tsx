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
    let scanLineX = 0;
    let direction: 'horizontal' | 'vertical' = 'horizontal';

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
    const scanSpeed = 3;
    const scanHeight = 150;

    const animate = () => {
      gridSize = getGridSize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
      ctx.lineWidth = 1;

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

      if (direction === 'horizontal') {
        // Horizontal scan
        const gradient = ctx.createLinearGradient(0, scanLineY - scanHeight / 2, 0, scanLineY + scanHeight / 2);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
        gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanLineY - scanHeight / 2, canvas.width, scanHeight);

        // Highlight horizontal grid lines
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 1.5;

        const startY = Math.max(0, scanLineY - scanHeight / 2);
        const endY = Math.min(canvas.height, scanLineY + scanHeight / 2);
        
        for (let y = startY; y <= endY; y += gridSize) {
          const distance = Math.abs(y - scanLineY);
          const intensity = 1 - (distance / (scanHeight / 2));
          ctx.globalAlpha = intensity * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1;

        scanLineY += scanSpeed;
        if (scanLineY > canvas.height + scanHeight / 2) {
          scanLineY = -scanHeight / 2;
          direction = 'vertical';
          scanLineX = -scanHeight / 2;
        }
      } else {
        // Vertical scan
        const gradient = ctx.createLinearGradient(scanLineX - scanHeight / 2, 0, scanLineX + scanHeight / 2, 0);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        gradient.addColorStop(0.3, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.6)');
        gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(scanLineX - scanHeight / 2, 0, scanHeight, canvas.height);

        // Highlight vertical grid lines
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 1.5;

        const startX = Math.max(0, scanLineX - scanHeight / 2);
        const endX = Math.min(canvas.width, scanLineX + scanHeight / 2);
        
        for (let x = startX; x <= endX; x += gridSize) {
          const distance = Math.abs(x - scanLineX);
          const intensity = 1 - (distance / (scanHeight / 2));
          ctx.globalAlpha = intensity * 0.8;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        ctx.globalAlpha = 1;

        scanLineX += scanSpeed;
        if (scanLineX > canvas.width + scanHeight / 2) {
          scanLineX = -scanHeight / 2;
          direction = 'horizontal';
          scanLineY = -scanHeight / 2;
        }
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
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 dark:to-black/30" />
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animate = () => {
      setTime(prev => prev + 0.01);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create gradient
    const gradient = ctx.createRadialGradient(
      canvas.width * mousePosition.x,
      canvas.height * mousePosition.y,
      0,
      canvas.width * mousePosition.x,
      canvas.height * mousePosition.y,
      canvas.width * 0.8
    );

    // Dynamic colors based on time and mouse position
    const hue1 = (time * 20 + mousePosition.x * 60) % 360;
    const hue2 = (time * 30 + mousePosition.y * 80 + 120) % 360;
    const hue3 = (time * 25 + (mousePosition.x + mousePosition.y) * 40 + 240) % 360;

    gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.3)`);
    gradient.addColorStop(0.4, `hsla(${hue2}, 70%, 50%, 0.2)`);
    gradient.addColorStop(0.8, `hsla(${hue3}, 70%, 40%, 0.1)`);
    gradient.addColorStop(1, 'hsla(220, 70%, 30%, 0)');

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [mousePosition, time]);

  return (
    <>
      {/* CSS-based animated mesh background */}
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Floating gradient orbs */}
        <div className="absolute inset-0">
          {/* Orb 1 */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"
            style={{
              top: '10%',
              left: '10%',
              transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 30}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          
          {/* Orb 2 */}
          <div 
            className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/25 to-red-600/25 rounded-full blur-3xl animate-pulse"
            style={{
              top: '60%',
              right: '10%',
              transform: `translate(${-mousePosition.x * 40}px, ${-mousePosition.y * 50}px)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: '1s'
            }}
          />
          
          {/* Orb 3 */}
          <div 
            className="absolute w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
            style={{
              bottom: '20%',
              left: '50%',
              transform: `translate(${mousePosition.x * 30 - 50}%, ${mousePosition.y * 20}px)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: '2s'
            }}
          />
        </div>

        {/* Canvas for more complex animations */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          />
        </div>

        {/* Particle effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
    </>
  );
};

// Alternative simpler version if the above is too complex
export const SimpleAnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = "" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.4) 0%,
              rgba(139, 92, 246, 0.3) 25%,
              rgba(236, 72, 153, 0.2) 50%,
              transparent 100%
            )
          `,
          transition: 'all 0.3s ease-out'
        }}
      />
      
      {/* Animated shapes */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse top-1/4 -left-48" />
        <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse top-3/4 -right-40 animation-delay-1000" />
        <div className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse bottom-1/4 left-1/3 animation-delay-2000" />
      </div>
    </div>
  );
};

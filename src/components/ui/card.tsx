import React from 'react';

// export const Card = ({ children }: { children: React.ReactNode }) => (
//   <div className="card">{children}</div>
// );

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="card-content">{children}</div>
);

interface CardProps {

    children: React.ReactNode;
  
    className?: string;
  
  }
  
  
  
  export const Card: React.FC<CardProps> = ({ children, className }) => {
  
    return (
  
      <div className={`rounded-lg shadow-md overflow-hidden ${className}`}>
  
        {children}
  
      </div>
  
    );
  
  };
  
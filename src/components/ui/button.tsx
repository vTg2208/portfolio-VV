import React from 'react';


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'outline' | 'default'; // Add variants you use
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  className,
  ...rest
}) => {
  const variantClass = {
    ghost: 'button-ghost',
    outline: 'button-outline',
    default: 'button-default',
  }[variant];

  return (
    <button
      className={`rounded-lg px-8 py-4 font-medium transition-all duration-200 ease-in-out ${variantClass} ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-sans tracking-tight font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-deep-gold focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-sm";
  
  const variants = {
    primary: "bg-oxford-blue text-ivory hover:bg-oxford-blue/90 shadow-md hover:shadow-[0_8px_20px_-3px_rgba(27,54,93,0.4)] hover:-translate-y-0.5",
    secondary: "bg-deep-gold text-oxford-blue hover:bg-deep-gold/90 shadow-md hover:shadow-[0_8px_20px_-3px_rgba(197,160,89,0.4)] hover:-translate-y-0.5",
    outline: "border-2 border-oxford-blue/20 text-oxford-blue hover:bg-oxford-blue hover:text-ivory backdrop-blur-sm",
    ghost: "text-oxford-blue hover:bg-oxford-blue/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

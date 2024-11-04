import React from 'react';

interface ButtonProps {
  variant?: 'outline' | 'solid';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', className, onClick, children }) => {
  const baseStyle = 'px-4 py-2 rounded';
  const variantStyle = variant === 'outline' ? 'border border-gray-400 text-gray-700' : 'bg-blue-500 text-white';

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
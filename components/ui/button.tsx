import React from 'react';

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
    >
      {label || children}
    </button>
  );
};

export { Button };
export default Button;

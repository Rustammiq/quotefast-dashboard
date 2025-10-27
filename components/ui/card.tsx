import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
  'aria-labelledby'?: string;
  [key: string]: any; // Allow any additional props
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  [key: string]: any; // Allow any additional props
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 bg-white ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', ...props }) => {
  return <h3 className={`text-lg font-semibold ${className}`} {...props}>{children}</h3>;
};

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '' }) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
};

// Named export
export { Card };
export default Card;

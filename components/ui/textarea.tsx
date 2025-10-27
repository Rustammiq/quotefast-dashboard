import React from 'react';

interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  rows?: number;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, className = '', rows = 4, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`p-2 border border-gray-300 rounded ${className}`}
    />
  );
};

export { Textarea };
export default Textarea;

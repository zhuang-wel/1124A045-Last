import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}

export const Icon: React.FC<IconProps> = ({ name, className = "", style, fill = false }) => {
  return (
    <span 
      className={`material-symbols-outlined ${className}`} 
      style={{
        ...style,
        fontVariationSettings: fill ? "'FILL' 1" : undefined
      }}
    >
      {name}
    </span>
  );
};
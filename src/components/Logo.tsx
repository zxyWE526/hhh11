import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src="/logo.jpg" alt="朱鹮酒业" className="h-12 w-auto object-contain" />
    </div>
  );
};

export default Logo;

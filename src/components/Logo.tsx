import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/logo.png" alt="朱鹮酒业" className="h-20 w-auto object-contain" />
      <span
        className="font-bold tracking-wider"
        style={{
          fontSize: '2rem',
          fontFamily: 'SimSun, STSong, "Noto Serif CJK SC", "Source Han Serif SC", serif',
          color: '#2D5F40'
        }}
      >
        朱鹮酒业
      </span>
    </div>
  );
};

export default Logo;

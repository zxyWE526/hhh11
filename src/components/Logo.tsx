import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="陕西朱鹮酒业" className="h-10 w-auto object-contain" />
      <span
        className="font-bold tracking-wider"
        style={{
          fontSize: '1.15rem',
          fontFamily: 'SimSun, STSong, "Noto Serif CJK SC", "Source Han Serif SC", serif',
          color: '#2D5F40'
        }}
      >
        陕西朱鹮酒业
      </span>
    </div>
  );
};

export default Logo;

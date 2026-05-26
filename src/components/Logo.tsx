import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * 朱鹮酒业 Logo 组件
 * 融合朱鹮形象与禾苗/麦穗元素
 * 配色：绿色 + 金色
 */
export const Logo: React.FC<LogoProps> = ({ size = 80, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* 外圈 - 有机圆形 */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#greenGradient)"
          stroke="#D4AF37"
          strokeWidth="2"
        />
        
        {/* 渐变定义 */}
        <defs>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D5F40" />
            <stop offset="100%" stopColor="#4A8C60" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        
        {/* 朱鹮抽象形状 - 鸟的侧影 */}
        <path
          d="M 65 35 Q 75 30 80 35 Q 85 40 80 45 Q 75 50 70 48 Q 65 52 60 50 Q 55 48 55 43 Q 55 38 60 36 Z"
          fill="url(#goldGradient)"
          className="animate-pulse-slow"
        />
        
        {/* 朱鹮的翅膀/禾苗叶子 - 左侧 */}
        <path
          d="M 50 65 Q 40 55 35 45 Q 30 35 25 40 Q 20 45 25 55 Q 30 65 38 72 Q 45 78 50 75 Z"
          fill="url(#goldGradient)"
          opacity="0.9"
        />
        
        {/* 禾苗/麦穗 - 中间向上 */}
        <path
          d="M 50 60 Q 50 50 52 40 Q 54 30 50 25 Q 46 30 48 40 Q 50 50 50 60"
          stroke="url(#goldGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 禾苗叶子 - 左侧 */}
        <ellipse
          cx="42"
          cy="50"
          rx="8"
          ry="4"
          fill="url(#goldGradient)"
          transform="rotate(-30 42 50)"
          opacity="0.85"
        />
        
        {/* 禾苗叶子 - 右侧 */}
        <ellipse
          cx="58"
          cy="50"
          rx="8"
          ry="4"
          fill="url(#goldGradient)"
          transform="rotate(30 58 50)"
          opacity="0.85"
        />
        
        {/* 禾苗叶子 - 左上 */}
        <ellipse
          cx="44"
          cy="38"
          rx="6"
          ry="3"
          fill="url(#goldGradient)"
          transform="rotate(-45 44 38)"
          opacity="0.8"
        />
        
        {/* 禾苗叶子 - 右上 */}
        <ellipse
          cx="56"
          cy="38"
          rx="6"
          ry="3"
          fill="url(#goldGradient)"
          transform="rotate(45 56 38)"
          opacity="0.8"
        />
        
        {/* 底部装饰 - 土地/根基 */}
        <path
          d="M 30 75 Q 50 80 70 75"
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
      
      {/* Logo 文字 */}
      <div className="flex flex-col">
        <span 
          className="font-bold tracking-wider"
          style={{ 
            fontSize: size * 0.28,
            background: 'linear-gradient(135deg, #2D5F40 0%, #4A8C60 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          朱鹮酒业
        </span>
        <span 
          className="font-light tracking-[0.3em]"
          style={{ 
            fontSize: size * 0.12,
            color: '#D4AF37'
          }}
        >
          ZHUOHUAN
        </span>
      </div>
    </div>
  );
};

export default Logo;

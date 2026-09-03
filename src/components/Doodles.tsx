import React from 'react';

interface DoodleProps {
  className?: string;
  color?: string;
  size?: number;
}

export const DoodleHeart: React.FC<DoodleProps> = ({ className = '', color = '#E85D83', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M20 34C18 32 6 22 6 13.5C6 8.5 10 5 14.5 5C17.2 5 19.5 6.5 20 8C20.5 6.5 22.8 5 25.5 5C30 5 34 8.5 34 13.5C34 22 22 32 20 34Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleStar: React.FC<DoodleProps> = ({ className = '', color = '#E85D83', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M20 4L23.5 15.5L35 15.5L25.8 22.5L29.5 34L20 27L10.5 34L14.2 22.5L5 15.5L16.5 15.5L20 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleSketchStar: React.FC<DoodleProps> = ({ className = '', color = '#E85D83', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    {/* Continuous hand-drawn overlapping star stroke */}
    <path
      d="M25 4L33 38L3 17L47 17L17 38L25 4"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-95"
    />
  </svg>
);

export const DoodleSparkle: React.FC<DoodleProps> = ({ className = '', color = '#E85D83', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M16 2C16 10 22 16 30 16C22 16 16 22 16 30C16 22 10 16 2 16C10 16 16 10 16 2Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleLightning: React.FC<DoodleProps> = ({ className = '', color = '#E85D83', size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M19 3L7 20H17L13 37L25 18H15L19 3Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DoodleCat: React.FC<DoodleProps> = ({ className = '', color = '#FFFFFF', size = 120 }) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 160 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Crown */}
    <path
      d="M38 32L45 15L56 26L68 12L78 26L90 15L96 32"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="45" cy="14" r="1.5" fill={color} />
    <circle cx="68" cy="11" r="1.5" fill={color} />
    <circle cx="90" cy="14" r="1.5" fill={color} />
    {/* Cat Face & Ears */}
    <path
      d="M32 42L18 64L35 70C48 96 104 96 118 70L135 64L121 42C106 36 47 36 32 42Z"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Left Ear Inner */}
    <path d="M25 60L32 48L35 62" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    {/* Right Ear Inner */}
    <path d="M128 60L121 48L118 62" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    {/* Eyes */}
    <path d="M48 64C52 61 58 61 62 64" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <ellipse cx="55" cy="67" rx="3" ry="4" fill={color} />
    <ellipse cx="56" cy="66" rx="1" ry="1.5" fill="#000" />
    
    <path d="M92 64C96 61 102 61 106 64" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <ellipse cx="99" cy="67" rx="3" ry="4" fill={color} />
    <ellipse cx="100" cy="66" rx="1" ry="1.5" fill="#000" />
    {/* Nose & Mouth */}
    <path d="M74 72L77 75L80 72Z" fill={color} />
    <path d="M77 75V78C77 81 72 83 68 81" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M77 78C77 81 82 83 86 81" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Whiskers */}
    <path d="M12 70L36 73" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 78L36 78" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 86L36 83" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M142 70L118 73" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M146 78L118 78" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M142 86L118 83" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DoodleCurvedArrow: React.FC<DoodleProps & { direction?: 'down' | 'up-left' | 'down-right' }> = ({
  className = '',
  color = '#E85D83',
  size = 40,
  direction = 'down',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {direction === 'down' && (
      <>
        <path
          d="M15 10C25 15 35 25 32 40"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M24 35L32 42L38 34"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
    {direction === 'up-left' && (
      <>
        <path
          d="M38 40C30 32 20 25 15 12"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M22 15L14 10L10 18"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
    {direction === 'down-right' && (
      <>
        <path
          d="M10 15C18 18 28 26 35 38"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M28 36L36 40L39 31"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

export const DoodleCamera: React.FC<DoodleProps> = ({ className = '', color = '#F3F0EA', size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none ${className}`}
  >
    <path
      d="M18 10L20 6H28L30 10H40C42.2 10 44 11.8 44 14V38C44 40.2 42.2 42 40 42H8C5.8 42 4 40.2 4 38V14C4 11.8 5.8 10 8 10H18Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="26" r="8" stroke={color} strokeWidth="2.5" />
    <circle cx="24" cy="26" r="3.5" fill={color} />
    <circle cx="36" cy="16" r="2" fill={color} />
  </svg>
);

export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#E85D83',
}) => (
  <svg
    viewBox="0 0 240 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full select-none ${className}`}
  >
    <path
      d="M3 12C45 4 120 15 237 8"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
    />
  </svg>
);

export const WashiTapeStrip: React.FC<{
  className?: string;
  variant?: 'pink' | 'beige' | 'dark';
  rotate?: string;
}> = ({ className = '', variant = 'pink', rotate = '-3deg' }) => {
  const bgClasses = {
    pink: 'bg-[#E85D83]/45 border-t border-b border-pink-300/30',
    beige: 'bg-[#F3F0EA]/55 border-t border-b border-stone-300/40',
    dark: 'bg-[#1F1F24]/60 border-t border-b border-white/20',
  }[variant];

  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`h-5 w-24 backdrop-blur-[2px] shadow-sm select-none pointer-events-none ${bgClasses} ${className}`}
    >
      <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.2)_4px,rgba(255,255,255,0.2)_8px)]" />
    </div>
  );
};

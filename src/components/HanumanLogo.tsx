import React from 'react';
// @ts-ignore
import hanumanLogoImg from '../assets/images/hanuman_logo_1781518116386.jpg';

interface HanumanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const HanumanLogo: React.FC<HanumanLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-9 w-9 rounded-full border border-amber-500/40 shadow-md',
    md: 'h-12 w-12 rounded-full border-2 border-amber-500/50 shadow-lg',
    lg: 'h-20 w-20 rounded-full border-2 border-amber-500/50 shadow-xl',
    xl: 'h-28 w-28 rounded-full border-2 border-amber-500/50 shadow-2xl'
  };

  return (
    <div 
      className={`relative overflow-hidden bg-white flex items-center justify-center shrink-0 p-0.5 transition-all duration-300 ${sizeClasses[size]} ${className}`}
      id="hanuman-logo-container"
    >
      <img 
        src={hanumanLogoImg} 
        alt="Sree Hanuman Travels Logo" 
        className="w-full h-full object-contain rounded-full"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

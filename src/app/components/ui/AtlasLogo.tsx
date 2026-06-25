import React from 'react';

export default function AtlasLogo({ className = "", size = 40 }: { className?: string, size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Glow Filter for Neon Effect */}
      <defs>
        <filter id="neon-glow-logo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Deep dark purple gradient */}
        <linearGradient id="indigo-glow-dark" x1="50" y1="12" x2="50" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3c106b" /> {/* Dark rich purple */}
          <stop offset="1" stopColor="#0a0314" /> {/* Near black space purple */}
        </linearGradient>
        
        {/* Glowing green gradient for core */}
        <linearGradient id="success-glow-dark" x1="50" y1="42" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-success)" />
          <stop offset="1" stopColor="#134727" />
        </linearGradient>
      </defs>

      {/* Outer Stylized Arrow (A) - Rich dark purple with glowing neon purple borders */}
      <path 
        d="M50 12L15 78H33L50 44L67 78H85L50 12Z" 
        fill="url(#indigo-glow-dark)" 
        stroke="#9d55ff" 
        strokeWidth="2.0"
        strokeLinejoin="round"
      />
      
      {/* Inner core - Neon green diamond/node shape */}
      <path 
        d="M50 44L36 71H64L50 44Z" 
        fill="url(#success-glow-dark)" 
        stroke="var(--color-success)" 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Network dotted connector line */}
      <line 
        x1="50" 
        y1="12" 
        x2="50" 
        y2="44" 
        stroke="rgba(157, 85, 255, 0.5)" 
        strokeWidth="2" 
        strokeDasharray="3 3" 
      />

      {/* Glowing top node dot */}
      <circle 
        cx="50" 
        cy="12" 
        r="4.5" 
        fill="var(--text-primary)" 
        filter="url(#neon-glow-logo)"
      />
    </svg>
  );
}
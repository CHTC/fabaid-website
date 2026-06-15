import React from 'react';

export interface FabricMarkProps {
  size?: number;
}

/** The FabAID fabric logo mark — a woven-grid glyph in CHTC red and ink. */
export default function FabricMark({ size = 38 }: FabricMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 40 40'
      fill='none'
      aria-hidden='true'
      style={{ display: 'block', flex: 'none' }}
    >
      <rect x='1.5' y='1.5' width='37' height='37' rx='9' stroke='#B61F24' strokeWidth='2.4' />
      <circle cx='11' cy='11' r='3' fill='#B61F24' />
      <circle cx='29' cy='11' r='3' fill='#17140F' />
      <circle cx='11' cy='29' r='3' fill='#17140F' />
      <circle cx='29' cy='29' r='3' fill='#B61F24' />
      <circle cx='20' cy='20' r='3.4' fill='#B61F24' />
      <path
        d='M11 11L20 20L29 11M11 29L20 20L29 29M20 20V20'
        stroke='#17140F'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
    </svg>
  );
}

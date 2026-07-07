import React from 'react';

export interface FabricMarkProps {
  size?: number;
}

/** The FabAID fabric logo mark — a woven-grid glyph in CHTC red and ink. */
export default function FabricMark({ size = 38 }: FabricMarkProps) {
  return (
    <img
      src='/images/logos/FabricMark.svg'
      alt=''
      aria-hidden='true'
      width={size}
      height={size}
      style={{ display: 'block', flex: 'none' }}
    />
  );
}

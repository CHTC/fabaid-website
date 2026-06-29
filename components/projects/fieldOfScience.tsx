import { Box } from '@mui/material';
import React from 'react';

import { mono } from '@/components/design';

/**
 * Deterministic pill colors keyed off the field-of-science string. The data is
 * loaded live (SED-CIP broad fields), so the value set isn't fixed — hashing the
 * string gives every field its own stable hue while keeping the light-tint pill
 * legible (saturated dark text + matching border on a pale background).
 */
export function fieldOfScienceColor(field: string): { fg: string; bg: string; border: string } {
  let hash = 0;
  for (let i = 0; i < field.length; i += 1) {
    hash = (hash << 5) - hash + field.charCodeAt(i);
    hash |= 0;
  }
  const hue = Math.abs(hash) % 360;
  return {
    fg: `hsl(${hue} 58% 32%)`,
    bg: `hsl(${hue} 70% 96%)`,
    border: `hsl(${hue} 45% 78%)`,
  };
}

export interface FieldOfScienceChipProps {
  field: string;
}

/** Rounded pill for a project's field of science, colored by its value. */
export default function FieldOfScienceChip({ field }: FieldOfScienceChipProps) {
  if (!field) return null;
  const c = fieldOfScienceColor(field);
  return (
    <Box
      component='span'
      sx={{
        display: 'inline-block',
        fontFamily: mono,
        fontSize: '0.72rem',
        letterSpacing: '0.04em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        color: c.fg,
        border: `1px solid ${c.border}`,
        borderRadius: '999px',
        px: 1.25,
        py: 0.4,
        bgcolor: c.bg,
      }}
    >
      {field}
    </Box>
  );
}

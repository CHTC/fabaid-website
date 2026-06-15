import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export interface PlaceholderProps {
  label?: string;
  sx?: SxProps<Theme>;
}

/**
 * The design system's textured image placeholder (`.ph`) — a diagonal weave
 * with a soft red wash and an optional centered label chip.
 */
export default function Placeholder({ label, sx }: PlaceholderProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(circle at 30% 30%, rgba(182,31,36,.12), transparent 60%),' +
          ' repeating-linear-gradient(135deg, #ECE7DE 0 14px, #E5DFD4 14px 28px)',
        ...sx,
      }}
    >
      {label && (
        <Box
          component='span'
          sx={{
            bgcolor: 'rgba(255,255,255,0.78)',
            px: 1.5,
            py: 0.5,
            borderRadius: '6px',
            fontFamily: mono,
            fontSize: '0.74rem',
            letterSpacing: '0.05em',
            color: colors.muted,
            textAlign: 'center',
          }}
        >
          {label}
        </Box>
      )}
    </Box>
  );
}

import { Box } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export interface KickerProps {
  children: React.ReactNode;
  /** Use the lighter red + tone meant for dark ("ink") backgrounds. */
  onDark?: boolean;
  component?: React.ElementType;
}

/**
 * Monospace, uppercase eyebrow label prefixed with a short rule — the
 * recurring section marker from the design system.
 */
export default function Kicker({ children, onDark = false, component = 'span' }: KickerProps) {
  const accent = onDark ? colors.red300 : colors.red;

  return (
    <Box
      component={component}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55em',
        mb: 2,
        fontFamily: mono,
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: accent,
      }}
    >
      <Box
        component='span'
        aria-hidden='true'
        sx={{ width: '1.6em', height: '2px', bgcolor: accent, display: 'inline-block' }}
      />
      {children}
    </Box>
  );
}

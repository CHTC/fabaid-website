import { Box, Link } from '@mui/material';
import React from 'react';

import { colors } from './tokens';

export interface LinkArrowProps {
  href: string;
  children: React.ReactNode;
  /** Render the arrow without leading text spacing (e.g. icon-only footer). */
  target?: string;
  rel?: string;
}

/** Red, bold call-to-action link with an arrow that nudges right on hover. */
export default function LinkArrow({ href, children, target, rel }: LinkArrowProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      underline='none'
      sx={{
        fontWeight: 600,
        color: colors.red,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4em',
        '&:hover span': { transform: 'translateX(3px)' },
      }}
    >
      {children}
      <Box component='span' sx={{ transition: 'transform .2s ease' }} aria-hidden='true'>
        →
      </Box>
    </Link>
  );
}

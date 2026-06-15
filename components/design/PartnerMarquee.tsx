'use client';

import { Box } from '@mui/material';
import React from 'react';

import { colors } from './tokens';

const PARTNERS = [
  'NSF', 'CHTC', 'Pelican', 'OSG', 'PATh', 'HTCondor', 'IceCube', 'NRP',
  'ACCESS', 'NAIRR', 'Internet2', 'OpenWebUI', 'Ollama', 'UW–Madison', 'Morgridge',
];

const TRACK = [...PARTNERS, ...PARTNERS];

/** Continuously scrolling partner/technology wordmark strip (`.marquee`). */
export default function PartnerMarquee() {
  return (
    <Box
      component='div'
      aria-label='Partners and technologies'
      sx={{
        bgcolor: colors.surface,
        borderTop: `1px solid ${colors.line}`,
        borderBottom: `1px solid ${colors.line}`,
        overflow: 'hidden',
        py: 2.25,
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 90,
          zIndex: 2,
          pointerEvents: 'none',
        },
        '&::before': {
          left: 0,
          background: `linear-gradient(90deg, ${colors.surface}, transparent)`,
        },
        '&::after': {
          right: 0,
          background: `linear-gradient(270deg, ${colors.surface}, transparent)`,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '46px',
          width: 'max-content',
          alignItems: 'center',
          animation: 'partner-marquee 42s linear infinite',
          '&:hover': { animationPlayState: 'paused' },
          '@keyframes partner-marquee': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        {TRACK.map((partner, i) => (
          <Box
            key={`${partner}-${i}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              whiteSpace: 'nowrap',
              fontFamily: (theme) => theme.typography.h1.fontFamily,
              fontWeight: 600,
              fontSize: '1.15rem',
              color: '#9a948b',
              letterSpacing: '-0.01em',
              transition: 'color .2s',
              '&:hover': { color: colors.red },
              '&:hover .nub': { bgcolor: colors.red },
            }}
          >
            <Box
              className='nub'
              sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: colors.lineStrong }}
            />
            {partner}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

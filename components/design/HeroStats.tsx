import { Box, Typography } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroStatsProps {
  stats: HeroStat[];
  /** Small caption qualifying the figures, e.g. a time horizon. */
  note?: string;
}

/** Row of headline figures for dark page heroes (e.g. impact, homepage). */
export default function HeroStats({ stats, note }: HeroStatsProps) {
  return (
    <Box>
      {note && (
        <Typography
          variant={'h6'}
          sx={{
            mb: 3,
            fontFamily: mono,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: colors.onInkMuted,
          }}
        >
          {note}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: { xs: 3, md: 4.5 }, flexWrap: 'wrap' }}>
        {stats.map((s) => (
          <Box
            key={s.label}
            sx={{ fontFamily: mono, fontSize: '0.74rem', letterSpacing: '0.04em', color: colors.onInkMuted }}
          >
            <Typography
              component='span'
              variant='h3'
              sx={{
                display: 'block',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1.9rem',
                letterSpacing: '-0.02em',
              }}
            >
              {s.value}
            </Typography>
            {s.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

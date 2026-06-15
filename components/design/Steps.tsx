import { Box, Typography } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export interface Step {
  /** Small mono label, e.g. "STEP 01" or "YEARS 1–2". */
  marker: string;
  title: string;
  body: string;
}

export interface StepsProps {
  steps: Step[];
}

/** Three-up (responsive) step list with a red top rule on each item. */
export default function Steps({ steps }: StepsProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: `repeat(${steps.length}, 1fr)` },
        gap: 3,
      }}
    >
      {steps.map((step) => (
        <Box key={step.title} sx={{ borderTop: `2px solid ${colors.red}`, pt: 2.25 }}>
          <Box
            sx={{
              fontFamily: mono,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              color: colors.red,
            }}
          >
            {step.marker}
          </Box>
          <Typography variant='h4' component='h3' sx={{ my: 1 }}>
            {step.title}
          </Typography>
          <Typography sx={{ color: colors.muted, fontSize: '0.95rem', m: 0 }}>
            {step.body}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

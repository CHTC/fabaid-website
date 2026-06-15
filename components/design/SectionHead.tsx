import { Box, Typography } from '@mui/material';
import React from 'react';

import Kicker from './Kicker';
import { colors } from './tokens';

export interface SectionHeadProps {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
}

/** Kicker + heading (+ optional lead) block that opens most sections. */
export default function SectionHead({ kicker, title, lead, center = false }: SectionHeadProps) {
  return (
    <Box
      sx={{
        maxWidth: 680,
        mb: { xs: 4.5, md: 7 },
        ...(center ? { mx: 'auto', textAlign: 'center' } : {}),
      }}
    >
      {kicker && (
        <Box sx={center ? { display: 'flex', justifyContent: 'center' } : undefined}>
          <Kicker>{kicker}</Kicker>
        </Box>
      )}
      <Typography variant='h2' component='h2'>
        {title}
      </Typography>
      {lead && (
        <Typography
          sx={{
            mt: 1.75,
            color: colors.muted,
            fontSize: { xs: '1.1rem', md: '1.35rem' },
            lineHeight: 1.55,
          }}
        >
          {lead}
        </Typography>
      )}
    </Box>
  );
}

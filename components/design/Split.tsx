import { Box } from '@mui/material';
import React from 'react';

export interface SplitProps {
  children: React.ReactNode;
  /** Place the second child first on desktop. */
  reverse?: boolean;
}

/** Two-column feature row that stacks on mobile (`.split`). */
export default function Split({ children, reverse = false }: SplitProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 9 },
        alignItems: 'center',
        '& > :nth-of-type(2)': { order: { xs: 0, md: reverse ? -1 : 0 } },
      }}
    >
      {children}
    </Box>
  );
}

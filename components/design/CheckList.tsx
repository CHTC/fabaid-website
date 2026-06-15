import { Box } from '@mui/material';
import React from 'react';

import { colors } from './tokens';

export interface CheckListProps {
  items: React.ReactNode[];
}

/** Feature list with red check badges (`.flist`). */
export default function CheckList({ items }: CheckListProps) {
  return (
    <Box component='ul' sx={{ listStyle: 'none', m: 0, mt: 3, p: 0, display: 'grid', gap: 1.75 }}>
      {items.map((item, i) => (
        <Box component='li' key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', color: '#3a3631' }}>
          <Box
            sx={{
              flex: 'none',
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: colors.red050,
              color: colors.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              mt: '1px',
            }}
            aria-hidden='true'
          >
            ✓
          </Box>
          <Box component='span'>{item}</Box>
        </Box>
      ))}
    </Box>
  );
}

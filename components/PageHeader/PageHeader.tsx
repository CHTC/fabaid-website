import { Box, Typography } from '@mui/material';
import React from 'react';

export interface PageHeaderProps {
  title: string;
  texture?: string;
}

const DEFAULT_TEXTURE = '/design/fabric/Fabric-08.png';

export default function PageHeader({ title, texture = DEFAULT_TEXTURE }: PageHeaderProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mb: 8,
        px: { xs: 2, sm: 3 },
        py: { xs: 2.5, sm: 3 },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${texture})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.2,
        },
      }}
    >
      <Typography
        variant='h2'
        component='h1'
        sx={{
          position: 'relative',
          zIndex: 1,
          color: 'common.black',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}



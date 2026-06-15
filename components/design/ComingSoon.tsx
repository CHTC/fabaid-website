import { Box, Container, Typography } from '@mui/material';
import Construction from '@mui/icons-material/Construction';
import React from 'react';

import { colors } from './tokens';

/**
 * Placeholder section for pages whose public-facing content isn't ready to
 * publish yet. Keep the page's hero above it; this stands in for the body.
 */
export default function ComingSoon() {
  return (
    <Box component='section' sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <Container maxWidth='sm'>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '18px',
            bgcolor: colors.red050,
            color: colors.red,
            mb: 3,
          }}
        >
          <Construction sx={{ fontSize: 38 }} />
        </Box>
        <Typography variant='h3' component='p' sx={{ color: colors.ink, mb: 1.5 }}>
          More content incoming
        </Typography>
        <Typography sx={{ color: colors.muted, fontSize: '1.1rem', lineHeight: 1.6 }}>
          We are working to build out public-friendly views for our upcoming plans. Please check
          back on July 15th, 2026 for the full picture!
        </Typography>
      </Container>
    </Box>
  );
}

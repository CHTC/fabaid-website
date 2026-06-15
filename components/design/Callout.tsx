import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

import Kicker from './Kicker';
import { colors } from './tokens';

export interface CalloutProps {
  kicker?: string;
  title?: React.ReactNode;
  body?: React.ReactNode;
}

/**
 * The dark, rounded call-to-action callout repeated at the foot of every page
 * in the design. Defaults to the shared FabAID copy.
 */
export default function Callout({
  kicker = 'Get involved',
  title = 'Bring your data onto the fabric.',
  body = 'Request an access point and connect your first repository in an afternoon — facilitation is free.',
}: CalloutProps) {
  return (
    <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            bgcolor: colors.ink,
            color: '#fff',
            borderRadius: '22px',
            p: { xs: 4, md: 7 },
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Kicker onDark>{kicker}</Kicker>
            <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '18ch' }}>
              {title}
            </Typography>
            <Typography sx={{ color: colors.onInkLead, mt: 1, mb: 0 }}>{body}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.75, flexWrap: 'wrap' }}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              href='mailto:contact@fabaid.io'
              sx={{ borderRadius: '999px' }}
            >
              Contact us&nbsp;→
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

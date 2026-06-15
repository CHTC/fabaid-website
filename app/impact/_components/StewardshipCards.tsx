import { Box, Container, Link, Paper, Typography } from '@mui/material';
import React from 'react';

import { Kicker, colors, mono } from '@/components/design';

function Card({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        bgcolor: colors.surface,
        borderColor: colors.line,
        borderRadius: '14px',
        p: 3.5,
        boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
      }}
    >
      {children}
    </Paper>
  );
}

export default function StewardshipCards() {
  return (
    <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Card>
            <Kicker>Outcome</Kicker>
            <Typography
              sx={{
                fontSize: '1.25rem',
                color: colors.ink,
                lineHeight: 1.55,
                mb: 2,
              }}
            >
              “FabAID let our lab train on six petabytes of telescope data without moving a
              single file off the archive.”
            </Typography>
            <Box
              sx={{ fontFamily: mono, fontSize: '0.74rem', color: colors.muted }}
            >
              — Principal Investigator, partner institution
            </Box>
          </Card>

          <Card>
            <Kicker>Stewardship</Kicker>
            <Typography variant='h3' component='h3' sx={{ mb: 1 }}>
              Open, accountable, reproducible.
            </Typography>
            <Typography sx={{ color: colors.muted, mb: 2 }}>
              Every service is open-source, every agent action is logged, and all metrics are
              reported to the NSF and the public. Built on Pelican, HTCondor and the OSDF.
            </Typography>
            <Link
              href='/team/'
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
              Read about governance{' '}
              <Box component='span' sx={{ transition: 'transform .2s ease' }}>
                →
              </Box>
            </Link>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

'use client';

import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const HERO_TEXTURE = '/design/fabric/Fabric-05.png';

interface FlowCard {
  step: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

const FLOW_CARDS: FlowCard[] = [
  {
    step: '01',
    title: 'Use',
    description:
      'The OSDF and Pelican make scientific data effortless to access. Stream and compute against large datasets from anywhere, without wrangling bespoke transfer tooling.',
    action: {
      label: 'Use the OSDF',
      href: 'https://osg-htc.org/services/osdf',
    },
  },
  {
    step: '02',
    title: 'Share',
    description:
      'Our AI Agent Platform brings agent-assisted management to data workloads, helping teams orchestrate, monitor, and share pipelines with intelligent automation.',
  },
  {
    step: '03',
    title: 'Archive',
    description:
      'In the final step, resulting datasets are cataloged, published, shared, and deposited into community repositories for long-term reuse.',
  },
];

export default function Hero() {
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 8, md: 10 },
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${HERO_TEXTURE})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '220px 220px',
          opacity: 0.2,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant='h1'
          component='h1'
          sx={{
            color: 'common.black',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            lineHeight: 1.05,
            textAlign: 'center',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.75rem' },
            mb: { xs: 5, md: 8 },
            textShadow: '0 2px 18px rgba(255,255,255,0.6)',
          }}
        >
          Fabric for data-intensive systems
        </Typography>

        <Grid container spacing={3} alignItems='stretch'>
          {FLOW_CARDS.map((card, index) => (
            <Grid key={card.title} size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
              <Paper
                elevation={4}
                sx={{
                  position: 'relative',
                  width: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  // Glow intensifies from left to right to indicate flow direction.
                  boxShadow: (theme) => {
                    const glow = 0.25 + index * 0.25;
                    const alphaHex = Math.round(glow * 255)
                      .toString(16)
                      .padStart(2, '0');
                    return `0 0 ${12 + index * 10}px ${2 + index * 3}px ${theme.palette.primary.main}${alphaHex}`;
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Typography
                  variant='overline'
                  sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em' }}
                >
                  Step {card.step}
                </Typography>
                <Typography variant='h4' component='h2' sx={{ fontWeight: 800, mb: 1.5 }}>
                  {card.title}
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ flexGrow: 1 }}>
                  {card.description}
                </Typography>
                {card.action && (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      href={card.action.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {card.action.label}
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}


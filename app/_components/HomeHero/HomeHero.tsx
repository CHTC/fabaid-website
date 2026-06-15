import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

import { Kicker, HeroStats, colors } from '@/components/design';

const META = [
  { value: '84', label: 'institutions served' },
  { value: '286 PB', label: 'data delivered' },
  { value: '174', label: 'projects supported' },
];

/** Dark homepage hero with a data-fabric network illustration. */
export default function HomeHero() {
  return (
    <Box
      component='section'
      sx={{ position: 'relative', overflow: 'hidden', bgcolor: colors.surfaceInk, color: '#f3efe9' }}
    >
      {/* dot fabric backdrop */}
      <Box
        aria-hidden='true'
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: 0.9,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,.07) 1.4px, transparent 1.4px)',
          backgroundSize: '34px 34px',
        }}
      />
      {/* red glow */}
      <Box
        aria-hidden='true'
        sx={{
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(182,31,36,.35), transparent 62%)',
          top: -160,
          right: -120,
          zIndex: 1,
          filter: 'blur(8px)',
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 4.5, md: 6 },
            alignItems: 'center',
            py: { xs: 8, md: 14 },
          }}
        >
          <Box>
            <Kicker onDark>A national data fabric · NSF-funded</Kicker>
            <Typography
              variant='h1'
              component='h1'
              sx={{
                color: '#fff',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.4rem' },
              }}
            >
              The connective <Box component='span' sx={{ color: colors.red300 }}>fabric </Box> for
              data-intensive &amp; AI science.
            </Typography>
            <Typography sx={{ color: '#c9c3ba', mt: 3, maxWidth: '46ch', fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.55 }}>
              FabAID moves research data from where it lives to where it computes — federating
              storage, caching, discovery, and AI workflows into one open service layer.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.75, flexWrap: 'wrap', mt: 4.25 }}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                href='/data-access-point/'
                sx={{ borderRadius: '999px' }}
              >
                Explore the services&nbsp;↓
              </Button>
              <Button
                variant='outlined'
                size='large'
                href='/impact/'
                sx={{
                  borderRadius: '999px',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.22)',
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.16)', borderColor: 'rgba(255,255,255,0.22)' },
                }}
              >
                See our impact&nbsp;→
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <NetworkIllustration />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// The core sits a little right of center so the lines don't run through it.
const HUB_X = 272;
const HUB_Y = 210;

// The five services FabAID provides, positioned radially around the core.
const SERVICE_NODES = [
  { x: 240, y: 56, label: 'Data Federation', labelY: 30 },
  { x: 66, y: 132, label: 'Data Access Point', labelY: 100 },
  { x: 414, y: 132, label: 'Data Repositories', labelY: 100 },
  { x: 110, y: 360, label: 'AI Agent', labelY: 396 },
  { x: 370, y: 360, label: 'CDN & Caching', labelY: 396 },
];

function NetworkIllustration() {
  return (
    <svg
      viewBox='0 0 480 440'
      fill='none'
      role='img'
      aria-labelledby='fabric-title fabric-desc'
      style={{ width: '100%', height: 'auto' }}
    >
      <title id='fabric-title'>FabAID service fabric</title>
      <desc id='fabric-desc'>
        The FabAID core at the center, connected to the five services FabAID provides: Data
        Federation, Data Access Point, Data Repositories, AI Agent, and CDN and Caching.
      </desc>
      <defs>
        <linearGradient id='lg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#D9534F' />
          <stop offset='1' stopColor='#B61F24' />
        </linearGradient>
      </defs>

      {/* links from the core to each service */}
      <g stroke='url(#lg)' strokeWidth='2.2' strokeLinecap='round' opacity='0.85'>
        {SERVICE_NODES.map((n) => (
          <line key={n.label} x1={HUB_X} y1={HUB_Y} x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* core hub */}
      <g transform={`translate(${HUB_X} ${HUB_Y})`}>
        <circle r='40' fill='url(#lg)' opacity='.16' />
        <circle r='26' fill='#161311' stroke='url(#lg)' strokeWidth='2.5' />
        <path d='M-9 -9L0 0L9 -9M-9 9L0 0L9 9' stroke='#fff' strokeWidth='2.2' strokeLinecap='round' fill='none' />
        <text y='44' textAnchor='middle' fill='#c9c3ba' fontFamily='IBM Plex Mono, monospace' fontSize='11' letterSpacing='1'>
          FabAID core
        </text>
      </g>

      {/* highlighted service nodes with labels */}
      {SERVICE_NODES.map((n) => (
        <g key={n.label}>
          <g transform={`translate(${n.x} ${n.y})`}>
            <circle r='22' fill='url(#lg)' opacity='.14' />
            <circle r='14' fill='#211E1B' stroke='url(#lg)' strokeWidth='2.2' />
            <circle r='5' fill='#D9534F' />
          </g>
          <text
            x={n.x}
            y={n.labelY}
            textAnchor='middle'
            fill='#e7e2da'
            fontFamily='IBM Plex Mono, monospace'
            fontSize='12.5'
            fontWeight='500'
            letterSpacing='.3'
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

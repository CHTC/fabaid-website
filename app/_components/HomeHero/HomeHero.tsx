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
                href='#services'
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

// The FabAID core sits at the center; services orbit it in a regular pentagon.
const HUB_X = 230;
const HUB_Y = 240;

// The five services FabAID provides, placed radially around the core. Each
// label sits just below its node, and `icon` selects the glyph drawn inside it.
const SERVICE_NODES = [
  { x: 230, y: 108, label: 'Data Federation', labelY: 152, icon: 'federation' },
  { x: 356, y: 199, label: 'Data Access Point', labelY: 243, icon: 'access' },
  { x: 308, y: 347, label: 'Data Repositories', labelY: 391, icon: 'repos' },
  { x: 152, y: 347, label: 'AI Agent', labelY: 391, icon: 'ai' },
  { x: 104, y: 199, label: 'CDN & Caching', labelY: 243, icon: 'cdn' },
];

/** Red service glyphs, centered on the origin, sized to sit inside a node. */
function ServiceIcon({ type }: { type: string }) {
  const stroke = {
    fill: 'none',
    stroke: '#e0635e',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (type) {
    case 'federation': // funnel / filter
      return <path d='M-7 -6 H7 L1.5 0.5 V6.5 L-1.5 4.5 V0.5 Z' {...stroke} />;
    case 'access': // crosshair / target
      return (
        <g {...stroke}>
          <circle r='5.5' />
          <line x1='0' y1='-9' x2='0' y2='-7' />
          <line x1='0' y1='7' x2='0' y2='9' />
          <line x1='-9' y1='0' x2='-7' y2='0' />
          <line x1='7' y1='0' x2='9' y2='0' />
          <circle r='1.4' fill='#e0635e' stroke='none' />
        </g>
      );
    case 'repos': // database cylinder
      return (
        <g {...stroke}>
          <ellipse cx='0' cy='-5' rx='6.5' ry='2.6' />
          <path d='M-6.5 -5 V5 a6.5 2.6 0 0 0 13 0 V-5' />
          <path d='M-6.5 0 a6.5 2.6 0 0 0 13 0' />
        </g>
      );
    case 'ai': // sparkle
      return (
        <g>
          <path
            d='M0 -8 C0.6 -2.6 2.6 -0.6 8 0 C2.6 0.6 0.6 2.6 0 8 C-0.6 2.6 -2.6 0.6 -8 0 C-2.6 -0.6 -0.6 -2.6 0 -8 Z'
            fill='#e0635e'
          />
          <path d='M6.5 -7.5 C6.7 -5.8 7.3 -5.2 9 -5 C7.3 -4.8 6.7 -4.2 6.5 -2.5 C6.3 -4.2 5.7 -4.8 4 -5 C5.7 -5.2 6.3 -5.8 6.5 -7.5 Z' fill='#e0635e' />
        </g>
      );
    case 'cdn': // globe
      return (
        <g {...stroke}>
          <circle r='7' />
          <ellipse rx='3' ry='7' />
          <line x1='-7' y1='0' x2='7' y2='0' />
          <path d='M-6 -3.6 H6' />
          <path d='M-6 3.6 H6' />
        </g>
      );
    default:
      return null;
  }
}

function NetworkIllustration() {
  return (
    <svg
      viewBox='0 0 460 470'
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
        <linearGradient id='ring' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#E8635E' />
          <stop offset='0.55' stopColor='#B61F24' />
          <stop offset='1' stopColor='#5c1417' />
        </linearGradient>
        <radialGradient id='hubFill' cx='0.42' cy='0.38' r='0.75'>
          <stop offset='0' stopColor='#F07B72' />
          <stop offset='0.55' stopColor='#D9302E' />
          <stop offset='1' stopColor='#9c191d' />
        </radialGradient>
        <radialGradient id='hubGlow' cx='0.5' cy='0.5' r='0.5'>
          <stop offset='0' stopColor='#D9302E' stopOpacity='0.55' />
          <stop offset='1' stopColor='#D9302E' stopOpacity='0' />
        </radialGradient>
      </defs>

      {/* orbit rings encircling the fabric */}
      <g fill='none'>
        <circle cx={HUB_X} cy={HUB_Y} r='205' stroke='url(#ring)' strokeWidth='1.6' opacity='0.8' />
        <circle cx={HUB_X} cy={HUB_Y} r='168' stroke='url(#ring)' strokeWidth='1' opacity='0.28' />
      </g>

      {/* links from the core to each service */}
      <g stroke='url(#lg)' strokeWidth='1.5' strokeLinecap='round' opacity='0.5'>
        {SERVICE_NODES.map((n) => (
          <line key={n.label} x1={HUB_X} y1={HUB_Y} x2={n.x} y2={n.y} />
        ))}
      </g>

      {/* core hub */}
      <g transform={`translate(${HUB_X} ${HUB_Y})`}>
        <circle r='82' fill='url(#hubGlow)' />
        <circle r='54' fill='url(#hubFill)' stroke='#F4938B' strokeWidth='1' strokeOpacity='0.5' />
        <text
          y='10'
          textAnchor='middle'
          fill='#fff'
          fontFamily='inherit'
          fontSize='26'
          fontWeight='700'
          letterSpacing='-0.5'
        >
          FabAID
        </text>
      </g>

      {/* service nodes with icons and labels */}
      {SERVICE_NODES.map((n) => (
        <g key={n.label}>
          <g transform={`translate(${n.x} ${n.y})`}>
            <circle r='28' fill='url(#lg)' opacity='0.1' />
            <circle r='22' fill='#1b1714' stroke='url(#lg)' strokeWidth='1.6' strokeOpacity='0.7' />
            <ServiceIcon type={n.icon} />
          </g>
          <text
            x={n.x}
            y={n.labelY}
            textAnchor='middle'
            fill='#e7e2da'
            fontFamily='inherit'
            fontSize='13'
            fontWeight='600'
            letterSpacing='0.2'
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

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
              Building a <Box component='span' sx={{ color: colors.red300 }}>fabric </Box> for data-intensive & AI-driven science.
            </Typography>
            <Typography sx={{ color: '#c9c3ba', mt: 3, maxWidth: '46ch', fontSize: { xs: '1.1rem', md: '1.3rem' }, lineHeight: 1.55 }}>
              FabAID is an NSF-funded project building a fabric of services to accelerate data-intensive and AI-driven science — federating storage, caching, discovery, and workflows into an open service layer.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.75, flexWrap: 'wrap', mt: 4.25 }}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                href='#services'
                sx={{ borderRadius: '999px' }}
              >
                Explore FabAID&nbsp;↓
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

// The five pillars of the fabric, placed radially around the core. Each label
// sits just below its node, and `icon` selects the glyph drawn inside it.
const SERVICE_NODES = [
  { x: 230, y: 108, label: 'Data Delivery', labelY: 152, icon: 'delivery' },
  { x: 356, y: 199, label: 'Data Transformation', labelY: 243, icon: 'transform' },
  { x: 308, y: 347, label: 'Software', labelY: 391, icon: 'software' },
  { x: 152, y: 347, label: 'Community', labelY: 391, icon: 'community' },
  { x: 104, y: 199, label: 'Facilitation', labelY: 243, icon: 'facilitation' },
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
    case 'delivery': // globe / network reach
      return (
        <g {...stroke}>
          <circle r='7' />
          <ellipse rx='3' ry='7' />
          <line x1='-7' y1='0' x2='7' y2='0' />
          <path d='M-6 -3.6 H6' />
          <path d='M-6 3.6 H6' />
        </g>
      );
    case 'transform': // convert / exchange arrows
      return (
        <g {...stroke}>
          <path d='M-7 -3.5 H5' />
          <path d='M2 -6.5 L5 -3.5 L2 -0.5' />
          <path d='M7 3.5 H-5' />
          <path d='M-2 0.5 L-5 3.5 L-2 6.5' />
        </g>
      );
    case 'software': // code brackets
      return (
        <g {...stroke}>
          <path d='M-3 -6.5 L-8 0 L-3 6.5' />
          <path d='M3 -6.5 L8 0 L3 6.5' />
        </g>
      );
    case 'community': // group of people
      return (
        <g {...stroke}>
          <circle cx='0' cy='-3.5' r='2.8' />
          <path d='M-5 6.5 a5 4.5 0 0 1 10 0' />
          <circle cx='-7.5' cy='-1.5' r='2' />
          <path d='M-9.5 6 a3.5 3 0 0 1 4 -2.4' />
          <circle cx='7.5' cy='-1.5' r='2' />
          <path d='M9.5 6 a3.5 3 0 0 0 -4 -2.4' />
        </g>
      );
    case 'facilitation': // chat / guidance bubble
      return (
        <g {...stroke}>
          <path d='M-7.5 -5.5 H7.5 a1.2 1.2 0 0 1 1.2 1.2 V2.5 a1.2 1.2 0 0 1 -1.2 1.2 H-1 L-4.5 7.5 V3.7 H-7.5 a1.2 1.2 0 0 1 -1.2 -1.2 V-4.3 a1.2 1.2 0 0 1 1.2 -1.2 Z' />
          <circle cx='-3.5' cy='-1' r='0.9' fill='#e0635e' stroke='none' />
          <circle cx='0' cy='-1' r='0.9' fill='#e0635e' stroke='none' />
          <circle cx='3.5' cy='-1' r='0.9' fill='#e0635e' stroke='none' />
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
        The FabAID core at the center, connected to the five pillars of the fabric: Data Delivery,
        Data Transformation, Software, Community, and Facilitation.
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

'use client';

import { Box, Link } from '@mui/material';
import ExportedImage from 'next-image-export-optimizer';
import React from 'react';

interface Logo {
  src: string;
  alt: string;
  href: string;
}

const LOGOS: Logo[] = [
  { src: '/logos/osg.svg', alt: 'OSG', href: 'https://osg-htc.org' },
  { src: '/logos/pelican.png', alt: 'Pelican', href: 'https://pelicanplatform.org' },
  { src: '/logos/nrp.webp', alt: 'National Research Platform', href: 'https://nationalresearchplatform.org' },
  { src: '/logos/ndp.png', alt: 'National Data Platform', href: 'https://nationaldataplatform.org' },
  { src: '/logos/nairr.svg', alt: 'NAIRR', href: 'https://nairrpilot.org' },
  { src: '/logos/htcondor.png', alt: 'HTCondor', href: 'https://htcondor.org' },
  { src: '/logos/chtc.svg', alt: 'CHTC', href: 'https://chtc.cs.wisc.edu' },
];

// Duplicate the list so the marquee can loop seamlessly.
const TRACK = [...LOGOS, ...LOGOS];

export default function LogoCarousel() {
  return (
    <Box
      component='section'
      aria-label='Project partners and technologies'
      sx={{
        width: '100%',
        overflow: 'hidden',
        py: { xs: 4, md: 6 },
        bgcolor: 'background.paper',
        position: 'relative',
        // Fade the edges so logos slide in/out smoothly.
        maskImage:
          'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          alignItems: 'center',
          gap: { xs: 6, md: 10 },
          animation: 'logo-marquee 30s linear infinite',
          '&:hover': {
            animationPlayState: 'paused',
          },
          '@keyframes logo-marquee': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-50%)' },
          },
        }}
      >
        {TRACK.map((logo, index) => (
          <Link
            key={`${logo.alt}-${index}`}
            href={logo.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={logo.alt}
            sx={{
              flex: '0 0 auto',
              position: 'relative',
              display: 'block',
              height: { xs: 48, md: 64 },
              width: { xs: 120, md: 160 },
              opacity: 0.85,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              '&:hover': { opacity: 1, transform: 'scale(1.05)' },
            }}
          >
            <ExportedImage
              src={logo.src}
              alt={logo.alt}
              fill
              style={{ objectFit: 'contain' }}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
}




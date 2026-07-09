'use client';

import { Box, Link } from '@mui/material';
import ExportedImage from 'next-image-export-optimizer';
import React from 'react';

interface Logo {
  src: string;
  alt: string;
}

const LOGOS: Logo[] = [
  { src: '/images/logos/chtc.svg', alt: 'CHTC' },
  { src: '/images/logos/osg.svg', alt: 'OSG' },
  { src: '/images/logos/htcondor.png', alt: 'HTCondor' },
  { src: '/images/logos/pelican.png', alt: 'Pelican' },
];

// Clicking any logo takes visitors to the partners section on the About page.
const PARTNERS_HREF = '/about/#partners';

export default function LogoCarousel() {
  return (
    <Box
      component='section'
      aria-label='Project partners and technologies'
      sx={{
        width: '100%',
        py: { xs: 4, md: 6 },
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 6, md: 10 },
        }}
      >
        {LOGOS.map((logo) => (
          <Link
            key={logo.alt}
            href={PARTNERS_HREF}
            aria-label={`${logo.alt} — see our partners`}
            underline='none'
            sx={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: 120, md: 160 },
              opacity: 0.85,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              '&:hover': { opacity: 1, transform: 'scale(1.05)' },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: { xs: 48, md: 64 },
                width: '100%',
              }}
            >
              <ExportedImage
                src={logo.src}
                alt={logo.alt}
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}




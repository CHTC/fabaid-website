'use client';

import { Box, Link, Typography } from '@mui/material';
import ExportedImage from 'next-image-export-optimizer';
import React from 'react';

interface Logo {
  src: string;
  alt: string;
  href: string;
  label: string;
}

const LOGOS: Logo[] = [
  { src: '/images/logos/chtc.svg', alt: 'CHTC', href: 'https://chtc.cs.wisc.edu', label: 'Leads FabAID' },
  { src: '/images/logos/htcondor.png', alt: 'HTCondor', href: 'https://htcondor.org', label: 'Funded Via FabAID' },
  { src: '/images/logos/osg.svg', alt: 'OSG', href: 'https://osg-htc.org', label: 'Funded Via FabAID' },
  { src: '/images/logos/pelican.png', alt: 'Pelican', href: 'https://pelicanplatform.org', label: 'Funded Via FabAID' },
  { src: '/images/logos/nrp.webp', alt: 'National Research Platform', href: 'https://nationalresearchplatform.org', label: 'Collaborates with FabAID' },
  { src: '/images/logos/ndp.png', alt: 'National Data Platform', href: 'https://nationaldataplatform.org', label: 'Collaborates with FabAID' },
  { src: '/images/logos/nairr.svg', alt: 'NAIRR', href: 'https://nairrpilot.org', label: 'Collaborates with FabAID' },
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
          alignItems: 'flex-end',
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
            aria-label={`${logo.alt} — ${logo.label}`}
            underline='none'
            sx={{
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
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
            <Typography
              variant='subtitle2'
              color='text.secondary'
              textAlign='center'
              sx={{ lineHeight: 1.3 }}
            >
              {logo.label}
            </Typography>
          </Link>
        ))}
      </Box>
    </Box>
  );
}




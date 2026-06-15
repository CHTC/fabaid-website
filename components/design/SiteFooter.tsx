import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

const NSF_AWARD_URL = 'https://www.nsf.gov/awardsearch/show-award?AWD_ID=2609485';

const WIDE = { maxWidth: 1340, mx: 'auto' } as const;

interface Col {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}

const COLUMNS: Col[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Data Federation', href: '/data-federation/' },
      { label: 'Data Access Point', href: '/data-access-point/' },
      { label: 'Data Repositories', href: '/repository/' },
      { label: 'AI Agent Platform', href: '/ai-agent/' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Facilitation', href: '/facilitation/' },
      { label: 'Team', href: '/team/' },
      { label: 'About', href: '/about/' },
    ],
  },
  {
    heading: 'Powered by',
    links: [
      { label: 'Pelican ↗', href: 'https://pelicanplatform.org', external: true },
      { label: 'HTCondor ↗', href: 'https://htcondor.org', external: true },
      { label: 'OSG ↗', href: 'https://osg-htc.org', external: true },
      { label: 'CHTC ↗', href: 'https://chtc.wisc.edu', external: true },
    ],
  },
];

export default function SiteFooter() {
  return (
    <Box component='footer' sx={{ bgcolor: colors.black, color: '#b6b0a7', pt: 8, pb: 4.5 }}>
      <Container maxWidth={false} sx={WIDE}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1fr 1fr' },
            gap: 5,
            pb: 5.5,
            borderBottom: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <Box>
            <Typography
              component='span'
              variant='h5'
              sx={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.03em', color: '#fff' }}
            >
              Fab
              <Box component='b' sx={{ color: colors.red300 }}>AID</Box>
            </Typography>
            <Typography sx={{ color: colors.onInkMuted, fontSize: '0.92rem', maxWidth: '34ch', mt: 2 }}>
              A national fabric of open data services for data-intensive and AI-driven research.
            </Typography>
          </Box>

          {COLUMNS.map((col) => (
            <Box key={col.heading}>
              <Typography
                component='h5'
                variant='h6'
                sx={{
                  fontWeight: 600,
                  color: '#fff',
                  fontSize: '0.78rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  mb: 2,
                }}
              >
                {col.heading}
              </Typography>
              <Box component='ul' sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {col.links.map((l) => (
                  <Box component='li' key={l.label} sx={{ mb: 1.25 }}>
                    <Link
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener' : undefined}
                      underline='none'
                      sx={{ fontSize: '0.92rem', color: '#b6b0a7', '&:hover': { color: '#fff' } }}
                    >
                      {l.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2.5,
            flexWrap: 'wrap',
            pt: 3.5,
            fontFamily: mono,
            fontSize: '0.72rem',
            letterSpacing: '0.03em',
            color: '#7d7770',
            '& a': { color: '#7d7770', '&:hover': { color: '#fff' } },
          }}
        >
          <Box component='span' sx={{ maxWidth: '70ch' }}>
            Supported by the National Science Foundation under{' '}
            <Link href={NSF_AWARD_URL} target='_blank' rel='noopener' underline='hover'>
              Cooperative Agreement OAC-2331480
            </Link>
            . Operated by the Center for High Throughput Computing · University of
            Wisconsin–Madison.
          </Box>
          <Box component='span'>
            © 2026 ·{' '}
            <Link
              href='https://www.wisc.edu/privacy-notice/'
              target='_blank'
              rel='noopener'
              underline='hover'
            >
              Privacy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

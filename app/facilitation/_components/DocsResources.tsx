import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { MenuBook, Hub, Terminal, Storage, Launch } from '@mui/icons-material';

import { SectionHead, LinkArrow, colors, mono } from '@/components/design';

/** The one hand-picked, in-depth guide, given prominence. */
const FEATURED = {
  eyebrow: 'Featured · Getting started',
  title: 'Pelican Platform Documentation',
  body: 'The core guide to the platform the fabric is built on. Learn how pelican:// URLs work and how to stream data from the OSDF using the Pelican command-line client, Python (pelicanfs), and more.',
  href: 'https://docs.pelicanplatform.org/getting-started',
  cta: 'Read the Pelican docs',
};

/** General documentation sites worth pointing FabAID users to. */
const RESOURCES: {
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
}[] = [
  {
    icon: <Hub />,
    title: 'OSPool Documentation Portal',
    body: 'Account setup, submitting jobs, managing data, GPUs, and worked examples across many fields of science.',
    href: 'https://portal.osg-htc.org/documentation/',
  },
  {
    icon: <Terminal />,
    title: 'HTCondor Manual',
    body: 'The complete reference for writing submit files, scaling to thousands of jobs, and building workflows with DAGMan.',
    href: 'https://htcondor.readthedocs.io/en/latest/',
  },
  {
    icon: <Storage />,
    title: 'OSDF Overview',
    body: 'How the Open Science Data Federation distributes data through origins and caches positioned near the compute.',
    href: 'https://osg-htc.org/docs/data/osdf/overview/',
  },
];

export default function DocsResources() {
  return (
    <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
      <Container maxWidth='lg'>
        <SectionHead
          kicker='Documentation & resources'
          title='Learn the fabric, in your own time.'
          lead='Beyond hands-on facilitation, these are the references our team leans on — start with the featured guide, then dig into the wider ecosystem.'
        />

        {/* Featured guide — given prominence over the pointer cards. */}
        <Box
          sx={{
            position: 'relative',
            bgcolor: colors.surface,
            border: `1px solid ${colors.line}`,
            borderLeft: `4px solid ${colors.red}`,
            borderRadius: '14px',
            p: { xs: 3.5, md: 5 },
            mb: 3,
            display: 'flex',
            gap: { xs: 3, md: 5 },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
          }}
        >
          <Box sx={{ flex: '1 1 420px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: colors.red050,
                  color: colors.red,
                  flex: 'none',
                  '& svg': { fontSize: 24 },
                }}
              >
                <MenuBook />
              </Box>
              <Box
                component='span'
                sx={{
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: colors.red,
                }}
              >
                {FEATURED.eyebrow}
              </Box>
            </Box>
            <Typography variant='h3' component='h3' sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
              {FEATURED.title}
            </Typography>
            <Typography sx={{ mt: 1, color: colors.muted, fontSize: '1.02rem', lineHeight: 1.6 }}>
              {FEATURED.body}
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='primary'
            size='large'
            href={FEATURED.href}
            target='_blank'
            rel='noopener noreferrer'
            endIcon={<Launch />}
            sx={{ borderRadius: '999px', flex: 'none' }}
          >
            {FEATURED.cta}
          </Button>
        </Box>

        {/* General documentation pointers. */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {RESOURCES.map((r) => (
            <Box
              key={r.title}
              sx={{
                bgcolor: colors.surface,
                border: `1px solid ${colors.line}`,
                borderRadius: '14px',
                p: 3.5,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
                transition: '.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 24px rgba(20,16,10,.09), 0 2px 6px rgba(20,16,10,.05)',
                  borderColor: colors.lineStrong,
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: colors.red050,
                  color: colors.red,
                  mb: 2,
                  '& svg': { fontSize: 24 },
                }}
              >
                {r.icon}
              </Box>
              <Typography variant='h3' component='h3' sx={{ fontSize: '1.2rem', mb: 0.75 }}>
                {r.title}
              </Typography>
              <Typography sx={{ color: colors.muted, fontSize: '0.95rem', mb: 2, flexGrow: 1 }}>
                {r.body}
              </Typography>
              <LinkArrow href={r.href} target='_blank' rel='noopener noreferrer'>
                Visit
              </LinkArrow>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

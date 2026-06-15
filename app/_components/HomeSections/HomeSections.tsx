import { Box, Container, Link, Typography } from '@mui/material';
import {
  Storage,
  ViewStream,
  SmartToy,
  Public,
  Inventory2,
  Diversity3,
  School,
} from '@mui/icons-material';
import React from 'react';

import {
  SectionHead,
  IconCard,
  LinkArrow,
  colors,
} from '@/components/design';

const PELICAN_LOGO = '/images/logos/pelican_small.png';
const HTCONDOR_LOGO = '/images/logos/htcondor_small.svg';

/* ----------------------------- Services grid ----------------------------- */

const SERVICES = [
  {
    num: '01',
    icon: <Storage />,
    title: 'Origin',
    body: 'Bring your own data source — connect existing storage over S3, Globus, or POSIX. No migration required.',
    tag: 'powered by Pelican ↗',
    tagLogo: PELICAN_LOGO,
    href: '/data-federation/',
  },
  {
    num: '02',
    icon: <ViewStream />,
    title: 'Data Access Point',
    body: 'Place and manage data-intensive workloads next to the data, with throughput-optimized scheduling.',
    tag: 'built on HTCondor ↗',
    tagLogo: HTCONDOR_LOGO,
    href: '/data-access-point/',
  },
  {
    num: '03',
    icon: <Inventory2 />,
    title: 'Data Repositories',
    body: 'Browse the data repositories integrated with the OSDF — their datasets, access, and namespaces.',
    tag: 'FabAID service',
    href: '/repository/',
  },
  {
    num: '04',
    icon: <SmartToy />,
    title: 'AI Agent Platform',
    body: 'An LLM assistant that helps researchers move data and orchestrate workflows in plain language.',
    tag: 'OpenWebUI · Ollama ↗',
    href: '/ai-agent/',
  },
  {
    num: '05',
    icon: <Public />,
    title: 'CDN & caching',
    body: 'Anycast caches positioned near most U.S. institutions keep hot data close to the compute.',
    tag: 'powered by Pelican · part of OSDF',
    tagLogo: PELICAN_LOGO,
    href: '/data-federation/',
  },
];

export function ServicesGrid() {
  return (
    <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
      <Container maxWidth='lg'>
        <SectionHead
          center
          kicker='What we provide'
          title='The service fabric'
          lead='Six composable services that take data from a repository all the way to a running, AI-assisted workflow — built on open infrastructure.'
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {SERVICES.map((s) => (
            <IconCard key={s.title} hover {...s} />
          ))}
          {/* CTA card */}
          <Link
            href='mailto:contact@fabaid.io'
            underline='none'
            sx={{
              borderRadius: '14px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 1.25,
              color: '#fff',
              background: `linear-gradient(160deg, ${colors.red}, ${colors.red800})`,
            }}
          >
            <Typography variant='h3' component='h3' sx={{ color: '#fff', fontSize: '1.45rem' }}>
              Contact us to integrate
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,.82)' }}>
              We are here to help you integrate your data workflow into the fabric.
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5em',
                fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,.22)',
                bgcolor: 'rgba(255,255,255,.08)',
                borderRadius: '999px',
                px: 1.75,
                py: 0.75,
              }}
            >
              Contact Us →
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

/* -------------------------- Facilitation + school ------------------------ */

export function FacilitationSchool() {
  return (
    <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
      <Container maxWidth='lg'>
        <SectionHead kicker='People, not just pipes' title='We meet researchers where they are.' />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <IconCard hover icon={<Diversity3 />} title='Data Facilitation'>
            <Typography sx={{ color: colors.muted, fontSize: '0.98rem', mb: 1.5 }}>
              Our facilitators treat researchers as partners, guiding teams through a path of{' '}
              <b>Exploration → Adoption → Ownership</b> so your group builds lasting capability —
              not a dependency.
            </Typography>
            <LinkArrow href='/facilitation/'>Meet the team</LinkArrow>
          </IconCard>
          <IconCard hover icon={<School />} title='Data-Intensive Science School'>
            <Typography sx={{ color: colors.muted, fontSize: '0.98rem', mb: 1.5 }}>
              Our annual summer school — the successor to the renowned OSG User School — teaches the
              skills and methodologies for managing data-intensive and AI workloads at scale.
            </Typography>
            <LinkArrow href='/facilitation/'>Learn more</LinkArrow>
          </IconCard>
        </Box>
      </Container>
    </Box>
  );
}

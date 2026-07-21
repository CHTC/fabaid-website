import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container, Link, Typography } from '@mui/material';
import { Launch } from '@mui/icons-material';

import {
  PageHero,
  SectionHead,
  HeroStats,
  Kicker,
  Callout,
  cardSx,
  cardHoverSx,
  colors,
  mono,
} from '@/components/design';

export const metadata: Metadata = {
  title: 'Community | FabAID',
  description:
    'The projects on the fabric — from LIGO and IceCube to NCAR, NRAO, DUNE, and NOAA — spanning astrophysics, climate, and the physical sciences.',
};

const COMMUNITY_STATS = [
  { value: '>80', label: 'Institutions served' },
  { value: '>250', label: 'Projects supported' },
  { value: '>280 PB', label: 'Research data delivered' },
  { value: '39', label: 'Fields of science' },
];

interface Project {
  domain: string;
  name: string;
  org: string;
  body: string;
  href: string;
}

const PROJECTS: Project[] = [
  {
    domain: 'Gravitational waves',
    name: 'LIGO & the international gravitational-wave network',
    org: 'LIGO Laboratory, Caltech',
    body: 'Data from the LIGO, Virgo, and KAGRA interferometers moves over the fabric to help detect black-hole and neutron-star collisions — a cornerstone of NSF multi-messenger astronomy.',
    href: 'https://www.ligo.caltech.edu/',
  },
  {
    domain: 'Neutrino astronomy',
    name: 'IceCube Neutrino Observatory',
    org: 'University of Wisconsin–Madison',
    body: 'A cubic kilometer of Antarctic ice with over 5,000 optical sensors near the South Pole, catching cosmic neutrinos from black holes, supernovae, and gamma-ray bursts.',
    href: 'https://icecube.wisc.edu/',
  },
  {
    domain: 'Climate & Earth science',
    name: 'NCAR Research Data Archive',
    org: 'NSF National Center for Atmospheric Research',
    body: 'Atmospheric and Earth-system datasets — weather models, reanalysis, and observations — delivered to educators and researchers nationwide through the OSDF.',
    href: 'https://ncar.ucar.edu/',
  },
  {
    domain: 'Radio astronomy',
    name: 'VLA Sky Survey (VLASS)',
    org: 'National Radio Astronomy Observatory',
    body: 'Processing observations from the Very Large Array to build some of the deepest all-sky radio images ever made — at up to 300× the throughput on shared national capacity.',
    href: 'https://public.nrao.edu/vlass/',
  },
  {
    domain: 'Particle physics',
    name: 'DUNE',
    org: 'Fermi National Accelerator Laboratory',
    body: 'The Deep Underground Neutrino Experiment delivers common inputs for large-scale simulation jobs across the US over the OSDF, probing why the universe is made of matter.',
    href: 'https://lbnf-dune.fnal.gov/',
  },
  {
    domain: 'Nuclear physics',
    name: 'Electron-Ion Collider (ePIC)',
    org: 'Jefferson Lab & Brookhaven National Laboratory',
    body: 'Simulating the detector for the next-generation collider being built at Brookhaven, with input datasets served to collaborators through the fabric.',
    href: 'https://www.jlab.org/eic',
  },
  {
    domain: 'Ocean science',
    name: 'NOAA Water Column Sonar',
    org: 'National Oceanic and Atmospheric Administration',
    body: 'Active-acoustic data mapping fish schools and mid-water marine life — archived at NCEI and delivered through the fabric for abundance and habitat studies.',
    href: 'https://www.ncei.noaa.gov/products/water-column-sonar-data',
  },
  {
    domain: 'Climate science',
    name: 'NASA ECCO ocean simulation',
    org: 'National Science Data Fabric',
    body: 'A 4+ PB simulation of global ocean circulation, converted and served over the fabric to make petascale climate data explorable — feeding the 2026 IEEE SciVis contest.',
    href: 'https://nationalsciencedatafabric.org/',
  },
];

function ProjectCard({ domain, name, org, body, href }: Project) {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener'
      underline='none'
      sx={{ ...cardSx, ...cardHoverSx, color: 'inherit', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Launch
        sx={{ position: 'absolute', top: 18, right: 18, fontSize: 18, color: colors.muted2 }}
        aria-hidden='true'
      />
      <Box
        sx={{
          fontFamily: mono,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: colors.red,
          mb: 1.25,
        }}
      >
        {domain}
      </Box>
      <Typography component='b' variant='h6' sx={{ fontSize: '1.15rem', pr: 3, lineHeight: 1.25 }}>
        {name}
      </Typography>
      <Box sx={{ fontFamily: mono, fontSize: '0.72rem', color: colors.muted, mt: 0.6, mb: 1.25 }}>
        {org}
      </Box>
      <Typography sx={{ color: colors.muted, fontSize: '0.95rem' }}>{body}</Typography>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Community' }]}
        kicker='Community'
        title={
          <>
            Real science,
            <br />
            running on the fabric.
          </>
        }
        lead='The fabric builds on decades of experience; it carries the data of national collaborations across physics, astronomy, and the Earth sciences. From gravitational waves to the water cycle, these are the projects that depend on it every day.'
        action={<HeroStats stats={COMMUNITY_STATS} note='Across the past 12 months' />}
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead
            kicker='On the fabric now'
            title='Projects that move data over the fabric.'
            lead='A selection of the collaborations connecting their repositories and workloads to the fabric.'
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Wider HTCondor community + link to its showcase */}
      <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
        <Container maxWidth='lg' sx={{ py: { xs: 7, md: 11 } }}>
          <Box sx={{ mb: 2.5 }}>
            <Kicker onDark>A wider community</Kicker>
            <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '24ch' }}>
              Four decades of high-throughput science.
            </Typography>
          </Box>
          <Typography sx={{ color: colors.onInkLead, maxWidth: '62ch', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
            The projects on the fabric join hundreds of organizations across academia, government,
            and industry that have run high-throughput workloads on HTCondor for decades. HTCondor
            keeps a growing showcase of that science — from the Large Hadron Collider and the Event
            Horizon Telescope to campus labs analyzing everything from judicial records to dairy-cow
            health.
          </Typography>
          <Box sx={{ mt: 3.5 }}>
            <Link
              href='https://htcondor.org/featured-users.html'
              target='_blank'
              rel='noopener'
              underline='none'
              sx={{
                fontWeight: 600,
                color: colors.red300,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4em',
                '&:hover span': { transform: 'translateX(3px)' },
                '&:hover': { color: '#fff' },
              }}
            >
              See the science supported by HTCondor
              <Box component='span' sx={{ transition: 'transform .2s ease' }} aria-hidden='true'>
                →
              </Box>
            </Link>
          </Box>
        </Container>
      </Box>

      <Callout />
    </>
  );
}

import { Box, Container, Typography } from '@mui/material';
import {
  Hub,
  Code,
  Groups,
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

/* ----------------------------- Services grid ----------------------------- */

const PILLARS = [
  {
    icon: <Diversity3 />,
    title: 'Facilitation',
    body: 'Our facilitators partner with your team hands-on — mapping workflows onto the fabric and building lasting capability, not tickets.',
    href: '/facilitation/',
  },
  {
    icon: <Code />,
    title: 'Software',
    body: 'Open-source software — from Pelican to HTCondor — that moves, caches, and orchestrates data-intensive and AI workloads at scale.',
    href: '/software/',
  },
  {
    icon: <Groups />,
    title: 'Community',
    body: 'A national community of researchers, campuses, and projects learning and building together across every field of science.',
    href: '/community/',
  },
  {
    icon: <Hub />,
    title: 'Services',
    body: 'A composable fabric of open data services — delivery, transformation, caching, and access points — hosted and ready to use.',
    href: '/services/',
  },
];

export function ServicesGrid() {
  return (
    <Box component='section' id='services' sx={{ py: { xs: 7, md: 13 }, scrollMarginTop: '80px' }}>
      <Container maxWidth='lg'>
        <SectionHead
          center
          kicker='The fabric'
          title='What we are building.'
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {PILLARS.map((p) => (
            <IconCard key={p.title} hover {...p} />
          ))}
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
        <SectionHead kicker=' ' title='We meet researchers where they are.' />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <IconCard hover icon={<Diversity3 />} title='Data Facilitation'>
            <Typography sx={{ color: colors.muted, fontSize: '0.98rem', mb: 1.5 }}>
              Our facilitators treat researchers as partners, guiding teams through a path of{' '}
              <b>Exploration → Adoption → Independence</b> so your group builds lasting capability.
            </Typography>
            <LinkArrow href='/facilitation/'>Meet the team</LinkArrow>
          </IconCard>
          <IconCard hover icon={<School />} title='Data-Intensive Science School'>
            <Typography sx={{ color: colors.muted, fontSize: '0.98rem', mb: 1.5 }}>
              Our annual summer school teaches the skills and methodologies for managing
              data-intensive and AI workloads at scale.
            </Typography>
            <LinkArrow href='/facilitation/'>Learn more</LinkArrow>
          </IconCard>
        </Box>
      </Container>
    </Box>
  );
}

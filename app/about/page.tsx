import * as React from 'react';
import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Link, Typography } from '@mui/material';
import { Launch } from '@mui/icons-material';

import {
  PageHero,
  SectionHead,
  Split,
  Kicker,
  Callout,
  cardSx,
  cardHoverSx,
  colors,
} from '@/components/design';

export const metadata: Metadata = {
  title: 'About | FabAID',
  description: 'FabAID is an open data-services fabric operated by CHTC at UW–Madison, funded by the NSF.',
};

const PARTNERS = [
  { name: 'OSG', body: 'Distributed High Throughput Computing for the national science community.', href: 'https://osg-htc.org', logo: '/images/logos/osg.svg' },
  { name: 'CHTC', body: 'The Center for High Throughput Computing — operator of the fabric.', href: 'https://chtc.wisc.edu', logo: '/images/logos/chtc.png' },
];

const PROJECTS = [
  { name: 'Pelican', body: 'Open-source software for federating and delivering data across repositories.', href: 'https://pelicanplatform.org', logo: '/images/logos/pelican.png' },
  { name: 'HTCondor', body: 'Open-source High Throughput Computing software that schedules workloads at scale.', href: 'https://htcondor.org', logo: '/images/logos/htcondor.png' },
];

const INSTITUTIONS = [
  { name: 'Morgridge Institute for Research', href: 'https://morgridge.org', logo: '/images/logos/morgridge.png' },
  { name: 'University of Wisconsin–Madison', href: 'https://www.wisc.edu', logo: '/images/logos/uw-madison.png' },
  { name: 'UC San Diego', href: 'https://ucsd.edu', logo: '/images/logos/ucsd.png' },
  { name: 'University of Nebraska–Lincoln', href: 'https://www.unl.edu', logo: '/images/logos/unl.png' },
  { name: 'Purdue University', href: 'https://www.purdue.edu', logo: '/images/logos/purdue.png' },
  { name: 'Princeton University', href: 'https://www.princeton.edu', logo: '/images/logos/princeton.png' },
];

function GroupLabel({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Typography
      component='h3'
      sx={{
        fontWeight: 700,
        fontSize: '0.78rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: colors.red,
        mb: 2.5,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function BrandCard({ name, body, href, logo }: { name: string; body: string; href: string; logo: string }) {
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
      <Typography component='b' variant='h6' sx={{ fontSize: '1.15rem', pr: 3 }}>
        {name}
      </Typography>
      <Typography sx={{ color: colors.muted, fontSize: '0.95rem', mt: 0.75 }}>{body}</Typography>
      <Box sx={{ mt: 'auto', pt: 3, width: '55%', alignSelf: 'flex-start' }}>
        <Box sx={{ position: 'relative', height: 44, width: '100%' }}>
          <ExportedImage
            src={logo}
            alt=''
            aria-hidden='true'
            fill
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
            sizes='200px'
          />
        </Box>
      </Box>
    </Link>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        kicker='About FabAID'
        title={
          <>
            Data-services shaped by
            <br />
            every field of research.
          </>
        }
        lead='FabAID is an open data-services initiative operated by the Center for High Throughput Computing, building on decades of distributed computing leadership at UW–Madison.'
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
            <Box>
              <Kicker>Our mission</Kicker>
              <Typography variant='h2' component='h2'>A fabric to integrate the nations data and compute.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                We believe access to data-intensive computing should be open, and that the future
                of the fabric should be shaped by insight from every discipline and campus.
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                aspectRatio: '5 / 4',
                border: `1px solid ${colors.line}`,
                boxShadow: '0 6px 24px rgba(20,16,10,.09)',
              }}
            >
              <ExportedImage
                src='/images/general/madison_wi.jpeg'
                alt='University of Wisconsin–Madison, home of CHTC'
                fill
                style={{ objectFit: 'cover' }}
                sizes='(max-width: 900px) 100vw, 50vw'
              />
            </Box>
          </Split>
        </Container>
      </Box>

      <Box
        component='section'
        id='partners'
        sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 }, scrollMarginTop: '80px' }}
      >
        <Container maxWidth='lg'>
          <SectionHead center kicker=" " title='Home to a national community.' />

          <GroupLabel>Partners</GroupLabel>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            {PARTNERS.map((p) => (
              <BrandCard key={p.name} {...p} />
            ))}
          </Box>

          <GroupLabel sx={{ mt: { xs: 5, md: 7 } }}>Projects</GroupLabel>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            {PROJECTS.map((p) => (
              <BrandCard key={p.name} {...p} />
            ))}
          </Box>

          <GroupLabel sx={{ mt: { xs: 5, md: 7 } }}>Institutions</GroupLabel>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {INSTITUTIONS.map((inst) => (
              <Link
                key={inst.name}
                href={inst.href}
                target='_blank'
                rel='noopener'
                underline='none'
                sx={{
                  ...cardSx,
                  ...cardHoverSx,
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1.5,
                  p: 2.5,
                }}
              >
                <Typography component='b' sx={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>
                  {inst.name}
                </Typography>
                <Launch sx={{ flex: 'none', fontSize: 18, color: colors.muted2 }} aria-hidden='true' />
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
        <Container maxWidth='lg' sx={{ py: { xs: 7, md: 11 } }}>
          <Box sx={{ mb: 2.5 }}>
            <Kicker onDark>Funded by</Kicker>
            <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '20ch' }}>
              A five-year National Science Foundation award.
            </Typography>
          </Box>
          <Typography sx={{ color: colors.onInkLead, maxWidth: '60ch', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
            FabAID is supported by the NSF, operated by CHTC at the University of Wisconsin–Madison,
            in partnership with the Morgridge Institute for Research, under Cooperative Agreement OAC-2609485.
          </Typography>
        </Container>
      </Box>

      <Callout />
    </>
  );
}

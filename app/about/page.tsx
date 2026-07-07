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
  { name: 'CHTC', body: 'Center for High Throughput Computing — operator of the fabric.', href: 'https://chtc.wisc.edu', logo: '/images/logos/chtc.png' },
  { name: 'Morgridge Institute', body: 'Biomedical research partner investing in the HTC vision.', href: 'https://morgridge.org', logo: '/images/logos/morgridge.png' },
  { name: 'PATh', body: 'NSF-funded partnership advancing throughput computing nationally.', href: 'https://path-cc.io', logo: '/images/logos/path.png' },
  { name: 'OSG Consortium', body: 'Distributed HTC for the national science community.', href: 'https://osg-htc.org', logo: '/images/logos/osg.svg' },
  { name: 'Pelican', body: 'Open platform for federating data repositories.', href: 'https://pelicanplatform.org', logo: '/images/logos/pelican.png' },
  { name: 'HTCondor', body: 'Open-source High Throughput Computing software at the heart of the fabric.', href: 'https://htcondor.org', logo: '/images/logos/htcondor.png' },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        kicker='About FabAID'
        title={
          <>
            A fabric shaped by
            <br />
            every field of research.
          </>
        }
        lead='FabAID is an open data-services initiative operated by the Center for High Throughput Computing, building on two decades of distributed computing leadership at UW–Madison.'
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
            <Box>
              <Kicker>Our mission</Kicker>
              <Typography variant='h2' component='h2'>Bring the power of the fabric to all fields of research.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                We believe access to data-intensive computing should be open, and that the future
                of the fabric should be shaped by insight from every discipline — from astrophysics
                to the humanities.
              </Typography>
              <Typography sx={{ mt: 2, color: colors.muted }}>
                FabAID extends CHTC&apos;s long tradition of High Throughput Computing into the era
                of large datasets and AI, federating storage and compute into a single, welcoming
                service layer.
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

      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead
            center
            kicker='Partners & projects'
            title='Home to, and supported by, a national community.'
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {PARTNERS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                target={p.href.startsWith('http') ? '_blank' : undefined}
                rel={p.href.startsWith('http') ? 'noopener' : undefined}
                underline='none'
                sx={{ ...cardSx, ...cardHoverSx, color: 'inherit', display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                <Launch
                  sx={{ position: 'absolute', top: 18, right: 18, fontSize: 18, color: colors.muted2 }}
                  aria-hidden='true'
                />
                <Typography component='b' variant='h6' sx={{ fontSize: '1.15rem', pr: 3 }}>
                  {p.name}
                </Typography>
                <Typography sx={{ color: colors.muted, fontSize: '0.95rem', mt: 0.75 }}>{p.body}</Typography>
                <Box sx={{ mt: 'auto', pt: 3, width: '70%', alignSelf: 'flex-start' }}>
                  <Box sx={{ position: 'relative', height: 44, width: '100%' }}>
                    <ExportedImage
                      src={p.logo}
                      alt=''
                      aria-hidden='true'
                      fill
                      style={{ objectFit: 'contain', objectPosition: 'left center' }}
                      sizes='200px'
                    />
                  </Box>
                </Box>
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
            in partnership with the Morgridge Institute for Research, under Cooperative Agreement
            OAC-2331480.
          </Typography>
        </Container>
      </Box>

      <Callout />
    </>
  );
}

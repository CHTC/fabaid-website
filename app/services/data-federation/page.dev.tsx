import * as React from 'react';
import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Typography } from '@mui/material';

import {
  PageHero,
  SectionHead,
  Steps,
  Split,
  CheckList,
  Placeholder,
  PoweredByChip,
  LinkArrow,
  Kicker,
  Callout,
  cardSx,
  colors,
} from '@/components/design';
import { getOsdfCaches } from '@/utils/osdfCaches';
import { getOsdfProjects, pickFeaturedProject } from '@/utils/osdfProjects';
import { ProjectSummary } from '@/components/projects';
import CacheMap from './_components/CacheMap';

export const metadata: Metadata = {
  title: 'Data Federation | FabAID',
  description:
    'Federate your existing storage to a national network of caches with the Open Science Data Federation.',
};

const STEPS = [
  {
    marker: 'STEP 01',
    title: 'Register an Origin',
    body: 'Connect your existing storage. Pelican advertises your namespace to the federation.',
  },
  {
    marker: 'STEP 02',
    title: 'Caches pull on demand',
    body: 'Caches near most US institutions fetch and hold hot objects close to compute.',
  },
  {
    marker: 'STEP 03',
    title: 'Workloads read locally',
    body: 'Jobs at any Access Point read from the nearest cache — no manual staging.',
  },
];

async function PageDev() {
  const [caches, projects] = await Promise.all([getOsdfCaches(), getOsdfProjects()]);
  const featured = pickFeaturedProject(projects);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Data Federation' }]}
        kicker='Open Science Data Federation'
        title={
          <>
            Federate your data.
            <br />
            Deliver it anywhere.
          </>
        }
        lead='The Open Science Data Federation connects your existing storage to a national network of caches — so data lands next to the compute, without copies or migrations.'
        media={
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: '22px',
              p: { xs: 4, md: 5 },
              boxShadow: '0 20px 50px rgba(0,0,0,.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '1 / 1', mx: 'auto' }}>
              <ExportedImage
                src='/images/logos/osdf.png'
                alt='Open Science Data Federation (OSDF)'
                fill
                style={{ objectFit: 'contain' }}
                sizes='300px'
              />
            </Box>
          </Box>
        }
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
            <Box>
              <Kicker>Origin</Kicker>
              <Typography variant='h2' component='h2'>Bring your own data source.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                Point an Origin at storage you already run. FabAID exposes it to the federation
                through Pelican — no re-hosting, no lock-in.
              </Typography>
              <CheckList
                items={[
                  <><b>S3 &amp; object stores</b> — AWS, Ceph, MinIO and S3-compatible endpoints.</>,
                  <><b>Globus &amp; POSIX</b> — campus filesystems and existing Globus collections.</>,
                  <><b>Access controls preserved</b> — your authorization rules travel with the data.</>,
                ]}
              />
            </Box>
            {caches.length > 0 ? (
              <CacheMap caches={caches} />
            ) : (
              <Placeholder
                label='federation map — caches across the US'
                sx={{ borderRadius: '22px', aspectRatio: '5 / 4', border: `1px solid ${colors.line}`, boxShadow: '0 6px 24px rgba(20,16,10,.09)' }}
              />
            )}
          </Split>
        </Container>
      </Box>

      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead center kicker='How it works' title='Your data on a National Fabric, in three steps.' />
          <Steps steps={STEPS} />
        </Container>
      </Box>

      {featured && (
        <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
          <Container maxWidth='lg'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 2,
                mb: { xs: 4, md: 6 },
              }}
            >
              <Box>
                <Kicker>On the fabric now</Kicker>
                <Typography variant='h2' component='h2'>
                  Real science moving data over the OSDF.
                </Typography>
              </Box>
              <LinkArrow href='/osdf-users/'>
                See all {projects.length} OSDF projects
              </LinkArrow>
            </Box>
            <Box sx={{ ...cardSx, p: { xs: 3, md: 5 } }}>
              <ProjectSummary project={featured} />
              <Box sx={{ mt: 3 }}>
                <LinkArrow href={`/osdf-users/${encodeURIComponent(featured.name)}/`}>
                  View this project
                </LinkArrow>
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      <Callout />
    </>
  );
}

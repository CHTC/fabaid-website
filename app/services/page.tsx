import * as React from 'react';
import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Link, Typography } from '@mui/material';

import {
  PageHero,
  Split,
  CheckList,
  Kicker,
  PoweredByChip,
  Callout,
  colors,
} from '@/components/design';

export const metadata: Metadata = {
  title: 'Services | FabAID',
  description:
    'A composable fabric of open data services for data-intensive and AI-driven science — the Open Science Data Federation for moving data, and Access Points for running workloads.',
};

/** White, rounded panel that showcases a service logo beside its description. */
function LogoPanel({ src, alt }: { src: string; alt: string }) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '22px',
        p: { xs: 5, md: 7 },
        border: `1px solid ${colors.line}`,
        boxShadow: '0 6px 24px rgba(20,16,10,.09)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 280, aspectRatio: '1 / 1', mx: 'auto' }}>
        <ExportedImage src={src} alt={alt} fill style={{ objectFit: 'contain' }} sizes='280px' />
      </Box>
    </Box>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        kicker='Services'
        title={
          <>
            A fabric of open
            <br />
            data services.
          </>
        }
        lead='FabAID operates a fabric of services that accelerate data-intensive and AI-driven science. Two work together at its core: the Open Science Data Federation moves data to where it is needed, and Access Points let researchers run workloads on national capacity. Every service is hosted and ready to use — no infrastructure to stand up.'
      />

      {/* Intro / excerpt */}
      <Box component='section' sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth='md'>
          <Typography sx={{ color: colors.muted, fontSize: { xs: '1.15rem', md: '1.4rem' }, lineHeight: 1.6 }}>
            Research moves faster when data and computing are tied together into a coherent fabric. The
            fabric connects the storage a project already has to computing capacity across the
            nation&apos;s campuses and labs. A scientist can bring their data and research,
            and leave the plumbing to us.
          </Typography>
        </Container>
      </Box>

      {/* Open Science Data Federation — data */}
      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
            <Box>
              <Kicker>Data</Kicker>
              <Typography variant='h2' component='h2'>The Open Science Data Federation.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                The OSDF lets an organization connect its existing storage to the fabric and have its
                data delivered, on demand, wherever computing happens.  OSDF avoids human-managed copying
                and allows organizations to manage authorization control of the data.
              </Typography>
              <CheckList
                items={[
                  <><b>Connect a repository</b> — expose existing storage with an Origin, keeping your own access rules.  We handle the scale-out</>,
                  <><b>Delivery near compute</b> — a national network of caches pulls data close to where jobs run.</>,
                  <><b>Managed data movement</b> — pre-place datasets and coordinate transfers between stores.</>,
                ]}
              />
              <Box sx={{ mt: 3.25, display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
                <PoweredByChip label='Pelican' href='https://pelicanplatform.org' logo='/images/logos/pelican_small.png' />
              </Box>
            </Box>
            <LogoPanel src='/images/logos/osdf.png' alt='Open Science Data Federation' />
          </Split>
        </Container>
      </Box>

      {/* Access Points — compute & workflows */}
      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split reverse>
            <LogoPanel src='/images/logos/htcondor.png' alt='HTCondor-powered Access Points' />
            <Box>
              <Kicker>Compute &amp; workflows</Kicker>
              <Typography variant='h2' component='h2'>FabAID Access Points to run on national capacity.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                An Access Point is a researcher&apos;s home base on the fabric: a place to submit,
                manage, and scale data-intensive and AI workloads across compute capacity — from a
                single campus cluster to the nation&apos;s largest pools.
              </Typography>
              <CheckList
                items={[
                  <><b>Submit and scale</b> — send work to shared computing capacity and grow from one machine to many.</>,
                  <><b>Data-aware workflows</b> — jobs read and write through the OSDF, so reused data is close to the compute.</>,
                  <><b>Data workflow services</b> — hosted Access Points generate, ingest, and relocate datasets on the fabric.</>,
                ]}
              />
              <Box sx={{ mt: 3.25, display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
                <PoweredByChip label='HTCondor' href='https://htcondor.org' logo='/images/logos/htcondor_small.svg' />
              </Box>
            </Box>
          </Split>
        </Container>
      </Box>

      {/* Tie to the software */}
      <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
        <Container maxWidth='lg' sx={{ py: { xs: 7, md: 11 } }}>
          <Box sx={{ mb: 2.5 }}>
            <Kicker onDark>Under the hood</Kicker>
            <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '22ch' }}>
              Hosted services, open-source foundations.
            </Typography>
          </Box>
          <Typography sx={{ color: colors.onInkLead, maxWidth: '62ch', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
            FabAID runs these services for you, so campuses and projects with limited staff can use
            them while having minimal operational footprint. They are built on the same
            open-source platforms &mdash; the Pelican Platform and the HTCondor Software Suite &mdash;
            that FabAID develops in the open - you can always deploy your own!
          </Typography>
          <Box sx={{ mt: 3.5 }}>
            <Link
              href='/software/'
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
              Meet the software behind the fabric
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

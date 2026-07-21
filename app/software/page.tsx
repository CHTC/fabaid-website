import * as React from 'react';
import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Link, Typography } from '@mui/material';

import {
  PageHero,
  Split,
  CheckList,
  LinkArrow,
  Kicker,
  Callout,
  colors,
} from '@/components/design';

export const metadata: Metadata = {
  title: 'Software | FabAID',
  description:
    'The open-source software behind the fabric — the Pelican Platform and the HTCondor Software Suite — moving, caching, and orchestrating data-intensive and AI workloads at scale.',
};

/** White, rounded panel that showcases a project logo beside its description. */
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
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '16 / 10', mx: 'auto' }}>
        <ExportedImage src={src} alt={alt} fill style={{ objectFit: 'contain' }} sizes='300px' />
      </Box>
    </Box>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Software' }]}
        kicker='Open-source software'
        title={
          <>
            The software
            <br />
            behind the fabric.
          </>
        }
        lead='FabAID is built on two open-source platforms, developed in the open for decades and trusted at national scale — the Pelican Platform for data, and the HTCondor Software Suite for computation. Together they let any researcher connect any repository to computing capacity anywhere.'
      />

      {/* Pelican — data platform (first) */}
      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
            <Box>
              <Kicker>The data platform</Kicker>
              <Typography variant='h2' component='h2'>Pelican moves open data to where science happens.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                Pelican federates data repositories into a single namespace and delivers their
                objects — through a national network of caches — right next to the compute that
                needs them. It is the software foundation of the Open Science Data Federation.
                In FabAID, we are evolving Pelican to meet the demands of AI-driven science: tighter ecosystem integration,
                richer metadata and discovery, lightweight ways to connect smaller repositories, and improved staging management.
              </Typography>
              <CheckList
                items={[
                  <><b>Federate any repository</b> — connect storage you own by running an origin service.</>,
                  <><b>Deliver data anywhere</b> — caches across the US cyberinfrastructure pull hot objects close to compute, on demand.</>,
                  <><b>Evolving for AI-driven science</b> — improving metadata, discovery, and scale for the next generation of data-intensive workloads.</>,
                ]}
              />
              <Box sx={{ mt: 3.5 }}>
                <LinkArrow href='https://pelicanplatform.org' target='_blank' rel='noopener'>
                  Visit pelicanplatform.org
                </LinkArrow>
              </Box>
            </Box>
            <LogoPanel src='/images/logos/pelican.png' alt='Pelican Platform' />
          </Split>
        </Container>
      </Box>

      {/* HTCondor — workload engine */}
      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split reverse>
            <LogoPanel src='/images/logos/htcondor.png' alt='HTCondor Software Suite' />
            <Box>
              <Kicker>The workload engine</Kicker>
              <Typography variant='h2' component='h2'>HTCondor turns raw capacity into effective throughput.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                The HTCondor Software Suite manages and executes high-throughput workloads whether
                on a laptop or hundreds of thousands of cores. In the fabric, HTCondor is
                the workload engine powering FabAID&apos;s Access Points and data workflow services, scheduling
                the jobs that generate, transform, and move data across the federation.
              </Typography>
              <CheckList
                items={[
                  <><b>Scale without rewriting</b> — the same workload runs from a laptop to national-scale capacity.</>,
                  <><b>Powers the Access Points</b> — managing data-intensive and AI workloads.</>,
                  <><b>Drives data workflows</b> — orchestrates the services that ingest, process, and copy datasets across the fabric.</>,
                ]}
              />
              <Box sx={{ mt: 3.5 }}>
                <LinkArrow href='https://htcondor.org' target='_blank' rel='noopener'>
                  Visit htcondor.org
                </LinkArrow>
              </Box>
            </Box>
          </Split>
        </Container>
      </Box>

      {/* Open-source ethos + where it runs */}
      <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
        <Container maxWidth='lg' sx={{ py: { xs: 7, md: 11 } }}>
          <Box sx={{ mb: 2.5 }}>
            <Kicker onDark>Open by design</Kicker>
            <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '22ch' }}>
              Developed in the open, hardened at national scale.
            </Typography>
          </Box>
          <Typography sx={{ color: colors.onInkLead, maxWidth: '62ch', fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
            Both platforms are free and open source, built by CHTC at the University of
            Wisconsin&ndash;Madison and used worldwide.
          </Typography>
          <Box sx={{ mt: 3.5 }}>
            <Link
              href='/services/'
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
              Explore the services built on them
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

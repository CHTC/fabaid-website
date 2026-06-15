import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Search, GridView, AccountTree, Star } from '@mui/icons-material';

import { PageHero, SectionHead, IconCard, Callout, colors, mono } from '@/components/design';

export const metadata: Metadata = {
  title: 'Dataset Discovery | FabAID',
  description:
    'Search and browse datasets across the federation with rich metadata, provenance and DOI minting.',
};

const RESULTS = [
  { name: 'IceCube · neutrino-events-2024', meta: '6.2 PB · HDF5 · DOI:10.xxxx/abcd', state: 'open ↗' },
  { name: 'BMRB · nmr-restraints-v3', meta: '410 TB · mmCIF · DOI:10.xxxx/efgh', state: 'open ↗' },
  { name: 'xDD · geo-corpus-2025', meta: '88 TB · text+OCR · restricted', state: 'request ↗' },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component='span'
      sx={{
        fontFamily: mono,
        fontSize: '0.7rem',
        color: colors.red,
        border: `1px dashed ${colors.red}`,
        borderRadius: '6px',
        px: 0.75,
        py: 0.25,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Dataset Discovery' }]}
        kicker='Dataset Discovery'
        title={
          <>
            Find what data
            <br />
            already exists.
          </>
        }
        lead='Search and browse datasets across the entire federation — with rich metadata, provenance, and one-click access from any Access Point.'
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead center kicker='Search the federation' title='One index for every federated repository.' />
          <Paper
            elevation={0}
            sx={{
              maxWidth: 820,
              mx: 'auto',
              p: 2.75,
              borderRadius: '14px',
              border: `1px solid ${colors.line}`,
              boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                border: `1.5px solid ${colors.lineStrong}`,
                borderRadius: '999px',
                px: 2.25,
                py: 1.25,
              }}
            >
              <Search sx={{ color: colors.red, fontSize: 20 }} />
              <Box component='span' sx={{ fontFamily: mono, color: colors.muted, fontSize: '0.9rem' }}>
                neutrino events 2024 …
              </Box>
              <Box sx={{ flex: 1 }} />
              <Button variant='contained' color='primary' size='small' sx={{ borderRadius: '999px' }}>
                Search
              </Button>
            </Box>
            <Box sx={{ mt: 2, display: 'grid', gap: 1.25 }}>
              {RESULTS.map((r) => (
                <Box
                  key={r.name}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 1.75,
                    alignItems: 'center',
                    p: '14px 16px',
                    border: `1px solid ${colors.line}`,
                    borderRadius: '8px',
                  }}
                >
                  <Box>
                    <Box component='b'>{r.name}</Box>
                    <Box sx={{ fontFamily: mono, fontSize: '0.72rem', color: colors.muted, mt: 0.4 }}>
                      {r.meta}
                    </Box>
                  </Box>
                  <Tag>{r.state}</Tag>
                </Box>
              ))}
            </Box>
          </Paper>
        </Container>
      </Box>

      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <IconCard icon={<GridView />} title='Rich metadata' body='Schema, size, format and licensing surfaced for every object.' />
            <IconCard icon={<AccountTree />} title='Provenance' body='See where data came from and how it has been transformed.' />
            <IconCard icon={<Star />} title='DOI & citation' body='Mint DOIs and export citations so datasets are credited.' />
          </Box>
        </Container>
      </Box>

      <Callout />
    </>
  );
}

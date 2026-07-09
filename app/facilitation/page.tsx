import * as React from 'react';
import type { Metadata } from 'next';
import ExportedImage from 'next-image-export-optimizer';
import { Box, Button, Container, Paper, Typography } from '@mui/material';

import {
  PageHero,
  SectionHead,
  Steps,
  Split,
  CheckList,
  Kicker,
  Callout,
  colors,
  mono,
} from '@/components/design';
import { getStaff, byWeightThenName } from '@/utils/staff';

export const metadata: Metadata = {
  title: 'Facilitation | FabAID',
  description:
    'FabAID facilitation helps researchers and campuses adopt the fabric and build lasting capability. As partners we work together to better service other new researchers and small campuses to do the same.',
};

const SCIENCE_SCHOOL_IMAGE = '/images/general/madison_wi.jpeg';

const PHASES = [
  {
    title: 'Exploration',
    body: 'We learn your science and map workflows onto the fabric together — no commitment, no cost.',
  },
  {
    title: 'Adoption',
    body: 'You work with us to port your workload, tune throughput, and teach your team the tools hands-on.',
  },
  {
    title: 'Independence',
    body: 'Your group runs independently — we stay on call as partners, using your feedback to improve our services.',
  },
];

export default async function Page() {
  const team = await getStaff('fabaid');
  const facilitators = team
    .filter(
      (member) =>
        member.organizations.includes('fabaid') &&
        member.is_facilitator === 1 &&
        member.status !== 'Past'
    )
    .sort(byWeightThenName);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Facilitation' }]}
        kicker={" "}
        title={
          <>
            Researchers as
            <br />
            partners.
          </>
        }
        lead='FabAID facilitation helps researchers and campuses adopt the fabric and build lasting capability. As partners we work together to better service new researchers and small campuses to do the same.'
        action={
          <Button
            variant='contained'
            color='primary'
            size='large'
            href='mailto:contact@fabaid.io'
            sx={{ borderRadius: '999px' }}
          >
            Contact us&nbsp;→
          </Button>
        }
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead kicker='The facilitation model' title='Exploration → Adoption → Independence.' />
          <Steps steps={PHASES} />
        </Container>
      </Box>

      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Split>
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
                src={SCIENCE_SCHOOL_IMAGE}
                alt='Madison, Wisconsin — home of the Data-Intensive Science School'
                fill
                style={{ objectFit: 'cover' }}
                sizes='(max-width: 900px) 100vw, 50vw'
              />
            </Box>
            <Box>
              <Kicker>Learn with us</Kicker>
              <Typography variant='h2' component='h2'>The Data-Intensive Science School.</Typography>
              <Typography sx={{ mt: 1.75, color: colors.muted, fontSize: { xs: '1.1rem', md: '1.35rem' }, lineHeight: 1.55 }}>
                A week-long summer school in Madison covering the principles, tools, and
                methodologies of data-intensive and AI-driven computing — with hands-on labs on the
                fabric.
              </Typography>
              <CheckList
                items={[
                  'Open to graduate students, postdocs and facilitators nationwide.',
                  'Travel support available for participants.',
                  'Held each summer in Madison, Wisconsin.',
                ]}
              />
            </Box>
          </Split>
        </Container>
      </Box>

      {facilitators.length > 0 && (
        <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
          <Container maxWidth='lg'>
            <SectionHead
              center
              kicker='The team'
              title='Meet your facilitators.'
              lead='Applying decades of knowledge to your computing problems.'
            />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 3,
              }}
            >
              {facilitators.map((member) => (
                <Paper
                  key={member.name}
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    p: 3.5,
                    borderRadius: '14px',
                    border: `1px solid ${colors.line}`,
                    boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 96,
                      height: 96,
                      mx: 'auto',
                      mb: 1.75,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      bgcolor: colors.paper2,
                    }}
                  >
                    <ExportedImage
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes='96px'
                    />
                  </Box>
                  <Typography component='b' variant='h6' sx={{ fontSize: '1rem', display: 'block' }}>
                    {member.name}
                  </Typography>
                  <Box sx={{ fontFamily: mono, fontSize: '0.72rem', color: colors.muted, mt: 0.6 }}>
                    {member.title}
                  </Box>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      <Callout />
    </>
  );
}

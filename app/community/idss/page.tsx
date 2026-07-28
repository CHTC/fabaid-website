import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { Launch, Slideshow } from '@mui/icons-material';

import {
  PageHero,
  SectionHead,
  Kicker,
  colors,
  cardSx,
  cardHoverSx,
  mono,
} from '@/components/design';

export const metadata: Metadata = {
  title: 'IDSS Kickoff Virtual Meetings',
  description:
    'The virtual kickoff workshop for NSF Integrated Data Systems & Services (IDSS) projects — talks and slides from across the program.',
};

const SLIDES_CONTACT =
  'mailto:contact@fabaid.io?subject=IDSS%20Kickoff%20Workshop%20%E2%80%94%20slides';

interface Presentation {
  /** Talk title. */
  title: string;
  /** Presenter name(s). */
  presenter: string;
  /** Presenting project / institution. */
  org: string;
  /** Optional session or block label used to group the agenda, e.g. "Category I". */
  session?: string;
  /** Optional one-line abstract. */
  abstract?: string;
  /** Optional keyword tags. */
  tags?: string[];
  /** External link to the slides (Google Slides / Drive / PDF URL). Omit until received. */
  slidesUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Agenda. Add one entry per talk as projects confirm and slides arrive.
// Leave `slidesUrl` off until you have the link — the card shows a "slides to
// come" state automatically. Entries are grouped by `session` in array order.
// ─────────────────────────────────────────────────────────────────────────────
const PRESENTATIONS: Presentation[] = [
  {
    session: 'Category I',
    title: 'FabAID: A fabric for data-intensive and AI-driven science',
    presenter: 'Brian Bockelman',
    org: 'Morgridge Institute for Research & CHTC',
    abstract:
      'An introduction to the Fabric of AI-driven Data services and the goals of the IDSS kickoff.',
    tags: ['Category I', 'FabAID'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/FabAID.pdf',
  },
  {
     session: 'Category I',
     title: 'National Data Platform',
     presenter: 'Ilkay Altintas',
     org: 'University of California, San Diego',
     abstract: 'A Federated National AI-Ready Data Ecosystem for Discovery, Innovation, Education, and Workforce Development',
     tags: ['Category I', 'National Data Platform'],
     slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/Altintas-NDP-IDSS-KickOff-21July2026.pdf',
  },
  {
    session: 'Category II',
    title: 'National Science Data Fabric',
    presenter: 'Michaela Taufer',
    org: 'University of Tennessee, Knoxville',
    abstract: 'Every Scientist Should Be Able to Collaborate with Every Scientific Facility and Every AI: A National Digital Backbone for Autonomous Scientific Discovery',
    tags: ['Category II', 'NSDF'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/NSDF.pdf',
  },
  {
    session: 'Category II',
    title: 'MESA: Multidisciplinary Environment for Scientific Advancement',
    presenter: 'Tyson L. Swetnam',
    org: 'University of New Mexico',
    abstract: 'Building a shared, open-source platform in which scientific data from many fields are automatically described, organized, and connected.',
    tags: ['Category II', 'MESA'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/MESA.pdf',
  },
  {
    session: 'Category II',
    title: 'BRIDGE National Center',
    presenter: 'Chen Li',
    org: 'University of California, Berkeley',
    abstract: 'A National Center to Democratize Multi-Disciplinary Data Science and AI',
    tags: ['Category II', 'BRIDGE'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/BRIDGE.pdf',

  }
];

/** Group presentations by session, preserving first-seen order. */
function groupBySession(items: Presentation[]): [string, Presentation[]][] {
  const groups = new Map<string, Presentation[]>();
  for (const item of items) {
    const key = item.session ?? 'Presentations';
    const bucket = groups.get(key);
    if (bucket) bucket.push(item);
    else groups.set(key, [item]);
  }
  return [...groups.entries()];
}

function SlidesState({ slidesUrl }: { slidesUrl?: string }) {
  if (slidesUrl) {
    return (
      <Box
        component='span'
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4em',
          fontWeight: 600,
          color: colors.red,
          '.pres-card:hover &': { textDecoration: 'underline' },
        }}
      >
        <Slideshow sx={{ fontSize: 18 }} aria-hidden='true' />
        View slides
        <Launch sx={{ fontSize: 15 }} aria-hidden='true' />
      </Box>
    );
  }
  return (
    <Box
      component='span'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        fontFamily: mono,
        fontSize: '0.72rem',
        letterSpacing: '0.03em',
        color: colors.muted2,
        border: `1px dashed ${colors.lineStrong}`,
        borderRadius: '6px',
        px: 0.9,
        py: 0.35,
      }}
    >
      Slides to come
    </Box>
  );
}

function PresentationCard({ p }: { p: Presentation }) {
  const inner = (
    <>
      <Typography component='b' variant='h6' sx={{ fontSize: '1.12rem', lineHeight: 1.28 }}>
        {p.title}
      </Typography>
      <Box sx={{ fontFamily: mono, fontSize: '0.72rem', color: colors.muted, mt: 0.75 }}>
        {p.presenter} · {p.org}
      </Box>
      {p.abstract && (
        <Typography sx={{ color: colors.muted, fontSize: '0.95rem', mt: 1.25 }}>
          {p.abstract}
        </Typography>
      )}
      {p.tags && p.tags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
          {p.tags.map((tag) => (
            <Box
              key={tag}
              component='span'
              sx={{
                fontFamily: mono,
                fontSize: '0.68rem',
                letterSpacing: '0.02em',
                color: colors.muted,
                bgcolor: colors.paper2,
                border: `1px solid ${colors.line}`,
                borderRadius: '999px',
                px: 1,
                py: 0.3,
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ mt: 'auto', pt: 2 }}>
        <SlidesState slidesUrl={p.slidesUrl} />
      </Box>
    </>
  );

  const baseSx = {
    ...cardSx,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  } as const;

  if (p.slidesUrl) {
    return (
      <Link
        href={p.slidesUrl}
        target='_blank'
        rel='noopener'
        underline='none'
        className='pres-card'
        sx={{ ...baseSx, ...cardHoverSx, color: 'inherit' }}
      >
        {inner}
      </Link>
    );
  }

  return (
    <Paper elevation={0} sx={baseSx}>
      {inner}
    </Paper>
  );
}

export default function Page() {
  const groups = groupBySession(PRESENTATIONS);

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Community', href: '/community/' },
          { label: 'IDSS Kickoff Workshop' },
        ]}
        kicker='IDSS Kickoff Workshop'
        title={
          <>
            The IDSS projects,
            <br />
            together.
          </>
        }
        lead='In July 2026, NSF hosted a virtual kickoff meeting series for the Integrated Data Systems & Services (IDSS) program where the newly funded projects introduced their work.'
        action={
          <Button
            variant='contained'
            color='primary'
            size='large'
            href={SLIDES_CONTACT}
            sx={{ borderRadius: '999px' }}
          >
            Presented? Send your slides&nbsp;→
          </Button>
        }
      />

      <Box component='section' sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth='md'>
          <Typography sx={{ color: colors.muted, fontSize: { xs: '1.15rem', md: '1.35rem' }, lineHeight: 1.6 }}>
            The{' '}
            <Link
              href='https://www.nsf.gov/funding/opportunities/idss-integrated-data-systems-services/nsf26-509/solicitation'
              target='_blank'
              rel='noopener'
              sx={{ color: colors.red, fontWeight: 600 }}
            >
              Integrated Data Systems &amp; Services
            </Link>{' '}
            program supports national-scale data cyberinfrastructure that broadly advances open,
            data-intensive, and AI-driven science and engineering. This kickoff brings the program’s
            projects together to share their goals, plans, and the communities they serve.
          </Typography>
        </Container>
      </Box>

      <Box component='section' sx={{ bgcolor: colors.paper2, py: { xs: 7, md: 12 } }}>
        <Container maxWidth='lg'>
          <SectionHead
            kicker='Agenda & slides'
            title='Talks from across the program.'
            lead='Select a talk to open its slides.'
          />

          {PRESENTATIONS.length === 0 ? (
            <Typography sx={{ color: colors.muted, fontSize: '1.05rem' }}>
              The agenda will be posted here as talks are confirmed.
            </Typography>
          ) : (
            groups.map(([session, items], gi) => (
              <Box key={session} sx={{ mt: gi === 0 ? 0 : { xs: 5, md: 7 } }}>
                <Kicker>{session}</Kicker>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                    gap: 3,
                    mt: 1,
                  }}
                >
                  {items.map((p) => (
                    <PresentationCard key={p.title} p={p} />
                  ))}
                </Box>
              </Box>
            ))
          )}
        </Container>
      </Box>

      {/* Submit-slides CTA */}
      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <Box
            sx={{
              bgcolor: colors.ink,
              color: '#fff',
              borderRadius: '22px',
              p: { xs: 4, md: 7 },
              display: 'flex',
              gap: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Kicker onDark>For presenters</Kicker>
              <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '20ch' }}>
                Send us your slides.
              </Typography>
              <Typography sx={{ color: colors.onInkLead, mt: 1, mb: 0, maxWidth: '48ch' }}>
                Share a link (Google Slides, Drive, or a PDF) and we'll add your talk to the agenda.
              </Typography>
            </Box>
            <Button
              variant='contained'
              color='primary'
              size='large'
              href={SLIDES_CONTACT}
              sx={{ borderRadius: '999px' }}
            >
              Email your slides&nbsp;→
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

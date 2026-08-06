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
  /** Optional project homepage. */
  homepage?: string;
  /** Optional NSF award ID (digits only), e.g. "2609465" — links to the award abstract. */
  awardId?: string;
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
    org: 'Morgridge Institute for Research',
    abstract:
      'An introduction to the Fabric of AI-driven Data services and the goals of the IDSS kickoff.',
    tags: ['Category I', 'FabAID'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/FabAID.pdf',
    homepage: 'https://www.fabaid.io/',
    awardId: '2609485',
  },
  {
     session: 'Category I',
     title: 'National Data Platform',
     presenter: 'Ilkay Altintas',
     org: 'University of California, San Diego',
     abstract: 'A Federated National AI-Ready Data Ecosystem for Discovery, Innovation, Education, and Workforce Development',
     tags: ['Category I', 'National Data Platform'],
     slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/Altintas-NDP-IDSS-KickOff-21July2026.pdf',
     homepage: 'https://www.nationaldataplatform.org/',
    awardId: '2609447', },
  {
    session: 'Category II',
    title: 'National Science Data Fabric',
    presenter: 'Michaela Taufer',
    org: 'University of Tennessee, Knoxville',
    abstract: 'Every Scientist Should Be Able to Collaborate with Every Scientific Facility and Every AI: A National Digital Backbone for Autonomous Scientific Discovery',
    tags: ['Category II', 'NSDF'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/NSDF.pdf',
    homepage: 'https://nationalsciencedatafabric.org/',
    awardId: '2609465',
  },
  {
    session: 'Category II',
    title: 'MESA: Multidisciplinary Environment for Scientific Advancement',
    presenter: 'Tyson L. Swetnam',
    org: 'University of New Mexico',
    abstract: 'Building a shared, open-source platform in which scientific data from many fields are automatically described, organized, and connected.',
    tags: ['Category II', 'MESA'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/MESA.pdf',
    awardId: '2608717',
  },
  {
    session: 'Category II',
    title: 'BRIDGE National Center',
    presenter: 'Chen Li',
    org: 'University of California, Irvine',
    abstract: 'A National Center to Democratize Multi-Disciplinary Data Science and AI',
    tags: ['Category II', 'BRIDGE'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/Bridge.pdf',
    awardId: '2609582',
  },
  {
    session: 'Category II',
    title: 'iDLab: Interactive Discovery Laboratory',
    presenter: 'Amit Chourasia',
    org: 'University of California, Los Angeles',
    abstract: 'A unified environment that connects researchers, educators, and students to interactive computing and data across five NSF-supported NAIRR and ACCESS sites and two cloud providers.',
    tags: ['Category II', 'iDLab'],
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/2026-iDLab-NSF-IDSS-Kickoff.pdf',
    homepage: 'https://idlab.onescienceplace.org/',
    awardId: '2609583',
  },
  {
    session: 'Category III',
    title: 'Planning for a National Scale Data Platform for Personal Data',
    presenter: 'Sharon J. Hewner',
    org: 'University at Buffalo, SUNY',
    abstract:
      'Engaging stakeholders to build a coherent strategy for national-scale operational data infrastructure for personal data — human and related data containing sensitive information.',
    slidesUrl:
      'https://s3.web-assets.chtc.io/presentations/idss/UBuffalo_IDSS_NSF_Kickoff_08042026.pdf',
    awardId: '2609498',
  },
  {
    session: 'Category III',
    title:
      'Next-Generation Metadata Management Infrastructure for Enabling Intelligent and Efficient Scientific Data Sharing and Discovery at National-Scale',
    presenter: 'Jie Ren',
    org: 'College of William & Mary',
    abstract:
      'Metadata infrastructure for intelligent and efficient scientific data sharing and discovery, so researchers can find and reuse data produced across the national research ecosystem.',
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/nsf_idss_metadata_infra_Ren.pdf',
    awardId: '2609536',
  },
  {
    session: 'Category III',
    title:
      'Planning Federated AI-Ready Cyberinfrastructure for Advanced Microscopy and Imaging: A Teach-Explore-Design Framework for Community-Driven Infrastructure',
    presenter: 'Lewis Tseng',
    org: 'University of Massachusetts Lowell',
    abstract:
      'he project will investigate the feasibility, community acceptance, and design requirements for a federated, cross-domain, AI-ready data cyberinfrastructure.',
    slidesUrl:
      'https://s3.web-assets.chtc.io/presentations/idss/NSF-IDSS26_Microscopy_final.pdf',
    awardId: '2609490',
  },
  {
    session: 'Category III',
    title: 'AI-Driven National Synthesis Hub for Convergent Disaster Research and Intelligence',
    presenter: 'Hui Fang',
    org: 'University of Delaware',
    abstract:
      'This project aims to develop a plan for a national scale operational data infrastructure for personal data, i.e., human and related data containing sensitive information.',
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/UD-IDSS-KickOff.pdf',
    awardId: '2609535',
  },
  {
    session: 'Category III',
    title:
      'G-WAVE: Gulf Water Analytics & Virtual Environments for Integrated and Intelligent Water, Health, and Energy Resilience in the Gulf Coast',
    presenter: 'Ibrahim Demir',
    org: 'Tulane University',
    abstract:
      'Democratizing access to complex environmental data for water, health, and energy resilience in the Gulf Coast — for researchers of any technical background.',
    slidesUrl: 'https://s3.web-assets.chtc.io/presentations/idss/G-WAVE-TULANE.pdf',
    awardId: '2609512',
  },
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

const NSF_AWARD_BASE = 'https://www.nsf.gov/awardsearch/show-award/?AWD_ID=';

/** Secondary link (project site, NSF award) shown in a card footer. */
function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener'
      underline='none'
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35em',
        fontFamily: mono,
        fontSize: '0.72rem',
        color: colors.muted,
        transition: 'color .15s',
        '&:hover': { color: colors.red },
      }}
    >
      {children}
      <Launch sx={{ fontSize: 13 }} aria-hidden='true' />
    </Link>
  );
}

function PresentationCard({ p }: { p: Presentation }) {
  return (
    <Paper
      elevation={0}
      sx={{ ...cardSx, display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
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
      <Box
        sx={{
          mt: 'auto',
          pt: 2.25,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          columnGap: 2,
          rowGap: 1,
        }}
      >
        {p.slidesUrl ? (
          <Link
            href={p.slidesUrl}
            target='_blank'
            rel='noopener'
            underline='none'
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4em',
              fontWeight: 600,
              color: colors.red,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <Slideshow sx={{ fontSize: 18 }} aria-hidden='true' />
            View slides
            <Launch sx={{ fontSize: 14 }} aria-hidden='true' />
          </Link>
        ) : (
          <Box
            component='span'
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
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
        )}
        {p.homepage && <ActionLink href={p.homepage}>Project site</ActionLink>}
        {p.awardId && <ActionLink href={`${NSF_AWARD_BASE}${p.awardId}`}>NSF award</ActionLink>}
      </Box>
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
                Share a link (Google Slides, Drive, or a PDF) and we’ll add your talk to the agenda.
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

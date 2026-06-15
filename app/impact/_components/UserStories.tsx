import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import React from 'react';

import { Kicker, colors, mono } from '@/components/design';

interface Story {
  field: string;
  title: string;
}

const STORIES: Story[] = [
  {
    field: 'Genomics',
    title: 'A campus core ran 4 million variant-calling jobs across the OSPool in a week',
  },
  {
    field: 'Climate',
    title: 'A modeling group served reanalysis data to 30 collaborators through one Origin',
  },
  {
    field: 'Physics',
    title: 'IceCube federated 6 PB of neutrino data and made it discoverable nationwide',
  },
  {
    field: 'Humanities',
    title: 'A digital-text project used the AI Agent to stage and OCR an 88 TB corpus',
  },
];

const arrow = (
  <Box component='span' sx={{ transition: 'transform .2s ease' }}>
    →
  </Box>
);

// Recreates the design's textured image placeholder (.ph).
const placeholderSx = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'radial-gradient(circle at 30% 30%, rgba(182,31,36,.12), transparent 60%),' +
    ' repeating-linear-gradient(135deg, #ECE7DE 0 14px, #E5DFD4 14px 28px)',
} as const;

function Placeholder({ label }: { label: string }) {
  return (
    <Box sx={{ ...placeholderSx, aspectRatio: '16 / 10' }}>
      <Box
        component='span'
        sx={{
          bgcolor: 'rgba(255,255,255,0.78)',
          px: 1.5,
          py: 0.5,
          borderRadius: '6px',
          fontFamily: mono,
          fontSize: '0.74rem',
          letterSpacing: '0.05em',
          color: colors.muted,
        }}
      >
        {label}
      </Box>
    </Box>
  );
}

export default function UserStories() {
  return (
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
            <Kicker>User stories</Kicker>
            <Typography variant='h2' component='h2'>
              What researchers have done on the fabric.
            </Typography>
          </Box>
          <Link
            href='#'
            underline='none'
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'center',
              gap: '0.4em',
              fontWeight: 600,
              color: colors.red,
              '&:hover span': { transform: 'translateX(3px)' },
            }}
          >
            All stories {arrow}
          </Link>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1.1fr 0.9fr' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {/* Featured story */}
          <Paper
            variant='outlined'
            sx={{
              borderColor: colors.line,
              borderRadius: '14px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: '.2s ease',
              boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 24px rgba(20,16,10,.09), 0 2px 6px rgba(20,16,10,.05)',
                borderColor: colors.lineStrong,
              },
            }}
          >
            <Placeholder label='telescope survey · user story' />
            <Box sx={{ p: 3 }}>
              <Box
                component='span'
                sx={{
                  fontFamily: mono,
                  fontSize: '0.7rem',
                  letterSpacing: '0.03em',
                  color: colors.red,
                  border: `1px dashed ${colors.red}`,
                  borderRadius: '6px',
                  px: 0.75,
                  py: 0.25,
                  display: 'inline-flex',
                }}
              >
                Featured story
              </Box>
              <Typography
                variant='h3'
                component='h3'
                sx={{ fontSize: '1.35rem', mt: 1.75, mb: 1 }}
              >
                An astrophysics lab trained on 6 PB of survey data — without moving a file
              </Typography>
              <Typography sx={{ color: colors.muted, fontSize: '0.95rem', mb: 1.5 }}>
                By federating their archive as an Origin and reading from nearby caches, the
                team cut data-prep time from weeks to hours and kept everything in place.
              </Typography>
              <Link
                href='#'
                underline='none'
                sx={{
                  fontWeight: 600,
                  color: colors.red,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4em',
                  '&:hover span': { transform: 'translateX(3px)' },
                }}
              >
                Read the story {arrow}
              </Link>
            </Box>
          </Paper>

          {/* More stories list */}
          <Box>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: colors.muted,
                mb: 0.75,
              }}
            >
              More stories
            </Typography>
            <Box component='ul' sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {STORIES.map((story) => (
                <Box
                  component='li'
                  key={story.title}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    py: 2,
                    borderBottom: `1px solid ${colors.line}`,
                    '&:last-of-type': { borderBottom: 0 },
                    '&:hover .ttl': { color: colors.red },
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.72rem',
                      color: colors.muted,
                      flex: 'none',
                      width: 64,
                      pt: '2px',
                    }}
                  >
                    {story.field}
                  </Box>
                  <Link href='#' underline='none'>
                    <Typography
                      className='ttl'
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.98rem',
                        lineHeight: 1.35,
                        color: colors.ink,
                        transition: '.15s',
                      }}
                    >
                      {story.title}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* By the numbers */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: colors.paper2,
              border: `1px dashed ${colors.lineStrong}`,
              borderRadius: '14px',
              p: 3.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: colors.muted,
              }}
            >
              By the numbers
            </Typography>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: '2.6rem',
                color: colors.red,
                lineHeight: 1,
                mt: 1.25,
                mb: 0.25,
              }}
            >
              40+
            </Box>
            <Typography
              sx={{ fontFamily: mono, fontSize: '0.74rem', color: colors.muted, mb: 1.75 }}
            >
              disciplines represented
            </Typography>
            <Typography sx={{ color: colors.muted, fontSize: '0.95rem' }}>
              From astrophysics to the humanities — researchers across the country build on the
              fabric every day.
            </Typography>
            <Button
              variant='contained'
              color='primary'
              href='#'
              sx={{ mt: 'auto', alignSelf: 'flex-start', borderRadius: '999px' }}
            >
              Share your story&nbsp;→
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

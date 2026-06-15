import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

import Kicker from './Kicker';
import { colors, mono } from './tokens';

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: React.ReactNode;
  kicker?: string;
  lead?: React.ReactNode;
  breadcrumb?: Crumb[];
  /** Optional call-to-action rendered below the lead (e.g. a contact button). */
  action?: React.ReactNode;
  /** Optional visual rendered to the right of the text on larger screens. */
  media?: React.ReactNode;
}

/**
 * Dark "ink" sub-page hero from the design system — breadcrumb, kicker,
 * display heading, and a muted lead. Replaces the older light texture header
 * so sub-pages share one visual language.
 */
export default function PageHero({ title, kicker, lead, breadcrumb, action, media }: PageHeroProps) {
  return (
    <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
      <Container
        maxWidth='lg'
        sx={{
          py: { xs: 7, sm: 9, md: 11 },
          display: 'grid',
          gridTemplateColumns: media ? { xs: '1fr', md: '1.15fr 0.85fr' } : '1fr',
          gap: { xs: 5, md: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
        {breadcrumb && breadcrumb.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em',
              mb: 2.5,
              fontFamily: mono,
              fontSize: '0.74rem',
              letterSpacing: '0.05em',
              color: colors.onInkMuted,
            }}
          >
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={`${crumb.label}-${i}`}>
                {i > 0 && (
                  <Box component='span' sx={{ opacity: 0.5 }} aria-hidden='true'>
                    /
                  </Box>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    underline='none'
                    sx={{ color: 'inherit', '&:hover': { color: '#fff' } }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <Box component='span'>{crumb.label}</Box>
                )}
              </React.Fragment>
            ))}
          </Box>
        )}

        {kicker && <Kicker onDark>{kicker}</Kicker>}

        <Typography
          variant='h1'
          component='h1'
          sx={{
            color: '#fff',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: '16ch',
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
          }}
        >
          {title}
        </Typography>

        {lead && (
          <Typography
            sx={{
              mt: 2.25,
              maxWidth: '54ch',
              color: colors.onInkLead,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.55,
            }}
          >
            {lead}
          </Typography>
        )}

        {action && <Box sx={{ mt: 3.5 }}>{action}</Box>}
        </Box>

        {media}
      </Container>
    </Box>
  );
}

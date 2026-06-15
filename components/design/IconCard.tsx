import { Box, Link, Paper, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export const cardSx = {
  bgcolor: colors.surface,
  border: `1px solid ${colors.line}`,
  borderRadius: '14px',
  p: 3.5,
  boxShadow: '0 1px 2px rgba(20,16,10,.06), 0 2px 8px rgba(20,16,10,.05)',
} as const;

export const cardHoverSx = {
  transition: '.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 24px rgba(20,16,10,.09), 0 2px 6px rgba(20,16,10,.05)',
    borderColor: colors.lineStrong,
  },
} as const;

export interface IconCardProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Top-right ordinal, e.g. "01". */
  num?: string;
  /** Bottom-left "powered by" tag text. */
  tag?: string;
  /** Optional 1:1 logo shown inside the tag for brand attribution. */
  tagLogo?: string;
  href?: string;
  hover?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * The recurring `.card` from the design — white surface, subtle shadow, an
 * optional red icon tile, title, body, and footer (tag + arrow). Becomes a
 * link when `href` is provided.
 */
export default function IconCard({
  icon,
  title,
  body,
  num,
  tag,
  tagLogo,
  href,
  hover = false,
  centered = false,
  children,
  sx,
}: IconCardProps) {
  const showFoot = Boolean(tag || href);

  const content = (
    <>
      {num && (
        <Box
          component='span'
          sx={{
            position: 'absolute',
            top: 22,
            right: 24,
            fontFamily: mono,
            fontSize: '0.72rem',
            color: colors.muted2,
          }}
        >
          {num}
        </Box>
      )}
      {icon && (
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: colors.red050,
            color: colors.red,
            mb: 2.25,
            mx: centered ? 'auto' : 0,
            '& svg': { fontSize: 26 },
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant='h3' component='h3' sx={{ fontSize: '1.45rem', mb: 0.5 }}>
        {title}
      </Typography>
      {body && (
        <Typography sx={{ color: colors.muted, fontSize: '0.98rem', mb: showFoot ? 1.5 : 0 }}>
          {body}
        </Typography>
      )}
      {children}
      {showFoot && (
        <Box
          sx={{
            mt: 'auto',
            pt: 1.75,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.25,
          }}
        >
          {tag ? (
            <Box
              component='span'
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4em',
                fontFamily: mono,
                fontSize: '0.7rem',
                letterSpacing: '0.03em',
                color: colors.red,
                border: `1px dashed ${colors.red}`,
                borderRadius: '6px',
                px: 0.75,
                py: 0.25,
              }}
            >
              {tagLogo && (
                <Box
                  component='img'
                  src={tagLogo}
                  alt=''
                  aria-hidden='true'
                  sx={{ width: 14, height: 14, objectFit: 'contain', display: 'block' }}
                />
              )}
              {tag}
            </Box>
          ) : (
            <span />
          )}
          {href && (
            <Box
              component='span'
              className='card-arrow'
              sx={{ color: colors.red, fontWeight: 600, transition: 'transform .2s ease' }}
              aria-hidden='true'
            >
              →
            </Box>
          )}
        </Box>
      )}
    </>
  );

  const baseSx = {
    ...cardSx,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    // No explicit height: the grid's default `align-items: stretch` already
    // equalizes card heights. Adding height:100% against auto rows makes the
    // rows overlap.
    textAlign: centered ? 'center' : 'left',
    ...(hover ? cardHoverSx : {}),
    ...(href ? { '&:hover .card-arrow': { transform: 'translateX(3px)' } } : {}),
    ...sx,
  } as SxProps<Theme>;

  if (href) {
    return (
      <Link href={href} underline='none' sx={{ ...baseSx, color: 'inherit' }}>
        {content}
      </Link>
    );
  }

  return (
    <Paper elevation={0} sx={baseSx}>
      {content}
    </Paper>
  );
}

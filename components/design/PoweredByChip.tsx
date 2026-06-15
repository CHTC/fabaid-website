import { Box, Link } from '@mui/material';
import React from 'react';

import { colors, mono } from './tokens';

export interface PoweredByChipProps {
  label: string;
  href?: string;
  /** Optional 1:1 logo shown in place of the red dot, for brand attribution. */
  logo?: string;
}

/** Mono pill with a red dot (or a brand logo) — used for "powered by" rows. */
export default function PoweredByChip({ label, href, logo }: PoweredByChipProps) {
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5em',
    fontFamily: mono,
    fontSize: '0.8rem',
    color: '#413c36',
    border: `1px solid ${colors.lineStrong}`,
    borderRadius: '999px',
    px: 1.25,
    py: 0.75,
    bgcolor: '#fff',
    transition: '.16s ease',
    ...(href
      ? { '&:hover': { borderColor: colors.red, color: colors.red, transform: 'translateY(-1px)' } }
      : {}),
  } as const;

  const inner = (
    <>
      {logo ? (
        <Box
          component='img'
          src={logo}
          alt=''
          aria-hidden='true'
          sx={{ width: 16, height: 16, objectFit: 'contain', display: 'block' }}
        />
      ) : (
        <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: colors.red }} />
      )}
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} target='_blank' rel='noopener' underline='none' sx={sx}>
        {inner}
      </Link>
    );
  }
  return <Box sx={sx}>{inner}</Box>;
}

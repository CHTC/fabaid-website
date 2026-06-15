'use client';

import { Box, Container, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Construction from '@mui/icons-material/Construction';
import { usePathname } from 'next/navigation';
import React from 'react';

import FabricMark from './FabricMark';
import { colors, mono } from './tokens';

interface NavLink {
  label: string;
  href: string;
  /** Flag pages whose public content is still under construction. */
  construction?: boolean;
}

const NAV: NavLink[] = [
  { label: 'Data Federation', href: '/data-federation/' },
  { label: 'Repositories', href: '/repository/' },
  { label: 'Facilitation', href: '/facilitation/' },
  { label: 'Data Access Point', href: '/data-access-point/', construction: true },
  { label: 'AI Agent', href: '/ai-agent/', construction: true },
  { label: 'Team', href: '/team/' },
  { label: 'About', href: '/about/' },
];

const WIDE = { maxWidth: 1340, mx: 'auto' } as const;

function Wordmark() {
  return (
    <Box
      component='span'
      sx={(theme) => ({
        fontFamily: theme.typography.h1.fontFamily,
        fontWeight: 700,
        fontSize: '1.5rem',
        letterSpacing: '-0.03em',
        color: colors.ink,
      })}
    >
      Fab
      <Box component='b' sx={{ color: colors.red }}>
        AID
      </Box>
    </Box>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, '');

  return (
    <Box component='header'>
      {/* Utility bar */}
      <Box sx={{ bgcolor: colors.black, color: '#cfcac2' }}>
        <Container maxWidth={false} sx={WIDE}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2.25,
              minHeight: 40,
              flexWrap: 'wrap',
              fontFamily: mono,
              fontSize: '0.72rem',
              letterSpacing: '0.03em',
              '& a': { color: '#cfcac2', '&:hover': { color: '#fff' } },
            }}
          >
            <Link href='https://chtc.wisc.edu/' target='_blank' rel='noopener' underline='none'>
              Operated by CHTC
            </Link>
            <Box sx={{ flex: 1 }} />
            <Link
              href='https://status.osg-htc.org/'
              target='_blank'
              rel='noopener'
              underline='none'
              sx={{ color: '#fff !important' }}
            >
              Status
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Main nav */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 80,
          bgcolor: 'rgba(246,243,238,.86)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <Container maxWidth={false} sx={WIDE}>
          <Box
            component='nav'
            aria-label='Primary'
            sx={{ display: 'flex', alignItems: 'center', gap: 2.75, minHeight: 74 }}
          >
            <Link
              href='/'
              underline='none'
              aria-label='FabAID home'
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flex: 'none' }}
            >
              <FabricMark />
              <Wordmark />
            </Link>

            {/* Desktop links */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                gap: '2px',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  underline='none'
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3em',
                    fontSize: '0.92rem',
                    fontWeight: 500,
                    color: isActive(item.href) ? colors.red : '#3a3631',
                    px: 1,
                    py: 0.75,
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    transition: '.15s',
                    '&:hover': { color: colors.red, bgcolor: 'rgba(182,31,36,.06)' },
                  }}
                >
                  {item.label}
                  {item.construction && (
                    <Construction sx={{ fontSize: 15, color: colors.muted2 }} aria-label='under construction' />
                  )}
                </Link>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 'none', ml: 'auto' }}>
              <Link
                href='/impact/'
                underline='none'
                sx={{
                  display: { xs: 'none', xl: 'inline-flex' },
                  alignItems: 'center',
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  border: `1.5px solid ${colors.red}`,
                  color: colors.red,
                  borderRadius: '999px',
                  px: 1.5,
                  py: 0.6,
                  bgcolor: colors.red050,
                }}
              >
                For funders / impact
              </Link>
              <IconButton
                aria-label='Toggle menu'
                onClick={() => setOpen((v) => !v)}
                sx={{
                  display: { xs: 'inline-flex', lg: 'none' },
                  border: `1.5px solid ${colors.lineStrong}`,
                  borderRadius: '8px',
                  color: colors.ink,
                }}
              >
                {open ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>

          {/* Mobile menu */}
          {open && (
            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                flexDirection: 'column',
                pb: 2,
              }}
            >
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  underline='none'
                  onClick={() => setOpen(false)}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4em',
                    py: 1.25,
                    fontWeight: 500,
                    color: isActive(item.href) ? colors.red : '#3a3631',
                    borderBottom: `1px solid ${colors.line}`,
                  }}
                >
                  {item.label}
                  {item.construction && (
                    <Construction sx={{ fontSize: 16, color: colors.muted2 }} aria-label='under construction' />
                  )}
                </Link>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

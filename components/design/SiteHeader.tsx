'use client';

import { Box, Button, Collapse, Container, IconButton, Link, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Construction from '@mui/icons-material/Construction';
import Campaign from '@mui/icons-material/Campaign';
import ExpandMore from '@mui/icons-material/ExpandMore';
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

/** A top-level item that opens a dropdown of links instead of navigating. */
interface NavGroup {
  label: string;
  children: NavLink[];
}

type NavItem = NavLink | NavGroup;

const isGroup = (item: NavItem): item is NavGroup => 'children' in item;

const NAV: NavItem[] = [
  { label: 'Facilitation', href: '/facilitation/' },
  { label: 'Team', href: '/team/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Software', href: '/software/' },
  {
    label: 'Community',
    children: [
      { label: 'Home', href: '/community/' },
      { label: 'News', href: '/news/' },
    ],
  },
];

const WIDE = { maxWidth: 1340, mx: 'auto' } as const;

const desktopLinkSx = (active: boolean) =>
  ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3em',
    fontSize: '0.92rem',
    fontWeight: 500,
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    color: active ? colors.red : '#3a3631',
    px: 1,
    py: 0.75,
    border: 0,
    bgcolor: 'transparent',
    cursor: 'pointer',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
    transition: '.15s',
    '&:hover': { color: colors.red, bgcolor: 'rgba(182,31,36,.06)' },
  }) as const;

const mobileLinkSx = (active: boolean) =>
  ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4em',
    py: 1.25,
    fontWeight: 500,
    color: active ? colors.red : '#3a3631',
    borderBottom: `1px solid ${colors.line}`,
  }) as const;

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

function ConstructionFlag({ size }: { size: number }) {
  return <Construction sx={{ fontSize: size, color: colors.muted2 }} aria-label='under construction' />;
}

/** Desktop dropdown: a nav button that opens a menu of child links. */
function DesktopDropdown({ item, active }: { item: NavGroup; active: (href: string) => boolean }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);
  const groupActive = item.children.some((c) => active(c.href));
  const id = `nav-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <>
      <Box
        component='button'
        type='button'
        id={`${id}-button`}
        aria-haspopup='menu'
        aria-controls={open ? id : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
        sx={desktopLinkSx(groupActive || open)}
      >
        {item.label}
        <ExpandMore
          sx={{
            fontSize: 18,
            ml: '-0.15em',
            transition: 'transform .2s ease',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
          aria-hidden
        />
      </Box>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          list: { 'aria-labelledby': `${id}-button`, sx: { py: 0.75 } },
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: '12px',
              border: `1px solid ${colors.line}`,
              bgcolor: colors.surface,
              boxShadow: '0 6px 24px rgba(20,16,10,.12), 0 2px 6px rgba(20,16,10,.06)',
            },
          },
        }}
      >
        {item.children.map((child) => (
          <MenuItem
            key={child.href}
            component={Link}
            href={child.href}
            underline='none'
            onClick={close}
            selected={active(child.href)}
            sx={{
              px: 2,
              py: 1,
              fontSize: '0.92rem',
              fontWeight: 500,
              color: active(child.href) ? colors.red : colors.ink,
              gap: '0.3em',
              '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                color: colors.red,
                bgcolor: 'rgba(182,31,36,.06)',
              },
            }}
          >
            {child.label}
            {child.construction && <ConstructionFlag size={15} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

/** Mobile group: a toggle row that expands an indented list of child links. */
function MobileGroup({
  item,
  active,
  onNavigate,
}: {
  item: NavGroup;
  active: (href: string) => boolean;
  onNavigate: () => void;
}) {
  const groupActive = item.children.some((c) => active(c.href));
  const [open, setOpen] = React.useState(groupActive);

  return (
    <>
      <Box
        component='button'
        type='button'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        sx={{
          ...mobileLinkSx(groupActive),
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          textAlign: 'left',
          bgcolor: 'transparent',
          border: 0,
          borderBottom: `1px solid ${colors.line}`,
          px: 0,
          cursor: 'pointer',
        }}
      >
        {item.label}
        <ExpandMore
          sx={{ fontSize: 20, transition: 'transform .2s ease', transform: open ? 'rotate(180deg)' : 'none' }}
          aria-hidden
        />
      </Box>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}>
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              underline='none'
              onClick={onNavigate}
              sx={{ ...mobileLinkSx(active(child.href)), fontSize: '0.95rem' }}
            >
              {child.label}
              {child.construction && <ConstructionFlag size={16} />}
            </Link>
          ))}
        </Box>
      </Collapse>
    </>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // A link is active on its own page and on any page nested beneath it
  // (e.g. /news/ stays highlighted while reading an article).
  const isActive = (href: string) => {
    const base = href.replace(/\/$/, '');
    return pathname === base || pathname === href || pathname.startsWith(`${base}/`);
  };

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
            <Box
              component='span'
              sx={{
                py: 0.75,
                color: '#fff',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
              }}
            >
              <Campaign sx={{ fontSize: 18, color: colors.red300 }} aria-hidden />
              <Box
                component='span'
                sx={{
                  '@keyframes bannerShimmer': {
                    from: { backgroundPosition: '100% 0' },
                    to: { backgroundPosition: '0% 0' },
                  },
                  // White text with a red glint that sweeps across twice on load.
                  backgroundImage: `linear-gradient(110deg, #fff 42%, ${colors.red300} 50%, #fff 58%)`,
                  backgroundSize: '300% 100%',
                  backgroundPosition: '0% 0',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'bannerShimmer 2.4s ease-in-out 0.6s 1',
                  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                }}
              >
                <b>NSF AI Infrastructure Hub teams</b>, the PATh team is ready to help
              </Box>
            </Box>
            <Button
              href='https://path-cc.io/ai-hubs.html'
              target='_blank'
              rel='noopener'
              variant='contained'
              size='small'
              sx={{
                borderRadius: '999px',
                fontFamily: mono,
                fontSize: '0.72rem',
                fontWeight: 700,
                lineHeight: 1.4,
                px: 1.5,
                py: 0.25,
                my: 0.5,
                whiteSpace: 'nowrap',
                bgcolor: '#fff',
                // Double-& outweighs the utility bar's `& a` color rule.
                '&&': { color: '#000' },
                '&&:hover': { bgcolor: colors.paper2, color: '#000' },
              }}
            >
              Learn more&nbsp;→
            </Button>
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
              {NAV.map((item) =>
                isGroup(item) ? (
                  <DesktopDropdown key={item.label} item={item} active={isActive} />
                ) : (
                  <Link key={item.href} href={item.href} underline='none' sx={desktopLinkSx(isActive(item.href))}>
                    {item.label}
                    {item.construction && <ConstructionFlag size={15} />}
                  </Link>
                )
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 'none', ml: 'auto' }}>
              <Button
                href='mailto:contact@fabaid.io'
                variant='contained'
                color='primary'
                sx={{
                  display: { xs: 'none', lg: 'inline-flex' },
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                }}
              >
                Contact us&nbsp;→
              </Button>
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
              {NAV.map((item) =>
                isGroup(item) ? (
                  <MobileGroup key={item.label} item={item} active={isActive} onNavigate={() => setOpen(false)} />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    underline='none'
                    onClick={() => setOpen(false)}
                    sx={mobileLinkSx(isActive(item.href))}
                  >
                    {item.label}
                    {item.construction && <ConstructionFlag size={16} />}
                  </Link>
                )
              )}
              <Button
                href='mailto:contact@fabaid.io'
                variant='contained'
                color='primary'
                onClick={() => setOpen(false)}
                sx={{ mt: 2, borderRadius: '999px', alignSelf: 'flex-start' }}
              >
                Contact us&nbsp;→
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}

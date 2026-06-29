'use client';

import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import Kicker from './Kicker';
import { colors, mono } from './tokens';

export interface Metric {
  value: number;
  unit: string;
  label: string;
  /** Animate from 0 on scroll-in (default true). */
  animate?: boolean;
}

export interface MetricsBandProps {
  metrics: Metric[];
  kicker?: string;
  heading?: React.ReactNode;
  /** Small caption qualifying the figures, e.g. a time horizon. */
  note?: string;
}

const DURATION = 1400;

function CountUp({ target, animate }: { target: number; animate: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  // Initialize to the real figure so it's present in the server-rendered HTML
  // (for SEO / Google snapshot / no-JS / text extraction). Once JS runs we
  // reset to 0 and count up on scroll-in.
  const [display, setDisplay] = React.useState(target.toLocaleString());

  React.useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    // Without IntersectionObserver we can't animate on scroll-in; leave the
    // real figure (already shown) in place rather than blanking it to 0.
    if (!('IntersectionObserver' in window)) return;

    let frame = 0;
    let started = false;

    const run = () => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(target * eased).toLocaleString());
        if (p < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Reset to 0 now (the band sits below the fold at load) so the count-up
    // runs cleanly when it scrolls into view.
    setDisplay('0');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, animate]);

  return <span ref={ref}>{display}</span>;
}

/** Dark "ink" statistics band with optional heading and count-up numbers. */
export default function MetricsBand({ metrics, kicker, heading, note }: MetricsBandProps) {
  return (
    <Box component='section' sx={{ bgcolor: colors.ink, color: '#fff' }}>
      <Container maxWidth='lg' sx={{ py: { xs: 6, md: 11 } }}>
        {(kicker || heading || note) && (
          <Box sx={{ mb: 5 }}>
            {kicker && <Kicker onDark>{kicker}</Kicker>}
            {heading && (
              <Typography variant='h2' component='h2' sx={{ color: '#fff', maxWidth: '18ch' }}>
                {heading}
              </Typography>
            )}
            {note && (
              <Typography
                variant={'h6'}
                sx={{
                  mt: 1.5,
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: colors.onInkMuted,
                }}
              >
                {note}
              </Typography>
            )}
          </Box>
        )}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 3.5, md: 4 },
          }}
        >
          {metrics.map((metric) => (
            <Box
              key={metric.label}
              sx={{ borderTop: '2px solid rgba(255,255,255,0.14)', pt: 2.5 }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.6rem', md: '3.8rem' },
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                }}
              >
                <CountUp target={metric.value} animate={metric.animate ?? true} />
                <Box component='span' sx={{ color: colors.red300 }}>
                  {metric.unit}
                </Box>
              </Box>
              <Typography
                sx={{
                  mt: 1.5,
                  fontFamily: mono,
                  fontSize: '0.76rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: colors.onInkMuted,
                  lineHeight: 1.4,
                }}
              >
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

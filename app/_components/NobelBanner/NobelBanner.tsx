'use client';

import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import { colors } from '@/components/design';

/** Where the "Read more" button sends visitors. */
const READ_MORE_HREF = '/news/2026/10/06/francis-halzen-nobel-prize/';

const BANNER_MIN_HEIGHT = 60;

/**
 * A soft white halo painted around the banner copy. Stacked at increasing blur
 * radii rather than used as one wide shadow, so the glow is near-opaque right
 * at the letterforms and fades out before it reads as a box.
 */
const WHITE_GLOW = [
  '0 0 2px #fff',
  '0 0 4px #fff',
  '0 0 8px #fff',
  '0 0 12px rgb(255 255 255 / 0.9)',
].join(', ');

// Confetti palette: a few bright party colors plus the site's brand red so the
// strip still reads as part of the page.
const CONFETTI_COLORS = [
  'rgb(182 31 36 / 0.5)',
  'rgb(248 150 30 / 0.47)',
  'rgb(249 199 79 / 0.26)',
  'rgb(144 190 109 / 0.62)',
  'rgb(67 170 139 / 0.44)',
  'rgb(87 117 144 / 0.53)',
  'rgb(181 23 158 / 0.54)',
];

type Piece = {
  /** Position as a fraction of the canvas, so a resize rescales rather than reshuffles. */
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  angle: number;
  /** Horizontal squash, faking a flat piece of paper caught mid-tumble. */
  squash: number;
};

/**
 * A static scatter of confetti rendered on a canvas that fills the banner.
 * Pieces are laid out once and only redrawn when the canvas changes size.
 */
function Confetti() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let pieces: Piece[] = [];

    const makePiece = (): Piece => {
      const size = 5 + Math.random() * 5;
      return {
        x: Math.random(),
        y: Math.random(),
        w: size,
        h: size * (0.4 + Math.random() * 0.5),
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        // Floored so a piece frozen edge-on is still a visible sliver.
        squash: 0.35 + Math.random() * 0.65,
      };
    };

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Roughly one piece per 12px of banner width keeps density consistent
      // across screen sizes.
      const count = Math.max(40, Math.round(width / 12));
      if (pieces.length !== count) {
        pieces = Array.from({ length: count }, makePiece);
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.9;
      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x * width, p.y * height);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect((-p.w * p.squash) / 2, -p.h / 2, p.w * p.squash, p.h);
        ctx.restore();
      }
    };

    draw();

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component='canvas'
      ref={canvasRef}
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * Celebration strip at the top of the homepage announcing Francis Halzen's
 * 2026 Nobel Prize, with confetti scattered behind the text.
 */
export default function NobelBanner() {
  return (
    <Box
      component='aside'
      aria-label='Announcement'
      sx={{
        position: 'relative',
        minHeight: BANNER_MIN_HEIGHT,
        overflow: 'hidden',
        boxSizing: 'border-box',
        bgcolor: colors.surface,
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <Confetti />
      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          minHeight: BANNER_MIN_HEIGHT,
          py: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant='body1'
          sx={{
            color: colors.ink,
            pb: 0,
            fontWeight: 500,
            fontSize: { xs: '0.9rem', sm: '1.05rem' },
            lineHeight: 1.2,
            textAlign: 'center',
            // Stacked white halo so the text stays legible over whichever
            // confetti happens to land behind it.
            textShadow: WHITE_GLOW,
          }}
        >
          <Box component='b' sx={{ fontWeight: 700 }}>
            Francis Halzen awarded the 2026 Nobel Prize
          </Box>
          , marking the 4th received by HTCondor users!
        </Typography>
        <Button
          href={READ_MORE_HREF}
          variant='contained'
          size='small'
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '10px',
            px: 2,
            whiteSpace: 'nowrap',
            bgcolor: colors.red,
            '&:hover': { bgcolor: colors.red800 },
          }}
        >
          Read more
        </Button>
      </Container>
    </Box>
  );
}

import { Box } from '@mui/material';
import React from 'react';

import { colors } from '@/components/design';

export interface SparklineProps {
  /** Cumulative series (monotonically non-decreasing), oldest → newest. */
  data: number[];
  /** Accessible description, e.g. "Cumulative CPU hours over the past year". */
  label?: string;
  color?: string;
  height?: number;
}

const W = 100; // viewBox width; the SVG scales to its container

/**
 * Tiny inline area chart of a cumulative series. No axes or labels — it sits
 * directly above a metric to show how that total built up over the year.
 */
export default function Sparkline({
  data,
  label,
  color = colors.red,
  height = 34,
}: SparklineProps) {
  // No series at all → draw nothing and reserve no space (compact fallback).
  const max = data.length ? data[data.length - 1] : 0;
  if (data.length < 2) return null;
  // Series exists but is flat zero → reserve equal height so a row of stats
  // stays aligned even when one metric (e.g. GPU hours) is unused.
  if (max <= 0) return <Box sx={{ height }} aria-hidden='true' />;

  // The chart's baseline sits at the very bottom edge so it rests on the
  // divider line below it, which reads as the x-axis. Headroom only at the top.
  const top = 2;
  const bottom = height;
  const n = data.length;
  const x = (i: number) => (i / (n - 1)) * W;
  const y = (v: number) => bottom - (v / max) * (bottom - top);

  const line = data.map((v, i) => `${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
  const area = `M0,${bottom.toFixed(2)} L${line.replace(/ /g, ' L')} L${W},${bottom.toFixed(2)} Z`;

  return (
    <Box sx={{ lineHeight: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio='none'
        role='img'
        aria-label={label}
        style={{ width: '100%', height, display: 'block' }}
      >
        <path d={area} fill={color} fillOpacity='0.12' />
        <polyline
          points={line}
          fill='none'
          stroke={color}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
    </Box>
  );
}

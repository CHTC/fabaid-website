'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import * as React from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import { Box, Link, Typography } from '@mui/material';

import { colors, mono } from '@/components/design';
import type { OsdfCache, CacheHealth } from '@/utils/osdfCaches';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiY2Fubm9uLWxvY2siLCJhIjoiY21tMTUxbjhqMDVnaDJxcHE2eWp6aGo2ZiJ9.oZFr4GezivM26AkP87Cg-w';

// Health → marker color. Brand red marks healthy/active caches; warmer/cooler
// tones flag the exceptions.
const HEALTH_COLOR: Record<CacheHealth, string> = {
  OK: colors.red,
  Initializing: '#E0A800',
  Error: '#6E6960',
  Unknown: '#928D84',
};

const HEALTH_LABEL: Record<CacheHealth, string> = {
  OK: 'Healthy',
  Initializing: 'Initializing',
  Error: 'Error',
  Unknown: 'Unknown',
};

export interface CacheMapProps {
  caches: OsdfCache[];
}

export default function CacheMap({ caches }: CacheMapProps) {
  const [active, setActive] = React.useState<OsdfCache | null>(null);

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '22px',
        overflow: 'hidden',
        aspectRatio: '5 / 4',
        border: `1px solid ${colors.line}`,
        boxShadow: '0 6px 24px rgba(20,16,10,.09)',
        bgcolor: colors.paper2,
        '& .mapboxgl-popup-content': {
          borderRadius: '10px',
          padding: '12px 14px',
          boxShadow: '0 6px 24px rgba(20,16,10,.16)',
        },
        '& .mapboxgl-popup-close-button': { fontSize: '1rem', color: colors.muted },
        '& .mapboxgl-ctrl-logo, & .mapboxgl-ctrl-attrib': { opacity: 0.7 },
      }}
    >
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: -96, latitude: 39, zoom: 1 }}
        mapStyle='mapbox://styles/mapbox/light-v11'
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        <NavigationControl position='top-right' showCompass={false} />

        {caches.map((cache) => (
          <Marker
            key={`${cache.name}-${cache.latitude}-${cache.longitude}`}
            longitude={cache.longitude}
            latitude={cache.latitude}
            anchor='center'
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setActive(cache);
            }}
          >
            <Box
              role='button'
              aria-label={`${cache.name} (${HEALTH_LABEL[cache.health]})`}
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor: HEALTH_COLOR[cache.health],
                border: '2px solid #fff',
                boxShadow: `0 0 0 2px ${HEALTH_COLOR[cache.health]}55, 0 1px 3px rgba(0,0,0,.4)`,
                transition: 'transform .15s ease',
                '&:hover': { transform: 'scale(1.35)' },
              }}
            />
          </Marker>
        ))}

        {active && (
          <Popup
            longitude={active.longitude}
            latitude={active.latitude}
            anchor='top'
            offset={14}
            closeOnClick={false}
            onClose={() => setActive(null)}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: colors.ink, pr: 2 }}>
              {active.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                mt: 0.5,
                fontFamily: mono,
                fontSize: '0.7rem',
                color: colors.muted,
              }}
            >
              <Box
                sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: HEALTH_COLOR[active.health] }}
              />
              {HEALTH_LABEL[active.health]}
              {active.version && ` · v${active.version}`}
            </Box>
            {active.webUrl && (
              <Link
                href={active.webUrl}
                target='_blank'
                rel='noopener'
                sx={{ display: 'block', mt: 0.75, fontSize: '0.72rem', color: colors.red, wordBreak: 'break-all' }}
              >
                {active.webUrl.replace(/^https?:\/\//, '')}
              </Link>
            )}
          </Popup>
        )}
      </Map>

      {/* Legend / count */}
      <Box
        sx={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          bgcolor: 'rgba(255,255,255,0.92)',
          borderRadius: '10px',
          px: 1.5,
          py: 1,
          boxShadow: '0 2px 8px rgba(20,16,10,.12)',
          fontFamily: mono,
          fontSize: '0.7rem',
          color: colors.muted,
          maxWidth: '60%',
        }}
      >
        <Box sx={{ fontWeight: 700, color: colors.ink, mb: 0.5 }}>
          {caches.length} OSDF caches
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.red }} />
          Live across the federation
        </Box>
      </Box>
    </Box>
  );
}

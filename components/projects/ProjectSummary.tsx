import { Box, Typography } from '@mui/material';
import React from 'react';

import { Kicker, colors, mono } from '@/components/design';
import { formatBytes, formatCount } from '@/utils/dataRepositories';
import { formatCompact, type OsdfProject } from '@/utils/osdfProjects';
import type { ProjectDailyPoint } from '@/utils/adstash';
import FieldOfScienceChip from './fieldOfScience';
import Sparkline from './Sparkline';

const DAY_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

interface StatProps {
  label: string;
  value: string;
  emphasis?: boolean;
  /** Cumulative daily series for this metric (oldest → newest). */
  series?: number[];
}

function Stat({ label, value, emphasis = false, series }: StatProps) {
  return (
    <Box>
      {/* Cumulative curve sits above the divider, which acts as its x-axis. */}
      <Sparkline
        data={series ?? []}
        height={emphasis ? 48 : 56}
        color={emphasis ? colors.red : colors.red300}
        label={`Cumulative ${label.toLowerCase()} over the past year`}
      />
      <Box sx={{ borderTop: `2px solid ${emphasis ? colors.red : colors.line}`, pt: 1.5 }}>
        <Box
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: emphasis ? colors.red : colors.ink,
            fontSize: emphasis ? { xs: '2.2rem', md: '2.8rem' } : { xs: '1.4rem', md: '1.7rem' },
          }}
        >
          {value}
        </Box>
        <Typography
          sx={{
            mt: 1,
            fontFamily: mono,
            fontSize: { xs: '0.9rem', md: '1rem' },
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: colors.muted,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

/** Running total of one daily metric, for a cumulative sparkline. */
function cumulative(daily: ProjectDailyPoint[], key: keyof ProjectDailyPoint): number[] {
  let sum = 0;
  return daily.map((d) => {
    sum += d[key];
    return sum;
  });
}

/** Broader-impacts tags derived from the PI institution. */
function attributeTags(project: OsdfProject): string[] {
  const tags: string[] = [];
  if (project.epscor) tags.push('EPSCoR state');
  // Carnegie 2025 R1 label is "Research 1: …"; flag everything else as non-R1.
  if (project.carnegie && !project.carnegie.startsWith('Research 1')) {
    tags.push('Non-R1 institution');
  }
  return tags;
}

function AttrChips({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag) => (
        <Box
          key={tag}
          component='span'
          sx={{
            fontFamily: mono,
            fontSize: '0.72rem',
            letterSpacing: '0.04em',
            color: colors.ink,
            border: `1px solid ${colors.lineStrong}`,
            borderRadius: '999px',
            px: 1.25,
            py: 0.4,
            bgcolor: colors.paper2,
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );
}

export interface ProjectSummaryProps {
  project: OsdfProject;
  /** Show the project name / PI / field header. Disable when a page hero
   * already presents that (the dedicated project page). Default true. */
  header?: boolean;
  /** Per-day usage series; when present, draws cumulative sparklines over the
   * metrics. Fetched separately (per project) so the list query stays light. */
  daily?: ProjectDailyPoint[];
}

/**
 * Descriptive header (PI + description) over OSDF-forward usage metrics.
 * Pure presentational — reused by the featured card, the table modal, and the
 * per-project page (with `header={false}` since its hero shows the title).
 */
export default function ProjectSummary({ project, header = true, daily = [] }: ProjectSummaryProps) {
  const subtitleParts = [
    project.piName && `PI: ${project.piName}`,
    project.organization || project.institution,
  ].filter(Boolean);

  const tags = attributeTags(project);
  const range =
    daily.length > 0
      ? `${DAY_FMT.format(new Date(daily[0].date))} – ${DAY_FMT.format(new Date(daily[daily.length - 1].date))}`
      : null;

  return (
    <Box>
      {header && (
        <>
          <Kicker>OSDF project</Kicker>
          <Typography variant='h3' component='h3' sx={{ fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
            {project.name}
          </Typography>

          {subtitleParts.length > 0 && (
            <Typography sx={{ mt: 0.75, color: colors.ink, fontWeight: 600 }}>
              {subtitleParts.join(' · ')}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
            <FieldOfScienceChip field={project.fieldOfScience} />
            <AttrChips tags={tags} />
          </Box>
        </>
      )}

      {!header && (project.fieldOfScience || tags.length > 0) && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <FieldOfScienceChip field={project.fieldOfScience} />
          <AttrChips tags={tags} />
        </Box>
      )}

      {project.description && (
        <Typography
          sx={{
            mt: header ? 2 : 0,
            color: colors.muted,
            lineHeight: 1.6,
            fontSize: { xs: '1.15rem', md: '1.3rem' },
          }}
        >
          {project.description}
        </Typography>
      )}

      {/* Hero OSDF metric */}
      <Box sx={{ mt: 3 }}>
        <Stat
          emphasis
          label='Data delivered over the OSDF'
          value={formatBytes(project.osdfBytes)}
          series={cumulative(daily, 'osdfByteTransferCount')}
        />
      </Box>

      {/* Supporting metrics */}
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: { xs: 2.5, sm: 3 },
        }}
      >
        <Stat label='Jobs' value={formatCount(project.jobs)} series={cumulative(daily, 'numJobs')} />
        <Stat
          label='Files via OSDF'
          value={formatCompact(project.osdfFiles)}
          series={cumulative(daily, 'osdfFileTransferCount')}
        />
        <Stat
          label='CPU hours'
          value={formatCompact(project.cpuHours)}
          series={cumulative(daily, 'cpuHours')}
        />
        <Stat
          label='GPU hours'
          value={formatCompact(project.gpuHours)}
          series={cumulative(daily, 'gpuHours')}
        />
      </Box>

      {range && (
        <Typography
          sx={{
            mt: 3,
            fontFamily: mono,
            fontSize: '0.72rem',
            letterSpacing: '0.02em',
            color: colors.muted2,
          }}
        >
          Cumulative usage · {range}
        </Typography>
      )}
    </Box>
  );
}

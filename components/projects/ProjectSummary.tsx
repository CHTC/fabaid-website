import { Box, Typography } from '@mui/material';
import React from 'react';

import { Kicker, colors, mono } from '@/components/design';
import { formatBytes, formatCount } from '@/utils/dataRepositories';
import { formatCompact, type OsdfProject } from '@/utils/osdfProjects';

interface StatProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

function Stat({ label, value, emphasis = false }: StatProps) {
  return (
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
          fontSize: '0.72rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: colors.muted,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
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
}

/**
 * Descriptive header (PI + description) over OSDF-forward usage metrics.
 * Pure presentational — reused by the featured card, the table modal, and the
 * per-project page (with `header={false}` since its hero shows the title).
 */
export default function ProjectSummary({ project, header = true }: ProjectSummaryProps) {
  const subtitleParts = [
    project.piName && `PI: ${project.piName}`,
    project.organization || project.institution,
  ].filter(Boolean);

  const tags = attributeTags(project);

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
            {project.fieldOfScience && (
              <Box
                component='span'
                sx={{
                  fontFamily: mono,
                  fontSize: '0.72rem',
                  letterSpacing: '0.04em',
                  color: colors.red,
                  border: `1px solid ${colors.red}`,
                  borderRadius: '999px',
                  px: 1.25,
                  py: 0.4,
                  bgcolor: colors.red050,
                }}
              >
                {project.fieldOfScience}
              </Box>
            )}
            <AttrChips tags={tags} />
          </Box>
        </>
      )}

      {!header && tags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <AttrChips tags={tags} />
        </Box>
      )}

      {project.description && (
        <Typography sx={{ mt: header ? 2 : 0, color: colors.muted, lineHeight: 1.6 }}>
          {project.description}
        </Typography>
      )}

      {/* Hero OSDF metric */}
      <Box sx={{ mt: 3 }}>
        <Stat emphasis label='Data delivered over the OSDF' value={formatBytes(project.osdfBytes)} />
      </Box>

      {/* Supporting metrics */}
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2.5,
        }}
      >
        <Stat label='Files via OSDF' value={formatCompact(project.osdfFiles)} />
        <Stat label='CPU hours' value={formatCompact(project.cpuHours)} />
        <Stat label='GPU hours' value={formatCompact(project.gpuHours)} />
        <Stat label='Jobs' value={formatCount(project.jobs)} />
      </Box>
    </Box>
  );
}

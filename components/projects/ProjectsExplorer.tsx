'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

import { colors } from '@/components/design';
import { formatBytes, formatCount } from '@/utils/dataRepositories';
import { formatCompact, type OsdfProject } from '@/utils/osdfProjects';

export interface ProjectsExplorerProps {
  projects: OsdfProject[];
}

export const projectHref = (name: string) => `/osdf-users/${encodeURIComponent(name)}/`;

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.piName.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.fieldOfScience.toLowerCase().includes(q)
    );
  }, [projects, query]);

  return (
    <>
      <TextField
        fullWidth
        size='small'
        placeholder='Search projects, PIs, institutions, or fields of science…'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2.5, maxWidth: 520 }}
      />

      <TableContainer component={Paper} variant='outlined'>
        <Table aria-label='OSDF projects' sx={{ minWidth: 760 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 700, whiteSpace: 'nowrap' } }}>
              <TableCell>Project</TableCell>
              <TableCell>PI / Organization</TableCell>
              <TableCell>Field of Science</TableCell>
              <TableCell align='right'>OSDF data</TableCell>
              <TableCell align='right'>CPU hours</TableCell>
              <TableCell align='right'>GPU hours</TableCell>
              <TableCell align='right'>Jobs</TableCell>
              <TableCell padding='checkbox' />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((p) => (
              <TableRow
                key={p.name}
                hover
                onClick={() => router.push(projectHref(p.name))}
                sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    {p.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color='text.secondary'>
                    {[p.piName, p.organization || p.institution].filter(Boolean).join(' · ') || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color='text.secondary'>
                    {p.fieldOfScience}
                  </Typography>
                </TableCell>
                <TableCell align='right' sx={{ fontWeight: 600, color: colors.red, whiteSpace: 'nowrap' }}>
                  {formatBytes(p.osdfBytes)}
                </TableCell>
                <TableCell align='right'>{formatCompact(p.cpuHours)}</TableCell>
                <TableCell align='right'>{formatCompact(p.gpuHours)}</TableCell>
                <TableCell align='right'>{formatCount(p.jobs)}</TableCell>
                <TableCell padding='checkbox'>
                  <Box sx={{ display: 'flex', color: 'text.secondary' }}>
                    <ChevronRight fontSize='small' />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography variant='body2' color='text.secondary' sx={{ py: 2, textAlign: 'center' }}>
                    No projects match “{query}”.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

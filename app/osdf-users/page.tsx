import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';

import { PageHero, colors } from '@/components/design';
import { ProjectsExplorer } from '@/components/projects';
import { getOsdfProjects } from '@/utils/osdfProjects';

export const metadata: Metadata = {
  title: 'OSDF Projects | FabAID',
  description:
    'Research projects across the country moving data over the Open Science Data Federation.',
};

export default async function Page() {
  const projects = await getOsdfProjects();

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Data Federation', href: '/data-federation/' },
          { label: 'OSDF projects' },
        ]}
        kicker='OSDF users'
        title='Science running on the fabric.'
        lead={
          projects.length > 0
            ? `${projects.length} research projects have moved data over the OSDF in the past year. Select any project to see its data movement and compute usage.`
            : 'Research projects across the country move data over the Open Science Data Federation.'
        }
      />

      <Box component='section' sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth='lg'>
          {projects.length > 0 ? (
            <ProjectsExplorer projects={projects} />
          ) : (
            <Typography sx={{ color: colors.muted }}>
              Project usage data is temporarily unavailable. Please check back shortly.
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
}

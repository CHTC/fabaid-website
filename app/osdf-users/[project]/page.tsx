import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Box, Container } from '@mui/material';

import { PageHero, Callout, cardSx } from '@/components/design';
import { ProjectSummary } from '@/components/projects';
import { getOsdfProject, getOsdfProjectDaily, getOsdfProjects } from '@/utils/osdfProjects';

type PageParams = { project: string };
type PageProps = { params: Promise<PageParams> };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<PageParams[]> {
  const projects = await getOsdfProjects();
  return projects.map((p) => ({ project: p.name }));
}

function subtitle(piName: string, org: string): string | undefined {
  const parts = [piName && `PI: ${piName}`, org].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project: name } = await params;
  const project = await getOsdfProject(name);

  if (!project) {
    return { title: 'OSDF Project Not Found | FabAID' };
  }

  const description = project.description
    ? project.description.slice(0, 155).trimEnd()
    : `${project.name} — a research project moving data over the OSDF.`;

  return { title: `${project.name} | OSDF Projects | FabAID`, description };
}

export default async function Page({ params }: PageProps) {
  const { project: name } = await params;
  const project = await getOsdfProject(name);

  if (!project) {
    notFound();
  }

  const daily = await getOsdfProjectDaily(name);

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Data Federation', href: '/data-federation/' },
          { label: 'OSDF projects', href: '/osdf-users/' },
          { label: project.name },
        ]}
        kicker='OSDF project'
        title={project.name}
        lead={subtitle(project.piName, project.organization || project.institution)}
      />

      <Box component='section' sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth='lg'>
          <Box sx={{ ...cardSx, p: { xs: 3, md: 5 } }}>
            <ProjectSummary project={project} header={false} daily={daily} />
          </Box>
        </Container>
      </Box>

      <Callout />
    </>
  );
}

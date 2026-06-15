import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';

import { PageHero } from '@/components/design';
import { getDataRepositories } from '@/utils/dataRepositories';
import { RepositoryTable } from './_components';

export const metadata: Metadata = {
  title: 'Data Repositories | FabAID',
  description:
    'Browse the data repositories integrated with the OSDF through FabAID.',
};

export default function Page() {
  const repositories = getDataRepositories();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Data repositories' }]}
        kicker='Open data'
        title='Data Repositories'
        lead={`Explore the ${repositories.length} data repositories available through FabAID. Select a repository to learn more about its data, access, and namespaces.`}
      />
      <Box component='section' sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth='lg'>
          <RepositoryTable repositories={repositories} />
        </Container>
      </Box>
    </>
  );
}


import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';

import PageHeader from '@/components/PageHeader';
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
    <Box pt={6} pb={8}>
      <Container maxWidth={'lg'}>
        <PageHeader
          title='Data Repositories'
          texture='/design/fabric/Fabric-20.png'
        />
        <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
          Explore the {repositories.length} data repositories available through
          FabAID. Select a repository to learn more about its data, access, and
          namespaces.
        </Typography>
        <RepositoryTable repositories={repositories} />
      </Container>
    </Box>
  );
}


import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container } from '@mui/material';

import { PageHero, SectionHead, Callout } from '@/components/design';
import { NewsGrid } from '@/components/news';
import { getNews } from '@/utils/news';

export const metadata: Metadata = {
  title: 'News | FabAID',
  description:
    'News from FabAID and the national fabric of open data services — announcements, milestones, and stories from the community.',
};

export default async function Page() {
  const news = await getNews();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Community', href: '/community/' }, { label: 'News' }]}
        kicker='News'
        title={
          <>
            News from
            <br />
            the fabric.
          </>
        }
        lead='Announcements, milestones, and stories from FabAID and the research community that depends on it.'
      />

      <Box component='section' sx={{ py: { xs: 7, md: 13 } }}>
        <Container maxWidth='lg'>
          <SectionHead
            kicker='Latest'
            title='Recent news.'
            lead='The most recent articles first.'
          />
          <NewsGrid articles={news} />
        </Container>
      </Box>

      <Callout />
    </>
  );
}

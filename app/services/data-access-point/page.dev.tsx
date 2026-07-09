import * as React from 'react';
import type { Metadata } from 'next';

import { PageHero, ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'Data Access Point | FabAID',
  description:
    'Place and manage data-intensive workloads on the fabric with HTCondor-powered access points.',
};

function PageDev() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Data Access Point' }]}
        kicker='Data Access Point'
        title={
          <>
            Put workloads
            <br />
            next to the data.
          </>
        }
        lead='A Data Access Point lets you place and manage data-intensive jobs on the fabric — with throughput-optimized scheduling built on the HTCondor Software Suite.'
      />
      <ComingSoon />
    </>
  );
}

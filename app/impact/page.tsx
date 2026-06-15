import * as React from 'react';
import type { Metadata } from 'next';

import { PageHero, HeroStats, ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'Impact & Funders | FabAID',
  description:
    'FabAID turns NSF investment into open national data infrastructure serving thousands of researchers.',
};

const IMPACT_STATS = [
  { value: '84', label: 'Institutions served' },
  { value: '286 PB', label: 'Research data delivered' },
  { value: '174', label: 'Projects supported' },
  { value: '39', label: 'Fields of science served' },
];

export default function Page() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'For funders / impact' }]}
        kicker='For funders & impact'
        title={
          <>
            Public investment,
            <br />
            national return.
          </>
        }
        lead='FabAID turns NSF investment into open infrastructure that thousands of researchers — across dozens of institutions — depend on every day.'
        action={<HeroStats stats={IMPACT_STATS} note='Across the past 12 months' />}
      />
      <ComingSoon />
    </>
  );
}

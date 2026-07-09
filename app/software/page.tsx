import * as React from 'react';
import type { Metadata } from 'next';

import { ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'Software | FabAID',
  description:
    'The open-source software behind the fabric — Pelican, HTCondor, and more.',
};

export default function Page() {
  return <ComingSoon />;
}

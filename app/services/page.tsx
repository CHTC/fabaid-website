import * as React from 'react';
import type { Metadata } from 'next';

import { ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'Services | FabAID',
  description:
    'A composable fabric of open data services for data-intensive and AI-driven science.',
};

export default function Page() {
  return <ComingSoon />;
}

import * as React from 'react';
import type { Metadata } from 'next';

import { ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'Community | FabAID',
  description:
    'A national community of researchers, campuses, and projects building on the fabric together.',
};

export default function Page() {
  return <ComingSoon />;
}

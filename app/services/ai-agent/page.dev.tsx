import * as React from 'react';
import type { Metadata } from 'next';

import { PageHero, ComingSoon } from '@/components/design';

export const metadata: Metadata = {
  title: 'AI Agent Platform | FabAID',
  description:
    'An LLM assistant for moving data and running workflows on the fabric, built on OpenWebUI and Ollama.',
};

function PageDev() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'AI Agent Platform' }]}
        kicker='AI Agent Platform'
        title={
          <>
            Move data and run
            <br />
            workflows by asking.
          </>
        }
        lead='An LLM assistant that turns plain-language requests into data transfers and workflows — running on open models, on infrastructure you control.'
      />
      <ComingSoon />
    </>
  );
}

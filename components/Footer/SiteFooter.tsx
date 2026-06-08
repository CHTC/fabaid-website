import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

const NSF_AWARD_URL = 'https://www.nsf.gov/awardsearch/show-award?AWD_ID=2609485';

export default function SiteFooter() {
  return (
    <Box component='footer' sx={{ mt: 8, py: 4, bgcolor: 'grey.100', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth='lg'>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <Link href={NSF_AWARD_URL} target='_blank' rel='noopener noreferrer' aria-label='NSF award details'>
            <ExportedImage src='/images/logos/nsf.png' alt='National Science Foundation logo' width={120} height={120} />
          </Link>
          <Typography variant='body2' color='text.secondary'>
            Supported by the National Science Foundation.
          </Typography>
        </Box>

        <Typography variant='body2' color='text.primary'>
          This project is supported by the National Science Foundation under{' '}
          <Link href={NSF_AWARD_URL} target='_blank' rel='noopener noreferrer'>
            Cooperative Agreement OAC-2331480
          </Link>
          . Any opinions, findings, conclusions or recommendations expressed in this material are those of the
          authors and do not necessarily reflect the views of the National Science Foundation.
        </Typography>

        <Typography variant='body2' color='text.secondary' sx={{ mt: 2 }}>
          Contact: <Link href='mailto:contact@fabaid.io'>contact@fabaid.io</Link>
        </Typography>
      </Container>
    </Box>
  );
}


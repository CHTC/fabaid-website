import { Box, Link, Typography } from '@mui/material';
import React from 'react';

import { cardSx, cardHoverSx, colors, mono } from '@/components/design';
import { formatLongDate } from '@chtc/web-components';

import { articleHref, type Article } from '@/utils/news';

export interface NewsCardProps {
  article: Article;
}

/**
 * Card for a syndicated news article: cover image, date eyebrow, title and
 * excerpt, styled to match the rest of the FabAID card system.
 */
export default function NewsCard({ article }: NewsCardProps) {
  return (
    <Link
      href={articleHref(article)}
      underline='none'
      sx={{
        ...cardSx,
        ...cardHoverSx,
        p: 0,
        overflow: 'hidden',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        '&:hover .card-arrow': { transform: 'translateX(3px)' },
      }}
    >
      {article.image?.path && (
        <Box
          component='img'
          src={article.image.path}
          alt={article.image.alt ?? ''}
          loading='lazy'
          sx={{
            display: 'block',
            width: '100%',
            aspectRatio: '2 / 1',
            objectFit: 'cover',
            borderBottom: `1px solid ${colors.line}`,
          }}
        />
      )}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box
          component='time'
          dateTime={article.date.toISOString().slice(0, 10)}
          sx={{
            fontFamily: mono,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.red,
            mb: 1.25,
          }}
        >
          {formatLongDate(article.date)}
        </Box>
        <Typography component='h3' variant='h6' sx={{ fontSize: '1.15rem', lineHeight: 1.25, mb: 1 }}>
          {article.title}
        </Typography>
        {article.excerpt && (
          <Typography
            sx={{
              color: colors.muted,
              fontSize: '0.95rem',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </Typography>
        )}
        <Box
          sx={{
            mt: 'auto',
            pt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Box component='span' sx={{ fontFamily: mono, fontSize: '0.72rem', color: colors.muted }}>
            {article.author ?? ''}
          </Box>
          <Box
            component='span'
            className='card-arrow'
            sx={{ color: colors.red, fontWeight: 600, transition: 'transform .2s ease' }}
            aria-hidden='true'
          >
            →
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

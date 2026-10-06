import { Box, Typography } from '@mui/material';
import React from 'react';

import { colors } from '@/components/design';
import type { Article } from '@/utils/news';
import NewsCard from './NewsCard';

export interface NewsGridProps {
  articles: Article[];
  /** Message shown when there are no articles to list. */
  emptyMessage?: string;
}

/** Responsive 1 / 2 / 3 column grid of news cards. */
export default function NewsGrid({ articles, emptyMessage = 'No news yet. Check back soon.' }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <Typography sx={{ color: colors.muted, fontSize: '1.05rem' }}>{emptyMessage}</Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {articles.map((article) => (
        <NewsCard key={article.path} article={article} />
      ))}
    </Box>
  );
}

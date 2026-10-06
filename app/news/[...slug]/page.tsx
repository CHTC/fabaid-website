import * as React from 'react';
import type { Metadata } from 'next';
import { Box, Container, Link, Typography } from '@mui/material';

import { PageHero, LinkArrow, colors, mono } from '@/components/design';
import { ArticleBody } from '@/components/news';
import { formatLongDate } from '@chtc/web-components';

import { getNews, getNewsArticle } from '@/utils/news';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  return {
    title: `${article.title} | FabAID`,
    description: article.excerpt?.trim(),
    alternates: article.canonical_url ? { canonical: article.canonical_url } : undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt?.trim(),
      type: 'article',
      publishedTime: article.date.toISOString(),
      images: article.image?.path ? [{ url: article.image.path, alt: article.image.alt }] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  const banner = article.banner_src
    ? { src: article.banner_src, alt: article.banner_alt ?? '' }
    : null;

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Community', href: '/community/' },
          { label: 'News', href: '/news/' },
        ]}
        kicker='News'
        title={article.title}
        lead={
          <Box
            component='span'
            sx={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75em',
              fontFamily: mono,
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              color: colors.onInkLead,
            }}
          >
            <Box component='time' dateTime={article.date.toISOString().slice(0, 10)}>
              {formatLongDate(article.date)}
            </Box>
            {article.author && (
              <>
                <Box component='span' sx={{ opacity: 0.5 }} aria-hidden='true'>
                  /
                </Box>
                <Box component='span'>{article.author}</Box>
              </>
            )}
          </Box>
        }
      />

      <Box component='article' sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth='md'>
          {banner && (
            <Box
              component='img'
              src={banner.src}
              alt={banner.alt}
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: '14px',
                border: `1px solid ${colors.line}`,
                mb: 5,
              }}
            />
          )}

          <ArticleBody>{article.content}</ArticleBody>

          {article.canonical_url && (
            <Typography sx={{ mt: 5, color: colors.muted, fontSize: '0.92rem' }}>
              Originally published at{' '}
              <Link
                href={article.canonical_url}
                target='_blank'
                rel='noopener'
                sx={{ color: colors.red, wordBreak: 'break-all' }}
              >
                {article.canonical_url}
              </Link>
            </Typography>
          )}

          <Box sx={{ mt: 6, pt: 4, borderTop: `1px solid ${colors.line}` }}>
            <LinkArrow href='/news/'>All news</LinkArrow>
          </Box>
        </Container>
      </Box>
    </>
  );
}

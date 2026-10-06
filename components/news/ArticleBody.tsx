import { Box, Link } from '@mui/material';
import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { colors } from '@/components/design';
import { chtcDisplayFont } from '@chtc/web-components/themes';

export interface ArticleBodyProps {
  /** Markdown source, frontmatter already stripped. */
  children: string;
}

const components: Components = {
  a: ({ children, href }) => {
    const external = typeof href === 'string' && /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
        sx={{ color: colors.red, fontWeight: 500 }}
      >
        {children}
      </Link>
    );
  },
};

/**
 * Renders an article's markdown body. Articles in the shared CHTC/Articles
 * repository mix markdown with raw HTML (figures, floated images), so raw HTML
 * is allowed and the common elements are styled through descendant selectors.
 */
export default function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <Box
      sx={{
        color: colors.ink,
        fontSize: '1.08rem',
        lineHeight: 1.7,
        '& > :first-of-type': { mt: 0 },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontFamily: chtcDisplayFont.style.fontFamily,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          mt: 4.5,
          mb: 1.5,
          clear: 'both',
        },
        '& h1': { fontSize: '1.9rem' },
        '& h2': { fontSize: '1.65rem' },
        '& h3': { fontSize: '1.35rem' },
        '& h4, & h5, & h6': { fontSize: '1.15rem' },
        '& p': { my: 2 },
        '& ul, & ol': { pl: 3.5, my: 2 },
        '& li': { mb: 0.75 },
        '& li > p': { my: 0.5 },
        '& img': { maxWidth: '100%', height: 'auto', borderRadius: '10px' },
        '& figure': { m: 0, my: 3, maxWidth: '100%' },
        '& figure img': { display: 'block' },
        '& figcaption': {
          mt: 1,
          fontSize: '0.88rem',
          color: colors.muted,
          lineHeight: 1.5,
        },
        '& blockquote': {
          m: 0,
          my: 3,
          pl: 2.5,
          borderLeft: `3px solid ${colors.red}`,
          color: colors.muted,
          fontStyle: 'italic',
        },
        '& hr': { border: 0, borderTop: `1px solid ${colors.line}`, my: 4 },
        '& code': {
          fontFamily: 'monospace',
          fontSize: '0.9em',
          bgcolor: colors.paper2,
          px: 0.6,
          py: 0.2,
          borderRadius: '5px',
          wordBreak: 'break-word',
        },
        '& pre': {
          bgcolor: colors.paper2,
          border: `1px solid ${colors.line}`,
          borderRadius: '10px',
          p: 2,
          my: 3,
          overflowX: 'auto',
          fontSize: '0.9rem',
          lineHeight: 1.6,
        },
        '& pre code': { bgcolor: 'transparent', p: 0 },
        '& table': {
          display: 'block',
          width: '100%',
          overflowX: 'auto',
          borderCollapse: 'collapse',
          my: 3,
          fontSize: '0.95rem',
        },
        '& th, & td': {
          border: `1px solid ${colors.line}`,
          p: 1.25,
          textAlign: 'left',
          verticalAlign: 'top',
        },
        '& th': { bgcolor: colors.paper, fontWeight: 700 },
        // Floated figures should not escape past the end of the article.
        '&::after': { content: '""', display: 'block', clear: 'both' },
        '@media (max-width: 599.95px)': {
          '& figure, & img': { float: 'none !important', width: '100% !important', mx: '0 !important' },
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {children}
      </ReactMarkdown>
    </Box>
  );
}

import {
  getArticle,
  getArticles,
  filterArticles,
  sortArticles,
  type BackendArticle,
} from '@chtc/web-components';

/**
 * News is authored once in the shared CHTC/Articles repository and syndicated
 * to each CHTC-operated website. FabAID shows articles whose `publish_on`
 * frontmatter includes `fabaid`.
 */

const ARTICLES_ORG = 'CHTC';
const ARTICLES_REPO = 'Articles';
const ARTICLES_BRANCH = 'main';

export type { BackendArticle as Article };

/** FabAID news, newest first. */
export async function getNews(): Promise<BackendArticle[]> {
  const articles = await getArticles(ARTICLES_ORG, ARTICLES_REPO, ARTICLES_BRANCH);
  return sortArticles(filterArticles(articles, 'fabaid', 'news'));
}

/** Resolve a /news/[...slug] route back to its article. */
export async function getNewsArticle(slug: string[]): Promise<BackendArticle> {
  return getArticle(ARTICLES_ORG, ARTICLES_REPO, `${slug.join('-')}.md`, ARTICLES_BRANCH);
}

/** The route for an article, e.g. `/news/2026/10/06/some-title/`. */
export function articleHref(article: Pick<BackendArticle, 'slug'>): string {
  return `/news/${article.slug.join('/')}/`;
}

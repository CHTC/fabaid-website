import type { DataRepository } from '@/types';

import repositoriesJson from '@/public/data/data-repositories.json';
import validNamespacesJson from '@/public/data/valid-namespaces.json';

/** Default Pelican federation used to build object URLs. */
export const PELICAN_FEDERATION = 'osg-htc.org';

/**
 * Builds a `pelican://` object URL for a namespace within the federation.
 */
export function pelicanObjectUrl(
  namespace: string,
  federation: string = PELICAN_FEDERATION
): string {
  return `pelican://${federation}${namespace}`;
}

/**
 * Set of registered namespace paths from valid-namespaces.json, used to gate
 * the Pelican file browser.
 */
const validNamespacePaths: Set<string> = new Set(
  (validNamespacesJson as Array<{ path: string }>).map((entry) => entry.path)
);

/**
 * Returns true when a namespace is registered in the federation – i.e. it
 * exactly matches a valid path, or is a sub-path of one (starts with the
 * valid path followed by `/`).
 */
export function isValidNamespace(namespace: string): boolean {
  if (validNamespacePaths.has(namespace)) return true;
  for (const path of validNamespacePaths) {
    if (namespace.startsWith(path + '/')) return true;
  }
  return false;
}

/**
 * Filters a list of namespace strings to only those registered in the
 * federation (valid-namespaces.json).
 */
export function filterValidNamespaces(namespaces: string[]): string[] {
  return namespaces.filter(isValidNamespace);
}

const repositories = repositoriesJson as unknown as Record<
  string,
  DataRepository
>;

/**
 * Returns every data repository that is flagged for display, sorted by rank
 * (higher rank first) and then alphabetically by name.
 */
export function getDataRepositories(): DataRepository[] {
  return Object.values(repositories)
    .filter((repository) => repository.display)
    .sort(
      (a, b) =>
        b.rank - a.rank || (a.name ?? '').localeCompare(b.name ?? '')
    );
}

/**
 * Returns a single data repository by its id, or undefined when it does not
 * exist or is not flagged for display.
 */
export function getDataRepository(id: string): DataRepository | undefined {
  const repository = repositories[id];
  return repository && repository.display ? repository : undefined;
}

/**
 * Returns the ids of every data repository that should be statically generated.
 */
export function getDataRepositoryIds(): string[] {
  return getDataRepositories().map((repository) => repository.id);
}

/**
 * Formats a raw byte count into a human readable string (e.g. "1.2 TB").
 */
export function formatBytes(bytes: number | null): string {
  if (bytes === null || Number.isNaN(bytes)) {
    return '—';
  }

  if (bytes === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1000)),
    units.length - 1
  );
  const value = bytes / 1000 ** exponent;

  return `${value.toFixed(value >= 100 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

/**
 * Formats a nullable count into a localized string, using an em dash for
 * missing values.
 */
export function formatCount(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '—';
  }

  return value.toLocaleString();
}







import fs from 'node:fs';
import path from 'node:path';

import type { Staff } from './staff';

/**
 * Staff headshots live on chtc.github.io, and next-image-export-optimizer only
 * generates variants for remote images declared up front in
 * `remoteOptimizedImages.js` — anything it hasn't been told about is a silent
 * 404 in the export.
 *
 * Rather than keep a hand-maintained URL list in sync with the staff list, the
 * pages that render portraits record the URLs they used while rendering, and
 * `remoteOptimizedImages.js` reads the manifest back after `next build`.
 */
export const STAFF_IMAGE_MANIFEST = path.join(process.cwd(), '.staff-images.json');

function read(): string[] {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(STAFF_IMAGE_MANIFEST, 'utf8'));
    return Array.isArray(parsed) ? parsed.filter((url) => typeof url === 'string') : [];
  } catch {
    // No manifest yet, or a half-written one from an interrupted build.
    return [];
  }
}

/**
 * Add these portraits to the build's manifest of remote images to optimize.
 * Merges with what other pages have already recorded; `pnpm run prerun` clears
 * the manifest so a build never inherits a previous one's entries.
 */
export function recordStaffImages(staff: Pick<Staff, 'image'>[]): void {
  const urls = new Set(read());
  for (const { image } of staff) {
    if (image?.startsWith('http')) urls.add(image);
  }
  fs.writeFileSync(STAFF_IMAGE_MANIFEST, `${JSON.stringify([...urls].sort(), null, 2)}\n`);
}

/** Drop the manifest so a build only records the portraits it actually renders. */
export function resetStaffImages(): void {
  fs.rmSync(STAFF_IMAGE_MANIFEST, { force: true });
}

/* eslint-disable @typescript-eslint/no-require-imports -- this file must stay CommonJS; see below. */
// CommonJS on purpose: next-image-export-optimizer `require()`s this file after
// `next build` to learn which remote images to download and optimize.
//
// The list is not hand-maintained. The pages that render staff headshots call
// `recordStaffImages` while rendering, which writes the deduped portrait URLs to
// `.staff-images.json` (gitignored). `pnpm run build` runs `prerun` (clears the
// manifest), then `next build` (writes it), then `postbuild` (reads it here), so
// the ordering holds.
const fs = require('node:fs');
const path = require('node:path');

const MANIFEST = path.join(__dirname, '.staff-images.json');

if (!fs.existsSync(MANIFEST)) {
  throw new Error(
    `${MANIFEST} is missing. It is written by recordStaffImages() during ` +
      '`next build`; run `pnpm run build` rather than the optimizer on its own.'
  );
}

const urls = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));

if (!Array.isArray(urls) || urls.length === 0) {
  throw new Error(
    `${MANIFEST} is empty. No page recorded a staff portrait, so every headshot ` +
      'would 404 in the export. Check that the staff list fetch succeeded.'
  );
}

module.exports = urls;

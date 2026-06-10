import { copyFile, mkdir } from "node:fs/promises";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(
  PROJECT_ROOT,
  "node_modules/@pelicanplatform/web-client/dist/serviceWorker/downloadServiceWorker.js"
);
const DEST = path.join(PROJECT_ROOT, "public/downloadServiceWorker.js");

export default async function copyServiceWorker(): Promise<void> {
  await mkdir(path.dirname(DEST), { recursive: true });
  await copyFile(SRC, DEST);
  console.log(`Copied service worker: ${SRC} → ${DEST}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void copyServiceWorker().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}


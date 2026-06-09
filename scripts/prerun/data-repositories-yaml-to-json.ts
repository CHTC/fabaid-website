import { promises as fs } from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import * as yaml from "js-yaml";

type RepositoryRecord = Record<string, unknown>;

type RepositoryYaml = RepositoryRecord & {
  id?: unknown;
};

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const INPUT_DIR = path.join(PROJECT_ROOT, "public", "data", "data-repositories");
const OUTPUT_FILE = path.join(PROJECT_ROOT, "public", "data", "data-repositories.json");

async function convertYamlDirectoryToJsonRecord(
  inputDir: string,
  outputFile: string,
): Promise<void> {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  const yamlFiles = entries
    .filter((entry) => entry.isFile() && /\.ya?ml$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const aggregated: Record<string, RepositoryRecord> = {};

  for (const fileName of yamlFiles) {
    const filePath = path.join(inputDir, fileName);
    const fileContent = await fs.readFile(filePath, "utf8");

    let parsed: RepositoryYaml | null;
    try {
      // json:true makes duplicate mapping keys use the last value instead of throwing.
      parsed = yaml.load(fileContent, { json: true }) as RepositoryYaml | null;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to parse ${fileName}: ${message}`);
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Expected an object in ${fileName}, but found a different YAML structure.`);
    }

    const fallbackId = path.basename(fileName, path.extname(fileName));

    let id: string;
    if (typeof parsed.id === "string" && parsed.id.trim().length > 0) {
      id = parsed.id.trim();
    } else if (parsed.id === undefined || parsed.id === null || parsed.id === "") {
      id = fallbackId;
      parsed.id = id;
    } else {
      throw new Error(`Invalid id in ${fileName}. Expected a non-empty string when provided.`);
    }

    if (aggregated[id]) {
      throw new Error(`Duplicate id \"${id}\" found in ${fileName}.`);
    }

    aggregated[id] = parsed;
  }

  await fs.writeFile(outputFile, `${JSON.stringify(aggregated, null, 2)}\n`, "utf8");

  console.log(
    `Converted ${yamlFiles.length} YAML files from ${inputDir} into ${outputFile} with ${Object.keys(aggregated).length} records.`,
  );
}

export default function dataRepositoriesYamlToJson(): Promise<void> {
  return convertYamlDirectoryToJsonRecord(INPUT_DIR, OUTPUT_FILE);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  void dataRepositoriesYamlToJson().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

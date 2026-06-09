import dataRepositoriesYamlToJson from "./data-repositories-yaml-to-json";

async function prerun(): Promise<void> {
  await dataRepositoriesYamlToJson();
}

void prerun().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

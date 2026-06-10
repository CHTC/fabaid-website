import dataRepositoriesYamlToJson from "./data-repositories-yaml-to-json";
import copyServiceWorker from "./copy-service-worker";

async function prerun(): Promise<void> {
  await dataRepositoriesYamlToJson();
  await copyServiceWorker();
}

void prerun().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

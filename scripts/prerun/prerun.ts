import dataRepositoriesYamlToJson from "./data-repositories-yaml-to-json";
import copyServiceWorker from "./copy-service-worker";
import { resetStaffImages } from "../../utils/staffImages";

async function prerun(): Promise<void> {
  // Start each build with an empty remote-image manifest so it ends up holding
  // exactly the staff portraits this build rendered.
  resetStaffImages();
  await dataRepositoriesYamlToJson();
  await copyServiceWorker();
}

void prerun().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

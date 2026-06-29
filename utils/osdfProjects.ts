/**
 * Server-side loader that joins OSPool/OSDF usage metrics (from adstash) with
 * the human-readable project descriptions in OSG Topology.
 *
 * adstash gives us the numbers (OSDF bytes/files moved, CPU/GPU hours, jobs);
 * Topology gives us the `Description`, `PIName`, and `Organization`. We merge
 * them by project name and slim the result down for the client so the browser
 * never has to call either upstream service.
 */

import { getProjects, getProjectDaily, type ProjectDailyPoint } from './adstash';

export type { ProjectDailyPoint };

const TOPOLOGY_URL = 'https://topology.opensciencegrid.org/miscproject/json';

export interface OsdfProject {
  name: string;
  description: string;
  piName: string;
  organization: string;
  fieldOfScience: string;
  institution: string;
  // Broader-impacts attributes of the PI's institution.
  epscor: boolean;
  carnegie: string;
  // OSDF data-movement metrics (emphasized).
  osdfBytes: number;
  osdfFiles: number;
  // OSPool compute metrics.
  cpuHours: number;
  gpuHours: number;
  jobs: number;
  // All-source transfer totals (OSDF + direct).
  bytes: number;
  files: number;
}

interface TopologyProject {
  Name?: string;
  Description?: string;
  PIName?: string;
  Organization?: string;
  FieldOfScience?: string;
}

async function getTopologyProjects(): Promise<Record<string, TopologyProject>> {
  const res = await fetch(TOPOLOGY_URL);
  if (!res.ok) {
    throw new Error(`Topology request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as Record<string, TopologyProject>;
}

/**
 * Fetch every active OSPool project, keep those that have moved data over the
 * OSDF, and decorate them with Topology descriptions. Sorted by OSDF bytes
 * moved (descending). Returns `[]` if either upstream is unavailable — the
 * OSDF page degrades to its other content rather than failing the build.
 *
 * Memoized per process: the per-project static pages, `generateStaticParams`,
 * and the list/federation pages all call this, but the (uncacheable POST)
 * adstash query should only run once per build worker.
 */
let projectsPromise: Promise<OsdfProject[]> | null = null;

export function getOsdfProjects(): Promise<OsdfProject[]> {
  if (!projectsPromise) {
    projectsPromise = loadOsdfProjects();
  }
  return projectsPromise;
}

async function loadOsdfProjects(): Promise<OsdfProject[]> {
  try {
    const [projects, topology] = await Promise.all([
      getProjects(),
      getTopologyProjects(),
    ]);

    const merged: OsdfProject[] = Object.values(projects)
      .filter((p) => (p.osdfByteTransferCount ?? 0) > 0)
      .map((p) => {
        const topo = (p.projectName && topology[p.projectName]) || {};
        return {
          name: p.projectName ?? 'Unknown project',
          description: topo.Description ?? '',
          piName: topo.PIName ?? '',
          organization: topo.Organization ?? '',
          fieldOfScience:
            p.broadFieldOfScience || topo.FieldOfScience || 'Multidisciplinary',
          institution: p.projectInstitutionName ?? '',
          epscor: p.projectEpscorState ?? false,
          carnegie: p.projectInstitutionCarnegieClassification2025 ?? '',
          osdfBytes: p.osdfByteTransferCount ?? 0,
          osdfFiles: p.osdfFileTransferCount ?? 0,
          cpuHours: p.cpuHours ?? 0,
          gpuHours: p.gpuHours ?? 0,
          jobs: p.numJobs ?? 0,
          bytes: p.byteTransferCount ?? 0,
          files: p.fileTransferCount ?? 0,
        };
      });

    merged.sort((a, b) => b.osdfBytes - a.osdfBytes);
    return merged;
  } catch {
    return [];
  }
}

/** Look up a single project by its exact name. */
export async function getOsdfProject(name: string): Promise<OsdfProject | null> {
  const projects = await getOsdfProjects();
  return projects.find((p) => p.name === name) ?? null;
}

/**
 * Per-day usage series for one project, for the detail-page sparklines. Fails
 * soft to `[]` so a daily-query hiccup degrades to "no sparklines" rather than
 * breaking the page.
 */
export async function getOsdfProjectDaily(name: string): Promise<ProjectDailyPoint[]> {
  try {
    return await getProjectDaily(name);
  } catch {
    return [];
  }
}

/** Pick the project to feature: the top OSDF mover that has a real description. */
export function pickFeaturedProject(projects: OsdfProject[]): OsdfProject | null {
  if (projects.length === 0) return null;
  return projects.find((p) => p.description.length > 0) ?? projects[0];
}

/** Compact number formatting for large metrics (e.g. 12.3M). */
export function formatCompact(value: number): string {
  if (!value) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

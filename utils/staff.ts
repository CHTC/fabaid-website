import { getPaths, getTree } from '@/utils/github';
import yaml from 'js-yaml';

/**
 * Order staff by ascending `weight` (lower weight on top). Members without a
 * weight sink to the bottom and are ordered alphabetically by name among
 * themselves. A weight of 0 counts as a real weight, not "no weight".
 */
export function byWeightThenName(a: Staff, b: Staff): number {
  const aHasWeight = a.weight != null;
  const bHasWeight = b.weight != null;

  if (aHasWeight && bHasWeight) {
    if (a.weight !== b.weight) return (a.weight as number) - (b.weight as number);
    return a.name.localeCompare(b.name);
  }
  if (aHasWeight) return -1;
  if (bHasWeight) return 1;
  return a.name.localeCompare(b.name);
}

export async function getStaff(website: Website): Promise<Staff[]> {
  return getStaffFromRepo(
    'chtc',
    'staff-list',
    'init-staff-list',
    'https://chtc.github.io/staff-list/',
    website
  );
}

async function getStaffFromRepo(
  organization: string,
  repo: string,
  branch: string,
  url: string,
  website: Website
): Promise<Staff[]> {
  const tree = await getTree(organization, repo, branch);
  const paths = getPaths(tree);

  // Filter out the non-article paths and pull down and parse the remote files
  return Promise.all(
    paths
      .filter((path) => path.endsWith('.yml') && !path.includes('/'))
      .map(async (path) => await fetchStaff(url, path, website))
  );
}

async function fetchStaff(
  baseURL: string,
  file: string,
  website: Website
): Promise<Staff> {
  const res = await fetch(baseURL + file);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch staff file: ${res.status} ${res.statusText} \n ${baseURL + file}`
    );
  }

  const text = await res.text();
  const json = yaml.load(text) as Staff;

  return {
    ...json,
    ...json?.[website],
    image: baseURL + json.image,
  };
}

export type Staff = StaffBase & {
  [key in Website]?: Partial<StaffBase>;
};

type Website = 'htcondor' | 'path' | 'osg' | 'chtc' | 'pelican' | 'fabaid';

interface StaffBase {
  name: string;
  image: string;
  title: string;
  website?: string;
  institution?: string;
  promoted?: boolean;
  weight?: number;
  description?: string;
  is_facilitator?: number;
  status: 'Staff' | 'Student' | 'Past';
  organizations: Website[];
}

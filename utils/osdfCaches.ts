/**
 * Server-side loader for OSDF cache locations.
 *
 * The director exposes every federation server (Origins + Caches) at the URL
 * below. We fetch it at build time, keep only Caches that have real
 * coordinates, and slim each record down to what the map needs — so the
 * browser never has to call the director itself.
 */

const DIRECTOR_URL =
  'https://osdf-director.osg-htc.org/api/v1.0/director_ui/servers';

export type CacheHealth = 'OK' | 'Initializing' | 'Error' | 'Unknown';

export interface OsdfCache {
  name: string;
  latitude: number;
  longitude: number;
  health: CacheHealth;
  webUrl: string;
  version: string;
}

interface DirectorServer {
  name?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  healthStatus?: string;
  webUrl?: string;
  version?: string;
}

function normalizeHealth(status?: string): CacheHealth {
  if (status === 'OK' || status === 'Initializing' || status === 'Error') {
    return status;
  }
  return 'Unknown';
}

/**
 * Fetch and slim the OSDF cache list. Runs on the server (build time for the
 * static export). Throws if the director is unreachable or returns a non-OK
 * response — we deliberately fail the build rather than ship a site with a
 * silently empty map.
 */
export async function getOsdfCaches(): Promise<OsdfCache[]> {
  const res = await fetch(DIRECTOR_URL);
  if (!res.ok) {
    throw new Error(
      `OSDF director request failed: ${res.status} ${res.statusText} (${DIRECTOR_URL})`
    );
  }

  const servers = (await res.json()) as DirectorServer[];

  return servers
      .filter(
        (s): s is DirectorServer & { latitude: number; longitude: number } =>
          s.type === 'Cache' &&
          // Only show healthy caches — skip those in Error or still Initializing.
          s.healthStatus === 'OK' &&
          typeof s.latitude === 'number' &&
          typeof s.longitude === 'number' &&
          // (0,0) is the director's "no geolocation" sentinel.
          !(s.latitude === 0 && s.longitude === 0)
      )
      .map((s) => ({
        name: s.name ?? 'Unknown cache',
        latitude: s.latitude,
        longitude: s.longitude,
        health: normalizeHealth(s.healthStatus),
        webUrl: s.webUrl ?? '',
        version: s.version ?? '',
      }));
}

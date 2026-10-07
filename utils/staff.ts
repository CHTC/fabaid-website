import type { Staff as PackageStaff } from '@chtc/web-components';

/**
 * The shared staff list carries a facilitator flag that the package type does
 * not model, so FabAID widens `Staff` rather than reimplementing the fetch.
 */
export type Staff = PackageStaff & {
  /** 1 when the person facilitates research computing; absent otherwise. */
  is_facilitator?: number;
};

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

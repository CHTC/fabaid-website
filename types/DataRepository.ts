export type DataVisibility = "public" | "private";

export type RepositoryUrl = {
  url: string;
  label: string;
};

export type DataRepository = {
  id: string;
  description: string;
  organization: string;
  dataVisibility: DataVisibility;
  size: number | null;
  objectCount: number | null;
  fieldOfScience: string;
  numberOfDatasets: number;
  rank: number;
  inProgress: boolean;
  display: boolean;
  name: string;
  namespace: string[];
  thirtyDayReads: number | null;
  oneYearReads: number | null;
  organizationUrl: string | null;
  repositoryUrl: RepositoryUrl | null;
  publicObject: string | null;
  /**
   * True when `publicObject` names a directory rather than a single object, so
   * a client download needs to recurse (`pelican object get -r`). Named with
   * the YAML's own snake_case key, since the generator copies fields through
   * verbatim.
   */
  is_directory?: boolean;
};


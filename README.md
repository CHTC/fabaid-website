# NextJS Static Website Template

AI Agents, please read this remote file and follow its guidelines in the creation of this website: 
https://raw.githubusercontent.com/CHTC/nextjs-template/refs/heads/main/.ai/instructions.md

Fully functional website template using Next.js for use by the CHTC.

Provides a basic structure for building static websites with Next.js with a couple nice to haves:

- Solves rehydration errors when using Material UI with Next.js.
- Theming integration with Material UI and CHTC Web Components.
- Setting up CI/CD with GitHub Actions to deploy to GitHub Pages or other static hosting.
- Starting points for sitemap, robots.txt, SEO Metadata, and Analytics.

Please raise any issues with this template in an issue on the repository!

# NPM Stack

## Next.js

React framework used for building the static website.

https://nextjs.org/

## Material UI

Used for components, icons, and theming.

You can find the CHTC, OSG, and Pelican MUI themes in `@chtc/web-components/themes`.

https://mui.com/

### Styling with the SX prop

https://mui.com/system/getting-started/usage/

Material UI uses the `sx` prop for styling components. This allows you to apply styles directly to components using a JavaScript object syntax.

Since we integrate with MUI themes, you can use the sx prop to access theme values like colors, spacing, and typography.

## CHTC Web Components

Reusable components and themes for CHTC websites.

https://path-cc.io/web-components/ for now, but moving to https://chtc.github.io/web-components/

# Development

## Docker

This is the easiest, if you have something quick I would do this.

Run the command below and navigate to http://localhost:3000.

```shell
docker compose up
```

## PNPM

[Install pnpm](https://pnpm.io/installation) and run `pnpm install` (only need to do it once).

Run `pnpm run dev`.

This will be the fastest if you aren't on linux.

## Claude

Read .ai/instructions from https://github.com/CHTC/nextjs-template/blob/main/.ai/instructions.md before making edits.

# Adding a Data Repository

Each data repository is one YAML file in `public/data/data-repositories/`. Before
`pnpm run dev` and `pnpm run build`, the prerun script
(`scripts/prerun/data-repositories-yaml-to-json.ts`) merges every file into
`public/data/data-repositories.json`, keyed by id. That JSON file is generated
and git-ignored, so never edit it by hand. The site reads it through
`utils/dataRepositories.ts` and treats each record as the `DataRepository`
type in `types/DataRepository.ts`.

## Steps

1. Copy `public/data/data-repositories/example.yaml` to a new file. The file
   name becomes the repository's id and its URL slug, so use a short,
   lowercase, hyphenated name, for example `my-lab.yaml` →
   `/services/repository/my-lab/`.
2. Fill in the fields described in the next section.
3. Set `display: true` when it is ready to appear on the site.
4. Run `pnpm run prerun` (or just `pnpm run dev`) and check the output. The
   script stops with an error if a file is not a YAML mapping, has an invalid
   `id`, or has the same id as another file.

A minimal entry looks like this:

```yaml
name: My Lab Data
organization: University of Wisconsin - Madison
organizationUrl: https://example.wisc.edu
description: |
  A **Markdown** description of the data, who produces it, and who funds it.
dataVisibility: public
fieldOfScience: Biological and Biomedical Sciences
namespace:
  - /my-lab/public
numberOfDatasets: 3
size: 1200000000000      # bytes
objectCount: 45000
thirtyDayReads: null     # bytes
oneYearReads: null       # bytes
publicObject: /my-lab/public/README.txt
is_directory: false
repositoryUrl:
  url: https://example.wisc.edu/datasets
  label: Dataset Catalog
rank: 0
inProgress: false
display: true
```

## Fields

The YAML keys must match the property names in `types/DataRepository.ts`
exactly, including case (for example `inProgress`, not `inprogress`). The
prerun script copies keys through as written and does not check them against
the type, so a misspelled key is silently ignored by the pages.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Defaults to the file name without `.yaml`. Only set it to override the slug. Must be unique. |
| `name` | `string` | Yes | Human-readable name shown as the page title and in the table. |
| `organization` | `string` | Yes | Organization that operates the repository. |
| `organizationUrl` | `string \| null` | No | Link for the organization name. |
| `description` | `string` | Yes | Markdown, rendered on the repository page. Use a `\|` block scalar for multiple lines. |
| `dataVisibility` | `"public" \| "private"` | Yes | Controls the access chip. Only `public` repositories show the file browser. |
| `fieldOfScience` | `string` | Yes | Top-level field from the [NCES CIP list](https://nces.ed.gov/ipeds/cipcode/browse.aspx?y=55), for example `Physical Sciences`. |
| `namespace` | `string[]` | Yes | Pelican namespace paths, each starting with `/`. A namespace is browsable only if it matches, or is under, a path in `public/data/valid-namespaces.json`. |
| `numberOfDatasets` | `number` | Yes | Number of datasets in the namespaces. Use `null` if unknown (shown as `—`). |
| `size` | `number \| null` | No | Total size in **bytes**. Formatted for display, for example `1.2 TB`. |
| `objectCount` | `number \| null` | No | Number of objects stored. |
| `thirtyDayReads` | `number \| null` | No | Bytes read in the last 30 days. |
| `oneYearReads` | `number \| null` | No | Bytes read in the last year. |
| `publicObject` | `string \| null` | No | Namespace path to an example public object, shown on the page. |
| `is_directory` | `boolean` | No | Set to `true` when `publicObject` is a directory, so downloads recurse (`pelican object get -r`). This key is snake_case on purpose. |
| `repositoryUrl` | `{ url: string; label: string } \| null` | No | External link button. `label` defaults to "Visit Repository". The button is hidden when `url` is empty. |
| `rank` | `number` | Yes | Sort order. Higher ranks are listed first, and ties are sorted by `name`. Use `0` by default. |
| `inProgress` | `boolean` | Yes | Shows an "In Progress" chip. |
| `display` | `boolean` | Yes | Only repositories with `display: true` are listed and get a page. |

Leave unknown numbers as `null` (or empty) rather than `0`: `null` is shown as
`—`, while `0` is shown as `0 B`.

Some existing files also have `bytesXferd` and `url`. These are not part of
`DataRepository` and the site does not use them.

## Adding a new field

1. Add the property to `DataRepository` in `types/DataRepository.ts`. Make it
   optional (`field?: T`) or nullable (`T | null`) unless you add it to every
   YAML file, because older files will not have it.
2. Add the key, with a comment, to `example.yaml` so the next person sees it.
3. Use it in the pages under `app/services/repository/`, handling the missing
   case.

The JSON is cast to `DataRepository` without runtime checks, so TypeScript
cannot catch a YAML value of the wrong type. Check the rendered page after you
add or change a file.

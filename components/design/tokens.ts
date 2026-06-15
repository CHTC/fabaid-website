/**
 * Design tokens from the FabAID design system (Claude Design handoff).
 *
 * The CHTC MUI theme already supplies the brand red (`#B61F24`) as
 * `primary.main`. These tokens cover the additional neutral / surface values
 * the design relies on that aren't part of the MUI palette — the warm paper
 * backgrounds, the dark "ink" sections, and the monospace label font used for
 * kickers and eyebrows.
 */

export const colors = {
  red: '#B61F24',
  red300: '#D9534F',
  red050: '#FBECEC',
  red800: '#6E0F14',

  black: '#0C0B0B',
  ink: '#17140F',
  charcoal: '#211E1B',
  muted: '#6E6960',
  muted2: '#928D84',
  line: '#E4DFD6',
  lineStrong: '#D2CCC0',

  paper: '#F6F3EE',
  paper2: '#EFEBE3',
  surface: '#FFFFFF',
  surfaceInk: '#161311',

  // Light text tones used on the dark "ink" sections.
  onInk: '#F3EFE9',
  onInkLead: '#C9C3BA',
  onInkMuted: '#8F897F',
} as const;

/** Monospace stack for kickers, eyebrows, and metric labels. */
export const mono = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace';

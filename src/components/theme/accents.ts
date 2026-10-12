export const ACCENTS = ["violet", "emerald", "amber", "rose", "sky"] as const;
export type Accent = (typeof ACCENTS)[number];
export const DEFAULT_ACCENT: Accent = "violet";
export const ACCENT_STORAGE_KEY = "accent";

export function applyAccent(accent: Accent) {
  document.documentElement.dataset.accent = accent;
  localStorage.setItem(ACCENT_STORAGE_KEY, accent);
}

/** Runs before paint to apply the saved accent and avoid a color flash. */
export const accentInitScript = `(function(){try{var a=localStorage.getItem(${JSON.stringify(
  ACCENT_STORAGE_KEY,
)});if(${JSON.stringify(ACCENTS)}.indexOf(a)>-1)document.documentElement.dataset.accent=a;}catch(e){}})();`;

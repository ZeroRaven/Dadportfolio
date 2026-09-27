/** Knowledge-base shared types. */

export interface KBSection {
  heading: { en: string; np: string };
  body: { en: string; np: string };
  bullets?: { en: string; np: string }[];
}

export interface KBFact {
  label: { en: string; np: string };
  value: { en: string; np: string };
  note?: { en: string; np: string };
}

export interface KBChart {
  title: { en: string; np: string };
  unit?: { en: string; np: string };
  source: string;
  data: { label: { en: string; np: string }; value: number }[];
}

export interface KBArticle {
  id: string;
  categoryId: string;
  title: { en: string; np: string };
  summary: { en: string; np: string };
  readMinutes: number;
  /** Hero image (imported asset path) — filled from the category registry when absent. */
  image?: string;
  /** Image alt text (defaults to the article title when absent). */
  imageAlt?: { en: string; np: string };
  /** Technical factsheet — key figures at the top of the reader. */
  facts?: KBFact[];
  /** Data chart rendered as labelled horizontal bars. */
  chart?: KBChart;
  sections: KBSection[];
  tip?: { en: string; np: string };
  caution?: { en: string; np: string };
  sources: string;
  updated: string;
}

export interface KBCategory {
  id: string;
  title: { en: string; np: string };
  blurb: { en: string; np: string };
}

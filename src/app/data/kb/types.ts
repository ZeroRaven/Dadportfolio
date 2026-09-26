/** Knowledge-base shared types. */

export interface KBSection {
  heading: { en: string; np: string };
  body: { en: string; np: string };
  bullets?: { en: string; np: string }[];
}

export interface KBArticle {
  id: string;
  categoryId: string;
  title: { en: string; np: string };
  summary: { en: string; np: string };
  readMinutes: number;
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

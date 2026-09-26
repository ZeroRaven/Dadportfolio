/**
 * Bilingual number formatting helpers.
 *
 * Nepali (Devanagari) script uses its own digit glyphs (०१२३४५६७८९).
 * Achievement counters, stat cards and other numeric UI must therefore be
 * localized at render time — hard-coding Latin digits leaks English numbers
 * into the Nepali UI.
 */

const DEVANAGARI_DIGITS: readonly string[] = [
  "०", "१", "२", "३", "४", "५", "६", "७", "८", "९",
];

/** Map every Latin digit in the input to its Devanagari counterpart. */
export function toNepaliDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => DEVANAGARI_DIGITS[Number(d)]);
}

/**
 * Localize a number-ish stat value for the active language.
 *   formatStat("29+", "np")  → "२९+"
 *   formatStat("50K+", "np") → "५०K+"   (prefer explicit overrides for K/M units)
 */
export function formatStat(value: string | number, lang: "en" | "np"): string {
  return lang === "np" ? toNepaliDigits(value) : String(value);
}

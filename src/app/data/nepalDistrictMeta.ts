/**
 * DISTRICT METADATA — structured classification layers for the Agro-Map.
 *
 * These fields are DERIVED from the verified district profiles in
 * nepalDistricts.ts (belt text → zone; crops/livestock/climate prose →
 * canonical tags), so every classification traces back to the same
 * MoALD SINA district tables / DNPWC / DHM-ICIMOD sourcing documented
 * on the map page. No new factual claims are introduced here.
 *
 *   zone      — dominant farmland belt: Terai (incl. inner-Terai valleys),
 *               Hill (Chure to Mahabharat mid/high hills), Mountain
 *               (Himal & trans-Himalayan high country)
 *   crops     — canonical crop tags grown in that district
 *   livestock — canonical livestock-system tags
 *   climate   — primary climate-pressure tags from the profile text
 */

export type Zone = "Terai" | "Hill" | "Mountain";

export const ZONE_LABELS: Record<Zone, { en: string; np: string; color: string }> = {
  Terai:   { en: "Terai & inner-Terai valleys", np: "तराई र भित्री तराई", color: "#E0A63C" },
  Hill:    { en: "Hills (Chure–Mahabharat)",    np: "पहाड (चुरे–महाभारत)", color: "#5B8DB8" },
  Mountain:{ en: "Mountains & trans-Himalaya",  np: "हिमाल र भोटपार",      color: "#8B8FA8" },
};

export interface TagDef {
  id: string;
  en: string;
  np: string;
}

export const CROP_TAGS: TagDef[] = [
  { id: "Paddy",             en: "Paddy",             np: "धान" },
  { id: "Wheat",             en: "Wheat",             np: "गहुँ" },
  { id: "Maize",             en: "Maize",             np: "मकै" },
  { id: "Millet",            en: "Millet",            np: "कोदो" },
  { id: "Potato",            en: "Potato",            np: "आलु" },
  { id: "Vegetables",        en: "Vegetables",        np: "तरकारी" },
  { id: "Tea",               en: "Tea",               np: "चिया" },
  { id: "Cardamom",          en: "Large cardamom",    np: "ठूलो एलाच" },
  { id: "Coffee",            en: "Coffee",            np: "कफी" },
  { id: "Citrus",            en: "Citrus & junar",    np: "सुन्तला जाति" },
  { id: "Ginger",            en: "Ginger",            np: "अदुवा" },
  { id: "Mustard",           en: "Mustard & oilseed", np: "तोरी" },
  { id: "Sugarcane",         en: "Sugarcane",         np: "उखु" },
  { id: "Pulses",            en: "Pulses & beans",    np: "दालेबाली" },
  { id: "Mango",             en: "Mango",             np: "आँप" },
  { id: "Banana",            en: "Banana",            np: "केरा" },
  { id: "Apple",             en: "Apple & walnut",    np: "स्याउ–ओखर" },
  { id: "Buckwheat & Barley",en: "Buckwheat & barley",np: "फापर–जौ" },
  { id: "Aquaculture",       en: "Fish farming",      np: "मत्स्य व्यवसाय" },
  { id: "Mushroom",          en: "Mushroom",          np: "च्याउ" },
];

export const LIVESTOCK_TAGS: TagDef[] = [
  { id: "Dairy",        en: "Dairy (cattle & buffalo)", np: "डेयरी" },
  { id: "Goats",        en: "Goats",                    np: "बाख्रा" },
  { id: "Poultry",      en: "Poultry",                  np: "कुखुरा" },
  { id: "Yak & Chyangra", en: "Yaks & Chyangra goats",  np: "याक–च्याङ्ग्रा" },
  { id: "Sheep",        en: "Sheep",                    np: "भेडा" },
  { id: "Bees",         en: "Beekeeping",               np: "मौरी" },
  { id: "Local cattle", en: "Rare local cattle breeds", np: "स्थानीय नश्ल" },
];

export const CLIMATE_TAGS: TagDef[] = [
  { id: "Flood",       en: "Riverine flood",     np: "बाढी" },
  { id: "Heat",        en: "Heat & warming",     np: "गर्मी / ताप वृद्धि" },
  { id: "Landslide",   en: "Landslide & erosion",np: "पहिरो / कटान" },
  { id: "Drought",     en: "Drought & dry spells",np: "सुख्खा" },
  { id: "Spring loss", en: "Drying springs",     np: "मुहान सुक्ने" },
  { id: "Glacier melt",en: "Glacier retreat",    np: "हिमनदी पग्लिने" },
  { id: "Hail & frost",en: "Hail & frost",       np: "चिहाँडो / तुसारो" },
];

export const CLIMATE_TAG_COLORS: Record<string, string> = {
  Flood: "#3B82F6",
  Heat: "#DC2626",
  Landslide: "#92400E",
  Drought: "#F59E0B",
  "Spring loss": "#0D9488",
  "Glacier melt": "#22D3EE",
  "Hail & frost": "#94A3B8",
};

export interface DistrictMeta {
  zone: Zone;
  crops: string[];
  livestock: string[];
  climate: string[];
}

export const DISTRICT_META: Record<string, DistrictMeta> = {
  /* ── KOSHI ── */
  Taplejung:      { zone: "Mountain", crops: ["Cardamom", "Potato", "Buckwheat & Barley", "Millet", "Maize"], livestock: ["Yak & Chyangra"], climate: ["Landslide"] },
  Panchthar:      { zone: "Hill", crops: ["Tea", "Cardamom", "Ginger", "Maize", "Millet", "Citrus"], livestock: ["Dairy", "Goats"], climate: ["Landslide"] },
  Ilam:           { zone: "Hill", crops: ["Tea", "Cardamom", "Potato", "Ginger", "Vegetables"], livestock: ["Dairy"], climate: ["Hail & frost"] },
  Jhapa:          { zone: "Terai", crops: ["Paddy", "Tea", "Mustard", "Vegetables"], livestock: ["Dairy", "Poultry"], climate: ["Heat", "Flood"] },
  Morang:         { zone: "Terai", crops: ["Paddy", "Maize", "Mustard", "Potato", "Vegetables"], livestock: ["Poultry", "Dairy"], climate: ["Heat", "Flood"] },
  Sunsari:        { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Vegetables", "Banana", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood"] },
  Dhankuta:       { zone: "Hill", crops: ["Vegetables", "Cardamom", "Citrus"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  Tehrathum:      { zone: "Hill", crops: ["Maize", "Millet", "Cardamom", "Tea", "Potato"], livestock: ["Goats", "Dairy"], climate: ["Hail & frost"] },
  Sankhuwasabha:  { zone: "Mountain", crops: ["Cardamom", "Maize", "Millet", "Potato", "Citrus"], livestock: ["Yak & Chyangra", "Dairy"], climate: ["Landslide"] },
  Bhojpur:        { zone: "Hill", crops: ["Cardamom", "Maize", "Millet"], livestock: ["Goats", "Dairy"], climate: ["Landslide", "Spring loss"] },
  Solukhumbu:     { zone: "Mountain", crops: ["Potato", "Buckwheat & Barley", "Vegetables"], livestock: ["Yak & Chyangra"], climate: ["Glacier melt"] },
  Okhaldhunga:    { zone: "Hill", crops: ["Maize", "Millet", "Potato", "Citrus", "Cardamom", "Vegetables"], livestock: ["Goats", "Dairy"], climate: ["Landslide", "Drought", "Spring loss"] },
  Khotang:        { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Potato", "Cardamom"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  Udayapur:       { zone: "Terai", crops: ["Paddy", "Maize", "Mustard", "Cardamom", "Citrus", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Heat", "Landslide"] },

  /* ── MADHESH ── */
  Saptari:        { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Vegetables", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Siraha:         { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Pulses", "Mango", "Banana", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Dhanusha:       { zone: "Terai", crops: ["Paddy", "Wheat", "Pulses", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Mahottari:      { zone: "Terai", crops: ["Paddy", "Wheat", "Pulses", "Mustard", "Mango", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Flood"] },
  Sarlahi:        { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Vegetables", "Banana", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Rautahat:       { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Pulses", "Mango", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Drought"] },
  Bara:           { zone: "Terai", crops: ["Paddy", "Mango", "Banana", "Mushroom", "Vegetables"], livestock: ["Dairy", "Poultry"], climate: ["Flood", "Heat"] },
  Parsa:          { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Vegetables", "Mushroom", "Banana"], livestock: ["Dairy", "Goats"], climate: ["Heat"] },

  /* ── BAGMATI ── */
  Dolakha:        { zone: "Mountain", crops: ["Potato", "Buckwheat & Barley"], livestock: ["Yak & Chyangra"], climate: ["Landslide", "Hail & frost"] },
  Sindhupalchok:  { zone: "Hill", crops: ["Potato", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Landslide"] },
  Ramechhap:      { zone: "Hill", crops: ["Potato", "Maize", "Millet", "Citrus", "Vegetables"], livestock: ["Goats", "Dairy"], climate: ["Landslide"] },
  Sindhuli:       { zone: "Hill", crops: ["Citrus", "Cardamom", "Paddy"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  Kavrepalanchok: { zone: "Hill", crops: ["Potato", "Millet", "Maize", "Citrus", "Coffee", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Hail & frost", "Drought"] },
  Bhaktapur:      { zone: "Hill", crops: ["Vegetables", "Paddy", "Potato"], livestock: ["Dairy"], climate: ["Heat"] },
  Lalitpur:       { zone: "Hill", crops: ["Vegetables", "Mushroom", "Paddy", "Maize"], livestock: ["Dairy", "Goats"], climate: ["Spring loss"] },
  Kathmandu:      { zone: "Hill", crops: ["Vegetables"], livestock: ["Dairy", "Goats", "Poultry"], climate: ["Heat"] },
  Nuwakot:        { zone: "Hill", crops: ["Cardamom", "Paddy", "Maize", "Citrus", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Landslide"] },
  Rasuwa:         { zone: "Mountain", crops: ["Potato", "Vegetables"], livestock: ["Yak & Chyangra"], climate: ["Glacier melt"] },
  Dhading:        { zone: "Hill", crops: ["Vegetables", "Maize", "Millet", "Paddy"], livestock: ["Goats", "Dairy"], climate: ["Landslide"] },
  Makwanpur:      { zone: "Hill", crops: ["Ginger", "Maize", "Paddy", "Vegetables", "Citrus"], livestock: ["Poultry", "Goats", "Dairy"], climate: ["Flood"] },
  Chitawan:       { zone: "Terai", crops: ["Maize", "Vegetables", "Mushroom"], livestock: ["Poultry"], climate: ["Flood", "Heat"] },

  /* ── GANDAKI ── */
  Manang:         { zone: "Mountain", crops: ["Buckwheat & Barley", "Potato", "Apple", "Vegetables"], livestock: ["Yak & Chyangra"], climate: ["Drought"] },
  Mustang:        { zone: "Mountain", crops: ["Apple", "Buckwheat & Barley", "Mustard", "Vegetables"], livestock: ["Yak & Chyangra", "Sheep"], climate: ["Drought", "Glacier melt"] },
  Myagdi:         { zone: "Hill", crops: ["Citrus", "Maize", "Millet", "Potato", "Cardamom"], livestock: ["Goats", "Dairy", "Sheep"], climate: ["Landslide"] },
  Kaski:          { zone: "Hill", crops: ["Vegetables", "Maize", "Paddy", "Millet", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Landslide"] },
  Lamjung:        { zone: "Hill", crops: ["Paddy", "Maize", "Cardamom", "Citrus", "Banana"], livestock: ["Dairy", "Goats", "Poultry", "Bees"], climate: [] },
  Gorkha:         { zone: "Hill", crops: ["Citrus", "Vegetables", "Potato"], livestock: ["Goats", "Dairy", "Yak & Chyangra"], climate: ["Landslide"] },
  Tanahu:         { zone: "Hill", crops: ["Vegetables", "Banana"], livestock: ["Dairy", "Goats"], climate: ["Flood"] },
  Syangja:        { zone: "Hill", crops: ["Vegetables", "Potato", "Citrus", "Banana", "Maize", "Millet"], livestock: ["Dairy", "Goats"], climate: ["Drought"] },
  Parbat:         { zone: "Hill", crops: ["Citrus", "Potato", "Maize", "Millet", "Paddy", "Coffee", "Banana"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  Baglung:        { zone: "Hill", crops: ["Citrus", "Maize", "Millet", "Potato", "Paddy"], livestock: ["Sheep", "Goats", "Dairy"], climate: ["Hail & frost"] },

  /* ── LUMBINI ── */
  "Nawalparasi East": { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Maize", "Vegetables", "Banana"], livestock: ["Dairy", "Goats", "Poultry"], climate: ["Flood"] },
  Nawalparasi:    { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Sugarcane", "Pulses", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Rupandehi:      { zone: "Terai", crops: ["Paddy", "Vegetables", "Banana"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Kapilbastu:     { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Sugarcane", "Mango", "Vegetables", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood", "Heat"] },
  Palpa:          { zone: "Hill", crops: ["Coffee", "Cardamom", "Citrus"], livestock: ["Dairy", "Goats", "Bees"], climate: ["Heat"] },
  Arghakhanchi:   { zone: "Hill", crops: ["Coffee", "Maize", "Millet", "Paddy"], livestock: ["Goats", "Dairy"], climate: ["Landslide"] },
  Gulmi:          { zone: "Hill", crops: ["Coffee", "Maize", "Millet", "Paddy", "Citrus", "Banana"], livestock: ["Goats", "Dairy", "Bees"], climate: ["Heat"] },
  Pyuthan:        { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Potato", "Mustard", "Citrus"], livestock: ["Dairy", "Goats"], climate: ["Drought"] },
  Rolpa:          { zone: "Hill", crops: ["Coffee", "Pulses", "Maize"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  Dang:           { zone: "Terai", crops: ["Paddy", "Banana", "Vegetables", "Aquaculture"], livestock: ["Goats", "Dairy", "Poultry"], climate: ["Flood", "Heat", "Drought"] },
  Banke:          { zone: "Terai", crops: ["Wheat", "Vegetables", "Banana"], livestock: ["Dairy", "Goats"], climate: ["Heat"] },
  Bardiya:        { zone: "Terai", crops: ["Paddy", "Banana", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Flood"] },

  /* ── KARNALI ── */
  Rukum:          { zone: "Hill", crops: ["Maize", "Millet", "Potato", "Paddy", "Apple", "Coffee"], livestock: ["Goats", "Dairy"], climate: ["Hail & frost"] },
  Dolpa:          { zone: "Mountain", crops: ["Buckwheat & Barley", "Potato"], livestock: ["Yak & Chyangra"], climate: ["Drought", "Glacier melt"] },
  Mugu:           { zone: "Mountain", crops: ["Buckwheat & Barley", "Potato", "Pulses"], livestock: ["Yak & Chyangra", "Sheep", "Goats"], climate: ["Hail & frost"] },
  Humla:          { zone: "Mountain", crops: ["Buckwheat & Barley", "Potato", "Vegetables"], livestock: ["Yak & Chyangra"], climate: ["Heat", "Glacier melt"] },
  Jumla:          { zone: "Mountain", crops: ["Apple", "Paddy", "Buckwheat & Barley", "Pulses", "Potato"], livestock: ["Yak & Chyangra", "Sheep"], climate: ["Hail & frost"] },
  Kalikot:        { zone: "Mountain", crops: ["Apple", "Buckwheat & Barley", "Millet", "Maize", "Potato"], livestock: ["Goats", "Sheep", "Yak & Chyangra"], climate: ["Heat"] },
  Dailekh:        { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Mustard", "Potato", "Citrus", "Banana"], livestock: ["Goats", "Dairy"], climate: ["Drought", "Landslide"] },
  Jajarkot:       { zone: "Hill", crops: ["Millet", "Maize", "Paddy", "Potato", "Citrus"], livestock: ["Goats", "Dairy"], climate: ["Drought", "Landslide"] },
  Surkhet:        { zone: "Hill", crops: ["Paddy", "Maize", "Wheat", "Mustard", "Vegetables"], livestock: ["Goats", "Dairy", "Poultry"], climate: ["Heat", "Drought"] },
  Salyan:         { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Mustard", "Potato", "Citrus", "Banana"], livestock: ["Goats", "Dairy"], climate: ["Drought"] },
  "Rukum West":   { zone: "Hill", crops: ["Maize", "Millet", "Potato", "Paddy", "Apple", "Coffee"], livestock: ["Goats", "Sheep"], climate: ["Hail & frost"] },

  /* ── SUDURPASHCHIM ── */
  Bajura:         { zone: "Mountain", crops: ["Millet", "Buckwheat & Barley", "Maize", "Potato", "Apple"], livestock: ["Goats"], climate: ["Hail & frost"] },
  Bajhang:        { zone: "Mountain", crops: ["Millet", "Buckwheat & Barley", "Maize", "Potato", "Apple"], livestock: ["Sheep", "Goats"], climate: ["Hail & frost"] },
  Darchula:       { zone: "Mountain", crops: ["Buckwheat & Barley", "Millet", "Potato"], livestock: ["Yak & Chyangra"], climate: ["Drought"] },
  Baitadi:        { zone: "Hill", crops: ["Millet", "Maize", "Potato", "Paddy", "Citrus", "Pulses"], livestock: ["Goats", "Dairy"], climate: ["Spring loss"] },
  Dadeldhura:     { zone: "Hill", crops: ["Maize", "Millet", "Potato", "Paddy", "Mustard", "Citrus", "Banana"], livestock: ["Goats"], climate: ["Drought"] },
  Doti:           { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Potato", "Mustard", "Cardamom", "Citrus"], livestock: ["Goats", "Dairy", "Sheep"], climate: ["Spring loss"] },
  Achham:         { zone: "Hill", crops: ["Maize", "Millet", "Paddy", "Mustard", "Potato", "Citrus", "Banana"], livestock: ["Goats", "Dairy", "Local cattle"], climate: ["Drought", "Spring loss"] },
  Kailali:        { zone: "Terai", crops: ["Paddy", "Aquaculture", "Banana", "Vegetables"], livestock: ["Dairy", "Goats"], climate: ["Heat", "Flood"] },
  Kanchanpur:     { zone: "Terai", crops: ["Paddy", "Wheat", "Mustard", "Sugarcane", "Vegetables", "Aquaculture"], livestock: ["Dairy", "Goats"], climate: ["Heat", "Flood"] },
};

const EMPTY_META: DistrictMeta = { zone: "Hill", crops: [], livestock: [], climate: [] };

export function metaFor(name: string): DistrictMeta {
  return DISTRICT_META[name] ?? EMPTY_META;
}

/** Districts carrying a given tag, for the spotlight layers. */
export function districtsWithTag(
  tag: string,
  kind: "crops" | "livestock" | "climate",
): string[] {
  const out: string[] = [];
  for (const [name, m] of Object.entries(DISTRICT_META)) {
    if (m[kind].includes(tag)) out.push(name);
  }
  return out;
}

export function tagLabel(id: string, tags: TagDef[]): string {
  return tags.find((t) => t.id === id)?.id ?? id;
}

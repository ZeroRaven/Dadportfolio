import type { KBArticle, KBCategory } from "./types";
import { animalHealthArticles } from "./animalHealth";
import { cattleArticles } from "./cattle";
import { goatArticles } from "./goats";
import { poultryArticles } from "./poultry";
import { cropArticles } from "./crops";
import { fodderArticles } from "./fodder";
import { climateArticles } from "./climate";
import { managementArticles } from "./management";
import { moreArticles } from "./more";
import { extraArticles } from "./extra";
import { ENRICH } from "./enrich";
import { CATEGORY_IMAGES, ARTICLE_IMAGES } from "./images";

/** Category registry — order drives the category rail. */
export const kbCategories: KBCategory[] = [
  {
    id: "animal-health",
    title: { en: "Animal Health", np: "पशु स्वास्थ्य" },
    blurb: {
      en: "Vaccination schedules, early disease signs, biosecurity",
      np: "खोप तालिका, रोगका प्रारम्भिक संकेत, जैविक सुरक्षा",
    },
  },
  {
    id: "cattle-buffalo",
    title: { en: "Cattle & Buffalo", np: "गाईभैंसी पालन" },
    blurb: {
      en: "Feeding, milking hygiene, calf care for dairy herds",
      np: "दुग्ध बथानको आहार, दुहुने सरसफाइ, बच्चा हेरचाह",
    },
  },
  {
    id: "goat-farming",
    title: { en: "Goat Farming", np: "बाख्रा पालन" },
    blurb: {
      en: "Breeds of Nepal, housing, health calendar, marketing",
      np: "नेपालका जात, गोठ, स्वास्थ्य पात्रो, बजार",
    },
  },
  {
    id: "poultry",
    title: { en: "Poultry", np: "कुखुरा पालन" },
    blurb: {
      en: "Ranikhet vaccination, broiler vs layer, brooding, hatchery",
      np: "रानीखेता खोप, ब्रोइलर-लेयर, ब्रुडिङ, ह्याचरी",
    },
  },
  {
    id: "crops",
    title: { en: "Crop Production", np: "बाली उत्पादन" },
    blurb: {
      en: "Rice, maize, wheat, coffee, apples — seasons by belt",
      np: "धान, मकै, गहुँ, कफी, स्याउ — भेगअनुसार मौसुम",
    },
  },
  {
    id: "fodder",
    title: { en: "Fodder & Feed", np: "चारा तथा आहार" },
    blurb: {
      en: "Fodder trees & grasses, silage, hay, feeding maths",
      np: "चारा विरुवा-घाँस, सिलेज, हे, आहारको गणित",
    },
  },
  {
    id: "climate",
    title: { en: "Climate Adaptation", np: "जलवायु अनुकूलन" },
    blurb: {
      en: "Warming data, heat stress, springs, climate-smart practice",
      np: "तापक्रम तथ्याङ्क, गर्मी तनाव, मुहान, स्मार्ट अभ्यास",
    },
  },
  {
    id: "farm-management",
    title: { en: "Farm Management", np: "फार्म व्यवस्थापन" },
    blurb: {
      en: "Records, pricing, cooperatives, beekeeping, selling well",
      np: "अभिलेख, मूल्य, सहकारी, मौरीपालन, राम्रो बिक्री",
    },
  },
  {
    id: "other-livestock",
    title: { en: "Pigs, Fish & More", np: "सुँगुर, माछा लगायत" },
    blurb: {
      en: "Pig systems, carp polyculture ponds, diversifying the farm",
      np: "सुँगुर पालन, कार्प पोखरी, फार्मको विविधीकरण",
    },
  },
];

/**
 * All articles merged and enriched:
 *  · images — per-article override, else the category default (every
 *    article gets a hero image)
 *  · facts & charts — retro-fitted from ENRICH onto the original articles,
 *    defined natively on the new batch
 */
const applyImagesAndEnrich = (articles: KBArticle[]): KBArticle[] =>
  articles.map((a) => {
    const image = a.image ?? ARTICLE_IMAGES[a.id] ?? CATEGORY_IMAGES[a.categoryId];
    const extra = ENRICH[a.id];
    return {
      ...a,
      image,
      imageAlt: a.imageAlt ?? a.title,
      facts: a.facts ?? extra?.facts,
      chart: a.chart ?? extra?.chart,
    };
  });

const raw: KBArticle[] = [
  ...animalHealthArticles,
  ...cattleArticles,
  ...goatArticles,
  ...poultryArticles,
  ...cropArticles,
  ...fodderArticles,
  ...climateArticles,
  ...managementArticles,
  ...moreArticles,
  ...extraArticles,
];

export const kbArticles: KBArticle[] = applyImagesAndEnrich(raw);

export const kbArticleCount = kbArticles.length;

import type { KBArticle, KBCategory } from "./types";
import { animalHealthArticles } from "./animalHealth";
import { cattleArticles } from "./cattle";
import { goatArticles } from "./goats";
import { poultryArticles } from "./poultry";
import { cropArticles } from "./crops";
import { fodderArticles } from "./fodder";
import { climateArticles } from "./climate";
import { managementArticles } from "./management";

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
      np: "दुग्ध बथानको आहार, दुहुने सरसफाइ, बच्छा हेरचाह",
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
      en: "Ranikhet vaccination, broiler vs layer, brooding",
      np: "रानीखेता खोप, ब्रोइलर-लेयर, ब्रुडिङ",
    },
  },
  {
    id: "crops",
    title: { en: "Crop Production", np: "बाली उत्पादन" },
    blurb: {
      en: "Rice, maize, wheat, millet — seasons by ecological belt",
      np: "धान, मकै, गहुँ, कोदो — भेगअनुसार मौसुम",
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
      en: "Warming data, heat stress, climate-smart practices",
      np: "तापक्रम तथ्याङ्क, गर्मी तनाव, स्मार्ट अभ्यास",
    },
  },
  {
    id: "farm-management",
    title: { en: "Farm Management", np: "फार्म व्यवस्थापन" },
    blurb: {
      en: "Records, pricing, cooperatives, selling well",
      np: "अभिलेख, मूल्य, सहकारी, राम्रो बिक्री",
    },
  },
];

/** All articles, merged. */
export const kbArticles: KBArticle[] = [
  ...animalHealthArticles,
  ...cattleArticles,
  ...goatArticles,
  ...poultryArticles,
  ...cropArticles,
  ...fodderArticles,
  ...climateArticles,
  ...managementArticles,
];

export const kbArticleCount = kbArticles.length;

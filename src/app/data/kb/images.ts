/**
 * KB IMAGE REGISTRY — every article gets a hero image.
 *
 * Default mapping is per-category; articles can override via the
 * `image` field (see more.ts for examples). All assets are local
 * (src/imports) — no third-party requests.
 */
import imgProfessional from "@/imports/img-professional.webp";
import imgCattle from "@/imports/img-cattle.webp";
import imgGoats from "@/imports/img-goats.webp";
import imgPoultry from "@/imports/img-poultry.webp";
import imgCrops from "@/imports/img-crops.webp";
import imgTunnel from "@/imports/img-tunnel.webp";
import imgTerraces from "@/imports/img-terraces.webp";
import imgKathmandu from "@/imports/img-kathmandu.webp";
import imgRural from "@/imports/img-rural.webp";

export const CATEGORY_IMAGES: Record<string, string> = {
  "animal-health": imgProfessional,
  "cattle-buffalo": imgCattle,
  "goat-farming": imgGoats,
  poultry: imgPoultry,
  crops: imgCrops,
  fodder: imgTerraces,
  climate: imgKathmandu,
  "farm-management": imgRural,
  "other-livestock": imgRural,
};

/** Per-article overrides (specific imagery beats the category default). */
export const ARTICLE_IMAGES: Record<string, string> = {
  "offseason-vegetables": imgTunnel,
};

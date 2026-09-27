import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { NepalMap, NepalMapLegend } from "nepal-district-map";
import type { Province } from "nepal-district-map";
import {
  Map as MapIcon, Info, Landmark, Users, Layers,
  Wheat, HeartPulse, CloudSun, Sparkles, ChevronRight, X, Leaf,
  Building2, ListFilter, ArrowLeftRight, Table2, Columns3, MousePointerClick, Search,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { PROVINCES, NATIONAL_STATS, provinceById } from "../data/nepalAgro";
import {
  DISTRICTS, PROVINCES_WITH_DISTRICTS, BELT_LEGEND, districtByName,
  type DistrictProfile,
} from "../data/nepalDistricts";
import {
  metaFor, districtsWithTag, ZONE_LABELS,
  CROP_TAGS, LIVESTOCK_TAGS, CLIMATE_TAGS, CLIMATE_TAG_COLORS,
} from "../data/nepalDistrictMeta";
import { CompareView } from "../components/agro/CompareView";
import { DataExplorer } from "../components/agro/DataExplorer";
import { ResultCardActions } from "../components/tools/ResultActions";
import { toNepaliDigits } from "../i18n/format";

/**
 * NEPAL AGRO-MAP v3 — a real analytical map, not just a factsheet picker.
 *
 * THREE WORKSPACES
 *   · Map      — thematic layers: provinces · ecological belts · crop
 *                spotlight · livestock spotlight · climate-pressure map
 *   · Compare  — any two districts side by side
 *   · Data     — all 77 districts in a searchable/sortable table + CSV export
 *
 * Every layer is coloured per-district (data.color) on the accurate
 * nepal-district-map geometry (Limpiyadhura–Kalapani–Lipulekh correct).
 * Zone/tag classifications are derived from the verified district
 * profiles themselves (MoALD SINA district tables, DNPWC network,
 * DHM/ICIMOD analyses) — see the sources block at page bottom.
 */

const PROVINCE_COLORS: Record<Province, { fill: string; stroke: string }> = {
  Koshi:        { fill: "#4C7FB5", stroke: "#3A648E" },
  Madhesh:      { fill: "#E3A72F", stroke: "#B58521" },
  Bagmati:      { fill: "#43A06B", stroke: "#348055" },
  Gandaki:      { fill: "#8A67A8", stroke: "#6E5188" },
  Lumbini:      { fill: "#C86B5A", stroke: "#A45345" },
  Karnali:      { fill: "#9A7B4F", stroke: "#7C623C" },
  Sudurpashchim:{ fill: "#2FA5A0", stroke: "#24827E" },
};

/** Province-level ecology (protected-area network summary). */
const PROVINCE_ECOLOGY: Record<string, { en: string; np: string }> = {
  Koshi: {
    en: "The Everest–Makalu–Kangchenjunga triple crown: Sagarmatha NP (UNESCO), Makalu Barun NP, Kangchenjunga CA, plus Koshi Tappu Wildlife Reserve (RAMSAR) — from snow leopards and red panda down to the last wild arna buffalo and 480+ bird species.",
    np: "सगरमाथा–मकालु–काञ्चनजुङ्गा त्रिशिखर: सगरमाथा निकुञ्ज (युनेस्को), मकालु बरुण निकुञ्ज, काञ्चनजुङ्गा संरक्षण क्षेत्र र कोशी टप्पु आरक्ष (रामसार) — हिउँ चितुवा र रातो पाण्डादेखि अन्तिम जङ्गी अर्ना र ४८०+ चरासम्म।",
  },
  Madhesh: {
    en: "Parsa National Park's Sal forests meet the Koshi Tappu buffer: wild elephants, tigers and the wintering waterfowl spectacle; sarus cranes nest in the paddy stubble of the Lumbini-border farmland belt.",
    np: "पर्सा राष्ट्रिय निकुञ्जको साल वन कोशी टप्पु अगाडि-भागसँग जोडिन्छ: जङ्गी हात्ती, बाघ र जाडो बिताउन आउने जलचरा; लुम्बिनी-नजिकको खेतबारीमा सारस क्रेनले दाँरमै गुँड बनाउँछन्।",
  },
  Bagmati: {
    en: "Chitwan NP (UNESCO — rhino and tiger flagship), Langtang NP, Shivapuri Nagarjun NP, Gaurishankar CA and the Beeshazari Tal RAMSAR wetland — Nepal's densest cluster of parks wrapped around the valley's farm belt.",
    np: "चितवन निकुञ्ज (युनेस्को — गैँडा-बाघ फ्ल्यागसिप), लाङटाङ निकुञ्ज, शिवपुरी नगरजुन निकुञ्ज, गौरीशंकर संरक्षण क्षेत्र र बिसहजारी ताल रामसार — उपत्यकाको खेती भेगलाई घेरेर बसेको नेपालको सबैभन्दा घना निकुञ्ज जम्मा।",
  },
  Gandaki: {
    en: "Annapurna Conservation Area (Nepal's first and largest CA), Manaslu CA, Dhorpatan Hunting Reserve's approaches and the nine-lake Pokhara Valley RAMSAR cluster — snow leopard to lake fisheries in one province.",
    np: "अन्नपूर्ण संरक्षण क्षेत्र (नेपालको पहिलो र सबैभन्दा ठूलो), मनास्लु संरक्षण क्षेत्र, धोरपटान शिकार आरक्षको बाटो र पोखरा उपत्यकाको नौ-ताल रामसार समूह — एउटै प्रदेशमा हिउँ चितुवादेखि ताल मत्स्यसम्म।",
  },
  Lumbini: {
    en: "Banke NP and Bardia NP's eastern arc (tigers, elephants, blackbuck), Dhorpatan's blue-sheep reserve edge, and the sacred Lumbini garden landscape programme where cranes and rice paddies share ground.",
    np: "बाँके निकुञ्ज र बार्दिया निकुञ्जको पूर्वी धनुष (बाघ, हात्ती, कालो वर्गाथरी), धोरपटानको नाउर आरक्ष किनार, र पवित्र लुम्बिनी बगैंचा परिदृश्य कार्यक्रम जहाँ सारस र धानखेत सँगै बस्छन्।",
  },
  Karnali: {
    en: "Shey Phoksundo NP (Nepal's largest — snow leopard, deepest lake), Rara NP (largest lake in the smallest park) and the Dhorpatan Hunting Reserve core: the wild high country that defines Karnali.",
    np: "शे फोक्सुण्डो निकुञ्ज (नेपालको सबैभन्दा ठूलो — हिउँ चितुवा, सबैभन्दा गहिरो ताल), रारा निकुञ्ज (सानो निकुञ्जमा सबैभन्दा ठूलो ताल) र धोरपटान शिकार आरक्षको मुख्य भाग: कर्णालीको जङ्गली उच्च देश।",
  },
  Sudurpashchim: {
    en: "Khaptad NP (the five-district meadow plateau), Shuklaphanta NP (world's largest swamp-deer herd), Api Nampa CA and the 13-lake Ghodaghodi RAMSAR complex — the far-west's quiet wildlife wealth.",
    np: "खप्तड निकुञ्ज (पाँच जिल्लाको मेदाँ), शुक्लाफाँटा निकुञ्ज (विश्वकै ठूलो बारासिङ्गा बथान), अपि नाम्पा संरक्षण क्षेत्र र १३-ताल घोडाघोडी रामसार समूह — सुदूरपश्चिमको शान्त वन्यजन्तु धन।",
  },
};

type PanelTab = "overview" | "crops" | "livestock" | "ecology" | "climate";
type LayerId = "province" | "zone" | "crops" | "livestock" | "climate";
type ViewId = "map" | "compare" | "data";

const TAB_LABELS: Record<PanelTab, { en: string; np: string }> = {
  overview:  { en: "Overview",   np: "एक नजर" },
  crops:     { en: "Crops",      np: "बाली" },
  livestock: { en: "Livestock",  np: "पशुपालन" },
  ecology:   { en: "Ecology",    np: "वन्यजन्तु" },
  climate:   { en: "Climate",    np: "जलवायु" },
};

const TAB_ICONS: Record<PanelTab, typeof Wheat> = {
  overview: Landmark, crops: Wheat, livestock: HeartPulse, ecology: Leaf, climate: CloudSun,
};

const NEUTRAL_FILL = "#E2E8F0";

function BulletList({ items, dot = "#D4AF37" }: { items: string[]; dot?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((c, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} aria-hidden="true" />
          <span>{c}</span>
        </li>
      ))}
    </ul>
  );
}

function MiniChips({ ids, kind, np }: { ids: string[]; kind: "crops" | "livestock" | "climate"; np: boolean }) {
  if (!ids.length) return null;
  const defs = kind === "crops" ? CROP_TAGS : kind === "livestock" ? LIVESTOCK_TAGS : CLIMATE_TAGS;
  const palette = kind === "climate" ? CLIMATE_TAG_COLORS : null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {ids.map((id) => {
        const def = defs.find((t) => t.id === id);
        const color = palette?.[id];
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
            style={
              color
                ? { backgroundColor: `${color}1A`, borderColor: `${color}66`, color: "#0A2540" }
                : { backgroundColor: "rgba(212,175,55,0.10)", borderColor: "rgba(212,175,55,0.35)", color: "#0A2540" }
            }
          >
            {color && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />}
            {np ? def?.np : def?.en}
          </span>
        );
      })}
    </div>
  );
}

export function AgroMap() {
  const { language } = useLanguage();
  const np = language === "np";
  // Deep-linkable state (?view=map&district=Ilam&compare=Ilam,Jumla): the
  // workspace, open district and comparison are all bookmarkable/shareable.
  const [searchParams, setSearchParams] = useSearchParams();
  const initView = (searchParams.get("view") as ViewId) || "map";
  const initDistrict = searchParams.get("district");
  const [compareAInit, compareBInit] = (() => {
    const c = searchParams.get("compare");
    if (!c) return [null, null] as const;
    const [a, b] = c.split(",");
    return [a || null, b || null] as const;
  })();
  const [view, setView] = useState<ViewId>(initView);
  const [layer, setLayer] = useState<LayerId>("province");
  const [spotTag, setSpotTag] = useState<string | null>(null);
  const [district, setDistrict] = useState<DistrictProfile | null>(
    () => (initDistrict ? districtByName(initDistrict) ?? null : null)
  );
  const [province, setProvince] = useState<Province | null>(null);
  const [tab, setTab] = useState<PanelTab>("overview");
  const [compareA, setCompareA] = useState<string | null>(compareAInit);
  const [compareB, setCompareB] = useState<string | null>(compareBInit);
  // Live district search — highlights matches on the map as you type.
  const [mapQuery, setMapQuery] = useState("");

  // Keep the URL in sync (replace, not push — selection isn't history).
  useEffect(() => {
    const next = new URLSearchParams();
    if (view !== "map") next.set("view", view);
    if (district) next.set("district", district.name);
    if (compareA || compareB) {
      next.set("compare", [compareA ?? "", compareB ?? ""].filter(Boolean).join(","));
    }
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, district, compareA, compareB]);

  const searchMatches = useMemo(() => {
    const q = mapQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return DISTRICTS.filter(
      (d) => d.name.toLowerCase().includes(q) || d.np.includes(mapQuery.trim())
    ).map((d) => d.name);
  }, [mapQuery]);

  const fmtN = (n: number) => (np ? toNepaliDigits(String(n)) : String(n));

  const provinceOf = (name: string): Province | undefined => {
    for (const p of PROVINCES_WITH_DISTRICTS) {
      if (p.districts.some((d) => d.name === name)) return p.id as Province;
    }
    return undefined;
  };

  /* ── Per-district fills + tooltips for the active layer ─────────────── */
  const layerData = useMemo(() => {
    const out: Record<string, { color?: string; tooltip: string }> = {};
    for (const d of DISTRICTS) {
      const meta = metaFor(d.name);
      if (layer === "zone") {
        out[d.name] = { color: ZONE_LABELS[meta.zone].color, tooltip: np ? ZONE_LABELS[meta.zone].np : ZONE_LABELS[meta.zone].en };
      } else if (layer === "climate") {
        const first = meta.climate[0];
        const color = first ? CLIMATE_TAG_COLORS[first] : "#CBD5E1";
        const label = meta.climate.length
          ? meta.climate.map((c) => (np ? CLIMATE_TAGS.find((t) => t.id === c)?.np : c)).join(", ")
          : np ? "प्रमुख दबाब तोकिएको छैन" : "no dominant pressure flagged";
        out[d.name] = { color, tooltip: label };
      } else if (layer === "crops" || layer === "livestock") {
        const has = spotTag && meta[layer].includes(spotTag);
        out[d.name] = {
          color: spotTag ? (has ? "#D4AF37" : NEUTRAL_FILL) : undefined,
          tooltip: spotTag
            ? has
              ? `${np ? "✓ " : "✓ "} ${spotTag}`
              : np ? "—" : "—"
            : (np ? d.np : d.name),
        };
      } else {
        out[d.name] = { tooltip: np ? d.np : d.name };
      }
    }
    return out;
  }, [layer, spotTag, np]);

  const spotMatches = useMemo(() => {
    if (!spotTag || (layer !== "crops" && layer !== "livestock")) return null;
    return districtsWithTag(spotTag, layer);
  }, [spotTag, layer]);

  const spotDefs = layer === "crops" ? CROP_TAGS : layer === "livestock" ? LIVESTOCK_TAGS : [];

  const profile = province ? provinceById(province) : null;
  const districtActive = view === "map" && !!district;
  const provinceActive = view === "map" && layer === "province" && !!profile;

  const selectedForDim: Province | null = districtActive
    ? provinceOf(district!.name) ?? null
    : provinceActive
    ? province
    : null;

  const pickDistrict = (name: string) => {
    const d = districtByName(name);
    if (!d) return;
    setView("map");
    setDistrict((prev) => (prev?.name === name ? null : d));
    setProvince(null);
    setTab("overview");
  };

  const pickProvince = (p: Province) => {
    setLayer("province");
    setView("map");
    setProvince((prev) => (prev === p ? null : p));
    setDistrict(null);
    setTab("overview");
  };

  const reset = () => {
    setDistrict(null);
    setProvince(null);
    setTab("overview");
  };

  const hasSelection = (districtActive || provinceActive) as boolean;

  /* Panel content per tab */
  const renderTabContent = () => {
    if (districtActive && district) {
      const d = district;
      const meta = metaFor(d.name);
      switch (tab) {
        case "overview":
          return (
            <>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex items-start gap-2">
                <Layers size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                <span>{np ? d.belt.np : d.belt.en}</span>
              </p>
              <div className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-4 py-3 mb-4">
                <p className="flex items-start gap-2 text-sm font-semibold text-[#0A2540] leading-relaxed">
                  <Sparkles size={14} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                  {np ? d.knownFor.np : d.knownFor.en}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 size={14} className="text-[#B8941F]" />
                  <span className="font-medium">{np ? "प्रशासनिक हेडक्वार्टर" : "Headquarters"}:</span>
                  <span>{np ? d.hq.np : d.hq.en}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold" style={{ borderColor: `${ZONE_LABELS[meta.zone].color}66`, backgroundColor: `${ZONE_LABELS[meta.zone].color}1A`, color: "#0A2540" }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ZONE_LABELS[meta.zone].color }} aria-hidden="true" />
                  {np ? ZONE_LABELS[meta.zone].np : ZONE_LABELS[meta.zone].en}
                </span>
              </div>
              <MiniChips ids={meta.crops} kind="crops" np={np} />
            </>
          );
        case "crops":
          return (
            <>
              <BulletList items={np ? d.crops.np : d.crops.en} />
              <MiniChips ids={meta.crops} kind="crops" np={np} />
            </>
          );
        case "livestock":
          return (
            <>
              <BulletList items={np ? d.livestock.np : d.livestock.en} dot="#43A06B" />
              <MiniChips ids={meta.livestock} kind="livestock" np={np} />
            </>
          );
        case "ecology":
          return (
            <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
              {np ? d.ecology.np : d.ecology.en}
            </p>
          );
        case "climate":
          return (
            <>
              <p className="text-sm text-gray-700 leading-relaxed bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                {np ? d.climate.np : d.climate.en}
              </p>
              <MiniChips ids={meta.climate} kind="climate" np={np} />
            </>
          );
      }
    }
    if (provinceActive && profile) {
      switch (tab) {
        case "overview":
          return (
            <>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex items-start gap-2">
                <MapIcon size={15} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                <span>{np ? profile.belts.np : profile.belts.en}</span>
              </p>
              <div className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-4 py-3 mb-4">
                <p className="flex items-start gap-2 text-sm font-semibold text-[#0A2540] leading-relaxed">
                  <Sparkles size={14} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
                  {np ? profile.stat.np : profile.stat.en}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <Landmark size={14} className="text-[#B8941F]" />
                  {np ? profile.capital.np : profile.capital.en}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers size={14} className="text-[#B8941F]" />
                  {fmtN(profile.districts)} {np ? "जिल्ला" : "districts"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} className="text-[#B8941F]" />
                  {profile.population}
                </span>
              </div>
            </>
          );
        case "crops":
          return <BulletList items={np ? profile.crops.np : profile.crops.en} />;
        case "livestock":
          return <BulletList items={np ? profile.livestock.np : profile.livestock.en} dot="#43A06B" />;
        case "ecology":
          return (
            <p className="text-sm text-gray-700 leading-relaxed bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3">
              {np ? PROVINCE_ECOLOGY[profile.id].np : PROVINCE_ECOLOGY[profile.id].en}
            </p>
          );
        case "climate":
          return (
            <p className="text-sm text-gray-700 leading-relaxed bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {np ? profile.climate.np : profile.climate.en}
            </p>
          );
      }
    }
    return null;
  };

  const panelTitle = districtActive
    ? (np ? district!.np : district!.name)
    : profile
    ? `${np ? profile.npName : profile.id} ${np ? "प्रदेश" : "Province"}`
    : "";

  const panelSubtitle = districtActive
    ? (np
      ? `${provinceOf(district!.name) ? PROVINCES_WITH_DISTRICTS.find((p) => p.id === provinceOf(district!.name))!.npName + " प्रदेश · जिल्ला प्रोफाइल" : "जिल्ला प्रोफाइल"}`
      : `${provinceOf(district!.name) ?? ""} Province · District factsheet`)
    : profile
    ? (np ? "प्रदेश प्रोफाइल" : "Province profile")
    : "";

  /* Layer rail definition */
  const layers: { id: LayerId; en: string; np: string; icon: typeof MapIcon }[] = [
    { id: "province", en: "Provinces", np: "प्रदेश", icon: Landmark },
    { id: "zone", en: "Ecological belts", np: "भेग", icon: Layers },
    { id: "crops", en: "Crop spotlight", np: "बाली", icon: Wheat },
    { id: "livestock", en: "Livestock spotlight", np: "पशुपालन", icon: HeartPulse },
    { id: "climate", en: "Climate pressure", np: "जलवायु दबाब", icon: CloudSun },
  ];

  return (
    <>
      <SEO
        title="Nepal Agriculture Map — 77 District Factsheets: Crops, Livestock, Ecology & Climate"
        description="An interactive analytical map of Nepal's 77 districts and 7 provinces — thematic layers for ecological belts, crop and livestock spotlights and climate pressure, district-vs-district comparison, a searchable 77-district data table with CSV export, and verified factsheets from MoALD, DNPWC, USDA, DHM and peer-reviewed research."
        keywords="Nepal agriculture map, district wise agriculture Nepal, 77 districts crops livestock, Nepal district factsheet, climate change Nepal districts, flora fauna Nepal provinces, protected areas Nepal map, paddy wheat maize production Nepal, crop spotlight map, Nepal district comparison, नेपाल कृषि नक्सा, जिल्लागत कृषि, जलवायु परिवर्तन"
        path="/agromap"
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* ── Header band ─────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white pt-28 pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-[#D4AF37]/30"
            >
              <MapIcon className="text-[#D4AF37]" size={16} />
              <span className="text-sm font-medium">
                {np ? "७७ जिल्ला · ७ प्रदेश · प्रमाणित तथ्याङ्क" : "77 districts · 7 provinces · verified data"}
              </span>
            </motion.div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {np ? "नेपाल कृषि नक्सा" : "Nepal Agriculture Map"}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
              {np
                ? "अब नक्सा विश्लेषणात्मक बन्यो — भेग, बाली, पशुपालन र जलवायु दबाबका थर (लेयर) बदल्नुहोस्; दुई जिल्ला तुलना गर्नुहोस्; वा पूरै ७७ जिल्लाको तथ्याङ्क तालिकाबाट CSV नै डाउनलोड गर्नुहोस्। तथ्याङ्क MoALD, DNPWC, USDA, DHM र प्रकाशित अनुसन्धानबाट।"
                : "The map is now analytical — switch thematic layers (belts, crops, livestock, climate pressure), compare any two districts side by side, or export the full 77-district dataset as CSV. Figures sourced from MoALD, DNPWC, USDA, DHM and published research."}
            </p>

            {/* Workspace switcher */}
            <div className="mt-6 inline-flex rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-1" role="tablist" aria-label={np ? "कार्यक्षेत्र" : "Workspace"}>
              {([
                { id: "map", en: "Map & layers", np: "नक्सा", icon: MapIcon },
                { id: "compare", en: "Compare districts", np: "तुलना", icon: ArrowLeftRight },
                { id: "data", en: "Data explorer", np: "तथ्याङ्क", icon: Table2 },
              ] as const).map((v) => {
                const Icon = v.icon;
                const active = view === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setView(v.id)}
                    className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      active ? "bg-[#D4AF37] text-[#0A2540] shadow" : "text-gray-200 hover:text-white"
                    }`}
                  >
                    <Icon size={15} aria-hidden="true" />
                    {np ? v.np : v.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── COMPARE workspace ───────────────────────────────────────── */}
        {view === "compare" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8941F] flex items-center justify-center flex-shrink-0">
                  <Columns3 size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] leading-tight">
                    {np ? "जिल्ला तुलना" : "District comparison"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {np ? "दुई जिल्लाको पूर्ण प्रोफाइल अगाडि-पछाडि राख्नुहोस्" : "Two full district profiles, side by side"}
                  </p>
                </div>
              </div>
              <CompareView a={compareA} b={compareB} setA={setCompareA} setB={setCompareB} np={np} />
            </motion.div>
          </div>
        )}

        {/* ── DATA workspace ──────────────────────────────────────────── */}
        {view === "data" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-5 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#B8941F] flex items-center justify-center flex-shrink-0">
                  <Table2 size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0A2540] leading-tight">
                    {np ? "तथ्याङ्क अन्वेषक" : "Data explorer"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {np ? "खोज्नुहोस्, क्रमबद्ध गर्नुहोस्, नक्सामा खोल्नुहोस् वा CSV डाउनलोड गर्नुहोस्" : "Search, sort, open on the map, or download as CSV"}
                  </p>
                </div>
              </div>
              <DataExplorer np={np} onPick={pickDistrict} />
            </motion.div>
          </div>
        )}

        {/* ── MAP workspace ───────────────────────────────────────────── */}
        {view === "map" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Map card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                {/* Thematic layer rail */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {layers.map((l) => {
                    const Icon = l.icon;
                    const active = layer === l.id;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => { setLayer(l.id); setSpotTag(null); }}
                        aria-pressed={active}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border-2 transition-all ${
                          active
                            ? "border-[#0A2540] bg-[#0A2540] text-white shadow"
                            : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                        }`}
                      >
                        <Icon size={13} aria-hidden="true" />
                        {np ? l.np : l.en}
                      </button>
                    );
                  })}
                  {hasSelection && (
                    <button
                      type="button"
                      onClick={reset}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#0A2540] transition-colors"
                    >
                      <X size={13} />
                      {np ? "रिसेट" : "Reset"}
                    </button>
                  )}
                </div>

                {/* Spotlight tag chips (crops / livestock) */}
                {(layer === "crops" || layer === "livestock") && (
                  <div className="mb-4 -mx-1 px-1 overflow-x-auto pb-1">
                    <div className="flex items-center gap-1.5 min-w-max">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex-shrink-0 pr-1">
                        {np ? "कुन बाली/पशु कहाँ?" : "Where?"}
                      </span>
                      {spotDefs.map((t) => {
                        const count = districtsWithTag(t.id, layer).length;
                        const active = spotTag === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSpotTag(active ? null : t.id)}
                            aria-pressed={active}
                            title={`${count} ${np ? "जिल्ला" : "districts"}`}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition-all ${
                              active
                                ? "border-[#B8941F] bg-[#D4AF37] text-[#0A2540] shadow"
                                : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                            }`}
                          >
                            {np ? t.np : t.en}
                            <span className={`text-[10px] tabular-nums ${active ? "text-[#0A2540]/70" : "text-gray-400"}`}>
                              {fmtN(count)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Climate legend (climate layer) */}
                {layer === "climate" && (
                  <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A2540]/60 mb-2">
                      {np ? "मुख्य जलवायु दबाब (रङ अनुसार)" : "Dominant climate pressure (by colour)"}
                    </p>
                    <NepalMapLegend
                      mode="custom"
                      direction="horizontal"
                      fontSize={11}
                      labelColor="#475569"
                      items={CLIMATE_TAGS.map((t) => ({ color: CLIMATE_TAG_COLORS[t.id], label: np ? t.np : t.en }))}
                    />
                  </div>
                )}

                {/* Live district search — highlights matches on the map */}
                <div className="mb-4">
                  <div className="relative">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8941F]" aria-hidden="true" />
                    <input
                      type="search"
                      value={mapQuery}
                      onChange={(e) => setMapQuery(e.target.value)}
                      placeholder={np ? "जिल्ला खोज्नुहोस् (इलाम / Ilam…)" : "Find a district (Ilam / इलाम…)"}
                      aria-label={np ? "नक्सामा जिल्ला खोज्नुहोस्" : "Search districts on the map"}
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-sm font-medium text-[#0A2540] focus:border-[#D4AF37] outline-none transition-colors"
                    />
                  </div>
                  {mapQuery.trim().length >= 2 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {searchMatches.length === 0 ? (
                        <p className="text-xs text-gray-400">
                          {np ? "कुनै जिल्ला मेल खाँदैन।" : "No district matches."}
                        </p>
                      ) : (
                        <>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            {fmtN(searchMatches.length)} {np ? "मेल" : "match"}:
                          </span>
                          {searchMatches.slice(0, 10).map((name) => {
                            const d = districtByName(name)!;
                            return (
                              <button
                                key={name}
                                type="button"
                                onClick={() => {
                                  pickDistrict(name);
                                  setMapQuery("");
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border-2 border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400 transition-colors"
                              >
                                {np ? d.np : name}
                              </button>
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
                </div>

                <NepalMap
                  data={layerData}
                  colorMode={layer === "province" ? "province" : "flat"}
                  baseColor={NEUTRAL_FILL}
                  provinceColors={PROVINCE_COLORS}
                  selectedProvince={layer === "province" ? selectedForDim : null}
                  highlightedDistricts={
                    mapQuery.trim().length >= 2
                      ? searchMatches
                      : districtActive
                        ? [district!.name]
                        : []
                  }
                  highlightColor={mapQuery.trim().length >= 2 ? "#059669" : "#0A2540"}
                  dimOpacity={layer === "province" ? 0.25 : 0.6}
                  hoverColor="#0A2540"
                  strokeColor="#FFFFFF"
                  strokeWidth={0.7}
                  backgroundColor="transparent"
                  maxHeight="620px"
                  ariaLabel={np ? "नेपालको अन्तरक्रियात्मक कृषि नक्सा" : "Interactive agriculture map of Nepal"}
                  renderTooltip={(name, data) => (
                    <div>
                      <strong>{districtByName(name) ? (np ? districtByName(name)!.np : name) : name}</strong>
                      <p style={{ color: "#B8941F", margin: 0, fontSize: 12 }}>
                        {(data as { tooltip?: string })?.tooltip ?? ""}
                      </p>
                      <p style={{ color: "#64748b", margin: 0, fontSize: 11 }}>
                        {np ? "क्लिक गरेर जिल्ला विवरण हेर्नुहोस्" : "click for district factsheet"}
                      </p>
                    </div>
                  )}
                  onDistrictClick={(name) => pickDistrict(name)}
                />

                {/* Layer-specific legend for zone view */}
                {layer === "zone" && (
                  <div className="mt-3">
                    <NepalMapLegend
                      mode="custom"
                      direction="horizontal"
                      fontSize={11}
                      labelColor="#475569"
                      items={(Object.keys(ZONE_LABELS) as (keyof typeof ZONE_LABELS)[]).map((z) => ({
                        color: ZONE_LABELS[z].color,
                        label: np ? ZONE_LABELS[z].np : ZONE_LABELS[z].en,
                      }))}
                    />
                  </div>
                )}

                {/* Spotlight result note */}
                {spotMatches && (
                  <p className="mt-3 text-xs text-gray-500 flex items-center gap-1.5">
                    <MousePointerClick size={13} className="text-[#B8941F]" aria-hidden="true" />
                    {np
                      ? `${spotTag} भएका ${fmtN(spotMatches.length)} जिल्ला सुनौलो रङमा चम्किएका छन् — बाँकी फिक्का।`
                      : `${fmtN(spotMatches.length)} districts carry ${spotTag} — highlighted in gold; the rest are dimmed.`}
                  </p>
                )}

                {/* District quick-select — always available */}
                <label className="block mt-4 mb-1 text-xs font-semibold text-[#0A2540]">
                  <span className="inline-flex items-center gap-1.5">
                    <ListFilter size={13} className="text-[#B8941F]" />
                    {np ? "जिल्ला छान्नुहोस्" : "Pick a district"}
                  </span>
                </label>
                <select
                  value={districtActive ? district!.name : ""}
                  onChange={(e) => e.target.value && pickDistrict(e.target.value)}
                  aria-label={np ? "जिल्ला छान्नुहोस्" : "Select a district"}
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-[#0A2540] focus:border-[#D4AF37] outline-none transition-colors"
                >
                  <option value="">{np ? "— ७७ मध्ये कुनै जिल्ला —" : "— any of the 77 districts —"}</option>
                  {PROVINCES_WITH_DISTRICTS.map((p) => (
                    <optgroup key={p.id} label={`${p.id}${np ? ` · ${p.npName}` : ""}`}>
                      {p.districts.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                          {np ? ` · ${d.np}` : ""}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>

                {/* Province chips — province layer only */}
                {layer === "province" && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {PROVINCES.map((p) => {
                      const active = provinceActive && province === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => pickProvince(p.id)}
                          aria-pressed={!!active}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                            active
                              ? "border-[#0A2540] bg-[#0A2540] text-white shadow-md"
                              : "border-gray-200 bg-white text-gray-600 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: PROVINCE_COLORS[p.id].fill }}
                          />
                          {np ? p.npName : p.id}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Belt legend */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A2540]/60 mb-2">
                    {np ? "पारिस्थितिक भेग" : "Ecological belts"}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {BELT_LEGEND.map((b) => (
                      <span key={b.en} className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                        <span aria-hidden="true" className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                        {np ? b.np : b.en}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Info panel */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="lg:col-span-2"
              >
                <div className="lg:sticky lg:top-24">
                  <AnimatePresence mode="wait">
                    {hasSelection ? (
                      <motion.div
                        key={districtActive ? district!.name : province}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.22 }}
                        className="rounded-2xl shadow-xl overflow-hidden bg-white"
                      >
                        {/* Panel header */}
                        <div
                          className="px-6 py-5 text-white"
                          style={{
                            background: `linear-gradient(135deg, ${
                              PROVINCE_COLORS[(districtActive ? provinceOf(district!.name) : province)!].fill
                            }, ${
                              PROVINCE_COLORS[(districtActive ? provinceOf(district!.name) : province)!].stroke
                            })`,
                          }}
                        >
                          <p className="text-[11px] uppercase tracking-[0.25em] font-semibold opacity-80">
                            {panelSubtitle}
                          </p>
                          <h2 className="font-display text-2xl font-bold leading-tight mt-1">
                            {panelTitle}
                          </h2>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 overflow-x-auto" role="tablist" aria-label={np ? "विवरण ट्याब" : "Profile sections"}>
                          {(Object.keys(TAB_LABELS) as PanelTab[]).map((k) => {
                            const Icon = TAB_ICONS[k];
                            const active = tab === k;
                            return (
                              <button
                                key={k}
                                role="tab"
                                type="button"
                                aria-selected={active}
                                onClick={() => setTab(k)}
                                className={`flex-1 min-w-[4.5rem] flex flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                                  active ? "text-[#B8941F] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-[#0A2540]"
                                }`}
                              >
                                <Icon size={14} />
                                {np ? TAB_LABELS[k].np : TAB_LABELS[k].en}
                              </button>
                            );
                          })}
                        </div>

                        {/* Tab body */}
                        <div className="px-6 py-5 min-h-[16rem]" role="tabpanel">
                          {renderTabContent()}
                        </div>

                        {/* Compare hook */}
                        {districtActive && (
                          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 space-y-3">
                            <button
                              type="button"
                              onClick={() => {
                                setView("compare");
                                const name = district!.name;
                                if (!compareA) setCompareA(name);
                                else if (!compareB) setCompareB(name);
                                else {
                                  // Both slots full: shift A→B, clicked district takes slot A
                                  setCompareB(compareA);
                                  setCompareA(name);
                                }
                              }}
                              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[#D4AF37]/40 text-[#0A2540] text-sm font-semibold hover:bg-[#D4AF37]/10 transition-colors"
                            >
                              <Columns3 size={15} aria-hidden="true" />
                              {np ? "यो जिल्ला तुलना गर्नुहोस्" : "Compare this district"}
                            </button>
                            {/* Share / copy / print the factsheet (7.6) */}
                            <ResultCardActions
                              light
                              np={np}
                              toolId="district"
                              label={`${district!.name} · ${np ? district!.np : district!.name}`}
                              summary={`${np ? "हेडक्वार्टर" : "HQ"}: ${np ? district!.hq.np : district!.hq.en} · ${np ? district!.belt.np : district!.belt.en}`}
                              detail={
                                `${np ? "परिचय" : "Known for"}: ${np ? district!.knownFor.np : district!.knownFor.en}\n` +
                                `${np ? "बाली" : "Crops"}: ${metaFor(district!.name).crops.join(", ")}\n` +
                                `${np ? "पशुपालन" : "Livestock"}: ${metaFor(district!.name).livestock.join(", ")}\n` +
                                `drmogalshah.com.np/agromap?district=${encodeURIComponent(district!.name)}`
                              }
                            />
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-2xl shadow-xl overflow-hidden bg-white"
                      >
                        <div className="bg-gradient-to-br from-[#0A2540] to-[#12365C] text-white px-6 py-5">
                          <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                            {np ? "राष्ट्रिय एक नजरमा" : "Nepal at a glance"}
                          </p>
                          <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                            {np ? "थर बदलेर सुरु गर्नुहोस्" : "Start with a layer"}
                          </h2>
                          <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                            {np
                              ? "माथिका थर (प्रदेश / भेग / बाली / पशुपालन / जलवायु) बदल्नुहोस् — नक्साको रङै बदलिन्छ; जिल्ला छुनुहोस्, तथ्यपत्र यहीँ खुल्छ।"
                              : "Switch the layer above — the whole map recolours; touch any district for its full factsheet."}
                          </p>
                        </div>
                        <div className="px-6 py-5 grid grid-cols-2 gap-4">
                          {NATIONAL_STATS.map((s, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05 * i }}
                              className="rounded-xl border border-gray-100 bg-gray-50/60 p-3.5"
                            >
                              <p className="font-display text-xl font-bold text-[#0A2540] leading-none">
                                {np ? toNepaliDigits(s.value) : s.value}
                              </p>
                              <p className="text-[11px] text-gray-600 leading-snug mt-1.5">
                                {np ? s.label.np : s.label.en}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">{np ? s.note.np : s.note.en}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* ── Sources footer ─────────────────────────────────────────── */}
            <div className="mt-8 rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 px-5 py-4 flex items-start gap-3">
              <Info size={16} className="mt-0.5 text-[#B8941F] flex-shrink-0" />
              <p className="text-xs text-gray-600 leading-relaxed">
                {np
                  ? "स्रोत: जिल्ला प्रोफाइल MoALD को Statistical Information on Nepalese Agriculture (जिल्लागत तालिका), NARC/DOA खाल्डो-क्षेत्र कार्यक्रम र स्थापित कृषि भूगोलमा आधारित; भेग तथा बाली/पशु/जलवायु ट्यागहरू यही प्रमाणित प्रोफाइलबाट वर्गीकृत; संरक्षित क्षेत्र/वन्यजन्तु DNPWC राष्ट्रिय निकुञ्ज तथा संरक्षण क्षेत्र नेटवर्क (RAMSAR स्थलसहित); राष्ट्रिय तथ्याङ्क MoALD SINA (धान ५६ लाख टन, मकै ३० लाख टन — कीर्तिमान वर्ष), USDA FAS तथा Kafle et al. 2024 (गहुँ), Poudel et al. 2020, Vaccines (भैंसीको दुध ६४%), FEWS NET 2026 (कृषि GDP ≈२२%), DHM/ICIMOD ताप विश्लेषण (+०.०५६ डिग्री/वर्ष)। नक्सा: nepal-district-map (MIT इजाजतपत्र) — दार्चुलामा लिम्पियाधुरा–कालापानी–लिपुलेकसहित। गुल्मी कफीका गणना जिल्ला-अध्ययनबाट। CSV निर्यात यही तथ्याङ्कको प्रतिलिपि हो।"
                  : "Sources: district profiles follow MoALD Statistical Information on Nepalese Agriculture (district tables), NARC/DOA pocket-area programmes and established agricultural geography — the belt zones and crop/livestock/climate tags are classified from those same verified profiles; protected areas & wildlife from the DNPWC national park and conservation area network (incl. RAMSAR sites); national figures from MoALD SINA (paddy 5.6 M t & maize 3.0 M t — record year), USDA FAS & Kafle et al. 2024 (wheat), Poudel et al. 2020, Vaccines 8:322 (buffalo ≈64% of milk), FEWS NET 2026 (agriculture ≈22% of GDP), DHM/ICIMOD warming analyses (+0.056 °C/yr). Gulmi coffee counts from a published district study. Map: nepal-district-map (MIT license) with the correct Limpiyadhura–Kalapani–Lipulekh boundary in Darchula. The CSV export is a copy of this same dataset."}
              </p>
            </div>

            {/* Cross-link to knowledge base */}
            <div className="mt-6 mb-2 rounded-2xl bg-gradient-to-r from-[#0A2540] to-[#12365C] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                  {np ? "अझै गहिराइमा" : "Go deeper"}
                </p>
                <p className="font-display text-lg sm:text-xl font-bold leading-snug">
                  {np
                    ? "यी अभ्यासका विस्तृत मार्गदर्शन ज्ञान भण्डारमा छन्"
                    : "The knowledge base unpacks these practices in full"}
                </p>
              </div>
              <a
                href="/knowledge"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#B8941F] text-[#0A2540] font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                {np ? "ज्ञान भण्डार खोल्नुहोस्" : "Open the knowledge base"}
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

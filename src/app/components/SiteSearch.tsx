import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Home,
  Briefcase,
  ArrowRight,
  BookOpen,
  Wrench,
  CalendarCheck,
  Mail,
  FileText,
  Award,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/**
 * SiteSearch — lightweight client-side search over a curated bilingual index.
 *
 * A real recovery tool for the 404 page (and reusable anywhere): the visitor
 * types what they were looking for and jumps straight to the right page.
 * Matching runs against BOTH language indexes, so "खोप" and "vaccine" both
 * find the vaccination-reminder tool regardless of the UI language.
 */

export interface SearchItem {
  path: string;
  icon: typeof Home;
  section: { en: string; np: string };
  title: { en: string; np: string };
  desc: { en: string; np: string };
  keywords: string; // space-separated lowercase search terms (both languages)
}

const HAND_WRITTEN_INDEX: SearchItem[] = [
  {
    path: "/",
    icon: Home,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "Home — Portfolio Overview", np: "गृहपृष्ठ — पोर्टफोलियो" },
    desc: { en: "Dr. Shah's expertise, career highlights, partners and testimonials.", np: "डा. शाहको विशेषज्ञता, करियर, साझेदारहरू र प्रशंसापत्रहरू।" },
    keywords: "home portfolio dr shah mogal prasad livestock expert गृहपृष्ठ मुख्य",
  },
  {
    path: "/about",
    icon: Briefcase,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "About Dr. Shah", np: "डा. शाहको बारेमा" },
    desc: { en: "Biography, education, career journey and core values.", np: "जीवनी, शिक्षा, व्यावसायिक यात्रा र मूल मूल्यहरू।" },
    keywords: "about biography education career journey values tribhuvan university larenstein m.sc animal nutrition परिचय जीवनी शिक्षा यात्रा",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Livestock Development & Production", np: "पशुपालन विकास र उत्पादन" },
    desc: { en: "Breeding programs, dairy & meat value chains, commercial farm advisory.", np: "प्रजनन कार्यक्रम, दुग्ध तथा मासु मूल्य श्रृंखला, व्यावसायिक फार्म परामर्श।" },
    keywords: "livestock development production breeding dairy meat value chain farm cattle buffalo goat पशुपालन उत्पादन प्रजनन दुग्ध गाई भैंसी",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Animal Health & Disease Management", np: "पशु स्वास्थ्य र रोग व्यवस्थापन" },
    desc: { en: "Disease control strategies, vaccination planning, herd health audits.", np: "रोग नियन्त्रण रणनीति, खोप योजना, थुना स्वास्थ्य अडिट।" },
    keywords: "animal health disease management vaccination herd fmd lumpy skin खोप रोग स्वास्थ्य उपचार",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Food Security & Nutrition", np: "खाद्य सुरक्षा र पोषण" },
    desc: { en: "Nutrition planning, feed formulation, food security programs.", np: "पोषण योजना, दाना फार्मुलेसन, खाद्य सुरक्षा कार्यक्रम।" },
    keywords: "food security nutrition feed formulation diet खाद्य सुरक्षा पोषण दाना",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Climate-Resilient Agriculture", np: "जलवायु-अनुकूलित कृषि" },
    desc: { en: "Climate adaptation for farms, disaster-resilient livestock systems.", np: "कृषिमा जलवायु अनुकूलन, विपद्-प्रतिरोधी पशुपालन प्रणाली।" },
    keywords: "climate resilient agriculture adaptation disaster जलवायु अनुकूलन",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Rural Livelihood Enhancement", np: "ग्रामीण जीविकोपार्जन सुधार" },
    desc: { en: "Community programs, cooperative strengthening, farmer training.", np: "सामुदायिक कार्यक्रम, सहकारी सबलीकरण, किसान तालिम।" },
    keywords: "rural livelihood cooperative farmer training community ग्रामीण जीविकोपार्जन किसान तालिम",
  },
  {
    path: "/services",
    icon: ArrowRight,
    section: { en: "Service", np: "सेवा" },
    title: { en: "Project Management & M&E", np: "परियोजना व्यवस्थापन र M&E" },
    desc: { en: "Project design, monitoring & evaluation, donor reporting.", np: "परियोजना डिजाइन, अनुगमन तथा मूल्याङ्कन, दाता प्रतिवेदन।" },
    keywords: "project management monitoring evaluation donor world bank परियोजना अनुगमन मूल्याङ्कन",
  },
  {
    path: "/experience",
    icon: Award,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "Professional Experience", np: "व्यावसायिक अनुभव" },
    desc: { en: "Director roles, World Bank projects, 29+ years across Nepal.", np: "निर्देशक भूमिकाहरू, विश्व बैंक परियोजना, २९+ वर्षको अनुभव।" },
    keywords: "experience director dlfd world bank career bagmati province अनुभव निर्देशक विश्व बैंक",
  },
  {
    path: "/publications",
    icon: BookOpen,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "Publications & Credentials", np: "प्रकाशनहरू र योग्यता" },
    desc: { en: "Research papers, reports, degrees and professional contributions.", np: "अनुसन्धान पत्रहरू, प्रतिवेदनहरू, उपाधिहरू र योगदानहरू।" },
    keywords: "publications research papers thesis cv resume credentials प्रकाशन अनुसन्धान पत्र",
  },
  {
    path: "/tools/weight",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Livestock Weight Estimator", np: "पशु तौल अनुमान" },
    desc: { en: "Estimate cattle weight from body measurements.", np: "शरीरको नापबाट पशुको तौल अनुमान गर्नुहोस्।" },
    keywords: "weight estimator calculator cattle body measurement तौल अनुमान क्यालकुलेटर",
  },
  {
    path: "/tools/vaccine",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Vaccination Reminders", np: "खोप सम्झना" },
    desc: { en: "Schedule vaccination reminders to your calendar.", np: "क्यालेन्डरमा खोप सम्झना तालिका थप्नुहोस्।" },
    keywords: "vaccination reminder calendar schedule ics खोप सम्झना क्यालेन्डर",
  },
  {
    path: "/tools/health",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Livestock Health Guide (Symptom Checker)", np: "पशु स्वास्थ्य मार्गदर्शन" },
    desc: { en: "Match observed symptoms to common diseases with care guidance.", np: "देखिएका लक्षण मिलाई रोग पहिचान र उपचार सुझाव पाउनुहोस्।" },
    keywords: "health guide symptom checker disease cattle buffalo goat poultry fmd lumpy mastitis bloat ppr newcastle coccidiosis रोग लक्षण स्वास्थ्य",
  },
  {
    path: "/tools/gestation",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Gestation Calculator", np: "गर्भावधि हिसाब" },
    desc: { en: "Breeding date to expected delivery for cattle, buffalo, goats and more.", np: "मिलनको मितिबाट गाई, भैंसी, बाख्राको प्रसूति मिति निकाल्नुहोस्।" },
    keywords: "gestation calculator pregnancy due date calving kidding cattle buffalo goat sheep pig horse dog cat गर्भावधि प्रसूति मिति",
  },
  {
    path: "/tools/land",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Nepal Land Unit Converter", np: "जग्गा नाप रूपान्तरण" },
    desc: { en: "Ropani-Aana-Paisa-Daam and Bigha-Kattha-Dhur to square metres.", np: "रोपनी-आना-पैसा-दाम र बिघा-कट्ठा-धुर वर्ग मिटरमा बद्ल्नुहोस्।" },
    keywords: "land converter ropani aana paisa dam bigha kattha dhur square meter area kitta lalpurja जग्गा रोपनी आना बिघा कट्ठा धुर रूपान्तरण",
  },
  {
    path: "/tools/feed",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Feed & Dry Matter Calculator", np: "चारा तथा सुख्खा पदार्थ हिसाब" },
    desc: { en: "Daily ration for milking cows and buffalo from body weight.", np: "तौलबाट दुध दुहुने गाईभैंसीको दैनिक आहार निकाल्नुहोस्।" },
    keywords: "feed calculator dry matter dm intake ration buffalo cattle lactating green fodder concentrate चारा आहार सुख्खा पदार्थ दाना",
  },
  {
    path: "/tools/dosage",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Veterinary Dosage Calculator", np: "खुराक क्यालकुलेटर" },
    desc: { en: "mg/kg doses into mL of injection — safe medicine amounts.", np: "mg/kg खुराकलाई इन्जेक्सनको mL मा — सुरक्षित औषधि मात्रा।" },
    keywords: "dosage calculator mg kg ml injection tablet medicine खुराक इन्जेक्सन औषधि",
  },
  {
    path: "/tools/dairy",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Dairy Income Calculator", np: "दुग्ध आम्दानी क्यालकुलेटर" },
    desc: { en: "Monthly & yearly margin of your dairy herd from litres, price and feed cost.", np: "लिटर, भाउ र चारा खर्चबाट डेयरीको मासिक-वार्षिक नाफा।" },
    keywords: "dairy income calculator milk price profit margin cost per litre दुग्ध आम्दानी नाफा दुध भाउ",
  },
  {
    path: "/tools/water",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Livestock Water Requirement", np: "पशु पानी आवश्यकता" },
    desc: { en: "Daily litres for the whole herd, with a 1.5-day storage target.", np: "पूरै बथानको दैनिक लिटर र १.५ दिनको भण्डारण लक्ष।" },
    keywords: "water requirement livestock buffalo cow goat poultry drinking water tank पानी आवश्यकता पशु",
  },
  {
    path: "/tools/hatch",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Incubation & Hatch Calendar", np: "कलाउने पात्रो" },
    desc: { en: "Set-date to hatch, candling and lockdown dates for chicken, duck, quail.", np: "राखेको मितिबाट कलाउने, प्रकाश जाँच र लकडाउन मिति।" },
    keywords: "incubation hatch calendar chicken duck quail turkey eggs hatchery candling अन्डा कलाउने ह्याचरी",
  },
  {
    path: "/tools/market",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Live Animal Market Value", np: "जीवित पशु मूल्य अनुमान" },
    desc: { en: "Live weight × your local rate, with a ±10% planning band.", np: "जीवित तौल × स्थानीय दर, ±१०% योजना दायरासहित।" },
    keywords: "market value goat khasi buffalo cow pig live weight price खसी बाख्रा भाउ मूल्य",
  },
  {
    path: "/tools/poultry",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Poultry Feed & FCR Calculator", np: "कुखुरा दाना FCR हिसाब" },
    desc: { en: "Poultry feed with FCR economics for layers and broilers.", np: "लेयर-ब्रोयलरको FCR सहित दाना हिसाब।" },
    keywords: "poultry feed fcr layer broiler eggs batch कुखुरा दाना अन्डा",
  },
  {
    path: "/tools/herd",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Herd & Milk Ledger", np: "खोर तथा दुध अभिलेख" },
    desc: { en: "Keep animals and daily milk records on your phone, export CSV.", np: "पशु र दैनिक दुधको अभिलेख फोनमै राख्नुहोस्, CSV निर्यात।" },
    keywords: "herd ledger record keeping milk tracker livestock register csv खोर अभिलेख दुध",
  },
  {
    path: "/tools/weather",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Weather Smart — THI Heat-Stress Alerts", np: "मौसम सहायक — ताप-तनाव" },
    desc: { en: "Live weather for 77 districts with heat-stress and spraying advisories.", np: "७७ जिल्लाको लाइभ मौसम, ताप-तनाव र औषधि छर्कन सल्लाह।" },
    keywords: "weather livestock heat stress thi forecast district open meteo मौसम ताप तनाव",
  },
  {
    path: "/tools/bcs",
    icon: Wrench,
    section: { en: "Tool", np: "औजार" },
    title: { en: "Body Condition Score Guide (BCS 1–5)", np: "शरीर अवस्था अंक (१–५)" },
    desc: { en: "Score cattle 1–5 on a live diagram, with management advice.", np: "चित्र हेरेर १–५ अंक, व्यवस्थापन सल्लाहसहित।" },
    keywords: "body condition score bcs cattle buffalo fat thin edmondson शरीर अवस्था अंक",
  },
  {
    path: "/knowledge",
    icon: BookOpen,
    section: { en: "Library", np: "पुस्तकालय" },
    title: { en: "Knowledge Base — Agriculture & Animal Husbandry", np: "ज्ञान भण्डार — कृषि तथा पशुपालन" },
    desc: { en: "32 researched bilingual guides with factsheets & charts: vaccination, feeding, breeds, crops, climate.", np: "तथ्यपत्र र चित्रसहित ३२ अनुसन्धानमा आधारित द्विभाषी मार्गदर्शन: खोप, आहार, जात, बाली, जलवायु।" },
    keywords: "knowledge base guides farming agriculture husbandry guides library ज्ञान भण्डार मार्गदर्शन कृषि पशुपालन",
  },
  {
    path: "/knowledge",
    icon: BookOpen,
    section: { en: "Guide", np: "मार्गदर्शन" },
    title: { en: "Vaccination Schedule for Nepal", np: "नेपालको खोप तालिका" },
    desc: { en: "FMD every 6 months, HS/BQ/Anthrax annual, PPR for goats.", np: "एफएमडी ६ महिनामा, एचएस/बीक्यू वर्षेनी, बाख्राको पिपिआर।" },
    keywords: "vaccination schedule fmd hs bq anthrax ppr deworming खोप तालिका",
  },
  {
    path: "/knowledge",
    icon: BookOpen,
    section: { en: "Guide", np: "मार्गदर्शन" },
    title: { en: "Silage & Hay Making", np: "सिलेज र हे बनाउने" },
    desc: { en: "Bank monsoon fodder for the winter hunger gap.", np: "वर्षाको चारा जाडोको भोक-खाडलका लागि जोगाउनुहोस्।" },
    keywords: "silage hay pit bale fodder preservation monsoon सिलेज हे गड्डा",
  },
  {
    path: "/knowledge",
    icon: BookOpen,
    section: { en: "Guide", np: "मार्गदर्शन" },
    title: { en: "Goat Breeds & Farming in Nepal", np: "बाख्रा जात तथा पालन" },
    desc: { en: "Khari, Chyangra, Boer and Jamunapari crosses, housing, health calendar.", np: "खरी, च्याङ्ग्रा, बोअर-जामुनापारी क्रस, गोठ र स्वास्थ्य पात्रो।" },
    keywords: "goat farming breeds khari chyangra boer jamunapari housing dashain बाख्रा पालन जात",
  },
  {
    path: "/knowledge",
    icon: BookOpen,
    section: { en: "Guide", np: "मार्गदर्शन" },
    title: { en: "Climate Change & Nepali Farming", np: "जलवायु परिवर्तन र नेपाली कृषि" },
    desc: { en: "Warming data, heat stress in buffalo, climate-smart practices.", np: "तापक्रम तथ्याङ्क, भैंसीमा गर्मी तनाव, स्मार्ट अभ्यास।" },
    keywords: "climate change warming heat stress adaptation dhm icimod जलवायु परिवर्तन गर्मी",
  },
  {
    path: "/agromap",
    icon: FileText,
    section: { en: "Map", np: "नक्सा" },
    title: { en: "Nepal Agriculture Map", np: "नेपाल कृषि नक्सा" },
    desc: { en: "Interactive map of all 77 districts — crops, livestock, ecology and climate factsheets.", np: "७७ जिल्लाको अन्तरक्रियात्मक नक्सा — बाली, पशु, वन्यजन्तु र जलवायु तथ्यपत्र।" },
    keywords: "nepal map provinces districts agriculture crops koshi madhesh bagmati gandaki lumbini karnali sudurpashchim interactive wildlife parks climate नक्सा जिल्ला प्रदेश कृषि",
  },
  {
    path: "/booking",
    icon: CalendarCheck,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "Book a Consultation", np: "परामर्श बुक गर्नुहोस्" },
    desc: { en: "Choose a topic and time slot for an advisory session.", np: "परामर्श सत्रको विषय र समय छान्नुहोस्।" },
    keywords: "booking appointment consultation schedule meeting बुक परामर्श भेटघाट समय",
  },
  {
    path: "/contact",
    icon: Mail,
    section: { en: "Page", np: "पृष्ठ" },
    title: { en: "Contact & Location", np: "सम्पर्क र स्थान" },
    desc: { en: "Phone, WhatsApp, email and office hours.", np: "फोन, व्हाट्सएप, इमेल र कार्यालय समय।" },
    keywords: "contact phone whatsapp email address location सम्पर्क फोन इमेल ठेगाना",
  },
];

/* ── Auto-generated: every knowledge-base article gets its own entry ──────
 * Derived from kbArticles — but LAZILY. The knowledge dataset is ~256 KB and
 * must never ship in the eager bundle (rural connectivity): it is fetched the
 * first time a search UI is actually used, then a module-level cache serves
 * every later search. Until it arrives, the hand-written entries above give
 * instant results. */
let kbEntriesCache: SearchItem[] | null = null;
let kbLoadStarted = false;

function mapKbArticles(
  articles: { id: string; title: { en: string; np: string }; summary: { en: string; np: string } }[]
): SearchItem[] {
  return articles.map((a) => ({
    path: `/knowledge/${a.id}`,
    icon: BookOpen,
    section: { en: "Knowledge", np: "ज्ञान" },
    title: a.title,
    desc: a.summary,
    keywords: [a.title.en, a.title.np, a.summary.en, a.summary.np]
      .join(" ")
      .toLowerCase(),
  }));
}

/**
 * Full search index for active search UIs. Pass `active` = true when the
 * search UI is mounted/open — that moment triggers the one-time KB chunk
 * load (new articles then become searchable automatically, each linking to
 * its deep URL /knowledge/<id> rather than the generic library page).
 */
export function useSearchIndex(active: boolean): SearchItem[] {
  const [kb, setKb] = useState<SearchItem[] | null>(kbEntriesCache);

  useEffect(() => {
    if (!active || kbLoadStarted || kbEntriesCache) return;
    kbLoadStarted = true;
    import("../data/kb")
      .then((m) => {
        kbEntriesCache = mapKbArticles(m.kbArticles);
        setKb(kbEntriesCache);
      })
      .catch(() => {
        // Chunk load failed — searches still work over the hand-written index.
        kbLoadStarted = false;
      });
  }, [active]);

  return useMemo(
    () => (kb ? [...HAND_WRITTEN_INDEX, ...kb] : HAND_WRITTEN_INDEX),
    [kb]
  );
}

/** Word-level match: substring either way, or shared stem ≥ 5 chars
 *  (so "vaccine" matches "vaccination", "consult" matches "consulting"). */
function wordMatch(term: string, word: string): boolean {
  if (word.includes(term) || term.includes(word)) return true;
  let n = 0;
  const max = Math.min(term.length, word.length);
  while (n < max && term[n] === word[n]) n++;
  return n >= 5;
}

/** Tokenised scoring: title matches weigh more than keyword matches. */
export function scoreItem(item: SearchItem, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const title = `${item.title.en} ${item.title.np}`.toLowerCase().split(/[\s,·—-]+/);
  const desc = `${item.desc.en} ${item.desc.np}`.toLowerCase().split(/[\s,·—-]+/);
  const keywords = item.keywords.toLowerCase().split(/\s+/);
  let score = 0;
  for (const term of q.split(/\s+/)) {
    if (title.some((w) => wordMatch(term, w))) score += 10;
    if (desc.some((w) => wordMatch(term, w))) score += 4;
    if (keywords.some((w) => wordMatch(term, w))) score += 6;
  }
  return score;
}

export function SiteSearch({ autoFocus = false }: { autoFocus?: boolean }) {
  const { language, t } = useLanguage();
  const np = language === "np";
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const index = useSearchIndex(true); // mounted → KB entries load once

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return index.map((item) => ({ item, score: scoreItem(item, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.item);
  }, [query, index]);

  /* Close on outside click / Escape */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => setActive(0), [results.length]);

  const go = (path: string) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active].path);
    }
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-xl mx-auto">
      <label htmlFor="site-search" className="sr-only">
        {t("not_found_search_label")}
      </label>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
          aria-hidden="true"
        />
        <input
          id="site-search"
          type="search"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={t("not_found_search_ph")}
          className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-300 bg-white text-[#0A2540] placeholder:text-gray-400 shadow-sm focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 transition-all"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && query.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-20 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-2xl overflow-hidden text-left"
          >
            {results.length === 0 ? (
              <p className="px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
                <FileText size={15} className="text-gray-400 shrink-0" />
                {t("not_found_search_none")}
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto py-1">
                {results.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <li key={`${r.path}-${r.title.en}-${i}`} role="option" aria-selected={i === active}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r.path)}
                        className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                          i === active ? "bg-[#D4AF37]/10" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
                            i === active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Icon size={15} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#0A2540] truncate">
                            {np ? r.title.np : r.title.en}
                          </span>
                          <span className="block text-xs text-gray-500 line-clamp-1">
                            {np ? r.desc.np : r.desc.en}
                          </span>
                          <span className="mt-1 inline-block text-[10px] uppercase tracking-wider text-[#B8941F] font-semibold">
                            {np ? r.section.np : r.section.en} · {r.path}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-2 text-xs text-gray-400 text-center">{t("not_found_search_hint")}</p>
    </div>
  );
}

import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Beef,
  Bird,
  Mountain,
  ChevronDown,
  RotateCcw,
  Stethoscope,
  CalendarCheck,
  ShieldAlert,
  CircleAlert,
  OctagonAlert,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/**
 * HealthGuide — a symptom-driven livestock health knowledge base.
 *
 * Farmers pick a species, tick the signs they observe, and get a ranked
 * shortlist of likely conditions with severity, immediate care and
 * prevention notes — plus a direct path to book a consultation.
 *
 * ⚠️ Educational triage only: it points toward possibilities, never a
 * diagnosis. Every card says so and funnels to a real consultation.
 */

type SpeciesId = "cattle" | "buffalo" | "goat" | "poultry";
type Severity = "watch" | "urgent" | "emergency";

interface Symptom {
  id: string;
  en: string;
  np: string;
}

interface Condition {
  id: string;
  species: SpeciesId[];
  name: { en: string; np: string };
  severity: Severity;
  symptoms: string[]; // symptom ids
  about: { en: string; np: string };
  immediate: { en: string; np: string };
  prevention: { en: string; np: string };
}

const SPECIES: { id: SpeciesId; en: string; np: string; icon: typeof Beef }[] = [
  { id: "cattle", en: "Cattle", np: "गाई", icon: Beef },
  { id: "buffalo", en: "Buffalo", np: "भैंसी", icon: Beef },
  { id: "goat", en: "Goat / Sheep", np: "बाख्रा / भेड", icon: Mountain },
  { id: "poultry", en: "Poultry", np: "कुखुरा", icon: Bird },
];

const SYMPTOM_POOL: Symptom[] = [
  { id: "fever", en: "Fever", np: "ज्वरो आउनु" },
  { id: "drooling", en: "Excessive drooling", np: "लार बग्नु" },
  { id: "mouthSores", en: "Mouth sores or blisters", np: "मुखमा घाउ / थिलो" },
  { id: "lameness", en: "Lameness", np: "लङ्गिनु" },
  { id: "reluctantStand", en: "Refuses to stand", np: "उभिन मान्नु" },
  { id: "skinNodules", en: "Skin lumps / nodules", np: "छालामा डढ्के" },
  { id: "swollenUdder", en: "Swollen, painful udder", np: "थन फुल्नु / दुख्नु" },
  { id: "abnormalMilk", en: "Milk with clots or blood", np: "दुधमा खरानी / रगत" },
  { id: "reducedMilk", en: "Milk suddenly drops", np: "दुध अचानक घट्नु" },
  { id: "swollenFlank", en: "Swollen left belly", np: "बायाँ पेट फुल्नु" },
  { id: "restlessness", en: "Restlessness, pawing", np: "असहज बच्चाउनु" },
  { id: "laboredBreathing", en: "Laboured breathing", np: "सास फेर्न कठिन" },
  { id: "offFeed", en: "Off feed / not eating", np: "दाना छाड्नु" },
  { id: "suddenDeath", en: "Sudden deaths in herd", np: "झट्टै मर्नु" },
  { id: "diarrhea", en: "Diarrhoea", np: "पातलो दिसा" },
  { id: "bloodyDroppings", en: "Bloody droppings", np: "दिसामा रगत" },
  { id: "twistedNeck", en: "Twisted neck / circling", np: "घाँटी ऐलो बाङ्गिनु" },
  { id: "dropEgg", en: "Egg production drops", np: "अन्डा कम हुनु" },
  { id: "ruffledFeathers", en: "Ruffled feathers, dull", np: "लोत्रो फुक्नु, मस्त नबस्नु" },
  { id: "weakness", en: "Weakness, depression", np: "कमजोरी, मस्त नबस्नु" },
  { id: "throatSwelling", en: "Throat / dewlap swelling", np: "घाँटी / गला फुल्नु" },
  { id: "convulsions", en: "Fits, convulsions", np: "छटपटी / मात्नु" },
  { id: "coughing", en: "Coughing, nasal discharge", np: "खोकी / नाक बग्नु" },
  { id: "eyeDischarge", en: "Watery eyes", np: "आँखा बग्नु" },
  { id: "scabsLips", en: "Scabs around lips / muzzle", np: "ओठमा खटिरा" },
];

const CONDITIONS: Condition[] = [
  {
    id: "fmd",
    species: ["cattle", "buffalo"],
    name: { en: "Foot & Mouth Disease (FMD)", np: "खुरारोग (FMD)" },
    severity: "emergency",
    symptoms: ["fever", "drooling", "mouthSores", "lameness", "reducedMilk", "offFeed"],
    about: {
      en: "A highly contagious viral disease spreading through saliva, milk and contaminated equipment. Outbreaks sweep herds within days and are reportable to livestock authorities.",
      np: "लार, दुध र दूषित सामग्रीबाट छिटो फैलिने भाइरल रोग। संक्रमण केही दिनमै पूरा थुनामा फैलिन्छ र यो पशुपालन कार्यालयमा रिपोर्ट गर्नुपर्ने रोग हो।",
    },
    immediate: {
      en: "Isolate affected animals, provide soft feed and clean water, avoid moving animals. Call your livestock service centre — vaccination rings control outbreaks.",
      np: "बिरामी पशु छुट्टै राख्नुहोस्, नरम दाना र सफा पानी दिनुहोस्, पशु सार्नुहोस् न। पशु सेवा कार्यालयमा तुरुन्त खबर गर्नुहोस् — घेराबन्दी खोपले नियन्त्रण गर्छ।",
    },
    prevention: {
      en: "Biannual vaccination (pre-monsoon and pre-winter), disinfect footwear and equipment between sheds, quarantine new animals for 2 weeks.",
      np: "वर्षको दुई पटक खोप (मनसुनअघि र जाडोअघि), व्याटै र औजार सफा गरेर मात्र गोठभित्र लैजानुहोस्, नयाँ पशु २ हप्ता क्वारेन्टिनमा राख्नुहोस्।",
    },
  },
  {
    id: "lsd",
    species: ["cattle", "buffalo"],
    name: { en: "Lumpy Skin Disease (LSD)", np: "डढुवा रोग (LSD)" },
    severity: "urgent",
    symptoms: ["skinNodules", "fever", "reducedMilk", "eyeDischarge", "offFeed"],
    about: {
      en: "Viral disease spread by biting insects, causing firm skin nodules across the body. Milk yield can fall 30–50% for weeks.",
      np: "हान्ने किराबाट सर्ने भाइरल रोग — शरीरभर देखिने साल्को डढ्केमा। दुध उत्पादन ३०–५०% सम्म हप्तौँसम्म घट्न सक्छ।",
    },
    immediate: {
      en: "Move animals away from wet, insect-heavy areas; control flies and ticks; support with fluids and soft feed. Notify your livestock office.",
      np: "पशुलाई ओसिलो र किरा बढी भएको स्थानबाट सार्नुहोस्; झ्याम र उपिरो नियन्त्रण गर्नुहोस्; पानी र नरम दाना दिनुहोस्। पशु कार्यालयमा खबर गर्नुहोस्।",
    },
    prevention: {
      en: "Annual LSD vaccination before monsoon, insect control around sheds, avoid introducing animals from outbreak areas.",
      np: "मनसुनअघि वार्षिक LSD खोप, गोठवरिपरि किरा नियन्त्रण, रोग फैलिएको क्षेत्रबाट पशु नल्याउनुहोस्।",
    },
  },
  {
    id: "mastitis",
    species: ["cattle", "buffalo", "goat"],
    name: { en: "Mastitis", np: "थनज्वरो (Mastitis)" },
    severity: "urgent",
    symptoms: ["swollenUdder", "abnormalMilk", "fever", "offFeed"],
    about: {
      en: "Bacterial udder infection, usually entering through wounds or poor milking hygiene. Chronic cases permanently scar milk tissue.",
      np: "घाउ वा अस्वस्छ दुध दुहुँ प्रविधिबाट पस्ने जीवाणु संक्रमण। पुरानो भएमा दुध उत्पादन स्थायी रूपमा घट्छ।",
    },
    immediate: {
      en: "Milk out frequently (discard milk), apply warm compresses, keep bedding dry. Veterinary treatment requires confirmed antibiotics — never self-medicate.",
      np: "बारम्बार दुध निकाल्नुहोस् (फाल्नुहोस्), तातो सेक गर्नुहोस्, ओछ्यान सुक्खा राख्नुहोस्। एन्टिबायोटिक भने डाक्टरको जाँचपछि मात्र — आफै औषधि नदिनुहोस्।",
    },
    prevention: {
      en: "Pre- and post-milking teat dipping, dry clean hands, strip-test milk weekly, treat dry cows with dry-cow therapy.",
      np: "दुध दुहुँ अघि-पछि थनमा डिपिङ, सफा हात, साप्ताहिक स्ट्रिप जाँच, र सुकाइ अवधिमा dry-cow उपचार।",
    },
  },
  {
    id: "bloat",
    species: ["cattle", "buffalo", "goat"],
    name: { en: "Bloat (Tympany)", np: "अठेर (Tympany)" },
    severity: "emergency",
    symptoms: ["swollenFlank", "restlessness", "laboredBreathing", "offFeed"],
    about: {
      en: "Gas trapped in the rumen — often after sudden access to lush legume pasture or wet clover. Can become fatal within hours.",
      np: "रुमेनमा ग्यास जम्नु — प्रायः झट्टै हरियो वा ओसिलो कोसी/बदाम घाँस खाएपछि। केही घण्टामै ज्यान जान सक्छ।",
    },
    immediate: {
      en: "This is an emergency: keep the animal standing, walk it slowly, call a veterinarian immediately. Stomach tube or trocar relief must be done professionally.",
      np: "यो आपतकालीन अवस्था हो: पशुलाई उभाई ढिलो-ढिलो हिँडाउनुहोस् र तुरुन्त पशु चिकित्सक बोलाउनुहोस्। ट्युब वा ट्रोकारबाट ग्यास निकाल्ने काम विशेषज्ञले मात्र गर्नुपर्छ।",
    },
    prevention: {
      en: "Graduate animals onto lush pasture (fill with dry hay first), avoid grazing wet legumes in the morning, add oil to high-risk feeds.",
      np: "हरियो घाँसमा बिस्तारै सर्नुहोस् (पहिले सुक्खा हे दिनुहोस्), बिहान ओसिलो कोसी घाँस नचराउनुहोस्, जोखिम भएको दानामा तेल मिसाउनुहोस्।",
    },
  },
  {
    id: "hs",
    species: ["cattle", "buffalo"],
    name: { en: "Haemorrhagic Septicaemia (HS)", np: "गलाघोँडो (HS)" },
    severity: "emergency",
    symptoms: ["fever", "throatSwelling", "laboredBreathing", "weakness", "offFeed"],
    about: {
      en: "Acute bacterial disease (Pasteurella) that kills within 6–24 hours of visible signs — buffalo are especially susceptible during monsoon.",
      np: "लक्षण देखिएको ६–२४ घण्टाभित्रै मार्न सक्ने तीव्र जीवाणु रोग — मनसुनमा भैंसी बढी संवेदनशील हुन्छ।",
    },
    immediate: {
      en: "Do not delay — this is often fatal before treatment. Call a veterinarian immediately; early injectable antibiotics are the only realistic window.",
      np: "ढिलाइ नगर्नुहोस् — उपचारअघि नै मर्ने खतरा उच्च छ। तुरुन्त पशु चिकित्सक बोलाउनुहोस्; सुरुको घण्टामा दिइने इन्जेक्सन मात्रै उपाय हो।",
    },
    prevention: {
      en: "Annual pre-monsoon HS vaccination is highly effective, plus shelter from rain and stress during the wet season.",
      np: "मनसुनअघि वार्षिक HS खोप धेरै प्रभावकारी छ; साथै वर्षामा पशुलाई ओसिलो र तनावबाट जोगाउनुहोस्।",
    },
  },
  {
    id: "footrot",
    species: ["cattle", "goat"],
    name: { en: "Foot rot", np: "खुरे रोग" },
    severity: "watch",
    symptoms: ["lameness", "reluctantStand"],
    about: {
      en: "Bacterial infection between the hooves, flaring up in wet, muddy conditions. Herd-wide lameness wrecks feeding and weight gain.",
      np: "खुराबिच लाग्ने जीवाणु संक्रमण — ओसिलो, हिलो अवस्थामा बढ्छ। थुनै लङ्गिनुले दाना र तौल वृद्धिमा ठूलो असर पार्छ।",
    },
    immediate: {
      en: "Move to dry ground, clean and trim the affected hoof, use a footbath (10% zinc sulphate or copper sulphate) daily for a week.",
      np: "सुक्खा ठाउँमा सार्नुहोस्, असर गरेको खुरा सफा गरी काट्नुहोस्, हप्ताभरि दैनिक फुटबाथ (१०% जिंक/कपर सल्फेट) दिनुहोस्।",
    },
    prevention: {
      en: "Drain gateways and shedding areas, routine hoof trimming every 2–3 months, footbaths at entry points during wet months.",
      np: "बाटो र गोठको पानी निकास ठीक पार्नुहोस्, २–३ महिनामा खुरा काट्नुहोस्, ओसिलो महिनामा प्रवेशस्थलमा फुटबाथ राख्नुहोस्।",
    },
  },
  {
    id: "ppr",
    species: ["goat"],
    name: { en: "PPR (Khasra)", np: "खस्रा रोग (PPR)" },
    severity: "emergency",
    symptoms: ["fever", "mouthSores", "diarrhea", "coughing", "weakness", "offFeed"],
    about: {
      en: "The most destructive goat disease in Nepal — a virus closely related to rinderpest that can kill 60–90% of an unvaccinated flock.",
      np: "नेपालका बाख्राको सबैभन्दा विनाशकारी रोग — खस्रा भाइरसले खोप नगरिएको बाख्रामा ६०–९०% सम्म मार्न सक्छ।",
    },
    immediate: {
      en: "Separate sick goats immediately, give supportive fluids, and report to the livestock office. There is no cure — survival depends on early supportive care.",
      np: "बिरामी बाख्रा तुरुन्त छुट्टयाउनुहोस्, पानी-झोल दिनुहोस्, पशु कार्यालयमा खबर गर्नुहोस्। सिधै औषधि छैन — सुरुको सहयोगी हेरचाहले मात्र बचाउँछ।",
    },
    prevention: {
      en: "PPR vaccination every 3 years protects for life. Never buy goats from unknown flocks during outbreaks.",
      np: "३ वर्षमा एक पटक PPR खोपले जीवनभर सुरक्षा दिन्छ। महामारीको समयमा थाहा नभएको बाख्राबाट किन्नुहोस् न।",
    },
  },
  {
    id: "enterotoxemia",
    species: ["goat"],
    name: { en: "Enterotoxaemia", np: "आन्द्रा रोग (Enterotoxaemia)" },
    severity: "emergency",
    symptoms: ["swollenFlank", "convulsions", "suddenDeath", "offFeed"],
    about: {
      en: "Clostridial toxin disease triggered by sudden feed changes — concentrate overload lets gut bacteria produce lethal toxins within hours.",
      np: "झट्टै दाना परिवर्तनले भड्किने रोग — धेरै दानाले आन्द्राका जीवाणुले घातक विष घण्टौँभित्रै बनाउँछन्।",
    },
    immediate: {
      en: "Sudden death after a feed change points here. Reduce grain immediately, offer only good hay, and involve a veterinarian fast for antitoxin and fluids.",
      np: "दाना फेरेपछि झट्टै मरेमा यही रोग हुनसक्छ। तुरुन्त अनाज घटाउनुहोस्, राम्रो हे मात्र दिनुहोस्, र शीघ्र डाक्टरको सहयोग लिनुहोस्।",
    },
    prevention: {
      en: "Change feeds gradually over 7–10 days, avoid large concentrate meals, and vaccinate annually with CL/enterotoxaemia vaccine.",
      np: "दाना ७–१० दिनमा बिस्तारै फेर्नुहोस्, एकैपटक धेरै अनाज नदिनुहोस्, वार्षिक खोप लगाउनुहोस्।",
    },
  },
  {
    id: "orf",
    species: ["goat"],
    name: { en: "Orf (sore mouth)", np: "ओठे खटिरा (Orf)" },
    severity: "watch",
    symptoms: ["scabsLips", "offFeed"],
    about: {
      en: "Contagious viral scabs on lips and muzzle of young goats. Painful mouths put kids off suckling, so growth stalls.",
      np: "चेला बाख्राको ओठ र नाकमा देखिने सर्ने भाइरल खटिरा। मुख दुख्नाले चेला दुध छाड्छ र हुर्काइ रोकिन्छ।",
    },
    immediate: {
      en: "Apply gentle antiseptic to the scabs, soften feed, and isolate affected kids. Scabs carry the virus — wear gloves.",
      np: "खटिरामा हल्का एन्टिसेप्टिक लगाउनुहोस्, दाना नरम बनाउनुहोस्, असर गरेका चेला छुट्टै राख्नुहोस्। खटिरामा भाइरस हुन्छ — पञ्जा लगाउनुहोस्।",
    },
    prevention: {
      en: "Avoid buying animals with visible scabs, disinfect feeding troughs, and quarantine new stock.",
      np: "खटिरा देखिने पशु नकिन्नुहोस्, दाना भाँडो सफा गर्नुहोस्, नयाँ पशु क्वारेन्टिनमा राख्नुहोस्।",
    },
  },
  {
    id: "newcastle",
    species: ["poultry"],
    name: { en: "Newcastle Disease (Ranikhet)", np: "रानीखेता रोग" },
    severity: "emergency",
    symptoms: ["twistedNeck", "diarrhea", "dropEgg", "suddenDeath", "laboredBreathing", "ruffledFeathers"],
    about: {
      en: "The most feared viral disease of village and commercial flocks alike — spreads through air, feed and water and can wipe out a flock in days.",
      np: "गाउँले र व्यावसायिक दुवै खोरको सबैभन्दा डरलाग्दो भाइरल रोग — हावा, दाना र पानीबाट सर्छ र केही दिनमै पूरा बाथा सखाप पार्न सक्छ।",
    },
    immediate: {
      en: "Cull severely affected birds, stop all bird movement, disinfect everything, and notify livestock services. Survivors shed the virus for weeks.",
      np: "बढी असरित चरा निकाल्नुहोस्, चराको आवतजावत रोक्नुहोस्, सबै सफा गर्नुहोस्, पशु सेवामा खबर गर्नुहोस्। बाँचेका चराले हप्तौँसम्म भाइरस फैलाउँछन्।",
    },
    prevention: {
      en: "Strict vaccination schedules (day 7, 28, then booster every 2–3 months for layers), all-in all-out flock management, wild-bird-proof feed storage.",
      np: "नियमित खोप तालिका (७ दिन, २८ दिन, अन्डा कुखुरामा २–३ महिनामा बुस्टर), एकैपटक भित्र्याई-निकाल्ने प्रणाली, र जंगी चराबाट सुरक्षित दाना भण्डार।",
    },
  },
  {
    id: "coccidiosis",
    species: ["poultry"],
    name: { en: "Coccidiosis", np: "कोक्सिडियोसिस" },
    severity: "urgent",
    symptoms: ["bloodyDroppings", "ruffledFeathers", "weakness", "dropEgg"],
    about: {
      en: "Intestinal parasite flourishing in wet litter — the top cause of bloody droppings in young birds between 3–8 weeks of age.",
      np: "ओसिलो ओछ्यानमा बढ्ने आन्द्राको परजीवी — ३–८ हप्ताका चेलामा रगत दिसाको प्रमुख कारण।",
    },
    immediate: {
      en: "Replace wet litter immediately, give clean water with prescribed coccidiostats (amprolium), and isolate drooping birds.",
      np: "ओसिलो ओछ्यान तुरुन्त फेर्नुहोस्, सफा पानीमा निर्धारित औषधि (एम्प्रोलियम) दिनुहोस्, कमजोर चरा छुट्टै राख्नुहोस्।",
    },
    prevention: {
      en: "Keep litter dry and loose, avoid overcrowding, raise feeders and drinkers off the floor, and rotate anticoccidial feed programs.",
      np: "ओछ्यान सुक्खा र फुकालो राख्नुहोस्, भीडभाड नगर्नुहोस्, दाना-पानीका भाँडो जमिनबाट माथि राख्नुहोस्, र औषधि मिश्रित दाना क्रमशः फेर्दै जानुहोस्।",
    },
  },
];

const SEVERITY_META: Record<
  Severity,
  { label: { en: string; np: string }; Icon: typeof OctagonAlert; classes: string }
> = {
  emergency: {
    label: { en: "Emergency — act today", np: "आपतकालीन — आजै कदम चाल्नुहोस्" },
    Icon: OctagonAlert,
    classes: "bg-red-50 text-red-700 border-red-200",
  },
  urgent: {
    label: { en: "Urgent — within 24 hours", np: "तत्काल — २४ घण्टाभित्र" },
    Icon: ShieldAlert,
    classes: "bg-amber-50 text-amber-700 border-amber-200",
  },
  watch: {
    label: { en: "Monitor & manage", np: "निगरानी र व्यवस्थापन" },
    Icon: CircleAlert,
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export function HealthGuide({ np }: { np: boolean }) {
  const [species, setSpecies] = useState<SpeciesId>("cattle");
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  /* Symptom chips relevant to the chosen species */
  const availableSymptoms = useMemo(() => {
    const ids = new Set<string>();
    CONDITIONS.filter((c) => c.species.includes(species)).forEach((c) =>
      c.symptoms.forEach((s) => ids.add(s))
    );
    return SYMPTOM_POOL.filter((s) => ids.has(s.id));
  }, [species]);

  /* Conditions for the species, ranked by how many selected signs they match */
  const matches = useMemo(() => {
    const list = CONDITIONS.filter((c) => c.species.includes(species));
    if (selected.length === 0) return list.map((c) => ({ cond: c, hit: [] as string[] }));
    return list
      .map((c) => ({
        cond: c,
        hit: c.symptoms.filter((s) => selected.includes(s)),
      }))
      .filter((m) => m.hit.length > 0)
      .sort((a, b) => {
        const sevRank = { emergency: 0, urgent: 1, watch: 2 } as const;
        if (b.hit.length !== a.hit.length) return b.hit.length - a.hit.length;
        return sevRank[a.cond.severity] - sevRank[b.cond.severity];
      });
  }, [species, selected]);

  const toggleSymptom = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const switchSpecies = (id: SpeciesId) => {
    setSpecies(id);
    setSelected([]);
    setExpanded(null);
  };

  const L = (en: string, nep: string) => (np ? nep : en);

  return (
    <div className="space-y-8">
      {/* Step 1 — species */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          {L("Step 1 — Which animal?", "चरण १ — कुन पशु?")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SPECIES.map(({ id, en, np: npLabel, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => switchSpecies(id)}
              aria-pressed={species === id}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-semibold transition-all ${
                species === id
                  ? "bg-[#0A2540] text-white border-[#0A2540] shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60 hover:text-[#0A2540]"
              }`}
            >
              <Icon size={17} className={species === id ? "text-[#D4AF37]" : "text-gray-400"} />
              {np ? npLabel : en}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — observed signs */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          {L("Step 2 — What do you see? (tap all that apply)", "चरण २ — के देख्नुभयो? (जे लाग्छ सबै थिच्नुहोस्)")}
        </p>
        <div className="flex flex-wrap gap-2">
          {availableSymptoms.map((s) => {
            const on = selected.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSymptom(s.id)}
                aria-pressed={on}
                className={`px-3.5 py-2 rounded-full border text-sm font-medium transition-all ${
                  on
                    ? "bg-[#D4AF37] text-[#0A2540] border-[#D4AF37] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#D4AF37]/60"
                }`}
              >
                {np ? s.np : s.en}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#B8941F] transition-colors"
          >
            <RotateCcw size={13} />
            {L("Clear selections", "चयन हटाउनुहोस्")}
          </button>
        )}
      </div>

      {/* Step 3 — matches */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          {selected.length === 0
            ? L("Common conditions for this species", "यो प्रजातिका सामान्य रोगहरू")
            : L("Possible matches", "सम्भावित मेलहरू")}
        </p>

        <div className="space-y-3">
          {matches.length === 0 && (
            <div className="rounded-xl bg-white border border-gray-200 px-5 py-6 text-center text-sm text-gray-500">
              {L(
                "No common pattern matched — describe the signs directly in a consultation.",
                "कुनै सामान्य बानी मेलिएन — लक्षण सिधै परामर्शमा भन्नुहोस्।"
              )}
            </div>
          )}

          {matches.map(({ cond, hit }) => {
            const meta = SEVERITY_META[cond.severity];
            const sevIcon = <meta.Icon size={14} />;
            const isOpen = expanded === cond.id;
            return (
              <div
                key={cond.id}
                className={`rounded-xl border bg-white overflow-hidden transition-shadow hover:shadow-md ${
                  cond.severity === "emergency" ? "border-red-200" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : cond.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-4 sm:px-5 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[#0A2540] text-sm sm:text-base leading-snug">
                        {np ? cond.name.np : cond.name.en}
                      </h4>
                      {hit.length > 0 && (
                        <p className="mt-1 text-xs text-gray-500">
                          {L("Matches", "मेल")}: {hit.length}/{cond.symptoms.length} ·{" "}
                          <span className="font-medium text-[#B8941F]">
                            {hit
                              .map((h) => {
                                const sym = SYMPTOM_POOL.find((p) => p.id === h)!;
                                return np ? sym.np : sym.en;
                              })
                              .join(", ")}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold whitespace-nowrap ${meta.classes}`}
                      >
                        {sevIcon}
                        <span className="hidden sm:inline">{np ? meta.label.np : meta.label.en}</span>
                        <span className="sm:hidden">
                          {cond.severity === "emergency"
                            ? L("Emergency", "आपतकालीन")
                            : cond.severity === "urgent"
                              ? L("Urgent", "तत्काल")
                              : L("Monitor", "निगरानी")}
                        </span>
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-gray-100">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#B8941F] mb-1.5">
                            {L("About", "जानकारी")}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {np ? cond.about.np : cond.about.en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-red-600 mb-1.5">
                            {L("Immediate care", "तत्कालका लागि गर्नुपर्ने काम")}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {np ? cond.immediate.np : cond.immediate.en}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-1.5">
                            {L("Prevention", "रोकथाम")}
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {np ? cond.prevention.np : cond.prevention.en}
                          </p>
                        </div>
                        <Link
                          to="/booking"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                          <CalendarCheck size={15} />
                          {L("Book a consultation about this", "यसबारे परामर्श बुक गर्नुहोस्")}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational disclaimer */}
      <div className="rounded-xl bg-[#0A2540]/[0.04] border border-[#0A2540]/10 px-4 py-3.5 flex items-start gap-3">
        <Stethoscope className="text-[#B8941F] flex-shrink-0 mt-0.5" size={17} />
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {L(
            "This guide is an educational triage built from field experience — it is not a diagnosis. Severity colouring reflects typical disease behaviour; final judgement always needs a hands-on examination. In emergencies contact your nearest livestock service centre or Dr. Shah directly.",
            "यो मार्गदर्शन क्षेत्रअनुभवबाट तयार गरिएको शैक्षिक सहायक हो — यो निदान होइन। रङले रोगको सामान्य प्रकृति देखाउँछ; अन्तिम निर्णय प्रत्यक्ष जाँचबाट मात्र हुन्छ। आपतकालीन अवस्थामा नजिकैको पशु सेवा केन्द्र वा डा. शाहलाई सम्पर्क गर्नुहोस्।"
          )}
        </p>
      </div>
    </div>
  );
}

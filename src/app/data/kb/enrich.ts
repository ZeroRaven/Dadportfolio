import type { KBFact, KBChart } from "./types";

/**
 * ENRICHMENT MAP — factsheets & charts retro-fitted onto the original
 * 20 articles at merge time (index.ts), so every article carries a
 * technical factsheet even though the category files stay untouched.
 *
 * All figures re-verified against the sources named in each article.
 */
export const ENRICH: Record<string, { facts?: KBFact[]; chart?: KBChart }> = {
  "vaccination-schedule": {
    facts: [
      { label: { en: "FMD", np: "खुरा रोग" }, value: { en: "every 6 months", np: "हरेक ६ महिना" }, note: { en: "spring & autumn rounds", np: "बसन्त र शरद अभियान" } },
      { label: { en: "HS (ghate)", np: "घाँटे रोग" }, value: { en: "every 12 months", np: "हरेक १२ महिना" } },
      { label: { en: "Anthrax", np: "एन्थ्राक्स" }, value: { en: "every 12 months", np: "हरेक १२ महिना" }, note: { en: "high-risk pockets", np: "जोखिमयुक्त खाल्डा" } },
      { label: { en: "PPR (goats)", np: "पिपिआर (बाख्रा)" }, value: { en: "every 12 months", np: "हरेक १२ महिना" } },
      { label: { en: "Deworming", np: "कृमिनाशक" }, value: { en: "every 3–4 months", np: "हरेक ३–४ महिना" }, note: { en: "monsoon start & end critical", np: "मनसुनको सुरु-अन्त्य महत्त्वको" } },
    ],
    chart: {
      title: { en: "Revaccination interval by programme", np: "कार्यक्रमअनुसार दोहोर्‍याउने अन्तराल" },
      unit: { en: "months", np: "महिना" },
      source: "Standard Nepali (DLS) vaccination calendar — see the Vaccination Reminder tool to generate yours.",
      data: [
        { label: { en: "Deworming", np: "कृमिनाशक" }, value: 3 },
        { label: { en: "FMD", np: "खुरा रोग" }, value: 6 },
        { label: { en: "HS", np: "घाँटे" }, value: 12 },
        { label: { en: "Anthrax", np: "एन्थ्राक्स" }, value: 12 },
        { label: { en: "PPR", np: "पिपिआर" }, value: 12 },
      ],
    },
  },
  "sick-animal-early-signs": {
    facts: [
      { label: { en: "Normal rectal temp — cattle", np: "सामान्य ताप — गाई" }, value: { en: "38.0–39.3 °C", np: "३८.०–३९.३ डिग्री" } },
      { label: { en: "Normal — goats", np: "सामान्य — बाख्रा" }, value: { en: "38.5–40.0 °C", np: "३८.५–४०.० डिग्री" } },
      { label: { en: "Normal — poultry", np: "सामान्य — कुखुरा" }, value: { en: "40.6–41.7 °C", np: "४०.६–४१.७ डिग्री" } },
      { label: { en: "Golden window", np: "सुनौलो झ्याल" }, value: { en: "first 24–48 h", np: "पहिलो २४–४८ घण्टा" }, note: { en: "call the vet early, treat cheaply", np: "चिकित्सक चाँडै बोलाउँदा उपचार सस्तो" } },
    ],
  },
  "biosecurity-small-farm": {
    facts: [
      { label: { en: "Quarantine period", np: "क्वारेन्टिन अवधि" }, value: { en: "21–30 days", np: "२१–३० दिन" }, note: { en: "for every purchased animal", np: "हरेक किनेको पशुका लागि" } },
      { label: { en: "Boots & hands", np: "जुत्ता र हात" }, value: { en: "wash between pens", np: "कुथबीच धुनु" } },
      { label: { en: "Sick-pen rule", np: "बिरामी-कुठ नियम" }, value: { en: "handle sick LAST", np: "बिरामीलाई अन्तिममा चलाउनु" } },
      { label: { en: "Visitors", np: "पाहुना" }, value: { en: "foot-dip or clean boots", np: "खुट्टा-डुब वा सफा जुत्ता" } },
    ],
  },
  "calf-care": {
    facts: [
      { label: { en: "First colostrum", np: "पहिलो खोलोस्ट्रम" }, value: { en: "within 2–6 hours", np: "२–६ घण्टाभित्र" }, note: { en: "gut absorption closes by ~24 h", np: "आँतको सोख ~२४ घण्टामा बन्द हुन्छ" } },
      { label: { en: "Colostrum volume", np: "खोलोस्ट्रमको मात्रा" }, value: { en: "≈10% of body weight in 24 h", np: "२४ घण्टामा तौलको करिब १०%" } },
      { label: { en: "Milk feeding", np: "दुध खुवाउने" }, value: { en: "10–15% BW/day", np: "दिनको तौलको १०–१५%" }, note: { en: "two equal feeds at body warmth", np: "शरीरको तापका दुई बराबर खुराक" } },
      { label: { en: "Weaning", np: "दुध छुटाउने" }, value: { en: "3–4 months", np: "३–४ महिना" }, note: { en: "when eating 1 kg starter/day", np: "दिनको १ केजी स्टार्टर खान थालेपछि" } },
    ],
  },
  "dairy-buffalo-feeding": {
    facts: [
      { label: { en: "Dry matter daily", np: "दैनिक सुक्खा पदार्थ" }, value: { en: "2.5–3% of body weight", np: "शरीर तौलको २.५–३%" }, note: { en: "FAO benchmark for dairy stock", np: "दुग्ध पशुको FAO कसरत" } },
      { label: { en: "400 kg buffalo", np: "४०० केजी भैंसी" }, value: { en: "10–12 kg DM/day", np: "दिनको १०–१२ केजी सुक्खा" } },
      { label: { en: "Green:fibre balance", np: "हरियो:सुक्खा सन्तुलन" }, value: { en: "bulk from green fodder", np: "भरिमा हरियो चारा" }, note: { en: "concentrate tops up production", np: "दाना उत्पादनको थप" } },
      { label: { en: "Water", np: "पानी" }, value: { en: "4–4.5 L per kg milk", np: "प्रति केजी दुध ४–४.५ लि." }, note: { en: "see the Water tool", np: "पानी औजार हेर्नुहोस्" } },
    ],
    chart: {
      title: { en: "Daily dry matter by animal (kg)", np: "पशुअनुसार दैनिक सुक्खा पदार्थ (केजी)" },
      unit: { en: "kg DM / day", np: "केजी सुक्खा / दिन" },
      source: "FAO benchmark 2.5–3% of live weight — bars show mid-range values.",
      data: [
        { label: { en: "Buffalo 400 kg", np: "भैंसी ४०० केजी" }, value: 11 },
        { label: { en: "Cow 350 kg", np: "गाई ३५० केजी" }, value: 9.5 },
        { label: { en: "Goat 30 kg", np: "बाख्रा ३० केजी" }, value: 0.8 },
      ],
    },
  },
  "milking-hygiene-mastitis": {
    facts: [
      { label: { en: "Strip-cup test", np: "स्ट्रिप-कप जाँच" }, value: { en: "every milking", np: "हरेक दुहुने बेला" }, note: { en: "first 3 squirts per quarter", np: "हरेक भागका पहिलो ३ चुस्का" } },
      { label: { en: "Teat dip", np: "थन डुबाउने" }, value: { en: "after every milking", np: "हरेक दुहुनेपछि" } },
      { label: { en: "CMT screen", np: "सिएमटी जाँच" }, value: { en: "monthly", np: "मासिक" }, note: { en: "California Mastitis Test", np: "क्यालिफोर्निया म्यास्टाइटिस जाँच" } },
      { label: { en: "Order of milking", np: "दुहुने क्रम" }, value: { en: "healthy cows first", np: "स्वस्थ गाई पहिले" }, note: { en: "suspect quarter last or never", np: "शङ्कास्पद भाग अन्तिम वा कहिल्यै होइन" } },
    ],
  },
  "starting-goat-farm": {
    facts: [
      { label: { en: "Shed space", np: "गोठको ठाउँ" }, value: { en: "1–1.5 m²/adult", np: "वयस्कका १–१.५ वर्ग मि." } },
      { label: { en: "Khari share", np: "खरीको हिस्सा" }, value: { en: "≈half of national herd", np: "राष्ट्रिय बथानको करिब आधा" }, note: { en: "the hill workhorse", np: "पहाडको मेहनती" } },
      { label: { en: "Starter herd", np: "सुरुको बथान" }, value: { en: "5+1 or 10+2", np: "५+१ वा १०+२" }, note: { en: "does + buck — learn cheaply", np: "पाठी + बोका — सस्तो सिकाइ" } },
      { label: { en: "Floor", np: "फिलिङ" }, value: { en: "raised slatted", np: "उठाइएको फट्याङ" }, note: { en: "droppings fall through", np: "गुँड तल झर्छ" } },
    ],
  },
  "goat-health-calendar": {
    facts: [
      { label: { en: "Deworm timing", np: "कृमिनाशक समय" }, value: { en: "monsoon start & end", np: "मनसुनको सुरु र अन्त्य" }, note: { en: "larvae peak with grass", np: "घाँससँगै लार्भा चरम" } },
      { label: { en: "PPR vaccine", np: "पिपिआर खोप" }, value: { en: "annual", np: "वार्षिक" } },
      { label: { en: "Hooves", np: "खुट्टा" }, value: { en: "trim when curling", np: "बङ्गिँदा काट्नु" }, note: { en: "wet floors soften first", np: "भिजेको फिलिङले पहिले नरम पार्छ" } },
      { label: { en: "Pregnant does", np: "गर्भवती पाठी" }, value: { en: "vet-approved products only", np: "डाक्टर स्वीकृत औषधि मात्र" } },
    ],
  },
  "poultry-basics": {
    facts: [
      { label: { en: "Brooding temp, week 1", np: "ब्रुडिङ ताप, पहिलो हप्ता" }, value: { en: "32–35 °C", np: "३२–३५ डिग्री" }, note: { en: "drop ~3 °C weekly to 21 °C", np: "हप्तैपिच्छे ~३ डिग्री घटाई २१ सम्म" } },
      { label: { en: "Water before feed", np: "आहारअघि पानी" }, value: { en: "always", np: "सधैँ" } },
      { label: { en: "Litter", np: "बिस्तारा" }, value: { en: "dry rice-husk", np: "सुक्खा भुस" }, note: { en: "caked litter breeds disease", np: "ढेकेको बिस्तारामा रोग पलाउँछ" } },
      { label: { en: "Best feed conversion", np: "सबैभन्दा राम्रो दाना-रूपान्तरण" }, value: { en: "youth of the flock", np: "बथानको कलिलो उमेर" }, note: { en: "FCR worsens with age", np: "उमेरसँगै एफसिआर बिग्रन्छ" } },
    ],
  },
  "ranikhet-vaccination": {
    facts: [
      { label: { en: "Cause", np: "कारण" }, value: { en: "Newcastle disease virus", np: "न्यूकासल रोग भाइरस" } },
      { label: { en: "Unvaccinated flocks", np: "खोप नगरिएको बथान" }, value: { en: "mortality can be near-total", np: "मृत्यु लगभग पूरै हुन सक्छ" } },
      { label: { en: "Spread", np: "सर्ने तरिका" }, value: { en: "air, feed, water, visitors", np: "हावा, आहार, पानी, पाहुना" } },
      { label: { en: "Protection", np: "सुरक्षा" }, value: { en: "vaccination + biosecurity", np: "खोप + जैविक सुरक्षा" } },
    ],
  },
  "paddy-nepal": {
    facts: [
      { label: { en: "Record production", np: "कीर्तिमान उत्पादन" }, value: { en: "≈5.6 M t", np: "करिब ५६ लाख टन" }, note: { en: "2019/20, MoALD SINA", np: "२०१९/२०, MoALD SINA" } },
      { label: { en: "Record area", np: "कीर्तिमान क्षेत्रफल" }, value: { en: "≈1.47 M ha", np: "करिब १४.७ लाख हे." } },
      { label: { en: "National yield", np: "राष्ट्रिय उत्पादकत्व" }, value: { en: "≈3.8 t/ha", np: "करिब ३.८ टन/हे." } },
      { label: { en: "2021 dip", np: "२०२१ को ओरालो" }, value: { en: "5.13 M t", np: "५१.३ लाख टन" }, note: { en: "unseasonal rain losses", np: "समय नमिलेको वर्षाको क्षति" } },
    ],
    chart: {
      title: { en: "Nepal's big-three cereals (M t)", np: "नेपालका तीन ठूला अन्न (लाख टन)" },
      unit: { en: "million tonnes", np: "लाख टन" },
      source: "MoALD SINA (paddy & maize, record year); USDA FAS / Kafle et al. 2024 (wheat).",
      data: [
        { label: { en: "Paddy", np: "धान" }, value: 5.6 },
        { label: { en: "Maize", np: "मकै" }, value: 3.0 },
        { label: { en: "Wheat", np: "गहुँ" }, value: 2.1 },
      ],
    },
  },
  "maize-nepal": {
    facts: [
      { label: { en: "Production", np: "उत्पादन" }, value: { en: "≈3.0 M t", np: "करिब ३० लाख टन" }, note: { en: "MoALD SINA", np: "MoALD SINA" } },
      { label: { en: "Area", np: "क्षेत्रफल" }, value: { en: "≈0.98 M ha", np: "करिब ९.८ लाख हे." } },
      { label: { en: "Feed share", np: "दानाको हिस्सा" }, value: { en: "≈two-thirds", np: "करिब दुई तिहाइ" }, note: { en: "the poultry engine's fuel", np: "कुखुरा इन्जिनको इन्धन" } },
      { label: { en: "Terai vs hills", np: "तराई र पहाड" }, value: { en: "Terai leads yield", np: "उत्पादकत्वमा तराई अगुवा" }, note: { en: "hills keep the largest area", np: "क्षेत्रफल पहाडमा ठूलो" } },
    ],
  },
  "wheat-winter-crops": {
    facts: [
      { label: { en: "Production", np: "उत्पादन" }, value: { en: "≈2.1 M t", np: "करिब २१ लाख टन" }, note: { en: "USDA FAS; Kafle et al. 2024: 2,144,568 t", np: "USDA FAS; Kafle et al. 2024: २१,४४,५६८ टन" } },
      { label: { en: "Sowing window", np: "रोप्ने झ्याल" }, value: { en: "late Oct–Nov", np: "अक्टोबर अन्त्य–नोभेम्बर" } },
      { label: { en: "Harvest", np: "काट्ने" }, value: { en: "Mar–Apr", np: "मार्च–अप्रिल" }, note: { en: "before the pre-monsoon", np: "मनसुनअघि नै" } },
      { label: { en: "Top districts", np: "अग्र जिल्ला" }, value: { en: "Terai wheat baskets", np: "तराईका गहुँ गढ" }, note: { en: "Banke, Bardiya, Kailali & neighbours", np: "बाँके, बार्दिया, कैलाली र छिमेकी" } },
    ],
  },
  "millet-buckwheat": {
    facts: [
      { label: { en: "Finger millet production", np: "कोदोको उत्पादन" }, value: { en: "≈0.3 M t", np: "करिब ३ लाख टन" }, note: { en: "≈0.2 M ha — hardy marginal land", np: "करिब २ लाख हे. — कठोर सीमान्त जमिन" } },
      { label: { en: "Buckwheat", np: "फापर" }, value: { en: "≈0.1 M t", np: "करिब १ लाख टन" }, note: { en: "high-hill staple & bee forage", np: "उच्चपहाडी अन्न र मौरी चरन" } },
      { label: { en: "Climate fit", np: "जलवायु मिलान" }, value: { en: "drought-tolerant", np: "सुक्खा-सह्य" }, note: { en: "the re-valued climate crop", np: "पुनः मूल्याङ्कित जलवायु बाली" } },
    ],
  },
  "fodder-systems-nepal": {
    facts: [
      { label: { en: "Napier cut interval", np: "नेपियर काट्ने अन्तराल" }, value: { en: "40–60 days", np: "४०–६० दिन" } },
      { label: { en: "Fodder trees", np: "चारा विरुवा" }, value: { en: "first cut ~3–4 years", np: "पहिलो काट ~३–४ वर्षमा" }, note: { en: "then seasonal lopping", np: "अनि मौसमी काँटो" } },
      { label: { en: "Winter gap", np: "जाडोको खाडल" }, value: { en: "oat + vetch", np: "ओट + भेच" }, note: { en: "the classic cover forage", np: "प्राचीन ढाक्ने चारा" } },
      { label: { en: "Planting density", np: "रोपाइँ घनत्व" }, value: { en: "slope lines by contour", np: "ढालमा बराबर लाइन" }, note: { en: "erosion control doubles", np: "क्षय नियन्त्रण दोब्बर" } },
    ],
  },
  "silage-hay": {
    facts: [
      { label: { en: "Silage moisture", np: "सिलेज ओसार" }, value: { en: "≈60–70%", np: "करिब ६०–७०%" }, note: { en: "chop to 2–3 cm", np: "२–३ सेमी. काट्नु" } },
      { label: { en: "Sealed before opening", np: "खोल्नुअघि बन्द राख्ने" }, value: { en: "3–6 weeks", np: "३–६ हप्ता" } },
      { label: { en: "Hay safe storage", np: "हे सुरक्षित भण्डारण" }, value: { en: "<15% moisture", np: "ओसार १५% मुनि" }, note: { en: "mould & fire prevention", np: "ढुसी-आगो रोकथाम" } },
      { label: { en: "Feed-out face", np: "खुवाउने सतह" }, value: { en: "≥30 cm/day", np: "दिनको ३० सेमी. अघि" }, note: { en: "or spoilage wins", np: "नत्र बिग्राइ जित्छ" } },
    ],
  },
  "climate-change-livestock-nepal": {
    facts: [
      { label: { en: "Nepal warming rate", np: "नेपाल ताप वृद्धि दर" }, value: { en: "+0.056 °C/year", np: "प्रतिवर्ष +०.०५६ डिग्री" }, note: { en: "DHM analyses; faster in high mountains", np: "DHM विश्लेषण; हिमालमा अझ छिटो" } },
      { label: { en: "Buffalo milk share", np: "भैंसी दुधको हिस्सा" }, value: { en: "≈64%", np: "करिब ६४%" }, note: { en: "Poudel et al. 2020, Vaccines 8:322", np: "Poudel et al. 2020, Vaccines 8:322" } },
      { label: { en: "Heat-stress watch", np: "गर्मी-तनाव सतर्कता" }, value: { en: "shade + water + evening milking", np: "छहारी + पानी + बेलुका दुहुने" } },
      { label: { en: "Agriculture in GDP", np: "GDP मा कृषि" }, value: { en: "≈22%", np: "करिब २२%" }, note: { en: "FEWS NET, 2026", np: "FEWS NET, 2026" } },
    ],
  },
  "climate-smart-crops": {
    facts: [
      { label: { en: "Cheapest water tech", np: "सस्तो पानी प्रविधि" }, value: { en: "mulch", np: "मल्च" }, note: { en: "cuts evaporation & weeds at once", np: "वाष्प र झार एकैसाथ घटाउँछ" } },
      { label: { en: "SRI rice", np: "एसआरआई धान" }, value: { en: "less seed & water", np: "कम बीउ र पानी" }, note: { en: "double-digit yield gains reported", np: "दुई-अंक उत्पादन वृद्धि प्रतिवेदन" } },
      { label: { en: "Agroforestry", np: "कृषि वानिकी" }, value: { en: "fodder trees on bunds", np: "कुलोमा चारा विरुवा" }, note: { en: "feed + shade + soil", np: "चारा + छहारी + माटो" } },
      { label: { en: "Drought pivot", np: "सुक्खा चुङ्गा" }, value: { en: "millet & short-duration maize", np: "कोदो र छोटो-अवधि मकै" } },
    ],
  },
  "farm-records": {
    facts: [
      { label: { en: "Daily rows", np: "दैनिक लाइन" }, value: { en: "milk · feed · health · births/deaths", np: "दुध · चारा · स्वास्थ्य · जन्म/मृत्यु" } },
      { label: { en: "Monthly close", np: "मासिक लेखा बन्द" }, value: { en: "one evening", np: "एक बेलुका" }, note: { en: "read the 3 numbers aloud", np: "तीन अंक बाठै पढ्नु" } },
      { label: { en: "Cost per litre", np: "प्रति लिटर खर्च" }, value: { en: "the killer metric", np: "मुख्य सूचक" }, note: { en: "divide total cost by litres", np: "कुल खर्चलाई लिटरले भाग गर्नु" } },
      { label: { en: "Retention", np: "सुरक्षण" }, value: { en: "photo of the book monthly", np: "महिनैमा कापीको फोटो" } },
    ],
  },
  "marketing-cooperatives": {
    facts: [
      { label: { en: "Cooperative edge", np: "सहकारी फाइदा" }, value: { en: "chilling + grading + transport", np: "चिलिङ + ग्रेडिङ + ढुवानी" } },
      { label: { en: "DDC collection", np: "डिडिसी सङ्कलन" }, value: { en: "≈60 M litres/yr", np: "करिब ६ करोड लिटर/वर्ष" } },
      { label: { en: "Milk price floor demanded", np: "माग गरिएको न्यूनतम दुध भाउ" }, value: { en: "NPR 70 /L", np: "रु. ७० प्रति लि." }, note: { en: "farmers' federations, 2026", np: "किसान महासङ्घ, २०२६" } },
      { label: { en: "Selling solo", np: "एक्लै बिक्री" }, value: { en: "passing collectors' price", np: "बाटोमा भेटिने क्रेताको भाउ" } },
    ],
  },
};

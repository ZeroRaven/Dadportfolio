import type { KBArticle } from "./types";

/**
 * NEW ARTICLES — batch 5 (researched 2026-09).
 *
 * Every figure re-verified during research:
 *  · Milk economics — farm-gate raw milk and the NPR 70/L minimum-price
 *    demand (Nepal News); retail buffalo milk NPR 80–120/L (2026 guide);
 *    DDC collects ≈60 M litres/year.
 *  · Water — 4–4.5 L water per kg of milk (Lely/extension literature);
 *    112–131 L/adult/day blue-water for Nepali dairy stock (Nepal study);
 *    lactating buffalo 80–120 L/day in summer.
 *  · Incubation — chicken 21 d at 37.8 °C, candling days 7 & 14, lockdown
 *    day 18, humidity 55–60% → 65–75% (poultry extension guides); duck 28 d,
 *    turkey 28 d, quail 17–18 d.
 *  · Off-season vegetables — Dhading tomato farm-gate NPR 20–30/kg vs
 *    Kathmandu retail NPR 80–120/kg (2026 market reporting).
 *  · Coffee — 41 mid-hill districts, 800–1,600 m; Gulmi district study
 *    ≈160 ha, ≈35 t green beans, ≈219 kg/ha.
 *  · Beekeeping — Apis mellifera migratory colonies ≈34.6 kg/hive
 *    (Chitwan study, 2018) vs ≈8 kg traditional hives; national average
 *    ≈4.15 kg/colony (HMG/N 2002).
 */
export const moreArticles: KBArticle[] = [
  /* ═════════════════════ cattle-buffalo ═════════════════════ */
  {
    id: "dairy-income-economics",
    categoryId: "cattle-buffalo",
    title: { en: "Dairy income: the real economics of a small herd", np: "दुग्ध आम्दानी: सानो बथानको साँचो अर्थतन्त्र" },
    summary: {
      en: "Milk income is arithmetic, not luck — litres per animal, the price your dairy pays, and the feed cost that quietly eats the margin.",
      np: "दुधको आम्दानी अंकगणित हो, भाग्य होइन — प्रति पशु लिटर, तपाईंको डेयरीले तिर्ने भाउ, र नाफामा चुपचाप खाइरहने चाराको खर्च।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Raw milk, farm gate", np: "कच्चा दुध, खेतैमा" }, value: { en: "NPR 55–70 /L", np: "रु. ५५–७० प्रति लि." }, note: { en: "farmers' federations demand a NPR 70 minimum", np: "किसान संघहरू रु. ७० न्यूनतम माग्दै" } },
      { label: { en: "Retail buffalo milk", np: "बजारमा भैंसीको दुध" }, value: { en: "NPR 80–120 /L", np: "रु. ८०–१२० प्रति लि." }, note: { en: "2026 market guides; branded milk NPR 100–150", np: "२०२६ बजार मार्गदर्शन; ब्रान्डेड रु. १००–१५०" } },
      { label: { en: "Feed as share of cost", np: "खर्चमा चाराको हिस्सा" }, value: { en: "60–70%", np: "६०–७०%" }, note: { en: "the lever that decides profit", np: "नाफा तय गर्ने चुङ्गा" } },
      { label: { en: "DDC annual collection", np: "डिडिसीको वार्षिक सङ्कलन" }, value: { en: "≈60 million litres", np: "करिब ६ करोड लिटर" }, note: { en: "one of several buyers — cooperatives buy far more", np: "एउटा क्रेता मात्र — सहकारीले झन् धेरै किन्छन्" } },
    ],
    chart: {
      title: { en: "A 2-buffalo model, monthly (illustrative)", np: "२ भैंसीको नमुना, मासिक (उदाहरण)" },
      unit: { en: "NPR / month", np: "रु. / महिना" },
      source: "Illustrative model — 10 L/day × NPR 65 × 30 days; feed ≈ NPR 300/animal/day. Edit with your own numbers using the Dairy Income tool.",
      data: [
        { label: { en: "Milk income (10 L/day)", np: "दुध आम्दानी (दिनको १० लि.)" }, value: 19500 },
        { label: { en: "Feed cost", np: "चाराको खर्च" }, value: 12000 },
        { label: { en: "Other costs", np: "अन्य खर्च" }, value: 2500 },
        { label: { en: "Net margin", np: "कुल नाफा" }, value: 5000 },
      ],
    },
    sections: [
      {
        heading: { en: "Three numbers that decide everything", np: "सबै तय गर्ने तीन अंक" },
        body: {
          en: "Track litres per animal per day, the price your dairy actually pays after fat deduction, and your true feed cost per litre. Most small dairy farms in Nepal discover their margin only at year-end — and by then a single under-priced month or an over-bought feed lot has already eaten it. Write the three numbers on one page every month: production, price received, feed spent.",
          np: "प्रति पशु दिनको लिटर, बोसो कटौतीपछि तपाईंको डेयरीले साँचै तिर्ने भाउ, र प्रति लिटरमा तपाईंको साँचो चारा खर्च — यी तीन अंक ट्र्याक गर्नुहोस्। नेपालका धेरै साना डेयरी फार्मले नाफा वर्षको अन्त्यमा मात्र थाहा पाउँछन् — त्यतिबेलासम्ममा एक महिनाको कम भाउ वा धेरै किनेको चाराले नाफा खाइसकेको हुन्छ। तीन अंक हरेक महिना एक पानामा लेख्नुहोस्: उत्पादन, पाएको भाउ, चारामा गरेको खर्च।",
        },
        bullets: [
          { en: "One buffalo at 5 L/day is a different business from the same buffalo at 8 L/day — breeding and feeding decide which one you own.", np: "५ लिटर दिने भैंसी र उही भैंसी ८ लिटर दिनु फरक व्यवसाय हो — कुन चलाउने, प्रजनन र आहारले तय गर्छ।" },
          { en: "Fat-based pricing rewards evening-milk consistency — skip the afternoon and the monthly average drops twice.", np: "बोसो-आधारित भाउले बेलुकाको दुधको नियमिततालाई इनाम दिन्छ — बेलुका छुटाउँदा मासिक औसत दोब्बर घट्छ।" },
          { en: "Feed bought on credit at festival-time prices is the classic silent loss.", np: "चाडपर्वको बेला ऋणमा किनेको चारा नै चुपचाप घाटाको सामान्य कारण हो।" },
        ],
      },
      {
        heading: { en: "The margin levers, in order", np: "नाफाका चुङ्गा, क्रमैसँग" },
        body: {
          en: "Cheapest lever first: cut feed wastage — a feeding trough and chopping roughage typically recover 10–15% of what animals walk over. Second: grow your own green fodder on even a small plot; every kilo of home-grown Napier or fodder-tree leaf replaces purchased concentrate at several times its cost. Third: negotiate price as a group — cooperative chilling hubs consistently pay better than solo selling to passing collectors.",
          np: "पहिलो सस्तो चुङ्गा: चाराको बर्बादी रोक्नुहोस् — दान्रो र काटेको सुक्खा चारा हाल्ने ट्रफले जुन चारा पशुले किच्छ, त्यसको १०–१५% फिर्ता ल्याउँछ। दोस्रो: सानो जग्गामा पनि आफ्नै हरियो चारा उब्जाउनुहोस्; घरै उब्जाएको हरेक केजी नेपियर वा चारा-विरुवाको पात किनेको दानालाई कयौँ गुणा महँगो वस्तु ठानेर प्रतिस्थापन गर्छ। तेस्रो: समूहै भाउ पाटी गर्नुहोस् — सहकारी चिलिङ हब आफै बिक्री गर्नेभन्दा निरन्तर राम्रो भुक्तानी दिन्छन्।",
        },
      },
      {
        heading: { en: "Run it before you build it", np: "बनाउनुअघि चलाएर हेर्नुहोस्" },
        body: {
          en: "Use the Dairy Income tool on this site before buying animals: enter your realistic litres, your dairy's current rate and your feed plan, and read the monthly and yearly margin. If the margin is thin at today's price, ask what changes at festival prices — and decide whether your family bank can carry a dry-month gap of two months.",
          np: "पशु किन्नुअघि यो साइटको दुग्ध आम्दानी औजार चलाउनुहोस्: आफ्नो वास्तविक लिटर, डेयरीको हालको दर र चारा योजना हाल्नुहोस्, मासिक-वार्षिक नाफा पढ्नुहोस्। आजको भाउमा नाफा पातलो भए चाडपर्वको भाउमा के फर्छ, सोच्नुहोस् — र दुई महिनाको सुक्खा-अन्तराल तपाईंको घरको बचतले थाम्न सक्छ कि सक्दैन, निर्णय गर्नुहोस्।",
        },
      },
    ],
    tip: {
      en: "One evening a month, close the books with the family — read the three numbers aloud. Farms that do this catch a slipping margin within weeks, not seasons.",
      np: "महिनैमा एक बेलुका परिवारसँग लेखा बन्द गर्नुहोस् — तीन अंक बाठै पढ्नुहोस्। यो गर्ने फार्मले ओर्लिरहेको नाफा हप्तामै थाहा पाउँछन्, मौसुम लागेर होइन।",
    },
    sources: "Raw milk price and NPR 70 minimum demand (Nepal News reporting); retail buffalo milk NPR 80–120/L (2026 market guides); DDC ≈60 M L/year collection (DDC reporting). Model numbers are illustrative and editable in the Dairy Income tool.",
    updated: "2026-09",
  },
  {
    id: "water-for-dairy",
    categoryId: "cattle-buffalo",
    title: { en: "Water for dairy animals — the forgotten feed", np: "दुग्ध पशुको पानी — बिर्सिइएको आहार" },
    summary: {
      en: "A lactating buffalo drinks a bathtub of water a day in summer — short water silently shows up as lost litres before it ever looks like thirst.",
      np: "दुध दिने भैंसीले गर्मीमा दिनको एउटा टब भरि पानी पिउँछ — पानीको कमी तिर्खी देखिनुअघि नै गुमेका लिटरका रूपमा चुपचाप देखा पर्छ।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Water per kg of milk", np: "प्रति केजी दुधको पानी" }, value: { en: "4–4.5 L", np: "४–४.५ लि." }, note: { en: "on top of maintenance needs", np: "शरीरको आधारभूत आवश्यकतामाथि" } },
      { label: { en: "Lactating buffalo, summer", np: "दुध दिने भैंसी, गर्मीमा" }, value: { en: "80–120 L/day", np: "८०–१२० लि./दिन" }, note: { en: "heat pushes the top of the range", np: "गर्मीले माथिल्लो सीमा तान्छ" } },
      { label: { en: "Nepali dairy stock, measured", np: "नेपाली दुग्ध पशु, मापन" }, value: { en: "112–131 L/adult/day", np: "११२–१३१ लि./वयस्क/दिन" }, note: { en: "total drinking water, farm study", np: "कुल पिउने पानी, फार्म अध्ययन" } },
      { label: { en: "Dry cow / growing cattle", np: "सुक्खी गाई / हुर्कंदै गाई" }, value: { en: "30–60 L/day", np: "३०–६० लि./दिन" } },
      { label: { en: "Goats & sheep", np: "बाख्रा र भेडा" }, value: { en: "4–10 L/day", np: "४–१० लि./दिन" } },
    ],
    chart: {
      title: { en: "Typical daily drinking water by animal", np: "पशुअनुसार दैनिक पिउने पानी (सामान्य)" },
      unit: { en: "litres / day", np: "लिटर / दिन" },
      source: "Lactating buffalo 80–120 L (summer); lactating cow ≈ maintenance + 4.5 L per kg milk; dry stock and small ruminants from livestock extension literature.",
      data: [
        { label: { en: "Lactating buffalo (summer)", np: "दुध दिने भैंसी (गर्मी)" }, value: 100 },
        { label: { en: "Lactating cow (10 L milk)", np: "दुध दिने गाई (१० लि. दुध)" }, value: 75 },
        { label: { en: "Dry cow", np: "सुक्खी गाई" }, value: 45 },
        { label: { en: "Goat / sheep", np: "बाख्रा / भेडा" }, value: 7 },
        { label: { en: "Layer hen", np: "लेयर मुरी" }, value: 0.3 },
      ],
    },
    sections: [
      {
        heading: { en: "Why water loss becomes milk loss", np: "पानीको कमी दुधको कमी किन बन्छ" },
        body: {
          en: "Milk is roughly 87% water, and a dairy animal prioritises her bloodstream over the milk bucket: restrict intake by even 10% and production can dip noticeably within days, while the animal still looks normal at the shed. Clean, cool, always-available water is the cheapest milk you will ever buy — a trough sized for the whole herd, refilled twice daily, shaded from the sun so it never turns into hot soup at noon.",
          np: "दुध करिब ८७% पानी हो, र दुग्ध पशुले दुधको बाल्टिनभन्दा रगतलाई प्राथमिकता दिन्छे: पानी १०% मात्र कम गर्दा पनि उत्पादन दिनहरूमै देखिने गरी घट्न सक्छ, तर पशु गोठमा भने सामान्यै देखिन्छ। सफा, चिसो, सधैँ उपलब्ध पानी तपाईंले कहिल्यै किन्ने सबैभन्दा सस्तो दुध हो — पूरै बथानका लागि मापदण्डको ट्रफ, दिनको दुई पटक भरिने, घामबाट छाइएको ताकि दिउँसो तातो सुप नबनोस्।",
        },
        bullets: [
          { en: "Two waterings a day is a scarcity plan, not a dairy plan — ad-lib access changes intake entirely.", np: "दिनको दुई पटक पानी अभावको योजना हो, डेयरीको होइन — सधैँ-उपलब्ध पहुँचले खपतै बदलिन्छ।" },
          { en: "Dirty water spreads the same dung-borne infections you pay to vaccinate against.", np: "फोहोर पानीले त्यही गोबरबाट सर्ने संक्रमण फैल्याउँछ, जसविरुद्ध खोपमा खर्च गर्नुहुन्छ।" },
          { en: "In frost pockets, break ice each winter morning — winter water matters as much as summer's.", np: "तुसारो क्षेत्रमा जाडोको बिहान बरफ फुटाउनुहोस् — जाडोको पानी गर्मीको जत्तिकै महत्त्वको हुन्छ।" },
        ],
      },
      {
        heading: { en: "Sizing supply for the whole year", np: "पूरै वर्षको आपूर्ति नाप्नु" },
        body: {
          en: "Plan for the hardest week — late dry season, herd at full lactation — not the average month. A six-animal buffalo dairy can need over 600 litres of drinking water at the peak, before washing the shed and the utensils doubles the total again. Springs, ponds and piped schemes all fail at different times of year; the farms that keep milking through the dry months are the ones with a stored reserve and a second source.",
          np: "औसत महिना होइन, सबैभन्दा कठिन हप्ता — ढिलो सुक्खायाम, बथान पूर्ण दुधावस्थामा — का लागि योजना बनाउनुहोस्। छ पशुको भैंसी डेयरीले चरममा ६०० लिटरभन्दा बढी पिउने पानी माग्न सक्छ, गोठ-भाँडा धुने थपे त्यो दोब्बर फेरि बढ्छ। मुहान, पोखरी र पाइप योजना वर्षका फरक-फरक समयमा फेल हुन्छन्; सुक्खा महिनामा पनि दुध दिइरहने फार्म भनेकै भण्डारण र दोस्रो स्रोत भएका हुन्।",
        },
      },
      {
        heading: { en: "Test it yourself", np: "आफैँ जाँच्नुहोस्" },
        body: {
          en: "One week, measure the trough's refill volume morning and evening for each pen, and write the daily total next to the day's milk in your record book. The water-for-milk link in your own shed will be more convincing than any table in any article — including this one.",
          np: "एक हप्ता हरेक कुथको ट्रफमा बिहान-बेलुका भरिएको पानी नापेर दैनिक जम्मा त्यही दिनको दुधसँगै अभिलेख कापीमा लेख्नुहोस्। तपाईंकै गोठको पानी-दुध सम्बन्ध कुनै पनि लेखको तालिकाभन्दा बढी ठोस हुनेछ — यो लेख सहित।",
        },
      },
    ],
    tip: {
      en: "The Water Requirement tool on this site turns your herd list into a litres-per-day figure and a storage target — run it before the dry season, not during.",
      np: "यो साइटको पानी आवश्यकता औजारले तपाईंको बथान सूचीलाई दिनको लिटर र भण्डारण लक्षमा बदलिदिन्छ — सुक्खायाम सुरु हुँदै नपरी चलाउनुहोस्।",
    },
    sources: "4–4.5 L water per kg milk (dairy extension, Lely 2026); Nepali dairy livestock total drinking water 112–131 L/adult/day (published farm study); lactating buffalo 80–120 L/day in summer (livestock feeding charts, 2026).",
    updated: "2026-09",
  },
  /* ═════════════════════ goat-farming ═════════════════════ */
  {
    id: "khasi-fattening-dashain",
    categoryId: "goat-farming",
    title: { en: "Khasi finishing for Dashain", np: "दशैँका लागि खसी मोटो गराउने" },
    summary: {
      en: "The Dashain price peak rewards preparation ninety days early — buy, castrate, deworm and feed on the calendar, not on the mood of the market.",
      np: "दशैँको भाउ-चरमले ९० दिनअघिको तयारी इनाम दिन्छ — किन्ने, बनाउने, कृमिनाशक गर्ने र चारा दिने पात्रोले, बजारको मुडले होइन।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Finishing window", np: "मोटो गराउने अवधि" }, value: { en: "≈90–120 days", np: "करिब ९०–१२० दिन" }, note: { en: "before the festival", np: "चाडपर्वअघि" } },
      { label: { en: "Typical Khari gain", np: "खरीको सामान्य वृद्धि" }, value: { en: "60–100 g/day", np: "६०–१०० ग्राम/दिन" }, note: { en: "good feeding and parasite control", np: "राम्रो आहार र कृमि नियन्त्रणमा" } },
      { label: { en: "Price seasonality", np: "भाउको मौसमीपन" }, value: { en: "Yearly peak at Dashain", np: "दशैँमा वार्षिक चरम" }, note: { en: "then tapering through Tihar", np: "तिहारपछि ओरालो" } },
      { label: { en: "Buy-in timing", np: "किन्ने समय" }, value: { en: "≈3 months ahead", np: "करिब ३ महिना अघि" }, note: { en: "young males on spring grass", np: "बसन्तको घाँसमा तरुने खरी" } },
    ],
    sections: [
      {
        heading: { en: "The ninety-day engine", np: "९० दिनको इन्जिन" },
        body: {
          en: "A khasi (castrated male) converts feed to muscle and fat without the restlessness of entire males, which is why the trade pays a premium for the calm, evenly-finished animal. The engine room is unglamorous: deworm on arrival and again mid-period, feed protein-rich green fodder plus a measured concentrate, clean water always, and a dry raised floor so energy goes into weight rather than fighting damp and cold.",
          np: "खसी (बनाइएको पुरुष बाख्रा) बनाएपछि अर्कातिर लाग्ने चाहाना नहुँदा चारालाई मासु-बोसोमा बदलिदिन्छ, त्यसैले व्यापारले शान्त, राम्ररी मोटो भएको खसीलाई राम्रो भाउ तिर्छ। इन्जिन कोठा साधारण छ: आउनासाथ र बीचमा पटक कृमिनाशक, प्रोटिनयुक्त हरियो चारा मापिएको दानासँग, सधैँ सफा पानी, र सुक्खी उठाइएको फिलिङ ताकि ऊर्जा ओसार-चिसोसँग लड्नुको साटो तौलमा जाओस्।",
        },
        bullets: [
          { en: "Castrate early with the band method in the first weeks of life — late castration slows growth and risks the animal.", np: "बन्ड विधिबाट जन्मेकै पहिलो हप्तामुनि बनाउनुहोस् — ढिलो बनाइएमा वृद्धि घट्छ र जोखिम बढ्छ।" },
          { en: "Weigh with a tape monthly; a flat month means parasites, feed or water is silently wrong.", np: "महिनैपिच्छे फित्ताले नाप्नुहोस्; तौल थामिएको महिना भनेको कृमि, चारा वा पानीमध्ये के हो, चुपचाप गलत भएको हो।" },
          { en: "Sell live-weight where scales exist — eyeball pricing favours the buyer, not you.", np: "तौलघर भएको ठाउँमा तौलै बेच्नुहोस् — आँखैले तौल्ने चलन क्रेताको पक्षमा लाग्छ, तपाईंको होइन।" },
        ],
      },
      {
        heading: { en: "Avoiding the festival trap", np: "चाडको जालमा नपर्ने" },
        body: {
          en: "The classic loss is buying young stock at festival-inflated prices and finishing into the flat season. Reverse the calendar: purchase the moment grass flushes after the first monsoon rains, finish on the autumn flush, and sell into the Dashain demand that you studied in last year's notebook — not into the panic of the last week, when every other seller is also unloading.",
          np: "सामान्य घाटा यस्तो हुन्छ: चाडको महँगीमा तरुने बाख्रा किनेर भाउ ओरालिएको मौसुममा बेच्नु। पात्रो उल्टो बनाउनुहोस्: पहिलो मनसुनको वर्षापछि घाँस बालेपछि किन्नुहोस्, शरदको घाँसमा मोटो गराउनुहोस्, र गएको वर्षको कापीमा अध्ययन गरेको दशैँ मागमा बेच्नुहोस् — अरू सबै बेच्नेहरू पनि ओरालिइरहेको अन्तिम हप्ताको हडबडीमा होइन।",
        },
      },
    ],
    tip: {
      en: "Talk to two traders in Asar about their Dashain price expectations before you buy in Shrawan — information is cheaper than a mis-timed herd.",
      np: "साउनमा किन्नुअघि असारमै दुई व्यापारीसँग उनीहरूको दशैँ भाउको अनुमान सोध्नुहोस् — सूचना समय नमिलेको बथानभन्दा सस्तो पर्छ।",
    },
    sources: "Nepal goat market seasonality (Dashain price peak); castration practice and finishing growth rates from Nepali livestock extension literature; growth-rate band from NARC/NLRS goat research.",
    updated: "2026-09",
  },
  /* ═════════════════════ poultry ═════════════════════ */
  {
    id: "incubation-hatchery",
    categoryId: "poultry",
    title: { en: "Incubation & hatchery management", np: "अन्डा कलाउने र ह्याचरी व्यवस्थापन" },
    summary: {
      en: "Twenty-one days at 37.8 °C, eggs turned until day 18, humidity stepped up for lockdown — hatch success is procedure, not luck.",
      np: "३७.८ डिग्रीमा एक्काइस दिन, १८ औँ दिनसम्म अन्डा पल्टाउने, लकडाउनमा आर्द्रता बढाउने — कलाउने सफलता प्रक्रिया हो, भाग्य होइन।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Chicken incubation", np: "कुखुराको तापन" }, value: { en: "21 days at 37.8 °C", np: "२१ दिन, ३७.८ डिग्री" }, note: { en: "99.5 °F forced-air incubators", np: "फोर्स्ड-एयर इन्कुबेटरमा ९९.५ °F" } },
      { label: { en: "Humidity", np: "आर्द्रता" }, value: { en: "55–60% → 65–75%", np: "५५–६०% → ६५–७५%" }, note: { en: "step up at day 18–21 lockdown", np: "१८–२१ दिनको लकडाउनमा बढाउने" } },
      { label: { en: "Candling days", np: "प्रकाशमा जाँच्ने दिन" }, value: { en: "Day 7 & Day 14", np: "७ र १४ औँ दिन" }, note: { en: "remove clears and blood-rings", np: "खाली र रगत-घेरा भएका हटाउने" } },
      { label: { en: "Egg storage before setting", np: "राख्नुअघि भण्डारण" }, value: { en: "13–18 °C, ≤7 days", np: "१३–१८ डिग्री, ७ दिनभित्र" }, note: { en: "blunt-end up, gentle turning", np: "ठूलो टुप्पो माथि, हल्का पल्टाउने" } },
      { label: { en: "Other species", np: "अन्य प्रजाति" }, value: { en: "duck 28 · turkey 28 · quail 17–18 d", np: "हाँस २८ · टर्की २८ · बटाईसे १७–१८ दिन" } },
    ],
    chart: {
      title: { en: "Incubation period by species (days)", np: "प्रजातिअनुसार तापन अवधि (दिन)" },
      unit: { en: "days", np: "दिन" },
      source: "Poultry extension guides (forced-air incubation).",
      data: [
        { label: { en: "Chicken", np: "कुखुरा" }, value: 21 },
        { label: { en: "Duck", np: "हाँस" }, value: 28 },
        { label: { en: "Turkey", np: "टर्की" }, value: 28 },
        { label: { en: "Quail", np: "बटाईसे" }, value: 17 },
      ],
    },
    sections: [
      {
        heading: { en: "The three killers of a hatch", np: "कलाउने कामका तीन हत्यारा" },
        body: {
          en: "Temperature error, humidity error and stale eggs kill more chicks than any disease. A half-degree hot streak for a few hours leaves deformed legs; dry air shrinks the air-cell so chicks cannot pip; eggs older than a week lose hatchability day by day. Buy a second thermometer and verify the incubator against it — the built-in dial lies often enough to be legendary.",
          np: "तापक्रमको त्रुटि, आर्द्रताको त्रुटि र बासिला अन्डाले कुनै रोगभन्दा बढी चल्ली मार्छन्। आधा डिग्रीको ताप घण्टौँ रहँदा खुट्टा बङ्गिन्छ; सुक्खा हावाले एयर-सेल खुम्च्याउँछ र चल्लीले खोल फुटाउन सक्दैन; हप्तानाघेको अन्डाको कलाउने क्षमता दिनैपिच्छे घट्छ। दोस्रो थर्मोमिटर किनेर इन्कुबेटर जाँच गर्नुहोस् — भित्रैको डायल ठूलो साँचो बोल्न छाडेको चर्चा नै छ।",
        },
        bullets: [
          { en: "Turn eggs at least three times daily until day 18 — morning, noon, evening; hands clean.", np: "१८ औँ दिनसम्म दिनको कम्तीमा तीन पटक पल्टाउनुहोस् — बिहान, दिउँसो, बेलुका; हात सफा।" },
          { en: "At lockdown, stop turning, raise humidity, and leave the lid shut — curiosity cools the hatch.", np: "लकडाउनमा पल्टाउने बन्द, आर्द्रता बढाउने, र ढक बन्दै राख्नुहोस् — कौतुहलले ह्याचलाई चिसो बनाउँछ।" },
          { en: "Candle on day 7: a clear egg today is a smelly egg on day 21.", np: "७ औँ दिनमा प्रकाशमा हेर्नुहोस्: आजको पारदर्शी अन्डा भनेको २१ औँ दिनको गन्धे अन्डा हो।" },
        ],
      },
      {
        heading: { en: "Sourcing hatching eggs", np: "कलाउने अन्डा जुटाउने" },
        body: {
          en: "Hatch what the market wants: for village sales, hardy local-cross birds that forage; for meat, a known broiler parent line from a reputable hatchery — not the mixed tray a passing dealer calls 'imported'. Record the source, the batch, and the hatch percentage every single time; a hatchery that cannot tell you its numbers is buying its reputation from strangers.",
          np: "बजारले चाहेको कुरा नै कलाउनुहोस्: गाउँ बिक्रीका लागि खोज्ने स्थानीय-क्रस मासु; व्यावसायिक मासुका लागि भरपर्दो ह्याचरीको चिनिने ब्रोइलर-मातृवंश — गइरहेको व्यापारीले 'इम्पोर्टेड' भनेर बोलाउने मिसिलिएको ट्रे होइन। स्रोत, ब्याच र कलाउने प्रतिशत हरेक पटक अभिलेख गर्नुहोस्; आफ्ना अंक भन्न नसक्ने ह्याचरीले आफ्नो प्रतिष्ठा अजनबीबाट किनिरहेको हुन्छ।",
        },
      },
      {
        heading: { en: "Plan the calendar", np: "पात्रो बनाउनुहोस्" },
        body: {
          en: "Work backwards from sale date: 21 days incubation, 5–6 weeks brooding to feathering, then growing to market. Setting eggs for a Dashain chick sale means collecting hatching eggs in late Shrawan — which means your breeder flock was vaccinated and flush months earlier. The Incubation Calendar tool on this site does the date arithmetic, including candling and lockdown days.",
          np: "बिक्री मितिबाट पछाडि गन्नुहोस्: २१ दिन तापन, त्यसपछि प्वाँख नआउञ्जेल ५–६ हप्ता ब्रुडिङ, अनि बजारतयार हुने वृद्धि। दशैँमा चल्ली बेच्ने भने श्रावण अन्त्यतर्फ कलाउने अन्डा जुटाउनुपर्छ — त्यो भन्नाले प्रजनन बथान खोप भएर महिनौँअघि नै तयार हुनुपर्छ। यो साइटको तापन पात्रो औजारले प्रकाश-जाँच र लकडाउनका मितिसहित अंकगणित गरिदिन्छ।",
        },
      },
    ],
    tip: {
      en: "Hatch day: dip beaks and give chicks water one hour before first feed — the first hour of hydration decides the first week of growth.",
      np: "कलाउने दिन: चुच्चो चुमाएर पहिले एक घण्टा पानी, अनि आहार — पहिलो घण्टाको पानीले पहिलो हप्ताको वृद्धि तय गर्छ।",
    },
    sources: "Poultry incubation extension guides (37.8 °C / 99.5 °F; humidity 55–60% days 1–18 and 65–75% at lockdown; candling days 7/14; storage 13–18 °C up to 7 days; species periods chicken 21, duck 28, turkey 28, quail 17–18).",
    updated: "2026-09",
  },
  {
    id: "layer-economics",
    categoryId: "poultry",
    title: { en: "Layer flock economics", np: "लेयर बथानको अर्थतन्त्र" },
    summary: {
      en: "A hen lays her yearly average not in a flat line but in a curve — read the curve and the culling date stops being a guess.",
      np: "मुरीले आफ्नो वार्षिक औसत सिधा रेखामा होइन, वक्रमा दिन्छे — वक्र पढ्दा बथान कहिले फेर्ने भन्ने अनुमान हुँदै हुँदैन।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Typical yield", np: "सामान्य उत्पादन" }, value: { en: "≈112 eggs/hen/yr", np: "प्रति मुरी करिब ११२ अन्डा/वर्ष" }, note: { en: "village-keeper benchmark", np: "गाउँ-स्तरको कसरत" } },
      { label: { en: "First egg", np: "पहिलो अन्डा" }, value: { en: "≈18–22 weeks", np: "करिब १८–२२ हप्ता" } },
      { label: { en: "Peak production", np: "चरम उत्पादन" }, value: { en: "≈90%+", np: "करिब ९०%+" }, note: { en: "around weeks 26–30", np: "२६–३० हप्तातिर" } },
      { label: { en: "Feed per dozen (layer)", np: "डाइनको दाना (लेयर)" }, value: { en: "≈1.8–2.2 kg", np: "करिब १.८–२.२ केजी" }, note: { en: "the feed-to-egg ratio to track", np: "पछ्याउनुपर्ने दाना-अन्डा अनुपात" } },
    ],
    chart: {
      title: { en: "Typical laying rate through the year (indicative)", np: "वर्षभरिको सामान्य अन्डा दर (सङ्केतात्मक)" },
      unit: { en: "% lay / day", np: "% अन्डा / दिन" },
      source: "Shape of a standard commercial layer curve; exact values vary by strain, feed and season — track your own flock.",
      data: [
        { label: { en: "Week 20", np: "२० हप्ता" }, value: 50 },
        { label: { en: "Week 30", np: "३० हप्ता" }, value: 93 },
        { label: { en: "Week 50", np: "५० हप्ता" }, value: 85 },
        { label: { en: "Week 72", np: "७२ हप्ता" }, value: 72 },
        { label: { en: "Week 90", np: "९० हप्ता" }, value: 60 },
      ],
    },
    sections: [
      {
        heading: { en: "The curve is the business", np: "वक्र नै व्यवसाय हो" },
        body: {
          en: "Layers earn almost all their money in the first laying year; after the peak the flock glides down roughly a point a month while eating the same ration. The question that decides profit is when the glide pays less than a new pullet's first month — and that answer needs your own egg and feed records, not a neighbour's opinion.",
          np: "लेयरले आफ्नो जिन्दगीको पहिलो वर्षमा नै लगभग सबै आम्दानी कमाउँछ; चरमपछि बथान महिनाको करिब एक बिन्दु दरले ओरालो लाग्छ, दाना भने उही खान्छ। नाफा तय गर्ने प्रश्न यही हो: ओरालो चढाइले नयाँ पुल्लेटको पहिलो महिनाभन्दा कम दिने कहिले बन्छ — त्यसको जवाफ छिमेकीको रायले होइन, तपाईंकै अन्डा-दाना अभिलेखले दिन्छ।",
        },
        bullets: [
          { en: "Lighting holds the curve up — 16 hours of light keeps the pituitary pressing the ovary.", np: "उज्यालोले वक्र थाम्छ — १६ घण्टा उज्यालोले पिट्युटरीले ओभरीलाई दबाब दिइरहन्छ।" },
          { en: "Calcium in the evening feed shells the next morning's egg.", np: "बेलुकाको खुराकमा क्याल्सियमले भोलिको बिहानको अन्डाको खोल बनाउँछ।" },
          { en: "Egg weight creep is real income — the same dozen weighs more in month ten than month two.", np: "अन्डाको तौल बढ्नु साँचो आम्दानी हो — उही डाइन दशौँ महिनामा दोस्रो महिनाभन्दा गह्रो हुन्छ।" },
        ],
      },
      {
        heading: { en: "Cull on evidence", np: "प्रमाणकै आधारमा फेर्नु" },
        body: {
          en: "Between flock cycles, cull the non-layers on sight signs — dry, shrunken vents, pale shanks, tight pelvic bones — and you convert a ration eater into cash without touching production. Run the numbers before the emotional decision: an 80-week flock laying 65% can still beat a new pullet's price if feed is cheap and chick costs are high.",
          np: "बथान फेर्ने बीचका अवधिमा नदिने मुरी देखिने लक्षणबाट छाट्नुहोस् — सुक्खी, खुम्चिएको भेन्ट, पहेँलो खुट्टा, कसिलो पेल्विक हड्डी — र उत्पादन नछुनै दाना खानेलाई नगदमा बदल्नुहोस्। मनको निर्णयअघि अंक चलाउनुहोस्: दाना सस्तो र चल्ली महँगो भए ६५% दिइरहेको ८० हप्ताको बथानले नयाँ पुल्लेटको भाउ जितिरहन सक्छ।",
        },
      },
    ],
    tip: {
      en: "Number the nest boxes and record eggs by box — one box going quiet reveals a hidden layer-eater or a broody hen days earlier.",
      np: "गुँडा नम्बरी बनाएर गुँडै अनुसार अन्डा गन्नुहोस् — एक गुँडा चुप हुँदा लुकेर अन्डा खाने वा ओत पर्ने मुरी दिनौँ अघि नै थाहा हुन्छ।",
    },
    sources: "Layer production benchmarks (≈112 eggs/hen/yr village level; 18–22 wk point of lay; standard curve shape) from Nepali poultry statistics and poultry extension literature; feed-per-dozen from layer ration references.",
    updated: "2026-09",
  },
  /* ═════════════════════ crops ═════════════════════ */
  {
    id: "offseason-vegetables",
    categoryId: "crops",
    title: { en: "Off-season vegetables & plastic tunnels", np: "समयमुनिका तरकारी र प्लास्टिक घर" },
    summary: {
      en: "Growing when others cannot is the whole trick — a tunnel converts monsoon disease control and winter frost into price premiums at the market.",
      np: "अरूले नसक्दा उब्जाउनु नै पूरा ट्रिक हो — टनेलले मनसुनको रोग-नियन्त्रण र जाडोको तुसारोलाई बजारको राम्रो भाउमा बदलिदिन्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Dhading tomato, farm gate", np: "धादिङको टमाटर, खेतैमा" }, value: { en: "NPR 20–30 /kg", np: "रु. २०–३० प्रतिकेजी" }, note: { en: "same season, highway collection", np: "उही मौसुम, राजमार्ग सङ्कलन" } },
      { label: { en: "Kathmandu retail, same tomato", np: "काठमाडौँ बजार, उही टमाटर" }, value: { en: "NPR 80–120 /kg", np: "रु. ८०–१२० प्रतिकेजी" }, note: { en: "the gap is logistics + timing", np: "फरक भनेको ढुवानी + समय" } },
      { label: { en: "Premium season", np: "राम्रो भाउको मौसुम" }, value: { en: "Off-season windows", np: "समयमुनिका झ्याल" }, note: { en: "pre-monsoon tomato, winter greens", np: "मनसुनअघिको टमाटर, जाडो साग" } },
      { label: { en: "Tunnel payback", np: "टनेलको लगानी फिर्ती" }, value: { en: "typically 1–3 cycles", np: "सामान्यतः १–३ चक्र" }, note: { en: "depends on crop choice & management", np: "बाली छनोट र व्यवस्थापनमा भर पर्छ" } },
    ],
    chart: {
      title: { en: "The same tomato, two prices (2026 reporting)", np: "उही टमाटर, दुई भाउ (२०२६ प्रतिवेदन)" },
      unit: { en: "NPR / kg", np: "रु. / केजी" },
      source: "Farm-gate NPR 20–30 vs Kathmandu retail NPR 80–120 per kg (2026 market reporting; bars show mid-range values).",
      data: [
        { label: { en: "Dhading farm gate", np: "धादिङ खेतै" }, value: 25 },
        { label: { en: "Kathmandu retail", np: "काठमाडौँ बजार" }, value: 100 },
      ],
    },
    sections: [
      {
        heading: { en: "What a tunnel actually buys you", np: "टनेलले साँच्चै के किनिदिन्छ" },
        body: {
          en: "A plastic house is not a miracle yield machine — it is climate insurance. In the rainy season it keeps leaf diseases off tomatoes long enough to harvest; in winter it holds night temperature above the frost line for cauliflower and greens; in the pre-monsoon it fast-forwards seedlings. Farmers who treat it as insurance plant fewer, better-managed tunnels and make money; farmers who treat it as a yield machine plant walls of plastic and drown in interest.",
          np: "प्लास्टिक घर चमत्कारी उत्पादन मेसिन होइन — यो जलवायु बिमा हो। वर्षायाममा यसले टमाटरका पात-रोगलाई टाढा राखेर बाली काट्ने अवसर दिन्छ; जाडोमा काउली-सागका लागि रातको ताप तुसारोरेखामाथि राख्छ; मनसुनअघि बिरुवा छिटो तयार पार्छ। बिमा ठान्ने किसानले कम तर राम्रै व्यवस्थापित टनेल लगाउँछन् र कमाउँछन्; उत्पादन मेसिन ठान्ने किसान प्लास्टिकको पर्खाल बनाएर ब्याजमा डुब्छन्।",
        },
        bullets: [
          { en: "Match tunnel to water: a tunnel without reliable irrigation is a solar oven, not a farm.", np: "टनेललाई पानीसँग मिलाउनुहोस्: भरपर्दो सिँचाइ नभएको टनेल फार्म होइन, सौर ओभन हो।" },
          { en: "Ventilate from day one — fungal disease inside a closed tunnel can beat any field outbreak.", np: "पहिलो दिनदेखि हावा चलाउनुहोस् — बन्द टनेलभित्रको ढुसी रोग खेतको प्रकोपभन्दा ठूलो हुन सक्छ।" },
          { en: "Sell to a named buyer before planting the cash crop — the price gap belongs to whoever organises the chain.", np: "नगद बाली रोप्नुअघि नाम टासिएको क्रेता जुटाउनुहोस् — भाउको फरक श्रृङ्खला जोड्नेकै पक्षमा जान्छ।" },
        ],
      },
      {
        heading: { en: "The market gap is real income", np: "बजारको फरक साँचो आम्दानी हो" },
        body: {
          en: "The Dhading-to-Kathmandu price spread shows the value chain problem in one number: three to four times between field and city plate. Cooperatives that aggregate, grade and hire their own transport recapture part of that spread; individual growers waiting for highway collectors recapture almost none. Off-season production multiplies the spread further — which is exactly why collective marketing and off-season production travel best together.",
          np: "धादिङदेखि काठमाडौँसम्मको भाउ-फरकले मूल्य श्रृङ्खलाको समस्या एकै अंकमा देखाउँछ: खेत र सहरको थालबीच तीन-चार गुणा। सङ्कलन, ग्रेडिङ र आफ्नै ढुवानी गर्ने सहकारीले त्यो फरकको केही फिर्ता लिन्छन्; राजमार्गका सङ्कलनकर्ताको पखै बस्ने एकल किसानले लगभग केही पनि होइन। समयमुनिको उत्पादनले फरक अझ बढाउँछ — त्यसैले सामूहिक बिक्री र समयमुनिको उत्पादन सँगै यात्रा गर्दा नै बेस्ट।",
        },
      },
      {
        heading: { en: "Where the windows are", np: "झ्यालहरू कहाँ छन्" },
        body: {
          en: "Pre-monsoon tomato in the mid-hills (harvest before the disease season), winter cauliflower and broccoli from the warmer Terai belts supplying hill towns, summer leafy greens from the high hills feeding the valleys in the hot months — the country's geography is a machine for growing something somewhere in every week of the year. Find your district's window on the agro-map, then test a tenth of a ropani before committing a full season.",
          np: "मध्यपहाडमा मनसुनअघिको टमाटर (रोग-मौसुमअघि टिप्ने), तराईका न्यानो पट्टीबाट पहाडी सहर धान्ने जाडो काउली-कोबी, गर्मी महिनामा उपत्यका धान्न उच्च पहाडको गर्मीका सागपात — देशको भूगोल नै वर्षको हरेक हप्ता कहीँ न कहीँ केही उब्जाउने मेसिन हो। आफ्नो जिल्लाको झ्याल नक्सामा फेला पार्नुहोस्, अनि पूरै मौसुम बाँध्नुअघि दशौँ भाग रोपनी मात्र परीक्षण गर्नुहोस्।",
        },
      },
    ],
    tip: {
      en: "Keep one tunnel bay unplanted each cycle and walk it daily — your own eyes on leaf colour, humidity and pest entry are worth more than any spray schedule.",
      np: "हरेक चक्रमा एक टनेल पङ्क्ति खाली राखेर दैनिक डुल्नुहोस् — पातको रङ, आर्द्रता र कीरा पस्नेमा आफ्नै आँखा कुनै औषधि तालिकाभन्दा बढी मूल्यवान् हुन्छ।",
    },
    sources: "Dhading tomato farm-gate NPR 20–30/kg vs Kathmandu NPR 80–120/kg (2026 market reporting); plastic-tunnel off-season practice from Nepali horticulture research (NARC/AKC) and economic studies of organic/conventional vegetable farming.",
    updated: "2026-09",
  },
  {
    id: "coffee-midhills",
    categoryId: "crops",
    title: { en: "Coffee in the mid-hills", np: "मध्यपहाडको कफी" },
    summary: {
      en: "Nepal grows arabica on 800–1,600 m hills that elsewhere earn medals — the cash is in processing discipline and patient cooperatives, not in planting frenzies.",
      np: "नेपालले ८००–१,६०० मि. पहाडमा अरेबिका उब्जाउँछ जुन उचाइले अरूतिर पदक जित्छ — नगद भने प्रशोधन अनुशासन र धैर्यवान् सहकारीमा छ, रोपाइँको होडमा होइन।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Growing belt", np: "उब्जाउ भेग" }, value: { en: "800–1,600 m", np: "८००–१,६०० मि." }, note: { en: "mid-hill arabica country", np: "मध्यपहाडी अरेबिका क्षेत्र" } },
      { label: { en: "Districts growing coffee", np: "कफी फल्ने जिल्ला" }, value: { en: "41 (mid-hills)", np: "४१ (मध्यपहाड)" }, note: { en: "habitat-suitability mapping", np: "बासस्थान-उपयुक्तता नक्सा" } },
      { label: { en: "Gulmi case — area", np: "गुल्मी उदाहरण — क्षेत्रफल" }, value: { en: "≈160 ha", np: "करिब १६० हे." } },
      { label: { en: "Gulmi case — green beans", np: "गुल्मी उदाहरण — हरियो दाना" }, value: { en: "≈35 t/yr", np: "करिब ३५ टन/वर्ष" } },
      { label: { en: "Gulmi case — yield", np: "गुल्मी उदाहरण — उत्पादकत्व" }, value: { en: "≈219 kg/ha", np: "करिब २१९ केजी/हे." }, note: { en: "room to multiply with better husbandry", np: "राम्रो व्यवस्थापनमा कयौँ गुणा बढ्ने ठाउँ" } },
    ],
    sections: [
      {
        heading: { en: "Why the hills matter", np: "पहाड किन महत्त्वको" },
        body: {
          en: "Altitude slows cherry maturation, concentrating the sugars and acids that roasters pay for — Nepal's mid-hills sit squarely inside the specialty band. The Gulmi district study's modest 219 kg/ha is not the ceiling but the floor: with pruning, shade management and pulping discipline, plot after plot in the same belt multiplies its yield. The coffee itself is rarely the constraint; the processes around it are.",
          np: "उचाइले चेरी पाक्ने गति ढिलो बनाउँछ, रोस्टरले तिर्ने चिनी-अम्ल त्यहीँ जम्मा हुन्छन् — नेपालको मध्यपहाड उक्त विशेषता-पट्टीभित्रै छ। गुल्मी अध्ययनको २१९ केजी/हे. छत होइन, फर्सी हो: काटछाँट, छहारी व्यवस्थापन र पल्पिङ अनुशासनसँगै उही पट्टीका प्लटले उत्पादन कयौँ गुणा बढाएका छन्। कफी आफैँ अड्काउने होइन; यसवरिपरिका प्रक्रियाले अड्काउँछन्।",
        },
        bullets: [
          { en: "Gulmi, Palpa, Arghakhanchi and Rolpa form the recognised western belt; Kaski and Lalitpur grow the eastern pockets.", np: "गुल्मी, पाल्पा, अर्घाखाँची र रोल्पा पश्चिमी पट्टी; कास्की र ललितपुर पूर्वी खाल्डा।" },
          { en: "Shade trees are not decoration — they hold quality as the climate warms and buffer hail.", np: "छहारी रूख सजावट होइनन् — जलवायु तात्दा गुणस्तर थाम्छन् र चिहाँडोको थपेको हुन्छन्।" },
          { en: "Washed (wet) processing earns the premium; sun-dried natural is the entry point.", np: "धुएको (वेट) प्रशोधनले राम्रो भाउ दिन्छ; घाममा सुकाएको नेचुरल प्रवेश ढोका हो।" },
        ],
      },
      {
        heading: { en: "The cooperative route", np: "सहकारी बाटो" },
        body: {
          en: "Coffee's economics are back-loaded: two to three years to first cherry, real money only with pulping, drying and grading done right. Smallholders survive that valley best through cooperatives that share a pulpery, pool lots for export, and pay a first instalment at delivery. The groups that also roast and brand inside Nepal keep the largest slice of the final cup's price at home.",
          np: "कफीको अर्थतन्त्र पछाडि बस्लाएको हुन्छ: पहिलो चेरी दुई-तीन वर्षपछि, असल दाम भने पल्पिङ, सुकाइ र ग्रेडिङ ठीकसँग भएपछि मात्र। साना किसानले त्यो खाडल साझा पल्परी, निर्यातका लागि ब्याच जम्मा गर्ने र दिँदा पहिलो किस्ता तिर्ने सहकारीबाट सहजै पार गर्छन्। नेपालभित्रै रोस्ट गरी ब्रान्ड बनाउने समूहले कपको अन्तिम भाउको सबैभन्दा ठूलो टुक्रा घरमै राख्छन्।",
        },
      },
      {
        heading: { en: "Climate is moving the map", np: "जलवायु नक्सा सारिरहेको छ" },
        body: {
          en: "The 800–1,600 m band is shifting upward as nights warm — the fields your grandfather called too cold are tomorrow's prime cherry slopes. Habitat-suitability mapping across 41 districts shows the belt widening in the mid-hills even as lower marginal plots turn marginal again. Planting today means reading where the band will sit in ten years, not where it sat in your father's time.",
          np: "रात तात्दै जाँदा ८००–१,६०० मि. पट्टी माथि सर्दैछ — हजुरबुबाले चिसो ठानेका बारी भोलिका उत्कृष्ट चेरी ढाल हुन्। ४१ जिल्लाको बासस्थान-नक्साले तल्लो किनार फेरि सीमान्त बन्दै जाँदा पनि मध्यपहाडमा पट्टी फराकिलो हुँदै गरेको देखाउँछ। आज रोप्नु भनेको दश वर्षपछि पट्टी कहाँ बस्नेछ पढ्नु हो, बुबाको समयमा कहाँ थियो होइन।",
        },
      },
    ],
    tip: {
      en: "Cherry to pulpery within eight hours — every hour of delay is a point of cup quality you already paid to grow.",
      np: "चेरी आठ घण्टाभित्र पल्परीसम्म — हरेक ढिलाइको घण्टा उब्जाउनै खर्च गरिसकेको कप-गुणस्तरको एक बिन्दु हो।",
    },
    sources: "Coffee spread over 41 mid-hill districts at 800–1,600 m (habitat-suitability analysis); Gulmi district study (≈160 ha, ≈35 t green beans, ≈219 kg/ha — published socio-economic analysis of Gulmi growers); western-belt districts (Gulmi/Arghakhanchi) as significant production areas (specialty coffee industry reporting, 2025).",
    updated: "2026-09",
  },
  {
    id: "apple-highhills",
    categoryId: "crops",
    title: { en: "Apples in the high hills", np: "उच्च पहाडको स्याउ" },
    summary: {
      en: "Mustang, Jumla, Dolpa, Humla and their neighbours sell the same fruit twice — once for taste, and once for the story of where it grew.",
      np: "मुस्ताङ, जुम्ला, डोल्पा, हुम्ला र छिमेकीले उही फल दुई पटक बेच्छन् — एक पटक स्वादका लागि, अर्की पटक कहाँ फल्यो भन्ने कथाका लागि।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Core districts", np: "मुख्य जिल्ला" }, value: { en: "Mustang · Jumla · Dolpa · Humla · Mugu · Kalikot · (upper) Manang", np: "मुस्ताङ · जुम्ला · डोल्पा · हुम्ला · मुगु · कालिकोट · (माथिल्लो) मनाङ" } },
      { label: { en: "Rain-shadow advantage", np: "वर्षा-छायाँ फाइदा" }, value: { en: "Low disease pressure", np: "रोग दबाब कम" }, note: { en: "dry air = fewer sprays", np: "सुक्खा हावा = कम औषधि" } },
      { label: { en: "Chill requirement", np: "चिसो-घण्टा आवश्यकता" }, value: { en: "Winter cold is the gate", np: "जाडोको चिसो नै ढोका हो" }, note: { en: "low-chill areas fruit poorly", np: "कम-चिसो क्षेत्रमा फल कम्ती" } },
      { label: { en: "Transport reality", np: "ढुवानी वास्तविकता" }, value: { en: "Roads decide the price", np: "बाटोले भाउ तय गर्छ" }, note: { en: "bruise is discount", np: "चोट भनेको कटौती हो" } },
    ],
    sections: [
      {
        heading: { en: "The mountain niche", np: "पहाडी खाल्डो" },
        body: {
          en: "High-hill apples grow where winter satisfies the tree's chill requirement and the rain-shadow summer keeps fungal pressure low — which is why Marpha and Jumla fruit stores and travels without the spray calendar of lowland orchards. It is a narrow niche: a valley too warm fruits sparsely, a slope too cold blooms into late frost; the profitable band is precise and the map is slowly climbing with warming winters.",
          np: "उच्चपहाडी स्याउ त्यहाँ फल्छ जहाँ जाडोले रूखको चिसो-घण्टा पुर्‍याउँछ र वर्षा-छायाँको गर्मीले ढुसी दबाब कम राख्छ — यही कारण मार्फा र जुम्लाको फल तल्लो बगैंचाको औषधि-पात्रोबिना भण्डारण र ढुवानी सहन्छ। खाल्डो साँघुरो छ: धेरै न्यानो उपत्यकामा फल छर्लङ्ग, धेरै चिसो ढालमा फुल ढिलो तुसारोमा पर्छ; नाफायुक्त पट्टी सूक्ष्म छ र तात्दै गरेको जाडोसँगै नक्सा बिस्तारै माथि उकालिँदैछ।",
        },
        bullets: [
          { en: "Choose sites for air drainage — frost pools in flat pockets at bloom time.", np: "हावा-निकास हेरेर स्थान छान्नुहोस् — फुल्ने बेला थाक खाल्डोमा तुसारो जम्मा हुन्छ।" },
          { en: "Road access has doubled apple's farm value across the Karnali belt — plant along tomorrow's road plan, not just today's.", np: "बाटो पुगेपछि कर्णाली पट्टीमा स्याउको खेतै मूल्य दोब्बर भएको छ — आजको मात्र होइन, भोलिको सडक योजनासँगै रोप्नुहोस्।" },
          { en: "Cold storage at the farm collects the autumn glut into the winter price.", np: "खेतैमा चिसो भण्डारणले शरदको भिडलाई जाडोको भाउमा जम्मा गर्छ।" },
        ],
      },
      {
        heading: { en: "Two prices in one fruit", np: "एउटै फलमा दुई भाउ" },
        body: {
          en: "A Jumla apple in Kathmandu sells geography as much as sugar — the label alone carries a premium, and the district's orchards benefit the more reliably that story is kept honest: traceable crates, consistent grading, and varieties that travel. The fragile fancy varieties earn highest per kg at the farm but die on the mule track; harder-keeping lines get less praise and more rupees home.",
          np: "काठमाडौँमा जुम्लाको स्याउले चिनीजत्तिकै भूगोल पनि बेच्छ — लेबल आफैँमा राम्रो भाउ बोक्छ, र त्यो कथा इमानदार राखिएको छ भने जिल्लाका बगैंचाले निरन्तर फाइदा लिन्छन्: खोज-मिल्ने क्रेट, एकनास ग्रेडिङ, र ढुवानी सहने जात। नाजुक प्रसिद्ध जातले खेतैमा सबैभन्दा राम्रो प्रतिकेजी पाउँछन् तर खच्चर बाटोमै मर्छन्; कडा जातले कम प्रशंसा, घरमा भने बढी रुपैयाँ ल्याउँछन्।",
        },
      },
    ],
    tip: {
      en: "Pick into padded crates at the tree, not sacks — every bruise you prevent keeps Kathmandu paying for geography instead of discounting for damage.",
      np: "रूखबाटै गद्दा भएको क्रेटमा टिप्नुहोस्, बोरामा होइन — रोकेको हरेक चोटले काठमाडौँलाई भूगोलको भाउ तिर्न बाध्य पार्छ, क्षतिको कटौती गर्न होइन।",
    },
    sources: "High-hill apple districts (Mustang/Jumla/Dolpa/Humla/Mugu/Kalikot/upper Manang — established horticultural geography); rain-shadow low-disease advantage; market and transport economics from Karnali horticulture reporting.",
    updated: "2026-09",
  },
  {
    id: "compost-soil-health",
    categoryId: "crops",
    title: { en: "Soil health & compost making", np: "माटो स्वास्थ्य र कम्पोस्ट बनाउने" },
    summary: {
      en: "Nepal's farms mine their soil quietly every season — compost, not fertiliser bags, is the refill that also pays in moisture.",
      np: "नेपालका खेतले हरेक मौसुम चुपचाप आफ्नै माटो खनन गर्छन् — मलको गोली होइन, कम्पोस्ट नै त्यो भरिदिने वस्तु हो जसले ओसारमा पनि तिर्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Compost maturity", np: "कम्पोस्ट तयार हुने" }, value: { en: "≈8–12 weeks", np: "करिब ८–१२ हप्ता" }, note: { en: "turned heaps, moist not wet", np: "पल्टाइएको थुप्रो, गुन्दिलो तर नभिजेको" } },
      { label: { en: "FYM nitrogen loss", np: "गोबर मलको नाइट्रोजन हानि" }, value: { en: "up to ≈50%", np: "करिब आधासम्म" }, note: { en: "uncovered, sun-dried heaps", np: "खुला, घाममा सुकाएको थुप्रो" } },
      { label: { en: "Layer recipe", np: "तह रेसिपी" }, value: { en: "dung · crop residue · soil · water", np: "गोबर · बालीको डाँठ · माटो · पानी" }, note: { en: "repeat to shoulder height", np: "काँध उचाइसम्म दोहोर्‍याउने" } },
      { label: { en: "Moisture test", np: "ओसार जाँच" }, value: { en: "squeeze = damp fist", np: "निचोर्दा गुन्दिलो मुठा" }, note: { en: "no drips, no dust", np: "थोपा होइन, धूलो पनि होइन" } },
    ],
    sections: [
      {
        heading: { en: "The quietly draining account", np: "चुपचाप रित्तिँदै गरेको खाता" },
        body: {
          en: "Every harvest of grain or milk walks off the field carrying nitrogen, phosphorus and potassium; for decades the refill came from a bag alone, and the soil's organic matter — its water-holding, its structure, its living fraction — kept falling. Compost is the refill that rebuilds all three at once: the pile's heat destroys most weed seeds and pathogens, and the finished humus turns a hard field into one that drinks the rain instead of shedding it.",
          np: "अन्न वा दुधको हरेक बाली खेतबाट नाइट्रोजन, फस्फोरस र पोटास बोकेर हिँड्छ; दशकौँसम्म भरिदिने काम झोलीको बस्ताले मात्र गर्‍यो, र माटोको जैविक पदार्थ — पानी थाम्ने शक्ति, बनोट, जीवित अंश — ओरालो लागिरह्यो। कम्पोस्ट त्यो भरिदिने वस्तु हो जसले तीनै एकसाथ बनाउँछ: थुप्रोको तापले झारका बीउ र रोगका जीवाणु धेरै मार्छ, र तयार हुँदै गरेको ह्युमसले चट्टानै खेतलाई वर्षा पिउने बनाउँछ, ओराल्ने होइन।",
        },
        bullets: [
          { en: "Cover the FYM heap — sun and rain take the nitrogen you already paid feed to make.", np: "गोबरको थुप्रो छोप्नुहोस् — घाम-वर्षाले चारामै तिरेर बनेको नाइट्रोजन लैजान्छ।" },
          { en: "Ash and urine belong in the pile's layers, not beside it.", np: "खरानी र पिसाब थुप्रोकै तहमा राख्नुहोस्, छेउमा होइन।" },
          { en: "A fistful of old compost inoculates a new pile the way yogurt inoculates milk.", np: "पुरानो कम्पोस्टको मुठो नयाँ थुप्रोमा राख्दा दहीले दूध बनाएझैँ काम गर्छ।" },
        ],
      },
      {
        heading: { en: "The pile that heats right", np: "सही तापिने थुप्रो" },
        body: {
          en: "A working pile warms to the touch within days and smells forest-sweet, not ammonia-sour: that means the carbon-nitrogen balance is right and air is moving. Turn it when the heat fades, re-wet the dry edges, and by the third turn the original materials have become dark crumbs. Farmers who weigh a basket of the finished compost per tree every year are buying next year's yield with this year's waste.",
          np: "काम गर्ने थुप्रो केही दिनमै छोँदा तातो हुन्छ र जङ्गल-मिठो गन्ध आउँछ, अमोनिया-खट्टा होइन: त्यसको अर्थ कार्बन-नाइट्रोजन सन्तुलन ठीक छ र हावा चलिरहेको छ। ताप ओरालो लाग्दा पल्टाउनुहोस्, सुक्का किनार फेरि गुन्दिलो पार्नुहोस्, तेस्रो पल्टाइपछि पुराना वस्तु गाढा दाना बनिसकेका हुन्छन्। हरेक वर्ष प्रति रूख एक टोकरी तयार कम्पोस्ट तौलेर राख्ने किसानले यस वर्षको फोहोरबाट भोलिको उब्जाउ किनिरहेका हुन्छन्।",
        },
      },
      {
        heading: { en: "Compost plus bag, not versus bag", np: "कम्पोस्ट र बस्ता सँगै, एक-अर्काको विरुद्ध होइन" },
        body: {
          en: "This article is not an argument against fertiliser: the response of a hungry soil to the first bag is real. The argument is about order — rebuild the soil's organic engine first, then let the bag top up the remaining shortfall, and the same bag begins yielding more because the soil can finally hold what it is given.",
          np: "यो लेख मल-बिरुद्धको तर्क होइन: भोकालागेको माटोले पहिलो बस्तापछि दिने प्रतिक्रिया साँचो हो। तर्क क्रमको हो — पहिले माटोको जैविक इन्जिन पुनर्निर्माण गर्नुहोस्, अनि बाँकी कमी बस्ताले पूरा गर्न दिनुहोस्; त्यतिबेला उही बस्ताले बढी उत्पादन दिन थाल्छ, किनकि माटोले पाएको कुरा थाम्न सक्ने भएको हुन्छ।",
        },
      },
    ],
    tip: {
      en: "Dig one small pit in the compost corner of your field every season and feel the soil — farmers who touch their soil yearly fertilise with judgement; the rest fertilise with habit.",
      np: "हरेक मौसुममा खेतको कम्पोस्ट कुनामा एउटा सानो खाडल खनेर माटो छुनुहोस् — वर्षेनी आफ्नो माटो छुने किसानले विवेकले मल हाल्छन्; बाँकीले बानीले।",
    },
    sources: "Composting practice and FYM nutrient-loss figures from Nepali soil-fertility research and extension guidance (NARC/Soil Management Directorate); organic-matter and water-holding relationship from soil-science literature.",
    updated: "2026-09",
  },
  /* ═════════════════════ climate ═════════════════════ */
  {
    id: "drying-springs",
    categoryId: "climate",
    title: { en: "Drying springs, living answers", np: "सुक्दै गरेका मुहान, जीवित जवाफ" },
    summary: {
      en: "Millions of hill Nepalis drink, cook and water animals from springs — and spring after spring is going quiet. The answers are unglamorous and they work.",
      np: "लाखौँ पहाडी नेपाली मुहानकै पानी पिउँछन्, पकाउँछन्, पशु चुवाउँछन् — र एकपछि अर्को मुहान चुप हुँदैछ। जवाफहरू साधारण देखिन्छन्, तर चल्छन्।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Who depends on springs", np: "मुहानमा कसको भर" }, value: { en: "Millions of hill households", np: "लाखौँ पहाडी घरपरिवार" }, note: { en: "drinking, cooking, livestock", np: "खानेपानी, पाक, पशु" } },
      { label: { en: "Reported trend", np: "रिपोर्ट गरिएको प्रवृत्ति" }, value: { en: "Widespread drying", np: "व्यापक सुक्ने क्रम" }, note: { en: "ICIMOD springshed research", np: "आइसिमोडको स्प्रिङ्गसेड अनुसन्धान" } },
      { label: { en: "Recharge lag", np: "रिचार्ज ढिलाइ" }, value: { en: "Months to years", np: "महिनादेखि वर्षौँ" }, note: { en: "why early action matters", np: "चाँडो किन सुरु गर्नुपर्ने" } },
      { label: { en: "Best structures", np: "उत्तम संरचना" }, value: { en: "Pits · trenches · ponds", np: "गड्याङ · खाडल · पोखरी" }, note: { en: "on the recharge slope above", np: "माथिल्लो रिचार्ज ढालमा" } },
    ],
    sections: [
      {
        heading: { en: "A water tower losing taps", np: "ट्यााँकीबाट धारा गुम्दै" },
        body: {
          en: "The Himalayan mid-hills work as a sponge-and-tap system: monsoon rain soaks forested slopes and leaks out all year as springs lower down. Erratic rainfall, forest change and the piping of hillsides have thinned the sponge faster than it refills — the rivers still run, so the crisis hides in the quiet of a stone spout in Falgun. Springshed research across the Himalaya documents the pattern and, crucially, where the water actually enters the ground.",
          np: "हिमालय मध्यपहाड स्पन्ज-र-धारा प्रणाली हो: मनसुनको पानी वनाक्रान्त ढालमा सोसिएर वर्षभरि तलका मुहानबाट चुहिन्छ। अनियमित वर्षा, वन परिवर्तन र पहाडको फर्काइ-पाइपले स्पन्जलाई भर्ने गतिभन्दा छिटो पातलो बनाइरहेको छ — नदी बगिरहन्छन्, त्यसैले सङ्कट फागुनको ढुङ्गे धाराको चुपमा लुकेको हुन्छ। हिमालयभरिको स्प्रिङ्गसेड अनुसन्धानले यो ढाँचा र — महत्त्वका कुरा — पानी साँच्चै जमिनमा कहाँ भित्रिन्छ, दुवै अभिलेख गर्छ।",
        },
        bullets: [
          { en: "Find the recharge zone with the community — walk uphill from the spring in the rain and watch where water disappears.", np: "समुदायसँगै रिचार्ज क्षेत्र खोज्नुहोस् — वर्षामा मुहानदेखि माथि हिँडेर पानी कहाँ गायब हुन्छ हेर्नुहोस्।" },
          { en: "One recharge pond above a spring outperforms ten below it.", np: "मुहानमाथिको एक रिचार्ज पोखरीले तलका दश को भन्दा बढी काम गर्छ।" },
          { en: "Protect the source forest — roots are the plumbing.", np: "स्रोतको वन जोगाउनुहोस् — जरा नै पाइपलाइन हो।" },
        ],
      },
      {
        heading: { en: "The revival kit", np: "पुनर्जीवन किट" },
        body: {
          en: "Spring revival programmes share a kit: contour trenches and recharge pits on the intake slope, small ponds silted out each Asar, trench hedgerows of broom grass and bamboo whose roots hold the sponge together, and a user group that fences the eye of the spring from livestock. ICIMOD-documented cases across the Gandaki basin and far-west hills show flows returning within seasons to a few years — but only where the recharge work sits above the spring, not the tap below it.",
          np: "मुहान पुनर्जीवन कार्यक्रमको साझा किट: सोस्ने ढालमा बराबर खाडल र रिचार्ज गड्याङ, हरेक असार मल निकालिने साना पोखरी, अमरिसो-बाँसका हेजबार जसका जराले स्पन्ज बाँध्छ, र मुहानको आँखालाई पशुबाट बार्ने उपभोक्ता समूह। गण्डकी खाल्डो र सुदूरपश्चिमका पहाडमा आइसिमोडले अभिलेख गरेका उदाहरणमा बहाव मौसुमदेखि केही वर्षभित्र फर्केका छन् — तर रिचार्ज काम मुहानमाथि बसेको ठाउँमा मात्र, तलको धारोमा होइन।",
        },
      },
      {
        heading: { en: "Farms and springs share one wallet", np: "खेत र मुहान एउटै थैली" },
        body: {
          en: "The same recharge work that revives a drinking spring revives the ponds that water vegetables in Kartik — which is why spring programmes and farm programmes should never sit in separate meetings. A village that maps its springs, ponds and recharge slopes once holds the master document for every future water decision, from polyhouse siting to cattle-shed placement.",
          np: "खानेपानीको मुहान जुराउने रिचार्ज कामले कात्तिकमा तरकारी चुवाउने पोखरी पनि जुराउँछ — त्यसैले मुहान कार्यक्रम र खेत कार्यक्रम कहिल्यै छुट्टै बैठकमा बस्नु हुँदैन। आफ्ना मुहान, पोखरी र रिचार्ज ढाल एक पटक नक्साबद्ध गरेको गाउँसँग आगामी हरेक पानी-निर्णयको मुल दस्तावेज हुन्छ — प्लास्टिक घर बसाल्ने ठाउँदेखि गोठ राख्ने स्थानसम्म।",
        },
      },
    ],
    tip: {
      en: "Take a photograph of your spring each Falgun from the same rock — a three-year photo series persuades a village faster than any project report.",
      np: "हरेक फागुन उही ढुङ्गाबाट आफ्नो मुहानको फोटो खिच्नुहोस् — तीन वर्षको फोटो-श्रृङ्खलाले कुनै परियोजना प्रतिवेदनभन्दा छिटो गाउँलाई मनाउँछ।",
    },
    sources: "ICIMOD springshed research in the Gandaki basin and the Himalaya (widespread drying of springs; millions dependent); community spring-revival cases (recharge pits, trenches, ponds, source protection) from Himalayan springs literature, 2025–2026.",
    updated: "2026-09",
  },
  /* ═════════════════════ farm-management ═════════════════════ */
  {
    id: "beekeeping-basics",
    categoryId: "farm-management",
    title: { en: "Beekeeping basics for hill farms", np: "पहाडी खेतका लागि मौरीपालनका आधार" },
    summary: {
      en: "A modern colony yields several times the honey of a log hive and pollinates half the orchard on its way home — the quietest profitable enterprise on a Nepali farm.",
      np: "आधुनिक घारको चक्र परम्परागत लोग घारको कयौँ गुणा मह दिन्छ र फर्कंदा आधा बगैंचा परागित गरिदिन्छ — नेपाली फार्मको सबैभन्दा शान्त नाफायुक्त उद्यम।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "National average (2002)", np: "राष्ट्रिय औसत (२००२)" }, value: { en: "≈4.15 kg/colony", np: "करिब ४.१५ केजी/घार" }, note: { en: "mostly traditional hives", np: "धेरैजसो परम्परागत घार" } },
      { label: { en: "Traditional log hive", np: "परम्परागत लोग घार" }, value: { en: "≈8 kg/hive", np: "करिब ८ केजी/घार" }, note: { en: "study-average yield", np: "अध्ययनको औसत उत्पादन" } },
      { label: { en: "Migratory Apis mellifera", np: "सार्ने एपिस मेलिफेरा" }, value: { en: "≈34.6 kg/hive", np: "करिब ३४.६ केजी/घार" }, note: { en: "Chitwan-managed colonies (2018)", np: "चितवन व्यवस्थापित घार (२०१८)" } },
      { label: { en: "Study herd size", np: "अध्ययनको घार सङ्ख्या" }, value: { en: "≈35 hives/household", np: "प्रति घर करिब ३५ घार" }, note: { en: "commercial keepers", np: "व्यावसायिक पालक" } },
    ],
    chart: {
      title: { en: "Honey yield per hive by system", np: "प्रणालीअनुसार प्रति घार मह उत्पादन" },
      unit: { en: "kg / hive", np: "केजी / घार" },
      source: "National average ≈4.15 kg/colony (HMG/N 2002); traditional-hive average ≈8 kg (management-practice study); migratory Apis mellifera ≈34.6 kg/hive (Chitwan study, 2018).",
      data: [
        { label: { en: "National average (2002)", np: "राष्ट्रिय औसत (२००२)" }, value: 4.15 },
        { label: { en: "Traditional log hive", np: "परम्परागत लोग घार" }, value: 8 },
        { label: { en: "Migratory A. mellifera", np: "सार्ने एपिस मेलिफेरा" }, value: 34.6 },
      ],
    },
    sections: [
      {
        heading: { en: "Why the yield gap is a management gap", np: "उत्पादनको फरक व्यवस्थापनको फरक किन हो" },
        body: {
          en: "The same flower field feeds the log hive and the movable-frame colony; the difference is that a frame hive lets you inspect, feed, control swarming and harvest without destroying the comb. Nepali studies put commercial migratory colonies at roughly thirty-five kilos a hive while the traditional average sits near eight — almost the entire gap is attributable to management, not flowers. Start with two framed hives, learn on them, and only then scale.",
          np: "उही फूलको खेतले लोग घार र चल्ने-फ्रेम घार दुवै खुवाउँछ; फरक यो हो कि फ्रेम घारले चेक गर्न, खुवाउन, झुण्ड छाड्न रोक्न र कम्ब ननासी मह निकाल्न दिन्छ। नेपाली अध्ययनले व्यावसायिक सार्ने घारलाई करिब पैँतीस केजी र परम्परागत औसतलाई आठजत्तिकै राख्छ — फरक लगभग पूरै व्यवस्थापनको हो, फूलको होइन। दुई फ्रेम घारबाट सुरु गर्नुहोस्, सिक्नुहोस्, अनि मात्र विस्तार गर्नुहोस्।",
        },
        bullets: [
          { en: "Follow the bloom: mustard to Chiuri to buckwheat is the classic migration ladder.", np: "फूल पछ्याउनुहोस्: तोरीदेखि चिउरीदेखि फापरसम्म सार्ने सिँढी सामान्य हो।" },
          { en: "Apis cerana (native) for the village scale; mellifera needs management and capital.", np: "गाउँ स्तरमा एपिस सेराना (स्थानीय); मेलिफेरालाई व्यवस्थापन र पूँजी चाहिन्छ।" },
          { en: "Sell comb honey in the village, extracted honey to the town — two markets, one hive.", np: "गाउँमा कम्ब मह, सहरमा निचोरेको मह बेच्नुहोस् — एउटै घार, दुई बजार।" },
        ],
      },
      {
        heading: { en: "The pollination dividend nobody pays for", np: "कसैले नतिर्ने परागण लाभांश" },
        body: {
          en: "Bees are farm machinery that runs on flowers: orchard and vegetable plots near managed hives set measurably better fruit, which is why serious vegetable and coffee growers in Lamjung and Syangja either keep bees or rent them. On a mixed hill farm the hive's second product — pollination — is frequently worth more than its honey; the honey is simply the part that comes in a jar.",
          np: "मौरी फूलमा चल्ने फार्म-मेसिन हो: व्यवस्थापित घारनजिकका बगैंचा र तरकारी खेतमा फल स्पष्ट राम्रो बस्छ, त्यसैले लमजुङ् र स्याङ्जाका गम्भीर तरकारी-कफी किसानले मौरी पाल्छन् वा भाडामा लिन्छन्। मिश्रित पहाडी खेतमा घारको दोस्रो उत्पादन — परागण — प्रायः महभन्दा बढी बेस्ट हुन्छ; मह त जारमा आउने त्यही भाग मात्र हो।",
        },
      },
    ],
    tip: {
      en: "Place hives facing morning sun with water nearby — bees spend the first flights of the day orienting, and a calm yard keeps them gentle.",
      np: "घार बिहानको घाममा, पानी नजिकै राख्नुहोस् — मौरीले दिनका पहिला उडान बाटो सम्झनमा बिताउँछन्, शान्त आँगनले तिनलाई शान्तै राख्छ।",
    },
    sources: "Apis mellifera migratory yield ≈34.6 kg/hive with ≈34.5 hives/household (Chitwan management study, 2018); traditional-hive average ≈8 kg (management-practice study); national average ≈4.15 kg/colony (HMG/N, 2002); ICIMOD beekeeping resources.",
    updated: "2026-09",
  },
  /* ═════════════════════ animal-health ═════════════════════ */
  {
    id: "zoonoses-safety",
    categoryId: "animal-health",
    title: { en: "Staying safe around livestock — zoonoses in the yard", np: "पशुबीच सुरक्षित रहनु — गोठैँमा जुनुनोसिस" },
    summary: {
      en: "Rabies, anthrax, brucellosis and TB share one trait: they cross from animals to the hands that feed them. Most crossings are preventable with plain habits.",
      np: "रेबीज्, एन्थ्राक्स, ब्रुसेलोसिस र क्षयरोगको साझा बानी एउटै छ: चुवाउने हातसम्म पशुबाट सर्छन्। सर्ने धेरैजसो बाटो साधारण बानीले बन्ध हुन्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Rabies", np: "रेबीज् (वातात्)" }, value: { en: "Dog-mediated, fatal after symptoms", np: "कुकुरबाट, लक्षणपछि घातक" }, note: { en: "wash 15 min, vaccinate, seek care", np: "१५ मिनेट धुने, खोप गर्ने, उपचार खोज्ने" } },
      { label: { en: "Anthrax", np: "एन्थ्राक्स" }, value: { en: "From carcasses & hides", np: "मृतशरीर र छालाबाट" }, note: { en: "never open a sudden-death carcass", np: "एक्कासि मरेको शव कहिल्यै नचीर्ने" } },
      { label: { en: "Brucellosis", np: "ब्रुसेलोसिस" }, value: { en: "Abortion storms, raw milk", np: "गर्भपातको लहर, कच्चा दुध" }, note: { en: "gloves at calving; boil milk", np: "पाठापार्दा पञ्जा; दुध उमाल्ने" } },
      { label: { en: "Bovine TB", np: "गाईको क्षयरोग" }, value: { en: "Raw milk & close contact", np: "कच्चा दुध र नजिकको सम्पर्क" } },
      { label: { en: "The cheapest vaccine", np: "सबैभन्दा सस्तो खोप" }, value: { en: "Boiling milk", np: "दुध उमाल्नु" }, note: { en: "defeats TB and brucella at once", np: "क्षय र ब्रुसेला एकै पटक हराउँछ" } },
    ],
    sections: [
      {
        heading: { en: "The five habits that keep a family safe", np: "परिवार जोगाउने पाँच बानी" },
        body: {
          en: "Boil milk before drinking; wash hands with soap after the shed and before eating; wear gloves or plastic bags when helping at birth or abortion; keep the dog's rabies shot current; and bury sudden-death carcasses deep rather than skinning them. None of these costs more than patience, and together they block the main doors by which farm diseases enter human bodies in Nepal.",
          np: "पिउनुअघि दुध उमाल्नु; गोठपछि र खानाअघि साबुनले हात धुनु; पाठापार्ने वा गर्भपात हुँदा पञ्जा वा प्लास्टिकको झोला लगाउनु; कुकुरको रेबीज् खोप हालसालै राख्नु; र एक्कासि मरेको शव छाला निकाल्नुको साटो गहिरो गाड्नु। यी कुनै पनि धैर्यभन्दा बढी महँगो छैनन्, र सँगै ल्याँदा नेपालमा फार्मका रोग मानिसको शरीरमा पस्ने मुख्य ढोका नै थुनिन्छन्।",
        },
        bullets: [
          { en: "A wound from any animal gets fifteen minutes of running water and soap — then a clinic, not a wait.", np: "कुनै पनि पशुको चोटपटक बगिरहेको पानी र साबुनमा पन्ध्र मिनेट — अनि क्लिनिक, प्रतीक्षा होइन।" },
          { en: "Sick-animal pens are handled after the healthy ones, never before.", np: "बिरामी पशुको कुठ स्वस्थ पशुपछि मात्र चलाउनु, अघि कहिल्यै होइन।" },
          { en: "Children under five stay out of the milking line — raw-milk bugs hit them hardest.", np: "पाँच वर्षमुनिका बच्चा दुहुने लाइनबाट टाढा राख्नु — कच्चा दुधका जीवाणु तिनलाई सबैभन्दा बढी आक्रमण गर्छन्।" },
        ],
      },
      {
        heading: { en: "When the animal itself is the alarm", np: "पशु आफैँ सङ्केत भएको बेला" },
        body: {
          en: "Certain events should switch a farm into caution mode: an unexplained sudden death (think anthrax — do not open), a run of abortions in the herd (think brucellosis — gloves and a vet call), a dog or jackal behaving strangely (think rabies — distance and authorities), heavy coughing in a thinning cow (think TB — test before drinking her milk raw). Each of these has a veterinary answer; none of them has a home remedy that works.",
          np: "केही घटनाले फार्मलाई सतर्क-मोडमा राख्नुपर्छ: कारण नबुझिने एक्कासि मृत्यु (एन्थ्राक्स सम्झनुहोस् — नचीर्नु), बथानमा लहरै गर्भपात (ब्रुसेलोसिस सम्झनुहोस् — पञ्जा र पशु-चिकित्सक बोलाउनु), अनौठो व्यवहारको कुकुर वा स्याल (रेबीज् सम्झनुहोस् — दूरी र अधिकारीलाई जानकारी), पातलिँदै गरेको गाईको भारी खोकी (क्षयरोग सम्झनुहोस् — कच्चा दुध पिउनुअघि परीक्षण गर्नु)। हरेकको पशु-चिकित्सकीय जवाफ छ; कुनैको पनि घरेलू उपायले काम गर्दैन।",
        },
      },
      {
        heading: { en: "One health, one yard", np: "एक स्वास्थ्य, एक आँगन" },
        body: {
          en: "Doctors call it One Health because the fence between your herd's health and your family's health is one metre of air. Vaccinating the herd, boiling the milk and washing the hands are the same act viewed from three sides — and the farms that internalise this see fewer of the fevers that no one can source and the abortions that no one can explain.",
          np: "डाक्टरहरूले यसलाई 'वान हेल्थ' भन्छन्, किनकि तपाईंको बथानको स्वास्थ्य र परिवारको स्वास्थ्यबीचको बार एक मिटर हावा मात्र हो। बथानको खोप, दुध उमाल्नु र हात धुनु — तीनै पट्टिबाट हेर्दा एउटै काम हुन्; र यो आत्मसात् गरेका फार्ममा 'कहाँबाट आयो थाहा नपाइने' ज्वरो र 'कारण नबुझिने' गर्भपात कम देखिन्छन्।",
        },
      },
    ],
    caution: {
      en: "Any bite that breaks skin from a dog, cat, jackal or monkey is a medical emergency until proven otherwise — start wound care the same hour and ask for post-exposure rabies vaccination.",
      np: "कुकुर, बिरालो, स्याल वा बँदेलले छाला चिरेर टोकेको कुरै त्यो घण्टै उपचार नभएसम्म चिकित्सकीय आपत्‌काल हो — घाउ सफा गर्न सुरु गर्नुहोस् र पोस्ट-एक्सपोजर रेबीज् खोप सोध्नुहोस्।",
    },
    sources: "Rabies dog-mediated status in Nepal (WHO/Nepal reporting); anthrax carcass-handling guidance and brucellosis abortion-storm guidance from Merck Veterinary Manual and Nepali veterinary extension; One Health framing from WHO/FAO guidance.",
    updated: "2026-09",
  },
];



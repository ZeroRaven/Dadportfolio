import type { KBArticle } from "./types";

/** Fodder & feed articles. */
export const fodderArticles: KBArticle[] = [
  {
    id: "fodder-systems-nepal",
    categoryId: "fodder",
    title: {
      en: "Building a fodder system on a Nepali farm",
      np: "नेपाली फार्ममा चारा प्रणाली बनाउनु",
    },
    summary: {
      en: "Nepier in the monsoon, oats in the winter, a fence-line of fodder trees as the bank — feed your animals from your boundary, not the market.",
      np: "वर्षामा नापियर, जाडोमा ओट्स, किनारमा चारा विरुवाको बैंक — बजार होइन, आफ्नै सिमानाबाट पशु खुवाउनुहोस्।",
    },
    readMinutes: 6,
    sections: [
      {
        heading: { en: "The three-layer system", np: "तीन-तहको प्रणाली" },
        body: {
          en: "Feasible year-round fodder on most Nepali farms stacks three layers. First grasses: Napier (Pakchong) and hybrid fodders carry the monsoon and give five or more cuts a year on good management; oats and berseem own the irrigated winter. Second legumes: stylo, vetch and tree lucerne lift protein and fix nitrogen for the next crop. Third trees: the boundary and terrace risers planted with fodder trees — badahar, khanayo, tanki, falem, kimbu, ipil-ipil — turn idle edges into a cut-and-carry bank that also shades animals and holds the slope. A farm that plants all three layers buys feed security with one season's work.",
          np: "धेरैजसो नेपाली फार्ममा वर्षभरि चारा सम्भव बनाउन तीन तह थुप्र्‍याउनुहोस्। पहिलो घाँस: नापियर (पाकचोङ्ग) र संकर चाराले वर्षा बोक्छन् र राम्रो व्यवस्थापनमा वर्षकै पाँच कटान दिन्छन्; ओट्स र बरसिमले सिँचित जाडो आफ्नै बनाउँछन्। दोस्रो कोसेबाली: स्टाइलो, भेच र ट्री-लुसर्नले प्रोटिन उठाउँछन् र अर्को बालीका लागि नाइट्रोजेन जोड्छन्। तेस्रो रूख: किनार र लेकको कगारमा चारा विरुवा — बडाहार, खन्यू, टाँकी, फलेम, किम्बू, इपिल-इपिल — लगाउँदा खाली धार नै काटेर ल्याउने बैंक बन्छ, जसले पशुलाई छहारी पनि दिन्छ र भिर पनि थाम्छ। तीनै तह लगाउने फार्मले एक मौसुमको मेहनतले चारा-सुरक्षा किनिदिन्छ।",
        },
        bullets: [
          { en: "Napier: plant slips at the start of the monsoon, first cut after ~60–70 days, then every 40–50 days.", np: "नापियर: वर्षा सुरुमै स्लिप रोप्नुहोस्, करिब ६०–७० दिनमा पहिलो कटान, त्यसपछि ४०–५० दिनमा।" },
          { en: "Fodder trees: 3–4 m spacing on south boundaries; prune on rotation so something is always in leaf.", np: "चारा विरुवा: दक्षिण किनारमा ३–४ मि. फाट; चक्रैमा काट्नुहोस् जसले कुनै न कुनै हरियै रहोस्।" },
          { en: "Legume strips between crop rows feed both the animals and the soil.", np: "बालीको लहरबीचका कोसेबाली पट्टीले पशु र माटो दुवैलाई खुवाउँछ।" },
          { en: "Fodder banks on terrace risers stop needing land the crops need.", np: "लेकको कगारमा चारा-बैंकले बालीलाई चाहिने जग्गा नै नखोजी काम गर्छ।" },
        ],
      },
      {
        heading: { en: "Cut-and-carry discipline", np: "काटेर-ल्याउने अनुशासन" },
        body: {
          en: "Free grazing looks free but costs twice: slopes erode, and animals walk off feed energy they should convert to milk or weight. Cut-and-carry — harvesting fodder, chopping at two to three centimetres, and feeding in troughs — gets measurably more milk per basket of grass because nothing is trampled and intake climbs. It also concentrates manure where you want it instead of where the animal last stood.",
          np: "खुला चराउनु निःशुल्क देखिन्छ तर दोब्बर खर्च हुन्छ: भिर बग्छ, र पशुले दुध वा तौलमा बदल्नुपर्ने ऊर्जा हिँडेरै नष्ट गर्छ। काटेर-ल्याउने पद्धति — चारा काट्ने, २–३ से.मी.मा फाँड्ने, डोँचामा खुवाउने — त्यही गड्डी घाँसबाट स्पष्टै बढी दुध दिन्छ, किनकि कुनै चारा दलिँदैन र खाने मात्रा बढ्छ। यसले गुँड पनि पशु अन्तिम उभिएको ठाउँ होइन, तपाईंले चाहेको ठाउँमा केन्द्रित गर्छ।",
        },
      },
    ],
    tip: {
      en: "Plant this season for next season: the most common fodder failure is planting after the feed runs out. Fodder work belongs to the months of plenty.",
      np: "यो मौसुममा अर्को मौसुमका लागि रोप्नुहोस्: चाराको सबैभन्दा सामान्य असफलता — चारा सकिएपछि रोप्न थाल्नु। चाराको काम भरपुरका महिनाकै हो।",
    },
    sources: "Nepali agroforestry practice (fodder trees: badahar, khanayo, tanki, falem, kimbu, ipil-ipil); NARC fodder programme; cut-and-carry dairy feeding.",
    updated: "2026-09",
  },
  {
    id: "silage-hay",
    categoryId: "fodder",
    title: {
      en: "Silage & hay — banking the monsoon for the winter",
      np: "सिलेज र हे — वर्षालाई जाडोका लागि बैंकमा राख्नु",
    },
    summary: {
      en: "Surplus monsoon grass sealed airless becomes sweet December feed; the same grass dried right becomes hay that carries a farm through the hunger gap.",
      np: "वर्षाको बढी घाँस हावा नपस्ने गरी बन्द गरे प्यादो डिसेम्बरको आहार बन्छ; उही घाँस सही तरिकाले सुकाए भोक-खाडल पार गर्ने हे बन्छ।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "Silage in a pit or a plastic bale", np: "गड्डा वा प्लास्टिक बेलमा सिलेज" },
        body: {
          en: "Silage is fermentation: chop the crop (maize at milk-dough stage, Napier before it goes woody), pack it tight, seal it airless, and lactic bacteria turn sugar into acid that preserves the feed for months. The enemy is air — loose packing and slow sealing grow mould instead of silage. On small farms, either line a pit with plastic sheeting and trample layer by layer (wet feet, sweet feed) or roll chopped fodder into plastic bales, squeeze the air out and tape the seams. Open the seal only at feeding time, take from the face, and feed out fast; a opened pit that sits open spoils in days.",
          np: "सिलेज किण्वन हो: बाली फाँड्नुहोस् (दुधियो-गुलियो अवस्थाको मकै, काठ हुनुअघिको नापियर), कसेर थुप्र्नुहोस्, हावा नपस्ने गरी बन्द गर्नुहोस् — र ल्याक्टिक जीवाणुले चिनीलाई अम्लमा बदलेर महिनौंसम्म आहार जोगाइदिन्छ। शत्रु हावा हो — छर्लङ्ग थुप्रो र ढिलो बन्दले सिलेजको सट्टा ढुसी फुलाउँछ। साना फार्ममा या त गड्डामा प्लास्टिक बिछ्याएर तह-तह गरी कुल्चनुहोस् (भिजेको खुट्टा, प्यादो आहार) वा फाँडेको चारा प्लास्टिक बेलमा बेरेर हावा निचोर्नुहोस् र सिलाई-टेप गर्नुहोस्। बन्द खोल्नु खुवाउँदा मात्र, अनुहारबाट मात्र झिक्नुहोस्, र छिटो खुवाउनुहोस्; खुला छाडिएको गड्डा दिनैमा बिग्रन्छ।",
        },
      },
      {
        heading: { en: "Hay for the months silage can't reach", np: "सिलेजले नपुग्ने महिनाका लागि हे" },
        body: {
          en: "Hay is the simpler bank: cut grass at its leafy stage on a dry spell, dry it fast in the sun with a couple of turnings until stems snap rather than bend, then store it under cover off the ground. Speed is quality — rain on drying hay leaches the very nutrients you stored it for. Made right, hay carries protein and fibre through the last weeks of the dry season, and even a modest stack changes how calmly a farmer walks into February.",
          np: "हे सजिलो बैंक हो: पाते अवस्थामै घाँस काट्नुहोस्, घाम लागेको बेला दुई-तीन पल्ट फर्काउँदै छिटो सुकाउनुहोस् जतिबेला डाँठ त नझुकेर भाँचिन्छ, त्यसपछि जमिनबाट टाढा, छानोमुनि जोगाउनुहोस्। गति नै गुणस्तर हो — सुकिरहेको हेमा परेको वर्षाले जोगाउन खोजिएकै पोषक तत्त्व पखालिदिन्छ। राम्रो बनेको हेले सुक्खा मौसुमका अन्तिम हप्ताहरूभरि प्रोटिन र रेसा बोक्छ, र सामान्य थुप्रो नै भए पनि किसान फागुनतिर कति शान्त हिँड्छ भन्ने कुरा बदलिदिन्छ।",
        },
      },
    ],
    caution: {
      en: "Never feed mouldy silage or hay to pregnant animals — mould toxins cause abortion. If a bale smells musty or shows black/white mould, it is compost, not feed.",
      np: "गर्भवती पशुलाई ढुसी लागेको सिलेज/हे कहिल्यै नखुवाउनुहोस् — ढुसीको विषले गर्भपतन गराउँछ। बेलमा गन्ध वा कालो/सेतो ढुसी देखिए त्यो आहार होइन, कम्पोस्ट हो।",
    },
    sources: "Standard silage/haymaking practice (chop length, packing, moisture, mould risk); smallholder silage in South Asia.",
    updated: "2026-09",
  },
];

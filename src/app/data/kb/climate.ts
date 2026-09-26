import type { KBArticle } from "./types";

/** Climate adaptation articles. */
export const climateArticles: KBArticle[] = [
  {
    id: "climate-change-livestock-nepal",
    categoryId: "climate",
    title: {
      en: "Climate change & livestock in Nepal",
      np: "नेपालमा जलवायु परिवर्तन र पशुपालन",
    },
    summary: {
      en: "Nepal is warming about 0.056 °C a year and its mountains faster — buffalo feel it in milk, goats in worms, everyone in the monsoon's tantrums.",
      np: "नेपाल वर्षको करिब ०.०५६ डिग्रीले तात्दैछ, हिमाल झन् छिटो — भैंसीले दुधमा, बाख्राले कृमिमा, सबैले मनसुनको चढाउमा महसुस गर्छन्।",
    },
    readMinutes: 6,
    sections: [
      {
        heading: { en: "What the data says", np: "तथ्याङ्कले के भन्छ" },
        body: {
          en: "Nepal's average annual temperature has risen by about 0.056 °C per year — among the fastest national warming rates in South Asia — while high-mountain stations have warmed faster still (studies report mean trends around 0.03 °C per year since the 1970s across the Himalaya, with the sharpest rises in winter and at altitude). For farming, this arrives as weather that no longer keeps its promises: monsoon rain concentrated into fewer, heavier events; longer dry spells between them; winters that confuse wheat and fruit crops; and glacier-fed rivers that swing between flood and thin flow. The practical translation for a livestock farm: less reliable grass, more stress days for animals that hate heat, and parasites and disease vectors that no longer die back each winter as they used to.",
          np: "नेपालको औसत वार्षिक तापक्रम वर्षको करिब ०.०५६ डिग्रीले बढिरहेको छ — दक्षिण एसियाकै तीव्र दरमध्ये एक — जबकि उच्च-पहाडी क्षेत्र झन् छिटो तातिरहेका छन् (अध्ययनहरूले १९७० पछिको हिमालभरि औसत करिब ०.०३ डिग्री प्रतिवर्ष देखाउँछन्, जाडो र उचाइमा सबैभन्दा चर्को)। खेतीपातीका लागि यो त्यस्तो मौसम बनेर आउँछ जसले आफ्ना वाचा पूरा गर्दैन: मनसुनको पानी थोरै तर झन् भारी पटकमा केन्द्रित; बीचबीचमा लामो सुक्खा; गहुँ-फलफूललाई झुक्याउने जाडो; र हिमनदीका खोलाहरू बाढी र पातलो बहावबीच दोब्बरिनु। पशु फार्मका लागि व्यावहारिक अर्थ: घाँस कम भरपर्दो, गर्मी नमन्ने पशुलाई तनावका दिन बढी, र कृमि-रोगवाहकहरू पहिलेझैँ हरेक जाडो मरेर सफा हुँदैनन्।",
        },
      },
      {
        heading: { en: "Heat stress: the quiet milk thief", np: "गर्मी तनाव: चुपचाप दुध चोर्ने" },
        body: {
          en: "Buffalo suffer heat stress earlier than cattle — dark coat, fewer sweat glands and a big rumen fermenting away — and a stressed buffalo eats less and gives less within days. The cheap armour is shade: a simple thatched or net roof over the resting yard (shade beats direct sun by many degrees), water sprayed on the floor in the afternoon, and free-choice drinking water at body-cool temperature. Feed concentrate in the cool hours and push roughage to the evening so fermentation heat lands at night. These are one-week projects that pay every summer from now on.",
          np: "भैंसीले गाईभन्दा चाँडै गर्मी तनाव महसुस गर्छ — कालो रौँ, कम पसिना ग्रन्थि र ठूलो र्‍यामन अनवरत किण्वन गरिरहेको — र तनावमा परेकी भैंसीले केही दिनमै कम खान्छ, कम दुध दिन्छ। सस्तो कवच छहारी हो: आराम गर्ने चौरमा साधारण छर्रे वा जाली छानो (सिधै घामभन्दा धेरै डिग्री तल), दिउँसो भुइँमा पानी छर्कनु, र मन लाग्दा पिउन सधैं पानी। चिसो समयमा दाना र खस्रो चारा साँझतिर सार्नुहोस् जसले किण्वनको घाम साँझ परोस्। यी एक हप्ताका काम हुन्, अबका हरेक गर्मी तिर्छन्।",
        },
      },
      {
        heading: { en: "Feed, water and disease pressure", np: "चारा, पानी र रोगको दबाब" },
        body: {
          en: "Drought years collapse fodder and push farmers into over-buying feed at peak prices — the answer is the fodder bank from the fodder article: silage, hay and drought-hardy trees. Water points dry up and animals walk further for a drink; harvesting rain from the shed roof into a jar or pond is now core infrastructure, not a luxury. On the disease side, warmer, wetter seasons extend the transmission window for vectors like ticks and flies and let parasites overwinter; the counter is calendar discipline — vaccinations timed before the monsoon, deworming synced to the grass flush, and quarantine that never relaxes.",
          np: "सुक्खा वर्षमा चारा धराशायी हुन्छ र किसान चर्को भाउमा दाना किन्न बाध्य हुन्छन् — जवाफ चारा-बैंक नै हो: सिलेज, हे र सुक्खा-सह्य विरुवा। पानीका मुहान सुक्दा पशु पिउन नै टाढा हिँड्छन्; गोठको छानोबाट पानी भर्सामा वा पोखरीमा जोगाउनु अब विलासिता होइन, आधारभूत पूर्वाधार हो। रोगतर्फ तातो-भिजेको मौसुमले लौँडे-झिङाजस्ता वाहकको सर्ने समय लम्ब्याउँछ र कृमि जाडोमै बाँच्न थाल्छन्; जवाफ पात्रो-अनुशासन हो — वर्षाअघि खोप, घाँस बढ्ने बखिको कृमिनाशक, र कहिल्यै नढिलो हुने क्वारेन्टिन।",
        },
      },
    ],
    tip: {
      en: "Walk your farm in the hottest hour of the hottest month and stand where the animals stand — anywhere you would not sit for an hour is where shade and water belong.",
      np: "सबैभन्दा गर्मी महिनाको सबैभन्दा तातो घण्टामा फार्म फेर्नुहोस् र पशु उभिएकै ठाउँमा उभिनुहोस् — जहाँ तपाईं एक घण्टा बस्नुहुन्न, त्यहीँ छहारी र पानी चाहिन्छ।",
    },
    sources: "DHM/ICIMOD-reported warming (≈0.056 °C/yr national; Himalayan station trends ≈0.03 °C/yr; e.g. Shrestha et al. 1999, Chand et al. 2020); NCCS climate-risk framing; livestock heat-stress physiology.",
    updated: "2026-09",
  },
  {
    id: "climate-smart-crops",
    categoryId: "climate",
    title: {
      en: "Climate-smart crop practices for Nepali fields",
      np: "नेपाली खेतका लागि जलवायु-स्मार्ट अभ्यास",
    },
    summary: {
      en: "Mulch that keeps rain in, rain jars that end the dry-spell panic, and early-sown, short-duration varieties — resilience is mostly timing and cover.",
      np: "पानी जोगाउने मल्च, सुक्खा-आतंक टार्ने वर्षा-भर्सा, र चाँडो रोपिने छोटो-अवधिका जात — लचकता धेरैजसो समय र छाताकै कुरा हो।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "Keep the rain where it lands", np: "वर्षा जहाँ पर्यो त्यहीँ राख्नु" },
        body: {
          en: "When rain arrives in heavy bursts, bare soil answers with runoff — the field loses both its water and its topsoil in the same afternoon. Mulching crop residue between rows, maintaining terrace bunds intact with grass on them, and incorporating compost so the soil itself holds more water are the oldest water-harvesting technologies there are. Small farm ponds and roof-fed jars bridge the dry spells that now break the monsoon; even a few thousand litres let a farmer water a vegetable bed through a two-week pause instead of watching it bolt or burn.",
          np: "पानी भारी झन्डामा आउँदा खाली माटो बहावसँग जवाफ फर्काउँछ — खेतले एउटै दिउँसो पानी पनि, माथिल्लो माटो पनि गुमाउँछ। लहरबीच बालीको डाँठ-पराल मल्च गर्नु, लेकका डिल्लो घाँससहित जोगाउनु, र गुन्द्री हालेर माटो आफैँले बढी पानी समातोस् बनाउनु — यी सबैभन्दा पुराना पानी-सङ्कलन प्रविधि हुन्। साना फार्म-पोखरी र छानोबाट भरिने भर्साले मनसुन तोड्ने सुक्खा पुल तान्छन्; केही हजार लिटर मात्रै भए पनि किसानले दुई हप्ताको पखौलीमा तरकारी बेड सिँच्न सक्छ, हेरेर फुल्न वा जल्न छाड्नुपर्दैन।",
        },
      },
      {
        heading: { en: "Timing beats inputs", np: "औजार होइन, समय जित्छ" },
        body: {
          en: "The cheapest climate adaptation is a calendar, not a bag: sowing at the first reliable shift rather than the traditional date lets crops dodge the hottest grain-fill weeks, and short-duration varieties shorten the risky window at both ends. Seed priming (soaking seed overnight before sowing) buys emergence speed in cold or drying seedbeds. On slopes, agroforestry rows and hedge lacing with fodder trees slow wind, drop evaporation and give the farm a second income — the practices in the fodder article are climate adaptation wearing a different hat.",
          np: "सबैभन्दा सस्तो जलवायु अनुकूलन झोला होइन, पात्रो हो: परम्परागत मिति होइन, पहिलो भरपर्दो मौसम-परिवर्तनमै रोप्नुले बालीलाई सबैभन्दा तातो दाना-भर्ने हप्ताबाट जोगाउँछ, र छोटो-अवधिका जातले दुवै छेउको जोखिम झ्याल छोटो बनाउँछन्। बीउ-प्राइमिङ (रोप्नुअघि रातभरि बीउ भिजाउनु) चिसो वा सुक्दै गरेको बीउ-माटोमा उम्रने गति दिन्छ। भिरमा चारा-विरुवाका लहर र बारले हावा मन्द पार्छ, वाष्पीकरण घटाउँछ र फार्मलाई दोस्रो आम्दानी दिन्छ — चारा लेखका अभ्यास नै फरक टोपी लगाएको जलवायु अनुकूलन हुन्।",
        },
      },
    ],
    sources: "Climate-smart agriculture principles (FAO/CSA); Nepali monsoon variability literature; slope-farming and agroforestry practice.",
    updated: "2026-09",
  },
];

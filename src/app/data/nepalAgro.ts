/**
 * Province agricultural profiles for the interactive Nepal map.
 *
 * Structure per province:
 *  · area / districts / population — census & Wikipedia-verified constants
 *  · belts — dominant ecological zones (qualitative, well-established)
 *  · crops / livestock — signature production (established agronomy +
 *    verified production figures where the SINA/MoALD numbers exist)
 *  · climate — observed warming/rainfall pressure + adaptation focus
 *    (DHM / ICIMOD literature)
 *
 * National figures used on the page (all verified, see sources at the
 * bottom of the page):
 *  · Agriculture ≈ 22% of GDP (FEWS NET Nepal context report, 2026)
 *  · Paddy ≈ 5.6 M t from ≈ 1.47 M ha (record 2019/20, MoALD SINA)
 *  · Maize ≈ 3.0 M t from ≈ 0.98 M ha (MoALD SINA)
 *  · Wheat ≈ 2.1 M t (USDA FAS MY2025/26; Kafle et al. 2024: 2,144,568 t)
 *  · Milk: buffalo ≈ 64%, cattle ≈ 36% (Poudel et al. 2020, Vaccines 8:322)
 *  · Eggs ≈ 1.6 billion per year (2021 est.)
 *  · Warming ≈ +0.056 °C/year national average (DHM), faster in the high
 *    mountains; Karnali/Mountain winter warming sharpest
 */

export interface ProvinceProfile {
  id: "Koshi" | "Madhesh" | "Bagmati" | "Gandaki" | "Lumbini" | "Karnali" | "Sudurpashchim";
  npName: string;
  areaKm2: number;
  districts: number;
  districtList: string[];
  population: string;
  capital: { en: string; np: string };
  belts: { en: string; np: string };
  crops: { en: string[]; np: string[] };
  livestock: { en: string[]; np: string[] };
  climate: { en: string; np: string };
  stat: { en: string; np: string };
}

export const PROVINCES: ProvinceProfile[] = [
  {
    id: "Koshi",
    npName: "कोशी",
    areaKm2: 25905,
    districts: 14,
    districtList: ["Taplejung", "Panchthar", "Ilam", "Jhapa", "Morang", "Sunsari", "Dhankuta", "Tehrathum", "Sankhuwasabha", "Bhojpur", "Solukhumbu", "Okhaldhunga", "Khotang", "Udayapur"],
    population: "≈ 4.9 M",
    capital: { en: "Biratnagar", np: "विराटनगर" },
    belts: {
      en: "Terai plains in the south · fertile eastern hills · snow peaks including Everest to the north",
      np: "दक्षिणमा तराई मैदान · उर्वर पूर्वी पहाड · उत्तरमा सगरमाथासहित हिमशिखर",
    },
    crops: {
      en: [
        "Paddy ≈ 1.26 million t and maize ≈ 0.92 million t — the eastern breadbasket (SINA)",
        "Ilam's tea gardens and large-cardamom belts earn export income",
        "Ginger, potato and citrus on the mid-hills",
      ],
      np: [
        "धान करिब १२.६ लाख टन र मकै करिब ९.२ लाख टन — पूर्वी अन्नभण्डार (SINA)",
        "इलामको चिया बगान र ठूलो एलाच क्षेत्र निर्यात आम्दानी दिन्छ",
        "मध्यपहाडमा अदुवा, आलु र सिट्रस",
      ],
    },
    livestock: {
      en: [
        "Intensive dairy in the eastern Terai and Ilam hills feeding the Biratnagar–Dharan milk market",
        "Yaks and Chyangra goats above the alpine line in Taplejung/Sankhuwasabha",
      ],
      np: [
        "पूर्वी तराई र इलामका पहाडमा घना डेयरी — विराटनगर–धरान दुध बजार धान्छ",
        "ताप्लेजुङ/साङ्खुवासभाको वर्षारेखामाथि याक र च्याङ्ग्रा",
      ],
    },
    climate: {
      en: "The eastern hills receive some of Nepal's heaviest monsoon rain — landslides and terrace loss are the recurring cost; cardamom and tea are shifting upslope as temperatures rise.",
      np: "पूर्वी पहाडमा नेपालकै भारी मनसुन पर्छ — पहिरो र लेक क्षति बारम्बार तिर्नुपर्ने मूल्य हो; ताप बढ्दै जाँदा एलाच-चिया माथि सर्दैछन्।",
    },
    stat: { en: "Largest maize producer among provinces", np: "प्रदेशहरूमै सबैभन्दा धेरै मकै" },
  },
  {
    id: "Madhesh",
    npName: "मधेश",
    areaKm2: 9661,
    districts: 8,
    districtList: ["Saptari", "Siraha", "Dhanusha", "Mahottari", "Sarlahi", "Rautahat", "Bara", "Parsa"],
    population: "≈ 6.1 M",
    capital: { en: "Janakpur", np: "जनकपुर" },
    belts: {
      en: "Almost entirely Terai plains — the flattest, most irrigable province",
      np: "लगभग पूरै तराई मैदान — सबैभन्दा समथर र सिँचाइयोग्य प्रदेश",
    },
    crops: {
      en: [
        "Paddy ≈ 1.39 million t — the national leader (SINA)",
        "Wheat ≈ 0.6 million t from ≈ 0.3 M ha — the wheat heartland",
        "Sugarcane, pulses, oilseed mustard, mango and fish ponds on village tanks",
      ],
      np: [
        "धान करिब १३.९ लाख टन — राष्ट्रिय अगुवा (SINA)",
        "गहुँ करिब ६ लाख टन, करिब ३ लाख हेक्टरबाट — गहुँको गढ",
        "उखु, दालेबाली, तोरी, आँप र गाउँका पोखरीमा माछा",
      ],
    },
    livestock: {
      en: [
        "Dense buffalo dairy belt with strong cooperative chilling networks",
        "Fast-growing broiler and layer pockets serving the plains' towns",
      ],
      np: [
        "घना भैंसी डेयरी पट्टी — बलियो सहकारी चिलिङ जाल",
        "तराईका सहरहरूलाई धान्न छिटो बढ्दा ब्रोइलर-लेयर क्षेत्र",
      ],
    },
    climate: {
      en: "Plains agriculture faces summer heat beyond 40 °C and flash floods from sudden cloudbursts; irrigation timing and short-duration varieties are the main adaptation levers.",
      np: "मैदानको खेती ४० डिग्रीनाघ्ने गर्मी र झरीको अचानक बाढीसँग जुधिरहेको छ; सिँचाइको समय र छोटो-अवधिका जात नै प्रमुख अनुकूलन चुङ्गा हुन्।",
    },
    stat: { en: "Smallest province, largest paddy output", np: "सबैभन्दा सानो प्रदेश, सबैभन्दा ठूलो धान" },
  },
  {
    id: "Bagmati",
    npName: "बागमती",
    areaKm2: 20300,
    districts: 13,
    districtList: ["Dolakha", "Sindhupalchok", "Ramechhap", "Sindhuli", "Kavrepalanchok", "Bhaktapur", "Lalitpur", "Kathmandu", "Nuwakot", "Rasuwa", "Dhading", "Makwanpur", "Chitawan"],
    population: "≈ 6.1 M",
    capital: { en: "Kathmandu (Hetauda)", np: "काठमाडौँ (हेटौडा)" },
    belts: {
      en: "Kathmandu valley + Mahabharat hills + Terai strip in the south — every belt in one province",
      np: "काठमाडौँ उपत्यका + महाभारत पहाड + दक्षिणको तराई पट्टी — एउटै प्रदेशमा सबै भेग",
    },
    crops: {
      en: [
        "Paddy ≈ 0.51 million t plus the valley's intensive vegetable rings",
        "High-hill potato and off-season vegetables from Rasuwa/Dhading",
        "Coffee and citrus pockets on the mid-hills",
      ],
      np: [
        "धान करिब ५.१ लाख टनसँगै उपत्यकाका तीव्र तरकारी घेराहरू",
        "रसुवा/धादिङको उच्चपहाडी आलु र समयमुनिका तरकारी",
        "मध्यपहाडमा कफी र सिट्रस",
      ],
    },
    livestock: {
      en: [
        "Peri-urban dairy supplying the Kathmandu valley's daily milk demand",
        "Layer flocks around Bhaktapur–Dhading; strong poultry-feed economy",
      ],
      np: [
        "काठमाडौँ उपत्यकाको दैनिक दुध माग धान्न सहरछेउकै डेयरी",
        "भक्तपुर–धादिङवरिपरि लेयर बथान; बलियो कुखुरा-दाना अर्थतन्त्र",
      ],
    },
    climate: {
      en: "The valley has warmed about a degree since the mid-1970s; urban heat and valley haze add to farm stress, while hill orchards bloom early and lose flowers to late cold snaps.",
      np: "१९७० को दशकदेखि उपत्यका करिब एक डिग्री तातेको छ; सहरी घाम र धुँधले थप दबाब दिन्छ, पहाडका बगैंचा चाँडै फुलेर ढिलो चिसोमा फुल गुमाउँछन्।",
    },
    stat: { en: "Largest population, biggest milk market", np: "सबैभन्दा ठूलो जनसंख्या, सबैभन्दा ठूलो दुध बजार" },
  },
  {
    id: "Gandaki",
    npName: "गण्डकी",
    areaKm2: 21504,
    districts: 11,
    districtList: ["Manang", "Mustang", "Myagdi", "Kaski", "Lamjung", "Gorkha", "Tanahu", "Syangja", "Parbat", "Baglung", "Nawalparasi East"],
    population: "≈ 2.4 M",
    capital: { en: "Pokhara", np: "पोखरा" },
    belts: {
      en: "Annapurna massif + deep river valleys + Pokhara basin + southern Terai edge",
      np: "अन्नपूर्ण शिखर + गहिरा खोँच + पोखरा भन्डार + दक्षिणी तराई किनार",
    },
    crops: {
      en: [
        "Maize-millet systems on the hills; paddy in the Pokhara and Damauli valleys",
        "Mustang's famous apples and Jomsom's seed potatoes in the rain-shadow",
        "Vegetable and bee-keeping cooperatives across Syangja/Kaski",
      ],
      np: [
        "पहाडमा मकै-कोदो प्रणाली; पोखरा र दमौली उपत्यकामा धान",
        "वर्षा-छायाँ क्षेत्र मुस्ताङको प्रसिद्ध स्याउ र जोमसोमको बीउ आलु",
        "स्याङ्जा/कास्कीभरि तरकारी र मौरीपालन सहकारी",
      ],
    },
    livestock: {
      en: [
        "Chyangra goats and sheep flocks on trans-Himalayan pastures",
        "High-hill dairy and yak products (churpi, ghee) with tourism-linked demand",
      ],
      np: [
        "हिमालपारि चरनमा च्याङ्ग्रा र भेडा बथान",
        "उच्चपहाडी डेयरी र याकजन्य उत्पादन (छुर्पी, घ्यू) — पर्यटनसँग जोडिएको माग",
      ],
    },
    climate: {
      en: "The rain-shadow districts (Mustang, Upper Manang) are Nepal's driest farms — glacier retreat and changing snowpack are re-writing their water calendar.",
      np: "वर्षा-छायाँ जिल्ला (मुस्ताङ, माथिल्लो मनाङ) नेपालका सबैभन्दा सुक्खा खेत हुन् — हिमनदी पग्लिरहँदा तिनको पानीको पात्रो फेरिँदैछ।",
    },
    stat: { en: "Rain-shadow apple & seed-potato country", np: "वर्षा-छायाँको स्याउ-बीउ आलु क्षेत्र" },
  },
  {
    id: "Lumbini",
    npName: "लुम्बिनी",
    areaKm2: 22288,
    districts: 12,
    districtList: ["Nawalparasi", "Rupandehi", "Kapilbastu", "Palpa", "Arghakhanchi", "Gulmi", "Pyuthan", "Rolpa", "Dang", "Banke", "Bardiya", "Rukum"],
    population: "≈ 5.1 M",
    capital: { en: "Butwal (Deukhuri)", np: "बुटवल (देउखुरी)" },
    belts: {
      en: "Broad Terai plains with the Babai-Rapti rivers · inner mid-hills to the north",
      np: "बबई-राप्ती नदीसहितको फराकिलो तराई · उत्तरमा भित्री मध्यपहाड",
    },
    crops: {
      en: [
        "The rice–wheat–sugarcane engine: paddy and wheat among the national top two, Kapilvastu/Banke sugarcane supplying mills",
        "Mustard and mango belts; inner-hill coffee (Palpa/Gulmi) rising fast",
      ],
      np: [
        "धान–गहुँ–उखुको इन्जिन: धान र गहुँमा राष्ट्रिय अग्र दुईमध्ये एक, कपिलवस्तु/बाँकेको उखु मिल धान्छ",
        "तोरी र आँप पट्टी; भित्री पहाडको कफी (पाल्पा/गुल्मी) छिटो उकालिँदै",
      ],
    },
    livestock: {
      en: [
        "Buffalo dairy and goat finishing herds across the plains",
        "Lumbini's egg and broiler corridors among Nepal's densest",
      ],
      np: [
        "तराईभरि भैंसी डेयरी र बाख्रा मोटो गर्ने बथान",
        "लुम्बिनीका अन्डा-ब्रोइलर करिडोर नेपालकै घना",
      ],
    },
    climate: {
      en: "Rivers draining the hills now swing between flood and thin flow — riverine vegetable and sugarcane fields are the first casualties of erratic monsoon bursts.",
      np: "पहाडबाट ओर्लने नदीहरू बाढी र पातलो बहावबीच दोब्बरिएका छन् — नदी छेउका तरकारी-उखु खेत अनियमित मनसुनको पहिलो दलाल बन्छन्।",
    },
    stat: { en: "Rice–wheat–sugarcane heartland", np: "धान–गहुँ–उखुको गढ" },
  },
  {
    id: "Karnali",
    npName: "कर्णाली",
    areaKm2: 27984,
    districts: 10,
    districtList: ["Dolpa", "Mugu", "Humla", "Jumla", "Kalikot", "Dailekh", "Jajarkot", "Surkhet", "Salyan", "Rukum West"],
    population: "≈ 1.7 M",
    capital: { en: "Birendranagar (Surkhet)", np: "वीरेन्द्रनगर (सुर्खेत)" },
    belts: {
      en: "The largest province by area — high Himalayan districts plus the Surkhet valley",
      np: "क्षेत्रफलमा सबैभन्दा ठूलो प्रदेश — उच्च हिमाली जिल्ला र सुर्खेत उपत्यका",
    },
    crops: {
      en: [
        "Jumla's altitude-tolerant rice (at ~2,200 m+) and famous apples",
        "Buckwheat, barley, millet and disease-free seed potatoes in the high valleys",
        "Off-season vegetables expanding around Surkhet's growing market",
      ],
      np: [
        "जुम्लाको उचाइ-सह्य धान (करिब २,२०० मि.माथि) र प्रसिद्ध स्याउ",
        "उच्च उपत्यकामा फापर, जौ, कोदो र रोगमुक्त बीउ आलु",
        "सुर्खेतको बढ्दो बजारवरिपरि समयमुनिका तरकारी फैलिँदै",
      ],
    },
    livestock: {
      en: [
        "Chyangra cashmere goats, yaks and mountain horses — the transhumance heartland",
        "Nepal's sharpest winter warming adds stress to already-harsh high-altitude herding",
      ],
      np: [
        "च्याङ्ग्रा (कास्मियर), याक र पहाडी घोडा — परम्परागत चरन-प्रणालीको गढ",
        "नेपालकै चर्को जाडो-ताप वृद्धिले नै कठिन उच्च-पहाडी पशुपालनमा थप दबाब",
      ],
    },
    climate: {
      en: "Mountain districts record Nepal's sharpest winter warming; drought-tolerant millets, apple orchards moving upslope and solar lift-irrigation define the adaptation frontier.",
      np: "हिमाली जिल्लामा नेपालकै तीव्र जाडो-ताप वृद्धि रेकर्ड भएको छ; सुक्खा-सह्य कोदो, माथि सर्दै गरेका स्याउ बगैंचा र सोलार लिफ्ट-सिँचाइ अनुकूलनको अग्रिम मोर्चा हुन्।",
    },
    stat: { en: "Largest area, sparsest population", np: "सबैभन्दा ठूलो क्षेत्र, सबैभन्दा बिरलो बस्ती" },
  },
  {
    id: "Sudurpashchim",
    npName: "सुदूरपश्चिम",
    areaKm2: 19539,
    districts: 9,
    districtList: ["Bajura", "Bajhang", "Darchula", "Baitadi", "Dadeldhura", "Doti", "Achham", "Kailali", "Kanchanpur"],
    population: "≈ 2.5 M",
    capital: { en: "Dhangadhi", np: "धनगढी" },
    belts: {
      en: "Far-west Terai (Kailali/Kanchanpur) · remote high hills of Bajura/Bajhang/Darchula",
      np: "सुदूरपश्चिम तराई (कैलाली/कञ्चनपुर) · बाजुरा/बझाङ/दार्चुलाका टाढाका उच्च पहाड",
    },
    crops: {
      en: [
        "Paddy and wheat in the Kailali–Kanchanpur plains with expanding irrigation",
        "Millet, buckwheat, potato and dry-hill beans in the high hills",
        "Torai (riverbank) vegetable farming along the Mahakali",
      ],
      np: [
        "कैलाली–कञ्चनपुर मैदानमा बढ्दो सिँचाइसँगै धान र गहुँ",
        "उच्च पहाडमा कोदो, फापर, आलु र सुक्खा-पहाडी सिमी",
        "महाकाली किनारको तोडे तरकारी खेती",
      ],
    },
    livestock: {
      en: [
        "Goat farming central to household economies — strong Dashain sales flows",
        "Buffalo dairies growing around Dhangadhi's urban demand",
      ],
      np: [
        "घरको अर्थतन्त्रको केन्द्रमा बाख्रा पालन — दशैँको बलियो बिक्री प्रवाह",
        "धनगढीको सहरी मागवरिपरि बढ्दा भैंसी डेयरी",
      ],
    },
    climate: {
      en: "Remote hill villages face drying springs — the far-west's most reported water stress — while the plains oscillate between floods and heat; spring-source protection and rain harvesting lead the response.",
      np: "टाढाका पहाडी गाउँमा मुहान सुक्दै जाने सुदूरपश्चिमको सबैभन्दा प्रचलित पानी-समस्या छ, मैदान बाढी-गर्मीबीच दोब्बरिन्छ; मुहान संरक्षण र वर्षा-सङ्कलन अग्रिम जवाफ हुन्।",
    },
    stat: { en: "Goat economy + far-west frontier farms", np: "बाख्रा अर्थतन्त्र + सुदूरपश्चिमका नयाँ खेत" },
  },
];

export const provinceById = (id: string) => PROVINCES.find((p) => p.id === id);

/** National stat cards shown under the map (all verified — see page sources). */
export const NATIONAL_STATS = [
  {
    value: "≈22%",
    label: { en: "of Nepal's GDP is agriculture", np: "नेपालको GDP मा कृषिको हिस्सा" },
    note: { en: "FEWS NET, 2026", np: "FEWS NET, 2026" },
  },
  {
    value: "5.6M t",
    label: { en: "paddy in the record year (1.47 M ha)", np: "कीर्तिमान वर्षको धान (१४.७ लाख हे.)" },
    note: { en: "MoALD SINA 2019/20", np: "MoALD SINA 2019/20" },
  },
  {
    value: "3.0M t",
    label: { en: "maize — 2/3 of it becomes feed", np: "मकै — दुई तिहाइ दानामा जान्छ" },
    note: { en: "MoALD SINA", np: "MoALD SINA" },
  },
  {
    value: "2.1M t",
    label: { en: "wheat from the winter window", np: "जाडो झ्यालको गहुँ" },
    note: { en: "USDA FAS / Kafle 2024", np: "USDA FAS / Kafle 2024" },
  },
  {
    value: "64%",
    label: { en: "of Nepal's milk comes from buffalo", np: "नेपालको दुधमा भैंसीको हिस्सा" },
    note: { en: "Poudel et al. 2020", np: "Poudel et al. 2020" },
  },
  {
    value: "1.6B",
    label: { en: "eggs laid in a year (2021 est.)", np: "वर्षेनी अन्डा (2021 अनुमान)" },
    note: { en: "Nepali poultry statistics", np: "नेपाली कुखुरा तथ्याङ्क" },
  },
  {
    value: "+0.056°C",
    label: { en: "per year — Nepal's warming rate", np: "प्रतिवर्ष — नेपालको ताप वृद्धि दर" },
    note: { en: "DHM analyses", np: "DHM विश्लेषण" },
  },
  {
    value: "77",
    label: { en: "districts · 7 provinces on this map", np: "जिल्ला · यो नक्सामा ७ प्रदेश" },
    note: { en: "incl. Limpiyadhura in Darchula", np: "दार्चुलामा लिम्पियाधुरासहित" },
  },
];

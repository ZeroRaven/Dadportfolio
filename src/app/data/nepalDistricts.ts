/**
 * DISTRICT PROFILES — all 77 districts of Nepal (bilingual EN/NP).
 *
 * Each profile covers, per district:
 *   · hq        — administrative headquarters
 *   · belt      — ecological belts (Terai / Chure / mid-hills / high hills /
 *                 trans-Himalayan rain-shadow)
 *   · knownFor  — the district's signature agricultural identity
 *   · crops     — dominant & signature cultivation
 *   · livestock — dominant livestock systems
 *   · ecology   — flora, fauna, protected areas & wetlands
 *   · climate   — observed climate pressure + the adaptation frontier
 *
 * District NAME strings are the exact keys used by the `nepal-district-map`
 * package (77 keys verified against DISTRICT_NAMES).
 *
 * Sources (established & re-verifiable): MoALD Statistical Information on
 * Nepalese Agriculture (district tables), NARC/DOA district pocket-area
 * programmes, DNPWC protected-area network, ICIMOD/DHM climate analyses,
 * National Population & Housing Census 2021 (province roll-ups), and
 * peer-reviewed district case studies cited per fact. Qualitative claims
 * ("among the top…", "famous for…") reflect consistently reported SINA
 * rankings and extension literature rather than a single-year snapshot.
 */

export interface DistrictProfile {
  name: string; // exact map key
  np: string;
  hq: { en: string; np: string };
  belt: { en: string; np: string };
  knownFor: { en: string; np: string };
  crops: { en: string[]; np: string[] };
  livestock: { en: string[]; np: string[] };
  ecology: { en: string; np: string };
  climate: { en: string; np: string };
}

export const DISTRICTS: DistrictProfile[] = [
  /* ════════════════════════════════ KOSHI (14) ═══════════════════════════ */
  {
    name: "Taplejung",
    np: "ताप्लेजुङ",
    hq: { en: "Taplejung", np: "ताप्लेजुङ" },
    belt: { en: "High Himalaya · high hills · mid-hills in the south", np: "उच्च हिमाल · उच्च पहाड · दक्षिणमा मध्यपहाड" },
    knownFor: { en: "Cardamom & cashmere-goat country under Kangchenjunga", np: "काञ्चनजुङ्गाको छहारीमा एलाच र कास्मियर बाख्रा" },
    crops: {
      en: ["Large cardamom — Taplejung anchors Nepal's top cardamom belt with Sankhuwasabha and Panchthar", "High-hill potato, buckwheat, millet and maize on the terraces"],
      np: ["ठूलो एलाच — साङ्खुवासभा र पाँचथरसँगै नेपालको उत्कृष्ट एलाच पट्टीको गढ", "उच्चपहाडी आलु, फापर, कोदो र लेकका बारीमा मकै"],
    },
    livestock: {
      en: ["Chyangra (cashmere) goats and yaks above the alpine line — transhumance herds move between fixed summer and winter pastures"],
      np: ["वर्षारेखामाथि च्याङ्ग्रा (कास्मियर) र याक — गर्मी-जाडोका निश्चित चरनबीच सर्ने बथान"],
    },
    ecology: {
      en: "Kangchenjunga Conservation Area (8,586 m — world's third-highest peak): red panda and snow leopard habitat, alpine meadows and juniper-rhododendron shrub lines; the Tamor river drains deep gorges.",
      np: "काञ्चनजुङ्गा संरक्षण क्षेत्र (८,५८६ मि. — विश्वको तेस्रो अग्लो शिखर): रातो पाण्डा र हिउँ चितुवाको बासस्थान, लेकका माल र धुपी–लालीगुराँस झाडी; तमोर नदी गहिरा खोँच बनाउँछ।",
    },
    climate: {
      en: "Southern slopes catch some of Nepal's heaviest monsoon rain — landslides carry away terraces, and cardamom is climbing to higher, cooler belts as the lower hills warm.",
      np: "दक्षिणी ढालमा नेपालकै भारी मनसुन पर्छ — पहिरोले गह्राहरू बगाउँछ, तल्लो पहाड ताप बढ्दै जाँदा एलाच माथि सर्दैछ।",
    },
  },
  {
    name: "Panchthar",
    np: "पाँचथर",
    hq: { en: "Phidim", np: "फिदिम" },
    belt: { en: "Mid-hills with high-hill top ridge", np: "मध्यपहाड, माथि उच्चपहाडी धार" },
    knownFor: { en: "Tea, cardamom and dairy on the eastern mid-hills", np: "पूर्वी मध्यपहाडको चिया, एलाच र डेयरी" },
    crops: {
      en: ["Tea gardens on the Ilam border — Panchthar forms the eastern tea triangle", "Large cardamom, ginger, maize and millet; orange orchards on warm slopes"],
      np: ["इलाम किनारमा चिया बगान — पाँचथर पूर्वी चिया त्रिकोणको एक कुनो", "ठूलो एलाच, अदुवा, मकै, कोदो; न्यानो ढालमा सुन्तला बगैंचा"],
    },
    livestock: {
      en: ["Dairy cattle and buffalo supplying the hill towns; goat keeping is central to household cash flow"],
      np: ["पहाडी सहर धान्न गाईभैंसी डेयरी; घरखर्च धान्न बाख्रा पालन केन्द्रमा"],
    },
    ecology: {
      en: "Mid-hill forests of schima-castanopsis and chir pine with red panda records in community forests; the Tamor and Sankhuwa rivers cut the valleys.",
      np: "काफल–सल्लो र खोँयर समुदायका जङ्गल, सामुदायिक वनमा रातो पाण्डाका अभिलेख; तमोर–साङ्खुवा नदीले उपत्यका काट्छन्।",
    },
    climate: {
      en: "Steep terrain plus intense monsoon bursts make erosion and landslide the first farm risk; slope-oriented cardamom-orchard drainage is the local adaptation.",
      np: "भिरालो भूबनोट र झरीका मुस्याउँदा पहिरो नै पहिलो जोखिम; एलाच बगैंचामा दायाँ-बायाँ पानी निकास अनुकूलनको स्थानीय जवाफ हो।",
    },
  },
  {
    name: "Ilam",
    np: "इलाम",
    hq: { en: "Ilam", np: "इलाम" },
    belt: { en: "Mid-hills (Mahabharat range)", np: "मध्यपहाड (महाभारत श्रेणी)" },
    knownFor: { en: "Nepal's tea capital", np: "नेपालको चिया राजधानी" },
    crops: {
      en: ["Tea — Ilam leads national output, from smallholder gardens to orthodox factories", "Large cardamom, potato seed, ginger and vegetable pockets for the eastern market"],
      np: ["चिया — साना किसानदेखि अर्थोडक्स कारखानासम्म इलाम राष्ट्रिय उत्पादनमा अगुवा", "ठूलो एलाच, बीउ आलु, अदुवा र पूर्वी बजारका तरकारी खेत"],
    },
    livestock: {
      en: ["One of the strongest hill dairy belts — crossbred cows and buffalo feed the Ilam–Biratnagar milk corridor"],
      np: ["बलियो पहाडी डेयरी पट्टी — सङ्कर गाईभैंसीले इलाम–विराटनगर दुध करिडोर धान्छ"],
    },
    ecology: {
      en: "Misty broadleaf forests are red panda habitat; community forestry is among Nepal's oldest and most successful traditions here.",
      np: "कुहिँरो चौर जङ्गल रातो पाण्डाको बासस्थान; सामुदायिक वन यहाँ नेपालकै पुरानो र सफल परम्परा हो।",
    },
    climate: {
      en: "Fog, drizzle and heavy monsoon define the climate; tea quality follows the mist belt, and unseasonal hailstorms are the growing threat to first flush.",
      np: "कुहिँरो, झिकी र भारी मनसुन यहाँको मौसम हो; चियाको गुणस्तर कुहिँरो पट्टीसँग जोडिएको छ, समय नमिलेर लाग्ने चिहाँडो पहिलो तुहार्ने जोखिम बन्दैछ।",
    },
  },
  {
    name: "Jhapa",
    np: "झापा",
    hq: { en: "Chandragadhi", np: "चन्द्रगढी" },
    belt: { en: "Terai plains (lowest district of Nepal)", np: "तराई मैदान (नेपालको सबैभन्दा होचो जिल्ला)" },
    knownFor: { en: "Rice bowl with tea gardens and dairy cooperatives", np: "चिया बगान र डेयरी सहकारीसहितको अन्नभण्डार" },
    crops: {
      en: ["Consistently among Nepal's top paddy districts by production", "Expanding tea estates, mustard, jute heritage and vegetable belts to Damak–Birtamod"],
      np: ["उत्पादनमा निरन्तर नेपालका अग्र धान जिल्लामध्ये एक", "फैलिँदा चिया बगान, तोरी, पुरानो पट्टीको जुट र दमक–बिर्तामोडसम्म तरकारी पट्टी"],
    },
    livestock: {
      en: ["Dense buffalo- and crossbred-cow dairy network — one of the country's strongest cooperative chilling chains", "Layer and broiler pockets serving the eastern corridor"],
      np: ["घना भैंसी–सङ्कर गाई डेयरी जाल — देशकै बलियो सहकारी चिलिङ श्रृङ्खला", "पूर्वी करिडोरका लागि लेयर–ब्रोइलर खेत"],
    },
    ecology: {
      en: "The Bahundangi–Kankarbhitta belt sits on the wild-elephant migration corridor — human–elephant conflict management is a daily reality; Sal forests and wetlands (Kankai) frame the plains.",
      np: "बहुनडाँगी–काँकडभिट्टा पट्टी जङ्गी हात्तीको बसाइसराइ मार्गमा पर्छ — हात्ती–मानव द्वन्द्व व्यवस्थापन दैनिक वास्तविकता; साल वन र (कान्काई) का विसाउँले मैदान घेर्छन्।",
    },
    climate: {
      en: "Hot humid summers above 38 °C, Koshi-side flood pulses and cloudbursts; drainage timing for paddy and short-duration varieties are the working adaptations.",
      np: "३८ डिग्रीनाघ्ने गर्मी, कोशीपट्टिको बाढी र झरी; धानको निकास व्यवस्थापन र छोटो-अवधिका जात व्यवहारिक अनुकूलन हुन्।",
    },
  },
  {
    name: "Morang",
    np: "मोरङ",
    hq: { en: "Biratnagar", np: "विराटनगर" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "The eastern breadbasket and agro-industrial hub", np: "पूर्वी अन्नभण्डार र कृषि-उद्योग केन्द्र" },
    crops: {
      en: ["Paddy — Morang is a permanent member of Nepal's top paddy districts; maize follows in the rotation", "Mustard, jute heritage, potato and peri-urban vegetables ring Biratnagar"],
      np: ["धान — मोरङ नेपालका उत्कृष्ट धान जिल्लाको स्थायी सदस्य; फेरबदलीमा मकै", "तोरी, पट्टीको जुट, आलु र विराटनगर घेर्ने सहरछेउका तरकारी"],
    },
    livestock: {
      en: ["Poultry and dairy at commercial scale — feed mills, hatcheries and chilling plants cluster around the Biratnagar market"],
      np: ["व्यावसायिक स्तरका कुखुरा र डेयरी — दाना मिल, ह्याचरी र चिलिङ विराटनगर बजारवरिपरि जम्मा छन्"],
    },
    ecology: {
      en: "Rani–Talaho wetlands and remnant Sal forests; the Budhi/Singhiya streams drain into the Koshi system.",
      np: "रानी–तलाहो विसाउँ र बाँकी साल वन; बुढी–सिङ्गिया खोला कोशी प्रणालीमा मिसिन्छन्।",
    },
    climate: {
      en: "Heat waves, drainage congestion and riverine flooding during monsoon bursts; heat-tolerant varieties and raised-bed vegetable culture are spreading.",
      np: "गर्मीको लहर, निकास अवरोध र मनसुनको नदी बाढी; गर्मी-सह्य जात र थुप्रो (रेज्ड-बेड) तरकारी खेती फैलिँदै।",
    },
  },
  {
    name: "Sunsari",
    np: "सुनसरी",
    hq: { en: "Inaruwa", np: "इनरुवा" },
    belt: { en: "Terai plains · Chure fringe", np: "तराई मैदान · चुरे धार" },
    knownFor: { en: "Koshi Tappu — arna country beside the rice fields", np: "कोशी टप्पु — धानखेतछेउको अर्ना देश" },
    crops: {
      en: ["Paddy and wheat in the plains with mustard and vegetable pockets; banana and fish ponds expanding around Itahari"],
      np: ["मैदानमा धान–गहुँ, तोरी र तरकारी; इटहरीवरिपरि केरा र माछा पोखरी फैलिँदै"],
    },
    livestock: {
      en: ["Dairy and goat keeping along the market road; pond aquaculture is among the district's fastest-growing farm businesses"],
      np: ["बजार सडकका डेयरी–बाख्रा; पोखरी माछा खेती जिल्लाको छिटो बढ्ने कृषि व्यवसायमध्ये"],
    },
    ecology: {
      en: "Koshi Tappu Wildlife Reserve: Nepal's last wild water buffalo (arna), wild elephants and over 480 recorded bird species; a RAMSAR wetland on the Koshi barrage floodplain.",
      np: "कोशी टप्पु वन्यजन्तु आरक्ष: नेपालको अन्तिम जङ्गी अर्ना, जङ्गी हात्ती र ४८०+ चराचुरुङ्गी; कोशी बाँध पूर्वाधारमा रामसार विसाउँ।",
    },
    climate: {
      en: "The Koshi barrage releases and spurs set the flood calendar for thousands of hectares; early-maturing paddy before the peak release is the district's key adjustment.",
      np: "कोशी बाँधको पानी उपचारले हजारौँ हेक्टरको बाढी-पात्रो तय गर्छ; उपचारअघि पाक्ने धान जिल्लाको मुख्य समायोजन हो।",
    },
  },
  {
    name: "Dhankuta",
    np: "धनकुटा",
    hq: { en: "Dhankuta", np: "धनकुटा" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Off-season vegetables for the eastern cities", np: "पूर्वी सहरका लागि समयमुनिका तरकारी" },
    crops: {
      en: ["Vegetable rings shipping to Dharan–Biratnagar–Kathmandu, especially off-season cauliflower, cabbage and beans", "Large cardamom, mandarin orchards and maize on the slopes"],
      np: ["धरान–विराटनगर–काठमाडौँ पठाउने तरकारी घेरा, विशेष समयमुनिका काउली, बन्दा र सिमी", "ढालमा ठूलो एलाच, सुन्तला बगैंचा र मकै"],
    },
    livestock: {
      en: ["Goat and dairy farming integrated with the vegetable cash economy"],
      np: ["तरकारी नगद अर्थतन्त्रसँग जोडिएको बाख्रा–डेयरी खेती"],
    },
    ecology: {
      en: "Oak–chestnut hill forests and terraced slopes overlooking the Arun gorge; red panda recorded in the upper forest blocks.",
      np: "अरुन खोँच हेर्ने बाँझ–काफल पहाडी वन र गह्राहरू; माथिल्ला वन इलाकामा रातो पाण्डा अभिलेखित।",
    },
    climate: {
      en: "Monsoon showers plus winter drought pulses; water-harvesting ponds for off-season vegetables are the flagship adaptation.",
      np: "मनसुन वर्षा र जाडोको सुक्खा; समयमुनिका तरकारीका लागि पानी-सङ्कलन पोखरी प्रमुख अनुकूलन।",
    },
  },
  {
    name: "Tehrathum",
    np: "तेह्रथुम",
    hq: { en: "Myanglung", np: "म्याङलुङ" },
    belt: { en: "Mid-hills · Milke Danda ridge", np: "मध्यपहाड · मिल्के डाँडा धार" },
    knownFor: { en: "Rhododendron capital of the eastern hills", np: "पूर्वी पहाडको लालीगुराँस राजधानी" },
    crops: {
      en: ["Maize, millet and cardamom; smallholder tea on the Ilam border; potato in the upper fields"],
      np: ["मकै, कोदो, एलाच; इलाम किनारमा साना किसानको चिया; माथिल्ला बारीमा आलु"],
    },
    livestock: {
      en: ["Goats, dairy cattle and buffalo for the local bazaar towns"],
      np: ["स्थानीय बजार-सहरका लागि बाख्रा, गाईभैंसी"],
    },
    ecology: {
      en: "Milke Danda — the famous rhododendorn trail (30+ species recorded across the Kanchenjunga–Milke–Jaljale belt) blooms April–May; habitat for red panda and Himalayan black bear.",
      np: "मिल्के डाँडा — प्रसिद्ध लालीगुराँस बाटो (काञ्चनजुङ्गा–मिल्के–जलजले पट्टीमा ३०+ प्रजाति) वैशाख–जेठमा फुल्छ; रातो पाण्डा र काले भालुको बासस्थान।",
    },
    climate: {
      en: "Cool ridge climate with heavy monsoon rain; storm damage to cardamom curing sheds and terrace slips are the recurring losses.",
      np: "चिसो डाँडाको मौसम, भारी मनसुन; एलाच सुकाउने घर र गह्रा चुहिनु बारम्बारको क्षति हो।",
    },
  },
  {
    name: "Sankhuwasabha",
    np: "साङ्खुवासभा",
    hq: { en: "Khandbari", np: "खाँडबारी" },
    belt: { en: "Arun valley mid-hills to Makalu high Himalaya", np: "अरुन उपत्यकाको मध्यपहाडदेखि मकालु हिमाल" },
    knownFor: { en: "Nepal's cardamom giant under Makalu", np: "मकालुको छहारीमा एलाचको दिग्गज" },
    crops: {
      en: ["Large cardamom — Sankhuwasabha anchors the national cardamom frontier", "Maize, millet and potato in the Arun corridor; citrus on warm aspects"],
      np: ["ठूलो एलाच — साङ्खुवासभा राष्ट्रिय एलाच मोर्चाको गढ", "अरुन करिडोरमा मकै, कोदो, आलु; न्यानो ढालमा सुन्तला जाति"],
    },
    livestock: {
      en: ["Chyangra goats and yaks in the upper belt; buffalo and crossbred dairy in the valley"],
      np: ["माथिल्लो भेगमा च्याङ्ग्रा र याक; उपत्यकामा भैंसी–सङ्कर डेयरी"],
    },
    ecology: {
      en: "Makalu Barun National Park (Mt. Makalu 8,485 m — fifth-highest): red panda, snow leopard and clouded leopard country spanning tropical river gorge to Barun glacier; the Arun is one of Nepal's biodiversity-richest valleys.",
      np: "मकालु बरुण राष्ट्रिय निकुञ्ज (मकालु ८,४८५ मि. — पाँचौँ अग्लो): रातो पाण्डा, हिउँ चितुवा र डुँडे चितुवाको देश, उष्ण नदी खोँचदेखि बरुण हिमनदीसम्म; अरुन नेपालको जैव विविधतामा धनी उपत्यकामध्ये।",
    },
    climate: {
      en: "One of the steepest climate gradients on earth (150 m to 8,485 m); cardamom and citrus belts are visibly shifting upslope with warming.",
      np: "पृथ्वीकै तीखो जलवायु ढाक (१५० मि.देखि ८,४८५ मि.); ताप बढ्दै जाँदा एलाच–सुन्तला पट्टी स्पष्ट माथि सर्दैछन्।",
    },
  },
  {
    name: "Bhojpur",
    np: "भोजपुर",
    hq: { en: "Bhojpur", np: "भोजपुर" },
    belt: { en: "Mid-hills to high ridge", np: "मध्यपहाडदेखि उच्च धार" },
    knownFor: { en: "Cardamom hills, khukuri craftsmanship", np: "एलाचका पहाड, खुकुरीको कौशल" },
    crops: {
      en: ["Large cardamom expanding on north-facing slopes; maize, millet and orange orchards", "River-terrace paddy in the lower valleys"],
      np: ["उत्तरी ढालमा फैलिरहेको ठूलो एलाच; मकै, कोदो, सुन्तला बगैंचा", "तल्लो उपत्यकाको खोला किनारको धान"],
    },
    livestock: {
      en: ["Goat and buffalo husbandry; local bazaar dairy around the town ridge"],
      np: ["बाख्रा–भैंसी पालन; सहर डाँडावरिपरि स्थानीय बजार डेयरी"],
    },
    ecology: {
      en: "Dense mid-hill forest with red panda and Himalayan monal habitat; the Sapta Koshi tributaries carve deep gorges below the town.",
      np: "बाक्लो मध्यपहाडी वन, रातो पाण्डा र डाँफे बासस्थान; सहरमुनि सप्तकोशीका सहायक नदीले गहिरा खोँच बनाएका छन्।",
    },
    climate: {
      en: "Monsoon landslides on steep slopes; the drying of small spring sources in the pre-monsoon is increasingly felt.",
      np: "भिरालो ढालमा मनसुनको पहिरो; मनसुनअघि साना मुहान सुक्ने बढी महसुस हुँदैछ।",
    },
  },
  {
    name: "Solukhumbu",
    np: "सोलुखुम्बु",
    hq: { en: "Solududhkunda (Salleri)", np: "सोलुदुधकुण्ड (सल्लेरी)" },
    belt: { en: "High Himalaya · high hills ( Solu)", np: "उच्च हिमाल · उच्च पहाड (सोलु)" },
    knownFor: { en: "Everest region — potatoes, yaks and mountain tourism", np: "सगरमाथा क्षेत्र — आलु, याक र पर्वतीय पर्यटन" },
    crops: {
      en: ["High-hill potato (a major seed-potato source), buckwheat, barley and the famous Gurja-type beans at altitude", "Off-season vegetables for the trekking economy in the Solu belt"],
      np: ["उच्चपहाडी आलु (प्रमुख बीउ आलु स्रोत), फापर, जौ र उचाइका प्रसिद्ध गुर्जा-प्रकारका सिमी", "सोलु पट्टीमा ट्रेकिङ अर्थतन्त्रका लागि समयमुनिका तरकारी"],
    },
    livestock: {
      en: ["Yaks and yak-cattle hybrids (dzo/dzum) are the backbone — transport, milk, churpi and meat for Sherpa households"],
      np: ["याक र याक-गाई सङ्कर (ड्जो/जुम) आधार — शेर्पा घरका ढुवानी, दुध, छुर्पी र मासु"],
    },
    ecology: {
      en: "Sagarmatha National Park (UNESCO World Heritage): Everest (8,849 m), snow leopard, musk deer and Himalayan tahr; glacier lakes including Imja Tsho are the closely-watched flood risk.",
      np: "सगरमाथा राष्ट्रिय निकुञ्ज (युनेस्को विश्वसम्पदा): सगरमाथा (८,८४९ मि.), हिउँ चितुवा, कस्तुरी मृग र थार; इम्जा त्सो लगायत हिमताल बाढी जोखिमका नजिकबाट हेरिने ताल हुन्।",
    },
    climate: {
      en: "Iconic ground zero of Himalayan warming — glacier retreat and ice-snow changes reshape herding routes and trekking water points; potato seed production is climbing to cleaner, colder fields.",
      np: "हिमालय ताप वृद्धिको चर्चित शून्य-बिन्दु — हिमनदी पग्लिँदै जाँदा चरन मार्ग र ट्रेकिङ पानी-बिन्दु फेरिँदैछन्; बीउ आलु उत्पादन अझ चिसो, सफा बारीतिर उकालिँदैछ।",
    },
  },
  {
    name: "Okhaldhunga",
    np: "ओखलढुंगा",
    hq: { en: "Okhaldhunga", np: "ओखलढुंगा" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Maize–millet hills with orange pockets", np: "सुन्तला खालको साथ भएको मकै–कोदो डाँडा" },
    crops: {
      en: ["Maize, millet and potato as staples; mandarin orchards and cardamom in shaded pockets; vegetable farming around the bazaars"],
      np: ["मकै, कोदो, आलु मुख्य; मन्द छहारीमा सुन्तला बगैंचा र एलाच; बजारवरिपरि तरकारी"],
    },
    livestock: {
      en: ["Goats and dairy cattle as the household livestock base"],
      np: ["घरायसी पशुधनको आधारका रूपमा बाख्रा र गाईभैंसी"],
    },
    ecology: {
      en: "The Likhu and Dudhkoshi borders run through rich mid-hill forest; Danphe (Himalayan monal — Nepal's national bird) habitat in the upper ridges.",
      np: "लिखु–दुधकोशी किनार धनी मध्यपहाडी वनबाट बग्छन्; माथिल्ला धारमा डाँफे (राष्ट्रिय पंक्षी) को बासस्थान।",
    },
    climate: {
      en: "Steep terrain, monsoon slips and pre-monsoon dry spells; spring-source protection is the emerging local priority.",
      np: "भिरालो भूबनोट, मनसुन पहिरो र मनसुनअघिको सुक्खा; मुहान संरक्षण उभिँदो स्थानीय प्राथमिकता।",
    },
  },
  {
    name: "Khotang",
    np: "खोटाङ",
    hq: { en: "Diktel Rupakot Majhuwagadhi", np: "दिक्तेल रुपाकोट माझुवागढी" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Remote ridge farming — cereals, cardamom, goats", np: "टाढाको डाँडा खेती — अन्नबाली, एलाच, बाख्रा" },
    crops: {
      en: ["Maize, millet, paddy in river pockets, potato and expanding cardamom orchards"],
      np: ["मकै, कोदो, खोला खाल्डोमा धान, आलु र फैलिँदै गरेका एलाच बगैंचा"],
    },
    livestock: {
      en: ["Goat keeping as the primary cash livestock; buffalo for farm-yard manure and milk"],
      np: ["नगद पशुधनका रूपमा बाख्रा; गोबर मल र दुधका लागि भैंसी"],
    },
    ecology: {
      en: "Arun mid-hill forests; vulture strongholds persist along the river cliffs — a quiet conservation success of the community forest groups.",
      np: "अरुन मध्यपहाडी वन; नदी भीरमा गिद्धका बलियो वासस्थान छन् — सामुदायिक वन समूहको चुपचाप संरक्षण सफलता।",
    },
    climate: {
      en: "Rain-shadow effect in some valleys keeps moisture marginal; drought-tolerant millet is being re-valued.",
      np: "केही उपत्यकामा वर्षा-छायाँले ओसार कम; सुक्खा-सह्य कोदोको महत्त्व फेरि बढ्दै।",
    },
  },
  {
    name: "Udayapur",
    np: "उदयपुर",
    hq: { en: "Gaighat (Triyuga)", np: "गाइघाट (त्रियुगा)" },
    belt: { en: "Triyuga valley Terai · Chure · mid-hills", np: "त्रियुगा उपत्यका तराई · चुरे · मध्यपहाड" },
    knownFor: { en: "Valley paddy with hill cardamom above", np: "माथि पहाडी एलाचसहितको उपत्यका धान" },
    crops: {
      en: ["Paddy in the broad Triyuga valley with maize and mustard; cardamom and orange on the northern hills", "Fish ponds and banana pockets expanding near the highway"],
      np: ["फराकिलो त्रियुगा उपत्यकामा धान, मकै, तोरी; उत्तरी पहाडमा एलाच र सुन्तला", "राजमार्गनजिक माछा पोखरी र केरा खेत फैलिँदै"],
    },
    livestock: {
      en: ["Dairy development around Gaighat's growing urban demand; goat finishing herds in the hills"],
      np: ["गाइघाटको बढ्दो सहरी मागवरिपरि डेयरी; पहाडमा बाख्रा मोटो गर्ने बथान"],
    },
    ecology: {
      en: "Koshi Tappu's western buffer meets Chure dry forests; the Triyuga river corridor is a wild-elephant movement zone.",
      np: "कोशी टप्पुको पश्चिमी अगाडि-भाग चुरे सुक्खा वनसँग जोडिन्छ; त्रियुगा नदी मार्ग जङ्गी हात्ती आवागमन क्षेत्र हो।",
    },
    climate: {
      en: "Valley heat and hill slips in the same monsoon; the 2021 Udayapur windstorm is a reminder of the new convective-storm risk to farms.",
      np: "एउटै मनसुनमा उपत्यकाको गर्मी र पहाडको पहिरो; २०२१ को उदयपुर आँधीले खेतीलाई नयाँ झण्डा-आँधी जोखिम झल्कायो।",
    },
  },

  /* ═══════════════════════════════ MADHESH (8) ═══════════════════════════ */
  {
    name: "Saptari",
    np: "सप्तरी",
    hq: { en: "Rajbiraj", np: "राजविराज" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Paddy–mustard–fish rotation", np: "धान–तोरी–माछा फेरबदली" },
    crops: {
      en: ["Paddy, wheat and mustard are the plains rotation; vegetable belts supply Rajbiraj's market", "Village fish ponds have become a signature income stream"],
      np: ["धान, गहुँ, तोरी मैदानको फेरबदली; तरकारी घेरा राजविराज बजार धान्छ", "गाउँका माछा पोखरी हस्ताक्षर आम्दानी बनेका छन्"],
    },
    livestock: {
      en: ["Buffalo dairy cooperatives and goat finishing for the festival market"],
      np: ["भैंसी डेयरी सहकारी र चाडपर्वका लागि बाख्रा मोटो गर्ने बथान"],
    },
    ecology: {
      en: "Western edge of Koshi Tappu Wildlife Reserve — arna, Gangetic dolphins in the Koshi and vast wintering waterfowl flocks on the floodplain.",
      np: "कोशी टप्पु वन्यजन्तु आरक्षको पश्चिमी किनार — अर्ना, कोशीको गंगाटी डल्फिन र पूर्वाधारमा जाडो बिताउन आउने ठूला पंक्षी बथान।",
    },
    climate: {
      en: "Koshi flood pulses plus summer heat beyond 40 °C; pond-based aquaculture doubles as farm water banking.",
      np: "कोशी बाढी र ४० डिग्रीनाघ्ने गर्मी; पोखरी माछा खेती कृषि पानी-बैंकिङजस्तै काम गर्छ।",
    },
  },
  {
    name: "Siraha",
    np: "सिराहा",
    hq: { en: "Siraha", np: "सिराहा" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Cereal basket with growing orchards", np: "बगैंचा बढिरहेको अन्न क्षेत्र" },
    crops: {
      en: ["Paddy, wheat, mustard and lentil — the classic Terai rotation", "Mango and banana orchards along the highway corridor"],
      np: ["धान, गहुँ, तोरी, मसुरो — प्राचीन तराई फेरबदली", "राजमार्ग करिडोरमा आँप–केरा बगैंचा"],
    },
    livestock: {
      en: ["Buffalo dairy for local sweet shops and goat finishing; fish ponds on tank edges"],
      np: ["स्थानीय पसलका लागि भैंसी दुध र बाख्रा पालन; पोखरी किनारमा माछा"],
    },
    ecology: {
      en: "Remnant Sal forest and wetlands; the Kamala river marks the western boundary with Dhanusha.",
      np: "बाँकी साल वन र विसाउँ; कमला नदीले धनुषासँगको पश्चिमी सीमा बनाउँछ।",
    },
    climate: {
      en: "Kamala floods and heat stress drive the shift to orchard crops with deeper root systems.",
      np: "कमला बाढी र गर्मीले गहिरो जरा भएका बगैंचा बालीतर्फ सर्ने बाध्यता बनाउँछ।",
    },
  },
  {
    name: "Dhanusha",
    np: "धनुषा",
    hq: { en: "Janakpurdham", np: "जनकपुरधाम" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Rice, fish and the Mithila farm kitchen", np: "धान, माछा र मिथिला खेत-भान्सा" },
    crops: {
      en: ["Paddy and wheat among national top-tier districts; lentil and mustard in the winter window", "A dense village-pond fish farming culture — rohu, catla and mrigal polyculture"],
      np: ["धान–गहुँमा राष्ट्रिय उच्च-तहका जिल्ला; जाडो झ्यालमा मसुरो–तोरी", "घना गाउँ-पोखरी माछा खेती — रोहु, कत्ला, मृगल मिसाउने प्रणाली"],
    },
    livestock: {
      en: ["Buffalo dairy and goat keeping threaded through the Mithila smallholder economy"],
      np: ["मिथिला साना किसान अर्थतन्त्रभित्रै भैंसी दुध र बाख्रा पालन"],
    },
    ecology: {
      en: "Dhanushadham protected forest — a sacred grove with tall Sal and wetland bird colonies; Gangetic dolphins occasionally reach the Kamala.",
      np: "धनुषाधाम संरक्षित वन — अग्लो साल र विसाउँ पंक्षी उपनिवेश भएको पवित्र कुञ्ज; कमलासम्म कहिल्यै गंगाटी डल्फिन पुग्छन्।",
    },
    climate: {
      en: "Kamala and Jalad floods plus peak heat; early paddy transplanting and vegetable nurseries under shade nets are common adaptations.",
      np: "कमला–जलाद बाढी र चर्को गर्मी; चाँडो रोपाइँ र छहारी जालीमुनि तरकारी बिरुवा उत्पादन सामान्य अनुकूलन हुन्।",
    },
  },
  {
    name: "Mahottari",
    np: "महोत्तरी",
    hq: { en: "Jaleshwor", np: "जलेश्वर" },
    belt: { en: "Terai plains · Chure fringe", np: "तराई मैदान · चुरे धार" },
    knownFor: { en: "Terai cereal-and-lentil fields", np: "तराईको अन्न–दाल खेत" },
    crops: {
      en: ["Paddy, wheat, lentil and mustard; mango orchards and vegetable pockets toward Bardibas"],
      np: ["धान, गहुँ, मसुरो, तोरी; बर्दिवासतिर आँप बगैंचा र तरकारी खेत"],
    },
    livestock: {
      en: ["Buffalo dairy and goat keeping; ponds and river-side fishing supplement incomes"],
      np: ["भैंसी दुध र बाख्रा; आम्दानी थप्न पोखरी–नदी माछा"],
    },
    ecology: {
      en: "Ratu and Bagmati corridors with tamarisk grassland and wetland pockets; the Chure fringe is heavily degraded and under active restoration programmes.",
      np: "रतु–बागमती मार्ग, बाबुल घाँसे मैदान र विसाउँ खाल्डा; चुरे धार बढी चिन्ताजनक क्षति भएकाले सक्रिय पुनर्स्थापना कार्यक्रम चलिरहेको छ।",
    },
    climate: {
      en: "Ratu floods scour farmland each monsoon; Chure restoration upstream is framed explicitly as downstream flood control.",
      np: "हरेक मनसुनमा रतु बाढीले खेत घस्र्छ; माथिल्लो चुरे पुनर्स्थापना तल्लो बाढी नियन्त्रणकै नाममा अघि सारिएको छ।",
    },
  },
  {
    name: "Sarlahi",
    np: "सार्लाही",
    hq: { en: "Malangwa", np: "मलङ्गवा" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Top-tier paddy district", np: "उच्च-तहको धान जिल्ला" },
    crops: {
      en: ["Paddy among Nepal's top districts by output; wheat, mustard and vegetable belts", "Fish ponds and banana pockets along canal irrigation"],
      np: ["उत्पादनमा नेपालका उत्कृष्ट धान जिल्ला; गहुँ, तोरी, तरकारी", "नहर सिँचाइ किनारमा माछा पोखरी र केरा"],
    },
    livestock: {
      en: ["Dairy cooperatives and commercial goat finishing"],
      np: ["डेयरी सहकारी र व्यावसायिक बाख्रा मोटो गर्ने बथान"],
    },
    ecology: {
      en: "Bagmati and Baluwa floodplains with patchy Sal forest; the Manahari river corridor is an elephant movement route in some years.",
      np: "बागमती–बालुवा पूर्वाधार, बिखरा साल वन; मानहरी नदी मार्ग केही वर्ष हात्ती आवागमन गर्ने बाटो हो।",
    },
    climate: {
      en: "Bagmati-side flooding plus extreme heat; canal modernisation is the district's largest climate-resilience investment.",
      np: "बागमती बाढी र चरम गर्मी; नहर आधुनिकीकरण जिल्लाको सबैभन्दा ठूलो जलवायु-लचक लगानी हो।",
    },
  },
  {
    name: "Rautahat",
    np: "रौताहा",
    hq: { en: "Gaur", np: "गौर" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Rice and mango along the Bagmati", np: "बागमती किनारको धान र आँप" },
    crops: {
      en: ["Paddy, wheat, mustard and lentil; mango and litchi orchards expanding on elevated field bunds", "Vegetable belts around Chandrapur and Gaur"],
      np: ["धान, गहुँ, तोरी, मसुरो; अग्ला कुलोमा फैलिँदै गरेका आँप–लिची बगैंचा", "चन्द्रपुर–गौरवरिपरि तरकारी घेरा"],
    },
    livestock: {
      en: ["Buffalo dairy with strong festival-season demand; goat finishing herds"],
      np: ["चाडपर्वको बलियो माग भएको भैंसी दुध; बाख्रा मोटो गर्ने बथान"],
    },
    ecology: {
      en: "Bagmati and Lal Bakaiya floodplain meadows — sarus crane territories in paddy stubble; patchy Khair-Sisau woodland.",
      np: "बागमती–लालबकैया पूर्वाधारका मेदाँ — धानको दाँरमा सारस क्रेनको इलाका; खयर–सिसौ झाडी।",
    },
    climate: {
      en: "Two rivers swinging between flood and thin flow define the farm calendar; orchards on raised bunds dodge waterlogging.",
      np: "दुई नदी बाढी–पातलो बहावबीच दोब्बरिन्छन्, त्यहीँले खेतको पात्रो बन्छ; अग्ला कुलोका बगैंचा डुबानबाट बच्छन्।",
    },
  },
  {
    name: "Bara",
    np: "बारा",
    hq: { en: "Kalaiya", np: "कलैया" },
    belt: { en: "Terai plains · Chure fringe", np: "तराई मैदान · चुरे धार" },
    knownFor: { en: "Top paddy district with highway orchards", np: "राजमार्ग बगैंचासहितको उत्कृष्ट धान जिल्ला" },
    crops: {
      en: ["Paddy at national top-tier volumes with wheat and mustard in rotation", "Mango and litchi orchards strung along the Kalaiya–Simara corridor; mushroom sheds are a new off-farm farm income"],
      np: ["राष्ट्रिय उच्च-तहको धान उत्पादन, फेरबदलीमा गहुँ–तोरी", "कलैया–सिमरा करिडोरमा आँप–लिची बगैंचा; च्याउ घर नयाँ आम्दानी बन्दै"],
    },
    livestock: {
      en: ["Dairy and poultry around the Simara industrial belt"],
      np: ["सिमरा औद्योगिक पट्टीवरिपरि डेयरी र कुखुरा"],
    },
    ecology: {
      en: "Parsa National Park's eastern buffer — elephants and tigers move between Chure forest patches and farmland; Beeshazari-adjacent wetlands host winter cranes.",
      np: "पर्सा राष्ट्रिय निकुञ्जको पूर्वी अगाडि-भाग — हात्ती र बाघ चुरे वनपट्टी र खेतबारीबीच सर्छन्; नजिकैका विसाउँमा जाडो सारस बस्छन्।",
    },
    climate: {
      en: "Flash floods off the Chure plus heat; orchards intercropped with vegetables hedge the risk.",
      np: "चुरेबाट आउने अचानक बाढी र गर्मी; तरकारी मिसाएर लगाएका बगैंचाले जोखिम धान्छन्।",
    },
  },
  {
    name: "Parsa",
    np: "पर्सा",
    hq: { en: "Birgunj", np: "वीरगञ्ज" },
    belt: { en: "Terai plains · Chure hills", np: "तराई मैदान · चुरे पहाड" },
    knownFor: { en: "Border-trade farms serving Birgunj", np: "वीरगञ्ज धान्ने सीमा-व्यापार खेती" },
    crops: {
      en: ["Paddy, wheat, mustard and vegetable belts; mushroom and banana pockets around the metropolitan market"],
      np: ["धान, गहुँ, तोरी, तरकारी; महानगर बजारवरिपरि च्याउ र केरा"],
    },
    livestock: {
      en: ["Dairy and goat keeping backed by Birgunj's urban and trade demand"],
      np: ["वीरगञ्जको सहरी–व्यापार मागले ढाकिएको डेयरी र बाख्रा पालन"],
    },
    ecology: {
      en: "Parsa National Park — Nepal's quiet tiger and elephant stronghold of Sal forest on the Chure slope, adjacent to Chitwan's buffer; vulture safe-feeding sites operate nearby.",
      np: "पर्सा राष्ट्रिय निकुञ्ज — चुरे ढालको साल वनमा चुपचाप बस्ने बाघ–हात्तीको गढ, चितवनको अगाडि-भागसँग जोडिएको; नजिकै गिद्ध सुरक्षित आहारा स्थल चल्छन्।",
    },
    climate: {
      en: "One of Nepal's hottest belts; shade-grown vegetable nurseries and evening irrigation scheduling are common practice.",
      np: "नेपालकै तातो पट्टीमध्ये; छहारीमा तरकारी बिरुवा र बेलुका सिँचाइको तालिक सामान्य अभ्यास हो।",
    },
  },

  /* ══════════════════════════════ BAGMATI (13) ══════════════════════════ */
  {
    name: "Dolakha",
    np: "दोलखा",
    hq: { en: "Bhimeshwar (Charikot)", np: "भीमेश्वर (चरिकोट)" },
    belt: { en: "High hills to high Himalaya (Gaurishankar)", np: "उच्च पहाडदेखि उच्च हिमाल (गौरीशंकर)" },
    knownFor: { en: "High-hill potato and yak cheese", np: "उच्चपहाडी आलु र याक चिज" },
    crops: {
      en: ["High-hill potato in the Kalinchok belt, buckwheat, millet and bean", "Off-season vegetables expanding toward the Charikot market"],
      np: ["कालिञ्चोक पट्टीको उच्चपहाडी आलु, फापर, कोदो, सिमी", "चरिकोट बजारतिर फैलिँदै गरेका समयमुनिका तरकारी"],
    },
    livestock: {
      en: ["Yak and Chauri herds supply the district's famous yak-cheese factories; Chyangra above the tree line"],
      np: ["याक–चौरी बथानले प्रसिद्ध याक चिज कारखाना धान्छ; वृक्षरेखामाथि च्याङ्ग्रा"],
    },
    ecology: {
      en: "Gaurishankar Conservation Area (Gaurishankar 7,134 m): red panda, snow leopard and musk deer across an 1,000–7,000 m gradient; the Tama Koshi drives hydropower and irrigation.",
      np: "गौरीशंकर संरक्षण क्षेत्र (गौरीशंकर ७,१३४ मि.): १,०००–७,००० मि. ढाकभित्र रातो पाण्डा, हिउँ चितुवा, कस्तुरी मृग; तामाकोशीले जलविद्युत् र सिँचाइ चलाउँछ।",
    },
    climate: {
      en: "2015 earthquake reshaped whole hillside farms; frost-sensitive crops are moving up, and hailstorms hit the potato harvest.",
      np: "२०१५ को भूकम्पले पहाडै खेत फेर्‍यो; चिसोमा मर्ने बाली माथि सर्दैछन्, चिहाँडो आलु नोक्सानी पुर्‍याउँछ।",
    },
  },
  {
    name: "Sindhupalchok",
    np: "सिन्धुपाल्चोक",
    hq: { en: "Chautara", np: "चौतारा" },
    belt: { en: "Mid-hills to high hills", np: "मध्यपहाडदेखि उच्च पहाड" },
    knownFor: { en: "Potato, dairy and landslide recovery", np: "आलु, डेयरी र पहिरो पुनर्उत्थान" },
    crops: {
      en: ["Potato (a national top-tier district), maize, millet and off-season vegetables for Kathmandu", "Kiwi and avocado trials on rehabilitated slopes"],
      np: ["आलु (राष्ट्रिय उच्च-तह), मकै, कोदो र काठमाडौँका लागि समयमुनिका तरकारी", "पुनर्स्थापित ढालमा किवी–एभोकाडो परीक्षण"],
    },
    livestock: {
      en: ["Dairy cooperatives moving milk to Kathmandu despite terrain; goat keeping as recovery capital"],
      np: ["भूबनोटको बावजूद काठमाडौँ दुध पुर्‍याउने डेयरी सहकारी; पुनर्उत्थान पूँजीका रूपमा बाख्रा"],
    },
    ecology: {
      en: "Gaurishankar Conservation Area's western flank; the Bhote Koshi carves the northern valley — the 2014 Jure landslide remains a landmark case of cascading hazards.",
      np: "गौरीशंकर संरक्षण क्षेत्रको पश्चिमी भाग; भोटेकोशीले उत्तरी उपत्यका काट्छ — २०१४ जुरे पहिरो श्रृङ्खला-विपत्‌को चर्चित उदाहरण हो।",
    },
    climate: {
      en: "Post-earthquake slopes fail regularly in monsoon; bio-engineering (bamboo, broom grass) with potato cash cycles anchors the recovery.",
      np: "भूकम्पपछिका ढाल मनसुनमा नियमित चुहिन्छन्; बाँस–अमरिसो जैव-इन्जिनियरिङ र आलु नगद चक्र पुनर्उत्थानको आधार हो।",
    },
  },
  {
    name: "Ramechhap",
    np: "रामेछाप",
    hq: { en: "Manthali", np: "मन्थली" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Potato and goat hills above the Sun Koshi", np: "सुनकोशीमाथिको आलु–बाख्रा पहाड" },
    crops: {
      en: ["Potato (recognised seed pocket), maize, millet and orange orchards on the warmer aspects", "Vegetable supply to Manthali's growing market"],
      np: ["आलु (पहिचान पाएको बीउ खाल्डो), मकै, कोदो, न्यानो ढालमा सुन्तला", "मन्थलीको बढ्दो बजारलाई तरकारी आपूर्ति"],
    },
    livestock: {
      en: ["Goat keeping is the bank account of the ridgeline farms; buffalo dairies serve the bazaar"],
      np: ["बाख्रा पालन डाँडाका खेतको बैंक खाता हो; बजारका लागि भैंसी डेयरी"],
    },
    ecology: {
      en: "Red panda habitat in the upper forests; the Sun Koshi is Nepal's rafting artery — its flow changes track farm access roads.",
      np: "माथिल्ला वनमा रातो पाण्डा; सुनकोशी राफ्टिङको धमनी — यसको बहाव परिवर्तनले खेतसम्मको बाटो छुँदैछ।",
    },
    climate: {
      en: "Landslides and road closures isolate whole ridges during monsoon peaks; potato storage losses to early warmth are rising.",
      np: "मनसुनको उच्च बिन्दुमा पहिरो–बाटो बन्दले डाँडानै काटिन्छन्; चाँडै आउने गर्मीले आलु भण्डारण क्षति बढ्दै।",
    },
  },
  {
    name: "Sindhuli",
    np: "सिन्धुली",
    hq: { en: "Sindhulimadhi (Kamalamai)", np: "सिन्धुलीमाढी (कमलामाई)" },
    belt: { en: "Mid-hills · inner Terai (Sindhuli Madhi valley)", np: "मध्यपहाड · भित्री तराई (सिन्धुली माढी उपत्यका)" },
    knownFor: { en: "Junar — the sweet-orange district", np: "जुनार — सुन्तला प्रजातिको जिल्ला" },
    crops: {
      en: ["Junar (sweet orange) orchards are the district's signature; citrus, cardamom and paddy in the Madhi valley", "Maize, millet and goat-linked fodder systems on the ridges"],
      np: ["जुनार बगैंचा जिल्लाको हस्ताक्षर; सिट्रस, एलाच र माढी उपत्यकाको धान", "डाँडामा मकै, कोदो र बाख्रासँग जोडिएको चारा प्रणाली"],
    },
    livestock: {
      en: ["Goat and buffalo keeping; fodder development follows the junar orchard margins"],
      np: ["बाख्रा–भैंसी पालन; चारा विकास जुनार बगैंचाको किनारसँगै अघि बढ्छ"],
    },
    ecology: {
      en: "Chure and Mahabharat forests meet here — barking deer, leopard and rich birdlife in the Sal-pine transition; the Kamala river defines the valley floor.",
      np: "चुरे–महाभारत वन यहीँ भेट्छन् — साल–खोँयर सङ्क्रमणमा मृग, चितुवा र धनी पंक्षी जीवन; कमला नदी उपत्यकाको तल तय गर्छ।",
    },
    climate: {
      en: "A rain-shadow notch keeps parts dry; orchard irrigation from Kamala tributaries decides junar size and sweetness.",
      np: "वर्षा-छायाँ खाल्डोले केही भाग सुक्खा राख्छ; कमलाका सहायक नदीबाट बगैंचा सिँचाइले जुनारको नाप र ग्वीलतात निर्धारण गर्छ।",
    },
  },
  {
    name: "Kavrepalanchok",
    np: "काभ्रेपलाञ्चोक",
    hq: { en: "Dhulikhel", np: "धुलिखेल" },
    belt: { en: "Mid-hills (Panchkhal–Dhulikhel valleys)", np: "मध्यपहाड (पाँचखाल–धुलिखेल उपत्यका)" },
    knownFor: { en: "Potato power and Kathmandu's vegetable garden", np: "आलुको शक्ति र काठमाडौँको तरकारी बारी" },
    crops: {
      en: ["Potato — Kavre sits in Nepal's top potato tier; off-season vegetables from Panchkhal and Dhulikhel feed the capital daily", "Millet, maize, orchard citrus and coffee pockets on the slopes"],
      np: ["आलु — काभ्रे नेपालको उत्कृष्ट आलु तहमा; पाँचखाल–धुलिखेलका समयमुनिका तरकारीले राजधानी दैनिक धान्छन्", "ढालमा कोदो, मकै, सिट्रस र कफी खाल्डा"],
    },
    livestock: {
      en: ["Dairy and goat systems tightly linked to Kathmandu's demand; buffalo keeping dominates the lower valleys"],
      np: ["काठमाडौँ मागसँग कस्टै जोडिएको डेयरी–बाख्रा; तल्लो उपत्यकामा भैंसी प्रभुत्व"],
    },
    ecology: {
      en: "Community forests of the Mahabharat range; the Rosi and Sunkoshi drain the district; leopard encounters on the valley edge are a management issue.",
      np: "महाभारत श्रेणीका सामुदायिक वन; रोसी–सुनकोशीले जिल्ला बगाउँछन्; उपत्यका किनारको चितुवा भेट व्यवस्थापनको विषय हो।",
    },
    climate: {
      en: "Panchkhal's winter fog-frost pocket is a documented cold-trap harming vegetable nurseries; conversely valley springs are drying — both ends of the water calendar are squeezing farmers.",
      np: "पाँचखालको जाडो कुहिँरो–तुसारो खाल्डो प्रमाणित चिसो-जाल हो, तरकारी बिरुवामार हुन्छ; अर्कोतर्फ उपत्यकाका मुहान सुक्दैछन् — पानीको पात्रोका दुवै छेउ किसानलाई थिच्छन्।",
    },
  },
  {
    name: "Bhaktapur",
    np: "भक्तपुर",
    hq: { en: "Bhaktapur", np: "भक्तपुर" },
    belt: { en: "Kathmandu valley floor", np: "काठमाडौँ उपत्यका तल" },
    knownFor: { en: "Juju dhau — king curd", np: "जुजु धौ — राजा दह" },
    crops: {
      en: ["Intensive vegetable rings (the valley's greenest district) and paddy on remaining fields", "Potato, garlic and winter greens dominate the rotation"],
      np: ["घना तरकारी घेरा (उपत्यकाको हरियो जिल्ला) र बाँकी खेतमा धान", "फेरबदलीमा आलु, लसुन र जाडो सागपात मुख्य"],
    },
    livestock: {
      en: ["The buffalo-curd tradition — juju dhau — is a GI-tagged cultural product; peri-urban dairies and mushroom sheds fill the gaps"],
      np: ["भैंसी दह परम्परा — जुजु धौ — भौगोलिक संकेतको सांस्कृतिक उत्पादन; सहरछेउका डेयरी र च्याउ घर खाल्डो भर्छन्"],
    },
    ecology: {
      en: "Ancient Newar farm-town matrix with ritual ponds (hitis) and protected temple groves — an urban-agrarian landscape like nowhere else in Nepal.",
      np: "पुरानो नेवार खेत-सहर बुनोट, धार्मिक पोखरी (हिटी) र मन्दिरका संरक्षित कुञ्ज — नेपालमा अन्यत्र नभएको सहरी-कृषि परिदृश्य।",
    },
    climate: {
      en: "Valley haze and urban heat tighten the vegetable calendar; rooftop and shed mushroom culture is the climate-smart response.",
      np: "उपत्यकाको धुँध र सहरी तापले तरकारी पात्रो खुम्च्याउँछ; छत–घरभित्रको च्याउ खेती जलवायु-स्मार्ट जवाफ हो।",
    },
  },
  {
    name: "Lalitpur",
    np: "ललितपुर",
    hq: { en: "Lalitpur (Patan)", np: "ललितपुर (पाटन)" },
    belt: { en: "Kathmandu valley · southern mid-hills", np: "काठमाडौँ उपत्यका · दक्षिणी मध्यपहाड" },
    knownFor: { en: "Valley vegetables and the Godawari gardens", np: "उपत्यका तरकारी र गोदावरी बगैंचा" },
    crops: {
      en: ["Vegetable and mushroom belts (Lele, Chapagaun, Thecho) serving Patan daily; paddy and maize on the remaining floor", "Mountain coffee trials on the southern ridges"],
      np: ["पाटनलाई दैनिक धान्ने तरकारी–च्याउ घेरा (लेले, चापागाउँ, थेचो); बाँकी भुइँमा धान–मकै", "दक्षिणी धारमा पहाडी कफी परीक्षण"],
    },
    livestock: {
      en: ["Dairy buffalo and goat keeping woven through the Newar farm towns"],
      np: ["नेवार खेत-सहरभित्रै बुनिएको भैंसी दुध र बाख्रा पालन"],
    },
    ecology: {
      en: "National Botanical Garden, Godawari — Nepal's living library of native flora at the Phulchoki foot (the valley's highest hill, a UNESCO-adjacent biodiversity site with 250+ butterfly species).",
      np: "राष्ट्रिय वनस्पति उद्यान, गोदावरी — फूलचोकी (उपत्यकाको सबैभन्दा अग्लो डाँडा, २५०+ पुतली प्रजातिको जैव विविधता क्षेत्र) को खुट्टामा नेपालको जीवित वनस्पति पुस्तकालय।",
    },
    climate: {
      en: "Phulchoki's spring-fed spouts (some centuries old) are losing dry-season flow — heritage water systems now double as climate monitors.",
      np: "फूलचोकीका मुहान-धारा (केही शताब्दी पुराना) सुक्खायाममा बहाव गुमाउँदैछन् — सम्पदा जल-प्रणाली अब जलवायु सूचकसमेत बनेका छन्।",
    },
  },
  {
    name: "Kathmandu",
    np: "काठमाडौँ",
    hq: { en: "Kathmandu", np: "काठमाडौँ" },
    belt: { en: "Kathmandu valley floor · rim hills", np: "काठमाडौँ उपत्यका तल · घेराडाँडा" },
    knownFor: { en: "Peri-urban farming inside the capital", np: "राजधानीभित्रकै सहरछेउ खेती" },
    crops: {
      en: ["Peri-urban vegetables, mushroom sheds and paddy on the valley floor; kitchen-market gardens ring the old city", "Shivapuri-buffer potato and vegetable pockets on the northern rim"],
      np: ["उपत्यका तलमा सहरछेउ तरकारी, च्याउ घर र धान; पुरानो सहरघेरा गच्छे-बारी", "उत्तरी धारमा शिवपुरी-अगाडि भागका आलु–तरकारी खाल्डा"],
    },
    livestock: {
      en: ["Dairy herds squeezed to the rim; backyard goat and poultry units persist inside the sprawl"],
      np: ["डेयरी बथान घेराडाँडमा निर्दिष्ट भएको; फैलावटभित्रै आँगनका बाख्रा–कुखुरा"],
    },
    ecology: {
      en: "Shivapuri Nagarjun National Park on the northern rim — the valley's water tower, leopard and black-bear habitat above the taps of two million people.",
      np: "उत्तरी धारमा शिवपुरी नगरजुन राष्ट्रिय निकुञ्ज — उपत्यकाको पानीको ट्यााँकी, बीस लाख मानिसको धारा माथि चितुवा–भालु बासस्थान।",
    },
    climate: {
      en: "Urban heat island plus valley haze shorten the winter vegetable window; the city's farm belt is literally thinning at its edges.",
      np: "सहरी ताप र उपत्यका धुँधले जाडो तरकारी झ्याल छोटो बनाउँछ; सहरको खेत पट्टी किनारबाटै पातलिँदै छ।",
    },
  },
  {
    name: "Nuwakot",
    np: "नुवाकोट",
    hq: { en: "Bidur", np: "बिदुर" },
    belt: { en: "Mid-hills · Trishuli river valleys", np: "मध्यपहाड · त्रिशुली नदी उपत्यका" },
    knownFor: { en: "Cardamom, river paddy and historic hill farms", np: "एलाच, नदी किनारको धान र ऐतिहासिक पहाडी खेत" },
    crops: {
      en: ["Large cardamom in the shaded upper slopes; paddy and maize along the Trishuli and Tadi", "Orange orchards and vegetable pockets for the Kathmandu market"],
      np: ["माथिल्लो छहारी ढालमा ठूलो एलाच; त्रिशुली–तादी किनारमा धान–मकै", "काठमाडौँ बजारका लागि सुन्तला बगैंचा र तरकारी"],
    },
    livestock: {
      en: ["Dairy development tied to the Trishuli highway corridor; goat keeping on the ridges"],
      np: ["त्रिशुली राजमार्ग करिडोरसँग जोडिएको डेयरी विकास; डाँडामा बाख्रा"],
    },
    ecology: {
      en: "Historic Nuwakot Durbar ridge above terraced fields; the Trishuli migratory fish (mahseer, katle) still run when flows allow.",
      np: "गह्राहरूमाथि ऐतिहासिक नुवाकोट दरबार डाँडा; बहाव अनुमति दिँदा त्रिशुलीका आप्रवासी माछा (महासेल, काट्ले) अझै चढ्छन्।",
    },
    climate: {
      en: "Trishuli flood pulses and hill slips; cardamom orchards are moving to higher shade as valley heat builds.",
      np: "त्रिशुली बाढी र पहाड पहिरो; उपत्यकाको ताप बढ्दै जाँदा एलाच बगैंचा अग्लो छहारीतर्फ सर्दैछ।",
    },
  },
  {
    name: "Rasuwa",
    np: "रसुवा",
    hq: { en: "Dhunche", np: "धुँचे" },
    belt: { en: "High hills to high Himalaya (Langtang)", np: "उच्च पहाडदेखि उच्च हिमाल (लाङटाङ)" },
    knownFor: { en: "Langtang cheese and potato seed", np: "लाङटाङ चिज र बीउ आलु" },
    crops: {
      en: ["High-hill potato seed — Rasuwa's virus-free pockets supply wide areas; buckwheat, barley and millet", "Greenhouse vegetables expanding for trekking lodges"],
      np: ["उच्चपहाडी बीउ आलु — रसुवाको रोगमुक्त खाल्डो ठूलो क्षेत्र धान्छ; फापर, जौ, कोदो", "ट्रेकिङ लजका लागि ग्रीनहाउस तरकारी फैलिँदै"],
    },
    livestock: {
      en: ["Yaks, Chauri and the famous Langtang cheese factories; Chyangra on the high pastures"],
      np: ["याक, चौरी र प्रसिद्ध लाङटाङ चिज कारखाना; उच्च चरनमा च्याङ्ग्रा"],
    },
    ecology: {
      en: "Langtang National Park: red panda and snow leopard habitat, the sacred Gosaikunda lakes, and the 2015 avalanche-destroyed Langtang village — now rebuilt as a case study in mountain resilience.",
      np: "लाङटाङ राष्ट्रिय निकुञ्ज: रातो पाण्डा–हिउँ चितुवा बासस्थान, पवित्र गोसाइकुण्ड तालहरू, र २०१५ को हिमपहिरोले मेटिएको लाङटाङ गाउँ — अब पहाडी लचकताको अध्ययन केस बनेर बसेको।",
    },
    climate: {
      en: "Glacier retreat around Langtang-Lirung alters seasonal water release; snow-line creep changes yak herding calendars.",
      np: "लाङटाङ-लिरुङ वरिपरि हिमनदी पग्लिँदा मौसमी पानी निकास फेरिँदैछ; हिउँरेखा माथि सर्दै याक चरन पात्रो बदलिँदैछ।",
    },
  },
  {
    name: "Dhading",
    np: "धादिङ",
    hq: { en: "Nilkantha (Dhadingbesi)", np: "निलकण्ठ (धादिङबेसी)" },
    belt: { en: "Mid-hills · Mahabharat · Ganesh Himal high belt", np: "मध्यपहाड · महाभारत · गणेश हिमाल उच्च भाग" },
    knownFor: { en: "Tomato capital feeding Kathmandu", np: "काठमाडौँ धान्ने टमाटर गढ" },
    crops: {
      en: ["Tomato — documented farm-gate NPR 20–30/kg vs NPR 80–120 retail in Kathmandu; nursery belts and collection centres drive the value chain", "Maize, millet, paddy in river valleys and vegetable rings around Nilkantha"],
      np: ["टमाटर — प्रमाणित: खेतैमा रु. २०–३० प्रतिकेजी, काठमाडौँमा रु. ८०–१२०; बिरुवा घेरा र सङ्कलन केन्द्रले मूल्य श्रृङ्खला चलाउँछ", "निलकण्ठवरिपरि मकै, कोदो, नदी उपत्यकामा धान र तरकारी घेरा"],
    },
    livestock: {
      en: ["Goat and dairy farming integrated with vegetable cash cycles; buffalo keeping in the valleys"],
      np: ["तरकारी नगद चक्रसँग जोडिएको बाख्रा–डेयरी; उपत्यकामा भैंसी"],
    },
    ecology: {
      en: "Ganesh Himal ridges with red panda habitat; the Trishuli and Malekhu corridors link to the Manaslu region.",
      np: "रातो पाण्डा बासस्थान भएका गणेश हिमाल धार; त्रिशुली–मालेखु मार्ग मनास्लु क्षेत्रसँग जोडिन्छ।",
    },
    climate: {
      en: "Road-blocking landslides raise farm-gate losses; tomato leaf-curl and virus pressure worsens in warmer nights — net-house culture is spreading in response.",
      np: "बाटो रोक्ने पहिरोले खेतै मूल्य घटाउँछ; रात ताप बढ्दा टमाटरको पात मोतिया–भाइरस दबाब बढ्दै — जवाफमा नेट-हाउस खेती फैलिँदै।",
    },
  },
  {
    name: "Makwanpur",
    np: "मकवानपुर",
    hq: { en: "Hetauda", np: "हेटौडा" },
    belt: { en: "Chure · inner Terai · Mahabharat hills", np: "चुरे · भित्री तराई · महाभारत पहाड" },
    knownFor: { en: "Ginger giant and broiler belt", np: "अदुवा दिग्गज र ब्रोइलर पट्टी" },
    crops: {
      en: ["Ginger — Makwanpur is consistently reported among Nepal's top ginger districts by volume", "Maize, paddy in the Rapti corridor, vegetable belts and citrus on the hills"],
      np: ["अदुवा — मकवानपुर उत्पादनका आधारमा निरन्तर नेपालका उत्कृष्ट अदुवा जिल्लामा गणिन्छ", "राप्ति करिडोरमा मकै–धान, तरकारी घेरा र पहाडमा सिट्रस"],
    },
    livestock: {
      en: ["One of the densest broiler belts in the country around the Hetauda market; goat and buffalo dairy strong"],
      np: ["हेटौडा बजारवरिपरि देशकै घना ब्रोइलर पट्टी; बाख्रा–भैंसी डेयरी बलियो"],
    },
    ecology: {
      en: "Chitwan National Park's northern buffer — elephants and the occasional tiger use the Rapti corridor; Chure restoration programmes operate at scale here.",
      np: "चितवन राष्ट्रिय निकुञ्जको उत्तरी अगाडि-भाग — हात्ती र कहिल्यै बाघ राप्ति मार्ग चल्छन्; ठूलो स्तरका चुरे पुनर्स्थापना कार्यक्रम यहीँ चल्छन्।",
    },
    climate: {
      en: "Chure flash floods smash riverine vegetable fields; ginger rhizome rot in waterlogged years is the crop-specific climate worry.",
      np: "चुरेको अचानक बाढीले नदी किनारका तरकारी खेत उधार्छ; डुबानका वर्षमा अदुवाको गानो कुहिनु बाली-विशेष जलवायु चिन्ता हो।",
    },
  },
  {
    name: "Chitawan",
    np: "चितवन",
    hq: { en: "Bharatpur", np: "भरतपुर" },
    belt: { en: "Inner Terai (Chitwan valley)", np: "भित्री तराई (चितवन उपत्यका)" },
    knownFor: { en: "Poultry capital of Nepal", np: "नेपालको कुखुरा राजधानी" },
    crops: {
      en: ["Maize (feed-grain belt), paddy, mustard and an intensive vegetable economy around Bharatpur", "Radish, greens and mushroom sheds supply the whole central region"],
      np: ["मकै (दाना-अन्न पट्टी), धान, तोरी र भरतपुरवरिपरिको घना तरकारी अर्थतन्त्र", "मूला, साग र च्याउ घरले पूरै मध्य क्षेत्र धान्छन्"],
    },
    livestock: {
      en: ["Poultry at national scale — broiler, layer, hatchery and feed industries cluster here more densely than anywhere in Nepal; buffalo dairy and goat finishing follow", "Fish ponds across the valley floor"],
      np: ["राष्ट्रिय स्तरको कुखुरा — ब्रोइलर, लेयर, ह्याचरी र दाना उद्योग नेपालमा अन्य कतै भन्दा घना यहीँ जम्मा; पछि पछ्याउँदै भैंसी डेयरी र बाख्रा", "उपत्यका भरि माछा पोखरी"],
    },
    ecology: {
      en: "Chitwan National Park (UNESCO): the flagship one-horned rhinoceros and Bengal tiger stronghold; Beeshazari Tal (RAMSAR) sits inside the buffer farmland; gharial and mugger crocodiles breed in the Rapti-Narayani system, and Gangetic dolphins reach the Narayani gorges.",
      np: "चितवन राष्ट्रिय निकुञ्ज (युनेस्को): एकसिङ्गे गैँडा र बंगाल बाघको प्रमुख गढ; बिसहजारी ताल (रामसार) अगाडि-भाग खेतबारीभित्रै छ; राप्ति–नारायणीमा घड़ियाल–मगर गोही प्रजनन गर्छन्, गंगाटी डल्फिन नारायणी खोँचसम्म पुग्छन्।",
    },
    climate: {
      en: "Rapti floods and valley heat define the calendar; the 2017 Rapti flood reshaped riverside farms — poultry biosecurity after flood events is now standard extension advice.",
      np: "राप्ति बाढी र उपत्यका तापले पात्रो बनाउँछ; २०१७ को राप्ति बाढीले नदी किनारका खेत फेर्‍यो — बाढीपछिको कुखुरा जैवसुरक्षा अब स्तरित सल्लाह हो।",
    },
  },
  /* ══════════════════════════════ GANDAKI (11) ══════════════════════════ */
  {
    name: "Manang",
    np: "मनाङ",
    hq: { en: "Chame", np: "चामे" },
    belt: { en: "Trans-Himalayan rain shadow (Annapurna north)", np: "हिमालपारि वर्षा-छायाँ (अन्नपूर्ण उत्तर)" },
    knownFor: { en: "Cashmere goats and the Annapurna circuit", np: "कास्मियर बाख्रा र अन्नपूर्ण परिक्रमा" },
    crops: {
      en: ["Buckwheat, barley, potato and high-valley beans; tree crops thin out above 3,500 m", "Apple and walnut pockets in the lower Nar-Phu valleys"],
      np: ["फापर, जौ, आलु र उच्च उपत्यकाका सिमी; ३,५०० मि.माथि रूख बाली पातलिन्छ", "तल्लो नार-फु उपत्यकामा स्याउ–ओखर खाल्डा"],
    },
    livestock: {
      en: ["Chyangra (cashmere) goats and yaks — transhumance moves herds between the Thorong pastures and winter shelter; horse-transport culture persists"],
      np: ["च्याङ्ग्रा (कास्मियर) र याक — थोरोङ चरन र जाडोको आश्रयबीच बथान सारिन्छ; घोडा-ढुवानी संस्कृति यथावत् छ"],
    },
    ecology: {
      en: "Annapurna Conservation Area (Annapurna I 8,091 m): snow leopard, blue sheep and the world's deepest valley gradient; pilgrimage to Manang's Braga gompa moves through the farming belt.",
      np: "अन्नपूर्ण संरक्षण क्षेत्र (अन्नपूर्ण प्रथम ८,०९१ मि.): हिउँ चितुवा, नाउर र विश्वकै गहिरो उपत्यका ढाक; ब्रगा गुम्बासम्मको तीर्थयात्रा खेती भेगभएर जान्छ।",
    },
    climate: {
      en: "Classic rain-shadow: less than 500 mm annual precipitation on the northern slope; glacier retreat and erratic snow now re-tune the herding calendar.",
      np: "उत्तरी ढालमा वर्षालु वर्षाभन्दा कम (५०० मि.मि.मुनि); हिमनदी पग्लिरहँदा र आँधी-हिउँ अनियमित हुँदा चरन पात्रो फेरिँदैछ।",
    },
  },
  {
    name: "Mustang",
    np: "मुस्ताङ",
    hq: { en: "Jomsom", np: "जोमसोम" },
    belt: { en: "Trans-Himalayan rain shadow (Kali Gandaki)", np: "हिमालपारि वर्षा-छायाँ (कालीगण्डकी)" },
    knownFor: { en: "Organic apples and seed potatoes", np: "जैविक स्याउ र बीउ आलु" },
    crops: {
      en: ["Famous high-desert apples (Marpha brandy tradition) and virus-free seed potato — the district's two flagship crops", "Buckwheat, barley, mustard and walnut; greenhouse vegetables for lodges"],
      np: ["प्रसिद्ध हिमाली सुक्खा स्याउ (मार्फा ब्रान्डी परम्परा) र रोगमुक्त बीउ आलु — जिल्लाका दुई फ्ल्यागसिप बाली", "फापर, जौ, तोरी, ओखर; लजका लागि ग्रीनहाउस तरकारी"],
    },
    livestock: {
      en: ["Chyangra goats, sheep and horses; Lomanthang-side herds trade across the Tibetan border belt"],
      np: ["च्याङ्ग्रा, भेडा र घोडा; लोमान्थाङतिरका बथान तिब्बती किनार पट्टीको व्यापार गर्छन्"],
    },
    ecology: {
      en: "Upper Mustang's desert-steppe shelters snow leopard and Tibetan argali; the Kali Gandaki gorge — world's deepest valley — funnels the fierce afternoon wind that dries every crop row; Muktinath temple anchors pilgrimage agriculture.",
      np: "माथिल्लो मुस्ताङको मरुभूमि-स्टेपमा हिउँ चितुवा र तिब्बती अर्गाली; विश्वकै गहिरो कालीगण्डकी खोँचले बेलुकाको बलियो हावा चलाउँछ जसले हरेक बाली पङ्ति सुकाउँछ; मुक्तिनाथ मन्दिर तीर्थ कृषिको आधार हो।",
    },
    climate: {
      en: "Nepal's driest farming country — irrigation from glacier melt decides everything; windbreak poplars and drip trials are the visible adaptations.",
      np: "नेपालको सबैभन्दा सुक्खा खेती-देश — हिमनदीको पानीको सिँचाइले सबै तय गर्छ; वायुरोधी पोखरी र ड्रिप परीक्षण देखिने अनुकूलन हुन्।",
    },
  },
  {
    name: "Myagdi",
    np: "म्याग्दी",
    hq: { en: "Beni", np: "बेनी" },
    belt: { en: "Mid-hills to Dhaulagiri high belt", np: "मध्यपहाडदेखि धौलागिरि उच्च भाग" },
    knownFor: { en: "Citrus pockets under Dhaulagiri", np: "धौलागिरिमुनिका सिट्रस खाल्डा" },
    crops: {
      en: ["Mandarin orange pockets (the Dana belt is famed), maize, millet, potato and cardamom in the shaded gullies", "River-terrace vegetable farming along the Kali Gandaki"],
      np: ["सुन्तला खाल्डा (दाना पट्टी प्रसिद्ध), मकै, कोदो, आलु, छहारी खाल्डोमा एलाच", "कालीगण्डकी किनारमा तरकारी खेती"],
    },
    livestock: {
      en: ["Goat and buffalo systems; sheep flocks on the high pastures toward Dhorpatan"],
      np: ["बाख्रा–भैंसी प्रणाली; धोरपटानतिरका उच्च चरनमा भेडा बथान"],
    },
    ecology: {
      en: "Dhaulagiri (8,167 m) and Annapurna South walls; Annapurna Conservation Area's western entry; blue sheep and snow leopard in the upper ridges.",
      np: "धौलागिरि (८,१६७ मि.) र अन्नपूर्ण दक्षिण भित्ता; अन्नपूर्ण संरक्षण क्षेत्रको पश्चिमी प्रवेश; माथिल्ला धारमा नाउर र हिउँ चितुवा।",
    },
    climate: {
      en: "Deep-valley heat with ridge snow; monsoon slides close farm roads each year — orchards anchor the fragile cash economy.",
      np: "गहिरो उपत्यका ताप र धारको हिउँ; हरेक वर्ष मनसुनले खेत-बाटो बन्द गर्छ — बगैंचाले नाजुक नगद अर्थतन्त्र थाम्छन्।",
    },
  },
  {
    name: "Kaski",
    np: "कास्की",
    hq: { en: "Pokhara", np: "पोखरा" },
    belt: { en: "Pokhara valley · mid-hills · Annapurna high belt", np: "पोखरा उपत्यका · मध्यपहाड · अन्नपूर्ण उच्च भाग" },
    knownFor: { en: "Lakes, cage fish and city-market farming", np: "ताल, केज माछा र सहरी बजार खेती" },
    crops: {
      en: ["Intensive vegetables, maize, paddy in the valley and millet on the slopes; organic and peri-urban farming rings Pokhara", "Cage-fish culture on Phewa and Begnas lakes is a district signature"],
      np: ["घना तरकारी, मकै, उपत्यकामा धान, ढालमा कोदो; पोखराघेरा जैविक–सहरछेउ खेती", "फेवा–बेगनास तालमा केज माछा खेती जिल्लाको हस्ताक्षर हो"],
    },
    livestock: {
      en: ["Dairy and goat keeping for the tourist city; buffalo dominate the valley farms"],
      np: ["पर्यटक सहरका लागि डेयरी–बाख्रा; उपत्यका खेतमा भैंसी प्रभुत्व"],
    },
    ecology: {
      en: "The Lake Cluster of Pokhara Valley — nine lakes as one RAMSAR site; Annapurna Conservation Area HQ region with Sarangkot's raptor migration flyway overhead.",
      np: "पोखरा उपत्यकाको ताल समूह — नौ ताल एउटै रामसार स्थल; साराङकोटमाथि सम्भाल्ला चरा आवागमन उडान मार्ग र अन्नपूर्ण संरक्षण क्षेत्र क्षेत्रीय केन्द्र।",
    },
    climate: {
      en: "One of Nepal's rainiest cities — lake-level flash floods and slope slips are routine; lake fisheries double as flood-buffer assets.",
      np: "नेपालका धेरै पानी पर्ने सहरमध्ये — ताल-सतहको अचानक बाढी र ढल चुहिनु सामान्य छ; ताल मत्स्य खेती बाढी-सोखी सम्पत्तिसमेत हो।",
    },
  },
  {
    name: "Lamjung",
    np: "लमजुङ",
    hq: { en: "Besishahar", np: "बेसीशहर" },
    belt: { en: "Marsyangdi valley · mid-hills · high belt", np: "मर्स्याङ्दी उपत्यका · मध्यपहाड · उच्च भाग" },
    knownFor: { en: "Cardamom, honey and the Annapurna gateway", np: "एलाच, मह र अन्नपूर्ण प्रवेशद्वार" },
    crops: {
      en: ["Paddy and maize in the Marsyangdi corridor; cardamom, orange and banana pockets on the slopes", "Beekeeping — Lamjung hosts some of Nepal's densest apiary belts"],
      np: ["मर्स्याङ्दी करिडोरमा धान–मकै; ढालमा एलाच, सुन्तला, केरा खाल्डा", "मौरीपालन — लमजुङमा नेपालका घना मौरी घर मध्ये केही छन्"],
    },
    livestock: {
      en: ["Dairy goats, buffalo and poultry around Besishahar's growing market"],
      np: ["बेसीशहरको बढ्दो बजारवरिपरि डेयरी बाख्रा, भैंसी, कुखुरा"],
    },
    ecology: {
      en: "Southern Annapurna Conservation Area; the Marsyangdi river runs from Tibetan-border glaciers to the mid-hills in one district.",
      np: "दक्षिणी अन्नपूर्ण संरक्षण क्षेत्र; मर्स्याङ्दी नदी एउटै जिल्लाभित्र तिब्बती किनारका हिमनदीदेखि मध्यपहाडसम्म ओर्लन्छ।",
    },
    climate: {
      en: "Valley fog plus ridge rain; cardamom and bee forage calendars are shifting earlier with warmer springs.",
      np: "उपत्यका कुहिँरो र धारको वर्षा; तातो बसन्तसँगै एलाच र मौरी चरन पात्रो चाँडै सर्दैछ।",
    },
  },
  {
    name: "Gorkha",
    np: "गोरखा",
    hq: { en: "Gorkha (Sulikot)", np: "गोरखा (सुलिकोट)" },
    belt: { en: "Mid-hills to Manaslu high Himalaya", np: "मध्यपहाडदेखि मनास्लु हिमाल" },
    knownFor: { en: "Orange orchards and the Manaslu trail", np: "सुन्तला बगैंचा र मनास्लु बाटो" },
    crops: {
      en: ["Mandarin orange — Gorkha is a recognised top-tier orange district; cardamom, maize, millet and paddy in the Daraundi valley", "Vegetable and potato belts supply the local and trekking markets"],
      np: ["सुन्तला — गोरखा पहिचान पाएको उच्च-तहको सुन्तला जिल्ला; दरौंदी उपत्यकामा एलाच, मकै, कोदो, धान", "स्थानीय–ट्रेकिङ बजारका लागि तरकारी–आलु घेरा"],
    },
    livestock: {
      en: ["Goat and buffalo keeping; yak herds in the northern Samagaun belt serve trekkers with cheese and meat"],
      np: ["बाख्रा–भैंसी पालन; उत्तरी सामागाउँ पट्टीका याक बथानले ट्रेकरलाई चिज–मासु दिन्छन्"],
    },
    ecology: {
      en: "Manaslu Conservation Area (Manaslu 8,163 m): snow leopard, red panda and Tibetan-culture villages; the 2015 earthquake's epicentre bar — entire farm terraces were rebuilt from scratch.",
      np: "मनास्लु संरक्षण क्षेत्र (मनास्लु ८,१६३ मि.): हिउँ चितुवा, रातो पाण्डा र तिब्बती संस्कृति गाउँ; २०१५ भूकम्पको केन्द्र-बिन्दु पट्टी — पूरै गह्रा शून्यबाट पुनर्निर्माण भए।",
    },
    climate: {
      en: "Earthquake-weakened slopes fail in monsoon; orange blossom now overlaps late winter cold snaps, denting fruit set.",
      np: "भूकम्पले कमजोर ढाल मनसुनमा चुहिन्छन्; सुन्तला फुल अब ढिलो जाडोको चिसोसँग ठोक्किन्छ, फल बस्न बाधा पुग्छ।",
    },
  },
  {
    name: "Tanahu",
    np: "तनहुँ",
    hq: { en: "Damauli (Byas)", np: "दमौली (व्यास)" },
    belt: { en: "Mid-hills · Seti-Madi river valleys", np: "मध्यपहाड · सेती-मादी नदी उपत्यका" },
    knownFor: { en: "Banana belts and pond fish", np: "केरा पट्टी र पोखरी माछा" },
    crops: {
      en: ["River-belt banana farming along the Madi and Seti; paddy, maize and millet up the slopes", "Vegetable rings and tea trials around Damauli"],
      np: ["मादी–सेती किनारको केरा खेती; ढालमाथि धान, मकै, कोदो", "दमौलीवरिपरि तरकारी घेरा र चिया परीक्षण"],
    },
    livestock: {
      en: ["Dairy and goat keeping with a strong pond-fish layer — Tanahu's aquaculture is among the hill leaders"],
      np: ["डेयरी–बाख्रा सँगै बलियो पोखरी माछा तह — तनहुँको मत्स्य खेती पहाडी अगुवामध्ये"],
    },
    ecology: {
      en: "Mahabharat hills with the Seti gorge; vulture colonies along river cliffs benefit from the district's livestock economy.",
      np: "सेती खोँचसहितका महाभारत पहाड; नदी भीरका गिद्ध उपनिवेश जिल्लाको पशुधन अर्थतन्त्रबाट लाभ लिन्छन्।",
    },
    climate: {
      en: "River floods scour banana belts; windbreak and staking practices have become standard for orchard survival.",
      np: "नदी बाढीले केरा पट्टी घस्र्छ; वायुरोधी र थामो अभ्यास बगैंचा बाँच्नका लागि स्तरित बनेको छ।",
    },
  },
  {
    name: "Syangja",
    np: "स्याङ्जा",
    hq: { en: "Putalibazar (Syangja)", np: "पुतलीबजार (स्याङ्जा)" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Vegetable co-ops and citrus slopes", np: "तरकारी सहकारी र सिट्रस ढाल" },
    crops: {
      en: ["Vegetable and potato belts with strong cooperative marketing to Pokhara; mandarin and banana pockets", "Maize, millet and paddy in the Kaligandaki-adjacent valleys"],
      np: ["पोखरा बजारसम्म सहकारी बिक्री भएका तरकारी–आलु घेरा; सुन्तला–केरा खाल्डा", "कालीगण्डकी-नजिकका उपत्यकामा मकै, कोदो, धान"],
    },
    livestock: {
      en: ["Dairy buffalo and goat keeping; fodder development programmes are decades-established here"],
      np: ["भैंसी डेयरी र बाख्रा; चारा विकास कार्यक्रम यहाँ दशकौँ पुरानो छ"],
    },
    ecology: {
      en: "Ridgeline forests over the Kaligandaki; the district's community-forest user groups are among Nepal's pioneering examples.",
      np: "कालीगण्डकीमाथिका धार वन; जिल्लाका सामुदायिक वन उपभोक्ता समूह नेपालका अग्रणी नमुनामध्ये हुन्।",
    },
    climate: {
      en: "Pre-monsoon dry spells stretch longer; household water-source protection is the everyday adaptation.",
      np: "मनसुनअघिको सुक्खा लामो तानिँदै; घरायसी पानी स्रोत संरक्षण दैनिक अनुकूलन हो।",
    },
  },
  {
    name: "Parbat",
    np: "पर्वत",
    hq: { en: "Kushma", np: "कुश्मा" },
    belt: { en: "Mid-hills above the Kaligandaki gorge", np: "कालीगण्डकी खोँचमाथिको मध्यपहाड" },
    knownFor: { en: "Mandarin and goats on the gorge rim", np: "खोँच किनारको सुन्तला र बाख्रा" },
    crops: {
      en: ["Mandarin orange, potato, maize and millet; paddy in the Modi-adjacent terraces", "Coffee and banana pockets expanding"],
      np: ["सुन्तला, आलु, मकै, कोदो; मोदी-नजिकका गह्रामा धान", "फैलिँदै गरेका कफी–केरा खाल्डा"],
    },
    livestock: {
      en: ["Goat keeping is the signature livestock; buffalo dairy serves local towns"],
      np: ["बाख्रा पालन हस्ताक्षर पशुधन; स्थानीय सहरका लागि भैंसी दुध"],
    },
    ecology: {
      en: "Kaligandaki gorge cliffs — nesting raptors and medicinal-plant harvesting grounds; the world's deepest-river-gorge agriculture lives on its rim.",
      np: "कालीगण्डकी खोँचका भीर — गिद्ध-शेरचर बस्ने र जडीबुटी सङ्कलन गरिने इलाका; विश्वको सबैभन्दा गहिरो नदी-खोँच कृषि यसकै किनारमा बस्छ।",
    },
    climate: {
      en: "Gorge wind and dry spells dehydrate orchard soil; mulching and terrace-edge fodder grasses are the standard defence.",
      np: "खोँचको हावा र सुक्खाले बगैंचा माटो सुकाउँछ; पराल-मल्चिङ र गह्रा किनारका घाँसे चारा स्तरिरक्षा हो।",
    },
  },
  {
    name: "Baglung",
    np: "बागलुङ",
    hq: { en: "Baglung", np: "बागलुङ" },
    belt: { en: "Mid-hills · Dhaulagiri high belt", np: "मध्यपहाड · धौलागिरि उच्च भाग" },
    knownFor: { en: "Orange zone and sheep country", np: "सुन्तला क्षेत्र र भेडा देश" },
    crops: {
      en: ["Baglung's orange orchards are a documented pocket of national note; maize, millet, potato and paddy in the Dhorpatan-adjacent valleys", "Coffee and vegetable belts around the district centre"],
      np: ["बागलुङका सुन्तला बगैंचा राष्ट्रिय ख्यातिका प्रमाणित खाल्डा हुन्; धोरपटान-नजिकका उपत्यकामा मकै, कोदो, आलु, धान", "जिल्ला केन्द्रवरिपरि कफी–तरकारी घेरा"],
    },
    livestock: {
      en: ["Sheep transhumance toward Dhorpatan's high pastures; goats and buffalo on the farms"],
      np: ["धोरपटानका उच्च चरनतर्फ भेडा सारिन्छ; खेतमा बाख्रा–भैंसी"],
    },
    ecology: {
      en: "Dhorpatan Hunting Reserve (Nepal's only one) spans Baglung/Myagdi/Rukum — blue sheep and high-altitude game managed on quota; lokta paper-making traditions persist in the forest wards.",
      np: "धोरपटान शिकार आरक्ष (नेपालको एकमात्र) बागलुङ/म्याग्दी/रुकुममा फैलिएको — कोटामा व्यवस्थापित नाउर र उच्च-पहाडी शिकार; वन क्षेत्रमा लोक्ता कागज परम्परा यथावत् छ।",
    },
    climate: {
      en: "Cold winters and hail in the orchard belt; frost-protective site selection is baked into new plantings.",
      np: "बगैंचा पट्टीमा चिसो जाडो र चिहाँडो; तुसारो-सुरक्षित स्थान छनोट नयाँ रोपाइँमा जोडिएको छ।",
    },
  },
  {
    name: "Nawalparasi East",
    np: "नवलपरासी पूर्व",
    hq: { en: "Kawasoti (Nawalpur)", np: "कावासोती (नवलपुर)" },
    belt: { en: "Terai strip · Chure hills", np: "तराई पट्टी · चुरे पहाड" },
    knownFor: { en: "Gateway farms between hills and plains", np: "पहाड–मैदान बीचको प्रवेश खेत" },
    crops: {
      en: ["Paddy, wheat and mustard on the plains strip; maize and vegetable belts climbing the Chure foothills", "Banana and vegetable pockets along the Kawasoti corridor"],
      np: ["मैदान पट्टीमा धान, गहुँ, तोरी; चुरे खुट्टामा मकै–तरकारी घेरा", "कावासोती करिडोरमा केरा–तरकारी खाल्डा"],
    },
    livestock: {
      en: ["Dairy and goat keeping; poultry pockets around Gaindakot"],
      np: ["डेयरी–बाख्रा; गैंदाकोटवरिपरि कुखुरा खाल्डा"],
    },
    ecology: {
      en: "Chure hills rise straight out of the plains — leopard and barking-deer country at the farm edge; the Danda-forest streams feed the irrigation canals below.",
      np: "चुरे पहाड मैदानबाटै उठन्छ — खेत किनारकै चितुवा–मृग देश; डाँडा-वनका खोलाले तलका सिँचाइ नहर भर्छन्।",
    },
    climate: {
      en: "Chure flash floods hit the plain-strip farms; upstream forest condition directly writes the downstream flood bill.",
      np: "चुरेको अचानक बाढी मैदान-पट्टी खेतमा पुग्छ; माथिल्लो वनको अवस्थाले तल्लो बाढी लेखा सिधै लेख्छ।",
    },
  },

  /* ═════════════════════════════ LUMBINI (12) ══════════════════════════ */
  {
    name: "Nawalparasi",
    np: "नवलपरासी (पश्चिम)",
    hq: { en: "Bardaghat (Parasi)", np: "बर्दघाट (परासी)" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Rice–sugarcane riverine belt", np: "धान–उखु नदी किनार पट्टी" },
    crops: {
      en: ["Paddy, wheat, mustard and sugarcane for the Bardaghat mills; lentil in the winter window", "Riverine vegetable belts and banana pockets"],
      np: ["बर्दघाट मिलका लागि धान, गहुँ, तोरी, उखु; जाडो झ्यालमा मसुरो", "नदी किनारका तरकारी घेरा र केरा खाल्डा"],
    },
    livestock: {
      en: ["Buffalo dairy cooperatives and goat finishing; pond fish on tank edges"],
      np: ["भैंसी डेयरी सहकारी र बाख्रा; पोखरी किनारमा माछा"],
    },
    ecology: {
      en: "Sal corridors along the Narayani-adjacent belt; the Daunne hills carry the Chure transition.",
      np: "नारायणी-नजिकको पट्टीमा साल करिडोर; दौने पहाडले चुरे सङ्क्रमण बोक्छ।",
    },
    climate: {
      en: "Hot plains summers and river floods; sugarcane's deep rooting makes it the flood-resilient cash anchor.",
      np: "मैदानको गर्मी र नदी बाढी; उखुको गहिरो जराले यसलाई बाढी-लचक नगद आधार बनाउँछ।",
    },
  },
  {
    name: "Rupandehi",
    np: "रुपन्देही",
    hq: { en: "Butwal", np: "बुटवल" },
    belt: { en: "Terai plains · Chure fringe", np: "तराई मैदान · चुरे धार" },
    knownFor: { en: "Top-tier rice and the Lumbini farmlands", np: "उच्च-तहको धान र लुम्बिनी खेत" },
    crops: {
      en: ["Paddy — Rupandehi sits in Nepal's top paddy tier; wheat, mustard, sugarcane and mango belts follow", "Vegetable and banana rings around Butwal–Siddharthanagar"],
      np: ["धान — रुपन्देही नेपालको उत्कृष्ट धान तहमा; पछि गहुँ, तोरी, उखु र आँप पट्टी", "बुटवल–सिद्धार्थनगर घेरा तरकारी–केरा"],
    },
    livestock: {
      en: ["Dairy and goat systems serving the border-trade cities; poultry strong around Butwal"],
      np: ["सीमा-व्यापार सहर धान्न डेयरी–बाख्रा; बुटवलवरिपरि बलियो कुखुरा"],
    },
    ecology: {
      en: "Lumbini's sacred garden sits inside farmland — Mayadevi's landscape programme blends rice paddies with crane habitat; Sarus cranes nest in the field stubble here.",
      np: "लुम्बिनीको पवित्र बगैंचा खेतबारीभित्रै छ — मायादेवी परिदृश्य कार्यक्रमले धानखेत र सारस बासस्थान जोड्छ; सारस क्रेन यहाँ दाँरमै गुँड बनाउँछन्।",
    },
    climate: {
      en: "Tinau floods through Butwal and heat waves top 42 °C; early-planted paddy and orchard shade are the common shields.",
      np: "बुटवलमा तिनाउ बाढी र ४२ डिग्रीनाघ्ने गर्मी; चाँडै रोपेको धान र बगैंचा छहारी साझा ढाल हुन्।",
    },
  },
  {
    name: "Kapilbastu",
    np: "कपिलवस्तु",
    hq: { en: "Kapilvastu (Banganga)", np: "कपिलवस्तु (बाङ्गंगा)" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Top paddy district and sarus-crane fields", np: "उत्कृष्ट धान जिल्ला र सारसका खेत" },
    crops: {
      en: ["Paddy among Nepal's top districts by production; wheat, mustard and sugarcane", "Mango belts and vegetable pockets; mushroom sheds growing around the bazaars"],
      np: ["उत्पादनमा नेपालका उत्कृष्ट धान जिल्लामध्ये; गहुँ, तोरी, उखु", "आँप पट्टी र तरकारी खाल्डा; बजारवरिपरि च्याउ घर बढिरहेका"],
    },
    livestock: {
      en: ["Buffalo dairy and goat finishing; pond aquaculture spreads on tank edges"],
      np: ["भैंसी दुध र बाख्रा; पोखरी किनारमा माछा खेती फैलिँदै"],
    },
    ecology: {
      en: "Sarus crane strongholds in the paddy landscape (a Lumbini-area flagship species); remnant Sal and khair woodland patches.",
      np: "धान परिदृश्यमा सारस क्रेनको बलियो इलाका (लुम्बिनी-क्षेत्रको फ्ल्यागसिप प्रजाति); बाँकी साल–खयर वन प्वालहरू।",
    },
    climate: {
      en: "Banganga floods and heat; crane-friendly farming (stubble retention, shallow ponds) doubles as climate adaptation.",
      np: "बाङ्गंगा बाढी र गर्मी; सारस-मैत्री खेती (दाँर छोड्ने, छिर्लो पोखरी) जलवायु अनुकूलनसमेत हो।",
    },
  },
  {
    name: "Palpa",
    np: "पाल्पा",
    hq: { en: "Tansen", np: "तानसेन" },
    belt: { en: "Mid-hills · Kaligandaki-adjacent", np: "मध्यपहाड · कालीगण्डकी-नजिक" },
    knownFor: { en: "Coffee, honey and hill-town crafts", np: "कफी, मह र पहाडी सहरको सिप" },
    crops: {
      en: ["Coffee — Palpa anchors the western mid-hill coffee belt with Gulmi and Arghakhanchi; maize, millet and paddy in the valleys", "Cardamom and orange pockets on shaded slopes"],
      np: ["कफी — पाल्पाले गुल्मी–अर्घाखाँचीसँगै पश्चिमी मध्यपहाड कफी पट्टी बोक्छ; उपत्यकामा मकै, कोदो, धान", "छहारी ढालमा एलाच–सुन्तला खाल्डा"],
    },
    livestock: {
      en: ["Dairy goats and buffalo; beekeeping traditions weave through the coffee farms"],
      np: ["डेयरी बाख्रा र भैंसी; मौरीपालन परम्परा कफी खेतसँगै बुनिन्छ"],
    },
    ecology: {
      en: "Tansen's ridge forests over the Kaligandaki; Satyawati lake and river-cliff vulture colonies mark the district's wild corners.",
      np: "कालीगण्डकीमाथि तानसेनका धार वन; सत्यवती ताल र नदी-भीरका गिद्ध उपनिवेश जिल्लाका जङ्गली कुना हुन्।",
    },
    climate: {
      en: "Cool ridge climate with valley heat below; coffee blossom timing now swings with warmer, erratic pre-monsoon showers.",
      np: "तल उपत्यका ताप, माथि चिसो धार; तातो र अनियमित मनसुनअघिको वर्षासँग कफी फुल्ने समय हल्लिन थालेको छ।",
    },
  },
  {
    name: "Arghakhanchi",
    np: "अर्घाखाँची",
    hq: { en: "Sandhikharka", np: "सन्धिखर्क" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Emerging coffee and ginger hills", np: "उभिँदो कफी र अदुवा पहाड" },
    crops: {
      en: ["Coffee expanding fast alongside Gulmi (documented as a significant production area); maize, millet, paddy pockets", "Ginger and banana on the warmer aspects"],
      np: ["गुल्मीसँगै छिटो फैलिरहेको कफी (महत्त्वपूर्ण उत्पादन क्षेत्रका रूपमा प्रमाणित); मकै, कोदो, धान खाल्डो", "न्यानो ढालमा अदुवा–केरा"],
    },
    livestock: {
      en: ["Goat keeping and buffalo dairy for the hill bazaars"],
      np: ["पहाडी बजारका लागि बाख्रा–भैंसी दुध"],
    },
    ecology: {
      en: "Ridge-and-spur forests with community-forest corridors; the district's remoteness keeps intact wildlife linkages.",
      np: "धार-स्पर वन र सामुदायिक वन करिडोर; जिल्लाको टाढापनले वन्यजन्तु जोडाइ बाँकी राखेको छ।",
    },
    climate: {
      en: "Slope farming on erodible soils; coffee's shade trees double as the erosion-control investment.",
      np: "कटिलो माटोमा ढाल खेती; कफीका छहारी रूख नै क्षयरोधक लगानी हुन्।",
    },
  },
  {
    name: "Gulmi",
    np: "गुल्मी",
    hq: { en: "Tamghas", np: "तामघास" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Coffee capital of Nepal", np: "नेपालको कफी राजधानी" },
    crops: {
      en: ["Arabica coffee — Gulmi is Nepal's most recognised coffee district (a documented district study counts ≈160 ha, ≈35 t green beans, ≈219 kg/ha)", "Maize, millet, paddy in valleys; orange and banana pockets"],
      np: ["अरेबिका कफी — गुल्मी नेपालको सबैभन्दा पहिचान कफी जिल्ला (प्रकाशित जिल्ला अध्ययनले करिब १६० हे., करिब ३५ टन हरियो दाना, करिब २१९ केजी/हे. गणना गरेको छ)", "उपत्यकामा मकै, कोदो, धान; सुन्तला–केरा खाल्डा"],
    },
    livestock: {
      en: ["Goat and buffalo systems; beekeeping pairs naturally with the coffee blossom flow"],
      np: ["बाख्रा–भैंसी प्रणाली; कफी फुल्ने समयसँगै मौरीपालन स्वाभाविक जोडिन्छ"],
    },
    ecology: {
      en: "Resunga's sacred forest ridge — a community-managed watershed above Tamghas; river-cliff vulture feeding sites operate nearby.",
      np: "रेसुङ्गाको पवित्र वन धार — तामघासमाथि सामुदायिक व्यवस्थापित जलाधार; नजिकै नदी-भीरका गिद्ध आहारा स्थल चल्छन्।",
    },
    climate: {
      en: "Coffee's ideal 800–1,600 m band sits here; warming is nudging the premium cherry zone upslope — growers follow with new plantings.",
      np: "कफीको आदर्श ८००–१,६०० मि. पट्टी यहीँ छ; ताप बढ्दा उत्कृष्ट चेरी इलाका माथि सर्दैछ — किसान नयाँ रोपाइँसँगै पछ्याउँछन्।",
    },
  },
  {
    name: "Pyuthan",
    np: "प्युठान",
    hq: { en: "Pyuthan (Khalanga)", np: "प्युठान (खलङ्गा)" },
    belt: { en: "Mid-hills · Jhimruk valley", np: "मध्यपहाड · झिमरुक उपत्यका" },
    knownFor: { en: "Ghee, goats and hill cereals", np: "घ्यू, बाख्रा र पहाडी अन्न" },
    crops: {
      en: ["Maize, millet, paddy in the Jhimruk basin, potato and mustard", "Fruit orchards (local peach and citrus) expanding on ridge sites"],
      np: ["झिमरुक खाल्डोमा मकै, कोदो, धान, आलु, तोरी", "धार स्थानमा फैलिँदै गरेका (स्थानीय आरुबखडा र सिट्रस) फलफूल बगैंचा"],
    },
    livestock: {
      en: ["Ghee production from buffalo herds is a district signature trade; goats central to cash flow"],
      np: ["भैंसी बथनबाट घ्यू उत्पादन जिल्लाको हस्ताक्षर व्यापार; नगद प्रवाहमा बाख्रा केन्द्रमा"],
    },
    ecology: {
      en: "Jhimruk river terraces and forested spurs; vulture strongholds along the cliffs benefit from the ghee-economy's livestock base.",
      np: "झिमरुक नदी किनार र वनाक्रान्त स्पर; भीरका गिद्धले घ्यू अर्थतन्त्रको पशुधन आधारबाट लाभ लिन्छन्।",
    },
    climate: {
      en: "Drought-prone spur soils; the Jhimruk hydropower canal now doubles as irrigation spine.",
      np: "स्परका माटोमा सुक्खा प्रवृत्ति; झिमरुक जलविद्युत् नहर अब सिँचाइको मेरुदण्डसमेत हो।",
    },
  },
  {
    name: "Rolpa",
    np: "रोल्पा",
    hq: { en: "Liwang", np: "लिवाङ" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Organic coffee and red-bean hills", np: "जैविक कफी र रातो रैमा डाँडा" },
    crops: {
      en: ["Coffee — Rolpa's organic coffee movement is nationally recognised; maize, millet, potato and paddy in river pockets", "Local bean landraces (rattle/masTED bean pockets) and orchard beginnings"],
      np: ["कफी — रोल्पाको जैविक कफी आन्दोलन राष्ट्रिय स्तरमा पहिचान; खोला खाल्डोमा मकै, कोदो, आलु, धान", "स्थानीय सिमी जातहरू र सुरुवातका बगैंचा"],
    },
    livestock: {
      en: ["Goat and buffalo keeping as household anchors"],
      np: ["घरायसी आधारका रूपमा बाख्रा–भैंसी"],
    },
    ecology: {
      en: "Steep mid-hill forests; community forestry groups manage the ridge catchments feeding hill irrigation.",
      np: "भिरालो मध्यपहाडी वन; सामुदायिक वन समूहले पहाडी सिँचाइ भर्ने धार जलाधार व्यवस्थापन गर्छन्।",
    },
    climate: {
      en: "Dry-spur agriculture — moisture stress limits spring crops; coffee shade systems and water ponds are the adaptation pair.",
      np: "सुक्खा-स्पर खेती — ओसार अभावले बसन्त बाली रोक्छ; कफी छहारी प्रणाली र पानी पोखरी अनुकूलन जोडी हुन्।",
    },
  },
  {
    name: "Dang",
    np: "दाङ",
    hq: { en: "Ghorahi", np: "घोराही" },
    belt: { en: "Inner Terai valleys (Dang–Deukhuri)", np: "भित्री तराई उपत्यका (दाङ–देउखुरी)" },
    knownFor: { en: "Valley paddy and mustard country", np: "उपत्यका धान र तोरी देश" },
    crops: {
      en: ["Paddy across the Dang and Deukhuri valleys — the largest inner-Terai rice floors; mustard and wheat follow", "Banana belts, vegetable rings and fish ponds around Tulsipur–Ghorahi"],
      np: ["दाङ–देउखुरी उपत्यकाभरि धान — सबैभन्दा ठूलो भित्री-तराई चामल भुइँ; पछि तोरी–गहुँ", "तुल्सीपुर–घोराहीवरिपरि केरा पट्टी, तरकारी घेरा र माछा पोखरी"],
    },
    livestock: {
      en: ["Goat finishing, buffalo dairy and a growing broiler layer around the valley towns"],
      np: ["बाख्रा, भैंसी दुध र उपत्यका सहरघेरा बढिरहेको ब्रोइलर तह"],
    },
    ecology: {
      en: "The Babai and Rapti corridors with Chure backdrop; remnant Sal 'Char Koshe Jhadi' belts and vulture cliffs along the Rapti.",
      np: "चुरे पृष्ठभूमिसहित बबई–राप्ति मार्ग; बाँकी साल 'चार कोसे झाडी' पट्टी र राप्तिका गिद्ध भीर।",
    },
    climate: {
      en: "Valley heat with flood-and-drought swings on the Babai; mustard's winter window is shortening measurably.",
      np: "बबईमा बाढी–सुक्खा दोब्बरिने उपत्यका ताप; तोरीको जाडो झ्याल मापनयोग्य रूपमा छोटो भइरहेको छ।",
    },
  },
  {
    name: "Banke",
    np: "बाँके",
    hq: { en: "Nepalgunj", np: "नेपालगन्ज" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Wheat heartland and border trade", np: "गहुँ गढ र सीमा व्यापार" },
    crops: {
      en: ["Wheat — Banke consistently ranks in Nepal's top wheat districts; paddy, mustard and sugarcane follow", "Vegetable and banana belts around Nepalgunj"],
      np: ["गहुँ — बाँके निरन्तर नेपालका उत्कृष्ट गहुँ जिल्लामा गणिन्छ; पछि धान, तोरी, उखु", "नेपालगन्जवरिपरि तरकारी–केरा घेरा"],
    },
    livestock: {
      en: ["Dairy and goat systems tied to the Nepalgunj market — one of the west's biggest livestock trading hubs"],
      np: ["नेपालगन्ज बजारसँग जोडिएको डेयरी–बाख्रा — पश्चिमको सबैभन्दा ठूलो पशु व्यापार केन्द्रमध्ये"],
    },
    ecology: {
      en: "Banke National Park (2010): Nepal's youngest 'arc' park — tiger, elephant and four-horned antelope habitat linked to Bardia; the Rapti's oxbow lakes thread farmland.",
      np: "बाँके राष्ट्रिय निकुञ्ज (२०१०): नेपालको सबैभन्दा नयाँ 'आर्क' निकुञ्ज — बाघ, हात्ती र चारसिङ्गे हरिण बार्दियासँग जोडिएको; राप्तिका नौले ताल खेतबारीभित्रै छिरेका छन्।",
    },
    climate: {
      en: "Among Nepal's hottest stations — heat waves cross 44 °C; irrigation timing and short-duration wheat are the working levers.",
      np: "नेपालका सबैभन्दा तातो क्षेत्रमध्ये — गर्मीको लहर ४४ डिग्री पार गर्छ; सिँचाइ समय र छोटो-अवधिको गहुँ व्यवहारिक चुङ्गा हुन्।",
    },
  },
  {
    name: "Bardiya",
    np: "बार्दिया",
    hq: { en: "Gulariya", np: "गुलरिया" },
    belt: { en: "Terai plains", np: "तराई मैदान" },
    knownFor: { en: "Rice leader inside tiger country", np: "बाघ देशभित्रको धान अगुवा" },
    crops: {
      en: ["Paddy — Bardiya alternates at the very top of national paddy production; wheat, mustard and lentil follow", "Banana belts and fish ponds on canal command areas"],
      np: ["धान — बार्दिया राष्ट्रिय धान उत्पादनको एकदम माथि नै घुम्छ; पछि गहुँ, तोरी, मसुरो", "नहर कमान क्षेत्रमा केरा पट्टी र माछा पोखरी"],
    },
    livestock: {
      en: ["Buffalo dairy cooperatives and goat finishing for the western market chain"],
      np: ["पश्चिमी बजार श्रृङ्खलाका लागि भैंसी डेयरी सहकारी र बाख्रा"],
    },
    ecology: {
      en: "Bardia National Park — Nepal's largest tiger stronghold: wild elephant, swamp deer (barasingha), Gangetic dolphin in the Karnali–Geruwa, gharial, and the Khairapur blackbuck enclosure; Tharu farm culture borders the park fence.",
      np: "बार्दिया राष्ट्रिय निकुञ्ज — नेपालको सबैभन्दा ठूलो बाघ गढ: जङ्गी हात्ती, बारासिङ्गा, कर्णाली–गेरुवाको गंगाटी डल्फिन, घड़ियाल र खैरापुरको कालो वर्गाथरी गराब; थारु खेत संस्कृति निकुञ्जको जङ्लो किनारमा।",
    },
    climate: {
      en: "Karnali-side floods (the 2017 and 2022 events remapped riverside farms) plus intense heat; community forest-user groups now front floodplain zoning.",
      np: "कर्णालीपट्टिको बाढी (२०१७ र २०२२ का घटनाले नदी किनारका खेत फेर्‍यो) र चर्को गर्मी; सामुदायिक वन उपभोक्ता समूहहरू अब पूर्वाधार क्षेत्र निर्धारणमा अगाडि छन्।",
    },
  },
  {
    name: "Rukum",
    np: "रुकुम (पूर्व)",
    hq: { en: "Rukumkot", np: "रुकुमकोट" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Potato and goat hills of the eastern Rukum", np: "पूर्वी रुकुमका आलु–बाख्रा डाँडा" },
    crops: {
      en: ["Maize, millet, potato and paddy in the Sani Bheri pockets; apple trials on high sites", "Coffee beginning on the warm ridges"],
      np: ["सानी भेरी खाल्डोमा मकै, कोदो, आलु, धान; उच्च स्थानमा स्याउ परीक्षण", "न्यानो धारमा सुरु भएको कफी"],
    },
    livestock: {
      en: ["Goats are the bankable livestock; buffalo serve the bazaar dairy"],
      np: ["बाख्रा बैंक गर्न मिल्ने पशुधन; बजार डेयरीका लागि भैंसी"],
    },
    ecology: {
      en: "Dhorpatan Hunting Reserve's eastern edge — blue sheep and high pasture systems; the Sani Bheri carves farm terraces.",
      np: "धोरपटान शिकार आरक्षको पूर्वी किनार — नाउर र उच्च चरन प्रणाली; सानी भेरीले गह्रा काट्छ।",
    },
    climate: {
      en: "Cold winters with hail in the potato belt; slope-frost pockets define planting dates.",
      np: "आलु पट्टीमा चिसो जाडो र चिहाँडो; ढालका तुसारो खाल्डोले रोपाइँ मिति तय गर्छ।",
    },
  },
  /* ═════════════════════════════ KARNALI (10) ══════════════════════════ */
  {
    name: "Dolpa",
    np: "डोल्पा",
    hq: { en: "Dunai", np: "दुनै" },
    belt: { en: "Trans-Himalayan high desert", np: "हिमालपारि उच्च मरु क्षेत्र" },
    knownFor: { en: "Shey Phoksundo, yaks and yarsagumba", np: "शे फोक्सुण्डो, याक र यार्सागुम्बा" },
    crops: {
      en: ["Buckwheat, barley, potato and high-valley beans; the Tibetan-barley tradition persists above 3,000 m", "Almost no tree crops — the growing season is a tight 90–120 days"],
      np: ["फापर, जौ, आलु र उच्च उपत्यकाका सिमी; ३,००० मि.माथि तिब्बती जौ परम्परा यथावत्", "रूख बाली लगभग छैनन् — बाली मौसम जम्मा ९०–१२० दिनको खाल्डो" ],
    },
    livestock: {
      en: ["Yaks and Chyangra goats are the backbone; yarsagumba (caterpillar-fungus) harvesting is the district's single largest seasonal cash event"],
      np: ["याक र च्याङ्ग्रा आधार; यार्सागुम्बा सङ्कलन जिल्लाको एकल-सबैभन्दा ठूलो मौसमी नगद कार्यक्रम हो"],
    },
    ecology: {
      en: "Shey Phoksundo National Park — Nepal's largest park: Phoksundo (deepest lake), snow leopard, blue sheep, Tibetan argali; the ancient Salt-Caravan route to Tibet crosses the farm belt.",
      np: "शे फोक्सुण्डो राष्ट्रिय निकुञ्ज — नेपालको सबैभन्दा ठूलो निकुञ्ज: फोक्सुण्डो (सबैभन्दा गहिरो ताल), हिउँ चितुवा, नाउर, तिब्बती अर्गाली; तिब्बत जाने पुरानो नुन-कारवाँँ मार्ग खेती भेगभएर जान्छ।",
    },
    climate: {
      en: "Cold desert — under 300 mm precipitation in places; snow-line creep and early melt now shift both the herding and yarsagumba calendars.",
      np: "चिसो मरुभूमि — कतै ३०० मि.मि.भन्दा कम वर्षा; हिउँरेखा माथि सर्ने र चाँडै पग्लने क्रमले चरन र यार्सा दुवै पात्रो सार्दैछ।",
    },
  },
  {
    name: "Mugu",
    np: "मुगु",
    hq: { en: "Gamgadhi", np: "गामगढी" },
    belt: { en: "High Himalaya · Karnali corridor", np: "उच्च हिमाल · कर्णाली मार्ग" },
    knownFor: { en: "Rara lake and yarsagumba economy", np: "रारा ताल र यार्सागुम्बा अर्थतन्त्र" },
    crops: {
      en: ["Buckwheat, barley, potato, beans and the highest-altitude paddy trials along the Karnali", "Chinese-apple and walnut plantings in sheltered pockets"],
      np: ["फापर, जौ, आलु, सिमी र कर्णाली किनारमा सबैभन्दा उचाइका धान परीक्षण", "आश्रय खाल्डोमा चिनियाँ स्याउ–ओखर रोपाइँ"],
    },
    livestock: {
      en: ["Chyangra goats and sheep; yarsagumba collection around Rara's upper belt drives seasonal income"],
      np: ["च्याङ्ग्रा र भेडा; राराको माथिल्लो भेगवरिपरि यार्सागुम्बा सङ्कलनले मौसमी आम्दानी चलाउँछ"],
    },
    ecology: {
      en: "Rara National Park — Nepal's smallest park protecting its largest lake (Rara, 1,670 ha): Himalayan black bear, musk deer and endemic fish; the Karnali is Nepal's longest free-flowing river.",
      np: "रारा राष्ट्रिय निकुञ्ज — नेपालको सबैभन्दा सानो निकुञ्जले सबैभन्दा ठूलो ताल (रारा, १,६७० हे.) जोगाउँछ: हिमाली काले भालु, कस्तुरी मृग र स्थानीय माछा; कर्णाली नेपालको सबैभन्दा लामो बाधारहित नदी हो।",
    },
    climate: {
      en: "Historic food-insecurity belt — short seasons and harsh winters; solar greenhouses now extend vegetable growing past the old limits.",
      np: "ऐतिहासिक खाद्य असुरक्षा पट्टी — छोटो मौसम र कठिन जाडो; सोलार ग्रीनहाउसले तरकारी उब्जाउने सीमा पुरानो सीमाभन्दा पर लानेको छ।",
    },
  },
  {
    name: "Humla",
    np: "हुम्ला",
    hq: { en: "Simikot", np: "सिमिकोट" },
    belt: { en: "Trans-Himalayan high belt", np: "हिमालपारि उच्च भाग" },
    knownFor: { en: "Apples, yaks and the ancient salt route", np: "स्याउ, याक र पुरानो नुन बाटो" },
    crops: {
      en: ["High-desert apples (Simikot belt), buckwheat, barley, potato and beans", "Greenhouse vegetable programmes fighting the 120-day season"],
      np: ["उच्च-सुक्खा स्याउ (सिमिकोट पट्टी), फापर, जौ, आलु, सिमी", "१२० दिनको मौसमसँग लड्ने ग्रीनहाउस तरकारी कार्यक्रम"],
    },
    livestock: {
      en: ["Yaks, Chyangra and horses — the Limi valley still runs the Tibet caravan trade; yarsagumba collection in spring"],
      np: ["याक, च्याङ्ग्रा र घोडा — लिमी उपत्यका अझै तिब्बत कारवाँँ व्यापार चलाउँछ; बसन्तमा यार्सागुम्बा सङ्कलन"],
    },
    ecology: {
      en: "Trans-Himalayan steppe with snow leopard and Tibetan wildlife assemblages; the Karnali headwaters rise here — glacier health upstream writes the river's future.",
      np: "हिमालपारि स्टेप, हिउँ चितुवा र तिब्बती वन्यजन्तु समूह; कर्णालीको उद्गम यहीँ उठ्छ — माथिल्लो हिमनदीको स्वास्थ्यले नदीको भविष्य लेख्छ।",
    },
    climate: {
      en: "Warming is fastest in these thin-air systems — apple belts are moving up, and old caravan passes stay open longer each year.",
      np: "यी पातलो-हावा प्रणालीमा ताप वृद्धि सबैभन्दा छिटो छ — स्याउ पट्टी माथि सर्दैछ, पुराना कारवाँँ भाल अब हरेक वर्ष लामो खुला रहन्छन्।",
    },
  },
  {
    name: "Jumla",
    np: "जुम्ला",
    hq: { en: "Chandannath (Khalanga)", np: "चन्दननाथ (खलङ्गा)" },
    belt: { en: "High Himalayan basin (≈2,200–3,000 m)", np: "उच्च हिमाली खाल्डो (करिब २,२००–३,००० मि.)" },
    knownFor: { en: "Jumli Marsi rice and famous apples", np: "जुम्ली मार्सी धान र प्रसिद्ध स्याउ" },
    crops: {
      en: ["Jumli Marsi — the world's highest-grown rice at ≈2,200 m+, a GI-recognised red rice; apples are the flagship cash crop", "Buckwheat, barley, bean landraces and disease-free seed potato"],
      np: ["जुम्ली मार्सी — करिब २,२०० मि.माथि उब्जिने विश्वकै सबैभन्दा उचाइको धान, भौगोलिक संकेत पाएको रातो चामल; स्याउ प्रमुख नगद बाली", "फापर, जौ, स्थानीय सिमी जात र रोगमुक्त बीउ आलु"],
    },
    livestock: {
      en: ["Chyangra goats, sheep and cattle adapted to stall-feeding winters; Sinja valley's historic cattle economy"],
      np: ["च्याङ्ग्रा, भेडा र जाडो गोठा-भर अभ्यस्त गाई; सिँजा उपत्यकाको ऐतिहासिक गाई अर्थतन्त्र"],
    },
    ecology: {
      en: "Sinja valley — the origin of the Nepali language and Khasa kingdom archaeology; Shey-Phoksundo-adjacent high pastures; the Tila river drains the basin.",
      np: "सिँजा उपत्यका — नेपाली भाषा र खस साम्राज्य पुरातत्वको उद्गम; शे-फोक्सुण्डो-नजिकका उच्च चरन; तिला नदीले खाल्डो बगाउँछ।",
    },
    climate: {
      en: "Frost-free days are the whole game — Marsi's cold tolerance is the adaptation; apple orchards are climbing to satisfy chill-hour needs.",
      np: "तुसारो-रहित दिन नै मुख्य खेल — मार्सीको चिसो-सहनशीलता अनुकूलन हो; चिसो-घण्टा आवश्यकता पुर्‍याउन स्याउ बगैंचा माथि उकालिँदै।",
    },
  },
  {
    name: "Kalikot",
    np: "कालिकोट",
    hq: { en: "Khandachakra (Manma)", np: "खण्डचक्र (मान्मा)" },
    belt: { en: "High hills · Karnali corridor", np: "उच्च पहाड · कर्णाली मार्ग" },
    knownFor: { en: "Apple pockets and goat hills", np: "स्याउ खाल्डा र बाख्रा डाँडा" },
    crops: {
      en: ["Apple and walnut pockets, buckwheat, barley, millet and maize on lower terraces", "Off-season vegetable programmes around Manma"],
      np: ["स्याउ–ओखर खाल्डा, फापर, जौ, कोदो र तल्लो गह्रामा मकै", "मान्मावरिपरि समयमुनिका तरकारी कार्यक्रम"],
    },
    livestock: {
      en: ["Goat keeping is the lead livestock; sheep and Chyangra on high pastures"],
      np: ["बाख्रा पालन मुख्य पशुधन; उच्च चरनमा भेडा–च्याङ्ग्रा"],
    },
    ecology: {
      en: "Karnali-bench dry forests; vulture cliffs and Himalayan monal habitat on the high ridges.",
      np: "कर्णाली किनारका सुक्खा वन; उच्च धारमा गिद्ध भीर र डाँफे बासस्थान।",
    },
    climate: {
      en: "Karnali's documented sharp winter warming hits here — winter cereal windows and goat winter-feed budgets are being re-planned.",
      np: "कर्णालीको प्रमाणित तीव्र जाडो-ताप वृद्धि यहीँ लाग्छ — जाडो अन्न झ्याल र बाख्राको जाडो-चारा बजेट फेरि तयार गरिँदैछ।",
    },
  },
  {
    name: "Dailekh",
    np: "दैलेख",
    hq: { en: "Dailekh (Narayan)", np: "दैलेख (नारायण)" },
    belt: { en: "Mid-hills · Karnali transition", np: "मध्यपहाड · कर्णाली सङ्क्रमण" },
    knownFor: { en: "Goat farming and hill cereals", np: "बाख्रा पालन र पहाडी अन्न" },
    crops: {
      en: ["Maize, millet, paddy in river pockets, mustard and potato", "Citrus and banana on warm river aspects"],
      np: ["मकै, कोदो, खोला खाल्डोमा धान, तोरी, आलु", "न्यानो नदी ढालमा सिट्रस–केरा"],
    },
    livestock: {
      en: ["Goats are the signature livestock of the district's household economy; buffalo dairies in the bazaar belt"],
      np: ["जिल्लाको घरायसी अर्थतन्त्रको हस्ताक्षर पशुधन बाख्रा; बजार पट्टीमा भैंसी डेयरी"],
    },
    ecology: {
      en: "Loess-like erodible hills — the district gives the Karnali its heavy sediment loads; community forests anchor the slopes.",
      np: "लोएस-जस्तो कटिलो पहाड — जिल्लाले कर्णालीलाई भारी तलछट दिन्छ; सामुदायिक वनले ढाल थाम्छन्।",
    },
    climate: {
      en: "Drought-prone with intense gully erosion; slope-stabilising fodder species double as goat feed.",
      np: "सुक्खा प्रवृत्ति र तीव्र खोँच क्षय; ढाल-थाम्बा चारा वाली बाख्राको आहारासमेत हुन्।",
    },
  },
  {
    name: "Jajarkot",
    np: "जाजरकोट",
    hq: { en: "Bheri (Khalanga)", np: "भेरी (खलङ्गा)" },
    belt: { en: "Mid-hills · Bheri corridor", np: "मध्यपहाड · भेरी मार्ग" },
    knownFor: { en: "Millet, goats and rebuild-after-quake farming", np: "कोदो, बाख्रा र भूकम्पपछिको पुनर्निर्माण खेती" },
    crops: {
      en: ["Millet, maize, paddy in Bheri pockets and potato; citrus in sheltered sites", "Nursery and orchard re-establishment programmes post-2023 earthquake"],
      np: ["कोदो, मकै, भेरी खाल्डोमा धान र आलु; आश्रय स्थानमा सिट्रस", "२०२३ भूकम्पपछिका बिरुवा-बगैंचा पुनर्स्थापना कार्यक्रम"],
    },
    livestock: {
      en: ["Goat and buffalo keeping as household anchors"],
      np: ["घरायसी आधारका रूपमा बाख्रा–भैंसी"],
    },
    ecology: {
      en: "Bheri river gorge with vulture colonies; the November 2023 Jajarkot earthquake is the newest case study in farm-terrain recovery.",
      np: "गिद्ध उपनिवेस भएको भेरी नदी खोँच; २०२३ को नोभेम्बर जाजरकोट भूकम्प खेत-भूबनोट पुनर्उत्थानको नयाँ अध्ययन केस हो।",
    },
    climate: {
      en: "Dry-hill syndrome with landslide-prone geology; fodder-first restoration is the accepted route back.",
      np: "पहिरो-प्रवृत्ति भूगर्भसहितको सुक्खा-पहाड लक्षण; चारा-पहिलो पुनर्स्थापना स्वीकृत फर्कने बाटो हो।",
    },
  },
  {
    name: "Surkhet",
    np: "सुर्खेत",
    hq: { en: "Birendranagar", np: "वीरेन्द्रनगर" },
    belt: { en: "Surkhet valley (inner Terai) · mid-hills", np: "सुर्खेत उपत्यका (भित्री तराई) · मध्यपहाड" },
    knownFor: { en: "Valley paddy and off-season vegetables", np: "उपत्यका धान र समयमुनिका तरकारी" },
    crops: {
      en: ["Paddy in the Surkhet valley with maize, wheat and mustard; vegetable belts around Birendranagar", "Off-season vegetable programmes expanding with the provincial market"],
      np: ["सुर्खेत उपत्यकामा धानसँगै मकै, गहुँ, तोरी; वीरेन्द्रनगरवरिपरि तरकारी घेरा", "प्रदेश बजारसँगै फैलिँदै गरेका समयमुनिका तरकारी कार्यक्रम"],
    },
    livestock: {
      en: ["Goat finishing, buffalo dairy and poultry serving the provincial capital"],
      np: ["प्रदेश राजधानी धान्न बाख्रा, भैंसी दुध र कुखुरा"],
    },
    ecology: {
      en: "Bheri and Sanni corridors; Bulbule lake wetland at the city edge; Sal forests climb the surrounding Mahabharat rim.",
      np: "भेरी–सानी मार्ग; सहर किनारको बुलबुले ताल विसाउँ; घेराउने महाभारत धारमा साल वन उकालिन्छ।",
    },
    climate: {
      en: "Valley heat plus hill drought — the province's adaptation projects (lift irrigation, water ponds) concentrate here.",
      np: "उपत्यका ताप र पहाड सुक्खा — प्रदेशका अनुकूलन परियोजना (लिफ्ट सिँचाइ, पानी पोखरी) यहीँ केन्द्रित छन्।",
    },
  },
  {
    name: "Salyan",
    np: "सल्यान",
    hq: { en: "Sharada (Salyan Khalanga)", np: "शारदा (सल्यान खलङ्गा)" },
    belt: { en: "Mid-hills · Rapti headwaters", np: "मध्यपहाड · राप्ति उद्गम" },
    knownFor: { en: "Goat and oilseed hills", np: "बाख्रा र तेलहन डाँडा" },
    crops: {
      en: ["Maize, millet, paddy pockets, mustard and potato", "Citrus and banana on warm aspects"],
      np: ["मकै, कोदो, धान खाल्डो, तोरी, आलु", "न्यानो ढालमा सिट्रस–केरा"],
    },
    livestock: {
      en: ["Goat keeping at commercial scale for the western festival markets; buffalo in the bazaar belt"],
      np: ["पश्चिमा चाडपर्वका बजारका लागि व्यावसायिक स्तरको बाख्रा; बजार पट्टीमा भैंसी"],
    },
    ecology: {
      en: "Rapti headwater forests; Dhorpatan Hunting Reserve's southern approaches.",
      np: "राप्ति उद्गम वन; धोरपटान शिकार आरक्षको दक्षिणी बाटो।",
    },
    climate: {
      en: "Drought-prone mid-hills; goat hardiness makes livestock the climate hedge.",
      np: "सुक्खा प्रवृत्तिका मध्यपहाड; बाख्राको जुँग्राइले पशुधन नै जलवायु सुरक्षा-जोग बनेको छ।",
    },
  },
  {
    name: "Rukum West",
    np: "रुकुम (पश्चिम)",
    hq: { en: "Musikot (Rukum)", np: "मुसिकोट (रुकुम)" },
    belt: { en: "Mid-hills · Sani Bheri", np: "मध्यपहाड · सानी भेरी" },
    knownFor: { en: "Potato, apples and Dhorpatan approaches", np: "आलु, स्याउ र धोरपटान बाटो" },
    crops: {
      en: ["Maize, millet, potato and paddy pockets; apple and walnut plantings gaining ground", "Coffee trials on warm ridges"],
      np: ["मकै, कोदो, आलु, धान खाल्डो; स्याउ–ओखर रोपाइँले जमिन पाउँदै", "न्यानो धारमा कफी परीक्षण"],
    },
    livestock: {
      en: ["Goat and sheep keeping; herds summer in the Dhorpatan reserve-adjacent pastures"],
      np: ["बाख्रा–भेडा पालन; बथान गर्मीमा धोरपटान आरक्ष-नजिकका चरनमा बस्छन्"],
    },
    ecology: {
      en: "Dhorpatan Hunting Reserve core approaches — blue sheep and high-alpine pastures; the Sani Bheri carves the farm terraces.",
      np: "धोरपटान शिकार आरक्षको मुख्य बाटो — नाउर र उच्च लेक चरन; सानी भेरीले गह्रा काट्छ।",
    },
    climate: {
      en: "Cold winters with hail; the high-altitude apple niche is expanding as lower belts warm.",
      np: "चिसो जाडो र चिहाँडो; तल्लो पट्टी ताप बढ्दै जाँदा उच्च-उचाइको स्याउ खाल्डो फैलिँदै।",
    },
  },

  /* ═══════════════════════════ SUDURPASHCHIM (9) ═══════════════════════ */
  {
    name: "Bajura",
    np: "बाजुरा",
    hq: { en: "Martadi", np: "मर्ताडी" },
    belt: { en: "High hills", np: "उच्च पहाड" },
    knownFor: { en: "Free-range goat country", np: "खुला चरनको बाख्रा देश" },
    crops: {
      en: ["Millet, buckwheat, barley, maize and potato — hardy cereals dominate", "Apple and walnut pockets gaining ground in sheltered sites"],
      np: ["कोदो, फापर, जौ, मकै, आलु — कठोर अन्न प्रभुत्वमा", "आश्रय स्थानमा फैलिँदै गरेका स्याउ–ओखर खाल्डा"],
    },
    livestock: {
      en: ["The district's celebrated free-range goats (a cultural byword for hardy meat animals); sheep and Chyangra on high pastures"],
      np: ["जिल्लाका चर्चित खुला चरनका बाख्रा (मजबुत मासु पशुको सांस्कृतिक पर्याय); उच्च चरनमा भेडा–च्याङ्ग्रा"],
    },
    ecology: {
      en: "Khaptad NP-adjacent ridge forests; Karnali-side catchments; Himalayan monal and musk deer habitat.",
      np: "खप्तड निकुञ्ज-नजिकका धार वन; कर्णालीपट्टिका जलाधार; डाँफे र कस्तुरी मृग बासस्थान।",
    },
    climate: {
      en: "Harsh winters and thin soils; goats remain the crop-failure insurance of the food-insecurity years.",
      np: "कठिन जाडो र पातलो माटो; खाद्य असुरक्षाका वर्षमा बाख्रा नै बाली-असफलताको बिमा रहिआएको छ।",
    },
  },
  {
    name: "Bajhang",
    np: "बझाङ",
    hq: { en: "Chainpur", np: "चैनपुर" },
    belt: { en: "High hills · Saipal Himal", np: "उच्च पहाड · साइपाल हिमाल" },
    knownFor: { en: "Yarsagumba and transhumance herds", np: "यार्सागुम्बा र चरन-सर्ने बथान" },
    crops: {
      en: ["Millet, buckwheat, barley, maize and potato; apple pockets", "The tight season limits anything but hardy crops"],
      np: ["कोदो, फापर, जौ, मकै, आलु; स्याउ खाल्डा", "छोटो मौसमले कठोर बालीबाहेक अरू चलाउँदैन" ],
    },
    livestock: {
      en: ["Sheep and goat transhumance between valley and high pastures; yarsagumba collection around Saipal's flanks is the cash pulse"],
      np: ["उपत्यका–उच्च चरनबीच भेडा–बाख्रा सारिन्छ; साइपालको ढालवरिपरि यार्सागुम्बा सङ्कलन नगद धड्कन हो"],
    },
    ecology: {
      en: "Khaptad National Park's northern reaches — Nepal's tranquil mid-hill park shared across five districts; Saipal (6,955 m) crowns the district.",
      np: "खप्तड राष्ट्रिय निकुञ्जको उत्तरी भाग — पाँच जिल्लामा बाँडिएको नेपालको शान्त मध्यपहाडी निकुञ्ज; साइपाल (६,९५५ मि.) जिल्लाको शिखर।",
    },
    climate: {
      en: "Sharp winter cold; yarsagumba snow-line timing is now an annual uncertainty for collector households.",
      np: "तीखो जाडो; यार्सागुम्बाको हिउँरेखा समय अब सङ्कलनकर्ता घरपरिवारका लागि वार्षिक अनिश्चितता बनेको छ।",
    },
  },
  {
    name: "Darchula",
    np: "दार्चुला",
    hq: { en: "Khalanga (Darchula)", np: "खलङ्गा (दार्चुला)" },
    belt: { en: "Trans-Himalayan · Mahakali corridor", np: "हिमालपारि · महाकाली मार्ग" },
    knownFor: { en: "Cashmere goats, herbs and the Api himal", np: "कास्मियर बाख्रा, जडीबुटी र अपि हिमाल" },
    crops: {
      en: ["Buckwheat, barley, millet, potato and dry-terrace beans; few tree crops survive the gorge winds", "Medicinal-herb and yarsagumba collection belts in the high flanks"],
      np: ["फापर, जौ, कोदो, आलु र सुक्खा गह्राका सिमी; खोँचको हावामा रूख बाली टिक्दैनन्", "उच्च ढालमा जडीबुटी–यार्सागुम्बा सङ्कलन भेग"],
    },
    livestock: {
      en: ["Chyangra (cashmere) goats are the signature — long-hair and pashmina lines adapted to gorge winters"],
      np: ["च्याङ्ग्रा (कास्मियर) बाख्रा हस्ताक्षर — खोँचको जाडोमा अभ्यस्त लामो-रौँ र पस्मिना वंश"],
    },
    ecology: {
      en: "Api Nampa Conservation Area (Api 7,132 m): snow leopard, Himalayan black bear and medicinal-plant wealth; the map of Nepal includes Limpiyadhura–Kalapani–Lipulekh within this district.",
      np: "अपि नाम्पा संरक्षण क्षेत्र (अपि ७,१३२ मि.): हिउँ चितुवा, हिमाली काले भालु र जडीबुटी धन; नेपालको नक्सामा लिम्पियाधुरा–कालापानी–लिपुलेक यही जिल्लाभित्र पर्छ।",
    },
    climate: {
      en: "Deep gorge aridity with violent valley wind; goat hardiness and herb belts define the adaptation frontier.",
      np: "गहिरो खोँचको सुक्खा र बलियो उपत्यका हावा; बाख्राको जुँग्राइ र जडीबुटी पट्टी अनुकूलनको अग्रिम मोर्चा हो।",
    },
  },
  {
    name: "Baitadi",
    np: "बैतडी",
    hq: { en: "Dasharathchand", np: "दशरथचन्द" },
    belt: { en: "Mid-hills · Mahakali-adjacent", np: "मध्यपहाड · महाकाली-नजिक" },
    knownFor: { en: "Baitadi ko boka — the famous goat", np: "बैतडीको बोका — प्रसिद्ध खसी" },
    crops: {
      en: ["Millet, maize, potato, paddy pockets and citrus on warm slopes", "Local bean landraces and fodder grass systems"],
      np: ["कोदो, मकै, आलु, धान खाल्डो, न्यानो ढालमा सिट्रस", "स्थानीय सिमी जात र घाँसे चारा प्रणाली"],
    },
    livestock: {
      en: ["Free-range goats — 'Baitadi ko boka' is a national byword for flavour; transhumance feeding on forest margins"],
      np: ["खुला चरनका बाख्रा — 'बैतडीको बोका' स्वादको राष्ट्रिय पर्याय; वन किनारको चरन-प्रणाली"],
    },
    ecology: {
      en: "Mahakali-bench forests with oak-pine mix; far-west Himalayan bird endemics in the ridge woods.",
      np: "बाँझ–सल्लो मिसिएको महाकाली किनार वन; धारका जङ्गलमा सुदूरपश्चिमी हिमाली चरा विशेष प्रजाति।",
    },
    climate: {
      en: "Drying springs are the far-west's flagship water problem — spring-shed conservation programmes run here at scale.",
      np: "सुक्दै गरेका मुहान सुदूरपश्चिमको प्रमुख पानी-समस्या हुन् — यहीँ ठूलो स्तरमा मुहान-जलाधार संरक्षण कार्यक्रम चल्छन्।",
    },
  },
  {
    name: "Dadeldhura",
    np: "डडेल्धुरा",
    hq: { en: "Amargadhi", np: "अमरगढी" },
    belt: { en: "Mid-hills", np: "मध्यपहाड" },
    knownFor: { en: "Hill cereals and goat finishing", np: "पहाडी अन्न र बाख्रा मोटो गर्ने" },
    crops: {
      en: ["Maize, millet, potato, paddy pockets and mustard", "Citrus and banana aspects on sheltered slopes"],
      np: ["मकै, कोदो, आलु, धान खाल्डो, तोरी", "आश्रय ढालमा सिट्रस–केरा"],
    },
    livestock: {
      en: ["Goat finishing for the far-west Dashain trade; buffalo dairies in bazaar belts"],
      np: ["सुदूरपश्चिमको दशैँ व्यापारका लागि बाख्रा; बजार पट्टीमा भैंसी डेयरी"],
    },
    ecology: {
      en: "Ridge forests feeding Sanni and Chaudhar catchments; vulture colonies along river cliffs.",
      np: "सानी–चौधर जलाधार भर्ने धार वन; नदी भीरमा गिद्ध उपनिवेश।",
    },
    climate: {
      en: "Rain-shadow dry hills; rooftop rainwater harvesting and pond culture lead the response.",
      np: "वर्षा-छायाँ सुक्खा पहाड; घर-छत वर्षा-सङ्कलन र पोखरी संस्कृति जवाफमा अगाडि।",
    },
  },
  {
    name: "Doti",
    np: "डोटी",
    hq: { en: "Dipayal Silgadhi", np: "दिपायल सिलगढी" },
    belt: { en: "Mid-hills · Seti corridor", np: "मध्यपहाड · सेती मार्ग" },
    knownFor: { en: "Khaptad's doorstep and hill livestock", np: "खप्तडको ढोका र पहाडी पशुधन" },
    crops: {
      en: ["Maize, millet, paddy in Seti pockets, potato and mustard", "Cardamom and citrus in shaded pockets"],
      np: ["मकै, कोदो, सेती खाल्डोमा धान, आलु, तोरी", "छहारी खाल्डोमा एलाच–सिट्रस"],
    },
    livestock: {
      en: ["Goat and buffalo keeping; sheep flocks summer near Khaptad's meadows"],
      np: ["बाख्रा–भैंसी पालन; भेडा बथान गर्मीमा खप्तडका मेदाँमा बस्छन्"],
    },
    ecology: {
      en: "Khaptad National Park's western gate — the 2,200 m meadow plateau with its lake, bhandara herbs and leopard habitat; the Seti drains to Dhangadhi's plains.",
      np: "खप्तड राष्ट्रिय निकुञ्जको पश्चिमी ढोका — ताल, भान्डारा जडीबुटी र चितुवा बासस्थान भएको २,२०० मि. मेदाँ; सेती नदी धनगढीको मैदानतर्फ बग्छ।",
    },
    climate: {
      en: "Monsoon-fed but spring-dry; community spring-recharge ponds have become the district's signature water works.",
      np: "मनसुनले भरिने तर बसन्तमा सुक्खा; सामुदायिक मुहान-रिचार्ज पोखरी जिल्लाको हस्ताक्षर जल-संरचना बनेका छन्।",
    },
  },
  {
    name: "Achham",
    np: "अछाम",
    hq: { en: "Mangalsen", np: "मंगलसेन" },
    belt: { en: "Mid-hills · Karnali-Rapti divide", np: "मध्यपहाड · कर्णाली-राप्ति विभाजक" },
    knownFor: { en: "Achhami cattle — the world's smallest cow", np: "अछामी गाई — विश्वकै सानो गाई" },
    crops: {
      en: ["Maize, millet, paddy pockets, mustard and potato", "Citrus on warm slopes; banana in river belts"],
      np: ["मकै, कोदो, धान खाल्डो, तोरी, आलु", "न्यानो ढालमा सिट्रस; नदी पट्टीमा केरा"],
    },
    livestock: {
      en: ["Home of the Achhami — the world's smallest cattle breed (≈1 m tall), a hardy hill genetic treasure; goats and buffalo follow"],
      np: ["अछामीको घर — विश्वको सबैभन्दा सानो गाई नस्ल (करिब १ मि. अग्लो), पहाडको कठोर आनुवंशिक निधि; पछि बाख्रा–भैंसी"],
    },
    ecology: {
      en: "Khaptad National Park's southern reaches; the Rapti and Karnali divides carry old-growth oak patches.",
      np: "खप्तड राष्ट्रिय निकुञ्जको दक्षिणी भाग; राप्ति–कर्णाली विभाजकमा पुराना बाँझ वन प्वाल।",
    },
    climate: {
      en: "Dry-hill agriculture with spring scarcity; the Achhami's low feed requirement is itself a climate adaptation.",
      np: "मुहान अभावसहितको सुक्खा-पहाड खेती; अछामीको कम आहार आवश्यकता आफैँमा जलवायु अनुकूलन हो।",
    },
  },
  {
    name: "Kailali",
    np: "कैलाली",
    hq: { en: "Dhangadhi", np: "धनगढी" },
    belt: { en: "Terai plains · Chure fringe", np: "तराई मैदान · चुरे धार" },
    knownFor: { en: "Top paddy district and far-west granary", np: "उत्कृष्ट धान जिल्ला र सुदूरपश्चिमको अन्नभण्डार" },
    crops: {
      en: ["Paddy — Kailali alternates at the very top of national production; wheat and mustard follow strongly", "Fish ponds expanding fast; banana and vegetable belts around Dhangadhi"],
      np: ["धान — कैलाली राष्ट्रिय उत्पादनको एकदम माथि घुम्छ; पछि बलियो गहुँ–तोरी", "छिटो फैलिँदै गरेका माछा पोखरी; धनगढीवरिपरि केरा–तरकारी घेरा"],
    },
    livestock: {
      en: ["Buffalo dairy around Dhangadhi's urban demand; goat finishing for the far-west markets"],
      np: ["धनगढीको सहरी मागवरिपरि भैंसी दुध; सुदूरपश्चिम बजारका लागि बाख्रा"],
    },
    ecology: {
      en: "Ghodaghodi Lake complex — a RAMSAR site of 13 linked lakes with otters, mugger crocodiles and rich waterfowl; Mohana and Khuti riverine forests form the border belt.",
      np: "घोडाघोडी ताल समूह — १३ जोडिएका तालको रामसार स्थल, ओटर, मगर गोही र धनी जलचरा; मोहना–खुटी नदी वन सीमा पट्टी बनाउँछन्।",
    },
    climate: {
      en: "Heat waves, Chure flash floods and river swings between drought and deluge; pond aquaculture doubles as water banking.",
      np: "गर्मीको लहर, चुरेको अचानक बाढी र सुक्खा–बाढीबीच दोब्बरिने नदी; पोखरी माछा खेती पानी-बैंकिङसमेत हो।",
    },
  },
  {
    name: "Kanchanpur",
    np: "कञ्चनपुर",
    hq: { en: "Bhimdatta (Mahendranagar)", np: "भीमदत्त (महेन्द्रनगर)" },
    belt: { en: "Terai plains · Mahakali corridor", np: "तराई मैदान · महाकाली मार्ग" },
    knownFor: { en: "Rice–wheat plains beside Shuklaphanta", np: "शुक्लाफाँटाछेउको धान–गहुँ मैदान" },
    crops: {
      en: ["Paddy and wheat among the western top districts; mustard, sugarcane and vegetable belts", "Fish ponds and tori riverbank (torai) vegetable culture along the Mahakali"],
      np: ["पश्चिमका उत्कृष्ट जिल्लामा धान–गहुँ; तोरी, उखु, तरकारी घेरा", "महाकाली किनारमा माछा पोखरी र तोडे तरकारी खेती"],
    },
    livestock: {
      en: ["Dairy and goat systems serving Bhimdatta and the border trade"],
      np: ["भीमदत्त र सीमा व्यापार धान्न डेयरी–बाख्रा प्रणाली"],
    },
    ecology: {
      en: "Shuklaphanta National Park: the world's largest swamp-deer herd, tigers, reintroduced rhinos and hispid hare in the grassland; Mahakali gharial and dolphin records.",
      np: "शुक्लाफाँटा राष्ट्रिय निकुञ्ज: विश्वकै सबैभन्दा ठूलो बारासिङ्गा बथान, बाघ, पुनर्स्थापित गैँडा र घाँसेमैदानको तेस्रो; महाकालीमा घड़ियाल–डल्फिनका अभिलेख।",
    },
    climate: {
      en: "One of Nepal's hottest stations with Chure-origin flash floods; canal irrigation from the Mahakali decides the wheat window.",
      np: "नेपालका सबैभन्दा तातो क्षेत्रमध्ये, चुरेबाट आउने अचानक बाढी; महाकालीको नहर सिँचाइले गहुँ झ्याल तय गर्छ।",
    },
  },
];

/* ── Lookup helpers ─────────────────────────────────────────────────────── */

export const districtByName = (name: string) => DISTRICTS.find((d) => d.name === name);

/** Districts grouped by the province order used across the site. */
export const PROVINCES_WITH_DISTRICTS: { id: string; npName: string; districts: DistrictProfile[] }[] = [
  { id: "Koshi", npName: "कोशी", districts: DISTRICTS.filter((d) =>
    ["Taplejung","Panchthar","Ilam","Jhapa","Morang","Sunsari","Dhankuta","Tehrathum","Sankhuwasabha","Bhojpur","Solukhumbu","Okhaldhunga","Khotang","Udayapur"].includes(d.name)) },
  { id: "Madhesh", npName: "मधेश", districts: DISTRICTS.filter((d) =>
    ["Saptari","Siraha","Dhanusha","Mahottari","Sarlahi","Rautahat","Bara","Parsa"].includes(d.name)) },
  { id: "Bagmati", npName: "बागमती", districts: DISTRICTS.filter((d) =>
    ["Dolakha","Sindhupalchok","Ramechhap","Sindhuli","Kavrepalanchok","Bhaktapur","Lalitpur","Kathmandu","Nuwakot","Rasuwa","Dhading","Makwanpur","Chitawan"].includes(d.name)) },
  { id: "Gandaki", npName: "गण्डकी", districts: DISTRICTS.filter((d) =>
    ["Manang","Mustang","Myagdi","Kaski","Lamjung","Gorkha","Tanahu","Syangja","Parbat","Baglung","Nawalparasi East"].includes(d.name)) },
  { id: "Lumbini", npName: "लुम्बिनी", districts: DISTRICTS.filter((d) =>
    ["Nawalparasi","Rupandehi","Kapilbastu","Palpa","Arghakhanchi","Gulmi","Pyuthan","Rolpa","Dang","Banke","Bardiya","Rukum"].includes(d.name)) },
  { id: "Karnali", npName: "कर्णाली", districts: DISTRICTS.filter((d) =>
    ["Dolpa","Mugu","Humla","Jumla","Kalikot","Dailekh","Jajarkot","Surkhet","Salyan","Rukum West"].includes(d.name)) },
  { id: "Sudurpashchim", npName: "सुदूरपश्चिम", districts: DISTRICTS.filter((d) =>
    ["Bajura","Bajhang","Darchula","Baitadi","Dadeldhura","Doti","Achham","Kailali","Kanchanpur"].includes(d.name)) },
];

/** Ecological-belt legend shown under the map. */
export const BELT_LEGEND = [
  { en: "Terai plains (60–800 m)", np: "तराई मैदान (६०–८०० मि.)", color: "#E3A72F" },
  { en: "Chure / Siwalik fringe", np: "चुरे / सिवालिक धार", color: "#C86B5A" },
  { en: "Mid-hills — Mahabharat (800–2,400 m)", np: "मध्यपहाड — महाभारत (८००–२,४०० मि.)", color: "#43A06B" },
  { en: "High hills / Himalaya (2,400 m+)", np: "उच्च पहाड / हिमाल (२,४०० मि.माथि)", color: "#4C7FB5" },
  { en: "Trans-Himalayan rain shadow", np: "हिमालपारि वर्षा-छायाँ", color: "#9A7B4F" },
];



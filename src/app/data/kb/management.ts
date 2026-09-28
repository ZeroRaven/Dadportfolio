import type { KBArticle } from "./types";

/** Farm management articles. */
export const managementArticles: KBArticle[] = [
  {
    id: "farm-records",
    categoryId: "farm-management",
    title: {
      en: "Farm records — the notebook that pays interest",
      np: "फार्म अभिलेख — ब्याज तिर्ने कापी",
    },
    summary: {
      en: "Five minutes a day with a pencil: what came in, what went out, who ate what — and every farm decision after that stops being a guess.",
      np: "दिनको पाँच मिनेट र पेन्सिल: के आयो, के गयो, कसले के खायो — त्यसपछिका सबै निर्णय अनुमान हुँदै हट्छन्।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "What to write, nothing more", np: "के लेख्ने, त्योभन्दा बढी केही होइन" },
        body: {
          en: "A usable farm register is deliberately boring: one page per animal or per batch (poultry), with columns for date, event, and numbers. Events worth a line: purchased/sold (with price), bred/served, calved/kidded/laid-out, vaccinated or treated (drug + dose), milk weight or egg count, feed bought and consumed, and any death with what you saw. The magic is not the book — it is that after six months you can answer which animal actually earns her feed, which vaccine dates are slipping, and what your real cost per litre or per dozen eggs is.",
          np: "उपयोगी फार्म अभिलेख जानाजान सुस्तै बोरिङ हुन्छ: प्रत्येक पशु वा लोट (कुखुरा) को एक पाना, मिति, घटना र अंकका लहरसँग। एक लाइन बासिना भन्दा घटना: किनेको/बेचेको (भाउसहित), मिलन गराइएको, पाठापारेको, खोप/उपचार (औषधि + खुराक), दुधको तौल वा अन्डा संख्या, किनेको र खाएको दाना, र कुनै मृत्यु त्यसमा के देखियो। जादू कापीमा होइन — छ महिनापछि तपाईंले यो भन्न सक्नुहुन्छ: कुन पशुले साँच्चै आफ्नो दाना कमाउँछ, कुन खोपका मिति हराउँदैछन्, र प्रति लिटर वा प्रति दर्जनको साँचो लागत कति हो।",
        },
      },
      {
        heading: { en: "From records to decisions", np: "अभिलेखबाट निर्णयसम्म" },
        body: {
          en: "Records earn their keep at three moments. Culling: the animal that is always in the sick pen or never covers her feed has a paper trail that makes the decision obvious. Pricing: knowing your cost per litre of milk or kg of goat tells you which middleman offer is profit and which is charity in reverse. Planning: last year's feed shortage in Falgun, written down, becomes this year's silage made in Bhadau. Cooperatives and banks also take a farmer with records far more seriously — a page of numbers is the cheapest credibility a small farm can buy.",
          np: "अभिलेखले तीन बखा लगानी उठाउँछ। निकाल्ने निर्णयमा: सधैं बिरामी कुथमा पर्ने वा दाना नक्काउने पशुको कागजको फाइलले निर्णय आफैँ स्पष्ट पार्छ। भाउ तयार गर्दा: प्रति लिटर दुध वा प्रति कि.ग्रा. बाख्राको लागत थाहा भएपछि कुन दलालको प्रस्ताव नाफा हो र कुन उल्टो दान हो छुट्छ। योजनामा: गएको वर्ष फागुनमा चारा नपुगेको लेखिएको कुरा यस वर्ष भदौमै बनाइने सिलेज बन्छ। सहकारी र बैंकले पनि अभिलेख बोकेको किसानलाई निकै गम्भीर लिन्छन् — अंक भरिएको एक पाना सानो फार्मले किन्न सक्ने सबैभन्दा सस्तो विश्वसनीयता हो।",
        },
      },
    ],
    tip: {
      en: "Keep the register where the work happens — hanging by the shed door with a pencil on string. A record book that lives in the house stays empty.",
      np: "अभिलेख काम हुने ठाउँमै राख्नुहोस् — गोठको ढोकामा डोरी झुण्डिएको पेन्सिलसँग। घरभित्र बस्ने अभिलेख कापी खाली नै रहन्छ।",
    },
    sources: "Farm-management practice; smallholder record-keeping extension guidance.",
    updated: "2026-09",
  },
  {
    id: "marketing-cooperatives",
    categoryId: "farm-management",
    title: {
      en: "Selling well: markets, cool chains & cooperatives",
      np: "राम्रो बिक्री: बजार, चिसो श्रृङ्खला र सहकारी",
    },
    summary: {
      en: "Milk spoils by afternoon, goats peak at Dashain, vegetables glut every Tuesday — selling is a skill you can learn like any other.",
      np: "दुध दिउँसोभरि बिग्रन्छ, बाख्रा दशैँमा चर्किन्छ, तरकारी हरेक मंगलबार थुप्रिन्छ — बेच्नु पनि अरूकै जस्तै सिक्न मिल्ने सीप हो।",
    },
readMinutes: 4,
    sections: [
      {
        heading: { en: "Milk: the clock is the market", np: "दुध: घडी नै बजार" },
        body: {
          en: "Raw milk is the most perishable product a farm sells, so its value is set by the cold chain more than the cow. Morning milk that reaches a chilling centre or dairy cooperative within a couple of hours keeps its price; milk that waits in the sun is discounted or rejected on the spot at the fat-test. Where no collection point is near, producer groups arranging shared chilling vats or a negotiated pick-up point is often the single most profitable step a cluster of dairy farmers takes.",
          np: "कच्चा दुध फार्मले बेच्ने सबैभन्दा चाँडै बिग्रिने उत्पादन हो, त्यसैले यसको मूल्य गाईभन्दा चिसो-श्रृङ्खलाले तोक्छ। बिहानको दुध दुई घण्टाभित्र चिलिङ सेन्टर वा डेयरी सहकारीमा पुगे भाउ रहन्छ; घाममा परेर बसेको दुध बोसो-परीक्षणमै छुट वा इन्कार खान्छ। सङ्कलन थाउँ टाढा भएको ठाउँमा उत्पादक समूहले साझा चिलिङ भट वा तयार पारेको उठाउने बिन्दु बनाउनु नै प्रायः डेयरी किसानको पुच्छरले लिने सबैभन्दा नाफाजनक कदम हुन्छ।",
        },
      },
      {
        heading: { en: "Livestock: ride the calendar", np: "पशु: पात्रो सवारी" },
        body: {
          en: "Goat and buffalo prices in Nepal are strongly seasonal — Dashain and the wedding season lift goat prices to their yearly peak, so breeding timed to finish kids into that window can add a serious margin per animal with zero extra input. Selling through a farmers' group or cooperative pooling weigh-scales and transport cuts the cost of each small farmer reaching the terminal market alone, and honest weights are what turn trust into repeat buyers. For vegetables, the classic glut-breaker is staggering plantings by two weeks so the harvest lands across several market days instead of one.",
          np: "नेपालमा बाख्रा र भैंसीको भाउ बलियो मौसुमी हुन्छन् — दशैँ र विवाहको मौसुमले बाख्राको भाउ वार्षिक चुच्चोमा पुर्‍याउँछ, त्यसैले बच्चा त्यही झ्यालमा तयार हुने गरी प्रजनन गर्दा थप कुनै औजार बिना प्रति पशु उल्लेखनीय मार्जिन थपिन्छ। किसान समूह वा सहकारीमार्फत — साझा तौल मेसिन र ढुवानी जोडेर — बेच्नुले सानो किसानले एक्लै अन्तिम बजार पुग्ने खर्च काट्छ, र इमानदार तौल नै विश्वासलाई फर्केर आउने क्रेतामा बदल्छ। तरकारीका लागि थुप्रो तोड्ने सास्तो पुरानै छ — रोपाइँ दुई हप्ताको फरकमा चक्रबद्ध गर्दा बाली एक होइन, कयौं बजार-दिनमा ओर्लन्छ।",
        },
      },
      {
        heading: { en: "Why cooperatives keep winning", np: "सहकारी किन लगातार जित्छ" },
        body: {
          en: "Nepal's dairy and livestock story is a cooperative story: collectively owned chilling, feed buying in bulk, shared vaccination days, and group loans at rates an individual smallholder never sees. A farmer who joins a functioning group sells at better prices, buys at better prices, and inherits a pool of technical know-how that no private agent has an incentive to share. If there is no group nearby, the knowledge base's record-keeping article is step one of starting one — five neighbours with notebooks are the seed of a cooperative.",
          np: "नेपालको डेयरी र पशुपालनको कथा सहकारीकै कथा हो: साझा स्वामित्वको चिलिङ, थोकमा दाना किन्ने, साझा खोप-दिन, र व्यक्तिगत सानो किसानले कहिल्यै नदेख्ने दरमा समूह-ऋण। चलिरहेको समूहमा जोडिएको किसान राम्रो भाउमा बेच्छ, राम्रो भाउमा किन्छ, र त्यस्तो प्राविधिक ज्ञानको पोखरी उत्तराधिकार पाउँछ जो कुनै निजी एजेन्टले बाँड्ने कारण नै देख्दैन। नजिकै समूह नभए, अभिलेख-लेख नै सुरुवात हो — कापी बोकेका पाँच छिमेकी सहकारीको बीउ हुन्।",
        },
      },
    ],
    sources: "Nepal dairy cooperative structure (chilling centres, DDC/cooperative collection); goat market seasonality (Dashain peak); cooperative finance practice.",
    updated: "2026-09",
  },
  {
    id: "manure-compost-biogas",
    categoryId: "farm-management",
    title: {
      en: "Manure, compost & biogas — turning the shed into an income",
      np: "गोबर, कम्पोस्ट र बायोग्यास — गोठलाई आम्दानीमा बदल्ने",
    },
    summary: {
      en: "Every buffalo walks around with a small fertiliser factory on board: about 15–20 kg of dung a day, worth real rupees as compost — and able to cook your meals if it passes through a biogas plant first.",
      np: "हरेक भैंसीसँग सानो मल-कारखाना जोडिएर हिँड्छ: दिनको करिब १५–२० कि.ग्रा. गोबर, कम्पोस्टमा साँचो रुपैयाँ बराबर — र बायोग्यास भएर निस्कियो भने भात पकाउनसम्म पुग्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Cattle dung nutrients", np: "गाईको गोबरमा पोषक" }, value: { en: "3.4-1.9-0.6 kg/t", np: "३.४-१.९-०.६ कि.ग्रा./टन" }, note: { en: "N-P₂O₅-K₂O per tonne, fresh", np: "प्रति टन ताजा गोबरमा N-P₂O₅-K₂O" } },
      { label: { en: "Buffalo dung", np: "भैंसीको गोबर" }, value: { en: "2.2-1.2-0.55 kg/t", np: "२.२-१.२-०.५५ कि.ग्रा./टन" }, note: { en: "poultry litter is ~5× richer in N", np: "कुखुराको थुकमा N ~५ गुणा बढी" } },
      { label: { en: "Compost yield", np: "कम्पोस्ट निकास" }, value: { en: "~60% of input mass", np: "राखेको तौलको ~६०%" }, note: { en: "mass lost as water & CO₂", np: "पानी र CO₂ भएर घट्छ" } },
      { label: { en: "Biogas from 1 kg dung", np: "१ कि.ग्रा. गोबरबाट ग्यास" }, value: { en: "≈ 0.036 m³", np: "≈ ०.०३६ घनमिटर" }, note: { en: "1 m³ gas ≈ 0.43 kg LPG", np: "१ घनमि. ग्यास ≈ ०.४३ कि.ग्रा. LPG" } },
      { label: { en: "Firewood a plant saves", np: "ग्यासले बचाउने दाउरा" }, value: { en: "~2 tonnes/year", np: "वर्षको ~२ टन" }, note: { en: "≈450,000 plants installed in Nepal (2023)", np: "नेपालमा ~४.५ लाख बिरुवा बसेका (2023)" } },
    ],
    chart: {
      title: { en: "Nitrogen per tonne of fresh manure", np: "प्रति टन ताजा गोबरमा नाइट्रोजन" },
      unit: { en: "kg N per tonne", np: "प्रति टन कि.ग्रा. N" },
      source: "FAO organic-manure nutrient tables; IUNG natural fertiliser guide (hen manure 1.6% N at 56% moisture); TNAU sheep/goat values.",
      data: [
        { label: { en: "Buffalo dung", np: "भैंसी गोबर" }, value: 2.2 },
        { label: { en: "Cattle dung", np: "गाई गोबर" }, value: 3.4 },
        { label: { en: "Goat manure", np: "बाख्रा गोबर" }, value: 6.5 },
        { label: { en: "Hen manure", np: "कुखुरा थुक" }, value: 16 },
      ],
    },
    sections: [
      {
        heading: { en: "The fertiliser factory in your shed", np: "गोठभित्रको मल-कारखाना" },
        body: {
          en: "A farm of five buffaloes puts out somewhere near 85 kg of dung every day — roughly 31 tonnes a year. Spread as raw dung that is worth around 69 kg of nitrogen, 38 kg of phosphate and 17 kg of potash: in bag terms, about 150 kg of urea plus 83 kg of DAP plus 28 kg of potash, before counting the organic matter that no bag sells you. Most farms in Nepal lose a large part of this value without noticing — dung dried in the open sun loses nitrogen to the air, dung washed by rain loses potash to the stream, and dung fed straight to the fire leaves nothing but ash. The first profit is not in making more manure; it is in keeping what the animals already make.",
          np: "पाँच भैंसीको फार्मले दिनको करिब ८५ कि.ग्रा. गोबर निकाल्छ — वर्षको करिब ३१ टन। कच्चा गोबर नै फिँजाए पनि त्यसमा करिब ६९ कि.ग्रा. नाइट्रोजन, ३८ कि.ग्रा. फस्फेट र १७ कि.ग्रा. पोटास हुन्छ: बोराको भाषामा करिब १५० कि.ग्रा. युरिया + ८३ कि.ग्रा. DAP + २८ कि.ग्रा. पोटास — त्यसमाथि जुन जैविक पदार्थ कुनै बोराले बेच्दैन, त्यो छुट्टै। नेपालका धेरै फार्मले यो मूल्यको ठूलो भाग नजानिँदै गुमाउँछन् — घाममा सुकाइएको गोबरको नाइट्रोजन हावामा उड्छ, वर्षाले धुएको गोबरको पोटास खोलामा, र आँठामा जलाइएको गोबरले खरानीबाहेक केही दिँदैन। पहिलो नाफा थप गोबर बनाउनमा होइन; पशुले पहिले नै बनाइरहेको जोगाउनुमा हो।",
        },
      },
      {
        heading: { en: "Compost — the upgrade every dung pile can take", np: "कम्पोस्ट — हरेक गोबर थुप्रोले लिन सक्ने उन्नति" },
        body: {
          en: "Composting is controlled rotting, and it fixes three problems of raw dung at once: it stabilises the nitrogen so it releases slowly to crops instead of vaporising, it kills most weed seeds, fly larvae and disease germs with the pile's own heat, and it turns a sloppy mess into something you can carry in a doko. The recipe is forgiving — layer dung with dry crop residue or litter at roughly three parts dung to one part dry matter, keep it moist as a wrung-out sponge, and turn the pile after two or three weeks to feed the microbes air. Eight to twelve weeks later you have dark, crumbly, earthy-smelling compost weighing about sixty percent of what went in; the missing forty percent left as water and carbon dioxide, not as lost fertility.",
          np: "कम्पोस्ट भनेको नियन्त्रित कुहिने प्रक्रिया हो, र यसले कच्चा गोबरका तीन समस्या एकैपटक सुधार्छ: नाइट्रोजन स्थिर हुन्छ र उड्नुको साटो बिस्तारै बालीलाई पुग्छ, थुप्रोको आफ्नै तापले झारको बीउ, झ्याइँको लार्भा र रोगका जीवाणुको ठूलो भाग मर्छन्, र लेदो डाँडो डोकोमा बोक्न मिल्ने कुरामा बदलिन्छ। विधि सरल छ — गोबर र सुक्खा बाली-अवशेष वा ओछ्यान करिब तीन भाग गोबर : एक भाग सुक्खाको दरमा तह थुप्रो बनाउनुहोस्, निचोरेको स्पञ्ज जत्रो चिसो राख्नुहोस्, र दुई-तीन हप्तापछि पल्टाएर हावा पसाउनुहोस्। आठ-बाह्र हप्तापछि कालो, खुस्रो, माटोजस्तो गन्धको कम्पोस्ट पाइन्छ — तौल राखिएको कुराको करिब साठी प्रतिशत; हरेको चालीस प्रतिशत पानी र कार्बन डाइअक्साइड भएर गएको हो, उर्वरता होइन।",
        },
      },
      {
        heading: { en: "Biogas — cook first, fertilise after", np: "बायोग्यास — पहिले पकाउनु, पछि मल बनाउनु" },
        body: {
          en: "A household biogas plant is a sealed underground stomach that feeds on dung and pays back gas: the standard fixed-dome designs that Nepal's Biogas Support Programme has installed over four hundred thousand times since the 1990s. The arithmetic is stable — one kilogram of fresh cattle or buffalo dung yields about 0.036 cubic metres of gas, so a family keeping dung-equivalent of about 50 kg a day runs a 6-cubic-metre plant that produces around 2 cubic metres of gas daily: enough for two cooked meals. Each working plant displaces roughly two tonnes of firewood a year, which is also about two tanker-loads of LPG-equivalent energy, and households report hours saved from wood gathering. The slurry that flows out the other end keeps nearly all the phosphorus and potash and about four-fifths of the nitrogen — as a fertiliser it beats raw dung.",
          np: "घरायसी बायोग्यास प्लान्ट भनेको जमिनमुनिको बन्द पेट हो जसले गोबर खाएर ग्यास फर्काउँछ: नेपालको बायोग्यास सहायता कार्यक्रमले १९९० का दशकदेखि चार लाखभन्दा बढीपटक बसालेको सोही मानक फिक्स्ड-डोम डिजाइन। हिसाब स्थिर छ — एक कि.ग्रा. ताजा गाई/भैंसीको गोबरबाट करिब ०.०३६ घनमिटर ग्यास निस्किन्छ; त्यसैले दिनको करिब ५० कि.ग्रा. गोबर जुटाउने परिवारले ६ घनमिटरको प्लान्ट चलाउँछ जसले दिनको करिब २ घनमिटर ग्यास दिन्छ: दुई पटकको भात पकाउन पुग्ने। हरेक चलिरहेको प्लान्टले वर्षको करिब दुई टन दाउरा बचाउँछ — LPG-बराबर ऊर्जामा पनि त्यत्तिकै — र घरहरूले दाउरा जुटाउने घण्टामा पनि छुट पाउँछन्। अर्को ढोकाबाट बग्ने स्लरीमा फस्फोरस र पोटासको झन्डै सबै र नाइट्रोजनको करिब चार-पाँच भाग रहन्छ — मलका रूपमा कच्चा गोबरभन्दा राम्रो।",
        },
      },
      {
        heading: { en: "What your heap replaces in bags", np: "तपाईंको थुप्रोले बोरामा के ठास्छ" },
        body: {
          en: "Farmers price compost best by translating it into the fertiliser bags it replaces. A tonne of cattle dung carries about 3.4 kg of nitrogen — roughly what 7.4 kg of urea supply — alongside phosphate and potash equal to about 4 kg of DAP and 1 kg of potash. Not all of it reaches the first crop: organic nitrogen mineralises slowly, so figure about half the N and most of the P and K being plant-available in year one, with the balance feeding the soil in following seasons. Even at that discount, five buffaloes' yearly output replaces a real stack of bags — and unlike bags, the organic matter rebuilds the water-holding capacity that climate-stressed fields need most. The Manure & Compost tool on this site runs this arithmetic for your exact herd and current bag prices.",
          np: "किसानले कम्पोस्टको भाउ त्यसले ठासिने मलका बोरामा अनुवाद गरेर राम्रोसँग थाहा पाउँछन्। एक टन गाईको गोबरमा करिब ३.४ कि.ग्रा. नाइट्रोजन हुन्छ — करिब ७.४ कि.ग्रा. युरियाले दिने भन्दा थोरै मात्रै कम — सँगै फस्फेट र पोटास पनि करिब ४ कि.ग्रा. DAP र १ कि.ग्रा. पोटासबराबर। सबै पहिलो बालीमा पुग्दैन: जैविक नाइट्रोजन बिस्तारै खुल्छ, त्यसैले पहिलो वर्ष N को करिब आधा र P, K को धेरैजसो बिरुवाले पाउँछ, बाँकी पछिल्ला मौसुममा माटोलाई पोषित गरिरहन्छ। त्यो छुट पाएर पनि पाँच भैंसीको वार्षिक उत्पादनले ठोक्कै बोरा बदल्छ — र बोराजस्तै होइन, जैविक पदार्थले जलवायु-दबाबमा परेका खेतलाई सबैभन्दा चाहिने पानी-समात्ने क्षमता पुनर्निर्माण गर्छ। यही साइटको Manure & Compost औजारले तपाईंकै बथान र आजका बोराभाउले यो हिसाब चलाइदिन्छ।",
        },
      },
      {
        heading: { en: "Handling, hygiene and hard rules", np: "चलाउने तरिका, सरसफाइ र कठोर नियम" },
        body: {
          en: "Fresh manure carries pathogens that composting heat defeats — which is exactly why raw dung should never touch vegetables eaten raw, and why home-made compost from a properly turned, properly hot pile is safer than anything scraped off the shed floor in March. Gloves and boots at the pile, hands washed after, slurry pits fenced so children and animals cannot fall in. For biogas, respect the gas itself: it burns clean but contains no warning smell before ignition, lines must be checked with soapy water never a flame, and nobody ever enters an empty digester for cleaning — the remaining gas displaces oxygen and kills silently. The animals' health loops back here too: dung from animals under treatment belongs on the compost heap with a longer wait, not on leafy beds that week.",
          np: "ताजा गोबरमा रोगाणु हुन्छन्, जसलाई कम्पोस्टको तापले जित्छ — यही कारणले कच्चा गोबर पाकै खाइने तरकारीमा कहिल्यै नछुनुपर्‍यो, र राम्ररी पल्टिएर तातो भएको घरको कम्पोस्ट, चैतमा गोठको फर्सीबाट बोकेको कुराभन्दा सुरक्षित हुन्छ। थुप्रोमा पन्जा र जुत्ता, पछि हात धुने, र स्लरीको खाल्डो घेरेर बालबालिका र पशु नपसुन्। बायोग्यासमा ग्यासैलाई सम्मान गर्नुहोस्: सफा बले पनि बाल्नुअघि गन्ध गर्दैन, लाइन साबुनपानीले जाँच्नुपर्छ — सल्काँचुक्कै होइन, र खाली डाइजेस्टर सफा गर्न कोही पनि भित्र पस्दैन — बाँकी ग्यासले अक्सिजन धकेलेर बिना आवाज मार्छ। पशुको स्वास्थ्य पनि यहीँ फर्किन्छ: उपचारमा रहेका पशुको गोबर लामो प्रतीक्षासहित कम्पोस्ट थुप्रोमा जानुपर्छ, त्यो हप्ता पातेको डाँडामा होइन।",
        },
      },
    ],
    tip: {
      en: "Roof your dung platform — a simple shed over the pile stops the monsoon from washing your potash downhill and the sun from baking your nitrogen into the air. It is the single cheapest fertility investment on a livestock farm.",
      np: "गोबरको डाँडोमाथि छानो हाल्नुहोस् — सातो छानोले मनसुनले तपाईंको पोटास खोला बगाउने र घामले नाइट्रोजन हावामा सेक्ने रोक्छ। पशुपालन फार्ममा यो सबैभन्दा सस्तो उर्वरता-लगानी हो।",
    },
    caution: {
      en: "Never enter an empty biogas digester — residual methane and hydrogen sulphide displace oxygen without any smell warning. Check gas lines with soapy water, never with a flame.",
      np: "खाली बायोग्यास डाइजेस्टर भित्र कहिल्यै नपस्नुहोस् — बाँकी मिथेन र हाइड्रोजन सल्फाइडले कुनै गन्ध नदिई अक्सिजन धकेल्छ। ग्यास-लाइन साबुनपानीले जाँच्नुहोस्, सल्काँचुक्कै होइन।",
    },
    sources: "FAO 'Type of fertilizers' organic-manure nutrient table (cattle 3.41-1.91-0.56, buffalo 2.24-1.23-0.55 kg/t); IUNG natural fertiliser guide (hen manure N 1.6%, P₂O₅ 1.5%, K₂O 0.8%); Lohani et al. 2025 (~450,000 plants, Nepal); Ashden/BSP & Bajracharya 2018 (~2 t firewood saved/plant/yr); standard biogas yield 0.036 m³/kg fresh cattle dung; Gautam et al. 2022 (Nepal fertiliser prices).",
    updated: "2026-09",
  },
];

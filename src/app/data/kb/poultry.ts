import type { KBArticle } from "./types";

/** Poultry articles. */
export const poultryArticles: KBArticle[] = [
  {
    id: "ranikhet-vaccination",
    categoryId: "poultry",
    title: {
      en: "Ranikhet (Newcastle) vaccination for village chickens",
      np: "गाउँका कुखुराको रानीखेता खोप",
    },
    summary: {
      en: "The disease that wipes village flocks overnight has a cheap vaccine — chick stage, booster, then a simple repeating rhythm that any household can keep.",
      np: "रातैमा गाउँको बथान मेटाउने रोगको सस्तो खोप छ — चल्ले अवस्था, बुस्टर, त्यसपछि कुनै पनि घरले पाल्न सक्ने साधारण चक्र।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "What Ranikhet does", np: "रानीखेताले के गर्छ" },
        body: {
          en: "Newcastle disease — Ranikhet in Nepali — is the classic village-flock killer: birds found dead in the morning, greenish diarrhoea, twisted necks in survivors that later die. There is no treatment; protection is entirely vaccination. Nepal vaccinates with lentogenic (mild-strain) vaccines such as the F1 strain used in village campaigns, and timing is everything because maternal immunity fades.",
          np: "न्यूक्यासल रोग — नेपालीमा रानीखेता — गाउँको बथान खाने पुरानो हत्यारा हो: बिहान झुण्डै चरा मरेको भेटिनु, हरियो गुँड, बाँचेकाको घाँटी बङ्गिएर पछि मर्नु। उपचार छैन; सुरक्षा पूर्णतः खोपमा निर्भर छ। नेपालमा गाउँ अभियानमा F1 जस्ता हल्का (लेन्टोजेनिक) खोप प्रयोग हुन्छ, र समय नै सबै कुरा हो किनकि आमाबाट पाएको प्रतिरोधात्मक क्षमता क्रमशः हराउँछ।",
        },
      },
      {
        heading: { en: "A rhythm any household can keep", np: "कुनै पनि घरले पाल्न सक्ने चक्र" },
        body: {
          en: "For village chicks, the practical pattern used in Nepali campaigns is a first dose in the first week (around days 5–7 via eye-drop or drinking water where trained), a booster around three to four weeks later, and thereafter repeat doses roughly every three months for scavenging flocks — the exact product and route should follow your local livestock office's schedule, because they run the free village rounds. At vaccination, skip water the evening before if using the drinking-water route so every bird drinks, and never vaccinate a visibly sick flock.",
          np: "गाउँका चल्लेका लागि नेपाली अभियानको व्यावहारिक ढाँचा: पहिलो हप्तै (करिब ५–७ दिन) पहिलो खुराक — आँखाको थोपा वा तालिम भएको ठाउँमा पानीमा — तीन/चार हप्तापछि बुस्टर, त्यसपछि घुम्ती बथानमा करिब ३ महिनामा दोहोर्‍याउने — निश्चित खोप र तरिका भने स्थानीय पशु कार्यालयको तालिकाले चलोस्, उनीहरूले निःशुल्क गाउँ चक्रै चलाउँछन्। पानीमा हाल्ने तरिका प्रयोग गर्दा बेलुका पानी छाडेर सबै चराले पिउन् बनाउनुहोस्, र स्पष्टै बिरामी बथानमा कहिल्यै खोप नलगाउनुहोस्।",
        },
        bullets: [
          { en: "Day 5–7: first Ranikhet dose (F1 / lentogenic strain).", np: "५–७ दिन: पहिलो रानीखेता खुराक (F1 / हल्का स्ट्रेन)।" },
          { en: "Weeks 3–4: booster dose.", np: "३–४ हप्ता: बुस्टर खुराक।" },
          { en: "Every ~3 months: repeat for scavenging flocks.", np: "करिब ३ महिनामा: घुम्ती बथानमा दोहोर्‍याउने।" },
          { en: "Ask the local livestock office when their free village round visits.", np: "स्थानीय पशु कार्यालयको निःशुल्क गाउँ चक्र कहाँबेला आउँछ सोध्नुहोस्।" },
        ],
      },
      {
        heading: { en: "Other routine protections", np: "अन्य नियमित सुरक्षा" },
        body: {
          en: "While you vaccinate, cover the other two village killers: fowl pox (the wing-web vaccine given in the chick stage) and coccidiosis (wet litter management and, where needed, approved medication). Night housing that keeps wild birds and rodents out is itself vaccination's partner — Newcastle survives in droppings and spread happens fastest at shared water points.",
          np: "खोपसँगै अर्का दुई हत्यारालाई पनि ढाक्नुहोस्: फाउल पक्स (चल्ले अवस्थामा पखेटामा दिइने खोप) र कोक्सिडियोसिस (भिजेको ओछ्यान व्यवस्थापन, जरुरी परे स्वीकृत औषधि)। जङ्गली चरा र मुसा नपस्ने रातको बस्ने थाउँ खोपकै साथी हो — रानीखेता गुँडमा बाँच्छ र साझा पानीको मुहानमा सबैभन्दा छिटो सर्छ।",
        },
      },
    ],
    tip: {
      en: "Tie vaccination dates to festival or salary days so the rhythm survives busy seasons — and keep the corner of a notebook as a flock register: date, birds, dose. The Tools page can put these straight into your phone calendar too.",
      np: "खोपको मिति चाडपर्व वा तलबको दिनसँग जोड्नुहोस् जसले व्यस्त मौसुममा पनि चक्र चलिरहोस् — र कापीको कुनोलाई बथान अभिलेख बनाउनुहोस्: मिति, चरा संख्या, खुराक। औजार पानाले यसलाई फोनको क्यालेन्डरमै थपिदिन्छ।",
    },
    sources: "DLS village poultry campaigns (F1 lentogenic vaccine, 3-monthly revaccination); Newcastle disease control literature.",
    updated: "2026-09",
  },
  {
    id: "poultry-basics",
    categoryId: "poultry",
    title: {
      en: "Broiler or layer — choosing your system",
      np: "ब्रोइलर कि लेयर — आफ्नो प्रणाली छनोट",
    },
    summary: {
      en: "Cash in six weeks with broilers at 1.5–1.8 feed per kg, or a daily egg cheque from layers at ~112 eggs a hen a year — two businesses, two tempers.",
      np: "ब्रोइलरमा छ हप्तामै नगद (प्रति कि.ग्रा. तौलमा १.५–१.८ दाना), वा लेयरमा वर्षको ११२ अन्डा प्रति कुखुराको दैनिक बिलो — दुई व्यवसाय, दुई स्वभाव।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "The economics in one paragraph", np: "एक अनुच्छेदमै अर्थतन्त्र" },
        body: {
          en: "Feed is 60–70% of poultry production cost, so the whole business is really about converting feed into saleable weight or eggs efficiently. Broilers convert at roughly 1.5–1.8 kg of feed per kg of live gain and reach market in about five to six weeks — fast money, but zero income if a disease day wipes the batch, so biosecurity and brooding temperature decide profit. Layers convert at about 2.0–2.3 kg feed per kg of egg mass, start laying around 18–20 weeks, and in Nepal's commercial flocks average on the order of 112 eggs per hen per year versus 60–70 in backyard systems; the payback is slower but comes every single day.",
          np: "दाना उत्पादन खर्चको ६०–७०% हुन्छ, त्यसैले पूरै व्यवसाय वास्तवमा दानालाई बिक्री हुने तौल वा अन्डामा कति कुशलताले बदलिन्छ भन्ने कुरा हो। ब्रोइलरले प्रति कि.ग्रा. तौल बढाउन करिब १.५–१.८ कि.ग्रा. दाना खान्छन् र पाँच–छ हप्तामै बजार पुग्छन् — छिटो पैसा, तर रोगको एक दिनले पूरै लोट मेटाउँछ, त्यसैले नाफा जैविक सुरक्षा र ब्रुडिङ तापले तय गर्छ। लेयरले प्रति कि.ग्रा. अन्डामा करिब २.०–२.३ कि.ग्रा. दाना खान्छन्, १८–२० हप्तामै अन्डा सुरु गर्छन्, र नेपालका व्यावसायिक बथानमा वर्षको औसत ११२ अन्डा प्रति कुखुरा दिन्छन् (गाउँघरमा ६०–७०); आम्दानी ढिलो तर दिनहरू नछुट्टै आउँछ।",
        },
      },
      {
        heading: { en: "Brooding: the first week decides the batch", np: "ब्रुडिङ: पहिलो हप्ताले लोट तय गर्छ" },
        body: {
          en: "Chicks cannot regulate their own temperature for the first weeks: keep about 32–35 °C at chick level in week one and reduce roughly 3 °C each week until feathered. Watch the chicks, not the thermometer: huddling under the lamp means cold, panting at the walls means hot, and even spread at feed and water means right. Litter must stay dry and loose — caked wet litter breeds coccidiosis and ammonia burns.",
          np: "पहिलो हप्ताहरूमा चल्लाले आफ्नै शरीरको ताप समात्न सक्दैनन्: पहिलो हप्ता चल्ला बस्ने तहमा करिब ३२–३५ डिग्री राख्नुहोस् र खौँसल फुलेपछि हप्ताकै करिब ३ डिग्री घटाउँदै जानुहोस्। थर्मोमिटर होइन, चल्लालाई हेर्नुहोस्: बत्तीमुनि थुप्रिए चिसो, भुइँमा हाप लागे गर्मी, र दाना-पानीमा बराबर फिँजिए ठीक। ओछ्यान सुक्खा र छर्लङ्गै राख्नुहोस् — चिस्याइएको ओछ्यानले कोक्सिडियोसिस र अमोनियाको जलन जन्माउँछ।",
        },
      },
      {
        heading: { en: "The Nepal market reality", np: "नेपाली बजारको वास्तविकता" },
        body: {
          en: "Nepal's poultry sector is self-built and large — commercial layers and broilers supply nearly all urban eggs and chicken meat, around 1.6 billion eggs a year nationally — so there is market, but also cyclical price crashes when too many farms restock together. New entrants should plan cash to survive a bad cycle, buy chicks and feed from established hatcheries/dealers on clean terms, and locate the farm away from dense poultry pockets to dodge neighbourhood disease pressure.",
          np: "नेपालको कुखुरा व्यवसाय आफैँ बनेको र ठूलो छ — व्यावसायिक लेयर र ब्रोइलरले शहरको लगभग सबै अन्डा-मासु धान्छन्, वर्षेनी करिब १ अर्ब ६० करोड अन्डा — त्यसैले बजार छ, तर धेरै फार्मले एकैपटक लोट थप्दा भाउ चक्रीय रूपमा खस्छ। नयाँ पसिनेले नराम्रो चक्र थाम्ने नगद योजना बनाउनुहोस्, चल्ले-दाना स्थापित ह्याचरी/डिलरबाट सफा सर्तमा किन्नुहोस्, र फार्म बस्ती-कुखुरा क्षेत्रभन्दा टाढा राखेर छिमेकीको रोग दबाब टार्नुहोस्।",
        },
      },
    ],
    tip: {
      en: "Use the Poultry tab on the Tools page before every restock — feed tonnes, sack count and cost for your exact bird number, priced at today's feed rate.",
      np: "हरेक लोट थप्नुअघि औजार पानाको कुखुरा ट्याब प्रयोग गर्नुहोस् — आजको दानाको भाउमा तपाईंकै चरा संख्याको दाना टन, झोला र खर्च।",
    },
    sources: "Industry FCR references (broiler 1.5–1.8, layer 2.0–2.3); Nepali poultry statistics (≈112 eggs/hen/yr commercial; ~1.6 billion eggs nationally); feed = 60–70% of cost.",
    updated: "2026-09",
  },
];

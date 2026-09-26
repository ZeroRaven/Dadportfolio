import type { KBArticle } from "./types";

/** Goat farming articles. */
export const goatArticles: KBArticle[] = [
  {
    id: "starting-goat-farm",
    categoryId: "goat-farming",
    title: {
      en: "Starting a goat farm in Nepal",
      np: "नेपालमा बाख्रा फार्म सुरु गर्नु",
    },
    summary: {
      en: "Pick the breed for your belt — Khari for the hills, Chyangra above, Boer and Jamunapari crosses for meat — then let housing and fencing do the veterinary work.",
      np: "आफ्नो भेगअनुसार जात छान्नुहोस् — पहाडमा खरी, माथि च्याङ्ग्रा, मासुका लागि बोअर र जामुनापारी क्रस — त्यसपछि गोठ र बारले नै पशु चिकित्साको काम गर्न दिनुहोस्।",
    },
    readMinutes: 6,
    sections: [
      {
        heading: { en: "Breeds: match goat to geography", np: "जात: भूगोलअनुसार बाख्रा" },
        body: {
          en: "Nepal has four indigenous breeds — Khari (the hardy hill goat, about half of national goat numbers), Sinhal, Chyangra and the Terai goat — and the established exotic blood for crossbreeding is Boer, Jamunapari, Barbari, Beetal, Sirohi and Saanen. Research on Nepali farms shows Boer × Khari and Jamunapari × Khari kids are born heavier and grow faster than pure Khari under good feeding, which is why the improved-monthly-market system spreads. But crossbred vigour only pays when feed and housing are also upgraded; under village conditions a hardy Khari often out-earns a high-maintenance cross.",
          np: "नेपालमा चार आदिवासी जात छन् — खरी (मजबुत पहाडी बाख्रा, राष्ट्रिय बाख्राको करिब आधा), सिन्हाल, च्याङ्ग्रा र तराई बाख्रा — र क्रसप्रजननका स्थापित विदेशी रगत बोअर, जामुनापारी, बार्बरी, बिटल, सिरोही र सानेन हुन्। नेपाली फार्ममा गरिएको अनुसन्धानले बोअर × खरी र जामुनापारी × खरी बच्चा शुद्ध खरीभन्दा ठूलो जन्मिन्छन् र राम्रो आहारमा छिटो हुर्कन्छन्, त्यसैले सुधारित प्रणाली फैलिरहेको छ। तर क्रसको फाइदा आहार र गोठ पनि सुधारँदा मात्र पुग्छ; गाउँकै अवस्थामा मजबुत खरीले प्रायः धेरै खर्चिलो क्रसलाई उछिन्छ।",
        },
        bullets: [
          { en: "Hills / mid-hills: Khari as base, Boer or Jamunapari cross where feed is reliable.", np: "पहाड/मध्यपहाड: आधार खरी, चारा पक्का भएको ठाउँमा बोअर वा जामुनापारी क्रस।" },
          { en: "High hills / trans-Himalaya: Chyangra — cashmere + pack value, hardy at altitude.", np: "उच्च पहाड/हिमालपारि: च्याङ्ग्रा — च्याङ्ग्राको रौँ र बोक्ने क्षमता, उचाइमा मजबुत।" },
          { en: "Terai: Terai goat and Jamunapari blood for larger frames.", np: "तराई: ठूलो शरीरका लागि तराई बाख्रा र जामुनापारी रगत।" },
          { en: "Dairy interest: Saanen or Beetal cross with reliable market for milk.", np: "दुधमा रुचि: दुधको बजार पक्का भएमा सानेन वा बिटल क्रस।" },
        ],
      },
      {
        heading: { en: "Housing that prevents disease", np: "रोग रोक्ने गोठ" },
        body: {
          en: "Nepal's successful goat sheds share a pattern: raised slatted bamboo or wooden floor so droppings fall through, about 1–1.5 m² of floor per adult goat, a deep overhang against monsoon rain, and good airflow without a draft at animal level. Separating a sick pen, a kidding pen and a dry storage corner for feed inside the same footprint costs almost nothing at planning time and prevents most of the problems beginners meet in year one.",
          np: "नेपालका सफल बाख्रा गोठको साझा ढाँचा: उठाइएको फट्याङ्सहितको बाँस/काठको फिलिङ जसमा गुँड तल झर्छ, वयस्क बाख्राका लागि करिब १–१.५ वर्ग मि. भुइँ, वर्षाधारबाट जोगाउने लामो छानो, र बाख्रा बस्ने तहमा हावा सट्टै स्वच्छ वायु प्रवाह। उही जग्गाभित्रै बिरामी कुथ, पाठापार्ने कुथ र चाराको सुक्खा कुनो छुट्याउनु योजनाकै बेला निःशुल्क नै हुन्छ र नयाँ किसानले पहिलो वर्ष भेट्ने धेरैजसो समस्या यसै रोकिन्छ।",
        },
      },
      {
        heading: { en: "Start small, market smart", np: "सानो सुरु, बुद्धि बजार" },
        body: {
          en: "Begin with 5 does + 1 buck or 10+2 rather than fifty animals — learn mortality, feed costs and kidding on a scale where mistakes are cheap. Time breedings so kids finish near Dashain–Tihar, when goat prices in Nepal hit their yearly peak. Keep a closed herd if you can: every purchased goat is a possible PPR or ectoparasite entry, and quarantine (see the biosecurity article) is the fence that protects your year of work.",
          np: "५ पाठी + १ बोका वा १०+२ बाट सुरु गर्नुहोस्, पचास पशुबाट होइन — घाटा, चाराको खर्च र पाठापार्ने अनुभव त्यस्तो स्केलमा सिक्नुहोस् जहाँ गल्ती सस्तो पर्छ। प्रजनन यसरी मिलाउनुहोस् कि बच्चा दशैँ–तिहार नजिकै बजारतयार हुन्, त्यतिबेला नेपालमा बाख्राको भाउ वार्षिक चरममा पुग्छ। सके बन्द बथान राख्नुहोस्: किनेर ल्याइएको हरेक बाख्रा पिपिआर वा बाह्य परजीवी भित्रिने ढोका हुन सक्छ, र क्वारेन्टिन (जैविक सुरक्षा लेख हेर्नुहोस्) नै तपाईंको वर्षदिनको मेहनत जोगाउने बार हो।",
        },
      },
    ],
    tip: {
      en: "Tape-measure monthly and write kid weights in the same notebook — growth rate is the number buyers quietly judge, and records prove your herd's story.",
      np: "महिनैपिच्हर्‍या नापेर बच्चाको तौल उही कापीमा लेख्नुहोस् — हुर्कने गति नै क्रेताले चुपचाप तौल्ने अंक हो, र अभिलेखले तपाईंको बथानको कथा प्रमाणित गर्छ।",
    },
    sources: "Nepal goat research (indigenous breeds Khari/Chyangra/Sinhal/Terai; Boer & Jamunapari cross performance — NARC/NLRS workshop proceedings); market seasonality.",
    updated: "2026-09",
  },
  {
    id: "goat-health-calendar",
    categoryId: "goat-farming",
    title: {
      en: "The goat health calendar",
      np: "बाख्रा स्वास्थ्य पात्रो",
    },
    summary: {
      en: "PPR before the rains, deworming timed to grass flushes, hooves trimmed each season — a year planned around the monsoon keeps kids alive.",
      np: "वर्षाअघि पिपिआर, घाँस बढ्ने समयमा कृमिनाशक, मौसमैपिच्छे खुट्टा काट्ने — वर्षायाम केन्द्रमा राखेर बनाइएको वर्षले बच्चा बचाउँछ।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "The year at a glance", np: "एक नजरमा वर्ष" },
        body: {
          en: "Goats in Nepal die mostly from PPR, gastrointestinal worms, pneumonia and FMD — all four are calendar problems, not fate. Deworm at the start and end of the monsoon when infective larvae peak on grass, and dose does in late pregnancy only with a vet-approved product. Vaccinate PPR once a year (its protection lasts years but annual revaccination is standard practice in outbreak areas) and include goats in FMD rounds with cattle. Trim hooves when they curl — wet monsoon floors soften hooves and foot-rot walks in behind them.",
          np: "नेपालमा बाख्रा मुख्यतः पिपिआर, पेटका कृमि, निमोनिया र एफएमडीले मर्छन् — चारै पात्रोका समस्या हुन्, भाग्यका होइनन्। घाँसमा कृमिको लाग्वा चरम हुने वर्षाको सुरु र अन्त्यमा कृमिनाशक दिनुहोस्, र ढिलो गर्भावस्थाकी पाठीलाई डाक्टरले स्वीकृत औषधिले मात्र दिनुहोस्। पिपिआर वर्षेनी लगाउनुहोस् (एक खुराकले वर्षौं सुरक्षा दिन्छ तर प्रकोप क्षेत्रमा वार्षिक दोहोर्‍याउने चलन छ) र एफएमडी अभियानमा गाईसँगै बाख्रा पनि समावेश गर्नुहोस्। खुट्टा बङ्गिँदा काट्नुहोस् — भिजेको वर्षाको फिलिङले खुट्टा नरम पार्छ र पछाडि फुटरट रोग पस्छ।",
        },
        bullets: [
          { en: "Pre-monsoon (May): PPR vaccination, full-herd deworming, shed repair.", np: "वर्षाअघि (जेठ): पिपिआर खोप, पूरा बथान कृमिनाशक, गोठ मर्मत।" },
          { en: "Monsoon (Jun–Aug): weekly hoof check, dry bedding, pneumonia watch.", np: "वर्षा (असार–भदौ): साप्ताहिक खुट्टा जाँच, सुक्खा ओछ्यान, निमोनिया सतर्कता।" },
          { en: "Post-monsoon (Sep–Oct): second deworming, FMD round, breeding prep.", np: "वर्षापछि (भदौ–असोज): दोस्रो कृमिनाशक, एफएमडी चरण, प्रजनन तयारी।" },
          { en: "Winter (Dec–Feb): feed gap plan, kids' warmth, lice treatment.", np: "जाडो (पुस–माघ): चाराको योजना, बच्चाको न्यानोपन, लीउ उपचार।" },
        ],
      },
      {
        heading: { en: "Kidding readiness", np: "पाठापार्ने तयारी" },
        body: {
          en: "Have a clean dry kidding pen, iodine for navels, colostrum plan and a torch with charged batteries ready a week before the first doe is due. After birth, make sure kids nurse within two hours, dip navels, and tag or mark them with the doe so records stay straight. Most kid losses happen in the first 48 hours from cold, starvation or unlicked mucus — a present herder is the best technology for all three.",
          np: "पहिलो पाठी पार्नु एक हप्ता अगाडिनै सफा सुक्खा पाठापार्ने कुथ, नाभीका लागि आयोडिन, खस्रो दुधको योजना र चार्ज भएको टर्च तयार राख्नुहोस्। जन्मेपछि बच्चाले २ घण्टाभित्र आमाको दुध पिउँछन् भन्नु पक्का गर्नुहोस्, नाभी डुबाउनुहोस्, र अभिलेख नमिसिन् बच्चालाई आमासँगै चिन्ह लगाइदिनुहोस्। बच्चाको धेरैजसो हानि पहिलो ४८ घण्टामै चिसो, भोक वा पोलिन नपाएको खैरबाट हुन्छ — तीनैको उपाय उपस्थित हुने पशुपालक नै हो।",
        },
      },
    ],
    sources: "DLS goat health programme practice; PPR vaccination guidance; monsoon parasite ecology.",
    updated: "2026-09",
  },
];

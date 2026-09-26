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
];

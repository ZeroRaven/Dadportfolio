import type { KBArticle } from "./types";

/** Cattle & buffalo dairy articles. */
export const cattleArticles: KBArticle[] = [
  {
    id: "dairy-buffalo-feeding",
    categoryId: "cattle-buffalo",
    title: {
      en: "Feeding dairy buffalo & cows in Nepal",
      np: "नेपालमा दुग्ध गाईभैंसीको आहार",
    },
    summary: {
      en: "Buffalo need 2.5–3% of body weight in dry matter, cows 2–2.5% — most Nepali herds are fed by habit, not by weight, and lose litres to it.",
      np: "भैंसीलाई शरीरको तौलको २.५–३%, गाईलाई २–२.५% सुख्खा पदार्थ चाहिन्छ — धेरै नेपाली बथान तौल होइन, बानीले खुवाइन्छ, र त्यसैले दुध गुम्छ।",
    },
    readMinutes: 6,
    sections: [
      {
        heading: { en: "Start from weight, not from habit", np: "बानी होइन, तौलबाट सुरु" },
        body: {
          en: "A 400 kg milking buffalo needs roughly 10–12 kg of dry matter a day — the FAO planning standard is 2.5 kg dry matter per 100 kg liveweight, and dairy feeding guidelines put cattle at 2.0–2.5% and buffalo at 2.5–3.0% of body weight. In practice that becomes about 35–45 kg of fresh green fodder plus 2–4 kg concentrate for a milking animal, because fresh fodder is only about 20–25% dry matter. When farmers feed the same bundle to every animal regardless of size and yield, big milkers are under-fed and dry animals waste feed — weighing or estimating weight with a heart-girth tape (Tools page) once a month turns feeding from guesswork into arithmetic.",
          np: "४०० कि.ग्रा.को दुध दुहुने भैंसीलाई दिनको करिब १०–१२ कि.ग्रा. सुख्खा पदार्थ चाहिन्छ — FAO को मापदण्ड १०० कि.ग्रा. तौलमा २.५ कि.ग्रा. सुख्खा पदार्थ हो, र दुग्ध आहार निर्देशिकाले गाई २.०–२.५% तथा भैंसी २.५–३.०% तौलको दर राख्छ। व्यवहारमा यो दुध दुहुने पशुका लागि करिब ३५–४५ कि.ग्रा. ताजा हरियो चारा र २–४ कि.ग्रा. दाना बन्छ, किनकि ताजा चारामा सुख्खा पदार्थ जम्मा २०–२५% हुन्छ। हरेक पशुलाई उसको आकार र उत्पादन नहेरी उस्तै गड्डी खुवाउँदा धेरै दुध दिने पशुभोकै रहन्छन् र सुकेका पशुले चारा खेर फाल्छन् — महिनामा एकपटक नापपट्टीले तौल अनुमान गर्दा (औजार पाना) आहार अनुमानको सट्टा गणित बन्छ।",
        },
      },
      {
        heading: { en: "Building the day's ration", np: "दिनको आहार बनाउने" },
        body: {
          en: "A sound Nepali dairy ration has three layers. The base is roughage: improved fodder (Napier, oats, maize fodder) or crop residues with legume fodder mixed in for protein. The second layer is concentrate — the classic extension rule of thumb is about one kg of concentrate for every 2.5 litres of milk above maintenance. The third layer is the one most often forgotten: a mineral block with salt and clean water available all day; a buffalo in milk drinks on the order of twice its dry-matter weight in water, and short water quietly cuts yield.",
          np: "राम्रो नेपाली दुग्ध आहार तीन तहको हुन्छ। आधार खस्रो चारा: सुधारित घाँस (नापियर, ओट, मकैको चारा) वा बालीको डाँठसँग प्रोटिनका लागि कोसेबाली घाँस मिसाइएको। दोस्रो तह दाना हो — विस्तार सेवाको सामान्य नियम: आवश्यकताभन्दा बढी हरेक २.५ लिटर दुधमा करिब १ कि.ग्रा. दाना। तेस्रो तह भने सबैभन्दा बेवास्ता हुन्छ: नुन मिसाइएको खनिज ब्लक र दिनभरि सफा पानी; दुध दुहुने भैंसीले आफ्नो सुख्खा पदार्थको लगभग दोब्बर पानी पिउँछ, र पानी कम भए दुध चुपचाप घट्छ।",
        },
        bullets: [
          { en: "Chop fodder to 2–3 cm pieces — chopping alone measurably improves intake.", np: "चारा २–३ से.मी.मा काट्नुहोस् — काट्नु मात्रले नै खाने मात्रा बढाउँछ।" },
          { en: "Feed green fodder first thing in the morning when appetite is strongest.", np: "बिहान भोक सबैभन्दा बलियो हुँदा पहिले हरियो चारा दिनुहोस्।" },
          { en: "Introduce any new feed gradually over a week — sudden ration changes cause acidosis.", np: "नयाँ आहार हप्ताभरि बिस्तारै थप्नुहोस् — अचानक फेर्दा अम्लता (एसिडोसिस) हुन्छ।" },
          { en: "Never feed mouldy or frosted fodder; spoiled feed is a false economy.", np: "फोहोर/चिसोले नराम्रो भएको चारा कहिल्यै नदिनुहोस्; बिग्रेको चारा सस्तो पर्दैन।" },
        ],
      },
      {
        heading: { en: "The winter gap", np: "जाडोको खाडल" },
        body: {
          en: "From December to February green fodder collapses and animals slide into negative energy balance, dropping both milk and body condition. Plan for it in the growing season: make silage from surplus monsoon maize or Napier in a pit or plastic bale, cure hay from the October flush, and plant winter fodder oats and berseem on irrigated land. Farms that fill the winter gap are the ones whose milk cheque does not dip every year.",
          np: "दिसेम्बरदेखि फेब्रुअरीसम्म हरियो चारा ठप्प हुन्छ र पशु ऊर्जाको घाटामा जान्छन् — दुध पनि, शरीरको अवस्था पनि झर्छ। यसको योजना उत्पादनकै मौसममा गर्नुहोस्: वर्षाको बढी मकै/नापियरबाट गड्डा वा प्लास्टिक बेलमा सिलेज बनाउनुहोस्, अक्टोबरको घाँसबाट हे तयार पार्नुहोस्, र सिँचित जग्गामा जाडो घाँस ओट्स/बरसिम लगाउनुहोस्। जाडोको खाडल भर्ने फार्महरूको दुधको बिलो वर्षेनी झर्दैन।",
        },
      },
    ],
    tip: {
      en: "Use the Feed calculator on the Tools page to turn body weight and milk yield into tomorrow's ration — it takes thirty seconds and pays every day.",
      np: "औजार पानाको चारा क्यालकुलेटरले तौल र दुधको आधारमा भोलिको आहार बनाइदिन्छ — ३० सेकेन्डको काम, दिनहरूको फाइदा।",
    },
    sources: "FAO, Estimation of feed requirements (2.5 kg DM/100 kg LW); dairy feeding guidelines (cattle 2.0–2.5%, buffalo 2.5–3.0% BW); Nepali dairy extension practice.",
    updated: "2026-09",
  },
  {
    id: "milking-hygiene-mastitis",
    categoryId: "cattle-buffalo",
    title: {
      en: "Milking hygiene & mastitis control",
      np: "दुध दुहुने सरसफाइ र थनैँड्रो नियन्त्रण",
    },
    summary: {
      en: "Clean, dry teats; a squirt from each quarter into a strip cup; dip after milking — three habits that keep antibiotic milk and vet bills off the calendar.",
      np: "सफा र सुक्खा थन; दुहुनुअघि हरेक भागबाट कपमा फिँक; दुहेरछिट्टो डिप — एन्टिबायोटिक दुध र डाक्टरको बिलो टार्ने तीन बानी।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "The routine that works", np: "काम गर्ने दिनचर्या" },
        body: {
          en: "Mastitis is almost always a hygiene disease: bacteria travel from dirty bedding, muddy tails and milker's hands into the teat canal. The fixed routine costs nothing. Before milking, brush or wash the udder and dry it with an individual clean cloth — a wet udder is worse than an unwashed one because water carries bacteria to the teat end. Milk the first two or three squirts from each quarter into a strip cup or dark plate: flakes, strings or watery milk flag an infected quarter early, when treatment is cheapest. After milking, dip each teat in antiseptic dip; the teat canal stays open for about half an hour after milking, and this is exactly when bacteria invade — the dip closes that window.",
          np: "थनैँड्रो लगभग सधैं सरसफाइकै रोग हो: जीवाणु फोहोर ओछ्यान, प्वालेको पुच्छर र दुहुनेको हातबाट थनको नालीमा पस्छन्। स्थिर दिनचर्याको कुनै खर्च छैन। दुहुनुअघि थन पखालेर वा पुछेर छुट्टै सफा कपडाले सुकाउनुहोस् — भिजेको थन नधुएकोभन्दा नराम्रो हुन्छ, पानीले जीवाणु थनको टुप्पासम्म पुर्‍याइदिन्छ। हरेक भागबाट पहिलो २–३ फिँक स्ट्रिप कप वा कालो प्लेटमा निकाल्नुहोस्: फिँक, धागो वा पातलो दुधले संक्रमण छिटो देखाइदिन्छ, उपचार सस्तो हुँदा नै। दुहेरछिट्टो हरेक थन औषधिले डिप गर्नुहोस्; दुहेको लगभग आधा घण्टासम्म थनको नाली खुला रहन्छ, र जीवाणु पस्ने यही समय हो — डिपले त्यो झ्याल बन्द गर्छ।",
        },
      },
      {
        heading: { en: "Dry-period treatment & culling decisions", np: "सुकाउने अवधिको उपचार र निकाल्ने निर्णय" },
        body: {
          en: "A large share of new infections enters in the first weeks of the dry period, which is why drying off abruptly (not gradually), keeping the udder clean, and asking your vet about dry-cow therapy matters. Animals with repeated flare-ups in the same quarter rarely recover fully; they reinfect herd-mates and their milk keeps failing residue tests. Keeping a written per-quarter history turns that culling decision from a feeling into a fact.",
          np: "नयाँ संक्रमणको ठूलो हिस्सा सुकाउने अवधिको पहिलो हप्तामा पस्छ, त्यसैले एक्कासि (बिस्तारै होइन) सुकाउनु, थन सफा राख्नु, र डाक्टरसँग ड्राई-काउ उपचारको बारेमा सोध्नु महत्त्वपूर्ण हुन्छ। एउटै भागमा बारम्बार रोग दोहोरिने पशु पूरै निको हुँदैनन्; उनीहरूले बथानका साथी पनि संक्रमित गर्छन् र दुध बारम्बार औषधि-अवशेष परीक्षणमा फँसाउँछ। भागअनुसारको लिखित इतिहासले निकाल्ने निर्णयलाई भावनाबाट तथ्यमा बदलिदिन्छ।",
        },
      },
    ],
    sources: "Standard mastitis control programme (post-milking teat dipping, dry-period management); DLS dairy extension.",
    updated: "2026-09",
  },
  {
    id: "calf-care",
    categoryId: "cattle-buffalo",
    title: {
      en: "Calf care — the first day decides the cow",
      np: "बच्छा हेरचाह — पहिलो दिनले गाई तयार गर्छ",
    },
    summary: {
      en: "Colostrum within hours, navel dipped, dry bedding and no cold floor — a heifer's whole milk career is programmed in her first week.",
      np: "घण्टैभित्र खस्रो दुध, नाभीमा औषधि, सुख्खा ओछ्यान र चिसो भुइँ छाडै — गाईबस्ताको सम्पूर्ण दुध जीवन पहिलो हप्तामै तयार हुन्छ।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "Colostrum is a one-time offer", np: "खस्रो दुध एकपटकको मौका" },
        body: {
          en: "The calf is born with an almost empty immune system: antibodies come only from the first milk (colostrum), and the gut can absorb them properly only in the first hours of life. Practical rule: feed good quality colostrum — thick and yellowish, from a non-mastitis quarter — within the first two to four hours, about 2–3 litres for a buffalo calf, and again at twelve hours. Colostrum given a day late is nearly worthless as immunity, however filling it is.",
          np: "बच्छा जन्मँदा रोग प्रतिरोधात्मक क्षमता लगभग खाली हुन्छ: प्रतिपिण्ड पहिलो दुध (खस्रो) बाट मात्र आउँछ, र पेटले त्यो पनि जीवनको पहिलो घण्टामा मात्र राम्ररी सोस्छ। व्यवहारिक नियम: राम्रो गुणस्तरको — बाक्लो र पहेँलो, थनैँड्रो नभएको भागको — खस्रो दुध पहिलो २–४ घण्टाभित्र दिनुहोस्, भैंसीको बच्छालाई करिब २–३ लिटर, र १२ घण्टामा फेरि। दिन ढिलो गरे खस्रो दुध पेट भर्न त पुग्छ, तर रोग-प्रतिरोधात्मक दृष्टिले लगभग व्यर्थ हुन्छ।",
        },
      },
      {
        heading: { en: "Navel, bedding and warmth", np: "नाभी, ओछ्यान र न्यानोपन" },
        body: {
          en: "Dip the navel cord in iodine tincture right after birth and repeat a day later — navel ill (joint infection) is one of the commonest losses of calves on damp floors. Deep dry bedding, a draft-free corner and, in the hills, a simple sack barrier against the wind do more for calf survival than any tonic on the market. Introduce starter feed and soft green fodder from the second week so the rumen develops on schedule; a calf that eats early is a heifer that milks early.",
          np: "जन्मेलै नाभीको डोरीमा टिन्चर आयोडिन डुबाउनुहोस् र भोलिपल्ट दोहोर्याउनुहोस् — भिजेको भुइँमा बच्छाहरूको सबैभन्दा सामान्य हानि नाभीबाट हुने जोर्नीको संक्रमण हो। गहिरो सुक्खा ओछ्यान, हावा नपस्ने कुनो र पहाडमा झोलाको साधारण बारले बच्छा बाँच्ने दर बढाउन बजारका कुनै पनि टोनिकभन्दा बढी काम गर्छ। दोस्रो हप्तादेखि स्टार्टर दाना र मुला हरियो चारा दिनुहोस् जसले र्‍यामन समयमै बढ्छ; चाँडै खाने बच्छा चाँडै दुध दिने गाईबस्ता बन्छ।",
        },
      },
    ],
    tip: {
      en: "Weigh or tape-measure calves monthly — growth is the cheapest report card of your calf programme. A well-grown buffalo heifer is ready to breed around half her mature body weight.",
      np: "बच्छालाई महिनैपिच्छे तौल्नुहोस् वा नाप्नुहोस् — बढ्ने गति नै बच्छा कार्यक्रमको सबैभन्दा सस्तो रिपोर्ट कार्ड हो। राम्ररी हुर्केकी भैंसीको बेटी पूर्ण तौलको करिब आधामा पुग्दा प्रजननका लागि तयार मानिन्छ।",
    },
    sources: "Standard calf-rearing practice (colostrum timing, navel hygiene); dairy extension guidance.",
    updated: "2026-09",
  },
];

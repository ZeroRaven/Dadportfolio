import type { KBArticle } from "./types";

/** Animal health articles — schedules and early-detection skills. */
export const animalHealthArticles: KBArticle[] = [
  {
    id: "vaccination-schedule",
    categoryId: "animal-health",
    title: {
      en: "Vaccination schedule for livestock in Nepal",
      np: "नेपालमा पशुपालनको खोप तालिका",
    },
    summary: {
      en: "FMD every six months, HS/BQ/Anthrax once a year, PPR for goats — the calendar that keeps a herd alive, timed before the monsoon disease season.",
      np: "एफएमडी छ महिनामा, एचएस/बीक्यू/एन्थ्राक्स वर्षको एक पटक, बाख्राको पिपिआर — वर्षायामअघि गरिने खोपले बथानलाई रोगबाट बचाउँछ।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "Why the calendar matters", np: "तालिका किन चाहिन्छ" },
        body: {
          en: "Most epidemic livestock diseases in Nepal — foot-and-mouth disease (FMD), haemorrhagic septicaemia (HS), black quarter (BQ), anthrax and PPR in goats — are preventable by vaccination, yet outbreaks still destroy household herds every year because doses are missed or given late. A written calendar, synced to the monsoon, is the cheapest insurance a farmer owns. Vaccines work best when the whole village vaccinates in the same window, because outbreaks stop finding unprotected animals to jump into.",
          np: "नेपालमा खुरा रोग (एफएमडी), घाँटे रोग (एचएस), कालो रोग (बीक्यू), एन्थ्राक्स र बाख्राको पिपिआर जस्ता महामारी रोगहरू खोपले रोक्न सकिन्छन् — तर खुराक छुट्यो वा ढिलो भयो भने हरेक वर्ष घरघरका बथान नष्ट हुन्छन्। वर्षायामसँग मिलाएर राखिएको लिखित तालिका किसानको सबैभन्दा सस्तो बीमा हो। एउटै समयझ्यालमा गाउँलेहरू सबैले खोप लगाउँदा रोगले असुरक्षित पशु भेट्दैन, र प्रकोप आफैँ रोकिन्छ।",
        },
      },
      {
        heading: { en: "The core schedule", np: "मुख्य तालिका" },
        body: {
          en: "The bands below reflect the Department of Livestock Services' field practice and published Nepali vaccine literature. Always confirm current products and timing with your local livestock service office — vaccine availability changes.",
          np: "तलको तालिका पशुपन्छी विकास महाशाखा (DLS) को फिल्ड अभ्यास र नेपालका प्रकाशित खोप साहित्यमा आधारित छ। सधैं स्थानीय पशु सेवा कार्यालयसँग हालको खोप र समय पक्का गर्नुहोस्।",
        },
        bullets: [
          { en: "FMD (foot & mouth) — cattle & buffalo: first dose from ~4 months of age, booster every 6 months (spring and autumn rounds).", np: "खुरा रोग (एफएमडी) — गाईभैंसी: करिब ४ महिनादेखि पहिलो खुराक, हरेक ६ महिनामा बुस्टर (वसन्त र शरद दुई चरण)।" },
          { en: "HS (haemorrhagic septicaemia) — cattle & buffalo: annual, best before the monsoon.", np: "घाँटे रोग (एचएस) — गाईभैंसी: वर्षको एक पटक, वर्षायामअघि नै उत्तम।" },
          { en: "BQ (black quarter) — cattle: annual, before monsoon.", np: "कालो रोग (बीक्यू) — गाई: वर्षेनी, वर्षाअघि।" },
          { en: "Anthrax — cattle/buffalo/goat in endemic areas: annual.", np: "एन्थ्राक्स — रोग देखिने क्षेत्रका गाईभैंसी/बाख्रा: वर्षेनी।" },
          { en: "PPR — goats & sheep: annual (a single dose gives long protection; revaccinate yearly in outbreak zones).", np: "पिपिआर — बाख्रा/भेडा: वर्षेनी (एक खुराकले लामो सुरक्षा दिन्छ; प्रकोप क्षेत्रमा वर्षेनी दोहोर्याउनुहोस्)।" },
          { en: "Deworming — all species: typically every 3–4 months; rotate drug families yearly.", np: "कृमिनाशक — सबै पशु: सामान्यतः ३–४ महिनामा; हरेक वर्ष औषधिको समूह फेर्नुहोस्।" },
          { en: "Ranikhet (Newcastle) — village chickens: chick stage + boosters through life (see the poultry article).", np: "रानीखेता — गाउँका कुखुरा: चल्ले अवस्थादेखि नै + नियमित बुस्टर (कुखुरा लेख हेर्नुहोस्)।" },
        ],
      },
      {
        heading: { en: "Practical rules that decide success", np: "सफलता निर्णय गर्ने व्यावहारिक नियम" },
        body: {
          en: "Vaccinate only healthy, well-fed animals — a vaccine is not a treatment. Give the dose through the correct route (mostly subcutaneous for HS/BQ/PPR) and never vaccinate during an active outbreak in the same pen without veterinary advice. Pregnant animals in their last month are usually deferred for live vaccines. Keep vials cool in a thermos with ice from the pharmacy to the barn — heat-killed vaccine gives no protection, and this single detail is the most common failure in village campaigns.",
          np: "खोप स्वस्थ र राम्ररी खुवाइएका पशुलाई मात्र लगाउनुहोस् — खोप उपचार होइन। सही मार्गबाट (एचएस/बीक्यू/पिपिआर प्रायः छालामुनि) दिनुहोस् र पशु चिकित्सकको सल्लाह बिना सक्रिय प्रकोप भएको बथानमा खोप नलगाउनुहोस्। जीवित खोपको हकमा गर्भावस्थाको अन्तिम महिनाका पशु सामान्यतः पछि राखिन्छ। औषधि पसलदेखि गोठसम्म टर्मसमा चिसो राखेर ल्याउनुहोस् — तापले मरेको खोपले कुनै सुरक्षा दिँदैन, र गाउँ अभियानको सबैभन्दा सामान्य असफलता यही नै हो।",
        },
      },
    ],
    tip: {
      en: "Write every dose into a simple notebook with the date — and add the next due date immediately, or generate reminders from the Tools page which downloads straight into your phone calendar.",
      np: "हरेक खुराक मितिसहित सजिलो कापीमा लेख्नुहोस् — र अर्को मिति तुरुन्तै थप्नुहोस्, वा औजार पानाको खोप सम्झना प्रयोग गर्नुहोस् जसले सिधै फोनको क्यालेन्डरमा फाइल थप्छ।",
    },
    sources: "Department of Livestock Services (dls.gov.np) field schedule; Poudel et al. 2020, Vaccines 8(2):322 — livestock vaccination in Nepal; extension schedules (Vikaspedia cattle/buffalo).",
    updated: "2026-09",
  },
  {
    id: "sick-animal-early-signs",
    categoryId: "animal-health",
    title: {
      en: "Spotting a sick animal early",
      np: "बिरामी पशु छिटो चिन्नु",
    },
    summary: {
      en: "Appetite, cud-chewing, ears and gait tell you a day before the thermometer does — the ten-minute daily check every herder should run.",
      np: "भोक, जुगारो चबाउने, कान र चालले थर्मोमिटरभन्दा एक दिनअघि बताइदिन्छ — हरेक पशुपालकले दैनिक गर्नुपर्ने १० मिनेटको जाँच।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "The daily ten-minute exam", np: "दैनिक १० मिनेटको जाँच" },
        body: {
          en: "Ruminants hide illness until it is advanced — by the time a buffalo looks obviously sick, treatment is often racing the clock. The daily walk through the shed is your best diagnostic tool. Watch each animal eat, then re-check who is lying down chewing the cud afterwards. A healthy adult ruminant at rest chews the cud steadily; a dropped cud is one of the earliest reliable signs of fever, pain or acidosis.",
          np: "जुगारो पशुले बिरामी ढाँटेर लुकाउँछन् — भैंसी स्पष्टै बिरामी देखिँदा उपचार ढिलो हुन्छ। गोठको दैनिक फेरी नै सबैभन्दा राम्रो निदान औजार हो। हरेक पशु खाँदै गर्दै हेर्नुहोस्, त्यसपछि को सुतेर जुगारो चबाइरहेको छ पुनः जाँच्नुहोस्। स्वस्थ वयस्क जुगारो आराममा बस्दा निरन्तर जुगारो चबाउँछ; जुगारो छाड्नु ज्वरो, दुखाइ वा अम्लताको सबैभन्दा पहिलो भरपर्दो संकेत हो।",
        },
        bullets: [
          { en: "Appetite & cud: leaves feed, or cud-chewing slow or stopped.", np: "भोक र जुगारो: दाना छाड्छ, वा जुगारो ढिलो/पूरै बन्द।" },
          { en: "Eyes & nose: dull eyes, discharge from nose or eyes.", np: "आँखा र नाक: निर्जीव आँखा, आँखा/नाकबाट डिस्चार्ज।" },
          { en: "Ears & coat: drooping ears, rough stand-up coat.", np: "कान र रौँ: झुकेका कान, उठेको खस्रो रौँ।" },
          { en: "Dung & urine: diarrhoea, blood, straining or marked colour change.", np: "गुँड र पिसाब: पातलो गुँड, रगत, दुखाइ वा रङ फेरिनु।" },
          { en: "Udder: hot, swollen, painful quarter or milk flakes/blood.", np: "थन: तातो, सुन्निएको, दुख्ने भाग वा दुधमा फिँक/रगत।" },
          { en: "Breathing: fast, noisy or open-mouth breathing at rest.", np: "सास: आराममै छिटो, सासको आवाज वा मुख खोलेर सास फेर्नु।" },
          { en: "Gait: limping, stiff rise, unwilling to stand.", np: "चाल: लङ्गडाउने, उठ्न गाह्रो, उठ्न नचाहने।" },
        ],
      },
      {
        heading: { en: "When to call the vet immediately", np: "डाक्टरलाई तुरुन्तै कहाँबेला बोलाउने" },
        body: {
          en: "Some signs are emergencies, not watch-and-wait problems: bloated left flank (bloat), struggling to calve for more than 30 minutes without progress, not drinking through a hot day, rapid breathing with blue gums, or down and unable to rise. For these, minutes change outcomes. Isolate the animal, keep it shaded and quiet with water nearby, and phone your vet with the species, age and what you see — never dose random medicines while waiting, it can mask the clues the vet needs.",
          np: "केही लक्षण हेरेर बस्ने कुरा होइनन्: बायाँ पखेटा फुल्नु (ब्लोट), ३० मिनेटभन्दा बढी प्रसूतिमा प्रगति नहुनु, गर्मी दिनभरि पानी नपिउनु, छिटो सास र हुँड नीलो देखिनु, वा उठ्नै नसक्नु। यस्ता अवस्थामा मिनेटले नतिजा बदलिन्छ। पशुलाई छुट्टै राख्नुहोस्, छहारी र शान्त ठाउँमा पानी नजिकै राख्नुहोस्, र पशुको जात, उमेर र देखिएका कुरा भनेर डाक्टरलाई फोन गर्नुहोस् — पर्खँदा जथाभावी औषधि नदिनुहोस्, त्यसले डाक्टरलाई चाहिने संकेत नै मेटाइदिन्छ।",
        },
      },
    ],
    tip: {
      en: "Typical resting rectal temperatures (Merck Veterinary Manual): cattle & buffalo about 38–39.5 °C, goats and sheep 38.5–40 °C. Learn your animal's normal when it is healthy — then a thermometer reading becomes meaningful.",
      np: "सामान्य शरीरको तापक्रम (Merck Veterinary Manual): गाईभैंसी करिब ३८–३९.५ डिग्री, बाख्रा/भेडा ३८.५–४० डिग्री। स्वस्थ बेलामै आफ्नो पशुको सामान्य ताप थाहा पाउनुहोस् — तब मात्र थर्मोमिटरको अंक अर्थ राख्छ।",
    },
    sources: "Merck Veterinary Manual (vital signs reference); field triage practice.",
    updated: "2026-09",
  },
  {
    id: "biosecurity-small-farm",
    categoryId: "animal-health",
    title: {
      en: "Biosecurity on a small farm",
      np: "सानो फार्ममा जैविक सुरक्षा",
    },
    summary: {
      en: "New animal in = two weeks apart; one pair of boots for the market, another for the shed; sick pen away from water. Simple fences against invisible diseases.",
      np: "नयाँ पशु = दुई हप्ता छुट्टै; बजारको जुत्ता र गोठको जुत्ता फरक; बिरामी बस्ने कुथ बाटी टाढा। नदेखिने रोगविरुद्धका सस्ता बारबन्द।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "Quarantine — the single highest-value habit", np: "क्वारेन्टिन — सबैभन्दा फाइदाजनक बानी" },
        body: {
          en: "Most new outbreaks walk onto a farm on the hoof. Any animal bought at market, borrowed for breeding or returned from another farm should spend two to three weeks in a separate pen, fed and cleaned after the main herd, watched for appetite, temperature and dung. The cost is a little labour; the benefit is protecting every animal you already own. The same rule applies to new birds — village flocks catch Ranikhet and fowl pox at markets and haat-bazaars.",
          np: "धेरैजसो नयाँ प्रकोप पशु चढेरै फार्ममा पस्छन्। बजार, प्रजनन वा अर्को फार्मबाट आएको हरेक पशु २–३ हप्ता छुट्टै कुथमा बसोस्, मुख्य बथानपछि खुवाइयोस्/सफा गरियोस्, र भोक, ताप र गुँड हेरियोस्। खर्च अलिकति मेहनत हो; फाइदा भने आफ्ना सबै पशुको सुरक्षा। नयाँ कुखुरामा पनि यही नियम — हाटबजारमा गाउँका कुखुराले रानीखेता र फाउल पक्स सर्छ।",
        },
      },
      {
        heading: { en: "Lines of separation", np: "विभाजन रेखा" },
        body: {
          en: "Draw one line between the clean zone (your animals) and the dirty zone (market, neighbours' sheds, sick animals). Boots, tools, buckets and hands that crossed the line must be washed before crossing back. Visitors enter the clean zone as little as possible; when they must, give them disinfected footwear or a plastic boot cover. Position the sick pen downwind and downhill from the shed, and never share water troughs between the two. These are the same principles that protect big commercial farms, scaled to a rope and a pair of slippers.",
          np: "सफा क्षेत्र (आफ्ना पशु) र असफा क्षेत्र (बजार, छिमेकीको गोठ, बिरामी पशु) बीच एउटा रेखा तान्नुहोस्। रेखा पार गरेका जुत्ता, औजार, बाल्टिन र हात फेरि भित्र पस्नअघि धुनैपर्छ। आगन्तुक सकेसम्म सफा क्षेत्रमा नपसुन्; पस्नैपर्दा कीटाणुनाशित जुत्ता वा प्लास्टिक कभर दिनुहोस्। बिरामी कुथ गोठको हावा र पानीको बहावबाट तल टाढा राख्नुहोस्, र दुवैबीच पानीको भाँडो कहिल्यै साझा नगर्नुहोस्। ठूला व्यावसायिक फार्म जोगाउने सिद्धान्त नै हो — डोरी र स्लिपरको पैमानामा।",
        },
      },
      {
        heading: { en: "Dead animals and waste", np: "मरेका पशु र फोहोर" },
        body: {
          en: "Never sell or open a sudden-death animal for meat — anthrax and other causes look like this, and opening the carcass spreads spores into soil for decades. Bury deep with lime away from water sources, or hand over to the local livestock office for safe disposal. Burn or bury contaminated bedding from the sick pen rather than adding it to the compost pile that feeds your fields the same season.",
          np: "अचानक मरेको पशु कहिल्यै बेच्नुहोस् वा मासुका लागि चीर्नुहोस् — एन्थ्राक्स लगायतका कारण यस्तै देखिन्छन्, र शव चीर्दा माटोमा दशकौंसम्म बच्ने रोगाणु फैलिन्छ। पानीको मुहानबाट टाढा चुन हालेर गहिरो गाड्नुहोस्, वा सुरक्षित नष्टका लागि स्थानीय पशु कार्यालयलाई बुझाउनुहोस्। बिरामी कुथको ओछ्यान त्यही मौसममा खेतमा हाल्ने कम्पोस्टमा नथप्नुहोस् — पोल्नुहोस् वा गाड्नुहोस्।",
        },
      },
    ],
    sources: "FAO biosecurity principles for smallholder systems; DLS outbreak guidance.",
    updated: "2026-09",
  },
  {
    id: "deworming-parasites",
    categoryId: "animal-health",
    title: {
      en: "Deworming & parasite control — the hidden tax on your herd",
      np: "कृमिनाशक तथा परजीवी नियन्त्रण — बथानमाथि लुकेको कर",
    },
    summary: {
      en: "Worms rarely kill outright — they steal growth, milk and blood a little every day. A 3–4 month dosing calendar timed around the monsoon, correct doses by body weight, and yearly drug-family rotation keep them beatable.",
      np: "कृमिले सिधै मार्दैनन् — दिनहरू दुध, बढ्ने गति र रगत अलिअलि चोर्छन्। मनसुनसँग मिलाइएको ३–४ महिनाको औषधि पात्रो, तौलअनुसारको सही खुराक र वर्षेनी औषधि-समूह फेरबदलले यिनलाई नियन्त्रणमा राख्छ।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Roundworm dosing", np: "गोलकृमि औषधि" }, value: { en: "every 3–4 months", np: "हरेक ३–४ महिना" }, note: { en: "young stock suffer most", np: "बच्चा पशुलाई सबैभन्दा बढी असर" } },
      { label: { en: "Liver fluke (wet areas)", np: "कलेजो फ्लुक (सिमसिमे ठाउँ)" }, value: { en: "2 doses a year", np: "वर्षको २ खुराक" }, note: { en: "~2 months after monsoon ends + spring", np: "मनसुन सकिएको ~२ महिनापछि + बसन्त" } },
      { label: { en: "Critical timing", np: "महत्त्वपूर्ण समय" }, value: { en: "Jesth & Kartik", np: "जेठ र कार्तिक" }, note: { en: "before & after the wet season", np: "वर्षायाम अघि-पछि" } },
      { label: { en: "New animal rule", np: "नयाँ पशु नियम" }, value: { en: "dose on arrival", np: "आउनासाथ खुराक" }, note: { en: "during the 21–30 day quarantine", np: "२१–३० दिने क्वारेन्टिनमै" } },
    ],
    sections: [
      {
        heading: { en: "Why deworming pays", np: "कृमिनाशकले किन फाइदा गर्छ" },
        body: {
          en: "Most worms in Nepal's sheds do their damage quietly: a heavy roundworm load in a calf can cut weight gain by a quarter and drag a milking cow's yield down around a tenth without a single obvious symptom — just a dull coat, a thin frame over the ribs, and an animal that eats but never quite fills. Young animals between weaning and a year old carry the heaviest burdens because they have no acquired immunity yet, and the wet warm months of monsoon let larvae survive on pasture for weeks. That is why the cheapest gains from deworming come from three places: calves and kids at weaning, milking animals before the flush, and every animal just before the stress season (monsoon or deep winter) hits.",
          np: "नेपालका गोठमा पाइने धेरैजसो कृमिले चुपचाप क्षति गर्छन्: बच्चामा बाक्लो गोलकृमिको भारले तौल बढ्ने गति चौथाइ घटाउन सक्छ र दुध दिने गाईको उत्पादन दसौं भागजति तान्छ — कुनै ठोस लक्षण नै नदेखिई, बस फिक्का रौँ, खुट्टीमा तन्केको पातलो छाला, र खाए पनि नभरिने शरीर। अझै रोग-प्रतिरोधात्मक क्षमता नबनेको हुनाले च्याप्ने बेलादेखि एक वर्षसम्मका बच्चामा कृमिको बोझ सबैभन्दा बढी हुन्छ, र मनसुनका ओसिला-तातो महिनामा घाँसबारीमा लार्भा हप्तौं बाँच्छन्। त्यसैले कृमिनाशकको सबैभन्दा सस्तो फाइदा तीन ठाउँबाट आउँछ: च्याप्तिहरू, दुध चढाउनअघिका आमा पशु, र तनावको मौसम (मनसुन वा हाडको जाडो) सुरु हुनअघिका सबै पशु।",
        },
      },
      {
        heading: { en: "The parasites that matter here", np: "यहाँ महत्त्वका परजीवी" },
        body: {
          en: "Four groups cover almost everything a Nepali smallholder meets. Roundworms (strongyles) live in the gut of all ruminants, sucked-blood and nutrient-thieves, worst in calves, kids and lambs. The liver fluke (Fasciola gigantica) needs water and the snail that lives in seepage lines, terrace edges and marshy khet — so it flares in wet districts after the monsoon, causing bottle-jaw swelling under the jaw, wasting and sometimes death in buffalo. Tapeworm segments in dung point to young animals grazing on contaminated ground. Outside, lice, mange mites and ticks do their own quiet damage — rubbing, hair loss, anaemia in heavy tick loads, and ticks also carry the blood parasites that cause fever diseases.",
          np: "नेपाली साना किसानले भेट्ने लगभग सबै परजीवी चार समूहमा पर्छन्। गोलकृमि (स्ट्रङ्गाइल) सबै रुमिनन्टको आँतमा बस्छन् — रगत र पोषक तत्त्व चोर्ने, गाईका बच्चा, खसी-बाख्रामा सबैभन्दा खतरनाक। कलेजो फ्लुक (फ्यासियोला गिगान्टिका) लाई पानी र सिमसिमे ठाउँ, गह्रा-किनार र दलदले खेतमा बस्ने गोलो चेपुवा चाहिन्छ — त्यसैले मनसुनपछि सिमसिमे जिल्लामा यो चर्किन्छ; बैंसीको तल बोतल-जस्तो सुन्निएको देखिने, शरीर सुक्दै जाने, कहिले मृत्युसम्म पुर्‍याउने। गोबरमा देखिने पाते-कृमिका टुक्राले सिमानित जमिनमा चरेका बच्चालाई संक्रमण देखाउँछ। बाहिरी पक्षमा उकुन, खुस्रो (मेल) र परेवा आफ्नै तरिकाले चुपचाप हानि गर्छन् — घस्ने, रौँ झर्ने, परेवा बाक्लो भएमा रगतको कमी, र परेवाले ज्वरो रोग गर्ने रक्त-परजीवी पनि बोक्छन्।",
        },
      },
      {
        heading: { en: "A calendar that follows the rain", np: "वर्षासँग हिँड्ने पात्रो" },
        body: {
          en: "Blanket monthly dosing is how farms burn money and breed resistance — the smarter pattern is strategic. Dose the whole herd around Jesth (pre-monsoon) so animals enter the wet season clean, and again around Kartik–Mangsir (post-monsoon) when pasture contamination peaks; between those, dose young stock every 3–4 months and any animal showing signs. For fluke, the killing dose matters most about two months after the monsoon ends, when ingested immature flukes settle in the bile ducts — a triclabendazole-type flukicide is the one that reaches immature stages. Every purchased animal gets one dose on arrival, inside its quarantine period, before it ever shares pasture with your herd.",
          np: "महिनौं लगातार सबै पशुलाई औषधि दिँदा पैसा र औषधिको कार्यक्षमता दुवै जल्छ — बुद्धिमानी चाहिन्छ रणनीतिक ढङ्गले। सम्पूर्ण बथान जेठतिर (मनसुनअघि) खुराक दिनुहोस् ताकि वर्षायाम सफा शरीरले प्रवेश गरोस्, र कार्तिक–मंसिरतिर (मनसुनपछि) फेरि — घाँसबारीको सङ्क्रमण त्यतिखेर चुँडिन्छ। बीचबीचमा बच्चा पशुलाई ३–४ महिनामा र लक्षण देखिने पशुलाई खुराक दिनुहोस्। फ्लुकका लागि मनसुन सकिएको करिब दुई महिनापछिको खुराक सबैभन्दा असरदार हुन्छ — त्यतिखेर निलिएका कलिला फ्लुक पित्तनलीमा बस्छन्; ट्राइक्लाबेन्डाजोल-वर्गको फ्लुकसाइडले कलिला अवस्थासम्म पुग्छ। किनेर ल्याइएको हरेक पशुलाई क्वारेन्टिन अवधिभित्रै पहिलो खुराक दिनुहोस् — तपाईंको बथानसँग घाँस बाँड्नुअघि नै।",
        },
      },
      {
        heading: { en: "Dosing right — by weight, not by eye", np: "सही खुराक — आँखाले होइन, तौलले" },
        body: {
          en: "Under-dosing is the single fastest way to create a resistant worm population: you kill the weak worms and leave the strong ones to breed. Weigh the animal, or use a heart-girth tape (the Weight tool turns the same tape reading into a live-weight estimate), and pour the drench over the tongue rather than squirting it into the cheek where it gets spat out. Check your drench gun calibration by squeezing five doses into a measuring bottle once a season. If you keep several species, remember goats metabolise many wormers faster than sheep and cattle and commonly need the cattle dose — confirm the product label or your vet for goat-specific dosing.",
          np: "कम खुराकले औषधि-प्रतिरोधी कृमिको जाति बनाउने सबैभन्दा छिटो बाटो हो: कम्जोर कृमि मर्छन्, बलियाहरू बाँचेर प्रजनन गर्छन्। पशुलाई तौल्नुहोस्, वा नापपट्टी प्रयोग गर्नुहोस् (Weight औजारले उही नापबाट जीवित तौल अनुमान निकाल्छ), र औषधि जिब्रोमाथि पस्केर दिनुहोस् — गालामा छर्किँदा थुतेर फालिन्छ। मौसममा एकपटक पिस्टनका पाँच खुराक नाप्ने बिनमा हालेर ड्रेन्च-गन सही छ कि छैन जाँच्नुहोस्। कयौं जात पालेको हो भने सम्झनुहोस्: बाख्राले धेरै कृमिनाशक भेडा-गाईभन्दा छिटो पचाउँछ, त्यसैले गाईकै खुराक चाहिने बेलो धेरै हुन्छ — उत्पादनको लेबल वा चिकित्सकसँग बाख्राका लागि खुराक पक्का गर्नुहोस्।",
        },
      },
      {
        heading: { en: "Rotation and the resistance trap", np: "फेरबदल र प्रतिरोधको जाल" },
        body: {
          en: "Wormers come in families — the white drenches (fenbendazole, albendazole), levamisole, and the clear ivermectin-type macrocyclic lactones — and each family kills by a different mechanism. Rotate the family once a year, not with every dose, so worms never face generations of pressure from one weapon. Never dose the entire herd on the same day unless there is an outbreak reason: leaving the cleanest 10–20 percent untreated keeps a population of unexposed worms ('refugia') diluting any resistant survivors. Watch for the warning sign of resistance — a dose that used to work now giving only temporary improvement — and ask your vet for a faecal egg count before and after dosing to check it is actually working.",
          np: "कृमिनाशक समूहमा आउँछन् — सेतो ड्रेन्च (फेनबेन्डाजोल, अल्बेन्डाजोल), लेभामिसोल, र पारदर्शी इभरमेक्टिन-वर्गका म्याक्रोसाइक्लिक ल्याक्टोन — हरेक समूहले फरक संयन्त्रबाट मार्छ। समूह वर्षको एकपटक फेर्नुहोस्, हरेक खुराकमा होइन, ताकि कृमिले एउटै हतियारका पुस्तौं दबाब नभोगून्। प्रकोपको कारण नभएसम्म पूरै बथान एउटै दिन खुराक नदिनुहोस्: सबैभन्दा सफा १०–२० प्रतिशत उपचार नगरी छोड्दा कहिल्यै औषधि नभेटेका कृमिको जमात ('रिफ्युजिया') प्रतिरोधी बाँचेकाहरूलाई फिँजाइरहन्छ। प्रतिरोधको चेतावनी सङ्केत हेर्नुहोस् — पहिले असर गर्ने खुराकले अब छोटो समय मात्र सुधार गर्नु — र खुराकअघि-पछि मल-परीक्षण (फिकल इग काउन्ट) गराउन चिकित्सकलाई सोध्नुहोस्, औषधि साँच्चै लागिरहेको छ कि छैन थाहा पाउन।",
        },
      },
      {
        heading: { en: "Beyond the bottle", np: "औषधिबाहेकका बाटो" },
        body: {
          en: "No dewormer out-performs dirty management for long. Graze young animals on the driest paddocks you have — snail country and marshy terrace edges belong to the adults with stronger immunity. Don't overstock: larvae build where grass is grazed to the dirt. Composting manure properly (the pile's heat kills larvae and weed seeds) before it returns to fields breaks the cycle at home. Clean drinking water, not from the same pond the animals wade through, removes the biggest fluke gateway. And a simple door rule — quarantine and dose every arrival — stops you buying someone else's resistant worms along with the animal.",
          np: "कुनै पनि कृमिनाशकले लामो समयसम्म फोहोर व्यवस्थापनलाई जित्दैन। बच्चा पशुलाई सबैभन्दा सुक्खा गह्रामा चराउनुहोस् — चेपुवा र सिमसिमे टारकिनार बलियो प्रतिरोधात्मक क्षमता भएका वयस्क पशुका लागि। घना नपाल्नुहोस्: घाँस जरै चरिएको ठाउँमा लार्भा थुप्रिन्छन्। गोबर राम्ररी कम्पोस्ट बनाएर (थुप्रोको तापले लार्भा र झारको बीउ मार्छ) खेतमा फर्काउँदा घरैभित्रै चक्र तोडिन्छ। सिँचो र चियाएको सफा पिउने पानी दिनुहोस् — त्यही पोखरीको पानी जहाँ पशु पसेर डुब्छन् त्यो फ्लुकको सबैभन्दा ठूलो ढोका हो। र सातोको ढोका-नियम — हरेक आउने पशु क्वारेन्टिन + खुराक — ले पशुसँगै अर्काका प्रतिरोधी कृमि किनेर ल्याउन रोक्छ।",
        },
      },
    ],
    tip: {
      en: "Write every dose in the farm register — drug name, animal, weight, date. After a year you can see which months the herd actually needed treating and which product truly worked on your farm.",
      np: "हरेक खुराक फार्म अभिलेखमा लेख्नुहोस् — औषधिको नाम, पशु, तौल, मिति। एक वर्षपछि कुन महिना बथानलाई साँच्चै उपचार चाहियो र कुन औषधि तपाईंको फार्ममा साँच्चै लाग्यो, देखिन्छ।",
    },
    caution: {
      en: "Observe milk and meat withholding periods on the label — they differ by product (commonly two days or more for milk after typical wormers). Never exceed the labelled dose chasing 'a stronger effect'; toxicity and residues both rise together.",
      np: "लेबलमा लेखिएको दुध र मासुको प्रतीक्षा अवधि पालना गर्नुहोस् — उत्पादनअनुसार फरक हुन्छ (सामान्य कृमिनाशकपछि दुधका लागि प्रायः दुई दिन वा बढी)। 'बलियो असर' खोजेर लेबलभन्दा बढी खुराक कहिल्यै नदिनुहोस्; विषाक्तता र औषधि-अवशेष दुवै सँगै बढ्छन्।",
    },
    sources: "Merck Veterinary Manual (anthelmintic classes, fasciolosis, parasite control programmes); DLS field deworming practice; South Asian extension schedules; Fasciola gigantica ecology in wet-season paddocks.",
    updated: "2026-09",
  },
];

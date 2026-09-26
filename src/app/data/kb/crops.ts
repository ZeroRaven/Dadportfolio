import type { KBArticle } from "./types";

/** Crop production articles. */
export const cropArticles: KBArticle[] = [
  {
    id: "paddy-nepal",
    categoryId: "crops",
    title: {
      en: "Rice (paddy) — Nepal's grain of identity",
      np: "धानचामल — नेपालको पहिचानको अन्न",
    },
    summary: {
      en: "5.6 million tonnes in a good year, Terai-led — the Asar planting window, SRI's wider promise, and why hill rice sells at a premium it deserves.",
      np: "राम्रो वर्षमा ५६ लाख टन, तराईकै नेतृत्वमा — असारको रोपाइँ झ्याल, SRI को ठूलो आशा, र पहाडी चामलले पाउनैपर्ने राम्रो भाउ।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "Where Nepal's rice grows", np: "नेपालको धान कहाँ फल्छ" },
        body: {
          en: "Rice is Nepal's staple cereal and its single most planted crop — in the record year 2019/20 paddy covered about 1.47 million hectares and produced about 5.6 million tonnes, before weather dips brought recent years lower. The Terai plains grow the bulk of the grain: Madhesh and Lumbini provinces alone account for well over half of national output, with Koshi's eastern plains close behind. In the hills rice terraces climb to 2,000 m and beyond — lower yields, but varieties and taste that carry a market premium, from Jumla's altitude-tolerant fields to Pokhara's Marsyangdi valley.",
          np: "धान नेपालको मुख्य अन्न र सबैभन्दा धेरै लगाइने बाली हो — कीर्तिमान वर्ष २०७६/७७ (2019/20) मा धानले करिब १४.७ लाख हेक्टर ओगट्‍यो र करिब ५६ लाख टन उत्पादन भयो, त्यसपछि मौसमका उतारचढावले पछिल्ला वर्ष केही तल झरे। तराईका मैदानले अन्नको ठूलो हिस्सा फलाउँछन्: मधेश र लुम्बिनी प्रदेशले मात्रै राष्ट्रिय उत्पादनको आधाभन्दा बढी दिन्छन्, कोशीको पूर्वी मैदान नजिकै छ। पहाडमा धानका लेकाँदा २,००० मिटरसम्म चढ्छन् — उत्पादन कम, तर जात र स्वादले बजारमा राम्रो प्रिमियम बोक्छन्, जुम्लाको उचाइ-सह्य खेतदेखि पोखराको मर्स्याङ्दी उपत्यकासम्म।",
        },
      },
      {
        heading: { en: "The Asar window", np: "असारको झ्याल" },
        body: {
          en: "Main-season rice is planted with the monsoon's arrival in Asar (June–July) and harvested around Kartik–Mangsir (October–November). Late transplanting costs yield almost every day it slips — nurseries raised on time, even on a small plastic-covered corner, buy the season back. Spring rice (Chaite dhan) in the Terai and irrigated pockets, transplanted around February–March, gives farmers with reliable water a second rice cheque and spreads labour away from the monsoon peak.",
          np: "मुख्य मौसमको धान वर्षा सँगसँगै असारमा रोपिन्छ र कात्तिक–मंसिरमा काटिन्छ। ढिलो रोपाइँले लगभग हरेक दिन उत्पादन गुमाउँछ — समयमै उठाइएको बियुँ, सानो प्लास्टिक-छाइएको कुनामा भए पनि, मौसम फिर्ता किनिदिन्छ। तराई र सिँचित ठाउँको चैते धान (फागुन–चैत रोपाइँ) पानी भरपर्दा भएका किसानलाई दोस्रो धानको बिलो दिन्छ र मेहनत वर्षाको चुच्चाबाट फिँजाइदिन्छ।",
        },
      },
      {
        heading: { en: "SRI and the yield ladder", np: "SRI र उत्पादनको भन्सिलो" },
        body: {
          en: "The System of Rice Intensification — younger seedlings, one per hill, wider spacing, moist rather than flooded fields, and a rotary weeder — has shown remarkable yield jumps in Nepali trials, often 20–50% above conventional practice without bought inputs beyond the weeder. It asks more management skill and more early weeding labour, which is exactly why results follow the farmers who master it rather than the fields it is dropped onto. Start with one field, keep a simple yield comparison with your old method, and expand what your own numbers confirm.",
          np: "धान उत्पादन वृद्धि प्रणाली (SRI) — काँचो बियुँ, एक बिरुवा, फराकिलो फाट, पानी डुबाउने होइन चिस्याउने, र रोटरी निँदो — नेपाली परीक्षणहरूमा उल्लेखनीय उत्पादन देखाइसकेको छ, प्रायः परम्परागत अभ्यासभन्दा २०–५०% माथि, निँदो बाहेक किन्नुपर्ने कुनै औजार बिना। यसले बढी सीप र सुरुमा बढी निको मेहनत माग्छ, त्यसैले नतिजा जहाँ फालियो त्यहीँ होइन, जसले मास्टर गर्‍यो त्यहीँसँग रहन्छ। एउटै खेतबाट सुरु गर्नुहोस्, पुरानो विधिसँग साधारण उत्पादन तुलना राख्नुहोस्, र आफ्नै अंकले पुष्टि गरेको विस्तार गर्नुहोस्।",
        },
      },
    ],
    sources: "MoALD, Statistical Information on Nepalese Agriculture (paddy ~1.47 M ha, ~5.6 M t in record 2019/20); province shares from SINA tables; SRI trial literature.",
    updated: "2026-09",
  },
  {
    id: "maize-nepal",
    categoryId: "crops",
    title: {
      en: "Maize — the hill staple with the biggest gap to close",
      np: "मकै — ठूलो अन्तर थुम्क्याउन बाँकी पहाडको मुख्य बाली",
    },
    summary: {
      en: "Nepal's second cereal, king of the hills and feed of the poultry boom — hybrid seed and plant population are the two levers most fields still haven't pulled.",
      np: "नेपालको दोस्रो अन्न, पहाडको राजा र कुखुरा व्यवसायको दाना — हाइब्रिड बीउ र बिरुवा संख्या नै धेरै खेतले अझै नतानेका दुई चुङ्गा।",
    },
    readMinutes: 5,
    sections: [
      {
        heading: { en: "Two seasons, two purposes", np: "दुई मौसम, दुई प्रयोजन" },
        body: {
          en: "Maize covers roughly 980,000 hectares and produces around 3 million tonnes nationally — second only to rice. The hill districts grow the main rain-fed crop planted with the pre-monsoon showers (Baisakh–Jestha) and harvested in Bhadau–Ashoj, while the Terai and river valleys add a winter/spring crop under irrigation. Roughly two-thirds of Nepal's maize ends as feed — the poultry industry's engine — and the rest splits between human food (roti, bhat, roasted and boiled cob culture) and seed.",
          np: "मकैले करिब ९.८ लाख हेक्टर ओगट्‍छ र राष्ट्रिय रूपमा करिब ३० लाख टन दिन्छ — धानपछिको दोस्रो स्थान। पहाडी जिल्लाहरूले वर्षाअघिको वर्षा (वैशाख–जेठ) सँगै लगाइने मुख्य खर्खरे बाली भदौ–असोजमा काट्छन्, तराई र खोँचले सिँचाइअन्तर्गत जाडो/बसन्तको बाली थप्छन्। नेपालको करिब दुई तिहाइ मकै दानाका रूपमा सकिन्छ — कुखुरा व्यवसायको इन्जिन — बाँकी खाना (रोटी, भात, भुटेको-उसिनेको मकैको संस्कृति) र बीउबीचनामा बाँडिन्छ।",
        },
      },
      {
        heading: { en: "The two levers", np: "दुई चुङ्गा" },
        body: {
          en: "First, seed: open-pollinated varieties saved from the harvest slide a little in vigour every year; certified improved and hybrid seed — refreshed each season from reliable dealers — is the cheapest yield jump available, especially in the Terai winter crop. Second, population: hill fields commonly plant far fewer plants per hectare than the variety wants; line sowing with even spacing and one plant per station lets each cob fill, and pairs perfectly with oneproper weeding in the first month. Add compost at planting and a small top-dress of nitrogen at knee height if the crop yellows, and the same field that grew two Manni now negotiates with four.",
          np: "पहिलो, बीउ: घरमै जोगाइएको खुला-परागी बीउ हरेक वर्ष केही क्षमता गुमाउँछ; प्रमाणित सुधारित र हाइब्रिड बीउ — हरेक मौसम भरपर्दा डिलरबाट नयाँ — उपलब्ध सबैभन्दा सस्तो उत्पादन उफ्राइ हो, विशेषतः तराईको जाडो बालीमा। दोस्रो, संख्या: पहाडका खेतमा प्रायः जातले खोजेभन्दा धेरै नै कम बिरुवा रोपिन्छन्; रेखामा बराबर फाट र एक बिरुवा प्रति गेडाले हरेक मकै राम्ररी भर्न दिन्छ, र पहिलो महिनाको एक राम्रो निकोसँग जोडिन्छ। रोप्दा गुन्द्री र घुँडाको उचाइमा पहेँलो देखिए सानो माथि-मल हाल्नुहोस् — दुई मनी फलाउने खेत अब चार मनीको कुरा गर्न बस्छ।",
        },
      },
      {
        heading: { en: "The winter opportunity", np: "जाडोको अवसर" },
        body: {
          en: "Nepal imports maize to feed its poultry sector in hungry years, which makes the irrigated winter and spring crop the closest thing to a guaranteed buyer Nepali agriculture has. Farmers with winter water access can capture that demand: shorter-duration hybrids, planting as soon as the cold lifts, and a chaff-mulched seedbed to hold moisture.",
          np: "अन्न थुम्किएका वर्षहरूमा नेपालले कुखुरा व्यवसायलाई धान्न मकै आयात गर्छ, जसले सिँचित जाडो-बसन्तको बालीलाई नेपाली कृषिको भरपर्दो क्रेता भेटिएको अवसर बनाइदिन्छ। जाडोमा पानी भएका किसानले त्यो माग समात्न सक्छन्: छोटो अवधिका हाइब्रिड, चिसो उठेपट्कै रोपाइँ, र चिस्यान कायम राख्न पराल-मल्च गरिएको बीउ-माटो।",
        },
      },
    ],
    sources: "MoALD SINA (maize ~980k ha, ~3.0 M t); feed-share structure of Nepali maize use; poultry-feed demand context.",
    updated: "2026-09",
  },
  {
    id: "wheat-winter-crops",
    categoryId: "crops",
    title: {
      en: "Wheat & the winter crop window",
      np: "गहुँ र जाडो बालीको झ्याल",
    },
    summary: {
      en: "Sow in Kartik–Mangsir, harvest in Chaitra–Baisakh: 2.1 million tonnes riding on irrigation, seed choice and one well-timed watering.",
      np: "कात्तिक–मंसिरमा रोप्नुहोस्, चैत–वैशाखमा काट्नुहोस्: सिँचाइ, बीउ र समयमै एक पटकको पानीमा टेकेर २१ लाख टन।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "The Terai's quiet second crop", np: "तराईको शान्त दोस्रो बाली" },
        body: {
          en: "Wheat is the great user of land and labour free after paddy: about 700,000 hectares producing on the order of 2.1 million tonnes, with Madhesh Province alone growing over half a million tonnes from about 300,000 hectares in recent seasons. Sown into rice stubble from Kartik to early Mangsir and harvested before the spring crops need the field, it fits between the monsoons almost perfectly. Yield hinges on three things: sowing before the soil loses its residual moisture, irrigation at crown-root and flowering stages, and a rust-resistant modern variety.",
          np: "गहुँ धानपछि खाली जमिन र मेहनतको ठूलो उपभोक्ता हो: करिब ७ लाख हेक्टरबाट करिब २१ लाख टन, हालका मौसममा मधेश प्रदेशले एक्लै ३ लाख हेक्टरबाट ५ लाख टनभन्दा बढी फलाउँछ। धानको डाँठमा कात्तिकदेखि मंसिर सुरुमा रोपिन्छ र बसन्तका बालीलाई खेत चाहिनुअघि काटिन्छ — मनसुनबीचको समयमा लगभग निख्रेप ठासिन्छ। उत्पादन तीन कुरामा टिक्छ: माटोको बाँकी चिस्यान गुम्नुअघि नै रोपाइँ, तर्कु र फुल्ने अवस्थामा सिँचाइ, र रतुवा-प्रतिरोधी आधुनिक जात।",
        },
      },
      {
        heading: { en: "Mustard, lentil and the relay trick", np: "तोरी, मसुरो र रिले ट्रिक" },
        body: {
          en: "The same window grows the crops that make Nepali plates interesting: mustard for oil, black gram and lentil for dal, and potatoes in irrigated pockets. Relay seeding — broadcasting lentil or mustard into the standing paddy a couple of weeks before harvest — buys seven to ten days of establishment and often the difference between a full and a thin stand. Whatever the crop, the winter rule is identical: moisture at sowing decides more than any input bought afterwards.",
          np: "उही झ्यालमा नेपाली थालमा स्वाद थप्ने बाली फल्छन्: तोरी तेलका लागि, मास र मसुरो दालका लागि, र सिँचित खेतमा आलु। रिले बीउ — धान काट्न दुई हप्ता बाँकी छँदै उभिएको धानमा मसुरो/तोरी छर्नु — सातदेखि दस दिन जगाइको फाइदा दिन्छ र प्रायः पूरा बाली र पातलो बालीको फरक नै बनाइदिन्छ। जुनसुकै बाली भए पनि जाडोको नियम एउटै हो: रोप्ने बेलाको चिस्यानले पछि किनिने कुनै पनि औजारभन्दा बढी निर्णय गर्छ।",
        },
      },
    ],
    sources: "MoALD/SINA and province statistics (national ~2.1 M t; Madhesh ≈543k t from ≈300k ha); Kafle et al. 2024 (wheat 2,144,568 t, 2.99 t/ha); USDA FAS Nepal.",
    updated: "2026-09",
  },
  {
    id: "millet-buckwheat",
    categoryId: "crops",
    title: {
      en: "Millet & buckwheat — the highland's quiet insurance",
      np: "कोदो र फापर — उच्च भूमिको शान्त बीमा",
    },
    summary: {
      en: "Climate-proof, soil-kind, diabetic-friendly grains that fail politely when maize fails loudly — and a growing health market that hill farms own.",
      np: "हावापानी-सह्य, माटोमैत्री, मधुमेह-मैत्री अन्न — मकै चर्कै फुत्कँदा शान्तै ढल्छन्, र पहाडका खेतकै भएको बढ्दो स्वास्थ्य बजार।",
    },
    readMinutes: 4,
    sections: [
      {
        heading: { en: "Why they matter", np: "किन महत्त्वपूर्ण" },
        body: {
          en: "Finger millet (kodo) and buckwheat (fapar) are the crops the climate conversation keeps circling back to: rain-fed, frost-tolerant, growing on marginal soil where maize and rice give up, and nutritionally ahead of the big cereals — millet's calcium and iron profile and buckwheat's rutin-rich, gluten-free grain sit exactly where urban health demand is moving. In the high hills above 2,000 m — Karnali, the far-west districts, Solu — they are not alternatives but the backbone of food security, and the traditional fermentation skills around them (kodo ko jaand, buckwheat roti and dhido culture) are products in themselves.",
          np: "कोदो र फापर नै जलवायु छलफल बारम्बार फर्किने बाली हुन्: खर्खरे, पालो-सह्य, मकै-चामलले हार मान्ने कमजोर माटोमा फल्ने, र पोषणमा ठूला अन्नभन्दा अघि — कोदोको क्याल्सियम-फलाम र फापरको रुटिन-समृद्ध, ग्लुटेनरहित दाना ठीक त्यही ठाउँमा छ जता शहरको स्वास्थ्य-माग गइरहेको छ। २,००० मिटरमाथिको उच्च पहाडमा — कर्णाली, सुदूरपश्चिम, सोलु — यी विकल्प होइनन्, खाद्य सुरक्षाकै मेरुदण्ड हुन्, र यिनका परम्परागत किण्वन सीप (कोदोको जाँड, फापरको रोटी-ढिँडो संस्कृति) आफैँमा उत्पादन हुन्।",
        },
      },
      {
        heading: { en: "Practical notes", np: "व्यावहारिक कुरा" },
        body: {
          en: "Millet transplants with the monsoon or is broadcast into maize fields as a relay crop — its classic role is filling the hunger months between rice harvests. Buckwheat sows fast: two crops a year are possible below the frost line, and it flowers in weeks, feeding bees in the off-season (buckwheat honey is a serious niche product). Neither crop asks for fertiliser beyond compost and both resist storage pests far better than maize — the family grain jar that quietly outlasts the year.",
          np: "कोदो वर्षासँगै रोपिन्छ वा मकैको खेतमा रिले बालीझैँ छरिन्छ — यसको पुरानो भूमिका धानबीचको भोक महिना भर्नु नै हो। फापर छिटो रोपिन्छ: पालो-रेखामुनि वर्षकै दुई बाली सम्भव छ, र हप्तौँमै फुल्छ, मौसुन बिच्ताको मौरीलाई खुवाउँदै (फापरको मह गम्भीर निसा उत्पादन हो)। गुन्द्रीबाहेक कुनै मल नमाग्ने दुवै बाली मकैभन्दा धेरै राम्ररी भण्डार-कीरा थाम्छन् — परिवारको अन्न-भाँडो जुन शान्तै बर्ष नाघ्छ।",
        },
      },
    ],
    sources: "High-altitude cropping practice; nutritional literature on finger millet and buckwheat; NARC high-hill research context.",
    updated: "2026-09",
  },
];

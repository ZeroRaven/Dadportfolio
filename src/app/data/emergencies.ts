/**
 * EMERGENCY FIRST AID GUIDE — bilingual (EN/NP).
 *
 * Six farm emergencies livestock keepers most often face in the field.
 * Each entry: recognition signs + step-by-step first aid. Content follows
 * standard extension-service veterinary first-aid guidance (stabilize,
 * then call the veterinarian — first aid is never a substitute for
 * treatment). Sources: cattle/goat first-aid extension guides (Cornell
 * SWNY Dairy Livestock & Field Crops, CattleDaily, Goat India care
 * guides) adapted to Nepali smallholder conditions.
 *
 * ⚠️ Kept deliberately short and imperative — this is read under stress.
 */

export interface EmergencyEntry {
  id: string;
  icon: "wind" | "flask" | "baby" | "sun" | "drop" | "milk";
  title: { en: string; np: string };
  tagline: { en: string; np: string };
  signsLabel: { en: string; np: string };
  signs: { en: string[]; np: string[] };
  stepsLabel: { en: string; np: string };
  steps: { en: string[]; np: string[] };
}

export const EMERGENCIES: EmergencyEntry[] = [
  {
    id: "bloat",
    icon: "wind",
    title: { en: "Bloat (distended rumen)", np: "घुँडेरो (पेट फुल्ने)" },
    tagline: { en: "Left flank blows up like a drum — minutes matter", np: "बायाँ पखुरा ड्रमजस्तै फुल्छ — मिनेट नाघ्न दिनुहुँदैन" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Left flank severely swollen and drum-tight",
        "Restless — stamping, kicking at belly, frequent lying down and getting up",
        "Open-mouth breathing, tongue out, blue-ish gums",
      ],
      np: [
        "बायाँ पखुरा ठूलो भएर ढोकजस्तै कडा भएको",
        "अशान्त — खुट्टा पटार्ने, पेटमा प्रहार गर्ने, बस्ने–उठ्ने गर्ने",
        "मुख खोलेर सास फेर्ने, जिब्रो बाहिर, गिजाको रङ निलो हुँदै जाने",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Stop all feed immediately — offer nothing by mouth",
        "Keep the animal STANDING and walk it slowly; do not let it roll or lie flat",
        "Massage the left flank firmly in circles to help release gas",
        "If a stomach tube is available, pass it gently to release the gas",
        "Call the vet NOW — if breathing is failing and help is far away, only a trained person should puncture the highest point of the left flank",
      ],
      np: [
        "तुरुन्तै चारा रोक्नुहोस् — मुखबाट केही नदिनुहोस्",
        "पशुलाई उभिनै राख्नुहोस् र बिस्तारै हिँडाउनुहोस्; गड्गडाउन वा प्लट्ट बस्न नदिनुहोस्",
        "बायाँ पखुरालाई दबाव दिएर गोलो घुमाउँदै मालिस गर्नुहोस् — ग्यास निस्कन मद्दत पुग्छ",
        "पेटको ट्युब भए सावधानीपूर्वक हालेर ग्यास निकाल्नुहोस्",
        "अहिलै नै पशु चिकित्सकलाई बोलाउनुहोस् — सास फेर्न गाह्रो भइरहेको र सहयोग टाढा भएमा मात्र तालिम पाएको व्यक्तिले बायाँ पखुराको सबैभन्दा माथिल्लो बिन्दुमा प्वाल पार्नुहोस्",
      ],
    },
  },
  {
    id: "poisoning",
    icon: "flask",
    title: { en: "Poisoning", np: "विषाक्तता (विषालु खाएको)" },
    tagline: { en: "Something toxic was eaten, sprayed or licked", np: "विषालु पदार्थ खाएको, छर्किएको वा चाटेको" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Sudden drooling, vomiting or colic soon after grazing / spraying",
        "Staggering, trembling, muscle twitches, collapse",
        "Blistered mouth, black or bloody diarrhoea",
      ],
      np: [
        "चरन वा छर्कन कामपछि अचानक हाड् बग्ने, वाकवाकी वा पेट दुख्ने",
        "लडबलड, काँपोकाँप, मासु तानिने, ढल्किने",
        "मुखमा घाउ, कालो वा रगत मिसिएको झारा",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Move the animal away from the suspected source immediately",
        "Keep a sample / photo of the suspect plant, chemical or label — the vet needs it",
        "Do NOT force vomiting or give home remedies (milk, oil) unless the vet says so",
        "If the poison is on the skin, wash with plenty of plain water",
        "Call the vet with the sample information — speed decides the outcome",
      ],
      np: [
        "शंकित स्रोतबाट तुरुन्तै पशुलाई अलग गर्नुहोस्",
        "शंकित बिरुवा, रसायन वा लेबलको नमुना / फोटो राख्नुहोस् — चिकित्सकलाई चाहिन्छ",
        "चिकित्सकले नभनेसम्म वाकवाकी नगराउनुहोस्, घरेलु उपाय (दूध, तेल) नदिनुहोस्",
        "विष छालामा परेको भए सफा पानीले धेरै पटक धुनुहोस्",
        "नमुनाको जानकारीसहित चिकित्सकलाई बोलाउनुहोस् — छिटो भन्दा छिटो भन्दै परिणाम आउँछ",
      ],
    },
  },
  {
    id: "dystocia",
    icon: "baby",
    title: { en: "Difficult birth", np: "कठिन प्रसूति (ब्याउन गाह्रो)" },
    tagline: { en: "Straining with no progress", np: "प्रयास गर्दै गर्दा पनि बच्चा नआउने" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Strong straining for 30+ minutes with nothing showing",
        "Only one leg or head visible; limbs pointing up",
        "Mother exhausted, stops pushing, discharge turns dark",
      ],
      np: [
        "३० मिनेटदेखि बलियो थिचो गर्दागर्दै पनि केही नदेखिने",
        "एउटा खुट्टा वा टाउको मात्र देखिने; खुट्टाहरू माथि फर्केको",
        "आमा थाकेर थिच्न छोड्ने, स्राव कालो हुँदै जाने",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Wash hands and arms; use clean lubricant before ANY check",
        "Feel calmly: is the calf coming nose-and-two-front-feet first?",
        "Do NOT pull hard or tie limbs to ropes — limbs break and mothers tear",
        "If there is no progress after 30 minutes of straining, call the vet — do not wait for hours",
        "Keep the birth area dry, clean and warm for the newborn",
      ],
      np: [
        "जाँच गर्नुअघि हात धोएर सफा लुब्रिकेन्ट प्रयोग गर्नुहोस्",
        "शान्त भएर छाम्नुहोस्: बच्चा नाक र दुई अगाडिका खुट्टा भएर आइरहेको हो?",
        "बल गरेर तान्नुहुँदैन, खुट्टामा डोरी बाँध्नुहुँदैन — खुट्टा भाँचिन्छ, आमालाई चोट पुग्छ",
        "३० मिनेट थिचेर पनि प्रगति नभए चिकित्सकलाई बोलाउनुहोस् — घण्टौँ पर्खनुहुँदैन",
        "बच्चाका लागि पात्रो सुख्खा, सफा र न्यानो राख्नुहोस्",
      ],
    },
  },
  {
    id: "heat",
    icon: "sun",
    title: { en: "Heat stroke", np: "तापघात (घामले लागेको)" },
    tagline: { en: "Panting, collapse in hot weather", np: "गर्मीमा हाँसफाँस, ढल्किने" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Fast open-mouth panting, drooling, tongue bright red",
        "Staggering or collapse in the midday heat",
        "Rectal temperature above 40.5 °C (105 °F)",
      ],
      np: [
        "मुख खोलेर छिटो सास फेर्ने, हाड् बग्ने, जिब्रो रातो देखिने",
        "दिउँसोको गर्मीमा लडबलड हुने वा ढल्किने",
        "शरीरको तापक्रम ४०.५ °C (१०५ °F) भन्दा माथि",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Move the animal to shade IMMEDIATELY",
        "Pour cool (not ice) water over the body, legs, neck and belly; keep pouring",
        "Create airflow — fan, or drive air with a sack",
        "Offer small sips of water repeatedly, not a full bucket at once",
        "Transport during the cool hours; call the vet if the animal does not settle within an hour",
      ],
      np: [
        "तुरुन्तै छहारीमा सार्नुहोस्",
        "शीतल (चिसो तर हिउँ होइन) पानी शरीर, खुट्टा, घाँटी र पेटमा दोहोर्‍याउँदै खन्कनुहोस्",
        "हावा चलाउनुहोस् — पंखा वा झोलाले हल्लाउनुहोस्",
        "पटक–पटक थोरै थोरै पानी पिलाउनुहोस्, एकैपटक ढिकी दिनुहुँदैन",
        "चिसो समयमा मात्र ओसारपसार गर्नुहोस्; एक घण्टाभित्र सामान्य नभए चिकित्सकलाई बोलाउनुहोस्",
      ],
    },
  },
  {
    id: "bleeding",
    icon: "drop",
    title: { en: "Severe bleeding", np: "घाउबाट रगत बग्ने" },
    tagline: { en: "Blood spurting or pooling", np: "रगत उर्किने वा जम्मा हुने" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Blood pumping in spurts (artery) or flowing steadily (vein)",
        "Large pool forming under the animal",
        "Weak, pale, fast-breathing animal",
      ],
      np: [
        "रगत छटपट उर्किने (नसा) वा लगातार बग्ने (शिरा)",
        "पशुको तल ठूलो थुप्रो बन्ने",
        "कमजोर, फिका, छिटो सास फेर्ने पशु",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Press the wound FIRMLY with the cleanst cloth available — keep pressing",
        "Add layers on top; do not remove soaked cloths (they help clot)",
        "Raise the limb above heart level if possible",
        "Snug bandage over the pad; if blood soaks through, re-pad",
        "Get transport arranged while pressing — a tourniquet is a last resort only, with the time noted",
      ],
      np: [
        "उपलब्ध सबैभन्दा सफा कपडाले घाउमा बलियो दबाब दिनुहोस् — दबाब नछोड्नुहोस्",
        "माथि थप तहहरू राख्नुहोस्; भिजेका कपडा नफुकाउनुहोस् (रगत जम्न मद्दत गर्छ)",
        "सम्भव भए घाउ लागेको खुट्टा मुटुभन्दा माथि उठाउनुहोस्",
        "प्याडमाथि कसेर पट्टी बाँध्नुहोस्; रगत बाहिर सिमाए पुनः थप्नुहोस्",
        "दबाब दिँदै ओसारपसारको व्यवस्था मिलाउनुहोस् — टर्निक्वेट अन्तिम उपाय मात्र हो, समय टिपोट गर्नुहोस्",
      ],
    },
  },
  {
    id: "milkfever",
    icon: "milk",
    title: { en: "Milk fever", np: "थनेरो" },
    tagline: { en: "Recently calved, down and cold — an emergency", np: "भर्खरै ब्याएको, ढल्किएको र जाडो — आकस्मिक" },
    signsLabel: { en: "Recognize it", np: "चिन्नुहोस्" },
    signs: {
      en: [
        "Within days of calving, cow sits sternum-first and can't rise",
        "Cold ears and dry muzzle, S-bend in the neck",
        "Later: drowsy, then coma — this progresses fast",
      ],
      np: [
        "ब्याएको केही दिनभित्रै गाई छाती टेकेर बस्ने, उठ्न नसक्ने",
        "जाडो कान र सुक्खा नाक, घाँटीमा 'S' आकारको झुकाव",
        "पछि: आँखा लाग्ने, त्यसपछि बेहोश — यो छिटो बिग्रन्छ",
      ],
    },
    stepsLabel: { en: "First aid", np: "प्राथमिक उपचार" },
    steps: {
      en: [
        "Call the vet IMMEDIATELY — she needs intravenous calcium, and early treatment recovers her in minutes",
        "Do NOT pour anything by mouth — a down cow can choke into her lungs",
        "Prop her comfortably on her chest (not flat on her side) with bedding behind",
        "Stop milking completely until she is up",
        "Keep her warm and shaded; turn her every couple of hours if she stays down",
      ],
      np: [
        "अहिलै नै चिकित्सकलाई बोलाउनुहोस् — नसाबाट क्याल्सियम चाहिन्छ, छिटो उपचारले मिनेटैमा ठीक पार्छ",
        "मुखबाट केही पनि पिलाउनुहुँदैन — ढलेकी गाईको फोक्सोमा पसेर घात गर्छ",
        "ओछ्यान राखेर छातीमा टेकाएर आरामदायी बनाउनुहोस् (प्लट्ट पन्छाउनुहोस्)",
        "उठेसम्म पूरै दूध दुहुनु रोक्नुहोस्",
        "न्यानो र छहारीमा राख्नुहोस्; ढलेकै भए दुई–दुई घण्टामा पल्टाउँदै जानुहोस्",
      ],
    },
  },
];

export const SOS_DISCLAIMER = {
  en: "First aid stabilizes the animal — it is not treatment. Contact the veterinarian in every emergency.",
  np: "प्राथमिक उपचारले पशुलाई स्थिर राख्छ — यो उपचार होइन। हरेक आकस्मिक अवस्थामा पशु चिकित्सकलाई सम्पर्क गर्नुहोस्।",
};

export const SOS_WHATSAPP_MESSAGE = {
  en: "EMERGENCY — I need urgent veterinary help. My animal has an emergency and I have followed the first-aid steps on your website. Please reply as soon as possible.",
  np: "आकस्मिक — मलाई तत्काल पशु चिकित्सकको सहयोग चाहियो। मेरो पशुलाई आकस्मिक समस्या छ, तपाईंको वेबसाइटका प्राथमिक उपचार कदमहरू गरेको छु। कृपया चाँडै भन्दा चाँडै जवाफ दिनुहोस्।",
};

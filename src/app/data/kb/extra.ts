import type { KBArticle } from "./types";

/**
 * NEW ARTICLES — batch 6 (researched 2026-09, Release 12).
 *
 * Every figure re-verified during online research (research/r12/):
 *  · Mastitis/CMT — CMT scored 0–3, reaction visible ≈≥400,000 cells/mL
 *    (maaz.ihmc.us; Wikipedia CMT); Nepal SCM prevalence ≈30% (Dhakal,
 *    western Chitwan cattle) to 46.1% (Lamjung, animal basis); buffalo
 *    herd reports 30–78% (Chowdhury et al. 2026 review).
 *  · AMR — up to 23% of Kathmandu Valley raw-milk samples carried
 *    antibiotic residues (screening studies); WHO lists AMR as a top-10
 *    global health threat.
 *  · Colostrum — 10% of body weight in first 6–12 h; ≥4 L for a 45-kg
 *    calf within 12 h; quality ≥50 g IgG/L ≈ Brix ≥22% (Cornell/McGill/
 *    Penn State SOPs); gut closure ≈24 h.
 *  · Urea-treated straw — 4% urea, 40% moisture, ~21 days airtight;
 *    improves IVDMD/intake (Virginia Tech thesis; FAO straw-utilization
 *    literature; 2024 urea-molasses trials).
 *  · Azolla — 20–25% crude protein; supplement 2–2.5 kg/day; milk +10–15%
 *    (ICAR/Indian dairy studies); fixes up to 3–5 kg N/ha/day.
 *  · Goat pneumonia — Mannheimia haemolytica; fever 40–41 °C; reported
 *    morbidity up to ~57% (Abera et al. 2023 review); Nepal isolation
 *    study Rawat et al. 2019.
 *  · Coccidiosis — global losses >US$1.5–3 billion/yr (multiple reviews).
 *  · Aflatoxin — Nepal legal limit 20 ppb (Tufts/Nepal regulatory review);
 *    hermetic bags cut aflatoxin ~34% (Senegal RCT, Prieto et al. 2019);
 *    FAO mycotoxin survey found AFB1 up to 1100 ppb in contaminated
 *    Nepali poultry feed samples.
 *  · Pigs — population ~870,000 (MoLD 2017) growing ~43%/decade; pork
 *    ≈28,600 t (Kalanki, NepJAS).
 *  · Aquaculture — ≈58,433 t ≈80% of national fish output; mrigal the
 *    top single species at 29.2% (research review 2021); Chitwan species
 *    mix from Sharma 2018.
 *  · Minerals — common salt at 0.005–0.01% of body weight/day
 *    (~20–40 g for a 400-kg bovine); deficiency signs per Merck Vet Manual.
 */
export const extraArticles: KBArticle[] = [
  /* ═════════════════════ animal-health ═════════════════════ */
  {
    id: "subclinical-mastitis-cmt",
    categoryId: "animal-health",
    title: { en: "Hidden mastitis: the CMT test every dairy farmer can do", np: "लुकेको थनरोग: हरेक डेयरी किसानले गर्न सक्ने CMT परीक्षण" },
    summary: {
      en: "The udder can be infected and the milk still look normal — a two-minute cow-side test with a paddle and a reagent finds it before it costs you litres.",
      np: "थन संक्रमित भएर पनि दुध सामान्य देखिन सक्छ — प्याडल र रिएजेन्टले गरिने दुई मिनेटको परीक्षणले नाफा खानुअघि नै पत्ता लगाउँछ।",
    },
    readMinutes: 7,
    facts: [
      { label: { en: "Subclinical mastitis, Nepal", np: "अलक्षित थनरोग, नेपाल" }, value: { en: "≈30–46% of animals", np: "करिब ३०–४६% पशु" }, note: { en: "Chitwan cattle ~30%; Lamjung dairies 46.1%", np: "चितवनका गाईमा ~३०%; लमजुङ डेयरीमा ४६.१%" } },
      { label: { en: "CMT reaction threshold", np: "CMT प्रतिक्रिया सीमा" }, value: { en: "≈400,000 cells/mL", np: "करिब ४ लाख कोशिका/मि.लि." }, note: { en: "below that the gel may not form", np: "यसभन्दा कममा जेली बन्दैन" } },
      { label: { en: "Scores", np: "अङ्क" }, value: { en: "0 · T · 1 · 2 · 3", np: "० · T · १ · २ · ३" }, note: { en: "2 or 3 = clearly positive", np: "२ वा ३ = स्पष्ट सङ्क्रमण" } },
      { label: { en: "Test cost", np: "परीक्षण खर्च" }, value: { en: "a few rupees per cow", np: "प्रति गाई केही रुपैयाँ" }, note: { en: "paddle + reagent, done at the shed", np: "प्याडल + रिएजेन्ट, गोठैमा" } },
    ],
    sections: [
      {
        heading: { en: "Why the milk looks fine but the money is gone", np: "दुध किन सामान्य देखिन्छ, पैसा किन जान्छ" },
        body: {
          en: "Subclinical mastitis is an infection of the udder with no visible clots, no swelling and no fever — the cow eats, stands and lets down milk that looks perfectly normal in the pail. What changes is hidden: the gland sends white blood cells to fight the infection, and those cells plus the damaged milk-secreting tissue quietly lower yield day after day. Nepali studies that screened with the California Mastitis Test found roughly 30% of cattle and up to 46% of dairy animals positive, which makes it one of the most expensive invisible losses in smallholder dairying.",
          np: "अलक्षित थनरोग भनेको देखिने डाँडो, सुन्निने वा ज्वरो नभएको थनको सङ्क्रमण हो — गाईले खान्छ, उभिन्छ, बाल्टिनमा सामान्यै देखिने दुध दिन्छ। भित्रभित्रै फरक पर्छ: थनले सङ्क्रमणसँग लड्न श्वेत रक्तकोशिका पठाउँछ, ती कोशिका र बिग्रेको दुध बनाउने तन्तुले दिनहुँ चुपचाप उत्पादन घटाउँछन्। क्यालिफोर्निया मास्टाइटिस टेस्ट (CMT) ले जाँचेका नेपाली अध्ययनहरूले करिब ३०% गाई र ४६% सम्म डेयरी पशुमा सङ्क्रमण देखाए — साना किसानका लागि यो सबैभन्दा महँगो अदृश्य घाटा हो।",
        },
      },
      {
        heading: { en: "Doing the test at the shed", np: "गोठैमा परीक्षण गर्ने तरिका" },
        body: {
          en: "You need a four-cup plastic paddle and a small bottle of CMT reagent — both stocked by veterinary suppliers in most district towns. Strip the first two or three squirts from each quarter away, then milk a little from each quarter into its own cup. Tilt out excess so each cup holds about a teaspoon, add an equal amount of reagent, and swirl the paddle gently for ten seconds. Read it immediately against light: liquid that stays liquid is negative; a slight slimy slide is Trace; a distinct gel that sticks when tilted is 2 or 3.",
          np: "चार कोठा भएको प्लास्टिकको प्याडल र सानो बोतल CMT रिएजेन्ट चाहिन्छ — दुईटै धेरैजसो जिल्ला सदरमुकामका पशु औषधि पसलमा पाइन्छन्। हरेक थनबाट पहिलो दुई-तीन स्प्रिट फालिदिनुहोस्, अनि हरेक थनबाट आ-आफ्नै कपमा थोरै दुध दुहुनुहोस्। बढी दुध ढल्काएर हरेक कपमा लगभग एक चम्चा राख्नुहोस्, त्यति नै रिएजेन्ट हाल्नुहोस्, र प्याडललाई हल्का घुमाउँदै दस सेकेन्ड परीक्षण गर्नुहोस्। तुरुन्तै उज्यालोमा हेर्नुहोस्: तरल नै रहे नेगेटिभ; हल्का नलिनो भए Trace; ढल्काउँदा टाँसिने स्पष्ट जेली भए २ वा ३।",
        },
        bullets: [
          { en: "Test fresh cows a month after calving, then every month or two — infections caught early often clear with simple treatment.", np: "भैंसी ब्याएको एक महिनापछि, त्यसपछि हरेक एक-दुई महिना जाँच्नुहोस् — ढिलो नगरी थाहा पाएको सङ्क्रमण सामान्य उपचारले नै सफा हुन्छ।" },
          { en: "Test before treating: an antibiotic will not fix a lumpless quarter that scores Trace — hygiene and milking order will.", np: "उपचारअघि जाँच्नुहोस्: खाली Trace देखाउने थनमा एन्टिबायोटिकले केही फर्काउँदैन — सरसफाइ र दुहुने क्रमले फर्काउँछ।" },
          { en: "Milk CMT-positive quarters LAST, or with a separate pail, so the bacteria do not travel to clean cows.", np: "CMT पोजेटिभ थन अन्तिममा वा छुट्टै बाल्टिनमा दुहुनुहोस्, जति जीवाणु स्वस्थ गाईमा नजाउन्।" },
        ],
      },
      {
        heading: { en: "Reading the scores like a field vet", np: "अङ्कलाई पशु चिकित्सकझैँ पढ्ने" },
        body: {
          en: "The gel forms because the reagent bursts somatic cells and their DNA tangles — more cells, thicker gel. A score of 0 to Trace is what you want in every quarter of the herd. A 1 means inflammation worth watching and re-testing in two weeks. A 2 or 3 is a clearly positive quarter: separate the milk, mark the cow in your records, and have a serious talk with your vet about whether a course of treatment during lactation or at drying-off is the right call. The classic link between high cell counts and lost yield is why dairies in many countries pay for low-SCC milk — your dairy may start doing the same.",
          np: "रिएजेन्टले सोमाटिक कोशिका फुटाउँदा तिनको DNA जम्मै जेली बनाउँछ — कोशिका जति धेरै, जेली त्यति बाक्लो। ० देखि Trace भए बथानका हरेक थन ठीकै हुनुपर्ने हो। १ भए हेरिरहनु पर्ने र दुई हप्तामा फेरि जाँच्नुपर्ने सङ्केत हो। २ वा ३ भए स्पष्ट सङ्क्रमित थन: दुध छुट्टै राख्नुहोस्, गाईलाई अभिलेखमा चिनो लगाउनुहोस्, र दुध दिइरहँदा उपचार गर्ने कि सुकाउने बेला गर्ने भन्नेमा पशु चिकित्सकसँग राम्ररी कुरा गर्नुहोस्। कोशिका सङ्ख्या बढ्दा उत्पादन घट्ने सम्बन्ध पुरानै छ — धेरै देशका डेयरीले कम-SCC दुधलाई थप भाउ तिर्छन्; तपाईंको डेयरीले पनि सुरु गर्न सक्छ।",
        },
      },
      {
        heading: { en: "Prevention beats the best treatment", np: "राम्रो उपचारभन्दा रोकथाम" },
        body: {
          en: "The five-point mastitis control plan has forty years of evidence behind it: dip or spray every teat after milking, treat infected quarters at drying-off with a dry-cow preparation, cull cows that flare up again and again, keep bedding dry and clean, and service milking machines on schedule. Add two habits that matter in hand-milked Nepali herds: full-hand milking rather than pinching the teat, and washing the udder with a separate cloth per cow — one shared cloth is a free taxi service for bacteria between animals.",
          np: "थनरोग नियन्त्रणको पाँच-बुँदा योजनासँग चालिस वर्षको प्रमाण छ: दुहुने बित्तिकै हरेक थनमा डिप वा स्प्रे गर्नुहोस्, सुकाउँदा सङ्क्रमित थन ड्राई-काउ औषधिले उपचार गर्नुहोस्, बारम्बार बल्झिने गाई बेच्नुहोस्, ओछ्यान सुक्खा-सफा राख्नुहोस्, र मिल्किङ मेसिन समयमै मर्मत गर्नुहोस्। हातले दुहुने नेपाली बथानमा थप दुई बानी: थन निचोर्नु होइन, पूरा हातले दुहुनुहोस्; र हरेक गाईका लागि छुट्टै कपडाले थन पुछ्नुहोस् — एउटै कपडा जीवाणुको निःशुल्क ट्याक्सी हो।",
        },
      },
    ],
    tip: {
      en: "Do a whole-herd CMT morning once a month — the day before the milk cooperative's collection. Paddle, reagent, ten minutes, and you know exactly which quarters to watch this month.",
      np: "महिनैमा एक चोटि बिहान सबै बथानको CMT गर्नुहोस् — सहकारीले दुध लिनुभन्दा एक दिन अघि। प्याडल, रिएजेन्ट, दस मिनेट — यस महिना कुन थन हेर्ने हो, ठ्याक्कै थाहा हुन्छ।",
    },
    caution: {
      en: "CMT reagent is a mild detergent — keep it away from eyes and do not test right after washing the udder with soap, because leftover detergent mimics a positive gel. Discard milk from strongly positive quarters, and never send treated milk to the dairy before the antibiotic's withdrawal period is over.",
      np: "CMT रिएजेन्ट हल्का डिटर्जेन्ट हो — आँखाबाट टाढा राख्नुहोस् र साबुनले थन धोएपछि तुरुन्तै परीक्षण नगर्नुहोस्, बाँकी डिटर्जेन्टले पोजेटिभ जेली झैँ देखाउँछ। बलियो पोजेटिभ थनको दुध फाल्नुहोस्, र एन्टिबायोटिकको विद्रोही अवधि नपुगी उपचारित दुध डेयरीमा नपठाउनुहोस्।",
    },
    sources: "Nepal prevalence: Dhakal (western Chitwan cattle, ~30%); Lamjung dairy survey 46.1% (animal basis); buffalo herd range 30–78% (Chowdhury et al. 2026, PMC review). CMT method and thresholds: California Mastitis Test references (reaction visible ≈≥400,000 cells/mL; scores 0–3, ≥2 positive). Five-point plan: National Mastitis Council / dairy-extension practice.",
    updated: "2026-09",
  },
  {
    id: "antibiotics-amr",
    categoryId: "animal-health",
    title: { en: "Antibiotics on the farm: use them so they keep working", np: "फार्ममा एन्टिबायोटिक: काम गरिरहने गरी प्रयोग गर्नुहोस्" },
    summary: {
      en: "Leftover drug in milk and half-finished courses are not small sloppiness — they are how bacteria on your farm learn to survive every medicine you own.",
      np: "दुधमा बाँकी औषधि र आधा छाडेको कोर्स सानो लापरवाही होइन — त्यही हो तपाईंको फार्मका जीवाणुलाई हरेक औषधि जित्न सिकाउने बाटो।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Residues in Kathmandu milk", np: "काठमाडौँ दुधमा औषधि-अवशेष" }, value: { en: "up to ~23% of samples", np: "नमुनाको ~२३% सम्म" }, note: { en: "screening studies, raw milk", np: "कच्चा दुधका स्क्रिनिङ अध्ययन" } },
      { label: { en: "AMR global rank", np: "AMR को विश्व स्थान" }, value: { en: "top-10 health threat", np: "शीर्ष-१० स्वास्थ्य खतरा" }, note: { en: "WHO assessment", np: "WHO मूल्याङ्कन" } },
      { label: { en: "Milk discard window", np: "दुध फाल्ने अवधि" }, value: { en: "check every label", np: "हरेक लेबल जाँच्नुहोस्" }, note: { en: "commonly 2–5 days after last dose", np: "अन्तिम खुराकपछि सामान्यतः २–५ दिन" } },
      { label: { en: "Right person to prescribe", np: "औषधि लेख्ने अधिकारी" }, value: { en: "a veterinarian", np: "पशु चिकित्सक" }, note: { en: "doses are by body weight, not by habit", np: "खुराक शरीरको तौलले, बानीले होइन" } },
    ],
    sections: [
      {
        heading: { en: "What resistance actually is", np: "प्रतिरोधात्मक क्षमता भनेको के हो" },
        body: {
          en: "Every time bacteria meet an antibiotic and survive, the survivors multiply and pass on the trick. Do this often enough — half doses, one-day courses of a three-day drug, the same bottle for every sick animal all year — and the medicine simply stops working on your farm. Scientists call it antimicrobial resistance, and the World Health Organization ranks it among the top ten threats to human health, because the same drug families treat animals and people. In Nepal, studies of raw milk have found antibiotic residues in up to roughly a quarter of samples from some markets, which is the fingerprint of drugs going in without rules coming out.",
          np: "जीवाणु एन्टिबायोटिकसँग भेटेर बाँचिरह्यो भने, बाँच्नेहरू पुग्छन् र त्यो तरिका अर्कालाई सिकाउँछन्। यो बारम्बार गर्दै गयो — आधा खुराक, तीन दिनको औषधि एक दिन, वर्षभरि हरेक बिरामीलाई उही बोतल — भने औषधिले तपाईंको फार्ममा कामै गर्न छाड्छ। वैज्ञानिकहरूले यसलाई एन्टिमाइक्रोबियल रेजिस्टेन्स (AMR) भन्छन्, र विश्व स्वास्थ्य सङ्गठनले यसलाई मानव स्वास्थ्यका शीर्ष दस खतरामा राख्छ, किनभने पशु र मानिसको उपचार उही औषधि-परिवारले गरिन्छ। नेपालमा कच्चा दुधका अध्ययनले केही बजारका करिब एक चौथाइ नमुनासम्म औषधि-अवशेष भेटेका छन् — नियमविना औषधि छिरेको त्यही औँलाको छाप हो यो।",
        },
      },
      {
        heading: { en: "Five habits that protect your own medicine shelf", np: "आफ्नै औषधि ताको जोगाउने पाँच बानी" },
        body: {
          en: "None of this needs new equipment — it needs discipline. The payoff is that when an animal is truly sick, the first drug you reach for still works.",
          np: "यसका लागि नयाँ उपकरण चाहिँदैन — अनुशासन चाहिन्छ। फाइदा यो हो: पशु साँच्चै बिरामी हुँदा, तपाईंले पहिलो पटकै नै विस्तारिरहने औषधिले अझै काम गर्छ।",
        },
        bullets: [
          { en: "Diagnose before you treat — a viral cold and a bacterial chest infection look the same in a goat; the antibiotic only helps one of them, and a veterinarian can often tell the difference without a lab.", np: "उपचारअघि निदान गर्नुहोस् — बाख्रामा भाइरल रुघा र जीवाणुजन्य छातीको सङ्क्रमण उस्तै देखिन्छ; एन्टिबायोटिकले एउटालाई मात्र फाइदा गर्छ, र पशु चिकित्सकले प्रायः प्रयोगशालाविना फर्क छुट्याउन सक्छन्।" },
          { en: "Finish the course — stopping when the animal looks better leaves the strongest bacteria alive to reinfect the whole shed.", np: "कोर्स पूरा गर्नुहोस् — पशु सुधारिएको देखेर छाड्दा सबैभन्दा बलिया जीवाणु बाँचेर पूरै गोठमा फेरि सङ्क्रमण फैलाउँछन्।" },
          { en: "Dose by weight, with a scale or a heart-girth tape — under-dosing is resistance training for bacteria.", np: "तौलले खुराक दिनुहोस्, तराजु वा नापपट्टीले — कम खुराक जीवाणुको तालिम हो।" },
          { en: "Respect the milk-withdrawal period on the label and keep treated animals visibly marked — residues are what dairies test for, and one positive tanker can cost a whole cooperative.", np: "लेबलको दुध-विद्रोही अवधि मान्नुहोस् र उपचारित पशुमा देखिने चिनो राख्नुहोस् — डेयरीले अवशेष नै जाँच्छन्, एउटा पोजेटिभ ट्यांकरले पूरै सहकारीलाई खर्च उठाउन सक्छ।" },
          { en: "Never use leftover human antibiotics or shared bottles from the bazaar — wrong drug, wrong dose, wrong everything.", np: "बाँकी रहेका मान्व औषधि वा बजारका साझा बोतल कहिल्यै नप्रयोग गर्नुहोस् — गलत औषधि, गलत खुराक, सबै गलत।" },
        ],
      },
      {
        heading: { en: "Where the farm's part fits in the national picture", np: "फार्मको भाग राष्ट्रिय तस्बिरमा कहाँ पर्छ" },
        body: {
          en: "Nepal's dairy chain collects from hundreds of thousands of one-to-five-animal farms, so one family's habits travel far: residues from a single untreated quarter can surface in a pooled tanker, and resistance genes bred in your shed can move through milk, manure and hands into the community. The good news is that the same scale works in reverse — when a cooperative's members adopt withdrawal discipline together, the milk price and reputation of the whole group rise together. Ask your milk-collection officer what the cooperative's residue rules are; strong ones already exist on paper in many districts.",
          np: "नेपालको दुग्ध शृङ्खलाले लाखौँ एकदेखि-पाँच-पशु फार्मबाट दुध जम्मा गर्छ, त्यसैले एक परिवारको बानी टाढासम्म पुग्छ: एउटा नउपचारित थनको अवशेष साझा ट्यांकरमा देखा पर्न सक्छ, र तपाईंको गोठमा पालिएको प्रतिरोधक जीन दुध, गोबर र हातहरू हुँदै समुदायसम्म जान्छ। राम्रो कुरा — उल्टो दिशामा पनि यही स्केल काम गर्छ: सहकारीका सदस्यले विद्रोही-अवधिको अनुशासन सँगै अपनाउँदा समूहकै दुधको भाउ र नाम उही सँगै बढ्छ। आफ्नो सङ्कलन अधिकृतसँग सोध्नुहोस्, सहकारीको अवशेष-नियम के हो; धेरै जिल्लामा बलिया नियम कागजमा छन् नै।",
        },
      },
    ],
    tip: {
      en: "Tape a simple card inside your medicine box: drug name, animal, date started, date course ends, date milk is safe again. Ten seconds of writing saves weeks of discarded milk — and keeps your dairy's trust.",
      np: "औषधि बाकसभित्रै सातो कार्ड टाँस्नुहोस्: औषधिको नाम, पशु, सुरु मिति, कोर्स सकिने मिति, दुध सुरक्षित हुने मिति। दस सेकेन्डको लेखनले हप्तौँको फालेको दुध बचाउँछ — र डेयरीको विश्वास जोगाउँछ।",
    },
    sources: "Residue prevalence: Kathmandu Valley raw-milk screening studies (up to ~23% of samples positive; penicillins and sulfonamides among detected classes). AMR ranking: WHO global-health-threats list. Withdrawal-period and dosing practice: veterinary drug labelling and FAO/WHO responsible-use guidance.",
    updated: "2026-09",
  },
  {
    id: "minerals-vitamins",
    categoryId: "animal-health",
    title: { en: "Chewing bones and dull coats: the mineral story", np: "हाड चपाउने र फुस्रो भुत्ताको कथा: खनिजको कुरा" },
    summary: {
      en: "When an animal chews walls, eats soil or loses its coat shine, the diet is talking — and on Nepali roughage-only rations it is usually talking about salt, phosphorus and trace minerals.",
      np: "पशुले भित्ता चपाउँदा, माटो खाँदा वा भुत्ताको चमक हराउँदा आहार आफैँ बोलिरहेको हुन्छ — नेपाली चारा-मात्र आहारमा यो प्रायः नुन, फस्फोरस र सूक्ष्म खनिजको कुरा गरिरहेको हुन्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Common salt for cattle", np: "गाईको साझा नुन" }, value: { en: "0.005–0.01% of body weight", np: "शरीर तौलको ०.००५–०.०१%" }, note: { en: "≈20–40 g/day for a 400-kg animal", np: "४०० केजी पशुलाई दिनको ~२०–४० ग्राम" } },
      { label: { en: "Classic P-deficiency sign", np: "फस्फोरस कमीको चिन्ह" }, value: { en: "pica — bone chewing, soil eating", np: "पिका — हाड-चपाउने, माटो खाने" }, note: { en: "with stiff joints and poor fertility", np: "जोर्नी नरम र प्रजनन कमजोरसँगै" } },
      { label: { en: "Cobalt / copper signs", np: "कोबाल्ट / ताम्रका चिन्ह" }, value: { en: "wasting; faded coat", np: "दुब्लिने; फुस्रो भुत्ता" }, note: { en: "ruminants need Co for B12; Cu colours hair", np: "रुमिनेन्टलाई B12 का लागि Co, रङका लागि Cu चाहिन्छ" } },
      { label: { en: "Se deficiency in young", np: "सेलेनियम कमी बच्चामा" }, value: { en: "white muscle disease", np: "सेतो मांसपेशी रोग" }, note: { en: "stiff, weak calves and kids", np: "बाठो, कमजोर बछडा-चेला" } },
    ],
    sections: [
      {
        heading: { en: "Why roughage diets run short", np: "चारा-मात्र आहार किन पुग्दैन" },
        body: {
          en: "Rice straw, dry stalks and late-cut grass carry potassium and calcium but very little phosphorus, and their trace-mineral content depends on soils that Himalayan erosion constantly leaches. A milking animal pours phosphorus into milk every day, a growing calf pours it into bone, and what the feed does not supply, the body borrows from its own skeleton. The animal cannot tell you this in words, so it tells you in behaviour: gnawing walls and bones, licking earth, chewing ropes — the old villagers' sign that has a very modern biochemical explanation.",
          np: "धानको पराल, सुक्खा डाँठ र ढिलो काटेको घाँसमा पोटासियम र क्याल्सियम हुन्छन् तर फस्फोरस निकै कम हुन्छ, र सूक्ष्म खनिज हिमाली कटावले निरन्तर धोइरहने माटोमा भर पर्छ। दुध दिने पशुले दिनहुँ फस्फोरस दुधमा पठाउँछ, हुर्कंदो बछडाले हाडमा; चाराले नदिएको शरीरले आफ्नै कंङ्कालबाट उधारो लिन्छ। पशुले यो शब्दमा भन्न सक्दैन, त्यसैले व्यवहारले भन्छ: भित्ता-हाड चपाउने, माटो चाट्ने, डोरी चपाउने — गाउँका पुराना चिन्ह, जसको एकदम आधुनिक जैविक व्याख्या छ।",
        },
      },
      {
        heading: { en: "The cheapest first step: salt", np: "पहिलो सस्तो कदम: नुन" },
        body: {
          en: "Sodium is the one mineral every straw-based ration lacks completely, and animals are blatant about wanting it — watch them crowd a new salt block. The rule of thumb from cattle nutrition is 0.005–0.01% of body weight as salt per day, which is 20–40 grams for a 400-kilogram cow or buffalo and a pinch for goats. Give it as a block hung where rain cannot reach, or mixed into the wet concentrate — free-choice blocks let the animal top up its own rhythm, which is exactly what a milking animal's appetite does better than our arithmetic.",
          np: "सोडियम एउटै खनिज हो जुन पराला-आधारित आहारमा पूरै हुँदैन, र पशुले यो माग प्रायः खुलै गर्छ — नयाँ नुनको ढुङ्गामा भीड लागेको हेर्नुहोस्। पशु-पोषणको सामान्य नियम: शरीर तौलको ०.००५–०.०१% दिनको नुन — ४०० केजी गाईभैंसीलाई २०–४० ग्राम, बाख्रालाई एक चुटुको। वर्षाले नभिज्ने ठाउँमा ढुङ्गा झुन्ड्याएर वा चिसो दानामा मिसाएर दिनुहोस् — रोज्ने ढुङ्गाले पशुलाई आफ्नै गतिमा पूरा गर्न दिन्छ, जुन दुध दिने पशुको भोकले हाम्रो अंकगणितभन्दा राम्रो गर्छ।",
        },
      },
      {
        heading: { en: "Reading the deficiency signs", np: "कमीका चिन्ह पढ्ने" },
        body: {
          en: "The textbook maps are worth knowing even without a lab: phosphorus shortage shows as pica with stiff gait, poor fertility and milk that drops early; cobalt shortage in ruminants looks like a wormy animal that deworming does not fix — pale, hungry-thin, listless — because without cobalt the rumen cannot make vitamin B12; copper shortage fades the coat from black to rusty and leaves diarrhoea that comes and goes; selenium shortage shows up in the youngest — stiff, trembling calves and kids that struggle to stand. All of them look like 'just thin' at the beginning, which is why a mineral lick plus a proper deworming is the cheapest diagnostic you will ever run.",
          np: "प्रयोगशालाविना नै थाहा पाउनलायक पुस्तकका चित्र हुन्छन्: फस्फोरस कमीमा पिका, बाठो हिँडाइ, कमजोर प्रजनन र चाँडै घट्ने दुध देखिन्छ; रुमिनेन्टमा कोबाल्ट कमी कृमिले खाएझैँ देखिन्छ — फुस्रो, भोकै दुब्लो, केही नगरेको — किनभने कोबाल्टविना रुमेनले भिटामिन B12 बनाउँदैन; ताम्र कमीले कालो भुत्ता गेरु पार्छ र आउँदै-जाँदै गर्ने पातलो दिसा छाड्छ; सेलेनियम कमी सानैमा देखिन्छ — उठ्न नसक्ने, काँप्ने बछडा-चेला। सबै सुरुमा 'दुब्लो मात्र' देखिन्छन्, त्यसैले खनिज ढुङ्गा + सही कृमिनाशक नै तपाईंले चलाउने सबैभन्दा सस्तो जाँच हो।",
        },
      },
      {
        heading: { en: "What to actually buy", np: "साँच्चै के किन्ने" },
        body: {
          en: "A good area-specific mineral mixture — the kind NARC and the feed industry formulate for Nepali conditions — beats a plain salt block for milking animals, and costs a few rupees per animal per day at the dose on the bag. Blend it into the concentrate rather than top-dressing straw, because the animal cannot lick powder off parali. Keep water generous: minerals make animals thirstier, and a thirsty animal eats less of everything. Buy in small fresh batches — mineral mixtures cake and lose their trace elements in monsoon humidity, and a hardened lump in a damp bag is money already spent.",
          np: "NARC र दाना उद्योगले नेपाली अवस्थाका लागि बनाएको क्षेत्र-विशेष खनिज मिश्रण दुध दिने पशुका लागि सादा नुनभन्दा राम्रो हो, र झोलामा लेखेको खुराकअनुसार दिँदा प्रति पशु दिनको केही रुपैयाँ पर्छ। परालामा छर्केर होइन, दानामा मिसाएर दिनुहोस् — पाउडर पशुले परालाबाट चाट्न सक्दैन। पानी प्रशस्त राख्नुहोस्: खनिजले तिर्खा बढाउँछ, र तिर्खाएको पशुले केही पनि कम खान्छ। सानो-ताजा मात्रा किन्नुहोस् — खनिज मिश्रण मनसुनको चिसोमा गाठो परेर सूक्ष्म तत्त्व गुमाउँछ, र चिस्सिएको गाठो भनेको खर्च सकिइसकेको पैसा हो।",
        },
      },
    ],
    tip: {
      en: "Hang the salt block where animals pass daily — near the water point, not the gate. A block they walk past gets licked; a block they never meet stays whole till monsoon ruins it.",
      np: "नुनको ढुङ्गा पशु दिनहुँ आउने ठाउँमा झुन्ड्याउनुहोस् — पानी छेउ, ढोका होइन। बाटोमा पर्ने ढुङ्गा चाटिन्छ; नभेटिने ढुङ्गा मनसुनले बिगार्नुअघि नै जस्ताको तस्तै बस्छ।",
    },
    sources: "Salt requirement 0.005–0.01% of body weight/day (cattle nutrition extension, e.g. West Texas Livestock Growers, university mineral guides); deficiency signs per Merck Veterinary Manual (phosphorus/pica, cobalt/B12 wasting, copper coat depigmentation, selenium white-muscle disease); mineral-mixture practice per NARC/feed-industry area-specific formulations.",
    updated: "2026-09",
  },
  /* ═════════════════════ cattle-buffalo ═════════════════════ */
  {
    id: "colostrum-calf-care",
    categoryId: "cattle-buffalo",
    title: { en: "The first six hours decide the calf's whole life", np: "बछडाको पूरै जीवन निर्णय हुन्छ पहिलो छ घण्टामै" },
    summary: {
      en: "A calf is born with no immunity of its own — the first milk is the only door, and it starts closing within hours. Quantity, speed and cleanliness are the whole game.",
      np: "बछडा आफ्नै प्रतिरोधात्मक क्षमताविना जन्मन्छ — पहिलो दुध एउटै ढोका हो, र त्यो घण्टैमा बन्द हुँदै जान्छ। परिमाण, गति र सरसफाई नै पूरै खेल हो।",
    },
    readMinutes: 7,
    facts: [
      { label: { en: "Colostrum amount", np: "खीरको परिमाण" }, value: { en: "10% of body weight in 6–12 h", np: "६–१२ घण्टामा शरीर तौलको १०%" }, note: { en: "≈4 L for a 45-kg calf, split in 2 feeds", np: "४५ केजी बछडालाई ~४ लि., दुई पटक" } },
      { label: { en: "Quality bar", np: "गुणस्तरको सीमा" }, value: { en: "IgG ≥50 g/L ≈ Brix ≥22%", np: "IgG ≥५० ग्राम/लि. ≈ ब्रिक्स ≥२२%" }, note: { en: "a kitchen refractometer reads it", np: "घरायसी रिफ्र्याक्टोमिटरले पढ्छ" } },
      { label: { en: "Gut closure", np: "आन्द्राको ढोका बन्द" }, value: { en: "mostly by 24 h", np: "प्रायः २४ घण्टाभित्र" }, note: { en: "after that, antibodies are digested, not absorbed", np: "पछि एन्टिबडी पचिन्छ, सोसिँदैन" } },
      { label: { en: "Navel care", np: "नाभि हेरचाह" }, value: { en: "7% iodine dip", np: "७% आयोडिन डिप" }, note: { en: "dip the stump right after birth", np: "जन्मेपछि तुरुन्तै नाभि डुबाउनुहोस्" } },
    ],
    sections: [
      {
        heading: { en: "Why the clock matters more than anything else", np: "घडी किन सबैभन्दा महत्त्वपूर्ण" },
        body: {
          en: "Inside the cow, the placenta keeps mother and calf blood separate, so antibodies never cross before birth. The calf must drink them from colostrum, and its intestine can absorb whole antibodies only for a short window — best in the first two hours, fading fast, essentially closed by a day of age. Standard calf-raising SOPs therefore say ten percent of body weight within the first half-day, which is about four litres for a 45-kilogram crossbred calf, with the very first feed inside two hours. Every hour of delay is a real drop in the immunity the calf will carry through its first months — and a door opened to the scours and pneumonia that take the weakest ones.",
          np: "गाईभित्र प्लेसेन्टाले आमा र बच्चाको रगत छुट्टै राख्छ, त्यसैले जन्मुअघि एन्टिबडी कहिल्यै पार हुँदैनन्। बछडाले तिनलाई खीरबाट पिउनैपर्छ, र आन्द्राले पूरै एन्टिबडी सोस्न सक्ने छोटो झ्याल हुन्छ — पहिलो दुई घण्टा सबैभन्दा राम्रो, तीव्र गतिमा घट्दै, एक दिनमा प्रायः बन्द। त्यसैले मानक बछडा-हुर्काउने नियमले भन्छ: जन्मेको आधा दिनभित्र शरीर तौलको दस प्रतिशत — ४५ केजीको सङ्कर बछडालाई करिब चार लिटर, पहिलो खुराक दुई घण्टाभित्रै। हरेक घण्टाको ढिलाइले बछडाले पहिलो कयौँ महिना बोक्ने प्रतिरोधात्मक क्षमतामा साँचो गिरावट ल्याउँछ — र कमजोरलाई लैजाने पातलो दिसा र निमोनियाको ढोका खोल्छ।",
        },
      },
      {
        heading: { en: "Feeding it right by hand", np: "हातले सही तरिकाले खुवाउने" },
        body: {
          en: "Not every calf nurses enough on its own — weak calves, first-calf heifers with small teats, and buffalo calves in the cold hours all under-drink. Milk the dam's first secretion into a clean bucket and feed it by bottle or esophageal feeder warmed to body heat, never scalding. Two feeds within twelve hours beats one big forced feed: the gut absorbs a steady flow better than a flood. Strip only what the calf needs from one side and leave the rest on the udder — the dam's colostrum volume is usually more than enough, and the calf's sucking keeps her udder healthy.",
          np: "हरेक बछडाले आफैँ पर्याप्त चुस्दैन — कमजोर बच्चा, सानो थन भएको पहिलो पटक ब्याएकी गाई, र जाडो घण्टामा जन्मेको भैंसीको बच्चा सबै कम खान्छन्। आमाको पहिलो दुध सफा बाल्टिनमा निचोरेर शरीरको तापकै बनाएर (पोल्ने गरी होइन) बोतल वा फिडरले खुवाउनुहोस्। बाह्र घण्टाभित्र दुई पटक खुवाउनु एकैपटक जबरजस्ती ठूलो मात्राभन्दा राम्रो हो: आन्द्राले बाढीभन्दा बहँदो धारा राम्रो सोस्छ। एकतर्फबाट बच्चालाई चाहिनेजति मात्र निचोर्नुहोस्, बाँकी थनमै छाड्नुहोस् — खीर प्रायः पर्याप्त हुन्छ, र बच्चाको चुसाइले आमाको थन स्वस्थ राख्छ।",
        },
        bullets: [
          { en: "First-milking colostrum only — by the second milking the antibody concentration has already halved.", np: "पहिलो निचोराइको खीर मात्र — दोस्रो दुहुँदा एन्टिबडी आधिमा झरिसकेको हुन्छ।" },
          { en: "Clean bucket, clean hands, clean teats — the same gut that is absorbing antibodies absorbs bacteria just as eagerly.", np: "सफा बाल्टिन, सफा हात, सफा थन — एन्टिबडी सोस्ने त्यही आन्द्राले जीवाणु पनि उत्तिकै उत्साहले सोस्छ।" },
          { en: "Refrigerate extra first-day colostrum in a sealed bottle — a freezer stash is vaccine for the next weak calf.", np: "बाँकी पहिलो-दिनको खीर बिर्केर फ्रिजमा राख्नुहोस् — फ्रिजमा जमाएको भण्डार अर्को कमजोर बच्चाको खोप हो।" },
          { en: "Dip the navel in 7% iodine at birth and again a day later; joint-ill in calves walks in through a wet navel.", np: "जन्मेका बेला नाभिमा ७% आयोडिन डिप गर्नुहोस्, अर्को दिन फेरि; बछडाको जोर्नीको रोग चिसो नाभिबाटै छिर्छ।" },
        ],
      },
      {
        heading: { en: "If colostrum is thin, late or dirty", np: "खीर पातलो, ढिलो वा फोहोर भए" },
        body: {
          en: "A cow that leaked milk before calving, a calf found hours after a night birth, a first-calf heifer that will not stand still — these are the moments farms lose immunity without knowing. Test quality when you can: a few drops on a kitchen Brix refractometer, and anything reading 22 or above is good colostrum. Below that, feed more of it — volume partly compensates quality. If there is no colostrum at all, the order of preference is frozen colostrum from your own farm, then a neighbour's fresh first-milking, then a commercial colostrum replacer — a replacer is a genuine substitute with verified antibody levels; a 'supplement' packet is not, and the words on the bag are not marketing fluff, they are the difference.",
          np: "ब्याउँअघि दुध चुहिएकी गाई, राति जन्मेर घण्टौँपछि भेटिएको बच्चा, उभिनै नदिने पहिलो-पटक ब्याएकी गाई — यही क्षणहरूमा फार्मले थाहै नपाई प्रतिरोधात्मक क्षमता गुमाउँछन्। सक्दो गुणस्तर जाँच्नुहोस्: घरायसी ब्रिक्स रिफ्र्याक्टोमिटरमा केही थोपा — २२ वा माथि पढे राम्रो खीर। त्यसभन्दा कम पढे, बढी परिमाण खुवाउनुहोस् — गुणस्तरलाई परिमाणले आंशिक भरिदिन्छ। खीरै नभए प्राथमिकता यस्तो: आफ्नै फार्मको फ्रिजमा राखेको खीर, छिमेकीको ताजा पहिलो दुध, अनि बजारको कोलोस्ट्रम रिप्लेसर — रिप्लेसर प्रमाणित एन्टिबडी स्तर भएको साँचो विकल्प हो; 'सप्लिमेन्ट' प्याकेट होइन, र झोलाका शब्द बनावटी चमक होइनन्, फर्क नै हुन्।",
        },
      },
      {
        heading: { en: "From day two to weaning", np: "दोस्रो दिनदेखि छुटाउनेसम्म" },
        body: {
          en: "After the colostrum days, feed whole milk or good replacer at about ten percent of body weight daily, split into two feeds at roughly the same hours each day — calves are creatures of habit and scours follow broken routines. Offer a handful of calf starter from week one and fresh water always; the rumen develops on dry feed, not on milk. The modern step-down approach reduces milk over the last two weeks and weans at eight to twelve weeks, once the calf is eating about a kilo of starter a day. Weaning by calendar alone, while the calf is still at half a kilo of starter, is the classic cause of the post-weaning slump every buyer has learned to spot.",
          np: "खीरका दिनपछि पूरा दुध वा राम्रो रिप्लेसर दिनको करिब शरीर तौलको दस प्रतिशत दिनुहोस्, दिनहरू उही समयमा दुई पटक — बछडा बानीको जीव हो, बानी बिग्रँदा पातलो दिसा पछ्याउँछ। पहिलो हप्तादेखि हातभरि स्टार्टर दाना र सधैँ ताजा पानी दिनुहोस्; रुमेन सुक्खा आहारले विकसित हुन्छ, दुधले होइन। आजकल स्टेप-डाउन विधिले अन्तिम दुई हप्ता दुध घटाउँदै आठदेखि बाह्र हप्तामा छुटाउँछ, जब बछडाले दिनको करिब एक किलो स्टार्टर खान थाल्छ। ताम्चिलो हेरेर आधा किलो मात्र खाने बच्चा छुटाउनु नै किनेर लैजानेहरूले पहिल्यै चिन्ने छुटाएपछिको खस्केको अवस्थाको सामान्य कारण हो।",
        },
      },
    ],
    tip: {
      en: "Write three things on the wall calendar at calving: born at (time), first colostrum at (time), how many litres. Farms that write the clock down feed twice as fast as farms that 'remember' — and their calf deaths show it.",
      np: "ब्याएको दिन पात्रोमा तीन कुरा लेख्नुहोस्: जन्मिएको समय, पहिलो खीर दिएको समय, कति लिटर। घडी लेख्ने फार्मले 'सम्झने' फार्मभन्दा दोब्बर छिटो खुवाउँछन् — र बच्चा मर्ने दरले त्यही देखाउँछ।",
    },
    caution: {
      en: "Never feed pooled or bazaar colostrum of unknown health status — Johne's disease and bovine leucosis travel in milk from infected dams. Frozen colostrum thaws in warm — never hot — water; antibodies are proteins, and cooking them ruins the whole point.",
      np: "स्वास्थ्य थाहा नभएको साझा वा बजारको खीर कहिल्यै नखुवाउनुहोस् — जोन रोग र बोभाइन ल्युकोसिस सङ्क्रमित आमाको दुधबाट सर्छन्। फ्रिजको खीर तातो-नहुने ख मनतातो पानीमा पगाल्नुहोस्; एन्टिबडी प्रोटिन हुन्, पकाए अर्थै गुम्छ।",
    },
    sources: "Colostrum SOPs: 10% of body weight within 6–12 h, ≥4 L for a 45-kg calf within 12 h, IgG ≥50 g/L ≈ Brix ≥22%, gut closure ≈24 h (Cornell PRO-DAIRY / McGill / Penn State calf-care SOPs; De Heus and Anexa dairy guidance). Milk-feeding and step-down weaning: Cornell Liquid Feed Management; Palczynski et al. 2020 (Animals, PMC). Navel iodine: standard calf-care practice.",
    updated: "2026-09",
  },
  /* ═════════════════════ fodder ═════════════════════ */
  {
    id: "urea-treated-straw",
    categoryId: "fodder",
    title: { en: "Urea-treated straw: three weeks to a better feed", np: "युरिया-उपचारित पराला: तीन हप्तामा राम्रो चारा" },
    summary: {
      en: "Rice straw feeds the rumen but starves it too — treating it with urea at 4% for three sealed weeks lifts what the animal can actually get out of every bundle.",
      np: "धानको पराला रुमेनलाई खुवाउँछ, भोकाउँछ पनि — ४% युरियाले तीन हप्ता माटोमा सिल गरेर राख्दा हरेक गड्डीबाट पशुले पाउने पोषण बढ्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Urea rate", np: "युरिया दर" }, value: { en: "4% of straw weight", np: "परालाको तौलको ४%" }, note: { en: "4 kg urea per 100 kg straw", np: "१०० केजी परालामा ४ केजी युरिया" } },
      { label: { en: "Moisture", np: "चिस्यान" }, value: { en: "≈40%", np: "करिब ४०%" }, note: { en: "dissolve urea in water and sprinkle", np: "युरिया पानीमा घोलेर छर्क्नुहोस्" } },
      { label: { en: "Sealed storage time", np: "सिल गरेर राख्ने अवधि" }, value: { en: "~3 weeks", np: "करिब ३ हप्ता" }, note: { en: "cold weather asks for longer", np: "जाडोमा अझ केही बढी" } },
      { label: { en: "The gain", np: "फाइदा" }, value: { en: "higher digestibility & intake", np: "बढी पाच्यता र बढी खाना" }, note: { en: "trial after trial, treated straw beats plain", np: "परीक्षणपछि परीक्षणमा उपचारित पराला अघि निस्कन्छ" } },
    ],
    sections: [
      {
        heading: { en: "What the treatment actually does", np: "उपचारले साँच्चै के गर्छ" },
        body: {
          en: "Urea dissolves into ammonia inside the sealed stack, and ammonia does two things to straw: it swells and breaks the lignin-glue that binds the fibres, and it becomes nitrogen food for the rumen microbes. The result, shown repeatedly in feeding trials from Virginia Tech's classic studies to recent urea-molasses work, is straw the animal digests better and — just as valuable — chooses to eat more of. Intake is the quiet half of nutrition: feed the rumen microbes nitrogen with the fibre they are already chewing, and litres of milk appear from a resource the farm already owns.",
          np: "माटोले सिल गरेको थुप्रोभित्र युरिया अमोनियामा बदलिन्छ, र अमोनियाले परालामा दुई काम गर्छ: फाइबर जोडेर बसालेको लिग्निन-गारो फुकाएर तोड्छ, र रुमेनका सूक्ष्म जीवका लागि नाइट्रोजन-खाना बन्छ। नतिजा — भर्जिनिया टेकका पुराना अध्ययनदेखि त्यसपछिका युरिया-मोलासेस परीक्षणसम्म बारम्बार देखिएझैँ — पशुले राम्रोसँग पचाउने र त्यत्तिकै महत्त्वपूर्ण, बढी खान मन लगाउने पराला। पोषणको चुपचाप आधा भाग खुराक हो: जुन फाइबर रुमेनले अहिल्यै चपाइरहेको छ त्यसैसँग सूक्ष्म जीवलाई नाइट्रोजन दिँदा, फार्मसँग पहिल्यै भएको स्रोतबाटै दुधका लिटर निस्कन्छन्।",
        },
      },
      {
        heading: { en: "Making a stack, step by step", np: "थुप्रो बनाउने, क्रमैसँग" },
        body: {
          en: "Work on a dry floor or a plastic sheet with a stack small enough to finish in a day. Dissolve four kilograms of urea in about forty litres of water for every hundred kilograms of straw, sprinkle it evenly while a second person turns the pile, then press the mass down firmly and seal it under plastic with earth or tyres on the edges — air is the enemy, because air lets moulds use the ammonia before the straw does. Wait about three weeks before opening, longer in the cold of Poush-Magh. Opened stack: expose it to air for a few hours so free ammonia smell fades, then feed. The straw should smell faintly sweet-earthy, not sharp like a bottle of ammonia.",
          np: "सुक्खा फर्स वा प्लास्टिकमा, एक दिनमा सकिने सानो थुप्रो बनाउनुहोस्। हरेक सय केजी परालाका लागि चार केजी युरिया करिब चालिस लिटर पानीमा घोल्नुहोस्, अर्को मान्छेले थुप्रो फर्कँदै जाँदा राम्ररी छर्क्नुहोस्, त्यसपछि केही दबाब दिएर थुप्रो कसेर प्लास्टिकले छोप्नुहोस्, छेउमा माटो वा टायरले थिच्नुहोस् — हावा शत्रु हो, हावाले ढुसीलाई परालाभन्दा पहिले अमोनिया खान दिन्छ। करिब तीन हप्तापछि मात्र खोल्नुहोस्, पुस-माघको जाडोमा अझ बढी। खोलेपछि केही घण्टा हावा छोडेर बाँकी अमोनियाको बास्ना हराउन दिनुहोस्, त्यसपछि खुवाउनुहोस्। परालाको बास्ना हल्का गुलियो-मिठो माटो जस्तो हुनुपर्छ, अमोनियाको बोतल झैँ नचुस्तो।",
        },
        bullets: [
          { en: "Chop the straw before treating — shorter pieces absorb the solution evenly and the stack packs tighter.", np: "उपचारअघि पराला काट्नुहोस् — छोटा टुक्राले घोल समान चुस्छ र थुप्रो कसिएर बस्छ।" },
          { en: "Molasses at 1–2 kg per 100 kg straw adds energy, improves the smell, and animals take to it faster.", np: "सय केजीमा १–२ केजी मोलासेसले ऊर्जा थप्छ, बास्ना सुधार्छ, र पशुले छिटो मन पराउँछन्।" },
          { en: "One spoiled corner means air got in — cut it out; never feed mouldy patches, black or green.", np: "एउटै कुहिएको कुनोको अर्थ हावा पस्यो — त्यो भाग काटेर फाल्नुहोस्; कालो वा हरियो ढुसी लागेको कहिल्यै नखुवाउनुहोस्।" },
        ],
      },
      {
        heading: { en: "Feeding and the safety line", np: "खुवाउने र सुरक्षाको रेखा" },
        body: {
          en: "Introduce treated straw over five to seven days alongside ordinary straw, and let adult cattle and buffalo settle at whatever the farm grows — the point is a better basal ration, not a complete one. Treated straw still wants a supplement: a mineral mixture daily, and green fodder or a tree-leaf branch for protein and vitamins. Goats can eat it in smaller quantities, but it suits the big ruminants best. And treat urea with the respect it deserves: never let animals drink the solution or eat dry urea, never mix more than the recipe, and keep the bag sealed away from children. Urea poisoning is fast and dramatic — bloated left flank, staggering, heavy breathing — and it is a veterinary emergency where vinegar and cold water given early, on veterinary advice, can save the animal.",
          np: "उपचारित पराला सामान्य परालासँगै पाँचदेखि सात दिनमा बिस्तारै बढाउनुहोस्, र गाईभैंसीलाई फार्मले भेटेजति नै पुर्‍याउनुहोस् — उद्देश्य सुधारित आधार-चारा हो, पूरा आहार होइन। उपचारित परालालाई अझै सघाउनु पर्छ: दिनहुँ खनिज मिश्रण, र प्रोटिन-भिटामिनका लागि हरियो घाँस वा चारा-विरुवाको हाँगो। बाख्राले थोरै खान सक्छ, तर ठूला रुमिनेन्टका लागि यो सबैभन्दा उपयुक्त हो। युरियालाई उसको सम्मान दिँदै होइन भने छाड्नुहोस्: घोल पिउन वा सुक्खा युरिया खान कहिल्यै नदिनुहोस्, नुस्खाभन्दा बढी कहिल्यै नमिसाउनुहोस्, र बोरा छोपेर बच्चाबाट टाढा राख्नुहोस्। युरियाको विषाक्तता छिटो र भयावह हुन्छ — बायाँ कुँडा फुल्ने, लर्बरिने, ढाडले सास फेर्ने — र यो पशु-चिकित्सकीय आकस्मिक अवस्था हो; चिकित्सकको सल्लाहमा समयमै सिरका र चिसो पानीले बचाउन सकिन्छ।",
        },
      },
    ],
    tip: {
      en: "Treat straw right after threshing when the stack is one place and labour is free after harvest — March's feed is made in December's spare days.",
      np: "धान झार्नेबित्तिकै उपचार गर्नुहोस्, जब थुप्रो एकै ठाउँमा हुन्छ र काटेपछि श्रम पोलो हुन्छ — चैतको चारा मंसिरका फुर्सदका दिनमा बनाइएको हुन्छ।",
    },
    sources: "Urea treatment of straw: 4% urea, 40% moisture, treatment-time trials (Virginia Tech theses on ammonia/urea treatment of wheat straw — IVDMD rising with treatment time); FAO rice-straw utilisation overview; urea-molasses treatment trials 2024 (fermentation quality, digestibility, intake gains). Safety: standard veterinary guidance on urea poisoning.",
    updated: "2026-09",
  },
  {
    id: "azolla-fodder",
    categoryId: "fodder",
    title: { en: "Azolla: a protein pond the size of a bed sheet", np: "एजोला: ओछ्यान-आकारको पोषण-पोखरी" },
    summary: {
      en: "A small water patch that doubles its own weight in days and carries a quarter of its dry matter as protein — one of the cheapest supplements a Nepali dairy can grow.",
      np: "केही दिनमै आफ्नै तौल दोब्बर हुने र सुक्खा तौलको चौथाइ प्रोटिन बोकेको सानो पानीको थुप्रो — नेपाली डेयरीले उब्जाउन सक्ने सबैभन्दा सस्तो सघाउ पूरकहरूमध्ये एक।",
    },
    readMinutes: 5,
    facts: [
      { label: { en: "Crude protein", np: "कच्चा प्रोटिन" }, value: { en: "≈20–25% of dry matter", np: "सुक्खा तौलको ~२०–२५%" }, note: { en: "on a fresh basis ≈4–5 g per 100 g", np: "ताजामा १०० ग्राममा ~४–५ ग्राम" } },
      { label: { en: "Feeding rate, dairy cow", np: "खुराक, दुध गाई" }, value: { en: "2–2.5 kg fresh/day", np: "दिनको २–२.५ केजी ताजा" }, note: { en: "mixed with or beside concentrate", np: "दानासँग वा छेउमा मिसाएर" } },
      { label: { en: "Reported milk response", np: "दुधमा देखिएको उत्तर" }, value: { en: "+10–15%", np: "+१०–१५%" }, note: { en: "Indian dairy feeding studies", np: "भारतीय दुग्ध अध्ययनहरू" } },
      { label: { en: "Growth speed", np: "हुर्कने गति" }, value: { en: "biomass doubles in days", np: "केही दिनमै दोब्बर" }, note: { en: "in warm water with nutrients", np: "तातो पानी र पोषण भएमा" } },
    ],
    sections: [
      {
        heading: { en: "What Azolla is and why it fits small farms", np: "एजोला के हो र साना फार्ममा किन मिल्छ" },
        body: {
          en: "Azolla is a tiny floating fern that lives partnered with a bacterium that fixes nitrogen — up to several kilograms per hectare per day under good conditions — so it grows explosively on nothing but water, a little soil fertility and sunlight. On a dry-matter basis it runs around a fifth to a quarter protein with a favourable amino-acid mix, plus carotene for the yellow colour it gives milk fat. Indian dairy studies that supplemented cows with a couple of kilograms of fresh Azolla daily recorded milk improvements in the ten-to-fifteen-percent range — not magic, just protein arriving at almost no cash cost. For a farm with two buffaloes and a corner of the yard, that is the arithmetic that matters.",
          np: "एजोला पानीमा तैरने सानो फर्न हो जो नाइट्रोजन स्थिरीकरण गर्ने जीवाणुसँग साझेदारीमा बाँच्छ — राम्रो अवस्थामा दिनको हेक्टरमा कयौँ किलो नाइट्रोजनसम्म — त्यसैले पानी, थोरै माटोको उर्वरता र घाम भए पुग्ने, विस्फोटझैँ बढ्छ। सुक्खा तौलमा यसमा पाँच-चौथाइदेखि चौथाइभन्दा बढी प्रोटिन, राम्रो एमिनो-अम्ल मिश्रण, र दुधको बोसोमा पहेँलो रङ दिने क्यारोटिन हुन्छन्। दिनको दुई केजी ताजा एजोला दिने भारतीय दुग्ध अध्ययनहरूले दसदेखि पन्ध्र प्रतिशतसम्मको दुध वृद्धि रेकर्ड गरे — जादू होइन, नगद खर्च नै नभई पुग्ने प्रोटिन नै हो। दुई भैंसी र आँगनको एउटा कुनो भएको फार्मका लागि यही अंकगणित महत्त्वको हुन्छ।",
        },
      },
      {
        heading: { en: "A bed-sheet pond in an afternoon", np: "एक बेलुकामै ओछ्यान-आकारको पोखरी" },
        body: {
          en: "Dig a shallow pit about two by three metres and twenty centimetres deep, line it with plastic, and fill with ten to fifteen centimetres of water mixed with a couple of baskets of fertile soil and a spade of dung slurry. Scatter a starter handful of Azolla from a neighbour, a government farm or an agrovet — farmers' networks in the Terai and mid-hills pass it along freely. In warm months the mat covers the pond in two to three weeks; the first harvest typically comes around day fifteen to twenty-five. Harvest with a sieve every second or third day, taking no more than a third of the mat each time, and the pond regrows what you took within days. Shade cloth at forty percent in the blazing pre-monsoon keeps the surface from scorching; a stick across the pond breaks monsoon rain's pounding.",
          np: "करिब दुई-तीन मिटर लामो, बीस सेन्टिमिटर गहिरो खाल्टो खन्नुहोस्, प्लास्टिकले बिछ्याउनुहोस्, र दसदेखि पन्ध्र सेन्टिमिटर पानीमा दुई-तीन टोकरी उर्वर माटो र एक फाल्ने गोबरको घोल मिसाउनुहोस्। छिमेकी, सरकारी फार्म वा एग्रोभेटबाट एजोलाको एक मुठा सुरुआत छर्नुहोस् — तराई र भित्री मधेशका किसान सञ्जालले यसलाई स्वतन्त्रै साटासाट गरिरहेका हुन्छन्। तातो महिनामा पोखरी दुई-तीन हप्तामै हरियो गलैँचोले पुरिन्छ; पहिलो कटाई प्रायः पन्ध्रदेखि पच्चीस दिनमा आउँछ। छल्नीले दोस्रो-तेस्रो दिन काट्दै जानुहोस्, एकपटकमा गलैँचोको तीन भागको एक भागभन्दा बढी नलिनुहोस्, र लिएको केही दिनमै फेरि उब्जिन्छ। मनसुनअघिको चर्को घाममा चालीस प्रतिशत छाया कपडाले सतह पोल्न दिँदैन; पोखरी तारेर मनसुनको पटक पड्किन दिँदैन।",
        },
      },
      {
        heading: { en: "Feeding it without waste", np: "बर्बादै नगरी खुवाउने" },
        body: {
          en: "Fresh Azolla is about ninety-five percent water, so weigh it wet and feed two to two-and-a-half kilograms per milking cow per day — wash it, drain it, and either mix it with the concentrate or feed it just before, because it wilts fast in the sun. Cattle take a few days to acquire the taste; mixing with bran speeds that up. Surplus harvests sun-dry into a leafy meal that keeps for months and can go into compound feed, and ducks and fish eat whatever the cows do not. The supplement is a supplement: keep the basal ration of good fodder and straw as it was, add the mineral mixture, and let Azolla's protein do what purchased cake was doing — at the cost of one plastic sheet and a sieve.",
          np: "ताजा एजोला करिब पन्चानब्बे प्रतिशत पानी हुन्छ, त्यसैले भिजालाई तौलेर दुध गाईलाई दिनको दुईदेखि साढे दुई किलो दिनुहोस् — धोएर, पानी निकालेर, दानामा मिसाएर वा दानाअघि नै खुवाउनुहोस्, किनभने घाममा यो छिटै नुम्सिन्छ। गाईले स्वाद मनाउन केही दिन लिन्छन्; चोक्रोसँग मिसाउँदा यो छिटो हुन्छ। बढी कटाई घाममा सुकाएर महिनौँ टिक्ने पात-दाना बनाउन सकिन्छ, र गाईले नखाएको खान हाँस र माछाले खान्छन्। पूरक पूरक नै हो: राम्रो घाँस-परालाको आधार-चारा जस्तो थियो त्यस्तै राख्नुहोस्, खनिज मिश्रण थप्नुहोस्, र किनेको पिँडीले गरिरहेको काम एजोलाको प्रोटिनले गर्न दिनुहोस् — एक प्लास्टिक र एक छल्नीको खर्चमा।",
        },
      },
    ],
    tip: {
      en: "Give the pond a weekly quarter-hour of care — stir, top up water, pull out old yellowing fronds, one spade of slurry. Azolla repays attention faster than any crop on the farm.",
      np: "पोखरीलाई हप्तामा एकपटक पन्ध्र मिनेट — हल्का चलाउनु, पानी थप्नु, पहेँलिएका पुराना पात झिक्नु, एक फाल्ने घोल। फार्मको कुनै पनि बालीले भन्दा एजोलाले ध्यानको फर्छ छिटो फिर्ता गर्छ।",
    },
    caution: {
      en: "Azolla is a water plant, and water carries more than Azolla — keep dung and urine runoff out of the pond, harvest with a clean sieve, and never let the mat sit stagnant where mosquitoes breed; a thin layer of Azolla itself actually suppresses mosquito larvae, but an overgrown, untended pond invites them.",
      np: "एजोला पानीको विरुवा हो, र पानीले एजोलाभन्दा धेरै बोक्छ — गोबर-पिसाबको बहर पोखरीमा नपस्न दिनुहोस्, सफा छल्नीले काट्नुहोस्, र गलैँचो लामो समय थुलथुलो भएर लामखुट्टे पलाउने ठाउँ नबनाउनुहोस्; एजोलाको पातलै पातलो तह लामखुट्टेको लाग्चो दबाउँछ, तर हेरचाहविनाको पोखरीले निम्त्याउँछ।",
    },
    sources: "Protein content and feeding value of Azolla: research evaluations (~20–25% CP on DM); feeding rate 2–2.5 kg/day and +10–15% milk response (Indian dairy studies — dairyknowledge.in, ICAR epubs; ResearchGate cultivation review 2021). N-fixation 3–5 kg/ha/day under optimum conditions (extension literature). First harvest day 15–25 (vikaspedia field accounts).",
    updated: "2026-09",
  },
  /* ═════════════════════ goat-farming ═════════════════════ */
  {
    id: "goat-pneumonia",
    categoryId: "goat-farming",
    title: { en: "Goat pneumonia: the cold-damp killer with a known address", np: "बाख्राको निमोनिया: ठेगाना थाहा भएको चिसो-चिस्यानको हत्यारा" },
    summary: {
      en: "Snotty nose, fast breathing, a kid standing apart from the flock — pneumonia is among the top killers of goats in Nepal, and most of its causes sit inside the shed, not outside it.",
      np: "नाकबग्ने, छिटो सास, बथानबाट छुट्टिएर उभिएको चेला — निमोनिया नेपालमा बाख्रा मार्ने मुख्य रोगहरूमा पर्छ, र यसका धेरै कारण गोठभित्रै बस्छन्, बाहिर होइन।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Main bacterial culprit", np: "मुख्य जीवाणु" }, value: { en: "Mannheimia haemolytica", np: "मानहाइमिया हेमोलाइटिका" }, note: { en: "confirmed in Nepali goat isolates (Rawat 2019)", np: "नेपाली बाख्राबाट पुष्टि (रावत २०१९)" } },
      { label: { en: "Fever in sick goats", np: "बिरामी बाख्राको ज्वरो" }, value: { en: "40–41 °C", np: "४०–४१ डिग्री" }, note: { en: "with appetite loss and fast breathing", np: "खाना छाड्ने र छिटो साससँगै" } },
      { label: { en: "Reported morbidity", np: "रिपोर्ट गरिएको रोग-दर" }, value: { en: "up to ~57% in flocks", np: "बथानमा ~५७% सम्म" }, note: { en: "respiratory-disease reviews, small ruminants", np: "साना रुमिनेन्ट श्वास-रोग समीक्षा" } },
      { label: { en: "Who dies most", np: "धेरै कसले मर्छन्" }, value: { en: "kids with poor colostrum", np: "खीर कम खाएका चेला" }, note: { en: "and goats in wet, windy, crowded sheds", np: "र चिसो, हावा, भीडभाडको गोठमा" } },
    ],
    sections: [
      {
        heading: { en: "How the disease actually arrives", np: "रोग साँच्चै कसरी आउँछ" },
        body: {
          en: "Mannheimia haemolytica lives quietly in the noses of healthy goats — Nepali researchers isolated it from pneumonic animals and traced the classic pattern where stress gives it the door. Cold rain combined with a shut, airless shed; a long truck ride to the bazaar; crowding at night with heads packed at the feed trough — these suppress the lungs' own cleaning, and the bacteria pour into them. The sick goat runs a fever of forty to forty-one degrees, stops eating, breathes with the belly, and may have a sticky nasal discharge; untreated, reviews report morbidity climbing past half the flock and the youngest sinking first. It is not a mysterious disease — it is an engineering problem with the shed and the calendar.",
          np: "मानहाइमिया हेमोलाइटिका स्वस्थ बाख्राको नाकमै शान्त बस्छ — नेपाली अनुसन्धानकर्ताले निमोनिया लागेका बाख्राबाट यही जीवाणु निकालेर त्यही पुरानो तस्बिर देखाए: तनावले ढोका दिन्छ। चिसो पानीसँगै बन्द, हावाविनाको गोठ; बजारको लामो ट्रक-यात्रा; राति दाना-ट्रफमा टाउको जोडेर भीड — यी सबैले फोक्सो आफैलाई सफा गर्ने क्षमता थिच्छन्, र जीवाणु भित्र पस्छन्। बिरामी बाख्राले चालीस-इकतालीस डिग्री ज्वरो चढाउँछ, खान छाड्छ, भुँडाले सास फेर्छ, नाकबाट टाँसिने पानी बग्न सक्छ; उपचारविना समीक्षाहरूले बथानको आधाभन्दा माथि रोग फैलिने र सबैभन्दा सानो पहिले डुब्ने बताउँछन्। यो रहस्यमय रोग होइन — गोठ र पात्रोको इन्जिनियरिङ-समस्या हो।",
        },
      },
      {
        heading: { en: "Fixing the shed is fixing the disease", np: "गोठ मिसाउनु नै रोग मिसाउनु" },
        body: {
          en: "The lung needs dry air that moves. Raise the floor off the ground with slats so urine and droppings fall through, bed it with absorbent dry material, and open a ridge or wall gap so warm damp air escapes above the goats' heads — a shed that smells sharp of ammonia is announcing that the air at kid level is exactly what pneumonia wants. Keep density honest: a floor allowance of about one to one-and-a-half square metres per adult, feeders long enough that subordinate goats are not pushed into the cold corner at every meal, and a separate dry corner where sick animals can be moved at the first sign. In Truck-month and the monsoon weeks when farmers bring new goats home, quarantine newcomers for two weeks — the bazaar is where flocks mix noses.",
          np: "फोक्सोलाई चुस्केर हावा चल्ने सुक्खा वातावरण चाहिन्छ। फर्स तलाबाट माथि तार्चोले उठाउनुहोस् जसले पिसाब-गुँड तल झरोस्, सोस्ने सुक्खा ओछ्यान बिछ्याउनुहोस्, र प्वाल वा भित्ताको फाटो खोल्नुहोस् जसले तातो-चिसो हावा बाख्राको टाउकोमाथिबाट निस्कोस् — अमोनियाको चुहाको बास्ना आउने गोठले आफैँ घोषणा गरिरहेको हुन्छ, चेलाको उचाइको हावा निमोनियाले चाहेकै हो भनेर। भीड इमानदार राख्नुहोस्: एक वयस्क बाख्रालाई करिब एकदेखि डेढ वर्ग मिटर, त्यति लामो दाना-ट्रफ कि कमजोर बाख्रा हरेक खानामा चिसो कुनामा नधकलियोस्, र पहिलो चिन्हमै बिरामीलाई राख्ने छुट्टै सुक्खा कुनो। कात्तिक-मंसिर र मनसुनका हप्ता — किसानले नयाँ बाख्रा घर ल्याउने बेला — नयाँ आउनेलाई दुई हप्ता छुट्टै राख्नुहोस्; बथानहरू नाक जोड्ने ठाउँ बजार नै हो।",
        },
        bullets: [
          { en: "Vaccines exist for pneumonic pasteurellosis where outbreaks repeat — ask the district vet about availability and timing.", np: "रोग बारम्बार फैलिने ठाउँमा पेस्चुरेलोसिसको खोप पाइन्छ — जिल्ला पशु चिकित्सकसँग उपलब्धता र समय सोध्नुहोस्।" },
          { en: "Colostrum is pneumonia insurance — kids that miss it are the first to sink each winter.", np: "खीर नै निमोनियाको बिमा हो — नखाएका चेला हरेक जाडो पहिले डुब्छन्।" },
          { en: "Never put a recovering goat straight back into the crowd's cold corner — finish recovery in the warm pen.", np: "सुधारिँदै गरेको बाख्रालाई भीडको चिसो कुनामा सिधै नफर्काउनुहोस् — तातो कुनामै निको होस्।" },
        ],
      },
      {
        heading: { en: "What to do the day you see it", np: "देखेकै दिन के गर्ने" },
        body: {
          en: "Move the goat out of wind and crowd, offer lukewarm water and palatable fresh browse, and take the temperature if you own a thermometer — a fever over forty is a veterinary matter, because the treatment that works is a correct antibiotic course at full dose and duration, which is a prescription decision. Under-dosing for two days — the common bazaar shortcut — kills the weaker bacteria and trains the stronger ones. Expect genuine improvement within two days of a proper course; a goat still feverish after seventy-two hours needs the vet's hands on it, not another bottle. Note every case on a simple shed calendar: three cases in one month tells you the shed, not the goats, is asking for repairs.",
          np: "बाख्रालाई हावा-भीडबाट छुट्याउनुहोस्, हल्का तातो पानी र मन पर्ने ताजो हरियो दिनुहोस्, र थर्मोमिटर भए ज्वरो नाप्नुहोस् — चालीसभन्दा माथिको ज्वरो पशु-चिकित्सकीय कुरा हो, किनभने काम गर्ने उपचार पूरा खुराक र पूरा अवधिको सही एन्टिबायोटिक हो, जो नुस्खा-निर्णय हो। दुई दिन आधा खुराक — बजारको सामान्य बाटो — कमजोर जीवाणु मारेर बलियालाई तालिम दिन्छ। सही कोर्स सुरु भएको दुई दिनभित्र साँचो सुधार आउनुपर्छ; तीन दिनपछि पनि ज्वरो भए अर्को बोतल होइन, चिकित्सकको हात चाहिन्छ। हरेक रोगी सातो गोठ-पात्रोमा टिप्नुहोस्: एक महिनामै तीन बिरामी भने बाख्रा होइन, गोठ नै मर्मत मागिरहेको हो।",
        },
      },
    ],
    tip: {
      en: "Walk into your goat shed and bend to kid height — if the air at your nose stings, their lungs are already paying for it. That single test finds most pneumonia sheds in Nepal.",
      np: "आफ्नो बाख्रा गोठमा ढोका खोलेर चेलाको उचाइमा झुक्नुहोस् — तपाईंको नाकमा हावाले चुहा मारे, तिनका फोक्सोले त्यसको बिल भरिरहेको छ। यही एउटै परीक्षणले नेपालका धेरैजसो निमोनिया-गोठ पत्ता लगाउँछ।",
    },
    sources: "Mannheimia haemolytica confirmed from pneumonic goats in Nepal (Rawat et al. 2019, PMC); clinical signs and colostrum link per Merck Veterinary Manual (bacterial bronchopneumonia in sheep and goats); morbidity ~57% in small-ruminant respiratory-disease reviews (Abera et al. 2023). Shed ventilation and stocking practice: standard small-ruminant husbandry guidance.",
    updated: "2026-09",
  },
  /* ═════════════════════ poultry ═════════════════════ */
  {
    id: "poultry-coccidiosis",
    categoryId: "poultry",
    title: { en: "Bloody droppings in the brooder: coccidiosis", np: "कलाउने डिब्बामा रगत मिसिएको बिट: कक्सिडियोसिस" },
    summary: {
      en: "The deadliest neighbour in every poultry house lives in the litter — one warm, wet day is all it needs, and vaccines and dry floors are the only lasting answers.",
      np: "कुखुरा घरको हरेक तलामा बस्ने सबैभन्दा खतरनाक छिमेकी ओछ्यानमै बस्छ — एक तातो, चिस्यान भरको दिन पुग्छ, र स्थायी उत्तर खोप र सुक्खा तला नै हुन्।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Cause", np: "कारण" }, value: { en: "Eimeria protozoa, species-specific", np: "आइमेरिया प्रोटोजोआ, प्रजाति-विशेष" }, note: { en: "7 species attack chickens, each its own spot", np: "७ प्रजातिले कुखुरा आक्रमण गर्छन्, आ-आफ्नै ठाउँमा" } },
      { label: { en: "Global cost", np: "विश्वव्यापी खर्च" }, value: { en: "> US$1.5–3 billion / year", np: "वार्षिक अर्ब डलरभन्दा माथि" }, note: { en: "losses plus prevention spend", np: "घाटा र रोकथाम खर्च जोडेर" } },
      { label: { en: "The trigger", np: "सुरुवात" }, value: { en: "wet litter + warmth", np: "चिस्यान तला + ताप" }, note: { en: "leaky drinkers, overcrowding", np: "चुहिने पानी, अति-भीड" } },
      { label: { en: "Where it hits", np: "आक्रमण स्थान" }, value: { en: "intestines; caeca in bloody form", np: "आन्द्रा; रगत रूपमा क्यासियम" }, note: { en: "droppings tell which", np: "बिटले नै बताउँछ" } },
    ],
    sections: [
      {
        heading: { en: "A parasite built for poultry floors", np: "कुखुरा तलाका लागि नै बनेको परजीवी" },
        body: {
          en: "Eimeria oocysts ride in droppings and can survive in litter for months, waiting for warmth and moisture to sporulate into the infective form. Birds peck everything, so a single shedding chick seeds the whole floor within days. Inside the gut the parasites multiply through several generations, tearing the intestinal lining — that damage is the disease: poor feed conversion first, then the chalky or bloody droppings, ruffled feathers, huddling under the brooder. Economic tallies put coccidiosis among the costliest diseases in world poultry, in the billion-dollar-plus range every year, because even mild outbreaks quietly tax feed efficiency across an entire flock that never looks sick.",
          np: "आइमेरियाका बीजाणु बिटमा सवार भएर तलामा महिनौँ बाँच्न सक्छन्, ताप र चिस्यानको बाटो हेरिरहन्छन्। कुखुराले सबै ठोक्छ, त्यसैले एउटा रोगी चल्लाले केही दिनमै पूरै तला दूषित पार्छ। आन्द्राभित्र परजीवी कयौँ पुस्ता गुणा हुँदै बढ्छन्, आन्द्राको भित्री छाल च्यात्दै — रोग भनेकै त्यही क्षति हो: पहिले दाना खाएर नबढ्नु, त्यसपछि सेतो वा रगत मिसिएको बिट, उड्याएको प्वाँख, ब्रुडरमुनि थुप्रिनु। आर्थिक हिसाबले कक्सिडियोसिस विश्वको कुखुरा व्यवसायको सबैभन्दा महँगो रोगहरूमा पर्छ, हरेक वर्ष अर्ब डलरभन्दा माथि — किनभने हल्का प्रकोपले पनि बाहिरबाट स्वस्थ देखिने पूरै बथानको दाना-क्षमतामा चुपचाप कर लगाइरहेको हुन्छ।",
        },
      },
      {
        heading: { en: "The wet-litter hour is the outbreak hour", np: "चिसो-तलाको घण्टा नै प्रकोपको घण्टा" },
        body: {
          en: "Nearly every outbreak tells the same story: a drinker dripped for two days, a rainstorm blew through the side curtain, the flock grew and the floor space did not. Dry litter is the single strongest control a farmer owns — stir it daily, top it up rather than waiting to change it, fix dripping drinkers the same hour, and keep density down as birds grow. Litter that cakes under the drinker line should be removed and replaced, not turned over, because turning buries the infective stage exactly where birds scratch. When you do change litter, take it off the farm — spreading old poultry litter on vegetable beds near the house is how many villages keep a steady cycle of coccidiosis going.",
          np: "प्रायः हरेक प्रकोपको कथा एउटै हुन्छ: पानी-भाँडो दुई दिन चुहियो, आँधीले पर्दा उडायो, बथान बढ्यो तर तला-स्थान बढेन। सुक्खा ओछ्यान किसानको हातमा रहेको सबैभन्दा बलियो नियन्त्रण हो — दिनहुँ हल्का खानुहोस्, फेर्नै कुर्तै गर्नुभन्दा माथिबाट थाप्दै जानुहोस्, चुहिने भाँडो त्यही घण्टा मर्मत गर्नुहोस्, र कुखुरा बढ्दै जाँदा भीड घटाइराख्नुहोस्। पानी-लाइनमुनि गाठो परेको ओछ्यान फालेर नयाँ राख्नुहोस्, पल्टाउनु होइन — पल्टाउँदा सङ्क्रामक अवस्था ठ्याक्कै कुखुराले कुर्लने ठाउँमा गाडिन्छ। ओछ्यान फेर्दा फार्मबाट बाहिरै लैजानुहोस् — पुरानो कुखुरा-बिट घरनजिकको तरकारी बारीमा छर्नु नै धेरै गाउँले कक्सिडियोसिसको चक्र चलाइरहने तरिका हो।",
        },
        bullets: [
          { en: "Chalky-white droppings and bloody droppings point to different Eimeria species — both are coccidiosis, but the bloody caecal form is the emergency.", np: "सेतो र रगत मिसिएका बिट फरक प्रजातिका आइमेरिया हुन् — दुवै कक्सिडियोसिस, तर रगत देखिने क्यासियम रूप आकस्मिक हो।" },
          { en: "Amprolium and sulfa drugs work when dosed correctly on water or feed — rotate families, and never stretch a course short.", np: "एम्प्रोलियम र सल्फा औषधि सही मात्रामा पानी वा दानामा दिँदा काम गर्छन् — परिवार फेर्दै जानुहोस्, र कोर्स छोटो कहिल्यै नकाट्नुहोस्।" },
          { en: "Vitamin A and K in the water help the gut wall heal alongside treatment — the classic supportive pair.", np: "उपचारसँगै पानीमा भिटामिन A र K दिँदा आन्द्राको घाउ पाक्न मद्दत गर्छ — यही पुरानो जोडी हो।" },
          { en: "Recovered birds are not fully recovered inside — grow them on clean floors or sell first, they stay lighter.", np: "निको भएका चराहरू भित्रभित्रै पूर्ण निको हुँदैनन् — सफा तलामा हुर्काउनुहोस् वा पहिले बेच्नुहोस्, तिनीहरू हल्का नै बस्छन्।" },
        ],
      },
      {
        heading: { en: "Prevention that pays for itself", np: "आफैँ खर्च उठाउने रोकथाम" },
        body: {
          en: "Two tools carry modern coccidiosis control, and both suit Nepal at different scales. For the village brooder raising small batches in the dry season, dry-litter discipline plus treating birds only on diagnosis is usually enough — and it keeps drug costs at zero in a good year. For commercial batches on used floors, the honest options are in-feed anticoccidials used on a rotation so resistance stays slow, or vaccination of day-old chicks with live vaccines that seed early immunity — trials comparing vaccinated and medicated flocks show comparable protection when the litter is kept dry afterwards, which is the whole trick: the vaccine needs a little exposure to mature. Never run anticoccidials and the live vaccine together; one kills the other's job.",
          np: "आजको कक्सिडियोसिस नियन्त्रणका दुई औजार छन्, र दुवै नेपालमा फरक-फरक स्तरमा मिल्छन्। सुक्तो मौसुममा सानो बैच उठाउने गाउँको ब्रुडरका लागि सुक्खा-तलाको अनुशासन र निदान भएपछि मात्र उपचार प्रायः पुग्छ — राम्रो वर्षमा औषधि-खर्च शून्यै राख्छ। पुरानो तलामा व्यावसायिक बैचका लागि इमानदार विकल्प: दानामा घुम्तीले प्रयोग हुने एन्टिकक्सिडियल, वा एक-दिने चल्लालाई जीवित खोप दिएर सुरुकै प्रतिरोध बसाल्नु — खोप दिएको र औषधि दिएको बथान तुलना गर्ने परीक्षणहरूले, पछि तला सुक्खा राखिएमा, उत्तिकै सुरक्षा देखाउँछन् — यही नै पूरो चाल हो: खोपलाई पाक्न थोरै सम्पर्क चाहिन्छ। एन्टिकक्सिडियल र जीवित खोप कहिल्यै सँगै नचलाउनुहोस्; एकले अर्कोको काम मार्छ।",
        },
      },
    ],
    tip: {
      en: "Pick up a handful of litter from three spots every morning and squeeze it — if any spot balls up like wet dough, that corner is where tomorrow's outbreak starts. Fix it today.",
      np: "बिहानै तीन ठाउँबाट ओछ्यानको मुठो समातेर निचोर्नुहोस् — कुनै ठाउँ चिसो रोटीझैँ गोलो भयो भने, भोलिको प्रकोप त्यही कुनोबाट सुरु हुन्छ। आजै मिसाउनुहोस्।",
    },
    sources: "Economic loss >US$1.5–3 bn/year (Küçükyilmaz et al. 2012; industry reviews up to £10.4 bn estimates); Eimeria biology and control per veterinary parasitology references; vaccination vs anticoccidial trials (Küçükyilmaz 2012, Tandfonline); dry-litter management: standard poultry-husbandry guidance.",
    updated: "2026-09",
  },
  /* ═════════════════════ crops ═════════════════════ */
  {
    id: "grain-storage-aflatoxin",
    categoryId: "crops",
    title: { en: "The poison you cannot see: storing maize safely", np: "नदेखिने विष: मकै सुरक्षित भण्डारण" },
    summary: {
      en: "Mouldy-looking grain is the least of it — the real danger is aflatoxin, a silent liver poison that forms inside kernels that still look clean, and that Nepal's law caps at 20 parts per billion.",
      np: "ढुसी देखिनु सानो कुरा हो — असली खतरा एफ्लाटक्सिन हो, सफा देखिने दानाभित्रै बन्ने चुपचाप कलेजोको विष, जसलाई नेपालको कानुनले २० बिलियनमा एक भागभन्दा माथि रोक्छ।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Nepal legal limit, food", np: "नेपालको कानुनी सीमा, खाना" }, value: { en: "20 ppb", np: "२० पिपिबी" }, note: { en: "aflatoxin total, food grains", np: "कुल एफ्लाटक्सिन, खाद्यान्न" } },
      { label: { en: "Safe storage moisture", np: "सुरक्षित चिस्यान" }, value: { en: "≤13%", np: "≤१३%" }, note: { en: "shelled maize, well dried", np: "खुला गेडा, राम्ररी सुकाएको" } },
      { label: { en: "Hermetic bags", np: "एयरटाइट झोला" }, value: { en: "≈34% lower aflatoxin", np: "एफ्लाटक्सिन ~३४% कम" }, note: { en: "vs control, Senegal field trial", np: "सेनेगलको फार्म-परीक्षणमा" } },
      { label: { en: "Worst finding, Nepal feed", np: "नेपाली दानामा भेटिएको चरम" }, value: { en: "AFB1 up to 1100 ppb", np: "AFB1 ११०० पिपिबीसम्म" }, note: { en: "in contaminated survey samples", np: "दूषित सर्वेक्षण नमुनामा" } },
    ],
    sections: [
      {
        heading: { en: "Why the cleanest-looking bag can still be poisoned", np: "सबैभन्दा सफा देखिने झोलामा पनि विष किन हुन्छ" },
        body: {
          en: "The Aspergillus mould makes aflatoxin inside the kernel, invisible to the eye, and it works hardest at the exact conditions a Nepali store room offers in Asar-Shrawan — grain above thirteen-percent moisture, warm air, and a sack pile with no airflow. Surveys in Nepal have found more than half of some maize sample sets over the legal limit, and the FAO's mycotoxin review found aflatoxin B1 at levels up to 1100 ppb in contaminated poultry feed — the kind that stunts broiler growth and kills ducklings. The toxin is chemically stable: milling, boiling and ordinary cooking do not destroy it, so what the store room allows in September, the family eats in February. Prevention is a drying-and-storage discipline, not a test you buy.",
          np: "एस्पर्जिलस ढुसीले गेडाभित्रै एफ्लाटक्सिन बनाउँछ, आँखाले देखिँदैन, र यो ठ्याक्कै असार-साउनमा नेपाली भण्डारले दिने अवस्थामा सबैभन्दा बढी मेहनत गर्छ — तेह्र प्रतिशतभन्दा माथिको चिस्यान, तातो हावा, र हावा नचल्ने गोडा-भरि बोरा। नेपालका सर्वेक्षणले केही मकै नमुनामध्ये आधाभन्दा बढी कानुनी सीमाभन्दा माथि पाएका छन्, र FAO को माइकोटक्सिन समीक्षाले कुखुरा दानामा ११०० पिपिबीसम्मको AFB1 भेट्यो — जसले ब्रोइलरको वृद्धि रोक्छ र चल्ला मार्छ। विष रसायनिक रूपमा स्थिर हुन्छ: पिस्ने, उमाल्ने र सामान्य पकाउने ले यो नष्ट हुँदैन, त्यसैले भदौमा भण्डारले छिराएको कुरा फागुनमा परिवारले खान्छ। रोकथाम सुकाउने-भण्डारणको अनुशासन हो, किन्ने परीक्षण होइन।",
        },
      },
      {
        heading: { en: "Drying is the whole game", np: "पूरै खेल सुकाउनुमै" },
        body: {
          en: "The mould needs moisture, so the battle is won on the drying floor before grain ever enters the store. Shell maize soon after harvest rather than piling cobs wet, sun-dry on mats or tarps — not straight on hot earth — turning it through the day, and test by the old field method: bite a kernel; it should crack with a sharp snap, not dent. Thirteen percent or below is the number the storage science keeps repeating. In muggy pre-monsoon weather when sun is short, a thin spread and a fan's airflow beat a thick pile in the shade, and any grain bought from the bazaar deserves a re-dry before storage, because you inherited its journey's moisture.",
          np: "ढुसीलाई चिस्यान चाहिन्छ, त्यसैले लडाइँ भण्डारभन्दा पहिले, सुकाउने फर्समै जितिन्छ। बाली काटेपछि गोडा नथुपारी चाँडै निकाल्नुहोस्, माटोमा होइन, चट्याङ वा सालमा घाममा सुकाउनुहोस् — दिनभर फर्काउँदै — र पुरानो तरिकाले जाँच्नुहोस्: गेडा दाँतले टोक्दा चुँडिने च्यात् सँग फुटोस्, दब्कोस्। तेह्र प्रतिशत वा त्योभन्दा तल — भण्डारण-विज्ञानले दोहोर्‍याइरहने सङ्ख्या यही हो। मनसुनअघिको चिसो गर्मीमा घाम छोटो हुँदा, छायामा बाक्लो थुप्रोभन्दा पातलो फिँजा र पंखाको हावा राम्रो, र बजारबाट किनेको अन्न भण्डारअघि फेरि सुकाउनैपर्छ — त्यसको यात्राको चिस्यान तपाईंले उत्तराधिकारमा पाएका हुन्छन्।",
        },
      },
      {
        heading: { en: "Storing it: bags, bins and bugs", np: "भण्डारण: बोरा, डिब्बा र कीरा" },
        body: {
          en: "Once dry, keep it dry. Hermetic — sealed-air — bags earned their place in field trials: Senegalese farm households using them measured about a third less total aflatoxin than controls, because grain at safe moisture, sealed from humid air and insects, stays out of the mould's working range. They cost more than woven sacks and repay it in saved grain. Cheaper steps still help a lot: a dunnage layer of bamboo or pallets under every sack, never against a mud or cement wall that sweats; small daily-use bags opened once a week instead of one big bag opened every evening — trials show repeated opening lets humidity cycle in; and grain stores best cool, so the north-side room beats the one baking under tin. Whatever the container, check monthly: warm spots, a musty nose, or insects moving mean that pile is working against you.",
          np: "सुकेपछि सुक्कै राख्नुहोस्। एयरटाइट — हावा-नछिर्ने — झोला फार्म-परीक्षणले आफ्नो ठाउँ बनाइसकेका छन्: सेनेगलका घर-परिवारले प्रयोग गर्दा नियन्त्रण समूहभन्दा करिब एक तिहाइ कम कुल एफ्लाटक्सिन नापियो, किनभने सुरक्षित चिस्यानको अन्न, चिसो हावा र कीराबाट बन्द भएपछि, ढुसीको काम गर्ने दायराबाटै बाहिर बस्छ। सामान्य बोराभन्दा यो महँगो छ, बचेको अन्नले भरिदिन्छ। सस्ता कदमले पनि धेरै फर्क पार्छ: हरेक बोरामुनि बाँस वा प्यालेटको तल, पसिने माटो-गारो वा सिमेन्ट भित्तामा कहिल्यै नटाँस्ने; हरेक साँझ ठूलो बोरा खोल्नुको सट्टा साप्ताहिक एकपटक खोलिने साना बोरा — परीक्षणले बारम्बार खोल्दा चिस्यान भित्रिरहने देखाउँछ; र अन्न जाडो कोठामा राम्रै बस्छ, टिनतले तातो कोठाभन्दा उत्तर-पट्टिको कोठा जित्छ। जुनसुकै भाँडो होस्, मासिक जाँच: तातो भाग, गन्ध, वा हिँडिरहेका कीरा भए त्यो थुप्रो तपाईंविरुद्ध काम गरिरहेको हुन्छ।",
        },
      },
      {
        heading: { en: "If grain goes to animals", np: "अन्न पशुलाई गएमा" },
        body: {
          en: "Animals are not a disposal system for damaged grain — dairy cattle tolerate more aflatoxin than poultry, but the toxin passes into milk as aflatoxin M1, which is exactly how human exposure travels through the family's own cow. Poultry are the most sensitive farm animals: contaminated feed suppresses immunity and growth long before anything looks like disease. Badly moulded kernels — discoloured, insect-damaged, broken — can be hand-sorted out and the rest fed in a limited share of the ration, but grain that smells musty belongs in the compost, not the trough. The cheapest health insurance on a mixed farm is the two-minute look-and-sniff of every batch before it reaches either the kitchen or the animals.",
          np: "पशु बिग्रेको अन्नको फोहोर-फाल्ने ठाउँ होइनन् — गाईले कुखुराभन्दा बढी एफ्लाटक्सिन थाहा पाउँछन्, तर विष दुधमा M1 बनेर सर्छ, र घरकै गाईबाट परिवारसम्म पुग्ने बाटो यही हो। कुखुरा सबैभन्दा संवेदनशील हुन्छ: दूषित दानाले रोग देखिनुभन्दा धेरै अघि नै प्रतिरोध र वृद्धि थिचिहाल्छ। खराब गेडा — रंग फेरिएका, कीराले खाएका, भाँचिएका — हातले छाटेर बाँकी राशनमा सीमित हिस्सामा खुवाउन सकिन्छ, तर गन्ध आउने अन्न कम्पोस्टमा जान्छ, ट्रफमा होइन। खेती-पशुपालन गरिने फार्मको सबैभन्दा सस्तो स्वास्थ्य-बिमा भनेको हरेक बैच भान्सा वा गोठ पुग्नुअघि गरिने दुई-मिनेटको हेराइ-सुँघाइ हो।",
        },
      },
    ],
    tip: {
      en: "Store this year's eating maize and the animals' share in separate bags from the first day — the batch that gets opened every evening gets damp by February, and it should never be the one the children eat from.",
      np: "यो वर्षको खाने मकै र पशुको भाग पहिलो दिनदेखि छुट्टाछुट्टै बोरामा राख्नुहोस् — हरेक साँझ खोलिने बोरा फागुनसम्ममा चिसो भइसक्छ, र त्यो कहिल्यै पनि बच्चाले खाने बोरा नहोस्।",
    },
    sources: "Nepal 20-ppb legal limit and >50% of samples over limits in surveys (Tufts pre/post-harvest aflatoxin assessment, Nepal); hermetic-bag effect ≈34% lower total aflatoxin (Prieto et al. 2019, Senegal RCT); repeated bag-opening effects (Tubbs et al. 2016, PMC); AFB1 up to 1100 ppb in contaminated Nepali poultry feed (FAO mycotoxin review); ≤13% storage moisture: standard post-harvest guidance.",
    updated: "2026-09",
  },
  /* ═════════════════════ other-livestock (new category, r12) ═════════════════════ */
  {
    id: "pig-farming-basics",
    categoryId: "other-livestock",
    title: { en: "Pig farming in Nepal: fast cycles, real rules", np: "नेपालमा सुँगुर पालन: छिटो चक्र, साँचा नियम" },
    summary: {
      en: "No other farm animal turns kitchen waste and hotel slop into cash as quickly — but pig money lives or dies on housing floors, worms and breeding discipline.",
      np: "भान्साको बाँकी र होटलको फोहोरलाई अरू कुनै पशुले यति छिटो नगद बनाउँदैन — तर सुँगुरको पैसा तलाभित्ता, कृमि र प्रजनन-अनुशासनमै जिउँछ वा मर्छ।",
    },
    readMinutes: 7,
    facts: [
      { label: { en: "National herd", np: "राष्ट्रिय बथान" }, value: { en: "≈1.1–1.3 million head", np: "करिब ११–१३ लाख वटा" }, note: { en: "grown >40% in a decade", np: "एक दशकमा ४०% भन्दा बढी" } },
      { label: { en: "Pork production", np: "सुँगुरको मासु" }, value: { en: "≈29,000 t / year", np: "वार्षिक करिब २९ हजार टन" }, note: { en: "demand rising with urban markets", np: "सहरी बजारसँगै माग बढिरहेको" } },
      { label: { en: "Farrow to market", np: "ब्याइदेखि बजार" }, value: { en: "7–8 months", np: "७–८ महिना" }, note: { en: "well-fed crossbreds, ~70–100 kg live", np: "राम्ररी खुवाएका सङ्कर, ~७०–१०० केजी" } },
      { label: { en: "Biggest documented parasite burden", np: "कागजमा भेटिने सबैभन्दा ठूलो कृमि" }, value: { en: "gut nematodes", np: "आन्द्राका कृमि" }, note: { en: "common in smallholder herds", np: "साना फार्मका बथानमा सामान्य" } },
    ],
    sections: [
      {
        heading: { en: "Where the pig fits on a Nepali farm", np: "नेपाली फार्ममा सुँगुरको ठाउँ कहाँ" },
        body: {
          en: "Pigs convert leftovers better than any ruminant, farrow twice a year with eight-to-twelve piglets, and reach market weight inside a year — which is why the national herd has grown by more than forty percent in a decade and pork output sits near thirty thousand tonnes a year. The same biology makes pigs unforgiving about sloppy housing: they are single-stomach animals, so worms and dirty floors hit them the way they hit poultry, not the way a buffalo shrugs. The farms that quietly make money run concrete or slatted floors, dry pens, and a fenced yard; the ones that struggle keep pigs on wet mud against the kitchen wall and wonder why piglets die each monsoon.",
          np: "बाँकी खानेकुरा सुँगुरले कुनै पनि रुमिनेन्टभन्दा राम्रो बदलिन्छ, वर्षको दुईपटक आठदेखि बाह्र सुँगुरका बच्चा फाल्छ, र वर्षभित्रै बजार-तौल पुग्छ — त्यही कारण राष्ट्रिय बथान एक दशकमा चालीस प्रतिशतभन्दा बढेर मासु उत्पादन करिब तीस हजार टन पुगेको छ। यही जीवविज्ञानले सुँगुरलाई लापरवाह गोठमा क्षमा गर्दैन: यो एक-पेट भएको जनावर हो, कृमि र फोहोर तलाले यसलाई कुखुराझैँ च्याप्छ, भैंसीझैँ झस्काउँदैन। चुपचाप पैसा कमाउने फार्ममा सिमेन्ट वा तार्चोको तला, सुक्खा बाडा र घेरिएको आँगन हुन्छ; घोट्लिनेहरू भान्साभित्ताको चिसो थुप्रोमा सुँगुर पालेर हरेक मनसुनमा बच्चा किन मर्छन् भनेर आश्चर्य मानिरहन्छन्।",
        },
      },
      {
        heading: { en: "Housing and floors", np: "गोठ र तला" },
        body: {
          en: "A workable pen needs a sloped concrete floor with a drain, a dry sleeping area roofed against rain, and a wallow or drip zone only in the blazing heat — pigs cannot sweat, so summer heat is a real welfare and fertility issue, but a permanently wet pen is a parasite nursery. Slatted floors over a pit make daily cleaning a ten-minute job and cut smell drastically for village relations. Boars, dry sows and fattening pigs can share yards, but a sow about to farrow wants a quiet, clean farrowing corner with a rail around the wall so she cannot lie on her piglets — crushing is the number-one piglet killer in the first three days, and a simple creep corner with a heat lamp or dry straw saves most of those lives.",
          np: "चल्ने-खाने बाडालाई ढलो गरेको सिमेन्ट तला र निकास, पानी नबस्ने छानेर गरेको सुक्खा सुत्ने भाग, र घाम अझै चर्कँदा मात्र लोतो वा दिपको स्थान चाहिन्छ — सुँगुरले पसिना झार्न सक्दैन, त्यसैले गर्मी साँचो सुविधा र प्रजननको कुरा हो, तर सधैँ चिसो बाडा परजीवीको नर्सरी हो। खाल्डीमाथि तार्चोको तलाले दिनको सफाइ दस-मिनेटको काम बनाउँछ र गाउँसँगको नाताका लागि गन्ध आधामा काट्छ। भाले, सुकेकी ब्याइ र बोसाउने सुँगुर एउटै आँगनमा राख्न सकिन्छ, तर ब्याउन लागेकी सुँगुरलाई शान्त-सफा कुनो र भित्तावरिपरि रेल चाहिन्छ जसले ऊ आफ्नै बच्चामाथि सुत्न नसकोस् — पहिलो तीन दिनमा बच्चा मर्ने नम्बर-एक कारण थिचिनु नै हो, र सुक्खा पराल वा बत्ती भएको सानो creep कुनो तीमध्ये धेरै जसोलाई बचाउँछ।",
        },
      },
      {
        heading: { en: "Feeding what the neighbourhood throws away", np: "छिमेकले फालेको कुरा खुवाउने" },
        body: {
          en: "The economics of village pig-keeping ride on getting kitchen waste, hotel slop, brewery residue and vegetable-market rejects cheaply — but slop has to be boiled before feeding, which kills parasite eggs and keeps trichinella and other meat-borne parasites out of the cycle. Balance the free stuff with what it lacks: restaurant rice and dal are energy-rich and protein-poor, so a daily supplement of milled concentrate, soybean or even home-grown maize-and-mustard-cake mix pushes growth into the profitable range. Pigs on a shallow protein plane eat the same food and finish months late — the invisible interest the farm pays for cheap feed. Clean water always, and mineral-brick access in the yard.",
          np: "गाउँको सुँगुर-अर्थतन्त्र भान्साको बाँकी, होटलको झुस, जाँड-भट्टाको डाँठ र सब्जी-बजारको फालेको तरकारी सस्तै जुटाइरहनमा चल्छ — तर झुस उमालेर मात्र खुवाउनुपर्छ, जसले कृमिका फुल सत्याउँछ र ट्रिचिनेल्ला जस्ता मासुबाट सर्ने परजीवी चक्रबाहिर राख्छ। निःशुल्कका चीजले नभेट्ने कुरा थप्नुहोस्: होटलको भात-दाल ऊर्जाले भरिएका, प्रोटिनले खाली हुन्छन्, त्यसैले दिनको पिसेको दाना, सोयाबिन वा घरै उब्जाएको मकै-तोरी-पिँडीको मिश्रणले वृद्धिलाई नाफाको दायरामा तान्छ। हल्का प्रोटिनमा बसेको सुँगुरले उही खाना खाएर महिनौँले पछि पुग्छ — सस्तो चाराको अदृश्य ब्याज फार्मले तिरिरहेको हुन्छ। सधैँ सफा पानी, र आँगनमा खनिज-इटाको पहुँच।",
        },
        bullets: [
          { en: "Boil all slop for 10–15 minutes — feeding raw hotel waste is how worm burdens and tapeworm cycles persist in village herds.", np: "सबै झुस १०–१५ मिनेट उमाल्नुहोस् — काँचो होटल-फोहोर खुवाउँदा नै गाउँका बथानमा कृमि र फिँजाको चक्र टुट्दैन।" },
          { en: "Deworm the whole herd every quarter with a rotation — documented gut-nematode burdens are the classic hidden drag on village growth rates.", np: "पूरै बथानलाई त्रैमासिक रूपमा औषधि फेर्दै कृमिनाशक दिनुहोस् — कागजमा भेटिने आन्द्राका कृमि नै गाउँको वृद्धि-दरमा लुकेको पुरानो बोझ हो।" },
          { en: "Two sound breeding boars serve a village better than every household keeping its own — line-bred village pigs lose litter size year by year.", np: "हरेक घरले आ-आफ्नै भाले पाल्नुभन्दा गाउँमा दुई-तीन राम्रा भाले राख्दा राम्रो — नजिकैका नाताभित्रै पालिँदा वर्षेनि बच्चाको सङ्ख्या घट्छ।" },
          { en: "Iron injection or soil access for piglets prevents the classic anaemia of concrete-farrowed litters.", np: "सिमेन्टमा ब्याएका बच्चालाई फलामको सुई वा माटोको पहुँचले पुरानो रक्तअल्पता रोक्छ।" },
        ],
      },
      {
        heading: { en: "Health calendar and marketing", np: "स्वास्थ्य पात्रो र बजार" },
        body: {
          en: "Classical swine fever is the disease that empties pens overnight — where outbreaks occur, vaccination through the district livestock office is the difference between a hard year and a wipeout, and newcomers bought at haat bazaars should be quarantined a fortnight before joining the yard. Market smart: pig prices swing with festivals and with the feed year, so time farrowing seven-eight months before your target selling window, sell at the weight buyers pay best for rather than feeding sentimental extra weeks, and keep simple farrow-and-feed records so you know which sow actually earns her place. Pig manure, well composted, is gold for the vegetable beds and the biogas plant — a closed loop the best pig farms run without thinking about it.",
          np: "क्लासिकल स्वाइन फिभर रातैमा बाडा खाली बनाउने रोग हो — प्रकोप आउने ठाउँमा जिल्ला पशुसेवा कार्यालयबाट खोप गर्नु गाह्रो वर्ष र पूरै सखाप बीचको फर्क हो, र हाटबजारबाट किनेका नयाँ सुँगुरलाई आँगनमा मिसाउनुअघि दुई हप्ता छुट्टै राख्नुहोस्। बुद्धिमानीसाथ बेच्नुहोस्: सुँगुरको भाउ चाडपर्व र चारा-वर्षसँगै ठाडिन्छ, त्यसैले बेच्ने लक्ष्यभन्दा सात-आठ महिना अघि ब्याउन लगाउनुहोस्, क्रेताले राम्रो भाउ तिर्ने तौलमै बेच्नुहोस्, भावनाका थप हप्ता नखुवाउनुहोस्, र सातो ब्याउने-खुवाउने अभिलेख राख्नुहोस् जुन सुँगुरीले साँच्चै आफ्नो ठाउँ कमाउँछे भन्ने थाहा होस्। सुँगुरको गोबर राम्ररी कम्पोस्ट भएपछि तरकारी बारी र बायोग्यासका लागि सुन हो — राम्रा सुँगुर फार्मले सोचेनन् जस्तै चलिरहेको बन्द चक्र।",
        },
      },
    ],
    tip: {
      en: "Before buying a gilt, walk the seller's pen at feeding time: bright pigs that rush the trough, smooth coats, no coughing from the far corner. Ten minutes of looking buys out a season of treating.",
      np: "ब्याउने पोथी किन्नुअघि खुवाउने बेला बेच्नेको बाडामा पस्नुहोस्: दाना-ट्रफमा दौडिरहेका चम्किला सुँगुर, चम्किलो छाला, परको कुनोबाट खोकी नआउने। दस मिनेटको हेराइले उपचारको पूरै मौसुम किनिदिन्छ।",
    },
    sources: "Herd growth >43%/decade and pork ≈28,579 t (Kalanki, Nepalese Journal of Agricultural Sciences); pig population series from MoALD/DLS livestock statistics (≈870,000 head, MoLD 2017; subsequent census growth); GI-nematode burden in smallholder swine (NepJAS/peer surveys, south-central Nepal); classical swine fever and husbandry guidance: standard swine veterinary references.",
    updated: "2026-09",
  },
  {
    id: "carp-polyculture",
    categoryId: "other-livestock",
    title: { en: "Fish farming: six carps in one pond", np: "माछा पालन: एउटै पोखरीमा छ माछा" },
    summary: {
      en: "Terai ponds grow more food per ropani of water than almost any land crop — if the six carp species are stocked in the right shares and fed like livestock, not left to luck.",
      np: "तराईका पोखरीले जग्गाका प्रायः कुनै पनि बालीभन्दा बढी खाना उब्जाउँछन् — छ माछा सही अनुपातमा राखेर र कुखुरा-पशुझैँ खुवाएर, भाग्यमा छाडेर होइन।",
    },
    readMinutes: 6,
    facts: [
      { label: { en: "Aquaculture share of fish output", np: "माछा उत्पादनमा गरारीको हिस्सा" }, value: { en: "≈80% (≈58,400 t)", np: "करिब ८०% (~५८,४०० टन)" }, note: { en: "of national fish production", np: "राष्ट्रिय माछा उत्पादनको" } },
      { label: { en: "Top species", np: "अगाडिको प्रजाति" }, value: { en: "mrigal ≈29% of output", np: "मृगाल उत्पादनको ~२९%" }, note: { en: "in the national species mix", np: "राष्ट्रिय प्रजाति-मिश्रणमा" } },
      { label: { en: "The six carps", np: "छ कार्प" }, value: { en: "rohu, mrigal, catla + silver, grass, common", np: "रोहु, मृगाल, बाम + सिल्भर, घाँस, कमन" }, note: { en: "each feeds in its own water layer", np: "आ-आफ्नै पानी-तहमा खान्छन्" } },
      { label: { en: "Where it thrives", np: "कहाँ फस्टाउँछ" }, value: { en: "Terai ponds, 26–32 °C water", np: "तराईका पोखरी, २६–३२ डिग्री पानी" }, note: { en: "Chitwan leads district production", np: "चितवन जिल्लामा अगाडि" } },
    ],
    sections: [
      {
        heading: { en: "Why six species beat one", np: "छ प्रजातिले एकलाई किन जित्छ" },
        body: {
          en: "A pond is a three-dimensional farm, and each carp owns a different floor of it: grass carp mows the plants at the edge, silver carp filters algae in the sunlit middle, rohu and mrigal comb the bottom mud, catla works the open surface, and common carp rummages through the sludge like a tractor. Stocked together, the six clean the pond thoroughly instead of competing for one spot, eat each other's leftovers, and turn one pond into three overlapping harvests. That is Nepali carp polyculture — the system behind roughly four-fifths of the country's fish output, with the mrigal alone carrying about twenty-nine percent of production, and Chitwan's ponds growing rohu, silver, bighead, common, grass and Mrigal side by side the way a good kitchen runs its stove.",
          np: "पोखरी तीन-आयामको खेत हो, र हरेक कार्पको आफ्नै तला छ: घाँस-माछाले किनाराको विरुवा काट्छ, सिल्भरले घाम-परेको बीचको पानीको शैवाल छान्छ, रोहु-मृगालले पुछारको इँटा रँगाउँछन्, बामले खुला सतह चाट्छ, र कमनले ट्र्याक्टरझैँ इँटामा हालो गर्छ। सँगै राख्दा छैटैले पोखरी एकैपटक सफा गर्छन्, एक-अर्काको बाँकी खान्छन्, र एउटा पोखरी तीन ओइस्तै कटाइ बनाउँछन्। नेपाली कार्प पोलिकल्चर यही हो — देशको करिब चार-पाँचौँ भाग माछा यही प्रणालीले आउँछ, मृगाल एक्लैले करिब उन्नाइस प्रतिशत बोकेको छ, र चितवनका पोखरीमा रोहु, सिल्भर, बिगहेड, कमन, घाँस र मृगाल राम्रो भान्साले चुल्हो चलाएझैँ सँगै चल्छन्।",
        },
      },
      {
        heading: { en: "The pond year", np: "पोखरीको वर्ष" },
        body: {
          en: "The cycle starts when water warms — fingerlings go in through spring, grow hard through the monsoon's warm months, and are netted or drained out before the cold slows everything. Feed like a farmer, not a spectator: rice bran and mustard-oil cake, broadcast twice a day from the same bank at the same hours so fish learn the call, with grass clippings thrown in for the grass carp that will mow them down within the hour. Watch the pond breathe at dawn — fish gulping at the surface before sunrise means the night's oxygen ran short; ease off feeding for a day, let fresh water in, and if it repeats, thin the stock. Growth you can verify: pull a seine net monthly, weigh a few, and write the numbers — the farmers who weigh monthly are the ones who harvest on schedule.",
          np: "चक्र पानी तात्दै सुरु हुन्छ — चारामा भुरा राख्दा वसन्तदेखि सुरु भएर मनसुनका तातो महिनामा जोडले बढ्छन्, र जाडोले सबै ढिलो बनाउनुअघि जाल वा सुकाएर निकालिन्छ। दर्शक होइन, किसानझैँ खुवाउनुहोस्: चामलको कोटे र तोरीको पिँडी, दिनको दुईपटक उही किनाराबाट उही घण्टामा छर्नुहोस् जसले माछाले बोलाइ चिनोस्, र घाँस-माछाका लागि काटेको घाँस फाल्नुहोस् जुन घण्टैभित्र मााछाले काटिहाल्छ। बिहान उज्यालो हुनुअघि पोखरीले सास फेरेको हेर्नुहोस् — माछा सतहमा हाउ भन्दै गर्नु रातको अक्सिजन छोटो परेको हो; एक दिन खुवाउने कटौती गर्नुहोस्, ताजा पानी छाड्नुहोस्, र दोहोर्‍याए बथान पातलो बनाउनुहोस्। बढेको तौलेरै जाँच्न सकिन्छ: महिनैमा जाल तानेर केही माछा तौल्नुहोस्, अंक लेख्नुहोस् — महिनैमा तौल्ने किसान नै तालिकामै कटाउने हुन्छन्।",
        },
        bullets: [
          { en: "Never stock wild-caught tiny fish with pond fingerlings — predators and disease travel in the bucket.", np: "जंगली भेटिएका साना माछा पोखरीका भुरासँग कहिल्यै नमिसाउनुहोस् — बाला र रोग त्यही बाल्टिनमै यात्रा गर्छन्।" },
          { en: "Lime the pond before each new cycle at the extension dose for your soil — it knocks back parasites and steadies the water chemistry.", np: "नयाँ चक्रअघि हरेकपटक आफ्नो माटोको सल्लाह-अनुसार चुन राख्नुहोस् — यसले परजीवी फर्काउँछ र पानीको रसायन थिरो राख्छ।" },
          { en: "Dawn surfacing for several mornings in a row is the pond's loudest alarm — act on it the first day.", np: "लगातार कयौँ बिहान सतहमा आउनु पोखरीको सबैभन्दा ठूलो साइरन हो — पहिलो दिनै काम गर्नुहोस्।" },
          { en: "Keep a feeding-and-weighing notebook: ponds with written records consistently outgrow ponds run on memory.", np: "खुवाउने-तौल्ने कापी राख्नुहोस्: लेखखाता भएका पोखरी सम्झनामा चलेकाभन्दा सधैँ अगाडि बढ्छन्।" },
        ],
      },
      {
        heading: { en: "Sharing water with the farm", np: "फार्मसँग पानी बाँड्ने" },
        body: {
          en: "The strongest Terai systems run the pond as part of the farm's plumbing: duck manure over the water feeds the algae the silver carp filter, pond-bottom mud carted to the vegetable beds returns every borrowed nutrient, and the pond bank grows banana and taro on the same water seep. Even the mistakes recycle — overfed cake becomes bottom fertility for next cycle's common carp. What does not fit the farm loop is poison: pesticides sprayed uphill, detergent washing into the shallows, or a diesel spill at the bank will undo a season in one afternoon, so the buffer strip of grass around the pond is as much insurance as the fish inside it.",
          np: "तराईका बलिया प्रणालीले पोखरीलाई फार्मको प्लम्बिङकै भाग बनाएर चलाउँछन्: हाँसको गोबर पानीमा रगर पुर्‍याएर सिल्भर माछाले छान्ने शैवाल पाल्छ, पुछारको इँटा तरकारी बारीमा गाडेर सापटी लिएका पोषक फिर्ता आउँछन्, र पोखरीको किनार उही चुहाउने पानीमा केरा-पिँडु हुर्काउँछ। गल्ती समेत घुम्छन् — बढी हालेको पिँडी पुछारको उर्वरता बनेर अर्को चक्रका कमन माछालाई खान्छ। फार्मको चक्रमा नमिल्ने कुरा विष हो: माथि छरिएको कीटनाशक, खेलमा बगेको साबुन, वा किनारमा खन्याइएको डिजेलले एक दिनैमा पूरै मौसुम फाल्छ, त्यसैले पोखरी वरिपरिको घाँसको पट्टी भित्रका माछा जत्तिकै बिमा हो।",
        },
      },
    ],
    tip: {
      en: "Call the fish the same way every feed — a splash of water, a knock on the bucket, always from the same corner. Trained fish come to the call, and feeding response is the earliest disease and water-quality alarm you will ever get for free.",
      np: "हरेक खुवाउँदा माछालाई उही तरिकाले बोलाउनुहोस् — पानीको छपक, बाल्टिनमा टोकाइ, सधैँ उही कुनोबाट। अभ्यास गरेका माछा बोलाइमा आउँछन्, र खानमा देखिने उत्साह नै रोग र पानीको गुणस्तरको सबैभन्दा पहिलो, निःशुल्क चेतावनी हो।",
    },
    sources: "Aquaculture ≈58,433 t ≈80.25% of fish production; mrigal top species at 29.2% (ResearchGate 2021 review of Nepali aquaculture); Chitwan species mix — silver, bighead, rohu, naini/catla, common, grass carp (Sharma 2018, Economics of fish production, Chitwan); six-species polyculture practice: NARC/Fisheries Directorate extension system.",
    updated: "2026-09",
  },
];

/**
 * NEPAL FARMING CALENDAR — the crop & livestock year in three belts.
 *
 * Every entry is placed from verified practice windows:
 *  · Rice — transplanting centres on Asar 15 (late June–mid July); harvest
 *    Aswin–Kartik (Oct–Nov) (Nepali farming calendars; hananoie Nepal).
 *  · Maize — spring maize sown Feb–Mar in the Terai; main-season hill
 *    maize Apr–May; harvest Aug–Sep (krishisuchana maize guide; Asian
 *    maize seasons).
 *  · Wheat — sown Mangsir–Poush (Nov–Dec), ~110–130 day crop, harvested
 *    Fagu–Chaitra (Mar–Apr) (wheat cultivation guides; Adhikari 2021).
 *  · FMD/HS vaccination — DLS biannual campaign rounds (pre-monsoon
 *    Jestha–Asar and pre-winter Kartik–Mangsir); the site's own vaccine
 *    tool uses the same 6-month interval.
 *  · Khasi finishing for Dashain — buying/finishing typically starts
 *    Shrawan–Bhadra (see the KB khasi-fattening-dashain article).
 *  · Fodder slips & fodder-tree cutings — best planted with the monsoon
 *    onset in Asar; first big cut late Bhadra–Ashwin.
 *  · Fish ponds — pre-stocking pond prep in spring, stocking with warm
 *    water, harvest before cold (see the carp-polyculture article).
 *  · Winter calf care & goat pneumonia watch (cold, damp sheds), summer
 *    heat-stress season for poultry and buffalo.
 */

export type CalKind = "sow" | "harvest" | "livestock" | "fish" | "market" | "storage";

export interface CalEntry {
  kind: CalKind;
  text: { en: string; np: string };
  /** Optional KB article deep-link id (without /knowledge/ prefix). */
  article?: string;
}

export interface CalMonth {
  /** 1-12 Gregorian month number. */
  greg: number;
  en: string;
  np: string;
  /** Nepali (Bikram Sambat) month that covers most of this Gregorian month. */
  bs: string;
  terai: CalEntry[];
  midhills: CalEntry[];
  highhills: CalEntry[];
}

export const CAL_KIND_META: Record<CalKind, { en: string; np: string; icon: string }> = {
  sow: { en: "Sow / plant", np: "रोपाइँ / बीउ", icon: "sprout" },
  harvest: { en: "Harvest", np: "कटाई", icon: "wheat" },
  livestock: { en: "Livestock", np: "पशुपालन", icon: "heart" },
  fish: { en: "Fish pond", np: "माछा पोखरी", icon: "fish" },
  market: { en: "Market / festival", np: "बजार / चाडपर्व", icon: "store" },
  storage: { en: "Store & preserve", np: "भण्डारण", icon: "box" },
};

export const BELTS: { id: "terai" | "midhills" | "highhills"; en: string; np: string; blurb: { en: string; np: string } }[] = [
  { id: "terai", en: "Terai & inner Tarai", np: "तराई तथा भित्री मधेश", blurb: { en: "Warm plains — rice–wheat–maize belts, fish ponds, buffalo dairies", np: "तातो मैदान — धान-गहुँ-मकै पट्टी, माछा पोखरी, भैंसी डेयरी" } },
  { id: "midhills", en: "Mid hills", np: "मध्य पहाड", blurb: { en: "The maize–millet belt, goats, dairies and home gardens", np: "मकै-कोदो पट्टी, बाख्रा, डेयरी र गह्रां बारी" } },
  { id: "highhills", en: "High hills & mountains", np: "उच्च पहाड तथा हिमाल", blurb: { en: "Cold valleys — potatoes, buckwheat, transhumant herds", np: "चिसो उपत्यका — आलु, फापर, हिँडेर चराउने बथान" } },
];

export const FARM_CALENDAR: CalMonth[] = [
  {
    greg: 1, en: "January", np: "जनवरी", bs: "माघ",
    terai: [
      { kind: "livestock", text: { en: "Irrigate wheat and mustard — the Magh watering decides grain fill.", np: "गहुँ र तोरीमा पानी — माघको सिँचाइले दाना भर्ने कुरा तय गर्छ।" }, article: "wheat-winter-crops" },
      { kind: "harvest", text: { en: "Winter vegetables (cauliflower, cabbage, radish) head to market on the dry-road weeks.", np: "जाडो तरकारी (काउली, बन्दा, मूला) सुक्खा-बाटोका हप्तामा बजार जान्छ।" } },
      { kind: "fish", text: { en: "Feed fish lightly in cool water; harvest table fish before the coldest weeks slow growth.", np: "चिसो पानीमा माछालाई हल्का खुवाउनुहोस्; चिसो हप्ता चाँडै नआउँदै खाने माछा काट्नुहोस्।" }, article: "carp-polyculture" },
      { kind: "livestock", text: { en: "Buffalo feel the cold — deep dry bedding and night shelter keep milk from dipping.", np: "भैंसीलाई चिसो लाग्छ — बाक्लो सुक्खा ओछ्यान र रातको आश्रयले दुध नझर्न दिन्छ।" }, article: "dairy-buffalo-feeding" },
    ],
    midhills: [
      { kind: "livestock", text: { en: "Frost nights: shut the goat shed's wind side, open the top for air — pneumonia watches for cold+crowd.", np: "तुसारोको रात: बाख्रा गोठको हावाको पट्ट बन्द, माथि खुला — निमोनियाले चिसो+भीड खोज्छ।" }, article: "goat-pneumonia" },
      { kind: "livestock", text: { en: "Wheat and barley top-dress with the first soil-moisture after Maghe Sankranti.", np: "माघे सङ्क्रान्तिपछि पहिलो चिस्यानमा गहुँ-जौमा माथिल्लो मल।" } },
      { kind: "storage", text: { en: "Urea-treat this year's rice straw in the slack days — three sealed weeks make a better feed for spring.", np: "फुर्सदका दिन यो वर्षको पराला युरियाले उपचार गर्नुहोस् — तीन हप्ता सिल गरे वसन्तको राम्रो चारा तयार।" }, article: "urea-treated-straw" },
      { kind: "harvest", text: { en: "Citrus and late mandarin move to market; mulch the trees after.", np: "सुन्तला-निबुवा बजार पुग्छ; पछि रुखको गुरु छर्कनुहोस्।" } },
    ],
    highhills: [
      { kind: "livestock", text: { en: "Snowline feeding: hay and straw to stock yards; carry feed before passes close.", np: "हिम-गर्खा खुवाइ: हे-पराला गोठमा; बाटो थुनिनुअघि चारा पुर्‍याउनुहोस्।" } },
      { kind: "livestock", text: { en: "Protect stored potato seed from frost — pile indoors on straw, not on stone floors.", np: "बीउ आलु तुसारोबाट बचाउनुहोस् — भित्रै परालमा थुप्रो, ढुङ्गाको तल होइन।" } },
      { kind: "sow", text: { en: "In warm pockets, winter barley and rye go in before the ground freezes hard.", np: "तातो खाल्डोमा, माटो कडा जम्नुअघि जौ र रायो रोप्नुहोस्।" } },
    ],
  },
  {
    greg: 2, en: "February", np: "फेब्रुअरी", bs: "फागुन",
    terai: [
      { kind: "sow", text: { en: "SPRING MAIZE window opens — sow Feb–Mar for the pre-monsoon crop.", np: "वसन्त मकैको झ्याल खुल्छ — फागुन-चैतमा रोप्नुहोस्।" }, article: "maize-nepal" },
      { kind: "harvest", text: { en: "Potato harvest and mustard ripening; sun-dry grain to ≤13% before storing.", np: "आलु काटाई र तोरी पाक्ने बेला; अन्न १३% भन्दा कम सुकाएर मात्र भण्डार्नुहोस्।" }, article: "grain-storage-aflatoxin" },
      { kind: "livestock", text: { en: "Deworm working animals before the heavy spring field season begins.", np: "वसन्तको गह्रां खेती सुरु हुँदै गर्दा गर्ने पशुलाई कृमिनाशक दिनुहोस्।" }, article: "deworming-parasites" },
      { kind: "fish", text: { en: "Dry and lime the pond bottom for the new cycle — fingerlings arrive with warmth.", np: "नयाँ चक्रका लागि पोखरी सुकाएर चुन राख्नुहोस् — तातोसँगै भुरा आउँछन्।" }, article: "carp-polyculture" },
    ],
    midhills: [
      { kind: "sow", text: { en: "Raise vegetable nurseries — tomato, chili, brinjal seedlings for spring transplanting.", np: "तरकारीको बियार उठाउनुहोस् — गोलभेडा, खुर्सानी, भन्टा वसन्तमा रोप्न।" }, article: "offseason-vegetables" },
      { kind: "livestock", text: { en: "Lice and ticks wake with the warmth — dust or dip small ruminants.", np: "तातोसँगै उकुस-मासु ब्यूँझन्छन् — बाख्रा-भेडालाई औषधि छर्नुहोस् वा डुबाउनुहोस्।" } },
      { kind: "harvest", text: { en: "Last mustard and chickpea off the fields; repair bunds before the rains.", np: "खेतबाट तोरी-चनाको अन्तिम कटाई; पानी आउनुअघि बाँध मर्मत।" } },
    ],
    highhills: [
      { kind: "sow", text: { en: "In lower pockets, spring wheat and potato planting starts as frost loosens.", np: "तल्लो खाल्डोमा तुसारो ढिलो हुँदै गर्दा वसन्त गहुँ-आलु रोपाइँ सुरु।" } },
      { kind: "livestock", text: { en: "Buy replacement breeding stock while trails are dry and animals travel well.", np: "बाटो सुक्खो हुँदा प्रजननका लागि पशु किन्नुहोस् — यात्रा सजिलो हुन्छ।" } },
    ],
  },
  {
    greg: 3, en: "March", np: "मार्च", bs: "चैत",
    terai: [
      { kind: "sow", text: { en: "Spring maize and late-spring rice in warm pockets; top-dress the early maize.", np: "वसन्त मकै र तातो खाल्डोमा वसन्त धान; चाँडै रोपिएको मकैमा माथिल्लो मल।" } },
      { kind: "harvest", text: { en: "Mustard threshing finishes — press oil before humidity returns.", np: "तोरीको झाराइ सकिन्छ — चिसो फर्किनुअघि तेल निकाल्नुहोस्।" } },
      { kind: "livestock", text: { en: "Buffalo feel the first heat — plan shade and water points before Jestha.", np: "भैंसीलाई पहिलो गर्मी लाग्न थाल्छ — जेठभन्दा अघि छाया र पानीको ठाउँ मिलाउनुहोस्।" }, article: "dairy-buffalo-feeding" },
      { kind: "fish", text: { en: "Fill ponds, grow natural food with dung-and-lime, order fingerlings.", np: "पोखरी भर्नुहोस्, गोबर-चुनले प्राकृतिक खाना पाल्नुहोस्, भुरा मगाउनुहोस्।" }, article: "carp-polyculture" },
    ],
    midhills: [
      { kind: "sow", text: { en: "Transplant vegetable seedlings; sow cucumber, squash, gourds with pre-monsoon showers.", np: "तरकारीको बियार रोप्नुहोस्; पूर्व-मनसुनको झरीसँग काँक्रा, फर्सी, चिचिण्डा रोप्नुहोस्।" } },
      { kind: "livestock", text: { en: "Trim hooves and clean sheds before tethering season — feet suffer in wet spring.", np: "बाँध्ने मौसुमअघि खुट्टा काटेर गोठ सफा — चिसो वसन्तमा खुट्टा दुख्छ।" } },
      { kind: "harvest", text: { en: "Winter fodder oats and vetch cut before flowering for best quality.", np: "जाडो चारा जौ-बिच्छी फुल्नुअघि काट्नुहोस् — गुणस्तर बढी हुन्छ।" }, article: "fodder-systems-nepal" },
    ],
    highhills: [
      { kind: "sow", text: { en: "Potato planting main window in the high valleys; buckwheat follows in cold pockets.", np: "उच्च उपत्यकामा आलु रोपाइँको मुख्य बेला; चिसो खाल्डोमा फापर पछ्याउँछ।" } },
      { kind: "livestock", text: { en: "Shearing and herd-health checks before animals climb to spring pastures.", np: "वसन्तका चराउने थलो चढ्नुअघि भेडाको उन झार्नु र स्वास्थ्य जाँच्नुहोस्।" } },
    ],
  },
  {
    greg: 4, en: "April", np: "अप्रिल", bs: "बैशाख",
    terai: [
      { kind: "sow", text: { en: "Summer vegetables in; jute and sugarcane interculture; keep nurseries watered.", np: "गर्मी तरकारी रोप्नुहोस्; पाट-उखुको गोडमेल; बियारलाई पानी दिइराख्नुहोस्।" } },
      { kind: "livestock", text: { en: "Heat stress season opens — THI crosses the alert line; shade, water, midday rest.", np: "गर्मी-तनावको मौसुम सुरु — THI चेतावनी रेखा पार गर्छ; छाया, पानी, दिउँसोको आराम।" }, article: "dairy-buffalo-feeding" },
      { kind: "market", text: { en: "Dig early potatoes for the Baisakh price window before the flood of main crop.", np: "मुख्य बाली आउनुअघि बैशाखको भाउ-झ्यालमा चाँडै आलु काट्नुहोस्।" } },
    ],
    midhills: [
      { kind: "sow", text: { en: "MAIN HILL MAIZE sowing window (Apr–May) — the rainfed crop that feeds the slopes.", np: "पहाडको मुख्य मकै रोपाइ झ्याल (बैशाख-जेठ) — ढालोहरू खुवाउने बाली।" }, article: "maize-nepal" },
      { kind: "livestock", text: { en: "Plant fodder slips and cuttings NOW so roots catch the monsoon — banana, napier, broom grass.", np: "अहिले नै चाराको डाँठ-गाँस रोप्नुहोस् जसले जरा मनसुनमा समातोस् — केरा, नेपियर, अमरिसो।" }, article: "fodder-systems-nepal" },
      { kind: "harvest", text: { en: "Wheat harvest begins in the lower mid-hills — dry, thresh, store at 13% or below.", np: "तल्लो मध्य पहाडमा गहुँ कटाई सुरु — सुकाएर, झारेर, १३% भित्रकै भण्डार्नुहोस्।" }, article: "grain-storage-aflatoxin" },
    ],
    highhills: [
      { kind: "livestock", text: { en: "Move herds to spring pastures as snow retreats; count and treat for worms after the move.", np: "हिउँ फर्किँदै गर्दा बथान वसन्तका चरणमा सार्नुहोस्; गनेर सारिएपछि कृमिनाशक।" } },
      { kind: "sow", text: { en: "Spring barley and potato finish; start vegetable nurseries under plastic.", np: "वसन्त जौ-आलु सकिन्छ; प्लास्टिकमुनि तरकारी बियार सुरु।" } },
    ],
  },
  {
    greg: 5, en: "May", np: "मे", bs: "जेठ",
    terai: [
      { kind: "livestock", text: { en: "PRE-MONSOON VACCINATION ROUND (FMD, HS) — DLS campaigns run before the rains; every bovine over 3 months.", np: "मनसुनअघिको खोप चरण (FMD, HS) — DLS को अभियान; ३ महिनाभन्दा माथिका सबै गाईभैंसी।" }, article: "vaccination-schedule" },
      { kind: "harvest", text: { en: "Wheat harvest and threshing at full swing — sun-dry thoroughly before the bag.", np: "गहुँ कटाई-झाराई पूरा रफतारमा — बोरा भर्नुअघि राम्ररी घाममा सुकाउनुहोस्।" }, article: "grain-storage-aflatoxin" },
      { kind: "fish", text: { en: "STOCK fingerlings as water warms — six carps in their right shares.", np: "पानी तात्दै गर्दा भुरा राख्नुहोस् — छ कार्प सही अनुपातमा।" }, article: "carp-polyculture" },
      { kind: "livestock", text: { en: "Top up green fodder reserves; the dry-month gap is closer than it looks.", np: "हरियो चाराको भण्डार थाप्नुहोस्; सुक्खा महिनाको खाडल देखिएभन्दा नजिक छ।" } },
    ],
    midhills: [
      { kind: "sow", text: { en: "Finish main maize sowing; fill gaps with millet relay plans.", np: "मुख्य मकै रोपाइँ सक्नुहोस्; कोदोको खेती-क्रम योजनाले प्वाल भर्नुहोस्।" } },
      { kind: "livestock", text: { en: "Vaccination round for the shed too — FMD/HS for cattle, PPR for goats over 3 months.", np: "गोठका लागि पनि खोप चरण — गाईलाई FMD/HS, ३ महिनामाथिका बाख्रालाई PPR।" }, article: "vaccination-schedule" },
      { kind: "market", text: { en: "Sell finished khasi bought at Shrawan before the festival price curve flattens.", np: "साउनमा किनेका तयार खसी चाडको भाउ-वक्र फाट्नुअघि बेच्नुहोस्।" }, article: "khasi-fattening-dashain" },
    ],
    highhills: [
      { kind: "livestock", text: { en: "Vaccinate transhumant herds at the trail-head camps before they scatter high.", np: "बथान छरिनुअघि बाटो-छेउका शिविरमै खोप गर्नुहोस्।" }, article: "vaccination-schedule" },
      { kind: "sow", text: { en: "Buckwheat and high potato finish sowing; repair terrace bunds for rains.", np: "फापर र उच्च आलु रोपाइँ सकिन्छ; पानीका लागि गह्रां-बाँध मर्मत।" } },
    ],
  },
  {
    greg: 6, en: "June", np: "जुन", bs: "असार",
    terai: [
      { kind: "sow", text: { en: "RICE TRANSPLANTING peaks around Asar 15 — the whole Terai bends to the paddy.", np: "असार १५ वरिपरि धान रोपाइँ चरम — पूरै तराई बालीमा झुक्छ।" }, article: "paddy-nepal" },
      { kind: "livestock", text: { en: "Monsoon foot-rot and fluke watch — trim and drain; keep the milking yard stone-dry.", np: "मनसुनको खुट्टा-रोग र फिँजा सतर्कता — काट्नु, पानी निकाल्नु; दुहुने आँगन पूरै सुक्खा।" } },
      { kind: "fish", text: { en: "Feeding at full rate in warm water — same bank, same hours, watch dawn surfacing.", np: "तातो पानीमा पूरा दरले खुवाइ — उही किनारा, उही घण्टा; बिहानको सतह-आउने हेर्नुहोस्।" }, article: "carp-polyculture" },
    ],
    midhills: [
      { kind: "sow", text: { en: "FODDER PLANTING month: slips, cuttings and seedlings with the monsoon's guarantee.", np: "चारा-रोपाइ महिना: मनसुनको जम नै हो — डाँठ, गाँस, बिरुवा सबै।" }, article: "fodder-systems-nepal" },
      { kind: "livestock", text: { en: "Damp sheds grow pneumonia — bend to kid height and fix the air before the rain fixes you.", np: "चिसो गोठले निमोनिया पाल्छ — चेलाको उचाइमा झुकेर हावा मिलाउनुहोस्।" }, article: "goat-pneumonia" },
      { kind: "sow", text: { en: "Ginger and turmeric go in; upland rice in warm pockets.", np: "अदुवा-बेसार रोप्नुहोस्; तातो खाल्डोमा पहाडी धान।" } },
    ],
    highhills: [
      { kind: "sow", text: { en: "Transplant upland rice and millet nurseries; buckwheat in cold pockets.", np: "पहाडी धान र कोदोको बियार रोप्नुहोस्; चिसो खाल्डोमा फापर।" } },
      { kind: "livestock", text: { en: "Herds move to high summer pastures — salt and mineral bricks travel with them.", np: "बथान उच्च गर्मी-चरणमा जान्छन् — नुन-खनिजको इटा सँगै लिनुहोस्।" }, article: "minerals-vitamins" },
    ],
  },
  {
    greg: 7, en: "July", np: "जुलाई", bs: "साउन",
    terai: [
      { kind: "livestock", text: { en: "Weed, drain, repeat: paddy interculture and gully repair between rains.", np: "गोडमेल, पानी निकास, फेरि गर्नुहोस्: धानको गोडमेल र खाल्डो-मर्मत।" } },
      { kind: "livestock", text: { en: "Poultry houses: coccidiosis season — dry litter daily, fix dripping drinkers the same hour.", np: "कुखुरा घर: कक्सिडियोसिसको मौसुम — दिनहुँ ओछ्यान सुकाउनुहोस्, चुहिने भाँडो त्यही घण्टा।" }, article: "poultry-coccidiosis" },
      { kind: "storage", text: { en: "Watch stored grain — monsoon humidity is aflatoxin's clock; small daily bag.", np: "भण्डारको अन्न हेर्नुहोस् — मनसुनको चिस्यान एफ्लाटक्सिनको घडी; दैनिक सानो बोरा।" }, article: "grain-storage-aflatoxin" },
    ],
    midhills: [
      { kind: "livestock", text: { en: "KHASI SEASON BEGINS — buy and start finishing for Dashain (Shrawan–Bhadra window).", np: "खसी-मौसुम सुरु — किनेर दशैँका लागि बोसाउनुहोस् (साउन-भदौ झ्याल)।" }, article: "khasi-fattening-dashain" },
      { kind: "sow", text: { en: "Millet transplanted into maize fields; fodder cuttings finish by end of month.", np: "मकैको खेतमा कोदो रोप्नुहोस्; चाराका डाँठ यस महिनाभित्र सक्नुहोस्।" } },
      { kind: "livestock", text: { en: "Azolla ponds double in the warmth — 2 kg a day beside the concentrate.", np: "एजोलाको पोखरी तापमा दोब्बर हुन्छ — दानासँग दिनको २ केजी।" }, article: "azolla-fodder" },
    ],
    highhills: [
      { kind: "harvest", text: { en: "First summer pasture dairy products — ghee season on the high meadows.", np: "गर्मी-चरणको पहिलो दुग्ध उत्पादन — उच्च बुङ्गीमा घिउ-मौसुम।" } },
      { kind: "livestock", text: { en: "Rain-tarps for hay stacks; cut and cure hay in the dry spells between showers.", np: "हे-थुप्रोमा प्लास्टिक; झरी-बीचको सुक्खामा काटेर हे बनाउनुहोस्।" }, article: "fodder-systems-nepal" },
    ],
  },
  {
    greg: 8, en: "August", np: "अगस्ट", bs: "भदौ",
    terai: [
      { kind: "livestock", text: { en: "Late paddy weeding done; watch stem-borer and blast; drain check after every big rain.", np: "पछिल्लो गोडमेल सक्नुहोस्; बोला-रोग र ढाँसे हेर्नुहोस्; हरेक ठूलो पानीपछि निकास जाँच।" } },
      { kind: "fish", text: { en: "Growth peak month — feed response tells you everything; keep records.", np: "वृद्धिको चरम महिना — खानको उत्साहले सबै बताउँछ; अभिलेख राख्नुहोस्।" }, article: "carp-polyculture" },
      { kind: "market", text: { en: "Early khasi sales begin; finish strong, weigh before agreeing a price.", np: "खसीको पहिलो बिक्री सुरु; बलियो बनाउनुहोस्, भाउ मिलाउनुअघि तौल्नुहोस्।" }, article: "khasi-fattening-dashain" },
    ],
    midhills: [
      { kind: "harvest", text: { en: "MAIZE HARVEST (hill crop) — dry cobs on the rack, shell and store at 13%.", np: "मकै कटाई (पहाडी बाली) — गोडा सुकाउनुहोस्, निकालेर १३% मा भण्डार्नुहोस्।" }, article: "grain-storage-aflatoxin" },
      { kind: "livestock", text: { en: "Fodder first big cut; balance cutting with regrowth — leave a third standing.", np: "चाराको पहिलो ठूलो कटाई; काटाइ-पुन:उब्जाइ मिलाउनुहोस् — एक भाग उभिएकै छाड्नुहोस्।" }, article: "fodder-systems-nepal" },
      { kind: "livestock", text: { en: "Buffalo breeding season — sharp heat watching, serve the right animal at the right hour.", np: "भैंसी प्रजनन मौसुम — यात्रा तीखो हेर्नुहोस्, सही पशुलाई सही घण्टामा मिलाउनुहोस्।" }, article: "heat-detection-ai" },
    ],
    highhills: [
      { kind: "harvest", text: { en: "Buckwheat and early potato; onion and garlic from the home garden.", np: "फापर र चाँडै आलु; घरबारीको प्याज-लसुन।" } },
      { kind: "livestock", text: { en: "Night pens against leopard and wolf loss; guard dogs with the flocks.", np: "चितुवा-ब्वाँसोबाट बचाउन रातको बाडा; बथानसँग रखवाल कुकुर।" } },
    ],
  },
  {
    greg: 9, en: "September", np: "सेप्टेम्बर", bs: "असोज",
    terai: [
      { kind: "harvest", text: { en: "Early paddy ripens; keep the paddy-drying mats ready — sun after the rain.", np: "चाँडै धान पाक्छ; धान-सुकाउने चट्याङ तयार — पानीपछिको घाम सद्प्रयोग।" } },
      { kind: "market", text: { en: "Dashain price peak for goats, buffalo and birds — sell finished stock now, not later.", np: "दशैँको भाउ-चरम — तयार पशु अहिलै बेच्नुहोस्, ढिलो नगर्नुहोस्।" }, article: "khasi-fattening-dashain" },
      { kind: "livestock", text: { en: "Festival travel stresses animals — rest, water and a light feed before the walk.", np: "चाडको यात्राले पशु थाक्छन् — हिँडाइअघि आराम, पानी र हल्का चारा।" } },
    ],
    midhills: [
      { kind: "harvest", text: { en: "Millet and late maize; grain goes to the drying rack the same week it's cut.", np: "कोदो र पछिल्लो मकै; काटेकै हप्ता अन्न सुकाउने र्याकमा।" } },
      { kind: "livestock", text: { en: "Gopal a drought plan: pump/water-point check before the dry weeks after the festival.", np: "सुक्खा-योजना: पर्वपछिको सुक्खा हप्ताअघि धारा-पानी जाँच।" } },
      { kind: "sow", text: { en: "Wheat-field prep starts — the sooner the tillage, the earlier the sow.", np: "गहुँ-खेत तयारी सुरु — जति चाँडो जोताइ, त्यति चाँडो बीउ।" } },
    ],
    highhills: [
      { kind: "harvest", text: { en: "High-hill potato harvest — grade seed potatoes and store from frost.", np: "उच्च पहाडको आलु कटाई — बीउ आलु छुट्याएर तुसारोबाट टाढा भण्डार्नुहोस्।" } },
      { kind: "livestock", text: { en: "Herds start descending — body-score and treat before the long valley winter.", np: "बथान ओर्लिन थाल्छन् — लामो उपत्यका-जाडोअघि शरीर-अवस्था हेरेर उपचार।" }, },
    ],
  },
  {
    greg: 10, en: "October", np: "अक्टोबर", bs: "कार्तिक",
    terai: [
      { kind: "harvest", text: { en: "MAIN RICE HARVEST (Oct–Nov) — thresh, sun-dry to 13%, and store hermetic for the year.", np: "मुख्य धान कटाई (अक्टो-नोभे) — झारेर १३% सुकाएर वर्षभरिका लागि एयरटाइट भण्डार।" }, article: "grain-storage-aflatoxin" },
      { kind: "sow", text: { en: "Wheat and winter maize sowing starts on harvested paddies; potato follows.", np: "काटेको धानखेतमा गहुँ-जाडो मकै रोपाइँ सुरु; पछि आलु।" } },
      { kind: "livestock", text: { en: "PRE-WINTER VACCINATION ROUND (FMD, HS) — DLS autumn campaign; booster for all ages.", np: "जाडोअघिको खोप चरण (FMD, HS) — DLS को शरद अभियान; सबै उमेरका लागि बुस्टर।" }, article: "vaccination-schedule" },
    ],
    midhills: [
      { kind: "sow", text: { en: "WHEAT SOWING window opens (Nov–Dec) — the 110–130-day crop wants an early start.", np: "गहुँ रोपाइको झ्याल खुल्छ (नोभे-डिसे) — ११०–१३० दिने बाली चाँडो सुरु चाहन्छ।" }, article: "wheat-winter-crops" },
      { kind: "livestock", text: { en: "Dry-cow management for winter calving — body condition 3–3.5 at calving is the target.", np: "जाडोमा ब्याउने गाईको सुकाउने-व्यवस्था — ब्याउँदा ३–३.५ अवस्था लक्ष्य।" }, },
      { kind: "market", text: { en: "After-festival livestock prices dip — the smart buyer's month for breeding stock.", np: "पर्वपछिको पशु-भाउ घट्छ — प्रजनन-पशु किन्ने बुद्धिमानको महिना।" } },
    ],
    highhills: [
      { kind: "harvest", text: { en: "Barley and high buckwheat in; apple region moves the late crop down.", np: "जौ र उच्च फापर काटाई; स्याउ क्षेत्रले पछिल्लो बाली तल झार्छ।" } },
      { kind: "livestock", text: { en: "Winter sheds: deep bedding, windbreak walls, feed store count before passes close.", np: "जाडो गोठ: बाक्लो ओछ्यान, हावा-बाँद बाँध, बाटो थुनिनुअघि चारा-गणना।" } },
    ],
  },
  {
    greg: 11, en: "November", np: "नोभेम्बर", bs: "मंसिर",
    terai: [
      { kind: "sow", text: { en: "Wheat and winter potato sowing at full speed; late-monsoon moisture is an ally.", np: "गहुँ-जाडो आलु पूरा रफतारमा; मनसुनको बाँकी चिस्यान साथी हो।" } },
      { kind: "storage", text: { en: "Maize stores audited — sort discoloured kernels out; hermetic bags earn their price now.", np: "मकै-भण्डार जाँच — रंग फेरिएका गेडा छाट्नुहोस्; एयरटाइट झोला अहिले मूल्य उठाउँछ।" }, article: "grain-storage-aflatoxin" },
      { kind: "livestock", text: { en: "Buffalo breeding continues; winter calving pens readied with dry, deep bedding.", np: "भैंसी प्रजनन चालु; जाडो ब्याउने बाडामा सुक्खा-बाक्लो ओछ्यान तयार।" }, article: "colostrum-calf-care" },
    ],
    midhills: [
      { kind: "sow", text: { en: "WHEAT SOWING main window; barley and oat fodder in warm pockets.", np: "गहुँ रोपाइँको मुख्य झ्याल; तातो खाल्डोमा जौ-चारा।" }, article: "wheat-winter-crops" },
      { kind: "livestock", text: { en: "Silage-making month for maize stover and thick stands — chop, pack, seal in a day.", np: "मकै-बाँद्का र बाक्लो बालीको सिलेज-महिना — काटेर, कसेर, एकै दिन सिल।" }, article: "silage-hay" },
      { kind: "fish", text: { en: "Drain-harvest ponds before the cold; dry beds and repair dykes for next year.", np: "चिसो पर्नुअघि पोखरी सुकाएर माछा काट्नुहोस्; पुछार सुकाएर बाँध मर्मत।" }, article: "carp-polyculture" },
    ],
    highhills: [
      { kind: "storage", text: { en: "Grain and potato stores sealed against frost and damp — check monthly.", np: "अन्न-आलु भण्डार तुसारो-चिसो विरुद्ध बन्द — मासिक जाँच।" } },
      { kind: "livestock", text: { en: "Winter feeding budget: hay + straw + urea treatment plan against the cold months.", np: "जाडोको चारा-बजेट: हे + पराला + युरिया उपचार योजना।" }, article: "urea-treated-straw" },
    ],
  },
  {
    greg: 12, en: "December", np: "डिसेम्बर", bs: "पुष",
    terai: [
      { kind: "sow", text: { en: "Wheat sowing closes; mustard sown late still pays in the eastern plains.", np: "गहुँ रोपाइँ बन्द; पूर्वी मैदानमा ढिलो तोरीले पनि जातो फर्काउँछ।" } },
      { kind: "livestock", text: { en: "Cold raises feed needs — milk animals eat more just to stay warm; plan the extra.", np: "चिसोले चारा-खर्च बढाउँछ — दुधका पशुले तातो राख्नै बढी खान्छन्; थप योजना गर्नुहोस्।" }, article: "dairy-buffalo-feeding" },
      { kind: "storage", text: { en: "Potato cold-storage and seed-bed planning for February.", np: "आलुको चिसो-भण्डार र फागुनका लागि बीउ-बारी योजना।" } },
    ],
    midhills: [
      { kind: "livestock", text: { en: "WINTER CALF CARE: colostrum within hours, navel dipped, deep bedding — cold nights kill weak calves.", np: "जाडो बछडा-हेरचाह: घण्टैभित्र खीर, नाभि डिप, बाक्लो ओछ्यान — चिसो रातले कमजोर बच्चा मार्छ।" }, article: "colostrum-calf-care" },
      { kind: "livestock", text: { en: "Goat pneumonia watch at its peak — dry air that moves is the whole cure.", np: "बाख्रा निमोनिया-सतर्कता चरममा — चल्ने सुक्खा हावा नै पूरा उपचार हो।" }, article: "goat-pneumonia" },
      { kind: "harvest", text: { en: "Winter vegetables to market on festival demand; mulch the beds after cut.", np: "चाडको मागमा जाडो तरकारी बजार; काटेपछि बारीमा मल-पराल।" } },
    ],
    highhills: [
      { kind: "livestock", text: { en: "Indoor feeding season: ration the hay, keep water unfrozen, watch body condition weekly.", np: "भित्री-खुवाइ मौसुम: हे-बाँडफाँड, पानी नजम्न दिनुहोस्, हप्तैपिच्छे शरीर-अवस्था।" }, },
      { kind: "storage", text: { en: "Snow-bound weeks: firewood, feed and vet kit stocked at the house, not the far shed.", np: "हिउँ-थुनिएका हप्ता: दाउरा-चारा-औषधि घरमै, टाढाको गोठमा होइन।" } },
    ],
  },
];

export const CAL_SOURCES =
  "Crop windows follow Nepal farming calendars and extension practice (rice transplanting centred on Asar 15, harvest Oct–Nov; spring maize Feb–Mar Terai; hill maize Apr–May; wheat sown Nov–Dec with a 110–130-day cycle; potato and vegetable rotations per krishisuchana and NARC/DOA crop-calendar practice). Livestock windows follow the DLS biannual vaccination campaign pattern (pre-monsoon and pre-winter rounds; FMD/HS/PPR from 3 months of age), khasi finishing practice for Dashain (Shrawan–Bhadra start), monsoon fodder planting, and the seasonal-disease pattern (coccidiosis with wet litter, goat pneumonia in cold damp sheds). Linked KB articles carry the full sources for each practice.";

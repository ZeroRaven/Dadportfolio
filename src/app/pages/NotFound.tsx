import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, ArrowRight, Mail, Briefcase } from "lucide-react";
import { Button } from "../components/ui/button";
import drShahIllustration from "@/imports/image-1.png";
import { useLanguage } from "../context/LanguageContext";

const TWEMOJI = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

const parade = [
  {
    src: `${TWEMOJI}/1f404.svg`,
    alt: "Cow",
    size: 76,
    bottom: 52,
    duration: 16,
    delay: 0,
    repeatDelay: 4,
    bobDuration: 0.55,
    bubble: "Moo?",
    bubbleDelay: 0,
  },
  {
    src: `${TWEMOJI}/1f411.svg`,
    alt: "Sheep",
    size: 62,
    bottom: 54,
    duration: 12,
    delay: 7,
    repeatDelay: 8,
    bobDuration: 0.48,
    bubble: "Baa!",
    bubbleDelay: 0,
  },
  {
    src: `${TWEMOJI}/1f413.svg`,
    alt: "Rooster",
    size: 54,
    bottom: 56,
    duration: 9,
    delay: 14,
    repeatDelay: 11,
    bobDuration: 0.38,
    bubble: null,
    bubbleDelay: 0,
  },
  {
    src: `${TWEMOJI}/1f410.svg`,
    alt: "Goat",
    size: 64,
    bottom: 53,
    duration: 13,
    delay: 21,
    repeatDelay: 7,
    bobDuration: 0.44,
    bubble: "Meh!",
    bubbleDelay: 0,
  },
  {
    src: `${TWEMOJI}/1f416.svg`,
    alt: "Pig",
    size: 60,
    bottom: 54,
    duration: 11,
    delay: 30,
    repeatDelay: 10,
    bobDuration: 0.5,
    bubble: null,
    bubbleDelay: 0,
  },
];

function Animal({
  src,
  alt,
  size,
  bottom,
  duration,
  delay,
  repeatDelay,
  bobDuration,
  bubble,
}: (typeof parade)[number]) {
  return (
    <motion.div
      className="absolute left-0 pointer-events-none"
      style={{ bottom }}
      animate={{ x: ["-120px", "calc(100vw + 60px)"] }}
      transition={{
        duration,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay,
      }}
    >
      <motion.div
        animate={{ y: [0, -6, 0, -6, 0] }}
        transition={{ duration: bobDuration, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Speech bubble */}
        {bubble && (
          <motion.div
            animate={{ opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -4] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              times: [0, 0.35, 0.5, 0.72, 0.88],
              ease: "easeOut",
            }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap"
            style={{ fontSize: "11px" }}
          >
            {bubble}
            <span
              className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "6px solid white",
              }}
            />
          </motion.div>
        )}

        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="select-none drop-shadow-lg"
          style={{ transform: "scaleX(-1)" }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

export function NotFound() {
  const { language } = useLanguage();
  const np = language === "np";

  const quickLinks = [
    { label: np ? "डा. शाहको बारेमा" : "About Dr. Shah",       path: "/about",    icon: Briefcase },
    { label: np ? "विशेषज्ञता र सेवाहरू" : "Expertise & Services", path: "/services", icon: ArrowRight },
    { label: np ? "सम्पर्क गर्नुहोस्" : "Get in Touch",          path: "/contact",  icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2540] via-[#1A3A5C] to-[#0A2540] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      {/* Main content */}
      <div className="relative max-w-2xl mx-auto text-center text-white z-10">

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[#D4AF37]/60 shadow-2xl">
            <img
              src={drShahIllustration}
              alt="Dr. Mogal Prasad Shah"
              className="w-full h-full object-cover object-top scale-110"
              style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
            />
          </div>
        </motion.div>

        {/* Ghost 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="font-display text-[120px] sm:text-[160px] font-bold leading-none text-[#D4AF37]/20 select-none"
        >
          404
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="-mt-6 sm:-mt-10"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {np ? "पृष्ठ भेटिएन" : "Page Not Found"}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-3 leading-relaxed max-w-md mx-auto">
            {np ? "यो पृष्ठ हराएको छ — राम्रो पशुपालन अधिकारी नभएको पशुधनजस्तै।" : "This page has wandered off — much like livestock without a good development officer."}
          </p>
          <p className="text-gray-400 text-sm mb-10">
            {np ? "तपाईंले पछ्याउनुभएको URL पुरानो भएको वा पृष्ठ सारिएको हुन सक्छ।" : "The URL you followed may be outdated or the page has moved."}
          </p>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Link to="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-[#0A2540] font-semibold px-7 py-5"
            >
              <Home className="mr-2" size={18} />
              {np ? "गृहपृष्ठमा फर्कनुहोस्" : "Back to Home"}
            </Button>
          </Link>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="border-t border-white/10 pt-8"
        >
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-5">{np ? "वा यहाँ जानुहोस्" : "Or go to"}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map(({ label, path, icon: Icon }) => (
              <Link key={path} to={path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/40 transition-all text-sm text-gray-300 hover:text-white"
                >
                  <Icon size={14} className="text-[#D4AF37]" />
                  <span>{label}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Grass strip */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0 34 Q90 18 180 34 Q270 50 360 34 Q450 18 540 34 Q630 50 720 34 Q810 18 900 34 Q990 50 1080 34 Q1170 18 1260 34 Q1350 50 1440 34 L1440 80 L0 80 Z"
            fill="rgba(21,128,61,0.22)"
          />
          <path
            d="M0 46 Q90 30 180 46 Q270 62 360 46 Q450 30 540 46 Q630 62 720 46 Q810 30 900 46 Q990 62 1080 46 Q1170 30 1260 46 Q1350 62 1440 46 L1440 80 L0 80 Z"
            fill="rgba(21,128,61,0.14)"
          />
        </svg>
      </div>

      {/* Livestock parade */}
      {parade.map((animal) => (
        <Animal key={animal.alt} {...animal} />
      ))}
    </div>
  );
}

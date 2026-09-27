import { Link, useLocation } from "react-router";
import { Menu, X, CalendarCheck, Search, ChevronDown, Calculator, BookOpen, Map, User, Briefcase, FileText, Home, Stethoscope, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import drShahIllustration from "@/imports/avatar.webp";
import { useLanguage } from "../context/LanguageContext";
import { SearchPalette, useSearchPaletteShortcut } from "./SearchPalette";

/* ─────────────────────────────────────────────────────────────────────────────
 *  NAVIGATION — de-cluttered & fully accessible.
 *
 *  Desktop groups nine destinations into FIVE top-level controls so the bar
 *  never squeezes the logo onto multiple lines:
 *      Home · About ▾ (About/Experience/Publications) · Expertise ·
 *      Resources ▾ (Tools/Knowledge/Nepal Map) · Contact  + search + EN/NP +
 *      Book-now CTA.
 *
 *  Mobile menu: a proper slide-in DRAWER (right side, GPU transform only —
 *  no height animation, so nothing ever looks stuttery). Portal-rendered so
 *  the nav's own backdrop never interferes. Grouped links with icons, search
 *  row, language toggle and a sticky booking CTA. Body scroll locked while
 *  open, Esc closes, focus is trapped inside, and focus returns to the
 *  hamburger button on close.
 * ──────────────────────────────────────────────────────────────────────────── */

interface NavDropdownItem {
  path: string;
  label: string;
  labelEn: string;
  icon: typeof Calculator;
  blurb: string;
}

function Dropdown({
  id,
  label,
  items,
  open,
  setOpen,
  active,
  textColorClass,
  isResourceActive,
}: {
  id: string;
  label: string;
  items: NavDropdownItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
  textColorClass: "light" | "dark";
  isResourceActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Esc + outside-click close the dropdown
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, setOpen]);

  const anyActive = isResourceActive || active;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={`${id}-menu`}
        className={`nav-link relative flex items-center gap-1.5 px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          anyActive
            ? textColorClass === "light"
              ? "text-white font-semibold"
              : "text-[#0A2540] font-semibold"
            : textColorClass === "light"
            ? "text-gray-200 hover:text-white"
            : "text-gray-700 hover:text-[#0A2540]"
        }`}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden="true">
          <ChevronDown size={14} />
        </motion.span>
        {anyActive && (
          <motion.div
            layoutId="activeNav"
            className={`absolute inset-0 rounded-lg ${
              textColorClass === "light"
                ? "bg-white/10 border-2 border-white/20"
                : "bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30"
            }`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-menu`}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            role="menu"
            aria-label={label}
            className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2"
          >
            {items.map((r) => {
              const Icon = r.icon;
              const itemActive = location.pathname === r.path;
              return (
                <Link key={r.path} to={r.path} role="menuitem" onClick={() => setOpen(false)}>
                  <div
                    className={`flex items-start gap-3 px-4 py-3 mx-2 rounded-xl transition-colors ${
                      itemActive ? "bg-[#D4AF37]/10" : "hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        itemActive ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-[#0A2540]/[0.06] text-[#0A2540]"
                      }`}
                    >
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-sm font-semibold ${itemActive ? "text-[#B8941F]" : "text-[#0A2540]"}`}>
                        {r.label}
                      </span>
                      <span className="block text-xs text-gray-500 leading-snug mt-0.5">{r.blurb}</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const isHomePage = location.pathname === "/";

  /* Global ⌘K / Ctrl+K / "/" shortcut for the search palette */
  useSearchPaletteShortcut(setSearchOpen);

  const openSearch = () => {
    setIsOpen(false); // close the mobile menu if it's open
    setSearchOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Mobile menu: lock body scroll while open + Esc closes + focus management */
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
      // Keep focus inside the open menu for keyboard users
      if (e.key === "Tab" && menuPanelRef.current) {
        const focusables = menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the drawer for keyboard & screen-reader users
    const focusTimer = setTimeout(() => {
      const first = menuPanelRef.current?.querySelector<HTMLElement>("button");
      first?.focus();
    }, 80);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Close the mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* About group — About · Experience · Publications */
  const aboutItems: NavDropdownItem[] = [
    {
      path: "/about",
      label: t("nav_about"),
      labelEn: "About",
      icon: User,
      blurb: language === "np" ? "यात्रा, शिक्षा र प्रमाणपत्र" : "Journey, education & credentials",
    },
    {
      path: "/experience",
      label: t("nav_experience"),
      labelEn: "Experience",
      icon: Briefcase,
      blurb: language === "np" ? "२९+ वर्षको नेतृत्व अनुभव" : "29+ years of leadership roles",
    },
    {
      path: "/publications",
      label: t("nav_publications"),
      labelEn: "Publications",
      icon: FileText,
      blurb: language === "np" ? "शोध, थेसिस र योगदान" : "Research, theses & contributions",
    },
  ];

  /* Farmer-resource pages — grouped under one nav entry */
  const resourceItems: NavDropdownItem[] = [
    {
      path: "/tools",
      label: t("nav_tools"),
      labelEn: "Tools",
      icon: Calculator,
      blurb: language === "np" ? "तौल, गर्भावधि, चारा, आम्दानी क्यालकुलेटर" : "Weight, gestation, feed & income calculators",
    },
    {
      path: "/knowledge",
      label: t("nav_knowledge"),
      labelEn: "Knowledge",
      icon: BookOpen,
      blurb: language === "np" ? "कृषि तथा पशुपालन ज्ञान भण्डार" : "Agriculture & livestock knowledge base",
    },
    {
      path: "/agromap",
      label: t("nav_agromap"),
      labelEn: "Nepal Map",
      icon: Map,
      blurb: language === "np" ? "७७ जिल्लाको अन्तरक्रियात्मक कृषि नक्सा" : "Interactive agri-map of all 77 districts",
    },
  ];

  /* Mobile drawer: primary pages with icons (mirrors desktop grouping) */
  const primaryNav = [
    { path: "/", label: t("nav_home"), labelEn: "Home", icon: Home },
    { path: "/about", label: t("nav_about"), labelEn: "About", icon: User },
    { path: "/services", label: t("nav_expertise"), labelEn: "Expertise", icon: Stethoscope },
    { path: "/experience", label: t("nav_experience"), labelEn: "Experience", icon: Briefcase },
    { path: "/publications", label: t("nav_publications"), labelEn: "Publications", icon: FileText },
    { path: "/contact", label: t("nav_contact"), labelEn: "Contact", icon: Mail },
  ];

  const isAboutActive = aboutItems.some((r) => location.pathname === r.path || location.pathname.startsWith(r.path));
  const isResourceActive = resourceItems.some((r) => location.pathname === r.path);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Determine nav bar style based on page and scroll state
  const getNavStyle = () => {
    if (isHomePage) {
      return scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-[#0A2540]/80 backdrop-blur-sm";
    }
    return "bg-white/95 backdrop-blur-md shadow-lg";
  };

  const getTextColor = () => {
    if (isHomePage && !scrolled) {
      return "light"; // White text on dark background
    }
    return "dark"; // Dark text on white background
  };

  const textColorClass = getTextColor();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${getNavStyle()}`}
      aria-label={language === "np" ? "मुख्य नेभिगेसन" : "Primary navigation"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          {/* Logo — never wraps: single-line name with truncation safety */}
          <Link to="/" className="flex items-center space-x-3 group min-w-0 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative flex-shrink-0"
            >
              <div
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37] ring-offset-2 shadow-lg"
                style={{ "--tw-ring-offset-color": isHomePage && !scrolled ? "#0A2540" : "#ffffff" } as CSSProperties}
              >
                <img
                  src={drShahIllustration}
                  alt="Dr. Mogal Prasad Shah portrait"
                  className="w-full h-full object-cover object-top scale-110"
                  style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
                />
              </div>
            </motion.div>

            {/* Desktop Logo Text */}
            <div className="hidden md:block min-w-0 max-w-[15rem] lg:max-w-none">
              <div
                className={`font-display text-xl font-bold transition-colors truncate whitespace-nowrap ${
                  textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'
                }`}
              >
                {t("nav_name")}
              </div>
              <div className="text-xs text-[#D4AF37] font-medium tracking-wide truncate whitespace-nowrap">
                {t("nav_tagline")}
              </div>
            </div>

            {/* Mobile Logo Text - Compact Version */}
            <div className="block md:hidden min-w-0">
              <div
                className={`font-display text-base font-bold transition-colors leading-tight whitespace-nowrap ${
                  textColorClass === 'light' ? 'text-white' : 'text-[#0A2540]'
                }`}
              >
                {language === "np" ? "डा. एम.पी. शाह" : "Dr. M.P. Shah"}
              </div>
              <div className="text-[10px] text-[#D4AF37] font-medium tracking-wide whitespace-nowrap">
                {t("nav_mobile_tagline")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation — five top-level controls */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            <Link to="/">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`nav-link relative px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive("/")
                    ? textColorClass === 'light'
                      ? "text-white font-semibold"
                      : "text-[#0A2540] font-semibold"
                    : textColorClass === 'light'
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-[#0A2540]"
                }`}
              >
                {t("nav_home")}
                {isActive("/") && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-lg ${
                      textColorClass === 'light'
                        ? "bg-white/10 border-2 border-white/20"
                        : "bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30"
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>

            {/* About dropdown — About · Experience · Publications */}
            <Dropdown
              id="nav-about"
              label={t("nav_about")}
              items={aboutItems}
              open={aboutOpen}
              setOpen={setAboutOpen}
              active={isAboutActive && location.pathname === "/about"}
              textColorClass={textColorClass}
              isResourceActive={isAboutActive}
            />

            {/* Expertise */}
            <Link to="/services">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`nav-link relative px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive("/services")
                    ? textColorClass === 'light'
                      ? "text-white font-semibold"
                      : "text-[#0A2540] font-semibold"
                    : textColorClass === 'light'
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-[#0A2540]"
                }`}
              >
                {t("nav_expertise")}
                {isActive("/services") && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-lg ${
                      textColorClass === 'light'
                        ? "bg-white/10 border-2 border-white/20"
                        : "bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30"
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>

            {/* Resources dropdown — Tools · Knowledge · Nepal Agro-Map */}
            <Dropdown
              id="nav-resources"
              label={t("nav_resources")}
              items={resourceItems}
              open={resourcesOpen}
              setOpen={setResourcesOpen}
              active={isResourceActive}
              textColorClass={textColorClass}
              isResourceActive={isResourceActive}
            />

            {/* Contact */}
            <Link to="/contact">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`nav-link relative px-3 xl:px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive("/contact")
                    ? textColorClass === 'light'
                      ? "text-white font-semibold"
                      : "text-[#0A2540] font-semibold"
                    : textColorClass === 'light'
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-[#0A2540]"
                }`}
              >
                {t("nav_contact")}
                {isActive("/contact") && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-lg ${
                      textColorClass === 'light'
                        ? "bg-white/10 border-2 border-white/20"
                        : "bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30"
                    }`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            </Link>

            {/* Site search (⌘K) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={openSearch}
              title="Search (Ctrl+K)"
              aria-label="Search the site"
              className={`ml-1.5 flex items-center justify-center w-10 h-10 rounded-lg border transition-all ${
                textColorClass === "light"
                  ? "border-white/25 text-white/70 hover:text-white hover:border-white/50"
                  : "border-gray-300 text-gray-500 hover:text-[#0A2540] hover:border-[#D4AF37]"
              }`}
            >
              <Search size={17} />
            </motion.button>

            {/* Language switcher */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === "en" ? "np" : "en")}
              className="ml-2 flex items-center gap-0.5 rounded-lg border border-[#D4AF37]/40 overflow-hidden text-xs font-semibold"
              title="Switch language / भाषा बदल्नुहोस्"
              aria-label="Switch language / भाषा बदल्नुहोस्"
            >
              <span
                aria-pressed={language === "en"}
                className={`px-2.5 py-2 transition-colors ${language === "en" ? "bg-[#D4AF37] text-[#0A2540]" : textColorClass === "light" ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}
              >
                EN
              </span>
              <span
                aria-pressed={language === "np"}
                className={`px-2.5 py-2 transition-colors ${language === "np" ? "bg-[#D4AF37] text-[#0A2540]" : textColorClass === "light" ? "text-white/60 hover:text-white" : "text-gray-400 hover:text-gray-700"}`}
              >
                NP
              </span>
            </motion.button>

            <Link to="/booking" className="flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 flex items-center px-4 xl:px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                <CalendarCheck className="mr-1.5" size={15} />
                {t("nav_booking")}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Search Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={openSearch}
            aria-label="Search the site"
            className={`lg:hidden p-2 mr-1 rounded-lg ${
              textColorClass === 'light' ? "text-white" : "text-gray-900"
            }`}
          >
            <Search size={24} />
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              textColorClass === 'light' ? "text-white" : "text-gray-900"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Navigation — slide-in drawer (portal-rendered so the nav's
            own translucent background never bleeds into it; transform-only
            animation for a perfectly smooth glide) */}
        {createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="drawer-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[70] bg-[#0A2540]/55 backdrop-blur-[2px] lg:hidden"
                  onClick={() => {
                    setIsOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-hidden="true"
                />

                {/* Drawer sheet */}
                <motion.aside
                  id="mobile-menu"
                  ref={menuPanelRef}
                  key="drawer-sheet"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="fixed top-0 right-0 z-[80] h-[100dvh] w-[86vw] max-w-[360px] bg-white shadow-2xl flex flex-col lg:hidden"
                  style={{ willChange: "transform" }}
                  role="dialog"
                  aria-modal="true"
                  aria-label={language === "np" ? "मुख्य मेनु" : "Main menu"}
                >
                  {/* Drawer header — identity + close */}
                  <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3 flex-shrink-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#D4AF37] shadow-md flex-shrink-0">
                      <img
                        src={drShahIllustration}
                        alt="Dr. Mogal Prasad Shah portrait"
                        className="w-full h-full object-cover object-top scale-110"
                        style={{ filter: "sepia(0.25) contrast(1.1) brightness(1.03) saturate(1.1)" }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-[#0A2540] truncate whitespace-nowrap">
                        {language === "np" ? "डा. मोगल प्रसाद शाह" : "Dr. Mogal Prasad Shah"}
                      </div>
                      <div className="text-xs text-[#D4AF37] font-medium truncate whitespace-nowrap">
                        {language === "np" ? "पशुपालन विकास विशेषज्ञ" : "Livestock Development Expert"}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        menuButtonRef.current?.focus();
                      }}
                      aria-label={language === "np" ? "मेनु बन्द गर्नुहोस्" : "Close menu"}
                      className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#0A2540] flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Scrollable link groups */}
                  <div
                    className="flex-1 overflow-y-auto overscroll-contain py-3 px-2"
                    style={{ WebkitOverflowScrolling: "touch" }}
                  >
                    {/* Search trigger — opens the ⌘K palette */}
                    <button
                      onClick={openSearch}
                      className="w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:border-[#D4AF37]/60 hover:text-[#0A2540] transition-all"
                    >
                      <Search size={17} className="text-[#B8941F]" />
                      <span className="text-sm">{t("not_found_search_ph")}</span>
                    </button>

                    {/* Primary pages */}
                    <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8941F]">
                      {language === "np" ? "पृष्ठहरू" : "Pages"}
                    </p>
                    {primaryNav.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            active
                              ? "bg-[#D4AF37]/15 text-[#0A2540] font-semibold border-l-4 border-[#D4AF37]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-[#0A2540]/[0.06] text-[#0A2540]"
                            }`}
                          >
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <span className="min-w-0 leading-relaxed">
                            {item.label}
                            {language === "np" && (
                              <span className="block text-[11px] font-normal text-gray-400 leading-tight">
                                {item.labelEn}
                              </span>
                            )}
                          </span>
                        </Link>
                      );
                    })}

                    {/* Farmer resources section */}
                    <p className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8941F]">
                      {t("nav_resources")}
                    </p>
                    {resourceItems.map((r) => {
                      const Icon = r.icon;
                      const active = location.pathname === r.path;
                      return (
                        <Link
                          key={r.path}
                          to={r.path}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            active
                              ? "bg-[#D4AF37]/15 text-[#0A2540] font-semibold border-l-4 border-[#D4AF37]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span
                            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              active ? "bg-[#D4AF37]/20 text-[#B8941F]" : "bg-[#0A2540]/[0.06] text-[#0A2540]"
                            }`}
                          >
                            <Icon size={16} aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block leading-relaxed">{r.label}</span>
                            <span className="block mt-0.5 text-[11px] font-normal text-gray-400 leading-tight truncate">
                              {r.blurb}
                            </span>
                          </span>
                        </Link>
                      );
                    })}

                    {/* Language switcher */}
                    <p className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-[0.22em] font-bold text-[#B8941F]">
                      {language === "np" ? "भाषा" : "Language"}
                    </p>
                    <div className="px-2">
                      <button
                        onClick={() => setLanguage(language === "en" ? "np" : "en")}
                        aria-label="Switch language / भाषा बदल्नुहोस्"
                        className="w-full flex items-center justify-center gap-0 rounded-xl border border-[#D4AF37]/40 overflow-hidden text-sm font-semibold"
                      >
                        <span className={`font-deva flex-1 py-3 transition-colors ${language === "en" ? "bg-[#D4AF37] text-[#0A2540]" : "text-gray-500"}`}>
                          English
                        </span>
                        <span className={`font-deva flex-1 py-3 transition-colors ${language === "np" ? "bg-[#D4AF37] text-[#0A2540]" : "text-gray-500"}`}>
                          नेपाली
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Sticky booking CTA — always reachable */}
                  <div
                    className="flex-shrink-0 border-t border-gray-100 p-3 bg-white"
                    style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
                  >
                    <Link to="/booking" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-[#0A2540] rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                        <CalendarCheck size={17} />
                        <span>{language === "np" ? "परामर्श बुक गर्नुहोस्" : "Book a Consultation"}</span>
                        <motion.svg
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </button>
                    </Link>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>

      {/* Global ⌘K search palette — available on every page */}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </motion.nav>
  );
}

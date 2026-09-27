import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { BreadcrumbSchema } from "./BreadcrumbSchema";

/**
 * LAYOUT BREADCRUMB — a slim "Home › <Page>" bar rendered above <main> on
 * every non-home route, together with the matching BreadcrumbList JSON-LD.
 *
 * Google's structured-data policy requires breadcrumb markup to reflect a
 * visible trail, so this component renders both — one wiring point for the
 * whole site (RootLayout). Knowledge ARTICLES are exempt: the reader's own
 * "Back to all articles" control + its 3-level trail owns that case.
 */

const PAGE_LABELS: Record<string, { en: string; np: string }> = {
  "/about": { en: "About", np: "परिचय" },
  "/services": { en: "Expertise", np: "विशेषज्ञता" },
  "/experience": { en: "Experience", np: "अनुभव" },
  "/gallery": { en: "Experience", np: "अनुभव" },
  "/publications": { en: "Publications", np: "प्रकाशनहरू" },
  "/booking": { en: "Book a Consultation", np: "परामर्श बुक गर्नुहोस्" },
  "/tools": { en: "Farm Tools", np: "कृषि औजारहरू" },
  "/knowledge": { en: "Knowledge Base", np: "ज्ञान भण्डार" },
  "/agromap": { en: "Nepal Agriculture Map", np: "नेपाल कृषि नक्सा" },
  "/contact": { en: "Contact", np: "सम्पर्क" },
};

export function LayoutBreadcrumb() {
  const { language } = useLanguage();
  const np = language === "np";
  const { pathname } = useLocation();

  // Resolve the page key (deep tool links count as their section page).
  const key = Object.keys(PAGE_LABELS)
    .sort((a, b) => b.length - a.length)
    .find((k) => pathname === k || pathname.startsWith(`${k}/`));

  // Home: no trail. Knowledge articles: the reader owns the breadcrumb
  // (3-level trail + its own schema).
  if (!key || pathname === "/" || pathname.startsWith("/knowledge/")) return null;

  const home = np ? "गृहपृष्ठ" : "Home";
  const label = np ? PAGE_LABELS[key].np : PAGE_LABELS[key].en;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: home, url: "/" },
          { name: label, url: key },
        ]}
      />
      <nav
        aria-label={np ? "ब्रेडक्रम्ब" : "Breadcrumb"}
        className="bg-white border-b border-gray-100 print:hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500">
            <li>
              <Link to="/" className="hover:text-[#B8941F] transition-colors">
                {home}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={12} />
            </li>
            <li aria-current="page" className="font-medium text-[#0A2540]">
              {label}
            </li>
          </ol>
        </div>
      </nav>
    </>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — single source of truth
 *  Dr. Mogal Prasad Shah · drmogalshah.com.np
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything contact/identity-related lives here. Update values once and
 *  every page (nav, footer, contact cards, WhatsApp button, meta tags,
 *  structured data) updates automatically.
 *
 *  ⚠️ PHONE + WHATSAPP ARE CURRENTLY SET TO A DEMO NUMBER (visible on the site
 *     so every feature can be seen working). Swap in the real number below
 *     before deploying — one edit updates the phone card, tel: links, footer
 *     phone row and the floating WhatsApp button everywhere.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // Identity ----------------------------------------------------------------
  name: "Dr. Mogal Prasad Shah",
  shortName: "Dr. M.P. Shah",
  title: "Livestock Development Expert",
  credentials: "M.Sc. Animal Nutrition · 29+ Years Experience",
  siteName: "Dr. Mogal Prasad Shah — Livestock Development Expert",

  // Canonical URL (site is served at www.drmogalshah.com.np) ----------------
  url: "https://www.drmogalshah.com.np",

  // Contact -----------------------------------------------------------------
  // ⚠️ DEMO VALUES CURRENTLY SET so the phone card + WhatsApp button are VISIBLE.
  // Replace with the real values before deploying to production!
  //
  //   phone:           "+977 98XXXXXXXX"  (display format — powers tel: calls;
  //                                        a real phone number is still required
  //                                        for network calls)
  //   whatsappUsername: "drmogalshah"      (WhatsApp username, no "@" — reserved
  //                                        in the app under Settings → Account →
  //                                        Username; links become wa.me/<username>,
  //                                        keeping the number private)
  //   whatsapp:        "97798XXXXXXXX"     (fallback: country code + number,
  //                                        digits only — used ONLY if no username
  //                                        is set)
  phone: "+977 9851162780",
  whatsappUsername: "drmogalshah", // ⚠️ demo placeholder — reserve & paste the real one
  whatsapp: "9779851162780",

  email: "info@drmogalshah.com.np",
  location: {
    en: { primary: "Bagamati Province", secondary: "Nepal" },
    np: { primary: "बागमती प्रदेश", secondary: "नेपाल" },
  },
  availability: {
    en: "Available Mon–Fri, 9AM–5PM (NPT)",
    np: "सोम–शुक्र, बिहान ९ – साँझ ५ उपलब्ध",
  },

  // Office hours in Nepal Time — powers the live "Open now / Closed" chip.
  // JS day numbers: 0 = Sunday … 6 = Saturday. Edit to match the real schedule.
  hours: {
    days: [1, 2, 3, 4, 5], // Mon–Fri
    openMinute: 9 * 60,    // 09:00 NPT
    closeMinute: 17 * 60,  // 17:00 NPT
    tzOffsetMinutes: 345,  // Nepal Standard Time = UTC+5:45
  },

  // Social --------------------------------------------------------------------
  linkedin: "https://www.linkedin.com/in/dr-mogal-prasad-shah/",
  facebook: "https://www.facebook.com/mpsah",

  // Contact form delivery -----------------------------------------------------
  // Option A (recommended): Web3Forms — create a free access key at
  //   https://web3forms.com  and paste it below, e.g. "a1b2c3d4-e5f6-..."
  // Option B: Formspree — paste your full form endpoint instead, e.g.
  //   "https://formspree.io/f/abcdwxyz"
  // While empty, the form gracefully falls back to opening the visitor's
  // email app with the message pre-filled (mailto) — never a silent failure.
  formWeb3FormsKey: "",
  formspreeEndpoint: "",

  // OG / share image (branded, self-hosted) -----------------------------------
  ogImage: "/og-image.jpg",

  // Developer credit ----------------------------------------------------------
  developer: { name: "Amresh Shah", url: "https://www.amreshshah.com.np" },
} as const;

/**
 * WhatsApp deep link, or null when nothing is configured.
 *
 * Username-first strategy (WhatsApp usernames rolled out in 2026): when
 * `whatsappUsername` is set the link is wa.me/<username> so the doctor's
 * phone number stays private — the format documented by the official
 * WhatsApp Help Center ("Your username creates a direct link
 * (wa.me/YourUsername)"). Falls back to the legacy number link otherwise.
 */
export function whatsappLink(message?: string): string | null {
  const id = siteConfig.whatsappUsername || siteConfig.whatsapp;
  if (!id) return null;
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        "Hello Dr. Shah, I found your website and would like to discuss..."
      );
  return `https://wa.me/${id}?text=${text}`;
}

/** The public WhatsApp handle shown in the UI ("@username") — or null. */
export function whatsappHandle(): string | null {
  return siteConfig.whatsappUsername
    ? `@${siteConfig.whatsappUsername}`
    : siteConfig.whatsapp || null;
}

/** International tel: href, or null when no phone is configured. */
export function telLink(): string | null {
  if (!siteConfig.phone) return null;
  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}

/** True while the placeholder demo contacts are still configured. */
export const isDemoContact =
  siteConfig.whatsappUsername === "drmogalshah" ||
  siteConfig.whatsapp === "9779801234567";

if (import.meta.env.DEV && isDemoContact) {
  console.warn(
    "[%cSite Config%c] Demo contacts in use (+977 980-123-4567 / @drmogalshah). " +
      "Replace `phone`, `whatsappUsername` and `whatsapp` in src/app/config/site.ts " +
      "before deploying.",
    "color:#D4AF37;font-weight:bold",
    "color:inherit"
  );
}

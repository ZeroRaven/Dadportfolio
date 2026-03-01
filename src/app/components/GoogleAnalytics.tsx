import { useEffect, useRef } from "react";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const initialized = useRef(false);

  // Only load analytics in production
  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    return null;
  }

  useEffect(() => {
    // Prevent double initialization
    if (initialized.current) {
      return;
    }

    // Check if already loaded in DOM
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
      initialized.current = true;
      return;
    }

    // Inject Google Analytics script (async)
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Inject gtag config script (matches official Google snippet exactly)
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);

    initialized.current = true;
  }, [measurementId]);

  return null;
}
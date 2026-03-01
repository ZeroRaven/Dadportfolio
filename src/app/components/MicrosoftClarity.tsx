import { useEffect, useRef } from "react";

interface MicrosoftClarityProps {
  projectId: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  const initialized = useRef(false);

  // Only load Clarity in production
  if (!projectId || projectId === "YOUR_CLARITY_ID") {
    return null;
  }

  useEffect(() => {
    // Prevent double initialization
    if (initialized.current) {
      return;
    }

    // Check if already loaded
    if (typeof window.clarity !== 'undefined' || document.querySelector('script[src*="clarity.ms"]')) {
      initialized.current = true;
      return;
    }

    // Inject Microsoft Clarity script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${projectId}");
    `;
    document.head.appendChild(script);

    initialized.current = true;
  }, [projectId]);

  return null;
}
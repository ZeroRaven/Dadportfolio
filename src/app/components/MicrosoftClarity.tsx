import { Helmet } from "react-helmet";
import { useEffect } from "react";

interface MicrosoftClarityProps {
  projectId: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  // Only load Clarity in production
  if (!projectId || projectId === "YOUR_CLARITY_ID") {
    return null;
  }

  useEffect(() => {
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

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [projectId]);

  return null;
}
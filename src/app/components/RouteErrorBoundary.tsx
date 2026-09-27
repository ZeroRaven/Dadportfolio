import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * ROUTE ERROR BOUNDARY — React Router 7 data mode.
 *
 * Without an ErrorBoundary anywhere in the route tree, an uncaught render
 * error or a failed lazy-chunk import (very common right after a deploy,
 * when a previously-open tab still references an old hashed JS filename)
 * leaves the user on a blank white screen. This boundary renders a styled,
 * bilingual recovery screen instead.
 *
 * A chunk-load failure is detected specially and offered a one-click
 * "Reload" (fetching the new deploy's manifest is the actual fix), while
 * render errors / 404s offer "Go home".
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const np = language === "np";

  // Stale-chunk load failure — the most likely production error after a
  // deploy (old tab references a hashed JS file that no longer exists).
  const isChunkLoadError =
    error instanceof Error &&
    /dynamically imported module|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
      error.message
    );

  const status = isRouteErrorResponse(error) ? error.status : null;
  const title = isChunkLoadError
    ? np ? "नयाँ अपडेट उपलब्ध छ" : "A new version is available"
    : status === 404
      ? np ? "पृष्ठ फेला परेन" : "Page not found"
      : np ? "केही गलत भयो" : "Something went wrong";

  const message = isChunkLoadError
    ? np
      ? "यो पृष्ठ अपडेट भएको छ। कृपया पुनः लोड गर्नुहोस्।"
      : "This page was updated since you opened it. Please reload to get the latest version."
    : np
      ? "कृपया पुनः प्रयास गर्नुहोस् वा गृहपृष्ठमा फर्किनुहोस्।"
      : "Please try again, or head back to the homepage.";

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center bg-white">
      <span className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]/40">
        <AlertTriangle className="text-[#B8941F]" size={28} aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-bold text-[#0A2540]">{title}</h1>
      <p className="text-gray-500 max-w-md">{message}</p>
      {status && status !== 404 && (
        <p className="text-xs text-gray-400 tabular-nums" aria-hidden="true">
          {np ? "त्रुटि कोड" : "Error code"}: {status}
        </p>
      )}
      <div className="flex gap-3 mt-1">
        {isChunkLoadError ? (
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-6"
          >
            <RefreshCw size={16} className="mr-2" aria-hidden="true" />
            {np ? "पुनः लोड गर्नुहोस्" : "Reload"}
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/")}
            className="bg-[#0A2540] hover:bg-[#1A3A5C] text-white px-6"
          >
            <Home size={16} className="mr-2" aria-hidden="true" />
            {np ? "गृहपृष्ठ" : "Go home"}
          </Button>
        )}
      </div>
    </div>
  );
}

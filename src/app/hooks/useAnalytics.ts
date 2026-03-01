import { useCallback } from "react";

// Custom hook for tracking analytics events
export function useAnalytics() {
  // Track page views
  const trackPageView = useCallback((pagePath: string, pageTitle: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  }, []);

  // Track custom events
  const trackEvent = useCallback((
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, eventParams);
    }
  }, []);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent("button_click", {
      button_name: buttonName,
      location: location,
    });
  }, [trackEvent]);

  // Track form submissions
  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    trackEvent("form_submit", {
      form_name: formName,
      success: success,
    });
  }, [trackEvent]);

  // Track link clicks (external/internal)
  const trackLinkClick = useCallback((linkUrl: string, linkText: string, linkType: "internal" | "external") => {
    trackEvent("link_click", {
      link_url: linkUrl,
      link_text: linkText,
      link_type: linkType,
    });
  }, [trackEvent]);

  // Track downloads
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackEvent("file_download", {
      file_name: fileName,
      file_type: fileType,
    });
  }, [trackEvent]);

  // Track social media clicks
  const trackSocialClick = useCallback((platform: string, action: string) => {
    trackEvent("social_click", {
      platform: platform,
      action: action,
    });
  }, [trackEvent]);

  // Track contact form interactions
  const trackContactInteraction = useCallback((interactionType: string) => {
    trackEvent("contact_interaction", {
      interaction_type: interactionType,
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackLinkClick,
    trackDownload,
    trackSocialClick,
    trackContactInteraction,
  };
}

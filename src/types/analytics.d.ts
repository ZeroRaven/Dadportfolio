// Global type definitions for analytics
declare global {
  interface Window {
    // Google Analytics
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    
    // Microsoft Clarity
    clarity: (...args: any[]) => void;
  }
}

export {};

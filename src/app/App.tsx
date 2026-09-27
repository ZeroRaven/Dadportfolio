import { RouterProvider } from 'react-router';
import { MotionConfig } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './routes';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { MicrosoftClarity } from './components/MicrosoftClarity';
import { analyticsConfig } from './config/analytics';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider, useA11y } from './context/AccessibilityContext';
import { SpeechProvider } from './context/SpeechContext';
import { CookieConsent } from './components/CookieConsent';
import { useConsent } from './hooks/useConsent';
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt';

/**
 * MotionConfig honours the Accessibility panel's "Reduce motion" switch:
 * "always" disables transform/layout animations globally (WCAG 2.3.3).
 */
function MotionGate({ children }: { children: React.ReactNode }) {
  const { reduceMotion } = useA11y();
  return <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>{children}</MotionConfig>;
}

/** Analytics fire only after explicit consent — never before a choice.
 *  Consent is passed from App's single useConsent() instance (a second
 *  hook instance would never see the banner's in-page update). */
function AnalyticsGate({ consent }: { consent: "granted" | "denied" | null }) {
  if (!analyticsConfig.enabled || consent !== 'granted') return null;
  return (
    <>
      <GoogleAnalytics measurementId={analyticsConfig.googleAnalyticsId} />
      <MicrosoftClarity projectId={analyticsConfig.microsoftClarityId} />
    </>
  );
}

export default function App() {
  const [consent, setConsent] = useConsent();
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <SpeechProvider>
            <MotionGate>
              <AnalyticsGate consent={consent} />
              <RouterProvider router={router} />
              {/* New-build prompt (service worker waiting) */}
              <PWAUpdatePrompt />
              {/* Banner only while no choice has been recorded */}
              {consent === null && <CookieConsent onConsent={setConsent} />}
            </MotionGate>
          </SpeechProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

import { RouterProvider } from 'react-router';
import { MotionConfig } from 'motion/react';
import { router } from './routes';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { MicrosoftClarity } from './components/MicrosoftClarity';
import { analyticsConfig } from './config/analytics';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider, useA11y } from './context/AccessibilityContext';
import { SpeechProvider } from './context/SpeechContext';

/**
 * MotionConfig honours the Accessibility panel's "Reduce motion" switch:
 * "always" disables transform/layout animations globally (WCAG 2.3.3).
 */
function MotionGate({ children }: { children: React.ReactNode }) {
  const { reduceMotion } = useA11y();
  return <MotionConfig reducedMotion={reduceMotion ? 'always' : 'user'}>{children}</MotionConfig>;
}

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <SpeechProvider>
          <MotionGate>
            {analyticsConfig.enabled && (
              <>
                <GoogleAnalytics measurementId={analyticsConfig.googleAnalyticsId} />
                <MicrosoftClarity projectId={analyticsConfig.microsoftClarityId} />
              </>
            )}
            <RouterProvider router={router} />
          </MotionGate>
        </SpeechProvider>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

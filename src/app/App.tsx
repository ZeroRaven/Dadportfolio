import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { MicrosoftClarity } from './components/MicrosoftClarity';
import { analyticsConfig } from './config/analytics';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      {analyticsConfig.enabled && (
        <>
          <GoogleAnalytics measurementId={analyticsConfig.googleAnalyticsId} />
          <MicrosoftClarity projectId={analyticsConfig.microsoftClarityId} />
        </>
      )}
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
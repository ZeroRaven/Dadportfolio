import { RouterProvider } from 'react-router';
import { router } from './routes';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { MicrosoftClarity } from './components/MicrosoftClarity';
import { analyticsConfig } from './config/analytics';

export default function App() {
  return (
    <>
      {/* Analytics Components */}
      {analyticsConfig.enabled && (
        <>
          <GoogleAnalytics measurementId={analyticsConfig.googleAnalyticsId} />
          <MicrosoftClarity projectId={analyticsConfig.microsoftClarityId} />
        </>
      )}
      
      <RouterProvider router={router} />
    </>
  );
}
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { RootLayout } from "./components/RootLayout";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";

/**
 * Route-level code splitting: only the Home page ships in the initial bundle;
 * every other route is fetched on demand. This cut the initial JavaScript
 * payload roughly in half (see CHANGES.md).
 */
const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About }))
);
const Services = lazy(() =>
  import("./pages/Services").then((m) => ({ default: m.Services }))
);
const Gallery = lazy(() =>
  import("./pages/Gallery").then((m) => ({ default: m.Gallery }))
);
const Publications = lazy(() =>
  import("./pages/Publications").then((m) => ({ default: m.Publications }))
);
const Booking = lazy(() =>
  import("./pages/Booking").then((m) => ({ default: m.Booking }))
);
const Tools = lazy(() =>
  import("./pages/Tools").then((m) => ({ default: m.Tools }))
);
const Knowledge = lazy(() =>
  import("./pages/Knowledge").then((m) => ({ default: m.Knowledge }))
);
const AgroMap = lazy(() =>
  import("./pages/AgroMap").then((m) => ({ default: m.AgroMap }))
);
const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.Contact }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);

/** Branded loading fallback shown while a lazy route chunk downloads. */
function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 bg-white">
      <div
        className="w-10 h-10 rounded-full border-[3px] border-[#D4AF37]/25 border-t-[#D4AF37]"
        style={{ animation: "boot-spin 0.9s linear infinite" }}
        role="progressbar"
        aria-label="Loading page"
      />
      <span className="text-sm text-gray-500 tracking-wide">Loading…</span>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    // Root fallback — a render error or failed lazy-chunk import renders
    // this styled bilingual recovery screen instead of a blank page.
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, Component: Home },
      {
        path: "about",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "experience",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "publications",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Publications />
          </Suspense>
        ),
      },
      {
        path: "gallery",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "booking",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Booking />
          </Suspense>
        ),
      },
      {
        path: "tools",
        ErrorBoundary: RouteErrorBoundary,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Tools />
          </Suspense>
        ),
      },
      {
        // Deep-linkable tool tabs (…/tools/vaccine-reminder): the Tools
        // component reads this param to select its active calculator.
        path: "tools/:toolId",
        ErrorBoundary: RouteErrorBoundary,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Tools />
          </Suspense>
        ),
      },
      {
        path: "knowledge",
        ErrorBoundary: RouteErrorBoundary,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Knowledge />
          </Suspense>
        ),
      },
      {
        // Deep-linkable articles (…/knowledge/milking-hygiene-mastitis):
        // same lazy component — Knowledge branches on the slug param.
        path: "knowledge/:slug",
        ErrorBoundary: RouteErrorBoundary,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Knowledge />
          </Suspense>
        ),
      },
      {
        path: "agromap",
        ErrorBoundary: RouteErrorBoundary,
        element: (
          <Suspense fallback={<RouteFallback />}>
            <AgroMap />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<RouteFallback />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

import { Helmet } from "react-helmet";
import { siteConfig } from "../config/site";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  /** Page path, e.g. "/about". Canonical becomes siteConfig.url + path. */
  path?: string;
  /** Full canonical override (rare). */
  canonical?: string;
  type?: "website" | "profile" | "article";
  /** Set true on error pages so they stay out of search results. */
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  path = "/",
  canonical,
  type = "website",
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.siteName}`;
  const image = ogImage || `${siteConfig.url}${siteConfig.ogImage}`;
  const url = canonical || `${siteConfig.url}${path === "/" ? "/" : path}`;

  const robots = noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />

      <meta name="robots" content={robots} />
      <meta name="googlebot" content={noindex ? "noindex, follow" : "index, follow"} />
      <meta name="author" content={siteConfig.name} />
      <meta name="geo.region" content="NP" />
      <meta name="geo.placename" content="Nepal" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteConfig.siteName} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#0A2540" />
    </Helmet>
  );
}

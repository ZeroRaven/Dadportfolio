import { siteConfig } from "../config/site";

/**
 * ARTICLE SCHEMA — schema.org Article JSON-LD for knowledge-base articles.
 *
 * Rendered alongside the per-article <SEO type="article"> on /knowledge/:slug.
 * Article remains a live rich-result type in Google's structured-data
 * gallery (unlike FAQPage/HowTo, which were retired from Search in 2026).
 */
export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  image,
}: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    // KNOWN SIMPLIFICATION: datePublished == dateModified. The KB data model
    // tracks a single "updated" month (YYYY-MM) per article; a separate
    // first-published field doesn't exist yet. Both dates use that one
    // honest value (padded to NPT midnight) rather than fabricating a
    // different day-level date.
    datePublished,
    dateModified,
    inLanguage: "en",
    author: [{ "@type": "Person", name: siteConfig.name, url: siteConfig.url }],
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}${siteConfig.ogImage}` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/knowledge`,
    },
  };
  if (image) schema.image = [`${siteConfig.url}${image}`];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

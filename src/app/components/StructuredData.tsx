import { siteConfig } from "../config/site";

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  faqs: FAQItem[];
}

/**
 * Page-specific structured data (FAQ + ProfessionalService).
 * Person and WebSite schemas live statically in index.html so they are
 * crawler-visible without JavaScript execution.
 */
export function StructuredData({ faqs }: StructuredDataProps) {
  const baseUrl = siteConfig.url;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dr. Mogal Prasad Shah - Livestock Development Consulting",
    "description": "Expert consulting services in livestock development, food security, rural development, and agricultural policy for Nepal and South Asia.",
    "url": baseUrl,
    "email": siteConfig.email,
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "provider": {
      "@type": "Person",
      "name": siteConfig.name
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

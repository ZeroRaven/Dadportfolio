interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  faqs: FAQItem[];
}

export function StructuredData({ faqs }: StructuredDataProps) {
  const baseUrl = "https://drmogalshah.com.np";
  
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Mogal Prasad Shah",
    "honorificPrefix": "Dr.",
    "givenName": "Mogal Prasad",
    "familyName": "Shah",
    "jobTitle": "Livestock Development Expert & Former Director",
    "description": "M.Sc. Animal Nutrition with 27+ years of senior leadership in livestock development, food security, and rural agricultural innovation in Nepal.",
    "url": baseUrl,
    "email": "info@drmogalshah.com.np",
    "sameAs": ["https://www.linkedin.com/in/dr-mogal-prasad-shah/"],
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Tribhuvan University",
        "location": "Nepal"
      },
      {
        "@type": "CollegeOrUniversity",
        "name": "Larenstein University of Professional Education",
        "location": "Deventer, Netherlands"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Master of Science in Animal Nutrition"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Bachelor of Veterinary Science and Animal Husbandry"
      }
    ],
    "knowsAbout": [
      "Livestock Development",
      "Animal Nutrition",
      "Food Security",
      "Rural Development",
      "Climate-Resilient Agriculture",
      "Veterinary Sciences",
      "Agricultural Policy",
      "Project Management"
    ]
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Dr. Mogal Prasad Shah - Livestock Development Consulting",
    "description": "Expert consulting services in livestock development, food security, rural development, and agricultural policy for Nepal and South Asia.",
    "url": baseUrl,
    "email": "info@drmogalshah.com.np",
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "provider": {
      "@type": "Person",
      "name": "Dr. Mogal Prasad Shah"
    }
  };

  // FAQ Schema
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
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
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "profile" | "article";
}

export function SEO({ title, description, keywords, ogImage, canonical, type = "website" }: SEOProps) {
  const siteName = "Dr. Mogal Prasad Shah - Livestock Development Expert";
  const fullTitle = title.includes("Dr. Mogal Prasad Shah") ? title : `${title} | ${siteName}`;
  const defaultImage = ogImage || "https://images.unsplash.com/photo-1635183067334-c0dbdac46c73?w=1200&h=630&fit=crop";
  const baseUrl = "https://drmogalshah.com.np";
  const siteUrl = canonical || baseUrl;

  // Enhanced structured data for AI SEO
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
    "image": defaultImage,
    "email": "info@drmogalshah.com.np",
    "sameAs": [
      "https://www.linkedin.com/in/dr-mogal-prasad-shah/"
    ],
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
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Livestock Development Consultant",
        "occupationLocation": {
          "@type": "Country",
          "name": "Nepal"
        },
        "skills": "Livestock Development, Animal Nutrition, Food Security, Rural Development, Climate-Resilient Agriculture, Project Management, Policy Formulation"
      }
    ],
    "workLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bagamati Province",
        "addressCountry": "Nepal"
      }
    },
    "knowsAbout": [
      "Livestock Development",
      "Animal Nutrition",
      "Food Security",
      "Rural Development",
      "Climate-Resilient Agriculture",
      "Veterinary Sciences",
      "Agricultural Policy",
      "Project Management",
      "Capacity Building",
      "Community Development",
      "Sustainable Agriculture",
      "Animal Husbandry",
      "Nepal Agriculture"
    ],
    "award": [
      "27+ Years of Excellence in Livestock Development",
      "Former Director at Directorate of Livestock and Fisheries Development"
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
    },
    "serviceType": [
      "Livestock Development Consulting",
      "Agricultural Policy Advisory",
      "Food Security Planning",
      "Rural Development Programs",
      "Climate-Resilient Agriculture",
      "Project Management",
      "Capacity Building",
      "Technical Assessments"
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": baseUrl,
    "description": "Professional portfolio and consulting services of Dr. Mogal Prasad Shah, livestock development expert with 27+ years of experience in Nepal.",
    "author": {
      "@type": "Person",
      "name": "Dr. Mogal Prasad Shah"
    },
    "inLanguage": "en-US"
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={siteUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Dr. Mogal Prasad Shah" />
      <meta name="geo.region" content="NP" />
      <meta name="geo.placename" content="Nepal" />
      
      {/* Mobile Optimization */}
      <meta name="theme-color" content="#0A2540" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Dr. Mogal Shah" />
    </Helmet>
  );
}
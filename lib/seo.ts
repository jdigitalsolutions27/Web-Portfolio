import type { Metadata } from "next";
import { PROFILE, SITE_URL } from "@/lib/constants";

export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${PROFILE.name}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: PROFILE.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/images/og-cover.svg`,
          width: 1200,
          height: 630,
          alt: `${PROFILE.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/images/og-cover.svg`],
    },
  };
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    email: PROFILE.email,
    telephone: PROFILE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alangalang",
      addressRegion: "Leyte",
      addressCountry: "PH",
    },
    sameAs: [PROFILE.links.portfolioOne, PROFILE.links.portfolioTwo, PROFILE.links.github, PROFILE.links.facebook, PROFILE.links.whatsapp],
    url: SITE_URL,
    knowsLanguage: ["English", "Filipino", "Waray-waray"],
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PROFILE.name} Portfolio`,
    url: SITE_URL,
    description:
      "Premium full-stack portfolio showcasing modern web development, UI engineering, and advocacy-focused digital work.",
    author: {
      "@type": "Person",
      name: PROFILE.name,
    },
  };
}


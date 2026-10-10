import type { Metadata } from "next";
import type { StaticImageData } from "next/image";

import type { Crumb } from "@/components/ui/breadcrumbs";
import type { Service } from "@/content/services";
import { serviceHref } from "@/content/services";
import { fullAddress, site } from "@/content/site";

/** Default social share image (rendered by scripts/generate-og.mjs). */
export const defaultOgImage = {
  url: "/og/sparkle-pros.jpg",
  width: 1200,
  height: 630,
  alt: "Sparkle Pros — steam and deep cleaning services in Coimbatore",
};

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: { src: StaticImageData; alt: string };
  /** Use the full title as-is, without the "| Sparkle Pros" suffix. */
  absoluteTitle?: boolean;
}

/** Consistent title, description, canonical URL, Open Graph and Twitter tags for a page. */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const images = image
    ? [{ url: image.src.src, width: image.src.width, height: image.src.height, alt: image.alt }]
    : [defaultOgImage];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
    },
  };
}

const businessId = `${site.url}/#business`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: site.name,
    slogan: "Steam cleans better",
    description: site.description,
    url: site.url,
    logo: `${site.url}/brand/icon-512.png`,
    image: `${site.url}${defaultOgImage.url}`,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: "Coimbatore" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    paymentAccepted: "UPI, Bank transfer, Cash",
    sameAs: [site.social.instagram],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": businessId },
    inLanguage: "en-IN",
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(serviceHref(service.slug))}#service`,
    name: service.h1,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(serviceHref(service.slug)),
    image: absoluteUrl(service.image.src.src),
    provider: {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: site.name,
      telephone: site.phone.e164,
      address: fullAddress,
    },
    areaServed: { "@type": "City", name: "Coimbatore" },
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

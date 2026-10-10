import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { ServiceCard } from "@/components/services/service-card";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { serviceCategories, services } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export const metadata: Metadata = pageMetadata({
  title: "Cleaning Services in Coimbatore",
  description:
    "Explore Sparkle Pros cleaning services in Coimbatore: home, apartment and villa deep cleaning, sofa, kitchen and bathroom cleaning, and office and commercial cleaning.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Our services"
        title="Cleaning services in Coimbatore"
        description="Eight services, one standard. Every job is carried out by our own verified crew with professional equipment and 140°C steam — and you pay only after you've inspected the result."
      />

      <div className="space-y-20 pb-20 sm:space-y-28 sm:pb-28">
        {serviceCategories.map((category) => {
          const items = services.filter((service) => service.category === category.id);
          return (
            <section
              key={category.id}
              aria-labelledby={`category-${category.id}`}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
              <div className="flex flex-col gap-2 border-b border-plum-900/10 pb-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
                <h2 id={`category-${category.id}`} className="text-3xl font-semibold text-plum-900 sm:text-4xl">
                  {category.label === "Homes" ? "Home cleaning" : `${category.label} cleaning`}
                </h2>
                <p className="text-ink-soft">{category.description}</p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {items.map((service, index) => (
                  <li key={service.slug} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
                    <ServiceCard service={service} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <CtaBand
        title="Not sure which service you need?"
        description="Tell us about the space — or send a few photos on WhatsApp — and we'll recommend the right clean and give you a fixed quote."
      />
    </>
  );
}

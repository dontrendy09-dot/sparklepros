import type { Metadata } from "next";

import { BookingSteps } from "@/components/home/booking-steps";
import { CleaningProcess } from "@/components/home/cleaning-process";
import { Commitments } from "@/components/home/commitments";
import { FaqSection } from "@/components/home/faq-section";
import { Hero } from "@/components/home/hero";
import { LocalRoots } from "@/components/home/local-roots";
import { PromiseBand } from "@/components/home/promise-band";
import { ServiceAreas } from "@/components/home/service-areas";
import { ServicesShowcase } from "@/components/home/services-showcase";
import { QuoteSection } from "@/components/quote/quote-section";
import { JsonLd } from "@/components/ui/json-ld";
import { homeFaqs } from "@/content/home";
import { faqJsonLd, localBusinessJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sparkle Pros | Steam & Deep Cleaning Services in Coimbatore",
  absoluteTitle: true,
  description:
    "Home, sofa, kitchen, bathroom, villa, office and commercial deep cleaning in Coimbatore with 140°C steam and a verified in-house crew. Pay after inspection.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), websiteJsonLd(), faqJsonLd(homeFaqs)]} />
      <Hero />
      <Commitments className="-mt-6 pb-4 sm:-mt-10" />
      <ServicesShowcase />
      <CleaningProcess />
      <LocalRoots />
      <BookingSteps />
      <PromiseBand />
      <ServiceAreas />
      <FaqSection items={homeFaqs} />
      <QuoteSection />
    </>
  );
}

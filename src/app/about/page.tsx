import { Check, Eye, Target } from "lucide-react";
import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import bathroom from "@/assets/images/bathroom-cleaning.jpg";
import commercial from "@/assets/images/commercial-cleaning-team.jpg";
import kitchen from "@/assets/images/kitchen-cleaning.jpg";
import sofa from "@/assets/images/sofa-steam-extraction.jpg";
import steam from "@/assets/images/steam-cleaning-bedroom.jpg";
import villa from "@/assets/images/villa-cleaning-team.jpg";
import { Commitments } from "@/components/home/commitments";
import { CtaBand } from "@/components/ui/cta-band";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export const metadata: Metadata = pageMetadata({
  title: "About Sparkle Pros | Steam Cleaning Specialists, Coimbatore",
  absoluteTitle: true,
  description:
    "Sparkle Pros replaces rushed, chemical-heavy cleaning with 140°C steam, mechanised scrubbing and an in-house, background-verified crew across Coimbatore.",
  path: "/about",
  image: { src: villa, alt: "The Sparkle Pros crew cleaning a villa living room" },
});

const pillars = [
  {
    icon: Eye,
    label: "Our vision",
    title: "Deep hygiene without harsh fumes, as the standard in every home.",
    body: "We picture homes and workplaces where a deep clean doesn't mean breathing in strong chemical fumes. High-temperature steam and mechanical scrubbing let us lift dirt at the source while caring for families, pets and premium interior surfaces.",
    points: ["140°C thermal steam", "Professional Kärcher machinery", "No ammonia or harsh bleach in living spaces"],
  },
  {
    icon: Target,
    label: "Our mission",
    title: "Precision, dignity of labour and honest service — every day.",
    body: "Our mission is carried out by in-house, background-verified technicians who treat every property with care. We reject rushed, superficial dusting, follow a 40-point room-by-room audit and keep one firm rule: you pay only after you've inspected and approved the results.",
    points: ["100% in-house verified crew", "40-point room quality audit", "Pay only after inspection"],
  },
];

const gallery: { src: StaticImageData; alt: string; caption: string; className: string; position?: string }[] = [
  {
    src: villa,
    alt: "Sparkle Pros crew cleaning a double-height villa living room",
    caption: "Villa cleaning",
    className: "sm:col-span-2 lg:col-span-4 lg:row-span-2",
  },
  {
    src: sofa,
    alt: "Technician cleaning a fabric sofa with a spray-extraction machine",
    caption: "Sofa extraction",
    className: "lg:col-span-2",
    position: "60% 50%",
  },
  {
    src: kitchen,
    alt: "Technician detailing a marble kitchen counter",
    caption: "Kitchen detailing",
    className: "lg:col-span-2",
  },
  {
    src: bathroom,
    alt: "Two technicians descaling bathroom tiles and scrubbing floor grout",
    caption: "Bathroom descaling",
    className: "lg:col-span-2",
    position: "60% 50%",
  },
  {
    src: steam,
    alt: "Technician steam-cleaning a mattress with a branded steam machine",
    caption: "Mattress steam cleaning",
    className: "lg:col-span-2",
    position: "35% 50%",
  },
  {
    src: commercial,
    alt: "Sparkle Pros crew cleaning an office lobby and its glass frontage",
    caption: "Office & commercial",
    className: "sm:col-span-2 lg:col-span-2",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="About Sparkle Pros"
        title={
          <>
            Elevating the standard of clean across <span className="font-medium text-violet-600 italic">Coimbatore</span>.
          </>
        }
        description="Sparkle Pros was built to replace rushed, chemical-heavy cleaning with 140°C steam technology, mechanised rotary scrubbing and genuine in-house craftsmanship — for homes and businesses across Coimbatore and the Kongu region."
      />

      <section className="pb-20 sm:pb-28" aria-label="Team at work">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.25rem] bg-lilac-200 shadow-card sm:aspect-[21/9]" data-reveal="zoom">
            <Image
              src={commercial}
              alt="Three Sparkle Pros technicians cleaning walls, floors and glass in a bright office lobby"
              fill
              preload
              sizes="(min-width: 1280px) 1216px, 94vw"
              className="object-cover"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="purpose-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our purpose"
            title={<span id="purpose-heading">The principles behind every visit</span>}
            description="What guides every home visit, every machine we choose and every job we sign off."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                className={cn(
                  "relative overflow-hidden rounded-[2rem] p-8 sm:p-10",
                  index === 0 ? "bg-lilac-100" : "bg-plum-900 text-white",
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl",
                    index === 0 ? "bg-white text-plum-700" : "bg-white/10 text-violet-300",
                  )}
                >
                  <pillar.icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <p className={cn("mt-6 text-sm font-semibold uppercase tracking-[0.16em]", index === 0 ? "text-violet-600" : "text-violet-300")}>
                  {pillar.label}
                </p>
                <h3 className={cn("mt-3 text-2xl leading-snug font-semibold sm:text-3xl", index === 0 ? "text-plum-900" : "text-white")}>
                  {pillar.title}
                </h3>
                <p className={cn("mt-4 leading-relaxed", index === 0 ? "text-ink-soft" : "text-white/75")}>{pillar.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 font-medium">
                      <Check className={cn("h-4.5 w-4.5", index === 0 ? "text-violet-600" : "text-violet-300")} aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                {index === 1 && <Sparkle className="absolute right-8 top-8 h-7 w-7 text-violet-300" twinkle />}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our guiding principles"
            title={<span id="principles-heading">Why homeowners and facility managers trust us</span>}
          />
        </div>
        <Commitments className="mt-12" headingId="principles-heading" />
      </section>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="On the job"
            title={<span id="gallery-heading">Our crew at work</span>}
            description="Uniformed, in-house technicians with professional equipment — across villas, apartments, kitchens, bathrooms and offices."
          />
          <ul className="mt-12 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 sm:auto-rows-[17rem] lg:grid-cols-8 lg:auto-rows-[15rem]">
            {gallery.map((item, index) => (
              <li
                key={item.caption}
                data-reveal="zoom"
                style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as CSSProperties}
                className={cn("group relative overflow-hidden rounded-[1.5rem] bg-lilac-200", item.className)}
              >
                <figure className="h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={index === 0 ? "(min-width: 1024px) 50vw, 94vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 47vw, 94vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.05]"
                    style={{ objectPosition: item.position ?? "50% 50%" }}
                  />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-plum-900">
                    {item.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-20 sm:pt-28">
        <CtaBand title="Experience the Sparkle Pros standard" />
      </div>
    </>
  );
}

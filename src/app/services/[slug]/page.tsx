import { ArrowRight, Check, CircleCheck, Sparkles, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { FaqSection } from "@/components/home/faq-section";
import { QuoteSection } from "@/components/quote/quote-section";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceIcon } from "@/components/services/service-icon";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { getService, serviceCategories, serviceHref, services } from "@/content/services";
import { whatsappUrl } from "@/content/site";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: serviceHref(service.slug),
    image: { src: service.image.src, alt: service.image.alt },
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = serviceCategories.find((item) => item.id === service.category);
  const related = service.related.map(getService).filter((item) => item !== undefined);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: serviceHref(service.slug) },
  ];
  const serviceNoun = service.name.toLowerCase();

  return (
    <>
      <JsonLd data={[serviceJsonLd(service), breadcrumbJsonLd(crumbs), faqJsonLd(service.faqs)]} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden" aria-labelledby="service-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-48 -top-56 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-200),transparent)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-24">
          <Breadcrumbs items={crumbs} className="animate-rise" />
          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="inline-flex animate-rise items-center gap-2.5 rounded-full bg-white/80 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-plum-700 shadow-sm ring-1 ring-plum-900/[0.06] [animation-delay:60ms]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-plum-800 text-white">
                  <ServiceIcon name={service.icon} className="h-3.5 w-3.5" />
                </span>
                {category?.label} cleaning · Coimbatore
              </p>
              <h1
                id="service-heading"
                className="mt-6 animate-lift text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-plum-900 [animation-delay:120ms] sm:text-6xl lg:text-[4.1rem]"
              >
                {service.h1}
              </h1>
              <p className="mt-6 max-w-xl animate-lift text-lg leading-relaxed text-ink-soft [animation-delay:220ms] sm:text-[1.2rem]">
                {service.intro}
              </p>
              <ul className="mt-8 animate-rise space-y-3 [animation-delay:300ms]">
                {service.highlights.map((item) => (
                  <li key={item} className="flex gap-3 font-medium text-ink">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lilac-100 text-plum-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:380ms] sm:flex-row">
                <ButtonLink href="#quote" size="lg" className="shimmer-auto">
                  Get a free quote <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href={whatsappUrl(`Hi Sparkle Pros, I'd like a quote for ${serviceNoun}.`)}
                  external
                  variant="secondary"
                  size="lg"
                >
                  <WhatsAppIcon className="h-5 w-5 text-whatsapp" /> WhatsApp us
                </ButtonLink>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[2.25rem] border border-plum-800/10 bg-lilac-100 sm:-translate-x-5 sm:translate-y-5"
                />
                <div className="relative aspect-[4/4.4] overflow-hidden rounded-[2rem] bg-lilac-200 shadow-card">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 46vw, (min-width: 640px) 34rem, 92vw"
                    className="animate-photo-in object-cover"
                    style={{ objectPosition: service.image.position }}
                  />
                </div>
                <Sparkle className="absolute -right-3 -top-5 h-8 w-8 text-violet-500" twinkle />
                <Sparkle className="absolute -bottom-7 left-12 h-5 w-5 text-mauve-500" variant="outline" twinkle delay="1.2s" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's included + equipment */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="included-heading">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Scope & overview"
              title={<span id="included-heading">What&apos;s included in every visit</span>}
              description={service.overview}
            />
            <div className="mt-10 rounded-[1.75rem] bg-plum-900 p-7 text-white shadow-card" data-reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-violet-300">
                  <Wrench className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold">Equipment we bring</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {service.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/85">
                    <Sparkle className="h-3.5 w-3.5 text-violet-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="grid gap-3 self-start sm:grid-cols-2 lg:col-span-7">
            {service.included.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
                className={`flex gap-4 rounded-[1.5rem] bg-ivory p-5 ring-1 ring-plum-900/[0.06] sm:p-6 ${
                  index === service.included.length - 1 && service.included.length % 2 === 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="font-display text-2xl leading-none font-semibold text-violet-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="bg-lilac-50 py-20 sm:py-28" aria-labelledby="service-process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our method"
            title={<span id="service-process-heading">Our {serviceNoun} process</span>}
            description="The same disciplined sequence on every visit — so you know exactly what to expect."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                className="relative rounded-[1.75rem] bg-white p-7 shadow-card ring-1 ring-plum-900/[0.05]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-plum-800 font-display text-lg font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-plum-900">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 sm:py-28" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Why it's worth it" title={<span id="benefits-heading">What you get with Sparkle Pros</span>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
            {service.benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                className="group rounded-[1.75rem] bg-white p-8 shadow-card ring-1 ring-plum-900/[0.05] transition-[transform,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lilac-100 text-plum-700 transition-colors duration-500 group-hover:bg-plum-800 group-hover:text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-plum-900">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Preparation & aftercare */}
      <section className="pb-20 sm:pb-28" aria-labelledby="prep-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="prep-heading" className="sr-only">
            Preparation and aftercare
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            {[
              { title: "Before we arrive", eyebrow: "Preparation", items: service.preparation },
              { title: "After we leave", eyebrow: "Aftercare", items: service.aftercare },
            ].map((group, index) => (
              <div
                key={group.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                className={`rounded-[2rem] p-8 sm:p-10 ${index === 0 ? "bg-lilac-100" : "bg-sand"}`}
              >
                <Eyebrow>{group.eyebrow}</Eyebrow>
                <h3 className="mt-3 text-3xl font-semibold text-plum-900">{group.title}</h3>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink">
                      <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={service.faqs}
        title={`${service.name} questions`}
        description={`Common questions about ${serviceNoun} in Coimbatore.`}
      />

      <QuoteSection
        title={`Get a free ${serviceNoun} quote`}
        description="Tell us a little about the space. We'll call you to confirm the scope and give you a clear, fixed quote — you pay only after you've inspected the work."
        defaultService={service.slug}
      />

      {/* Related services */}
      <section className="py-20 sm:py-28" aria-labelledby="related-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Related services" title={<span id="related-heading">Often booked together</span>} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {related.map((item, index) => (
              <li key={item.slug} data-reveal style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}>
                <ServiceCard service={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

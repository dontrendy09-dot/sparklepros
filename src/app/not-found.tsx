import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { serviceHref, services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-200),transparent)]" />
      </div>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="relative mx-auto h-20 w-20">
          <Sparkle className="h-20 w-20 text-violet-500" twinkle />
          <Sparkle className="absolute -right-6 top-0 h-6 w-6 text-mauve-500" variant="outline" twinkle delay="1s" />
        </div>
        <Eyebrow className="mt-10">Error 404</Eyebrow>
        <h1 className="mt-4 text-5xl leading-[1.05] font-semibold tracking-[-0.03em] text-plum-900 sm:text-6xl">
          This page has been swept away.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try one of these instead.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact#quote" variant="secondary" size="lg">
            Get a free quote
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap justify-center gap-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service.slug)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-plum-800/10 bg-white px-4 py-2 text-sm font-medium text-plum-800 transition-colors hover:border-plum-800/30"
              >
                {service.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

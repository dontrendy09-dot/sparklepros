import { ArrowRight } from "lucide-react";

import { site, whatsappUrl } from "@/content/site";

import { WhatsAppIcon } from "./brand-icons";
import { ButtonLink } from "./button";
import { Sparkle } from "./sparkle";

/** Compact closing call-to-action for pages without an embedded form. */
export function CtaBand({
  title = "Ready for a cleaner space?",
  description = "Tell us what needs cleaning and we'll come back with a clear, fixed quote. You pay only after you've inspected the work.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div
        className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-plum-900 px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16"
        data-reveal="zoom"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(129_55_194/0.4),transparent)]" />
        </div>
        <Sparkle className="absolute right-10 top-10 h-7 w-7 text-violet-300" twinkle />
        <Sparkle className="absolute bottom-10 right-1/3 hidden h-4 w-4 text-white/70 sm:block" variant="outline" twinkle delay="1.2s" />
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2 className="text-[2.1rem] leading-[1.06] font-semibold tracking-[-0.02em] text-balance sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink href="/contact#quote" variant="light" size="lg">
              Get a free quote <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="outline-light" size="lg">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp
            </ButtonLink>
          </div>
        </div>
        <p className="mt-8 text-sm text-white/55">
          Or call{" "}
          <a href={site.phone.href} className="font-semibold text-white/85 underline-offset-4 hover:underline">
            {site.phone.display}
          </a>{" "}
          · {site.hours.display}
        </p>
      </div>
    </section>
  );
}

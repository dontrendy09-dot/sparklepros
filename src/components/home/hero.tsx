import { ArrowRight, Check, Thermometer, Wallet } from "lucide-react";
import Image from "next/image";

import steamBedroom from "@/assets/images/steam-cleaning-bedroom.jpg";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Sparkle } from "@/components/ui/sparkle";
import { whatsappUrl } from "@/content/site";

const assurances = ["140°C steam", "Verified in-house crew", "Pay after inspection"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-48 -top-56 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-200),transparent)]" />
        <div className="absolute -bottom-72 -left-60 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-100),transparent)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-6 xl:pr-6">
          <p className="inline-flex animate-rise items-center gap-2 rounded-full border border-plum-800/10 bg-white px-3.5 py-1.5 text-[0.78rem] font-semibold text-plum-700 shadow-sm sm:text-[0.82rem]">
            <Sparkle className="h-3.5 w-3.5 text-violet-600" />
            <span className="hidden sm:inline">Steam cleans better ·</span> Coimbatore &amp; Kongu region
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.035em] text-plum-900 sm:text-[4.1rem] lg:text-[4.5rem] xl:text-[5.3rem]"
          >
            <span className="block animate-lift [animation-delay:60ms]">A cleaner space</span>
            <span className="block animate-lift [animation-delay:140ms]">
              changes{" "}
              <em className="relative inline-block font-medium text-violet-600 italic">
                everything
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full origin-left animate-draw text-violet-300 sm:-bottom-3 sm:h-4"
                >
                  <path
                    d="M4 14C60 5 140 3 296 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
                <Sparkle
                  className="absolute -right-6 -top-3 h-5 w-5 text-violet-500 sm:-right-8 sm:h-7 sm:w-7"
                  twinkle
                  delay="1.4s"
                />
              </em>
              .
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-lift text-lg leading-relaxed text-ink-soft [animation-delay:300ms] sm:text-[1.2rem]">
            Mechanised deep cleaning and 140°C steam for homes, apartments, villas and businesses across Coimbatore —
            carried out by our own background-verified, in-house crew.
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:400ms] sm:flex-row">
            <ButtonLink href="#quote" size="lg" className="shimmer-auto">
              Get a free quote
              <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="secondary" size="lg">
              <WhatsAppIcon className="h-5 w-5 text-whatsapp" />
              WhatsApp us
            </ButtonLink>
          </div>

          <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-3 [animation-delay:520ms]">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.92rem] font-medium text-ink">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-lilac-100 text-plum-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2.25rem] border border-plum-800/10 bg-lilac-100 sm:translate-x-5 sm:translate-y-5"
            />
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] bg-lilac-200 shadow-card sm:aspect-[4/4.2] lg:aspect-[4/4.7]">
              <Image
                src={steamBedroom}
                alt="Two Sparkle Pros technicians steam-cleaning a mattress and an armchair in a bright bedroom"
                fill
                preload
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, (min-width: 640px) 34rem, 92vw"
                className="animate-photo-in object-cover"
                style={{ objectPosition: "36% 50%" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-plum-950/45 to-transparent" />
            </div>

            <div className="absolute -left-2 bottom-6 flex max-w-[18rem] animate-rise items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 shadow-card ring-1 ring-plum-900/5 [animation-delay:750ms] sm:-left-8 sm:bottom-10">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plum-800 text-white">
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[0.92rem] font-semibold text-plum-900">Pay after inspection</span>
                <span className="block text-[0.8rem] leading-snug text-ink-soft">Walk through every room first</span>
              </span>
            </div>

            <div className="absolute -right-1 top-6 flex animate-rise items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-plum-900 shadow-card ring-1 ring-plum-900/5 [animation-delay:900ms] sm:-right-5 sm:top-10">
              <Thermometer className="h-4 w-4 text-violet-600" aria-hidden="true" />
              140°C steam
            </div>

            <Sparkle className="absolute -top-5 left-8 h-8 w-8 text-violet-500" twinkle />
            <Sparkle className="absolute -bottom-8 right-14 h-6 w-6 text-mauve-500" variant="outline" twinkle delay="1.1s" />
            <Sparkle className="absolute right-10 top-[42%] h-4 w-4 text-white" twinkle delay="2.2s" />
          </div>
        </div>
      </div>
    </section>
  );
}

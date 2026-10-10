import type { CSSProperties } from "react";
import { BadgeIndianRupee, RefreshCcw, ScrollText } from "lucide-react";

import { InstagramIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { site } from "@/content/site";

const promises = [
  {
    icon: ScrollText,
    title: "A fixed quote",
    body: "Once our lead technician confirms the scope on-site, the price is fixed — no surprise charges.",
  },
  {
    icon: RefreshCcw,
    title: "Re-treated on the spot",
    body: "If an agreed area isn't right during the walkthrough, the crew fixes it before the job is closed.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Pay when you're satisfied",
    body: "No advance payment. Pay by UPI, bank transfer or cash after your inspection.",
  },
];

/**
 * Stands in for testimonials: rather than publishing reviews we can't verify,
 * it explains the guarantee that lets customers judge the work themselves.
 */
export function PromiseBand() {
  return (
    <section className="defer-render relative isolate overflow-hidden bg-plum-900 py-20 text-white sm:py-28" aria-labelledby="promise-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 -top-48 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(129_55_194/0.35),transparent)]" />
        <div className="absolute -bottom-56 -left-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_166_230/0.14),transparent)]" />
      </div>
      <Sparkle className="absolute left-[8%] top-16 h-6 w-6 text-violet-300/80" twinkle />
      <Sparkle className="absolute bottom-20 right-[45%] hidden h-4 w-4 text-white/70 lg:block" variant="outline" twinkle delay="1.8s" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8">
        <div className="lg:col-span-7" data-reveal>
          <Eyebrow tone="light">Our promise</Eyebrow>
          <h2
            id="promise-heading"
            className="mt-5 text-[2.3rem] leading-[1.04] font-semibold tracking-[-0.025em] text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            Inspect every corner first.{" "}
            <span className="font-medium text-violet-300 italic">Pay only when you&apos;re happy.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            We&apos;d rather you judge the results yourself. When the work is done, our supervisor walks through every
            room with you on our 40-point checklist — and only then do you pay.
          </p>
          <ButtonLink href={site.social.instagram} external variant="outline-light" size="lg" className="mt-9">
            <InstagramIcon className="h-5 w-5" />
            See our work on Instagram
          </ButtonLink>
        </div>

        <ul className="space-y-4 lg:col-span-5">
          {promises.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition-colors duration-500 hover:bg-white/[0.07] sm:p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-violet-300">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold">{item.title}</span>
                <span className="mt-1 block leading-relaxed text-white/70">{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

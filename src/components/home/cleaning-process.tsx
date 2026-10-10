import Image from "next/image";
import type { CSSProperties } from "react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { cleaningProcess } from "@/content/home";

export function CleaningProcess() {
  return (
    <section id="process" className="defer-render relative overflow-hidden bg-lilac-50 py-20 sm:py-28" aria-labelledby="process-heading">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-200),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="How we clean"
              title={<span id="process-heading">Steam. Agitate. Extract. Then inspect.</span>}
            />
          </div>
          <p className="text-[1.05rem] leading-relaxed text-ink-soft lg:col-span-5 lg:pb-2" data-reveal>
            Every visit follows the same disciplined sequence, so the result never depends on luck. It starts with a
            walkthrough and a spot test — and it ends with your inspection.
          </p>
        </div>

        <ol
          role="list"
          tabIndex={0}
          aria-label="Cleaning process, four steps"
          className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-4"
        >
          {cleaningProcess.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="w-[82%] shrink-0 snap-start sm:w-auto"
            >
              <article className="group h-full rounded-[1.75rem] bg-white p-3 shadow-card ring-1 ring-plum-900/[0.05]">
                <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.25rem] bg-lilac-200">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 80vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-plum-800">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-3 pb-4 pt-5">
                  <h3 className="flex items-center gap-2 text-2xl font-semibold text-plum-900">
                    {step.title}
                    {index === cleaningProcess.length - 1 && <Sparkle className="h-4 w-4 text-violet-500" twinkle />}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-center text-xs font-medium text-ink-soft sm:hidden" aria-hidden="true">
          Swipe to see all four steps →
        </p>
      </div>
    </section>
  );
}

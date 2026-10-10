import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Eyebrow } from "./section-heading";
import { Sparkle } from "./sparkle";

/** Text-led page header for inner pages (services index, contact, legal). */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-52 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-200),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="animate-rise" />}
        <div className="mt-10 max-w-4xl">
          <Eyebrow className="animate-rise [animation-delay:60ms]">{eyebrow}</Eyebrow>
          <h1 className="mt-5 animate-lift text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-plum-900 [animation-delay:120ms] sm:text-6xl lg:text-[4.4rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl animate-lift text-lg leading-relaxed text-ink-soft [animation-delay:220ms] sm:text-xl">
              {description}
            </p>
          )}
          {children && <div className="mt-9 animate-rise [animation-delay:320ms]">{children}</div>}
        </div>
      </div>
      <Sparkle className="absolute right-[12%] top-24 hidden h-10 w-10 text-violet-500 lg:block" twinkle />
      <Sparkle className="absolute right-[22%] top-48 hidden h-5 w-5 text-mauve-500 lg:block" variant="outline" twinkle delay="1.5s" />
    </section>
  );
}

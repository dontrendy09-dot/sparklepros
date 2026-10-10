import type { ReactNode } from "react";

import { JsonLd } from "./json-ld";
import { PageHero } from "./page-hero";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

/** Shared layout for the privacy policy and terms of service. */
export function LegalPage({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: title, href: path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero breadcrumbs={crumbs} eyebrow={`Last updated ${updated}`} title={title} description={intro} />
      <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`legal-${index}`}>
              <h2 id={`legal-${index}`} className="flex items-baseline gap-3 text-2xl font-semibold text-plum-900 sm:text-[1.7rem]">
                <span className="font-display text-lg text-violet-500">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink-soft [&_a]:font-semibold [&_a]:text-plum-800 [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 marker:text-violet-500">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

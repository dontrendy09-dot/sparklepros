import { ArrowRight, Check, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import villaTeam from "@/assets/images/villa-cleaning-team.jpg";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";

const points = [
  "Descaling formulations that protect CP brassware, granite and marble",
  "No ammonia or harsh chlorine bleach used in living spaces",
  "A dedicated supervisor on every villa and deep-cleaning job",
];

/** "Why choose us" — the company's local story, told against the team photograph. */
export function LocalRoots() {
  return (
    <section className="defer-render py-20 sm:py-28" aria-labelledby="roots-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="relative order-2 lg:order-1" data-reveal="zoom">
          <div className="relative aspect-[4/3.5] overflow-hidden rounded-[2rem] bg-lilac-200 shadow-card">
            <Image
              src={villaTeam}
              alt="Three Sparkle Pros technicians cleaning a villa — sofa extraction, window squeegee and floor vacuuming"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
              style={{ objectPosition: "45% 50%" }}
            />
          </div>
          <div className="absolute -bottom-8 right-3 max-w-[17rem] rounded-2xl bg-plum-800 p-5 text-white shadow-card sm:-right-6">
            <UserCheck className="h-6 w-6 text-violet-300" aria-hidden="true" />
            <p className="mt-3 font-display text-lg leading-snug font-semibold">100% in-house crew</p>
            <p className="mt-1 text-sm leading-relaxed text-white/75">
              Background-verified, trained by us and in company uniform. Never subcontracted.
            </p>
          </div>
          <Sparkle className="absolute -left-4 -top-5 h-9 w-9 text-violet-500" twinkle />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Local Coimbatore roots"
            title={<span id="roots-heading">Founded to protect homes from hard water and dust.</span>}
            description="Coimbatore homes face their own cleaning challenges — heavy mineral deposits from Siruvani and groundwater, fine dust near busy road corridors and moisture build-up in closed apartments."
          />
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft" data-reveal>
            So we built our service around them: acid-balanced descalers that dissolve hard-water deposits without
            etching marble, and high-heat steam extraction that revives tired upholstery.
          </p>
          <ul className="mt-8 space-y-4" data-reveal>
            {points.map((point) => (
              <li key={point} className="flex gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-plum-800 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-medium text-ink">{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            data-reveal
            className="group mt-10 inline-flex items-center gap-2 font-semibold text-plum-800 transition-colors hover:text-violet-600"
          >
            More about Sparkle Pros
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

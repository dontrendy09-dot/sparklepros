import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ServiceCard } from "@/components/services/service-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/content/services";

export function ServicesShowcase() {
  return (
    <section id="services" className="defer-render bg-white py-20 sm:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our services"
              title={<span id="services-heading">Every room, every surface — cleaned properly.</span>}
            />
          </div>
          <p className="text-[1.05rem] leading-relaxed text-ink-soft lg:col-span-5 lg:pb-2" data-reveal>
            From a single sofa to a full villa, every service is carried out by our own crew with professional Kärcher
            equipment and high-temperature steam.
          </p>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => (
            <li key={service.slug} data-reveal style={{ "--reveal-delay": `${(index % 4) * 70}ms` } as CSSProperties}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center" data-reveal>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.95rem] font-semibold text-plum-800 transition-colors hover:text-violet-600"
          >
            Compare all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

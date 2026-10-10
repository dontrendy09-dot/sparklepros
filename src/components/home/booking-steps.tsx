import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingSteps } from "@/content/home";
import { whatsappUrl } from "@/content/site";

/** "How it works" — the customer's journey from enquiry to payment. */
export function BookingSteps() {
  return (
    <section className="defer-render bg-white py-20 sm:py-28" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title={<span id="booking-heading">From first message to spotless, in four steps.</span>}
        />

        <ol className="relative mx-auto mt-14 grid max-w-2xl gap-10 md:mt-20 md:max-w-none md:grid-cols-4 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-lilac-300 via-lilac-200 to-transparent md:bottom-auto md:left-[12%] md:right-[12%] md:top-[1.375rem] md:h-px md:w-auto md:bg-gradient-to-r md:from-lilac-200 md:via-lilac-300 md:to-lilac-200"
          />
          {bookingSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
              className="relative pl-16 md:pl-0 md:text-center"
            >
              <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full bg-plum-800 font-display text-lg font-semibold text-white shadow-button ring-8 ring-white md:relative md:mx-auto">
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-plum-900 md:mt-6">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft md:mx-auto md:max-w-[16rem]">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row" data-reveal>
          <ButtonLink href="#quote" size="lg">
            Start with a free quote <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={whatsappUrl()} external variant="secondary" size="lg">
            <WhatsAppIcon className="h-5 w-5 text-whatsapp" /> Send photos on WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

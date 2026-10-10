import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { site, whatsappUrl } from "@/content/site";

export function FaqSection({
  items,
  title = "Questions, answered.",
  description = "Everything you need to know before you book.",
  id = "faq",
  className = "bg-white",
}: {
  items: FaqItem[];
  title?: string;
  description?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`defer-render py-20 sm:py-28 ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="FAQ" title={<span id={`${id}-heading`}>{title}</span>} description={description} />
            <div className="mt-8 rounded-[1.5rem] bg-lilac-50 p-6 ring-1 ring-plum-900/[0.05]" data-reveal>
              <p className="font-display text-lg font-semibold text-plum-900">Still have a question?</p>
              <p className="mt-1 text-sm text-ink-soft">We&apos;re available {site.hours.display}.</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <ButtonLink href={whatsappUrl()} external variant="secondary">
                  <WhatsAppIcon className="h-4.5 w-4.5 text-whatsapp" /> WhatsApp
                </ButtonLink>
                <ButtonLink href={site.phone.href} variant="ghost">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call us
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}

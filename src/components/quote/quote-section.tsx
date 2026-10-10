import { Check, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { Eyebrow } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { site, whatsappUrl } from "@/content/site";

import { QuoteForm } from "./quote-form";

const standards = ["100% in-house crew", "140°C thermal steam", "40-point quality audit", "Pay after inspection"];

/** Conversion section with the live quote form. Rendered with id="quote" so every "Get a quote" link can land here. */
export function QuoteSection({
  title = "Ready to experience the Sparkle Pros standard?",
  description = "Tell us what needs cleaning. We'll call you to confirm the scope and give you a clear, fixed quote — with no advance payment.",
  defaultService,
}: {
  title?: string;
  description?: string;
  defaultService?: string;
}) {
  return (
    <section id="quote" className="defer-render relative isolate overflow-hidden bg-lilac-100 py-20 sm:py-28" aria-labelledby="quote-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),transparent)]" />
        <div className="absolute -bottom-48 right-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,var(--color-lilac-300),transparent)] opacity-60" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5" data-reveal>
          <Eyebrow>Free, no-obligation quote</Eyebrow>
          <h2
            id="quote-heading"
            className="mt-4 text-[2.15rem] leading-[1.06] font-semibold tracking-[-0.022em] text-balance text-plum-900 sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg">{description}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {standards.map((item) => (
              <li key={item} className="flex items-center gap-3 font-medium text-ink">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-plum-800 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-[1.5rem] bg-white/80 p-5 ring-1 ring-plum-900/[0.06]">
            <p className="text-sm font-semibold text-plum-900">Prefer to talk to someone?</p>
            <div className="mt-3 flex flex-col gap-2 text-[0.95rem] sm:flex-row sm:gap-6">
              <a href={site.phone.href} className="inline-flex items-center gap-2 font-semibold text-plum-800 hover:text-violet-600">
                <Phone className="h-4 w-4" aria-hidden="true" /> {site.phone.display}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-plum-800 hover:text-violet-600"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-whatsapp" /> WhatsApp us
              </a>
            </div>
            <p className="mt-2 text-xs text-ink-soft">{site.hours.display}</p>
          </div>
        </div>

        <div className="relative lg:col-span-7" data-reveal="zoom">
          <Sparkle className="absolute -right-2 -top-5 h-8 w-8 text-violet-500 sm:-right-4" twinkle />
          <Sparkle className="absolute -bottom-4 -left-3 h-5 w-5 text-mauve-500" variant="outline" twinkle delay="1.3s" />
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_-40px_rgb(62_13_66/0.45)] ring-1 ring-plum-900/[0.06] sm:p-9 lg:p-10">
            <p className="mb-6 text-sm text-ink-soft">
              Fields marked <span className="text-violet-600">*</span> are required.
            </p>
            <QuoteForm defaultService={defaultService} />
          </div>
        </div>
      </div>
    </section>
  );
}

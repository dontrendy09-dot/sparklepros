import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { QuoteForm } from "@/components/quote/quote-form";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Sparkle } from "@/components/ui/sparkle";
import { fullAddress, mapsUrl, site, whatsappUrl } from "@/content/site";
import { breadcrumbJsonLd, localBusinessJsonLd, pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export const metadata: Metadata = pageMetadata({
  title: "Contact Sparkle Pros | Free Cleaning Quote, Coimbatore",
  absoluteTitle: true,
  description: `Request a free cleaning quote from Sparkle Pros, Coimbatore. Call ${site.phone.display}, WhatsApp us, or send the form — we're available ${site.hours.display}.`,
  path: "/contact",
});

function ContactCard({
  icon,
  label,
  children,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lilac-100 text-plum-700 transition-colors duration-300 group-hover:bg-plum-800 group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">{label}</span>
        <span className="mt-1 block break-words font-semibold text-plum-900">{children}</span>
      </span>
    </>
  );
  const className =
    "group flex items-start gap-4 rounded-[1.5rem] bg-white p-5 shadow-card ring-1 ring-plum-900/[0.05] transition-[transform,box-shadow] duration-500 ease-out-soft";

  return href ? (
    <a
      href={href}
      className={`${className} hover:-translate-y-0.5 hover:shadow-card-hover`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), breadcrumbJsonLd(crumbs)]} />
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Contact & free quote"
        title="Let's get your space sparkling."
        description="Send the form for a free, no-obligation quote, or reach us directly. We'll confirm the scope with you and give you a clear, fixed price — you pay only after you've inspected the work."
      />

      <section className="pb-20 sm:pb-28" aria-label="Contact details and quote form">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="space-y-4 lg:col-span-4" data-reveal>
            <ContactCard icon={<Phone className="h-5 w-5" aria-hidden="true" />} label="Call us" href={site.phone.href}>
              {site.phone.display}
            </ContactCard>
            <ContactCard icon={<WhatsAppIcon className="h-5 w-5" />} label="WhatsApp" href={whatsappUrl()} external>
              Chat with our team
            </ContactCard>
            <ContactCard icon={<Mail className="h-5 w-5" aria-hidden="true" />} label="Email" href={`mailto:${site.email}`}>
              {site.email}
            </ContactCard>
            <ContactCard icon={<MapPin className="h-5 w-5" aria-hidden="true" />} label="Visit" href={mapsUrl} external>
              <span className="font-medium">{fullAddress}</span>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-violet-600">
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" /> Get directions
              </span>
            </ContactCard>
            <ContactCard icon={<Clock className="h-5 w-5" aria-hidden="true" />} label="Hours">
              {site.hours.display}
            </ContactCard>
          </div>

          <div id="quote" className="relative lg:col-span-8" data-reveal="zoom">
            <Sparkle className="absolute -right-2 -top-5 h-8 w-8 text-violet-500" twinkle />
            <div className="rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_-40px_rgb(62_13_66/0.45)] ring-1 ring-plum-900/[0.06] sm:p-9 lg:p-10">
              <h2 className="text-3xl font-semibold text-plum-900 sm:text-4xl">Request a free quote</h2>
              <p className="mb-8 mt-3 text-ink-soft">
                It takes about a minute. Fields marked <span className="text-violet-600">*</span> are required.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { InstagramIcon } from "@/components/ui/brand-icons";
import { Logo } from "@/components/ui/logo";
import { Sparkle } from "@/components/ui/sparkle";
import { serviceHref, services } from "@/content/services";
import { fullAddress, mapsUrl, site } from "@/content/site";

const companyLinks = [
  { label: "About us", href: "/about" },
  { label: "All services", href: "/services" },
  { label: "Our process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Get a free quote", href: "/contact#quote" },
];

const linkClass = "text-white/70 transition-colors hover:text-white";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="defer-render relative overflow-hidden bg-plum-950 pb-24 text-white md:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(129_55_194/0.22),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Sparkle Pros home" className="inline-block rounded-md">
              <Logo tone="light" className="h-9 sm:h-10" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/70">
              Steam cleaning, mechanised floor scrubbing and fabric deep cleaning for homes, villas and businesses across
              Coimbatore — by our own verified, in-house crew.
            </p>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
            >
              <InstagramIcon className="h-4.5 w-4.5" />
              Follow @sparklepros.in
            </a>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Services</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={serviceHref(service.slug)} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Company</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Contact</h2>
            <address className="mt-5 space-y-4 text-[0.95rem] not-italic">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClass}`}>
                <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-300" aria-hidden="true" />
                <span>{fullAddress}</span>
              </a>
              <a href={site.phone.href} className={`flex gap-3 ${linkClass}`}>
                <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-300" aria-hidden="true" />
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className={`flex gap-3 break-all ${linkClass}`}>
                <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-300" aria-hidden="true" />
                {site.email}
              </a>
              <p className="flex gap-3 text-white/70">
                <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-300" aria-hidden="true" />
                {site.hours.display}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between md:pr-20">
          <p>© {year} Sparkle Pros. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of service
            </Link>
            <span className="inline-flex items-center gap-1.5 font-display italic text-white/70">
              <Sparkle className="h-3 w-3 text-violet-300" /> Steam cleans better
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Sparkle } from "@/components/ui/sparkle";
import { fullAddress, mapsUrl, site } from "@/content/site";

export function ServiceAreas() {
  return (
    <section id="areas" className="defer-render py-20 sm:py-28" aria-labelledby="areas-heading">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Service areas"
            title={<span id="areas-heading">Serving homes and businesses across Coimbatore.</span>}
            description="Our crews work across the city from our base on Thudiyalur Road. These are some of the localities we regularly serve — if you're elsewhere in Coimbatore or the wider Kongu region, just ask and we'll confirm availability."
          />
          <ul className="mt-9 flex flex-wrap gap-2.5" data-reveal>
            {site.serviceAreas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full border border-plum-800/10 bg-white px-4 py-2 text-sm font-medium text-plum-800 shadow-sm"
              >
                <MapPin className="h-3.5 w-3.5 text-violet-600" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5" data-reveal="zoom">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-plum-900/[0.06] sm:p-9">
            <svg aria-hidden="true" className="absolute inset-x-0 top-0 h-32 w-full text-lilac-200" preserveAspectRatio="none">
              <defs>
                <pattern id="area-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.4" fill="currentColor" />
                </pattern>
                <linearGradient id="area-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="white" stopOpacity="0" />
                  <stop offset="1" stopColor="white" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#area-dots)" />
              <rect width="100%" height="100%" fill="url(#area-fade)" />
            </svg>
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-plum-800 text-white shadow-button">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <Sparkle className="absolute left-12 -top-2 h-5 w-5 text-violet-500" twinkle delay="0.6s" />
              <h3 className="mt-6 text-2xl font-semibold text-plum-900">Visit or call us</h3>
              <dl className="mt-6 space-y-4 text-[0.95rem]">
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="flex gap-3 text-ink">
                    <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" aria-hidden="true" />
                    {fullAddress}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd className="flex gap-3">
                    <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" aria-hidden="true" />
                    <a href={site.phone.href} className="font-semibold text-plum-800 hover:text-violet-600">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="flex gap-3 break-all">
                    <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" aria-hidden="true" />
                    <a href={`mailto:${site.email}`} className="text-plum-800 hover:text-violet-600">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Opening hours</dt>
                  <dd className="flex gap-3 text-ink">
                    <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" aria-hidden="true" />
                    {site.hours.display}
                  </dd>
                </div>
              </dl>
              <ButtonLink href={mapsUrl} external variant="secondary" className="mt-8 w-full sm:w-auto">
                <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

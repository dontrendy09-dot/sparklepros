import type { Metadata } from "next";

import { LegalPage } from "@/components/ui/legal-page";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that apply to Sparkle Pros cleaning services in Coimbatore: quotes, pay-after-inspection, site requirements and fabric care.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      path="/terms"
      updated="October 2026"
      intro="These terms apply to the deep cleaning, steam cleaning and upholstery services provided by Sparkle Pros in Coimbatore and the surrounding region."
      sections={[
        {
          title: "Quotes and pricing",
          body: (
            <ul>
              <li>
                Initial estimates given by phone, WhatsApp or after a website enquiry are based on the details you
                provide — for example the number of sofa seats, the floor area or the number of rooms.
              </li>
              <li>
                The final price is confirmed after an on-site assessment by our lead technician, before work begins.
                Once you approve it, the quote is fixed with no surprise charges.
              </li>
            </ul>
          ),
        },
        {
          title: "Pay after inspection",
          body: (
            <ul>
              <li>
                Payment is due only after the service is complete and you have walked through the work with our
                supervisor.
              </li>
              <li>
                If any agreed area does not meet your expectations, our crew will re-treat it before the job is closed.
              </li>
              <li>We accept UPI (such as Google Pay, PhonePe and Paytm), bank transfer and cash.</li>
            </ul>
          ),
        },
        {
          title: "Site requirements",
          body: (
            <>
              <p>Our steam and extraction machines need standard utilities at the property:</p>
              <ul>
                <li>access to standard electrical power (a 220–240V, 15A/16A socket);</li>
                <li>a running water supply for refilling tanks and rinse extraction;</li>
                <li>safe access to the areas included in your quote.</li>
              </ul>
              <p>
                We also ask that you put away valuables, documents and fragile items before the visit, and tell us about
                any delicate or unusual surfaces.
              </p>
            </>
          ),
        },
        {
          title: "Fabric care and delicate materials",
          body: (
            <p>
              Our technicians spot-test upholstery, rugs and mattresses before steam or extraction cleaning. Most
              everyday stains release with treatment, but older discolouration caused by acid exposure, permanent dyes
              or sun damage may not be fully reversible. Where we expect this, we&apos;ll tell you before we start.
            </p>
          ),
        },
        {
          title: "Changes to a booking",
          body: (
            <p>
              If you need to change or cancel a booking, please let us know as early as possible by phone or WhatsApp
              so we can rearrange the crew.
            </p>
          ),
        },
        {
          title: "Questions",
          body: (
            <p>
              For any questions about these terms, call <a href={site.phone.href}>{site.phone.display}</a> or email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}

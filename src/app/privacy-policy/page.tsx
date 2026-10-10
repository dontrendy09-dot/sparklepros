import type { Metadata } from "next";

import { LegalPage } from "@/components/ui/legal-page";
import { fullAddress, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sparkle Pros collects, uses and protects the information you share when you request a cleaning quote.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy-policy"
      updated="October 2026"
      intro="We collect only what we need to respond to your enquiry and carry out your cleaning service. This policy explains what that is and how we look after it."
      sections={[
        {
          title: "Information we collect",
          body: (
            <>
              <p>When you request a quote through this website, we receive the details you enter:</p>
              <ul>
                <li>
                  <strong>Contact details</strong> — your name, phone number and, if you choose to give it, your email
                  address.
                </li>
                <li>
                  <strong>Service details</strong> — the service you&apos;re interested in, property type, your area or
                  locality, a preferred date and any message you write.
                </li>
              </ul>
              <p>
                If you contact us by phone, WhatsApp or email, we also receive what you share there — for example photos
                of rooms or furniture that help us estimate the work.
              </p>
              <p>
                To protect the form from spam and abuse, your IP address is checked briefly when you submit it. It is
                not stored with your enquiry.
              </p>
            </>
          ),
        },
        {
          title: "How we use it",
          body: (
            <ul>
              <li>To respond to your enquiry and prepare your quote.</li>
              <li>To schedule your service and contact you about it by phone, WhatsApp or email.</li>
              <li>To follow up after a service, including the walkthrough before payment.</li>
            </ul>
          ),
        },
        {
          title: "How your information is handled",
          body: (
            <>
              <p>
                Quote requests are delivered by email to the Sparkle Pros team inbox. This website is hosted by a
                third-party provider and the emails are sent through our email provider; they process the information
                only to provide those services.
              </p>
              <p>
                We never sell, rent or trade your personal information, and we don&apos;t share it with advertisers or
                telemarketers. This website does not use advertising or analytics cookies.
              </p>
            </>
          ),
        },
        {
          title: "How long we keep it",
          body: (
            <p>
              We keep enquiry and booking details only for as long as we need them to provide your service and keep
              ordinary business records. You can ask us to delete them at any time.
            </p>
          ),
        },
        {
          title: "Your choices and rights",
          body: (
            <>
              <p>You can contact us at any time to:</p>
              <ul>
                <li>ask what information we hold about you;</li>
                <li>correct your phone number, address or other details;</li>
                <li>ask us to delete your contact details and service history.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Contact us",
          body: (
            <p>
              Questions about this policy? Call <a href={site.phone.href}>{site.phone.display}</a>, email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>, or write to us at {fullAddress}.
            </p>
          ),
        },
      ]}
    />
  );
}

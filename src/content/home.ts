import type { StaticImageData } from "next/image";

import grout from "@/assets/images/detail-grout-scrubbing.jpg";
import wipeDown from "@/assets/images/detail-kitchen-wipe-down.jpg";
import mattressSteam from "@/assets/images/detail-mattress-steam.jpg";
import sofaExtraction from "@/assets/images/detail-sofa-extraction.jpg";

import { site } from "./site";

export interface ProcessStep {
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
}

/** How a Sparkle Pros clean actually happens on site. */
export const cleaningProcess: ProcessStep[] = [
  {
    title: "Steam",
    body: "After a walkthrough, spot test and dry dusting, 140°C steam loosens grease, soap scum and grime that has worked its way into surfaces.",
    image: mattressSteam,
    alt: "Technician steam-cleaning a mattress with a hand tool, steam rising from the fabric",
  },
  {
    title: "Agitate",
    body: "Rotary scrubbers and brushes work tile, grout and floors, breaking the bond between dirt and surface.",
    image: grout,
    alt: "Technician kneeling to scrub bathroom floor grout with a brush",
  },
  {
    title: "Extract",
    body: "Spray-extraction machines rinse fabric and pull the dirty water straight back out — so dirt leaves your home instead of spreading.",
    image: sofaExtraction,
    alt: "Technician using an extraction tool on a grey fabric sofa",
  },
  {
    title: "Detail & inspect",
    body: "Switchboards, fittings and glass are detailed by hand, then the supervisor walks every room with you on the 40-point checklist.",
    image: wipeDown,
    alt: "Technician wiping a marble kitchen counter with a microfiber cloth",
  },
];

/** The customer's journey from enquiry to payment. */
export const bookingSteps = [
  {
    title: "Request a quote",
    body: "Use the form, call or WhatsApp us with the service, your property size and your area.",
  },
  {
    title: "Share a few photos",
    body: "Send photos of rooms, sofas or problem areas on WhatsApp so the crew brings the right attachments and solutions.",
  },
  {
    title: "Confirm your slot",
    body: "We agree the scope and price with you. After an on-site check by our lead technician, the quote is fixed — no surprise charges.",
  },
  {
    title: "Inspect, then pay",
    body: "Walk through the finished work with the supervisor. Pay only when you're happy — by UPI, bank transfer or cash.",
  },
] as const;

export const homeFaqs = [
  {
    question: "What cleaning services does Sparkle Pros provide?",
    answer:
      "Full home deep cleaning, apartment and villa cleaning, sofa and upholstery cleaning, kitchen degreasing, bathroom descaling, office cleaning and commercial cleaning — across Coimbatore and the Kongu region.",
  },
  {
    question: "Which areas of Coimbatore do you cover?",
    answer: `Our crews work across Coimbatore from our base on Thudiyalur Road, including ${site.serviceAreas
      .slice(1, 9)
      .join(", ")} and nearby localities. If you're further out in the Kongu region, ask us and we'll confirm availability.`,
  },
  {
    question: "Do you clean sofas and mattresses on-site?",
    answer:
      "Yes. Our technicians clean upholstered furniture inside your home using spray-extraction machines and high-temperature steam. Fabric usually dries in about 2–4 hours under normal ceiling fans.",
  },
  {
    question: "Is steam cleaning safe for every surface?",
    answer:
      "Steam is safe and very effective on tiles, grout, ceramic sanitaryware, stainless steel and most upholstery. On sensitive surfaces such as unsealed wood or delicate veneers, we use microfiber hand detailing and pH-balanced solutions instead.",
  },
  {
    question: "How long does a deep clean take?",
    answer:
      "As a guide, a 2BHK typically takes 4–5 hours, a 3BHK 5–7 hours and larger villas a full day. We confirm timing and crew size with your quote.",
  },
  {
    question: "What do I need to arrange before the visit?",
    answer:
      "Just access to a standard 15A/16A power socket and running water. The crew brings every machine, attachment and cleaning solution.",
  },
  {
    question: "When and how do I pay?",
    answer:
      "Only after the work is finished and you've inspected it with our supervisor. If an agreed area isn't right, the crew re-treats it before closing the job. We accept UPI, bank transfer and cash.",
  },
  {
    question: "How do I book?",
    answer: `Request a free quote using the form on this site, call us on ${site.phone.display}, or message us on WhatsApp with your service, property size and location.`,
  },
];

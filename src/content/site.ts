/**
 * Verified business details for Sparkle Pros.
 *
 * Source: the company's own content document (sparkleprose.docx) and the
 * business details published on the previous website. Only add facts here
 * that the business has confirmed — every page reads from this file.
 */
export const site = {
  name: "Sparkle Pros",
  tagline: "Steam cleans better",
  description:
    "Steam cleaning and mechanised deep cleaning for homes, apartments, villas, offices and commercial spaces across Coimbatore and the Kongu region.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparklepros.in").replace(/\/+$/, ""),
  locale: "en_IN",

  phone: {
    display: "+91 95858 59617",
    href: "tel:+919585859617",
    e164: "+919585859617",
  },
  email: "sparkleprosbooking@gmail.com",
  whatsapp: {
    number: "919585859617",
    defaultMessage: "Hi Sparkle Pros, I'd like a quote for a cleaning service.",
  },

  address: {
    street: "S.F. No. 345, Thudiyalur Road, opposite South Indian Bank",
    locality: "Coimbatore",
    region: "Tamil Nadu",
    postalCode: "641035",
    country: "IN",
  },

  hours: {
    display: "9:00 AM – 7:00 PM, all 7 days",
    opens: "09:00",
    closes: "19:00",
  },

  social: {
    instagram: "https://www.instagram.com/sparklepros.in/",
  },

  /** Coimbatore localities named in the company's own service content. */
  serviceAreas: [
    "Thudiyalur",
    "Saravanampatti",
    "Peelamedu",
    "Gandhipuram",
    "RS Puram",
    "Kalapatti",
    "Ganapathy",
    "Saibaba Colony",
    "Vadavalli",
    "Singanallur",
    "Ramanathapuram",
    "Kovaipudur",
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Sparkle Pros, ${fullAddress}`,
)}`;

export function whatsappUrl(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** The four commitments the company makes in its own content. */
export const commitments = [
  {
    icon: "thermometer",
    title: "140°C steam cleaning",
    body: "Industrial high-temperature dry steam dissolves grease and lifts grime from porous grout and fabric — without harsh fumes.",
  },
  {
    icon: "shield",
    title: "Verified in-house crew",
    body: "No subcontracted workers. Every technician is background-verified, trained in-house and in company uniform.",
  },
  {
    icon: "list",
    title: "40-point quality checklist",
    body: "Supervisors follow a room-by-room audit covering switchboards, window tracks, tiles and fixtures.",
  },
  {
    icon: "wallet",
    title: "Pay after inspection",
    body: "Transparent pricing with no hidden charges. You inspect every corner before you pay.",
  },
] as const;

export type CommitmentIcon = (typeof commitments)[number]["icon"];

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Our process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

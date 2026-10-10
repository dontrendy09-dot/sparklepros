import { serviceOptionList } from "@/content/service-options";

/**
 * Quote form field definitions and helpers that don't depend on Zod, so the
 * form can render without downloading the validation library up front.
 * The Zod schemas live in quote-schema.ts and reuse everything here.
 */

export const LIMITS = {
  name: 80,
  phone: 20,
  email: 254,
  location: 120,
  message: 1000,
} as const;

export const NOT_SURE = "not-sure";

export const serviceOptions = [
  ...serviceOptionList,
  { value: NOT_SURE, label: "Not sure yet / multiple services" },
];

export const propertyTypes = [
  "1BHK apartment",
  "2BHK apartment",
  "3BHK apartment",
  "4BHK+ apartment",
  "Independent house",
  "Villa",
  "Office",
  "Commercial space",
  "Other",
] as const;

export interface QuoteFormValues {
  name: string;
  phone: string;
  email: string;
  service: string;
  propertyType: string;
  location: string;
  preferredDate: string;
  message: string;
}

export const emptyQuoteForm: QuoteFormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  propertyType: "",
  location: "",
  preferredDate: "",
  message: "",
};

export function serviceLabel(value: string) {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}

export function normalisePhone(value: string) {
  return value.replace(/[\s\-().]/g, "");
}

/** Indian mobile numbers (with or without +91/0), or any international number written with a leading "+". */
export function isValidPhone(value: string) {
  const phone = normalisePhone(value);
  return /^(?:\+?91|0)?[6-9]\d{9}$/.test(phone) || /^\+\d{8,15}$/.test(phone);
}

/** Today's date in Coimbatore (IST) as YYYY-MM-DD, so browser and server agree. */
export function todayInIndia(now: Date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

import { z } from "zod";

import {
  emptyQuoteForm,
  isValidPhone,
  LIMITS,
  normalisePhone,
  NOT_SURE,
  propertyTypes,
  serviceLabel,
  serviceOptions,
  todayInIndia,
  type QuoteFormValues,
} from "./quote-fields";

export {
  emptyQuoteForm,
  isValidPhone,
  LIMITS,
  normalisePhone,
  NOT_SURE,
  propertyTypes,
  serviceLabel,
  serviceOptions,
  todayInIndia,
  type QuoteFormValues,
};

/**
 * Validation for the quote form, shared by the browser (React Hook Form) and
 * the /api/quote route handler so both enforce exactly the same rules.
 */

const serviceValues = new Set(serviceOptions.map((option) => option.value));

function isAcceptableDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false;
  const today = todayInIndia();
  const oneYearAhead = new Date(`${today}T00:00:00Z`);
  oneYearAhead.setUTCFullYear(oneYearAhead.getUTCFullYear() + 1);
  return value >= today && date <= oneYearAhead;
}

const emailFormat = z.email();

export const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(LIMITS.name, `Please keep your name under ${LIMITS.name} characters.`),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(LIMITS.phone, "That phone number looks too long.")
    .refine(isValidPhone, "Enter a valid mobile number, for example 98765 43210."),
  email: z
    .string()
    .trim()
    .max(LIMITS.email, "That email address looks too long.")
    .refine((value) => value === "" || emailFormat.safeParse(value).success, "Enter a valid email address, or leave it blank."),
  service: z.string().refine((value) => serviceValues.has(value), "Please choose a service."),
  propertyType: z
    .string()
    .refine((value) => value === "" || (propertyTypes as readonly string[]).includes(value), "Please choose a property type."),
  location: z
    .string()
    .trim()
    .min(2, "Tell us your area or locality.")
    .max(LIMITS.location, `Please keep this under ${LIMITS.location} characters.`),
  preferredDate: z
    .string()
    .trim()
    .refine((value) => value === "" || isAcceptableDate(value), "Choose today or a date within the next year."),
  message: z
    .string()
    .trim()
    .max(LIMITS.message, `Please keep your message under ${LIMITS.message} characters.`),
});

/** What the browser actually POSTs: the form fields plus anti-spam signals. */
export const quoteRequestSchema = quoteFormSchema.extend({
  /** Honeypot. Hidden from people; bots tend to fill it in. */
  website: z.string().max(200).optional().default(""),
  /** Milliseconds between the form rendering and being submitted, measured in the browser. */
  elapsedMs: z.number().int().nonnegative().max(86_400_000).optional(),
  /** Path of the page the form was submitted from, for context in the email. */
  sourcePage: z
    .string()
    .max(200)
    .regex(/^\/[\w\-/]*$/)
    .optional(),
});

export type QuoteRequest = z.output<typeof quoteRequestSchema>;


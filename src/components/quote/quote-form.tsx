"use client";

import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";
import { ArrowRight, ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useForm, useWatch, type FieldError, type Resolver } from "react-hook-form";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { site, whatsappUrl } from "@/content/site";
import {
  emptyQuoteForm,
  LIMITS,
  propertyTypes,
  serviceOptions,
  todayInIndia,
  type QuoteFormValues,
} from "@/lib/quote-fields";
import { cn } from "@/lib/utils";

/** Zod and its resolver are fetched the first time the form needs validating, keeping them off the initial page load. */
const loadValidation = () =>
  Promise.all([import("@hookform/resolvers/zod"), import("@/lib/quote-schema")]).then(
    ([{ zodResolver }, { quoteFormSchema }]) => zodResolver(quoteFormSchema) as unknown as Resolver<QuoteFormValues>,
  );

const resolveQuote: Resolver<QuoteFormValues> = async (values, context, options) =>
  (await loadValidation())(values, context, options);

const loadMotionFeatures = () => import("@/components/ui/motion-features").then((module) => module.default);

const fieldBase =
  "block w-full rounded-xl border bg-ivory px-4 text-[0.95rem] text-ink outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-ink-soft/55 focus:bg-white focus:ring-4";
const fieldOk = "border-plum-900/12 hover:border-plum-900/25 focus:border-violet-600 focus:ring-violet-600/12";
const fieldError = "border-red-600/70 focus:border-red-600 focus:ring-red-600/10";

const noSubscribe = () => () => {};

/** Moves focus to an element as soon as it mounts (after any exit animation), so screen readers announce it. */
const focusOnMount = (node: HTMLElement | null) => node?.focus();

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: FieldError;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        <span>
          {label}
          {!optional && (
            <span className="text-violet-600" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </span>
        {optional && (
          <>
            {" "}
            <span className="text-xs font-normal text-ink-soft">Optional</span>
          </>
        )}
      </label>
      {children}
      {error?.message ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.82rem] font-medium text-red-700">
          <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[0.8rem] text-ink-soft">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const inFlight = useRef(false);
  const renderedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  // Computed in the browser only, so the static HTML never carries a stale date.
  const minDate = useSyncExternalStore(noSubscribe, todayInIndia, () => undefined);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: resolveQuote,
    defaultValues: { ...emptyQuoteForm, service: defaultService },
    mode: "onTouched",
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function submitQuote(values: QuoteFormValues) {
    if (inFlight.current) return;
    inFlight.current = true;
    setServerError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Math.max(0, Date.now() - renderedAt.current),
          sourcePage: window.location.pathname,
        }),
      });
      const data: { ok?: boolean; error?: string; fieldErrors?: Record<string, string[] | undefined> } | null =
        await response.json().catch(() => null);

      if (response.ok && data?.ok) {
        setSubmittedName(values.name);
        reset({ ...emptyQuoteForm, service: defaultService });
        return;
      }

      if (data?.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors)) {
          if (messages?.[0] && field in emptyQuoteForm) {
            setError(field as keyof QuoteFormValues, { type: "server", message: messages[0] });
          }
        }
      }
      setServerError(data?.error ?? "Something went wrong on our side. Please try again, or call or WhatsApp us.");
    } catch {
      setServerError("We couldn't reach our server. Please check your connection and try again, or call or WhatsApp us.");
    } finally {
      inFlight.current = false;
    }
  }

  const describedBy = (name: keyof QuoteFormValues, hasHint = false) =>
    errors[name] ? `${id(name)}-error` : hasHint ? `${id(name)}-hint` : undefined;

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <AnimatePresence mode="wait" initial={false}>
          {submittedName ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 text-center sm:py-10"
              role="status"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lilac-100 text-plum-800">
                <CircleCheck className="h-8 w-8" aria-hidden="true" />
              </span>
              <h3 ref={focusOnMount} tabIndex={-1} className="mt-6 text-3xl font-semibold text-plum-900 outline-none">
                Thank you, {submittedName.split(" ")[0]}.
              </h3>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
                Your request has reached our team. We&apos;ll call you to confirm the scope and your quote — we&apos;re
                available {site.hours.display}.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl("Hi Sparkle Pros, I just sent a quote request on your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles({ variant: "secondary" })}
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 text-whatsapp" />
                  Share photos on WhatsApp
                </a>
                <button type="button" onClick={() => setSubmittedName(null)} className={buttonStyles({ variant: "ghost" })}>
                  Send another request
                </button>
              </div>
            </m.div>
          ) : (
            <m.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              onSubmit={(event) => void handleSubmit(submitQuote)(event)}
              onFocus={() => void loadValidation()}
              noValidate
              aria-busy={isSubmitting}
              className="grid gap-5 sm:grid-cols-2"
            >
              <AnimatePresence>
                {serverError && (
                  <m.div
                    ref={focusOnMount}
                    tabIndex={-1}
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden outline-none sm:col-span-2"
                  >
                    <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                      <CircleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">{serverError}</p>
                        <p className="mt-1">
                          Call{" "}
                          <a href={site.phone.href} className="font-semibold underline underline-offset-2">
                            {site.phone.display}
                          </a>{" "}
                          or{" "}
                          <a
                            href={whatsappUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline underline-offset-2"
                          >
                            message us on WhatsApp
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              <Field id={id("name")} label="Your name" error={errors.name}>
                <input
                  id={id("name")}
                  aria-required="true"
                  type="text"
                  autoComplete="name"
                  maxLength={LIMITS.name}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={cn(fieldBase, "h-12", errors.name ? fieldError : fieldOk)}
                  {...register("name")}
                />
              </Field>

              <Field id={id("phone")} label="Phone number" error={errors.phone}>
                <input
                  id={id("phone")}
                  aria-required="true"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  maxLength={LIMITS.phone}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                  className={cn(fieldBase, "h-12", errors.phone ? fieldError : fieldOk)}
                  {...register("phone")}
                />
              </Field>

              <Field id={id("email")} label="Email" optional error={errors.email}>
                <input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={LIMITS.email}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={cn(fieldBase, "h-12", errors.email ? fieldError : fieldOk)}
                  {...register("email")}
                />
              </Field>

              <Field id={id("location")} label="Area / locality" error={errors.location}>
                <input
                  id={id("location")}
                  aria-required="true"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. Saravanampatti"
                  maxLength={LIMITS.location}
                  aria-invalid={!!errors.location}
                  aria-describedby={describedBy("location")}
                  className={cn(fieldBase, "h-12", errors.location ? fieldError : fieldOk)}
                  {...register("location")}
                />
              </Field>

              <Field id={id("service")} label="Service" error={errors.service} className="sm:col-span-2">
                <div className="relative">
                  <select
                    id={id("service")}
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    aria-describedby={describedBy("service")}
                    className={cn(fieldBase, "h-12 appearance-none pr-11", errors.service ? fieldError : fieldOk)}
                    {...register("service")}
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                    aria-hidden="true"
                  />
                </div>
              </Field>

              <Field id={id("propertyType")} label="Property type" optional error={errors.propertyType}>
                <div className="relative">
                  <select
                    id={id("propertyType")}
                    aria-invalid={!!errors.propertyType}
                    aria-describedby={describedBy("propertyType")}
                    className={cn(fieldBase, "h-12 appearance-none pr-11", errors.propertyType ? fieldError : fieldOk)}
                    {...register("propertyType")}
                  >
                    <option value="">Select</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
                    aria-hidden="true"
                  />
                </div>
              </Field>

              <Field id={id("preferredDate")} label="Preferred date" optional error={errors.preferredDate}>
                <input
                  id={id("preferredDate")}
                  type="date"
                  min={minDate}
                  aria-invalid={!!errors.preferredDate}
                  aria-describedby={describedBy("preferredDate")}
                  className={cn(fieldBase, "h-12", errors.preferredDate ? fieldError : fieldOk)}
                  {...register("preferredDate")}
                />
              </Field>

              <Field
                id={id("message")}
                label="What needs cleaning?"
                optional
                error={errors.message}
                hint={`${messageLength}/${LIMITS.message} characters`}
                className="sm:col-span-2"
              >
                <textarea
                  id={id("message")}
                  rows={4}
                  maxLength={LIMITS.message}
                  placeholder="e.g. 3BHK flat — kitchen chimney is very greasy and the master bathroom glass has hard-water stains."
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message", true)}
                  className={cn(fieldBase, "resize-y py-3 leading-relaxed", errors.message ? fieldError : fieldOk)}
                  {...register("message")}
                />
              </Field>

              {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={id("website")}>Website</label>
                <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.8rem] leading-relaxed text-ink-soft sm:max-w-xs">
                  We use your details only to respond to this request. See our{" "}
                  <Link href="/privacy-policy" className="font-medium text-plum-800 underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={buttonStyles({ size: "lg", className: "w-full sm:w-auto" })}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Request my free quote
                      <ArrowRight className="h-4.5 w-4.5" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </m.form>
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}

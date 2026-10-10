import { z } from "zod";

import { readSmtpConfig, sendQuoteEmail, type SmtpConfig } from "./mailer";
import { buildQuoteEmail, type QuoteEmail } from "./quote-email";
import { quoteRequestSchema } from "./quote-schema";
import { createRateLimiter } from "./rate-limit";

const MAX_BODY_BYTES = 10_000;
/** Real people take longer than this to fill in the form; most bots don't. */
export const MIN_FILL_TIME_MS = 2_500;

const MESSAGES = {
  forbidden: "This request was blocked. Please use the form on sparklepros.in.",
  badRequest: "We couldn't read that request. Please refresh the page and try again.",
  invalid: "Please check the highlighted fields and try again.",
  spam: "We couldn't process your request. Please call or WhatsApp us instead.",
  tooMany: "You've sent several requests in a short time. Please wait a few minutes, or call or WhatsApp us.",
  unavailable: "Our online form is temporarily unavailable. Please call or WhatsApp us and we'll help straight away.",
  failed: "We couldn't send your request just now. Please try again in a moment, or call or WhatsApp us.",
} as const;

export interface QuoteHandlerDeps {
  readConfig: () => SmtpConfig | null;
  send: (config: SmtpConfig, email: QuoteEmail, replyTo?: { name: string; address: string }) => Promise<unknown>;
  limiter: { check: (key: string) => { ok: true } | { ok: false; retryAfterSeconds: number } };
  log: Pick<Console, "error" | "warn">;
}

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/** Browsers always send Origin on cross-site POSTs; reject any that don't match this host. */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function createQuoteHandler(overrides: Partial<QuoteHandlerDeps> = {}) {
  const deps: QuoteHandlerDeps = {
    readConfig: () => readSmtpConfig(),
    send: sendQuoteEmail,
    limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60_000 }),
    log: console,
    ...overrides,
  };

  return async function POST(request: Request): Promise<Response> {
    if (!isSameOrigin(request)) return json({ ok: false, error: MESSAGES.forbidden }, 403);

    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return json({ ok: false, error: MESSAGES.badRequest }, 415);
    }

    const rate = deps.limiter.check(clientIp(request));
    if (!rate.ok) {
      return json({ ok: false, error: MESSAGES.tooMany }, 429, { "Retry-After": String(rate.retryAfterSeconds) });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: MESSAGES.badRequest }, 413);

    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      return json({ ok: false, error: MESSAGES.badRequest }, 400);
    }

    const parsed = quoteRequestSchema.safeParse(payload);
    if (!parsed.success) {
      return json({ ok: false, error: MESSAGES.invalid, fieldErrors: z.flattenError(parsed.error).fieldErrors }, 422);
    }

    const quote = parsed.data;
    if (quote.website !== "" || (quote.elapsedMs !== undefined && quote.elapsedMs < MIN_FILL_TIME_MS)) {
      deps.log.warn("[quote] Submission rejected by spam checks");
      return json({ ok: false, error: MESSAGES.spam }, 400);
    }

    const config = deps.readConfig();
    if (!config) {
      deps.log.error("[quote] SMTP is not configured — set SMTP_HOST, QUOTE_TO_EMAIL and QUOTE_FROM_EMAIL/SMTP_USER.");
      return json({ ok: false, error: MESSAGES.unavailable }, 503);
    }

    try {
      await deps.send(
        config,
        buildQuoteEmail(quote),
        quote.email ? { name: quote.name, address: quote.email } : undefined,
      );
    } catch (error) {
      deps.log.error("[quote] Email delivery failed:", error instanceof Error ? error.message : error);
      return json({ ok: false, error: MESSAGES.failed }, 502);
    }

    return json({ ok: true }, 200);
  };
}

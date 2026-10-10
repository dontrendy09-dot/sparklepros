import { describe, expect, it, vi } from "vitest";

import { createQuoteHandler, MIN_FILL_TIME_MS } from "./quote-handler";
import { buildQuoteEmail, toHeaderValue } from "./quote-email";
import { readSmtpConfig, type SmtpConfig } from "./mailer";
import { isValidPhone, quoteFormSchema, quoteRequestSchema, todayInIndia } from "./quote-schema";
import { createRateLimiter } from "./rate-limit";

const validForm = {
  name: "Priya Raman",
  phone: "98765 43210",
  email: "priya@example.com",
  service: "sofa-cleaning-coimbatore",
  propertyType: "3BHK apartment",
  location: "Saravanampatti",
  preferredDate: "",
  message: "6-seater fabric sofa with a few tea stains.",
};

const smtp: SmtpConfig = {
  host: "smtp.example.com",
  port: 465,
  secure: true,
  user: "user",
  pass: "pass",
  to: ["team@example.com"],
  from: "Website <team@example.com>",
};

function post(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/quote", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost:3000",
      origin: "http://localhost:3000",
      "x-forwarded-for": "203.0.113.7",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function handler(overrides: Parameters<typeof createQuoteHandler>[0] = {}) {
  const send = vi.fn().mockResolvedValue("message-id");
  const log = { error: vi.fn(), warn: vi.fn() };
  const POST = createQuoteHandler({
    readConfig: () => smtp,
    send,
    limiter: createRateLimiter({ limit: 100, windowMs: 60_000 }),
    log,
    ...overrides,
  });
  return { POST, send, log };
}

describe("quote form validation", () => {
  it("accepts a complete, valid request", () => {
    expect(quoteFormSchema.safeParse(validForm).success).toBe(true);
  });

  it("treats email, property type, date and message as optional", () => {
    const result = quoteFormSchema.safeParse({ ...validForm, email: "", propertyType: "", message: "" });
    expect(result.success).toBe(true);
  });

  it.each(["98765 43210", "+91 98765-43210", "09876543210", "+44 20 7946 0958"])("accepts phone %s", (phone) => {
    expect(isValidPhone(phone)).toBe(true);
  });

  it.each(["12345", "5876543210", "abc", "98765 4321"])("rejects phone %s", (phone) => {
    expect(isValidPhone(phone)).toBe(false);
  });

  it("rejects unknown services, bad emails, past dates and over-long messages", () => {
    const result = quoteFormSchema.safeParse({
      ...validForm,
      service: "window-tinting",
      email: "not-an-email",
      preferredDate: "2020-01-01",
      message: "x".repeat(1001),
    });
    expect(result.success).toBe(false);
    const fields = result.error?.issues.map((issue) => issue.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["service", "email", "preferredDate", "message"]));
  });

  it("accepts today's date in India", () => {
    expect(quoteFormSchema.safeParse({ ...validForm, preferredDate: todayInIndia() }).success).toBe(true);
  });

  it("trims whitespace from text fields", () => {
    const result = quoteRequestSchema.parse({ ...validForm, name: "  Priya  " });
    expect(result.name).toBe("Priya");
    expect(result.website).toBe("");
  });
});

describe("rate limiter", () => {
  it("blocks after the limit and recovers once the window passes", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(limiter.check("ip", 0).ok).toBe(true);
    expect(limiter.check("ip", 100).ok).toBe(true);
    const blocked = limiter.check("ip", 200);
    expect(blocked.ok).toBe(false);
    expect(blocked.ok === false && blocked.retryAfterSeconds).toBe(1);
    expect(limiter.check("other-ip", 200).ok).toBe(true);
    expect(limiter.check("ip", 1_101).ok).toBe(true);
  });
});

describe("quote email", () => {
  it("escapes user input in the HTML body", () => {
    const quote = quoteRequestSchema.parse({ ...validForm, message: '<script>alert("x")</script>' });
    const email = buildQuoteEmail(quote);
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.text).toContain('<script>alert("x")</script>');
  });

  it("includes every field in the plain-text version", () => {
    const email = buildQuoteEmail(quoteRequestSchema.parse(validForm));
    for (const value of ["Priya Raman", "98765 43210", "priya@example.com", "Sofa Cleaning", "Saravanampatti", "3BHK apartment"]) {
      expect(email.text).toContain(value);
    }
    expect(email.subject).toBe("New quote request: Sofa Cleaning — Priya Raman");
  });

  it("strips line breaks from header values", () => {
    expect(toHeaderValue("Hello\r\nBcc: attacker@example.com")).toBe("Hello Bcc: attacker@example.com");
  });
});

describe("SMTP configuration", () => {
  it("returns null when required variables are missing", () => {
    expect(readSmtpConfig({ NODE_ENV: "test" })).toBeNull();
  });

  it("parses a Gmail-style configuration", () => {
    const config = readSmtpConfig({
      NODE_ENV: "test",
      SMTP_HOST: "smtp.gmail.com",
      SMTP_PORT: "465",
      SMTP_SECURE: "true",
      SMTP_USER: "owner@gmail.com",
      SMTP_PASS: "app-password",
      QUOTE_TO_EMAIL: "owner@gmail.com, manager@example.com",
    });
    expect(config).toMatchObject({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      from: "owner@gmail.com",
      to: ["owner@gmail.com", "manager@example.com"],
    });
  });
});

describe("POST /api/quote", () => {
  it("sends the email and returns 200 only after delivery succeeds", async () => {
    const { POST, send } = handler();
    const response = await POST(post({ ...validForm, elapsedMs: 15_000, sourcePage: "/" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    const [, email, replyTo] = send.mock.calls[0]!;
    expect(email.subject).toContain("Sofa Cleaning");
    expect(replyTo).toEqual({ name: "Priya Raman", address: "priya@example.com" });
  });

  it("omits reply-to when no email is given", async () => {
    const { POST, send } = handler();
    await POST(post({ ...validForm, email: "", elapsedMs: 15_000 }));
    expect(send.mock.calls[0]![2]).toBeUndefined();
  });

  it("returns 422 with field errors for invalid input", async () => {
    const { POST, send } = handler();
    const response = await POST(post({ ...validForm, phone: "123" }));
    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.fieldErrors.phone).toBeDefined();
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects the honeypot and too-fast submissions without sending", async () => {
    const { POST, send } = handler();
    expect((await POST(post({ ...validForm, website: "https://spam.example" }))).status).toBe(400);
    expect((await POST(post({ ...validForm, elapsedMs: MIN_FILL_TIME_MS - 1 }))).status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects cross-origin requests and non-JSON bodies", async () => {
    const { POST } = handler();
    expect((await POST(post(validForm, { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(post("name=x", { "content-type": "application/x-www-form-urlencoded" }))).status).toBe(415);
    expect((await POST(post("{not json"))).status).toBe(400);
  });

  it("returns 503 — never a fake success — when SMTP is not configured", async () => {
    const { POST, send, log } = handler({ readConfig: () => null });
    const response = await POST(post({ ...validForm, elapsedMs: 15_000 }));
    expect(response.status).toBe(503);
    expect((await response.json()).ok).toBe(false);
    expect(send).not.toHaveBeenCalled();
    expect(log.error).toHaveBeenCalled();
  });

  it("returns 502 when the SMTP server fails", async () => {
    const { POST } = handler({ send: vi.fn().mockRejectedValue(new Error("Connection refused")) });
    const response = await POST(post({ ...validForm, elapsedMs: 15_000 }));
    expect(response.status).toBe(502);
    expect((await response.json()).ok).toBe(false);
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const { POST } = handler({ limiter: createRateLimiter({ limit: 2, windowMs: 60_000 }) });
    await POST(post({ ...validForm, elapsedMs: 15_000 }));
    await POST(post({ ...validForm, elapsedMs: 15_000 }));
    const response = await POST(post({ ...validForm, elapsedMs: 15_000 }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBeTruthy();
  });
});

describe("service options", () => {
  it("matches the services defined in src/content/services.ts", async () => {
    const { services } = await import("@/content/services");
    const { serviceOptionList } = await import("@/content/service-options");
    expect(serviceOptionList.map((option) => [option.value, option.label])).toEqual(
      services.map((service) => [service.slug, service.name]),
    );
  });
});

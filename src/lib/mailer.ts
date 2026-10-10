import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import type { QuoteEmail } from "./quote-email";
import { toHeaderValue } from "./quote-email";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  to: string[];
  from: string;
}

/**
 * Reads SMTP settings from server-side environment variables.
 * Returns null when the integration is not configured, so callers can fail
 * honestly instead of pretending a message was sent.
 */
export function readSmtpConfig(env: NodeJS.ProcessEnv = process.env): SmtpConfig | null {
  const host = env.SMTP_HOST?.trim();
  const to = (env.QUOTE_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  const user = env.SMTP_USER?.trim() || undefined;
  const from = env.QUOTE_FROM_EMAIL?.trim() || user;

  if (!host || to.length === 0 || !from) return null;

  const port = Number(env.SMTP_PORT ?? 587);
  const secure = env.SMTP_SECURE ? env.SMTP_SECURE.trim().toLowerCase() === "true" : port === 465;

  return {
    host,
    port: Number.isFinite(port) && port > 0 ? port : 587,
    secure,
    user,
    pass: env.SMTP_PASS || undefined,
    to,
    from,
  };
}

let cached: { key: string; transporter: Transporter } | null = null;

function getTransporter(config: SmtpConfig) {
  const key = `${config.host}:${config.port}:${config.secure}:${config.user ?? ""}`;
  if (cached?.key !== key) {
    cached = {
      key,
      transporter: nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: config.user && config.pass ? { user: config.user, pass: config.pass } : undefined,
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000,
      }),
    };
  }
  return cached.transporter;
}

/** Sends the notification. Resolves only once the SMTP server has accepted the message. */
export async function sendQuoteEmail(config: SmtpConfig, email: QuoteEmail, replyTo?: { name: string; address: string }) {
  const info = await getTransporter(config).sendMail({
    from: config.from,
    to: config.to,
    replyTo: replyTo ? { name: toHeaderValue(replyTo.name, 80), address: replyTo.address } : undefined,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  if (!info.accepted || info.accepted.length === 0) {
    throw new Error(`SMTP server did not accept the message (rejected: ${info.rejected?.join(", ") || "unknown"})`);
  }
  return info.messageId;
}

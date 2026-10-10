import { normalisePhone, serviceLabel, type QuoteRequest } from "./quote-schema";

export interface QuoteEmail {
  subject: string;
  text: string;
  html: string;
}

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => escapeMap[char] ?? char);
}

/** Header values must never contain line breaks (header injection). */
export function toHeaderValue(value: string, maxLength = 150) {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, maxLength);
}

function formatDate(isoDate: string) {
  if (!isoDate) return "Flexible";
  const date = new Date(`${isoDate}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** wa.me needs the number in international format without "+". */
function whatsappNumber(phone: string) {
  const digits = normalisePhone(phone).replace(/^\+/, "");
  if (/^[6-9]\d{9}$/.test(digits)) return `91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `91${digits.slice(1)}`;
  return digits;
}

export function buildQuoteEmail(quote: QuoteRequest, submittedAt: Date = new Date()): QuoteEmail {
  const service = serviceLabel(quote.service);
  const received = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(submittedAt);

  const rows: [string, string][] = [
    ["Name", quote.name],
    ["Phone", quote.phone],
    ["Email", quote.email || "Not provided"],
    ["Service", service],
    ["Property", quote.propertyType || "Not specified"],
    ["Location", quote.location],
    ["Preferred date", formatDate(quote.preferredDate)],
  ];

  const subject = toHeaderValue(`New quote request: ${service} — ${quote.name}`);

  const text = [
    "New quote request from the Sparkle Pros website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    quote.message || "(none)",
    "",
    `Received: ${received} IST`,
    quote.sourcePage ? `Submitted from: ${quote.sourcePage}` : "",
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n");

  const intlNumber = whatsappNumber(quote.phone);
  const actions = [
    `<a href="tel:+${escapeHtml(intlNumber)}" style="color:#3E0D42;font-weight:600;">Call ${escapeHtml(quote.name)}</a>`,
    `<a href="https://wa.me/${escapeHtml(intlNumber)}" style="color:#3E0D42;font-weight:600;">WhatsApp</a>`,
    quote.email
      ? `<a href="mailto:${escapeHtml(quote.email)}" style="color:#3E0D42;font-weight:600;">Reply by email</a>`
      : "",
  ]
    .filter(Boolean)
    .join(' &nbsp;·&nbsp; ');

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #EFE7F1;color:#6B5F70;font-size:13px;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #EFE7F1;color:#1E1424;font-size:15px;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#F7F2F8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:#3E0D42;padding:20px 28px;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.8;">Sparkle Pros website</div>
          <div style="font-size:20px;font-weight:700;margin-top:4px;">New quote request</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tableRows}
          </table>
          <div style="margin-top:20px;color:#6B5F70;font-size:13px;">Message</div>
          <div style="margin-top:6px;padding:14px 16px;background:#FAF6FB;border-radius:10px;color:#1E1424;font-size:15px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(quote.message || "(none)")}</div>
          <div style="margin-top:22px;font-size:14px;">${actions}</div>
          <div style="margin-top:22px;color:#8A7F8F;font-size:12px;">Received ${escapeHtml(received)} IST${
            quote.sourcePage ? ` · from ${escapeHtml(quote.sourcePage)}` : ""
          }</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

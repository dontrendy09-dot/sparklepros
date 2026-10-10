"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { site, whatsappUrl } from "@/content/site";
import { quoteHrefFor } from "@/lib/utils";

/**
 * Persistent contact shortcuts: a thumb-friendly action bar on phones and a
 * single WhatsApp button on larger screens.
 */
export function ContactDock() {
  const pathname = usePathname();
  const quoteHref = quoteHrefFor(pathname);

  return (
    <div id="contact-dock">
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-plum-900/[0.08] bg-ivory px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-20px_rgb(62_13_66/0.35)] md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.35fr] gap-2">
          <a
            href={site.phone.href}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-plum-800/15 bg-white text-sm font-semibold text-plum-800"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> Call
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-plum-800/15 bg-white text-sm font-semibold text-plum-800"
          >
            <WhatsAppIcon className="h-4.5 w-4.5 text-whatsapp" /> WhatsApp
          </a>
          <Link
            href={quoteHref}
            className="shimmer flex h-12 items-center justify-center rounded-full bg-plum-800 text-sm font-semibold text-white shadow-button"
          >
            Free quote
          </Link>
        </div>
      </nav>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sparkle Pros on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-0 overflow-hidden rounded-full bg-white pr-0 pl-4 text-whatsapp shadow-[0_18px_40px_-16px_rgb(30_20_36/0.45)] ring-1 ring-plum-900/[0.08] transition-[gap,padding] duration-500 ease-out-soft hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 md:flex"
      >
        <WhatsAppIcon className="h-6 w-6 shrink-0" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-plum-800 transition-[max-width] duration-500 ease-out-soft group-hover:max-w-40 group-focus-visible:max-w-40">
          Chat on WhatsApp
        </span>
        <span className="w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

import { ContactDock } from "@/components/layout/contact-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AnchorScrollGuard } from "@/components/ui/anchor-scroll-guard";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";
import { defaultOgImage } from "@/lib/seo";

import "./globals.css";

// Static 600 roman + italic (~39 KB) instead of the full variable font (~117 KB).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sparkle Pros | Steam & Deep Cleaning Services in Coimbatore",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf9f7",
  colorScheme: "light",
};

const serviceLinks = services.map(({ slug, name, summary, icon }) => ({ href: serviceHref(slug), name, summary, icon }));

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded-full bg-plum-800 px-5 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader serviceLinks={serviceLinks} />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <ContactDock />
        <RevealObserver />
        <AnchorScrollGuard />
      </body>
    </html>
  );
}

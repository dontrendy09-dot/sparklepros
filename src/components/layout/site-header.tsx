"use client";

import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import steamBedroom from "@/assets/images/steam-cleaning-bedroom.jpg";
import { ServiceIcon } from "@/components/services/service-icon";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { buttonStyles } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Sparkle } from "@/components/ui/sparkle";
import type { ServiceIcon as ServiceIconName } from "@/content/services";
import { mainNav, site, whatsappUrl } from "@/content/site";
import { cn, quoteHrefFor } from "@/lib/utils";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Just what the menus need — passed in from the server so the full service copy never ships to the browser. */
export interface ServiceLink {
  href: string;
  name: string;
  summary: string;
  icon: ServiceIconName;
}

export function SiteHeader({ serviceLinks }: { serviceLinks: ServiceLink[] }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 12, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // The menu's promo image is only rendered once the menu has been opened.
  const [servicesMenuUsed, setServicesMenuUsed] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const servicesPanelId = useId();
  const servicesWrapper = useRef<HTMLDivElement>(null);
  const servicesButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);

  // Close any open menu when the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  const quoteHref = quoteHrefFor(pathname);

  // Desktop services menu: close on outside click.
  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesWrapper.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

  // Mobile menu: lock scroll, make the page behind inert, handle Escape, manage focus.
  useEffect(() => {
    if (!menuOpen) return;
    const background = ["main-content", "site-footer", "contact-dock"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const toggle = menuButton.current;

    document.documentElement.style.overflow = "hidden";
    background.forEach((element) => (element.inert = true));
    mobilePanel.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      background.forEach((element) => (element.inert = false));
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out-soft",
          scrolled || menuOpen
            ? "border-b border-plum-900/[0.07] bg-ivory shadow-[0_8px_30px_-18px_rgb(62_13_66/0.25)] lg:bg-ivory/85 lg:backdrop-blur-xl"
            : "border-b border-transparent bg-ivory/0",
        )}
      >
        <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            aria-label="Sparkle Pros home"
            className={cn(
              "relative shrink-0 origin-left rounded-md transition-transform duration-500 ease-out-soft",
              scrolled && "lg:scale-[0.92]",
            )}
          >
            <Logo className="h-8 sm:h-9 lg:h-10" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div
              ref={servicesWrapper}
              onKeyDown={(event) => {
                if (event.key === "Escape" && servicesOpen) {
                  setServicesOpen(false);
                  servicesButton.current?.focus();
                }
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setServicesOpen(false);
              }}
            >
              <button
                ref={servicesButton}
                type="button"
                aria-expanded={servicesOpen}
                aria-controls={servicesPanelId}
                onClick={() => {
                  setServicesOpen((open) => !open);
                  setServicesMenuUsed(true);
                }}
                className={cn(
                  "group inline-flex h-10 items-center gap-1 rounded-full px-4 text-[0.92rem] font-medium transition-colors",
                  servicesOpen || pathname.startsWith("/services") ? "text-plum-800" : "text-ink hover:text-plum-800",
                )}
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-300", servicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              {/* Always mounted; visibility hides it from keyboard and screen readers while closed. */}
              <div
                id={servicesPanelId}
                className={cn(
                  "absolute left-1/2 top-full w-[min(54rem,calc(100vw-4rem))] -translate-x-1/2 pt-1 transition-[opacity,translate,visibility] duration-300 ease-out-soft",
                  servicesOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
                )}
              >
                    <div className="grid grid-cols-[1fr_15rem] gap-2 rounded-[1.75rem] border border-plum-900/[0.07] bg-white p-2 shadow-[0_30px_80px_-30px_rgb(62_13_66/0.4)]">
                      <ul className="grid grid-cols-2 gap-1 p-2">
                        {serviceLinks.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              onClick={() => setServicesOpen(false)}
                              className="group/item flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-lilac-50"
                            >
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lilac-100 text-plum-700 transition-colors group-hover/item:bg-plum-800 group-hover/item:text-white">
                                <ServiceIcon name={service.icon} className="h-[1.15rem] w-[1.15rem]" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.92rem] font-semibold text-plum-900">{service.name}</span>
                                <span className="mt-0.5 line-clamp-1 block text-[0.8rem] text-ink-soft">{service.summary}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="relative overflow-hidden rounded-[1.35rem] bg-plum-900 p-5 text-white">
                        {servicesMenuUsed && (
                          <Image
                            src={steamBedroom}
                            alt=""
                            fill
                            sizes="240px"
                            className="object-cover opacity-45"
                            style={{ objectPosition: "30% 50%" }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-plum-950 via-plum-950/70 to-plum-950/10" />
                        <div className="relative flex h-full flex-col justify-end">
                          <Sparkle className="mb-auto h-6 w-6 text-violet-300" twinkle />
                          <p className="font-display text-xl leading-snug font-semibold">Not sure which service you need?</p>
                          <p className="mt-2 text-sm text-white/75">Tell us about the space and we&apos;ll recommend the right clean.</p>
                          <Link
                            href={quoteHref}
                            onClick={() => setServicesOpen(false)}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
                          >
                            Get a free quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="mt-2 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
                          >
                            View all services
                          </Link>
                        </div>
                      </div>
                    </div>
              </div>
            </div>

            {mainNav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative inline-flex h-10 items-center rounded-full px-4 text-[0.92rem] font-medium transition-colors",
                    active ? "text-plum-800" : "text-ink hover:text-plum-800",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-px origin-left bg-plum-800 transition-transform duration-500 ease-out-soft",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 rounded-full px-3 text-sm font-semibold text-plum-800 transition-colors hover:text-violet-600 xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone.display}
            </a>
            <div className="hidden sm:block">
              <Link href={quoteHref} className={buttonStyles()}>
                Get a free quote
              </Link>
            </div>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border border-plum-900/10 bg-white text-plum-800 shadow-sm transition-colors hover:bg-lilac-50 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered outside <header>: its backdrop-filter would otherwise
          become the containing block for this fixed panel. */}
      <div
        id="mobile-menu"
        ref={mobilePanel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-ivory transition-[opacity,translate,visibility] duration-300 ease-out-soft lg:hidden",
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
        )}
      >
        <div className="mx-auto flex min-h-full max-w-xl flex-col px-5 pb-10 pt-4">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-plum-900/[0.07]">
              {[{ label: "Home", href: "/" }, ...mainNav].map((item, index) => (
                <li
                  key={item.href}
                  className={cn(
                    "transition-[opacity,translate] duration-500 ease-out-soft",
                    menuOpen ? "translate-x-0 opacity-100" : "-translate-x-2.5 opacity-0",
                  )}
                  style={{ transitionDelay: menuOpen ? `${50 + index * 40}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex items-center justify-between py-4 font-display text-[1.6rem] font-semibold text-plum-900"
                  >
                    {item.label}
                    <ArrowRight className="h-5 w-5 text-mauve-400" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">Services</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {serviceLinks.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-sm font-medium text-plum-900 ring-1 ring-plum-900/[0.06]"
                >
                  <ServiceIcon name={service.icon} className="h-4 w-4 shrink-0 text-violet-600" />
                  {service.name.replace(" Cleaning", "")}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-3 pt-10">
            <Link href={quoteHref} onClick={() => setMenuOpen(false)} className={buttonStyles({ size: "lg" })}>
              Get a free quote
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={site.phone.href} className={buttonStyles({ variant: "secondary" })}>
                <Phone className="h-4 w-4" aria-hidden="true" /> Call
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "secondary" })}
              >
                <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

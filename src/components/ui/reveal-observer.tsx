"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Powers the [data-reveal] scroll animations defined in globals.css.
 *
 * Elements already on screen are marked revealed immediately (no flash); the
 * rest are held back via `html.reveal-ready` and faded in as they enter the
 * viewport. Without JavaScript nothing is ever hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      pending.forEach((element) => element.setAttribute("data-revealed", ""));
      return;
    }

    if (!root.classList.contains("reveal-ready")) {
      // Read every position first, then write, so the browser lays out the page only once.
      // Inside .defer-render sections, check the section's own box first: measuring an
      // element in an off-screen (skipped) section would force the browser to render it.
      const viewportHeight = window.innerHeight;
      const isVisible = (rect: DOMRect) => rect.top < viewportHeight && rect.bottom > 0;
      const sectionOnScreen = new Map<Element, boolean>();
      const onScreen = pending.filter((element) => {
        const section = element.closest(".defer-render");
        if (section) {
          if (!sectionOnScreen.has(section)) sectionOnScreen.set(section, isVisible(section.getBoundingClientRect()));
          if (!sectionOnScreen.get(section)) return false;
        }
        return isVisible(element.getBoundingClientRect());
      });
      onScreen.forEach((element) => element.setAttribute("data-revealed", ""));
      root.classList.add("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    pending.filter((element) => !element.hasAttribute("data-revealed")).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

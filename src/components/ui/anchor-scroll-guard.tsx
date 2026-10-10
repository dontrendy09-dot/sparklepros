"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps in-page links (#quote, #faq, …) accurate on long pages.
 *
 * `.defer-render` sections use content-visibility, so until they are rendered
 * their heights are estimates and a jump to an anchor further down would land
 * in the wrong place. As soon as someone follows an anchor (or arrives on a
 * URL with a #hash), the sections are rendered for real before scrolling.
 */
export function AnchorScrollGuard() {
  const pathname = usePathname();

  useEffect(() => {
    const renderAllSections = () =>
      document.querySelectorAll(".defer-render").forEach((section) => section.classList.remove("defer-render"));

    // Capture phase: runs before Next.js handles the link and scrolls.
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a[href*='#']")) renderAllSections();
    };
    document.addEventListener("click", onClick, true);

    const hash = window.location.hash.slice(1);
    if (hash) {
      renderAllSections();
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView();
    }

    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  return null;
}

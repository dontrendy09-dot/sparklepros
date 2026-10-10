/** Joins class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Pages that render their own quote form, so CTAs can jump straight to it. */
export function quoteHrefFor(pathname: string) {
  const hasForm = pathname === "/" || pathname === "/contact" || /^\/services\/[^/]+\/?$/.test(pathname);
  return hasForm ? "#quote" : "/contact#quote";
}

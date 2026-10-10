import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "ghost" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "shimmer bg-plum-800 text-white shadow-button hover:bg-plum-700 hover:shadow-[0_14px_30px_-12px_rgb(62_13_66/0.6)]",
  secondary: "border border-plum-800/15 bg-white text-plum-800 shadow-sm hover:border-plum-800/30 hover:bg-lilac-50",
  light: "shimmer bg-white text-plum-800 shadow-button hover:bg-lilac-50",
  ghost: "text-plum-800 hover:bg-plum-800/5",
  "outline-light": "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  children: ReactNode;
}

export function ButtonLink({ href, variant, size, external, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  const isNative = external || /^(tel:|mailto:|https?:)/.test(href);

  if (isNative) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

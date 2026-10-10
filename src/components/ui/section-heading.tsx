import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Sparkle } from "./sparkle";

export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-violet-600" : "text-violet-300",
        className,
      )}
    >
      <Sparkle className="h-3 w-3" />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)} data-reveal>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-4 text-[2.15rem] leading-[1.06] font-semibold tracking-[-0.022em] text-balance sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-plum-900" : "text-white",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-[1.05rem] leading-relaxed sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
            tone === "dark" ? "text-ink-soft" : "text-white/75",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

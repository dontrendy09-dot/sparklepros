import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface SparkleProps {
  className?: string;
  /** Solid star, or the outlined star used in the Sparkle Pros logo. */
  variant?: "solid" | "outline";
  /** Gently twinkle. Automatically disabled for reduced-motion users. */
  twinkle?: boolean;
  delay?: string;
  style?: CSSProperties;
}

/** The four-point star from the Sparkle Pros logo. Purely decorative. */
export function Sparkle({ className, variant = "solid", twinkle = false, delay, style }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", twinkle && "animate-twinkle motion-reduce:animate-none", className)}
      style={{ animationDelay: delay, ...style }}
    >
      <path
        d="M12 1.5C12.7 7.4 16.6 11.3 22.5 12C16.6 12.7 12.7 16.6 12 22.5C11.3 16.6 7.4 12.7 1.5 12C7.4 11.3 11.3 7.4 12 1.5Z"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke={variant === "outline" ? "currentColor" : "none"}
        strokeWidth={variant === "outline" ? 1.6 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

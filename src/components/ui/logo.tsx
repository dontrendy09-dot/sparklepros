import Image from "next/image";

import logoDark from "@/assets/brand/sparkle-pros-logo.png";
import logoLight from "@/assets/brand/sparkle-pros-logo-light.png";
import { cn } from "@/lib/utils";

/** The Sparkle Pros wordmark. `tone="light"` is for dark backgrounds. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Image
      src={tone === "dark" ? logoDark : logoLight}
      alt="Sparkle Pros — Steam cleans better"
      sizes="(min-width: 640px) 280px, 200px"
      loading="eager"
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}

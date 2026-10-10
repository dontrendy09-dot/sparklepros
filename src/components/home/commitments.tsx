import { ListChecks, ShieldCheck, Thermometer, Wallet } from "lucide-react";
import type { CSSProperties } from "react";

import { commitments, type CommitmentIcon } from "@/content/site";
import { cn } from "@/lib/utils";

const icons: Record<CommitmentIcon, typeof Thermometer> = {
  thermometer: Thermometer,
  shield: ShieldCheck,
  list: ListChecks,
  wallet: Wallet,
};

/** The four commitments, as a quiet band of proof right under the hero. */
export function Commitments({ className, headingId }: { className?: string; headingId?: string }) {
  return (
    <section aria-labelledby={headingId ?? "commitments-heading"} className={cn("relative", className)}>
      {/* Pages that introduce this band with their own visible heading pass its id instead. */}
      {!headingId && (
        <h2 id="commitments-heading" className="sr-only">
          Why customers choose Sparkle Pros
        </h2>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-plum-900/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className={cn(
                  "group relative flex gap-4 p-5 sm:block sm:p-7 lg:p-8",
                  index > 0 && "border-t border-plum-900/[0.07]",
                  index % 2 === 1 && "sm:border-l",
                  index === 1 && "sm:border-t-0",
                  index > 0 && "lg:border-l lg:border-t-0",
                )}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lilac-100 sm:h-12 sm:w-12 text-plum-700 transition-colors duration-500 group-hover:bg-plum-800 group-hover:text-white">
                  <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-plum-900 sm:mt-5 sm:text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft sm:mt-2 sm:text-[0.94rem]">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

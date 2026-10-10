"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Accessible accordion. Answers stay in the HTML (good for search engines)
 * and are marked inert while collapsed so they're skipped by keyboard and
 * screen-reader users. The open/close animation is pure CSS: the panel's
 * grid row transitions between 0fr and 1fr.
 */
export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-plum-900/10 border-y border-plum-900/10", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question}>
            <h3 className="text-[1.08rem] sm:text-xl">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left font-semibold text-plum-900 transition-colors hover:text-violet-600"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out-soft",
                    isOpen
                      ? "rotate-45 border-plum-800 bg-plum-800 text-white"
                      : "border-plum-900/15 text-plum-800 group-hover:border-violet-600",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-out-soft",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-12 font-sans text-[0.98rem] leading-relaxed text-ink-soft">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

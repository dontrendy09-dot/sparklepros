import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { serviceCategories, serviceHref, type Service } from "@/content/services";
import { Sparkle } from "@/components/ui/sparkle";
import { cn } from "@/lib/utils";

const categoryLabel = Object.fromEntries(serviceCategories.map((category) => [category.id, category.label]));

/**
 * Photo-led service card. Compact horizontal layout on phones, tall card from
 * the small breakpoint up.
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={serviceHref(service.slug)}
      className={cn(
        "group relative flex h-full gap-4 rounded-[1.5rem] bg-ivory p-2.5 ring-1 ring-plum-900/[0.07] transition-[transform,box-shadow,background-color] duration-500 ease-out-soft hover:-translate-y-1 hover:bg-white hover:shadow-card-hover sm:flex-col sm:gap-0 sm:p-3",
        className,
      )}
    >
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-[1.1rem] bg-lilac-200 sm:aspect-[4/3.2] sm:w-full">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 112px"
          className="object-cover transition-transform duration-[900ms] ease-out-soft group-hover:scale-[1.06]"
          style={{ objectPosition: service.image.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <Sparkle className="absolute right-3 top-3 hidden h-5 w-5 scale-50 text-white opacity-0 drop-shadow transition-all duration-500 ease-out-soft group-hover:scale-100 group-hover:opacity-100 sm:block" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-1.5 pr-1 sm:px-2.5 sm:pb-3 sm:pt-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-violet-600">
          {categoryLabel[service.category]}
        </p>
        <h3 className="mt-1 text-[1.2rem] leading-tight font-semibold text-plum-900 sm:text-[1.4rem]">{service.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft sm:mt-2">{service.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-plum-800 sm:pt-4">
          View service
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

import { Bath, BriefcaseBusiness, Building2, CookingPot, House, Hotel, Sofa, Store, type LucideProps } from "lucide-react";

import type { ServiceIcon as ServiceIconName } from "@/content/services";

const icons = {
  home: House,
  sofa: Sofa,
  building: Building2,
  villa: Hotel,
  kitchen: CookingPot,
  bath: Bath,
  office: BriefcaseBusiness,
  store: Store,
} satisfies Record<ServiceIconName, unknown>;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}

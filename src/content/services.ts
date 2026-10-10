import type { StaticImageData } from "next/image";

import apartmentArmchair from "@/assets/images/apartment-armchair-steam.jpg";
import bathroomCleaning from "@/assets/images/bathroom-cleaning.jpg";
import commercialFloorGlass from "@/assets/images/commercial-floor-and-glass.jpg";
import homeFloorCare from "@/assets/images/home-floor-care.jpg";
import kitchenCleaning from "@/assets/images/kitchen-cleaning.jpg";
import officeLobby from "@/assets/images/office-lobby-detail.jpg";
import sofaExtraction from "@/assets/images/sofa-steam-extraction.jpg";
import villaTeam from "@/assets/images/villa-cleaning-team.jpg";

export type ServiceCategory = "Residential" | "Specialist" | "Business";
export type ServiceIcon = "home" | "sofa" | "building" | "villa" | "kitchen" | "bath" | "office" | "store";

export interface ServiceImage {
  src: StaticImageData;
  alt: string;
  /** CSS object-position so each crop frames the subject. */
  position: string;
}

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  icon: ServiceIcon;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  intro: string;
  overview: string;
  highlights: string[];
  included: string[];
  equipment: string[];
  process: { title: string; body: string }[];
  benefits: { title: string; body: string }[];
  preparation: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
  image: ServiceImage;
  related: string[];
}

const payAfterInspection = {
  question: "When do I pay?",
  answer:
    "Only after the job is complete and you have walked through the work with our supervisor. If an agreed area isn't right, the crew re-treats it before closing the job. We accept UPI, bank transfer and cash.",
};

const utilities =
  "Keep a standard 15A/16A power socket and running water available — our steam and extraction machines need both.";

export const services: Service[] = [
  {
    slug: "home-deep-cleaning-coimbatore",
    name: "Home Deep Cleaning",
    category: "Residential",
    icon: "home",
    metaTitle: "Home Deep Cleaning in Coimbatore",
    metaDescription:
      "Full-home deep cleaning in Coimbatore with 140°C steam, mechanised floor scrubbing and a verified in-house crew. Inspect the results, then pay.",
    h1: "Home deep cleaning in Coimbatore",
    summary: "Ceiling-to-floor deep cleaning for every room — fans, windows, floors, balconies and woodwork.",
    intro:
      "Keep your home fresh, clean and comfortable. From bedrooms and living spaces to kitchens and hard-to-reach corners, we take care of every detail and leave your home feeling spotless and welcoming.",
    overview:
      "Our full-home deep cleaning is designed for homes that need thorough, hygienic care rather than a quick dust. We combine professional-grade vacuum equipment, steam-based cleaning, microfiber detailing and surface-safe solutions to remove dust, dirt, stains and build-up from every room.",
    highlights: [
      "Ceiling fans, light fixtures and cobwebs cleaned thoroughly",
      "Window glass, frames and tracks cleaned professionally",
      "Floors scrubbed with a single-disc mechanised buffer",
    ],
    included: [
      "Ceiling fans, light fixtures and cobwebs thoroughly cleaned",
      "Window glass, frames and tracks cleaned with professional vacuuming",
      "Floors deep-cleaned using mechanised scrubbing equipment",
      "Balconies washed, with detailed grout and tile cleaning",
      "Switchboards, doors, frames and woodwork carefully wiped down",
    ],
    equipment: ["Kärcher industrial wet & dry extractor", "Professional floor polisher", "High-temperature steam wand"],
    process: [
      {
        title: "Top-down dry dusting",
        body: "Ceiling fans, light fittings and cobwebs are cleared first, so loose dust never lands on a freshly cleaned floor.",
      },
      {
        title: "Windows and tracks",
        body: "Glass, frames and sliding tracks are vacuumed out and wiped, removing the fine road dust that settles into window channels.",
      },
      {
        title: "Steam and hand detailing",
        body: "Tiles and grout get high-temperature steam, while switchboards, doors, frames and woodwork are detailed by hand.",
      },
      {
        title: "Machine-scrubbed floors",
        body: "Floors and balconies are scrubbed with a single-disc machine and the dirty water extracted — then we walk through every room with you.",
      },
    ],
    benefits: [
      {
        title: "Every room, one crew",
        body: "Ceilings, windows, floors, balconies and woodwork are handled in a single visit — no juggling separate services.",
      },
      {
        title: "Less harsh chemistry",
        body: "Steam does much of the heavy lifting, and we don't use ammonia or harsh chlorine bleach in living spaces.",
      },
      {
        title: "Checked before you pay",
        body: "A supervisor walks through each room with you against our 40-point checklist before any payment.",
      },
    ],
    preparation: [
      "Put away jewellery, documents, cash and other valuables.",
      "Clear small items off counters, tables and shelves so surfaces can be cleaned edge to edge.",
      utilities,
      "Point out delicate surfaces — antique wood, natural stone or unsealed finishes — before we start.",
    ],
    aftercare: [
      "Keep fans running and windows open for an hour or two so floors and grout dry fully.",
      "Avoid outdoor footwear on freshly scrubbed floors until they are dry.",
      "Wipe kitchen and bathroom surfaces after daily use to slow new build-up.",
    ],
    faqs: [
      {
        question: "How long does a full home deep clean take?",
        answer:
          "As a guide, a 2BHK typically takes 4–5 hours and a 3BHK 5–7 hours. The exact duration and crew size depend on the size and condition of your home, and we confirm both with your quote.",
      },
      {
        question: "Do I need to provide any equipment or cleaning products?",
        answer:
          "No. The crew brings every machine, attachment and cleaning solution. We only need access to a 15A/16A power socket and running water.",
      },
      {
        question: "Is steam safe on all my floors and furniture?",
        answer:
          "Steam is safe and very effective on tiles, grout, ceramic and stainless steel. On sensitive surfaces such as unsealed wood or delicate veneers, we switch to microfiber hand detailing and pH-balanced solutions.",
      },
      payAfterInspection,
    ],
    image: {
      src: homeFloorCare,
      alt: "Sparkle Pros technician vacuuming a polished marble floor beside the staircase of a home",
      position: "50% 45%",
    },
    related: ["apartment-cleaning-coimbatore", "villa-cleaning-coimbatore", "kitchen-cleaning-coimbatore"],
  },
  {
    slug: "sofa-cleaning-coimbatore",
    name: "Sofa Cleaning",
    category: "Specialist",
    icon: "sofa",
    metaTitle: "Sofa & Upholstery Cleaning in Coimbatore",
    metaDescription:
      "On-site sofa and upholstery cleaning in Coimbatore. Hot-water spray extraction and steam lift stains, body oils and dust from fabric — without over-wetting.",
    h1: "Sofa & upholstery cleaning in Coimbatore",
    summary: "Spray-extraction and steam that lift stains, body oils and dust out of fabric sofas.",
    intro:
      "Deep-clean your sofa and upholstery to remove embedded dirt, dust, oils and stubborn stains — and bring back a fresh, clean, comfortable feel to your favourite seat.",
    overview:
      "Our sofa and upholstery service uses deep spray-extraction to lift embedded sweat, body oils, hair, spills and dander. We combine hot-water cleaning, controlled steam and professional extraction equipment for a deep clean that avoids leaving excess moisture in the fabric.",
    highlights: [
      "Deep vacuuming of fabric creases, seams and cushion gaps",
      "Targeted treatment for coffee, tea, ink and other stubborn marks",
      "High-pressure hot-water extraction and steam for a deeper clean",
    ],
    included: [
      "Thorough vacuuming of fabric creases, seams and cushion gaps",
      "Targeted stain treatment for coffee, tea, ink and other stubborn stains",
      "High-pressure hot-water extraction with steam treatment",
      "Powerful dual-motor suction to recover moisture and dirt",
      "Deodorising treatment followed by a quick-drying finish",
    ],
    equipment: ["Kärcher Puzzi spray-extraction machine", "Rotary upholstery brush", "Fabric groomer"],
    process: [
      {
        title: "Fabric check and dry vacuum",
        body: "We identify the fabric, spot-test an inconspicuous area, then vacuum out creases, seams and cushion gaps.",
      },
      {
        title: "Targeted stain treatment",
        body: "Coffee, tea, ink and other marks are pre-treated so they release during extraction instead of spreading.",
      },
      {
        title: "Hot-water extraction and steam",
        body: "Hot water is sprayed deep into the fibres and immediately pulled back out by dual-motor suction, carrying the loosened dirt with it.",
      },
      {
        title: "Deodorise and groom",
        body: "A deodorising treatment and fabric grooming finish the job, and the sofa is set up to dry quickly.",
      },
    ],
    benefits: [
      {
        title: "Cleaned where it stands",
        body: "No need to send furniture away — the entire process happens on-site in your living room.",
      },
      {
        title: "Dirt removed, not moved",
        body: "Extraction pulls loosened dirt out of the fabric rather than spreading it across the surface.",
      },
      {
        title: "Controlled moisture",
        body: "Dual-motor suction recovers most of the water, so fabric dries in hours rather than days.",
      },
    ],
    preparation: [
      "Clear cushions, throws and personal items off the sofa.",
      "Point out stains you're concerned about and, if you know, what caused them.",
      "Share the fabric type or care label if available — it helps us choose the right method.",
      utilities,
    ],
    aftercare: [
      "Keep ceiling fans on and the room ventilated — fabric usually dries in about 2–4 hours.",
      "Avoid sitting on the sofa until it is completely dry.",
      "Blot spills straight away with a clean white cloth rather than rubbing.",
      "Vacuum the sofa regularly so dust doesn't settle deep into the fibres.",
    ],
    faqs: [
      {
        question: "How long does sofa cleaning take?",
        answer:
          "Most sofas take around 1.5–2.5 hours depending on size, fabric and condition. Tell us the number of seats and we'll confirm the timing.",
      },
      {
        question: "How long will my sofa take to dry?",
        answer: "Under normal ceiling fans, fabric usually dries in approximately 2–4 hours.",
      },
      {
        question: "Will every stain come out?",
        answer:
          "Most everyday stains release with pre-treatment and extraction. Older discolouration caused by acid exposure, permanent dyes or sun damage may not be fully reversible — we'll tell you honestly before we start.",
      },
      {
        question: "Do you also clean mattresses and dining chairs?",
        answer:
          "Yes. We clean upholstered furniture — including mattresses and dining chairs — on-site using the same injection-extraction and steam process.",
      },
    ],
    image: {
      src: sofaExtraction,
      alt: "Sparkle Pros technician cleaning a grey fabric sofa with a spray-extraction machine",
      position: "58% 50%",
    },
    related: ["home-deep-cleaning-coimbatore", "apartment-cleaning-coimbatore", "villa-cleaning-coimbatore"],
  },
  {
    slug: "apartment-cleaning-coimbatore",
    name: "Apartment Cleaning",
    category: "Residential",
    icon: "building",
    metaTitle: "Apartment Deep Cleaning in Coimbatore",
    metaDescription:
      "Deep cleaning for 2BHK, 3BHK and 4BHK apartments in Coimbatore — kitchens, utility areas, sliding windows, bathrooms and living areas. Get a free quote.",
    h1: "Apartment deep cleaning in Coimbatore",
    summary: "Tailored deep cleaning for 2BHK–4BHK flats — kitchens, balconies, glass and bathrooms.",
    intro:
      "Professional deep cleaning for 2BHK, 3BHK and 4BHK apartments, covering balconies, glass panels, kitchens and everyday dirt build-up — for a fresh, spotless and comfortable home.",
    overview:
      "Tailored for gated communities, high-rise buildings and modern apartments across Peelamedu, Saravanampatti, RS Puram and the rest of Coimbatore. We focus on the places flats collect grime: road dust, window tracks, kitchen exhaust grilles and utility balconies.",
    highlights: [
      "Grease removed from modular kitchen exteriors and cabinets",
      "Utility areas and washing-machine spaces deep-cleaned",
      "Sliding window tracks and glass cleaned and polished",
    ],
    included: [
      "Grease removal from modular kitchen exteriors and cabinets",
      "Deep scrubbing of utility areas and washing-machine spaces",
      "Sliding window tracks and glass cleaned and polished",
      "Limescale and hard-water stains removed from bathroom surfaces",
      "Mechanised scrubbing of living areas with detailed edge vacuuming",
    ],
    equipment: ["Industrial HEPA backpack vacuum", "High-temperature steam gun", "Rotary tile scrubber"],
    process: [
      {
        title: "Kitchen and utility first",
        body: "Grease comes off modular kitchen exteriors and cabinets, and the utility area and washing-machine bay are scrubbed.",
      },
      {
        title: "Glass and window tracks",
        body: "Sliding tracks are vacuumed out and the glass polished, clearing the road dust that collects on balconies and sills.",
      },
      {
        title: "Bathrooms descaled",
        body: "Limescale and hard-water stains are treated on tiles, glass and fittings in each bathroom.",
      },
      {
        title: "Living areas and walkthrough",
        body: "Living areas are machine-scrubbed with detailed edge vacuuming, then checked room by room with you.",
      },
    ],
    benefits: [
      {
        title: "Built for flat living",
        body: "Our checklist targets what apartments actually collect — balcony road dust, exhaust grease and grimy window tracks.",
      },
      {
        title: "Kit that fits tight spaces",
        body: "HEPA backpack vacuums let the crew work around furniture and into corners without dragging machines through your home.",
      },
      {
        title: "A clean start",
        body: "A thorough reset before you move in, after renovation dust settles, or before you hand over the keys.",
      },
    ],
    preparation: [
      "Let your apartment association or security know about the visit if your society requires it.",
      "Clear kitchen counters and the utility area of loose items.",
      utilities,
      "For move-in cleans, book after painters and carpenters have finished.",
    ],
    aftercare: [
      "Leave windows open for a while to air the flat and help floors dry.",
      "Run the kitchen chimney while cooking to slow grease build-up.",
      "Squeegee shower glass after use to reduce hard-water spotting.",
    ],
    faqs: [
      {
        question: "How long does an apartment deep clean take?",
        answer:
          "As a guide, a 2BHK typically takes 4–5 hours and a 3BHK 5–7 hours, depending on condition. We confirm the timing and crew size in your quote.",
      },
      {
        question: "Can you clean an empty flat before we move in?",
        answer:
          "Yes — and an empty flat is the best time to do it, because wardrobes, cabinets and every floor edge are fully accessible.",
      },
      {
        question: "Do you bring your own equipment and solutions?",
        answer:
          "Yes. The crew brings an industrial HEPA backpack vacuum, a high-temperature steam gun, a rotary tile scrubber and all cleaning solutions. You only need to provide power and running water.",
      },
      payAfterInspection,
    ],
    image: {
      src: apartmentArmchair,
      alt: "Sparkle Pros technician steam-cleaning an armchair in an apartment living room",
      position: "50% 40%",
    },
    related: ["home-deep-cleaning-coimbatore", "kitchen-cleaning-coimbatore", "bathroom-cleaning-coimbatore"],
  },
  {
    slug: "villa-cleaning-coimbatore",
    name: "Villa Cleaning",
    category: "Residential",
    icon: "villa",
    metaTitle: "Villa Cleaning Services in Coimbatore",
    metaDescription:
      "Villa and independent house cleaning in Coimbatore — high ceilings, staircases, glass balustrades, terraces and car porches, by a dedicated supervised crew.",
    h1: "Villa & independent house cleaning in Coimbatore",
    summary: "Multi-level homes — high ceilings, staircases, terraces, external glass and porches.",
    intro:
      "Cleaning for multi-level homes and villas, covering high ceilings, staircases, terraces, external glass and private porticos.",
    overview:
      "Designed for spacious independent homes and villas across Kovaipudur, Vadavalli, Kalapatti and beyond. A dedicated 4–6 member crew arrives fully equipped for high architectural glass, intricate woodwork, marble care and terrace pressure washing.",
    highlights: [
      "Double-height ceiling cobweb removal and chandelier cleaning",
      "Staircase railings, glass balustrades and steps scrubbed",
      "Terrace and car porch pressure washing",
    ],
    included: [
      "Double-height ceiling cobweb removal and chandelier detailing",
      "Staircase railings, glass balustrades and steps scrubbed",
      "Terrace and car porch pressure washing",
      "Modular wardrobes and cupboards wiped down inside and out",
      "Hard-water descaling on all sanitaryware",
    ],
    equipment: ["Pressure washer (140 bar)", "Heavy-duty scrubber", "Multi-reach telescopic poles"],
    process: [
      {
        title: "Walkthrough and zoning",
        body: "The supervisor walks the property with you and splits it into zones, so each crew member owns a floor or area.",
      },
      {
        title: "Height work first",
        body: "Double-height ceilings, chandeliers and high glass are cleaned with telescopic poles before work moves down.",
      },
      {
        title: "Stairs, wardrobes and bathrooms",
        body: "Railings, balustrades and steps are scrubbed, wardrobes wiped inside and out, and sanitaryware descaled.",
      },
      {
        title: "Terrace, porch and sign-off",
        body: "Terraces and car porches are pressure-washed last, followed by a full walkthrough with the supervisor.",
      },
    ],
    benefits: [
      {
        title: "A crew sized for the home",
        body: "A dedicated 4–6 member team works zone by zone, so large homes are finished in one planned visit.",
      },
      {
        title: "Supervisor on site",
        body: "A dedicated supervisor is present on every villa job to coordinate the crew and check the work.",
      },
      {
        title: "Care for premium finishes",
        body: "Descaling formulations chosen to protect marble, granite and CP brassware from etching.",
      },
    ],
    preparation: [
      "Secure valuables, documents and fragile décor before the crew arrives.",
      "Arrange access to the terrace, porch and any locked rooms you want cleaned.",
      "Move vehicles out of the car porch if it is being pressure-washed.",
      "Keep power sockets on each floor and an outdoor water point available.",
    ],
    aftercare: [
      "Keep terraces and porches clear until they have dried.",
      "Ventilate rooms for a couple of hours after steam and scrubbing.",
      "Wipe glass balustrades and shower glass regularly to slow hard-water spotting.",
    ],
    faqs: [
      {
        question: "How long does a villa clean take?",
        answer:
          "Larger villas usually take a full day — typically 6–9 hours — depending on size, number of floors and condition. We confirm the plan once we understand your property.",
      },
      {
        question: "How many people will come?",
        answer: "A dedicated crew of 4–6 members, led by a supervisor, depending on the size of the home.",
      },
      {
        question: "Do you clean outdoor areas?",
        answer:
          "Yes. Terraces and car porches are pressure-washed as part of the villa service. Tell us about external glass or other outdoor areas when you request your quote.",
      },
      {
        question: "Is it safe for marble and granite?",
        answer:
          "Yes. We use descaling formulations selected to remove hard-water deposits without etching marble or granite, and switch to gentler methods on delicate or unsealed surfaces.",
      },
    ],
    image: {
      src: villaTeam,
      alt: "Sparkle Pros crew cleaning a villa living room — sofa extraction, window squeegee and floor care",
      position: "24% 50%",
    },
    related: ["home-deep-cleaning-coimbatore", "sofa-cleaning-coimbatore", "bathroom-cleaning-coimbatore"],
  },
  {
    slug: "kitchen-cleaning-coimbatore",
    name: "Kitchen Cleaning",
    category: "Specialist",
    icon: "kitchen",
    metaTitle: "Kitchen Deep Cleaning in Coimbatore",
    metaDescription:
      "Kitchen deep cleaning in Coimbatore: chimney and baffle filter degreasing, backsplash and grout, stove carbon removal and cabinet degreasing with steam.",
    h1: "Kitchen deep cleaning in Coimbatore",
    summary: "Steam-first degreasing for chimneys, backsplashes, stoves, counters and cabinets.",
    intro:
      "Heavy oil and sticky grease removed from chimney filters, backsplash tiles, gas stoves, countertops and cabinet surfaces.",
    overview:
      "Kitchens withstand intense heat, vaporised cooking oil and stubborn carbon residue. Our steam-first process breaks down sticky grease without scratching quartz counters, acrylic shutters or stainless-steel appliances.",
    highlights: [
      "Chimney body and baffle filter degreasing",
      "Backsplash tile scrubbing and grout whitening",
      "Carbon removed from burners, knobs and drip trays",
    ],
    included: [
      "Chimney outer body and baffle filter degreasing",
      "Backsplash tile scrubbing and grout whitening",
      "Carbon removal from stovetop burners, knobs and drip trays",
      "Sink descaling and a hot-steam drain flush",
      "Cabinet exteriors degreased and interiors vacuumed",
    ],
    equipment: ["High-pressure 150°C dry steam generator", "Food-safe degreaser", "Scouring pads"],
    process: [
      {
        title: "Chimney and filters",
        body: "The chimney body and baffle filters are degreased with steam and a food-safe degreaser.",
      },
      {
        title: "Stove and burners",
        body: "Burners, knobs and drip trays are decarbonised so flames burn clean and parts look new again.",
      },
      {
        title: "Backsplash and grout",
        body: "Backsplash tiles are scrubbed and grout lines whitened, removing the film that cooking oil leaves behind.",
      },
      {
        title: "Sink and cabinets",
        body: "The sink is descaled, the drain flushed with hot steam, and cabinets degreased outside and vacuumed inside.",
      },
    ],
    benefits: [
      {
        title: "Grease off, finishes intact",
        body: "Steam softens grease so it wipes away, instead of being scraped off quartz, acrylic or stainless steel.",
      },
      {
        title: "Food-safe on cooking areas",
        body: "We use a food-safe degreaser on surfaces where food is prepared.",
      },
      {
        title: "Every grease trap covered",
        body: "Chimney, filters, backsplash, burners, sink and cabinets — all in one visit.",
      },
    ],
    preparation: [
      "Clear counters and the area around the stove, and store food away.",
      "Switch off the stove and chimney well before the visit so they are cool.",
      "Empty any cabinets you'd like vacuumed inside.",
      utilities,
    ],
    aftercare: [
      "Wait until surfaces are fully dry before cooking.",
      "Run the chimney while cooking and for a few minutes afterwards.",
      "Wipe the backsplash and stove weekly with a mild detergent so grease never hardens.",
    ],
    faqs: [
      {
        question: "How long does kitchen cleaning take?",
        answer: "Typically 2.5–4 hours, depending on the size of the kitchen and how much grease has built up.",
      },
      {
        question: "Do you clean chimney filters?",
        answer: "Yes. The chimney's outer body and baffle filters are degreased as part of every kitchen clean.",
      },
      {
        question: "Is it safe for quartz, granite and acrylic?",
        answer:
          "Yes. Our steam-first method is chosen to dissolve grease without scratching quartz counters, acrylic shutters or stainless-steel appliances.",
      },
      payAfterInspection,
    ],
    image: {
      src: kitchenCleaning,
      alt: "Sparkle Pros technician wiping down a marble kitchen counter beside the gas hob",
      position: "50% 50%",
    },
    related: ["apartment-cleaning-coimbatore", "home-deep-cleaning-coimbatore", "bathroom-cleaning-coimbatore"],
  },
  {
    slug: "bathroom-cleaning-coimbatore",
    name: "Bathroom Cleaning",
    category: "Specialist",
    icon: "bath",
    metaTitle: "Bathroom Deep Cleaning in Coimbatore",
    metaDescription:
      "Bathroom deep cleaning in Coimbatore for hard-water stains, limescale on glass and taps, tile grout and toilets — with non-corrosive descalers and steam.",
    h1: "Bathroom deep cleaning in Coimbatore",
    summary: "Hard-water stains, limescale, grout and toilet descaling — treated, not just wiped.",
    intro:
      "Hard-water stain removal, limescale removal on glass partitions, toilet descaling and tile grout restoration.",
    overview:
      "Coimbatore's groundwater often leaves stubborn white salt stains and calcium build-up. We treat mineral deposits, soap scum and mould using non-corrosive descalers and steam nozzles that help prevent pitting on chrome fittings.",
    highlights: [
      "Shower glass water-spot removal and buffing",
      "Limescale removed from taps, showerheads and jet sprays",
      "Floor and wall grout agitated with rotary brushes",
    ],
    included: [
      "Shower glass water-spot removal and hydrophobic buffing",
      "Limescale removal from chrome taps, showerheads and jet sprays",
      "Floor and wall tile grout agitation with rotary brushes",
      "Toilet bowl descaling and a rim steam flush",
      "Mirror polishing and exhaust fan dust removal",
    ],
    equipment: ["Steam cleaner", "Rotary tile scrubber", "Ceramic-safe descaling compounds"],
    process: [
      {
        title: "Descale",
        body: "A ceramic-safe descaler is applied to glass, taps, showerheads and tiles to soften hard-water deposits.",
      },
      {
        title: "Agitate",
        body: "Rotary brushes work the floor and wall grout lines, and toilets are descaled inside and under the rim.",
      },
      {
        title: "Steam and rinse",
        body: "Steam lifts the loosened scale and soap scum, and every surface is rinsed clean.",
      },
      {
        title: "Polish and detail",
        body: "Shower glass is buffed, mirrors polished and the exhaust fan cleared of dust.",
      },
    ],
    benefits: [
      {
        title: "Made for local water",
        body: "Our descalers target the calcium and salt deposits typical of Coimbatore's groundwater.",
      },
      {
        title: "Gentle on fittings",
        body: "Non-corrosive products help protect chrome and CP brassware from pitting.",
      },
      {
        title: "Grout, not just tiles",
        body: "Rotary agitation reaches the grout lines where grime actually sits.",
      },
    ],
    preparation: [
      "Remove toiletries, mats and personal items from the bathroom.",
      "Tell us about natural stone, special coatings or recent repairs.",
      "Keep the bathroom free during the clean so treatments have time to work.",
    ],
    aftercare: [
      "Ventilate with the exhaust fan or an open window for an hour.",
      "Squeegee shower glass after each use to slow new spotting.",
      "Use a pH-neutral cleaner for routine cleaning, especially on natural stone.",
    ],
    faqs: [
      {
        question: "How long does it take per bathroom?",
        answer: "Usually about 1.5–2 hours per bathroom, depending on how much scale has built up.",
      },
      {
        question: "Can old hard-water stains be removed completely?",
        answer:
          "Most hard-water spots and limescale lift with descaling and agitation. Very old deposits that have etched into glass or tile may not disappear entirely — we'll tell you before we start.",
      },
      {
        question: "Will the products damage chrome taps?",
        answer: "No. We use non-corrosive descalers and steam nozzles chosen to help prevent pitting on chrome fittings.",
      },
      payAfterInspection,
    ],
    image: {
      src: bathroomCleaning,
      alt: "Two Sparkle Pros technicians cleaning bathroom wall tiles and scrubbing the floor grout",
      position: "58% 50%",
    },
    related: ["kitchen-cleaning-coimbatore", "apartment-cleaning-coimbatore", "home-deep-cleaning-coimbatore"],
  },
  {
    slug: "office-cleaning-coimbatore",
    name: "Office Cleaning",
    category: "Business",
    icon: "office",
    metaTitle: "Office Cleaning Services in Coimbatore",
    metaDescription:
      "Office cleaning in Coimbatore scheduled around your business hours — workstations, carpets, glass partitions, pantries and restrooms. Request a quote.",
    h1: "Office cleaning services in Coimbatore",
    summary: "Workstations, carpets, glass partitions, pantries and restrooms — around your hours.",
    intro:
      "Workstation cleaning, commercial carpet extraction, boardroom glass wipe-downs and pantry hygiene maintenance.",
    overview:
      "Professional commercial cleaning scheduled around your business hours. Ideal for IT firms around TIDEL Park and Peelamedu, corporate offices in Gandhipuram and clinics across RS Puram.",
    highlights: [
      "Workstation keyboards, desktops and partitions wiped down",
      "Office carpets wet-shampooed and extracted",
      "Fingerprints removed from glass doors and partitions",
    ],
    included: [
      "Workstation keyboard, desktop and partition cleaning",
      "Office carpet wet shampooing and extraction",
      "Glass facade, door and partition fingerprint removal",
      "Pantry counters cleaned and microwaves degreased",
      "Restroom deep cleaning with odour neutralisation",
    ],
    equipment: ["Commercial carpet extractor", "HEPA-filtered vacuums", "Antimicrobial fogger"],
    process: [
      {
        title: "Scope and schedule",
        body: "We agree the areas, frequency and timing — including weekend slots — so the work never disrupts your team.",
      },
      {
        title: "Workstations and glass",
        body: "Keyboards, desktops and partitions are wiped down, and fingerprints cleared from glass doors and partitions.",
      },
      {
        title: "Carpets and floors",
        body: "Carpets are wet-shampooed and extracted; hard floors are vacuumed with HEPA-filtered machines.",
      },
      {
        title: "Pantry and restrooms",
        body: "Pantry counters and microwaves are degreased, and restrooms deep-cleaned with odour neutralisation.",
      },
    ],
    benefits: [
      {
        title: "Minimal disruption",
        body: "Cleaning is scheduled around your business hours, so your team comes back to a fresh office.",
      },
      {
        title: "Shared spaces prioritised",
        body: "Pantries, restrooms and meeting rooms — the areas everyone uses — get specific attention.",
      },
      {
        title: "A consistent crew",
        body: "Uniformed, in-house technicians and a supervisor checklist on every visit — never subcontracted labour.",
      },
    ],
    preparation: [
      "Clear desks of papers and personal items you don't want moved.",
      "Shut down or lock computers before the crew arrives.",
      "Arrange building access and security clearance for after-hours visits.",
    ],
    aftercare: [
      "Give carpets a few hours to dry before heavy foot traffic.",
      "Encourage prompt wiping of pantry spills between visits.",
      "Ask us about a recurring schedule to keep standards consistent.",
    ],
    faqs: [
      {
        question: "Can you clean outside office hours?",
        answer: "Yes. Office cleaning is scheduled around your business hours, including weekend slots where needed.",
      },
      {
        question: "Do you offer regular cleaning plans?",
        answer:
          "Yes. Share your floor area and preferred frequency, and we'll prepare a quote for a scheduled cleaning plan.",
      },
      {
        question: "How is office cleaning priced?",
        answer: "Quotes are based on floor area, the scope of work and how often you'd like the office cleaned.",
      },
    ],
    image: {
      src: officeLobby,
      alt: "Sparkle Pros technician wiping down an office lobby wall panel, with a branded vacuum beside him",
      position: "40% 40%",
    },
    related: ["commercial-cleaning-coimbatore", "bathroom-cleaning-coimbatore", "kitchen-cleaning-coimbatore"],
  },
  {
    slug: "commercial-cleaning-coimbatore",
    name: "Commercial Cleaning",
    category: "Business",
    icon: "store",
    metaTitle: "Commercial Cleaning Services in Coimbatore",
    metaDescription:
      "Commercial cleaning in Coimbatore for showrooms, dealerships, gyms and complexes — machine floor scrubbing, facade glass, high-level dusting and contracts.",
    h1: "Commercial cleaning services in Coimbatore",
    summary: "Machine floor scrubbing, showroom glass, high-level dusting and scheduled contracts.",
    intro:
      "Industrial-grade floor scrubbing, warehouse upkeep, showroom glass detailing and intensive post-event cleaning.",
    overview:
      "High-traffic commercial properties — retail showrooms, car dealerships, gyms and commercial complexes — need robust machinery. We provide single-disc rotary scrubbers, wet suction recovery and scheduled service contracts.",
    highlights: [
      "Epoxy, granite and vitrified floors buffed",
      "Display windows and facades washed up to two storeys",
      "HVAC intake vents and high-level pipes dusted",
    ],
    included: [
      "Epoxy, granite and vitrified commercial floor buffing",
      "Display window and facade washing up to two storeys",
      "HVAC intake vent and high-level pipe dust removal",
      "Waste disposal coordination and cleaning",
      "Comprehensive supervisor sign-off checklist",
    ],
    equipment: ["Heavy-duty single-disc rotary floor machine", "60-litre wet vacuums", "Safety harnesses"],
    process: [
      {
        title: "Site audit",
        body: "We assess floor types, glass heights and access on-site before confirming your quote.",
      },
      {
        title: "High-level dusting",
        body: "HVAC intake vents and high-level pipes are dusted first, so nothing falls on finished floors.",
      },
      {
        title: "Floor scrubbing and buffing",
        body: "Epoxy, granite and vitrified floors are machine-scrubbed and buffed, with wet suction recovery.",
      },
      {
        title: "Glass, waste and sign-off",
        body: "Display windows and facades are washed, waste is cleared, and a supervisor signs off the checklist.",
      },
    ],
    benefits: [
      {
        title: "Machinery for scale",
        body: "Single-disc rotary machines and 60-litre wet vacuums cover large floor areas efficiently.",
      },
      {
        title: "Safe work at height",
        body: "Facade and window work up to two storeys is carried out with safety harnesses.",
      },
      {
        title: "Supervisor sign-off",
        body: "Every job closes with a comprehensive supervisor checklist before handover.",
      },
    ],
    preparation: [
      "Share floor area, floor types and any glass above ground level.",
      "Plan the clean outside trading hours where possible.",
      "Move stock, displays or equipment that shouldn't be handled.",
    ],
    aftercare: [
      "Dry-mop buffed floors daily to keep grit from dulling the finish.",
      "Use entrance mats to cut the dirt tracked in from outside.",
      "Ask about a scheduled contract to keep standards consistent.",
    ],
    faqs: [
      {
        question: "What kinds of commercial properties do you clean?",
        answer:
          "Retail showrooms, car dealerships, gyms, commercial complexes and warehouses — plus intensive cleaning after events.",
      },
      {
        question: "Do you clean glass facades?",
        answer: "Yes. Display windows and facades up to two storeys are washed, using safety harnesses.",
      },
      {
        question: "How do you quote for commercial work?",
        answer:
          "We carry out a site audit to understand floor area, surfaces, heights and access, then provide a customised quote.",
      },
    ],
    image: {
      src: commercialFloorGlass,
      alt: "Sparkle Pros crew vacuuming a polished commercial floor and squeegeeing floor-to-ceiling glass",
      position: "50% 50%",
    },
    related: ["office-cleaning-coimbatore", "villa-cleaning-coimbatore", "home-deep-cleaning-coimbatore"],
  },
];

export const serviceCategories: { id: ServiceCategory; label: string; description: string }[] = [
  { id: "Residential", label: "Homes", description: "Whole-home deep cleaning for flats, houses and villas." },
  { id: "Specialist", label: "Specialist", description: "Focused treatments for the hardest-working rooms and furniture." },
  { id: "Business", label: "Business", description: "Offices, showrooms and commercial properties." },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function serviceHref(slug: string) {
  return `/services/${slug}`;
}

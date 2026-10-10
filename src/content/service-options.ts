/**
 * Minimal service list for client-side code (quote form, validation).
 *
 * Kept separate from services.ts so browsers don't download every service
 * page's copy just to render a <select>. A unit test checks it stays in sync.
 */
export const serviceOptionList = [
  { value: "home-deep-cleaning-coimbatore", label: "Home Deep Cleaning" },
  { value: "sofa-cleaning-coimbatore", label: "Sofa Cleaning" },
  { value: "apartment-cleaning-coimbatore", label: "Apartment Cleaning" },
  { value: "villa-cleaning-coimbatore", label: "Villa Cleaning" },
  { value: "kitchen-cleaning-coimbatore", label: "Kitchen Cleaning" },
  { value: "bathroom-cleaning-coimbatore", label: "Bathroom Cleaning" },
  { value: "office-cleaning-coimbatore", label: "Office Cleaning" },
  { value: "commercial-cleaning-coimbatore", label: "Commercial Cleaning" },
] as const;

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  location: string;
  slug: string;
  image: string;
  duration: string;
  included: string[];
  equipment: string[];
  pricingHint: string;
}

export interface BeforeAfterItem {
  id: string;
  category: string;
  title: string;
  spaceType: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  span: string; // Tailwind grid span
  aspect: string;
}

export interface LocationItem {
  name: string;
  pincode: string;
  tag: string;
  eta: string;
  landmark: string;
  popularServices: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ReelItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  category: string;
  thumbnail: string;
  serviceSlug: string;
}

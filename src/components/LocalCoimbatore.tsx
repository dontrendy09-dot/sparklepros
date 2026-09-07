import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

interface LocalCoimbatoreProps {
  onOpenBooking: (serviceName?: string, areaName?: string) => void;
}

export default function LocalCoimbatore({ onOpenBooking }: LocalCoimbatoreProps) {
  return (
    <section id="areas-section" className="py-16 sm:py-32 px-4 sm:px-12 bg-[#F6F6F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#5B2464] text-xs font-semibold mb-3 sm:mb-4 border border-black/5 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#5B2464]" />
            <span>Kongu service network</span>
          </div>

          <h2 className="font-display text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] mb-4 sm:mb-6">
            Made for the Kongu Region.
          </h2>

          <p className="text-sm sm:text-xl text-[#121417]/70 leading-relaxed">
            Sparkle Pros delivers mechanized German steam cleaning services exclusively across Coimbatore and the entire Kongu belt — covering Tiruppur, Erode, Salem, Karur, Namakkal, and neighboring industrial corridors.
          </p>
        </div>

        {/* Coverage District & City Badges (Clean display, no popup card on click) */}
        <div className="mb-8 sm:mb-10">
          <div className="text-xs font-semibold text-[#121417]/50 mb-3 sm:mb-4">
            Service coverage and dispatch corridors:
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium bg-white text-[#121417]/85 border border-black/8 shadow-2xs flex items-center gap-2 transition-all hover:border-[#5B2464]/30"
              >
                <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500" />
                <span>{loc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Call to Action */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4 border-t border-black/6">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto justify-center px-6 py-3 rounded-full bg-[#5B2464] text-white text-sm font-semibold hover:bg-[#722E7D] transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Book an inspection</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <a
            href="https://wa.me/919585859617?text=Hello%20Sparkle%20Pros,%20I%20would%20like%20to%20check%20service%20availability%20in%20my%20area."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center text-center px-5 py-3 rounded-full bg-white text-[#121417] border border-black/10 text-sm font-medium hover:bg-black/2 transition-colors active:scale-95"
          >
            Check area on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

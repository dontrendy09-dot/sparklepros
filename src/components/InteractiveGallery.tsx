import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';

interface InteractiveGalleryProps {
  onOpenBooking: (serviceName?: string) => void;
}

const CATEGORIES = ['All', 'Villa & Home', 'Upholstery', 'Kitchen & Bath', 'Floor Care'];

export default function InteractiveGallery({ onOpenBooking }: InteractiveGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => {
        if (selectedCategory === 'Villa & Home') return item.category.toLowerCase().includes('deep clean') || item.category.toLowerCase().includes('villa');
        if (selectedCategory === 'Upholstery') return item.category.toLowerCase().includes('steam') || item.category.toLowerCase().includes('sofa');
        if (selectedCategory === 'Kitchen & Bath') return item.category.toLowerCase().includes('kitchen') || item.category.toLowerCase().includes('bathroom');
        if (selectedCategory === 'Floor Care') return item.category.toLowerCase().includes('scrubbing') || item.category.toLowerCase().includes('floor');
        return true;
      });

  return (
    <section id="gallery-section" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-8 border-b border-black/8 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] mb-3 block">
              PORTFOLIO SNAPSHOTS
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417]">
              A glimpse of the work.
            </h2>
          </div>

          {/* Minimal Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#5B2464] text-white shadow-sm'
                    : 'bg-white border border-black/8 text-[#121417]/70 hover:text-[#5B2464] hover:border-[#5B2464]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Modern Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-[28px] overflow-hidden border border-black/8 shadow-sm hover:shadow-[0_20px_40px_rgba(91,36,100,0.08)] transition-all cursor-pointer flex flex-col"
                onClick={() => onOpenBooking(item.category)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#121417] text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Location Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-[#5B2464]" />
                    <span>Coimbatore Verified</span>
                  </div>
                </div>

                {/* Minimal Card Body */}
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#121417] group-hover:text-[#5B2464] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#121417]/50 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#5B2464]" />
                      <span>40-Point Quality Inspected</span>
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-[#121417]/60 group-hover:bg-[#5B2464] group-hover:text-white transition-all flex-shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

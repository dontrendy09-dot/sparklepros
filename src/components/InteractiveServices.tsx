import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowRight, Cpu, Clock, Check } from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES } from '../data/mockData';

interface InteractiveServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceName: string) => void;
}

// Curated high-res imagery highlighting German Kärcher & precision cleaning equipment
const GERMAN_CLEANING_ASSETS: Record<string, { bgImage: string; machineName: string; spec: string }> = {
  'deep-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher Professional Steam & Scrub Engine',
    spec: '140°C Thermal Vapor • HEPA Class H14',
  },
  'sofa-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher Puzzi 10/1 Spray Extraction',
    spec: '1.2 Bar Spray • 236 mbar Vacuum Lift',
  },
  'mattress-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=85',
    machineName: 'German Ultra-High Vacuum Extraction',
    spec: '99.9% Dust Mite Eradication • Fast-Dry Vapor',
  },
  'villa-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher Dual Heavy Rotary & Steam Unit',
    spec: '140 Bar Pressure • Multi-Surface Calibration',
  },
  'kitchen-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher SG 4/4 Industrial Steam Degreaser',
    spec: '4 Bar Steam Pressure • Food-Safe Non-Toxic',
  },
  'bathroom-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85',
    machineName: 'German Thermal Descaling & Grout Restorer',
    spec: 'pH-Neutralized Chemistry • Scale Dissolution',
  },
  'office-cleaning': {
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher Commercial Carpet & Hard Floor Unit',
    spec: 'Quiet 66 dB(A) Operation • Commercial Grade',
  },
  'floor-scrubbing': {
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    machineName: 'Kärcher Single-Disc Rotary Buffer (BDS 43/150)',
    spec: '150 RPM Planetary Gear • Marble & Granite Buff',
  },
};

export default function InteractiveServices({
  onSelectService,
  onBookService,
}: InteractiveServicesProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll position within this dedicated container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  // Automatically update active service as user scrolls
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = SERVICES.length;
    // Divide the scroll container into equal segments
    const newIndex = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    if (newIndex !== selectedIdx) {
      setSelectedIdx(newIndex);
    }
  });

  const activeService = SERVICES[selectedIdx] || SERVICES[0];
  const activeAsset = GERMAN_CLEANING_ASSETS[activeService.id] || {
    bgImage: activeService.image,
    machineName: 'Kärcher German Engineering Asset',
    spec: '140°C High-Pressure Thermal Extraction',
  };

  const handlePillClick = (index: number) => {
    setSelectedIdx(index);
    if (scrollContainerRef.current) {
      const containerTop = scrollContainerRef.current.offsetTop;
      const containerHeight = scrollContainerRef.current.offsetHeight;
      const targetScroll = containerTop + (index / (SERVICES.length - 1)) * (containerHeight - window.innerHeight);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services-section"
      ref={scrollContainerRef}
      className="relative bg-[#FBFBFA]"
      style={{ minHeight: '300vh' }}
    >
      {/* Sticky viewport frame pinned to top while scrolling - Full Screen on Desktop */}
      <div className="sticky top-0 min-h-screen lg:h-screen lg:max-h-screen py-8 sm:py-10 lg:py-6 px-6 sm:px-12 flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center">
          {/* Header - Clean without scroll prompt */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 lg:mb-6">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464] block mb-1">
                SERVICE ARCHITECTURE
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.06]">
                Our Service Architecture <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#5B2464]">Clean, your way</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5B2464] bg-white px-3.5 py-1.5 rounded-full border border-black/8 shadow-xs">
                <span>0{selectedIdx + 1} of 0{SERVICES.length}</span>
                <div className="w-20 h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#5B2464]"
                    animate={{ width: `${((selectedIdx + 1) / SERVICES.length) * 100}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Column: Stacked Rounded Button Pills */}
            <div className="lg:col-span-5 flex flex-col gap-1.5 sm:gap-2">
              {SERVICES.map((service, index) => {
                const isSelected = selectedIdx === index;
                return (
                  <button
                    key={service.id}
                    onClick={() => handlePillClick(index)}
                    className={`w-full text-left px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-[18px] border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#5B2464] shadow-[0_6px_20px_rgba(91,36,100,0.12)] ring-1 ring-[#5B2464]/20'
                        : 'bg-white/60 hover:bg-white border-black/6 text-[#121417]/70 hover:text-[#121417]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          isSelected ? 'text-[#5B2464]' : 'text-black/30 group-hover:text-[#5B2464]/60'
                        }`}
                      >
                        {service.number}.
                      </span>
                      <span
                        className={`text-xs sm:text-sm tracking-tight transition-colors ${
                          isSelected ? 'font-bold text-[#121417]' : 'font-medium text-[#121417]/80'
                        }`}
                      >
                        {service.name}
                      </span>
                    </div>

                    {isSelected && (
                      <motion.span
                        layoutId="activePillDot"
                        className="w-2 h-2 rounded-full bg-[#5B2464]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Column: Full Unobstructed German Cleaning Visual */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] max-h-[50vh] xl:max-h-[54vh] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(91,36,100,0.14)] border border-black/8 bg-zinc-900">
                {/* Full-view Background Image with smooth crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeAsset.bgImage}
                    src={activeAsset.bgImage}
                    alt={activeService.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Subtle gradient vignette for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30 pointer-events-none" />

                {/* Top Corner: German Machinery Asset Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.span
                    key={activeAsset.machineName}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 shadow-md"
                  >
                    <Cpu className="w-3.5 h-3.5 text-purple-300" />
                    <span>{activeAsset.machineName}</span>
                  </motion.span>
                </div>

                {/* Bottom Bar: Sleek, non-blocking metadata bar with Instant Book Button */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-[20px] p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-purple-300">
                          {activeService.number} • GERMAN SPEC
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/80 flex items-center gap-1 font-medium">
                          <Clock className="w-3 h-3 text-purple-300" />
                          {activeService.duration}
                        </span>
                      </div>

                      <h3 className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                        {activeService.name}
                      </h3>
                      <p className="text-xs text-white/70 mt-0.5 line-clamp-1">
                        {activeService.shortDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => onBookService(activeService.name)}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#5B2464] text-white text-xs sm:text-sm font-bold hover:bg-[#742E80] transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Book Service</span>
                      </button>

                      <button
                        onClick={() => onSelectService(activeService)}
                        className="px-3.5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 border border-white/20 cursor-pointer"
                      >
                        <span>Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

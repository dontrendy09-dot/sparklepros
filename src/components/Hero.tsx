import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import WhatsAppIcon from './WhatsAppIcon';

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end feel
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Parallax layers
  const heroImageX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const heroImageY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const heroRotate = useTransform(springX, [-0.5, 0.5], [-1.2, 1.2]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-32 sm:pt-36 pb-16 sm:pb-24 px-6 sm:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle organic background gradients & glow in #5B2464 */}
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#5B2464]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#742E80]/8 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-grow">
        {/* Left Editorial Content */}
        <div className="lg:col-span-7 flex flex-col z-10 pr-0 lg:pr-6">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464]">
              STEAM CLEANS BETTER • COIMBATORE & KONGU REGION
            </span>
          </motion.div>

          {/* Main Headline (500ms - 1100ms upward rise) */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl lg:text-[82px] font-extrabold tracking-[-0.035em] text-[#121417] leading-[0.98] mb-6"
          >
            A cleaner space <br />
            <span className="text-[#5B2464]">
              changes everything.
            </span>
          </motion.h1>

          {/* Dynamic Reveal Sub-tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <p className="text-base sm:text-lg font-bold text-[#5B2464] tracking-tight">
              Steam cleaning & deep sanitization fleet.
            </p>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#121417]/70 font-normal leading-relaxed max-w-xl mb-10"
          >
            Specialized mechanized deep cleaning, 140°C thermal vapor extraction, and surface restoration for homes, villas, and commercial properties across Coimbatore and the Kongu region.
          </motion.p>

          {/* CTA Group (1000ms - 1600ms) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <button
              id="hero-book-cta"
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5B2464] text-white text-sm sm:text-base font-semibold tracking-wide shadow-[0_12px_24px_-8px_rgba(91,36,100,0.4)] hover:bg-[#742E80] transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>Book a Cleaning</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              id="hero-whatsapp-cta"
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white border border-[#121417]/12 text-[#121417] text-sm sm:text-base font-medium hover:border-[#25D366] hover:text-[#128C7E] hover:bg-[#25D366]/5 transition-all duration-300 hover:scale-[1.02] shadow-sm cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] transition-transform group-hover:scale-110" />
              <span>WhatsApp Fleet</span>
            </a>
          </motion.div>

          {/* Micro Trust Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-10 pt-8 border-t border-black/8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#121417]/75 font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
              <span>140°C Steam Sanitization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
              <span>Verified In-House Crew</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
              <span>Zero-Harsh Smells</span>
            </div>
          </motion.div>
        </div>

        {/* Right Floating Cleaning Visual with cursor parallax */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Parallax clean image without badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: heroImageX, y: heroImageY, rotate: heroRotate }}
            className="relative w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-[0_30px_70px_-15px_rgba(91,36,100,0.18)] border border-white/60 bg-white/40 backdrop-blur-md transition-shadow hover:shadow-[0_40px_90px_-20px_rgba(91,36,100,0.25)]"
          >
            {/* Real Cleaning Visual */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
                alt="Sparkle Pros technician performing high-temperature deep steam cleaning"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/80 via-transparent to-black/10" />

              {/* Bottom Image Overlay Caption */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase mb-2 border border-white/20">
                  <span>German Engineering Standard</span>
                </div>
                <h3 className="font-display font-bold text-lg leading-snug">
                  Kärcher 140°C thermal vapor extraction & rotary buffing.
                </h3>
                <p className="text-xs text-white/80 mt-1">
                  Active Dispatch across Coimbatore & Kongu Region
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

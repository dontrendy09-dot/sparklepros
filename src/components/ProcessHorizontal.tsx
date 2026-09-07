import { useRef } from 'react';
import { motion } from 'motion/react';
import {
  CalendarCheck,
  MessageSquare,
  Truck,
  Sparkles,
  CheckCircle2,
  Smile,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

interface ProcessHorizontalProps {
  onOpenBooking: () => void;
}

export default function ProcessHorizontal({ onOpenBooking }: ProcessHorizontalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'CalendarCheck':
        return CalendarCheck;
      case 'MessageSquare':
        return MessageSquare;
      case 'Truck':
        return Truck;
      case 'Sparkles':
        return Sparkles;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'Smile':
      default:
        return Smile;
    }
  };

  return (
    <section id="process-section" className="py-28 sm:py-36 bg-[#F6F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] mb-3 block">
              SEAMLESS CONVENIENCE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.05]">
              From booking <br />
              <span className="text-[#5B2464]">to clean.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-sm text-[#121417]/60 mr-4 max-w-xs">
              Scroll horizontally or use arrow controls to step through the journey.
            </p>
            <button
              onClick={scrollLeft}
              className="h-12 w-12 rounded-full bg-white border border-black/8 flex items-center justify-center text-[#121417] hover:bg-[#5B2464] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="h-12 w-12 rounded-full bg-white border border-black/8 flex items-center justify-center text-[#121417] hover:bg-[#5B2464] hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Strip Container with smooth scrolling */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-6 sm:px-12 pb-8 pt-2 scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {PROCESS_STEPS.map((step, idx) => {
          const Icon = getStepIcon(step.iconName);
          return (
            <motion.div
              key={step.number}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex-none w-[280px] sm:w-[340px] bg-white rounded-[32px] p-8 border border-black/6 shadow-[0_15px_35px_rgba(0,0,0,0.05)] flex flex-col justify-between"
            >
              <div>
                {/* Step Top */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs font-extrabold text-white bg-[#5B2464] px-3.5 py-1.5 rounded-full">
                    {step.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-[#5B2464]/10 text-[#5B2464] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-xs uppercase font-bold tracking-wider text-[#5B2464] mb-1">
                  {step.subtitle}
                </div>

                <h3 className="font-display text-3xl font-extrabold text-[#121417] mb-4">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#121417]/65 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-8 pt-6 border-t border-black/6 flex items-center justify-between text-xs font-semibold text-[#121417]/40">
                <span>Phase {idx + 1} of 6</span>
                {idx < 5 ? (
                  <ArrowRight className="w-4 h-4 text-[#5B2464]" />
                ) : (
                  <span className="text-[#5B2464] font-bold">Done ✓</span>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Quick Booking Final Pill Card */}
        <div className="flex-none w-[280px] sm:w-[320px] bg-[#121417] text-white rounded-[32px] p-8 flex flex-col justify-between shadow-xl">
          <div>
            <span className="inline-block text-xs font-mono font-bold text-purple-200 bg-white/10 px-3 py-1 rounded-full mb-6">
              READY NOW?
            </span>
            <h3 className="font-display text-3xl font-bold leading-tight mb-4">
              Book your Coimbatore slot.
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Slots fill up fast on weekends across RS Puram, Saravanampatti, and Peelamedu.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-3.5 rounded-full bg-[#5B2464] hover:bg-[#742E80] text-white text-xs font-bold uppercase tracking-wider transition-colors mt-6 shadow-md"
          >
            Start Booking →
          </button>
        </div>
      </div>
    </section>
  );
}

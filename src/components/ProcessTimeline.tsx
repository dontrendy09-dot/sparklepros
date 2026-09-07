import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import {
  CalendarCheck,
  MessageSquare,
  Truck,
  Sparkles,
  CheckCircle2,
  Smile,
  ArrowRight,
  ShieldCheck,
  Activity,
  Check,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/mockData';

interface ProcessTimelineProps {
  onOpenBooking: () => void;
}

const STEP_STATUSES = [
  { status: 'INITIALIZED', sla: 'Instant confirmation (< 2 mins)', color: 'text-purple-600 bg-purple-50' },
  { status: 'DIAGNOSTIC LOCKED', sla: 'WhatsApp photo assessment', color: 'text-blue-600 bg-blue-50' },
  { status: 'FLEET DISPATCHED', sla: 'On-time arrival with Kärcher kit', color: 'text-amber-600 bg-amber-50' },
  { status: '140°C STEAM ACTIVE', sla: 'High-heat thermal extraction', color: 'text-red-600 bg-red-50' },
  { status: 'QUALITY AUDIT', sla: '40-Point room-by-room inspection', color: 'text-indigo-600 bg-indigo-50' },
  { status: 'VERIFIED COMPLETE', sla: 'Pay only after 100% satisfaction', color: 'text-emerald-600 bg-emerald-50' },
];

export default function ProcessTimeline({ onOpenBooking }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position within this timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
    <section
      id="process-section"
      ref={containerRef}
      className="py-24 sm:py-36 bg-[#F6F6F2] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-20 sm:mb-28">
          <div>
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold uppercase tracking-wider mb-4">
              LIVE STATUS TIMELINE
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.06]">
              From booking <br />
              <span className="font-serif italic font-normal text-[#5B2464]">to clean.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#121417]/65 leading-relaxed mb-4">
              Scroll through our status-based cleaning protocol. A transparent 6-stage operational pipeline engineered for consistency and peace of mind.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5B2464]">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-time milestone progress tracking</span>
            </div>
          </div>
        </div>

        {/* Vertical Timeline with Scroll-Linked Animation */}
        <div className="relative">
          {/* Background Rail Track */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-black/10 -translate-x-1/2 rounded-full hidden sm:block" />

          {/* Animated Glowing Progress Line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1.5 bg-gradient-to-b from-[#5B2464] via-[#742E80] to-[#5B2464] -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(91,36,100,0.5)] z-10 hidden sm:block"
          />

          {/* Timeline Nodes & Step Cards */}
          <div className="flex flex-col gap-12 sm:gap-20">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = getStepIcon(step.iconName);
              const meta = STEP_STATUSES[idx] || STEP_STATUSES[0];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
                >
                  {/* Left Side (Desktop): Card for Even, Empty for Odd */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:order-last'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="bg-white rounded-[28px] p-7 sm:p-9 border border-black/8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(91,36,100,0.1)] hover:border-[#5B2464]/30 transition-all group"
                    >
                      {/* Status Tag Pill */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase mb-4 ${meta.color}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                        <span>STATUS: {meta.status}</span>
                      </div>

                      {/* Header */}
                      <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="font-mono text-xs font-extrabold text-[#5B2464]">
                          STAGE {step.number}
                        </span>
                        <span className="text-xs text-[#121417]/40 font-medium">•</span>
                        <span className="text-xs text-[#121417]/60 font-medium">
                          {step.subtitle}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121417] tracking-tight mb-3">
                        {step.title}
                      </h3>

                      <p className="text-sm text-[#121417]/70 leading-relaxed mb-4">
                        {step.desc}
                      </p>

                      {/* SLA / Benchmark Footer */}
                      <div className={`pt-4 border-t border-black/6 flex items-center gap-2 text-xs text-[#121417]/50 font-medium ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Check className="w-3.5 h-3.5 text-[#5B2464]" />
                        <span>{meta.sla}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Node on Timeline Rail */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 hidden sm:flex">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 rounded-full bg-white border-4 border-[#5B2464] shadow-[0_0_20px_rgba(91,36,100,0.3)] flex items-center justify-center text-[#5B2464] group-hover:scale-110 transition-transform"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Right Side (Desktop): Empty space or opposite alignment */}
                  <div className="w-full md:w-1/2 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Booking Banner */}
        <div className="mt-20 sm:mt-28 p-8 sm:p-12 rounded-[36px] bg-[#5B2464] text-white shadow-[0_20px_60px_rgba(91,36,100,0.25)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-200 block mb-2">
              ZERO ADVANCE PAYMENT REQUIRED
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Ready to initialize your cleaning pipeline?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              Confirmed slot in under 2 minutes. Inspect first, pay after complete satisfaction.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-full bg-white text-[#5B2464] text-sm sm:text-base font-bold tracking-wide hover:bg-purple-50 transition-all flex items-center gap-2.5 shadow-md hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <span>Lock Your Date & Time</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

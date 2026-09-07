import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Flame, Droplets, Sparkles, Wind, ShieldCheck } from 'lucide-react';

export default function SteamCleaningStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1.02, 0.98]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  const steps = [
    {
      action: 'Loosen',
      sub: 'Dirt and residue.',
      detail:
        'Pressurized 140°C dry micro-vapor expands upon contact, dissolving bonded grease, body oils, and dried stains without surface abrasion.',
      icon: Flame,
      stepNum: '01',
    },
    {
      action: 'Clean',
      sub: 'Suitable surfaces using appropriate methods.',
      detail:
        'Targeted extraction wands dislodge suspended particles from grout, fabric fibers, and sanitaryware for total hygienic purity.',
      icon: Droplets,
      stepNum: '02',
    },
    {
      action: 'Refresh',
      sub: 'A cleaner, more comfortable space.',
      detail:
        'Restores original texture and neutral air quality with rapid moisture dry-off and zero lingering chemical odor.',
      icon: Sparkles,
      stepNum: '03',
    },
  ];

  return (
    <section
      id="steam-section"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-12 bg-[#FBFBFA] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-24">
          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold uppercase tracking-wider mb-6">
              THE THERMAL EXTRACTION PROTOCOL
            </div>

            <h2 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-extrabold tracking-[-0.035em] text-[#121417] leading-[0.98] mb-6">
              Steam meets <br />
              <span className="text-[#5B2464]">the surface.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#121417]/70 max-w-xl leading-relaxed">
              We leverage thermal physics instead of heavy caustic chemicals. High-temperature steam breaks molecular grease and lifts microbial build-up while keeping home environments safe.
            </p>
          </div>

          {/* Right Visual with subtle scroll scale & glow */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ scale, rotate }}
              className="relative aspect-square sm:aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border border-black/5 bg-black"
            >
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85"
                alt="High-pressure steam vapor cleaning nozzle"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Live Indicator */}
              <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5B2464] ring-2 ring-white animate-pulse" />
                <span>140°C Micro-Vapor Output</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs uppercase tracking-wider text-purple-200 font-semibold mb-1">
                  Chemical-Reduced Technology
                </div>
                <div className="font-display text-xl font-bold">
                  Zero toxic residue for kids & pets
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3-Step Storytelling Flow: Loosen -> Clean -> Refresh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.action}
                className="relative bg-white rounded-[28px] p-8 border border-black/6 shadow-sm hover:shadow-xl hover:border-[#5B2464]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#5B2464] bg-[#5B2464]/10 px-3 py-1 rounded-full">
                      Step {step.stepNum}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#121417] group-hover:bg-[#5B2464] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-3xl font-extrabold text-[#121417] mb-1">
                    {step.action}
                  </h3>

                  <p className="text-sm font-semibold text-[#5B2464] mb-4">
                    {step.sub}
                  </p>

                  <p className="text-xs sm:text-sm text-[#121417]/65 leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/6 flex items-center gap-2 text-xs font-semibold text-[#121417]/60 group-hover:text-[#5B2464] transition-colors">
                  <ShieldCheck className="w-4 h-4 text-[#5B2464]" />
                  <span>Verified Safe Protocol</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

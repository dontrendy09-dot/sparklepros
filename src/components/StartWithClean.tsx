import { motion } from 'motion/react';
import { Sparkles, Shield, Wind, Cpu } from 'lucide-react';

const PRINCIPLES = [
  {
    number: '01',
    icon: Wind,
    title: '140°C Pure Steam Sanitization',
    desc: 'High-temperature vapor naturally neutralizes 99.9% of dust mites, pathogens, and allergens without synthetic fragrances or harsh lingering chemicals.',
    highlight: 'Zero toxic residue',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Industrial Extraction Engineering',
    desc: 'German Kärcher machinery and calibrated rotary floor scrubbers deliver deep mechanical penetration that standard domestic cleaning cannot touch.',
    highlight: 'Kärcher professional grade',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Verified In-House Specialists',
    desc: 'Every technician on your premises is a vetted, company-employed full-time cleaner trained with our stringent 40-point quality audit checklist.',
    highlight: 'Zero third-party subcontracting',
  },
];

export default function StartWithClean() {
  return (
    <section id="philosophy-section" className="py-24 sm:py-32 px-6 sm:px-12 bg-white relative overflow-hidden">
      {/* Minimal background ambient accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#5B2464]/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B2464]" />
            <span>The Sparkle Pros Philosophy</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.04] mb-6"
          >
            Start with clean. <br />
            <span className="text-[#5B2464]">Feel the difference.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#121417]/70 font-normal leading-relaxed"
          >
            We believe a pristine environment is not just an aesthetic luxury—it is fundamental to health, clarity, and peace of mind. Our approach merges industrial cleaning science with meticulous hospitality standards.
          </motion.p>
        </div>

        {/* Minimal 3-Pillar Clean Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-6 border-t border-black/8">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm font-semibold text-[#5B2464]/60 group-hover:text-[#5B2464] transition-colors">
                      /{principle.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#5B2464]/[0.07] text-[#5B2464] flex items-center justify-center transition-all duration-300 group-hover:bg-[#5B2464] group-hover:text-white group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#121417] tracking-tight leading-snug mb-3">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-[#121417]/70 leading-relaxed font-normal mb-6">
                    {principle.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464]" />
                  <span className="text-xs font-semibold text-[#5B2464] tracking-wide">
                    {principle.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

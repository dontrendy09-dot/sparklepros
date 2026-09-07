import { motion } from 'motion/react';

interface StatItem {
  id: string;
  metric: string;
  title: string;
  subtitle: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'homes-cleaned',
    metric: '1,200+',
    title: 'Homes & Villas Cleaned',
    subtitle: 'Across Coimbatore',
  },
  {
    id: 'google-rating',
    metric: '4.9★',
    title: 'Google Verified Rating',
    subtitle: 'From real local clients',
  },
  {
    id: 'inhouse-crew',
    metric: '100%',
    title: 'In-House Crew',
    subtitle: 'Zero subcontracting',
  },
  {
    id: 'pincodes-served',
    metric: '25+',
    title: 'Pincodes Served',
    subtitle: 'Daily dispatch fleet',
  },
];

export default function StatsCards() {
  return (
    <section id="stats-section" className="relative z-10 px-6 sm:px-12 -mt-4 sm:-mt-8 mb-12 sm:mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {STATS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 border border-black/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(91,36,100,0.09)] transition-all flex flex-col justify-between"
            >
              {/* Big Purple Number matching uploaded visual */}
              <div className="font-display text-4xl sm:text-5xl lg:text-[52px] font-black text-[#5B2464] tracking-tight leading-none mb-5">
                {item.metric}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#121417] leading-tight mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#121417]/50 font-normal">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="stats-section" className="relative z-10 px-4 sm:px-12 -mt-4 sm:-mt-8 mb-10 sm:mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl sm:rounded-[32px] p-4 sm:p-8 border border-black/[0.08] shadow-[0_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(91,36,100,0.09)] transition-all flex flex-col justify-between"
            >
              {/* Big Purple Number matching uploaded visual */}
              <div className="font-display text-3xl sm:text-5xl lg:text-[52px] font-black text-[#5B2464] tracking-tight leading-none mb-3 sm:mb-5">
                {item.metric}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-display font-bold text-xs sm:text-lg text-[#121417] leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-[#121417]/50 font-normal leading-tight">
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

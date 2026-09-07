import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, ArrowUpRight, Instagram, Eye, Sparkles } from 'lucide-react';
import { REELS } from '../data/mockData';

// High-definition German precision cleaning footage thumbnails
const GERMAN_FOOTAGE_REELS = [
  {
    id: 'reel-1',
    title: 'German Steam Injection | 140°C Sofa Deep Extraction',
    category: 'Sofa Extraction',
    views: '24.8K',
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-2',
    title: 'Kärcher High Pressure Degreasing on Modular Kitchen',
    category: 'Kitchen Detailing',
    views: '41.2K',
    thumbnail: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-3',
    title: 'Precision Descaling on Restroom Glass & Italian Grout',
    category: 'Restroom Care',
    views: '18.9K',
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-4',
    title: 'German Single-Disc Rotary Buffer on Granite Flooring',
    category: 'Floor Polishing',
    views: '32.1K',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'reel-5',
    title: 'Villa Deep Sanitization Walkthrough in Peelamedu',
    category: 'Villa Detailing',
    views: '15.6K',
    thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=85',
  },
];

export default function InstagramStrip() {
  const [isHovered, setIsHovered] = useState(false);

  // Triple duplicated list for an uninterrupted seamless loop
  const seamlessReels = [...GERMAN_FOOTAGE_REELS, ...GERMAN_FOOTAGE_REELS, ...GERMAN_FOOTAGE_REELS];

  return (
    <section id="instagram-section" className="py-16 sm:py-32 bg-[#FBFBFA] overflow-hidden border-t border-b border-black/6">
      {/* Minimal Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 mb-8 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#5B2464] mb-2 sm:mb-3">
              LIVE ON-SITE FOOTAGE
            </div>
            <h2 className="font-display text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417]">
              Watch our crew in action.
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white border border-black/10 text-xs font-bold text-[#121417] hover:bg-[#5B2464] hover:text-white hover:border-[#5B2464] transition-all shadow-xs self-start md:self-auto active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>@sparklepros_cbe</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Minimal Horizontal Scrolling Animation Marquee */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge fade masks */}
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-[#FBFBFA] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: isHovered ? undefined : ['0%', '-33.333%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 38,
              ease: 'linear',
            },
          }}
          className="flex gap-4 sm:gap-6 w-max py-2"
        >
          {seamlessReels.map((reel, index) => (
            <a
              key={`${reel.id}-${index}`}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-56 sm:w-72 flex-shrink-0 aspect-[9/15] rounded-2xl sm:rounded-[28px] overflow-hidden bg-zinc-900 border border-black/8 shadow-xs hover:shadow-[0_20px_40px_rgba(91,36,100,0.15)] transition-all duration-300 block active:scale-98"
            >
              {/* Asset Footage Thumbnail */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Minimal Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 transition-opacity group-hover:opacity-90" />

              {/* Minimal Top Header Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                  <Play className="w-2.5 h-2.5 fill-white" />
                  <span>Footage</span>
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Eye className="w-3 h-3" />
                  <span>{reel.views}</span>
                </span>
              </div>

              {/* Center Play Button on Hover */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform scale-90 opacity-75 group-hover:scale-110 group-hover:opacity-100 group-hover:bg-[#5B2464] transition-all duration-300 shadow-md">
                  <Play className="w-5 h-5 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Minimal Bottom Info */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-300" />
                  <span>{reel.category}</span>
                </div>
                <p className="font-display font-medium text-xs sm:text-sm leading-snug line-clamp-2">
                  {reel.title}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { Sparkles, MoveHorizontal, Check, ShieldAlert } from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/mockData';

export default function BeforeAfterSlider() {
  const [activeCategory, setActiveCategory] = useState<string>(BEFORE_AFTER_ITEMS[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = BEFORE_AFTER_ITEMS.find((item) => item.id === activeCategory) || BEFORE_AFTER_ITEMS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="results-section" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#F6F6F2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#5B2464] text-xs font-bold uppercase tracking-wider mb-4 border border-black/5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#5B2464]" />
            <span>UNFILTERED VERIFIED RESULTS</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] mb-6">
            See the difference.
          </h2>

          <p className="text-base sm:text-lg text-[#121417]/70">
            Slide horizontally to inspect actual surface transformation performed by Sparkle Pros in Coimbatore homes and villas.
          </p>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {BEFORE_AFTER_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCategory(item.id);
                setSliderPosition(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === item.id
                  ? 'bg-[#5B2464] text-white shadow-sm'
                  : 'bg-white/80 text-[#121417]/70 hover:bg-white hover:text-[#5B2464] border border-black/5'
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        {/* Before / After Canvas */}
        <div className="relative bg-white rounded-[32px] p-4 sm:p-6 border border-black/6 shadow-[0_20px_60px_-15px_rgba(91,36,100,0.08)]">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none shadow-inner"
          >
            {/* AFTER Image (Underneath, full width) */}
            <img
              src={activeItem.afterImage}
              alt={`${activeItem.title} - After`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            {/* AFTER Badge */}
            <div className="absolute top-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-[#121417]/80 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase pointer-events-none flex items-center gap-1.5 shadow-md">
              <Check className="w-3.5 h-3.5 text-[#5B2464]" />
              <span>AFTER SPARKLE PROS</span>
            </div>

            {/* BEFORE Image (Clipped on top) */}
            <div
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              className="absolute inset-0 w-full h-full pointer-events-none transition-[clip-path] duration-75 ease-out"
            >
              <img
                src={activeItem.beforeImage}
                alt={`${activeItem.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* BEFORE Badge */}
              <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white/90 text-xs font-bold tracking-wider uppercase pointer-events-none flex items-center gap-1.5 shadow-md">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>BEFORE</span>
              </div>
            </div>

            {/* Drag Handle Divider Line */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none transform -translate-x-1/2"
            >
              {/* Central Round Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#121417] shadow-[0_4px_15px_rgba(0,0,0,0.25)] flex items-center justify-center border border-black/10">
                <MoveHorizontal className="w-5 h-5 text-[#5B2464]" />
              </div>
            </div>
          </div>

          {/* Underneath Info & Statement */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
            <div>
              <h3 className="font-display font-bold text-lg text-[#121417]">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#121417]/60 mt-0.5">
                {activeItem.spaceType} • {activeItem.description}
              </p>
            </div>

            <div className="text-xs font-medium text-[#5B2464] bg-[#5B2464]/10 px-3.5 py-1.5 rounded-full self-start sm:self-auto whitespace-nowrap">
              Drag left or right to inspect
            </div>
          </div>
        </div>

        {/* Core Statement Banner */}
        <div className="mt-14 text-center">
          <p className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121417]/85">
            Real work. Real spaces. Real results.
          </p>
          <p className="text-xs sm:text-sm text-[#121417]/50 mt-1">
            Zero stock renders. Documented on location across Coimbatore homes, apartments and commercial properties.
          </p>
        </div>
      </div>
    </section>
  );
}

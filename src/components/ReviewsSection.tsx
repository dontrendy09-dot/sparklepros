import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, ArrowUpRight } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide animation every 6 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const review = REVIEWS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      id="reviews-section"
      className="py-24 sm:py-36 px-6 sm:px-12 bg-[#FBFBFA] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold tracking-wider uppercase mb-4"
          >
            <span>Verified Experiences</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.08] max-w-3xl mx-auto"
          >
            “A cleaner experience from start to finish.”
          </motion.h2>
          <p className="text-sm sm:text-base text-[#121417]/60 mt-4">
            Curated from verified Google Business reviews in Coimbatore.
          </p>
        </div>

        {/* Animated Testimonial Card */}
        <div className="relative bg-white rounded-[36px] p-8 sm:p-14 border border-black/6 shadow-[0_25px_60px_-15px_rgba(91,36,100,0.08)] overflow-hidden">
          {/* Subtle Watermark Quote */}
          <Quote className="absolute top-6 right-8 w-28 h-28 text-[#5B2464]/[0.04] pointer-events-none" />

          {/* Stepper Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#5B2464] text-white">
                Review 0{currentIndex + 1} of 0{REVIEWS.length}
              </span>
              <div className="flex items-center text-amber-400">
                {[...Array(review.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-amber-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="h-11 w-11 rounded-full border border-black/10 flex items-center justify-center text-[#121417] hover:bg-[#5B2464] hover:text-white hover:border-[#5B2464] transition-all active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className="h-11 w-11 rounded-full border border-black/10 flex items-center justify-center text-[#121417] hover:bg-[#5B2464] hover:text-white hover:border-[#5B2464] transition-all active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Animated Review Slide */}
          <div className="min-h-[160px] sm:min-h-[140px] flex items-center relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={review.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col justify-between"
              >
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-[#121417] leading-relaxed mb-8">
                  “{review.quote}”
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base sm:text-lg text-[#121417]">
                        {review.author}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5B2464] bg-[#5B2464]/10 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-[#5B2464]" /> Verified Client
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#121417]/60 mt-0.5">
                      {review.location} • {review.service}
                    </div>
                  </div>

                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#5B2464] hover:underline self-start sm:self-auto"
                  >
                    <span>Read on Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-8 pt-4">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[#5B2464]'
                    : 'w-2 bg-black/15 hover:bg-black/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

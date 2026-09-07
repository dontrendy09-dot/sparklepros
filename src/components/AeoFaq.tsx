import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight, Sparkles } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/mockData';

export default function AeoFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-24 sm:py-32 px-6 sm:px-12 bg-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Minimal 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Title & Quick Support */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-block px-3 py-1 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold tracking-wider uppercase mb-4">
              Direct Answers
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.1] mb-4">
              Frequently <br />
              <span className="text-[#5B2464]">asked questions.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#121417]/60 leading-relaxed mb-8">
              Straightforward details on machinery, timing, chemistry, and pricing across Coimbatore.
            </p>

            <div className="p-6 rounded-2xl bg-[#F6F6F2] border border-black/6">
              <p className="text-xs font-bold text-[#121417] uppercase tracking-wider mb-1">
                Have a unique requirement?
              </p>
              <p className="text-xs text-[#121417]/60 mb-4">
                Chat directly with our Thudiyalur dispatch manager.
              </p>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#5B2464] px-4 py-2.5 rounded-full hover:bg-[#742E80] transition-colors"
              >
                <span>WhatsApp Operations</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Minimal Accordion */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-black/8 border-t border-b border-black/8">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const formattedNumber = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

              return (
                <div key={idx} className="py-6 sm:py-7 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-start justify-between gap-6 text-left group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#5B2464]/60 pt-0.5">
                        {formattedNumber}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200 ${
                          isOpen ? 'text-[#5B2464]' : 'text-[#121417] group-hover:text-[#5B2464]'
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#5B2464] text-white rotate-180'
                          : 'bg-black/5 text-[#121417]/60 group-hover:bg-[#5B2464]/10 group-hover:text-[#5B2464]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[#121417]/70 leading-relaxed pt-4 pb-2 pl-8 sm:pl-12 pr-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

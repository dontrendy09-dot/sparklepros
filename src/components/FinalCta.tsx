import { ArrowRight, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import WhatsAppIcon from './WhatsAppIcon';

interface FinalCtaProps {
  onOpenBooking: () => void;
}

export default function FinalCta({ onOpenBooking }: FinalCtaProps) {
  return (
    <section className="py-20 sm:py-28 px-6 sm:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F6F6F2] border border-black/8 p-8 sm:p-14 lg:p-16">
          <div className="max-w-3xl">
            {/* Clean Minimal Eyebrow */}
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464] block mb-4">
              DIRECT FLEET DISPATCH • KONGU REGION
            </span>

            {/* Headline */}
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-[#121417] leading-[1.08] mb-5">
              Ready to experience the <br className="hidden sm:inline" />
              <span className="text-[#5B2464]">Sparkle Pros standard?</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm sm:text-lg text-[#121417]/70 leading-relaxed max-w-2xl mb-10">
              Verified in-house technicians, 140°C thermal steam technology, 40-point room-by-room audit, and zero advance payment. You only pay after complete personal inspection.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#5B2464] text-white text-xs sm:text-sm font-bold tracking-wide hover:bg-[#742E80] transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Book a Cleaning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-bold hover:bg-[#20bd5a] transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>WhatsApp Fleet</span>
              </a>

              <a
                href="tel:+919585859617"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white text-[#121417] hover:text-[#5B2464] border border-black/8 hover:border-black/20 text-xs sm:text-sm font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#5B2464]" />
                <span>+91 9585859617</span>
              </a>
            </div>

            {/* Clean Minimal Assurance Strip */}
            <div className="pt-8 border-t border-black/8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#121417]/60 font-medium">
              <span>100% In-House Crew</span>
              <span>•</span>
              <span>140°C Thermal Steam</span>
              <span>•</span>
              <span>40-Point Quality Audit</span>
              <span>•</span>
              <span>Pay After Inspection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


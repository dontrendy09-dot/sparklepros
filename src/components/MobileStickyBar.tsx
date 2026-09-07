import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import WhatsAppIcon from './WhatsAppIcon';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export default function MobileStickyBar({ onOpenBooking }: MobileStickyBarProps) {
  return (
    <aside
      aria-label="Quick mobile contact and booking bar"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="bg-[#121417]/95 backdrop-blur-2xl border border-white/15 text-white rounded-full p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.38)] flex items-center justify-between gap-1.5">
        {/* WhatsApp Button */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white active:scale-95 transition-all text-xs font-semibold select-none cursor-pointer"
          aria-label="WhatsApp Sparkle Pros"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phoneClean}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-xs font-semibold select-none cursor-pointer"
          aria-label="Call Sparkle Pros"
        >
          <Phone className="w-3.5 h-3.5 text-purple-300" />
          <span>Call</span>
        </a>

        {/* Instant Book Button */}
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-full bg-[#5B2464] hover:bg-[#742E80] active:scale-95 text-white transition-all text-xs font-bold shadow-md select-none cursor-pointer"
          aria-label="Book a Cleaning"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Now</span>
        </button>
      </div>
    </aside>
  );
}

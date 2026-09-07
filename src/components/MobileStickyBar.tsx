import { Phone, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import WhatsAppIcon from './WhatsAppIcon';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export default function MobileStickyBar({ onOpenBooking }: MobileStickyBarProps) {
  return (
    <aside aria-label="Quick mobile contact and booking bar" className="md:hidden fixed bottom-3 left-4 right-4 z-40">
      <div className="bg-[#121417]/95 backdrop-blur-xl border border-white/15 text-white rounded-full px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-between gap-1">
        {/* WhatsApp */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white transition-colors text-xs font-semibold"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href="tel:+919585859617"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold"
        >
          <Phone className="w-4 h-4 text-purple-300" />
          <span>Call</span>
        </a>

        {/* Book */}
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#5B2464] hover:bg-[#742E80] text-white transition-colors text-xs font-bold shadow-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>Book</span>
        </button>
      </div>
    </aside>
  );
}

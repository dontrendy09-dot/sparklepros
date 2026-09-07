import { X, MapPin, CheckCircle2, Wrench, ArrowUpRight, MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceName: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onBook,
}: ServiceDetailModalProps) {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl border border-black/8 my-4 sm:my-8 text-[#121417] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media Banner */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black/10 flex-shrink-0">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {service.number} • Specialized
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#5B2464] text-white text-[10px] sm:text-xs font-semibold">
                {service.duration}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-4xl font-extrabold leading-tight">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-4 sm:space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B2464] mb-2">
              Service Scope & Overview
            </h4>
            <p className="text-sm sm:text-base text-[#121417]/80 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Pricing Guidance */}
          <div className="bg-[#F6F6F2] p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#121417]/50">
                Transparent Pricing Guide
              </div>
              <div className="text-sm font-bold text-[#121417] mt-0.5">
                {service.pricingHint}
              </div>
            </div>
            <div className="text-xs text-[#5B2464] font-semibold bg-[#5B2464]/10 px-3 py-1 rounded-full">
              Verified Rates
            </div>
          </div>

          {/* What is Included */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#121417]/60 mb-3">
              What Is Included In Every Visit
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.included.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#121417]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Machinery & Equipment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#121417]/60 mb-3">
              Equipment Brought To Your Property
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.equipment.map((eq, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-black/5 text-xs font-semibold text-[#121417]"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>

          {/* Coverage note */}
          <div className="pt-2 text-xs text-[#121417]/60 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#5B2464]" />
            <span>Dispatched across all Coimbatore pin codes including RS Puram, Saravanampatti, Peelamedu & Thudiyalur.</span>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-black/8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBook(service.name);
              }}
              className="flex-1 py-3.5 px-6 rounded-full bg-[#5B2464] text-white text-xs sm:text-sm font-semibold hover:bg-[#742E80] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book {service.name}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/919585859617?text=Hi%20Sparkle%20Pros,%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(service.name)}%20in%20Coimbatore`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-full border border-black/15 hover:bg-[#5B2464]/5 hover:text-[#5B2464] hover:border-[#5B2464]/30 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

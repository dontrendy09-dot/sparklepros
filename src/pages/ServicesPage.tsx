import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, MapPin, Search } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/mockData';
import { ServiceItem } from '../types';
import FinalCta from '../components/FinalCta';

interface ServicesPageProps {
  onOpenBooking: (serviceName?: string) => void;
  onSelectServiceModal: (service: ServiceItem) => void;
}

export default function ServicesPage({ onOpenBooking, onSelectServiceModal }: ServicesPageProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'deep-clean', label: 'Full Deep Clean' },
    { id: 'steam', label: 'Steam & Sanitization' },
    { id: 'specialized', label: 'Kitchen & Bath' },
    { id: 'move', label: 'Move-in / Move-out' },
  ];

  const filteredServices = SERVICES.filter((service) => {
    // category check
    let matchesCategory = true;
    if (filter === 'deep-clean') {
      matchesCategory = service.id.includes('deep-cleaning') || service.id.includes('villa');
    } else if (filter === 'steam') {
      matchesCategory = service.id.includes('sofa') || service.id.includes('steam');
    } else if (filter === 'specialized') {
      matchesCategory = service.id.includes('kitchen') || service.id.includes('bathroom') || service.id.includes('sofa');
    } else if (filter === 'move') {
      matchesCategory = service.id.includes('move-in') || service.id.includes('deep-cleaning');
    }

    // search check
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.included.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-12">
      {/* Page Hero Header - Standardized Layout */}
      <section className="px-6 sm:px-12 py-14 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464]">
              SERVICE ARCHITECTURE • DIRECT FLEET DISPATCH
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.035em] text-[#121417] leading-[1.02] mb-6">
            Comprehensive cleaning for <br />
            <span className="text-[#5B2464]">every room and surface.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#121417]/70 leading-relaxed max-w-2xl">
            From thermal dry-steam upholstery recovery to whole-villa mechanized rotary scrubbing, explore our specialized cleaning services crafted for Coimbatore and Kongu region properties.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  filter === cat.id
                    ? 'bg-[#5B2464] text-white shadow-sm'
                    : 'bg-white text-[#121417]/70 hover:bg-[#5B2464]/5 hover:text-[#5B2464] border border-black/6'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search services, sofa, kitchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-black/10 text-xs sm:text-sm focus:outline-none focus:border-[#5B2464] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[32px] overflow-hidden border border-black/8 shadow-sm hover:shadow-xl hover:border-[#5B2464]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Card Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                    {service.number}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#121417] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3 h-3 text-[#5B2464]" />
                    {service.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#5B2464] uppercase tracking-wider">
                      Sparkle Pros Standard
                    </span>
                    <span className="text-xs font-semibold text-[#121417]/60">
                      {service.pricingHint}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#121417] mb-3 group-hover:text-[#5B2464] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-[#121417]/70 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Included checklist preview */}
                  <div className="border-t border-b border-black/6 py-4 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#121417]/50 mb-3">
                      Key Execution Points
                    </div>
                    <ul className="space-y-2 text-xs text-[#121417]/80">
                      {service.included.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Equipment tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {service.equipment.slice(0, 3).map((eq, i) => (
                      <span key={i} className="text-[11px] bg-black/5 text-[#121417]/75 px-2.5 py-1 rounded-md font-medium">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 sm:p-8 pt-0 flex items-center gap-3">
                <button
                  onClick={() => onOpenBooking(service.name)}
                  className="flex-1 py-3 px-5 rounded-full bg-[#5B2464] text-white text-xs sm:text-sm font-semibold hover:bg-[#742E80] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectServiceModal(service)}
                  className="py-3 px-5 rounded-full border border-black/10 text-xs sm:text-sm font-medium text-[#121417] hover:bg-[#5B2464]/5 hover:text-[#5B2464] hover:border-[#5B2464]/30 transition-colors"
                >
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/6">
            <h3 className="font-display text-xl font-bold mb-2">No matching services found</h3>
            <p className="text-sm text-[#121417]/60 mb-6">Try selecting a different filter or search term.</p>
            <button
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#5B2464] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Unified Minimal Final CTA */}
      <FinalCta onOpenBooking={() => onOpenBooking()} />
    </div>
  );
}

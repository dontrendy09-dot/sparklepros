import { useState, useEffect, FormEvent } from 'react';
import { X, Sparkles, MessageCircle, CheckCircle2, Calendar, MapPin, Phone, User } from 'lucide-react';
import { SERVICES, LOCATIONS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedArea?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedService,
  preselectedArea,
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselectedService || SERVICES[0].name);
  const [propertyType, setPropertyType] = useState('Apartment (2BHK/3BHK)');
  const [area, setArea] = useState(preselectedArea || LOCATIONS[0].name);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedArea) setArea(preselectedArea);
  }, [preselectedArea]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const text = `Hi Sparkle Pros! I would like to book a cleaning service in Coimbatore:%0A- Name: ${encodeURIComponent(name || 'Customer')}%0A- Phone: ${encodeURIComponent(phone || 'Not provided')}%0A- Service: ${encodeURIComponent(service)}%0A- Property: ${encodeURIComponent(propertyType)}%0A- Area: ${encodeURIComponent(area)}%0A- Preferred Date: ${encodeURIComponent(date || 'Soonest available')}%0A- Notes: ${encodeURIComponent(notes || 'None')}`;
    window.open(`https://wa.me/919585859617?text=${text}`, '_blank');
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-[32px] p-5 sm:p-10 shadow-2xl border border-black/8 my-4 sm:my-8 text-[#121417] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#121417] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-[#5B2464] flex items-center justify-center mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Booking Request Received!
            </h3>

            <p className="text-sm text-[#121417]/70 max-w-md leading-relaxed mb-8">
              Thank you, <span className="font-semibold text-[#121417]">{name || 'there'}</span>! Our operations coordinator from Thudiyalur Road will contact you via WhatsApp/phone at <span className="font-semibold text-[#121417]">{phone}</span> to confirm your slot.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={handleWhatsAppBooking}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="py-3.5 px-6 rounded-full bg-[#5B2464] text-white text-sm font-semibold hover:bg-[#742E80] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B2464]">
                Instant Booking • Coimbatore
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Book a Cleaning Service
            </h3>
            <p className="text-xs sm:text-sm text-[#121417]/60 mb-6">
              Verified crew • High-pressure steam • Clear upfront pricing
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-black/40 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karthik"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-black/40 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                  >
                    <option value="Apartment (1BHK/2BHK)">Apartment (1BHK / 2BHK)</option>
                    <option value="Apartment (3BHK/4BHK)">Apartment (3BHK / 4BHK)</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Corporate Office / Commercial">Corporate Office / Commercial</option>
                    <option value="Only Sofa / Upholstery">Only Sofa / Upholstery</option>
                  </select>
                </div>
              </div>

              {/* Area & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Area in Coimbatore
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-black/40 absolute left-3.5 top-3.5" />
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                      <option value="Other Area in Coimbatore">Other Coimbatore Area</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-black/40 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                  Specific Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Tough hard water marks in master bathroom, 6-seater L-shape sofa steam clean..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#5B2464] text-white text-sm font-semibold hover:bg-[#742E80] transition-colors shadow-md"
                >
                  Submit Booking Request
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="py-3.5 px-6 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white transition-colors text-sm font-bold flex items-center justify-center gap-2 border border-[#25D366]/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-[#121417]/50">
                  No advance payment needed for standard bookings • Pay after job inspection
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

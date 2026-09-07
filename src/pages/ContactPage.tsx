import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_INFO, LOCATIONS } from '../data/mockData';
import WhatsAppIcon from '../components/WhatsAppIcon';
import FinalCta from '../components/FinalCta';

interface ContactPageProps {
  onOpenBooking?: () => void;
}

export default function ContactPage({ onOpenBooking }: ContactPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(LOCATIONS[0].name);
  const [service, setService] = useState('Full Home Deep Cleaning');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `Hi Sparkle Pros! Message from website contact page:%0A- Name: ${encodeURIComponent(name || 'Customer')}%0A- Phone: ${encodeURIComponent(phone || 'Not provided')}%0A- Area: ${encodeURIComponent(area)}%0A- Service: ${encodeURIComponent(service)}%0A- Message: ${encodeURIComponent(message || 'Inquiry')}`;
    window.open(`https://wa.me/919585859617?text=${text}`, '_blank');
  };

  return (
    <div className="pt-28 pb-12">
      {/* Header - Standardized Hero Layout */}
      <section className="px-6 sm:px-12 py-14 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464]">
              DISPATCH & INQUIRY HUB • KONGU REGION
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.035em] text-[#121417] leading-[1.02] mb-6">
            Let’s talk clean. <br />
            <span className="text-[#5B2464]">Directly in Coimbatore.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#121417]/70 leading-relaxed max-w-2xl">
            Reach out for transparent quotes, commercial facility inspections, or urgent deep-cleaning dispatches across Coimbatore and the Kongu region.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Left Contact Info Cards, Right Interactive Form */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="bg-white rounded-3xl p-6 border border-black/8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#5B2464]/10 text-[#5B2464] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs uppercase font-bold text-[#121417]/50 mb-1">
                    Direct Hotline
                  </div>
                  <a
                    href="tel:+919585859617"
                    className="font-display text-lg font-bold text-[#121417] hover:text-[#5B2464] transition-colors"
                  >
                    +91 9585859617
                  </a>
                </div>
                <div className="text-xs text-[#121417]/60 mt-3">
                  Call for urgent slots
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-[#25D366]/10 rounded-3xl p-6 border border-[#25D366]/20 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center mb-4 shadow-sm">
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-xs uppercase font-bold text-[#128C7E] mb-1">
                    Instant WhatsApp
                  </div>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg font-bold text-[#121417] hover:text-[#128C7E] transition-colors"
                  >
                    Chat with Team
                  </a>
                </div>
                <div className="text-xs text-[#128C7E] font-medium mt-3">
                  Avg. response &lt; 5 mins
                </div>
              </div>
            </div>

            {/* Operating Hours & Guarantee */}
            <div className="bg-[#F6F6F2] rounded-3xl p-6 border border-black/6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-[#5B2464]" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#121417]/60">
                    Dispatch Timings
                  </div>
                  <div className="text-sm font-bold text-[#121417]">
                    {BUSINESS_INFO.hours}
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-black/8 text-xs text-[#121417]/70 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5B2464]" />
                <span>Sunday slots book out 48 hours in advance</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[36px] p-8 sm:p-12 border border-black/8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 text-[#5B2464] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="font-display text-3xl font-extrabold mb-3 text-[#121417]">
                    Inquiry Transmitted!
                  </h3>

                  <p className="text-sm sm:text-base text-[#121417]/70 max-w-md leading-relaxed mb-8">
                    Thank you, <span className="font-semibold text-[#121417]">{name || 'Customer'}</span>! Your inquiry regarding <span className="font-semibold text-[#121417]">{service}</span> in <span className="font-semibold text-[#121417]">{area}</span> has been logged with our dispatch center.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button
                      onClick={handleWhatsAppSend}
                      className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-sm cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Forward to WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="py-3.5 px-6 rounded-full bg-[#5B2464] text-white text-sm font-semibold hover:bg-[#742E80] transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121417] mb-2">
                      Send an Inquiry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#121417]/60">
                      Fill in your property details and our team will get back to you with custom estimates.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ananya Suresh"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                          Coimbatore Locality
                        </label>
                        <select
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                        >
                          {LOCATIONS.map((loc) => (
                            <option key={loc.name} value={loc.name}>
                              {loc.name} ({loc.pincode})
                            </option>
                          ))}
                          <option value="Other Area in Coimbatore">Other Coimbatore Area</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                        Service of Interest
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                      >
                        <option value="Full Home Deep Cleaning">Full Home Deep Cleaning</option>
                        <option value="Modular Kitchen Degreasing">Modular Kitchen Degreasing & Descaling</option>
                        <option value="Bathroom Limescale & Tile Cleaning">Bathroom Limescale & Tile Restoration</option>
                        <option value="Sofa & Fabric Steam Extraction">Sofa & Fabric Steam Extraction</option>
                        <option value="Luxury Villa Comprehensive Clean">Luxury Villa Comprehensive Clean</option>
                        <option value="Move-In / Handover Sanitization">Move-In / Handover Sanitization</option>
                        <option value="Commercial / Office Facility Cleaning">Commercial / Office Facility Cleaning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#121417]/70 mb-1.5">
                        Tell us about your property / specific request
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. 3BHK flat in Peelamedu, require kitchen chimney degreased and master bath hard water stains removed..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F6F6F2] border border-black/8 text-sm focus:outline-none focus:border-[#5B2464] focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-4 px-6 rounded-full bg-[#5B2464] text-white text-sm font-bold hover:bg-[#742E80] transition-colors shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="py-4 px-6 rounded-full bg-[#25D366] text-white text-sm font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>Instant WhatsApp</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Unified Minimal Final CTA */}
      <FinalCta onOpenBooking={onOpenBooking || (() => {})} />
    </div>
  );
}

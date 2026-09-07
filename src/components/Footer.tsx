import React from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, MessageCircle, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/mockData';
import BrandLogo from './BrandLogo';
import { PageId } from './Header';

interface FooterProps {
  onSelectServiceSlug?: (slug: string) => void;
  onOpenBooking: () => void;
  onNavigatePage?: (page: PageId) => void;
}

export default function Footer({ onOpenBooking, onNavigatePage }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
    scrollToTop();
  };

  const handleServiceClick = () => {
    if (onNavigatePage) {
      onNavigatePage('service');
    } else {
      const el = document.getElementById('services-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    scrollToTop();
  };

  return (
    <footer id="main-footer" className="bg-white text-[#121417] pt-14 sm:pt-20 pb-28 md:pb-14 px-4 sm:px-12 border-t border-black/8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid: Left Brand & Contact Block + Right Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-14">
          {/* Left Column: Brand Logo, Mission Statement, Address, Phone, Gmail, Social Media */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <button
                onClick={() => handleNav('home')}
                className="text-left cursor-pointer focus:outline-none transition-transform hover:opacity-95 mb-5 block"
                aria-label="Sparkle Pros Home"
              >
                <BrandLogo variant="light" size="md" />
              </button>

              <p className="text-sm text-[#121417]/65 max-w-md leading-relaxed mb-6">
                Sparkle Pros delivers certified 140°c thermal steam extraction, mechanized rotary floor scrubbing, and fabric deep cleaning for homes, villas, and commercial facilities across Coimbatore.
              </p>

              {/* Verified Contact Details: Address, Phone Number, Gmail */}
              <div className="space-y-2.5 mb-6 text-sm text-[#121417]/75">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#5B2464] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{BUSINESS_INFO.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                  <a
                    href={`tel:${BUSINESS_INFO.phoneClean}`}
                    className="hover:text-[#5B2464] transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="hover:text-[#5B2464] transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* Social Media Icons: Instagram, Facebook, YouTube, WhatsApp */}
              <div className="flex items-center gap-3 text-[#121417]/70">
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sparkle Pros on Instagram"
                  className="w-9 h-9 rounded-full bg-black/4 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sparkle Pros on Facebook"
                  className="w-9 h-9 rounded-full bg-black/4 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href={BUSINESS_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sparkle Pros on YouTube"
                  className="w-9 h-9 rounded-full bg-black/4 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-200"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Sparkle Pros on WhatsApp"
                  className="w-9 h-9 rounded-full bg-black/4 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Hub indicator */}
            <div className="mt-8 pt-5 border-t border-black/6 text-xs text-[#121417]/55 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Coimbatore central hub: Sf.no 345, Thudiyalur Road</span>
            </div>
          </div>

          {/* Right Columns: Services and Company */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-12">
            {/* Column 1: Services */}
            <div>
              <h4 className="text-sm font-semibold text-[#121417] tracking-tight mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-sm text-[#121417]/65">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={handleServiceClick}
                      className="hover:text-[#5B2464] transition-colors text-left cursor-pointer"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-sm font-semibold text-[#121417] tracking-tight mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-[#121417]/65">
                <li>
                  <button
                    onClick={() => handleNav('about')}
                    className="hover:text-[#5B2464] transition-colors text-left cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('service')}
                    className="hover:text-[#5B2464] transition-colors text-left cursor-pointer"
                  >
                    Service architecture
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('contact')}
                    className="hover:text-[#5B2464] transition-colors text-left cursor-pointer"
                  >
                    Contact & hub
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenBooking}
                    className="hover:text-[#5B2464] transition-colors text-left font-medium text-[#5B2464] cursor-pointer"
                  >
                    Book inspection
                  </button>
                </li>
                <li>
                  <a
                    href={BUSINESS_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#5B2464] transition-colors text-left block"
                  >
                    WhatsApp support
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleNav('home');
                      setTimeout(() => {
                        const faq = document.getElementById('faq-section');
                        if (faq) faq.scrollIntoView({ behavior: 'smooth' });
                      }, 120);
                    }}
                    className="hover:text-[#5B2464] transition-colors text-left cursor-pointer"
                  >
                    Frequently asked questions
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Navigation Links */}
        <div className="pt-8 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#121417]/50">
          <div>
            © {new Date().getFullYear()} Sparkle Pros. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-xs text-[#121417]/60">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-[#121417] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy policy
            </button>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-[#121417] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms of service
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#5B2464] transition-colors ml-2 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

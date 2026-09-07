import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import BrandLogo from './BrandLogo';

export type PageId = 'home' | 'about' | 'service' | 'contact' | 'privacy' | 'terms';

interface HeaderProps {
  activePage: PageId;
  onNavigatePage: (page: PageId) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export default function Header({
  activePage,
  onNavigatePage,
  onOpenBooking,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (page: PageId) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'service', label: 'Service' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed z-50 transition-all duration-500 ease-out left-0 right-0 ${
          isScrolled
            ? 'top-2 sm:top-4 px-3 sm:px-6 max-w-5xl mx-auto'
            : 'top-0 px-4 sm:px-12 py-3.5 sm:py-7 max-w-7xl mx-auto'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl border border-[#5B2464]/10 shadow-[0_10px_35px_rgba(91,36,100,0.08)] rounded-full px-4 py-2 sm:px-7 sm:py-3'
              : 'bg-transparent'
          }`}
        >
          {/* Brand Logo - Official Sparkle Pros */}
          <button
            id="brand-logo-button"
            onClick={() => handleLinkClick('home')}
            className="group flex items-center text-left focus:outline-none transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Sparkle Pros Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Core Navigation: Home, About Us, Service, Contact */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-[14px] font-medium text-[#121417]/80">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                    isActive
                      ? 'bg-[#5B2464]/10 text-[#5B2464] font-semibold'
                      : 'text-[#121417]/75 hover:text-[#5B2464] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Primary CTA Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Action Button - hidden on extra small mobile to avoid crowding */}
            <button
              id="header-book-btn"
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#5B2464] text-white px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:bg-[#742E80] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Book a Cleaning</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-black/5 text-[#121417] hover:bg-[#5B2464]/10 hover:text-[#5B2464] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-50 bg-[#FBFBFA]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-24 md:hidden transition-all overflow-y-auto"
        >
          {/* Close button in drawer header */}
          <div className="flex items-center justify-between pb-6 border-b border-black/8">
            <BrandLogo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center text-[#121417] hover:bg-black/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-3 py-6 text-xl sm:text-2xl font-display font-semibold text-[#121417]">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-3.5 px-4 rounded-2xl flex items-center justify-between transition-colors ${
                  activePage === link.id
                    ? 'bg-[#5B2464]/10 text-[#5B2464] font-bold'
                    : 'text-[#121417] hover:text-[#5B2464] active:bg-black/5'
                }`}
              >
                <span>{`0${idx + 1} ${link.label}`}</span>
                {activePage === link.id && (
                  <span className="text-xs bg-[#5B2464] text-white px-2.5 py-1 rounded-full font-sans font-medium">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-black/10 flex flex-col gap-3 pb-8">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-full bg-[#5B2464] hover:bg-[#742E80] text-white font-semibold text-center text-sm shadow-md transition-colors active:scale-98"
            >
              Book Inspection in Coimbatore
            </button>
            <div className="flex items-center justify-between text-xs text-[#121417]/60 pt-2">
              <span>Thudiyalur Road, Coimbatore</span>
              <a href="tel:+919585859617" className="flex items-center gap-1 font-semibold text-[#5B2464]">
                <Phone className="h-3 w-3" /> +91 9585859617
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

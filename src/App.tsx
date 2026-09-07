/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header, { PageId } from './components/Header';
import Hero from './components/Hero';
import StatsCards from './components/StatsCards';
import InteractiveServices from './components/InteractiveServices';
import ProcessTimeline from './components/ProcessTimeline';
import InteractiveGallery from './components/InteractiveGallery';
import LocalCoimbatore from './components/LocalCoimbatore';
import ReviewsSection from './components/ReviewsSection';
import AeoFaq from './components/AeoFaq';
import InstagramStrip from './components/InstagramStrip';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import MobileStickyBar from './components/MobileStickyBar';
import FloatingActions from './components/FloatingActions';
import AboutUsPage from './pages/AboutUsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { ServiceItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState<string | undefined>();
  const [selectedAreaName, setSelectedAreaName] = useState<string | undefined>();
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  const handleOpenBooking = (serviceName?: string, areaName?: string) => {
    setSelectedServiceName(serviceName);
    setSelectedAreaName(areaName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceName(undefined);
    setSelectedAreaName(undefined);
  };

  const handleNavigatePage = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121417] flex flex-col selection:bg-[#5B2464]/15 selection:text-[#5B2464]">
      {/* Minimal & Floating Pill Header */}
      <Header
        activePage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            {/* Editorial Hero */}
            <Hero onOpenBooking={() => handleOpenBooking()} />

            {/* 4 Trust Metric Cards matching uploaded image */}
            <StatsCards />

            {/* Service Architecture - Layout matched to user reference image */}
            <InteractiveServices
              onSelectService={(service) => setActiveServiceDetail(service)}
              onBookService={(name) => handleOpenBooking(name)}
            />

            {/* Seamless Convenience - Redesigned modern 6-step workflow UI */}
            <ProcessTimeline onOpenBooking={() => handleOpenBooking()} />

            {/* Modern & Minimal Portfolio Snapshots Gallery ("A glimpse of the work") */}
            <InteractiveGallery onOpenBooking={(srv) => handleOpenBooking(srv)} />

            {/* Local Coimbatore Coverage without frequently booked list */}
            <LocalCoimbatore onOpenBooking={(srv, area) => handleOpenBooking(srv, area)} />

            {/* Smooth Animated Testimonial Experience */}
            <ReviewsSection />

            {/* Minimal & Modern FAQ Architecture */}
            <AeoFaq />

            {/* Live On-Site Footage - Minimal horizontal marquee animation */}
            <InstagramStrip />

            {/* Final Call to Action */}
            <FinalCta onOpenBooking={() => handleOpenBooking()} />
          </>
        )}

        {currentPage === 'about' && (
          <AboutUsPage
            onOpenBooking={() => handleOpenBooking()}
            onNavigateContact={() => handleNavigatePage('contact')}
          />
        )}

        {currentPage === 'service' && (
          <ServicesPage
            onOpenBooking={(serviceName) => handleOpenBooking(serviceName)}
            onSelectServiceModal={(service) => setActiveServiceDetail(service)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onOpenBooking={() => handleOpenBooking()} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage
            onNavigateHome={() => handleNavigatePage('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'terms' && (
          <TermsOfServicePage
            onNavigateHome={() => handleNavigatePage('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Minimal Footer with Navigation Links */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigatePage={handleNavigatePage}
      />

      {/* Mobile Sticky Conversion Bar (WhatsApp | Call | Book) */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal / Sheet */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={selectedServiceName}
        preselectedArea={selectedAreaName}
      />

      {/* Service Deep Exploration Modal */}
      <ServiceDetailModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onBook={(name) => handleOpenBooking(name)}
      />

      {/* Floating Call and WhatsApp Action Buttons on the Right Side (All Pages) */}
      <FloatingActions />
    </div>
  );
}

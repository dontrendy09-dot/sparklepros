import React, { useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

interface TermsOfServicePageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export default function TermsOfServicePage({
  onNavigateHome,
  onOpenBooking,
}: TermsOfServicePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-12 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#121417]/60 hover:text-[#5B2464] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to home</span>
      </button>

      {/* Page Header */}
      <div className="mb-12 pb-8 border-b border-black/8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B2464]/8 text-[#5B2464] text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Service Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121417] mb-4">
          Terms of Service
        </h1>
        <p className="text-base text-[#121417]/70 leading-relaxed max-w-2xl">
          Welcome to Sparkle Pros. These terms govern all mechanized deep cleaning, steam sanitation, and upholstery extraction services provided by our Coimbatore service fleet.
        </p>
        <div className="mt-4 text-xs text-[#121417]/50">
          Last Updated: January 2026 • Sparkle Pros Coimbatore Operations
        </div>
      </div>

      {/* Terms Sections */}
      <div className="space-y-10 text-[#121417]/80 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              1. Pay After Inspection Guarantee
            </h2>
          </div>
          <p className="text-[#121417]/70 mb-3">
            We believe in complete customer confidence. For all residential and commercial appointments:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span>Payment is due only after our service is completed and you conduct an on-site walkthrough with our team supervisor.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span>If any agreed area, upholstery corner, or tile grout line does not meet your expectations, our crew will re-treat the area immediately before closing the job.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              2. Booking, Pricing & Quotations
            </h2>
          </div>
          <p className="text-[#121417]/70 mb-3">
            To ensure complete transparency across Coimbatore:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Initial phone or WhatsApp estimates are based on customer specifications (number of sofa seats, square footage, or bedroom count).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Final confirmation is provided upon on-site assessment by our lead technician before work commences. Once approved, the quote is fixed with zero surprise charges.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>We accept digital UPI (Google Pay, PhonePe, Paytm), bank transfers, and cash upon completed inspection.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              3. Site Requirements & Utility Access
            </h2>
          </div>
          <p className="text-[#121417]/70 mb-3">
            Our high-performance German extraction machines and 140°C thermal boilers require standard utilities at the premises:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Access to standard electrical power (220V–240V, 15A/16A socket for thermal steam and rotary scrubber units).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Running domestic water supply for tank refill and rinse extraction.</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              4. Fabric Care & Delicate Materials
            </h2>
          </div>
          <p className="text-[#121417]/70">
            Our technicians conduct fabric spot testing on upholstery, rugs, and mattresses before deep steam injection. While our steam extraction removes stubborn stains, dust mites, bacteria, and pet odors, older fabric discoloration caused by acid exposure, permanent dyes, or sun damage may not be fully reversible.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              5. Rescheduling & Cancellations
            </h2>
          </div>
          <p className="text-[#121417]/70">
            We understand plans change. Customers may reschedule or cancel appointments at no charge up to 2 hours prior to the scheduled arrival time by contacting our helpline at +91 95858 59617 or messaging us on WhatsApp.
          </p>
        </section>

        {/* CTA Bar */}
        <div className="p-6 rounded-2xl bg-[#5B2464]/5 border border-[#5B2464]/15 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#121417]">Ready to book your deep cleaning?</h3>
            <p className="text-sm text-[#121417]/70">Experience Coimbatore's certified thermal steam cleaning today.</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 rounded-full bg-[#5B2464] text-white text-sm font-semibold hover:bg-[#722E7D] transition-colors flex-shrink-0 cursor-pointer"
          >
            Book inspection
          </button>
        </div>
      </div>
    </div>
  );
}

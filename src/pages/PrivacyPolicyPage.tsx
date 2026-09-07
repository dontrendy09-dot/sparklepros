import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onOpenBooking: () => void;
}

export default function PrivacyPolicyPage({
  onNavigateHome,
  onOpenBooking,
}: PrivacyPolicyPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 sm:px-12 max-w-4xl mx-auto">
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
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy & Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121417] mb-4">
          Privacy Policy
        </h1>
        <p className="text-base text-[#121417]/70 leading-relaxed max-w-2xl">
          At Sparkle Pros, we value your privacy and trust. This policy outlines how we collect, use, and protect your information when booking mechanized steam cleaning and deep cleaning services across Coimbatore.
        </p>
        <div className="mt-4 text-xs text-[#121417]/50">
          Effective Date: January 2026 • Registered Operations in Coimbatore, Tamil Nadu
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-10 text-[#121417]/80 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              1. Information We Collect
            </h2>
          </div>
          <p className="mb-3 text-[#121417]/70">
            We only collect necessary details to provide accurate quotes and safely dispatch our trained cleaning teams to your location:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Contact Information:</strong> Your name, phone number, and email address for appointment confirmations and service updates.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Service Location:</strong> Physical address, landmark, or apartment details in Coimbatore to plan transit and equipment mobilization.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
              <span><strong>Property & Furniture Details:</strong> Optional photos or descriptions of sofas, mattresses, or rooms to estimate time and machinery needed.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              2. How We Use Your Information
            </h2>
          </div>
          <p className="text-[#121417]/70 mb-3">
            Your data is strictly used for operational fulfillment. We use it to:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Schedule inspections, thermal steam treatments, and deep cleaning sessions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Provide transparent estimates with zero hidden charges.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Send WhatsApp arrival alerts when our technicians are on route.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Follow up after service to ensure complete satisfaction under our pay-after-inspection guarantee.</span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              3. Zero Data Sharing Policy
            </h2>
          </div>
          <p className="text-[#121417]/70">
            We will never sell, lease, rent, or trade your personal information to third-party advertisers or telemarketers. All customer records are kept secure within our internal dispatch system and are only accessible by authorized Sparkle Pros coordinators.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-[#5B2464]" />
            <h2 className="text-lg sm:text-xl font-semibold text-[#121417]">
              4. Data Retention & Your Rights
            </h2>
          </div>
          <p className="text-[#121417]/70 mb-3">
            You maintain full rights over your data. At any time, you may request:
          </p>
          <ul className="space-y-2 text-[#121417]/70 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Deletion of your contact details or past service history from our database.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B2464] mt-2.5 flex-shrink-0" />
              <span>Updates or corrections to your saved phone number and address.</span>
            </li>
          </ul>
        </section>

        {/* Contact Info Box */}
        <div className="p-6 rounded-2xl bg-black/3 border border-black/8 mt-8">
          <h3 className="font-semibold text-[#121417] mb-2">Have questions about our privacy practices?</h3>
          <p className="text-sm text-[#121417]/70 mb-4">
            Feel free to contact our operations desk at Thudiyalur Road, Coimbatore, or email us directly.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a href="tel:+919585859617" className="text-[#5B2464] hover:underline">
              +91 95858 59617
            </a>
            <span className="text-black/20">•</span>
            <a href="mailto:info@sparklepros.in" className="text-[#5B2464] hover:underline">
              info@sparklepros.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

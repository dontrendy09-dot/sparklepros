import { motion } from 'motion/react';
import { ShieldCheck, Award, Users, HeartHandshake, CheckCircle2, ArrowRight, PhoneCall, Clock, MapPin, Droplets, Flame, Target, Compass } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import FinalCta from '../components/FinalCta';

interface AboutUsPageProps {
  onOpenBooking: () => void;
  onNavigateContact: () => void;
}

export default function AboutUsPage({ onOpenBooking, onNavigateContact }: AboutUsPageProps) {
  const values = [
    {
      icon: Flame,
      title: '140°C Pure Steam Sanitization',
      desc: 'We utilize industrial high-temperature dry steam to dissolve grease, sanitize porous grout, and kill dust mites without toxic fumes.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified In-House Technicians',
      desc: 'No random subcontracted workers. Every member of Sparkle Pros is background-verified, trained in-house, and company-uniformed.',
    },
    {
      icon: HeartHandshake,
      title: 'Pay After Inspection',
      desc: 'Transparent pricing with zero hidden charges. You inspect every corner before making payment, ensuring complete peace of mind.',
    },
    {
      icon: Award,
      title: '40-Point Quality Checklist',
      desc: 'Our supervisors follow an exhaustive room-by-room quality audit covering switchboards, window tracks, tiles, and fixtures.',
    },
  ];

  const milestones = [
    { number: '1,200+', label: 'Homes & Villas Cleaned', sub: 'Across Coimbatore' },
    { number: '4.9★', label: 'Google Verified Rating', sub: 'From real local clients' },
    { number: '100%', label: 'In-House Crew', sub: 'Zero subcontracting' },
    { number: '25+', label: 'Pincodes Served', sub: 'Daily dispatch fleet' },
  ];

  return (
    <div className="pt-28 pb-12">
      {/* Page Hero Header - Standardized Layout matching Service Page */}
      <section className="px-6 sm:px-12 py-14 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#5B2464]">
              ABOUT US • CRAFTSMANSHIP & MECHANIZED EXCELLENCE
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-[-0.035em] text-[#121417] leading-[1.02] mb-6">
            Elevating the standard of <br />
            <span className="text-[#5B2464]">cleanliness in Tamil Nadu.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#121417]/70 leading-relaxed max-w-2xl">
            Engineered to replace rushed, chemical-heavy cleaning services with European-grade 140°C thermal steam technology, mechanized rotary scrubbing, and genuine in-house craftsmanship across Coimbatore and the Kongu region.
          </p>
        </div>

        {/* Highlight Tabs & Quick Overview Strip */}
        <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8">
          <div className="flex flex-wrap gap-2">
            <span className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#5B2464] text-white shadow-sm">
              Our Vision & Mission
            </span>
            <span className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#121417]/70 border border-black/6">
              100% In-House Crew
            </span>
            <span className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#121417]/70 border border-black/6">
              German 140°C Steam
            </span>
            <span className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white text-[#121417]/70 border border-black/6">
              Kongu Regional Fleet
            </span>
          </div>

          <div className="text-xs sm:text-sm font-medium text-[#121417]/60">
            Verified Standards • Pay Only After Inspection
          </div>
        </div>
      </section>

      {/* Vision and Mission Section - Normal Familiar Card Design */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#5B2464]/10 text-[#5B2464] text-xs font-bold uppercase tracking-wider mb-3">
            OUR PURPOSE & COMMITMENT
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#121417] tracking-tight">
            Our Vision & Mission
          </h2>
          <p className="text-base text-[#121417]/65 mt-3 leading-relaxed">
            The foundational principles guiding every home visit, machine calibration, and verified sanitization across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(91,36,100,0.08)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#5B2464]/10 text-[#5B2464] flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] block mb-2">
                OUR VISION
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121417] leading-snug mb-4">
                Pioneering non-toxic, scientifically clean living as the standard for every home.
              </h3>

              <p className="text-sm sm:text-base text-[#121417]/70 leading-relaxed mb-8">
                We envision urban households and commercial facilities where deep hygiene is achieved without breathing hazardous volatile fumes. By standardizing German 140°C thermal vapor extraction and mechanical rotary scrubbing, we eliminate dust mites and pathogens at the root—protecting infants, elderly family members, and premium interior surfaces.
              </p>
            </div>

            <div className="pt-6 border-t border-black/8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#121417]/80 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>100% Chemical-free steam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>140°C Thermal vapor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>German Kärcher machinery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>Infant & pet safe living</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgba(91,36,100,0.08)] transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#5B2464]/10 text-[#5B2464] flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] block mb-2">
                OUR MISSION
              </span>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121417] leading-snug mb-4">
                Delivering uncompromising precision, dignity of labor, and honest service every day.
              </h3>

              <p className="text-sm sm:text-base text-[#121417]/70 leading-relaxed mb-8">
                Our daily mission is executed through 100% in-house background-verified technicians who treat every property with the utmost care. We reject hurried superficial dusting, enforcing an exhaustive 40-point room-by-room quality audit and upholding our ironclad rule: clients only pay once they have personally inspected and approved the results.
              </p>
            </div>

            <div className="pt-6 border-t border-black/8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#121417]/80 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>100% In-house verified crew</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>40-Point room quality audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>Pay only after inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5B2464] flex-shrink-0" />
                <span>Rapid Tamil Nadu dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-black/6 shadow-sm flex flex-col justify-between"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#5B2464] mb-2">
                {m.number}
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-[#121417] leading-tight">
                  {m.label}
                </div>
                <div className="text-xs text-[#121417]/50 mt-1">
                  {m.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values / Why Sparkle Pros */}
      <section className="px-6 sm:px-12 py-20 bg-[#F6F6F2] mb-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] mb-3 block">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#121417]">
              Why homeowners & facility managers trust Sparkle Pros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[32px] p-8 sm:p-10 border border-black/6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#5B2464]/10 text-[#5B2464] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#121417] mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#121417]/70 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Process */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B2464] mb-3 block">
              LOCAL COIMBATORE ROOTS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#121417] mb-6">
              Founded to protect homes from hard water & dust.
            </h2>
            <p className="text-base text-[#121417]/70 leading-relaxed mb-6">
              Coimbatore homes face unique cleaning challenges — heavy mineral calcification from Siruvani and groundwater, fine industrial dust near highway corridors, and moisture build-up in closed apartments.
            </p>
            <p className="text-base text-[#121417]/70 leading-relaxed mb-8">
              We developed specialized acidic-balanced descaling formulations that dissolve hard water without etching luxury Italian marble, and high-heat steam extraction that revives sofa upholstery in 2 hours.
            </p>

            <div className="flex flex-col gap-3 text-sm text-[#121417]/80">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5B2464]" />
                <span>Custom descaling chemicals that protect CP brassware & granite</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5B2464]" />
                <span>Zero ammonia or harsh chlorine bleach used in living spaces</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#5B2464]" />
                <span>Dedicated supervisor present on every villa and deep-cleaning job</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
                alt="Kitchen deep cleaned"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-md aspect-[4/5] mt-8">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
                alt="Bathroom descaled"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unified Minimal Final CTA */}
      <FinalCta onOpenBooking={onOpenBooking} />
    </div>
  );
}

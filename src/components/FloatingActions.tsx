import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingActions() {
  return (
    <div
      id="floating-actions"
      className="hidden md:flex fixed right-6 sm:right-8 bottom-8 z-50 flex-col items-center gap-3.5"
    >
      {/* Phone Call Floating Circular Icon Button */}
      <motion.a
        href={`tel:${BUSINESS_INFO.phone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#5B2464] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(91,36,100,0.35)] hover:shadow-[0_14px_35px_rgba(91,36,100,0.5)] border-2 border-white transition-all cursor-pointer"
        aria-label="Call Sparkle Pros"
        title="Call Sparkle Pros"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.a>

      {/* WhatsApp Floating Circular Icon Button */}
      <motion.a
        href={BUSINESS_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_14px_35px_rgba(37,211,102,0.55)] border-2 border-white transition-all cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
      </motion.a>
    </div>
  );
}

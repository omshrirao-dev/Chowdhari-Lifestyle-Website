import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { ChaudhariLogo } from './ChaudhariLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenQuery: (category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenQuery }) => {
  return (
    <footer className="relative bg-[#151717] text-stone-300 pt-16 pb-12 border-t border-teal-900/30 overflow-hidden">
      {/* Subtle warm & teal glow in dark footer background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 0%, rgba(38, 114, 109, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 85% 100%, rgba(203, 45, 99, 0.08) 0%, transparent 60%)
          `
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Prominent Store Timings & Contact Info Card (Moved from Top to Bottom) */}
        <div className="mb-12 bg-gradient-to-r from-stone-900 via-[#1b2524] to-stone-900 border border-teal-800/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Store Timings */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[#2dd4bf] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-teal-300 font-semibold block">Store Timings</span>
                <span className="text-white font-bold text-sm sm:text-base block mt-0.5">
                  10:30 AM – 9:30 PM
                </span>
                <span className="text-stone-400 text-xs block">Open all 7 days (Monday to Sunday)</span>
              </div>
            </div>

            {/* Direct Telephone Helpline */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">Customer Desk & Helpline</span>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-white hover:text-amber-200 font-bold text-sm sm:text-base block mt-0.5 transition-colors"
                >
                  {STORE_INFO.phone}
                </a>
                <span className="text-stone-400 text-xs block">Direct showroom call & orders</span>
              </div>
            </div>

            {/* Showroom Address */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-rose-300 font-semibold block">Nagpur Showroom Address</span>
                <span className="text-white font-bold text-sm block mt-0.5">
                  Pratap Nagar Square, Ring Road
                </span>
                <span className="text-stone-400 text-xs block">
                  Plot No 69, Pratap Nagar, Nagpur - 440022
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Authentic Brand Logo */}
            <div className="flex items-center">
              <ChaudhariLogo variant="dark" size="md" />
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pt-2">
              Nagpur’s trusted showroom for authentic readymade garments, Raymond suiting & shirting, unstitched Neeru’s dress materials, festive ethnic wear, and bio-washed lycra leggings.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2dd4bf] flex-shrink-0 mt-0.5" />
                <span>
                  Plot No 69, Pratap Nagar Square, Ring Road, Pratap Nagar, Nagpur - 440022, Maharashtra
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-white font-semibold text-amber-200">
                  {STORE_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-white font-mono text-stone-300">
                  {STORE_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#2dd4bf] flex-shrink-0" />
                <span>10:30 AM – 9:30 PM (All 7 Days Open)</span>
              </div>
            </div>
          </div>

          {/* Listed Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Specialized Sections
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onOpenQuery("Women's Ethnic Wear")}
                  className="hover:text-white transition-colors text-left"
                >
                  Women Readymade & Ethnic Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuery("Men's Readymade & Suiting")}
                  className="hover:text-white transition-colors text-left"
                >
                  Men Readymade Garments & Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuery("Raymond Suiting & Shirting")}
                  className="hover:text-white transition-colors text-left"
                >
                  Raymond Suiting & Shirting Fabrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuery("Dress Materials & Unstitched")}
                  className="hover:text-white transition-colors text-left"
                >
                  Neeru's-Style Dress Material Retailer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuery("Lycra Leggings & Bottoms")}
                  className="hover:text-white transition-colors text-left"
                >
                  Lycra Legging Retailers (48+ Shades)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenQuery("Kids & Teens Collection")}
                  className="hover:text-white transition-colors text-left"
                >
                  Kids & Teens Festive Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links & Verification */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Navigation
            </h4>
            <ul className="text-xs space-y-2 text-stone-400">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  Online Catalog
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-white transition-colors">
                  Store Specialties
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#query-form" className="hover:text-white transition-colors">
                  Send Query / Email Owner
                </a>
              </li>
              <li>
                <a href="#store-visit" className="hover:text-white transition-colors">
                  Directions & Parking
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-teal-400 hover:text-white font-semibold transition-colors flex items-center gap-1 mt-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Leads Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Justdial Verified & Owner Immediate Notification Notice */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Justdial Verified Retailer</span>
                <span className="text-xs text-amber-400 font-bold">★ 4.8 / 5</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Listed in Men & Women Readymade, Dress Material, Ethnic Wear, and Lycra Leggings in Nagpur.
              </p>
              <a
                href="https://www.justdial.com/Nagpur/Chaudhari-Lifestyle-Pratap-Nagar-Square-Pratap-Nagar/0712PX712-X712-160430122448-P5D3_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Read reviews on Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-stone-900/60 border border-stone-800 p-3 rounded-lg text-[11px] text-stone-400">
              <span className="font-semibold text-stone-300 block mb-1">Direct Inquiries:</span>
              <span>All customer query submissions are sent to owner at </span>
              <strong className="text-stone-200">omshrirao58@gmail.com</strong>
            </div>
          </div>

        </div>

        {/* Bottom Micro Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Chaudhari Lifestyle, Nagpur. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Pratap Nagar Square · Ring Road · Nagpur-440022</span>
            <span>·</span>
            <button onClick={onOpenAdmin} className="hover:text-stone-300 transition-colors">
              Owner Sign-In
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

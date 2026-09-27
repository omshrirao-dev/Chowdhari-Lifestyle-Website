import React, { useState } from 'react';
import { MessageCircle, Menu, X, ShieldCheck, Inbox } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { ChaudhariLogo } from './ChaudhariLogo';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenQuery: (category?: string) => void;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenQuery, inquiryCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-2xs">
      {/* Top micro bar removed completely as requested: timings, phone & address moved exclusively to page bottom */}

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Authentic Brand Logo & Typography with accurate sign board colors */}
          <a href="#" className="flex items-center group transition-transform active:scale-[0.99]">
            <ChaudhariLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-700">
            <a
              href="#catalog"
              className="hover:text-[#1c5652] transition-colors py-1 border-b-2 border-transparent hover:border-[#1c5652]"
            >
              Catalog
            </a>
            <a
              href="#specialties"
              className="hover:text-[#1c5652] transition-colors py-1 border-b-2 border-transparent hover:border-[#1c5652]"
            >
              Specialties
            </a>
            <a
              href="#reviews"
              className="hover:text-[#1c5652] transition-colors py-1 border-b-2 border-transparent hover:border-[#1c5652]"
            >
              Customer Reviews
            </a>
            <a
              href="#store-visit"
              className="hover:text-[#1c5652] transition-colors py-1 border-b-2 border-transparent hover:border-[#1c5652]"
            >
              Store Location
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Owner/Admin Leads Portal button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-md border border-stone-200 transition-colors"
              title="Store Owner & Admin Leads Portal"
            >
              <Inbox className="w-3.5 h-3.5 text-stone-500" />
              <span>Admin Leads</span>
              {inquiryCount > 0 && (
                <span className="bg-[#b83362] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-none">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Chaudhari Lifestyle, I would like to inquire about your garment collections.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Query Form trigger */}
            <button
              onClick={() => onOpenQuery()}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#1c5652] hover:bg-[#14423e] rounded-md shadow-xs transition-all active:scale-[0.98]"
            >
              Send Query / Booking
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuery()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1c5652] rounded-md"
            >
              Query
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-[#faf8f5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100 font-semibold"
            >
              Browse Catalog
            </a>
            <a
              href="#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              Store Specialties (Raymond, Neeru's, Leggings)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              Customer Reviews
            </a>
            <a
              href="#store-visit"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              Store Location & Directions
            </a>
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Chaudhari Lifestyle, I would like to inquire about your garment collections.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold bg-emerald-600 text-white rounded-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-md border border-stone-300"
            >
              <ShieldCheck className="w-4 h-4 text-[#1c5652]" />
              Store Owner & Admin Leads Portal ({inquiryCount} leads)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

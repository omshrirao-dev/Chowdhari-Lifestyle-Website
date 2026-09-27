import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, Car, ShieldCheck, ExternalLink, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

export const StoreLocation: React.FC = () => {
  const googleMapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Plot+No+69+Pratap+Nagar+Square+Ring+Road+Nagpur+Maharashtra+440022";

  return (
    <section id="store-visit" className="py-16 sm:py-24 relative overflow-hidden border-b border-amber-900/10">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% 20%, rgba(184, 91, 79, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 65% 55% at 20% 80%, rgba(217, 140, 68, 0.06) 0%, transparent 55%),
            linear-gradient(180deg, #f8f1e8 0%, #f4eae0 50%, #f0e5d8 100%)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#1c5652] mb-1.5">
            Store Location & Visit Details
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Our Showroom Address & Directions
          </h2>
          <p className="text-stone-600 text-xs sm:text-base mt-2 leading-relaxed">
            Conveniently situated with dedicated customer parking, spacious trial rooms, and personal textile styling consultants.
          </p>
        </div>

        {/* Showroom Visual + Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Map & Directions */}
          <div className="lg:col-span-7 bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/15 overflow-hidden shadow-xs flex flex-col justify-between">
            <div className="relative aspect-video w-full bg-stone-100 overflow-hidden border-b border-amber-900/10">
              {/* Google Map iframe Embed for Nagpur Pratap Nagar Square */}
              <iframe
                title="Chaudhari Lifestyle Store Location Map"
                src="https://maps.google.com/maps?q=Pratap%20Nagar%20Square%2C%20Ring%20Road%2C%20Nagpur%20Maharashtra%20440022&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              <div className="absolute top-3 left-3 bg-[#fffdfa]/95 backdrop-blur-xs px-3 py-1.5 rounded-md text-xs font-semibold text-stone-900 shadow-sm border border-amber-900/15 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1c5652]" />
                <span>Pratap Nagar Square, Ring Road</span>
              </div>
            </div>

            {/* Directions & Amenities Bar */}
            <div className="p-6 bg-[#f7efe4]/50 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#fffdfa] p-3 rounded-lg border border-amber-900/10 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <Car className="w-4 h-4 text-[#1c5652]" />
                    <span>Customer Parking</span>
                  </div>
                  <p className="text-stone-500">Ample frontage along Ring Road service lane.</p>
                </div>

                <div className="bg-[#fffdfa] p-3 rounded-lg border border-amber-900/10 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <Navigation className="w-4 h-4 text-[#1c5652]" />
                    <span>Key Landmark</span>
                  </div>
                  <p className="text-stone-500">Opposite Pratap Nagar Square Junction.</p>
                </div>

                <div className="bg-[#fffdfa] p-3 rounded-lg border border-amber-900/10 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <Clock className="w-4 h-4 text-[#1c5652]" />
                    <span>Store Hours</span>
                  </div>
                  <p className="text-stone-500">10:30 AM – 9:30 PM (All 7 Days)</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={googleMapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-black text-white rounded-md text-xs font-semibold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps App</span>
                </a>

                <a
                  href="https://www.justdial.com/Nagpur/Chaudhari-Lifestyle-Pratap-Nagar-Square-Pratap-Nagar/0712PX712-X712-160430122448-P5D3_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#1c5652] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Justdial Business Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Showroom Details - FULL ADDRESS HERE AT THE BOTTOM */}
          <div className="lg:col-span-5 bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/15 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9c4238]">
                  Verified Establishment
                </span>
                <h3 className="font-editorial text-2xl font-bold text-stone-900 mt-1">
                  Chaudhari Lifestyle
                </h3>
                <p className="text-stone-500 text-xs mt-1">
                  Serving Nagpur families with authentic fabrics and ready garments since establishment.
                </p>
              </div>

              {/* Complete Address Highlighted at the bottom */}
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#f7efe4] border border-amber-900/10">
                  <div className="w-8 h-8 rounded-full bg-[#1c5652]/10 text-[#1c5652] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">Store Address:</strong>
                    <span className="text-stone-700 leading-relaxed block mt-0.5 font-medium">
                      Plot No 69, Pratap Nagar Square, Ring Road,<br />
                      Pratap Nagar, Nagpur - 440022, Maharashtra
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">Contact Telephone:</strong>
                    <a
                      href={`tel:${STORE_INFO.phone}`}
                      className="text-lg font-bold text-[#1c5652] hover:underline block mt-0.5"
                    >
                      {STORE_INFO.phone}
                    </a>
                    <span className="text-[11px] text-stone-500">Direct desk & inquiries</span>
                  </div>
                </div>

                {/* Owner Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-900/5 text-stone-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">Store / Owner Email:</strong>
                    <a
                      href={`mailto:${STORE_INFO.email}`}
                      className="text-stone-800 hover:text-stone-900 font-mono text-xs block mt-0.5"
                    >
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-stone-900 block font-semibold">Operating Hours:</strong>
                    <span className="text-stone-700 font-medium block mt-0.5">
                      10:30 AM – 9:30 PM
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Open All 7 Days (Mon - Sun)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-6 border-t border-amber-900/10 mt-6 grid grid-cols-2 gap-3">
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="py-2.5 px-3 bg-stone-900 hover:bg-black text-white rounded text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Chaudhari Lifestyle, I would like to visit the showroom today.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

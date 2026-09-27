import React from 'react';
import { ArrowDown, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

interface HeroProps {
  onOpenQuery: (category?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuery }) => {
  return (
    <section className="relative overflow-hidden bg-[#faf5ee] border-b border-amber-900/10 pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 15% 20%, rgba(184, 91, 79, 0.09) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 85% 15%, rgba(217, 140, 68, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 50% 90%, rgba(15, 118, 110, 0.05) 0%, transparent 65%),
            linear-gradient(180deg, #fcf8f3 0%, #f7efe4 50%, #f9f3ea 100%)
          `
        }}
      />

      {/* Subtle textile grid watermark */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #9c4238 1px, transparent 1px),
            linear-gradient(to bottom, #9c4238 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />

      {/* Faint luxury ornament ring in background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#9c4238]/10 pointer-events-none blur-xs" />
      <div className="absolute top-1/2 -right-40 w-[480px] h-[480px] rounded-full border border-amber-600/10 pointer-events-none blur-xs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Ultra-clean, minimal text first impression */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Minimal Kicker without address (address moved strictly to bottom) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#1c5652] uppercase">
              <span>Chaudhari Lifestyle</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>All Age Groups</span>
              <span aria-hidden="true" className="text-stone-300">/</span>
              <span>Fine Textiles</span>
            </div>

            {/* Punchy 4-5 Words Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.1] tracking-tight">
              Elegance for <span className="italic font-serif-luxury text-[#1c5652]">Every Generation.</span>
            </h1>

            {/* Brief, elegant one-liner (reduced text) */}
            <p className="text-base sm:text-lg text-stone-700 font-normal leading-relaxed max-w-xl">
              Fine ethnic wear, bespoke suiting, and fabrics for men, women, and kids.
            </p>

            {/* Fast Action CTAs (Contact info strictly at bottom) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#1c5652] hover:bg-[#14423e] rounded-md shadow-sm shadow-[#1c5652]/25 transition-all active:scale-[0.98]"
              >
                <span>Browse Catalog</span>
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>

              <button
                onClick={() => onOpenQuery()}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-stone-800 bg-[#fffdfa] hover:bg-stone-50 border border-teal-900/15 rounded-md transition-all active:scale-[0.98] shadow-xs"
              >
                <span>Book Visit / Query</span>
              </button>
            </div>

            {/* Verified Rating Line */}
            <div className="pt-4 border-t border-amber-900/10 flex flex-wrap items-center gap-6 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className="text-sm">{star}</span>
                  ))}
                </div>
                <span className="font-semibold text-stone-800">4.8 / 5 Rating</span>
                <span className="text-stone-400">·</span>
                <span>Justdial Verified</span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Quality Fabric Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product & Showroom Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Feature Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-900/10 bg-stone-900 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                  alt="Chaudhari Lifestyle Premium Indian Ethnic Wear"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                {/* Overlaid Store badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-stone-200 text-xs font-semibold text-stone-900 shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9c4238]" />
                  <span>Curated Family Collections</span>
                </div>

                {/* Overlaid Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#fffdfa]/95 backdrop-blur-md border border-amber-900/10 text-stone-900 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span>Ethnic · Suiting · Fabrics</span>
                    <span className="text-[#9c4238] font-semibold">All Ages</span>
                  </div>
                  <h3 className="font-editorial text-base font-bold text-stone-900">
                    Sarees, Lehengas, Raymond Suiting & Kurtas
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-stone-600">Open 10:30 AM – 9:30 PM Today</span>
                    <a
                      href="#catalog"
                      className="text-[#9c4238] font-semibold hover:underline flex items-center gap-0.5"
                    >
                      Explore Items →
                    </a>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Thumbnail: Men's Traditional Silk Kurta */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 w-44 rounded-xl overflow-hidden border-2 border-white shadow-xl bg-[#fffdfa] p-1">
                <img
                  src="https://images.unsplash.com/photo-1622122201714-77da0ca8e5d2?auto=format&fit=crop&w=400&q=80"
                  alt="Men's Ethnic Collection"
                  className="w-full h-32 object-cover object-top rounded-lg"
                />
                <div className="p-1.5 text-center">
                  <p className="text-[11px] font-semibold text-stone-900">Men's Raw Silk Kurta</p>
                  <p className="text-[10px] text-stone-500">Traditional Dhoti & Sherwani</p>
                </div>
              </div>

              {/* Secondary Floating Thumbnail: Raymond Suiting Fabric */}
              <div className="hidden sm:block absolute -top-4 -right-6 w-40 rounded-xl overflow-hidden border-2 border-white shadow-xl bg-[#fffdfa] p-1">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80"
                  alt="Raymond Authorized Fabrics"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="p-1 text-center">
                  <p className="text-[11px] font-semibold text-stone-900">Raymond Fabrics</p>
                  <p className="text-[10px] text-[#9c4238] font-medium">Bespoke Suiting</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

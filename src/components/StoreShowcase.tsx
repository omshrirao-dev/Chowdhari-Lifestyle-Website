import React from 'react';
import { Sparkles, Layers, Scissors, Check, Award, Store, Users, Shield } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

interface StoreShowcaseProps {
  onOpenQuery: (category?: string) => void;
}

export const StoreShowcase: React.FC<StoreShowcaseProps> = ({ onOpenQuery }) => {
  const storePillars = [
    {
      title: "Women's Ethnic & Festive Wear",
      description: "Designer bridal lehengas, semi-stitched suits, layered party anarkalis, and traditional handloom sarees crafted for Nagpur weddings and pujas.",
      highlight: "Over 500+ festive designs in stock",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80"
    },
    {
      title: "Authorized Raymond Suiting & Shirting",
      description: "Pure Italian blends, Super 120s wool, Egyptian Giza cottons, and master tailoring lengths for boardroom elegance and wedding receptions.",
      highlight: "Certified authentic Raymond bolts",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80"
    },
    {
      title: "Neeru's Style & Chanderi Dress Materials",
      description: "Our dedicated unstitched dress material wing lets you tailor custom silhouettes with pure banarasi dupattas, zari borders, and fine Santoon bottom cloth.",
      highlight: "Full 3-piece unstitched sets",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"
    },
    {
      title: "Lycra Leggings & Everyday Bottomwear",
      description: "Renowned across Nagpur for premium 4-way stretch, bio-washed combed cotton lycra leggings in 48+ vibrant color-fast shades with zero pilling.",
      highlight: "Ankle length, Churidar & Palazzos",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=700&q=80"
    },
    {
      title: "Men's Readymade & Traditional Kurta-Dhotis",
      description: "Regal peacock raw silks, brocade Modi jackets, classic linen mandarin shirts, and ready-to-wear golden dhotis for groomsmen and festive hosts.",
      highlight: "Ready-to-wear sizes 38 to 46",
      image: "https://images.unsplash.com/photo-1622122201714-77da0ca8e5d2?auto=format&fit=crop&w=700&q=80"
    },
    {
      title: "Kids & Teens Festive Wardrobe",
      description: "Itch-free soft cotton linings, brocade sherwanis, mirror-work chaniya cholis, and comfortable casuals for children aged 2 to 14 years.",
      highlight: "Child-safe non-prickly tailoring",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=700&q=80"
    }
  ];

  return (
    <section id="specialties" className="py-16 sm:py-24 relative overflow-hidden border-b border-amber-900/10">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 15% 20%, rgba(217, 140, 68, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 65% 55% at 85% 80%, rgba(184, 91, 79, 0.06) 0%, transparent 60%),
            linear-gradient(180deg, #f8f1e7 0%, #f4eae0 50%, #f7efe5 100%)
          `
        }}
      />

      {/* Subtle background ornament */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full border border-amber-900/5 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full border border-amber-900/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#1c5652] mb-2">
            Why Patrons Choose Chaudhari Lifestyle
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Six Specialized Departments Under One Grand Roof
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            We combine the warmth of a family-run heritage retail establishment with modern textile curation for all age groups.
          </p>
        </div>

        {/* Store Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/10 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1c5652]/30 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold tracking-wide">
                  {pillar.highlight}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-900/10 flex items-center justify-between">
                  <button
                    onClick={() => onOpenQuery(pillar.title)}
                    className="text-xs font-semibold text-[#1c5652] hover:text-[#b83362] transition-colors"
                  >
                    Inquire Availability →
                  </button>
                  <span className="text-[11px] text-stone-500 font-medium">Ready Showroom Stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Promises Banner */}
        <div className="mt-16 bg-[#1c1917] text-stone-100 rounded-2xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#e09176] font-semibold">
                Our Textile Benchmark
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                Every meter of fabric tested for color-fastness, weave density, and skin breathability.
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Whether you select a ready-to-wear festival anarkali, Raymond suit lengths for custom bespoke tailoring, or our signature lycra leggings, we guarantee honest pricing, genuine factory bolts, and cordial in-store assistance.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-lg">
                <div className="font-editorial text-2xl font-bold text-amber-300">48+</div>
                <div className="text-xs text-stone-300 font-medium mt-1">Lycra Legging Colors</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Always in ready stock</div>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-lg">
                <div className="font-editorial text-2xl font-bold text-amber-300">100%</div>
                <div className="text-xs text-stone-300 font-medium mt-1">Authentic Raymond</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Direct authorized dealer</div>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-lg">
                <div className="font-editorial text-2xl font-bold text-amber-300">All Ages</div>
                <div className="text-xs text-stone-300 font-medium mt-1">Men, Women, Kids</div>
                <div className="text-[11px] text-stone-500 mt-0.5">Family shopping hub</div>
              </div>

              <div className="bg-stone-900/80 border border-stone-800 p-4 rounded-lg">
                <div className="font-editorial text-2xl font-bold text-amber-300">7 Days</div>
                <div className="text-xs text-stone-300 font-medium mt-1">Open 10:30 AM - 9:30 PM</div>
                <div className="text-[11px] text-stone-500 mt-0.5">At Pratap Nagar Square</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

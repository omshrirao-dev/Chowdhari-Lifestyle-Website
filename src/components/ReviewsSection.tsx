import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote, ExternalLink, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../data/catalog';

export const ReviewsSection: React.FC = () => {
  const [activeSort, setActiveSort] = useState<'relevant' | 'latest' | 'high-to-low'>('relevant');

  const sortedReviews = [...REVIEWS].sort((a, b) => {
    if (activeSort === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (activeSort === 'high-to-low') {
      return b.rating - a.rating;
    }
    // Default 'relevant'
    return 0;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 relative overflow-hidden border-b border-amber-900/10">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 85% 15%, rgba(184, 91, 79, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 15% 85%, rgba(217, 140, 68, 0.06) 0%, transparent 55%),
            linear-gradient(180deg, #f7efe5 0%, #f4eae0 50%, #f7eee5 100%)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-amber-900/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#1c5652] mb-1.5">
              Verified Patron Testimonials
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 tracking-tight">
              What Customers Say About Chaudhari Lifestyle
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl">
              Authentic reviews from patrons regarding fabric quality, management, and staff courtesy.
            </p>
          </div>

          {/* Justdial & Rating Score Badge */}
          <div className="bg-[#fffdfa]/95 backdrop-blur-sm p-4 rounded-xl border border-amber-900/15 shadow-sm flex items-center gap-4 flex-shrink-0">
            <div className="text-center border-r border-amber-900/10 pr-4">
              <div className="font-editorial text-3xl font-bold text-stone-900 leading-none">4.8</div>
              <div className="flex text-amber-500 mt-1">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                <span>Justdial Verified</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">280+ Ratings & Customer Reviews</p>
              <a
                href="https://www.justdial.com/Nagpur/Chaudhari-Lifestyle-Pratap-Nagar-Square-Pratap-Nagar/0712PX712-X712-160430122448-P5D3_BZDET"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#1c5652] hover:underline flex items-center gap-1 mt-1 font-medium"
              >
                <span>View on Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Sort Bar as mentioned in prompt: Relevant | Latest | High to Low */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-medium text-stone-500">Filter By:</span>
            <div className="flex items-center bg-[#fffdfa] p-1 rounded-md border border-amber-900/15 shadow-2xs">
              {(
                [
                  { id: 'relevant', label: 'Relevant' },
                  { id: 'latest', label: 'Latest' },
                  { id: 'high-to-low', label: 'High to Low' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSort(tab.id)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    activeSort === tab.id
                      ? 'bg-stone-900 text-white font-medium shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-stone-500 hidden sm:inline">
            Showing verified customer experiences
          </span>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sortedReviews.map((rev) => (
            <div
              key={rev.id}
              className={`bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border p-6 sm:p-7 shadow-xs hover:shadow-md flex flex-col justify-between transition-all ${
                rev.author === 'Kashti' ? 'border-[#9c4238]/35 ring-1 ring-[#9c4238]/20 bg-gradient-to-b from-[#fdf7f3] to-[#fffdfa]' : 'border-amber-900/10'
              }`}
            >
              <div>
                {/* Reviewer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-stone-900">{rev.author}</h4>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                        <span>{rev.date}</span>
                        <span>·</span>
                        <span className="text-stone-500">{rev.source.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Specific key feature highlights */}
                {rev.highlights && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {rev.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-700 bg-amber-900/5 px-2 py-0.5 rounded border border-amber-900/10"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#9c4238]" />
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Footer source citation */}
              <div className="mt-5 pt-4 border-t border-amber-900/10 flex items-center justify-between text-[11px] text-stone-400">
                <span>Source: Justdial.com</span>
                <a
                  href="https://www.justdial.com/Nagpur/Chaudhari-Lifestyle-Pratap-Nagar-Square-Pratap-Nagar/0712PX712-X712-160430122448-P5D3_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-[#9c4238] flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Read full review</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Patron invitation banner */}
        <div className="mt-12 text-center text-xs text-stone-500">
          Have you recently shopped at our Pratap Nagar Square showroom?
          <a
            href="https://www.justdial.com/Nagpur/Chaudhari-Lifestyle-Pratap-Nagar-Square-Pratap-Nagar/0712PX712-X712-160430122448-P5D3_BZDET"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9c4238] font-semibold hover:underline ml-1"
          >
            Leave a review on Justdial
          </a>
        </div>

      </div>
    </section>
  );
};

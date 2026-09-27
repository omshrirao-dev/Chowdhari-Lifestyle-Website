import React, { useState, useMemo } from 'react';
import { Search, Eye, MessageCircle, Filter, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PRODUCTS, CATEGORIES, ProductItem, STORE_INFO } from '../data/catalog';

interface CatalogSectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenQuery: (category?: string, productName?: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ onSelectProduct, onOpenQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('all');

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;

      // Target group match
      const targetMatch =
        selectedTarget === 'all' ||
        item.targetGroup.toLowerCase() === selectedTarget.toLowerCase() ||
        (selectedTarget === 'kids' && (item.targetGroup === 'Boys' || item.targetGroup === 'Girls'));

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.fabric.toLowerCase().includes(query) ||
        item.weaveOrWork.toLowerCase().includes(query) ||
        item.color.toLowerCase().includes(query) ||
        item.occasion.toLowerCase().includes(query) ||
        item.ageGroup.toLowerCase().includes(query);

      return categoryMatch && targetMatch && searchMatch;
    });
  }, [activeCategory, selectedTarget, searchQuery]);

  return (
    <section id="catalog" className="py-16 sm:py-24 relative overflow-hidden border-b border-amber-900/10">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 85% 25%, rgba(184, 91, 79, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 10% 75%, rgba(217, 140, 68, 0.05) 0%, transparent 55%),
            radial-gradient(ellipse 65% 55% at 50% 50%, rgba(15, 118, 110, 0.03) 0%, transparent 65%),
            linear-gradient(180deg, #f9f3ea 0%, #f6eee3 45%, #f8f1e7 100%)
          `
        }}
      />

      {/* Subtle textile weave grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #9c4238 1px, transparent 1px),
            linear-gradient(to bottom, #9c4238 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-amber-900/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1c5652] mb-2">
              Curated Collections · All Age Groups
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 tracking-tight">
              Premium Textile Gallery & Readymades
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              From unstitched Neeru’s dress materials and Raymond suiting to festive silk kurtas, kids sets, and 4-way lycra leggings.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabric, color, occasion..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#fffdfa] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1c5652] focus:border-[#1c5652] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls: Functional Segmented Buttons */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/10">
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#1c5652] text-white shadow-xs'
                      : 'bg-[#fffdfa] text-stone-700 hover:bg-stone-100 border border-amber-900/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Age / Target Group Filter */}
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-medium text-stone-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Age Group:
            </span>
            <div className="flex items-center bg-[#fffdfa] p-0.5 rounded-md border border-amber-900/15 shadow-2xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'kids', label: 'Kids & Teens' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTarget(t.id)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    selectedTarget === t.id
                      ? 'bg-[#1c5652] text-white font-medium'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filter Indicators */}
        <div className="py-4 flex items-center justify-between text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items for all age groups
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <span>Fine Weaves & Quality Fabric</span>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#fffdfa] rounded-xl border border-amber-900/10 p-8 my-4 shadow-sm">
            <p className="text-stone-500 text-sm">No items found matching your filter "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedTarget('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#9c4238] bg-[#9c4238]/10 hover:bg-[#9c4238]/20 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/10 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#9c4238]/30 transition-all duration-300 flex flex-col"
              >
                {/* Product Image with Hover Zoom & Action Overlays */}
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Kicker Label */}
                  {product.tag && (
                    <div className="absolute top-3 left-3 bg-[#1c1917]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded backdrop-blur-xs tracking-wide">
                      {product.tag}
                    </div>
                  )}

                  {/* Stock status indicator */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] font-medium text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1 border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>In Showroom</span>
                  </div>

                  {/* Quick Action Button overlay */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-semibold rounded shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-600" />
                      <span>Fabric Specs</span>
                    </button>
                    
                    <a
                      href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hello Chaudhari Lifestyle, I would like to inquire about "${product.name}" (₹${product.price}) displayed on your catalog.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded shadow-md transition-colors"
                      title="WhatsApp Inquiry for this product"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium mb-1">
                      <span>{product.targetGroup}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.ageGroup}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#1c5652] truncate">{product.fabric.split(' ')[0]}</span>
                    </div>

                    <h3 className="font-editorial text-base font-bold text-stone-900 group-hover:text-[#1c5652] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>

                    {/* Fabric description highlight */}
                    <div className="mt-3 pt-2.5 border-t border-stone-100 text-[11px] text-stone-600">
                      <span className="font-medium text-stone-700">Fabric: </span>
                      <span className="truncate">{product.fabric}</span>
                    </div>
                  </div>

                  {/* Price & Primary Call to Action */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-editorial text-lg font-bold text-stone-900">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500">Incl. all taxes</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                        title="View Full Specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onOpenQuery(product.category, product.name)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1c5652] hover:bg-[#14423e] rounded transition-colors active:scale-95 shadow-2xs"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Store Catalog Footer Note */}
        <div className="mt-12 p-6 bg-[#fffdfa] rounded-xl border border-amber-900/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#9c4238]/10 text-[#9c4238] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">Looking for a specific fabric or custom wedding trousseau?</h4>
              <p className="text-xs text-stone-500">
                We stock hundreds of designs, unstitched suit lengths, and Raymond fabrics in our complete showroom collection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onOpenQuery('Custom Bespoke / Bulk')}
              className="px-4 py-2 text-xs font-semibold text-stone-800 bg-[#f4ebe0] hover:bg-[#ede1d3] rounded-md transition-colors"
            >
              Ask for Custom Samples
            </button>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Chaudhari Lifestyle, I would like to see more designs and catalog photos on WhatsApp.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Request WhatsApp Catalog</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

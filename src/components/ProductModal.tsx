import React from 'react';
import { X, Check, Phone, MessageCircle, ShieldCheck, Sparkles, Tag, Layers, RefreshCw } from 'lucide-react';
import { ProductItem, STORE_INFO } from '../data/catalog';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onOpenQuery: (category?: string, productName?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onOpenQuery }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#fffdfa] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-amber-900/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#fffdfa]/95 hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-xs transition-colors border border-amber-900/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-stone-100 aspect-[3/4] md:aspect-auto h-72 md:h-full overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.tag && (
              <div className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-medium px-2.5 py-1 rounded">
                {product.tag}
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-xs px-3 py-1.5 rounded border border-stone-200 text-stone-800 font-medium">
              Available at Pratap Nagar Store
            </div>
          </div>

          {/* Right: Rich Fabric Details & Booking Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Clean Unboxed Metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1c5652] uppercase tracking-wider mb-1">
                <span>{product.targetGroup}</span>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <span>{product.ageGroup}</span>
              </div>

              <h2 className="font-editorial text-2xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-stone-500 text-xs mt-1">
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mt-4 pb-4 border-b border-stone-200 flex items-baseline gap-3">
                <span className="font-editorial text-2xl font-bold text-stone-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready in Showroom
                </span>
              </div>

              {/* Comprehensive Fabric & Quality Specifications */}
              <div className="mt-4 space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2 py-2 border-b border-stone-100">
                  <span className="text-stone-500 font-medium flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" /> Fabric
                  </span>
                  <span className="col-span-2 text-stone-900 font-semibold">{product.fabric}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-b border-stone-100">
                  <span className="text-stone-500 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-stone-400" /> Weave & Work
                  </span>
                  <span className="col-span-2 text-stone-800">{product.weaveOrWork}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-b border-stone-100">
                  <span className="text-stone-500 font-medium flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-stone-400" /> Color Shades
                  </span>
                  <span className="col-span-2 text-stone-800">{product.color}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Occasion</span>
                  <span className="col-span-2 text-stone-800">{product.occasion}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-b border-stone-100">
                  <span className="text-stone-500 font-medium">Care Tips</span>
                  <span className="col-span-2 text-stone-600">{product.careInstructions}</span>
                </div>
              </div>

              {/* Available Sizes */}
              <div className="mt-4">
                <span className="text-xs font-medium text-stone-700 block mb-2">Available Sizing / Cuts:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs bg-stone-100 border border-stone-200 rounded text-stone-800 font-medium"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>

              {/* Brief Description */}
              <p className="mt-4 text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded border border-stone-100">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Chaudhari Lifestyle, I would like to inquire about "${product.name}" (Price: ₹${product.price}) and check available stock at your Nagpur showroom.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuery(product.category, product.name);
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#1c5652] hover:bg-[#14423e] rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Book Fitting / Form Inquiry</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                  Try before purchase at showroom
                </span>
                <a href={`tel:${STORE_INFO.phone}`} className="text-stone-700 hover:text-black font-medium">
                  Call: {STORE_INFO.phone}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

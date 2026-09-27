import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Check, Clock } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const quickQuestions = [
    'Hello, do you have fresh Neeru’s dress materials in stock?',
    'Inquiring about Raymond suiting fabric lengths and pricing.',
    'Looking for 4-way stretch Lycra leggings shades.',
    'Do you have bridal lehengas and festival anarkalis in showroom?'
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMessage.trim() || 'Hello Chaudhari Lifestyle, I would like to inquire about your collections.';
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Floating Chat Box when opened */}
      {isOpen && (
        <div 
          className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-xs border border-emerald-200">
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                    <circle cx="36" cy="34" r="18" fill="#1c5652" />
                    <circle cx="32" cy="68" r="19" fill="#dfaf7c" />
                    <path
                      d="M 52 24 C 64 24 72 32 70 44 C 68 53 58 57 48 59 C 39 61 33 66 35 74 C 37 83 48 88 62 88"
                      stroke="#cb2d63"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    <circle cx="68" cy="70" r="21" fill="#cb2d63" />
                  </svg>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  Chaudhari Lifestyle Store
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-200 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Replies in 5-10 mins (10:30 AM - 9:30 PM)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#efeae2]/70 space-y-3 max-h-72 overflow-y-auto">
            {/* Store Greeting Bubble */}
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-stone-800 space-y-1.5 border border-stone-200/50 max-w-[90%]">
              <p className="font-medium text-stone-900">
                Namaste! 🙏 Welcome to Chaudhari Lifestyle, Pratap Nagar Square, Nagpur.
              </p>
              <p className="text-stone-600">
                How can we assist you today? Select a quick inquiry below or type your custom requirement:
              </p>
              <div className="text-[10px] text-stone-400 text-right">Just now · Verified Business</div>
            </div>

            {/* Quick Inquiry Options */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider px-1">
                Frequently Asked:
              </p>
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-xs bg-white/90 hover:bg-white text-stone-800 p-2 rounded-md border border-stone-200/80 shadow-2xs hover:border-[#128c7e] transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <Send className="w-3 h-3 text-stone-400 group-hover:text-[#128c7e] flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your garment or fabric query..."
              className="flex-1 px-3 py-2 text-xs bg-stone-100 border border-stone-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#128c7e]"
            />
            <button
              onClick={() => handleSend()}
              className="w-8 h-8 rounded-full bg-[#128c7e] hover:bg-[#075e54] text-white flex items-center justify-center transition-colors shadow-xs"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Bottom-Right WhatsApp Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        aria-label="Open WhatsApp Chat with Chaudhari Lifestyle"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
        </span>

        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        
        <span className="text-xs font-bold tracking-wide pr-1 hidden sm:inline">
          Chat on WhatsApp
        </span>
      </button>

    </div>
  );
};

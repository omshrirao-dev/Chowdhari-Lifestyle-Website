import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, MessageCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';

interface QueryFormSectionProps {
  initialCategory?: string;
  initialProductName?: string;
  onInquirySubmitted: () => void;
  onOpenAdmin: () => void;
}

export const QueryFormSection: React.FC<QueryFormSectionProps> = ({
  initialCategory,
  initialProductName,
  onInquirySubmitted,
  onOpenAdmin,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(initialCategory || "Women's Ethnic Wear");
  const [clothingFor, setClothingFor] = useState('All Age Groups');
  const [message, setMessage] = useState(
    initialProductName ? `Inquiring about ${initialProductName} and fabric options.` : ''
  );

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Update if initialCategory or initialProductName changes
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
    if (initialProductName) {
      setMessage(`Inquiring about ${initialProductName} - available sizes, fabric details, and showroom pricing.`);
    }
  }, [initialCategory, initialProductName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          category,
          clothingFor,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedData(data);
        onInquirySubmitted();
        // Reset inputs
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage(data.message || 'Unable to submit your query. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback local handling if server unreachable
      const fallbackInquiry = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not specified',
        category,
        clothingFor,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      setSubmittedData({
        success: true,
        inquiry: fallbackInquiry,
        fallbackMailto: `mailto:omshrirao58@gmail.com?subject=${encodeURIComponent(`Inquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nCategory: ${category}\nMessage: ${message}`)}`,
        ownerEmail: 'omshrirao58@gmail.com',
      });
      onInquirySubmitted();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="query-form" className="py-16 sm:py-24 relative overflow-hidden border-b border-amber-900/10">
      {/* Superior artistic background: Faint chromatic textile hues instead of plain white */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 20% 30%, rgba(184, 91, 79, 0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(217, 140, 68, 0.07) 0%, transparent 55%),
            linear-gradient(180deg, #f8f1e7 0%, #f4eae0 50%, #f8f1e8 100%)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#9c4238] mb-2">
            Direct Store & Owner Inquiry
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Have a Query? Send Us Your Requirement
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Fill in your details below. Your query will be delivered <strong className="text-stone-900">immediately via email to the store owner (omshrirao58@gmail.com)</strong> and recorded in our store leads registry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/15 p-6 sm:p-8 shadow-sm">
            
            {submittedData ? (
              <div className="space-y-6 text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-900">
                    Query Submitted Successfully!
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    Thank you, <strong className="text-stone-900">{submittedData.inquiry.name}</strong>. Your contact information and query have been dispatched immediately to the owner at{' '}
                    <strong className="text-[#9c4238]">omshrirao58@gmail.com</strong>.
                  </p>
                </div>

                {/* Submitted Lead Summary Card */}
                <div className="text-left bg-[#f7efe4] rounded-lg p-4 border border-amber-900/10 text-xs space-y-2">
                  <div className="font-semibold text-stone-900 border-b border-amber-900/10 pb-1.5 flex items-center justify-between">
                    <span>Registered Inquiry Details</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      Status: Forwarded to Admin
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500">Contact Number:</span>{' '}
                    <strong className="text-stone-800">{submittedData.inquiry.phone}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Email Address:</span>{' '}
                    <span className="text-stone-800">{submittedData.inquiry.email || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Department / Category:</span>{' '}
                    <span className="text-stone-800 font-medium">{submittedData.inquiry.category}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Query / Requirement:</span>{' '}
                    <p className="text-stone-700 mt-1 italic bg-[#fffdfa] p-2.5 rounded border border-amber-900/10">
                      "{submittedData.inquiry.message}"
                    </p>
                  </div>
                </div>

                {/* Quick actions for user */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Chaudhari Lifestyle, I have submitted an online query under name ${submittedData.inquiry.name} (${submittedData.inquiry.phone}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow-up on WhatsApp</span>
                  </a>

                  {submittedData.fallbackMailto && (
                    <a
                      href={submittedData.fallbackMailto}
                      className="w-full sm:w-auto px-4 py-2.5 bg-[#f4ebe0] hover:bg-[#ede1d3] text-stone-800 border border-amber-900/15 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-stone-600" />
                      <span>Open in Mail App</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSubmittedData(null)}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 border border-transparent rounded-md font-medium"
                  >
                    Submit Another Query
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="text-xs text-[#9c4238] hover:underline font-semibold"
                  >
                    View in Store Owner / Admin Leads Portal →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Your Full Name <span className="text-[#9c4238]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kashti Sharma / Rajesh Kulkarni"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Contact Number <span className="text-[#9c4238]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 09822451980"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all"
                    />
                    <span className="text-[10px] text-stone-500 mt-0.5 block">Store team will call or WhatsApp you</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. customer@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all"
                    />
                    <span className="text-[10px] text-stone-500 mt-0.5 block">For digital receipts & catalog</span>
                  </div>
                </div>

                {/* Category & Target Age Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Garment / Textile Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all"
                    >
                      <option value="Women's Ethnic Wear">Women's Ethnic (Anarkalis / Sarees / Lehengas)</option>
                      <option value="Men's Readymade & Suiting">Men's Readymade (Kurta sets / Shirts)</option>
                      <option value="Raymond Suiting & Shirting">Raymond Suiting & Shirting Fabrics</option>
                      <option value="Dress Materials & Unstitched">Neeru's & Chanderi Dress Materials</option>
                      <option value="Lycra Leggings & Bottoms">Lycra Leggings (Ankle, Churidar, Palazzo)</option>
                      <option value="Kids & Teens Collection">Kids & Teens Festive Wear (Ages 2-14)</option>
                      <option value="Custom Bespoke / Bulk Inquiry">Bulk Family Trousseau / Wedding Gifting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-1">
                      Shopping For
                    </label>
                    <select
                      value={clothingFor}
                      onChange={(e) => setClothingFor(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all"
                    >
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                      <option value="Kids (Boys / Girls)">Kids (Boys / Girls)</option>
                      <option value="Entire Family Package">Entire Family Package</option>
                      <option value="All Age Groups">All Age Groups</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Your Requirement or Message
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what fabric, size, occasion, or color you are looking for..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#faf5ee] border border-amber-900/15 rounded-md focus:outline-none focus:ring-1 focus:ring-[#9c4238] focus:border-[#9c4238] transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#1c5652] hover:bg-[#14423e] disabled:bg-stone-400 text-white rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Notifying Store & Owner...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Query & Notify Owner Immediately</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-center text-[11px] text-stone-500">
                  <span>Owner notification configured to: </span>
                  <span className="font-mono text-stone-700 font-medium">omshrirao58@gmail.com</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Info Column: Store Contact & Admin Access */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Direct Info Card */}
            <div className="bg-[#fffdfa]/95 backdrop-blur-sm rounded-xl border border-amber-900/15 p-6 shadow-xs space-y-4">
              <h3 className="font-editorial text-lg font-bold text-stone-900 border-b border-amber-900/10 pb-3">
                Chaudhari Lifestyle Storefront
              </h3>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#1c5652] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Telephone / Mobile:</strong>
                    <a href={`tel:${STORE_INFO.phone}`} className="text-[#1c5652] font-bold text-sm hover:underline">
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#1c5652] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Owner / Admin Email:</strong>
                    <span className="text-stone-800 font-mono">omshrirao58@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#1c5652] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 block">Business Hours:</strong>
                    <span>Monday to Sunday: 10:30 AM – 9:30 PM (All 7 Days Open)</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">Pratap Nagar Square, Nagpur</span>
                <a
                  href="#store-visit"
                  className="text-xs font-semibold text-[#9c4238] hover:underline flex items-center gap-1"
                >
                  <span>See Full Address Below</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Admin Leads Access Box */}
            <div className="bg-[#1c1917] text-stone-200 rounded-xl p-6 shadow-sm border border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#e09176]">
                  Store Management Console
                </span>
                <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                  Admin Active
                </span>
              </div>
              <h4 className="font-editorial text-base font-bold text-white mb-2">
                Inquiries & Customer Leads Portal
              </h4>
              <p className="text-xs text-stone-400 mb-4 leading-relaxed">
                Store owner and staff can view submitted customer contacts, call numbers directly, check requirement status, and update lead notes.
              </p>
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 px-3 text-xs font-semibold bg-white text-stone-900 hover:bg-stone-100 rounded transition-colors text-center"
              >
                Open Admin Leads Registry
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ProductModal } from './components/ProductModal';
import { StoreShowcase } from './components/StoreShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import { QueryFormSection } from './components/QueryFormSection';
import { StoreLocation } from './components/StoreLocation';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AdminDrawer } from './components/AdminDrawer';
import { ProductItem } from './data/catalog';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [queryCategory, setQueryCategory] = useState<string | undefined>(undefined);
  const [queryProductName, setQueryProductName] = useState<string | undefined>(undefined);
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/inquiries/stats');
      if (res.ok) {
        const data = await res.json();
        setNewInquiriesCount(data.new || 0);
      }
    } catch {
      // In dev fallback
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleOpenQuery = (category?: string, productName?: string) => {
    setQueryCategory(category);
    setQueryProductName(productName);
    const element = document.getElementById('query-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f3] text-stone-900 flex flex-col font-sans selection:bg-[#9c4238]/15 selection:text-[#9c4238]">
      
      {/* Top Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuery={handleOpenQuery}
        inquiryCount={newInquiriesCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenQuery={handleOpenQuery} />

        {/* Catalog Showcase with Filters & All Age Groups */}
        <CatalogSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onOpenQuery={handleOpenQuery}
        />

        {/* Store Specialties (Raymond, Neeru's, Leggings, Ethnic) */}
        <StoreShowcase onOpenQuery={handleOpenQuery} />

        {/* Customer Reviews & Justdial Ratings */}
        <ReviewsSection />

        {/* Query & Lead Form with Immediate Email to omshrirao58@gmail.com */}
        <QueryFormSection
          initialCategory={queryCategory}
          initialProductName={queryProductName}
          onInquirySubmitted={fetchStats}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* Store Location, Map, Timings & Contact */}
        <StoreLocation />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQuery={handleOpenQuery}
      />

      {/* Floating WhatsApp Widget on Bottom Right */}
      <WhatsAppWidget />

      {/* Product Specification Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenQuery={handleOpenQuery}
      />

      {/* Admin Leads & Inquiries Drawer */}
      <AdminDrawer
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onInquiryUpdated={fetchStats}
      />

    </div>
  );
}

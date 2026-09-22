'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AITravelConcierge from '@/components/AITravelConcierge';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      {/* On-Demand Slide-Out Sidebar Drawer */}
      <Sidebar />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Full-Width Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer & Global AI Concierge */}
      <Footer />
      <AITravelConcierge />
    </div>
  );
}

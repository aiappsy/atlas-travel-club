'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AITravelConcierge from '@/components/AITravelConcierge';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInvestorApp = pathname?.startsWith('/investors');

  // If viewing the standalone Investor App, render clean without consumer travel club chrome
  if (isInvestorApp) {
    return <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">{children}</div>;
  }

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

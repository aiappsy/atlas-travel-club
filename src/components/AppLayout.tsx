'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import AITravelConcierge from '@/components/AITravelConcierge';
import { useSidebar } from '@/context/SidebarContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      {/* 
        Collapsible Sidebar:
        Mounted from the VERY TOP of the screen (top-0 bottom-0 fixed).
        Stays firmly locked in place even when the user scrolls down the page!
      */}
      <Sidebar />

      {/* 
        Right Content Area:
        Shifts horizontally to accommodate the sidebar (md:pl-16 or md:pl-60).
        Using pl instead of ml and min-w-0 prevents any horizontal overflow or button clipping!
      */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full min-w-0 ${
          isCollapsed ? 'md:pl-16' : 'md:pl-60'
        }`}
      >
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          {children}
        </main>

        {/* Footer in Light Mode */}
        <Footer />
      </div>

      <AITravelConcierge />
    </div>
  );
}

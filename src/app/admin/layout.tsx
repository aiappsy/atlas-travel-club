import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATLAS Master Administration | Sovereign Command Console',
  description: 'Enterprise control hub for B2B wholesale feeds, PayPal billing, AI Studio, and Visa card issuance.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Admin Isolation Banner */}
      <div className="bg-rose-950/80 border-b border-rose-900/50 text-rose-300 text-[11px] font-bold py-1 px-4 text-center">
        🔒 SECURE ISOLATED MASTER ADMIN PORTAL • RESTRICTED PLATFORM CONTROLS
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, ArrowRight, Compass, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Atlas B2B Enterprise | Gruppemedlemskap for Bedrifter og Organisasjoner',
  description:
    'Eksklusive engrosavtaler på hotell og fly for bedrifter, fagforeninger og organisasjoner. Lukket CUG-reiseportal med 0% påslag og automatisert forsinkelsesovervåking.',
};

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between">
      {/* Dedicated Enterprise Top Nav */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/b2b" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight block leading-none">
                  ATLAS <span className="text-amber-400 text-xs uppercase tracking-widest font-extrabold ml-1">Enterprise</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium block leading-tight">
                  B2B Closed-User-Group Travel Rails
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-300">
            <Link href="/b2b" className="hover:text-amber-400 transition-colors">
              B2B Oversikt
            </Link>
            <Link href="/b2b#kalkulator" className="hover:text-amber-400 transition-colors">
              Spare-Kalkulator
            </Link>
            <Link href="/b2b/portal/agenturer-no" className="hover:text-amber-400 transition-colors">
              Demo Portal
            </Link>
            <Link href="/b2b#kontakt" className="hover:text-amber-400 transition-colors">
              Forespør Avtale
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tilbake til Hovedklubben</span>
            </Link>
            <Link
              href="/b2b#kontakt"
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>Få Bedriftstilbud</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Dedicated Enterprise Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Atlas B2B Enterprise • Akkreditert Closed User Group (CUG) i henhold til WebBeds & IATA NDC</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">Betingelser</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Personvern</Link>
            <Link href="/legal/seller-of-travel" className="hover:text-white transition-colors">Reisegaranti</Link>
            <span>Hard Rock Capital Ltd / Atlas Travel Club</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

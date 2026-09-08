import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Cloud, Database, Lock, Award, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      {/* Trust & Cloud Badges */}
      <div className="border-b border-slate-900/80 py-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-950/80 border border-sky-800/40 rounded-2xl text-sky-400">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Google Cloud Run</h4>
                <p className="text-xs text-slate-500">High-speed serverless rate engine</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-950/80 border border-indigo-800/40 rounded-2xl text-indigo-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Cloud Firestore</h4>
                <p className="text-xs text-slate-500">Real-time member rates & vouchers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-950/80 border border-emerald-800/40 rounded-2xl text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Closed-Loop Parity</h4>
                <p className="text-xs text-slate-500">Opaque wholesale B2B discounts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-950/80 border border-amber-800/40 rounded-2xl text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Best Rate Guarantee</h4>
                <p className="text-xs text-slate-500">Up to 70% below public OTAs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-amber-500/40 flex items-center justify-center text-white">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-lg font-black text-white font-mono">
                ATLAS <span className="text-amber-400 font-sans text-xs">VIP</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The Private Wholesale Travel & Banking Club. Raw B2B Bedbank wholesale rates, reloadable Visa® debit cards, automated price-drop refunds, and annual profit dividends.
            </p>
            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href="/ATLAS_Whitepaper.pdf"
                download="ATLAS_Whitepaper.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800 text-xs font-bold transition-colors"
              >
                <span>📥 Download Official Whitepaper (PDF)</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Wholesale Travel
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hotels" className="hover:text-white transition-colors">
                  Wholesale Hotels (1M+)
                </Link>
              </li>
              <li>
                <Link href="/villas" className="hover:text-white transition-colors">
                  Curated Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/nomads" className="hover:text-white transition-colors">
                  Digital Nomad Visas & Coliving
                </Link>
              </li>
              <li>
                <Link href="/private-jets" className="hover:text-white transition-colors">
                  Private Jet Empty Legs
                </Link>
              </li>
              <li>
                <Link href="/proof" className="text-emerald-400 font-bold hover:underline">
                  Live Savings Proof Engine
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              FinTech & Banking
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/membership/visa-card" className="hover:text-white transition-colors">
                  ATLAS Obsidian Visa® Card
                </Link>
              </li>
              <li>
                <Link href="/vault" className="hover:text-white transition-colors">
                  Travel Vault & Dividends
                </Link>
              </li>
              <li>
                <Link href="/membership/price-drops" className="hover:text-white transition-colors">
                  Autonomous Price-Drop Refunds
                </Link>
              </li>
              <li>
                <Link href="/flight-claims" className="hover:text-white transition-colors">
                  Flight Delay Claims ($650)
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  Membership Pass
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Institutional & Docs
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/case-study" className="text-amber-300 hover:underline font-bold">
                  Case Study: Rate Parity
                </Link>
              </li>
              <li>
                <a href="/ATLAS_Case_Study_Rate_Parity.pdf" download="ATLAS_Case_Study_Rate_Parity.pdf" className="text-amber-400 hover:underline">
                  Case Study (PDF)
                </a>
              </li>
              <li>
                <a href="/ATLAS_Whitepaper.pdf" download="ATLAS_Whitepaper.pdf" className="text-slate-300 hover:underline">
                  Technical Whitepaper
                </a>
              </li>
              <li>
                <a href="/ATLAS_Sales_Letter.pdf" download="ATLAS_Sales_Letter.pdf" className="text-emerald-400 hover:underline font-bold">
                  Official Sales Letter (PDF)
                </a>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How ATLAS Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
              Legal & Compliance
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/rate-parity-compliance" className="hover:text-white transition-colors">
                  Rate Parity Exemption
                </Link>
              </li>
              <li>
                <Link href="/legal/banking-disclosures" className="hover:text-white transition-colors">
                  Banking & Card Terms
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sky-400 hover:underline">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 ATLAS VIP Platform Inc. All rights reserved. Registered closed-loop wholesale charter.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/legal/rate-parity-compliance" className="hover:underline">Parity Compliance</Link>
            <span>•</span>
            <Link href="/legal/banking-disclosures" className="hover:underline">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

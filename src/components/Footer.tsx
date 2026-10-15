'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Cloud, Database, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="bg-slate-100/90 text-slate-600 text-sm border-t border-slate-200">
      {/* Trust & Cloud Badges in Light Luxury Mode */}
      <div className="border-b border-slate-200 py-8 bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-sky-700">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Google Cloud Run</h4>
                <p className="text-[11px] text-slate-500">
                  {locale === 'no' ? 'Høyhastighets skybasert prismotor' : 'High-speed serverless rate engine'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-indigo-700">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Cloud Firestore</h4>
                <p className="text-[11px] text-slate-500">
                  {locale === 'no' ? 'Sanntids medlemspriser & verdikuponger' : 'Real-time member rates & vouchers'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Closed-Loop Parity</h4>
                <p className="text-[11px] text-slate-500">
                  {locale === 'no' ? 'Lukkede B2B-engrosrabatter' : 'Opaque wholesale B2B discounts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {locale === 'no' ? 'Beste Pris Garanti' : 'Best Rate Guarantee'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {locale === 'no' ? '20% til 45% under offentlige nettpriser' : '20% to 45% below public OTAs'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links in Clean Light Mode */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/atlas-logo-light.svg"
                alt="Atlas Travel Club"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 text-xs pt-1">
              <a
                href="/ATLAS_Whitepaper.pdf"
                download="ATLAS_Whitepaper.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition-colors shadow-xs"
              >
                <span>{t.footer.downloadWhitepaper}</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              {t.footer.wholesaleTravelTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/hotels" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Engroshoteller (1M+)' : 'Wholesale Hotels (1M+)'}
                </Link>
              </li>
              <li>
                <Link href="/flights" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Kommersielle flyvninger (NDC)' : 'Commercial Flights (NDC)'}
                </Link>
              </li>
              <li>
                <Link href="/lounges" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'VIP Flyplasslounger ($32)' : 'VIP Airport Lounges ($32)'}
                </Link>
              </li>
              <li>
                <Link href="/cruises" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Engros Cruises' : 'Wholesale Cruises'}
                </Link>
              </li>
              <li>
                <Link href="/proof" className="text-emerald-700 font-bold hover:underline">
                  {locale === 'no' ? 'Live Prisbevis & ROI-motor' : 'Live Savings Proof Engine'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              {t.footer.fintechTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/vault" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Reisehvelv & Dividender' : 'Travel Vault & Dividends'}
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Medlemskapspass' : 'Membership Pass'}
                </Link>
              </li>
              <li>
                <Link href="/flight-claims" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Forsinkelseserstatning (€600)' : 'Flight Delay Claims (€600)'}
                </Link>
              </li>
              <li>
                <Link href="/fast-track" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Fast-Track Sikkerhet' : 'Airport Fast-Track Customs'}
                </Link>
              </li>
              <li>
                <Link href="/status-match" className="text-slate-600 hover:text-slate-950 transition-colors">
                  {locale === 'no' ? 'Match av elitestatus' : 'Elite Status Matches'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              {t.footer.institutionalTitle}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/case-study" className="text-amber-800 hover:underline font-bold">
                  {locale === 'no' ? 'Casestudie: Prisparitet' : 'Case Study: Rate Parity'}
                </Link>
              </li>
              <li>
                <a href="/ATLAS_Case_Study_Rate_Parity.pdf" download="ATLAS_Case_Study_Rate_Parity.pdf" className="text-amber-700 hover:underline">
                  {locale === 'no' ? 'Casestudie (PDF)' : 'Case Study (PDF)'}
                </a>
              </li>
              <li>
                <a href="/ATLAS_Sales_Letter.pdf" download="ATLAS_Sales_Letter.pdf" className="text-emerald-700 hover:underline font-bold">
                  {locale === 'no' ? 'Offisielt salgsbrev (PDF)' : 'Official Sales Letter (PDF)'}
                </a>
              </li>
              <li>
                <Link href="/b2b" className="text-slate-700 font-bold hover:underline flex items-center gap-1">
                  <span>{locale === 'no' ? 'B2B Bedrift & Org' : 'B2B Enterprise & Org'}</span>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-black">
                    {locale === 'no' ? 'NY' : 'NEW'}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-slate-700 font-bold hover:underline flex items-center gap-1">
                  <span>{locale === 'no' ? 'Partnernettverk' : 'Partner Network'}</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-black">ARR</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sky-700 hover:underline font-semibold">
                  {locale === 'no' ? 'Administrasjon' : 'Admin Console'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            {locale === 'no'
              ? '© 2026 HARD ROCK CAPITAL LTD (Org.nr. 16833237, England & Wales) under varemerket ATLAS Travel Club. Alle rettigheter reservert. Registrert lukket engrosklubb for reiser.'
              : '© 2026 HARD ROCK CAPITAL LTD (Company No. 16833237, England & Wales) trading as ATLAS Travel Club. All rights reserved. Registered closed-loop wholesale travel club.'}
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/terms" className="hover:underline">{t.footer.terms}</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:underline">{t.footer.privacy}</Link>
            <span>•</span>
            <Link href="/legal/rate-parity-compliance" className="hover:underline">{t.footer.rateParity}</Link>
            <span>•</span>
            <Link href="/legal/banking-disclosures" className="hover:underline">{t.footer.bankingDisclosures}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

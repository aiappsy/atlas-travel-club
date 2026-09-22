'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Global Privacy & Data Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            GDPR, CCPA/CPRA & Global Sovereign Data Privacy Compliance • Last Updated: September 2026
          </p>
        </div>
      </section>

      {/* Main Legal Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">1. Our Core Privacy Commitment: Zero Data Selling</h2>
            <p>
              At ATLAS VIP Platform Inc. ("ATLAS"), privacy is not an afterthought; it is an architectural foundation. <strong>We do not sell, rent, monetize, or broker your personal travel data, passport information, or payment telemetry to third-party advertising networks.</strong>
            </p>
            <p>
              Public OTAs monetize consumer data through aggressive remarketing, ad retargeting, and search auction bidding. As a private, paid membership collective, ATLAS's business model is sustained entirely by member subscriptions and clean B2B software clearing.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">2. Information We Collect</h2>
            <p>We collect only the minimal data required to fulfill international travel reservations and administer club banking:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Account Credentials:</strong> Full Name, verified Email Address, and Phone Number.</li>
              <li><strong>Traveler Itinerary Data:</strong> Passenger names, birthdates, and passport numbers (required strictly for airline ticketing and international hotel check-ins).</li>
              <li><strong>Payment & Cardholder Telemetry:</strong> Tokenized payment identifiers processed via PCI-DSS Level 1 certified partners (Stripe / PayPal). ATLAS never stores raw credit card numbers on our servers.</li>
              <li><strong>Automated Rebooking Parameters:</strong> Hotel confirmation codes and target price thresholds for the 24/7 Pruvo Sentinel.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">3. How Your Data Is Processed & Shared</h2>
            <p>
              Your data is shared strictly with the authorized travel providers necessary to fulfill your booked itinerary:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>B2B Bedbanks & GDS Networks:</strong> Transmitting guest names to hotel front desks for voucher redemption (Hotelbeds, WebBeds, Amadeus).</li>
              <li><strong>Airlines & Charter Operators:</strong> Secure passport API transmission for mandatory manifest filing.</li>
              <li><strong>Legal Claims Administrators:</strong> Flight delay routing for EU261 compensation (AirHelp).</li>
              <li><strong>Licensed Banking Partners:</strong> KYC and transaction verification for ATLAS Visa® cardholders.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">4. Data Security & Cryptographic Integrity</h2>
            <p>
              All member communications, reservation vouchers, and financial transactions are encrypted in transit via TLS 1.3 with AES-256 bit encryption at rest on Google Cloud Enterprise infrastructure. All rate parity audits are certified with immutable SHA-256 cryptographic hashes.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">5. Your Global Rights (GDPR / CCPA / CPRA)</h2>
            <p>Regardless of your geographic location, ATLAS extends comprehensive privacy rights to all members:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Right to Access:</strong> You may request an export of all personal data held in your member profile.</li>
              <li><strong>Right to Rectification:</strong> You may correct or update outdated contact and travel documents at any time.</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You may request full deletion of your profile and data upon account closure.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">6. Contact Our Data Protection Officer</h2>
            <p>
              For privacy inquiries, GDPR data requests, or compliance audits, contact our Data Protection Officer at:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div><strong>ATLAS VIP Platform Inc.</strong></div>
              <div>Attn: Data Protection Officer (DPO)</div>
              <div>Email: <strong>privacy@atlastravelclub.com</strong></div>
            </div>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>Review our legal terms:</div>
            <Link href="/terms" className="text-sky-600 font-bold hover:underline">
              View Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { locale } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            {locale === 'no' ? 'Globalt Personvern & Databehandling' : 'Global Privacy & Data Governance'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {locale === 'no' ? 'Personvernerklæring & Databeskyttelse' : 'Privacy Policy & Data Protection'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {locale === 'no'
              ? 'I samsvar med GDPR, CCPA/CPRA & strenge europeiske personvernstandarder • Sist oppdatert: Oktober 2026'
              : 'GDPR, CCPA/CPRA & Global Sovereign Data Privacy Compliance • Last Updated: October 2026'}
          </p>
        </div>
      </section>

      {/* Main Legal Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-sm text-slate-700 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '1. Vårt grunnleggende løfte: Null videresalg av data'
                : '1. Our Core Privacy Commitment: Zero Data Selling'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Hos ATLAS VIP Platform Inc. («ATLAS») er personvern en arkitektonisk grunnpilar. Vi selger, leier aldri ut eller deler dine personlige reisedata, passopplysninger eller betalingstelemetri til tredjeparts annonsenettverk.'
                : 'At ATLAS VIP Platform Inc. ("ATLAS"), privacy is not an afterthought; it is an architectural foundation. We do not sell, rent, monetize, or broker your personal travel data, passport information, or payment telemetry to third-party advertising networks.'}
            </p>
            <p>
              {locale === 'no'
                ? 'Åpne portaler tjener penger på aggressiv sporing og videresalg av kundedata til annonsører. Som en privat, abonnementsbasert medlemsklubb er ATLAS sin forretningsmodell fullt finansiert av transparente medlemskontingenter.'
                : 'Public OTAs monetize consumer data through aggressive remarketing, ad retargeting, and search auction bidding. As a private, paid membership collective, ATLAS\'s business model is sustained entirely by member subscriptions and clean B2B software clearing.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no' ? '2. Opplysninger vi innhenter' : '2. Information We Collect'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Vi samler kun inn nødvendige data som kreves for å utstede offisielle billetter og administrere medlemskapet:'
                : 'We collect only the minimal data required to fulfill international travel reservations and administer club banking:'}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>{locale === 'no' ? 'Kontoopplysninger:' : 'Account Credentials:'}</strong>{' '}
                {locale === 'no' ? 'Fullt navn, verifisert e-postadresse og telefonnummer.' : 'Full Name, verified Email Address, and Phone Number.'}
              </li>
              <li>
                <strong>{locale === 'no' ? 'Reisendedata:' : 'Traveler Itinerary Data:'}</strong>{' '}
                {locale === 'no' ? 'Passasjernavn, fødselsdatoer og passnummer (nødvendig for flybilletter og hotellinnsjekk).' : 'Passenger names, birthdates, and passport numbers (required strictly for airline ticketing and international hotel check-ins).'}
              </li>
              <li>
                <strong>{locale === 'no' ? 'Betalingsinformasjon:' : 'Payment & Cardholder Telemetry:'}</strong>{' '}
                {locale === 'no' ? 'Tokeniserte betalingsidentifikatorer via PCI-DSS Nivå 1 sertifiserte partnere (Stripe). ATLAS lagrer aldri råe kortnumre.' : 'Tokenized payment identifiers processed via PCI-DSS Level 1 certified partners (Stripe / PayPal). ATLAS never stores raw credit card numbers on our servers.'}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no' ? '3. Deling med leverandører' : '3. How Your Data Is Processed & Shared'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Dine opplysninger overføres utelukkende til autoriserte leverandører som er strengt nødvendige for å gjennomføre reisen:'
                : 'Your data is shared strictly with the authorized travel providers necessary to fulfill your booked itinerary:'}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                {locale === 'no'
                  ? 'B2B Bedbanks & GDS-nettverk: Overføring av gjestenavn til hotellets resepsjon (Hotelbeds, WebBeds, Amadeus).'
                  : 'B2B Bedbanks & GDS Networks: Transmitting guest names to hotel front desks for voucher redemption (Hotelbeds, WebBeds, Amadeus).'}
              </li>
              <li>
                {locale === 'no'
                  ? 'Flyselskaper: Sikker overføring av passdata for obligatoriske flypassasjermanifester.'
                  : 'Airlines & Charter Operators: Secure passport API transmission for mandatory manifest filing.'}
              </li>
              <li>
                {locale === 'no'
                  ? 'Kravsadministratorer: Behandling av flyforsinkelser for EU261-utbetalinger.'
                  : 'Legal Claims Administrators: Flight delay routing for EU261 compensation (AirHelp).'}
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no' ? '4. Sikkerhet og kryptering' : '4. Data Security & Cryptographic Integrity'}
            </h2>
            <p>
              {locale === 'no'
                ? 'All kommunikasjon, reservasjoner og finansielle transaksjoner er beskyttet med TLS 1.3 og AES-256 bits kryptering på ISO 27001-sertifiserte skyinfrastrukturer. Prisbevis og revisjonslogger forsegles med uforanderlige SHA-256 sjekksummer.'
                : 'All member communications, reservation vouchers, and financial transactions are encrypted in transit via TLS 1.3 with AES-256 bit encryption at rest on Google Cloud Enterprise infrastructure. All rate parity audits are certified with immutable SHA-256 cryptographic hashes.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no' ? '5. Dine rettigheter (GDPR & CCPA)' : '5. Your Global Rights (GDPR / CCPA / CPRA)'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Uansett hvor du oppholder deg, har du fulle rettigheter til innsyn, retting og sletting («retten til å bli glemt») av alle data knyttet til din profil.'
                : 'Regardless of your geographic location, ATLAS extends comprehensive privacy rights to all members: Right to Access, Right to Rectification, and Right to Erasure ("Right to be Forgotten").'}
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              {locale === 'no' ? 'Personvernombud: ' : 'Contact DPO: '}
              <strong>privacy@atlastravelclub.com</strong>
            </div>
            <Link href="/terms" className="text-sky-600 font-bold hover:underline">
              {locale === 'no' ? 'Se Brukervilkår →' : 'View Terms of Service →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

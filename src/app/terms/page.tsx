'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, Scale, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsOfServicePage() {
  const { locale } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            {locale === 'no' ? 'Juridisk & Medlemsavtale' : 'Legal & Membership Agreement'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {locale === 'no' ? 'Brukervilkår & Medlemsavtale' : 'Terms of Service & Membership Agreement'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {locale === 'no'
              ? 'Ikrafttredelse: August 2026 • Sist oppdatert: Oktober 2026'
              : 'Effective Date: August 2026 • Last Updated: October 2026'}
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
                ? '1. Aksept av vilkår og klubbens lukkede natur'
                : '1. Acceptance of Terms & Closed-Loop Nature'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Ved å bruke, registrere deg for eller bestille via ATLAS-plattformen (drevet av ATLAS VIP Platform Inc., heretter referert til som «ATLAS», «vi» eller «oss»), bekrefter du («Medlemmet» eller «Brukeren») at du aksepterer disse vilkårene og retningslinjene.'
                : 'By accessing, browsing, registering for, or utilizing the ATLAS platform (operated by ATLAS VIP Platform Inc., hereinafter referred to as "ATLAS", "we", "us", or "our"), you ("Member", "User", or "Customer") agree to be bound by these Terms of Service and all incorporated policies.'}
            </p>
            <p>
              <strong>{locale === 'no' ? 'Lukket medlemsklubb:' : 'Closed-Loop Club Status:'}</strong>{' '}
              {locale === 'no'
                ? 'ATLAS opererer utelukkende som en lukket, passordbeskyttet privat medlemsklubb. Alle engrospriser, B2B Bedbank-tildelinger og direkte NDC-flypriser som vises bak medlemsinnloggingen er strengt konfidensielle og unntatt fra offentlige «Rate Parity»-reguleringer.'
                : 'ATLAS operates strictly as a closed-loop, password-gated private travel and treasury collective. All wholesale rates, inventory feeds, B2B Bedbank allocations, and negotiated amenities displayed behind the member login are confidential, proprietary, and exempt from public Rate Parity obligations.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '2. Konfidensialitet for engrospriser'
                : '2. Confidentiality & Non-Disclosure of Wholesale Rates'}
            </h2>
            <p>
              {locale === 'no'
                ? 'Som et vilkår for medlemskapet forplikter medlemmer seg uttrykkelig til:'
                : 'As a condition of membership, Members explicitly agree:'}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                {locale === 'no'
                  ? 'Ikke å skrape, republisere eller vise konfidensielle B2B-engrospriser offentlig på åpne nettsteder eller sosiale medier.'
                  : 'Not to publicly scrape, republish, broadcast, or display raw B2B Bedbank wholesale pricing on open websites, social media, or public review portals.'}
              </li>
              <li>
                {locale === 'no'
                  ? 'Ikke å dele innloggingsopplysninger eller medlemskort med uvedkommende tredjeparter.'
                  : 'Not to share member account credentials or scannable member cards with unauthorized third parties.'}
              </li>
              <li>
                {locale === 'no'
                  ? 'Brudd på konfidensialiteten skader ATLAS sine leverandøravtaler og medfører umiddelbar eksklusjon uten refusjon.'
                  : 'That violation of rate confidentiality causes irreparable harm to ATLAS\'s supplier relationships and constitutes grounds for immediate membership revocation without refund.'}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '3. Medlemskapsnivåer og abonnementsfornyelse'
                : '3. Membership Tiers & Subscription Billing'}
            </h2>
            <p>
              <strong>{locale === 'no' ? 'Fakturering & Fornyelse:' : 'Billing & Renewals:'}</strong>{' '}
              {locale === 'no'
                ? 'Medlemskap faktureres årlig eller månedlig avhengig av valgt plan. Medlemskapet fornyes automatisk inntil det sies opp via medlemssidene eller henvendelse til medlemsstøtte.'
                : 'Membership subscriptions (Digital Pass, Silver, Gold VIP, Platinum Nomad, and Corporate Fleet) are billed on an annual or monthly recurring basis. Your membership automatically renews unless canceled prior to the renewal date via the Member Portal or by contacting Member Concierge.'}
            </p>
            <p>
              <strong>{locale === 'no' ? '30-dagers prisgaranti:' : '30-Day Rate Parity Guarantee:'}</strong>{' '}
              {locale === 'no'
                ? 'Dersom du innen 30 dager finner en lavere åpen offentlig pris for et identisk rom og vilkår på Expedia eller Booking.com som ATLAS ikke slår, refunderer vi 100% av din årlige medlemskontingent.'
                : 'If, within 30 days of joining, you find a lower publicly available retail rate for an identical room, dates, and cancellation terms on Expedia or Booking.com that ATLAS cannot beat at wholesale, ATLAS will refund 100% of your annual membership fee upon verification.'}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '4. Bestillinger, leveranser og innsjekkingskuponger'
                : '4. Booking, Fulfillment & Check-In Vouchers'}
            </h2>
            <p>
              <strong>{locale === 'no' ? 'Leverandørnettverk:' : 'Fulfillment:'}</strong>{' '}
              {locale === 'no'
                ? 'Hotellbestillinger, villaer, cruise og flybilletter formidles gjennom direkte integrerte B2B Bedbanks, GDS-strømmer og partnernettverk (inkludert Hotelbeds, WebBeds og Amadeus).'
                : 'Hotel bookings, luxury villas, nomad colivings, cruises, and jet charters are fulfilled through integrated direct B2B Bedbanks, GDS feeds, and partner networks (including Hotelbeds, WebBeds, and Amadeus).'}
            </p>
            <p>
              <strong>{locale === 'no' ? 'Kuponger & Bekreftelser:' : 'Vouchers:'}</strong>{' '}
              {locale === 'no'
                ? 'Ved fullført betaling utstedes en offisiell digital innsjekkingskupong med autorisert bekreftelsesnummer. Fremvisning ved ankomst sikrer innsjekk i henhold til internasjonale bransjestandarder.'
                : 'Upon completed payment, an official cryptographic digital check-in voucher with a certified confirmation code is issued. Presenting this voucher at the property guarantees check-in under standard hospitality industry terms.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '5. Automatiske prisdropp og forsinkelseskompensasjon'
                : '5. Automated Price-Drop Sentinel & Flight Delay Claims'}
            </h2>
            <p>
              <strong>{locale === 'no' ? 'Prisdropp-refusjon:' : 'Price-Drop Arbitrage:'}</strong>{' '}
              {locale === 'no'
                ? 'Ved å aktivere automatisk prisdropp-overvåking gir du ATLAS fullmakt til å overvåke prisfall etter bestilling og automatisk sikre lavere pris på dine vegne, med netto differanse kreditert tilbake til ditt valgte betalingskort.'
                : 'By opting into the automated rebooking sentinel, you authorize ATLAS to monitor post-booking wholesale price dips and autonomously re-secure the lower rate on your behalf, crediting the net savings back to your chosen payout method.'}
            </p>
            <p>
              <strong>{locale === 'no' ? 'EU261 Kompensasjon:' : 'Flight Delay Claims:'}</strong>{' '}
              {locale === 'no'
                ? 'Krav om flyforsinkelseskompensasjon behandles under EU261/UK261 i samarbeid med autoriserte partnere. Kompensasjonen overføres direkte til medlemmet ved suksess.'
                : 'Flight delay compensation claims are processed under EU261/UK261 regulations via partner legal claims administrators. Compensation is wired directly to the member upon successful airline recovery.'}
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no'
                ? '6. Lojalitetsprogram (Club Credits) og VCC-oppgjør'
                : '6. Loyalty Program (Club Credits) & VCC Settlement'}
            </h2>
            <p>
              <strong>{locale === 'no' ? 'Tokenverdi & Opptjening:' : 'Token Value & Accrual:'}</strong>{' '}
              {locale === 'no'
                ? 'Medlemmer kan opptjene ATLAS Club Credits ved bestillinger. Verdien er fastsatt til 100 poeng = 1,00 USD. Poeng har ingen kontantverdi utenom ATLAS-bestillinger og kan ikke overføres til tredjepart.'
                : 'Members earn ATLAS Club Credits on qualifying wholesale and cruise reservations. Club Credits are fixed at 100 points = $1.00 USD. Points carry no independent cash liquidation value outside ATLAS bookings.'}
            </p>
            <p>
              <strong>{locale === 'no' ? 'Maksimal samfinansiering (50 % Tak):' : 'Co-Payment Cap (50% Ceiling):'}</strong>{' '}
              {locale === 'no'
                ? 'For å bevare klubbens likviditetsbuffer kan oppsparte Club Credits dekke maksimalt 50 % av en reservasjons totalbeløp. Resterende 50 % må gjøres opp med godkjent betalingskort via Stripe.'
                : 'To protect platform liquidity and working capital buffers, Club Credits can fund up to a maximum of 50% of any travel transaction. The remaining balance must be paid via an authorized credit card through Stripe.'}
            </p>
            <p>
              <strong>{locale === 'no' ? 'Opptjeningssperre & Utløp:' : 'Vesting Delay & Expiration:'}</strong>{' '}
              {locale === 'no'
                ? 'Opptjente poeng frigis etter fullført reise (7 dager for hotell, 14 dager for cruise etter utsjekk) etter bekreftet oppgjør fra reiseleverandør. Poeng utløper etter 18 måneders inaktivitet på medlemskontoen. Se våre utfyllende '
                : 'Points vest and clear into the member vault following itinerary completion (7 days post check-out for hotels, 14 days for cruises) following partner commission reconciliation. Unredeemed credits expire after 18 months of account inactivity. See our full '}
              <Link href="/legal/commercial-terms" className="text-amber-600 font-bold hover:underline">
                {locale === 'no' ? 'Kommersielle vilkår →' : 'Commercial Terms →'}
              </Link>
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-black text-slate-900">
              {locale === 'no' ? '7. Ansvarsbegrensning' : '7. Limitation of Liability'}
            </h2>
            <p>
              {locale === 'no'
                ? 'ATLAS fungerer som en teknologi- og formidlingsplattform for engrospriser. Vi eier eller drifter ikke hoteller, flyselskaper eller cruiseskip direkte. ATLAS er ikke ansvarlig for hendelser eller forsinkelser forårsaket av værforhold, driftsstans eller tredjeparters leverandørsvikt.'
                : 'ATLAS operates as a technology aggregator and wholesale travel collective. We do not own, manage, or operate individual hotel properties, airlines, cruise ships, or private aircraft. ATLAS shall not be held liable for property damages, flight delays caused by weather, personal injury at resort facilities, or operational failures of third-party hospitality providers.'}
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              {locale === 'no' ? 'Spørsmål om vilkårene? Kontakt ' : 'Questions regarding these Terms? Contact '}
              <strong>legal@atlastravelclub.com</strong>
            </div>
            <Link href="/privacy" className="text-sky-600 font-bold hover:underline">
              {locale === 'no' ? 'Se Personvernerklæring →' : 'View Privacy Policy →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

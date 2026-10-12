'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Calculator,
  CreditCard,
  Send,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { calculatePartnerEarnings, PARTNER_RULES } from '@/modules/affiliates/commissionModel';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersPage() {
  const { locale } = useLanguage();
  const [directMembers, setDirectMembers] = useState<number>(15);
  const [tier2Members, setTier2Members] = useState<number>(30);
  const [corporateDeals, setCorporateDeals] = useState<number>(2);

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnerType, setPartnerType] = useState('b2b_agent');
  const [reach, setReach] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const earnings = calculatePartnerEarnings({
    directMembers,
    tier2Members,
    corporateDeals,
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{locale === 'no' ? 'Atlas Partner & Nettverk' : 'Atlas Partner & Affiliate Network'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {locale === 'no' ? (
              <>
                Bygg en Passiv Årsinntekt (ARR) <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  i Verdens Største Bransje.
                </span>
              </>
            ) : (
              <>
                Build Passive Annual Recurring Revenue (ARR) <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  In The World's Largest Industry.
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {locale === 'no' ? (
              <>
                Reisebransjen omsetter for over 15 000 milliarder kroner årlig. Atlas gir deg en unik dobbel inntektsmotor:{' '}
                <strong>270 kr per direkte B2C-medlem</strong>, <strong>90 kr i squad override</strong>, OG{' '}
                <strong>20 % årlig provisjon på bedriftsavtaler</strong>.
              </>
            ) : (
              <>
                Global travel exceeds $11 trillion annually. Atlas equips you with a dual recurring revenue engine:{' '}
                <strong>$27 / year per direct B2C member</strong>, <strong>$9 / year squad tier-2 override</strong>, AND{' '}
                <strong>20% annual recurring commission on enterprise corporate deals</strong>.
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#kalkulator"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{locale === 'no' ? 'Simuler Din Inntekt' : 'Simulate Your Earnings'}</span>
            </a>
            <a
              href="#bli-partner"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{locale === 'no' ? 'Søk Partnerstatus' : 'Apply For Partner Access'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Dobbel Inntektsmotor */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            {locale === 'no' ? 'To Komplementære Inntektsstrømmer' : 'Two Complementary Revenue Streams'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            {locale === 'no' ? 'Den Doble Inntektsmotoren' : 'The Dual Recurring Revenue Engine'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {locale === 'no'
              ? 'Kombiner rask viral vekst på privatmarkedet med store, lukrative B2B-bedriftskontrakter.'
              : 'Combine viral direct-to-consumer momentum with high-ticket recurring corporate B2B contracts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engine 1: B2C Viral */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {locale === 'no' ? 'Strøm 1: B2C «3 & Free» + 2-Tier ARR' : 'Stream 1: B2C "3 & Free" + 2-Tier ARR'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Når dine kontakter sparer tusenlapper på sin aller første hotellovernatting, tipser de andre. Du tjener penger på hvert eneste ledd.'
                  : 'When travelers save hundreds of dollars on their very first hotel booking, they immediately refer friends. You earn recurring income at both tiers.'}
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? '3 & Free:' : '3 & Free:'}</strong>{' '}
                    {locale === 'no'
                      ? 'Verv 3 medlemmer ➔ ditt eget medlemskap er 100 % gratis for alltid.'
                      : 'Refer 3 active members ➔ your own VIP membership is 100% free forever.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? '270 kr per medlem/år:' : '$27 / Member / Year:'}</strong>{' '}
                    {locale === 'no'
                      ? 'Fra medlem 4 og oppover får du 270 kr i ren kontantprovisjon hvert eneste år.'
                      : 'From member 4 onwards, receive recurring cash payouts every year they renew.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? '90 kr Squad Override:' : '$9 Squad Override:'}</strong>{' '}
                    {locale === 'no'
                      ? 'For hvert medlem som verves av personene i ditt team (Tier 2), får du 90 kr/år passivt.'
                      : 'Earn passive overrides on all indirect members enrolled by your immediate referrals.'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              {locale === 'no' ? 'Null MLM-stigma • Kun 2 nivåer • Ekte spareprodukt' : 'Zero MLM Stigma • Clean 2-Tier Affiliate Structure • Authentic Savings'}
            </div>
          </div>

          {/* Engine 2: B2B Enterprise */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {locale === 'no' ? 'Strøm 2: B2B Bedrifts- & Gruppelisenser' : 'Stream 2: B2B Enterprise & Corporate Portals'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Salgsagentens drøm: Gå i ett enkelt møte med en daglig leder eller HR-sjef og selg 50–250 medlemskap i ett enkelt salg.'
                  : 'An enterprise sales dream: Meet with a CEO or HR Director and close 50 to 500 corporate seat licenses in a single agreement.'}
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? '20 % Gjentakende Provisjon:' : '20% Recurring Commission:'}</strong>{' '}
                    {locale === 'no'
                      ? 'Du mottar 20 % av hele bedriftens årsfaktura så lenge de fornyer.'
                      : 'You receive 20% of the company\'s annual software invoice for the lifetime of the client.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? 'Én bedrift på 50 ansatte:' : 'One 50-Seat Company:'}</strong>{' '}
                    {locale === 'no'
                      ? 'Gir deg ca. 4 900 kr hvert eneste år fra én signert kontrakt.'
                      : 'Generates ~$500 every single year in automated ARR from one client.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{locale === 'no' ? 'Én bedrift på 200 ansatte:' : 'One 200-Seat Enterprise:'}</strong>{' '}
                    {locale === 'no'
                      ? 'Gir deg ca. 14 000 kr hvert eneste år i ren passiv inntekt.'
                      : 'Generates ~$1,400+ per year in hands-off recurring earnings.'}
                  </span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              {locale === 'no' ? 'Perfekt for B2B-selgere og konsulenter' : 'Ideal for B2B consultants, recruiters, and corporate brokers'}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interaktiv Partner-Kalkulator */}
      <section id="kalkulator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
              {locale === 'no' ? 'Inntekts-Simulator' : 'Earnings Simulator'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {locale === 'no' ? 'Hvor mye kan du tjene som partner?' : 'How Much Can You Earn as a Partner?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {locale === 'no'
                ? 'Juster glidebryterne nedenfor for å se din estimerte årlige og månedlige provisjon.'
                : 'Adjust the sliders below to calculate your estimated annual and monthly revenue share.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Slider 1: Direct B2C */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">
                  {locale === 'no' ? 'Direkte Medlemmer (B2C):' : 'Direct Members (B2C):'}
                </span>
                <span className="text-amber-400 font-mono font-black text-sm">{directMembers}</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={directMembers}
                onChange={(e) => setDirectMembers(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-500 block">
                {locale === 'no' ? '270 kr/medlem/år (etter 3)' : '$27/member/yr (after 3)'}
              </span>
            </div>

            {/* Slider 2: Squad Tier 2 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">
                  {locale === 'no' ? 'Squad Medlemmer (Tier 2):' : 'Squad Members (Tier 2):'}
                </span>
                <span className="text-sky-400 font-mono font-black text-sm">{tier2Members}</span>
              </div>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={tier2Members}
                onChange={(e) => setTier2Members(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <span className="text-[10px] text-slate-500 block">
                {locale === 'no' ? '90 kr/medlem/år' : '$9/member/yr passive override'}
              </span>
            </div>

            {/* Slider 3: B2B Deals */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">
                  {locale === 'no' ? 'Bedriftsavtaler (snitt 50 ansatte):' : 'Corporate Deals (50 Seats Avg):'}
                </span>
                <span className="text-emerald-400 font-mono font-black text-sm">{corporateDeals}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={corporateDeals}
                onChange={(e) => setCorporateDeals(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="text-[10px] text-slate-500 block">
                {locale === 'no' ? '20% årlig provisjon per bedrift' : '20% recurring annual invoice share'}
              </span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-2 border-amber-400/80 max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {locale === 'no' ? 'B2C Direkte' : 'B2C Direct ARR'}
                </span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {locale === 'no' ? `${earnings.b2cDirectAnnualIncomeNok.toLocaleString()} kr` : `$${Math.round(earnings.b2cDirectAnnualIncomeNok / 10.5).toLocaleString()}`}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {locale === 'no' ? 'Tier 2 Squad Override' : 'Tier 2 Squad Override'}
                </span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {locale === 'no' ? `${earnings.b2cTier2AnnualIncomeNok.toLocaleString()} kr` : `$${Math.round(earnings.b2cTier2AnnualIncomeNok / 10.5).toLocaleString()}`}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  {locale === 'no' ? 'B2B Bedrifts-ARR' : 'B2B Corporate ARR'}
                </span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {locale === 'no' ? `${earnings.b2bCorporateAnnualIncomeNok.toLocaleString()} kr` : `$${Math.round(earnings.b2bCorporateAnnualIncomeNok / 10.5).toLocaleString()}`}
                </div>
              </div>

              <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                  {locale === 'no' ? 'Månedlig Snitt' : 'Monthly Average'}
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  {locale === 'no' ? `${earnings.monthlyAverageNok.toLocaleString()} kr` : `$${Math.round(earnings.monthlyAverageNok / 10.5).toLocaleString()}`}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block">
                  {locale === 'no' ? 'TOTAL ESTIMERT ÅRSINNTEKT (ARR):' : 'TOTAL ESTIMATED ANNUAL RECURRING REVENUE (ARR):'}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {locale === 'no'
                    ? `${earnings.totalAnnualIncomeNok.toLocaleString()} NOK / år`
                    : `$${Math.round(earnings.totalAnnualIncomeNok / 10.5).toLocaleString()} / year`}
                </div>
              </div>

              <a
                href="#bli-partner"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{locale === 'no' ? 'Søk Partnerstatus for å Starte' : 'Apply For Partner Access'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fintech Settlement */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" /> {locale === 'no' ? 'Automatisert Fintech Oppgjør' : 'Automated Fintech Clearing'}
            </div>
            <h3 className="text-xl font-black text-white">
              {locale === 'no' ? 'Direkte Utbetaling via Wise Payouts API' : 'Direct Monthly Settlement via Wise Platform'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {locale === 'no'
                ? 'Glem forsinkede provisjoner eller manuell fakturering. Dine provisjoner overføres automatisk hver måned direkte til din bankkonto, Revolut eller Wise-konto i NOK, USD eller EUR.'
                : 'Eliminate manual invoicing delays. Your monthly affiliate earnings are wired automatically to your bank account, Revolut, or Wise in USD, EUR, or NOK.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-400 shrink-0">
            <div className="text-emerald-400 font-bold">
              {locale === 'no' ? '✓ Månedlig fast utbetaling' : '✓ Guaranteed monthly automated payouts'}
            </div>
            <div>{locale === 'no' ? '✓ Ingen gebyrer på utbetaling' : '✓ Zero intermediary wire fees'}</div>
            <div>{locale === 'no' ? '✓ Eget partnerdashboard i sanntid' : '✓ Live real-time partner telemetry portal'}</div>
          </div>
        </div>
      </section>

      {/* 5. Søknadsskjema */}
      <section id="bli-partner" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {locale === 'no' ? 'Bli Godkjent Atlas Partner' : 'Apply For Certified Partner Status'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {locale === 'no'
                ? 'Registrer deg nedenfor for å motta din personlige partnerlenke og tilgang til partner-dashboardet.'
                : 'Submit your credentials below to generate your unique tracked link and unlock the partner portal.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-black text-white">
                {locale === 'no' ? 'Søknad Mottatt & Partnerstatus Opprettet!' : 'Partner Application Received!'}
              </h4>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                {locale === 'no'
                  ? `Takk, ${fullName}! Vi har registrert din profil under Atlas Partner Network. Du mottar en e-post på ${email} med din personlige partnerlenke og tilgang til partner-dashboardet innen kort tid.`
                  : `Thank you, ${fullName}! Your partner profile has been registered. You will receive an onboarding package at ${email} with your personal tracked link within 24 hours.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4 max-w-2xl mx-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Fullt Navn' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'E-postadresse' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Telefonnummer' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 0199"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Partnerprofil / Fokusområde' : 'Partner Profile / Focus'}
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  >
                    <option value="b2b_agent">{locale === 'no' ? 'B2B Salgsagent / Bedriftsavtaler' : 'B2B Corporate Sales Agent'}</option>
                    <option value="digital_creator">{locale === 'no' ? 'Digital Skaper / Reiseliv / Influencer' : 'Digital Creator / Travel Media / Influencer'}</option>
                    <option value="travel_professional">{locale === 'no' ? 'Reiseleder / Konsulent / Forening' : 'Travel Consultant / Affinity Association'}</option>
                    <option value="community_leader">{locale === 'no' ? 'Nettverksbygger / Ambassadør' : 'Community Leader / Executive Networker'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  {locale === 'no' ? 'Kort om ditt nettverk / rekkevidde (valgfritt)' : 'Audience / Network Reach (Optional)'}
                </label>
                <input
                  type="text"
                  value={reach}
                  onChange={(e) => setReach(e.target.value)}
                  placeholder={locale === 'no' ? 'F.eks. «Aktiv salgsagent med 40 bedriftskunder», «Reiseblogg med 5000 lesere» osv.' : 'e.g. "B2B broker with 30 corporate clients", "Travel newsletter with 10k subscribers"'}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>
                  {locale === 'no' ? 'Send Søknad & Få Din Partnerlenke' : 'Submit Application & Generate Partner Link'}
                </span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

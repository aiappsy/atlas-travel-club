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

export default function PartnersPage() {
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
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Atlas Partner &amp; Affiliate Network</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Bygg en Passiv Årsinntekt (ARR) <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              i Verdens Største Bransje.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Reisebransjen omsetter for over 15 000 milliarder kroner årlig. Atlas gir deg en unik dobbel inntektsmotor: <strong>270 kr per direkte B2C-medlem</strong>, <strong>90 kr i squad override</strong>, OG <strong>20 % årlig provisjon på bedriftsavtaler</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#kalkulator"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Simuler Din Inntekt</span>
            </a>
            <a
              href="#bli-partner"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Søk Partnerstatus</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Dobbel Inntektsmotor (B2C + B2B) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            To Komplementære Inntektsstrømmer
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Den Doble Inntektsmotoren
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Kombiner rask viral vekst på privatmarkedet med store, lukrative B2B-bedriftskontrakter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Engine 1: B2C Viral */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Strøm 1: B2C &quot;3 &amp; Free&quot; + 2-Tier ARR</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Når dine kontakter sparer tusenlapper på sin aller første hotellovernatting, verver de andre. Du tjener penger på hvert eneste ledd.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>3 &amp; Free:</strong> Verv 3 medlemmer $\rightarrow$ ditt eget medlemskap (990 kr) er 100 % gratis for alltid.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>270 kr per medlem/år:</strong> Fra medlem 4 og oppover får du 270 kr i ren kontantprovisjon hvert eneste år.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>90 kr Squad Override:</strong> For hvert medlem som verves av personene i ditt team (Tier 2), får du 90 kr/år passivt.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Null MLM-stigma • Kun 2 nivåer • Ekte spareprodukt
            </div>
          </div>

          {/* Engine 2: B2B Enterprise */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Strøm 2: B2B Bedrifts- &amp; Gruppelisenser</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Salgsagentens drøm: Gå i ett enkelt møte med en daglig leder eller HR-sjef og selg 50–250 medlemskap i ett enkelt salg.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>20 % Gjentakende Provisjon:</strong> Du mottar 20 % av hele bedriftens årsfaktura så lenge de fornyer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Én bedrift på 50 ansatte:</strong> Gir deg ca. <strong>4 900 kr hvert eneste år</strong> fra én signert kontrakt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Én bedrift på 200 ansatte:</strong> Gir deg ca. <strong>14 000 kr hvert eneste år</strong> i ren passiv inntekt.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              Perfekt for agenter på Agenturer.no &amp; B2B-selgere
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interaktiv Partner-Kalkulator */}
      <section id="kalkulator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
              Inntekts-Simulator
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Hvor mye kan du tjene som partner?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Juster glidebryterne nedenfor for å se din estimerte årlige og månedlige provisjon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Slider 1: Direct B2C */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Direkte Medlemmer (B2C):</span>
                <span className="text-amber-400 font-mono font-black text-sm">{directMembers} stk</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={directMembers}
                onChange={(e) => setDirectMembers(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-[10px] text-slate-500 block">270 kr/medlem/år (etter 3)</span>
            </div>

            {/* Slider 2: Squad Tier 2 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Squad Medlemmer (Tier 2):</span>
                <span className="text-sky-400 font-mono font-black text-sm">{tier2Members} stk</span>
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
              <span className="text-[10px] text-slate-500 block">90 kr/medlem/år</span>
            </div>

            {/* Slider 3: B2B Deals */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-300">Bedriftsavtaler (snitt 50 ansatte):</span>
                <span className="text-emerald-400 font-mono font-black text-sm">{corporateDeals} bedrifter</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={corporateDeals}
                onChange={(e) => setCorporateDeals(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="text-[10px] text-slate-500 block">20% årlig provisjon per bedrift</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-2 border-amber-400/80 max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">B2C Direkte</span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {earnings.b2cDirectAnnualIncomeNok.toLocaleString()} kr
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Tier 2 Squad Override</span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {earnings.b2cTier2AnnualIncomeNok.toLocaleString()} kr
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">B2B Bedrifts-ARR</span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {earnings.b2bCorporateAnnualIncomeNok.toLocaleString()} kr
                </div>
              </div>

              <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">Månedlig Snitt</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                  {earnings.monthlyAverageNok.toLocaleString()} kr
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block">TOTAL ESTIMERT ÅRSINNTEKT (ARR):</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  {earnings.totalAnnualIncomeNok.toLocaleString()} NOK / år
                </div>
              </div>

              <a
                href="#bli-partner"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Søk Partnerstatus for å Starte</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fintech Utbetalinger (Wise Platform) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Automatisert Fintech Oppgjør
            </div>
            <h3 className="text-xl font-black text-white">
              Direkte Utbetaling via Wise Payouts API
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Glem forsinkede provisjoner eller manuell fakturering. Dine provisjoner overføres automatisk hver måned direkte til din norske bankkonto, Revolut eller Wise-konto i NOK eller EUR. Full MVA- og skattedokumentasjon genereres automatisk.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-400 shrink-0">
            <div className="text-emerald-400 font-bold">✓ Månedlig fast utbetaling</div>
            <div>✓ Ingen gebyrer på utbetaling</div>
            <div>✓ Eget partnerdashboard med sanntidsstatistikk</div>
          </div>
        </div>
      </section>

      {/* 5. Søknadsskjema (Bli Partner) */}
      <section id="bli-partner" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Bli Godkjent Atlas Partner
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Registrer deg nedenfor for å motta din personlige partnerlenke og tilgang til partner-dashboardet.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-black text-white">Søknad Mottatt &amp; Partnerstatus Opprettet!</h4>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                Takk, {fullName}! Vi har registrert din profil under Atlas Partner Network. Du mottar en e-post på {email} med din personlige partnerlenke og tilgang til partner-dashboardet innen kort tid.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4 max-w-2xl mx-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Fullt Navn
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ola Nordmann"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    E-postadresse
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ola@eksempel.no"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+47 900 00 000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Partnerprofil / Fokusområde
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  >
                    <option value="b2b_agent">B2B Salgsagent (Agenturer.no / Bedriftssalg)</option>
                    <option value="digital_creator">Digital Skaper / Reiseliv / Influencer</option>
                    <option value="travel_professional">Reiseleder / Konsulent / Forening</option>
                    <option value="community_leader">Nettverksbygger / Ambassadør</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Kort om ditt nettverk / rekkevidde (valgfritt)
                </label>
                <input
                  type="text"
                  value={reach}
                  onChange={(e) => setReach(e.target.value)}
                  placeholder="F.eks. 'Aktiv salgsagent med 40 bedriftskunder', 'Reiseblogg med 5000 lesere' etc."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Send Søknad &amp; Få Din Partnerlenke</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

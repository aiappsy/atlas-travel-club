'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  TrendingDown,
  Users,
  CheckCircle2,
  ArrowRight,
  Plane,
  Calculator,
  Lock,
  Mail,
  Send,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INITIAL_B2B_ORGANIZATIONS, calculateB2BSavings } from '@/modules/b2b/organizations';
import { useLanguage } from '@/context/LanguageContext';

export default function B2BLandingPage() {
  const { locale } = useLanguage();
  const [employeeCount, setEmployeeCount] = useState<number>(50);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [agreementType, setAgreementType] = useState<'employer_sponsored' | 'member_benefit'>('employer_sponsored');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const estimate = calculateB2BSavings(employeeCount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 font-sans">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>
              {locale === 'no' ? 'B2B Enterprise & Organisasjonsavtaler' : 'B2B Enterprise & Corporate Travel Agreements'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            {locale === 'no' ? (
              <>
                Kutt Bedriftens Reisekostnader med 30–50%. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  Direkte Engrosavtaler Uten Mellomledd.
                </span>
              </>
            ) : (
              <>
                Slash Corporate Travel Spend by 30–50%. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
                  Direct Wholesale Clearing Without Intermediaries.
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {locale === 'no' ? (
              <>
                Offentlige bookingsider legger på 20 %–45 % i markedsføringspåslag.{' '}
                <strong>Atlas Enterprise</strong> gir bedrifter, fagforeninger og organisasjoner en lukket,
                co-branded portal med direkte tilgang til B2B hotellgrossister og flyselskapenes NDC-nettopriser.
              </>
            ) : (
              <>
                Public retail booking portals inflate rates by 20%–45% to cover ad spend.{' '}
                <strong>Atlas Enterprise</strong> equips companies, unions, and member associations with a private,
                co-branded clearing portal directly connected to B2B hotel bedbanks and airline NDC net airfares.
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#kalkulator"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{locale === 'no' ? 'Beregn Bedriftens Besparelse' : 'Calculate Corporate Savings'}</span>
            </a>
            <a
              href="#demo-portaler"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{locale === 'no' ? 'Se Eksempel-Portaler' : 'View Showcase Portals'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interaktiv Spare-Kalkulator */}
      <section id="kalkulator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
              {locale === 'no' ? 'Interaktiv ROI-Beregning' : 'Interactive Corporate ROI Engine'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {locale === 'no' ? 'Hva kan din organisasjon spare?' : 'What Can Your Organization Save?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {locale === 'no'
                ? 'Dra i glidebryteren for å angi antall ansatte eller medlemmer som skal ha tilgang.'
                : 'Adjust the slider to configure the number of employees or members receiving wholesale credentials.'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-300">
                {locale === 'no' ? 'Antall lisenser / ansatte:' : 'Active employee / member seats:'}
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono bg-slate-950 px-4 py-1 rounded-xl border border-slate-800">
                {employeeCount} {locale === 'no' ? 'ansatte' : 'employees'}
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>10 {locale === 'no' ? 'ansatte' : 'seats'}</span>
              <span>100 {locale === 'no' ? 'ansatte' : 'seats'}</span>
              <span>250 {locale === 'no' ? 'ansatte' : 'seats'}</span>
              <span>500+ {locale === 'no' ? 'ansatte' : 'seats'}</span>
            </div>
          </div>

          {/* Results Display Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {locale === 'no' ? 'Lisenspris per ansatt' : 'Annual License Per Seat'}
              </span>
              <div className="text-2xl font-black text-white font-mono">
                {locale === 'no' ? `${estimate.annualCostPerSeatNok} kr` : `$${Math.round(estimate.annualCostPerSeatNok / 10.5)}`}
              </div>
              <span className="text-[10px] text-slate-500">
                {locale === 'no' ? 'per år (eks. mva)' : 'per year / seat'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {locale === 'no' ? 'Total Årskostnad' : 'Total Annual Cost'}
              </span>
              <div className="text-2xl font-black text-slate-300 font-mono">
                {locale === 'no'
                  ? `${estimate.totalAnnualCostNok.toLocaleString()} kr`
                  : `$${Math.round(estimate.totalAnnualCostNok / 10.5).toLocaleString()}`}
              </div>
              <span className="text-[10px] text-slate-500">
                {locale === 'no' ? 'samlet årsfaktura' : 'combined corporate invoice'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                {locale === 'no' ? 'Estimert Reisesparing' : 'Estimated Travel Savings'}
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {locale === 'no'
                  ? `${estimate.netEstimatedAnnualSavingsNok.toLocaleString()} kr`
                  : `$${Math.round(estimate.netEstimatedAnnualSavingsNok / 10.5).toLocaleString()}`}
              </div>
              <span className="text-[10px] text-emerald-300/80">
                {locale === 'no' ? 'netto besparelse / år' : 'net wholesale savings / yr'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                {locale === 'no' ? 'Forventet ROI' : 'Projected ROI'}
              </span>
              <div className="text-2xl font-black text-amber-400 font-mono">{estimate.estimatedRoiRatio}x</div>
              <span className="text-[10px] text-amber-300/80">
                {locale === 'no' ? 'avkastning på avtalen' : 'return on agreement cost'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Commercial Models */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            {locale === 'no' ? 'Fleksible Løsninger' : 'Flexible Commercial Models'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {locale === 'no' ? 'Velg Avtalemodell for Din Organisasjon' : 'Select Agreement Structure For Your Organization'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Model 1: Corporate Fleet */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {locale === 'no'
                  ? 'Modell 1: Bedriftsavtale (Tjenestereiser & Ansattgode)'
                  : 'Model 1: Employer-Sponsored (Corporate Travel & Executive Benefit)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'Bedriften dekker lisensene sentralt på samlefaktura. Ansatte logger automatisk inn med sin bedrifts-e-post og bestiller reiser med 0 % påslag, direkte koblet til bedriftens MVA-regnskap.'
                  : 'The employer sponsors seat licenses centrally on a unified annual invoice. Employees authenticate with corporate SSO/@company.com email and book at net wholesale zero-markup rates.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Volumrabatt fra 10 ansatte (ned til 350 kr/sete/år)'
                      : 'Tiered volume pricing starting at 10 seats ($35/seat/year)'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Ansatte kan også bruke avtalen til egne private ferier'
                      : 'Dual-use: Employees may also use credentials for private leisure holidays'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Inkluderer 24/7 EU261 forsinkelsesovervåking for hele staben'
                      : 'Includes 24/7 automated EU261 flight delay recovery for company personnel'}
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#kontakt"
              onClick={() => setAgreementType('employer_sponsored')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
            >
              {locale === 'no' ? 'Velg Bedriftsavtale ➔' : 'Select Employer Agreement ➔'}
            </a>
          </div>

          {/* Model 2: Member Benefit */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {locale === 'no'
                  ? 'Modell 2: Organisasjonsfordel (Fagforening & Forbund)'
                  : 'Model 2: Affinity & Union Benefit (Labor Unions & Trade Associations)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {locale === 'no'
                  ? 'For fagforeninger, bransjeforeninger og interesseorganisasjoner. Koster 0 kr for organisasjonen. Medlemmene tilbys Atlas Travel Club som en eksklusiv fordel med 35–40 % rabatt via dedikert portal.'
                  : 'Tailored for labor unions, industry associations, and member clubs. Zero budget impact for the organization. Members receive access to a private branded portal at deep group wholesale discounts.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Null økonomisk risiko eller kostnad for forbundet'
                      : 'Zero financial exposure or upfront capital required for the association'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Styrker medlemsrekruttering og lojalitet'
                      : 'Significantly improves member recruitment, retention, and loyalty'}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {locale === 'no'
                      ? 'Mulighet for royalty eller organisasjonsbidrag'
                      : 'Optional affinity royalty or community endowment rebate mechanism'}
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#kontakt"
              onClick={() => setAgreementType('member_benefit')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
            >
              {locale === 'no' ? 'Velg Organisasjonsfordel ➔' : 'Select Association Benefit ➔'}
            </a>
          </div>
        </div>
      </section>

      {/* 4. Showcase Portals */}
      <section id="demo-portaler" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            {locale === 'no' ? 'Live Eksempler' : 'Live Showcase Portals'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {locale === 'no' ? 'Slik ser en Co-Branded Bedriftsportal ut' : 'Explore Dedicated Co-Branded Portals'}
          </h2>
          <p className="text-xs text-slate-400">
            {locale === 'no'
              ? 'Hver bedrift eller forening får sin egen dedikerte portal med egen logo, velkomsthilsen og e-post-godkjenning.'
              : 'Each organization receives an authenticated corporate hub complete with distinct logos, custom welcome ribbons, and verified domain routing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INITIAL_B2B_ORGANIZATIONS.map((org) => (
            <Link
              key={org.id}
              href={`/b2b/portal/${org.slug}`}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 transition-all block group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">
                  {org.name}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {org.tagline}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  {locale === 'no' ? 'Tillatte e-poster:' : 'Allowed domain:'}
                </span>
                <span className="font-mono text-emerald-400">@{org.allowedEmailDomains[0]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Contact Form */}
      <section id="kontakt" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {locale === 'no' ? 'Få et Uforpliktende Tilbud til Din Bedrift' : 'Request a Non-Binding Corporate Proposal'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {locale === 'no'
                ? 'Fyll ut skjemaet nedenfor, så setter vi opp en gratis testportal for din organisasjon innen 24 timer.'
                : 'Fill out the form below to receive customized volume pricing and a sandbox test portal within 24 business hours.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-black text-white">
                {locale === 'no' ? 'Takk for din henvendelse!' : 'Proposal Request Received!'}
              </h4>
              <p className="text-xs text-emerald-200/90 max-w-md mx-auto">
                {locale === 'no'
                  ? `Vi har mottatt forespørselen for ${companyName || 'din organisasjon'}. En rådgiver kontakter deg på ${contactEmail} for oppsett av testportalen.`
                  : `We have received your corporate inquiry for ${companyName || 'your organization'}. An enterprise advisor will contact you at ${contactEmail} with staging portal credentials.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Bedrift / Organisasjon' : 'Company / Organization'}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={locale === 'no' ? 'F.eks. DNB ASA, Tekna, Norsk Industri' : 'e.g. Acme Corp, Global Union'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Kontaktperson (Navn & Stilling)' : 'Contact Person (Name & Title)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={locale === 'no' ? 'Ola Nordmann (HR-sjef / Daglig leder)' : 'Jane Doe (Head of People / CFO)'}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Jobb E-post' : 'Corporate Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    {locale === 'no' ? 'Telefonnummer' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+47 900 00 000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  {locale === 'no' ? 'Ønsket Avtalemodell' : 'Preferred Commercial Model'}
                </label>
                <select
                  value={agreementType}
                  onChange={(e) => setAgreementType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-400"
                >
                  <option value="employer_sponsored">
                    {locale === 'no'
                      ? 'Modell 1: Bedriften betaler for de ansatte (Tjenestereiser & goder)'
                      : 'Model 1: Employer-Sponsored (Corporate Travel & Employee Benefit)'}
                  </option>
                  <option value="member_benefit">
                    {locale === 'no'
                      ? 'Modell 2: Organisasjonsfordel (Fagforening / rabattkode for medlemmene)'
                      : 'Model 2: Affinity / Union Benefit (Discounts for members)'}
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>
                  {locale === 'no' ? 'Send Forespørsel om Bedriftsavtale' : 'Submit Enterprise Proposal Request'}
                </span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

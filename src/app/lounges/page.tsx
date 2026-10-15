'use client';

import React, { useState, useEffect } from 'react';
import {
  Coffee,
  Zap,
  Utensils,
  Wifi,
  Sparkles,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  QrCode,
  X,
  CreditCard,
  Info,
  Car,
  HeartPulse,
  TrendingDown
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  DragonPassLounge,
  DragonPassFastTrack,
  DragonPassDiningOffer,
  DragonPassEsimPackage,
  DragonPassSpaService,
  DragonPassTransferQuote,
  DragonPassUniversalVoucher
} from '@/lib/providers/dragonpass';

export default function AirportPerksPage() {
  const { convertPrice, formatPrice } = useCurrency();
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const [activeTab, setActiveTab] = useState<'lounges' | 'fast_track' | 'dining' | 'esim' | 'spa' | 'transfers'>('lounges');
  const [selectedAirport, setSelectedAirport] = useState('NCE');
  const [loading, setLoading] = useState(true);

  // Data states
  const [lounges, setLounges] = useState<DragonPassLounge[]>([]);
  const [fastTrack, setFastTrack] = useState<DragonPassFastTrack[]>([]);
  const [dining, setDining] = useState<DragonPassDiningOffer[]>([]);
  const [esim, setEsim] = useState<DragonPassEsimPackage[]>([]);
  const [spa, setSpa] = useState<DragonPassSpaService[]>([]);
  const [transfers, setTransfers] = useState<DragonPassTransferQuote[]>([]);

  // Modal Voucher State
  const [activeModalItem, setActiveModalItem] = useState<{
    category: any;
    id: string;
    title: string;
    costGbp: number;
    savingsGbp: number;
    details: string;
  } | null>(null);
  const [issuedVoucher, setIssuedVoucher] = useState<DragonPassUniversalVoucher | null>(null);
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    async function fetchPerks() {
      setLoading(true);
      try {
        const res = await fetch(`/api/airport/search?iata=${selectedAirport}`);
        const json = await res.json();
        if (json.data) {
          setLounges(json.data.lounges || []);
          setFastTrack(json.data.fastTrack || []);
          setDining(json.data.dining || []);
          setEsim(json.data.esim || []);
          setSpa(json.data.spa || []);
          setTransfers(json.data.transfers || []);
        }
      } catch (err) {
        console.error('Failed to fetch airport perks:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPerks();
  }, [selectedAirport]);

  const handleIssueVoucher = async () => {
    if (!activeModalItem) return;
    setIssuing(true);
    try {
      const res = await fetch('/api/airport/voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceCategory: activeModalItem.category,
          serviceId: activeModalItem.id,
          memberId: 'mem_atlas_prime',
          guestName: 'Atlas Medlem',
          airportCode: selectedAirport,
        }),
      });
      const data = await res.json();
      if (data.voucher) {
        setIssuedVoucher(data.voucher);
      }
    } catch (err) {
      console.error('Failed to issue voucher:', err);
    } finally {
      setIssuing(false);
    }
  };

  const AIRPORTS = [
    { code: 'NCE', name: 'Nice Côte d\'Azur (NCE)' },
    { code: 'OSL', name: 'Oslo Gardermoen (OSL)' },
    { code: 'LHR', name: 'London Heathrow (LHR)' },
    { code: 'DXB', name: 'Dubai International (DXB)' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Light Luxury Header */}
      <div className="bg-white border-b border-slate-200/80 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {isNo ? 'VIP-flyplasstjenester • DragonPass-partner' : 'Atlas Airport VIP Ecosystem • DragonPass Partner'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isNo ? 'Alt du trenger på flyplassen' : 'Complete VIP Airport Experience'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isNo
              ? 'Få tilgang til over 1 400 lounger, Fast Track, restaurantfordeler og global eSIM til ekte nettopriser. Uten påslag eller dyre kredittkortgebyrer.'
              : 'Direct wholesale rates on airport lounges, Fast Track security, terminal dining discounts, global eSIM roaming, and in-terminal spa services. 100% zero markup.'}
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">{isNo ? '0 kr i påslag' : '0% Markup'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">{isNo ? 'Spar opptil 60 %' : 'Save up to 60%'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <QrCode className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">{isNo ? 'Digitalt QR-pass' : 'Instant QR Pass'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">{isNo ? 'Umiddelbar tilgang' : 'On-Demand'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Disclosure: Why 0 kr Markup on Ancillaries? */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                {isNo ? 'Hvorfor tar ikke Atlas påslag på flyplasstjenester?' : 'Why zero markup on airport perks?'}
              </div>
              <div className="text-xs text-slate-700 leading-relaxed mt-0.5">
                {isNo
                  ? 'Atlas er en lukket medlemsklubb og tjener utelukkende på årskontingenten. Derfor formidler vi flyplasstjenester til direkte engrospriser. En familie på fire sparer ofte over 2 500 kr på lounge, Fast Track og eSIM på en enkelt reise.'
                  : 'As an exclusive club, Atlas monetizes via annual memberships. We pass 100% of DragonPass wholesale net pricing directly to members without markups, proving immediate ROI.'}
              </div>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
            {isNo ? '100 % B2B-engrospris' : '100% Net Wholesale'}
          </span>
        </div>
      </div>

      {/* Main Content Hub */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Controls: Airport Selector & 6 Service Tabs */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isNo ? 'Velg flyplass:' : 'Select Airport:'}
              </span>
              <select
                value={selectedAirport}
                onChange={(e) => setSelectedAirport(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
              >
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="text-xs font-semibold text-slate-500">
              {isNo ? 'Partnernettverk: 1 400+ lounger • 200+ flyplasser med Fast Track' : 'Global Network: 1,400+ Lounges • 200+ Fast Track Lanes'}
            </div>
          </div>

          {/* 6 Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('lounges')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'lounges'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>{isNo ? 'Lounger' : 'Lounges'}</span>
            </button>

            <button
              onClick={() => setActiveTab('fast_track')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'fast_track'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Fast Track</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'dining'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{isNo ? 'Restauranter' : 'Dining'}</span>
            </button>

            <button
              onClick={() => setActiveTab('esim')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'esim'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Global eSIM</span>
            </button>

            <button
              onClick={() => setActiveTab('spa')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'spa'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>{isNo ? 'Spa & Hvile' : 'Spa & Pods'}</span>
            </button>

            <button
              onClick={() => setActiveTab('transfers')}
              className={`p-3 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                activeTab === 'transfers'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>{isNo ? 'Sjåfør / Transfer' : 'Transfers'}</span>
            </button>
          </div>
        </div>

        {/* Content Section by Active Tab */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold">{isNo ? 'Henter flyplasstjenester fra DragonPass...' : 'Loading services from DragonPass...'}</p>
          </div>
        ) : (
          <div>
            {/* 1. LOUNGES */}
            {activeTab === 'lounges' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lounges.map((l) => (
                  <div key={l.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img src={l.imageUrl} alt={l.name} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {isNo ? `Spar £${l.memberSavingsGbp.toFixed(2)}` : `Save £${l.memberSavingsGbp.toFixed(2)}`}
                        </span>
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200">
                          {l.terminal}
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-black text-slate-900 text-base">{l.name}</h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          {l.openingHours} • Maks {l.maxStayHours} timer
                        </p>
                        <div className="flex flex-wrap gap-1 text-[10px] text-slate-600 pt-1">
                          {l.facilities.slice(0, 3).map((f, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">✓ {f}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">Drop-in: £{l.publicWalkUpPriceGbp.toFixed(2)}</div>
                        <div className="text-xl font-black text-slate-900">£{l.memberPriceGbp.toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{isNo ? '0 kr påslag • Ren B2B pris' : 'Zero markup • Net rate'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'lounge',
                            id: l.id,
                            title: l.name,
                            costGbp: l.memberPriceGbp,
                            savingsGbp: l.memberSavingsGbp,
                            details: `${l.terminal} • ${l.locationDetails}`,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1"
                      >
                        {isNo ? 'Hent pass' : 'Get Pass'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. FAST TRACK */}
            {activeTab === 'fast_track' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fastTrack.map((ft) => (
                  <div key={ft.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                          {ft.laneType}
                        </span>
                        <span className="text-xs text-emerald-700 font-bold">
                          {isNo ? `Gj.snitt ventetid: ${ft.avgWaitTimeMins} min` : `Wait time: ${ft.avgWaitTimeMins}m`}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg">{ft.airportName}</h3>
                        <p className="text-xs text-slate-500 mt-1">{ft.terminal} • {ft.locationDetails}</p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo
                          ? 'Gå rett forbi de ordinære sikkerhetskøene med digitalt Fast Track boarding-pass. Skannes direkte ved prioritetsporten.'
                          : 'Bypass general security lines with priority gate access. Instant mobile barcode scan.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">Flyplasspris: £{ft.publicWalkUpPriceGbp.toFixed(2)}</div>
                        <div className="text-xl font-black text-slate-900">£{ft.memberPriceGbp.toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{isNo ? 'Spar over 50 %' : 'Save over 50%'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'fast_track',
                            id: ft.id,
                            title: `Fast Track Security (${ft.airportCode})`,
                            costGbp: ft.memberPriceGbp,
                            savingsGbp: ft.memberSavingsGbp,
                            details: `${ft.terminal} • ${ft.locationDetails}`,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1"
                      >
                        {isNo ? 'Hent pass' : 'Get Pass'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. DINING */}
            {activeTab === 'dining' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dining.map((d) => (
                  <div key={d.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {d.discountPct}% Medlemsrabatt
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{d.cuisineType}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-xl">{d.restaurantName}</h3>
                      <p className="text-xs text-slate-500">{d.terminal} • {d.locationDetails}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo
                          ? 'Vis ditt digitale Atlas DragonPass-kort ved bestilling for å motta umiddelbar rabatt på mat og alkoholfri drikke.'
                          : 'Present your digital DragonPass in the terminal to receive instant dining discounts.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                      <div className="text-xs font-bold text-emerald-700">
                        {isNo ? 'Inkludert for alle Atlas-medlemmer (0 kr)' : 'Included with Atlas Membership (Free)'}
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'dining',
                            id: d.id,
                            title: d.restaurantName,
                            costGbp: 0,
                            savingsGbp: d.estimatedSavingsGbp,
                            details: `${d.terminal} • ${d.discountPct}% rabattkupong`,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs"
                      >
                        {isNo ? 'Hent kupong' : 'Show Voucher'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. ESIM */}
            {activeTab === 'esim' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {esim.map((e) => (
                  <div key={e.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800 border border-sky-300">
                          {e.dataAllowanceGb} GB Høyhastighet ({e.networkType})
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{e.validityDays} dagers gyldighet</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-xl">{e.countryOrRegion}</h3>
                      <p className="text-xs text-slate-500">Støttede nettverk: {e.supportedCarriers.join(', ')}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo
                          ? 'Aktiveres umiddelbart med QR-kode i telefonen. Null roaminggebyrer, ingen fysisk SIM-kortskifte.'
                          : 'Instant eSIM activation via QR code. Zero roaming charges, reliable 5G data abroad.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">Butikkpris: £{e.publicRetailPriceGbp.toFixed(2)}</div>
                        <div className="text-xl font-black text-slate-900">£{e.memberPriceGbp.toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{isNo ? `Spar £${e.memberSavingsGbp.toFixed(2)} (Ren engros)` : 'Pure wholesale rate'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'esim',
                            id: e.id,
                            title: `eSIM ${e.countryOrRegion} (${e.dataAllowanceGb} GB)`,
                            costGbp: e.memberPriceGbp,
                            savingsGbp: e.memberSavingsGbp,
                            details: `${e.validityDays} dager • ${e.networkType}`,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1"
                      >
                        {isNo ? 'Aktiver eSIM' : 'Activate eSIM'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. SPA & REST PODS */}
            {activeTab === 'spa' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spa.map((s) => (
                  <div key={s.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-300">
                          {s.treatmentType} ({s.durationMinutes} min)
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">{s.facilityName}</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-xl">{s.treatmentName}</h3>
                      <p className="text-xs text-slate-500">{s.terminal}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo
                          ? 'Gjenopprett energien før en langdistanseflyvning med profesjonell massasje eller privat lydisolert hvilekapsel.'
                          : 'Recharge before take-off with professional treatments or soundproof private sleep pods.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">Walk-up: £{s.publicWalkUpPriceGbp.toFixed(2)}</div>
                        <div className="text-xl font-black text-slate-900">£{s.memberPriceGbp.toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{isNo ? `Spar £${s.memberSavingsGbp.toFixed(2)}` : 'Exclusive B2B rate'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'spa',
                            id: s.id,
                            title: s.treatmentName,
                            costGbp: s.memberPriceGbp,
                            savingsGbp: s.memberSavingsGbp,
                            details: `${s.facilityName} (${s.terminal})`,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1"
                      >
                        {isNo ? 'Reserver Spa' : 'Book Spa'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. TRANSFERS */}
            {activeTab === 'transfers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {transfers.map((t) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-amber-400 border border-slate-700">
                          {t.vehicleClass}
                        </span>
                        <span className="text-xs text-emerald-700 font-bold">Fastpris dør-til-dør</span>
                      </div>
                      <h3 className="font-black text-slate-900 text-xl">{t.destinationCity}</h3>
                      <p className="text-xs text-slate-500">Maks {t.passengerCapacity} passasjerer • {t.luggageCapacity} kofferter</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isNo
                          ? 'Inkluderer VIP Meet & Greet i ankomsthallen med navneskilt og automatisk flysporing ved forsinkelser.'
                          : 'Includes airport meet & greet with personalized paging and flight delay tracking.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">Taxi / OTA: £{t.publicTaxiOrOtaPriceGbp.toFixed(2)}</div>
                        <div className="text-xl font-black text-slate-900">£{t.memberPriceGbp.toFixed(2)}</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{isNo ? `Spar £${t.memberSavingsGbp.toFixed(2)}` : 'Direct B2B Quote'}</div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalItem({
                            category: 'transfer',
                            id: t.id,
                            title: `Chauffeur Transfer (${t.destinationCity})`,
                            costGbp: t.memberPriceGbp,
                            savingsGbp: t.memberSavingsGbp,
                            details: t.vehicleClass,
                          });
                          setIssuedVoucher(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1"
                      >
                        {isNo ? 'Bestill Sjåfør' : 'Book Chauffeur'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Voucher / Booking Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-lg"
            >
              ✕
            </button>

            {!issuedVoucher ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700">
                    {isNo ? 'Bekreft bestilling' : 'Confirm Service'}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-0.5">{activeModalItem.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{activeModalItem.details}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>{isNo ? 'DragonPass B2B-engrospris:' : 'DragonPass Wholesale:'}</span>
                    <span className="font-bold text-slate-900">£{activeModalItem.costGbp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>{isNo ? 'Atlas-påslag:' : 'Atlas Club Markup:'}</span>
                    <span>0 kr (0.00%)</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black border-t border-slate-200/70 pt-2 text-sm">
                    <span>{isNo ? 'Du betaler:' : 'Total Due:'}</span>
                    <span>£{activeModalItem.costGbp.toFixed(2)}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold text-right">
                    {isNo ? `Du sparer £${activeModalItem.savingsGbp.toFixed(2)} mot ordinær dørpris` : `Save £${activeModalItem.savingsGbp.toFixed(2)} vs airport desk`}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                  >
                    {isNo ? 'Avbryt' : 'Cancel'}
                  </button>
                  <button
                    onClick={handleIssueVoucher}
                    disabled={issuing}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs flex items-center justify-center gap-1.5"
                  >
                    {issuing ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        <span>{isNo ? 'Hent QR-pass' : 'Issue QR Pass'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-black">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{isNo ? 'Passet er klart!' : 'Voucher Ready!'}</h3>
                  <p className="text-xs text-slate-500 mt-1">{issuedVoucher.serviceName}</p>
                </div>

                {/* Simulated Digital Barcode / QR display */}
                <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3">
                  <div className="text-[11px] uppercase tracking-widest text-amber-400 font-black">
                    ATLAS • DRAGONPASS PASS
                  </div>
                  <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                    {/* Visual QR representation */}
                    <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx} className={`rounded-xs ${idx % 3 === 0 || idx === 0 || idx === 15 ? 'bg-amber-400' : 'bg-white'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-amber-300 font-bold tracking-wider">
                    {issuedVoucher.barcodeNumber}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Gyldig i 90 dager • Skannes direkte i terminalen
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalItem(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider"
                >
                  {isNo ? 'Ferdig' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

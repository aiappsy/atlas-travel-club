'use client';

import React, { useState } from 'react';
import { usePlatform } from '@/context/PlatformContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import { PROVIDER_INSTRUCTION_GUIDES, MOCK_NOMAD_VISAS, MOCK_VAULT_ACCOUNT, MOCK_VILLAS, MOCK_STATUS_MATCH_PROGRAMS, MOCK_FAST_TRACK_SERVICES, MOCK_CARD_ORDERS, MOCK_FLIGHT_CLAIMS, MOCK_PRIVATE_JETS, MOCK_PRICE_DROP_RECORDS, MOCK_YACHTS, MOCK_SUPERCARS } from '@/lib/mockData';
import {
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  CheckCircle2,
  Cloud,
  CreditCard,
  Truck,
  Plus,
  RefreshCw,
  Sparkles,
  Bot,
  Volume2,
  BookOpen,
  DollarSign,
  Lock,
  ExternalLink,
  Wifi,
  Package,
  Layers,
  Scale,
  HeartPulse,
  Plane,
  TrendingDown,
  Anchor,
  Gauge,
  Award,
  Castle,
  Coins,
  Laptop,
  Smartphone,
  QrCode
} from 'lucide-react';

export default function AdminPage() {
  const { features, updateFeatures, publishLive } = usePlatform();
  const { currency, setCurrency, currencies, updateExchangeRate } = useCurrency();
  const [activeTab, setActiveTab] = useState<
    'switchboard' | 'currency_engine' | 'nomad_hub' | 'vault_manager' | 'luxury_villas' | 'status_match' | 'fast_track' | 'yachts_supercars' | 'auto_rebooker' | 'private_jets' | 'flight_claims' | 'insurance' | 'visa_manager' | 'card_agent' | 'wallet_pass' | 'ai_studio' | 'guides' | 'suppliers' | 'paypal'
  >('switchboard');

  // Apple & Google Wallet Pass State
  const [applePassTypeId, setApplePassTypeId] = useState('pass.club.atlas.vip');
  const [appleTeamId, setAppleTeamId] = useState('ATLAS9941X');
  const [googleIssuerId, setGoogleIssuerId] = useState('3388000000022148192');
  const [nfcLoungeEnabled, setNfcLoungeEnabled] = useState(true);

  // Nomad Hub & Affiliates State
  const [sherpaApiKey, setSherpaApiKey] = useState('sherpa_live_partner_token_994182');
  const [outsiteAffiliateId, setOutsiteAffiliateId] = useState('outsite_aff_atlas_vip');
  const [wisePartnerId, setWisePartnerId] = useState('wise_aff_partner_994182');
  const [nordVpnToken, setNordVpnToken] = useState('nord_sec_aff_8841');

  // Travel Vault State
  const [profitPoolTotal, setProfitPoolTotal] = useState<number>(1420000);
  const [payoutTriggered, setPayoutTriggered] = useState(false);

  // Luxury Villas State
  const [villaApiKey, setVillaApiKey] = useState('le_collectionist_live_sec_881924');

  // Status Match State
  const [statusMatchKey, setStatusMatchKey] = useState('sm_enterprise_live_token_994182');

  // Fast-Track State
  const [diamondAirKey, setDiamondAirKey] = useState('diamond_air_live_sec_994182');

  // Yachts & Supercars State
  const [boatsetterKey, setBoatsetterKey] = useState('boatsetter_b2b_live_881924');

  // Auto-Rebooker State
  const [pruvoApiKey, setPruvoApiKey] = useState('pruvo_b2b_live_key_994182');

  // Private Jets State
  const [jetApiKey, setJetApiKey] = useState('luna_jets_live_partner_881920');

  // Flight Claims State
  const [airHelpApiKey, setAirHelpApiKey] = useState('ah_live_partner_token_994182');

  // Insurance State
  const [safetyWingKey, setSafetyWingKey] = useState('sw_live_sec_881920');

  // Visa Program Settings
  const [stripeSecretKey, setStripeSecretKey] = useState('sk_live_51P9824StripeIssuingKey...');

  // Card Fulfillment Agent Selector
  const [selectedCardAgent, setSelectedCardAgent] = useState<'alphacard' | 'plastic_printers' | 'plastic_resource' | 'in_house'>('alphacard');

  // AI Studio
  const [elevenLabsKey, setElevenLabsKey] = useState('el_live_key_99418247');

  // Active guide in knowledgebase
  const [selectedGuideId, setSelectedGuideId] = useState<string>('sherpa-nomad-visas');
  const activeGuide = PROVIDER_INSTRUCTION_GUIDES.find((g) => g.id === selectedGuideId) || PROVIDER_INSTRUCTION_GUIDES[0];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-24 font-sans">
      {/* Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white font-mono">
                  ATLAS Master Administration
                </h1>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Live v3.3 (Nomad Hub Active)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Independent Master Controller • Real-time Sync to Member Frontend
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/ATLAS_Owner_Master_Setup_Guide.pdf"
              download="ATLAS_Owner_Master_Setup_Guide.pdf"
              className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Download Setup PDF</span>
            </a>

            <div className="text-right hidden sm:block text-[11px] text-slate-400">
              Last Published: <span className="text-slate-200 font-mono">{features.lastPublishedAt}</span>
            </div>
            <button
              onClick={publishLive}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Publish Changes to Member Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2 scrollbar-none">
          {[
            { id: 'switchboard', label: 'Feature Switchboard', icon: Layers },
            { id: 'currency_engine', label: 'Currency & FX Engine', icon: DollarSign },
            { id: 'nomad_hub', label: 'Digital Nomad & Visas', icon: Laptop },
            { id: 'vault_manager', label: 'Travel Vault & Dividends', icon: Coins },
            { id: 'luxury_villas', label: 'Luxury Villas', icon: Castle },
            { id: 'status_match', label: 'Status Match', icon: Award },
            { id: 'fast_track', label: 'VIP Fast-Track', icon: Zap },
            { id: 'yachts_supercars', label: 'Yachts & Supercars', icon: Anchor },
            { id: 'auto_rebooker', label: 'Price-Drop Re-Booker', icon: TrendingDown },
            { id: 'private_jets', label: 'Private Jet Empty Legs', icon: Plane },
            { id: 'flight_claims', label: 'Delay Claims (AirHelp)', icon: Scale },
            { id: 'insurance', label: 'Travel Insurance', icon: HeartPulse },
            { id: 'visa_manager', label: 'Visa Prepaid Manager', icon: CreditCard },
            { id: 'card_agent', label: 'Card Fulfillment Agent', icon: Truck },
            { id: 'wallet_pass', label: 'Apple / Google Wallet', icon: Smartphone },
            { id: 'ai_studio', label: 'AI Concierge Studio', icon: Bot },
            { id: 'guides', label: 'Provider Instructions', icon: BookOpen },
            { id: 'suppliers', label: 'B2B Suppliers', icon: Globe },
            { id: 'paypal', label: 'PayPal Billing', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* TAB 1: LIVE FEATURE SWITCHBOARD */}
        {activeTab === 'switchboard' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  Live Platform Feature Switchboard
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instantly toggle which travel, nomad, luxury, and fintech services are active.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: 'enableHotels', label: 'Wholesale Hotel Engine', desc: '1,000,000+ B2B properties & rate parity comparison' },
                  { key: 'enableNomadHub', label: 'Digital Nomad & Visa Hub', desc: 'Global nomad visas, Schengen tracker & monthly coliving' },
                  { key: 'enableTravelVault', label: 'Travel Vault & Profit Dividends', desc: 'Closed-loop profit sharing cash paid onto Visa card' },
                  { key: 'enableLuxuryVillas', label: 'Curated Luxury Villas & Chalets', desc: 'Private estates with chef, butler & infinity pools' },
                  { key: 'enableStatusMatch', label: 'Elite Loyalty Status Matches', desc: 'Hilton Diamond, Marriott Platinum & Star Alliance Gold' },
                  { key: 'enableFastTrackImmigration', label: 'VIP Fast-Track Immigration', desc: 'Skip 2-hour customs lines in 3 mins at 500+ airports' },
                  { key: 'enableYachtsAndSupercars', label: 'Supercars & Yacht Charters', desc: 'Captained luxury motor yachts & Ferraris/Lamborghinis' },
                  { key: 'enableAutoRebooker', label: 'Autonomous Price-Drop Re-Booker', desc: '24/7 post-booking rate monitoring with auto-refund to Visa' },
                  { key: 'enableCruises', label: 'Wholesale Cruise Sailings', desc: 'Royal Caribbean, Celebrity, NCL + Free Onboard Credit' },
                  { key: 'enablePrivateJets', label: 'Private Jet Empty Leg Steals', desc: 'Up to 80% off private jet flights & whole aircraft charters' },
                ].map((item) => {
                  const isEnabled = (features as any)[item.key];
                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isEnabled
                          ? 'bg-slate-800/80 border-slate-700'
                          : 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm text-white">{item.label}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={(e) => updateFeatures({ [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: CURRENCY & INTERBANK FX ENGINE */}
        {activeTab === 'currency_engine' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-amber-400" />
                    Global Multi-Currency & Interbank FX Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage 8 supported global currencies, live interbank exchange rates, and 0% foreign transaction fee parameters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>0% FX Spread Active</span>
                  </span>
                </div>
              </div>

              {/* Currency Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.values(currencies).map((curr) => {
                  const isCurrent = currency === curr.code;
                  return (
                    <div
                      key={curr.code}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-amber-400/10 border-amber-400/50 shadow-lg shadow-amber-400/5'
                          : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{curr.flag}</span>
                          <div>
                            <div className="font-extrabold text-sm text-white font-mono flex items-center gap-1.5">
                              {curr.code}
                              {isCurrent && (
                                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-sans font-black">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{curr.name}</div>
                          </div>
                        </div>
                        <span className="text-sm font-black text-amber-300 font-mono bg-black/40 px-2 py-1 rounded-lg">
                          {curr.symbol}
                        </span>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-700/60">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Exchange Rate (per 1 USD)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            disabled={curr.code === 'USD'}
                            value={curr.rate}
                            onChange={(e) => updateExchangeRate(curr.code, parseFloat(e.target.value) || curr.rate)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 outline-none disabled:opacity-50"
                          />
                          <button
                            onClick={() => setCurrency(curr.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                              isCurrent
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                            }`}
                          >
                            {isCurrent ? 'Active' : 'Set'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Advanced FX Settings */}
              <div className="p-5 bg-black/30 rounded-2xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Global Rate Parity & Multi-Currency Rules
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-[11px]">Interbank FX Oracle</div>
                    <div className="font-bold text-emerald-400 mt-0.5">European Central Bank (ECB) 1-Min Poll</div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-[11px]">Club Markup Margin</div>
                    <div className="font-bold text-amber-400 mt-0.5">0.00% (Pure Interbank)</div>
                  </div>
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-[11px]">Auto Currency Detection</div>
                    <div className="font-bold text-sky-400 mt-0.5">Geo-IP & Browser Locale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL NOMAD & VISA HUB */}
        {activeTab === 'nomad_hub' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-teal-400" />
                    Sherpa & iVisa Global Mobility B2B API
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live digital nomad visa rules, embassy intake filing, and Schengen sentinel.
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold font-mono">
                  Connected
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    1. Sherpa / iVisa Partner Secret (Visas: $20–$75 Payout/Filing)
                  </label>
                  <input
                    type="password"
                    value={sherpaApiKey}
                    onChange={(e) => setSherpaApiKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">
                      2. Outsite / Selina Coliving ID ($50–$100 / 8-10%)
                    </label>
                    <input
                      type="text"
                      value={outsiteAffiliateId}
                      onChange={(e) => setOutsiteAffiliateId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">
                      3. Wise Multi-Currency Partner ID ($20–$50)
                    </label>
                    <input
                      type="text"
                      value={wisePartnerId}
                      onChange={(e) => setWisePartnerId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    4. NordVPN / ExpressVPN Security Token (40%–100% Commission)
                  </label>
                  <input
                    type="password"
                    value={nordVpnToken}
                    onChange={(e) => setNordVpnToken(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  />
                </div>

                <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
                  <div className="text-[11px] font-bold text-slate-300">
                    Nomad Revenue Flywheel:
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Members on the <strong>Global Nomad Passport ($29.99/mo)</strong> generate predictable subscription revenue while outbound visa filings and coliving bookings automatically credit your affiliate tracking IDs.
                  </div>
                </div>

                <button
                  onClick={() => alert('Digital Nomad & Visa Hub affiliate credentials updated successfully!')}
                  className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Laptop className="w-4 h-4" />
                  <span>Save Nomad Hub & Affiliate Credentials</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h4 className="text-sm font-black text-white">Active Nomad Visa Programs</h4>
              <div className="space-y-2 text-xs">
                {MOCK_NOMAD_VISAS.map((visa) => (
                  <div key={visa.id} className="p-3 bg-slate-800/80 rounded-xl flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{visa.flagEmoji}</span>
                        <span>{visa.country}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{visa.minMonthlyIncome}</div>
                    </div>
                    <span className="font-mono text-teal-400 font-bold">${visa.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRAVEL VAULT */}
        {activeTab === 'vault_manager' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-400" />
                    ATLAS Annual Profit Dividend Pool Manager
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Accumulated supplier overrides, card interchange fees, and B2B commissions.
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                  ${profitPoolTotal.toLocaleString()} Pool
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Current Platform Annual Profit Share Pool ($)
                  </label>
                  <input
                    type="number"
                    value={profitPoolTotal}
                    onChange={(e) => setProfitPoolTotal(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setPayoutTriggered(true);
                    alert('Annual Profit Dividend Batch Dispatch Triggered! Payouts credited to member Visa Cards.');
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>Execute Annual Profit Dividend Payout Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LUXURY VILLAS */}
        {activeTab === 'luxury_villas' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Castle className="w-5 h-5 text-amber-400" />
              Le Collectionist & Oliver's Travels Villa API
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Le Collectionist B2B Token</label>
                <input
                  type="password"
                  value={villaApiKey}
                  onChange={(e) => setVillaApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Villa settings saved!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save Villa Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: STATUS MATCH */}
        {activeTab === 'status_match' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              StatusMatch.com & Loylogic B2B API Bridge
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">StatusMatch B2B Secret</label>
                <input
                  type="password"
                  value={statusMatchKey}
                  onChange={(e) => setStatusMatchKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Status match settings saved!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save Status Match Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: FAST TRACK */}
        {activeTab === 'fast_track' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Diamond Air & Marhaba VIP Fast-Track API
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Diamond Air B2B Token</label>
                <input
                  type="password"
                  value={diamondAirKey}
                  onChange={(e) => setDiamondAirKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Fast track settings saved!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save Fast Track Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: YACHTS & SUPERCARS */}
        {activeTab === 'yachts_supercars' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Anchor className="w-5 h-5 text-amber-400" />
              Boatsetter & Blacklane Exotic Fleet APIs
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Boatsetter Partner Key</label>
                <input
                  type="password"
                  value={boatsetterKey}
                  onChange={(e) => setBoatsetterKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Fleet parameters saved!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save Fleet Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 8: AUTO REBOOKER */}
        {activeTab === 'auto_rebooker' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
              Autonomous Price-Drop Re-Booker Engine (Pruvo API)
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Pruvo B2B Token</label>
                <input
                  type="password"
                  value={pruvoApiKey}
                  onChange={(e) => setPruvoApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Auto-rebooker settings saved!')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
              >
                Save Re-Booker Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 9: PRIVATE JETS */}
        {activeTab === 'private_jets' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Plane className="w-5 h-5 text-amber-400" />
              Private Aviation & Empty Leg Charter API
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">LunaJets API Key</label>
                <input
                  type="password"
                  value={jetApiKey}
                  onChange={(e) => setJetApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Private jet parameters updated!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save Jet Parameters
              </button>
            </div>
          </div>
        )}

        {/* TAB 10: FLIGHT CLAIMS */}
        {activeTab === 'flight_claims' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Flight Delay Compensation Enforcement (AirHelp)
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">AirHelp Partner Token</label>
                <input
                  type="password"
                  value={airHelpApiKey}
                  onChange={(e) => setAirHelpApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('AirHelp settings saved!')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
              >
                Save AirHelp Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 11: INSURANCE */}
        {activeTab === 'insurance' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <HeartPulse className="w-6 h-6 text-emerald-400" />
              Travel Insurance API
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">SafetyWing API Partner Secret</label>
                <input
                  type="password"
                  value={safetyWingKey}
                  onChange={(e) => setSafetyWingKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Insurance settings saved!')}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
              >
                Save Insurance Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 12: VISA MANAGER */}
        {activeTab === 'visa_manager' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Co-Branded Rechargeable Visa Program
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Stripe Secret Key</label>
                <input
                  type="password"
                  value={stripeSecretKey}
                  onChange={(e) => setStripeSecretKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('Stripe Issuing credentials updated!')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
              >
                Save Visa Config
              </button>
            </div>
          </div>
        )}

        {/* TAB 13: CARD AGENT */}
        {activeTab === 'card_agent' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-400" />
              Physical Card Print & Mail Fulfillment Agent
            </h3>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'alphacard', name: 'AlphaCard Cloud API', cost: '$1.95/card + USPS stamp' },
                  { id: 'plastic_printers', name: 'PlasticPrinters.com API', cost: '$2.10/card turnkey' },
                ].map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedCardAgent(agent.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedCardAgent === agent.id
                        ? 'border-sky-500 bg-sky-950/40 text-white'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-white text-xs">{agent.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{agent.cost}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: APPLE & GOOGLE WALLET PASS ENGINE */}
        {activeTab === 'wallet_pass' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  Apple Wallet (.pkpass) & Google Pay Pass Configuration
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage cryptographic signing certificates and NFC tap credentials for mobile member passes.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pass Signing Active</span>
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Apple Pass Type Identifier</label>
                  <input
                    type="text"
                    value={applePassTypeId}
                    onChange={(e) => setApplePassTypeId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Apple Team Identifier</label>
                  <input
                    type="text"
                    value={appleTeamId}
                    onChange={(e) => setAppleTeamId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Google Wallet Issuer ID</label>
                  <input
                    type="text"
                    value={googleIssuerId}
                    onChange={(e) => setGoogleIssuerId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">NFC Lounge Terminal Verification</label>
                  <button
                    type="button"
                    onClick={() => setNfcLoungeEnabled(!nfcLoungeEnabled)}
                    className={`w-full py-2.5 px-4 rounded-xl border font-bold flex items-center justify-between transition-all ${
                      nfcLoungeEnabled
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>NFC Fast-Track Tap</span>
                    <span>{nfcLoungeEnabled ? 'ENABLED' : 'DISABLED'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase text-amber-300">Live Passbook Capabilities</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dynamic QR Check-in Token</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Apple Push Notification on Price Drop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Lock-Screen Airport Arrival Alert</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>0% Markup Closed-Loop Watermark</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Apple & Google Wallet pass credentials updated and published!')}
                className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Save Digital Pass Configurations
              </button>
            </div>
          </div>
        )}

        {/* TAB 14: AI STUDIO */}
        {activeTab === 'ai_studio' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              AI Concierge Studio (Gemini 3.7 Flash & ElevenLabs)
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">ElevenLabs Voice API Key</label>
                <input
                  type="password"
                  value={elevenLabsKey}
                  onChange={(e) => setElevenLabsKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('AI Studio settings saved!')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
              >
                Save AI Studio Parameters
              </button>
            </div>
          </div>
        )}

        {/* TAB 15: GUIDES */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                Select Provider Setup Guide:
              </h4>
              {PROVIDER_INSTRUCTION_GUIDES.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                    selectedGuideId === guide.id
                      ? 'bg-sky-950/60 border-sky-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-extrabold text-xs text-white">{guide.providerName}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{guide.category}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase text-sky-400 tracking-wider">{activeGuide.category}</span>
                  <h3 className="text-xl font-black text-white mt-0.5">{activeGuide.providerName}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/ATLAS_Owner_Master_Setup_Guide.pdf"
                    download="ATLAS_Owner_Master_Setup_Guide.pdf"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 w-fit"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Download Master PDF</span>
                  </a>
                  <a
                    href={activeGuide.portalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 w-fit"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider">Registration Requirements:</h4>
                <div className="space-y-1.5">
                  {activeGuide.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase text-sky-400 tracking-wider">Step-by-Step Instructions:</h4>
                <div className="space-y-2">
                  {activeGuide.stepByStepGuide.map((step, i) => (
                    <div key={i} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-200">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 16: SUPPLIERS */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Travelpayouts All-In-One Master Hub */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 border border-indigo-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    🌟 All-In-One Master Travel Network
                  </span>
                  <h4 className="font-black text-xl text-white mt-0.5">Travelpayouts Partner API & Marker</h4>
                  <p className="text-xs text-slate-300">
                    Powers Hotelbeds, Booking.com, SafetyWing, AirHelp, Airalo eSIMs & Viator with <strong>1 single master account & unified payout</strong>.
                  </p>
                </div>
                <a
                  href="https://www.travelpayouts.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 w-fit shrink-0"
                >
                  <span>Open Travelpayouts</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Travelpayouts Partner Marker / ID (e.g. 598421)
                  </label>
                  <input
                    type="text"
                    defaultValue="598421_ATLAS_VIP"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Travelpayouts Master API Token
                  </label>
                  <input
                    type="password"
                    defaultValue="tp_live_sec_token_99418247192"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => alert('Travelpayouts Master Partner Marker saved! All 100+ travel affiliate links updated.')}
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Save Travelpayouts Master Config
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Sherpa / iVisa B2B API', category: 'Digital Nomad Visas', key: 'sherpa_live_token_9941' },
                { name: 'Le Collectionist API', category: 'Luxury Villas & Chalets', key: 'le_collectionist_live_8819' },
                { name: 'StatusMatch.com API', category: 'Loyalty Status Matches', key: 'sm_live_token_994182' },
                { name: 'Diamond Air International', category: 'Airport Fast-Track VIP', key: 'diamond_live_key_994182' },
              ].map((sup, idx) => (
                <div key={idx} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-teal-400 tracking-wider">{sup.category}</span>
                      <h4 className="font-extrabold text-base text-white">{sup.name}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
                      Connected
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-800 p-2.5 rounded-xl">
                    API Key: {sup.key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 17: PAYPAL */}
        {activeTab === 'paypal' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-2xl mx-auto space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-emerald-400" />
              PayPal Express & Subscriptions
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">PayPal REST Client ID</label>
                <input
                  type="text"
                  value="AbC123_Sandbox_PayPal_ClientID_HotelClub"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                />
              </div>
              <button
                onClick={() => alert('PayPal settings saved!')}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
              >
                Save PayPal Credentials
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

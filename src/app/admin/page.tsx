'use client';

import React, { useState } from 'react';
import { usePlatform } from '@/context/PlatformContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';
import { ATLAS_OPERATOR_ROLES, OperatorRoleId, AdminTabId } from '@/lib/rbacData';
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
  QrCode,
  MessageSquare,
  Send,
  FileText,
  Building2,
  GraduationCap,
  CheckSquare,
  Copy,
  Check,
  Key,
  Users,
  UserCheck,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

export default function AdminPage() {
  const { features, updateFeatures, publishLive } = usePlatform();
  const { currency, setCurrency, currencies, updateExchangeRate } = useCurrency();
  const [activeTab, setActiveTab] = useState<
    'rbac_permissions' | 'academy_manuals' | 'switchboard' | 'currency_engine' | 'hotel_inventory' | 'nomad_hub' | 'vault_manager' | 'luxury_villas' | 'status_match' | 'fast_track' | 'yachts_supercars' | 'auto_rebooker' | 'private_jets' | 'flight_claims' | 'insurance' | 'visa_manager' | 'card_agent' | 'wallet_pass' | 'messaging_bridge' | 'voucher_settings' | 'ai_studio' | 'guides' | 'suppliers' | 'paypal'
  >('switchboard');

  // Hotel Inventory & Rate Overrides State
  const [hotelSearchFilter, setHotelSearchFilter] = useState('');
  const [selectedSupplierFeed, setSelectedSupplierFeed] = useState<'all' | 'hotelbeds' | 'webbeds' | 'amadeus'>('all');
  const [globalWholesaleMarginOverride, setGlobalWholesaleMarginOverride] = useState<number>(0);
  const [seasonalRatePredictorActive, setSeasonalRatePredictorActive] = useState(true);

  // B2B Wholesale Voucher Settings State
  const [voucherEmergencyPhone, setVoucherEmergencyPhone] = useState('+1 (800) 847-ATLAS / UK: +44 20 8123 4567');
  const [voucherRateParityClause, setVoucherRateParityClause] = useState('Strict Closed-Loop Member Net Rate. Rate Parity Non-Disclosure Clause: Net wholesale billing is settled directly via ATLAS Sovereign Banking Pool. Front desk should not collect room charges except incidentals.');
  const [voucherHeaderBrand, setVoucherHeaderBrand] = useState('ATLAS VIP Sovereign Travel & Bedbank Network');

  // Messaging Bridge State (Telegram & WhatsApp)
  const [telegramBotToken, setTelegramBotToken] = useState('7819204812:AAH99X_AtlasConciergeBotKey');
  const [telegramBotUser, setTelegramBotUser] = useState('@AtlasConciergeBot');
  const [twilioAccountSid, setTwilioAccountSid] = useState('AC9941824701298418294102948120');
  const [twilioAuthToken, setTwilioAuthToken] = useState('tw_auth_sec_99418294719284');
  const [whatsappFromNumber, setWhatsappFromNumber] = useState('whatsapp:+18008472852');
  const [messagingBridgeActive, setMessagingBridgeActive] = useState(true);

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

  // Academy & Operations Training Manuals State
  
  // RBAC Role State
  const [currentOperatorRole, setCurrentOperatorRole] = useState<OperatorRoleId>('super_admin');
  const activeRole = ATLAS_OPERATOR_ROLES.find((r) => r.id === currentOperatorRole) || ATLAS_OPERATOR_ROLES[0];
  const isTabPermitted = (tabId: AdminTabId) => activeRole.permittedTabs.includes(tabId);

  const [selectedManualId, setSelectedManualId] = useState<string>('network-integrations-manual');
  const activeManual = ATLAS_TRAINING_MANUALS.find((m) => m.id === selectedManualId) || ATLAS_TRAINING_MANUALS[0];
  const [selectedChapterId, setSelectedChapterId] = useState<string>(activeManual.chapters[0]?.id || '');
  const activeChapter = activeManual.chapters.find((c) => c.id === selectedChapterId) || activeManual.chapters[0];
  
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({});
  const [academyQuery, setAcademyQuery] = useState('');
  const [academyLoading, setAcademyLoading] = useState(false);
  const [copiedChapterId, setCopiedChapterId] = useState<string | null>(null);
  const [academyMessages, setAcademyMessages] = useState<Array<{ sender: 'user' | 'tutor'; text: string; time: string }>>([
    {
      sender: 'tutor',
      text: '🎓 **Welcome to the ATLAS Operations Academy!**\n\nI am your bespoke AI Mentor. Choose any operational role above to study the master training handbook or ask me questions about API credentials, Next.js architecture, morning 08:00 UTC health checks, or high-converting ad scripts.',
      time: 'Just now'
    }
  ]);

  const handleAskTutor = async (promptText?: string) => {
    const textToSend = promptText || academyQuery;
    if (!textToSend.trim() || academyLoading) return;

    const userMsg = { sender: 'user' as const, text: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAcademyMessages((prev) => [...prev, userMsg]);
    setAcademyQuery('');
    setAcademyLoading(true);

    try {
      const res = await fetch('/api/admin/academy/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: selectedManualId,
          chapterId: selectedChapterId,
          prompt: textToSend
        })
      });
      const data = await res.json();
      const tutorReply = data.tutorResponse || 'I am ready to assist. Please check your network and API keys in the Admin Console.';
      setAcademyMessages((prev) => [
        ...prev,
        { sender: 'tutor' as const, text: tutorReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (e) {
      setAcademyMessages((prev) => [
        ...prev,
        { sender: 'tutor' as const, text: '⚠️ Unable to connect to the AI Academy Mentor server. Please check your network connection.', time: 'Error' }
      ]);
    } finally {
      setAcademyLoading(false);
    }
  };


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

      
      {/* Role-Based Access Control (RBAC) Operator Status Bar */}
      <div className="bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeRole.avatarBg} flex items-center justify-center text-slate-950 font-black text-sm shadow-md`}>
              {activeRole.shortTitle.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">Active Operator:</span>
                <span className="text-xs font-extrabold text-white">{activeRole.defaultOperatorName}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${activeRole.badgeColor}`}>
                  {activeRole.clearanceLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {activeRole.description}
              </p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 mr-1 whitespace-nowrap flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Switch View:
            </span>
            {ATLAS_OPERATOR_ROLES.map((role) => {
              const isSelected = role.id === currentOperatorRole;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setCurrentOperatorRole(role.id);
                    setSelectedManualId(role.associatedManualId);
                    // If current tab is not permitted in new role, redirect to first permitted tab
                    if (!role.permittedTabs.includes(activeTab as AdminTabId)) {
                      setActiveTab(role.permittedTabs[0] as any);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {role.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* Main Navigation Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-1 py-2 scrollbar-none">
          {[
            { id: 'academy_manuals', label: '🎓 Operations Academy & Manuals', icon: GraduationCap },
            { id: 'switchboard', label: 'Feature Switchboard', icon: Layers },
            { id: 'currency_engine', label: 'Currency & FX Engine', icon: DollarSign },
            { id: 'hotel_inventory', label: 'Hotel Inventory & Margins', icon: Building2 },
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
            { id: 'messaging_bridge', label: 'WhatsApp & Telegram Bots', icon: MessageSquare },
            { id: 'voucher_settings', label: 'B2B Vouchers & QR Check-in', icon: FileText },
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
        
        
        {/* TAB: ROLE-BASED ACCESS CONTROL & PERMISSIONS MATRIX */}
        {activeTab === 'rbac_permissions' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      Security &amp; Governance
                    </span>
                    <span className="text-xs text-slate-400 font-mono">RBAC Engine v2.4</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Role-Based Access Control &amp; Team Permissions</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Configure granular module access, security clearances, and operational responsibilities for each position.
                  </p>
                </div>
                <button
                  onClick={() => alert('RBAC Permissions matrix saved to corporate security vault!')}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  Save Permissions Matrix
                </button>
              </div>

              {/* Roles Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ATLAS_OPERATOR_ROLES.map((role) => {
                  const isCurrent = role.id === currentOperatorRole;
                  return (
                    <div
                      key={role.id}
                      className={`bg-slate-950/70 border rounded-2xl p-5 space-y-4 transition-all ${
                        isCurrent
                          ? 'border-amber-400 ring-1 ring-amber-400/30 shadow-lg'
                          : 'border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${role.badgeColor}`}>
                          {role.clearanceLevel.split(' ')[0]} {role.clearanceLevel.split(' ')[1]}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {role.permittedTabs.length} Modules Allowed
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-white">{role.title}</h4>
                        <p className="text-xs text-amber-400 font-mono mt-0.5">{role.defaultOperatorName}</p>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{role.description}</p>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2">
                          Permitted Modules ({role.permittedTabs.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {role.permittedTabs.map((tabId) => (
                            <span
                              key={tabId}
                              className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700/60"
                            >
                              {tabId}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setCurrentOperatorRole(role.id);
                            setSelectedManualId(role.associatedManualId);
                            setActiveTab('academy_manuals');
                          }}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Simulate This Role View</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ACADEMY & IN-DEPTH TRAINING MANUALS */}
        {activeTab === 'academy_manuals' && (
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 border border-amber-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Executive Operations Academy
                    </span>
                    <span className="text-xs text-slate-400 font-mono">4 Specialized Roles • 17 Chapters • Live AI Mentor</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    In-Depth Operational Training Manuals & AI Academy
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                    Interactive role-based master handbooks and bespoke AI coaching for the Network & Integrations Specialist, Junior Software Engineer, Platform Operations Manager, and Chief Marketing Officer.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/ATLAS_Master_Operations_Manuals_Collection.pdf"
                    download="ATLAS_Master_Operations_Manuals_Collection.pdf"
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl border border-slate-700 shadow-lg flex items-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Download All 4 Manuals (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Role Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {ATLAS_TRAINING_MANUALS.map((manual) => {
                  const isSelected = activeManual.id === manual.id;
                  return (
                    <button
                      key={manual.id}
                      onClick={() => {
                        setSelectedManualId(manual.id);
                        setSelectedChapterId(manual.chapters[0]?.id || '');
                      }}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {manual.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{manual.chapters.length} Chs</span>
                      </div>
                      <div className="font-black text-sm text-white line-clamp-1">{manual.roleTitle}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{manual.summary}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Split Layout: Interactive Manual Reader & AI Academy Mentor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Interactive Reader (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Chapter Selector Navigation */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-400" />
                      Chapters ({activeManual.chapters.length})
                    </span>
                    <span className="text-xs text-amber-400 font-mono">
                      Active: {activeChapter?.title.split(':')[0] || 'Chapter 1'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeManual.chapters.map((ch, idx) => {
                      const isChSelected = activeChapter.id === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setSelectedChapterId(ch.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isChSelected
                              ? 'bg-sky-600 text-white shadow-md'
                              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <span>Ch {idx + 1}</span>
                          <span className="text-[10px] opacity-75 font-mono">({ch.readingTimeMinutes}m)</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chapter Content Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                        {activeManual.roleTitle}
                      </span>
                      <h3 className="text-xl font-black text-white mt-2">{activeChapter.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeChapter.content);
                          setCopiedChapterId(activeChapter.id);
                          setTimeout(() => setCopiedChapterId(null), 2500);
                        }}
                        className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all"
                        title="Copy chapter markdown to clipboard"
                      >
                        {copiedChapterId === activeChapter.id ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-400" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Markdown Content Display */}
                  <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
                    {activeChapter.content}
                  </div>

                  {/* Interactive Action Checklist */}
                  {activeChapter.actionChecklist && activeChapter.actionChecklist.length > 0 && (
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 space-y-3 mt-6">
                      <h4 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-amber-400" />
                        Operator Action Checklist ({activeChapter.actionChecklist.length} Items)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Complete and verify each mandatory operational task for this chapter:
                      </p>
                      <div className="space-y-2 pt-1">
                        {activeChapter.actionChecklist.map((item, i) => {
                          const itemKey = `${activeChapter.id}_${i}`;
                          const isDone = !!checkedChecklist[itemKey];
                          return (
                            <label
                              key={i}
                              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={(e) =>
                                  setCheckedChecklist((prev) => ({
                                    ...prev,
                                    [itemKey]: e.target.checked
                                  }))
                                }
                                className="mt-0.5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                              />
                              <span className={`text-xs ${isDone ? 'line-through opacity-75 text-emerald-300' : ''}`}>
                                {item}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: AI Academy Mentor Chat & Quiz (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-[750px]">
                  {/* Tutor Avatar & Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-sky-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
                        <Bot className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-white">AI Academy Mentor</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-[11px] text-amber-400 font-mono">
                          Mode: {activeManual.badge}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setAcademyMessages([
                          {
                            sender: 'tutor',
                            text: `🎓 **${activeManual.roleTitle} Coaching Mode Activated!**\n\nAsk me anything about setup steps, debugging code, API keys, compliance, or ask me for a quick role quiz!`,
                            time: 'Just now'
                          }
                        ])
                      }
                      className="text-[11px] text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-800 transition-all flex items-center gap-1"
                      title="Reset chat"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Quick Role Prompts */}
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
                      Recommended Questions for this Role:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeManual.id === 'network-integrations-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('How do I configure Stripe Issuing webhooks and secret keys?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💳 Stripe Issuing setup
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the Hotelbeds APItude credentials and rate parity rules?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🏨 Hotelbeds onboarding
                          </button>
                          <button
                            onClick={() => handleAskTutor('How do I set up Apple Wallet .pkpass and Google Wallet passes?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📱 Apple/Google Wallet
                          </button>
                        </>
                      )}

                      {activeManual.id === 'junior-dev-tech-ops-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('How do I implement a new HotelSupplierAdapter in TypeScript?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💻 New Hotel Adapter
                          </button>
                          <button
                            onClick={() => handleAskTutor('Explain the B2B PDF Voucher and QR generation engine at /api/bookings/voucher')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📄 Voucher QR Route
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the Next.js App Router rules and deployment checklist?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🚀 CI/CD & Build gotchas
                          </button>
                        </>
                      )}

                      {activeManual.id === 'platform-operations-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('Run through the 08:00 UTC morning operations health check')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📋 08:00 UTC Runbook
                          </button>
                          <button
                            onClick={() => handleAskTutor('How do we calculate and execute 20% Sovereign Vault batch dividends?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💰 20% Vault Dividends
                          </button>
                          <button
                            onClick={() => handleAskTutor('What is the workflow for metal card laser-engraving fulfillment?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            💳 Metal Card Dispatch
                          </button>
                        </>
                      )}

                      {activeManual.id === 'cmo-growth-manual' && (
                        <>
                          <button
                            onClick={() => handleAskTutor('Give me the split-screen TikTok/Reels video ad script with hook, story, and offer')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            🎬 TikTok Ad Script
                          </button>
                          <button
                            onClick={() => handleAskTutor('What are the legal rate parity advertising rules for closed-loop clubs?')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            ⚖️ Rate Parity Rules
                          </button>
                          <button
                            onClick={() => handleAskTutor('Explain the CAC, LTV, and dual-sided $100 member referral program')}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-[11px] font-semibold border border-slate-700 transition-all"
                          >
                            📊 CAC/LTV & Referrals
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Chat Messages Stream */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {academyMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-sky-600 text-white rounded-br-none'
                              : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-none shadow-md'
                          }`}
                        >
                          <div className="whitespace-pre-line font-sans">{msg.text}</div>
                        </div>
                        <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.time}</span>
                      </div>
                    ))}

                    {academyLoading && (
                      <div className="flex items-center gap-2 text-xs text-amber-400 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 w-fit">
                        <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Academy Tutor analyzing operational manual...</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Query Input */}
                  <div className="pt-3 border-t border-slate-800 mt-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAskTutor();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={academyQuery}
                        onChange={(e) => setAcademyQuery(e.target.value)}
                        placeholder={`Ask ${activeManual.roleTitle.split(' ')[0]} Mentor...`}
                        disabled={academyLoading}
                        className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <button
                        type="submit"
                        disabled={academyLoading || !academyQuery.trim()}
                        className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* TAB: HOTEL INVENTORY & RATE OVERRIDES */}
        {activeTab === 'hotel_inventory' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    Global Luxury Hotel Inventory & Wholesale Rate Overrides
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage 1,000,000+ Bedbank inventory properties, rate parity audit thresholds, and seasonal rate drop predictors.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>50+ Curated Flagships Synced</span>
                  </span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Global Wholesale Margin Offset</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={globalWholesaleMarginOverride}
                      onChange={(e) => setGlobalWholesaleMarginOverride(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                      placeholder="0.00% (Pure Wholesale)"
                    />
                    <span className="text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Supplier Bedbank Feed Filter</label>
                  <select
                    value={selectedSupplierFeed}
                    onChange={(e) => setSelectedSupplierFeed(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="all">All B2B Feeds (WebBeds, Hotelbeds, Amadeus)</option>
                    <option value="webbeds">WebBeds Direct API Feed</option>
                    <option value="hotelbeds">Hotelbeds APItude Feed</option>
                    <option value="amadeus">Amadeus Luxury GDS Network</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Autonomous Seasonal Rate Predictor</label>
                  <button
                    type="button"
                    onClick={() => setSeasonalRatePredictorActive(!seasonalRatePredictorActive)}
                    className={`w-full py-2 px-3 rounded-xl border font-bold flex items-center justify-between transition-all ${
                      seasonalRatePredictorActive
                        ? 'bg-amber-400/20 border-amber-400/40 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>AI Price-Drop Predictor</span>
                    <span>{seasonalRatePredictorActive ? 'ACTIVE (24/7)' : 'DISABLED'}</span>
                  </button>
                </div>
              </div>

              {/* Sample Properties Table */}
              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Curated Global Flagship Inventory</span>
                  <span className="text-amber-400 font-mono">0% Retail Markup Active</span>
                </div>
                <div className="divide-y divide-slate-800/60 text-xs">
                  {[
                    { name: 'Grand Hotel Oslo Karl Johan', city: 'Oslo, Norway', publicRate: '$440/nt', wholesale: '$215/nt', save: '51%', status: 'Live B2B' },
                    { name: 'The Grand Bellagio & Fountain Suite', city: 'Las Vegas, NV', publicRate: '$389/nt', wholesale: '$198/nt', save: '49%', status: 'Live B2B' },
                    { name: 'The Plaza Fifth Avenue', city: 'New York, NY', publicRate: '$690/nt', wholesale: '$345/nt', save: '50%', status: 'Live B2B' },
                    { name: 'Ritz Paris (Place Vendôme)', city: 'Paris, France', publicRate: '$1,650/nt', wholesale: '$900/nt', save: '45%', status: 'Live B2B' },
                    { name: 'Burj Al Arab Jumeirah', city: 'Dubai, UAE', publicRate: '$2,400/nt', wholesale: '$1,380/nt', save: '43%', status: 'Live B2B' },
                    { name: 'Aman Tokyo (High-Floor Suite)', city: 'Tokyo, Japan', publicRate: '$1,850/nt', wholesale: '$1,050/nt', save: '43%', status: 'Live B2B' },
                    { name: 'Soneva Jani Water Villa', city: 'Maldives', publicRate: '$3,200/nt', wholesale: '$1,890/nt', save: '41%', status: 'Live B2B' },
                    { name: 'Badrutt’s Palace Hotel', city: 'St. Moritz, Switzerland', publicRate: '$1,950/nt', wholesale: '$1,120/nt', save: '43%', status: 'Live B2B' },
                  ].map((prop, idx) => (
                    <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/40 transition-colors">
                      <div>
                        <div className="font-black text-white">{prop.name}</div>
                        <div className="text-[11px] text-slate-400">{prop.city}</div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-[10px] text-slate-500 line-through">{prop.publicRate}</div>
                          <div className="font-mono font-bold text-amber-300">{prop.wholesale}</div>
                        </div>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black rounded-full">
                          Save {prop.save}
                        </span>
                        <span className="px-2 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold rounded-full hidden sm:inline">
                          {prop.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert('Hotel Inventory and Bedbank rate override rules published!')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Save Hotel Inventory & Rate Sync Rules
              </button>
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

        {/* TAB: WHATSAPP & TELEGRAM MESSAGING BRIDGE */}
        {activeTab === 'messaging_bridge' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  WhatsApp & Telegram VIP Concierge Webhook Bridge
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Connect Telegram bots and WhatsApp Business numbers to allow members to query Aura AI directly from mobile chat.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Webhooks Online</span>
              </span>
            </div>

            <div className="space-y-6 text-xs">
              {/* Telegram Bot Card */}
              <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm text-white">
                    <Send className="w-4 h-4 text-sky-400" />
                    <span>Telegram VIP Bot (@AtlasConciergeBot)</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                    Webhook: /api/concierge/telegram
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      value={telegramBotToken}
                      onChange={(e) => setTelegramBotToken(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">Bot Username Handle</label>
                    <input
                      type="text"
                      value={telegramBotUser}
                      onChange={(e) => setTelegramBotUser(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Business API Card */}
              <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-sm text-white">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Twilio WhatsApp Business API Gateway</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Webhook: /api/concierge/whatsapp
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">Twilio Account SID</label>
                    <input
                      type="text"
                      value={twilioAccountSid}
                      onChange={(e) => setTwilioAccountSid(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-400 mb-1">Twilio Auth Token</label>
                    <input
                      type="password"
                      value={twilioAuthToken}
                      onChange={(e) => setTwilioAuthToken(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">Outbound WhatsApp Sender Number</label>
                  <input
                    type="text"
                    value={whatsappFromNumber}
                    onChange={(e) => setWhatsappFromNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl font-mono text-white text-xs"
                  />
                </div>
              </div>

              <button
                onClick={() => alert('Telegram & WhatsApp VIP Concierge Webhook configurations updated!')}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Save Messaging Webhook Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB: B2B WHOLESALE VOUCHER & QR CHECK-IN */}
        {activeTab === 'voucher_settings' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  B2B Wholesale Itinerary Voucher & QR Check-in Generator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Customize official closed-loop supplier vouchers, rate parity non-disclosure clauses, and 24/7 B2B emergency supplier support.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Voucher Engine Online</span>
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Voucher Header & Brand Authority</label>
                <input
                  type="text"
                  value={voucherHeaderBrand}
                  onChange={(e) => setVoucherHeaderBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">24/7 B2B Supplier Emergency Hotline</label>
                <input
                  type="text"
                  value={voucherEmergencyPhone}
                  onChange={(e) => setVoucherEmergencyPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">Rate Parity Non-Disclosure Legal Clause</label>
                <textarea
                  rows={3}
                  value={voucherRateParityClause}
                  onChange={(e) => setVoucherRateParityClause(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <div className="p-4 bg-black/40 rounded-2xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold uppercase text-amber-300">Active Voucher Security Specifications</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cryptographic SHA256 QR Matrix</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bedbank Supplier Direct Settlement</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero Front-Desk Room Charge Guarantee</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Automated PDF Dispatch on Confirmation</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('B2B Wholesale Voucher settings published!')}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
              >
                Save & Update Voucher Template
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

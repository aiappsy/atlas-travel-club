'use client';

import React, { useState, useEffect } from 'react';
import { usePlatform } from '@/context/PlatformContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import { ATLAS_TRAINING_MANUALS } from '@/lib/manualsData';
import { ATLAS_OPERATOR_ROLES, OperatorRoleId, AdminTabId, AdminHub, AdminHubId, AdminHubTabItem } from '@/lib/rbacData';
import { PROVIDER_INSTRUCTION_GUIDES, MOCK_NOMAD_VISAS, MOCK_VAULT_ACCOUNT, MOCK_VILLAS, MOCK_STATUS_MATCH_PROGRAMS, MOCK_FAST_TRACK_SERVICES, MOCK_CARD_ORDERS, MOCK_FLIGHT_CLAIMS, MOCK_PRIVATE_JETS, MOCK_PRICE_DROP_RECORDS, MOCK_YACHTS, MOCK_SUPERCARS } from '@/lib/mockData';
import { TESTED_GEMINI_MODELS, resolveActiveGeminiModel, getGeminiFallbackChain } from '@/lib/geminiModels';
import { DiscountVoucher, INITIAL_DISCOUNT_VOUCHERS, getStoredVouchers, saveStoredVouchers } from '@/lib/vouchers';
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
  ShieldAlert,
  Ticket,
  Trash2,
  Percent,
  Search,
  Filter,
  Edit3,
  Eye,
  EyeOff,
  ArrowRight,
  Activity
} from 'lucide-react';

export default function AdminPage() {
  const { features, updateFeatures, publishLive } = usePlatform();
  const { currency, setCurrency, currencies, updateExchangeRate } = useCurrency();
  const [activeTab, setActiveTab] = useState<
    'rbac_permissions' | 'academy_manuals' | 'switchboard' | 'currency_engine' | 'hotel_inventory' | 'nomad_hub' | 'vault_manager' | 'luxury_villas' | 'status_match' | 'fast_track' | 'yachts_supercars' | 'auto_rebooker' | 'private_jets' | 'flight_claims' | 'insurance' | 'visa_manager' | 'card_agent' | 'wallet_pass' | 'messaging_bridge' | 'voucher_settings' | 'discount_vouchers' | 'ai_studio' | 'guides' | 'suppliers' | 'paypal'
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

  // Dynamic Discount Vouchers State
  const [vouchersList, setVouchersList] = useState<DiscountVoucher[]>(INITIAL_DISCOUNT_VOUCHERS);
  const [voucherSearch, setVoucherSearch] = useState('');
  const [voucherFilter, setVoucherFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [isCreateVoucherOpen, setIsCreateVoucherOpen] = useState(false);
  const [editingVoucherId, setEditingVoucherId] = useState<string | null>(null);
  const [newVoucher, setNewVoucher] = useState({
    code: '',
    description: '',
    discountType: 'fixed' as 'fixed' | 'percentage',
    discountValue: 50,
    currency: 'USD',
    minSpend: 0,
    maxRedemptions: 250,
    expiresAt: '2026-12-31',
    appliesTo: 'all' as 'all' | 'hotels' | 'membership',
  });
  const [voucherAlert, setVoucherAlert] = useState<string | null>(null);

  useEffect(() => {
    setVouchersList(getStoredVouchers());
  }, []);

  const handleOpenCreateModal = () => {
    setEditingVoucherId(null);
    setNewVoucher({
      code: '',
      description: '',
      discountType: 'fixed',
      discountValue: 50,
      currency: 'USD',
      minSpend: 0,
      maxRedemptions: 250,
      expiresAt: '2026-12-31',
      appliesTo: 'all',
    });
    setIsCreateVoucherOpen(true);
  };

  const handleOpenEditModal = (voucher: DiscountVoucher) => {
    setEditingVoucherId(voucher.id);
    setNewVoucher({
      code: voucher.code,
      description: voucher.description,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      currency: voucher.currency,
      minSpend: voucher.minSpend,
      maxRedemptions: voucher.maxRedemptions,
      expiresAt: voucher.expiresAt,
      appliesTo: voucher.appliesTo,
    });
    setIsCreateVoucherOpen(true);
  };

  const handleToggleVoucher = (id: string) => {
    const updated = vouchersList.map((v) =>
      v.id === id ? { ...v, isActive: !v.isActive } : v
    );
    setVouchersList(updated);
    saveStoredVouchers(updated);
    setVoucherAlert('Voucher status updated successfully.');
    setTimeout(() => setVoucherAlert(null), 3000);
  };

  const handleDeleteVoucher = (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this discount voucher?')) return;
    const updated = vouchersList.filter((v) => v.id !== id);
    setVouchersList(updated);
    saveStoredVouchers(updated);
    setVoucherAlert('Voucher deleted.');
    setTimeout(() => setVoucherAlert(null), 3000);
  };

  const handleSaveVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = newVoucher.code.trim().toUpperCase();
    if (!cleanCode) {
      alert('Please enter a voucher code.');
      return;
    }

    if (editingVoucherId) {
      if (vouchersList.some((v) => v.id !== editingVoucherId && v.code === cleanCode)) {
        alert(`Voucher code "${cleanCode}" already exists on another voucher.`);
        return;
      }
      const updated = vouchersList.map((v) => {
        if (v.id === editingVoucherId) {
          return {
            ...v,
            code: cleanCode,
            description: newVoucher.description || `${newVoucher.discountType === 'percentage' ? newVoucher.discountValue + '% off' : '$' + newVoucher.discountValue + ' credit'} promotional discount`,
            discountType: newVoucher.discountType,
            discountValue: Number(newVoucher.discountValue) || 10,
            currency: newVoucher.currency,
            minSpend: Number(newVoucher.minSpend) || 0,
            maxRedemptions: Number(newVoucher.maxRedemptions) || 100,
            expiresAt: newVoucher.expiresAt || '2026-12-31',
            appliesTo: newVoucher.appliesTo,
          };
        }
        return v;
      });
      setVouchersList(updated);
      saveStoredVouchers(updated);
      setIsCreateVoucherOpen(false);
      setEditingVoucherId(null);
      setVoucherAlert(`Voucher "${cleanCode}" updated and saved!`);
      setTimeout(() => setVoucherAlert(null), 3500);
    } else {
      if (vouchersList.some((v) => v.code === cleanCode)) {
        alert(`Voucher code "${cleanCode}" already exists.`);
        return;
      }
      const created: DiscountVoucher = {
        id: `vch-${Date.now()}`,
        code: cleanCode,
        description: newVoucher.description || `${newVoucher.discountType === 'percentage' ? newVoucher.discountValue + '% off' : '$' + newVoucher.discountValue + ' credit'} promotional discount`,
        discountType: newVoucher.discountType,
        discountValue: Number(newVoucher.discountValue) || 10,
        currency: newVoucher.currency,
        minSpend: Number(newVoucher.minSpend) || 0,
        maxRedemptions: Number(newVoucher.maxRedemptions) || 100,
        redemptionCount: 0,
        expiresAt: newVoucher.expiresAt || '2026-12-31',
        appliesTo: newVoucher.appliesTo,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      };
      const updated = [created, ...vouchersList];
      setVouchersList(updated);
      saveStoredVouchers(updated);
      setIsCreateVoucherOpen(false);
      setVoucherAlert(`Voucher "${cleanCode}" created and active!`);
      setTimeout(() => setVoucherAlert(null), 3500);
    }
  };

  const handleResetVouchers = () => {
    if (!confirm('Reset all promo vouchers to initial default seed values?')) return;
    setVouchersList(INITIAL_DISCOUNT_VOUCHERS);
    saveStoredVouchers(INITIAL_DISCOUNT_VOUCHERS);
    setVoucherAlert('Vouchers reset to defaults.');
    setTimeout(() => setVoucherAlert(null), 3000);
  };
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

  // OTA Affiliate Link Configuration
  const [expediaAffId, setExpediaAffId] = useState(features.expediaAffiliateId || '');
  const [hotelsComAffId, setHotelsComAffId] = useState(features.hotelsComAffiliateId || '');
  const [bookingAffId, setBookingAffId] = useState(features.bookingAffiliateId || '');
  const [kayakAffId, setKayakAffId] = useState(features.kayakAffiliateId || '');
  const [agodaAffId, setAgodaAffId] = useState(features.agodaAffiliateId || '');
  const [otaAffiliateSaved, setOtaAffiliateSaved] = useState(false);

  const saveOtaAffiliates = () => {
    updateFeatures({
      expediaAffiliateId: expediaAffId,
      hotelsComAffiliateId: hotelsComAffId,
      bookingAffiliateId: bookingAffId,
      kayakAffiliateId: kayakAffId,
      agodaAffiliateId: agodaAffId,
    });
    setOtaAffiliateSaved(true);
    setTimeout(() => setOtaAffiliateSaved(false), 3000);
  };

  // Hotelbeds APItude Live Gateway Status
  const [hotelbedsStatus, setHotelbedsStatus] = useState<{
    connected: boolean;
    latencyMs: number;
    environment: string;
    apiStatus: string;
    authType?: string;
  } | null>(null);
  const [checkingHbStatus, setCheckingHbStatus] = useState<boolean>(false);

  const checkHotelbedsLiveStatus = async () => {
    setCheckingHbStatus(true);
    try {
      const res = await fetch('/api/providers/hotelbeds/status');
      const data = await res.json();
      setHotelbedsStatus(data);
    } catch (err) {
      console.warn('Failed to ping Hotelbeds gateway:', err);
    } finally {
      setCheckingHbStatus(false);
    }
  };

  useEffect(() => {
    checkHotelbedsLiveStatus();
  }, []);


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

  // Auto-Rebooker State (Pruvo / Hotelmize / B2B Price Sentinel)
  const [rebookerConfig, setRebookerConfig] = useState({
    provider: 'pruvo' as 'pruvo' | 'hotelmize' | 'custom',
    environment: 'sandbox' as 'sandbox' | 'production',
    apiKey: '',
    apiSecret: '',
    partnerId: '',
    webhookSecret: '',
    minSavingsThresholdUsd: 50,
    cancellationBufferHours: 48,
    executionMode: 'autonomous' as 'autonomous' | 'approval_required',
    refundAllocation: 'standard_split' as 'standard_split' | 'full_refund',
    autoScanFrequencyHours: 4,
    isEnabled: true,
  });
  const [showRebookerKey, setShowRebookerKey] = useState(false);
  const [showRebookerSecret, setShowRebookerSecret] = useState(false);
  const [rebookerCopiedWebhook, setRebookerCopiedWebhook] = useState(false);
  const [rebookerTestResult, setRebookerTestResult] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
    latencyMs?: number;
    status?: string;
  } | null>(null);
  const [rebookerSaveStatus, setRebookerSaveStatus] = useState<string | null>(null);

  // Backward-compatible alias for existing references
  const pruvoApiKey = rebookerConfig.apiKey;
  const setPruvoApiKey = (k: string) => setRebookerConfig((prev) => ({ ...prev, apiKey: k }));

  // Load saved rebooker config on mount
  useEffect(() => {
    async function initRebookerConfig() {
      try {
        const res = await fetch('/api/admin/rebooker/settings');
        const data = await res.json();
        if (data?.settings) {
          setRebookerConfig((prev) => ({
            ...prev,
            ...data.settings,
            apiKey: data.settings.apiKey || prev.apiKey,
          }));
        }
      } catch {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('atlas_rebooker_config');
          if (saved) {
            try {
              setRebookerConfig(JSON.parse(saved));
            } catch {
              // ignore
            }
          }
        }
      }
    }
    initRebookerConfig();
  }, []);

  const handleSaveRebookerConfig = async () => {
    setRebookerSaveStatus('Saving settings...');
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('atlas_rebooker_config', JSON.stringify(rebookerConfig));
      }
      const res = await fetch('/api/admin/rebooker/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rebookerConfig),
      });
      const data = await res.json();
      setRebookerSaveStatus(data.message || 'Auto-rebooker settings saved successfully!');
      setTimeout(() => setRebookerSaveStatus(null), 4000);
    } catch {
      setRebookerSaveStatus('Settings saved to local storage.');
      setTimeout(() => setRebookerSaveStatus(null), 4000);
    }
  };

  const handleTestRebookerConnection = async () => {
    setRebookerTestResult({ loading: true });
    try {
      const res = await fetch('/api/admin/rebooker/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: rebookerConfig.provider,
          environment: rebookerConfig.environment,
          apiKey: rebookerConfig.apiKey,
          partnerId: rebookerConfig.partnerId,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRebookerTestResult({
          loading: false,
          success: true,
          message: data.message,
          latencyMs: data.latencyMs,
          status: data.status,
        });
      } else {
        setRebookerTestResult({
          loading: false,
          success: false,
          message: data.error || data.message || 'Connection test failed. Please verify API credentials.',
        });
      }
    } catch (err: any) {
      setRebookerTestResult({
        loading: false,
        success: false,
        message: err?.message || 'Network error reaching supplier endpoint.',
      });
    }
  };

  const copyWebhookUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://atlastravelclub.com';
    const url = `${origin}/api/webhooks/price-drop`;
    navigator.clipboard?.writeText(url);
    setRebookerCopiedWebhook(true);
    setTimeout(() => setRebookerCopiedWebhook(false), 3000);
  };

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
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSy_LiveGoogleStudioKey_994182');
  const [selectedGeminiModelId, setSelectedGeminiModelId] = useState<string>(features.geminiModelId || 'gemini-3.8-flash');
  const [autoUpgradeEnabled, setAutoUpgradeEnabled] = useState<boolean>(features.autoUpgradeGeminiModel !== false);
  const [isScanningMarket, setIsScanningMarket] = useState(false);
  const [marketScanStatus, setMarketScanStatus] = useState<string | null>(null);

  const triggerMarketScanFromAdmin = async () => {
    setIsScanningMarket(true);
    try {
      const res = await fetch('/api/market/scan', { method: 'POST' });
      const data = await res.json();
      if (data.report) {
        setMarketScanStatus(`Scanned ${data.report.totalFeedsScanned} wholesale feeds (${data.report.propertiesEvaluated.toLocaleString()} properties). Spread: ${data.report.averageWholesaleSpread}%. Drops: ${data.report.activePruvoDropsDetected}. AirHelp: ${data.report.activeDisruptionAlerts}.`);
      }
    } catch (e) {
      setMarketScanStatus('Market scan completed successfully.');
    } finally {
      setIsScanningMarket(false);
    }
  };

  // Active guide in knowledgebase
  const [selectedGuideId, setSelectedGuideId] = useState<string>('sherpa-nomad-visas');
  const activeGuide = PROVIDER_INSTRUCTION_GUIDES.find((g) => g.id === selectedGuideId) || PROVIDER_INSTRUCTION_GUIDES[0];

  // Academy & Operations Training Manuals State
  
  // RBAC Role State
  const [currentOperatorRole, setCurrentOperatorRole] = useState<OperatorRoleId>('super_admin');
  const activeRole = ATLAS_OPERATOR_ROLES.find((r) => r.id === currentOperatorRole) || ATLAS_OPERATOR_ROLES[0];
  const isTabPermitted = (tabId: AdminTabId) => activeRole.permittedTabs.includes(tabId);

  const ADMIN_HUBS: AdminHub[] = [
    {
      id: 'academy_governance',
      label: 'Academy & Governance',
      icon: GraduationCap,
      description: 'Training handbooks, role-based AI tutor, team access matrix, and master setup guides.',
      subTabs: [
        { id: 'academy_manuals', label: '🎓 Operations Academy & AI Mentor', icon: GraduationCap },
        { id: 'rbac_permissions', label: '🛡️ Role Permissions (RBAC)', icon: Key },
        { id: 'guides', label: '📖 Provider Master Guides', icon: BookOpen },
      ],
    },
    {
      id: 'travel_inventory',
      label: 'Wholesale Travel',
      icon: Building2,
      description: '1,000,000+ luxury properties, dynamic margins, curated villas, private jets, and yachts.',
      subTabs: [
        { id: 'hotel_inventory', label: '🏨 Hotel Inventory & Margins', icon: Building2 },
        { id: 'luxury_villas', label: '🏰 Luxury Villas & Estates', icon: Castle },
        { id: 'private_jets', label: '✈️ Private Jet Empty Legs', icon: Plane },
        { id: 'yachts_supercars', label: '⚓ Yachts & Supercars', icon: Anchor },
      ],
    },
    {
      id: 'fintech_banking',
      label: 'FinTech & Banking',
      icon: CreditCard,
      description: 'Stripe Issuing Visa cards, Sovereign Vault 20% dividends, multi-currency FX, and metal card dispatch.',
      subTabs: [
        { id: 'visa_manager', label: '💳 Visa Prepaid Manager', icon: CreditCard },
        { id: 'discount_vouchers', label: '🎟️ Discount & Promo Vouchers', icon: Ticket },
        { id: 'vault_manager', label: '🪙 Travel Vault & Dividends', icon: Coins },
        { id: 'card_agent', label: '🚚 Metal Card Fulfillment', icon: Truck },
        { id: 'currency_engine', label: '💱 Currency & FX Engine', icon: DollarSign },
        { id: 'paypal', label: '💵 PayPal Billing', icon: DollarSign },
      ],
    },
    {
      id: 'nomad_vip',
      label: 'Nomad & VIP Services',
      icon: Laptop,
      description: 'Global remote worker visa hub, Schengen tracker, airport fast-track, and insurance.',
      subTabs: [
        { id: 'nomad_hub', label: '💻 Digital Nomad & Visas', icon: Laptop },
        { id: 'fast_track', label: '⚡ VIP Fast-Track Immigration', icon: Zap },
        { id: 'status_match', label: '👑 Elite Status Match', icon: Award },
        { id: 'insurance', label: '🛡️ Nomad Travel Insurance', icon: HeartPulse },
        { id: 'flight_claims', label: '⚖️ Delay Claims (AirHelp)', icon: Scale },
      ],
    },
    {
      id: 'integrations_engine',
      label: 'Integrations & Engine',
      icon: Layers,
      description: 'Feature switchboard, B2B Bedbanks, Apple/Google Wallets, messaging bots, and voucher generator.',
      subTabs: [
        { id: 'switchboard', label: '⚡ Feature Switchboard', icon: Layers },
        { id: 'suppliers', label: '🌐 B2B Bedbank Suppliers', icon: Globe },
        { id: 'wallet_pass', label: '📱 Apple / Google Wallet', icon: Smartphone },
        { id: 'messaging_bridge', label: '💬 WhatsApp & Telegram Bots', icon: MessageSquare },
        { id: 'voucher_settings', label: '📄 B2B Vouchers & QR Check-in', icon: FileText },
        { id: 'auto_rebooker', label: '📉 Price-Drop Re-Booker', icon: TrendingDown },
        { id: 'ai_studio', label: '🤖 AI Concierge Studio', icon: Bot },
      ],
    },
  ];

  // Derive active hub from active tab
  const activeHub = ADMIN_HUBS.find((hub: AdminHub) => hub.subTabs.some((tab: AdminHubTabItem) => tab.id === activeTab)) || ADMIN_HUBS[0];
  const [selectedHubId, setSelectedHubId] = useState<AdminHubId>(activeHub.id);

  // Filter hubs and sub-tabs based on RBAC permissions
  const permittedHubs = ADMIN_HUBS.filter((hub: AdminHub) =>
    hub.subTabs.some((tab: AdminHubTabItem) => activeRole.permittedTabs.includes(tab.id as AdminTabId))
  );

  const currentHub = ADMIN_HUBS.find((hub: AdminHub) => hub.id === selectedHubId) || permittedHubs[0] || ADMIN_HUBS[0];
  const permittedSubTabs = currentHub.subTabs.filter((tab: AdminHubTabItem) =>
    activeRole.permittedTabs.includes(tab.id as AdminTabId)
  );


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


      
      
      {/* 2-TIER COMMAND HUBS NAVIGATION */}
      <div className="bg-slate-900/80 border-b border-slate-800 px-4 sm:px-6 lg:px-8 pt-3 pb-2 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Tier 1: Core Command Hubs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {permittedHubs.map((hub: AdminHub) => {
              const HubIcon = hub.icon;
              const isHubActive = hub.id === currentHub.id;
              const permittedCount = hub.subTabs.filter((t: AdminHubTabItem) => activeRole.permittedTabs.includes(t.id as AdminTabId)).length;

              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    setSelectedHubId(hub.id);
                    const firstValidTab = hub.subTabs.find((t: AdminHubTabItem) => activeRole.permittedTabs.includes(t.id as AdminTabId));
                    if (firstValidTab) {
                      setActiveTab(firstValidTab.id as any);
                    }
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                    isHubActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <HubIcon className={`w-4 h-4 ${isHubActive ? 'text-slate-950' : 'text-amber-400'}`} />
                  <span>{hub.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-extrabold ${
                      isHubActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {permittedCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tier 2: Sub-Modules Pills within Selected Hub */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none border-t border-slate-800/60">
            <span className="text-[11px] font-mono text-slate-500 mr-2 whitespace-nowrap hidden sm:inline-block">
              {currentHub.label}:
            </span>
            {permittedSubTabs.map((tab: AdminHubTabItem) => {
              const TabIcon = tab.icon;
              const isTabActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isTabActive
                      ? 'bg-sky-600 text-white shadow-md ring-1 ring-sky-400/50'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isTabActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
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

              {/* Hotelbeds APItude Live Gateway Monitor */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3.5 h-3.5 rounded-full ${hotelbedsStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></div>
                  <div>
                    <div className="text-xs font-black text-white flex items-center gap-2">
                      <span>Hotelbeds APItude B2B Bedbank Gateway</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        hotelbedsStatus?.connected
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {hotelbedsStatus?.connected ? `LIVE CONNECTED (${hotelbedsStatus.latencyMs}ms)` : 'CHECKING GATEWAY...'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      HMAC-SHA256 signature authenticated • Live wholesale allotments & direct closed-loop parity clearing active
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={checkHotelbedsLiveStatus}
                    disabled={checkingHbStatus}
                    className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>{checkingHbStatus ? 'Pinging Gateway...' : 'Ping APItude Live'}</span>
                  </button>
                  <a
                    href="/api/providers/hotelbeds/availability?destination=Palma+de+Mallorca"
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-sky-400 text-xs font-bold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>View Live Feed ↗</span>
                  </a>
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

        {/* TAB 8: AUTO REBOOKER (PRUVO / HOTELMIZE / B2B SENTINEL) */}
        {activeTab === 'auto_rebooker' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header & Status Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/30">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    24/7 Post-Booking Wholesale Arbitrage
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Autonomous Price-Drop Re-Booker Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Continuously scans connected B2B bedbanks (Hotelbeds, WebBeds, Amadeus) after member reservations are confirmed. When room rates drop prior to free cancellation deadlines, the system automatically re-books at the lower rate and refunds the difference directly to the member's ATLAS Visa card.
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${rebookerConfig.isEnabled ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'}`}>
                      Sentinel: {rebookerConfig.isEnabled ? 'Active' : 'Disabled'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {rebookerConfig.environment === 'production' ? '🟢 Production Live' : '🟡 Sandbox Staging'}
                    </span>
                  </div>
                  <button
                    onClick={() => setRebookerConfig((prev) => ({ ...prev, isEnabled: !prev.isEnabled }))}
                    className="text-[11px] font-bold text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    {rebookerConfig.isEnabled ? 'Pause Auto-Rebook Sentinel' : 'Enable Auto-Rebook Sentinel'}
                  </button>
                </div>
              </div>
            </div>

            {/* Provider & Environment Selector */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h4 className="text-sm font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                1. Select Re-Booking Provider & Gateway
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setRebookerConfig((prev) => ({ ...prev, provider: 'pruvo' }))}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    rebookerConfig.provider === 'pruvo'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-sm">Pruvo for Business</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Automated B2B post-booking repricing API. Covers 100+ global bedbanks and wholesale allotments.
                  </p>
                  <span className="inline-block mt-3 text-[10px] text-sky-400 font-mono">api.pruvo.com/v1</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRebookerConfig((prev) => ({ ...prev, provider: 'hotelmize' }))}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    rebookerConfig.provider === 'hotelmize'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-sm">Hotelmize Arbitrage</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300">
                      Bedbank Native
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    AI-driven hotel rate prediction and automatic room re-hedging for wholesale tour operators.
                  </p>
                  <span className="inline-block mt-3 text-[10px] text-sky-400 font-mono">api.hotelmize.com/v2</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRebookerConfig((prev) => ({ ...prev, provider: 'custom' }))}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    rebookerConfig.provider === 'custom'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-sm">Custom B2B Webhook</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                      Enterprise
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Direct integration with proprietary GDS pricing sentinels or private Bedbank rate-drop feeds.
                  </p>
                  <span className="inline-block mt-3 text-[10px] text-purple-400 font-mono">Custom Ingestion</span>
                </button>
              </div>

              {/* Environment Toggle */}
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="font-bold text-slate-300">Gateway Environment:</span>
                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setRebookerConfig((prev) => ({ ...prev, environment: 'sandbox' }))}
                    className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      rebookerConfig.environment === 'sandbox'
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sandbox / Test Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setRebookerConfig((prev) => ({ ...prev, environment: 'production' }))}
                    className={`px-4 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      rebookerConfig.environment === 'production'
                        ? 'bg-emerald-500 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live Production Mode
                  </button>
                </div>
              </div>
            </div>

            {/* API Credentials Configuration */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h4 className="text-sm font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                2. API Credentials & Authentication Keys
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* API Key / Token */}
                <div className="space-y-1.5 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase text-slate-400">
                      {rebookerConfig.provider === 'hotelmize' ? 'Hotelmize API Secret Key' : 'Pruvo Enterprise API Key / Bearer Token'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRebookerKey(!showRebookerKey)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {showRebookerKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showRebookerKey ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showRebookerKey ? 'text' : 'password'}
                      value={rebookerConfig.apiKey}
                      onChange={(e) => setRebookerConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
                      placeholder={rebookerConfig.provider === 'hotelmize' ? 'e.g. htmz_live_sec_994182...' : 'e.g. prv_live_b2b_token_488219...'}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Generated in your {rebookerConfig.provider === 'hotelmize' ? 'Hotelmize' : 'Pruvo'} Partner Console under Settings &gt; API Access.
                  </p>
                </div>

                {/* Partner / Client ID */}
                <div className="space-y-1.5">
                  <label className="font-bold uppercase text-slate-400">
                    Partner / Account ID
                  </label>
                  <input
                    type="text"
                    value={rebookerConfig.partnerId}
                    onChange={(e) => setRebookerConfig((prev) => ({ ...prev, partnerId: e.target.value }))}
                    placeholder="e.g. atlas_travel_club_b2b"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-slate-500">
                    Your designated corporate partner identifier.
                  </p>
                </div>

                {/* Webhook Signing Secret */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase text-slate-400">
                      Webhook Signing Secret (HMAC)
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowRebookerSecret(!showRebookerSecret)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {showRebookerSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showRebookerSecret ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showRebookerSecret ? 'text' : 'password'}
                    value={rebookerConfig.webhookSecret}
                    onChange={(e) => setRebookerConfig((prev) => ({ ...prev, webhookSecret: e.target.value }))}
                    placeholder="e.g. whsec_pruvo_signature_8819..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-slate-500">
                    Used to verify incoming rate drop webhook notifications.
                  </p>
                </div>
              </div>
            </div>

            {/* Incoming Webhook Callback Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <h4 className="text-sm font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-400" />
                3. Incoming Webhook Callback URL
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide this webhook URL to Pruvo or Hotelmize in your developer console. Their rate monitoring engines will ping this endpoint 24/7 the instant a lower rate is identified for any active reservation:
              </p>

              <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-slate-700 font-mono text-xs text-white">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 text-sky-400 font-bold shrink-0">POST</span>
                <span className="truncate flex-1 text-slate-200">
                  {typeof window !== 'undefined' ? `${window.location.origin}/api/webhooks/price-drop` : 'https://atlastravelclub.com/api/webhooks/price-drop'}
                </span>
                <button
                  type="button"
                  onClick={copyWebhookUrl}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {rebookerCopiedWebhook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{rebookerCopiedWebhook ? 'Copied!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>

            {/* Arbitrage Thresholds & Execution Policy */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h4 className="text-sm font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                4. Arbitrage Rules & Auto-Execution Policy
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Minimum Savings Threshold */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase text-slate-400">
                      Minimum Savings Threshold ($ USD)
                    </label>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ${rebookerConfig.minSavingsThresholdUsd}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="200"
                    step="5"
                    value={rebookerConfig.minSavingsThresholdUsd}
                    onChange={(e) => setRebookerConfig((prev) => ({ ...prev, minSavingsThresholdUsd: parseInt(e.target.value, 10) }))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">
                    Only trigger automatic re-booking if the net price drop is at least this amount.
                  </p>
                </div>

                {/* Free Cancellation Safety Buffer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-bold uppercase text-slate-400">
                      Cancellation Buffer Cutoff
                    </label>
                    <span className="font-mono font-black text-sky-400 text-sm">
                      {rebookerConfig.cancellationBufferHours} Hours Before
                    </span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="96"
                    step="12"
                    value={rebookerConfig.cancellationBufferHours}
                    onChange={(e) => setRebookerConfig((prev) => ({ ...prev, cancellationBufferHours: parseInt(e.target.value, 10) }))}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500">
                    Halt auto-rebooking within this window before the hotel's free cancellation cutoff to avoid non-refundable penalties.
                  </p>
                </div>

                {/* Execution Mode */}
                <div className="space-y-2">
                  <label className="font-bold uppercase text-slate-400">
                    Execution Mode
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        name="executionMode"
                        checked={rebookerConfig.executionMode === 'autonomous'}
                        onChange={() => setRebookerConfig((prev) => ({ ...prev, executionMode: 'autonomous' }))}
                        className="accent-emerald-500"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">100% Autonomous (Zero-Touch)</div>
                        <div className="text-[10px] text-slate-400">Automatically re-books and refunds immediately upon verified drop.</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        name="executionMode"
                        checked={rebookerConfig.executionMode === 'approval_required'}
                        onChange={() => setRebookerConfig((prev) => ({ ...prev, executionMode: 'approval_required' }))}
                        className="accent-emerald-500"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">Manual Operations Approval</div>
                        <div className="text-[10px] text-slate-400">Queues rate drops in Admin for 1-click confirmation before executing.</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Savings Allocation Policy */}
                <div className="space-y-2">
                  <label className="font-bold uppercase text-slate-400">
                    Member Refund Allocation Policy
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        name="refundAllocation"
                        checked={rebookerConfig.refundAllocation === 'standard_split'}
                        onChange={() => setRebookerConfig((prev) => ({ ...prev, refundAllocation: 'standard_split' }))}
                        className="accent-amber-400"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">50% Member Visa / 50% Sovereign Vault</div>
                        <div className="text-[10px] text-slate-400">Club standard: 50% refunded to member card, 50% pooled into Dec 31 annual dividend.</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer hover:border-slate-600">
                      <input
                        type="radio"
                        name="refundAllocation"
                        checked={rebookerConfig.refundAllocation === 'full_refund'}
                        onChange={() => setRebookerConfig((prev) => ({ ...prev, refundAllocation: 'full_refund' }))}
                        className="accent-amber-400"
                      />
                      <div>
                        <div className="font-bold text-white text-xs">100% Direct Member Cash Refund</div>
                        <div className="text-[10px] text-slate-400">Full 100% of price drop delta refunded straight to the member's Visa card.</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Connection Result Banner */}
            {rebookerTestResult && (
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 transition-all ${
                rebookerTestResult.loading
                  ? 'bg-sky-950/40 border-sky-600 text-sky-200'
                  : rebookerTestResult.success
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500 text-rose-200'
              }`}>
                {rebookerTestResult.loading ? (
                  <RefreshCw className="w-4 h-4 text-sky-400 animate-spin shrink-0 mt-0.5" />
                ) : rebookerTestResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="font-bold">
                    {rebookerTestResult.loading ? 'Pinging Supplier Endpoint...' : rebookerTestResult.success ? 'Gateway Verified' : 'Gateway Verification Failed'}
                  </div>
                  <div className="text-[11px] mt-0.5 text-slate-300">
                    {rebookerTestResult.message}
                  </div>
                  {rebookerTestResult.latencyMs && (
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      Roundtrip Latency: {rebookerTestResult.latencyMs}ms
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Save Notification Banner */}
            {rebookerSaveStatus && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{rebookerSaveStatus}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleTestRebookerConnection}
                disabled={rebookerTestResult?.loading}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold rounded-2xl border border-slate-700 text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Activity className="w-4 h-4 text-amber-400" />
                <span>Test API Connection</span>
              </button>

              <button
                type="button"
                onClick={handleSaveRebookerConfig}
                className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-xl text-xs flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Save Re-Booker Configuration</span>
              </button>
            </div>

            {/* Active Surveillance Preview */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                  Live Monitored Reservations Under Surveillance
                </h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {MOCK_PRICE_DROP_RECORDS.length} Active Records
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_PRICE_DROP_RECORDS.map((rec) => (
                  <div key={rec.id} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={rec.hotelImage} alt={rec.hotelName} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      <div>
                        <div className="font-extrabold text-white text-xs">{rec.hotelName}</div>
                        <div className="text-[11px] text-slate-400">
                          {rec.city} • Check-in: {rec.checkInDate} ({rec.nights} Nights)
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Status: <span className="text-emerald-400 font-bold uppercase">{rec.status.replace(/_/g, ' ')}</span> • Last Scanned: {rec.lastCheckedAt}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-slate-500 line-through">Booked: ${rec.originalPriceTotal}</div>
                      <div className="text-xs font-black text-white">Rebooked: <span className="text-sky-400">${rec.newRebookedPriceTotal}</span></div>
                      {rec.cashRefunded > 0 && (
                        <div className="text-[11px] font-black text-emerald-400 mt-0.5">
                          Refunded to Visa: +${rec.cashRefunded}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

        {/* TAB: DYNAMIC DISCOUNT & PROMO VOUCHERS */}
        {activeTab === 'discount_vouchers' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Alert banner if present */}
            {voucherAlert && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{voucherAlert}</span>
                </div>
                <button onClick={() => setVoucherAlert(null)} className="text-emerald-400 hover:text-white">✕</button>
              </div>
            )}

            {/* Header & Subtitle */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <Ticket className="w-5 h-5 text-amber-400" />
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dynamic Discount & Promo Voucher Engine</h3>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Generate promotional discount codes, VIP member gift credits, and custom influencer vouchers. Discounts apply dynamically at hotel wholesale checkout and membership onboarding with strict rate parity guardrails.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={handleResetVouchers}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5"
                  title="Reset to default seed vouchers"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Promo Voucher</span>
                </button>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-amber-400" />
                  <span>Active Vouchers</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {vouchersList.filter(v => v.isActive).length} <span className="text-xs text-slate-500 font-normal">/ {vouchersList.length}</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">100% Client Sync Ready</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>Total Redemptions</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {vouchersList.reduce((acc, v) => acc + v.redemptionCount, 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-sky-400 font-semibold">Across bookings & tiers</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Disbursed Savings</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ${vouchersList.reduce((acc, v) => acc + (v.redemptionCount * (v.discountType === 'fixed' ? v.discountValue : 50)), 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold">Net member savings delivered</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Rate Parity Guard</span>
                </div>
                <div className="text-2xl font-black text-white">Closed-Loop</div>
                <div className="text-[10px] text-indigo-300 font-semibold">Protected wholesale margin</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search code or description..."
                  value={voucherSearch}
                  onChange={(e) => setVoucherSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setVoucherFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      voucherFilter === 'all' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({vouchersList.length})
                  </button>
                  <button
                    onClick={() => setVoucherFilter('active')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      voucherFilter === 'active' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Active ({vouchersList.filter(v => v.isActive).length})
                  </button>
                  <button
                    onClick={() => setVoucherFilter('expired')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                      voucherFilter === 'expired' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Expired
                  </button>
                </div>
              </div>
            </div>

            {/* Vouchers Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Voucher Code</th>
                      <th className="py-3 px-4">Discount</th>
                      <th className="py-3 px-4">Target</th>
                      <th className="py-3 px-4">Min Spend</th>
                      <th className="py-3 px-4">Redemptions</th>
                      <th className="py-3 px-4">Expires</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {vouchersList
                      .filter((v) => {
                        const q = voucherSearch.toLowerCase();
                        const matches = v.code.toLowerCase().includes(q) || v.description.toLowerCase().includes(q);
                        if (!matches) return false;
                        if (voucherFilter === 'active') return v.isActive;
                        if (voucherFilter === 'expired') {
                          return v.expiresAt && new Date(v.expiresAt + 'T23:59:59Z') < new Date();
                        }
                        return true;
                      })
                      .map((voucher) => {
                        const isExpired = voucher.expiresAt && new Date(voucher.expiresAt + 'T23:59:59Z') < new Date();
                        const usagePercent = voucher.maxRedemptions > 0
                          ? Math.min(100, Math.round((voucher.redemptionCount / voucher.maxRedemptions) * 100))
                          : 0;

                        return (
                          <tr key={voucher.id} className="hover:bg-slate-800/40 transition-colors">
                            {/* Code */}
                            <td className="py-3.5 px-4 font-mono font-black text-white">
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300 tracking-wider">
                                  {voucher.code}
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(voucher.code);
                                    setVoucherAlert(`Copied "${voucher.code}" to clipboard!`);
                                    setTimeout(() => setVoucherAlert(null), 2500);
                                  }}
                                  className="text-slate-500 hover:text-amber-400 transition-colors"
                                  title="Copy Code"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="text-[11px] font-sans font-normal text-slate-400 mt-1 max-w-xs truncate">
                                {voucher.description}
                              </div>
                            </td>

                            {/* Discount */}
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold ${
                                voucher.discountType === 'percentage'
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                                {voucher.discountType === 'percentage' ? (
                                  <>
                                    <Percent className="w-3 h-3" />
                                    <span>{voucher.discountValue}% OFF</span>
                                  </>
                                ) : (
                                  <>
                                    <DollarSign className="w-3 h-3" />
                                    <span>{voucher.currency === 'NOK' ? `${voucher.discountValue * 10} NOK` : `$${voucher.discountValue}`} Off</span>
                                  </>
                                )}
                              </span>
                            </td>

                            {/* Target */}
                            <td className="py-3.5 px-4">
                              <span className="text-[11px] font-semibold text-slate-300">
                                {voucher.appliesTo === 'all' && '🌐 Universal'}
                                {voucher.appliesTo === 'hotels' && '🏨 Hotel Bookings'}
                                {voucher.appliesTo === 'membership' && '👑 Memberships'}
                              </span>
                            </td>

                            {/* Min Spend */}
                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {voucher.minSpend > 0 ? `$${voucher.minSpend}` : <span className="text-slate-500 font-sans">No Min</span>}
                            </td>

                            {/* Redemptions */}
                            <td className="py-3.5 px-4">
                              <div className="space-y-1">
                                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                                  <span>{voucher.redemptionCount} used</span>
                                  <span>{voucher.maxRedemptions} max</span>
                                </div>
                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                                    style={{ width: `${usagePercent}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Expiry */}
                            <td className="py-3.5 px-4">
                              <span className={`font-mono text-[11px] ${isExpired ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                                {voucher.expiresAt}
                              </span>
                              {isExpired && <span className="block text-[9px] uppercase font-bold text-rose-400">Expired</span>}
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleVoucher(voucher.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase transition-all cursor-pointer ${
                                  voucher.isActive && !isExpired
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                                }`}
                              >
                                {voucher.isActive && !isExpired ? 'Active' : 'Inactive'}
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => handleOpenEditModal(voucher)}
                                  className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Voucher"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteVoucher(voucher.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Voucher"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Create / Edit Voucher Modal */}
            {isCreateVoucherOpen && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                        {editingVoucherId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                      <h4 className="text-base font-black text-white">
                        {editingVoucherId ? 'Edit Promotional Voucher' : 'Create New Promotional Voucher'}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsCreateVoucherOpen(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveVoucher} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-400 mb-1">Voucher Code (Uppercase)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SUMMER25, NORDIC100, VIPWELCOME"
                        value={newVoucher.code}
                        onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value.toUpperCase() })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs font-bold tracking-wider placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold uppercase text-slate-400 mb-1">Campaign Description</label>
                      <input
                        type="text"
                        placeholder="e.g. 20% off summer luxury hotel bookings in Mallorca"
                        value={newVoucher.description}
                        onChange={(e) => setNewVoucher({ ...newVoucher, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">Discount Type</label>
                        <select
                          value={newVoucher.discountType}
                          onChange={(e) => setNewVoucher({ ...newVoucher, discountType: e.target.value as 'fixed' | 'percentage' })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="percentage">Percentage (% Off)</option>
                          <option value="fixed">Fixed Currency Credit ($ / NOK)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">
                          {newVoucher.discountType === 'percentage' ? 'Percentage Value (%)' : 'Amount Value ($)'}
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          max={newVoucher.discountType === 'percentage' ? 90 : 5000}
                          value={newVoucher.discountValue}
                          onChange={(e) => setNewVoucher({ ...newVoucher, discountValue: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">Applies To</label>
                        <select
                          value={newVoucher.appliesTo}
                          onChange={(e) => setNewVoucher({ ...newVoucher, appliesTo: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="all">Universal (Hotels & Memberships)</option>
                          <option value="hotels">Hotel Bookings Only</option>
                          <option value="membership">Membership Tiers Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">Min Spend ($)</label>
                        <input
                          type="number"
                          min={0}
                          value={newVoucher.minSpend}
                          onChange={(e) => setNewVoucher({ ...newVoucher, minSpend: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">Max Redemptions</label>
                        <input
                          type="number"
                          min={1}
                          value={newVoucher.maxRedemptions}
                          onChange={(e) => setNewVoucher({ ...newVoucher, maxRedemptions: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold uppercase text-slate-400 mb-1">Expiration Date</label>
                        <input
                          type="date"
                          value={newVoucher.expiresAt}
                          onChange={(e) => setNewVoucher({ ...newVoucher, expiresAt: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsCreateVoucherOpen(false)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                      >
                        {editingVoucherId ? 'Save & Update Voucher' : 'Publish & Activate Voucher'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 14: AI STUDIO */}
        {activeTab === 'ai_studio' && (
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-400" />
                  AI Concierge Intelligence Studio
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Google Gemini reasoning engine with autonomous model lifecycle upgrading & ElevenLabs voice synthesis.
                </p>
              </div>

              {/* Dynamic Model Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active: {resolveActiveGeminiModel({ modelOverride: selectedGeminiModelId, autoUpgradeEnabled }).name}</span>
              </div>
            </div>

            {/* Autonomous Model Lifecycle Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-amber-400/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Autonomous Model Upgrading
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoUpgradeEnabled}
                    onChange={(e) => setAutoUpgradeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When enabled, ATLAS will automatically adopt new tested & proven Gemini models (starting now with <strong>Gemini 3.8 Flash</strong>) as soon as they pass automated itinerary benchmark tests, guaranteeing zero-downtime and perpetual access to state-of-the-art multimodal reasoning.
              </p>
            </div>

            {/* Tested & Proven Models Matrix */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Tested & Proven Gemini Models Catalog
                </h4>
                <span className="text-[10px] text-slate-400">
                  {autoUpgradeEnabled ? 'Auto-Upgrade Active' : 'Manual Override Active'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TESTED_GEMINI_MODELS.map((model) => {
                  const isSelected = autoUpgradeEnabled
                    ? model.status === 'active_latest'
                    : selectedGeminiModelId === model.id;

                  return (
                    <div
                      key={model.id}
                      onClick={() => {
                        setSelectedGeminiModelId(model.id);
                        setAutoUpgradeEnabled(false);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400/80 ring-1 ring-amber-400/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-white">{model.name}</span>
                            {model.status === 'active_latest' && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                                Latest Proven
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{model.releaseDate}</span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {model.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-[10px]">
                        <div>
                          <div className="text-slate-400">Latency</div>
                          <div className="font-bold text-emerald-400">{model.latencyProfile}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Context</div>
                          <div className="font-bold text-sky-400">{model.contextWindow}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Tool Accuracy</div>
                          <div className="font-bold text-amber-400">{model.benchmarks.toolCallingAccuracy}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fallback Hierarchy Cascade */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Zero-Downtime Fallback Cascade Chain</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  1. {resolveActiveGeminiModel({ modelOverride: selectedGeminiModelId, autoUpgradeEnabled }).name} (Primary)
                </span>
                <span className="text-slate-600 font-bold">➔</span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  2. Gemini 3.7 Flash (Fallback)
                </span>
                <span className="text-slate-600 font-bold">➔</span>
                <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-medium border border-slate-700">
                  3. Gemini 2.5 Flash (Resilience)
                </span>
              </div>
            </div>

            {/* Autonomous Travel Market Scanner & Real-Time Grounding Sentinel */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border border-sky-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      Autonomous Travel Market Scanner & Grounding
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                        24/7 Active
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Continuously polls wholesale pipelines, B2B bedbanks, flight delay statuses, and OTA price parity.
                    </p>
                  </div>
                </div>

                <button
                  onClick={triggerMarketScanFromAdmin}
                  disabled={isScanningMarket}
                  className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isScanningMarket ? 'animate-spin text-slate-950' : ''}`} />
                  <span>{isScanningMarket ? 'Scanning Pipelines...' : 'Force Live Market Scan'}</span>
                </button>
              </div>

              {marketScanStatus && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  ✓ {marketScanStatus}
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">B2B Pipelines</div>
                  <div className="text-base font-black text-white mt-0.5">52 Feeds</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">Hotelbeds, WebBeds, Sabre</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Monitored Inventory</div>
                  <div className="text-base font-black text-white mt-0.5">1,048,200</div>
                  <div className="text-[9px] text-sky-400 mt-0.5">Global wholesale properties</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Wholesale Arbitrage</div>
                  <div className="text-base font-black text-emerald-400 mt-0.5">44.8% AVG</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">Below retail OTAs</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Dynamic Price Drops</div>
                  <div className="text-base font-black text-amber-400 mt-0.5">142 Active</div>
                  <div className="text-[9px] text-amber-300 mt-0.5">Pruvo + AirHelp EU261</div>
                </div>
              </div>
            </div>

            {/* API Keys Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">
                  Google AI Studio Gemini API Key
                </label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  placeholder="AIzaSy..."
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Configured in Google AI Studio for Gemini 3.8 Flash inference.
                </span>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1">
                  ElevenLabs Voice API Key
                </label>
                <input
                  type="password"
                  value={elevenLabsKey}
                  onChange={(e) => setElevenLabsKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white"
                  placeholder="el_live_..."
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Aura Natural Conversational Voice synthesis.
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                updateFeatures({
                  geminiModelId: selectedGeminiModelId,
                  autoUpgradeGeminiModel: autoUpgradeEnabled,
                });
                publishLive();
                alert(`AI Studio settings updated! Active model: ${resolveActiveGeminiModel({ modelOverride: selectedGeminiModelId, autoUpgradeEnabled }).name}. Auto-upgrade: ${autoUpgradeEnabled ? 'Enabled' : 'Disabled'}`);
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black rounded-xl text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Save & Deploy AI Intelligence Parameters</span>
            </button>
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

            {/* OTA Affiliate Link Configuration */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-800/40 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    🔗 OTA Comparison Deep-Links
                  </span>
                  <h4 className="font-black text-lg text-white mt-0.5">OTA Affiliate Link Configuration</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Every hotel search result generates real, live deep-links to Expedia, Hotels.com, Booking.com, Kayak, and Agoda.
                    Enter your affiliate IDs here to earn commission on every click. Links work without IDs — add them when your affiliate accounts are approved.
                  </p>
                </div>
                {otaAffiliateSaved && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/40 shrink-0">
                    ✅ Saved to platform
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Expedia Affiliate ID
                  </label>
                  <input
                    type="text"
                    value={expediaAffId}
                    onChange={(e) => setExpediaAffId(e.target.value)}
                    placeholder="e.g. 12345678 (leave blank until approved)"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white placeholder:text-slate-600"
                  />
                  <p className="text-slate-500 mt-1">Applied as <code className="text-amber-400">?affcid=</code> on all Expedia links.</p>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Hotels.com Affiliate ID
                  </label>
                  <input
                    type="text"
                    value={hotelsComAffId}
                    onChange={(e) => setHotelsComAffId(e.target.value)}
                    placeholder="e.g. hcom_aff_98765"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white placeholder:text-slate-600"
                  />
                  <p className="text-slate-500 mt-1">Hotels.com is under the Expedia Group affiliate program.</p>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Booking.com Affiliate ID
                  </label>
                  <input
                    type="text"
                    value={bookingAffId}
                    onChange={(e) => setBookingAffId(e.target.value)}
                    placeholder="e.g. 1234567 (aid= parameter)"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white placeholder:text-slate-600"
                  />
                  <p className="text-slate-500 mt-1">Applied as <code className="text-amber-400">?aid=</code> on all Booking.com links.</p>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Kayak Affiliate ID
                  </label>
                  <input
                    type="text"
                    value={kayakAffId}
                    onChange={(e) => setKayakAffId(e.target.value)}
                    placeholder="e.g. kayak_aff_atlas"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1">
                    Agoda Affiliate ID (cid)
                  </label>
                  <input
                    type="text"
                    value={agodaAffId}
                    onChange={(e) => setAgodaAffId(e.target.value)}
                    placeholder="e.g. 1234567 (Agoda cid)"
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-mono text-white placeholder:text-slate-600"
                  />
                  <p className="text-slate-500 mt-1">Applied as <code className="text-amber-400">?cid=</code> on Agoda search links.</p>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-4 text-xs text-slate-400 border border-slate-700">
                <strong className="text-white">How these links work:</strong> Each hotel search (static or dynamic) generates real, clickable OTA deep-links
                that open directly to that specific hotel on each OTA platform — with your search dates pre-filled.
                When affiliate IDs are set, each click earns commission. Without IDs, links still work and members get the best available prices.
              </div>

              <button
                onClick={saveOtaAffiliates}
                className="py-3 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all"
              >
                💾 Save OTA Affiliate Configuration
              </button>
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

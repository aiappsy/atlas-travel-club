'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/context/PlatformContext';
import { resolveActiveGeminiModel, formatGeminiEngineBadge } from '@/lib/geminiModels';
import { HotelConciergeContext } from '@/app/api/concierge/route';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Volume2,
  VolumeX,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Plane,
  HelpCircle,
  BookOpen,
  Laptop,
  Globe,
  Building2,
  BedDouble,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

interface BookingCardAction {
  hotelId: string;
  hotelName: string;
  city?: string;
  dates?: string;
  wholesaleRate: number;
  retailRate: number;
  savings: number;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  bookingAction?: BookingCardAction;
  showHowItWorksLink?: boolean;
  showNomadLink?: boolean;
  showProofLink?: boolean;
}

export default function AITravelConcierge() {
  const { user, isMember } = useAuth();
  const { features } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isMarketScanning, setIsMarketScanning] = useState(false);
  const [marketLastScannedAgo, setMarketLastScannedAgo] = useState(14);
  const [showProactiveHint, setShowProactiveHint] = useState(true);
  const [hotelContext, setHotelContext] = useState<HotelConciergeContext | null>(null);

  const userName = useMemo(() => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user?.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'VIP Guest';
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketLastScannedAgo((prev) => (prev >= 60 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeModel = resolveActiveGeminiModel({
    modelOverride: features.geminiModelId,
    autoUpgradeEnabled: features.autoUpgradeGeminiModel ?? true,
  });

  // Dynamic initial greeting based on whether a hotel is actively being audited
  const getInitialMessage = (hc: HotelConciergeContext | null, name: string): Message => {
    if (hc && hc.name) {
      return {
        sender: 'ai',
        text: `👋 Hello ${name}! I am **Aura**, your proactive VIP AI Concierge (${formatGeminiEngineBadge(activeModel)}).\n\nI see you are inspecting **${hc.name}** in ${hc.city || 'your destination'} for **${hc.dates || `${hc.checkIn} to ${hc.checkOut}`}** (${hc.nights || 3} nights).\n\n💡 **Live Rate Intelligence**:\n• **Public Retail Benchmark**: $${hc.publicLowestPerNight || 0}/nt ($${hc.publicLowestTotal || 0} total) on ${hc.lowestOtaProvider || 'Booking.com'}\n• **ATLAS Wholesale Rate**: **$${hc.wholesalePerNight || 0}/nt** ($${hc.wholesaleTotal || 0} total)\n• **Instant Member Profit**: **Save $${hc.savingsTotal || 0} (${hc.savingsPercent || 0}% Off)**\n\nAll destination taxes and resort fees are 100% prepaid with **0% retail markup**. How can I assist you with this property or your travel plans?`,
        time: 'Just now',
      };
    }

    return {
      sender: 'ai',
      text: `👋 Hello ${name}! I am **Aura**, your proactive VIP Travel Concierge (${formatGeminiEngineBadge(activeModel)}).\n\nI continuously monitor **50+ B2B Bedbanks & wholesale GDS networks** to eliminate the 20%–45% OTA retail ad tax across 1,000,000+ luxury hotels, audit rate parity, and assist with digital nomad relocation.\n\nWhere would you like to travel next?`,
      time: 'Just now',
    };
  };

  const [messages, setMessages] = useState<Message[]>([
    getInitialMessage(null, userName),
  ]);

  // Update initial message if userName changes and user hasn't chatted yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [getInitialMessage(hotelContext, userName)];
      }
      return prev;
    });
  }, [userName]);

  // Listen for external trigger to open concierge with custom prompt or hotel context
  useEffect(() => {
    const handleOpenConcierge = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string; hotelContext?: HotelConciergeContext }>;
      setIsOpen(true);
      setShowProactiveHint(false);

      const incomingHc = customEvent.detail?.hotelContext || null;
      if (incomingHc) {
        setHotelContext(incomingHc);
        // Reset to hotel-specific greeting if chat is fresh
        setMessages((prev) => {
          if (prev.length <= 1 || prev.every((m) => m.sender === 'ai')) {
            return [getInitialMessage(incomingHc, userName)];
          }
          return prev;
        });
      }

      if (customEvent.detail?.prompt) {
        setTimeout(() => {
          handleSend(customEvent.detail.prompt, incomingHc || undefined);
        }, 150);
      }
    };

    window.addEventListener('open-concierge', handleOpenConcierge);
    return () => window.removeEventListener('open-concierge', handleOpenConcierge);
  }, [userName]);

  // If Admin completely disables the AI Concierge, do not render
  if (!features.enableAiConcierge) {
    return null;
  }

  // Dynamic quick prompts adapted to the active hotel or general platform
  const quickPrompts = useMemo(() => {
    if (hotelContext && hotelContext.name) {
      return [
        `Why is ${hotelContext.name.split(' ')[0]} cheaper than ${hotelContext.lowestOtaProvider || 'Booking.com'}?`,
        `Are taxes & resort fees included for ${hotelContext.name.split(' ')[0]}?`,
        'Why do OTA room prices differ on click-through?',
        'How do I check in with my wholesale voucher?',
        `Lock in wholesale rate for ${hotelContext.name.split(' ')[0]}`,
        'Scan live travel market for freshest wholesale drops',
      ];
    }
    return [
      'Why do OTA prices differ by room type?',
      'Why are all OTA rates sometimes identical?',
      'Explain hotel taxes & resort fees',
      'Scan live travel market for freshest wholesale drops',
      'How does ATLAS wholesale pricing work?',
      'What are the best 0% tax Digital Nomad Visas?',
      'Check my Schengen 90-day remaining limit',
      'Explain EU261 flight delay compensation',
      ...(features.enableNomadHub ? ['Find Lisbon coliving with 500 Mbps Wi-Fi'] : []),
      ...(features.enablePrivateJets ? ['Check Private Jet Empty Legs'] : []),
    ];
  }, [hotelContext, features]);

  const handleSend = async (textToSend?: string, contextOverride?: HotelConciergeContext) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const activeHc = contextOverride || hotelContext;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-4).map((m) => ({ sender: m.sender, text: m.text }));
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          hotelContext: activeHc,
          userContext: { name: userName, isMember },
          features,
          history,
        }),
      });
      const data = await res.json();

      let bookingAction: BookingCardAction | undefined = data.bookingAction;
      let showHowItWorksLink = data.showHowItWorksLink || false;
      let showNomadLink = data.showNomadLink || false;
      let showProofLink = data.showProofLink || false;

      // If user asks to book and no booking action was generated, dynamically construct from active hotel
      if (!bookingAction && activeHc && activeHc.name) {
        const qLower = query.toLowerCase();
        if (qLower.includes('book') || qLower.includes('reserve') || qLower.includes('lock in') || qLower.includes('confirm')) {
          bookingAction = {
            hotelId: activeHc.id || 'hotel-stay',
            hotelName: activeHc.name,
            city: activeHc.city,
            dates: activeHc.dates || `${activeHc.checkIn} – ${activeHc.checkOut}`,
            wholesaleRate: activeHc.wholesalePerNight || 0,
            retailRate: activeHc.publicLowestPerNight || 0,
            savings: activeHc.savingsTotal || 0,
          };
        }
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: data.reply || 'I am ready to assist with your wholesale travel reservations.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bookingAction,
        showHowItWorksLink,
        showNomadLink,
        showProofLink,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I am temporarily experiencing high B2B network latency. Please ask again in a moment!',
          time: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleManualMarketScan = async () => {
    setIsMarketScanning(true);
    try {
      const res = await fetch('/api/market/scan', { method: 'POST' });
      const data = await res.json();
      if (data.report) {
        setMarketLastScannedAgo(0);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `📡 **Real-Time Travel Market Scan Report** (${new Date().toLocaleTimeString()}):\n\n• **Bedbanks & GDS Polled**: ${data.report.totalFeedsScanned} Active Feeds (Hotelbeds, WebBeds, Amadeus, W2M, Travco, Sabre)\n• **Inventory Freshness**: ${data.report.propertiesEvaluated.toLocaleString()} properties evaluated with **${data.report.averageWholesaleSpread}%** average retail markup eliminated.\n• **Dynamic Price Drops**: ${data.report.activePruvoDropsDetected} active rate drops captured via Pruvo engine.\n• **EU261 Disruption Alerts**: ${data.report.activeDisruptionAlerts} flight delay claims monitored via AirHelp.\n• **Top Arbitrage Opportunity**: ${data.report.topArbitrageDeals[0]?.hotelName} (${data.report.topArbitrageDeals[0]?.city}) saving **${data.report.topArbitrageDeals[0]?.savingsPercent}%**.\n\nAura's recommendations are now 100% synchronized with the live wholesale travel market.`,
            time: 'Just now',
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsMarketScanning(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button & Proactive Helper */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* Proactive Floating Rate Hint */}
        {!isOpen && showProactiveHint && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowProactiveHint(false);
            }}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-xs text-slate-200 shadow-xl cursor-pointer hover:border-amber-400 transition-all animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {hotelContext?.name
                ? `Auditing ${hotelContext.name}? Ask Aura why it's cheaper`
                : 'Comparing rates? Ask Aura about room tiers & taxes'}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowProactiveHint(false);
              }}
              className="text-slate-500 hover:text-white ml-1 p-0.5"
              title="Dismiss tip"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowProactiveHint(false);
          }}
          className="group relative flex items-center gap-2 px-3.5 py-3 rounded-full bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 hover:from-slate-900 hover:to-indigo-900 text-white border border-amber-500/40 font-bold text-xs shadow-2xl transition-all transform hover:scale-105 cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Bot className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline text-amber-300 font-black">AI Concierge</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-full sm:max-w-md max-h-[82vh] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-1.5">
                  Aura VIP Concierge
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Travel Sentinel
                  </span>
                </h4>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{activeModel.name} &amp; B2B Bedbank Clearing</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {features.enableElevenLabsVoice && (
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
                  className={`p-1.5 rounded-full transition-colors ${
                    voiceEnabled ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Autonomous Market Sentinel Bar */}
          <div className="bg-slate-950 px-3.5 py-1.5 border-b border-slate-800 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-black text-slate-300">Market Sentinel:</span>
              <span className="text-emerald-400 font-mono font-bold">52 Feeds Fresh</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 font-mono">{marketLastScannedAgo}s ago</span>
            </div>
            <button
              onClick={handleManualMarketScan}
              disabled={isMarketScanning}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold transition-colors disabled:opacity-50 cursor-pointer"
              title="Force rescan global wholesale travel markets"
            >
              <RefreshCw className={`w-3 h-3 ${isMarketScanning ? 'animate-spin text-amber-400' : ''}`} />
              <span>{isMarketScanning ? 'Scanning...' : 'Rescan Market'}</span>
            </button>
          </div>

          {/* Active Hotel Context Indicator Bar (if hotel is active) */}
          {hotelContext && hotelContext.name && (
            <div className="bg-emerald-950/80 px-3.5 py-2 border-b border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-200">
              <div className="flex items-center gap-2 truncate">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-bold text-white truncate">{hotelContext.name}</span>
                <span className="text-emerald-400 font-bold shrink-0">
                  Save ${hotelContext.savingsTotal} ({hotelContext.savingsPercent}% Off)
                </span>
              </div>
              <button
                onClick={() => setHotelContext(null)}
                className="text-emerald-400 hover:text-white text-[10px] underline ml-2 shrink-0 cursor-pointer"
                title="Clear hotel context"
              >
                Clear
              </button>
            </div>
          )}

          {/* Quick Prompts Bar */}
          <div className="bg-slate-100 p-2 border-b border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="shrink-0 text-[10px] font-bold bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] whitespace-pre-line leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Digital Nomad & Visa Hub Action Card */}
                {m.showNomadLink && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-gradient-to-r from-teal-950 to-slate-900 text-white shadow-md max-w-[90%] text-left space-y-2 border border-teal-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-teal-400">
                      <Laptop className="w-3.5 h-3.5" />
                      <span>Digital Nomad Visas &amp; Coliving Hub</span>
                    </div>

                    <div className="text-[11px] text-slate-300 font-medium">
                      Explore live visa income rules (Spain, Portugal, Dubai, Thailand), interactive Schengen 90-day tracking, and monthly coliving deals.
                    </div>

                    <Link
                      href="/nomads"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all mt-1 cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Open Nomad Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Live Savings Proof Action Card */}
                {m.showProofLink && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white shadow-md max-w-[90%] text-left space-y-2 border border-emerald-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Live Audited Savings Proof</span>
                    </div>

                    <div className="text-[11px] text-slate-300 font-medium">
                      Inspect our live cryptographically verified rate audits against Expedia and test any hotel URL with our Live Proof Engine.
                    </div>

                    <Link
                      href="/proof"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all mt-1 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Open Live Proof Engine</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* How It Works Explanatory Action Card */}
                {m.showHowItWorksLink && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md max-w-[90%] text-left space-y-2 border border-indigo-800">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>100% Transparent Wholesale Model</span>
                    </div>

                    <div className="text-[11px] text-slate-300 font-medium">
                      Read our complete guide on why Expedia marks up prices, how Rate Parity works, and why our closed-loop club saves you 20%–45%.
                    </div>

                    <Link
                      href="/how-it-works"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all mt-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read How It Works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Direct Booking Card Action (100% dynamically attached to real hotel & dates) */}
                {m.bookingAction && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/80 shadow-md max-w-[90%] text-left space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        Wholesale Deal Locked
                      </span>
                      <span className="text-xs font-black text-emerald-700">
                        Save ${m.bookingAction.savings}
                      </span>
                    </div>

                    <div className="font-extrabold text-sm text-slate-900">
                      {m.bookingAction.hotelName}
                    </div>

                    <div className="text-[11px] text-slate-600 flex items-center gap-2">
                      <span>{m.bookingAction.city}</span>
                      <span>•</span>
                      <span>{m.bookingAction.dates}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-emerald-200">
                      <div>
                        <div className="text-[10px] text-slate-500 line-through">
                          Retail: ${m.bookingAction.retailRate}/nt
                        </div>
                        <div className="text-sm font-black text-emerald-700">
                          Wholesale: ${m.bookingAction.wholesaleRate}/night
                        </div>
                      </div>

                      <Link
                        href={`/hotels/${m.bookingAction.hotelId}`}
                        onClick={() => setIsOpen(false)}
                        className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Confirm Booking</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                <span>Aura is analyzing wholesale allotments &amp; travel rules...</span>
              </div>
            )}
          </div>

          {/* Scanner & Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <Link
                href="/nomads"
                onClick={() => setIsOpen(false)}
                className="shrink-0 px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 rounded-xl text-[10px] font-bold text-teal-900 flex items-center gap-1 transition-colors border border-teal-200 cursor-pointer"
              >
                <Laptop className="w-3.5 h-3.5 text-teal-600" />
                <span>Nomads &amp; Visas</span>
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setIsOpen(false)}
                className="shrink-0 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 rounded-xl text-[10px] font-bold text-sky-900 flex items-center gap-1 transition-colors border border-sky-200 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>How It Works</span>
              </Link>
              {features.enablePrivateJets && (
                <Link
                  href="/private-jets"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 rounded-xl text-[10px] font-bold text-amber-900 flex items-center gap-1 transition-colors border border-amber-200 cursor-pointer"
                >
                  <Plane className="w-3.5 h-3.5 text-amber-600" />
                  <span>Private Jets (80% Off)</span>
                </Link>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  hotelContext?.name
                    ? `Ask Aura about ${hotelContext.name.split(' ')[0]}, rate parity, or taxes...`
                    : 'Ask Aura about wholesale rates, rate parity, or visas...'
                }
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

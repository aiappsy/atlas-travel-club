'use client';

import React, { useState } from 'react';
import { MOCK_ACTIVE_GAP_ALERTS } from '@/lib/mockData';
import { TripGapAlert } from '@/lib/types';
import { usePlatform } from '@/context/PlatformContext';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Volume2,
  VolumeX,
  Scan,
  ShieldCheck,
  RefreshCw,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Wifi,
  AlertCircle,
  Plane,
  Ship,
  Anchor,
  HelpCircle,
  BookOpen,
  Laptop,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface BookingCardAction {
  hotelId: string;
  hotelName: string;
  city: string;
  dates: string;
  wholesaleRate: number;
  retailRate: number;
  savings: number;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  bookingAction?: BookingCardAction;
  gapAlert?: TripGapAlert;
  showHowItWorksLink?: boolean;
  showNomadLink?: boolean;
  showProofLink?: boolean;
}

export default function AITravelConcierge() {
  const { features } = usePlatform();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeGapIndex, setActiveGapIndex] = useState<number>(0);

  // If Admin completely disables the AI Concierge, do not render
  if (!features.enableAiConcierge) {
    return null;
  }

  const activeGap = MOCK_ACTIVE_GAP_ALERTS[activeGapIndex];

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `👋 Hello Alex! I am **Aura**, your proactive VIP AI Concierge (Gemini 3.7 Flash & ElevenLabs).\n\n${
        features.enableProactiveTripGaps
          ? `⚠️ **Proactive Itinerary Alert**: I noticed you booked the **7-Night Caribbean Cruise on Icon of the Seas (Miami, Oct 18)**, but you haven't secured a flight into Miami (MIA/FLL) yet!\n\nWould you like me to find cheap wholesale flights, book an empty-leg private jet seat, or help you with **Digital Nomad Visas & Coliving**?`
          : `I am ready to help you find wholesale hotels, flights, digital nomad visas, and travel services. Where would you like to travel next?`
      }`,
      time: 'Just now',
      gapAlert: features.enableProactiveTripGaps ? MOCK_ACTIVE_GAP_ALERTS[0] : undefined,
    },
  ]);

  const quickPrompts = [
    'How does ATLAS wholesale pricing work?',
    'What are the best 0% tax Digital Nomad Visas?',
    'Check my Schengen 90-day remaining limit',
    ...(features.enableProactiveTripGaps ? ['Resolve missing Miami flight for Cruise'] : []),
    'Find NYC hotel for flight LH442 on Sep 20',
    ...(features.enableNomadHub ? ['Find Lisbon coliving with 500 Mbps Wi-Fi'] : []),
    ...(features.enablePrivateJets ? ['Check Private Jet Empty Legs'] : []),
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, features }),
      });
      const data = await res.json();

      let bookingAction: BookingCardAction | undefined = undefined;
      let showHowItWorksLink = false;
      let showNomadLink = false;
      let showProofLink = false;

      const qLower = query.toLowerCase();

      if (
        qLower.includes('proof') ||
        qLower.includes('evidence') ||
        qLower.includes('audit') ||
        qLower.includes('receipt') ||
        qLower.includes('roi') ||
        qLower.includes('compare')
      ) {
        showProofLink = true;
      }

      if (
        qLower.includes('how it works') ||
        qLower.includes('why cheaper') ||
        qLower.includes('expedia') ||
        qLower.includes('wholesale')
      ) {
        showHowItWorksLink = true;
      }

      if (
        qLower.includes('nomad') ||
        qLower.includes('visa') ||
        qLower.includes('schengen') ||
        qLower.includes('coliving') ||
        qLower.includes('remote work') ||
        qLower.includes('spain visa') ||
        qLower.includes('portugal d8') ||
        qLower.includes('thailand dtv')
      ) {
        showNomadLink = true;
      }

      if (qLower.includes('book') || qLower.includes('bellagio') || qLower.includes('vegas')) {
        bookingAction = {
          hotelId: 'bellagio-vegas',
          hotelName: 'The Grand Bellagio & Casino Resort',
          city: 'Las Vegas, NV',
          dates: 'Sep 15 – Sep 18 (3 Nights)',
          wholesaleRate: 198,
          retailRate: 389,
          savings: 573,
        };
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bookingAction,
        showHowItWorksLink,
        showNomadLink,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I am temporarily experiencing high B2B network latency. Please ask again in a second!',
          time: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveGap = (gap: TripGapAlert) => {
    handleSend(`Resolve missing itinerary leg: ${gap.tripTitle}. Provide flight and hotel alternatives for ${gap.dates}.`);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 px-3.5 py-3 rounded-full bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 hover:from-slate-900 hover:to-indigo-900 text-white border border-amber-500/40 font-bold text-xs shadow-2xl transition-all transform hover:scale-105"
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
        <div className="fixed bottom-20 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[590px] animate-in slide-in-from-bottom-5 duration-200">
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
                    Nomad & Visa Aligned
                  </span>
                </h4>
                <div className="text-[10px] text-slate-400">
                  Gemini 3.7 Flash & Global Mobility Engine
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {features.enableElevenLabsVoice && (
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? 'Mute ElevenLabs Voice' : 'Enable ElevenLabs Voice'}
                  className={`p-1.5 rounded-full transition-colors ${
                    voiceEnabled ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-100 p-2 border-b border-slate-200 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                className="shrink-0 text-[10px] font-bold bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700 px-2.5 py-1 rounded-full border border-slate-200 transition-colors"
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
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed shadow-sm ${
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
                      <span>Digital Nomad Visas & Coliving Hub</span>
                    </div>

                    <div className="text-[11px] text-slate-300 font-medium">
                      Explore live visa income rules (Spain, Portugal, Dubai, Thailand), interactive Schengen 90-day tracking, and monthly coliving deals.
                    </div>

                    <Link
                      href="/nomads"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all mt-1"
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
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl shadow-sm transition-all mt-1"
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
                      Read our complete guide on why Expedia marks up prices, how Rate Parity works, and why our closed-loop club saves you 30%–70%.
                    </div>

                    <Link
                      href="/how-it-works"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all mt-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read How It Works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                {/* Proactive Gap Resolution Alternatives Card (Only when enabled by Admin) */}
                {features.enableProactiveTripGaps && m.gapAlert && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-left space-y-2 max-w-[90%] shadow-sm">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Action Required: {m.gapAlert.tripTitle}</span>
                    </div>

                    <div className="text-[11px] text-amber-950 font-semibold">
                      {m.gapAlert.message}
                    </div>

                    <div className="pt-2 border-t border-amber-200/80 flex flex-wrap gap-2">
                      <Link
                        href={m.gapAlert.targetRoute}
                        onClick={() => setIsOpen(false)}
                        className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-xl shadow-sm transition-all flex items-center gap-1"
                      >
                        <span>{m.gapAlert.suggestedActionText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Direct Booking Card Action */}
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
                    <div className="text-[11px] text-slate-600">
                      {m.bookingAction.dates} • {m.bookingAction.city}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
                      <div>
                        <div className="text-[10px] text-slate-400 line-through">
                          Expedia: ${m.bookingAction.retailRate}/nt
                        </div>
                        <div className="text-sm font-black text-emerald-700">
                          Wholesale: ${m.bookingAction.wholesaleRate}/night
                        </div>
                      </div>

                      <Link
                        href={`/hotels/${m.bookingAction.hotelId}`}
                        onClick={() => setIsOpen(false)}
                        className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1"
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
                <span>Aura is analyzing global visa rules and coliving rates...</span>
              </div>
            )}
          </div>

          {/* Scanner & Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <Link
                href="/nomads"
                onClick={() => setIsOpen(false)}
                className="shrink-0 px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 rounded-xl text-[10px] font-bold text-teal-900 flex items-center gap-1 transition-colors border border-teal-200"
              >
                <Laptop className="w-3.5 h-3.5 text-teal-600" />
                <span>Nomads & Visas</span>
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setIsOpen(false)}
                className="shrink-0 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 rounded-xl text-[10px] font-bold text-sky-900 flex items-center gap-1 transition-colors border border-sky-200"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>How It Works</span>
              </Link>
              {features.enablePrivateJets && (
                <Link
                  href="/private-jets"
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 rounded-xl text-[10px] font-bold text-amber-900 flex items-center gap-1 transition-colors border border-amber-200"
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
                placeholder="Ask Aura about Digital Nomad Visas, Schengen days, or coliving..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition-all shadow-md"
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

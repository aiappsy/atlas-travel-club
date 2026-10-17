'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Plane,
  Car,
  Train,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Bot,
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  Clock,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Compass
} from 'lucide-react';
import { HotelBreakItem } from '@/app/hotel-breaks/page';

interface AirportTransitCopilotModalProps {
  hotel: HotelBreakItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AirportTransitCopilotModal({
  hotel,
  isOpen,
  onClose,
}: AirportTransitCopilotModalProps) {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const [activeTab, setActiveTab] = useState<'chauffeur' | 'car_rental' | 'train'>('chauffeur');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: isNo
        ? `Hei! Jeg er din **Atlas Transit Copilot**, spesialtrent på flyplassruter, kjøretider og transportmuligheter for **${hotel?.name || 'dette hotellet'}**.\n\nHvilken flyplass planlegger du å lande på, eller lurer du på om du bør velge privatsjåfør, leiebil eller tog?`
        : `Hello! I am your **Atlas Transit Copilot**, specialized in airport logistics, drive times, and scenic transit routes for **${hotel?.name || 'this property'}**.\n\nWhich airport are you considering, or would you like a comparison between private chauffeur, car rental, and rail?`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chauffeurRequested, setChauffeurRequested] = useState(false);

  if (!isOpen || !hotel || !hotel.transit) return null;

  const transit = hotel.transit;

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isAsking) return;

    const userMsg = textToSend.trim();
    setInputQuery('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `[Transit Inquiry for ${hotel.name} in ${hotel.location}]: ${userMsg}`,
          hotelContext: {
            id: hotel.id,
            name: hotel.name,
            city: hotel.location,
            country: hotel.country,
          },
          userContext: { locale },
          history: chatMessages.slice(-4),
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setChatMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('No reply');
      }
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: isNo
            ? `For **${hotel.name}** anbefaler vi primært **${transit.primaryAirport.name} (${transit.primaryAirport.code})**, som er ca. ${transit.primaryAirport.driveTime} unna. Både leiebil (fra ${transit.carRental.dailyEstNo}) og privatsjåfør (${transit.chauffeur.priceEstNo}) er tilgjengelig.`
            : `For **${hotel.name}**, the optimal arrival hub is **${transit.primaryAirport.name} (${transit.primaryAirport.code})**, approx. ${transit.primaryAirport.driveTime} away. Car rental (from ${transit.carRental.dailyEstEn}) and private chauffeur (${transit.chauffeur.priceEstEn}) are both readily supported.`,
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const samplePromptsNo = [
    `Hvilken flyplass er best fra Oslo?`,
    `Bør vi velge leiebil eller privatsjåfør her?`,
    `Går det tog med bagasje til hotellet?`,
    `Vinterkjøring, kjetting og motorveivignett?`,
  ];

  const samplePromptsEn = [
    `Which airport is best for this property?`,
    `Should we book a rental car or private chauffeur?`,
    `Can we take the train with heavy luggage?`,
    `Alpine road passes, winter tires & vignettes?`,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{isNo ? 'Atlas Rute- & Transportguide' : 'Atlas Route & Airport Transit Copilot'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <span>{hotel.name}</span>
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{hotel.location}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Airport Hubs Banner */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800/80 space-y-3">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-amber-400" />
            <span>{isNo ? 'Nærmeste ankomstflyplasser:' : 'Arrival Airport Hubs:'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Primary Hub */}
            <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-amber-300">{transit.primaryAirport.code}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-[10px] font-bold text-amber-300">
                  {isNo ? 'Hovedflyplass' : 'Primary Hub'}
                </span>
              </div>
              <div className="text-xs font-semibold text-white line-clamp-1">{transit.primaryAirport.name}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{transit.primaryAirport.driveTime} ({transit.primaryAirport.distanceKm} km)</span>
              </div>
            </div>

            {/* Alternates */}
            {transit.alternateAirports.map((alt) => (
              <div key={alt.code} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-200">{alt.code}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{isNo ? 'Alternativ' : 'Alternative'}</span>
                </div>
                <div className="text-xs font-medium text-slate-300 line-clamp-1">{alt.name}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{alt.driveTime} ({alt.distanceKm} km)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body / Scrollable Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-xs">
          {/* 3 Ground Transit Mode Switcher */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isNo ? 'Velg transportalternativ:' : 'Select Ground Transport Alternative:'}
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('chauffeur')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'chauffeur'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span className="hidden sm:inline">{isNo ? '1. Privat Sjåfør' : '1. VIP Chauffeur'}</span>
                <span className="sm:hidden">Sjåfør</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('car_rental')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'car_rental'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4" />
                <span className="hidden sm:inline">{isNo ? '2. Leiebil (Klubbpris)' : '2. Wholesale Car'}</span>
                <span className="sm:hidden">Leiebil</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('train')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'train'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Train className="w-4 h-4" />
                <span className="hidden sm:inline">{isNo ? '3. Panoramatog' : '3. Scenic Rail'}</span>
                <span className="sm:hidden">Tog</span>
              </button>
            </div>

            {/* TAB 1: VIP CHAUFFEUR */}
            {activeTab === 'chauffeur' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{isNo ? 'Privat VIP Sjåfør (Door-to-Door)' : 'Private VIP Chauffeur (Door-to-Door)'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {isNo ? 'Null stress' : 'Zero Friction'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isNo
                        ? 'Sjåfør møter deg i ankomsthallen med navneskilt. Bagasjehjelp og direkte kjøring til hotellinngangen.'
                        : 'Chauffeur meets you at terminal arrivals with name board. Luggage assist direct to hotel reception.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">{isNo ? 'Fast klubbpris:' : 'Wholesale net:'}</div>
                    <div className="text-base font-black text-amber-300">
                      {isNo ? transit.chauffeur.priceEstNo : transit.chauffeur.priceEstEn}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">{isNo ? 'Estimert reisetid:' : 'Travel Duration:'}</span>
                    <span className="text-white font-semibold">{transit.chauffeur.duration} (fra {transit.primaryAirport.code})</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">{isNo ? 'Kjøretøyklasse:' : 'Vehicle Class:'}</span>
                    <span className="text-white font-semibold">Mercedes-Benz E-Klasse / V-Klasse</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">
                  💡 {isNo ? transit.chauffeur.highlightsNo : transit.chauffeur.highlightsEn}
                </p>

                {chauffeurRequested ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {isNo
                        ? 'Transportforespørsel oversendt! Atlas VIP Concierge koordinerer din sjåfør med flyankomst.'
                        : 'Transfer request logged! Atlas VIP Concierge is synchronizing your driver with flight arrival.'}
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setChauffeurRequested(true)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Car className="w-4 h-4" />
                    <span>{isNo ? 'Forespør sjåfør via Atlas Concierge' : 'Request Chauffeur via Atlas Concierge'}</span>
                  </button>
                )}
              </div>
            )}

            {/* TAB 2: CAR RENTAL */}
            {activeTab === 'car_rental' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{isNo ? 'Wholesale Leiebil fra flyplass (0 kr påslag)' : 'Wholesale Airport Car Rental (0% Markup)'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                        {isNo ? 'Full frihet' : 'Total Autonomy'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isNo
                        ? 'Hent bilen direkte i flyplassterminalen (Hertz, Sixt, Avis, Europcar). Ideelt for dagsutflukter og vingårder.'
                        : 'Terminal pick-up at airport desks (Hertz, Sixt, Avis, Europcar). Ideal for scenic drives and wine estates.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">{isNo ? 'Engros medlemspris:' : 'Net Club Rate:'}</div>
                    <div className="text-base font-black text-emerald-400">
                      {isNo ? transit.carRental.dailyEstNo : transit.carRental.dailyEstEn}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1 text-[11px]">
                  <span className="text-amber-400 font-bold block">{isNo ? 'Anbefalt henteflyplass:' : 'Recommended Hub:'}</span>
                  <span className="text-white font-semibold">{transit.carRental.recommendedHub}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="font-bold text-white text-[11px] uppercase tracking-wider">
                    🛣️ {isNo ? 'Ruteanbefaling og kjøretips:' : 'Driving Route & Local Navigation:'}
                  </div>
                  <p className="leading-relaxed">
                    {isNo ? transit.carRental.routeAdviceNo : transit.carRental.routeAdviceEn}
                  </p>
                </div>

                <Link
                  href={`/cars?iata=${transit.primaryAirport.code}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>
                    {isNo
                      ? `Søk ledige leiebiler på ${transit.primaryAirport.code} (/cars)`
                      : `Search Available Cars at ${transit.primaryAirport.code} (/cars)`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* TAB 3: SCENIC RAIL */}
            {activeTab === 'train' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{isNo ? 'Panoramatog & Hotellshuttle' : 'Scenic Express Rail & Courtesy Shuttle'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                        {isNo ? 'Miljøvennlig & rimelig' : 'Eco & Panoramic'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {isNo
                        ? 'Nyt spektakulær utsikt gjennom fjell og daler uten kjøretretthet.'
                        : 'Enjoy breathtaking alpine vistas and rolling countryside without driving fatigue.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">{isNo ? 'Togbillett ca.:' : 'Train fare approx:'}</div>
                    <div className="text-base font-black text-amber-300">
                      {isNo ? '150–290 kr (€15–€25)' : '$15–$30 (€15–€25)'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">{isNo ? 'Jernbanelinje:' : 'Rail Corridor:'}</span>
                    <span className="text-white font-semibold">{transit.trainTransit.railLine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-bold block">{isNo ? 'Nærmeste togstasjon:' : 'Nearest Rail Station:'}</span>
                    <span className="text-white font-semibold">
                      {transit.trainTransit.nearestStation} ({transit.trainTransit.stationToHotelMin} min unna)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs text-slate-300 leading-relaxed">
                  <div className="font-bold text-amber-300 text-[11px] uppercase tracking-wider">
                    🚆 {isNo ? 'Slik reiser du steg for steg:' : 'Step-by-Step Rail Transit:'}
                  </div>
                  <p>{isNo ? transit.trainTransit.routeAdviceNo : transit.trainTransit.routeAdviceEn}</p>
                </div>
              </div>
            )}
          </div>

          {/* DEDICATED AI TRANSIT ASSISTANT SECTION */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{isNo ? 'Spør Atlas AI Transit Copilot' : 'Ask Atlas AI Transit Copilot'}</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                      LIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isNo
                      ? `Spesialtrent på ruten til ${hotel.name}`
                      : `Trained specifically on routes to ${hotel.name}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-500">
                {isNo ? 'Hurtigspørsmål (klikk for svar):' : 'Instant Questions (click for answer):'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(isNo ? samplePromptsNo : samplePromptsEn).map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendPrompt(promptText)}
                    disabled={isAsking}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-white text-[11px] font-medium transition cursor-pointer disabled:opacity-50"
                  >
                    💬 {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History Box */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-medium'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>{isNo ? 'Beregner reiserute og alternativer...' : 'Analyzing route alternatives...'}</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputQuery);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  isNo
                    ? 'Spør om flyplasser, kjøretid, bagasje eller tog...'
                    : 'Ask about airports, drive times, luggage or train...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isAsking}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <span>{isNo ? 'Spør' : 'Ask'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 hidden sm:block">
            ℹ️ {isNo ? 'Alle reisealternativer kan koordineres med Atlas VIP Concierge.' : 'All route options can be arranged via Atlas VIP Concierge.'}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            {isNo ? 'Lukk ruteveileder' : 'Close Route Guide'}
          </button>
        </div>
      </div>
    </div>
  );
}

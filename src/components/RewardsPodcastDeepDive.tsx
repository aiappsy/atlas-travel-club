'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Download,
  Headphones,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

interface Chapter {
  timestamp: string;
  seconds: number;
  titleNo: string;
  titleEn: string;
  descNo: string;
  descEn: string;
}

const CHAPTERS: Chapter[] = [
  {
    timestamp: '00:00',
    seconds: 0,
    titleNo: 'Døden over George Costanza-lommeboken & App-fatigue',
    titleEn: 'The Costanza Wallet & The Death of Standalone Apps',
    descNo: 'Hvorfor 70 % av plastkort mistes og forbrukere nekter å laste ned 50 MB-apper.',
    descEn: 'Why 70% of physical cards are lost and users abandon 50MB app downloads.'
  },
  {
    timestamp: '04:14',
    seconds: 254,
    titleNo: 'Apple Wallet & Zero-Trust Sikkerhet',
    titleEn: 'Apple Wallet PassKit & Zero-Trust Security',
    descNo: 'Ett-klikks provisjonering på låseskjermen, kryptografisk WWDR-signering og NFC-brikke.',
    descEn: 'Zero-friction lock-screen provisioning, Apple WWDR signatures, and secure element NFC.'
  },
  {
    timestamp: '09:10',
    seconds: 550,
    titleNo: 'ATLAS Travel Club: 0 kr Påslag & Prisparitets-fellen',
    titleEn: 'ATLAS Travel Club: 0% Markup & The Rate Parity Trap',
    descNo: 'Costco-modellen, og hvorfor luksuscruise forbyr rabattering i kassen.',
    descEn: 'The subscription model and why luxury cruise lines legally prohibit upfront discounts.'
  },
  {
    timestamp: '12:04',
    seconds: 724,
    titleNo: '100 % Provisjons-Kickback Motoren',
    titleEn: 'The 100% Commission Kickback Engine',
    descNo: 'Hvordan ATLAS overholder prisparitet, men refunderer 15 000 kr i provisjon til medlemmet.',
    descEn: 'How ATLAS complies with rate parity while rebating $1,500 in back-end commission to the traveler.'
  },
  {
    timestamp: '14:16',
    seconds: 856,
    titleNo: 'EscrowGuard Solvensprotokoll (Cash Lag)',
    titleEn: 'EscrowGuard Solvency Protocol (Cash Lag)',
    descNo: '30–60 dagers oppgjørstid og hvorfor provisjonene låses «In Escrow» til pengene lander i banken.',
    descEn: 'Eliminating startup bankruptcy: Ledger A (promise) vs Ledger B (cleared bank cash).'
  },
  {
    timestamp: '16:45',
    seconds: 1005,
    titleNo: 'To-Delt Saldo i Apple Wallet & Silent Push',
    titleEn: 'The Dual-Balance Lock Screen Pass & Push Alerts',
    descNo: 'Gult lys (Venter på oppgjør) og Grønt lys (Disponibel saldo) med automatisk APNs-varsel.',
    descEn: 'Yellow Pending Escrow vs Green Available to Spend with silent lock-screen push notifications.'
  },
  {
    timestamp: '19:40',
    seconds: 1180,
    titleNo: 'Reell Verdi: Stripe-motregning & Bankoverføring',
    titleEn: 'Real-World Utility: Stripe Offset & Cash Payouts',
    descNo: 'Automatisk gratis kontingent, nye engrosreiser, eller overføring rett til egen bankkonto.',
    descEn: 'Auto-zeroing annual membership fees, buying raw wholesale travel, or direct ACH/SEPA cash-out.'
  }
];

export default function RewardsPodcastDeepDive() {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1457); // 24m 17s fallback
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seekTo = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (!isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const skipSeconds = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
  };

  const toggleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackRate(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden HTML Audio element */}
      <audio
        ref={audioRef}
        src="/audio/How_Digital_Wallets_Replace_Loyalty_Apps.m4a"
        preload="metadata"
      />

      <div className="relative z-10 space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full mb-2">
              <Headphones className="w-3.5 h-3.5" />
              <span>{isNo ? 'Offisiell Audio Deep Dive & Analyse' : 'Official Deep Dive Audio & Brief'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isNo
                ? 'Slik erstatter Apple Wallet apper og låser opp 100 % cruise-kickback'
                : 'How Digital Wallets Replace Loyalty Apps & Unlock 100% Cruise Commissions'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl">
              {isNo
                ? 'Hør den 24-minutters uavhengige analysen av ATLAS forretningsmodell, rate parity-hacket, EscrowGuard likviditetssikring og Apple/Google Wallet PassKit-arkitekturen.'
                : 'Listen to the 24-minute analytical breakdown of the ATLAS business model, the rate-parity hack, EscrowGuard solvency protocol, and native Apple/Google Wallet architecture.'}
            </p>
          </div>

          {/* ACTION BUTTON: DOWNLOAD PDF */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/docs/How_Digital_Wallets_Replace_Loyalty_Apps.pdf"
              download="ATLAS_How_Digital_Wallets_Replace_Loyalty_Apps.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isNo ? 'Last ned PDF & Transkripsjon' : 'Download PDF & Transcript'}</span>
            </a>
          </div>
        </div>

        {/* INTERACTIVE AUDIO PLAYER INTERFACE */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Play / Pause / Skip Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="w-12 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => skipSeconds(-15)}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="-15s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>15s</span>
              </button>

              <button
                type="button"
                onClick={toggleSpeed}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-400 font-mono text-xs font-bold transition-all cursor-pointer"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Time readout */}
            <div className="font-mono text-xs font-bold text-slate-400">
              <span className="text-amber-400">{formatTime(currentTime)}</span> / {formatTime(duration)}
            </div>
          </div>

          {/* Progress Seek Bar */}
          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={duration || 1457}
              value={currentTime}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* EPISODE CHAPTERS & HIGHLIGHTS */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{isNo ? 'Hopp til kapittel i analysen' : 'Jump to Chapter in Episode'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {CHAPTERS.map((ch, idx) => {
              const isCurrent = currentTime >= ch.seconds && (idx === CHAPTERS.length - 1 || currentTime < CHAPTERS[idx + 1].seconds);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => seekTo(ch.seconds)}
                  className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                      : 'bg-slate-950/40 hover:bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 shrink-0">
                    {ch.timestamp}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">
                      {isNo ? ch.titleNo : ch.titleEn}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {isNo ? ch.descNo : ch.descEn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PDF HIGHLIGHT FOOTNOTE */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isNo
                ? 'Utgiver: HARD ROCK CAPITAL LTD (UK Reg #16833237) &bull; Managing Director: Pål Juritzen'
                : 'Issuer: HARD ROCK CAPITAL LTD (UK Reg #16833237) &bull; Managing Director: Pål Juritzen'}
            </span>
          </div>
          <a
            href="/docs/How_Digital_Wallets_Replace_Loyalty_Apps.pdf"
            download
            className="text-amber-400 hover:text-amber-300 underline font-bold flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isNo ? 'Åpne 4-siders full PDF-rapport' : 'Open 4-Page Institutional PDF'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

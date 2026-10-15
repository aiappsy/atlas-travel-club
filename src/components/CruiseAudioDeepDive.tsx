'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CruiseAudioDeepDive() {
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2421); // ~40m 21s
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoaded(true);
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn('Playback prevented:', err);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIndex];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="my-10 max-w-6xl mx-auto px-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-amber-500/30 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
          {/* LEFT: Briefing & Audio Player */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                {isNo ? 'Offisiell Lydanalyse & Fact-Check' : 'Verified Audio Briefing & Fact-Check'}
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                {isNo
                  ? 'Hvorfor Luksuscruisepriser er Identiske — Og Hvordan ATLAS Slår Prisparitet'
                  : 'Why Luxury Cruise Prices Are Identical — And How ATLAS Beats Rate Parity'}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {isNo
                  ? 'Hvorfor koster Silversea, Regent og Ritz-Carlton nøyaktig det samme på Expedia, Cruises.com og rederiets egen side? Hør den 40-minutters dybdeanalysen som avdekker cruiseindustriens skjulte 10–16 % provisjoner og hvordan ATLAS tilbakefører verdien til medlemmene.'
                  : 'Why do Silversea, Regent, and Ritz-Carlton cost the exact same cent on Expedia, Cruises.com, and the direct line? Listen to the 40-minute deep dive exposing the industry’s hidden 10–16% commissions and how ATLAS returns that capital to members.'}
              </p>
            </div>

            {/* THE AUDIO PLAYER MODULE */}
            <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-700/80 shadow-inner">
              <audio
                ref={audioRef}
                src="/audio/Why_Luxury_Cruise_Prices_Are_Identical.m4a"
                preload="metadata"
              />

              {/* Progress Slider */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span className="text-amber-300 font-bold">{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Playback Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black flex items-center justify-center text-lg shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  <div>
                    <div className="text-xs font-bold text-white">
                      {isPlaying
                        ? isNo ? 'Spiller episode...' : 'Playing deep dive...'
                        : isNo ? 'Klikk for å lytte' : 'Click to listen'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isNo ? '40 min • Hør ekspertene forklare' : '40 mins • Audio Overview'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Speed Button */}
                  <button
                    onClick={cyclePlaybackRate}
                    className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-300 text-xs font-bold font-mono transition-all cursor-pointer"
                    title="Endre avspillingshastighet"
                  >
                    {playbackRate}x
                  </button>

                  {/* Mute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs transition-all cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>

                  {/* Download Direct */}
                  <a
                    href="/audio/Why_Luxury_Cruise_Prices_Are_Identical.m4a"
                    download="Why_Luxury_Cruise_Prices_Are_Identical.m4a"
                    className="px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <span>⬇</span>
                    <span className="hidden sm:inline">{isNo ? 'Last ned' : 'Download'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Fact-Checked Core Findings */}
          <div className="lg:w-80 xl:w-96 flex flex-col justify-between bg-slate-950/60 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-2">
              <span>⚖️</span>
              <span>{isNo ? 'Fakta fra Analysen' : 'Key Industry Takeaways'}</span>
            </h3>

            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-amber-400">1.</span>
                  <span>{isNo ? 'Prisparitet er Lovfestet' : 'Retail Rate Parity Is Law'}</span>
                </div>
                <p className="text-slate-400">
                  {isNo
                    ? 'Rederiene forbyr offentlige rabatter. Expedia og rederiet må vise nøyaktig samme pris.'
                    : 'Cruise lines legally ban public discounting. Expedia and direct lines must match to the cent.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-amber-400">2.</span>
                  <span>{isNo ? '10 % – 16 % Skjult Margin' : 'Hidden 10%–16% Commission'}</span>
                </div>
                <p className="text-slate-400">
                  {isNo
                    ? 'Offentlige nettsider beholder 10–16 % i ren provisjon uten å gi noe tilbake til kunden.'
                    : 'Public OTAs quietly pocket 10%–16% in wholesale commissions without returning cash to travelers.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="text-amber-400">3.</span>
                  <span>{isNo ? 'ATLAS Medlemsarbitrasje' : 'The ATLAS Closed-Loop Arbitrage'}</span>
                </div>
                <p className="text-slate-400">
                  {isNo
                    ? 'ATLAS overholder prisparitet, men sender hele 10 % tilbake som Club Credits + opptil $600 ombordkreditt.'
                    : 'ATLAS charges rate parity, but rebates 10% into your Vault + layers up to $600 in Onboard Credit.'}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>{isNo ? 'Kilde: CLIA & Konsortiedata' : 'Source: CLIA & Travel Trade Data'}</span>
              <span className="text-emerald-400 font-bold">✓ {isNo ? 'Verifisert' : 'Verified'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

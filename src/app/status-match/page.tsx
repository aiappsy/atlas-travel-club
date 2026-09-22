'use client';

import React, { useState } from 'react';
import { MOCK_STATUS_MATCH_PROGRAMS } from '@/lib/mockData';
import { StatusMatchProgram } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Award,
  CreditCard,
  Building2,
  Plane,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function StatusMatchPage() {
  const { user } = useAuth();
  const [selectedProgram, setSelectedProgram] = useState<StatusMatchProgram | null>(null);
  const [loyaltyNumber, setLoyaltyNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-indigo-950">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-3 border border-amber-400/30">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Instant Loyalty Elite Status Match
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Skip 60 Nights of Stays: Instant Diamond & Platinum Status
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            As a HotelsClub VIP member, bridge your tier to receive instant Hilton Honors Diamond, Marriott Bonvoy Platinum, and Star Alliance Gold status. Enjoy complimentary suite upgrades, executive lounge breakfasts, and 4 PM late checkouts everywhere you travel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Status Match Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCK_STATUS_MATCH_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white relative">
                  <div className="text-4xl mb-2">{prog.logo}</div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                    Tier: {prog.matchedTier}
                  </span>
                  <h3 className="font-extrabold text-xl mt-2">{prog.loyaltyProgramName}</h3>
                  <div className="text-xs text-slate-400 mt-1">
                    Public Requirement: <strong className="text-slate-200">{prog.publicRequirement}</strong>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Elite Perks Unlocked:
                    </div>
                    <div className="space-y-1.5">
                      {prog.perks.map((perk, i) => (
                        <div key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Processing Time:</span>
                      <strong className="text-slate-900">{prog.matchProcessingTime}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status Validity:</span>
                      <strong className="text-emerald-700">{prog.statusValidity}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Eligible Tier:</div>
                  <div className="text-xs font-black text-slate-900 uppercase">
                    {prog.minHotelsClubTier}+ Members
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProgram(prog);
                    setIsSubmitted(false);
                  }}
                  className="py-3 px-5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Claim Elite Match</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Match Application Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase mb-2">
                StatusMatch.com B2B Bridge
              </div>
              <h3 className="text-xl font-black">{selectedProgram.loyaltyProgramName}</h3>
              <p className="text-xs text-amber-200 mt-0.5">
                Instant Tier Upgrade to {selectedProgram.matchedTier}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {isSubmitted ? (
                <div className="space-y-4 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Elite Status Match Submitted!</h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>StatusMatch API Ref: <strong>SM-HONORS-994182</strong></div>
                    <div>Account Number: <strong>{loyaltyNumber || 'HILTON-8841920'}</strong></div>
                    <div>Upgraded Tier: <strong>{selectedProgram.matchedTier} (Active for 12 Months)</strong></div>
                  </div>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase text-[10px] mb-1">
                        Enter Your {selectedProgram.brand} Account / Member ID
                      </label>
                      <input
                        type="text"
                        value={loyaltyNumber}
                        onChange={(e) => setLoyaltyNumber(e.target.value)}
                        placeholder="e.g. 984210948"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-1">
                    <div className="font-bold text-emerald-900">
                      ✓ Instant Verification via HotelsClub Gold VIP Status
                    </div>
                    <div className="text-emerald-700 text-[11px]">
                      Your {selectedProgram.matchedTier} perks will be active in your {selectedProgram.brand} app within 12–24 hours.
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Submit Instant Status Match</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

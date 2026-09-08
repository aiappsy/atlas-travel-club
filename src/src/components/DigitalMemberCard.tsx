'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Shield, Sparkles, QrCode, Smartphone, Award, CheckCircle2 } from 'lucide-react';

interface DigitalMemberCardProps {
  user: UserProfile;
}

export default function DigitalMemberCard({ user }: DigitalMemberCardProps) {
  const [showQR, setShowQR] = useState(false);
  const isGold = user.tier === 'gold';
  const isPlatinum = user.tier === 'platinum';

  const cardGradient = isPlatinum
    ? 'from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/40 text-white'
    : isGold
    ? 'from-amber-700 via-amber-900 to-amber-950 border-amber-400/50 text-white'
    : 'from-slate-800 via-slate-900 to-slate-950 border-slate-700 text-white';

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 3D Holographic Style Card */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${cardGradient} border shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
      >
        {/* Hologram metallic shine overlay */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top bar: Brand & Chip */}
        <div className="flex items-center justify-between relative z-10 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <span className="font-black text-sm tracking-wider uppercase">
              Hotels<span className="text-sky-400">Club</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-amber-300">
            <Award className="w-3 h-3 text-amber-300" />
            {user.tier} VIP Pass
          </div>
        </div>

        {/* Smart EMV Chip Graphics & NFC */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/50 shadow-inner flex items-center justify-around px-1">
            <div className="w-full h-4 border-t border-b border-amber-800/40"></div>
          </div>
          <svg className="w-6 h-6 text-white/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" />
          </svg>
        </div>

        {/* Member Name and ID */}
        <div className="space-y-4 relative z-10">
          <div>
            <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
              Member ID
            </div>
            <div className="font-mono text-lg font-bold tracking-widest text-white/95 drop-shadow">
              {user.memberId}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                Cardholder
              </div>
              <div className="font-bold text-base text-white tracking-wide uppercase">
                {user.displayName}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                Expires
              </div>
              <div className="font-semibold text-xs text-amber-300">
                {user.validUntil}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom verification barcode strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Closed-Loop VIP</span>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-1 font-bold text-white hover:text-amber-300 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            {showQR ? 'Hide Pass Code' : 'Scan Voucher QR'}
          </button>
        </div>

        {/* Expandable QR Code Modal / Drawer inside card */}
        {showQR && (
          <div className="mt-4 p-4 bg-white rounded-2xl text-slate-900 text-center animate-in fade-in zoom-in-95">
            <div className="w-36 h-36 mx-auto bg-slate-900 p-2 rounded-xl flex items-center justify-center">
              {/* QR Matrix SVG */}
              <svg className="w-32 h-32 text-white" viewBox="0 0 100 100" fill="currentColor">
                <rect x="10" y="10" width="25" height="25" fill="#fff" />
                <rect x="15" y="15" width="15" height="15" fill="#000" />
                <rect x="65" y="10" width="25" height="25" fill="#fff" />
                <rect x="70" y="15" width="15" height="15" fill="#000" />
                <rect x="10" y="65" width="25" height="25" fill="#fff" />
                <rect x="15" y="70" width="15" height="15" fill="#000" />
                <rect x="40" y="10" width="10" height="20" fill="#fff" />
                <rect x="40" y="40" width="20" height="20" fill="#fff" />
                <rect x="70" y="50" width="15" height="15" fill="#fff" />
                <rect x="40" y="70" width="20" height="15" fill="#fff" />
              </svg>
            </div>
            <p className="text-xs font-mono font-bold mt-2 text-slate-700">
              {user.memberId}-TOKEN-ACTIVE
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Present at hotel check-in desk or car rental counter
            </p>
          </div>
        )}
      </div>

      {/* Mobile Wallet Integration Button */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => alert('Digital Member Pass added to your Mobile Wallet!')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          Add to Apple / Google Wallet
        </button>
      </div>
    </div>
  );
}

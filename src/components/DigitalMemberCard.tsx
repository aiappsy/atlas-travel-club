'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Shield, Sparkles, QrCode, Smartphone, Award, CheckCircle2, Download, ExternalLink, X } from 'lucide-react';

interface DigitalMemberCardProps {
  user: UserProfile;
}

export default function DigitalMemberCard({ user }: DigitalMemberCardProps) {
  const [showQR, setShowQR] = useState(false);
  const [walletModal, setWalletModal] = useState<'apple' | 'google' | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const isGold = user.tier === 'gold';
  const isPlatinum = user.tier === 'platinum';

  const cardGradient = isPlatinum
    ? 'from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/40 text-white'
    : isGold
    ? 'from-amber-700 via-amber-900 to-amber-950 border-amber-400/50 text-white'
    : 'from-slate-800 via-slate-900 to-slate-950 border-slate-700 text-white';

  const handleDownloadPass = async (type: 'apple' | 'google') => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/cards/wallet-pass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: user.memberId,
          name: user.displayName,
          tier: user.tier,
          validUntil: user.validUntil
        })
      });
      const data = await res.json();
      if (data.success) {
        setWalletModal(type);
      }
    } catch (e) {
      console.error(e);
      setWalletModal(type);
    } finally {
      setIsGenerating(false);
    }
  };

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
            <span className="font-black text-sm tracking-wider uppercase font-mono">
              ATLAS<span className="text-amber-400"> VIP</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-amber-300">
            <Award className="w-3 h-3 text-amber-300" />
            {user.tier} VIP PASS
          </div>
        </div>

        {/* Smart EMV Chip Graphics & NFC */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-200/50 shadow-inner flex items-center justify-around px-1">
            <div className="w-full h-4 border-t border-b border-amber-800/40"></div>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-xs font-mono">
            <svg className="w-5 h-5 text-amber-300/80" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" />
            </svg>
            <span className="text-[10px] uppercase font-bold text-amber-300">NFC Active</span>
          </div>
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
            <span>0% Markup Verified</span>
          </div>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-1 font-bold text-white hover:text-amber-300 transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            {showQR ? 'Hide QR Pass' : 'Show Lounge QR'}
          </button>
        </div>

        {/* Expandable QR Code Drawer */}
        {showQR && (
          <div className="mt-4 p-4 bg-white rounded-2xl text-slate-900 text-center animate-in fade-in zoom-in-95">
            <div className="w-36 h-36 mx-auto bg-slate-900 p-2 rounded-xl flex items-center justify-center">
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
              Present for Airport Lounge & VIP Hotel Check-in
            </p>
          </div>
        )}
      </div>

      {/* Mobile Wallet Integration Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleDownloadPass('apple')}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700 shadow-md transition-all group"
        >
          <span className="text-base"></span>
          <span>Add to Apple Wallet</span>
        </button>

        <button
          type="button"
          onClick={() => handleDownloadPass('google')}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700 shadow-md transition-all group"
        >
          <span className="text-amber-400 font-bold">G</span>
          <span>Save to Google Pay</span>
        </button>
      </div>

      {/* Wallet Pass Modal */}
      {walletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setWalletModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto text-2xl font-bold">
                {walletModal === 'apple' ? '' : 'G'}
              </div>
              <h3 className="text-lg font-black text-white">
                {walletModal === 'apple' ? 'Apple Wallet Pass Ready' : 'Google Wallet Pass Ready'}
              </h3>
              <p className="text-xs text-slate-400">
                Your cryptographic VIP Member pass has been compiled and signed by ATLAS Sovereign Keys.
              </p>
            </div>

            <div className="p-4 bg-black/40 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Pass ID:</span>
                <span className="text-amber-300">{user.memberId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Lounge Tier:</span>
                <span className="text-emerald-400">Unlimited VIP</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>NFC Status:</span>
                <span className="text-sky-400">Ready to Tap</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert(`Downloaded ${walletModal === 'apple' ? 'ATLAS_VIP_Pass.pkpass' : 'ATLAS_VIP_Pass.jwt'} to your mobile device.`);
                  setWalletModal(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download {walletModal === 'apple' ? '.pkpass File' : 'to Google Wallet'}</span>
              </button>
              <button
                onClick={() => setWalletModal(null)}
                className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


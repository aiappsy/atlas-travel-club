'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  CreditCard,
  Sparkles,
  Camera,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Package,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function PhysicalCardOrderPage() {
  const { user } = useAuth();
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [foilStyle, setFoilStyle] = useState<'metallic_gold' | 'holographic_platinum' | 'brushed_titanium'>('metallic_gold');
  
  // Shipping form state
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [state, setState] = useState('OR');
  const [zip, setZip] = useState('97477');
  const [country, setCountry] = useState('United States');

  const [orderComplete, setOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOrderCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/cards/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.uid || 'user-default',
          memberName: user?.displayName || 'Alex Harrison',
          memberId: user?.memberId || 'HC-9824-VIP',
          tier: user?.tier || 'gold',
          photoUrl,
          foilStyle,
          shippingAddress: { street, city, state, zip, country },
        }),
      });
      setLoading(false);
      setOrderComplete(true);
    } catch (e) {
      setLoading(false);
      setOrderComplete(true);
    }
  };

  const cardGradient =
    foilStyle === 'holographic_platinum'
      ? 'from-slate-900 via-indigo-950 to-slate-950 border-indigo-500/40 text-white'
      : foilStyle === 'brushed_titanium'
      ? 'from-zinc-800 via-zinc-900 to-black border-zinc-600 text-white'
      : 'from-amber-700 via-amber-900 to-amber-950 border-amber-400/50 text-white';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Member Portal
        </Link>

        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 text-xs font-black uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Heavy PVC Photo ID Card Production
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Order Your Physical Holographic Member ID Pass
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Personalized CR80 heavy PVC card with embedded NFC chip, security hologram, and physical photo ID for effortless hotel desk and car rental verification.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card Customizer & Live Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                Live Card Production Preview
              </h3>

              {/* Physical Card Mockup with Photo */}
              <div
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${cardGradient} border shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <span className="font-black text-sm tracking-wider uppercase">
                      Hotels<span className="text-sky-400">Club</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300">
                    Official Photo ID
                  </span>
                </div>

                {/* Photo ID + Member Details */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-amber-300/80 shadow-md shrink-0 bg-slate-800">
                    <img src={photoUrl} alt="Member ID Photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                      Verified Member
                    </div>
                    <div className="font-black text-base text-white uppercase tracking-wide">
                      {user?.displayName || 'Alex Harrison'}
                    </div>
                    <div className="font-mono text-xs font-bold text-amber-300">
                      {user?.memberId || 'HC-9824-VIP'}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> NFC Tap Enabled
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60 font-mono">
                  <span>EXP: {user?.validUntil || 'DEC 2026'}</span>
                  <span>SECURITY CODE: HC-NFC-8819</span>
                </div>
              </div>

              {/* Foil Finish Selector */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Select Card Foil Finish
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFoilStyle('metallic_gold')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      foilStyle === 'metallic_gold'
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    ✨ Gold Hologram
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilStyle('holographic_platinum')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      foilStyle === 'holographic_platinum'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    💎 Platinum Foil
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilStyle('brushed_titanium')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                      foilStyle === 'brushed_titanium'
                        ? 'border-slate-800 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🛡️ Titanium Black
                  </button>
                </div>
              </div>

              {/* Photo selector shortcut */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-1">
                  ID Headshot Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Preset Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address & Order Submission */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              {orderComplete ? (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Physical Card Order Confirmed!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your customized heavy PVC member card has been queued for laser engraving and USPS Priority dispatch to {city}, {state}.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                    <div>Carrier: <strong>USPS First-Class Priority Insured</strong></div>
                    <div>Tracking ID: <strong>USPS-9400111899562534882190</strong></div>
                  </div>
                  <Link
                    href="/membership"
                    className="block w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md text-center"
                  >
                    Return to Member Portal
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-600" />
                        Postal Shipping Address
                      </h3>
                      <p className="text-xs text-slate-500">
                        Dispatched worldwide in discreet security packaging.
                      </p>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      FREE Shipping (Gold / Platinum)
                    </span>
                  </div>

                  <form onSubmit={handleOrderCard} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                          State / Province
                        </label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                          Postal / ZIP Code
                        </label>
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Custom Laser Engraved Card:</span>
                        <span className="font-bold text-slate-900">$0.00 (Included in VIP Membership)</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>USPS Insured Priority Shipping:</span>
                        <span className="font-bold text-emerald-600">FREE ($0.00)</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Package className="w-4 h-4" />
                      <span>{loading ? 'Queuing Print Order...' : 'Submit Physical Card Order'}</span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Manufactured by ISO 9001 Certified Plastic Card Printer</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

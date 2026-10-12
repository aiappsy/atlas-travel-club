'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
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
  const { locale } = useLanguage();
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [foilStyle, setFoilStyle] = useState<'metallic_gold' | 'holographic_platinum' | 'brushed_titanium'>('metallic_gold');
  
  // Shipping form state
  const [street, setStreet] = useState('Dronning Eufemias gate 16');
  const [city, setCity] = useState('Oslo');
  const [state, setState] = useState('Oslo');
  const [zip, setZip] = useState('0191');
  const [country, setCountry] = useState('Norway');

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
    } catch {
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
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/membership"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'no' ? 'Tilbake til Medlemsportalen' : 'Back to Member Portal'}</span>
        </Link>

        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 text-xs font-black uppercase tracking-wider mb-2 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {locale === 'no' ? 'Fysisk PVC Medlemskort Produksjon' : 'Heavy PVC Photo ID Card Production'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            {locale === 'no'
              ? 'Bestill ditt fysiske holografiske medlemskort'
              : 'Order Your Physical Holographic Member ID Pass'}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {locale === 'no'
              ? 'Personlig CR80 PVC-kort med innebygd NFC-brikke, sikkerhetshologram og bilde-ID for smidig hotellinnsjekk og leiebilverifisering.'
              : 'Personalized CR80 heavy PVC card with embedded NFC chip, security hologram, and physical photo ID for effortless hotel desk and car rental verification.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card Customizer & Live Preview */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>{locale === 'no' ? 'Forhåndsvisning i sanntid' : 'Live Card Production Preview'}</span>
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
                      ATLAS <span className="text-sky-400">CLUB</span>
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                    VIP PASS
                  </span>
                </div>

                <div className="flex items-center gap-4 my-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden border-2 border-white/40 shadow-md shrink-0">
                    <img src={photoUrl} alt="Member ID Photo" className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-black tracking-tight">{user?.displayName || 'Alex Harrison'}</div>
                    <div className="text-[11px] font-mono text-slate-300">ID: {user?.memberId || 'HC-9824-VIP'}</div>
                    <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                      {foilStyle === 'holographic_platinum' ? 'Platinum Tier' : foilStyle === 'brushed_titanium' ? 'Titanium Tier' : 'Gold VIP Tier'}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                  <span>NFC 13.56MHz RFID EMBEDDED</span>
                  <span>EXP: 12/28</span>
                </div>
              </div>

              {/* Style selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {locale === 'no' ? 'Velg Kortfinish:' : 'Select Card Foil Finish:'}
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setFoilStyle('metallic_gold')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      foilStyle === 'metallic_gold'
                        ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Metallic Gold
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilStyle('holographic_platinum')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      foilStyle === 'holographic_platinum'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Holo Platinum
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoilStyle('brushed_titanium')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      foilStyle === 'brushed_titanium'
                        ? 'border-slate-900 bg-slate-100 text-slate-900 shadow-sm'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Titanium
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>{locale === 'no' ? 'Leveringsadresse' : 'Shipping Address'}</span>
              </h3>

              {orderComplete ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-black text-emerald-950">
                    {locale === 'no' ? 'Kortbestilling Mottatt!' : 'Card Order Placed!'}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {locale === 'no'
                      ? 'Ditt fysiske medlemskort sendes med sporet ekspresslevering innen 3-5 virkedager.'
                      : 'Your physical member pass will be produced and dispatched via tracked courier within 3-5 business days.'}
                  </p>
                  <Link
                    href="/membership"
                    className="inline-block py-2.5 px-6 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    {locale === 'no' ? 'Tilbake til Medlemsportalen' : 'Back to Member Portal'}
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleOrderCard} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      {locale === 'no' ? 'Gateadresse' : 'Street Address'}
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        {locale === 'no' ? 'Poststed' : 'City'}
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                        {locale === 'no' ? 'Postnummer' : 'Zip / Postal Code'}
                      </label>
                      <input
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      {locale === 'no' ? 'Land' : 'Country'}
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer"
                  >
                    {loading
                      ? (locale === 'no' ? 'Behandler bestilling...' : 'Processing Order...')
                      : (locale === 'no' ? 'Bestill Fysisk Medlemskort ($0 Medlemsfordel)' : 'Submit Card Order ($0 Member Benefit)')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

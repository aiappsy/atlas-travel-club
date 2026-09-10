'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CRUISES } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Ship,
  Anchor,
  MapPin,
  Calendar,
  Sparkles,
  TrendingDown,
  Gift,
  CheckCircle2,
  Users,
  Lock,
  ArrowLeft,
  Wine,
  Wifi,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

export default function CruiseDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const cruiseId = params?.id as string;

  const cruise = MOCK_CRUISES.find((c) => c.id === cruiseId) || MOCK_CRUISES[0];
  const [selectedCabin, setSelectedCabin] = useState(cruise.cabins[0]);
  const [selectedDate, setSelectedDate] = useState(cruise.departureDates[0]);
  const [passengers, setPassengers] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit_card'>('paypal');
  const [bookingDone, setBookingDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalWholesale = selectedCabin.wholesaleMemberPrice * passengers;
  const totalBrochure = selectedCabin.publicBrochurePrice * passengers;
  const totalSaved = totalBrochure - totalWholesale;

  const handleBookCruise = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingDone(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/cruises"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Wholesale Cruises
        </Link>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {cruise.cruiseLine} • {cruise.shipName}
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Gift className="w-3 h-3 text-amber-600" />
                +{formatPrice(selectedCabin.onboardCreditBonus)} Free Onboard Credit
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{cruise.title}</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Departs: <strong>{cruise.departurePort}</strong> • Duration: <strong>{cruise.durationNights} Nights</strong></span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-800">
                Member Wholesale Rate
              </div>
              <div className="text-sm font-black text-emerald-900">
                Save {cruise.savingsPercentage}% vs Cruise Brochure
              </div>
            </div>
          </div>
        </div>

        {/* High Res Ship Hero */}
        <div className="h-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-8 relative">
          <img
            src={cruise.thumbnail}
            alt={cruise.shipName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white">
              <div className="text-xs font-bold text-amber-300 uppercase">Ports of Call:</div>
              <div className="text-sm font-semibold text-slate-200 mt-0.5">
                {cruise.portsOfCall.join(' ➔ ')}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cabin Selection List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">1. Select Stateroom Category</h2>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
                  Wholesale Net Staterooms
                </span>
              </div>

              <div className="space-y-4">
                {cruise.cabins.map((cabin) => {
                  const isSelected = selectedCabin.id === cabin.id;
                  return (
                    <div
                      key={cabin.id}
                      onClick={() => setSelectedCabin(cabin)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/40 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-900 text-white">
                              {cabin.category}
                            </span>
                            <h3 className="font-extrabold text-base text-slate-900">{cabin.name}</h3>
                          </div>
                          <p className="text-xs text-slate-500">{cabin.description}</p>

                          {/* Free Perks Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cabin.freePerks.map((perk, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3 text-amber-600" />
                                {perk}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-400 line-through">
                            Brochure: {formatPrice(cabin.publicBrochurePrice)}
                          </div>
                          <div className="text-xl font-black text-emerald-600">
                            {formatPrice(cabin.wholesaleMemberPrice)}
                            <span className="text-xs text-slate-500 font-normal"> /person</span>
                          </div>
                          <button
                            type="button"
                            className={`mt-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select Cabin'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Checkout & PayPal Widget */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              {bookingDone ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Wholesale Cruise Stateroom Confirmed!</h3>
                  <p className="text-xs text-slate-500">
                    Your {selectedCabin.name} reservation and <strong>+{formatPrice(selectedCabin.onboardCreditBonus)} Onboard Credit</strong> have been registered.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left space-y-1 text-xs">
                    <div className="font-bold text-emerald-950">Wholesale Paid: {formatPrice(totalWholesale)}</div>
                    <div className="text-emerald-700 font-extrabold">Instant Savings: {formatPrice(totalSaved)}</div>
                    <div className="text-amber-700 font-bold">Onboard Spending Cash: +{formatPrice(selectedCabin.onboardCreditBonus)}</div>
                  </div>
                  <Link
                    href="/membership"
                    className="block w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center"
                  >
                    View in Member Portal
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Wholesale Total (2 Guests)
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        {formatPrice(totalWholesale)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs line-through text-slate-400">
                        Brochure: {formatPrice(totalBrochure)}
                      </div>
                      <div className="text-sm font-black text-emerald-600">
                        Save {formatPrice(totalSaved)}
                      </div>
                    </div>
                  </div>

                  {/* Sailing Date Picker */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Departure Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    >
                      {cruise.departureDates.map((d) => (
                        <option key={d} value={d}>
                          Sailing: {d} (Roundtrip {cruise.departurePort})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Bonus Inclusions Box */}
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5 text-xs text-amber-900">
                    <div className="font-black flex items-center gap-1 text-amber-800">
                      <Gift className="w-4 h-4 text-amber-600" />
                      Included VIP Member Privileges:
                    </div>
                    <div className="text-[11px] font-medium space-y-1 text-amber-950">
                      <div>✓ <strong>${selectedCabin.onboardCreditBonus} Free Onboard Credit</strong> (Spa & Excursions)</div>
                      <div>✓ No Booking Service Fees ($0)</div>
                      <div>✓ Port Taxes & Gratuity Assistance Included</div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">
                      Payment Gateway
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-sky-500 bg-sky-50/60 font-bold text-sky-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-black text-[#003087]">Pay</span>
                        <span className="font-black text-[#0079C1]">Pal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit_card')}
                        className={`p-3 rounded-2xl border flex items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'credit_card'
                            ? 'border-sky-500 bg-sky-50/60 font-bold text-sky-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-slate-700" />
                        <span className="text-xs font-bold">Credit Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  {paymentMethod === 'paypal' ? (
                    <button
                      onClick={handleBookCruise}
                      disabled={loading}
                      className="w-full py-4 px-4 rounded-2xl bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="font-black text-[#003087]">Pay</span>
                      <span className="font-black text-[#0079C1]">Pal</span>
                      <span className="font-bold text-slate-900 ml-1">
                        {loading ? 'Locking Stateroom...' : 'Book Cruise with PayPal'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleBookCruise}
                      disabled={loading}
                      className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg transition-all"
                    >
                      {loading ? 'Locking Stateroom...' : 'Pay with Credit Card'}
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct Cruise Line API Confirmation</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MOCK_FLIGHT_CLAIMS } from '@/lib/mockData';
import { FlightClaimRecord } from '@/lib/types';
import {
  Plane,
  Clock,
  DollarSign,
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Search,
  UploadCloud,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function FlightClaimsPage() {
  const { user } = useAuth();
  const [flightNumber, setFlightNumber] = useState('LH442');
  const [airline, setAirline] = useState('Lufthansa');
  const [flightDate, setFlightDate] = useState('2026-08-15');
  const [departureAirport, setDepartureAirport] = useState('Frankfurt (FRA)');
  const [arrivalAirport, setArrivalAirport] = useState('New York (JFK)');
  const [delayHours, setDelayHours] = useState('4.5');
  const [claimReason, setClaimReason] = useState<string>('Flight Delayed 3+ Hours');
  const [passengers, setPassengers] = useState<number>(1);
  const [payoutMethod, setPayoutMethod] = useState<'visa_card' | 'paypal'>('visa_card');

  const [step, setStep] = useState<'calculator' | 'filing' | 'confirmed'>('calculator');
  const [claimsList, setClaimsList] = useState<FlightClaimRecord[]>(MOCK_FLIGHT_CLAIMS);

  // Compensation calculation based on EU261 / US DOT rules
  const payoutPerPassenger = Number(delayHours) >= 3 ? 650 : 275;
  const totalEstimatedPayout = payoutPerPassenger * passengers;

  const handleFileClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaim: FlightClaimRecord = {
      id: `CLM-AIR-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user?.uid || 'demo-user',
      flightNumber,
      airline,
      departureAirport,
      arrivalAirport,
      flightDate,
      delayHours: Number(delayHours),
      claimReason: claimReason as any,
      estimatedPayout: totalEstimatedPayout,
      payoutCurrency: 'USD',
      passengerCount: passengers,
      status: 'eligible_filed',
      airHelpReference: `AH-EU261-${Math.floor(1000000 + Math.random() * 9000000)}`,
      payoutMethod,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setClaimsList([newClaim, ...claimsList]);
    setStep('confirmed');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Scale className="w-3.5 h-3.5" />
            EU261 & US DOT Legal Compensation Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Flight Delayed or Cancelled? Claim Up to $650 Cash
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Under international passenger rights laws, airlines must pay you cash compensation for disruptions. Our legal team sues and enforces claims on your behalf on a no-win, no-fee basis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Compensation Calculator & Claim Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {step === 'calculator' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        1. Check Flight Compensation Entitlement
                      </h3>
                      <p className="text-xs text-slate-500">
                        Check flights from the past 3 years for eligible cash refunds.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      Instant Payout Check
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Flight Number
                      </label>
                      <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        placeholder="e.g. LH442, BA178, AA100"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Airline
                      </label>
                      <input
                        type="text"
                        value={airline}
                        onChange={(e) => setAirline(e.target.value)}
                        placeholder="e.g. Lufthansa, British Airways"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Departure Airport
                      </label>
                      <input
                        type="text"
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Arrival Airport
                      </label>
                      <input
                        type="text"
                        value={arrivalAirport}
                        onChange={(e) => setArrivalAirport(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Disruption Type
                      </label>
                      <select
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      >
                        <option value="Flight Delayed 3+ Hours">Flight Delayed 3+ Hours</option>
                        <option value="Flight Cancelled">Flight Cancelled</option>
                        <option value="Denied Boarding (Overbooking)">Denied Boarding (Overbooking)</option>
                        <option value="Missed Connection">Missed Connection</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Number of Passengers
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                      >
                        <option value={1}>1 Passenger ($650)</option>
                        <option value={2}>2 Passengers ($1,300)</option>
                        <option value={3}>3 Passengers ($1,950)</option>
                        <option value={4}>4 Passengers ($2,600)</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculated Result Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/80 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Flight Legally Qualified for Cash Payout!
                      </span>
                      <span className="text-xl font-black text-emerald-600">
                        ${totalEstimatedPayout} Cash
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      Based on EU261 Article 7 regulations, {airline} is mandated to pay ${payoutPerPassenger} per ticket for this route disruption.
                    </p>
                  </div>

                  <button
                    onClick={() => setStep('filing')}
                    className="w-full py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>File Legal Claim for ${totalEstimatedPayout}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {step === 'filing' && (
                <form onSubmit={handleFileClaim} className="space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900">
                      2. Submit Claim to AirHelp Legal Enforcement
                    </h3>
                    <p className="text-xs text-slate-500">
                      No upfront costs. 100% No-win, no-fee guarantee.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="font-bold text-slate-900">Flight: {flightNumber} ({airline})</div>
                    <div className="text-slate-600">Route: {departureAirport} ➔ {arrivalAirport} on {flightDate}</div>
                    <div className="font-black text-emerald-600">Estimated Cash Payout: ${totalEstimatedPayout}</div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Payout Destination Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPayoutMethod('visa_card')}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          payoutMethod === 'visa_card'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-emerald-600" />
                        <span>HotelsClub Visa Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPayoutMethod('paypal')}
                        className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          payoutMethod === 'paypal'
                            ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-sm'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="font-black text-[#003087]">Pay</span>
                        <span className="font-black text-[#0079C1]">Pal</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2">
                    <UploadCloud className="w-8 h-8 text-sky-600 mx-auto" />
                    <div className="text-xs font-bold text-slate-800">
                      Upload Boarding Pass or E-Ticket Booking Confirmation
                    </div>
                    <div className="text-[10px] text-slate-400">
                      PNG, PDF, or JPEG from your airline email
                    </div>
                    <button
                      type="button"
                      onClick={() => alert('Boarding pass e-ticket attached successfully!')}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Attach Ticket PDF
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all"
                  >
                    Submit Legal Enforcement Claim (${totalEstimatedPayout})
                  </button>
                </form>
              )}

              {step === 'confirmed' && (
                <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Legal Claim Filed with Airline!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    AirHelp legal team has opened case file <strong>AH-EU261-8841920</strong> against {airline}.
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1">
                    <div>Claimed Amount: <strong>${totalEstimatedPayout} Cash</strong></div>
                    <div>Payout Target: <strong>{payoutMethod === 'visa_card' ? 'HotelsClub Visa Card' : 'PayPal'}</strong></div>
                  </div>
                  <button
                    onClick={() => setStep('calculator')}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    File Another Flight Claim
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Claims Tracker & Regulations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-600" />
                Active Legal Claims Tracker
              </h3>

              <div className="space-y-3">
                {claimsList.map((clm) => (
                  <div
                    key={clm.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-extrabold text-slate-900">{clm.flightNumber}</div>
                        <div className="text-[10px] text-slate-500">{clm.departureAirport} ➔ {clm.arrivalAirport}</div>
                      </div>
                      <span className="font-black text-emerald-600 font-mono text-sm">
                        +${clm.estimatedPayout}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px]">
                      <span className="font-mono text-slate-400">{clm.airHelpReference}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold uppercase">
                        {clm.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { MOCK_INSURANCE_PLANS } from '@/lib/mockData';
import { TravelInsurancePlan } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  ShieldCheck,
  HeartPulse,
  Plane,
  FileCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Download,
  QrCode,
  Calendar,
  X,
  CreditCard
} from 'lucide-react';

export default function InsurancePage() {
  const { user } = useAuth();
  const { locale } = useLanguage();
  const [tripDays, setTripDays] = useState<number>(14);
  const [activePlanModal, setActivePlanModal] = useState<TravelInsurancePlan | null>(null);
  const [policyIssued, setPolicyIssued] = useState<boolean>(false);

  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans text-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <HeartPulse className="w-3.5 h-3.5" />
            {locale === 'no' ? 'Global Medisinsk Nødhjelp & Reisebeskyttelse' : 'Global Emergency Medical & Trip Protection'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {locale === 'no'
              ? 'Omfattende Internasjonal Reiseforsikring'
              : 'Comprehensive Travel Medical Insurance'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {locale === 'no'
              ? 'Dekning i 180+ land for medisinske nødstilfeller, sykehusopphold, ambulanseflyvning, tapt bagasje og full avbestillingsbeskyttelse.'
              : 'Coverage across 180+ countries for medical emergencies, hospital visits, emergency evacuation, baggage loss, and full trip cancellations.'}
          </p>

          {/* Trip Duration Calculator */}
          <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-left">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="font-bold text-white">
                  {locale === 'no' ? `Reisevarighet: ${tripDays} dager` : `Trip Duration: ${tripDays} Days`}
                </div>
                <div className="text-[10px] text-slate-300">
                  {locale === 'no' ? 'Juster glidebryteren for å oppdatere pristilbud' : 'Adjust slider to recalculate quote'}
                </div>
              </div>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              value={tripDays}
              onChange={(e) => setTripDays(Number(e.target.value))}
              className="w-full sm:w-48 accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Insurance Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_INSURANCE_PLANS.map((plan) => {
            const calculatedTotal = (plan.dailyPrice * tripDays).toFixed(2);
            return (
              <div
                key={plan.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase text-sky-600 tracking-wider">
                      {locale === 'no' ? `Partner: ${plan.provider}` : `Partner: ${plan.provider}`}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      {locale === 'no' ? '0 kr Egenandel' : '$0 Deductible'}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-2">{plan.title}</h3>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 mb-6 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{locale === 'no' ? 'Akuttmedisinsk behandling:' : 'Emergency Medical:'}</span>
                      <span className="text-emerald-600">{plan.medicalEmergencyCoverage}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{locale === 'no' ? 'Medisinsk hjemtransport / evakuering:' : 'Emergency Evacuation:'}</span>
                      <span>{plan.evacuationCoverage}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{locale === 'no' ? 'Avbestilling / kansellering:' : 'Trip Cancellation:'}</span>
                      <span className="text-sky-600 font-bold">{plan.tripCancellationCoverage}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>{locale === 'no' ? 'Tapt innsjekket bagasje:' : 'Checked Baggage Loss:'}</span>
                      <span>{plan.lostLuggageCoverage}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {locale === 'no' ? 'Inkludert i polisen:' : 'Policy Inclusions:'}
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">
                      ${plan.dailyPrice.toFixed(2)}{locale === 'no' ? '/dag • ' : '/day • '}{tripDays} {locale === 'no' ? 'dager totalt' : 'Days Total'}
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      <span className="text-emerald-600">${calculatedTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActivePlanModal(plan);
                      setPolicyIssued(false);
                    }}
                    className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{locale === 'no' ? 'Tegn Polise Nå' : 'Get Instant Policy'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Instant Policy PDF Modal */}
      {activePlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 p-6 text-white text-center relative">
              <button
                onClick={() => setActivePlanModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-xs font-black uppercase mb-2">
                {locale === 'no' ? 'Offisielt Grensekontrolldokument' : 'Official Border Control Certificate'}
              </div>
              <h3 className="text-xl font-black">{activePlanModal.title}</h3>
              <p className="text-xs text-sky-200 mt-0.5">
                {locale === 'no' ? `Garantert av ${activePlanModal.provider}` : `Underwritten by ${activePlanModal.provider}`}
              </p>
            </div>

            <div className="p-6 text-center space-y-4">
              {policyIssued ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <FileCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    {locale === 'no' ? 'Forsikringsbevis Utstedt!' : 'Insurance Certificate Issued!'}
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs text-slate-700 space-y-1 text-left">
                    <div>{locale === 'no' ? 'Polisenummer:' : 'Policy ID:'} <strong>POL-SW-9982410</strong></div>
                    <div>{locale === 'no' ? 'Forsikret:' : 'Insured Name:'} <strong>{user?.displayName || 'Alex Harrison'}</strong></div>
                    <div>{locale === 'no' ? 'Medisinsk dekning:' : 'Medical Coverage:'} <strong>{activePlanModal.medicalEmergencyCoverage}</strong></div>
                    <div>{locale === 'no' ? 'Nødnummer 24/7 SOS:' : 'Emergency SOS Hotline:'} <strong>+1 (800) 555-0199</strong></div>
                  </div>
                  <button
                    onClick={() => {
                      alert(locale === 'no' ? 'Laster ned offisielt digitalt reiseforsikringsbevis...' : 'Downloading Official Digital Travel Insurance PDF Certificate...');
                      setActivePlanModal(null);
                    }}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{locale === 'no' ? 'Last ned PDF-forsikringsbevis' : 'Download PDF Certificate'}</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>{locale === 'no' ? 'Dekningsperiode:' : 'Coverage Duration:'}</span>
                      <span className="font-bold text-slate-900">{tripDays} {locale === 'no' ? 'dager' : 'Days'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{locale === 'no' ? 'Total forsikringspremie:' : 'Total Policy Premium:'}</span>
                      <span className="text-emerald-600 font-black text-base">
                        ${(activePlanModal.dailyPrice * tripDays).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPolicyIssued(true)}
                    className="w-full py-4 bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="font-black text-[#003087]">Pay</span>
                    <span className="font-black text-[#0079C1]">Pal</span>
                    <span className="font-bold text-slate-900">
                      • {locale === 'no' ? 'Umiddelbar aktivering' : 'Instant Policy Checkout'} (${(activePlanModal.dailyPrice * tripDays).toFixed(2)})
                    </span>
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

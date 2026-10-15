'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { MemberTravelProfile } from '@/lib/types';
import {
  User,
  Shield,
  Plane,
  Hotel,
  Compass,
  CheckCircle2,
  X,
  Save,
  Bell,
  Sparkles,
  Lock,
  Plus,
  Trash2,
} from 'lucide-react';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LOCAL_PROFILE_KEY = 'atlas_member_travel_profile';

export function getStoredTravelProfile(): MemberTravelProfile {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    homeAirport: 'OSL',
    preferredCabinClass: 'business',
    seatPreference: 'window',
    bedPreference: 'king',
    dietaryRestrictions: 'none',
    hotelStylePreference: 'ultra_luxury',
    autoFillBookings: true,
    proactiveRemindersEnabled: true,
  };
}

export default function MemberProfileModal({ isOpen, onClose }: MemberProfileModalProps) {
  const { locale } = useLanguage();
  const isNo = locale === 'no';
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'identity' | 'preferences' | 'loyalty' | 'sentinel'>('identity');
  const [profile, setProfile] = useState<MemberTravelProfile>(getStoredTravelProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New loyalty entry inputs
  const [newProgram, setNewProgram] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProfile(getStoredTravelProfile());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
      window.dispatchEvent(new CustomEvent('atlas-profile-updated', { detail: profile }));
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 900);
    } catch (err) {
      console.warn('Failed saving profile:', err);
    }
  };

  const addLoyaltyProgram = () => {
    if (!newProgram.trim() || !newNumber.trim()) return;
    const existing = profile.loyaltyPrograms || [];
    setProfile({
      ...profile,
      loyaltyPrograms: [...existing, { program: newProgram.trim(), memberNumber: newNumber.trim() }],
    });
    setNewProgram('');
    setNewNumber('');
  };

  const removeLoyaltyProgram = (index: number) => {
    const existing = profile.loyaltyPrograms || [];
    setProfile({
      ...profile,
      loyaltyPrograms: existing.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900 font-sans">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 sm:p-6 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                {isNo ? 'Valgfri Medlemsprofil' : 'Optional Travel Profile DNA'}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {isNo ? 'Personlig Booking- & AI-Profil' : 'Member Travel DNA & AI Personalization'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TAB NAV */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'identity'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isNo ? 'Pass & Identitet' : 'Passport Identity'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'preferences'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>{isNo ? 'Reisepreferanser' : 'Flight & Hotel DNA'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('loyalty')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'loyalty'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isNo ? 'Lojalitetsprogram' : 'Loyalty Programs'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sentinel')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sentinel'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>{isNo ? 'Proaktiv AI Sentinel' : 'AI Trip Sentinel'}</span>
          </button>
        </div>

        {/* MODAL BODY FORM */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-sm">
          {/* TAB 1: IDENTITY */}
          {activeTab === 'identity' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {isNo
                    ? 'Disse opplysningene er helt valgfrie. De lagres lokalt og benyttes kun til automatisk 1-klikk utfylling av flybilletter, cruise og hotellkuponger.'
                    : 'These details are completely optional. Stored securely and utilized exclusively to 1-click auto-fill airline NDC tickets, cruises, and hotel vouchers.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Fornavn (som i passet)' : 'Legal First Name (as on passport)'}
                  </label>
                  <input
                    type="text"
                    value={profile.legalFirstName || ''}
                    onChange={(e) => setProfile({ ...profile, legalFirstName: e.target.value })}
                    placeholder="f.eks. Pål"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Etternavn (som i passet)' : 'Legal Last Name (as on passport)'}
                  </label>
                  <input
                    type="text"
                    value={profile.legalLastName || ''}
                    onChange={(e) => setProfile({ ...profile, legalLastName: e.target.value })}
                    placeholder="f.eks. Juritzen"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Passnummer' : 'Passport Number'}
                  </label>
                  <input
                    type="text"
                    value={profile.passportNumber || ''}
                    onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value.toUpperCase() })}
                    placeholder="f.eks. NO12345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Passets Utløpsdato' : 'Passport Expiry Date'}
                  </label>
                  <input
                    type="date"
                    value={profile.passportExpiry || ''}
                    onChange={(e) => setProfile({ ...profile, passportExpiry: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Statsborgerskap' : 'Nationality'}
                  </label>
                  <input
                    type="text"
                    value={profile.nationality || ''}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    placeholder="f.eks. Norsk (NOR)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Fødselsdato' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={profile.dateOfBirth || ''}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Hjemmeflyplass (Standard avreise)' : 'Home Departure Airport'}
                  </label>
                  <select
                    value={profile.homeAirport || 'OSL'}
                    onChange={(e) => setProfile({ ...profile, homeAirport: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-semibold"
                  >
                    <option value="OSL">OSL — Oslo Gardermoen</option>
                    <option value="BGO">BGO — Bergen Flesland</option>
                    <option value="SVG">SVG — Stavanger Sola</option>
                    <option value="TRD">TRD — Trondheim Værnes</option>
                    <option value="CPH">CPH — Copenhagen Kastrup</option>
                    <option value="ARN">ARN — Stockholm Arlanda</option>
                    <option value="LHR">LHR — London Heathrow</option>
                    <option value="JFK">JFK — New York John F. Kennedy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Foretrukket Kabinklasse' : 'Preferred Cabin Class'}
                  </label>
                  <select
                    value={profile.preferredCabinClass || 'business'}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        preferredCabinClass: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm font-semibold"
                  >
                    <option value="economy">{isNo ? 'Economy' : 'Economy'}</option>
                    <option value="premium_economy">{isNo ? 'Premium Economy' : 'Premium Economy'}</option>
                    <option value="business">{isNo ? 'Business Class' : 'Business Class'}</option>
                    <option value="first">{isNo ? 'First Class / Privat' : 'First Class'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Setepreferanse' : 'Flight Seat Preference'}
                  </label>
                  <select
                    value={profile.seatPreference || 'window'}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        seatPreference: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  >
                    <option value="window">{isNo ? 'Vindusplass' : 'Window Seat'}</option>
                    <option value="aisle">{isNo ? 'Midtgang' : 'Aisle Seat'}</option>
                    <option value="any">{isNo ? 'Ingen preferanse' : 'No Preference'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Sengekonfigurasjon' : 'Hotel Bed Preference'}
                  </label>
                  <select
                    value={profile.bedPreference || 'king'}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bedPreference: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  >
                    <option value="king">{isNo ? 'King Size Dobbelseng' : 'King Size Bed'}</option>
                    <option value="twin">{isNo ? 'To Enkeltsenger (Twin)' : 'Twin Beds'}</option>
                    <option value="any">{isNo ? 'Ingen preferanse' : 'No Preference'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Kostholdsrestriksjoner' : 'Dietary Restrictions'}
                  </label>
                  <select
                    value={profile.dietaryRestrictions || 'none'}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        dietaryRestrictions: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  >
                    <option value="none">{isNo ? 'Ingen restriksjoner' : 'None / Omnivore'}</option>
                    <option value="vegetarian">{isNo ? 'Vegetarisk' : 'Vegetarian'}</option>
                    <option value="vegan">{isNo ? 'Vegansk' : 'Vegan'}</option>
                    <option value="halal">{isNo ? 'Halal' : 'Halal'}</option>
                    <option value="kosher">{isNo ? 'Kosher' : 'Kosher'}</option>
                    <option value="gluten_free">{isNo ? 'Glutenfri' : 'Gluten-Free'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isNo ? 'Hotellstil & Stemning' : 'Hotel Ambience & Style'}
                  </label>
                  <select
                    value={profile.hotelStylePreference || 'ultra_luxury'}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        hotelStylePreference: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  >
                    <option value="ultra_luxury">{isNo ? 'Klassisk Ultra-Luksus (Palace/Grand)' : 'Ultra-Luxury Grand Hotel'}</option>
                    <option value="boutique">{isNo ? 'Intim Luksus Boutique' : 'Bespoke Luxury Boutique'}</option>
                    <option value="modern_resort">{isNo ? 'Moderne Strand- & Sparesort' : 'Modern Luxury Beach/Spa Resort'}</option>
                    <option value="historic">{isNo ? 'Historisk Landemerke' : 'Historic Landmark Estate'}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOYALTY PROGRAMS */}
          {activeTab === 'loyalty' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                {isNo
                  ? 'Legg inn dine frequent flyer-numre og hotellprogrammer. AI-agenten overfører disse automatisk ved bestilling.'
                  : 'Add your frequent flyer and hotel loyalty accounts. The AI agent automatically attaches them during booking.'}
              </p>

              {/* LIST EXISTING */}
              <div className="space-y-2">
                {profile.loyaltyPrograms && profile.loyaltyPrograms.length > 0 ? (
                  profile.loyaltyPrograms.map((lp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{lp.program}</div>
                        <div className="font-mono text-slate-500">{lp.memberNumber}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLoyaltyProgram(idx)}
                        className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                        title="Fjern"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-300 text-center text-xs text-slate-400">
                    {isNo ? 'Ingen lojalitetsprogrammer lagt til ennå.' : 'No loyalty programs added yet.'}
                  </div>
                )}
              </div>

              {/* ADD NEW */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Program (f.eks. SAS EuroBonus, BA Club)"
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Medlemsnummer (f.eks. EB123456789)"
                    value={newNumber}
                    onChange={(e) => setNewNumber(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={addLoyaltyProgram}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isNo ? 'Legg til' : 'Add'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI SENTINEL TOGGLES */}
          {activeTab === 'sentinel' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {isNo ? '1-Klikk Automatisk Utfylling' : '1-Click Checkout Auto-Fill'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isNo
                        ? 'Forhåndsutfyller navn, pass, lojalitetsnumre og preferanser automatisk ved bestilling.'
                        : 'Pre-populates guest name, passport, frequent flyer IDs, and preferences instantly.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.autoFillBookings ?? true}
                    onChange={(e) => setProfile({ ...profile, autoFillBookings: e.target.checked })}
                    className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                </div>

                <div className="border-t border-indigo-200/60 pt-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                      {isNo ? 'Proaktiv Reise-Sentinel & Avviksvarsler' : 'Proactive Trip Gap Sentinel'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {isNo
                        ? 'Varsler deg hvis du har hotell uten flybillett, sen ankomst uten transfer, eller manglende cruise-hotell.'
                        : 'Alerts you if a hotel is booked without a flight, late arrival lacks transfer, or embarkation lacks buffer.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.proactiveRemindersEnabled ?? true}
                    onChange={(e) => setProfile({ ...profile, proactiveRemindersEnabled: e.target.checked })}
                    className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isNo ? '100% Konfidensiell Medlemsdata' : '100% Confidential Member Storage'}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
              >
                {isNo ? 'Avbryt' : 'Cancel'}
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>{isNo ? 'Lagret!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isNo ? 'Lagre Preferanser' : 'Save Travel DNA'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { MemberTravelProfile } from '@/lib/types';
import MemberProfileModal from '@/components/MemberProfileModal';
import {
  Calendar,
  Building2,
  Download,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  User,
  Sparkles,
  Plane,
  AlertTriangle,
  MapPin,
  Bot,
} from 'lucide-react';

export default function MyTripsPage() {
  const { user, isMember, bookings } = useAuth();
  const { formatPrice } = useCurrency();
  const { t, locale } = useLanguage();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [travelProfile, setTravelProfile] = useState<MemberTravelProfile | null>(null);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem('atlas_member_travel_profile');
        if (stored) {
          setTravelProfile(JSON.parse(stored));
        }
      } catch (e) {
        // ignore
      }
    };
    loadProfile();
    window.addEventListener('atlas-profile-updated', loadProfile);
    return () => window.removeEventListener('atlas-profile-updated', loadProfile);
  }, []);

  const triggerAuraItinerary = (hotelCity: string, hotelName: string) => {
    const prompt = locale === 'no'
      ? `Skriv en fullstendig reiseplan og foreslå eksklusive utflukter, restauranter og severdigheter før og etter innsjekking for mitt opphold på ${hotelName} i ${hotelCity}.`
      : `Write a complete day-by-day travel plan and suggest curated luxury outings, dining, and activities before and after check-in for my stay at ${hotelName} in ${hotelCity}.`;
    window.dispatchEvent(new CustomEvent('open-concierge', { detail: { prompt } }));
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              {locale === 'no' ? 'Medlemsoversikt' : 'My Confidential Reservations'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Mine reiser og bestillinger' : 'My Bookings & Itineraries'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {locale === 'no'
                ? 'Bekreftede hotellopphold, flybilletter og aktive reservasjoner.'
                : 'Confirmed wholesale hotel check-in vouchers, NDC flight records, and active travel bookings.'}
            </p>
          </div>

          {/* Quick stats and Travel DNA Action */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:to-indigo-900 text-white rounded-2xl border border-amber-500/30 shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                <User className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-black tracking-wider text-amber-400 flex items-center gap-1">
                  <span>{locale === 'no' ? 'Reiseprofil og pass' : 'Travel DNA & Profile'}</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {travelProfile?.homeAirport
                    ? `${travelProfile.homeAirport} • ${travelProfile.cabinPreference || 'Business'}`
                    : locale === 'no'
                    ? 'Fyll ut for raskere bestilling'
                    : 'Configure for instant 1-click'}
                </div>
              </div>
            </button>

            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">
                  {locale === 'no' ? 'Bekreftet' : 'Confirmed'}
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">{bookings?.length || 0}</div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">
                  {locale === 'no' ? 'Totalt spart' : 'Saved'}
                </div>
                <div className="text-2xl font-black text-emerald-600 font-mono">
                  {formatPrice(user?.lifetimeSavings || 1480)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Proactive Trip Gap Sentinel Banner */}
        {bookings && bookings.length > 0 && (
          <div className="mb-8 p-5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 border border-amber-500/30">
                    Aura Autonomous Sentinel
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    {locale === 'no' ? 'Mangler tilknyttet flyreise' : 'Missing Inbound Flight Detected'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {locale === 'no'
                    ? `Du har reservert ${bookings[0].hotelName} i ${bookings[0].hotelCity} (${bookings[0].checkInDate} - ${bookings[0].checkOutDate}), men ingen flyreise fra ${travelProfile?.homeAirport || 'din hjemby'} er registrert. Aura kan finne First/Business-ruter eller skreddersy en dag-for-dag reiserute med utflukter.`
                    : `You have confirmed ${bookings[0].hotelName} in ${bookings[0].hotelCity} (${bookings[0].checkInDate} - ${bookings[0].checkOutDate}), but no flight from ${travelProfile?.homeAirport || 'your home airport'} is recorded. Aura can find wholesale First/Business routes or build a complete day-by-day travel plan with outings.`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
              <Link
                href={`/flights?destination=${encodeURIComponent(bookings[0].hotelCity)}`}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plane className="w-3.5 h-3.5 text-amber-400" />
                <span>{locale === 'no' ? `Finn fly til ${bookings[0].hotelCity}` : `Find Flights to ${bookings[0].hotelCity}`}</span>
              </Link>
              <button
                onClick={() => triggerAuraItinerary(bookings[0].hotelCity, bookings[0].hotelName)}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>{locale === 'no' ? 'Lag reiseplan & utflukter' : 'Generate Outings & Itinerary'}</span>
              </button>
            </div>
          </div>
        )}

        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.hotelImage}
                      alt={booking.hotelName}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                    />
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase mb-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {booking.status.toUpperCase()}
                      </div>
                      <h3 className="font-black text-lg text-slate-900">{booking.hotelName}</h3>
                      <div className="text-xs text-slate-500">{booking.roomName} • {booking.hotelCity}</div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">
                      {locale === 'no' ? 'Referanse' : 'Booking Reference'}
                    </div>
                    <div className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg inline-block mt-0.5">
                      {booking.confirmationCode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      {locale === 'no' ? 'Reisedatoer' : 'Travel Dates'}
                    </div>
                    <div className="font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>{booking.checkInDate} ➔ {booking.checkOutDate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {booking.nights} {locale === 'no' ? 'netter opphold' : 'Nights Stay'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      {locale === 'no' ? 'Betalt til nettopris' : 'Wholesale Net Paid'}
                    </div>
                    <div className="font-mono text-base font-black text-slate-900 mt-1">
                      {formatPrice(booking.totalMemberPaid)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-bold mt-0.5">
                      {locale === 'no' ? '0 kr i påslag' : '0% Retail Markup Applied'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                    <div className="text-[10px] uppercase font-bold text-emerald-700">
                      {locale === 'no' ? 'Spart medlemsrabatt' : 'Member Cash Saved'}
                    </div>
                    <div className="font-mono text-base font-black text-emerald-700 mt-1">
                      +{formatPrice(booking.totalSaved)}
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-0.5">vs. Booking.com / Expedia</div>
                  </div>
                </div>

                {/* Voucher download action & Aura Itinerary Assistant */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => triggerAuraItinerary(booking.hotelCity, booking.hotelName)}
                      className="py-2.5 px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-xs border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{locale === 'no' ? 'Planlegg reiserute med Aura' : 'Plan Outings & Itinerary with Aura'}</span>
                    </button>
                    <Link
                      href={`/flights?destination=${encodeURIComponent(booking.hotelCity)}`}
                      className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plane className="w-3.5 h-3.5 text-slate-600" />
                      <span>{locale === 'no' ? 'Legg til flyreise' : 'Connect Flight'}</span>
                    </Link>
                  </div>

                  <a
                    href={`/api/vouchers/${booking.confirmationCode}?format=pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>{locale === 'no' ? 'Last ned bekreftelse (PDF)' : 'Download Check-In Voucher (PDF)'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {locale === 'no' ? 'Ingen reserverte reiser ennå' : 'No Reserved Trips Yet'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {locale === 'no'
                ? 'Du har ingen aktive reservasjoner ennå. Utforsk over 1 million hoteller til ekte nettopriser.'
                : 'You haven\'t booked any wholesale hotels, flights, or VIP lounge passes yet. Browse 1,000,000+ luxury stays with 0% retail markup.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 py-3 px-6 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs rounded-full shadow-md transition-all cursor-pointer transform hover:scale-105"
              >
                <span>{locale === 'no' ? 'Søk hoteller' : 'Search Wholesale Hotels'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
              <button
                onClick={() => setShowProfileModal(true)}
                className="inline-flex items-center gap-2 py-3 px-6 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-xs rounded-full border border-amber-300 shadow-sm transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-amber-600" />
                <span>{locale === 'no' ? 'Oppdater reiseprofil' : 'Pre-fill Travel DNA'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Member Travel DNA Profile Modal */}
      <MemberProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}

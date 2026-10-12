'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Calendar,
  Building2,
  Download,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
} from 'lucide-react';

export default function MyTripsPage() {
  const { user, isMember, bookings } = useAuth();
  const { formatPrice } = useCurrency();
  const { t, locale } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              {locale === 'no' ? 'Mine Konfidensielle Reservasjoner' : 'My Confidential Reservations'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {locale === 'no' ? 'Mine Reiser & Reiseruter' : 'My Bookings & Itineraries'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {locale === 'no'
                ? 'Bekreftede hotellkuponger til engrospris, NDC-flybilletter og aktive bestillinger.'
                : 'Confirmed wholesale hotel check-in vouchers, NDC flight records, and active travel bookings.'}
            </p>
          </div>

          {/* Quick stats banner */}
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">
                {locale === 'no' ? 'Bekreftede reiser' : 'Total Confirmed'}
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">{bookings?.length || 0}</div>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold">
                {locale === 'no' ? 'Totalt spart' : 'Lifetime Savings'}
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {formatPrice(user?.lifetimeSavings || 1480)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
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
                      {locale === 'no' ? '0% kommersielt påslag' : '0% Retail Markup Applied'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                    <div className="text-[10px] uppercase font-bold text-emerald-700">
                      {locale === 'no' ? 'Klubbrabatt spart' : 'Member Cash Saved'}
                    </div>
                    <div className="font-mono text-base font-black text-emerald-700 mt-1">
                      +{formatPrice(booking.totalSaved)}
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-0.5">vs. Booking.com / Expedia</div>
                  </div>
                </div>

                {/* Voucher download action */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {locale === 'no'
                        ? 'Prisparitets-kupong. Vis i resepsjonen ved innsjekking.'
                        : 'Rate Parity Non-Disclosure Voucher. Present to front desk upon check-in.'}
                    </span>
                  </span>

                  <a
                    href={`/api/vouchers/${booking.confirmationCode}?format=pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>{locale === 'no' ? 'Last ned innsjekkingskupong (PDF)' : 'Download Check-In Voucher (PDF)'}</span>
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
                ? 'Du har ikke bestilt noen hoteller, flyvninger eller VIP-loungepass ennå. Utforsk over 1 000 000 luksushoteller til 0% påslag.'
                : 'You haven\'t booked any wholesale hotels, flights, or VIP lounge passes yet. Browse 1,000,000+ luxury stays with 0% retail markup.'}
            </p>
            <div className="pt-2">
              <Link
                href="/hotels"
                className="inline-flex items-center gap-2 py-3 px-6 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs rounded-full shadow-md transition-all cursor-pointer transform hover:scale-105"
              >
                <span>{locale === 'no' ? 'Søk engroshoteller' : 'Search Wholesale Hotels'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

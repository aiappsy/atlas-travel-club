'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MEMBERSHIP_TIERS } from '@/lib/mockData';
import DigitalMemberCard from '@/components/DigitalMemberCard';
import AuthModal from '@/components/AuthModal';
import {
  CreditCard,
  Sparkles,
  Award,
  TrendingDown,
  Calendar,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function MembershipPage() {
  const { user, isMember, upgradeTier, bookings } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
            <CreditCard className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Member Portal</h2>
          <p className="text-xs text-slate-500">
            Sign in to access your digital member card, scannable QR passes, and wholesale reservation history.
          </p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
          >
            Sign In / Join VIP Club
          </button>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-sky-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Membership Status
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">{user.displayName}&apos;s Member Portal</h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Member ID: <strong className="font-mono text-amber-300">{user.memberId}</strong> • Valid through {user.validUntil}
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div>
              <div className="text-[10px] text-slate-300 uppercase font-bold">Lifetime Savings</div>
              <div className="text-2xl font-black text-emerald-400">${user.lifetimeSavings}</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-[10px] text-slate-300 uppercase font-bold">Total Bookings</div>
              <div className="text-2xl font-black text-white">{user.totalBookings}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Digital Card Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sky-600" />
                  Your Digital Member Pass
                </h3>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full uppercase border border-amber-200">
                  {user.tier} Tier
                </span>
              </div>

              {/* Pass Component */}
              <DigitalMemberCard user={user} />

              <div className="pt-2 text-center text-xs text-slate-400">
                Present this card at check-in or scan QR code for merchant privileges.
              </div>
            </div>

            {/* Membership Upgrade Options */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Upgrade Membership Tier
              </h3>
              <div className="space-y-2">
                {MEMBERSHIP_TIERS.filter((t) => t.id !== 'free').map((tier) => {
                  const isCurrent = user.tier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'border-emerald-500 bg-emerald-50/40'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{tier.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {tier.wholesaleHotelDiscount} • ${tier.priceAnnual}/yr
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          Current Plan
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            upgradeTier(tier.id);
                            alert(`Tier updated to ${tier.name}`);
                          }}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Switch
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Bookings & Activity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Your Wholesale Reservations
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage upcoming trips and download check-in vouchers.
                  </p>
                </div>
                <Link
                  href="/hotels"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Book New Stay
                </Link>
              </div>

              {/* Bookings List */}
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.hotelImage}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">
                              {booking.hotelName}
                            </h4>
                            <div className="text-xs text-slate-500">
                              {booking.roomName} • {booking.hotelCity}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                            {booking.status}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1 font-mono">
                            Ref: {booking.confirmationCode}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-sky-600" />
                          <span>{booking.checkInDate} to {booking.checkOutDate} ({booking.nights} nights)</span>
                        </div>

                        <div className="font-bold text-slate-900">
                          Paid: ${booking.totalMemberPaid}{' '}
                          <span className="text-emerald-600 font-extrabold">(Saved ${booking.totalSaved})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-slate-700">No Wholesale Bookings Yet</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Start exploring 1,000,000+ wholesale hotels and save up to 70%.
                  </p>
                  <Link
                    href="/hotels"
                    className="mt-4 inline-block px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
                  >
                    Search Hotels
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

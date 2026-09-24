'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { MEMBERSHIP_TIERS } from '@/lib/mockData';
import { TierPlan } from '@/lib/types';
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
  Download,
  Lock,
  Zap,
  Check,
  HelpCircle,
  Clock,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Percent,
  Compass
} from 'lucide-react';
import Link from 'next/link';

function MembershipContent() {
  const { user, isMember, upgradeTier, bookings, toggleDemoMode } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authTitle, setAuthTitle] = useState<string | undefined>(undefined);
  const [authSubtitle, setAuthSubtitle] = useState<string | undefined>(undefined);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  // Pending hotel parameters if navigated from a hotel page or search card
  const hotelId = searchParams.get('hotelId');
  const hotelName = searchParams.get('hotelName');
  const hotelCity = searchParams.get('hotelCity');
  const wholesaleRate = searchParams.get('wholesaleRate');
  const savings = searchParams.get('savings');
  const totalSavings = searchParams.get('totalSavings');
  const totalWholesale = searchParams.get('totalWholesale');
  const totalRetail = searchParams.get('totalRetail');
  const nights = searchParams.get('nights') || '3';
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  const hasPendingHotel = Boolean(hotelId && hotelName);

  const openSignUpModal = (tierId: string, tierName: string) => {
    setSelectedTier(tierId);
    setAuthMode('signup');
    setAuthTitle(`Join ATLAS as a ${tierName} Member`);
    setAuthSubtitle('Complete your membership to unlock confidential closed-bed wholesale rates with 0% markup.');
    setIsAuthOpen(true);
  };

  const openSignInModal = () => {
    setAuthMode('login');
    setAuthTitle('Member Sign In');
    setAuthSubtitle('Access your digital member pass and reserved wholesale bookings.');
    setIsAuthOpen(true);
  };

  // If user is already an authenticated active member, render their VIP Member Portal
  if (user && isMember) {
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
          {/* Pending Hotel Banner if member navigated from a hotel room */}
          {hasPendingHotel && (
            <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/50 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Membership Verified: Closed Bed Rates Unlocked
                </div>
                <h3 className="text-xl font-black text-white">
                  Ready to book {hotelName} ({hotelCity || 'Destination'})
                </h3>
                <p className="text-xs text-slate-300">
                  Wholesale Rate: <strong className="text-emerald-400 font-mono">${wholesaleRate || '169'}/night</strong> • Total: <strong className="text-white">${totalWholesale || '507'}</strong> for {nights} nights.
                  {totalSavings && <span className="text-emerald-400 font-bold ml-1.5">(Save ${totalSavings})</span>}
                </p>
              </div>
              <Link
                href={`/hotels/${hotelId}?checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&nights=${nights}`}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl flex items-center gap-2 shrink-0 transition-all transform hover:scale-105"
              >
                <span>Complete Booking Now ➔</span>
              </Link>
            </div>
          )}

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
                              upgradeTier(tier.id as any);
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

              {/* Payout & Payment Preference Settings */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  Payout & Refund Routing
                </h3>
                <p className="text-[11px] text-slate-500">
                  Choose where your Pruvo price-drop refunds and AirHelp $650 delay compensation are deposited:
                </p>
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-emerald-500 bg-emerald-50/50 cursor-pointer">
                    <input type="radio" name="payoutPref" defaultChecked className="text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Original Payment Card / PayPal / Bank</div>
                      <div className="text-[10px] text-slate-500">Direct refund back to whatever card you paid with ($0 fee)</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 cursor-pointer">
                    <input type="radio" name="payoutPref" className="text-emerald-600 focus:ring-emerald-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">ATLAS Obsidian Visa® Card</div>
                      <div className="text-[10px] text-slate-500">Instant credit with 0% FX fees + 5% card swipe cashback</div>
                    </div>
                  </label>
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

  // NON-MEMBER VISITOR LANDING VIEW: Rich Sign-Up Section explaining Closed Bed Rates & Rate Parity
  return (
    <div className="bg-slate-950 text-white min-h-screen pb-24 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Notice Ribbon */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 py-2.5 px-4 text-center text-xs font-black tracking-wide shadow-md">
        🔒 Closed-Loop Private Membership: B2B Wholesale Bedbank Rates are 100% Exempt from Public Rate Parity Laws
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        {/* Pending Hotel Stay Callout Banner */}
        {hasPendingHotel && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border-2 border-amber-400 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
            <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  Wholesale Allocation Pending • Sign-Up Required to Book
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  {hotelName}
                </h2>
                <p className="text-slate-300 text-sm">
                  {hotelCity ? `${hotelCity} • ` : ''}
                  {nights} Nights {checkIn && checkOut ? `(${checkIn} to ${checkOut})` : ''}
                </p>
                <div className="text-xs text-amber-300/90 font-medium pt-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Public Rate Parity rules forbid non-member checkout. Activate membership below to lock in this net rate.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="text-center sm:text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Public Retail Total</div>
                  <div className="text-lg font-bold text-rose-400 line-through font-mono">
                    ${totalRetail || (Number(wholesaleRate || 169) + Number(savings || 122)) * Number(nights)}
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>

                <div className="text-center sm:text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Wholesale Net Total</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    ${totalWholesale || Number(wholesaleRate || 169) * Number(nights)}
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-center">
                  <div className="text-[10px] uppercase font-bold">Instant Savings</div>
                  <div className="text-base font-black font-mono">
                    -${totalSavings || Number(savings || 122) * Number(nights)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Private Closed-Loop Wholesale Travel Club
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Why You Must Be a Member to Book Wholesale
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed">
            By international hospitality law, raw B2B bedbank rates cannot be sold to the open public. Membership gives you legal, password-protected access to 0% retail markup pricing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={openSignInModal}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Already a member? Sign in to your account ➔
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={toggleDemoMode}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
            >
              Instant 1-Click VIP Demo Activation (Test Rates)
            </button>
          </div>
        </div>
      </div>

      {/* 3 Pillars Explaining the Closed-Loop Bedbank Secret */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-black">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1. The Public &quot;Rate Parity&quot; Trap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When hotels partner with Expedia and Booking.com, contracts legally bind them never to publicly advertise lower prices anywhere on the open internet. This inflates public hotel rates by 20% to 45% to cover billions in Google search advertising.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-black">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">2. B2B Bedbanks &amp; Closed Beds</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To sell surplus rooms without breaching public parity, luxury hotels quietly dump inventory into B2B clearinghouses (Hotelbeds, WebBeds). By statute, these net rates can only be booked behind a gated, private membership credential.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-400/10 text-sky-400 flex items-center justify-center font-black">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">3. Zero Markup Pass-Through</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike retail OTAs, ATLAS earns revenue through predictable annual club subscriptions. We do not markup room prices. 100% of raw wholesale savings ($50 to $400/night) pass directly to our registered club members.
            </p>
          </div>
        </div>
      </div>

      {/* Membership Tiers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Choose Your Membership Tier to Start Booking
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Your membership pays for itself on your very first stay. Select a plan below to complete registration and immediately unlock closed-bed checkout.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Pass (Save 25% + Free Visa Card)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMBERSHIP_TIERS.map((tier) => {
            const isFeatured = tier.id === 'gold';
            const price = billingCycle === 'annual' ? `$${tier.priceAnnual}` : `$${tier.priceMonthly}`;
            const cycleLabel = billingCycle === 'annual' ? '/year' : '/month';

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-amber-400 shadow-2xl relative lg:-translate-y-2'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-lg">
                    ★ Most Popular • Best Value
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {tier.id === 'free' ? 'Starter' : 'Wholesale Access'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.badgeColor} text-white`}>
                      {tier.name.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mt-2">{tier.name}</h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">{price}</span>
                    <span className="text-xs text-slate-400 font-medium">{cycleLabel}</span>
                  </div>

                  <div className="mt-2 text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 py-1 px-2.5 rounded-lg inline-block">
                    {tier.wholesaleHotelDiscount}
                  </div>

                  {/* Perks List */}
                  <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                    {tier.perksIncluded.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 leading-snug">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => openSignUpModal(tier.id, tier.name)}
                    className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer shadow-lg ${
                      isFeatured
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950'
                        : 'bg-white hover:bg-slate-100 text-slate-950'
                    }`}
                  >
                    <span>
                      {hasPendingHotel
                        ? `Join to Book ${hotelName?.substring(0, 14)}...`
                        : `Select & Join ${tier.name}`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-[10px] text-center text-slate-400">
                    Instant digital activation • Cancel anytime
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30-Day Rate Parity Guarantee */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-black text-white">
            100% Rate Parity Money-Back Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            If within 30 days of joining you find a publicly available price on Expedia or Booking.com for an identical room and date that ATLAS cannot beat at raw wholesale, we will refund 100% of your membership fee immediately.
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
        customTitle={authTitle}
        customSubtitle={authSubtitle}
      />
    </div>
  );
}

export default function MembershipPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-sm">
          Loading membership portal...
        </div>
      }
    >
      <MembershipContent />
    </Suspense>
  );
}

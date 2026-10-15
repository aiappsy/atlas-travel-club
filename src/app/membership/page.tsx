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
  Compass,
  Ticket,
  Loader2,
  Plane
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { usePlatform } from '@/context/PlatformContext';
import { useLanguage } from '@/context/LanguageContext';
import { getStoredVouchers } from '@/lib/vouchers';

function MembershipContent() {
  const { user, isMember, upgradeTier, bookings, toggleDemoMode } = useAuth();
  const { formatPrice, currency } = useCurrency();
  const { features } = usePlatform();
  const { t, locale } = useLanguage();
  const isTrialActive = features.enableFreeTrial ?? true;
  const trialDays = features.freeTrialDays ?? 14;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authTitle, setAuthTitle] = useState<string | undefined>(undefined);
  const [authSubtitle, setAuthSubtitle] = useState<string | undefined>(undefined);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  // Dynamic Membership Discount Voucher State
  const [membershipVoucherInput, setMembershipVoucherInput] = useState('');
  const [appliedMembershipVoucher, setAppliedMembershipVoucher] = useState<{
    code: string;
    discountAmount: number;
    discountType: string;
    discountValue: number;
    message: string;
  } | null>(null);
  const [isMembershipVoucherOpen, setIsMembershipVoucherOpen] = useState(false);
  const [membershipVoucherLoading, setMembershipVoucherLoading] = useState(false);
  const [membershipVoucherError, setMembershipVoucherError] = useState<string | null>(null);

  const handleApplyMembershipVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = membershipVoucherInput.trim().toUpperCase();
    if (!clean) return;

    setMembershipVoucherLoading(true);
    setMembershipVoucherError(null);
    try {
      const customVouchers = getStoredVouchers();
      const res = await fetch('/api/vouchers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: clean,
          subtotal: 500, // sample membership tier baseline
          currency: 'USD',
          target: 'membership',
          customVouchers,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setMembershipVoucherError(data.message || 'Invalid or expired voucher code.');
      } else {
        setAppliedMembershipVoucher({
          code: data.code,
          discountAmount: data.discountAmount,
          discountType: data.discountType,
          discountValue: data.discountValue,
          message: data.message,
        });
        setMembershipVoucherError(null);
      }
    } catch {
      setMembershipVoucherError('Network error validating voucher.');
    } finally {
      setMembershipVoucherLoading(false);
    }
  };

  const handleRemoveMembershipVoucher = () => {
    setAppliedMembershipVoucher(null);
    setMembershipVoucherInput('');
    setMembershipVoucherError(null);
  };

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

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const hasPendingHotel = Boolean(hotelId && hotelName);

  const handleDirectStripeCheckout = async (tierId: string, tierName: string) => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId,
          billingCycle,
          userEmail: user?.email || undefined,
          userId: user?.uid || 'guest',
          discountCode: appliedMembershipVoucher?.code || undefined,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        openSignUpModal(tierId, tierName);
      }
    } catch {
      openSignUpModal(tierId, tierName);
    } finally {
      setCheckoutLoading(false);
    }
  };

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
        <div className="bg-white text-slate-900 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Active Membership Status
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{user.displayName}&apos;s Member Portal</h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Member ID: <strong className="font-mono text-amber-600">{user.memberId}</strong> • Valid through {user.validUntil}
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Lifetime Savings</div>
                <div className="text-2xl font-black text-emerald-600">{formatPrice(user.lifetimeSavings)}</div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">Total Bookings</div>
                <div className="text-2xl font-black text-slate-900">{user.totalBookings}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Pending Hotel Banner if member navigated from a hotel room */}
          {hasPendingHotel && (
            <div className="mb-8 p-6 rounded-3xl bg-white border-2 border-emerald-500/40 text-slate-900 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-wider border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Membership Verified: Closed Bed Rates Unlocked
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Ready to book {hotelName} ({hotelCity || 'Destination'})
                </h3>
                <p className="text-xs text-slate-600">
                  Wholesale Rate: <strong className="text-emerald-600 font-mono">{formatPrice(Number(wholesaleRate || 169))}/night</strong> • Total: <strong className="text-slate-900 font-mono">{formatPrice(Number(totalWholesale || 507))}</strong> for {nights} nights.
                  {totalSavings && <span className="text-emerald-600 font-bold ml-1.5">(Save {formatPrice(Number(totalSavings))})</span>}
                </p>
              </div>
              <Link
                href={`/hotels/${hotelId}?checkIn=${checkIn || ''}&checkOut=${checkOut || ''}&nights=${nights}`}
                className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md flex items-center gap-2 shrink-0 transition-all transform hover:scale-105"
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

              {/* Active Membership Plan Details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Your Club Membership
                  </h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Active VIP
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Atlas Club Membership</span>
                    <span className="font-mono font-bold text-emerald-700 text-xs">
                      {currency === 'NOK' ? '1 290 kr/år' : currency === 'EUR' ? '115 €/yr' : currency === 'GBP' ? '£99/yr' : '$120/yr'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    0% retail markup across 1,000,000+ luxury hotels, NDC flight clearing, and EU261 €600 delay sentinel.
                  </p>
                  <div className="pt-2 text-[11px] text-slate-500 border-t border-emerald-200/60 flex items-center justify-between">
                    <span>Valid through: {user.validUntil}</span>
                    <span className="text-emerald-700 font-semibold">Full Privileges Active</span>
                  </div>
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
                      <div className="text-xs font-bold text-slate-900">ATLAS Obsidian Visa® Card <span className="text-[10px] text-amber-600 font-semibold">(Coming Soon)</span></div>
                      <div className="text-[10px] text-slate-500">Auto-credit once physical card rollout commences (0% FX fees)</div>
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

                          <div className="flex items-center gap-3">
                            <div className="font-bold text-slate-900">
                              Paid: {formatPrice(booking.totalMemberPaid)}{' '}
                              <span className="text-emerald-600 font-extrabold">(Saved {formatPrice(booking.totalSaved)})</span>
                            </div>
                            <a
                              href={`/api/bookings/voucher?format=html&bookingRef=${encodeURIComponent(booking.confirmationCode)}&hotelName=${encodeURIComponent(booking.hotelName)}&guestName=${encodeURIComponent(user?.displayName || 'VIP Member')}&checkIn=${booking.checkInDate}&checkOut=${booking.checkOutDate}&roomType=${encodeURIComponent(booking.roomName)}&nights=${booking.nights}&totalPaid=${booking.totalMemberPaid}&savings=${booking.totalSaved}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                              title="Download official hotel check-in voucher"
                            >
                              <Download className="w-3 h-3 text-slate-950" />
                              <span>Voucher PDF</span>
                            </a>
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
                      Start exploring 1,000,000+ wholesale hotels and save 20% to 45%.
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
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-24 font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Top Notice Ribbon */}
      <div className="bg-amber-100/80 border-b border-amber-200/80 text-amber-900 py-2.5 px-4 text-center text-xs font-bold tracking-wide">
        🔒 Closed-Loop Private Membership: B2B Wholesale Bedbank Rates are 100% Exempt from Public Rate Parity Laws
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        {/* Pending Hotel Stay Callout Banner */}
        {hasPendingHotel && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-400 shadow-xl relative overflow-hidden animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                  <Lock className="w-3.5 h-3.5" />
                  Wholesale Allocation Pending • Sign-Up Required to Book
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">
                  {hotelName}
                </h2>
                <p className="text-slate-600 text-sm">
                  {hotelCity ? `${hotelCity} • ` : ''}
                  {nights} Nights {checkIn && checkOut ? `(${checkIn} to ${checkOut})` : ''}
                </p>
                <div className="text-xs text-amber-700 font-medium pt-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Public Rate Parity rules forbid non-member checkout. Activate membership below to lock in this net rate.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="text-center sm:text-left">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Public Retail Total</div>
                  <div className="text-lg font-bold text-rose-500 line-through font-mono">
                    {formatPrice(Number(totalRetail || (Number(wholesaleRate || 169) + Number(savings || 122)) * Number(nights)))}
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

                <div className="text-center sm:text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-600">Wholesale Net Total</div>
                  <div className="text-3xl font-black text-emerald-600 font-mono">
                    {formatPrice(Number(totalWholesale || Number(wholesaleRate || 169) * Number(nights)))}
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-center">
                  <div className="text-[10px] uppercase font-bold">Instant Savings</div>
                  <div className="text-base font-black font-mono">
                    -{formatPrice(Number(totalSavings || Number(savings || 122) * Number(nights)))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Already hold an ATLAS Club membership?</span>
              </span>
              <button
                type="button"
                onClick={openSignInModal}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer text-xs"
              >
                <span>Sign In to Unlock &amp; Book Rate ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {locale === 'no' ? 'Eksklusiv medlemsklubb' : 'Private Closed-Loop Wholesale Travel Club'}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
            {locale === 'no' ? 'Hvorfor må du være medlem for å bestille til engrospris?' : 'Why You Must Be a Member to Book Wholesale'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg leading-relaxed">
            {locale === 'no'
              ? 'I henhold til internasjonale prisparitetsregler kan ikke lukkede B2B-engrospriser selges offentlig. Medlemskap gir deg lovlig, passordbeskyttet tilgang til ekte innkjøpspriser.'
              : 'By international hospitality law, raw B2B bedbank rates cannot be sold to the open public. Membership gives you legal, password-protected access to 0% retail markup pricing.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={openSignInModal}
              className="text-xs text-slate-600 hover:text-slate-900 font-bold underline cursor-pointer"
            >
              {locale === 'no' ? 'Allerede medlem? Logg inn på kontoen din ➔' : 'Already a member? Sign in to your account ➔'}
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={toggleDemoMode}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-bold underline cursor-pointer"
            >
              {locale === 'no' ? 'Test plattformen med 1 klikk' : 'Instant 1-Click VIP Demo Activation (Test Rates)'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars Explaining Wholesale Travel & Protection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black border border-amber-100">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {locale === 'no' ? '1. Prisparitetsfellen' : '1. The Public Rate Parity Trap'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Når hoteller samarbeider med offentlige portaler som Expedia og Booking.com, forplikter de seg juridisk til aldri å vise lavere priser åpent. Dette tvinger opp prisene med 20–45 % for å finansiere milliardkampanjer i søkemotorer.'
                : 'When hotels partner with Expedia and Booking.com, contracts legally bind them never to publicly advertise lower prices. This inflates public hotel rates by 20% to 45% to fund billions in search ads.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black border border-emerald-100">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {locale === 'no' ? '2. B2B-grossister og lukkede priser' : '2. B2B Bedbanks & Closed Beds'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'For å selge ledig kapasitet uten å bryte prispariteten, legger kvalitetshotellene overskuddsrom inn i lukkede grossistdatabaser (WebBeds, RateHawk). Disse engrosprisene er ved lov forbeholdt lukkede medlemsklubber.'
                : 'To sell surplus rooms without breaching parity, luxury hotels dump inventory into B2B clearinghouses (WebBeds). By statute, these net rates can only be booked behind gated private memberships.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-black border border-sky-100">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {locale === 'no' ? '3. Direkte flynettverk (IATA/NDC)' : '3. Direct Airline NDC Clearing'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Direktekobling til over 300 flyselskaper fjerner gamle distribusjonsgebyrer (150–250 kr per strekning) og eliminerer kortgebyrer. Ekte nettopriser direkte fra flyselskapene med 0 kr i påslag.'
                : 'Direct connection to 300+ airlines removes old GDS distribution surcharges (€15–€25/leg) and eliminates OTA payment junk fees. Pure carrier net rates with 0% retail markup.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black border border-indigo-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {locale === 'no' ? '4. EU261-passasjervern (opptil 7 000 kr)' : '4. EU261 €600 Delay Protection'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'no'
                ? 'Automatisk overvåking av flyforsinkelser døgnet rundt. Dersom flyet ditt er over 3 timer forsinket, hjelper vi deg å kreve inntil 7 000 kr (€600) i kontanter uten provisjonskutt (i motsetning til tjenester som tar 35–50 %).'
                : 'Automated 24/7 flight delay sentinel. If your flight is delayed 3+ hours, we help you recover up to €600 (~7 000 NOK) in statutory cash with 0% legal deduction (unlike AirHelp’s 35–50% cut).'}
            </p>
          </div>
        </div>
      </div>

      {/* Single Unified Membership Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            {locale === 'no' ? 'Atlas Club-medlemskap' : 'Atlas Club Membership'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            {locale === 'no'
              ? 'Ett enkelt og transparent medlemskap som åpner lukkede B2B-engrospriser med 0 kr i bookinggebyr og 0 kr i påslag.'
              : 'One single, transparent membership that unlocks confidential closed-loop B2B wholesale rates with 0% retail markup.'}
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'no' ? 'Årsmedlemskap (Kun 107,50 kr/mnd • Beste verdi)' : 'Annual Pass (Only 107.50 NOK/mo • Best Value)'}
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'no' ? 'Månedlig betaling (129 kr/mnd)' : 'Monthly Billing (129 NOK/mo)'}
            </button>
          </div>

          {/* Promo Code Input for Membership */}
          <div className="pt-2 max-w-md mx-auto">
            {!appliedMembershipVoucher ? (
              <div>
                {!isMembershipVoucherOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsMembershipVoucherOpen(true)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer mx-auto"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Have an invitation promo code or voucher?</span>
                  </button>
                ) : (
                  <form onSubmit={handleApplyMembershipVoucher} className="space-y-2 animate-fade-in bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Apply Membership Voucher</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => { setIsMembershipVoucherOpen(false); setMembershipVoucherError(null); }}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. WELCOME20, FOUNDER50"
                        value={membershipVoucherInput}
                        onChange={(e) => setMembershipVoucherInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs uppercase text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        disabled={membershipVoucherLoading || !membershipVoucherInput.trim()}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                      >
                        {membershipVoucherLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                      </button>
                    </div>
                    {membershipVoucherError && (
                      <p className="text-xs text-rose-500 font-semibold">{membershipVoucherError}</p>
                    )}
                  </form>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs animate-fade-in max-w-sm mx-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-mono font-black text-slate-900">{appliedMembershipVoucher.code}</span>
                    <span className="text-[11px] text-emerald-700 ml-1.5">
                      ({appliedMembershipVoucher.message})
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveMembershipVoucher}
                  className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors ml-2 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* The Single Membership Card */}
        {(() => {
          const tier = MEMBERSHIP_TIERS[0];

          // Canonical fixed club membership pricing per currency (avoids fluctuating live FX rounding discrepancies):
          // NOK: 1 290 kr / year (107,50 kr/mnd) or 129 kr / month
          // EUR: 115 € / year or 12 € / month
          // GBP: £99 / year or £10 / month
          // USD: $120 / year or $12 / month
          let basePrice = 120;
          let cycleLabel = billingCycle === 'annual' ? (locale === 'no' ? '/år' : '/year') : (locale === 'no' ? '/mnd' : '/month');
          let periodSubtext = '';

          if (currency === 'NOK') {
            basePrice = billingCycle === 'annual' ? 1290 : 129;
            periodSubtext = locale === 'no'
              ? (billingCycle === 'annual' ? '1 290 kr/år (kun 107,50 kr/mnd) • 0 kr i gebyr på alt' : '129 kr/mnd • Ingen binding • 0 kr i gebyr på alt')
              : (billingCycle === 'annual' ? '1,290 NOK/yr (only 107.50 NOK/mo) • 0 kr fee on everything' : '129 NOK/mo • Cancel anytime • 0 kr fee');
          } else if (currency === 'EUR') {
            basePrice = billingCycle === 'annual' ? 115 : 12;
            periodSubtext = billingCycle === 'annual' ? '115 €/yr (~9.58 €/mo) • 0% fee on everything' : '12 €/mo • Cancel anytime • 0% fee';
          } else if (currency === 'GBP') {
            basePrice = billingCycle === 'annual' ? 99 : 10;
            periodSubtext = billingCycle === 'annual' ? '£99/yr (~£8.25/mo) • 0% fee on everything' : '£10/mo • Cancel anytime • 0% fee';
          } else {
            basePrice = billingCycle === 'annual' ? 120 : 12;
            periodSubtext = billingCycle === 'annual' ? '$120/yr ($10/mo) • 0% fee on everything' : '$12/mo • Cancel anytime • 0% fee';
          }

          let discountedPrice = basePrice;
          if (appliedMembershipVoucher) {
            if (appliedMembershipVoucher.discountType === 'percentage') {
              discountedPrice = Math.round(basePrice * (1 - appliedMembershipVoucher.discountValue / 100));
            } else {
              discountedPrice = Math.max(0, basePrice - appliedMembershipVoucher.discountValue);
            }
          }
          const hasDiscount = discountedPrice < basePrice;

          const formatCurrencyValue = (val: number) => {
            if (currency === 'NOK') return `${val.toLocaleString('nb-NO')} kr`;
            if (currency === 'EUR') return `${val.toLocaleString()} €`;
            if (currency === 'GBP') return `£${val.toLocaleString()}`;
            return `$${val.toLocaleString()}`;
          };

          const price = formatCurrencyValue(discountedPrice);
          const rawPriceDisplay = formatCurrencyValue(basePrice);

          return (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-500 shadow-xl relative max-w-2xl mx-auto space-y-6">
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md">
                ★ All-Inclusive Private Travel Club Pass
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Full Access Membership
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{tier.name}</h3>
                  <div className="mt-2 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 py-1 px-2.5 rounded-lg inline-block">
                    {tier.wholesaleHotelDiscount}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  {hasDiscount && (
                    <div className="text-lg font-bold text-slate-400 line-through font-mono">
                      {rawPriceDisplay}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1 sm:justify-end">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">{price}</span>
                    <span className="text-xs text-slate-500 font-medium">{cycleLabel}</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">{periodSubtext}</span>
                </div>
              </div>

              {/* Perks in 2 clean columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {tier.perksIncluded.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 leading-snug">{perk}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleDirectStripeCheckout(tier.id, tier.name)}
                  disabled={checkoutLoading}
                  className="w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white shadow-lg transition-all transform hover:scale-[1.01] cursor-pointer"
                >
                  <span>
                    {checkoutLoading
                      ? (locale === 'no' ? 'Viderekobler til sikker Stripe-kasse...' : 'Redirecting to Secure Stripe Checkout...')
                      : hasPendingHotel
                      ? `${locale === 'no' ? 'Bli medlem for å bestille' : 'Join to Book'} ${hotelName?.substring(0, 16)}...`
                      : isTrialActive
                      ? (locale === 'no' ? `Start ditt ${trialDays}-dagers prøvemedlemskap nå` : `Start Your ${trialDays}-Day Trial Membership Now`)
                      : (locale === 'no' ? 'Bli medlem i Atlas Klubb' : 'Join Atlas Club Membership')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-center text-slate-500">
                  {locale === 'no'
                    ? '0 kr å betale i dag • Umiddelbar digital aktivering • Avslutt når som helst • Beskyttet av 30 dagers prisgaranti'
                    : '$0 due today • Instant digital activation • Cancel anytime • Protected by 30-day rate parity guarantee'}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 30-Day Rate Parity Guarantee */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            100% Rate Parity Money-Back Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 text-sm">
          Loading membership portal...
        </div>
      }
    >
      <MembershipContent />
    </Suspense>
  );
}

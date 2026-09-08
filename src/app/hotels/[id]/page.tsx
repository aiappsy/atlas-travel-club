'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_HOTELS } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import {
  MapPin,
  Star,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Users,
  Bed,
  Calendar,
  Lock,
  ArrowLeft,
  CreditCard,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function HotelDetailPage() {
  const params = useParams();
  const { user, addBooking } = useAuth();
  const hotelId = params?.id as string;

  const hotel = MOCK_HOTELS.find((h) => h.id === hotelId) || MOCK_HOTELS[0];

  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);
  const [nights] = useState(3);
  const [checkInDate] = useState('2026-09-15');
  const [checkOutDate] = useState('2026-09-18');
  const [guests] = useState(2);
  const [paymentProvider, setPaymentProvider] = useState<'paypal' | 'credit_card'>('paypal');
  
  // Guest Manifest Details
  const [firstName, setFirstName] = useState(user?.displayName.split(' ')[0] || 'Alex');
  const [lastName, setLastName] = useState(user?.displayName.split(' ')[1] || 'Harrison');
  const [guestEmail, setGuestEmail] = useState(user?.email || 'alex.harrison@gmail.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-5678');
  const [specialRequests, setSpecialRequests] = useState('High floor preferred, late check-in');

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPublic = selectedRoom.publicRetailPrice * nights;
  const totalMember = selectedRoom.wholesaleMemberPrice * nights;
  const totalSaved = totalPublic - totalMember;
  const commissionCashback = Math.round(totalPublic * 0.12);

  const handleConfirmBooking = async () => {
    setLoading(true);
    setTimeout(async () => {
      await addBooking({
        userId: user?.uid || 'guest-user',
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.thumbnail,
        hotelCity: hotel.city,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkInDate,
        checkOutDate,
        nights,
        guests,
        totalPublicPrice: totalPublic,
        totalMemberPaid: totalMember,
        totalSaved,
        status: 'confirmed',
        confirmationCode: `HC-HB-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setLoading(false);
      setBookingConfirmed(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back Link */}
        <Link
          href="/hotels"
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Wholesale Hotel Search
        </Link>

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {hotel.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{hotel.rating}</span>
                <span className="text-slate-400">({hotel.reviewCount} member reviews)</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{hotel.name}</h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>{hotel.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-xl text-white">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-800">
                  Wholesale Net Price
                </div>
                <div className="text-sm font-black text-emerald-900">
                  Save {hotel.savingsPercentage}% vs Expedia
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High Res Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 h-72 sm:h-80 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <div className="md:col-span-2 h-full">
            <img
              src={hotel.thumbnail}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full">
            {hotel.images.slice(1, 3).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-1/2 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Main Content & Reservation Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Details & Room Selection */}
          <div className="lg:col-span-7 space-y-8">
            {/* Room Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900">1. Select Wholesale Room Tier</h2>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Hotelbeds Direct Net Feed
                </span>
              </div>

              <div className="space-y-4">
                {hotel.rooms.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50/40 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900">{room.name}</h3>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Bed className="w-3.5 h-3.5" /> {room.bedType}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" /> Up to {room.maxGuests} Guests
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">{room.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs text-slate-400 line-through">
                            Retail: ${room.publicRetailPrice}/nt
                          </div>
                          <div className="text-xl font-black text-emerald-600">
                            ${room.wholesaleMemberPrice}
                            <span className="text-xs text-slate-500 font-normal"> /night</span>
                          </div>
                          <button
                            type="button"
                            className={`mt-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-sky-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select Room'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Manifest Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-slate-900">2. Primary Guest Information</h2>
              <p className="text-xs text-slate-500">
                This information is directly transmitted to the resort front desk for your check-in manifest.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Email for Confirmation
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Special Requests (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Quiet room, early check-in"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Right Reservation & PayPal Checkout Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-5">
              {bookingConfirmed ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Wholesale Reservation Confirmed!</h3>
                  <p className="text-xs text-slate-500">
                    Your reservation has been locked in with Hotelbeds and confirmation sent to {guestEmail}.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left space-y-1 text-xs">
                    <div className="font-bold text-emerald-950">Wholesale Price Paid: ${totalMember}</div>
                    <div className="text-emerald-700 font-extrabold">Instant Savings: ${totalSaved}</div>
                    <div className="text-amber-700 font-bold">100% Commission Rebate: +${commissionCashback}</div>
                  </div>
                  <Link
                    href="/membership"
                    className="block w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all text-center"
                  >
                    View In Member Pass Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Wholesale Member Total
                      </div>
                      <div className="text-3xl font-black text-slate-900">
                        ${totalMember}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs line-through text-slate-400">
                        Expedia: ${totalPublic}
                      </div>
                      <div className="text-sm font-black text-emerald-600">
                        Save ${totalSaved}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase">
                      Select Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('paypal')}
                        className={`p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                          paymentProvider === 'paypal'
                            ? 'border-sky-500 bg-sky-50/60 font-bold text-sky-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-black text-[#003087]">Pay</span>
                        <span className="font-black text-[#0079C1]">Pal</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentProvider('credit_card')}
                        className={`p-3 rounded-2xl border flex items-center justify-center gap-1.5 transition-all ${
                          paymentProvider === 'credit_card'
                            ? 'border-sky-500 bg-sky-50/60 font-bold text-sky-900 shadow-sm'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 text-slate-700" />
                        <span className="text-xs font-bold">Credit Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Price Calculation Table */}
                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Public OTA Retail ({nights} nights):</span>
                      <span className="line-through">${totalPublic}</span>
                    </div>
                    <div className="flex justify-between text-slate-800 font-semibold">
                      <span>Direct B2B Net Cost:</span>
                      <span>${totalMember}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-black pt-2 border-t border-slate-100 text-sm">
                      <span>Net Cash Savings:</span>
                      <span>-${totalSaved}</span>
                    </div>
                  </div>

                  {/* PayPal Smart Checkout Button */}
                  {paymentProvider === 'paypal' ? (
                    <button
                      onClick={handleConfirmBooking}
                      disabled={loading}
                      className="w-full py-4 px-4 rounded-2xl bg-[#FFC439] hover:bg-[#F2BA36] text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="font-black text-[#003087]">Pay</span>
                      <span className="font-black text-[#0079C1]">Pal</span>
                      <span className="font-bold text-slate-900 ml-1">
                        {loading ? 'Confirming Wholesale Block...' : 'Checkout with PayPal'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handleConfirmBooking}
                      disabled={loading}
                      className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg transition-all"
                    >
                      {loading ? 'Processing...' : 'Pay with Credit Card'}
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encrypted • Instant Hotel Voucher</span>
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

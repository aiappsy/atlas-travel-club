'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';
import {
  Star,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Calendar,
  Users,
  Building2,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Globe,
  Share2,
  Heart,
  Lock,
  DollarSign,
  Award
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { ComparedHotel, RoomOption } from '@/app/api/hotels/compare/route';

export default function HotelDetailPage() {
  const { user, isMember, addBooking } = useAuth();
  const { formatPrice } = useCurrency();
  const params = useParams();
  const searchParams = useSearchParams();
  const hotelId = params?.id as string;

  const [hotel, setHotel] = useState<ComparedHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Dates & Guests from query or default
  const checkIn = searchParams.get('checkIn') || '2026-10-15';
  const checkOut = searchParams.get('checkOut') || '2026-10-18';
  const guests = searchParams.get('guests') || '2 Adults, 1 Room';

  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) || 3);

  useEffect(() => {
    async function loadHotel() {
      try {
        const res = await fetch(`/api/hotels/compare?id=${hotelId}&nights=${nights}`);
        const data = await res.json();
        if (data?.hotel) {
          setHotel(data.hotel);
          if (data.hotel.roomOptions && data.hotel.roomOptions.length > 0) {
            setSelectedRoom(data.hotel.roomOptions[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (hotelId) {
      loadHotel();
    }
  }, [hotelId, nights]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-slate-400">Loading verified property data & wholesale bedbank feeds...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 p-4 text-center">
        <h2 className="text-2xl font-black">Hotel Property Not Found</h2>
        <p className="text-slate-400 text-sm max-w-md">
          The requested property could not be loaded. Please return to the wholesale search console.
        </p>
        <Link
          href="/hotels"
          className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-sm"
        >
          Return to Wholesale Search
        </Link>
      </div>
    );
  }

  const activeImage = hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery[activePhotoIdx] || hotel.image : hotel.image;
  const currentRoom = selectedRoom || hotel.roomOptions?.[0];
  const wholesalePerNight = currentRoom ? currentRoom.wholesaleRate : hotel.prices.atlasWholesale.perNight;
  const retailPerNight = currentRoom ? currentRoom.publicRetailRate : hotel.prices.lowestOta.perNight;
  const totalWholesale = wholesalePerNight * nights;
  const totalRetail = retailPerNight * nights;
  const totalSavings = totalRetail - totalWholesale;

  return (
    <div className="bg-slate-950 text-white min-h-screen pb-24 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Breadcrumbs & Direct Verification Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <Link href="/hotels" className="hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Search</span>
            </Link>
            <span>/</span>
            <span className="text-slate-200">{hotel.city}</span>
            <span>/</span>
            <span className="text-amber-400 font-bold truncate max-w-[200px] sm:max-w-xs">{hotel.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Rate Parity Exempt</span>
            </span>

            <a
              href={hotel.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 flex items-center gap-1 transition-colors"
              title="Open Official Hotel Website in new tab"
            >
              <Globe className="w-3 h-3 text-sky-400" />
              <span>Official Hotel Site ↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                {hotel.categoryLabel}
              </span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{hotel.guestRating} / 10 Excellent ({hotel.reviewCount} reviews)</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Bedbank GDS Audit: #{hotel.audit.auditHash.substring(0, 8)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {hotel.name}
            </h1>

            <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{hotel.address}</span>
            </p>
          </div>

          {/* Quick Wholesale Price Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-emerald-500/40 shadow-xl flex items-center justify-between sm:justify-end gap-6 shrink-0">
            <div>
              <div className="text-[10px] uppercase font-black tracking-wider text-emerald-400">
                Wholesale Member Rate
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-3xl font-black text-white font-mono">{formatPrice(wholesalePerNight)}</span>
                <span className="text-xs text-slate-400">/ night</span>
              </div>
              <div className="text-[11px] text-slate-400 line-through">
                Public Retail: {formatPrice(retailPerNight)}/nt
              </div>
            </div>

            <div className="text-right">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Save {formatPrice(totalSavings)} ({hotel.prices.atlasWholesale.savingsPercent}% Off)
              </span>
              <div className="text-[11px] text-slate-400 mt-1">
                {nights} Nights Total: <strong className="text-white">{formatPrice(totalWholesale)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Photo Interactive Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Showcase Image */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden relative bg-slate-900 border border-slate-800 min-h-[360px] sm:min-h-[480px]">
            <img
              src={activeImage}
              alt={hotel.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                  Verified Physical Property Architecture
                </span>
                <div className="text-xs text-slate-300">{hotel.address}</div>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Photo {activePhotoIdx + 1} of {hotel.gallery?.length || 1}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[480px] scrollbar-none">
            {hotel.gallery && hotel.gallery.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative rounded-2xl overflow-hidden border-2 transition-all shrink-0 w-36 h-24 lg:w-full lg:h-28 cursor-pointer ${
                  activePhotoIdx === idx
                    ? 'border-amber-400 ring-2 ring-amber-400/30 scale-[1.02]'
                    : 'border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Direct Public Rate Verification Banner (Click to check live) */}
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-sky-400" />
                <span>Live Public Retail Price Verification:</span>
              </h4>
              <p className="text-xs text-slate-400">
                Click any provider below to open their live property booking page for {checkIn} to {checkOut} and verify the exact retail markup:
              </p>
            </div>
            <a
              href={hotel.prices.googleHotels.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Compare on Google Hotels ↗</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
            <a
              href={hotel.prices.expedia.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all text-center group"
            >
              <div className="font-bold text-blue-400 text-xs flex items-center justify-center gap-1">
                <span>Expedia</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">{formatPrice(hotel.prices.expedia.perNight)}</div>
              <div className="text-[10px] text-blue-400 font-semibold mt-0.5">Verify Live ↗</div>
            </a>

            <a
              href={hotel.prices.hotelsCom.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/50 transition-all text-center group"
            >
              <div className="font-bold text-rose-400 text-xs flex items-center justify-center gap-1">
                <span>Hotels.com</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-rose-400" />
              </div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">{formatPrice(hotel.prices.hotelsCom.perNight)}</div>
              <div className="text-[10px] text-rose-400 font-semibold mt-0.5">Verify Live ↗</div>
            </a>

            <a
              href={hotel.prices.agoda.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 transition-all text-center group"
            >
              <div className="font-bold text-purple-400 text-xs flex items-center justify-center gap-1">
                <span>Agoda</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-purple-400" />
              </div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">{formatPrice(hotel.prices.agoda.perNight)}</div>
              <div className="text-[10px] text-purple-400 font-semibold mt-0.5">Verify Live ↗</div>
            </a>

            <a
              href={hotel.prices.kayak.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 transition-all text-center group"
            >
              <div className="font-bold text-amber-400 text-xs flex items-center justify-center gap-1">
                <span>Kayak</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
              </div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">{formatPrice(hotel.prices.kayak.perNight)}</div>
              <div className="text-[10px] text-amber-400 font-semibold mt-0.5">Verify Live ↗</div>
            </a>

            <a
              href={hotel.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all text-center group"
            >
              <div className="font-bold text-emerald-400 text-xs flex items-center justify-center gap-1">
                <span>Hotel Direct</span>
                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
              </div>
              <div className="text-base font-bold text-slate-400 line-through mt-1">{formatPrice(hotel.prices.officialDirect?.perNight || retailPerNight)}</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Official Direct ↗</div>
            </a>
          </div>
        </div>

        {/* Main 2-Column Content: Left Details & Room Selection | Right Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Description, Amenities, Room Tiers */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Property */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-black text-white">About the Property</h3>
              <p className="text-slate-300 text-sm sm:base leading-relaxed">
                {hotel.description}
              </p>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Check-In Time</div>
                  <div className="font-bold text-white mt-0.5">{hotel.checkInTime}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Check-Out Time</div>
                  <div className="font-bold text-white mt-0.5">{hotel.checkOutTime}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400">Wholesale Clearing</div>
                  <div className="font-bold text-emerald-400 mt-0.5">0% Markup Guaranteed</div>
                </div>
              </div>
            </div>

            {/* Verified Amenities */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xl font-black text-white">Verified Amenities & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {hotel.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-semibold flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Options & Wholesale Pricing Matrix */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">Select Your Wholesale Room Tier</h3>
                <span className="text-xs text-amber-400 font-bold">
                  {hotel.roomOptions?.length || 1} Room Types Available
                </span>
              </div>

              <div className="space-y-4">
                {hotel.roomOptions && hotel.roomOptions.map((room) => {
                  const isSelected = selectedRoom?.id === room.id;
                  const roomTotalWholesale = room.wholesaleRate * nights;
                  const roomTotalRetail = room.publicRetailRate * nights;
                  const roomTotalSavings = roomTotalRetail - roomTotalWholesale;

                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-amber-400 shadow-xl'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-black text-white">{room.name}</h4>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {room.description}
                          </p>

                          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
                            <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-semibold text-slate-300">
                              🛏️ {room.bedType}
                            </span>
                            <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-semibold text-slate-300">
                              👥 {room.capacity}
                            </span>
                            <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-semibold text-slate-300">
                              📐 {room.sizeSqFt} sq ft
                            </span>
                          </div>
                        </div>

                        {/* Pricing & Selection Action */}
                        <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 shrink-0 space-y-1">
                          <div className="text-[10px] uppercase font-black text-emerald-400">
                            Wholesale Clearing
                          </div>
                          <div className="flex items-baseline gap-1 md:justify-end">
                            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                              {formatPrice(room.wholesaleRate)}
                            </span>
                            <span className="text-xs text-slate-400">/ night</span>
                          </div>
                          <div className="text-xs text-slate-400 line-through">
                            Public OTA: {formatPrice(room.publicRetailRate)}/nt
                          </div>
                          <div className="text-xs font-bold text-amber-300 pt-1">
                            You save {formatPrice(roomTotalSavings)} on {nights} nights
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Member Booking Console */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-400">
                    VIP Member Reservation
                  </div>
                  <div className="text-lg font-black text-white">Wholesale Checkout</div>
                </div>
                <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Lock className="w-4 h-4 text-emerald-400" />
                </span>
              </div>

              {/* Booking Parameters */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-black text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Selected Dates ({nights} Nights)</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {checkIn} ➔ {checkOut}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-black text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Occupancy</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {guests}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-black text-slate-400">
                    Room Tier
                  </div>
                  <div className="font-bold text-amber-300 text-sm truncate">
                    {currentRoom?.name || hotel.roomType}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Wholesale Base ({formatPrice(wholesalePerNight)} × {nights} nts)</span>
                  <span className="font-mono text-white font-bold">{formatPrice(totalWholesale)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>OTA Marketing Ad Tax (18-35%)</span>
                  <span className="font-mono text-emerald-400 font-bold">-{formatPrice(0)} (Eliminated)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Resort Surcharges & Tech Fees</span>
                  <span className="font-mono text-emerald-400 font-bold">-{formatPrice(0)} (Waived)</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-800">
                  <span className="text-white">Total Wholesale Cost</span>
                  <span className="font-mono text-emerald-400 text-lg">{formatPrice(totalWholesale)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center">
                  You save {formatPrice(totalSavings)} vs. Public Retail ({formatPrice(totalRetail)})
                </div>
              </div>

              {/* Member Status Gate Indicator */}
              <div className="p-3 rounded-2xl border text-xs flex items-center justify-between gap-2">
                {isMember && user ? (
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Active Member: {user.displayName} ({user.tier.toUpperCase()} VIP)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Guest: Sign up required to lock 0% wholesale rate</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              {isBooked ? (
                <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
                  <div className="font-black text-white text-base">Wholesale Allocation Confirmed!</div>
                  <p className="text-xs text-emerald-300">
                    Reservation #{hotel.audit.auditHash.substring(0, 10).toUpperCase()} has been secured at 0% markup for {nights} nights.
                  </p>
                  <div className="pt-2 border-t border-emerald-800/80 flex flex-col gap-2">
                    <Link
                      href="/membership"
                      className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition-colors"
                    >
                      View in Member Portal ➔
                    </Link>
                    <button
                      onClick={() => setIsBooked(false)}
                      className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Make Another Booking
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={async () => {
                    if (!isMember) {
                      setIsAuthOpen(true);
                      return;
                    }
                    await addBooking({
                      userId: user?.uid || 'demo-member',
                      hotelId: hotel.id,
                      hotelName: hotel.name,
                      hotelImage: hotel.image,
                      hotelCity: hotel.city,
                      roomId: currentRoom?.id || 'standard-room',
                      roomName: currentRoom?.name || hotel.roomType,
                      checkInDate: checkIn,
                      checkOutDate: checkOut,
                      nights,
                      guests: 2,
                      totalPublicPrice: totalRetail,
                      totalMemberPaid: totalWholesale,
                      totalSaved: totalSavings,
                      status: 'confirmed',
                      confirmationCode: `ATLAS-${hotel.audit.auditHash.substring(0, 8).toUpperCase()}`,
                    });
                    setIsBooked(true);
                  }}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer"
                >
                  {!isMember ? (
                    <>
                      <Lock className="w-4 h-4 text-slate-950" />
                      <span>Sign Up to Reserve Wholesale ({formatPrice(totalWholesale)})</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Reserve at Wholesale ({formatPrice(totalWholesale)})</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                Guaranteed 0% retail markup under closed-loop B2B bedbank clearing contract. Free cancellation up to 48 hours prior to check-in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Gate Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode="signup"
        customTitle="Join ATLAS to Complete This Booking"
        customSubtitle="Rate parity rules require private closed-loop membership to reserve wholesale rates at 0% markup."
      />
    </div>
  );
}

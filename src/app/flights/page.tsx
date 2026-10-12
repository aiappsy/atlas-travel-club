'use client';

import React, { useState } from 'react';
import {
  Plane,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  Calendar,
  Users,
  MapPin,
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  Info,
  DollarSign,
  Luggage,
  Armchair,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { calculateFlightClearingSummary, FLIGHT_LEGAL_DISCLOSURES } from '@/lib/flights/flightPolicy';
import { calculateDripPricingAudit, TravelerAddonPreferences, DripAuditComparison } from '@/lib/flights/dripPricingAudit';
import { resolveAirportIata } from '@/lib/flights/airportResolver';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface FlightOffer {
  id: string;
  offerId?: string;
  airlineName: string;
  airlineCode: string;
  flightNumber: string;
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  aircraft: string;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business' | 'First';
  currency?: string;
  baseNetFare: number;
  airportTaxes: number;
  retailOtaFare: number;
  baggageAllowance: string;
  rawOffer?: any;
}

const SAMPLE_FLIGHT_ROUTES: FlightOffer[] = [
  {
    id: 'fl-sin-lhr',
    airlineName: 'Singapore Airlines',
    airlineCode: 'SQ',
    flightNumber: 'SQ 308',
    departureAirport: 'SIN',
    departureCity: 'Singapore',
    departureTime: '09:05',
    arrivalAirport: 'LHR',
    arrivalCity: 'London',
    arrivalTime: '15:40',
    duration: '13h 35m',
    stops: 'Non-stop',
    aircraft: 'Airbus A350-900',
    cabinClass: 'Business',
    baseNetFare: 2480,
    airportTaxes: 125,
    retailOtaFare: 2940,
    baggageAllowance: '2x 32kg Checked + 2x 7kg Cabin',
  },
  {
    id: 'fl-dxb-jfk',
    airlineName: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK 201',
    departureAirport: 'DXB',
    departureCity: 'Dubai',
    departureTime: '08:30',
    arrivalAirport: 'JFK',
    arrivalCity: 'New York',
    arrivalTime: '14:25',
    duration: '13h 55m',
    stops: 'Non-stop',
    aircraft: 'Airbus A380-800',
    cabinClass: 'Business',
    baseNetFare: 3120,
    airportTaxes: 140,
    retailOtaFare: 3680,
    baggageAllowance: '2x 32kg Checked + 2x 7kg Cabin',
  },
  {
    id: 'fl-cdg-hnd',
    airlineName: 'Air France',
    airlineCode: 'AF',
    flightNumber: 'AF 272',
    departureAirport: 'CDG',
    departureCity: 'Paris',
    departureTime: '11:15',
    arrivalAirport: 'HND',
    arrivalCity: 'Tokyo',
    arrivalTime: '08:50 (+1)',
    duration: '14h 35m',
    stops: 'Non-stop',
    aircraft: 'Boeing 777-300ER',
    cabinClass: 'Premium Economy',
    baseNetFare: 1180,
    airportTaxes: 95,
    retailOtaFare: 1420,
    baggageAllowance: '2x 23kg Checked + 1x 12kg Cabin',
  },
  {
    id: 'fl-lhr-jfk',
    airlineName: 'British Airways',
    airlineCode: 'BA',
    flightNumber: 'BA 177',
    departureAirport: 'LHR',
    departureCity: 'London',
    departureTime: '13:00',
    arrivalAirport: 'JFK',
    arrivalCity: 'New York',
    arrivalTime: '16:05',
    duration: '8h 05m',
    stops: 'Non-stop',
    aircraft: 'Boeing 787-9 Dreamliner',
    cabinClass: 'Economy',
    baseNetFare: 420,
    airportTaxes: 78,
    retailOtaFare: 555,
    baggageAllowance: '1x 23kg Checked + 1x 10kg Cabin',
  },
  {
    id: 'fl-osl-bkk',
    airlineName: 'Qatar Airways',
    airlineCode: 'QR',
    flightNumber: 'QR 176',
    departureAirport: 'OSL',
    departureCity: 'Oslo',
    departureTime: '15:20',
    arrivalAirport: 'BKK',
    arrivalCity: 'Bangkok',
    arrivalTime: '11:30 (+1)',
    duration: '15h 10m',
    stops: '1 Stop (DOH)',
    aircraft: 'Boeing 787-9 / A380',
    cabinClass: 'Business',
    baseNetFare: 1950,
    airportTaxes: 110,
    retailOtaFare: 2380,
    baggageAllowance: '2x 32kg Checked + 2x 7kg Cabin',
  },
  {
    id: 'fl-lax-syd',
    airlineName: 'Qantas',
    airlineCode: 'QF',
    flightNumber: 'QF 12',
    departureAirport: 'LAX',
    departureCity: 'Los Angeles',
    departureTime: '22:30',
    arrivalAirport: 'SYD',
    arrivalCity: 'Sydney',
    arrivalTime: '06:30 (+2)',
    duration: '15h 00m',
    stops: 'Non-stop',
    aircraft: 'Airbus A380-800',
    cabinClass: 'First',
    baseNetFare: 6800,
    airportTaxes: 180,
    retailOtaFare: 8250,
    baggageAllowance: '3x 32kg Checked + 2x 10kg Cabin',
  },
];

export default function FlightsPage() {
  const { formatPrice, currency } = useCurrency();
  const { t, locale } = useLanguage();
  const [selectedCabin, setSelectedCabin] = useState<string>('Business');
  const [originSearch, setOriginSearch] = useState('LHR');
  const [destSearch, setDestSearch] = useState('JFK');
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date(Date.now() + 14 * 86400000);
    return d.toISOString().split('T')[0];
  });
  const [liveOffers, setLiveOffers] = useState<FlightOffer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeModalFlight, setActiveModalFlight] = useState<FlightOffer | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any | null>(null);
  const [expandedAuditFlightId, setExpandedAuditFlightId] = useState<string | null>(null);
  const [addonPrefs, setAddonPrefs] = useState<TravelerAddonPreferences>({
    checkedBagsPerPax: 1,
    carryOnBagsPerPax: 1,
    seatType: 'standard_preferred',
    includeDelayInsurance: true,
    passengerCount: 1,
  });
  const [passengerData, setPassengerData] = useState({
    title: 'mr',
    givenName: 'Pål Alexander',
    familyName: 'Juritzen',
    bornOn: '1985-05-15',
    email: 'contact@atlastravelclub.com',
    phoneNumber: '+4790000000',
  });

  const handleConfirmBooking = async () => {
    if (!activeModalFlight) return;
    setIsBooking(true);
    setBookingError(null);

    try {
      const offerId = (activeModalFlight as any).offerId || activeModalFlight.id;
      const res = await fetch('/api/flights/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerId,
          passenger: passengerData,
          paymentMethod: 'balance',
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setBookingError(data.error || 'Failed to issue ticket with airline');
      } else {
        setBookingResult(data);
        setBookingSuccess(true);
      }
    } catch (err: any) {
      setBookingError(err?.message || 'Network communication error');
    } finally {
      setIsBooking(false);
    }
  };

  const performLiveSearch = async (orig = originSearch, dest = destSearch, cabin = selectedCabin, date = departureDate) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const resolvedOrig = resolveAirportIata(orig, 'OSL');
      const resolvedDest = resolveAirportIata(dest, 'BKK');
      const cabinParam = cabin === 'All' ? 'business' : cabin.toLowerCase().replace(' ', '_');
      const res = await fetch(
        `/api/flights/search?origin=${encodeURIComponent(resolvedOrig)}&destination=${encodeURIComponent(resolvedDest)}&departureDate=${date}&cabinClass=${cabinParam}`
      );
      const data = await res.json();
      if (data.success && data.flights && data.flights.length > 0) {
        setLiveOffers(data.flights);
      } else {
        setLiveOffers([]);
      }
    } catch (err) {
      console.error('Failed to search flights:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Perform initial search on mount
  React.useEffect(() => {
    performLiveSearch('LHR', 'JFK', 'Business');
  }, []);

  const displayedFlights = liveOffers.length > 0
    ? liveOffers
    : SAMPLE_FLIGHT_ROUTES.filter((f) => {
        const resolvedOrig = resolveAirportIata(originSearch, '').toLowerCase();
        const resolvedDest = resolveAirportIata(destSearch, '').toLowerCase();

        if (selectedCabin !== 'All' && f.cabinClass !== selectedCabin) return false;
        if (
          originSearch &&
          !f.departureCity.toLowerCase().includes(originSearch.toLowerCase()) &&
          !f.departureAirport.toLowerCase().includes(originSearch.toLowerCase()) &&
          (!resolvedOrig || f.departureAirport.toLowerCase() !== resolvedOrig)
        ) {
          return false;
        }
        if (
          destSearch &&
          !f.arrivalCity.toLowerCase().includes(destSearch.toLowerCase()) &&
          !f.arrivalAirport.toLowerCase().includes(destSearch.toLowerCase()) &&
          (!resolvedDest || f.arrivalAirport.toLowerCase() !== resolvedDest)
        ) {
          return false;
        }
        return true;
      });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans pb-24">
      {/* Top Value Banner */}
      <div className="border-b border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            {t.flights.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            {t.flights.heroTitle}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.flights.heroSubtitle}
          </p>

          {/* 3 Core Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-amber-600 font-black text-xs flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" />
                {locale === 'no' ? '0% Bestillingsgebyr' : '0% Middleman Booking Fee'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {locale === 'no'
                  ? 'Netto flyselskapspris + flyplassavgifter. Ingen skjulte Atlas-gebyrer.'
                  : 'Net airline clearing rate + exact airport taxes. Zero junk fees added by Atlas.'}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-sky-600 font-black text-xs flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                {locale === 'no' ? 'Direkte Avregning mot Flyselskap' : 'Direct Carrier Pass-Through'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {locale === 'no'
                  ? 'Kortet belastes direkte via flyselskapets oppgjør. 0% kortpåslag.'
                  : 'Card charged directly via carrier settlement. 0% credit card processing markup.'}
              </p>
            </div>
            <Link href="/flight-claims" className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500/50 transition-colors block group cursor-pointer">
              <div className="text-emerald-700 font-black text-xs flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {locale === 'no' ? 'EU261 €600 Forsinkelsesovervåking' : 'EU261 €600 Delay Sentinel'}
                </span>
                <ArrowRight className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {locale === 'no'
                  ? 'Døgnkontinuerlig overvåking krever inn inntil €600 per passasjer uten provisjonstrekk.'
                  : '24/7 automated disruption sentinel recovers up to €600 cash per passenger with 0% legal deduction.'}
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Search & Filter Console */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Origin */}
            <div className="md:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.flights.fromLabel}</label>
                <input
                  type="text"
                  placeholder="LHR, JFK, SIN, OSL..."
                  value={originSearch}
                  onChange={(e) => setOriginSearch(e.target.value)}
                  className="bg-transparent text-sm text-slate-900 font-bold w-full outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="md:col-span-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Plane className="w-5 h-5 text-sky-600 shrink-0 rotate-90" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.flights.toLabel}</label>
                <input
                  type="text"
                  placeholder="JFK, HND, DXB, SYD..."
                  value={destSearch}
                  onChange={(e) => setDestSearch(e.target.value)}
                  className="bg-transparent text-sm text-slate-900 font-bold w-full outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="md:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.flights.departLabel}</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 font-bold w-full outline-none [color-scheme:light]"
                />
              </div>
            </div>

            {/* Cabin Filter */}
            <div className="md:col-span-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t.flights.cabinLabel}</label>
                <select
                  value={selectedCabin}
                  onChange={(e) => setSelectedCabin(e.target.value)}
                  className="bg-slate-50 text-xs text-slate-900 font-bold w-full outline-none cursor-pointer"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">{locale === 'no' ? 'Prem. Økonomi' : 'Prem. Econ'}</option>
                  <option value="Business">👑 Business</option>
                  <option value="First">💎 First</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 flex items-center">
              <button
                type="button"
                onClick={() => performLiveSearch(originSearch, destSearch, selectedCabin, departureDate)}
                disabled={isSearching}
                className="w-full h-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t.flights.searching}</span>
                  </>
                ) : (
                  <>
                    <span>{t.flights.searchBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Upfront All-In Needs Selector (Avoid OTA Drip Surcharges) */}
          <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs bg-slate-50/70 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 sm:p-5 rounded-b-3xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                <Luggage className="w-4 h-4" />
              </span>
              <div>
                <span className="font-bold text-slate-900 block">{t.flights.configTitle}</span>
                <span className="text-[11px] text-slate-500">{t.flights.configSubtitle}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Checked Bags Toggle */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <span className="text-[11px] text-slate-500 font-bold">{t.flights.checkedBags}</span>
                {[0, 1, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setAddonPrefs({ ...addonPrefs, checkedBagsPerPax: num })}
                    className={`px-2 py-0.5 rounded text-[11px] font-black cursor-pointer transition-all ${
                      addonPrefs.checkedBagsPerPax === num
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Seat Preference */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <span className="text-[11px] text-slate-500 font-bold">{t.flights.seatPreference}</span>
                <select
                  value={addonPrefs.seatType}
                  onChange={(e) => setAddonPrefs({ ...addonPrefs, seatType: e.target.value as any })}
                  className="bg-transparent text-[11px] font-black text-slate-900 outline-none cursor-pointer"
                >
                  <option value="any">{t.flights.seatAny}</option>
                  <option value="standard_preferred">{t.flights.seatPreferred}</option>
                  <option value="extra_legroom">{t.flights.seatExtraLegroom}</option>
                </select>
              </div>

              {/* Delay Insurance / Sentinel Toggle */}
              <button
                onClick={() => setAddonPrefs({ ...addonPrefs, includeDelayInsurance: !addonPrefs.includeDelayInsurance })}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  addonPrefs.includeDelayInsurance
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-500 border-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{addonPrefs.includeDelayInsurance ? t.flights.sentinelActive : t.flights.sentinelOff}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Flight Cards Feed */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 px-1 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">
                {liveOffers.length > 0 ? 'Live Duffel NDC/GDS Flight Inventory' : 'Curated Verified Global Routes'}
              </span>
              <span>• {displayedFlights.length} Offers Available</span>
            </div>
            <span className="font-mono text-emerald-600 font-bold">0% Retail Markup • Net Clearing Rate</span>
          </div>

          <div className="space-y-4">
            {displayedFlights.map((flight) => {
              const clearing = calculateFlightClearingSummary(flight.baseNetFare, flight.airportTaxes, 'card_pass_through');
              const audit = calculateDripPricingAudit(
                flight.baseNetFare,
                flight.airportTaxes,
                flight.currency || 'USD',
                flight.departureAirport,
                flight.arrivalAirport,
                flight.cabinClass,
                addonPrefs
              );
              const isAuditExpanded = expandedAuditFlightId === flight.id;

              return (
                <div
                  key={flight.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all shadow-sm overflow-hidden"
                >
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center font-black text-amber-700 text-lg">
                          {flight.airlineCode}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-lg text-slate-900">{flight.airlineName}</h3>
                            <span className="text-xs text-slate-500 font-mono">{flight.flightNumber}</span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 border border-slate-200 text-slate-700">
                              {flight.cabinClass}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {flight.aircraft} • {flight.stops}
                          </p>
                        </div>
                      </div>

                      {/* Flight Schedule */}
                      <div className="flex items-center gap-4 text-center sm:text-right">
                        <div>
                          <div className="text-xl font-black text-slate-900">{flight.departureTime}</div>
                          <div className="text-xs font-bold text-slate-500">{flight.departureAirport} ({flight.departureCity})</div>
                        </div>
                        <div className="flex flex-col items-center px-2">
                          <span className="text-[10px] font-mono text-slate-400">{flight.duration}</span>
                          <div className="w-16 h-0.5 bg-slate-200 relative my-1">
                            <Plane className="w-3 h-3 text-amber-500 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-90" />
                          </div>
                          <span className="text-[9px] text-emerald-600 font-bold">{flight.stops}</span>
                        </div>
                        <div>
                          <div className="text-xl font-black text-slate-900">{flight.arrivalTime}</div>
                          <div className="text-xs font-bold text-slate-500">{flight.arrivalAirport} ({flight.arrivalCity})</div>
                        </div>
                      </div>
                    </div>

                    {/* Included Add-ons & Amenities Bar */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold flex items-center gap-1.5">
                        <span>🧳</span>
                        <span>{flight.baggageAllowance}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>EU261 €600 Delay Protection Included</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-bold flex items-center gap-1.5">
                        <span>⚡</span>
                        <span>Direct IATA Carrier Settlement</span>
                      </span>
                      {flight.currency && flight.currency !== currency && (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono">
                          Carrier Tariff: {flight.currency} {clearing.totalAmountCharged}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing Ledger & Action */}
                  <div className="bg-slate-50/90 p-5 sm:p-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: 2-column clear rate comparison (Duffel NDC Net vs Public OTA All-In) */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      {/* Duffel Live NDC Net Rate Column */}
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                            {t.flights.duffelLiveRate}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-emerald-600 font-mono tracking-tight">
                            {formatPrice(audit.atlasAtCostTotal, { sourceCurrency: flight.currency || 'USD' })}
                          </span>
                          <span className="text-xs font-bold text-slate-500">{t.flights.allInAtCost}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">
                          {locale === 'no' ? '0% Klubbprovisjon • Direkte Oppgjør' : '0% Retail Commission • Exact Carrier Ancillaries'}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block h-10 w-px bg-slate-200" />

                      {/* Public Retail OTA Rate Column */}
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          {t.flights.publicOtaWithAddons}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold line-through text-slate-400 font-mono">
                            {formatPrice(audit.publicOtaTotal, { sourceCurrency: flight.currency || 'USD' })}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                            {t.flights.youSave} {formatPrice(audit.totalSavings, { sourceCurrency: flight.currency || 'USD' })} ({audit.savingsPercentage}%)
                          </span>
                        </div>
                        <p className="text-[10px] text-emerald-700 font-bold">
                          {locale === 'no' ? '✓ Alle valgte bager og seter inkludert' : '✓ All requested bags & seats included'}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {/* Toggle Expandable Drip Audit Ledger */}
                      <button
                        onClick={() => setExpandedAuditFlightId(isAuditExpanded ? null : flight.id)}
                        className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAuditExpanded
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{t.flights.unpackFeesBtn}</span>
                        {isAuditExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                      </button>

                      {/* 1-Click Live Verification Link */}
                      <a
                        href={`https://www.google.com/travel/flights?q=Flights%20to%20${encodeURIComponent(flight.arrivalAirport)}%20from%20${encodeURIComponent(flight.departureAirport)}%20on%20${encodeURIComponent(departureDate)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer group"
                        title={locale === 'no' ? 'Sjekk livepris på Google Flights' : 'Verify live rate on Google Flights'}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                        <span>{t.flights.verifyPublicRateBtn}</span>
                      </a>

                      {/* Primary Inspect & Clear Button */}
                      <button
                        onClick={() => {
                          setActiveModalFlight(flight);
                          setBookingSuccess(false);
                          setBookingResult(null);
                          setBookingError(null);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer transform hover:scale-[1.02]"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>{t.flights.clearTicketBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Drip-Pricing Audit Ledger Drawer */}
                  {isAuditExpanded && (
                    <div className="bg-slate-900 text-white p-5 sm:p-6 border-t border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div>
                          <div className="text-amber-400 text-[10px] font-black uppercase tracking-wider">
                            {locale === 'no' ? 'Trinnvis Gebyr-Avsløring' : 'Transparent Step-by-Step Fee Audit'}
                          </div>
                          <h4 className="text-sm font-black text-white">
                            {t.flights.feeAuditTitle}
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {audit.otaTrapExplanation}
                        </span>
                      </div>

                      {/* Itemized Comparison Table */}
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-12 text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                          <span className="col-span-6">{t.flights.categoryHeader}</span>
                          <span className="col-span-3 text-right">{t.flights.publicOtaHeader}</span>
                          <span className="col-span-3 text-right text-emerald-400">{t.flights.atlasHeader}</span>
                        </div>

                        {audit.items.map((item) => (
                          <div key={item.id} className="grid grid-cols-12 py-1.5 border-b border-slate-800/60 items-center">
                            <div className="col-span-6 pr-2">
                              <span className="font-bold text-white block">{item.label}</span>
                              <span className="text-[10px] text-slate-400 block">{item.description}</span>
                            </div>
                            <div className="col-span-3 text-right font-mono text-slate-300">
                              {formatPrice(item.publicOtaRate, { sourceCurrency: flight.currency || 'USD' })}
                            </div>
                            <div className="col-span-3 text-right font-mono font-bold text-emerald-400">
                              {formatPrice(item.atlasAtCostRate, { sourceCurrency: flight.currency || 'USD' })}
                              {item.savings > 0 && (
                                <span className="text-[10px] text-emerald-500 block font-sans font-bold">
                                  {t.common.save} {formatPrice(item.savings, { sourceCurrency: flight.currency || 'USD' })}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Audit Total Footer */}
                        <div className="grid grid-cols-12 pt-3 items-center border-t border-slate-700 font-bold text-sm">
                          <div className="col-span-6">
                            <span className="text-white block">
                              {locale === 'no' ? 'Totalpris ferdig oppgjort (Alt inkludert):' : 'Final All-In Cost (Everything Included):'}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-normal">
                              {locale === 'no'
                                ? 'Garantert medlemspris uten overraskelser i kassen.'
                                : 'Atlas member price guaranteed with 0% hidden checkout fees.'}
                            </span>
                          </div>
                          <div className="col-span-3 text-right font-mono line-through text-slate-400">
                            {formatPrice(audit.publicOtaTotal, { sourceCurrency: flight.currency || 'USD' })}
                          </div>
                          <div className="col-span-3 text-right font-mono text-base font-black text-emerald-400">
                            {formatPrice(audit.atlasAtCostTotal, { sourceCurrency: flight.currency || 'USD' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 0% Risk Ticket Clearing & Inspection Modal */}
      {activeModalFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">{t.flights.modalTitle}</h3>
              </div>
              <button
                onClick={() => setActiveModalFlight(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Flight Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="font-black text-slate-900 text-sm flex items-center justify-between">
                <span>{activeModalFlight.airlineName} ({activeModalFlight.flightNumber})</span>
                <span className="text-amber-600 font-bold">{activeModalFlight.cabinClass}</span>
              </div>
              <p className="text-slate-600">
                {activeModalFlight.departureCity} ({activeModalFlight.departureAirport}) ➔ {activeModalFlight.arrivalCity} ({activeModalFlight.arrivalAirport})
              </p>
              <p className="text-slate-400 text-[11px]">Baggage: {activeModalFlight.baggageAllowance}</p>
            </div>

            {/* Transparent Cost Breakdown */}
            {(() => {
              const srcCurr = activeModalFlight.currency || 'USD';
              const c = calculateFlightClearingSummary(activeModalFlight.baseNetFare, activeModalFlight.airportTaxes, 'card_pass_through');
              return (
                <div className="space-y-2 text-xs">
                  {/* Currency Notice if carrier quotes in foreign currency */}
                  {srcCurr !== currency && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-center justify-between">
                      <span>Carrier Origin Currency: <strong className="font-mono">{srcCurr}</strong></span>
                      <span>Converted to <strong className="font-mono">{currency}</strong> at real-time interbank rate</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Base Carrier Net Fare (Duffel NDC):</span>
                    <span className="font-mono text-slate-900 font-bold">{formatPrice(c.baseNetFare, { sourceCurrency: srcCurr })}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Government Airport & Security Taxes:</span>
                    <span className="font-mono text-slate-900 font-bold">{formatPrice(c.airportTaxesAndSecurity, { sourceCurrency: srcCurr })}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Digital IATA Ticketing Fee (Duffel):</span>
                    <span className="font-mono text-slate-900 font-bold">{formatPrice(c.ticketingAndPnrFee, { sourceCurrency: 'USD' })}</span>
                  </div>
                  <div className="flex justify-between text-indigo-700 font-bold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      EU261 Sentinel 24/7 Delay Protection:
                    </span>
                    <span className="font-mono text-indigo-700">{formatPrice(c.sentinelProtectionFee, { sourceCurrency: 'USD' })}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Atlas Retail Markup:</span>
                    <span className="font-mono text-emerald-700 font-black">$0.00 (0% Markup)</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
                    <span>Duffel All-In Ticket Clearing Rate:</span>
                    <span className="text-emerald-600 text-lg font-mono">{formatPrice(c.totalAmountCharged, { sourceCurrency: srcCurr })}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold">Public Retail Comparison (Expedia / OTA):</div>
                      <div className="text-sm font-bold line-through text-slate-400 font-mono">
                        {formatPrice(c.retailOtaComparison, { sourceCurrency: srcCurr })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-black tracking-wider text-emerald-700">Member Instant Savings</div>
                      <div className="text-base font-black text-emerald-600 font-mono">
                        {formatPrice(c.memberInstantSavings, { sourceCurrency: srcCurr })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Legal Disclosures & Tariff Rules */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 space-y-1.5 leading-relaxed">
              <p className="font-bold text-amber-800 uppercase tracking-wide">Carrier Tariff & Protection Notice:</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.tariffDisclaimer}</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.cancellationPolicy}</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.eu261Protection}</p>
            </div>

            {bookingSuccess && bookingResult ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4 text-xs">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 pt-1">Electronic Ticket Issued</h4>
                  <p className="text-emerald-700 text-[11px]">Direct IATA/NDC Settlement Confirmed via Duffel</p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-emerald-200 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Airline PNR / Record Locator:</span>
                    <span className="text-amber-800 font-mono font-black text-base tracking-widest bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      {bookingResult.bookingReference || 'CONFIRMED'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-[11px]">
                    <span>Operating Carrier:</span>
                    <span className="text-slate-900 font-bold">{bookingResult.carrier || activeModalFlight.airlineName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-[11px]">
                    <span>Flight Route:</span>
                    <span className="text-slate-900 font-mono">{bookingResult.route || `${activeModalFlight.departureAirport} ➔ ${activeModalFlight.arrivalAirport}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-[11px]">
                    <span>Passenger:</span>
                    <span className="text-slate-900 font-medium">{passengerData.givenName} {passengerData.familyName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 text-[11px]">
                    <span>Total Settled (0% Markup):</span>
                    <span className="text-emerald-600 font-mono font-bold">{bookingResult.totalAmount} {bookingResult.totalCurrency}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>EU261 Sentinel: Flight enrolled in automated 24/7 delay monitoring (€600 claim protection).</span>
                </div>

                <button
                  onClick={() => setActiveModalFlight(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Close & View in Trips
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Passenger Manifest Inputs */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-500" /> Passenger Details (IATA Manifest)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">First / Given Name</label>
                      <input
                        type="text"
                        value={passengerData.givenName}
                        onChange={(e) => setPassengerData({ ...passengerData, givenName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Last / Family Name</label>
                      <input
                        type="text"
                        value={passengerData.familyName}
                        onChange={(e) => setPassengerData({ ...passengerData, familyName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                        placeholder="Last name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Date of Birth (YYYY-MM-DD)</label>
                      <input
                        type="date"
                        value={passengerData.bornOn}
                        onChange={(e) => setPassengerData({ ...passengerData, bornOn: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-amber-500 [color-scheme:light]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Mobile Phone (with country code)</label>
                      <input
                        type="text"
                        value={passengerData.phoneNumber}
                        onChange={(e) => setPassengerData({ ...passengerData, phoneNumber: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-amber-500"
                        placeholder="+4790000000"
                      />
                    </div>
                  </div>
                </div>

                {bookingError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                    <Info className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{bookingError}</span>
                  </div>
                )}

                <button
                  disabled={isBooking}
                  onClick={handleConfirmBooking}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isBooking ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Issuing E-Ticket with Airline (Duffel NDC)...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Confirm & Issue Direct Airline Ticket
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { calculateFlightClearingSummary, FLIGHT_LEGAL_DISCLOSURES } from '@/lib/flights/flightPolicy';
import { useCurrency } from '@/context/CurrencyContext';

interface FlightOffer {
  id: string;
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
  baseNetFare: number;
  airportTaxes: number;
  retailOtaFare: number;
  baggageAllowance: string;
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
  const [selectedCabin, setSelectedCabin] = useState<string>('All');
  const [originSearch, setOriginSearch] = useState('');
  const [destSearch, setDestSearch] = useState('');
  const [activeModalFlight, setActiveModalFlight] = useState<FlightOffer | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredFlights = SAMPLE_FLIGHT_ROUTES.filter((f) => {
    if (selectedCabin !== 'All' && f.cabinClass !== selectedCabin) return false;
    if (
      originSearch &&
      !f.departureCity.toLowerCase().includes(originSearch.toLowerCase()) &&
      !f.departureAirport.toLowerCase().includes(originSearch.toLowerCase())
    ) {
      return false;
    }
    if (
      destSearch &&
      !f.arrivalCity.toLowerCase().includes(destSearch.toLowerCase()) &&
      !f.arrivalAirport.toLowerCase().includes(destSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans pb-24">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            0% Retail Markup • At-Cost Airline GDS/NDC Clearing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Commercial Flight Clearing Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Direct airline net fares without OTA service charges, baggage markup, or hidden surcharges. Includes complimentary EU261 €600 delay monitoring on all member bookings.
          </p>

          {/* 3 Core Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-amber-400 font-black text-xs flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> 0% Middleman Booking Fee
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Net airline clearing rate + exact airport taxes. Zero junk fees added by Atlas.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-sky-400 font-black text-xs flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Direct Carrier Pass-Through
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Card charged directly via carrier settlement. 0% credit card processing markup.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-emerald-400 font-black text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> EU261 €600 Delay Protection
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Automated 24/7 flight delay sentinel recovers up to €600 in cash compensation for delayed flights.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Filter Console */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Origin */}
            <div className="md:col-span-4 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">From (City or Code)</label>
                <input
                  type="text"
                  placeholder="Singapore, London, New York..."
                  value={originSearch}
                  onChange={(e) => setOriginSearch(e.target.value)}
                  className="bg-transparent text-sm text-white font-bold w-full outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="md:col-span-4 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <Plane className="w-5 h-5 text-sky-400 shrink-0 rotate-90" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">To (City or Code)</label>
                <input
                  type="text"
                  placeholder="Tokyo, London, Sydney..."
                  value={destSearch}
                  onChange={(e) => setDestSearch(e.target.value)}
                  className="bg-transparent text-sm text-white font-bold w-full outline-none placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Cabin Filter */}
            <div className="md:col-span-4 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cabin Class</label>
                <select
                  value={selectedCabin}
                  onChange={(e) => setSelectedCabin(e.target.value)}
                  className="bg-slate-950 text-sm text-white font-bold w-full outline-none cursor-pointer"
                >
                  <option value="All">All Cabins</option>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">👑 Business Class</option>
                  <option value="First">💎 First Class</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Cards Feed */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredFlights.length} Direct & Global GDS/NDC Routes</span>
            <span className="font-mono text-emerald-400">0% Retail Markup Enforced</span>
          </div>

          <div className="space-y-4">
            {filteredFlights.map((flight) => {
              const clearing = calculateFlightClearingSummary(flight.baseNetFare, flight.airportTaxes, 'card_pass_through');
              return (
                <div
                  key={flight.id}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800/80 hover:border-amber-400/40 transition-all shadow-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center font-black text-amber-400 text-lg">
                        {flight.airlineCode}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-black text-lg text-white">{flight.airlineName}</h3>
                          <span className="text-xs text-slate-400 font-mono">{flight.flightNumber}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
                            {flight.cabinClass}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {flight.aircraft} • {flight.stops} • Baggage: {flight.baggageAllowance}
                        </p>
                      </div>
                    </div>

                    {/* Flight Schedule */}
                    <div className="flex items-center gap-4 text-center sm:text-right">
                      <div>
                        <div className="text-xl font-black text-white">{flight.departureTime}</div>
                        <div className="text-xs font-bold text-slate-400">{flight.departureAirport} ({flight.departureCity})</div>
                      </div>
                      <div className="flex flex-col items-center px-2">
                        <span className="text-[10px] font-mono text-slate-400">{flight.duration}</span>
                        <div className="w-16 h-0.5 bg-slate-700 relative my-1">
                          <Plane className="w-3 h-3 text-amber-400 absolute left-1/2 -top-1.5 -translate-x-1/2 rotate-90" />
                        </div>
                        <span className="text-[9px] text-emerald-400 font-bold">{flight.stops}</span>
                      </div>
                      <div>
                        <div className="text-xl font-black text-white">{flight.arrivalTime}</div>
                        <div className="text-xs font-bold text-slate-400">{flight.arrivalAirport} ({flight.arrivalCity})</div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Ledger & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-400">
                          {formatPrice(clearing.totalAmountCharged)}
                        </span>
                        <span className="text-xs text-slate-500">all-in at-cost</span>
                        <span className="text-xs line-through text-slate-500 font-mono">
                          Retail OTA: {formatPrice(clearing.retailOtaComparison)}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-black text-emerald-400">
                          Saves {formatPrice(clearing.memberInstantSavings)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Net Fare {formatPrice(flight.baseNetFare)} + Taxes {formatPrice(flight.airportTaxes)} + $3 PNR. 0% Atlas Markup.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveModalFlight(flight);
                          setBookingSuccess(false);
                        }}
                        className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        Inspect & Clear Ticket
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 0% Risk Ticket Clearing & Inspection Modal */}
      {activeModalFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">0% Risk Carrier Clearing Ledger</h3>
              </div>
              <button
                onClick={() => setActiveModalFlight(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Flight Summary */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="font-black text-white text-sm flex items-center justify-between">
                <span>{activeModalFlight.airlineName} ({activeModalFlight.flightNumber})</span>
                <span className="text-amber-400">{activeModalFlight.cabinClass}</span>
              </div>
              <p className="text-slate-400">
                {activeModalFlight.departureCity} ({activeModalFlight.departureAirport}) ➔ {activeModalFlight.arrivalCity} ({activeModalFlight.arrivalAirport})
              </p>
              <p className="text-slate-500 text-[11px]">Baggage: {activeModalFlight.baggageAllowance}</p>
            </div>

            {/* Transparent Cost Breakdown */}
            {(() => {
              const c = calculateFlightClearingSummary(activeModalFlight.baseNetFare, activeModalFlight.airportTaxes, 'card_pass_through');
              return (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base Carrier Net Fare:</span>
                    <span className="font-mono text-white">{formatPrice(c.baseNetFare)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Government Airport & Security Taxes:</span>
                    <span className="font-mono text-white">{formatPrice(c.airportTaxesAndSecurity)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Digital PNR / Ticket Issuance (Duffel):</span>
                    <span className="font-mono text-white">{formatPrice(c.ticketingAndPnrFee)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Atlas Club Retail Markup:</span>
                    <span className="font-mono">$0.00 (0%)</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-black text-white">
                    <span>Total Settled With Carrier:</span>
                    <span className="text-emerald-400 text-base">{formatPrice(c.totalAmountCharged)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Public Retail (Expedia / Google):</span>
                    <span className="line-through">{formatPrice(c.retailOtaComparison)}</span>
                  </div>
                </div>
              );
            })()}

            {/* Legal Disclosures & Tariff Rules */}
            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-[10px] text-amber-200/90 space-y-1.5 leading-relaxed">
              <p className="font-bold text-amber-300 uppercase tracking-wide">Carrier Tariff & Protection Notice:</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.tariffDisclaimer}</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.cancellationPolicy}</p>
              <p>• {FLIGHT_LEGAL_DISCLOSURES.eu261Protection}</p>
            </div>

            {bookingSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-1 text-xs">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="font-black text-white text-sm">Direct Carrier Booking Confirmed!</div>
                <p className="text-slate-300">Carrier PNR generated. E-ticket issued to passenger manifest.</p>
              </div>
            ) : (
              <button
                onClick={() => setBookingSuccess(true)}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Authorize Direct Carrier Settlement
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

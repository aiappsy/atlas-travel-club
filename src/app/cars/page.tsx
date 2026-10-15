'use client';

import React, { useState, useEffect } from 'react';
import {
  Car,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  DollarSign,
  Fuel,
  Gauge,
  Briefcase,
  Key,
  Check,
  TrendingDown,
  Info,
  CreditCard,
  Building2
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { AtlasNormalizedCarOffer } from '@/lib/providers/duffelCars';

export default function CarsPage() {
  const { convertPrice, formatPrice } = useCurrency();
  const { locale } = useLanguage();
  const isNo = locale === 'no';

  // Search filter states
  const [pickupCity, setPickupCity] = useState('Nice / Cannes, France (NCE)');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pickupDate, setPickupDate] = useState('2026-06-15');
  const [returnDate, setReturnDate] = useState('2026-06-22');
  const [selectedCar, setSelectedCar] = useState<AtlasNormalizedCarOffer | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [offers, setOffers] = useState<AtlasNormalizedCarOffer[]>([]);
  const [loading, setLoading] = useState(true);

  // Rental duration calculation
  const rentalDays = Math.max(1, Math.round((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 3600 * 24)) || 7);

  // Fetch cars from Duffel Cars API route
  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      try {
        const res = await fetch(`/api/cars/search?iata=NCE&pickupDate=${pickupDate}&dropoffDate=${returnDate}&category=${selectedCategory}`);
        const data = await res.json();
        if (data.offers) {
          setOffers(data.offers);
        }
      } catch (err) {
        console.error('Failed to load cars from Duffel provider:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, [pickupDate, returnDate, selectedCategory]);

  const categories = [
    { key: 'All', label: isNo ? 'Alle kategorier' : 'All Categories' },
    { key: 'Economy', label: isNo ? 'Økonomi' : 'Economy' },
    { key: 'Compact', label: isNo ? 'Kompakt' : 'Compact' },
    { key: 'SUV', label: isNo ? 'SUV & 4x4' : 'SUV & 4x4' },
    { key: 'EV', label: isNo ? 'Elbil (EV)' : 'Electric (EV)' },
    { key: 'Luxury', label: isNo ? 'Luksus' : 'Luxury' },
  ];

  const filteredOffers = selectedCategory === 'All' 
    ? offers 
    : offers.filter(o => o.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Light Header */}
      <div className="bg-white border-b border-slate-200/80 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {isNo ? '0 kr i påslag • Globale B2B-priser' : '0% Club Markup • Duffel Global Fleet'}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {isNo ? 'Leiebil til ekte B2B-engrospris' : 'Global Car Rentals at Pure B2B Rates'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {isNo
              ? 'Atlas tar 0 kr i påslag på leiebil. Du får samme forhandlerpriser som reisebyråene, uten skjulte formidlingsgebyrer. Betaling skjer trygt ved henting.'
              : 'Atlas adds zero club markup on car rentals. You pay the raw wholesale rate directly at the counter, beating Expedia and Rentalcars retail pricing.'}
          </p>

          {/* Value Prop Proof Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                {isNo ? '0 kr i påslag' : '0% Club Fee'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                {isNo ? 'Lavere enn åpne nettsider' : 'Beats Expedia'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <CreditCard className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                {isNo ? 'Betal ved henting' : 'Pay at Counter'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 justify-center">
              <Gauge className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-bold text-slate-700">
                {isNo ? 'Fri kjørelengde' : 'Unlimited Mileage'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Disclosure Banner — Why 0 kr Markup? */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                {isNo ? 'Hvorfor tar ikke Atlas påslag på leiebil?' : 'Why does Atlas charge 0% markup on cars?'}
              </div>
              <div className="text-xs text-slate-700 leading-relaxed mt-0.5">
                {isNo
                  ? 'Som lukket medlemsklubb formidler vi direkte nettopriser fra globale flåteleverandører. Vi legger ikke på formidlingsgebyrer, slik at du sparer på hver leieperiode.'
                  : 'Atlas receives an 8%–12% backend commission directly from our fleet partner (Duffel). Because we monetize on volume commission, we pass 100% of the wholesale discount directly to our members.'}
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              {isNo ? 'Full åpenhet om priser' : '100% Price Transparency'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Search & Catalog Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Search Filter Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
                {isNo ? 'Hentested / Flyplass' : 'Pickup Location'}
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
              >
                <option value="Nice / Cannes, France (NCE)">Nice Côte d'Azur (NCE)</option>
                <option value="Málaga-Costa del Sol, Spain (AGP)">Málaga Airport (AGP)</option>
                <option value="Oslo Gardermoen, Norway (OSL)">Oslo Gardermoen (OSL)</option>
                <option value="London Heathrow, UK (LHR)">London Heathrow (LHR)</option>
                <option value="Miami International, USA (MIA)">Miami International (MIA)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
                {isNo ? 'Hentedato' : 'Pickup Date'}
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-600" />
                {isNo ? 'Leveringsdato' : 'Return Date'}
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-center flex items-center justify-between">
                <span className="text-xs text-amber-800 font-medium">{isNo ? 'Varighet:' : 'Duration:'}</span>
                <span className="text-sm font-black text-amber-900">
                  {rentalDays} {isNo ? 'dager' : 'days'}
                </span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-500">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold">{isNo ? 'Henter sanntids B2B-priser fra Duffel Cars...' : 'Fetching live B2B rates from Duffel Cars...'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOffers.map((car) => {
              const memberTotal = car.memberPrice;
              const expediaTotal = car.expediaRetailBenchmark;
              const savingsTotal = car.memberInstantSavings;

              return (
                <div
                  key={car.id}
                  className="bg-white border border-slate-200/80 hover:border-amber-300 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={car.imageUrl}
                      alt={car.vehicleName}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 border border-slate-200 shadow-2xs">
                        {car.category} ({car.carGroup})
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200 backdrop-blur-md">
                        {isNo ? `Spar ${formatPrice(convertPrice(savingsTotal))} vs Expedia` : `Save ${formatPrice(convertPrice(savingsTotal))} vs Expedia`}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-200 text-xs text-slate-800 font-black shadow-2xs">
                      {car.supplierName}
                    </div>
                  </div>

                  {/* Specs and Details */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">
                        {car.vehicleName}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {car.pickupStation.name} • {car.pickupStation.openingHours}
                      </p>
                    </div>

                    {/* Quick specs icons */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-y border-slate-100 text-center text-xs text-slate-600 font-medium">
                      <div className="flex flex-col items-center gap-1">
                        <Users className="w-4 h-4 text-amber-600" />
                        <span>{car.seats} {isNo ? 'seter' : 'Seats'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Briefcase className="w-4 h-4 text-amber-600" />
                        <span>{car.baggageLarge} {isNo ? 'store kolli' : 'Large Bags'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Fuel className="w-4 h-4 text-amber-600" />
                        <span>{car.electricOrHybrid ? 'Hybrid / EV' : 'Bensin'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Gauge className="w-4 h-4 text-amber-600" />
                        <span>{car.transmission}</span>
                      </div>
                    </div>

                    {/* Zero Markup Breakdown */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>{isNo ? 'Netto B2B-pris:' : 'Raw B2B Rate:'}</span>
                        <span className="font-semibold text-slate-700">{formatPrice(convertPrice(car.rawSupplierRate))}</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>{isNo ? 'Atlas-påslag:' : 'Atlas Club Markup:'}</span>
                        <span>0 kr (0%)</span>
                      </div>
                      <div className="flex justify-between text-slate-500 border-t border-slate-200/60 pt-1">
                        <span>{isNo ? 'Veil. markedspris:' : 'Expedia Retail:'}</span>
                        <span className="line-through">{formatPrice(convertPrice(expediaTotal))}</span>
                      </div>
                    </div>

                    {/* Included Perks */}
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {isNo ? 'Inkludert i leien' : 'Included in Booking'}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[11px] text-emerald-800">
                        <span>✓ {car.mileagePolicy}</span>
                        <span>✓ {car.cancellationPolicy}</span>
                        <span>✓ Betaling ved henting ({car.paymentType})</span>
                        <span>✓ {car.airConditioning ? 'Klimaanlegg inkludert' : 'Standard ventilasjon'}</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                      <div>
                        <div className="text-xs text-slate-400 line-through">
                          {isNo ? 'Expedia: ' : 'Expedia: '}
                          {formatPrice(convertPrice(expediaTotal))}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-slate-900">
                            {formatPrice(convertPrice(memberTotal))}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            / {rentalDays} {isNo ? 'dager' : 'days'}
                          </span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-bold">
                          {isNo ? '0 kr i påslag • Garantert lavere pris' : '0% club fee • Guaranteed cheaper'}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedCar(car)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-white shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        {isNo ? 'Reserver bil' : 'Reserve Vehicle'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reservation Modal with Full Financial Transparency */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            {!bookingConfirmed ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {isNo ? 'Bekreft bilreservasjon (0 kr i påslag)' : 'Confirm Reservation (0% Markup)'}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">
                      {selectedCar.vehicleName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="text-slate-400 hover:text-slate-900 text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 py-3 border-y border-slate-100 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Leverandør:' : 'Supplier:'}</span>
                    <span className="font-bold text-slate-900">{selectedCar.supplierName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Hentestasjon:' : 'Pickup Station:'}</span>
                    <span className="font-bold text-slate-900">{selectedCar.pickupStation.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Leieperiode:' : 'Duration:'}</span>
                    <span className="font-bold text-slate-900">{pickupDate} til {returnDate} ({rentalDays} {isNo ? 'dager' : 'days'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Atlas-påslag:' : 'Atlas Club Markup:'}</span>
                    <span className="font-bold text-emerald-600">0 kr (0.00%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{isNo ? 'Betaling:' : 'Payment Type:'}</span>
                    <span className="font-bold text-sky-700">{isNo ? 'Betales ved henting hos utleier' : 'Counter Guarantee (Pay at desk)'}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-slate-100">
                    <span className="font-bold text-slate-900">{isNo ? 'Medlemspris totalt:' : 'Total Member Rate:'}</span>
                    <span className="font-black text-slate-900">
                      {formatPrice(convertPrice(selectedCar.memberPrice))}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold text-right">
                    {isNo
                      ? `Du sparer ${formatPrice(convertPrice(selectedCar.memberInstantSavings))} sammenlignet med Expedia`
                      : `You save ${formatPrice(convertPrice(selectedCar.memberInstantSavings))} compared to Expedia`}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50"
                  >
                    {isNo ? 'Avbryt' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => setBookingConfirmed(true)}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                  >
                    {isNo ? 'Bekreft og reserver' : 'Confirm & Reserve'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-4 text-3xl font-black">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {isNo ? 'Reservasjonen er bekreftet' : 'Reservation Confirmed!'}
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {isNo
                    ? `Din ${selectedCar.vehicleName} fra ${selectedCar.supplierName} er reservert med 0 kr i påslag. Bekreftelse og hentebevis er registrert på din profil. Ingen betaling trekkes av Atlas – du betaler direkte ved henting.`
                    : `Your ${selectedCar.vehicleName} with ${selectedCar.supplierName} is reserved with 0% markup. Voucher sent. Payment is due at the rental desk upon vehicle collection.`}
                </p>
                <button
                  onClick={() => {
                    setSelectedCar(null);
                    setBookingConfirmed(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  {isNo ? 'Lukk' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

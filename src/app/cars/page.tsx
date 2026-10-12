'use client';

import React, { useState, useMemo } from 'react';
import {
  Car,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock,
  Calendar,
  Users,
  MapPin,
  SlidersHorizontal,
  Info,
  DollarSign,
  Fuel,
  Gauge,
  Briefcase,
  Key,
  Star,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';

interface CarRentalOffer {
  id: string;
  name: string;
  category: 'Luxury Sedan' | 'Executive SUV' | 'Sports & Performance' | 'Premium Electric';
  image: string;
  seats: number;
  luggage: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  supplier: string;
  retailOtaPricePerDay: number;
  memberPricePerDay: number;
  features: string[];
  deposit: number;
  includedPerks: string[];
}

const SAMPLE_CARS: CarRentalOffer[] = [
  {
    id: 'car-porsche-taycan',
    name: 'Porsche Taycan 4S Cross Turismo',
    category: 'Premium Electric',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    seats: 4,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Electric',
    supplier: 'Sixt Prestige Partner',
    retailOtaPricePerDay: 420,
    memberPricePerDay: 265,
    features: ['530 HP Dual-Motor', 'All-Wheel Drive', 'Panoramic Glass Roof', 'Burmester Sound'],
    deposit: 500,
    includedPerks: ['Free Supercharging', 'VIP Runway Curbside Delivery', 'Zero Deductible Insurance', 'Additional Driver Included'],
  },
  {
    id: 'car-range-rover',
    name: 'Range Rover Autobiography V8',
    category: 'Executive SUV',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80',
    seats: 5,
    luggage: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    supplier: 'Hertz Dream Collection',
    retailOtaPricePerDay: 580,
    memberPricePerDay: 375,
    features: ['523 HP Twin-Turbo V8', 'Executive Class Seating', 'Air Suspension', 'Head-Up Display'],
    deposit: 600,
    includedPerks: ['Unlimited Kilometers', 'Full Comprehensive Coverage', 'Direct Airport Escort', 'Ski/Luggage Rack Free'],
  },
  {
    id: 'car-mercedes-s-class',
    name: 'Mercedes-Benz S 580 4MATIC',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    seats: 5,
    luggage: 4,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    supplier: 'Avis Signature Series',
    retailOtaPricePerDay: 490,
    memberPricePerDay: 310,
    features: ['Mild Hybrid V8', 'MBUX Augmented Reality', 'Active Noise Cancellation', 'Ventilated Massage Seats'],
    deposit: 450,
    includedPerks: ['Chauffeur Upgrade Option', 'Zero Excess Collision Protection', 'Express Key Dropoff'],
  },
  {
    id: 'car-porsche-911',
    name: 'Porsche 911 Carrera 4 GTS Cabriolet',
    category: 'Sports & Performance',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    seats: 2,
    luggage: 2,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    supplier: 'Europcar Prestige',
    retailOtaPricePerDay: 720,
    memberPricePerDay: 460,
    features: ['473 HP Boxer-6', 'Sport Chrono Package', 'Acoustic Soft-top', 'Sport Exhaust'],
    deposit: 800,
    includedPerks: ['Guaranteed Specific Model', 'Full Track & Mountain Coverage', 'Free Valet Delivery'],
  },
  {
    id: 'car-bmw-x7',
    name: 'BMW X7 M60i xDrive (7-Seats)',
    category: 'Executive SUV',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    seats: 7,
    luggage: 6,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    supplier: 'Enterprise Exotic',
    retailOtaPricePerDay: 460,
    memberPricePerDay: 295,
    features: ['M TwinPower V8', 'Sky Lounge Panoramic Glass', 'Harman Kardon Sound', 'Integral Active Steering'],
    deposit: 400,
    includedPerks: ['Child Seats Included (x2)', 'GPS Navigation Pro', 'Zero Security Excess'],
  },
  {
    id: 'car-audi-etron-gt',
    name: 'Audi RS e-tron GT Carbon Black',
    category: 'Premium Electric',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    seats: 4,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Electric',
    supplier: 'Sixt Prestige Partner',
    retailOtaPricePerDay: 510,
    memberPricePerDay: 325,
    features: ['637 HP Boost Mode', 'Quattro with Torque Vectoring', 'Matrix LED Headlights', 'Bang & Olufsen 3D'],
    deposit: 500,
    includedPerks: ['Priority Supercharger Access', '24/7 Roadside VIP Concierge', 'Zero Hidden Fees'],
  },
];

export default function CarsPage() {
  const { currentCurrency, convertPrice, formatPrice } = useCurrency();
  const { currentLanguage } = useLanguage();
  const isNo = currentLanguage === 'no';

  // Search filter states
  const [pickupCity, setPickupCity] = useState('Nice / Cannes, France');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pickupDate, setPickupDate] = useState('2026-06-15');
  const [returnDate, setReturnDate] = useState('2026-06-20');
  const [selectedCar, setSelectedCar] = useState<CarRentalOffer | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Rental duration calculation
  const rentalDays = useMemo(() => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(returnDate).getTime();
    const diff = Math.max(1, Math.round((end - start) / (1000 * 3600 * 24)));
    return isNaN(diff) ? 5 : diff;
  }, [pickupDate, returnDate]);

  // Filtered cars
  const filteredCars = useMemo(() => {
    if (selectedCategory === 'All') return SAMPLE_CARS;
    return SAMPLE_CARS.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const categories = ['All', 'Luxury Sedan', 'Executive SUV', 'Sports & Performance', 'Premium Electric'];

  return (
    <div className="min-h-screen bg-[#07090C] text-[#F3F4F6] selection:bg-[#D4AF37] selection:text-black">
      {/* Top Banner & Header */}
      <div className="relative pt-12 pb-20 px-4 border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-[#07090C] to-[#07090C]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isNo ? 'ATLAS Premium Billeie & Flåte' : 'ATLAS Prestige Fleet & Car Rental'}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] mb-4">
            {isNo ? 'Kjør med Perfeksjon og Eksklusivitet' : 'Drive Perfection Across Every Destination'}
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isNo
              ? 'Luksussedaner, kraftfulle SUV-er og eksotiske sportsbiler. Forhandlede medlemspriser med 0,- egenandel, ubegrenset kjørelengde og VIP-levering direkte på rullebanen.'
              : 'Direct corporate rates on prestige luxury sedans, executive SUVs, and exotic sports cars. Zero deductibles, guaranteed model availability, and runway curbside delivery.'}
          </p>

          {/* Quick Stats Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-300">
                {isNo ? '0,- Egenandel Inkludert' : 'Zero Excess Deductible'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 justify-center">
              <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-300">
                {isNo ? 'Fri Kjørelengde' : 'Unlimited Mileage'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 justify-center">
              <Key className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-semibold text-gray-300">
                {isNo ? 'Garantert Modell' : 'Guaranteed Exact Model'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 justify-center">
              <DollarSign className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-semibold text-gray-300">
                {isNo ? 'Opptil -40% Medlemspris' : 'Up to -40% Off Retail'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search & Catalog Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 pb-24">
        {/* Search Filter Bar */}
        <div className="bg-[#0F141E] border border-amber-500/25 rounded-2xl p-6 shadow-2xl backdrop-blur-xl mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                {isNo ? 'Hentested / Flyplass' : 'Pickup Location'}
              </label>
              <select
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                className="w-full bg-[#161D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="Nice / Cannes, France">Nice Côte d'Azur (NCE) & Cannes</option>
                <option value="Oslo Gardermoen, Norway">Oslo Gardermoen (OSL)</option>
                <option value="Dubai International, UAE">Dubai International (DXB) / Al Maktoum</option>
                <option value="Miami International, USA">Miami International (MIA) & South Beach</option>
                <option value="Geneva Cointrin, Switzerland">Geneva Cointrin (GVA) / Alps</option>
                <option value="London Heathrow, UK">London Heathrow (LHR) / Mayfair</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                {isNo ? 'Hentedato' : 'Pickup Date'}
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#161D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-[#D4AF37]" />
                {isNo ? 'Leveringsdato' : 'Return Date'}
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-[#161D2A] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div className="flex flex-col justify-end">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 text-center flex items-center justify-between">
                <span className="text-xs text-gray-400">{isNo ? 'Leieperiode:' : 'Duration:'}</span>
                <span className="text-sm font-bold text-amber-300">
                  {rentalDays} {isNo ? 'dager' : 'days'}
                </span>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat === 'All' ? (isNo ? 'Alle Kategorier' : 'All Categories') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCars.map((car) => {
            const memberTotal = car.memberPricePerDay * rentalDays;
            const retailTotal = car.retailOtaPricePerDay * rentalDays;
            const savingsTotal = retailTotal - memberTotal;

            return (
              <div
                key={car.id}
                className="bg-[#0E121A] border border-white/10 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Image & Category Tag */}
                <div className="relative h-64 overflow-hidden bg-black/60">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {car.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      {isNo ? `Spar ${formatPrice(convertPrice(savingsTotal))}` : `Save ${formatPrice(convertPrice(savingsTotal))}`}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-gray-300 font-medium">
                    {car.supplier}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">
                      {car.name}
                    </h3>
                  </div>
                </div>

                {/* Specs and Details */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  {/* Quick specs icons */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-y border-white/5 text-center text-xs text-gray-300">
                    <div className="flex flex-col items-center gap-1">
                      <Users className="w-4 h-4 text-amber-400" />
                      <span>{car.seats} {isNo ? 'Seter' : 'Seats'}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Briefcase className="w-4 h-4 text-amber-400" />
                      <span>{car.luggage} {isNo ? 'Kofferter' : 'Bags'}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Fuel className="w-4 h-4 text-amber-400" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Gauge className="w-4 h-4 text-amber-400" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      {isNo ? 'Utstyr & Høydepunkter' : 'Features & Highlights'}
                    </h4>
                    <div className="grid grid-cols-2 gap-1.5">
                      {car.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Club Perks */}
                  <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {isNo ? 'ATLAS Medlemsfordeler Inkludert' : 'ATLAS Club Inclusions'}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[11px] text-gray-300">
                      {car.includedPerks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="pt-4 border-t border-white/5 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through">
                        {isNo ? 'Ordinær OTA-pris: ' : 'Retail OTA: '}
                        {formatPrice(convertPrice(retailTotal))}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-3xl font-serif font-bold text-amber-300">
                          {formatPrice(convertPrice(memberTotal))}
                        </span>
                        <span className="text-xs text-gray-400">
                          / {rentalDays} {isNo ? 'dager totalt' : 'days total'}
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        ({formatPrice(convertPrice(car.memberPricePerDay))} / {isNo ? 'dag' : 'day'})
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCar(car)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
                    >
                      {isNo ? 'Reserver Bil' : 'Reserve Vehicle'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reservation Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E121A] border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            {!bookingConfirmed ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      {isNo ? 'Bekreft Medlemsreservasjon' : 'Confirm Member Reservation'}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {selectedCar.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="text-gray-400 hover:text-white text-lg p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 py-3 border-y border-white/5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Hentested:' : 'Pickup Location:'}</span>
                    <span className="font-semibold text-white">{pickupCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Leieperiode:' : 'Duration:'}</span>
                    <span className="font-semibold text-white">{pickupDate} til {returnDate} ({rentalDays} {isNo ? 'dager' : 'days'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Egenandel:' : 'Deductible Excess:'}</span>
                    <span className="font-semibold text-emerald-400">0,- (Full VIP Protection)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isNo ? 'Sikkerhetsdepositum (reserveres):' : 'Security Hold:'}</span>
                    <span className="font-semibold text-white">{formatPrice(convertPrice(selectedCar.deposit))}</span>
                  </div>
                  <div className="flex justify-between text-base pt-2 border-t border-white/5">
                    <span className="font-bold text-white">{isNo ? 'Medlemspris totalt:' : 'Total Member Fare:'}</span>
                    <span className="font-serif font-bold text-amber-300">
                      {formatPrice(convertPrice(selectedCar.memberPricePerDay * rentalDays))}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 hover:bg-white/5"
                  >
                    {isNo ? 'Avbryt' : 'Cancel'}
                  </button>
                  <button
                    onClick={() => setBookingConfirmed(true)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/20"
                  >
                    {isNo ? 'Bekreft & Lås Pris' : 'Confirm & Lock Rate'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {isNo ? 'Reservasjon Bekreftet!' : 'Reservation Confirmed!'}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {isNo
                    ? `Din ${selectedCar.name} er reservert for henting i ${pickupCity}. Detaljert leiebekreftelse og VIP-hentekode er sendt til din medlemskonto.`
                    : `Your ${selectedCar.name} is reserved for curbside delivery in ${pickupCity}. Confirmation and concierge pass sent to your account.`}
                </p>
                <button
                  onClick={() => {
                    setSelectedCar(null);
                    setBookingConfirmed(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ECC86B] via-[#D4AF37] to-[#A67C1E] text-black text-xs font-bold uppercase tracking-wider"
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

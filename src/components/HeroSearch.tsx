'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Building2,
  Castle,
  Laptop,
  Plane,
  Ship,
  Sparkles,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import GuestRoomPicker, { GuestRoomConfig } from '@/components/GuestRoomPicker';

const TRAVEL_CATEGORIES = [
  { id: 'hotels', label: 'Hotels', icon: Building2, path: '/hotels', saveText: '20%–45% Off' },
  { id: 'flights', label: 'Flights', icon: Plane, path: '/flights', saveText: '0% Markup' },
  { id: 'villas', label: 'Villas & Chalets', icon: Castle, path: '/villas', saveText: 'French Chef' },
  { id: 'nomads', label: 'Nomad Coliving', icon: Laptop, path: '/nomads', saveText: '1Gbps Wi-Fi' },
  { id: 'jets', label: 'Private Jets', icon: Sparkles, path: '/private-jets', saveText: 'Empty Legs' },
  { id: 'cruises', label: 'Cruises', icon: Ship, path: '/cruises', saveText: '+$250 Credit' },
];

const POPULAR_DESTINATIONS = [
  { name: 'Las Vegas, NV', tag: 'From $198/nt', discount: '42% Off' },
  { name: 'Cancun, Mexico', tag: 'From $235/nt', discount: '44% Off' },
  { name: 'St. Barts, Caribbean', tag: 'Villa $3,200/nt', discount: '45% Off' },
  { name: 'Paris, France', tag: 'From $420/nt', discount: '43% Off' },
  { name: 'Lisbon, Portugal', tag: 'Coliving $1,150/mo', discount: '45% Off' },
  { name: 'Courchevel 1850, France', tag: 'Ski Chalet $2,300/nt', discount: '45% Off' },
  { name: 'Bali, Indonesia', tag: 'Coliving $890/mo', discount: '40% Off' },
];

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hotels');
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState(() => {
    const d1 = new Date(Date.now() + 14 * 86400000);
    return d1.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const d2 = new Date(Date.now() + 17 * 86400000);
    return d2.toISOString().split('T')[0];
  });
  const [guestConfig, setGuestConfig] = useState<GuestRoomConfig>({
    rooms: 1,
    adults: 2,
    childrenAges: [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTabObj = TRAVEL_CATEGORIES.find((t) => t.id === activeTab) || TRAVEL_CATEGORIES[0];
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    params.set('checkIn', checkIn);
    params.set('checkOut', checkOut);
    params.set('rooms', String(guestConfig.rooms));
    params.set('adults', String(guestConfig.adults));
    params.set('children', String(guestConfig.childrenAges.length));
    if (guestConfig.childrenAges.length > 0) {
      params.set('childAges', guestConfig.childrenAges.join(','));
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`${currentTabObj.path}${query}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Sleek Segmented Category Tabs */}
      <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl max-w-full overflow-x-auto scrollbar-none">
        {TRAVEL_CATEGORIES.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'hotels' && tab.id !== 'villas') {
                  router.push(tab.path);
                }
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-emerald-400'
              }`}>
                {tab.saveText}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Container Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200/80 text-left relative">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Destination */}
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Destination or Property
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-600" />
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Las Vegas, St. Barts, Paris..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
              />
            </div>

            {/* Quick dropdown for suggestions */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-30 animate-in fade-in zoom-in-95 max-h-64 overflow-y-auto custom-scrollbar">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">
                  Trending Wholesale Rates
                </div>
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.name}
                    type="button"
                    onClick={() => {
                      setCity(dest.name.split(',')[0]);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-between text-xs"
                  >
                    <span className="font-semibold text-slate-800">{dest.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500">{dest.tag}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {dest.discount}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Travel Dates
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-amber-600" />
              <input
                type="text"
                value={`${checkIn} → ${checkOut}`}
                onChange={() => {}}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Guests &amp; Rooms
            </label>
            <div className="relative flex items-center pl-3.5 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold text-xs focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white transition-all">
              <Users className="w-4 h-4 text-amber-600 mr-2 shrink-0" />
              <GuestRoomPicker
                value={guestConfig}
                onChange={setGuestConfig}
                theme="light"
                className="flex-1 min-w-0"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-5 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 hover:from-slate-900 hover:to-indigo-900 text-amber-300 border border-amber-400/40 font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 group"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Unlock Wholesale Rates</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>

        {/* Footnote */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Live B2B Bedbank settlement feeds • Direct XML pipe to 1,000,000+ properties</span>
          </div>
          <div className="font-bold text-slate-700">
            Average member savings per stay: <span className="text-emerald-600 font-black">$382.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

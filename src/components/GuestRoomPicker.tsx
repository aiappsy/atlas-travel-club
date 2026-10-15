'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Users, Bed, Plus, Minus, X, Info, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface GuestRoomConfig {
  rooms: number;
  adults: number;
  childrenAges: number[];
}

interface GuestRoomPickerProps {
  value: GuestRoomConfig;
  onChange: (config: GuestRoomConfig) => void;
  theme?: 'dark' | 'light';
  align?: 'left' | 'right';
  className?: string;
}

export function formatGuestSummary(config: GuestRoomConfig, locale: string = 'en'): string {
  const { rooms, adults, childrenAges } = config;
  const isNo = locale === 'no';

  const adultsStr = `${adults} ${adults === 1 ? (isNo ? 'voksen' : 'Adult') : (isNo ? 'voksne' : 'Adults')}`;
  const roomsStr = `${rooms} ${rooms === 1 ? (isNo ? 'rom' : 'Room') : (isNo ? 'rom' : 'Rooms')}`;
  
  if (!childrenAges || childrenAges.length === 0) {
    return `${adultsStr} · ${roomsStr}`;
  }

  const kidsCount = childrenAges.length;
  const kidsStr = `${kidsCount} ${kidsCount === 1 ? (isNo ? 'barn' : 'Child') : (isNo ? 'barn' : 'Kids')}`;
  return `${adultsStr}, ${kidsStr} · ${roomsStr}`;
}

export default function GuestRoomPicker({
  value,
  onChange,
  theme = 'dark',
  align = 'right',
  className = '',
}: GuestRoomPickerProps) {
  const { locale } = useLanguage();
  const isNo = locale === 'no';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Stepper handlers
  const updateRooms = (delta: number) => {
    const nextRooms = Math.min(8, Math.max(1, value.rooms + delta));
    onChange({ ...value, rooms: nextRooms });
  };

  const updateAdults = (delta: number) => {
    const nextAdults = Math.min(16, Math.max(1, value.adults + delta));
    onChange({ ...value, adults: nextAdults });
  };

  const updateChildrenCount = (delta: number) => {
    const currentCount = value.childrenAges.length;
    const nextCount = Math.min(6, Math.max(0, currentCount + delta));
    if (nextCount === currentCount) return;

    let nextAges = [...value.childrenAges];
    if (nextCount > currentCount) {
      // Default new child age to 7 years old
      nextAges.push(7);
    } else {
      nextAges.pop();
    }
    onChange({ ...value, childrenAges: nextAges });
  };

  const updateChildAge = (index: number, age: number) => {
    const nextAges = [...value.childrenAges];
    nextAges[index] = age;
    onChange({ ...value, childrenAges: nextAges });
  };

  const isDark = theme === 'dark';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left flex items-center justify-between gap-1.5 transition-all cursor-pointer ${
          isDark
            ? 'text-white'
            : 'text-slate-900'
        }`}
      >
        <span className="font-bold text-xs truncate">
          {formatGuestSummary(value, locale)}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-80 sm:w-[380px] max-h-[min(520px,82vh)] flex flex-col rounded-3xl p-5 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-white shadow-black/90'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60'
          }`}
        >
          {/* Pinned Header */}
          <div className="shrink-0 flex items-center justify-between pb-3.5 border-b border-slate-800/60 mb-3.5">
            <div>
              <h4 className="font-black text-sm tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                <span>{isNo ? 'Rom og gjester' : 'Rooms & Guests'}</span>
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {isNo ? 'Angi antall for korrekte grossistpriser og ledige rom' : 'Specify exact party to ensure hotel bedbank availability'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto pr-1 py-1 space-y-4 custom-scrollbar">
            {/* 1. Rooms Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">{isNo ? 'Rom' : 'Rooms'}</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isNo ? 'Vanligvis maks 4 gjester per rom' : 'Standard max 4 guests per room'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={value.rooms <= 1}
                  onClick={() => updateRooms(-1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-mono font-black text-sm">
                  {value.rooms}
                </span>
                <button
                  type="button"
                  disabled={value.rooms >= 8}
                  onClick={() => updateRooms(1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Adults Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">{isNo ? 'Voksne' : 'Adults'}</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isNo ? 'Fra 18 år' : 'Ages 18 and older'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={value.adults <= 1}
                  onClick={() => updateAdults(-1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-mono font-black text-sm">
                  {value.adults}
                </span>
                <button
                  type="button"
                  disabled={value.adults >= 16}
                  onClick={() => updateAdults(1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Children Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">{isNo ? 'Barn' : 'Children'}</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isNo ? '0 til 17 år ved innsjekk' : 'Ages 0 to 17 at check-in'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={value.childrenAges.length <= 0}
                  onClick={() => updateChildrenCount(-1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-mono font-black text-sm">
                  {value.childrenAges.length}
                </span>
                <button
                  type="button"
                  disabled={value.childrenAges.length >= 6}
                  onClick={() => updateChildrenCount(1)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Child Ages Selectors (Dynamic when children > 0) */}
            {value.childrenAges.length > 0 && (
              <div className={`p-3.5 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-500">
                    {isNo ? 'Barnas alder ved innsjekk' : 'Child Ages at Check-in'}
                  </span>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {isNo ? 'Påkrevd for senger og avgifter' : 'Required for beds & taxes'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {value.childrenAges.map((age, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className={`block text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {isNo ? `Barn ${idx + 1}` : `Child ${idx + 1}`}
                      </label>
                      <select
                        value={age}
                        onChange={(e) => updateChildAge(idx, parseInt(e.target.value, 10))}
                        className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold border transition-all appearance-none cursor-pointer ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      >
                        <option value={0}>{isNo ? 'Under 1 år (spedbarn)' : 'Under 1 yr (Infant)'}</option>
                        <option value={1}>{isNo ? '1 år' : '1 yr old'}</option>
                        <option value={2}>{isNo ? '2 år (barneseng)' : '2 yrs old (Crib/Cot)'}</option>
                        <option value={3}>{isNo ? '3 år' : '3 yrs old'}</option>
                        <option value={4}>{isNo ? '4 år' : '4 yrs old'}</option>
                        <option value={5}>{isNo ? '5 år' : '5 yrs old'}</option>
                        <option value={6}>{isNo ? '6 år' : '6 yrs old'}</option>
                        <option value={7}>{isNo ? '7 år' : '7 yrs old'}</option>
                        <option value={8}>{isNo ? '8 år' : '8 yrs old'}</option>
                        <option value={9}>{isNo ? '9 år' : '9 yrs old'}</option>
                        <option value={10}>{isNo ? '10 år' : '10 yrs old'}</option>
                        <option value={11}>{isNo ? '11 år' : '11 yrs old'}</option>
                        <option value={12}>{isNo ? '12 år (ungdom)' : '12 yrs old (Teen)'}</option>
                        <option value={13}>{isNo ? '13 år' : '13 yrs old'}</option>
                        <option value={14}>{isNo ? '14 år' : '14 yrs old'}</option>
                        <option value={15}>{isNo ? '15 år' : '15 yrs old'}</option>
                        <option value={16}>{isNo ? '16 år' : '16 yrs old'}</option>
                        <option value={17}>{isNo ? '17 år' : '17 yrs old'}</option>
                      </select>
                    </div>
                  ))}
                </div>

                {/* Helpful policy note */}
                <div className="flex items-start gap-2 pt-1 text-[10px] text-slate-400">
                  <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    {isNo
                      ? 'Spedbarn (0–2 år) bor som regel gratis i barneseng. Barn fra 12 år kan kreve ordinær seng etter hotellets regler.'
                      : 'Infants (0–2) stay free in cribs at most hotels. Children 12+ may require adult bedding depending on hotel regulations.'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Pinned Footer */}
          <div className="shrink-0 mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isNo
                ? `Totalt: ${value.adults + value.childrenAges.length} ${value.adults + value.childrenAges.length === 1 ? 'gjest' : 'gjester'}`
                : `Total: ${value.adults + value.childrenAges.length} ${value.adults + value.childrenAges.length === 1 ? 'Guest' : 'Guests'}`}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-amber-400/20 cursor-pointer active:scale-95"
            >
              <Check className="w-3.5 h-3.5 text-slate-950" />
              <span>{isNo ? 'Bruk' : 'Apply'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

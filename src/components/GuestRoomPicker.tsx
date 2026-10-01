'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Users, Bed, Plus, Minus, X, Info, Check } from 'lucide-react';

export interface GuestRoomConfig {
  rooms: number;
  adults: number;
  childrenAges: number[];
}

interface GuestRoomPickerProps {
  value: GuestRoomConfig;
  onChange: (config: GuestRoomConfig) => void;
  theme?: 'dark' | 'light';
  className?: string;
}

export function formatGuestSummary(config: GuestRoomConfig): string {
  const { rooms, adults, childrenAges } = config;
  const adultsStr = `${adults} ${adults === 1 ? 'Adult' : 'Adults'}`;
  const roomsStr = `${rooms} ${rooms === 1 ? 'Room' : 'Rooms'}`;
  
  if (!childrenAges || childrenAges.length === 0) {
    return `${adultsStr} · ${roomsStr}`;
  }

  const kidsCount = childrenAges.length;
  const kidsStr = `${kidsCount} ${kidsCount === 1 ? 'Child' : 'Kids'}`;
  return `${adultsStr}, ${kidsStr} · ${roomsStr}`;
}

export default function GuestRoomPicker({
  value,
  onChange,
  theme = 'dark',
  className = '',
}: GuestRoomPickerProps) {
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
        className={`w-full text-left flex items-center justify-between gap-2 transition-all ${
          isDark
            ? 'text-white'
            : 'text-slate-900'
        }`}
      >
        <span className="font-bold text-xs truncate">
          {formatGuestSummary(value)}
        </span>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-3 w-80 sm:w-96 rounded-3xl p-5 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-white shadow-black/80'
              : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-4">
            <div>
              <h4 className="font-black text-sm tracking-tight flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                <span>Rooms &amp; Guests</span>
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Specify exact party to ensure hotel bedbank availability
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-full transition-colors ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* 1. Rooms Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs">Rooms</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Standard max 4 guests per room
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
                <div className="font-bold text-xs">Adults</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ages 18 and older
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
                <div className="font-bold text-xs">Children</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ages 0 to 17 at check-in
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
                    Child Ages at Check-in
                  </span>
                  <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Required for beds &amp; taxes
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {value.childrenAges.map((age, idx) => (
                    <div key={idx} className="space-y-1">
                      <label className={`block text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Child {idx + 1}
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
                        <option value={0}>Under 1 yr (Infant)</option>
                        <option value={1}>1 yr old</option>
                        <option value={2}>2 yrs old (Crib/Cot)</option>
                        <option value={3}>3 yrs old</option>
                        <option value={4}>4 yrs old</option>
                        <option value={5}>5 yrs old</option>
                        <option value={6}>6 yrs old</option>
                        <option value={7}>7 yrs old</option>
                        <option value={8}>8 yrs old</option>
                        <option value={9}>9 yrs old</option>
                        <option value={10}>10 yrs old</option>
                        <option value={11}>11 yrs old</option>
                        <option value={12}>12 yrs old (Teen)</option>
                        <option value={13}>13 yrs old</option>
                        <option value={14}>14 yrs old</option>
                        <option value={15}>15 yrs old</option>
                        <option value={16}>16 yrs old</option>
                        <option value={17}>17 yrs old</option>
                      </select>
                    </div>
                  ))}
                </div>

                {/* Helpful policy note */}
                <div className="flex items-start gap-2 pt-1 text-[10px] text-slate-400">
                  <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Infants (0–2) stay free in cribs at most hotels. Children 12+ may require adult bedding depending on hotel regulations.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
            <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Total: {value.adults + value.childrenAges.length} {value.adults + value.childrenAges.length === 1 ? 'Guest' : 'Guests'}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-amber-400/20"
            >
              <Check className="w-3.5 h-3.5 text-slate-950" />
              <span>Apply</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

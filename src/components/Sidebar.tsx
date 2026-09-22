'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import { usePlatform } from '@/context/PlatformContext';
import {
  Building2,
  Castle,
  Laptop,
  Plane,
  Ship,
  Anchor,
  CreditCard,
  TrendingDown,
  Coins,
  Zap,
  Star,
  Globe,
  Scale,
  HeartPulse,
  ShieldCheck,
  HelpCircle,
  FileText,
  BookOpen,
  Shield,
  Compass,
  Sparkles,
  Download,
  Search,
  X
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();
  const { user, isMember } = useAuth();
  const { features } = usePlatform();

  const NAV_SECTIONS = [
    {
      title: 'Wholesale Stays & Travel',
      items: [
        ...(features.enableHotels
          ? [
              {
                name: 'Wholesale Hotels',
                href: '/hotels',
                icon: Building2,
                badge: '1M+ Properties',
                badgeColor: 'bg-amber-100 text-amber-900',
              },
            ]
          : []),
        ...(features.enableLuxuryVillas
          ? [
              {
                name: 'Luxury Villas & Chalets',
                href: '/villas',
                icon: Castle,
                badge: 'French Chef',
                badgeColor: 'bg-indigo-100 text-indigo-900',
              },
            ]
          : []),
        ...(features.enableNomadHub
          ? [
              {
                name: 'Nomad Visas & Coliving',
                href: '/nomads',
                icon: Laptop,
                badge: '1Gbps Fiber',
                badgeColor: 'bg-teal-100 text-teal-900',
              },
            ]
          : []),
        ...(features.enablePrivateJets
          ? [
              {
                name: 'Private Jet Empty Legs',
                href: '/private-jets',
                icon: Plane,
                badge: 'Up to 80% Off',
                badgeColor: 'bg-sky-100 text-sky-900',
              },
            ]
          : []),
        ...(features.enableCruises
          ? [
              {
                name: 'Wholesale Cruises',
                href: '/cruises',
                icon: Ship,
                badge: '+$250 Credit',
                badgeColor: 'bg-emerald-100 text-emerald-900',
              },
            ]
          : []),
        ...(features.enableYachtsAndSupercars
          ? [
              {
                name: 'Yachts & Supercars',
                href: '/yachts-and-supercars',
                icon: Anchor,
              },
            ]
          : []),
      ],
    },
    {
      title: 'FinTech & Sovereign Banking',
      items: [
        ...(features.enableVisaPrepaidCards
          ? [
              {
                name: 'ATLAS Visa® Card',
                href: '/membership/visa-card',
                icon: CreditCard,
                badge: '0% FX',
                badgeColor: 'bg-emerald-100 text-emerald-900',
              },
            ]
          : []),
        ...(features.enableAutoRebooker
          ? [
              {
                name: 'Price-Drop Sentinel',
                href: '/membership/price-drops',
                icon: TrendingDown,
                badge: '24/7 Auto',
                badgeColor: 'bg-sky-100 text-sky-900',
              },
            ]
          : []),
        ...(features.enableTravelVault
          ? [
              {
                name: 'Travel Vault Dividends',
                href: '/vault',
                icon: Coins,
                badge: 'Annual Payout',
                badgeColor: 'bg-amber-100 text-amber-900',
              },
            ]
          : []),
      ],
    },
    {
      title: 'VIP Privileges & Mobility',
      items: [
        ...(features.enableFastTrackImmigration
          ? [
              {
                name: 'Airport Fast-Track Customs',
                href: '/fast-track',
                icon: Zap,
                badge: '3-Min Escort',
                badgeColor: 'bg-amber-100 text-amber-900',
              },
            ]
          : []),
        ...(features.enableStatusMatch
          ? [
              {
                name: 'Elite Status Matches',
                href: '/status-match',
                icon: Star,
                badge: 'Hilton 💎',
                badgeColor: 'bg-purple-100 text-purple-900',
              },
            ]
          : []),
        ...(features.enableLounges
          ? [
              {
                name: 'VIP Airport Lounges',
                href: '/lounges',
                icon: Plane,
                badge: '$32 Pass',
                badgeColor: 'bg-sky-100 text-sky-900',
              },
            ]
          : []),
        ...(features.enableEsim
          ? [
              {
                name: 'Global 5G eSIM',
                href: '/esim',
                icon: Globe,
                badge: '140+ Countries',
                badgeColor: 'bg-indigo-100 text-indigo-900',
              },
            ]
          : []),
        ...(features.enableFlightClaims
          ? [
              {
                name: 'Flight Delay Claims ($650)',
                href: '/flight-claims',
                icon: Scale,
                badge: 'AirHelp',
                badgeColor: 'bg-rose-100 text-rose-900',
              },
            ]
          : []),
        ...(features.enableTravelInsurance
          ? [
              {
                name: 'Travel Medical Insurance',
                href: '/insurance',
                icon: HeartPulse,
              },
            ]
          : []),
      ],
    },
    {
      title: 'Verification & Transparency',
      items: [
        {
          name: 'Multi-OTA Price Checker',
          href: '/rate-checker',
          icon: Search,
          badge: 'Live',
          badgeColor: 'bg-sky-400 text-slate-950 font-bold',
        },
        {
          name: 'Live Savings Proof Engine',
          href: '/proof',
          icon: ShieldCheck,
          badge: 'Audited',
          badgeColor: 'bg-emerald-500 text-slate-950 font-black',
        },
        {
          name: 'Case Study: Rate Parity',
          href: '/case-study',
          icon: BookOpen,
          badge: 'Economics',
          badgeColor: 'bg-amber-400 text-slate-950 font-bold',
        },
        {
          name: 'How ATLAS Works',
          href: '/how-it-works',
          icon: HelpCircle,
        },
        {
          name: 'Case Study (PDF)',
          href: '/ATLAS_Case_Study_Rate_Parity.pdf',
          icon: Download,
          isExternalDownload: true,
        },
        {
          name: 'Official Sales Letter (PDF)',
          href: '/ATLAS_Sales_Letter.pdf',
          icon: FileText,
          isExternalDownload: true,
        },
        {
          name: 'Technical Whitepaper (PDF)',
          href: '/ATLAS_Whitepaper.pdf',
          icon: BookOpen,
          isExternalDownload: true,
        },
        {
          name: 'Terms of Service',
          href: '/terms',
          icon: Scale,
        },
        {
          name: 'Privacy Policy',
          href: '/privacy',
          icon: ShieldCheck,
        },
        {
          name: 'Admin Command Console',
          href: '/admin',
          icon: Shield,
        },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeSidebar}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200"
      />

      {/* Slide-out Drawer Panel */}
      <aside className="fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-slate-950 text-slate-200 shadow-2xl border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out animate-in slide-in-from-left">
        {/* Drawer Header */}
        <div className="h-16 border-b border-slate-800/80 flex items-center justify-between px-5 bg-slate-950 shrink-0">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-white tracking-tight flex items-center gap-1.5 font-mono">
                ATLAS
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-sans">
                  VIP CLUB
                </span>
              </span>
              <span className="text-[9px] text-slate-400 -mt-0.5">
                Wholesale Travel & Sovereign Banking
              </span>
            </div>
          </Link>

          {/* Close Button */}
          <button
            onClick={closeSidebar}
            title="Close Menu"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                {section.title}
              </div>

              {section.items.map((item, iIdx) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                if (item.isExternalDownload) {
                  return (
                    <a
                      key={iIdx}
                      href={item.href}
                      download
                      onClick={closeSidebar}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-amber-300 hover:bg-slate-900 transition-all group"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-amber-300" />
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-400">
                        PDF ⬇
                      </span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={iIdx}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950 shrink-0 space-y-2">
          <Link
            href="/membership"
            onClick={closeSidebar}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Get ATLAS VIP Pass</span>
          </Link>

          {isMember && user && (
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Savings:</span>
              <span className="font-black text-emerald-400">${user.lifetimeSavings}</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

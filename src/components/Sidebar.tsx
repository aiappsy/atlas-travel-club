'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Hotel,
  Plane,
  Coffee,
  Ship,
  Sparkles,
  ShieldCheck,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  BookmarkCheck,
  X
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse, isMobileOpen, closeMobile } = useSidebar();
  const { user, isMember } = useAuth();
  const { t, locale } = useLanguage();

  const NAV_TABS = [
    {
      name: t.nav.hotels,
      href: '/hotels',
      icon: Hotel,
      badge: locale === 'no' ? '1M+ Engros' : '1M+ Wholesale',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      name: t.nav.flights,
      href: '/flights',
      icon: Plane,
      badge: locale === 'no' ? 'NDC Netto' : 'NDC Net',
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      name: t.nav.lounges,
      href: '/lounges',
      icon: Coffee,
      badge: '$32 Pass',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      name: t.nav.cruises,
      href: '/cruises',
      icon: Ship,
      badge: locale === 'no' ? 'Engros' : 'Wholesale',
      badgeColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      name: t.nav.savingsProof,
      href: '/proof',
      icon: ShieldCheck,
      badge: 'ROI',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      name: t.nav.membership,
      href: '/membership',
      icon: Sparkles,
      badge: locale === 'no' ? 'Prøve' : 'Trial',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      name: t.nav.myBookings,
      href: '/trips',
      icon: BookmarkCheck,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* 
        Sidebar Container:
        Fixed at the VERY TOP of the screen (top-0 bottom-0 left-0).
        Stands fixed in place at all times, independent of page scroll!
      */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between shadow-xs ${
          // Desktop sizing
          isCollapsed ? 'md:w-16' : 'md:w-60'
        } ${
          // Mobile drawer
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          
          {/* Top Logo Section Inside Sidebar (Pinned at the very top, height matches navbar h-20) */}
          <div className="h-20 border-b border-slate-200 flex items-center justify-between px-3 bg-white shrink-0">
            <Link
              href="/"
              onClick={() => closeMobile()}
              className={`flex items-center transition-all ${
                isCollapsed ? 'justify-center w-full' : 'px-1'
              }`}
            >
              {isCollapsed ? (
                /* Collapsed: Only the iconic gold 'A' mark is shown */
                <img
                  src="/atlas-mark-light.svg"
                  alt="Atlas"
                  className="h-9 w-9 object-contain transition-transform hover:scale-110 drop-shadow-xs"
                  title="Atlas Travel Club"
                />
              ) : (
                /* Expanded: Full Atlas Travel Club logo */
                <img
                  src="/atlas-logo-light.svg"
                  alt="Atlas Travel Club"
                  className="h-10 w-auto max-w-[190px] object-contain transition-transform hover:scale-102"
                />
              )}
            </Link>

            {/* Mobile close button */}
            <button
              onClick={closeMobile}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1 mt-1">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => closeMobile()}
                  title={isCollapsed ? tab.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-amber-600' : 'text-slate-500'
                    }`}
                  />

                  {/* Text label hidden when collapsed on desktop */}
                  <span
                    className={`whitespace-nowrap transition-opacity duration-200 ${
                      isCollapsed ? 'md:hidden' : 'inline'
                    }`}
                  >
                    {tab.name}
                  </span>

                  {/* Badge */}
                  {tab.badge && !isCollapsed && (
                    <span
                      className={`ml-auto text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full tracking-wider shrink-0 ${
                        tab.badgeColor || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Bar: Light mode styling, collapse toggle + Concierge shortcut */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80 space-y-2 shrink-0">
          {/* AI Concierge Trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-concierge'));
              closeMobile();
            }}
            title={isCollapsed ? 'Atlas Concierge' : undefined}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors cursor-pointer shadow-xs ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span className={isCollapsed ? 'md:hidden' : 'inline'}>Atlas Concierge</span>
          </button>

          {/* Desktop Collapse / Expand Button */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex w-full items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors text-xs font-semibold cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px]">{t.nav.collapse}</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

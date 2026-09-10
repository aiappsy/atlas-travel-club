'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'PHP'
  | 'AUD'
  | 'CAD'
  | 'SGD'
  | 'JPY'
  | 'CHF'
  | 'AED'
  | 'THB'
  | 'HKD'
  | 'NZD'
  | 'NOK'
  | 'SEK'
  | 'DKK'
  | 'INR'
  | 'IDR'
  | 'MYR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number;
  flag: string;
  symbolPosition?: 'prefix' | 'suffix';
}

export const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸', symbolPosition: 'prefix' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺', symbolPosition: 'prefix' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧', symbolPosition: 'prefix' },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 58.5, flag: '🇵🇭', symbolPosition: 'prefix' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, flag: '🇦🇺', symbolPosition: 'prefix' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.38, flag: '🇨🇦', symbolPosition: 'prefix' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34, flag: '🇸🇬', symbolPosition: 'prefix' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 155.0, flag: '🇯🇵', symbolPosition: 'prefix' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.88, flag: '🇨🇭', symbolPosition: 'prefix' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪', symbolPosition: 'prefix' },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 36.5, flag: '🇹🇭', symbolPosition: 'prefix' },
  HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 7.8, flag: '🇭🇰', symbolPosition: 'prefix' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 1.65, flag: '🇳🇿', symbolPosition: 'prefix' },
  NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 10.8, flag: '🇳🇴', symbolPosition: 'suffix' },
  SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 10.6, flag: '🇸🇪', symbolPosition: 'suffix' },
  DKK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 6.85, flag: '🇩🇰', symbolPosition: 'suffix' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.5, flag: '🇮🇳', symbolPosition: 'prefix' },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 15800.0, flag: '🇮🇩', symbolPosition: 'prefix' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 4.72, flag: '🇲🇾', symbolPosition: 'prefix' }
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: Record<CurrencyCode, CurrencyConfig>;
  updateExchangeRate: (code: CurrencyCode, newRate: number) => void;
  formatPrice: (amountInUSD: number, options?: { showCode?: boolean; roundWhole?: boolean }) => string;
  convertPrice: (amountInUSD: number) => number;
  currentConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');
  const [currencies, setCurrencies] = useState<Record<CurrencyCode, CurrencyConfig>>(DEFAULT_CURRENCIES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('atlas_currency') as CurrencyCode | null;
      if (saved && DEFAULT_CURRENCIES[saved]) {
        setCurrencyState(saved);
      }
      const savedRates = localStorage.getItem('atlas_fx_rates');
      if (savedRates) {
        setCurrencies((prev) => ({
          ...DEFAULT_CURRENCIES,
          ...JSON.parse(savedRates)
        }));
      }
    } catch (e) {
      console.error('Failed to load currency preferences', e);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('atlas_currency', code);
    } catch (e) {
      console.error(e);
    }
  };

  const updateExchangeRate = (code: CurrencyCode, newRate: number) => {
    setCurrencies((prev) => {
      const updated = {
        ...prev,
        [code]: { ...prev[code], rate: newRate }
      };
      try {
        localStorage.setItem('atlas_fx_rates', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const currentConfig = currencies[currency] || DEFAULT_CURRENCIES.USD;

  const convertPrice = (amountInUSD: number): number => {
    return (amountInUSD || 0) * (currentConfig.rate || 1.0);
  };

  const formatPrice = (
    amountInUSD: number,
    options?: { showCode?: boolean; roundWhole?: boolean }
  ): string => {
    const converted = convertPrice(amountInUSD);
    const noDecimalCurrencies = ['JPY', 'IDR', 'PHP', 'THB', 'INR', 'NOK', 'SEK', 'DKK', 'AED'];
    const shouldRound = options?.roundWhole ?? (noDecimalCurrencies.includes(currency) || converted >= 50);

    const formattedNumber = shouldRound
      ? Math.round(converted).toLocaleString('en-US')
      : converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const codeSuffix = options?.showCode ? ` ${currentConfig.code}` : '';

    if (currentConfig.symbolPosition === 'suffix') {
      return `${formattedNumber} ${currentConfig.symbol}${codeSuffix}`;
    }

    if (currentConfig.code === 'AED' || currentConfig.code === 'CHF' || currentConfig.code === 'IDR') {
      return `${currentConfig.symbol} ${formattedNumber}${codeSuffix}`;
    }

    return `${currentConfig.symbol}${formattedNumber}${codeSuffix}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencies,
        updateExchangeRate,
        formatPrice,
        convertPrice,
        currentConfig
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

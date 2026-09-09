'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CHF' | 'AED' | 'SGD' | 'JPY' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number;
  flag: string;
}

export const DEFAULT_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  CHF: { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.88, flag: '🇨🇭' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34, flag: '🇸🇬' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 155.0, flag: '🇯🇵' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, flag: '🇦🇺' }
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
        setCurrencies(JSON.parse(savedRates));
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
    return amountInUSD * currentConfig.rate;
  };

  const formatPrice = (
    amountInUSD: number,
    options?: { showCode?: boolean; roundWhole?: boolean }
  ): string => {
    const converted = convertPrice(amountInUSD);
    const roundWhole = options?.roundWhole ?? (currency === 'JPY' ? true : false);

    let formattedNumber: string;
    if (roundWhole || currency === 'JPY') {
      formattedNumber = Math.round(converted).toLocaleString();
    } else {
      formattedNumber = Math.round(converted).toLocaleString();
    }

    const symbolPrefix = currentConfig.symbol;
    const codeSuffix = options?.showCode ? ` ${currentConfig.code}` : '';

    if (currentConfig.code === 'AED' || currentConfig.code === 'CHF') {
      return `${currentConfig.code} ${formattedNumber}`;
    }

    return `${symbolPrefix}${formattedNumber}${codeSuffix}`;
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

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlatformFeatureFlags } from '@/lib/types';
import { DEFAULT_PLATFORM_CONFIG } from '@/lib/mockData';

interface PlatformContextType {
  features: PlatformFeatureFlags;
  updateFeatures: (newFlags: Partial<PlatformFeatureFlags>) => void;
  publishLive: () => void;
  isPublished: boolean;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [features, setFeatures] = useState<PlatformFeatureFlags>(DEFAULT_PLATFORM_CONFIG);
  const [isPublished, setIsPublished] = useState<boolean>(true);

  // Load from localStorage & listen for cross-tab and in-tab sync events
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        const saved = localStorage.getItem('hotelsclub_platform_features');
        if (saved) {
          setFeatures(JSON.parse(saved));
        }
      } catch (e) {
        // ignore
      }
    };

    syncFromStorage();

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === 'hotelsclub_platform_features' && e.newValue) {
        setFeatures(JSON.parse(e.newValue));
      }
    };

    const handleCustomSync = () => {
      syncFromStorage();
    };

    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('hotelsclub_platform_sync', handleCustomSync);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('hotelsclub_platform_sync', handleCustomSync);
    };
  }, []);

  const updateFeatures = (newFlags: Partial<PlatformFeatureFlags>) => {
    setFeatures((prev) => {
      const updated = {
        ...prev,
        ...newFlags,
        lastPublishedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      };
      try {
        localStorage.setItem('hotelsclub_platform_features', JSON.stringify(updated));
        window.dispatchEvent(new Event('hotelsclub_platform_sync'));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const publishLive = () => {
    try {
      localStorage.setItem('hotelsclub_platform_features', JSON.stringify(features));
      window.dispatchEvent(new Event('hotelsclub_platform_sync'));
    } catch (e) {
      // ignore
    }
    setIsPublished(true);
    alert('🎉 All platform settings and provider configurations have been published LIVE to the member frontend!');
  };

  return (
    <PlatformContext.Provider
      value={{
        features,
        updateFeatures,
        publishLive,
        isPublished,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}

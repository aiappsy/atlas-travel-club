import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { PlatformProvider } from '@/context/PlatformContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import AppLayout from '@/components/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://atlas-travel-club.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ATLAS | The Private Wholesale Travel & Sovereign Banking Club',
    template: '%s | ATLAS VIP Club',
  },
  description:
    'ATLAS is an exclusive, closed-loop private travel club offering 0% retail markups on 1,000,000+ luxury hotels, captained yachts, private jet empty legs, reloadable co-branded Visa cards, post-booking price drop refunds, and annual profit dividends.',
  keywords: [
    'wholesale hotels',
    'private travel club',
    'rate parity bypass',
    'luxury yacht charters',
    'empty leg private jets',
    'digital nomad visa concierge',
    'reloadable travel visa card',
    'airline status match',
    'airport fast track immigration',
    'travel insurance',
    'hotel cash back',
    'hotel price drop refund',
    'sovereign banking',
    'closed loop travel',
    'luxury villas',
  ],
  authors: [{ name: 'ATLAS Travel & Sovereign Banking Group' }],
  creator: 'ATLAS Travel Club',
  publisher: 'ATLAS Sovereign Travel & Banking Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ATLAS | The Private Wholesale Travel & Sovereign Banking Club',
    description:
      'Bypass retail OTA markups. Access 1,000,000+ luxury hotels, captained yachts, private jet empty legs, and reloadable Visa cards with 0% foreign exchange fees.',
    url: siteUrl,
    siteName: 'ATLAS Private Travel Club',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'ATLAS Private Wholesale Travel & Banking Club',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATLAS | The Private Wholesale Travel & Sovereign Banking Club',
    description:
      'Bypass retail OTA markups with 0% retail margin hotels, private jets, luxury yachts, and reloadable Visa cards.',
    creator: '@AtlasTravelClub',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'ATLAS Travel & Sovereign Banking Club',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        },
        description:
          'Private wholesale travel network and closed-loop sovereign banking platform with 0% retail markup pricing, co-branded reloadable Visa cards, and annual profit dividends.',
        sameAs: ['https://twitter.com/AtlasTravelClub', 'https://linkedin.com/company/atlas-travel-club'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'ATLAS Travel Club',
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/hotels?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'TravelAgency',
        '@id': `${siteUrl}/#agency`,
        name: 'ATLAS Private Travel Club',
        url: siteUrl,
        priceRange: '$$$$',
        currenciesAccepted: 'USD, EUR, GBP, CHF, AED, SGD, JPY, CAD, AUD, NOK',
        paymentAccepted: 'Credit Card, Reloadable Visa, Bank Wire, PayPal',
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-slate-50`}>
        <PlatformProvider>
          <CurrencyProvider>
            <AuthProvider>
              <SidebarProvider>
                <AppLayout>{children}</AppLayout>
              </SidebarProvider>
            </AuthProvider>
          </CurrencyProvider>
        </PlatformProvider>
      </body>
    </html>
  );
}

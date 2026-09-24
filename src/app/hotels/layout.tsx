import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale Luxury Hotels (0% Retail Markup)',
  description: 'Search and book over 1,000,000+ luxury five-star hotels and boutique resorts at wholesale closed-loop rates up to 70% below public OTAs.',
  keywords: ["wholesale hotels","luxury hotel booking","hotel discounts","0% markup hotels","hotel rate parity"],
  openGraph: {
    title: 'Wholesale Luxury Hotels (0% Retail Markup) | ATLAS VIP Club',
    description: 'Search and book over 1,000,000+ luxury five-star hotels and boutique resorts at wholesale closed-loop rates up to 70% below public OTAs.',
  },
  twitter: {
    title: 'Wholesale Luxury Hotels (0% Retail Markup) | ATLAS VIP Club',
    description: 'Search and book over 1,000,000+ luxury five-star hotels and boutique resorts at wholesale closed-loop rates up to 70% below public OTAs.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

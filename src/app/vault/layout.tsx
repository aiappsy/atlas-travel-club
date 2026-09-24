import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Vault Equity Points & Annual Profit Dividends',
  description: 'Accumulate Vault Equity Points with every booking and reloadable Visa transaction, receiving annual cash profit dividends credited directly to your account.',
  keywords: ["travel profit dividend","travel cashback vault","sovereign travel banking","annual travel dividend"],
  openGraph: {
    title: 'Travel Vault Equity Points & Annual Profit Dividends | ATLAS VIP Club',
    description: 'Accumulate Vault Equity Points with every booking and reloadable Visa transaction, receiving annual cash profit dividends credited directly to your account.',
  },
  twitter: {
    title: 'Travel Vault Equity Points & Annual Profit Dividends | ATLAS VIP Club',
    description: 'Accumulate Vault Equity Points with every booking and reloadable Visa transaction, receiving annual cash profit dividends credited directly to your account.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

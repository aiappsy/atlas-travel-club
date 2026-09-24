import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIP Membership Tiers & Co-Branded Reloadable Visa Cards',
  description: 'Join the private wholesale travel club. Enjoy 0% markup rates, physical holographic photo IDs, reloadable Visa debit cards, and annual profit share.',
  keywords: ["travel club membership","wholesale travel membership","reloadable travel visa","private travel club"],
  openGraph: {
    title: 'VIP Membership Tiers & Co-Branded Reloadable Visa Cards | ATLAS VIP Club',
    description: 'Join the private wholesale travel club. Enjoy 0% markup rates, physical holographic photo IDs, reloadable Visa debit cards, and annual profit share.',
  },
  twitter: {
    title: 'VIP Membership Tiers & Co-Branded Reloadable Visa Cards | ATLAS VIP Club',
    description: 'Join the private wholesale travel club. Enjoy 0% markup rates, physical holographic photo IDs, reloadable Visa debit cards, and annual profit share.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

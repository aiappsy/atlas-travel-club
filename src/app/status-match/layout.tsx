import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airline & Hotel Elite Loyalty Tier Status Match Concierge',
  description: 'Match your VIP tier to Hilton Honors Diamond, Marriott Bonvoy Titanium, and Star Alliance Gold for free suite upgrades, executive lounges, and free breakfast.',
  keywords: ["status match","hilton diamond match","marriott platinum match","airline status match","star alliance gold"],
  openGraph: {
    title: 'Airline & Hotel Elite Loyalty Tier Status Match Concierge | ATLAS VIP Club',
    description: 'Match your VIP tier to Hilton Honors Diamond, Marriott Bonvoy Titanium, and Star Alliance Gold for free suite upgrades, executive lounges, and free breakfast.',
  },
  twitter: {
    title: 'Airline & Hotel Elite Loyalty Tier Status Match Concierge | ATLAS VIP Club',
    description: 'Match your VIP tier to Hilton Honors Diamond, Marriott Bonvoy Titanium, and Star Alliance Gold for free suite upgrades, executive lounges, and free breakfast.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

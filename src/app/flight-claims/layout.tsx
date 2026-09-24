import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flight Delay & Cancellation Legal Compensation ($650 Cash)',
  description: 'Claim up to $650 per passenger for delayed, cancelled, or overbooked flights under EU261/UK261 rules on a 100% no-win no-fee basis.',
  keywords: ["flight delay claim","eu261 compensation","cancelled flight refund","flight compensation legal"],
  openGraph: {
    title: 'Flight Delay & Cancellation Legal Compensation ($650 Cash) | ATLAS VIP Club',
    description: 'Claim up to $650 per passenger for delayed, cancelled, or overbooked flights under EU261/UK261 rules on a 100% no-win no-fee basis.',
  },
  twitter: {
    title: 'Flight Delay & Cancellation Legal Compensation ($650 Cash) | ATLAS VIP Club',
    description: 'Claim up to $650 per passenger for delayed, cancelled, or overbooked flights under EU261/UK261 rules on a 100% no-win no-fee basis.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

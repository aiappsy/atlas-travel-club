import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Wholesale Rate Audit & Public Price Comparison Engine',
  description: 'View real-time verified price audits comparing ATLAS wholesale rates against Expedia, Booking.com, and Hotels.com with 100% transparency.',
  keywords: ["travel price comparison","wholesale hotel proof","rate audit","booking com vs wholesale","expedia comparison"],
  openGraph: {
    title: 'Live Wholesale Rate Audit & Public Price Comparison Engine | ATLAS VIP Club',
    description: 'View real-time verified price audits comparing ATLAS wholesale rates against Expedia, Booking.com, and Hotels.com with 100% transparency.',
  },
  twitter: {
    title: 'Live Wholesale Rate Audit & Public Price Comparison Engine | ATLAS VIP Club',
    description: 'View real-time verified price audits comparing ATLAS wholesale rates against Expedia, Booking.com, and Hotels.com with 100% transparency.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

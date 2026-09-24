import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global 5G Travel eSIM Hub (Instant QR Activation)',
  description: 'Connect across 140+ countries in seconds with high-speed 5G/4G LTE eSIM data packages at wholesale member rates with zero roaming fees.',
  keywords: ["travel esim","global 5g esim","international data esim","roaming free esim","instant qr esim"],
  openGraph: {
    title: 'Global 5G Travel eSIM Hub (Instant QR Activation) | ATLAS VIP Club',
    description: 'Connect across 140+ countries in seconds with high-speed 5G/4G LTE eSIM data packages at wholesale member rates with zero roaming fees.',
  },
  twitter: {
    title: 'Global 5G Travel eSIM Hub (Instant QR Activation) | ATLAS VIP Club',
    description: 'Connect across 140+ countries in seconds with high-speed 5G/4G LTE eSIM data packages at wholesale member rates with zero roaming fees.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

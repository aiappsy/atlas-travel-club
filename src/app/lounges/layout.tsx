import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIP Airport Lounge Passes & First-Class Club Access',
  description: 'Enjoy guaranteed entry to premium airport VIP lounges worldwide with buffet dining, craft bars, high-speed Wi-Fi, and private shower suites.',
  keywords: ["airport lounge pass","vip airport lounge","priority lounge access","first class airport club"],
  openGraph: {
    title: 'VIP Airport Lounge Passes & First-Class Club Access | ATLAS VIP Club',
    description: 'Enjoy guaranteed entry to premium airport VIP lounges worldwide with buffet dining, craft bars, high-speed Wi-Fi, and private shower suites.',
  },
  twitter: {
    title: 'VIP Airport Lounge Passes & First-Class Club Access | ATLAS VIP Club',
    description: 'Enjoy guaranteed entry to premium airport VIP lounges worldwide with buffet dining, craft bars, high-speed Wi-Fi, and private shower suites.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

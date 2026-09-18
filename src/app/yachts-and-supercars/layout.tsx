import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Captained Superyachts & Exotic Supercar Day Rentals',
  description: 'Charter luxury captained motor yachts with Seabobs & champagne in Miami, Monaco, and Dubai, or rent track-ready Ferraris & Lamborghinis delivered to your hotel.',
  keywords: ["luxury yacht charter","supercar rental","ferrari rental","lamborghini rental","monaco yacht charter","miami yacht"],
  openGraph: {
    title: 'Captained Superyachts & Exotic Supercar Day Rentals | ATLAS VIP Club',
    description: 'Charter luxury captained motor yachts with Seabobs & champagne in Miami, Monaco, and Dubai, or rent track-ready Ferraris & Lamborghinis delivered to your hotel.',
  },
  twitter: {
    title: 'Captained Superyachts & Exotic Supercar Day Rentals | ATLAS VIP Club',
    description: 'Charter luxury captained motor yachts with Seabobs & champagne in Miami, Monaco, and Dubai, or rent track-ready Ferraris & Lamborghinis delivered to your hotel.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

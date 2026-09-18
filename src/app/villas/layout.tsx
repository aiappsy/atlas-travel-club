import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultra-Luxury Private Villas & Chalets (Butler & Chef Included)',
  description: 'Book private luxury estates in St. Barts, Lake Como, Bali, Aspen, and Mykonos featuring private gourmet chefs, on-site butlers, and infinity pools.',
  keywords: ["luxury villa rentals","private estate rental","lake como villa","st barts estate","ski chalet aspen"],
  openGraph: {
    title: 'Ultra-Luxury Private Villas & Chalets (Butler & Chef Included) | ATLAS VIP Club',
    description: 'Book private luxury estates in St. Barts, Lake Como, Bali, Aspen, and Mykonos featuring private gourmet chefs, on-site butlers, and infinity pools.',
  },
  twitter: {
    title: 'Ultra-Luxury Private Villas & Chalets (Butler & Chef Included) | ATLAS VIP Club',
    description: 'Book private luxury estates in St. Barts, Lake Como, Bali, Aspen, and Mykonos featuring private gourmet chefs, on-site butlers, and infinity pools.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

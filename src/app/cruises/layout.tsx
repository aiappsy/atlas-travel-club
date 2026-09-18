import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wholesale Cruise Sailings & Free Onboard Credit Bonuses',
  description: 'Save up to 40% on Royal Caribbean, Celebrity, and NCL with exclusive member perks: $150 to $400 free onboard spending cash and drink packages.',
  keywords: ["wholesale cruises","cruise deals","free onboard credit","royal caribbean wholesale","celebrity cruises discount"],
  openGraph: {
    title: 'Wholesale Cruise Sailings & Free Onboard Credit Bonuses | ATLAS VIP Club',
    description: 'Save up to 40% on Royal Caribbean, Celebrity, and NCL with exclusive member perks: $150 to $400 free onboard spending cash and drink packages.',
  },
  twitter: {
    title: 'Wholesale Cruise Sailings & Free Onboard Credit Bonuses | ATLAS VIP Club',
    description: 'Save up to 40% on Royal Caribbean, Celebrity, and NCL with exclusive member perks: $150 to $400 free onboard spending cash and drink packages.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

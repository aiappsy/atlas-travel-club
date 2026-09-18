import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Jet Empty Legs & VIP Charters (Up to 80% Off)',
  description: 'Book empty-leg private jet flights on Bombardier Challenger, Gulfstream G650ER, and Citation X with direct tarmac FBO boarding.',
  keywords: ["private jet empty legs","empty leg flights","private jet charter","gulfstream charter","executive aviation"],
  openGraph: {
    title: 'Private Jet Empty Legs & VIP Charters (Up to 80% Off) | ATLAS VIP Club',
    description: 'Book empty-leg private jet flights on Bombardier Challenger, Gulfstream G650ER, and Citation X with direct tarmac FBO boarding.',
  },
  twitter: {
    title: 'Private Jet Empty Legs & VIP Charters (Up to 80% Off) | ATLAS VIP Club',
    description: 'Book empty-leg private jet flights on Bombardier Challenger, Gulfstream G650ER, and Citation X with direct tarmac FBO boarding.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

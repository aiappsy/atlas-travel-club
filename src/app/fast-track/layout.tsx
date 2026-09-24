import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airport VIP Fast-Track Immigration & Tarmac Meet-and-Greet',
  description: 'Bypass long airport queues with dedicated diplomatic escort, priority passport control, luggage porters, and electric buggy tarmac transfers.',
  keywords: ["airport fast track","vip airport escort","fast track immigration","airport buggy transfer"],
  openGraph: {
    title: 'Airport VIP Fast-Track Immigration & Tarmac Meet-and-Greet | ATLAS VIP Club',
    description: 'Bypass long airport queues with dedicated diplomatic escort, priority passport control, luggage porters, and electric buggy tarmac transfers.',
  },
  twitter: {
    title: 'Airport VIP Fast-Track Immigration & Tarmac Meet-and-Greet | ATLAS VIP Club',
    description: 'Bypass long airport queues with dedicated diplomatic escort, priority passport control, luggage porters, and electric buggy tarmac transfers.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Study: The Rate Parity Monopoly & Closed-Loop Wholesale Bypass',
  description: 'Detailed financial and legal breakdown of retail OTA duopoly pricing rules and how private closed-loop membership clubs deliver 30%–70% savings.',
  keywords: ["rate parity case study","ota duopoly","wholesale travel case study","travel fintech"],
  openGraph: {
    title: 'Case Study: The Rate Parity Monopoly & Closed-Loop Wholesale Bypass | ATLAS VIP Club',
    description: 'Detailed financial and legal breakdown of retail OTA duopoly pricing rules and how private closed-loop membership clubs deliver 30%–70% savings.',
  },
  twitter: {
    title: 'Case Study: The Rate Parity Monopoly & Closed-Loop Wholesale Bypass | ATLAS VIP Club',
    description: 'Detailed financial and legal breakdown of retail OTA duopoly pricing rules and how private closed-loop membership clubs deliver 30%–70% savings.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

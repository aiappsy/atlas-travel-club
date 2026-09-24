import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comprehensive Global Travel Medical & Nomad Evacuation Insurance',
  description: 'Protect your worldwide travels with instant embassy-compliant Schengen visa insurance, emergency medical evacuation, and lost luggage cover.',
  keywords: ["travel insurance","nomad medical insurance","schengen visa insurance","travel medical coverage"],
  openGraph: {
    title: 'Comprehensive Global Travel Medical & Nomad Evacuation Insurance | ATLAS VIP Club',
    description: 'Protect your worldwide travels with instant embassy-compliant Schengen visa insurance, emergency medical evacuation, and lost luggage cover.',
  },
  twitter: {
    title: 'Comprehensive Global Travel Medical & Nomad Evacuation Insurance | ATLAS VIP Club',
    description: 'Protect your worldwide travels with instant embassy-compliant Schengen visa insurance, emergency medical evacuation, and lost luggage cover.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

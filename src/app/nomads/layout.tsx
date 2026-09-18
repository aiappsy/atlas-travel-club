import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Digital Nomad Visas, Taxes & High-Speed Coliving',
  description: 'Explore 38+ international digital nomad visas with 0% tax programs, Schengen 90-day compliance tracking, and curated coliving spaces with 500+ Mbps fiber.',
  keywords: ["digital nomad visa","0% tax visa","spain nomad visa","portugal d8 visa","remote work coliving","schengen calculator"],
  openGraph: {
    title: 'Global Digital Nomad Visas, Taxes & High-Speed Coliving | ATLAS VIP Club',
    description: 'Explore 38+ international digital nomad visas with 0% tax programs, Schengen 90-day compliance tracking, and curated coliving spaces with 500+ Mbps fiber.',
  },
  twitter: {
    title: 'Global Digital Nomad Visas, Taxes & High-Speed Coliving | ATLAS VIP Club',
    description: 'Explore 38+ international digital nomad visas with 0% tax programs, Schengen 90-day compliance tracking, and curated coliving spaces with 500+ Mbps fiber.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

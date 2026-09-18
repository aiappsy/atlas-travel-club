import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | Closed-Loop Rate Parity & Wholesale Economics',
  description: 'Learn how ATLAS bypasses retail OTA markups using opaque B2B wholesale consolidators, private member closed-loop networks, and sovereign banking.',
  keywords: ["how rate parity works","closed loop travel","wholesale travel economics","why expedia is expensive"],
  openGraph: {
    title: 'How It Works | Closed-Loop Rate Parity & Wholesale Economics | ATLAS VIP Club',
    description: 'Learn how ATLAS bypasses retail OTA markups using opaque B2B wholesale consolidators, private member closed-loop networks, and sovereign banking.',
  },
  twitter: {
    title: 'How It Works | Closed-Loop Rate Parity & Wholesale Economics | ATLAS VIP Club',
    description: 'Learn how ATLAS bypasses retail OTA markups using opaque B2B wholesale consolidators, private member closed-loop networks, and sovereign banking.',
  },
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

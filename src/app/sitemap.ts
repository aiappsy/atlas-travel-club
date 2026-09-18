import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://atlas-travel-club.com';
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/hotels', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/nomads', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/private-jets', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/yachts-and-supercars', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/villas', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/cruises', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/lounges', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/fast-track', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/esim', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/flight-claims', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/insurance', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/status-match', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/membership', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/membership/visa-card', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/membership/price-drops', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/membership/card-order', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/proof', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/how-it-works', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/case-study', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/rate-checker', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/perks', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/vault', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/legal/banking-disclosures', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/legal/rate-parity-compliance', priority: 0.5, changeFrequency: 'yearly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

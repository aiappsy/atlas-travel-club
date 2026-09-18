import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ATLAS | The Private Wholesale Travel & Banking Club',
    short_name: 'ATLAS VIP',
    description: 'Closed-loop wholesale travel, sovereign banking, 0% retail markup hotels, private jets, captained yachts, and reloadable Visa cards.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

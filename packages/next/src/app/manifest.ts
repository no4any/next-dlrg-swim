import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '24 App',
    short_name: 'DLRG Gießen',
    description: 'Admin App für das 24 Stunden Schwimmer 2026',
    start_url: '/admin',
    display: 'standalone',
    background_color: '#ffed00',
    theme_color: '#e30613',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
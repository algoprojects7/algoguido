import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Algoguido Technologies Private Limited',
    short_name: 'Algoguido',
    description: 'Algoguido Technologies is an enterprise-grade AI-first technology company.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0052cc',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}

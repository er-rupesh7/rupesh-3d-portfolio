import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rupesh Kumar | 3D Software Developer & Engineer Portfolio',
    short_name: 'Rupesh Kumar',
    description: '3D Portfolio & Showcase of Rupesh Kumar — Software Developer, Full-Stack Engineer, B.Tech CSE (CDLSIET Sirsa, Haryana), @3rupeshkr / er-rupesh7.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b12',
    theme_color: '#00f0ff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

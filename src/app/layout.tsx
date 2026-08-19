import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import CustomCursor from '@/components/ui/CustomCursor';
import Toast from '@/components/ui/Toast';
import AdminPanelModal from '@/components/admin/AdminPanelModal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rupesh-portfolio.vercel.app';

export const viewport: Viewport = {
  themeColor: '#00f0ff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rupesh Kumar | Software Developer & Engineer | @3rupeshkr | er-rupesh7',
    template: '%s | Rupesh Kumar — Software Developer & Engineer',
  },
  description:
    'Official 3D Portfolio of Rupesh Kumar — Software Developer, Full-Stack Engineer, and Computer Science Graduate from CDLSIET Panniwala Mota, Sirsa (Haryana). Explore interactive 3D WebGL projects, distributed systems, full-stack architectures, and software engineering innovations. Connect on Instagram @3rupeshkr & GitHub @er-rupesh7.',
  keywords: [
    'Rupesh Kumar',
    '3rupeshkr',
    'er-rupesh7',
    'Software Developer',
    'Full Stack Engineer',
    'Computer Science Engineer',
    'CDLSIET Sirsa',
    'Ch. Devi Lal State Institute of Engineering and Technology',
    'Maharaja Agarsain Sr Sec School Sirsa',
    'Shah Satnam Ji Boys School Sirsa',
    'Sirsa Haryana Developer',
    'Next.js 3D Portfolio',
    'Three.js WebGL Developer',
    'React Developer India',
    'Software Engineer Portfolio',
    'Distributed Systems',
    'Web Architecture',
  ],
  authors: [{ name: 'Rupesh Kumar', url: 'https://github.com/er-rupesh7' }],
  creator: 'Rupesh Kumar',
  publisher: 'Rupesh Kumar',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    firstName: 'Rupesh',
    lastName: 'Kumar',
    username: 'er-rupesh7',
    gender: 'male',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Rupesh Kumar | Software Developer & Engineer | 3D Portfolio',
    description:
      'Immersive 3D Portfolio of Rupesh Kumar — Software Developer & Full-Stack Engineer. B.Tech Computer Science from CDLSIET Sirsa, Haryana. Instagram @3rupeshkr | GitHub @er-rupesh7.',
    siteName: 'Rupesh Kumar Portfolio',
    images: [
      {
        url: '/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Rupesh Kumar — Software Developer & Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rupesh Kumar | Software Developer & Engineer (@3rupeshkr)',
    description:
      '3D interactive developer portfolio of Rupesh Kumar. B.Tech Computer Science graduate from CDLSIET Sirsa. Instagram: @3rupeshkr | GitHub: @er-rupesh7.',
    creator: '@3rupeshkr',
    images: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD Structured Data
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rupesh Kumar',
    alternateName: ['3rupeshkr', 'er-rupesh7', 'Rupesh Kumar Sirsa'],
    jobTitle: 'Software Developer and Engineer',
    email: 'mailto:er.rupesh7@gmail.com',
    telephone: '+919466327537',
    description:
      'Software Developer and Full-Stack Engineer with a B.Tech in Computer Science from Ch. Devi Lal State Institute of Engineering and Technology (CDLSIET), Panniwala Mota, Sirsa, Haryana.',
    url: SITE_URL,
    image: `${SITE_URL}/icon.svg`,
    sameAs: [
      'https://instagram.com/3rupeshkr',
      'https://github.com/er-rupesh7',
      'https://twitter.com/3rupeshkr',
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Ch. Devi Lal State Institute of Engineering and Technology (CDLSIET)',
        location: {
          '@type': 'PostalAddress',
          addressLocality: 'Panniwala Mota, Sirsa',
          addressRegion: 'Haryana',
          addressCountry: 'India',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Maharaja Agarsain Sr. Sec School',
        location: {
          '@type': 'PostalAddress',
          addressLocality: 'Sirsa',
          addressRegion: 'Haryana',
          addressCountry: 'India',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: "Shah Satnam Ji Boys' School",
        location: {
          '@type': 'PostalAddress',
          addressLocality: 'Sirsa',
          addressRegion: 'Haryana',
          addressCountry: 'India',
        },
      },
    ],
    knowsAbout: [
      'Software Engineering',
      'Full-Stack Web Development',
      'Computer Science',
      'Next.js',
      'React.js',
      'Three.js',
      'WebGL',
      'TypeScript',
      'JavaScript',
      'Python',
      'Node.js',
      'PostgreSQL',
      'Distributed Systems',
      'Cloud Architecture',
    ],
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rupesh Kumar 3D Portfolio',
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'Rupesh Kumar',
    },
    inLanguage: 'en-US',
  };

  return (
    <html lang="en" data-theme="cyan">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body>
        <PortfolioProvider>
          <CustomCursor />
          <Toast />
          <AdminPanelModal />
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}

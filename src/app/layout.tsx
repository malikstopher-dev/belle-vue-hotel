import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Luxury Hotel in Kinshasa, DR Congo`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en': '/en',
      'fr': '/fr',
      'pt': '/pt',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0A" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.contact.phone,
              email: siteConfig.contact.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '16 Avenue Tombalbaye',
                addressLocality: 'Kinshasa',
                addressRegion: 'Gombe',
                postalCode: '',
                addressCountry: 'CD',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -4.3216,
                longitude: 15.3122,
              },
              starRating: {
                '@type': 'Rating',
                ratingValue: 5,
              },
              priceRange: '$$$',
              image: siteConfig.ogImage,
              sameAs: [
                siteConfig.social.facebook,
                siteConfig.social.instagram,
                siteConfig.social.tiktok,
              ],
            }),
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Le Jardin',
              description: 'French-African fusion restaurant at Belle Vie Hotel',
              url: siteConfig.url + '#restaurant',
              telephone: siteConfig.contact.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '16 Avenue Tombalbaye',
                addressLocality: 'Kinshasa',
                addressRegion: 'Gombe',
                addressCountry: 'CD',
              },
              priceRange: '$$$',
              servesCuisine: ['French', 'African', 'Fusion'],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What are the check-in and check-out times?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Check-in is at 3:00 PM and check-out is at 11:00 AM.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is WiFi complimentary?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, high-speed WiFi is complimentary throughout the hotel.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do you offer airport transfers?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, we offer complimentary airport transfers for suite guests.',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-luxury-black text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
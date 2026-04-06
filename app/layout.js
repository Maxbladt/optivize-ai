import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://optivaize.nl'),
  title: {
    default: 'Optivaize | AI-bureau De Bilt, Automatisering, Marketing en Software',
    template: '%s',
  },
  description: 'Optivaize is een AI-bureau in De Bilt. Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.',
  openGraph: {
    siteName: 'Optivaize',
    locale: 'nl_NL',
    type: 'website',
    images: ['/images/optivaize_logo_new.webp'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/optivaize_logo_square.webp',
    apple: '/images/optivaize_logo_square.webp',
  },
  manifest: '/manifest.json',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://optivaize.nl/#organization',
      name: 'Optivaize',
      url: 'https://optivaize.nl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://optivaize.nl/images/optivaize_logo_new.webp',
        width: 1280,
        height: 427,
      },
      image: 'https://optivaize.nl/images/optivaize_logo_new.webp',
      description: 'AI-bureau gespecialiseerd in AI-agents, automatisering, marketing en custom software voor bedrijven in Nederland.',
      telephone: '+31642698918',
      email: 'info@optivaize.nl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Groenekanseweg 70',
        addressLocality: 'De Bilt',
        addressRegion: 'Utrecht',
        postalCode: '3732 AG',
        addressCountry: 'NL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 52.11670, longitude: 5.18330 },
      areaServed: {
        '@type': 'Country',
        name: 'Netherlands',
      },
      foundingDate: '2023',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 5 },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      sameAs: [
        'https://www.linkedin.com/company/optivaize',
        'https://www.instagram.com/optivaize',
        'https://x.com/optivaize',
        'https://www.youtube.com/@Optivaize',
      ],
      priceRange: '$$',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+31642698918',
        contactType: 'customer service',
        email: 'info@optivaize.nl',
        availableLanguage: ['Dutch', 'English'],
        areaServed: 'NL',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Diensten',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Software & Platforms', url: 'https://optivaize.nl/software-platforms' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agents & Chatbots', url: 'https://optivaize.nl/ai-agents-chatbots' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Marketing', url: 'https://optivaize.nl/ai-marketing' } },
        ],
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.tagline', '.description'],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '12',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Fonteyn' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Optivaize heeft een compleet AI-dashboard voor ons gebouwd dat onze verkoopdata real-time inzichtelijk maakt.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Aanhuis Makelaars' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Dankzij de automatiseringsoplossingen van Optivaize besparen we meer dan 20 uur per week op handmatig werk.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Blosh' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody: 'Het team van Optivaize denkt mee op strategisch niveau en levert technisch hoogwaardige AI-oplossingen.',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://optivaize.nl/#website',
      name: 'Optivaize',
      url: 'https://optivaize.nl',
      publisher: { '@id': 'https://optivaize.nl/#organization' },
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Hoofdnavigatie',
      hasPart: [
        { '@type': 'WebPage', name: 'Software & Platforms', url: 'https://optivaize.nl/software-platforms' },
        { '@type': 'WebPage', name: 'AI Agents & Chatbots', url: 'https://optivaize.nl/ai-agents-chatbots' },
        { '@type': 'WebPage', name: 'AI Marketing', url: 'https://optivaize.nl/ai-marketing' },
        { '@type': 'WebPage', name: 'Cases', url: 'https://optivaize.nl/cases' },
        { '@type': 'WebPage', name: 'Blog', url: 'https://optivaize.nl/blog' },
        { '@type': 'WebPage', name: 'Over Ons', url: 'https://optivaize.nl/over-ons' },
        { '@type': 'WebPage', name: 'Contact', url: 'https://optivaize.nl/contact' },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

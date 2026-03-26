import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import { LanguageProvider } from '@/LanguageContext';

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
    images: ['/uploads/optivaize_logo_new.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/uploads/optivaize_logo_square.png',
    apple: '/uploads/optivaize_logo_square.png',
  },
  manifest: '/manifest.json',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://optivaize.nl/#organization',
      name: 'Optivaize',
      url: 'https://optivaize.nl',
      logo: 'https://optivaize.nl/uploads/optivaize_logo_new.png',
      image: 'https://optivaize.nl/uploads/optivaize_logo_new.png',
      description: 'AI-bureau gespecialiseerd in AI-agents, automatisering, marketing en custom software voor bedrijven in Nederland.',
      telephone: '+31642698918',
      email: 'info@optivaize.nl',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Groenekanseweg 70',
        addressLocality: 'De Bilt',
        postalCode: '3732 AG',
        addressCountry: 'NL',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 52.1167, longitude: 5.1833 },
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
      ],
      priceRange: '$$',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://optivaize.nl/#website',
      name: 'Optivaize',
      url: 'https://optivaize.nl',
      publisher: { '@id': 'https://optivaize.nl/#organization' },
      inLanguage: 'nl-NL',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://optivaize.nl/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Hoofdnavigatie',
      hasPart: [
        { '@type': 'WebPage', name: 'AI Agents', url: 'https://optivaize.nl/ai-agenten' },
        { '@type': 'WebPage', name: 'AI Marketing', url: 'https://optivaize.nl/ai-marketing' },
        { '@type': 'WebPage', name: 'AI Sales', url: 'https://optivaize.nl/ai-sales' },
        { '@type': 'WebPage', name: 'Automatisering', url: 'https://optivaize.nl/automatisering' },
        { '@type': 'WebPage', name: 'Custom Software', url: 'https://optivaize.nl/custom-software' },
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
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

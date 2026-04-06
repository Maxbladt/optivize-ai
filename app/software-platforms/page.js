import SoftwarePage from '@/pages/SoftwarePage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Software & Platforms | Optivaize, AI-bureau De Bilt',
  description: 'Custom software, platforms en automatisering met AI. Optivaize bouwt dashboards, tools en geautomatiseerde workflows voor bedrijven in Nederland.',
  alternates: { canonical: 'https://optivaize.nl/software-platforms' },
  openGraph: {
    title: 'Software & Platforms | Optivaize',
    description: 'Custom software, platforms en AI-automatisering.',
    url: 'https://optivaize.nl/software-platforms',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Software & Platforms', item: 'https://optivaize.nl/software-platforms' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Software & Platforms',
  description: 'Custom software ontwikkeling, platforms en bedrijfsautomatisering met AI-integratie.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/software-platforms',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Waarom maatwerk software in plaats van standaard oplossingen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Maatwerk software is exact afgestemd op uw bedrijfsprocessen en groeit mee met uw organisatie. Standaard software vereist vaak aanpassingen in uw werkwijze, terwijl maatwerk zich aanpast aan u.' },
    },
    {
      '@type': 'Question',
      name: 'Welke processen kunnen geautomatiseerd worden?',
      acceptedAnswer: { '@type': 'Answer', text: 'Vrijwel elk repetitief proces kan worden geautomatiseerd: facturatie, e-mailafhandeling, data-invoer, rapportage, voorraadbeheer, klantenservice en meer. Wij analyseren uw workflows en identificeren de grootste besparingsmogelijkheden.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt het bouwen van custom software?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een MVP kan binnen 4 tot 8 weken worden opgeleverd. Volledige platforms met uitgebreide functionaliteit duren gemiddeld 3 tot 6 maanden, afhankelijk van de complexiteit.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SoftwarePage />
    </Layout>
  );
}

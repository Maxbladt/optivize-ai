import SoftwarePage from '@/pages/SoftwarePage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Custom Software Ontwikkeling | Optivaize, AI-bureau De Bilt',
  description: 'Maatwerk software ontwikkeling met AI-integratie. Optivaize bouwt dashboards, platforms en tools op maat voor bedrijven vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/custom-software' },
  openGraph: {
    title: 'Custom Software Ontwikkeling | Optivaize',
    description: 'Maatwerk software met AI-integratie.',
    url: 'https://optivaize.nl/custom-software',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Custom Software', item: 'https://optivaize.nl/custom-software' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Software Ontwikkeling',
  description: 'Maatwerk software ontwikkeling met AI-integratie. Dashboards, platforms en tools op maat.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/custom-software',
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
      name: 'Welke technologieën gebruikt Optivaize voor software ontwikkeling?',
      acceptedAnswer: { '@type': 'Answer', text: 'Wij werken met moderne technologieën zoals React, Next.js, Node.js, Python en PostgreSQL. Voor AI-integratie gebruiken wij frameworks van OpenAI, Anthropic en open-source modellen.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt custom software ontwikkeling?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een MVP (Minimum Viable Product) kan binnen 4 tot 8 weken worden opgeleverd. Volledige platforms met uitgebreide functionaliteit duren gemiddeld 3 tot 6 maanden, afhankelijk van de complexiteit.' },
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

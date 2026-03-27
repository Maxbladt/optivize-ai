import SalesPage from '@/pages/SalesPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Sales Automatisering | Optivaize, AI-bureau De Bilt',
  description: 'Verhoog uw omzet met AI-gestuurde sales automatisering. LinkedIn bots, lead generation en CRM integraties door Optivaize in De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-sales' },
  openGraph: {
    title: 'AI Sales Automatisering | Optivaize',
    description: 'AI-gestuurde sales automatisering voor meer omzet.',
    url: 'https://optivaize.nl/ai-sales',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Sales', item: 'https://optivaize.nl/ai-sales' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Sales Automatisering',
  description: 'AI-gestuurde sales automatisering met LinkedIn bots, lead generation en CRM integraties.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-sales',
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <SalesPage />
    </Layout>
  );
}

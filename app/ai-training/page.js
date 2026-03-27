import TrainingPage from '@/pages/TrainingPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Training & Presentaties | Optivaize, AI-bureau De Bilt',
  description: 'AI training en presentaties voor uw team. Optivaize leert uw organisatie AI effectief inzetten met workshops en sessies op maat vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-training' },
  openGraph: {
    title: 'AI Training & Presentaties | Optivaize',
    description: 'AI training en workshops voor uw team.',
    url: 'https://optivaize.nl/ai-training',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Training', item: 'https://optivaize.nl/ai-training' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Training & Presentaties',
  description: 'AI training, workshops en presentaties op maat voor uw team en organisatie.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-training',
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <TrainingPage />
    </Layout>
  );
}

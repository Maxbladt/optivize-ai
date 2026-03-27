import AIBusinessPage from '@/pages/AIBusinessPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI voor Bedrijven | Optivaize, AI-bureau De Bilt',
  description: 'Ontdek hoe AI uw bedrijf kan transformeren. Optivaize adviseert en implementeert AI-oplossingen voor organisaties in heel Nederland.',
  alternates: { canonical: 'https://optivaize.nl/ai-business' },
  openGraph: {
    title: 'AI voor Bedrijven | Optivaize',
    description: 'AI-transformatie voor uw organisatie.',
    url: 'https://optivaize.nl/ai-business',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Business', item: 'https://optivaize.nl/ai-business' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI voor Bedrijven',
  description: 'AI-advies en implementatie voor organisaties. Van strategie tot uitvoering.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-business',
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <AIBusinessPage />
    </Layout>
  );
}

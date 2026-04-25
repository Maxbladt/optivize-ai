import AIAssistantPage from '@/pages/AIAssistantPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Voice Assistent - Live demo, vanaf €100/maand | Optivaize',
  description: 'Nederlandstalige AI spraakassistent voor tandartsen, webshops, restaurants en makelaars. 24/7 bereikbaar, koppelt aan jouw systemen, live binnen 1-3 dagen. Probeer de live demo.',
  alternates: { canonical: 'https://optivaize.nl/ai-assistent' },
  openGraph: {
    title: 'AI Voice Assistent met live demo | Optivaize',
    description: 'Praat nu met een Nederlandstalige AI assistent voor jouw branche. 24/7 bereikbaar, vanaf €100/maand.',
    url: 'https://optivaize.nl/ai-assistent',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
      { '@type': 'ListItem', position: 2, name: 'Producten', item: 'https://optivaize.nl/producten' },
      { '@type': 'ListItem', position: 3, name: 'AI Assistent', item: 'https://optivaize.nl/ai-assistent' },
    ],
  };
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Optivaize AI Voice Assistent',
    description: 'Nederlandstalige AI spraakassistent voor klantenservice, afspraken en bestellingen. Gekoppeld aan bestaande bedrijfssoftware.',
    brand: { '@type': 'Brand', name: 'Optivaize' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '100',
      availability: 'https://schema.org/InStock',
      url: 'https://optivaize.nl/ai-assistent',
    },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <AIAssistantPage />
    </Layout>
  );
}

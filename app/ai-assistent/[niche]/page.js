import { notFound } from 'next/navigation';
import NicheAssistantPage from '@/pages/NicheAssistantPage';
import Layout from '@/components/Layout';
import { NICHES, NICHE_KEYS } from '@/components/voice/niche-content';

export function generateStaticParams() {
  return NICHE_KEYS.map((niche) => ({ niche }));
}

export function generateMetadata({ params }) {
  const niche = NICHES[params.niche];
  if (!niche) return {};
  return {
    title: niche.seo.title,
    description: niche.seo.description,
    keywords: niche.seo.keywords,
    alternates: { canonical: `https://optivaize.nl/ai-assistent/${params.niche}` },
    openGraph: {
      title: niche.seo.title,
      description: niche.seo.description,
      url: `https://optivaize.nl/ai-assistent/${params.niche}`,
      images: [niche.hero.image, '/images/optivaize_logo_new.webp'],
    },
  };
}

export default function Page({ params }) {
  const niche = NICHES[params.niche];
  if (!niche) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
      { '@type': 'ListItem', position: 2, name: 'Producten', item: 'https://optivaize.nl/producten' },
      { '@type': 'ListItem', position: 3, name: niche.short, item: `https://optivaize.nl/ai-assistent/${params.niche}` },
    ],
  };
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Optivaize AI Voice Assistent - ${niche.short}`,
    description: niche.seo.description,
    brand: { '@type': 'Brand', name: 'Optivaize' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '100',
      availability: 'https://schema.org/InStock',
      url: `https://optivaize.nl/ai-assistent/${params.niche}`,
    },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <NicheAssistantPage nicheKey={params.niche} />
    </Layout>
  );
}

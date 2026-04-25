import ProductenPage from '@/pages/ProductenPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Producten - Onze AI oplossingen | Optivaize',
  description: 'Bekijk onze kant-en-klare AI-producten voor Nederlandse bedrijven: voice assistenten, chatbots en automatiseringen. Live binnen dagen, gekoppeld aan jouw systemen.',
  alternates: { canonical: 'https://optivaize.nl/producten' },
  openGraph: {
    title: 'Producten | Optivaize',
    description: 'Onze kant-en-klare AI-producten voor jouw bedrijf.',
    url: 'https://optivaize.nl/producten',
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
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductenPage />
    </Layout>
  );
}

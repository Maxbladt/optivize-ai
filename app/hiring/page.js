import HiringPage from '@/pages/HiringPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Vacatures | Optivaize, AI-bureau De Bilt',
  description: 'Werk bij Optivaize. Bekijk onze openstaande vacatures en sluit je aan bij ons AI-team in De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/hiring' },
  openGraph: {
    title: 'Vacatures | Optivaize',
    description: 'Werk bij Optivaize, AI-bureau in De Bilt.',
    url: 'https://optivaize.nl/hiring',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Vacatures', item: 'https://optivaize.nl/hiring' },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HiringPage />
    </Layout>
  );
}

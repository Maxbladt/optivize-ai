import TeamPage from '@/pages/TeamPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Over Ons | Optivaize, AI-bureau De Bilt',
  description: 'Maak kennis met het Optivaize team. Wij zijn een AI-bureau in De Bilt dat bedrijven helpt met AI-agents, automatisering en custom software.',
  alternates: { canonical: 'https://optivaize.nl/over-ons' },
  openGraph: {
    title: 'Over Ons | Optivaize',
    description: 'Maak kennis met het Optivaize team.',
    url: 'https://optivaize.nl/over-ons',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Over Ons', item: 'https://optivaize.nl/over-ons' },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <TeamPage />
    </Layout>
  );
}

import SubsidyPage from '@/pages/SubsidyPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Crypto & Blockchain Oplossingen | Optivaize, AI-bureau De Bilt',
  description: 'Crypto en blockchain oplossingen voor bedrijven. Optivaize ontwikkelt Web3 toepassingen en smart contracts vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/crypto-blockchain' },
  openGraph: {
    title: 'Crypto & Blockchain | Optivaize',
    description: 'Web3 en blockchain oplossingen voor bedrijven.',
    url: 'https://optivaize.nl/crypto-blockchain',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Crypto & Blockchain', item: 'https://optivaize.nl/crypto-blockchain' },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <SubsidyPage />
    </Layout>
  );
}

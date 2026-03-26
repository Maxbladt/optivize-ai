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
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><SubsidyPage /></Layout>;
}

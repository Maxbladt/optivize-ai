import HomePage from '@/pages/HomePage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Optivaize | AI-bureau De Bilt, Automatisering, Marketing en Software',
  description: 'Optivaize is een AI-bureau in De Bilt. Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.',
  alternates: { canonical: 'https://optivaize.nl' },
  openGraph: {
    title: 'Optivaize | AI-bureau De Bilt',
    description: 'Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.',
    url: 'https://optivaize.nl',
    type: 'website',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><HomePage /></Layout>;
}

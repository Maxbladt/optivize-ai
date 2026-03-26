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
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><TeamPage /></Layout>;
}

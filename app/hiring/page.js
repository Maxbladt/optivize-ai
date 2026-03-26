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
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><HiringPage /></Layout>;
}

import CasesPage from '@/pages/CasesPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Cases & Succesverhalen | Optivaize, AI-bureau De Bilt',
  description: 'Bekijk onze AI cases en succesverhalen. Ontdek hoe Optivaize bedrijven heeft geholpen met AI automatisering, marketing en software vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/cases' },
  openGraph: {
    title: 'Cases & Succesverhalen | Optivaize',
    description: 'Ontdek hoe wij bedrijven helpen met AI.',
    url: 'https://optivaize.nl/cases',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><CasesPage /></Layout>;
}

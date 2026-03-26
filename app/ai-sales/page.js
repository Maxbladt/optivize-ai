import SalesPage from '@/pages/SalesPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Sales Automatisering | Optivaize, AI-bureau De Bilt',
  description: 'Verhoog uw omzet met AI-gestuurde sales automatisering. LinkedIn bots, lead generation en CRM integraties door Optivaize in De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-sales' },
  openGraph: {
    title: 'AI Sales Automatisering | Optivaize',
    description: 'AI-gestuurde sales automatisering voor meer omzet.',
    url: 'https://optivaize.nl/ai-sales',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><SalesPage /></Layout>;
}

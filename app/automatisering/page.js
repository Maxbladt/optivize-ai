import AutomationPage from '@/pages/AutomationPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Bedrijfsautomatisering met AI | Optivaize, AI-bureau De Bilt',
  description: 'Automatiseer terugkerende taken en processen met AI. Optivaize helpt bedrijven in Nederland met slimme automatiseringsoplossingen vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/automatisering' },
  openGraph: {
    title: 'Bedrijfsautomatisering met AI | Optivaize',
    description: 'Slimme AI-automatisering voor uw bedrijfsprocessen.',
    url: 'https://optivaize.nl/automatisering',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><AutomationPage /></Layout>;
}

import TrainingPage from '@/pages/TrainingPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Training & Presentaties | Optivaize, AI-bureau De Bilt',
  description: 'AI training en presentaties voor uw team. Optivaize leert uw organisatie AI effectief inzetten met workshops en sessies op maat vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-training' },
  openGraph: {
    title: 'AI Training & Presentaties | Optivaize',
    description: 'AI training en workshops voor uw team.',
    url: 'https://optivaize.nl/ai-training',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><TrainingPage /></Layout>;
}

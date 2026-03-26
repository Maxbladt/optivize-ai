import AIBusinessPage from '@/pages/AIBusinessPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI voor Bedrijven | Optivaize, AI-bureau De Bilt',
  description: 'Ontdek hoe AI uw bedrijf kan transformeren. Optivaize adviseert en implementeert AI-oplossingen voor organisaties in heel Nederland.',
  alternates: { canonical: 'https://optivaize.nl/ai-business' },
  openGraph: {
    title: 'AI voor Bedrijven | Optivaize',
    description: 'AI-transformatie voor uw organisatie.',
    url: 'https://optivaize.nl/ai-business',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><AIBusinessPage /></Layout>;
}

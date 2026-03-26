import MarketingPage from '@/pages/MarketingPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Marketing Automatisering | Optivaize, AI-bureau De Bilt',
  description: 'Automatiseer uw marketing met AI. Optivaize bouwt AI-gestuurde SEO blogs, productteksten en content strategieen voor bedrijven vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-marketing' },
  openGraph: {
    title: 'AI Marketing Automatisering | Optivaize',
    description: 'AI-gestuurde marketing automatisering voor uw bedrijf.',
    url: 'https://optivaize.nl/ai-marketing',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><MarketingPage /></Layout>;
}

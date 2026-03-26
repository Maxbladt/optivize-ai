import SoftwarePage from '@/pages/SoftwarePage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Custom Software Ontwikkeling | Optivaize, AI-bureau De Bilt',
  description: 'Maatwerk software ontwikkeling met AI-integratie. Optivaize bouwt dashboards, platforms en tools op maat voor bedrijven vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/custom-software' },
  openGraph: {
    title: 'Custom Software Ontwikkeling | Optivaize',
    description: 'Maatwerk software met AI-integratie.',
    url: 'https://optivaize.nl/custom-software',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><SoftwarePage /></Layout>;
}

import ContactPage from '@/pages/ContactPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Contact | Optivaize, AI-bureau De Bilt',
  description: 'Neem contact op met Optivaize. Bel +31 6 42698918 of vul het formulier in. AI-bureau gevestigd aan Groenekanseweg 70, De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/contact' },
  openGraph: {
    title: 'Contact | Optivaize',
    description: 'Neem contact op met Optivaize, AI-bureau in De Bilt.',
    url: 'https://optivaize.nl/contact',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><ContactPage /></Layout>;
}

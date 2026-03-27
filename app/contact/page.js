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
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://optivaize.nl/contact' },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ContactPage />
    </Layout>
  );
}

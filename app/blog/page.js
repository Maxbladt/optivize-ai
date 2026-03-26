import BlogListPage from '@/pages/BlogListPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Blog over AI & Automatisering | Optivaize, AI-bureau De Bilt',
  description: 'Lees onze blog over AI, automatisering en digitale transformatie. Tips, inzichten en trends van Optivaize, AI-bureau in De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/blog' },
  openGraph: {
    title: 'Blog | Optivaize',
    description: 'AI tips, inzichten en trends.',
    url: 'https://optivaize.nl/blog',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><BlogListPage /></Layout>;
}

export const dynamic = 'force-dynamic';
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
    images: ['/images/optivaize_logo_new.webp'],
  },
};

export default async function Page() {
  let blogs = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
    if (res.ok) blogs = await res.json();
  } catch {}

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://optivaize.nl/blog' },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogListPage blogs={blogs} />
    </Layout>
  );
}

export const dynamic = 'force-dynamic';
import CasesPage from '@/pages/CasesPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Cases & Succesverhalen | Optivaize, AI-bureau De Bilt',
  description: 'Bekijk onze AI cases en succesverhalen. Ontdek hoe Optivaize bedrijven heeft geholpen met AI automatisering, marketing en software vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/cases' },
  openGraph: {
    title: 'Cases & Succesverhalen | Optivaize',
    description: 'Ontdek hoe wij bedrijven helpen met AI.',
    url: 'https://optivaize.nl/cases',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

export default async function Page() {
  let cases = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases`, { cache: 'no-store' });
    if (res.ok) cases = await res.json();
  } catch {}

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
      { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://optivaize.nl/cases' },
    ],
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CasesPage initialCases={cases} />
    </Layout>
  );
}

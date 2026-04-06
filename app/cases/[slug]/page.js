export const revalidate = 3600;
import CaseDetailPage from '@/pages/CaseDetailPage';
import Layout from '@/components/Layout';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { title: 'Case niet gevonden | Optivaize' };
    const caseData = await res.json();
    return {
      title: `${caseData.title_nl || caseData.company} | Optivaize Case`,
      description: caseData.preview_nl || `Lees hoe Optivaize ${caseData.company} heeft geholpen met AI.`,
      alternates: { canonical: `https://optivaize.nl/cases/${slug}` },
      openGraph: {
        title: `${caseData.title_nl || caseData.company} | Optivaize`,
        description: caseData.preview_nl,
        url: `https://optivaize.nl/cases/${slug}`,
        images: caseData.image ? [caseData.image] : ['/images/optivaize_logo_new.webp'],
      },
    };
  } catch {
    return { title: 'Case | Optivaize' };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return notFound();
    const caseData = await res.json();

    const canonicalUrl = `https://optivaize.nl/cases/${caseData.slug}`;

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
        { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://optivaize.nl/cases' },
        { '@type': 'ListItem', position: 3, name: caseData.title_nl || caseData.company, item: canonicalUrl },
      ],
    };

    return (
      <Layout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <CaseDetailPage caseData={caseData} />
      </Layout>
    );
  } catch {
    return notFound();
  }
}

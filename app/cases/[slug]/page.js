export const dynamic = 'force-dynamic';
import CaseDetailPage from '@/pages/CaseDetailPage';
import Layout from '@/components/Layout';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases/${slug}`, { cache: 'no-store' });
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
        images: caseData.image ? [caseData.image] : ['/uploads/optivaize_logo_new.png'],
      },
    };
  } catch {
    return { title: 'Case | Optivaize' };
  }
}

export default function Page() {
  return <Layout><CaseDetailPage /></Layout>;
}

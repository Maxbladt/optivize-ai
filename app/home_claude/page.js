export const dynamic = 'force-dynamic';
import HomePage_claude from '@/pages/HomePage_claude';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Optivaize Editorial | AI bureau De Bilt',
  description: 'Editorial variant van de Optivaize home page - warm, rustig, leesbaar. AI-agents, dashboards en marketing-automatisering voor Nederlandse bedrijven.',
  alternates: { canonical: 'https://optivaize.nl/home_claude' },
};

export default async function Page() {
  let cases = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases`, { cache: 'no-store' });
    if (res.ok) cases = await res.json();
  } catch {}
  return <Layout><HomePage_claude initialCases={cases} /></Layout>;
}

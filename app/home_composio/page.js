export const dynamic = 'force-dynamic';
import HomePage_composio from '@/pages/HomePage_composio';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Optivaize | Developer-grade AI bureau',
  description: 'Developer-style variant van de Optivaize home page - dark, dense, technisch. AI-agents, dashboards en marketing-automatisering voor Nederlandse bedrijven.',
  alternates: { canonical: 'https://optivaize.nl/home_composio' },
};

export default async function Page() {
  let cases = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/cases`, { cache: 'no-store' });
    if (res.ok) cases = await res.json();
  } catch {}
  return <Layout><HomePage_composio initialCases={cases} /></Layout>;
}

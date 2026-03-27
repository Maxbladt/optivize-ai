export const dynamic = 'force-dynamic';
import HomePage from '@/pages/HomePage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Optivaize | AI-bureau De Bilt, Automatisering, Marketing en Software',
  description: 'Optivaize is een AI-bureau in De Bilt. Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.',
  alternates: { canonical: 'https://optivaize.nl' },
  openGraph: {
    title: 'Optivaize | AI-bureau De Bilt',
    description: 'Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland.',
    url: 'https://optivaize.nl',
    type: 'website',
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

  return <Layout><HomePage initialCases={cases} /></Layout>;
}

import AIAgentsPage from '@/pages/AIAgentsPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Agents Bouwen | Optivaize, AI-bureau De Bilt',
  description: 'Laat Optivaize custom AI-agents bouwen die uw bedrijfsprocessen automatiseren. Van e-mail agents tot data-analyse, wij ontwikkelen AI op maat in De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-agenten' },
  openGraph: {
    title: 'AI Agents Bouwen | Optivaize',
    description: 'Custom AI-agents die uw bedrijfsprocessen automatiseren.',
    url: 'https://optivaize.nl/ai-agenten',
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><AIAgentsPage /></Layout>;
}

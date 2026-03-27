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
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Agents', item: 'https://optivaize.nl/ai-agenten' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Agents Bouwen',
  description: 'Custom AI-agents die uw bedrijfsprocessen automatiseren. Van e-mail agents tot data-analyse, wij ontwikkelen AI op maat.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-agenten',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat is een AI agent?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een AI agent is een autonoom softwaresysteem dat taken uitvoert namens een gebruiker. Het kan e-mails beantwoorden, data analyseren, processen automatiseren en beslissingen nemen op basis van trainingsdata en instructies.' },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel kost het bouwen van een AI agent?',
      acceptedAnswer: { '@type': 'Answer', text: 'De kosten variëren op basis van complexiteit. Een eenvoudige AI agent begint vanaf een paar duizend euro, terwijl complexe multi-agent systemen met integraties meer investering vereisen. Neem contact op voor een offerte op maat.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt het om een AI agent te bouwen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een standaard AI agent kan binnen 2 tot 4 weken worden opgeleverd. Complexere projecten met meerdere integraties en uitgebreide training duren gemiddeld 6 tot 8 weken.' },
    },
    {
      '@type': 'Question',
      name: 'Kan een AI agent integreren met mijn bestaande software?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja, AI agents kunnen worden geïntegreerd met vrijwel elk bestaand systeem via API-koppelingen. Denk aan CRM-systemen, e-mailplatforms, ERP-software en communicatietools zoals Slack of Teams.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AIAgentsPage />
    </Layout>
  );
}

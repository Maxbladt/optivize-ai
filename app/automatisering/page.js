import AutomationPage from '@/pages/AutomationPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Bedrijfsautomatisering met AI | Optivaize, AI-bureau De Bilt',
  description: 'Automatiseer terugkerende taken en processen met AI. Optivaize helpt bedrijven in Nederland met slimme automatiseringsoplossingen vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/automatisering' },
  openGraph: {
    title: 'Bedrijfsautomatisering met AI | Optivaize',
    description: 'Slimme AI-automatisering voor uw bedrijfsprocessen.',
    url: 'https://optivaize.nl/automatisering',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'Automatisering', item: 'https://optivaize.nl/automatisering' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bedrijfsautomatisering met AI',
  description: 'Slimme automatiseringsoplossingen voor terugkerende taken en bedrijfsprocessen.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/automatisering',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Welke bedrijfsprocessen kan ik automatiseren met AI?',
      acceptedAnswer: { '@type': 'Answer', text: 'Vrijwel elk repetitief proces kan worden geautomatiseerd: facturatie, e-mailafhandeling, data-invoer, rapportage, voorraadbeheer, klantenservice en nog veel meer. Wij analyseren uw workflows en identificeren de grootste besparingsmogelijkheden.' },
    },
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen traditionele automatisering en AI-automatisering?',
      acceptedAnswer: { '@type': 'Answer', text: 'Traditionele automatisering volgt vaste regels. AI-automatisering kan leren, patronen herkennen en beslissingen nemen bij ongestructureerde data. Dit maakt het mogelijk om complexere taken te automatiseren die voorheen menselijke tussenkomst vereisten.' },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel tijd bespaart AI-automatisering?',
      acceptedAnswer: { '@type': 'Answer', text: 'Gemiddeld besparen onze klanten 15 tot 30 uur per week door AI-automatisering. De exacte besparing hangt af van de complexiteit en het volume van de geautomatiseerde processen.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AutomationPage />
    </Layout>
  );
}

import MarketingPage from '@/pages/MarketingPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Marketing Automatisering | Optivaize, AI-bureau De Bilt',
  description: 'Automatiseer uw marketing met AI. Optivaize bouwt AI-gestuurde SEO blogs, productteksten en content strategieen voor bedrijven vanuit De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-marketing' },
  openGraph: {
    title: 'AI Marketing Automatisering | Optivaize',
    description: 'AI-gestuurde marketing automatisering voor uw bedrijf.',
    url: 'https://optivaize.nl/ai-marketing',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Marketing', item: 'https://optivaize.nl/ai-marketing' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Marketing Automatisering',
  description: 'AI-gestuurde SEO blogs, productteksten en content strategieen voor bedrijven.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-marketing',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe werkt AI marketing automatisering?',
      acceptedAnswer: { '@type': 'Answer', text: 'AI marketing automatisering gebruikt kunstmatige intelligentie om content te genereren, SEO te optimaliseren en campagnes te personaliseren. Het analyseert data om de juiste boodschap op het juiste moment aan de juiste doelgroep te leveren.' },
    },
    {
      '@type': 'Question',
      name: 'Kan AI goede SEO-teksten schrijven?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja, met de juiste training en menselijke supervisie kan AI hoogwaardige SEO-teksten produceren. Wij combineren AI-gegenereerde content met expert review om teksten te leveren die zowel zoekmachines als lezers aanspreken.' },
    },
    {
      '@type': 'Question',
      name: 'Wat zijn de voordelen van AI voor content marketing?',
      acceptedAnswer: { '@type': 'Answer', text: 'AI versnelt contentproductie, verbetert personalisatie, optimaliseert SEO automatisch en analyseert prestaties in real-time. Dit resulteert in meer traffic, betere conversies en lagere kosten per lead.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <MarketingPage />
    </Layout>
  );
}

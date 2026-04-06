import AIAgentsChatbotsPage from '@/pages/AIAgentsChatbotsPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Agents & Chatbots | Optivaize, AI-bureau De Bilt',
  description: 'Custom AI agents en chatbots die 24/7 taken overnemen. Van autonome workflows tot klantgerichte chatbots getraind op jouw data. Optivaize, De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-agents-chatbots' },
  openGraph: {
    title: 'AI Agents & Chatbots | Optivaize',
    description: 'Custom AI agents en chatbots voor uw bedrijf.',
    url: 'https://optivaize.nl/ai-agents-chatbots',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Agents & Chatbots', item: 'https://optivaize.nl/ai-agents-chatbots' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Agents & Chatbots',
  description: 'Custom AI agents die taken autonoom uitvoeren en chatbots getraind op uw bedrijfsdata voor klantenservice en sales.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-agents-chatbots',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat is het verschil tussen een AI agent en een chatbot?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een AI agent voert taken autonoom uit op de achtergrond (e-mails beantwoorden, data verwerken, processen starten). Een chatbot is een interactieve gesprekspartner die klanten te woord staat. Beide worden getraind op uw bedrijfsdata.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt het om een AI agent of chatbot te bouwen?',
      acceptedAnswer: { '@type': 'Answer', text: 'Een standaard AI agent of chatbot kan binnen 2 tot 4 weken worden opgeleverd. Complexere projecten met meerdere integraties duren gemiddeld 6 tot 8 weken.' },
    },
    {
      '@type': 'Question',
      name: 'Op welke kanalen werken jullie AI agents en chatbots?',
      acceptedAnswer: { '@type': 'Answer', text: 'Onze oplossingen werken op uw website, WhatsApp, Slack, Teams, Discord, Telegram, Shopify en e-mail. Multi-channel ondersteuning is standaard mogelijk.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <AIAgentsChatbotsPage />
    </Layout>
  );
}

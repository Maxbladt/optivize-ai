import ChatbotPage from '@/pages/ChatbotPage';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'AI Chatbot op Maat | Optivaize, AI-bureau De Bilt',
  description: 'Laat een AI chatbot bouwen die getraind is op uw data. Klantenservice automatiseren met een chatbot in uw tone of voice door Optivaize, De Bilt.',
  alternates: { canonical: 'https://optivaize.nl/ai-chatbot' },
  openGraph: {
    title: 'AI Chatbot op Maat | Optivaize',
    description: 'Custom AI chatbot getraind op uw bedrijfsdata.',
    url: 'https://optivaize.nl/ai-chatbot',
    images: ['/images/optivaize_logo_new.webp'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
    { '@type': 'ListItem', position: 2, name: 'AI Chatbot', item: 'https://optivaize.nl/ai-chatbot' },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Chatbot op Maat',
  description: 'Custom AI chatbot getraind op uw bedrijfsdata voor klantenservice automatisering.',
  provider: { '@id': 'https://optivaize.nl/#organization' },
  areaServed: { '@type': 'Country', name: 'Netherlands' },
  url: 'https://optivaize.nl/ai-chatbot',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat kost een AI chatbot op maat?',
      acceptedAnswer: { '@type': 'Answer', text: 'De kosten hangen af van de complexiteit en het aantal kanalen. Een basis chatbot begint vanaf een paar duizend euro. Chatbots met geavanceerde integraties en multi-channel ondersteuning vereisen een hogere investering.' },
    },
    {
      '@type': 'Question',
      name: 'Op welke kanalen kan de chatbot worden ingezet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Onze chatbots kunnen worden ingezet op uw website, WhatsApp, Slack, Discord, Telegram, Messenger, Shopify en e-mail. Multi-channel ondersteuning is standaard mogelijk.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe wordt de chatbot getraind op onze data?',
      acceptedAnswer: { '@type': 'Answer', text: 'Wij trainen de chatbot op uw productdata, FAQ-documenten, eerdere klantgesprekken en tone of voice. Door retrieval-augmented generation (RAG) geeft de chatbot altijd actuele en accurate antwoorden.' },
    },
  ],
};

export default function Page() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ChatbotPage />
    </Layout>
  );
}

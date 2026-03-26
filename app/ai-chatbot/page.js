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
    images: ['/uploads/optivaize_logo_new.png'],
  },
};

export default function Page() {
  return <Layout><ChatbotPage /></Layout>;
}

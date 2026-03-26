import NotFound from '@/pages/NotFound';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Pagina niet gevonden | Optivaize',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <Layout><NotFound /></Layout>;
}

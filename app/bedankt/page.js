import Bedankt from '@/components/Bedankt';
import Layout from '@/components/Layout';

export const metadata = {
  title: 'Bedankt | Optivaize',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Layout><Bedankt /></Layout>;
}

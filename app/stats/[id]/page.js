import StatsDashboard from '@/pages/StatsDashboard';

export const metadata = {
  title: 'Stats Dashboard',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StatsDashboard />;
}

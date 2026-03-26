export const dynamic = 'force-dynamic';
import AdminLogin from '@/admin/AdminLogin';

export const metadata = {
  title: 'Admin Login | Optivaize',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AdminLogin />;
}

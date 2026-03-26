'use client';
import ProtectedRoute from '@/admin/ProtectedRoute';
import AdminLayout from '@/admin/AdminLayout';

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

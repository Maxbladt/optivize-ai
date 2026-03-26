'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/admin/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return children;
}

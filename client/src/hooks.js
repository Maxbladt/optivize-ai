'use client';
import { usePathname, useRouter as useNextRouter, useParams as useNextParams } from 'next/navigation';

export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

export function useNavigate() {
  const router = useNextRouter();
  return (path) => router.push(path);
}

export function useParams() {
  return useNextParams();
}

export function useRouter() {
  return useNextRouter();
}

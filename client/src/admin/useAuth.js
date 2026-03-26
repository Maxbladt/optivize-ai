'use client';
import { useState, useCallback } from 'react';

const TOKEN_KEY = 'optivaize_admin_token';

export function useAuth() {
  const [token, setToken] = useState(() => typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null);

  const login = useCallback(async (password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  const authFetch = useCallback(async (url, options = {}) => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${currentToken}`,
      },
    });
    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      window.location.href = '/admin/login';
      throw new Error('Session expired');
    }
    return res;
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    login,
    logout,
    authFetch,
  };
}

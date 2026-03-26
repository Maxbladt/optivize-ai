'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { LayoutDashboard, Briefcase, FileText, Presentation, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from './useAuth';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #F1F5F9;
`;

const Sidebar = styled.nav`
  width: 240px;
  background: #0F172A;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const Logo = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #1E293B;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  span {
    background: linear-gradient(135deg, #3B82F6, #10B981);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.div`
  flex: 1;
  padding: 1rem 0;
`;

const SideLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #94A3B8;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
  text-decoration: none;
  &:hover { color: white; background: rgba(255,255,255,0.05); }
  &.active { color: white; background: rgba(59,130,246,0.15); border-right: 3px solid #3B82F6; }
`;

const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #94A3B8;
  font-size: 14px;
  font-weight: 500;
  background: none;
  border: none;
  border-top: 1px solid #1E293B;
  cursor: pointer;
  width: 100%;
  text-align: left;
  &:hover { color: #EF4444; }
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const FullscreenWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #0F172A;
  overflow: auto;
`;

const BackToAdmin = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(15, 23, 42, 0.85);
  color: #94A3B8;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 13px;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
  &:hover { color: white; background: rgba(15, 23, 42, 0.95); }
`;

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isPresentation = pathname === '/admin/presentation';

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (isPresentation) {
    return (
      <FullscreenWrap>
        <BackToAdmin onClick={() => router.push('/admin')}>
          <ArrowLeft size={14} /> Terug naar admin
        </BackToAdmin>
        {children}
      </FullscreenWrap>
    );
  }

  return (
    <Wrapper>
      <Sidebar>
        <Logo>Optivaize <span>Admin</span></Logo>
        <Nav>
          <SideLink href="/admin" className={pathname === '/admin' ? 'active' : ''}><LayoutDashboard size={18} /> Dashboard</SideLink>
          <SideLink href="/admin/cases" className={pathname.startsWith('/admin/cases') ? 'active' : ''}><Briefcase size={18} /> Cases</SideLink>
          <SideLink href="/admin/blogs" className={pathname.startsWith('/admin/blogs') ? 'active' : ''}><FileText size={18} /> Blogs</SideLink>
          <SideLink href="/admin/presentation" className={pathname === '/admin/presentation' ? 'active' : ''}><Presentation size={18} /> Presentatie</SideLink>
        </Nav>
        <LogoutBtn onClick={handleLogout}><LogOut size={18} /> Uitloggen</LogoutBtn>
      </Sidebar>
      <Main>
        {children}
      </Main>
    </Wrapper>
  );
}

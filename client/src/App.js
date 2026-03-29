import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AIAgentsPage from './pages/AIAgentsPage';
import MarketingPage from './pages/MarketingPage';
import SalesPage from './pages/SalesPage';
import AutomationPage from './pages/AutomationPage';
import SoftwarePage from './pages/SoftwarePage';
import AIBusinessPage from './pages/AIBusinessPage';
import ProtectedRoute from './admin/ProtectedRoute';

const CasesPage = lazy(() => import('./pages/CasesPage'));
const CaseDetailPage = lazy(() => import('./pages/CaseDetailPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ChatbotPage = lazy(() => import('./pages/ChatbotPage'));
const TrainingPage = lazy(() => import('./pages/TrainingPage'));
const SubsidyPage = lazy(() => import('./pages/SubsidyPage'));
const HiringPage = lazy(() => import('./pages/HiringPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const Bedankt = lazy(() => import('./components/Bedankt'));
const StatsDashboard = lazy(() => import('./pages/StatsDashboard'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminCasesList = lazy(() => import('./admin/AdminCasesList'));
const AdminCaseForm = lazy(() => import('./admin/AdminCaseForm'));
const AdminBlogsList = lazy(() => import('./admin/AdminBlogsList'));
const AdminBlogForm = lazy(() => import('./admin/AdminBlogForm'));
const AdminPresentation = lazy(() => import('./admin/AdminPresentation'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/ai-agenten" element={<Layout><AIAgentsPage /></Layout>} />
          <Route path="/ai-marketing" element={<Layout><MarketingPage /></Layout>} />
          <Route path="/ai-sales" element={<Layout><SalesPage /></Layout>} />
          <Route path="/automatisering" element={<Layout><AutomationPage /></Layout>} />
          <Route path="/custom-software" element={<Layout><SoftwarePage /></Layout>} />
          <Route path="/ai-business" element={<Layout><AIBusinessPage /></Layout>} />
          <Route path="/cases" element={<Layout><CasesPage /></Layout>} />
          <Route path="/cases/:slug" element={<Layout><CaseDetailPage /></Layout>} />
          <Route path="/over-ons" element={<Layout><TeamPage /></Layout>} />
          <Route path="/hiring" element={<Layout><HiringPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="/ai-chatbot" element={<Layout><ChatbotPage /></Layout>} />
          <Route path="/ai-training" element={<Layout><TrainingPage /></Layout>} />
          <Route path="/crypto-blockchain" element={<Layout><SubsidyPage /></Layout>} />
          <Route path="/bedankt" element={<Bedankt />} />

          {/* Blog routes */}
          <Route path="/blog" element={<Layout><BlogListPage /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogDetailPage /></Layout>} />

          {/* Stats dashboard (hidden) */}
          <Route path="/stats/123121221213213" element={<StatsDashboard />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="cases" element={<AdminCasesList />} />
            <Route path="cases/new" element={<AdminCaseForm />} />
            <Route path="cases/:id/edit" element={<AdminCaseForm />} />
            <Route path="blogs" element={<AdminBlogsList />} />
            <Route path="blogs/new" element={<AdminBlogForm />} />
            <Route path="blogs/:id/edit" element={<AdminBlogForm />} />
            <Route path="presentation" element={<AdminPresentation />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

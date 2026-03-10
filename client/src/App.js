import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AIAgentsPage from './pages/AIAgentsPage';
import MarketingPage from './pages/MarketingPage';
import SalesPage from './pages/SalesPage';
import AutomationPage from './pages/AutomationPage';
import SoftwarePage from './pages/SoftwarePage';
import AIBusinessPage from './pages/AIBusinessPage';
import CasesPage from './pages/CasesPage';
import CaseDetailPage from './pages/CaseDetailPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import ChatbotPage from './pages/ChatbotPage';
import TrainingPage from './pages/TrainingPage';
import SubsidyPage from './pages/SubsidyPage';
import HiringPage from './pages/HiringPage';
import Bedankt from './components/Bedankt';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
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
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

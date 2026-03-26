'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import Cases from '../components/Cases';
import SEOHead from '../components/SEOHead';

const PageHero = styled.section`
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 80% 50%, rgba(59,130,246,0.08), transparent);
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  max-width: 700px;
`;

const Sub = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  max-width: 580px;
`;

function CasesPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  return (
    <>
      <SEOHead
        title="Cases en Projecten | Optivaize, AI-bureau De Bilt"
        description="Bekijk onze AI-projecten en klantcases. Van automatisering tot custom software, ontdek wat Optivaize heeft gebouwd voor bedrijven in Nederland."
        canonicalUrl="https://optivaize.nl/cases"
        ogImage="https://optivaize.nl/uploads/optivaize_logo_new.png"
        breadcrumbs={[{name:"Home",url:"https://optivaize.nl"},{name:"Cases",url:"https://optivaize.nl/cases"}]}
      />
      <PageHero>
        <Container>
          <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {isNL ? 'Cases & Resultaten' : 'Cases & Results'}
          </H1>
          <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {isNL
              ? 'Bekijk hoe wij bedrijven hebben getransformeerd met AI-automatisering, agents en custom software.'
              : 'See how we have transformed businesses with AI automation, agents and custom software.'}
          </Sub>
        </Container>
      </PageHero>
      <Cases />
    </>
  );
}

export default CasesPage;

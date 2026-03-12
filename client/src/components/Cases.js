import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CasesSection = styled.section`
  padding: 6rem 0;
  background: #F8FAFC;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 42px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
  @media (max-width: 768px) { font-size: 32px; }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  max-width: 600px;
  margin: 0 auto;
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CaseCard = styled(motion(Link))`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: block;
  text-decoration: none;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const CaseHeader = styled.div`
  position: relative;
  overflow: hidden;
`;

const CaseImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${CaseCard}:hover & { transform: scale(1.05); }
`;

const CaseOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
`;

const CompanyLogo = styled.img`
  height: 50px;
  width: auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CaseContent = styled.div`
  padding: 2rem;
`;

const CaseTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const CasePreview = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ViewLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3B82F6;
  font-weight: 600;
  font-size: 15px;
`;

function Cases() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { language } = useLanguage();
  const t = translations[language].cases;
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch('/api/cases')
      .then(r => r.json())
      .then(setCases)
      .catch(() => {});
  }, []);

  const isNL = language === 'nl';

  return (
    <CasesSection id="cases" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.title}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <CasesGrid>
          {cases.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              to={`/cases/${caseItem.slug}`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CaseHeader>
                <CaseImage src={caseItem.image} alt={caseItem.company} />
                <CaseOverlay>
                  <CompanyLogo src={caseItem.logo} alt={caseItem.company} />
                </CaseOverlay>
              </CaseHeader>

              <CaseContent>
                <CaseTitle>{isNL ? caseItem.title_nl : caseItem.title_en}</CaseTitle>
                <CasePreview>{isNL ? caseItem.preview_nl : caseItem.preview_en}</CasePreview>
                <ViewLink>
                  <span>{t.viewFullCase}</span>
                  <ArrowRight size={16} />
                </ViewLink>
              </CaseContent>
            </CaseCard>
          ))}
        </CasesGrid>
      </Container>
    </CasesSection>
  );
}

export default Cases;

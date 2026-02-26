import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { 
  ChevronDown, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  Target,
  Zap,
  X
} from 'lucide-react';

const CasesSection = styled.section`
  id: cases;
  padding: 6rem 0;
  background: #F8FAFC;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 32px;
  }
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

const CaseCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const FullscreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(15, 23, 42, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.2);
    transform: scale(1.1);
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

  ${CaseCard}:hover & {
    transform: scale(1.05);
  }
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

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3B82F6;
  font-weight: 600;
  cursor: pointer;
`;

const ResultsPreview = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ResultBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const DetailedResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ResultCard = styled(motion.div)`
  background: #F8FAFC;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${props => props.color || '#3B82F6'};
`;

const ResultIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ResultDescription = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const ResultValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.color || '#3B82F6'};
`;

const CaseDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 2rem;
`;

const casesStaticConfig = [
  { id: 'fonteyn', logo: '/uploads/fonteyn.png', image: '/uploads/fonteyn_showroom.png', detailedResultsIcons: [TrendingUp, DollarSign, Target, Zap, Clock] },
  { id: 'aanhuis', logo: '/uploads/aanhuis.png', image: '/uploads/aanhuis_kantoor.png', detailedResultsIcons: [TrendingUp, Zap, Target, Clock] },
  { id: 'blosh', logo: '/uploads/blosh.png', image: '/uploads/blosh_kantoor.png', detailedResultsIcons: [TrendingUp, Users, DollarSign, Zap] }
];

function Cases() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCase, setSelectedCase] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].cases;
  const casesData = t.items.map((item) => {
    const staticConfig = casesStaticConfig.find((s) => s.id === item.id);
    const detailedResults = item.detailedResults.map((dr, idx) => ({
      ...dr,
      icon: staticConfig.detailedResultsIcons[idx]
    }));
    return { ...staticConfig, ...item, detailedResults };
  });

  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

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
          {casesData.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem)}
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
                <CaseTitle>{caseItem.title}</CaseTitle>
                <CasePreview>{caseItem.preview}</CasePreview>
                
                <ResultsPreview>
                  {caseItem.results.map((result, idx) => (
                    <ResultBadge key={idx}>{result}</ResultBadge>
                  ))}
                </ResultsPreview>

                <ExpandButton>
                  <span>{t.viewFullCase}</span>
                  <ChevronDown size={20} />
                </ExpandButton>
              </CaseContent>
            </CaseCard>
          ))}
        </CasesGrid>

        <AnimatePresence>
          {selectedCase && (
            <FullscreenModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </CloseButton>

                <CaseHeader>
                  <CaseImage src={selectedCase.image} alt={selectedCase.company} />
                  <CaseOverlay>
                    <CompanyLogo src={selectedCase.logo} alt={selectedCase.company} />
                  </CaseOverlay>
                </CaseHeader>

                <div style={{ padding: '2rem' }}>
                  <CaseTitle>{selectedCase.title}</CaseTitle>
                  <CasePreview>{selectedCase.preview}</CasePreview>
                  
                  <ResultsPreview>
                    {selectedCase.results.map((result, idx) => (
                      <ResultBadge key={idx}>{result}</ResultBadge>
                    ))}
                  </ResultsPreview>

                  <CaseDescription style={{ marginTop: '2rem' }}>
                    {selectedCase.description}
                  </CaseDescription>

                  <DetailedResults>
                    {selectedCase.detailedResults.map((result, resultIndex) => {
                      const Icon = result.icon;
                      return (
                        <ResultCard
                          key={resultIndex}
                          color={result.color}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: resultIndex * 0.1 
                          }}
                        >
                          <ResultIcon color={result.color}>
                            <Icon size={24} />
                          </ResultIcon>
                          <ResultTitle>{result.title}</ResultTitle>
                          <ResultDescription>{result.description}</ResultDescription>
                          <ResultValue color={result.color}>
                            {result.value}
                          </ResultValue>
                        </ResultCard>
                      );
                    })}
                  </DetailedResults>
                </div>
              </ModalContent>
            </FullscreenModal>
          )}
        </AnimatePresence>
      </Container>
    </CasesSection>
  );
}

export default Cases;

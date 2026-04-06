'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import Link from './Link';
import Image from 'next/image';

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

const CaseImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  img {
    transition: transform 0.3s ease;
  }
  ${CaseCard}:hover & img { transform: scale(1.05); }
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

function Cases({ initialCases = [] }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const cases = initialCases;

  return (
    <CasesSection id="cases" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            Succesverhalen
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            Echte veranderingen, meetbare resultaten. Bekijk hoe we organisaties in uiteenlopende sectoren hebben geholpen.
          </SectionSubtitle>
        </SectionHeader>

        <CasesGrid>
          {cases.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              href={`/cases/${caseItem.slug}`}
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
                <CaseImageWrap>
                  <Image
                    src={caseItem.image}
                    alt={caseItem.company}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </CaseImageWrap>
                <CaseOverlay>
                  <CompanyLogo src={caseItem.logo} alt={caseItem.company} />
                </CaseOverlay>
              </CaseHeader>

              <CaseContent>
                <CaseTitle>{caseItem.title_nl}</CaseTitle>
                <CasePreview>{caseItem.preview_nl}</CasePreview>
                <ViewLink>
                  <span>Bekijk de volledige case</span>
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

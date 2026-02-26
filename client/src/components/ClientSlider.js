import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';

const SliderSection = styled.section`
  padding: 5rem 0;
  background: #F8FAFC;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #0F172A;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 2rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  mask: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
`;

const SliderTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 200%;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const LogoItem = styled.div`
  flex-shrink: 0;
  width: 180px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 1rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: grayscale(100%);
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 60px;
    padding: 0.75rem;
  }
`;

const clientData = [
  {
    name: "Aanhuis",
    logo: "/uploads/aanhuis.png"
  },
  {
    name: "Blosh",
    logo: "/uploads/blosh.png"
  },
  {
    name: "Fonteyn",
    logo: "/uploads/fonteyn.png"
  },
  {
    name: "Freebird",
    logo: "/uploads/freebird.png"
  },
  {
    name: "Marie Stella Maris",
    logo: "/uploads/marie_stella_maris.png"
  },
  {
    name: "Sony",
    logo: "/uploads/sony.png"
  }
];

// Duplicate the array for seamless infinite scroll
const duplicatedClients = [...clientData, ...clientData];

function ClientSlider() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { language } = useLanguage();
  const t = translations[language].clientSlider;

  return (
    <SliderSection ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {t.title}
        </SectionTitle>

        <SliderContainer>
          <SliderTrack
            animate={{
              x: [0, -50 * duplicatedClients.length]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {duplicatedClients.map((client, index) => (
              <LogoItem key={`${client.name}-${index}`}>
                <img src={client.logo} alt={client.name} />
              </LogoItem>
            ))}
          </SliderTrack>
        </SliderContainer>
      </Container>
    </SliderSection>
  );
}

export default ClientSlider;
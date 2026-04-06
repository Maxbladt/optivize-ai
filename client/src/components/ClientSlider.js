'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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

  @media (max-width: 768px) {
    width: 140px;
    height: 60px;
    padding: 0.75rem;
  }
`;

const clientData = [
  {
    name: "Aanhuis",
    logo: "/images/aanhuis.webp"
  },
  {
    name: "Blosh",
    logo: "/images/blosh.webp"
  },
  {
    name: "Fonteyn",
    logo: "/images/fonteyn.webp"
  },
  {
    name: "Freebird",
    logo: "/images/freebird.webp"
  },
  {
    name: "Marie Stella Maris",
    logo: "/images/marie_stella_maris.webp"
  },
  {
    name: "Sony",
    logo: "/images/sony.webp"
  },
  {
    name: "Red Button",
    logo: "/images/red_button_logo.webp"
  },
  {
    name: "StakePVP",
    logo: "/images/stakepvp_logo.webp"
  },
  {
    name: "Passion Ice Baths",
    logo: "/images/passion_icebaths_logo.webp"
  },
  {
    name: "OpenClaw",
    logo: "/images/openclaw_cool.webp"
  }
];

// Duplicate the array for seamless infinite scroll
const duplicatedClients = [...clientData, ...clientData];

function ClientSlider() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <SliderSection ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          Vertrouwd door vooruitstrevende bedrijven
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
                <Image src={client.logo} alt={client.name} width={140} height={60} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(100%)' }} loading="lazy" />
              </LogoItem>
            ))}
          </SliderTrack>
        </SliderContainer>
      </Container>
    </SliderSection>
  );
}

export default ClientSlider;
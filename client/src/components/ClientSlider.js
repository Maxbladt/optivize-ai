import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

const LogoItem = styled(motion.div)`
  flex-shrink: 0;
  width: 180px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  filter: grayscale(100%);
  padding: 1rem;

  &:hover {
    filter: grayscale(0%);
    transform: scale(1.1);
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 140px;
    height: 60px;
    padding: 0.75rem;
  }
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LogoSubtext = styled.div`
  font-size: 12px;
  color: #64748B;
  font-weight: 500;
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #0F172A;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10;
  margin-bottom: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #0F172A;
  }
`;

const TooltipContent = styled.div`
  h4 {
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #3B82F6;
  }
  
  p {
    margin-bottom: 0.25rem;
    color: #E2E8F0;
    
    &:last-child {
      margin-bottom: 0;
      color: #10B981;
      font-weight: 600;
    }
  }
`;

const clientData = [
  {
    name: "Aanhuis",
    logo: "/uploads/aanhuis.png",
    industry: "Real Estate",
    achievement: "90% lead qualification",
    color: "#3B82F6"
  },
  {
    name: "Blosh",
    logo: "/uploads/blosh.png",
    industry: "Marketing",
    achievement: "3x content output",
    color: "#10B981"
  },
  {
    name: "Fonteyn",
    logo: "/uploads/fonteyn.png",
    industry: "Furniture",
    achievement: "80% process automation",
    color: "#8B5CF6"
  },
  {
    name: "Freebird",
    logo: "/uploads/freebird.png",
    industry: "Travel",
    achievement: "500hrs saved monthly",
    color: "#F59E0B"
  },
  {
    name: "Marie Stella Maris",
    logo: "/uploads/marie_stella_maris.png",
    industry: "Beauty & Wellness",
    achievement: "10x customer engagement",
    color: "#EF4444"
  },
  {
    name: "Sony",
    logo: "/uploads/sony.png",
    industry: "Technology",
    achievement: "60% cost reduction",
    color: "#06B6D4"
  }
];

// Duplicate the array for seamless infinite scroll
const duplicatedClients = [...clientData, ...clientData];

function ClientSlider() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredClient, setHoveredClient] = useState(null);

  return (
    <SliderSection ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          Trusted by Forward-Thinking Companies
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
            style={{ pauseOnHover: true }}
          >
            {duplicatedClients.map((client, index) => (
              <LogoItem
                key={`${client.name}-${index}`}
                onMouseEnter={() => setHoveredClient(`${client.name}-${index}`)}
                onMouseLeave={() => setHoveredClient(null)}
                whileHover={{ scale: 1.05 }}
              >
                <img src={client.logo} alt={client.name} />

                {hoveredClient === `${client.name}-${index}` && (
                  <Tooltip
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TooltipContent>
                      <h4>{client.name}</h4>
                      <p>Industry: {client.industry}</p>
                      <p>Achievement: {client.achievement}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </LogoItem>
            ))}
          </SliderTrack>
        </SliderContainer>
      </Container>
    </SliderSection>
  );
}

export default ClientSlider;

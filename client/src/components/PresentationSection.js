import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DollarSign, Zap } from 'lucide-react';

const PresentationContainer = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: white;
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 2px, transparent 2px);
  background-size: 60px 60px;
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const ImageContent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    order: 1;
  }
`;

const PresentationImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
  border: 4px solid rgba(59, 130, 246, 0.3);

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled(motion.p)`
  font-size: 20px;
  line-height: 1.6;
  color: #94A3B8;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 2rem;
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const StatNumber = styled.h3`
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  font-size: 14px;
  color: #94A3B8;
  font-weight: 500;
`;

const stats = [
  {
    icon: Zap,
    number: "100+",
    label: "Automated Jobs",
  },
  {
    icon: DollarSign,
    number: "3M",
    label: "Saved in Wages",
  }
];

function PresentationSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };



  return (
    <PresentationContainer ref={ref}>
      <BackgroundPattern />
      <Container>
        <ContentGrid>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Title variants={itemVariants}>
              Proven Track Record of Success
            </Title>
            
            <Description variants={itemVariants}>
              We've worked with over 30+ companies, integrating AI into their processes and 
              creating massive revenue streams and cost reductions through intelligent automation. We welcome you to contact our clients as strong references are the best proof of the results we deliver.
            </Description>

            <StatsGrid variants={itemVariants}>
              {stats.slice(0, 2).map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <StatCard
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <StatIcon>
                      <Icon size={24} />
                    </StatIcon>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatCard>
                );
              })}
            </StatsGrid>
          </TextContent>

          <ImageContent
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <PresentationImage
              src="/uploads/presentation.png"
              alt="AI Transformation Presentation"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            />
          </ImageContent>
        </ContentGrid>
      </Container>
    </PresentationContainer>
  );
}

export default PresentationSection;

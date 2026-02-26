import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { 
  Brain, 
  Mail, 
  ShoppingBag, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  Target,
  Crown,
  ChevronDown,
  X
} from 'lucide-react';

const ServicesSection = styled.section`
  id: services;
  padding: 6rem 0;
  background: white;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  border: 2px solid transparent;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

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
  max-width: 900px;
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

const CardHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.primaryColor}, ${props => props.secondaryColor});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.div`
  font-size: 16px;
  color: #3B82F6;
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border-left: 4px solid #3B82F6;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 600;
  color: #3B82F6;
`;

const InfographicContainer = styled.div`
  padding: 2rem 0;
`;

const ProcessFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: ${props => props.background || '#F8FAFC'};
  position: relative;
  border-radius: 16px;
  margin-bottom: 2.5rem;
  border: 2px solid ${props => props.accent || '#3B82F6'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid ${props => props.accent || '#3B82F6'};
  }
  
  &:last-child::after {
    display: none;
  }
  
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#3B82F6'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
`;

const servicesStaticConfig = [
  { id: 'ai-strategy', icon: Brain, primaryColor: '#3B82F6', secondaryColor: '#1D4ED8' },
  { id: 'email-ai', icon: Mail, primaryColor: '#10B981', secondaryColor: '#059669' },
  { id: 'product-text', icon: ShoppingBag, primaryColor: '#8B5CF6', secondaryColor: '#7C3AED' },
  { id: 'blog-writer', icon: FileText, primaryColor: '#F59E0B', secondaryColor: '#D97706' },
  { id: 'linkedin-automation', icon: Target, primaryColor: '#EF4444', secondaryColor: '#DC2626' },
  { id: 'chatbot', icon: MessageCircle, primaryColor: '#06B6D4', secondaryColor: '#0891B2' },
  { id: 'tiktok-optimization', icon: TrendingUp, primaryColor: '#EC4899', secondaryColor: '#DB2777' },
  { id: 'featured-snippets', icon: Crown, primaryColor: '#F97316', secondaryColor: '#EA580C' }
];

function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedService, setSelectedService] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].services;
  const servicesData = t.items.map((item) => {
    const staticConfig = servicesStaticConfig.find((s) => s.id === item.id);
    return { ...staticConfig, ...item };
  });

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.title}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid>
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <ServiceCard
                key={service.id}
                onClick={() => handleCardClick(service)}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1] 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader>
                  <IconContainer 
                    primaryColor={service.primaryColor}
                    secondaryColor={service.secondaryColor}
                  >
                    <Icon size={32} />
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{service.title}</CardTitle>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                    <ExpandButton>
                      {t.howItWorks}
                      <ChevronDown size={16} />
                    </ExpandButton>
                  </CardContent>
                </CardHeader>
              </ServiceCard>
            );
          })}
        </ServicesGrid>

        <AnimatePresence>
          {selectedService && (
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

                <CardHeader>
                  <IconContainer 
                    primaryColor={selectedService.primaryColor}
                    secondaryColor={selectedService.secondaryColor}
                  >
                    {React.createElement(selectedService.icon, { size: 32 })}
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{selectedService.title}</CardTitle>
                    <ServiceDescription>
                      {selectedService.description}
                    </ServiceDescription>
                  </CardContent>
                </CardHeader>

                <InfographicContainer style={{ padding: '0 2rem 2rem' }}>
                  <ProcessFlow>
                    {selectedService.steps.map((step, stepIndex) => (
                      <ProcessStep
                        key={step.number}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: stepIndex * 0.05 
                        }}
                        background={`${selectedService.primaryColor}10`}
                        accent={selectedService.primaryColor}
                      >
                        <StepNumber color={selectedService.primaryColor}>
                          {step.number}
                        </StepNumber>
                        <StepContent>
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </StepContent>
                      </ProcessStep>
                    ))}
                  </ProcessFlow>

                </InfographicContainer>
              </ModalContent>
            </FullscreenModal>
          )}
        </AnimatePresence>
      </Container>
    </ServicesSection>
  );
}

export default Services;
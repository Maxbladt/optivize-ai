import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Phone, Linkedin, ArrowLeft, CheckCircle, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.03) 0%, 
    rgba(16, 185, 129, 0.03) 50%, 
    rgba(99, 102, 241, 0.03) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavBar = styled.div`
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem 3rem;
  }
`;

const SuccessIcon = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 40px rgba(59, 130, 246, 0.3);
`;

const Title = styled(motion.h1)`
  font-size: 48px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 20px;
  color: #64748B;
  line-height: 1.6;
  max-width: 550px;
  margin: 0 auto 3rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TeamPhotos = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TeamMemberCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const TeamPhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3B82F6, #10B981) border-box;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 90px;
    height: 90px;
  }
`;

const TeamMemberName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
`;

const TeamMemberTitle = styled.span`
  font-size: 12px;
  color: #64748B;
`;

const ActionsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
`;

const ActionButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  min-height: 56px;
  transition: all 0.3s ease;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #64748B;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    color: #3B82F6;
    background: rgba(59, 130, 246, 0.05);
  }
`;

const ContactCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    border: 2px solid;
    border-image: linear-gradient(135deg, #3B82F6, #10B981) 1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ContactCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const GeronimSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
`;

const GeronimInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const GeronimName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
`;

const GeronimRole = styled.span`
  font-size: 14px;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

const GeronimPhoto = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #3B82F6, #10B981) border-box;
  flex-shrink: 0;
`;

const FooterBar = styled.div`
  width: 100%;
  padding: 1.5rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: white;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #94A3B8;
`;

function Bedankt() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <PageContainer>
      <NavBar>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <Logo src="/uploads/optivaize.png" alt="Optivaize" />
        </motion.div>
      </NavBar>

      <Content>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <SuccessIcon
            variants={itemVariants}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <CheckCircle size={50} color="white" />
          </SuccessIcon>

          <Title variants={itemVariants}>
            <GradientText>Bedankt</GradientText> voor uw bericht!
          </Title>

          <Subtitle variants={itemVariants}>
            Wij hebben uw aanvraag ontvangen en nemen zo snel mogelijk contact met u op. 
            Meestal binnen 24 uur.
          </Subtitle>

          <TeamPhotos variants={itemVariants}>
            <TeamMemberCard>
              <TeamPhoto src="/uploads/geronimo.png" alt="Geronimo S." />
              <TeamMemberName>Geronimo S.</TeamMemberName>
              <TeamMemberTitle>Operations & Marketing</TeamMemberTitle>
            </TeamMemberCard>
            <TeamMemberCard>
              <TeamPhoto src="/uploads/max.png" alt="Maximilian Bladt" />
              <TeamMemberName>Maximilian B.</TeamMemberName>
              <TeamMemberTitle>CEO</TeamMemberTitle>
            </TeamMemberCard>
            <TeamMemberCard>
              <TeamPhoto src="/uploads/filip.png" alt="Filip Lysiak" />
              <TeamMemberName>Filip L.</TeamMemberName>
              <TeamMemberTitle>AI & Data Science</TeamMemberTitle>
            </TeamMemberCard>
          </TeamPhotos>

          <ContactCard variants={itemVariants}>
            <ContactCardTitle>Direct contact?</ContactCardTitle>

            <GeronimSection>
              <GeronimPhoto src="/uploads/geronimo.png" alt="Geronimo S." />
              <GeronimInfo>
                <GeronimName>Geronimo S.</GeronimName>
                <GeronimRole>Head of Operations & Marketing</GeronimRole>
              </GeronimInfo>
            </GeronimSection>

            <ActionsContainer>
              <ActionButton
                href="tel:+31642698918"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} />
                Bel ons: +31 6 42698918
              </ActionButton>

              <ActionButton
                href="https://www.linkedin.com/in/geronimosaija/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'transparent',
                  border: '2px solid #0A66C2',
                  color: '#0A66C2'
                }}
                whileHover={{ 
                  backgroundColor: '#0A66C2',
                  color: 'white',
                  scale: 1.03
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin size={20} />
                Geronimo op LinkedIn
              </ActionButton>

              <ActionButton
                href="mailto:info@optivaize.nl?subject=Beste Optivaize&body=Beste Optivaize,%0A%0AIk had een vraag over het volgende:%0A%0A"
                style={{
                  background: 'transparent',
                  border: '2px solid #3B82F6',
                  color: '#3B82F6'
                }}
                whileHover={{ 
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  scale: 1.03
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={20} />
                Stuur een e-mail
              </ActionButton>
            </ActionsContainer>
          </ContactCard>

          <BackButton
            onClick={() => navigate('/')}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Terug naar Home
          </BackButton>
        </motion.div>
      </Content>

      <FooterBar>
        <FooterText>
          © 2026 Optivaize. All rights reserved. • Optimize What Matters.
        </FooterText>
      </FooterBar>
    </PageContainer>
  );
}

export default Bedankt;

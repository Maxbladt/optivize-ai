import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, X, Linkedin, Instagram, Twitter } from 'lucide-react';

const FooterSection = styled.footer`
  id: contact;
  background: #0F172A;
  color: white;
  padding: 5rem 0 2rem;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CompanyInfo = styled(motion.div)`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  margin-bottom: 0.75rem;
  display: flex; /* Add this like in Navigation */
  align-items: center; /* Add this like in Navigation */
  
  img {
    width: 200px; /* Use width instead of height */
    height: auto; /* Auto height instead */
    filter: brightness(0) invert(1);
    
    @media (max-width: 768px) {
      width: 150px; /* Adjust width for mobile */
      height: auto;
    }
  }
`;

const Tagline = styled.p`
  font-size: 16px;
  color: #94A3B8;
  margin-bottom: 1.5rem;
  font-style: italic;
  line-height: 1.4;
  max-width: 400px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #E2E8F0;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QuickLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const QuickLink = styled(motion.a)`
  color: #94A3B8;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3B82F6;
  }
`;

const ConsultationSection = styled(motion.div)`
  text-align: center;
`;

const ConsultationTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #F1F5F9;
`;

const ConsultationSubtitle = styled.p`
  font-size: 16px;
  color: #94A3B8;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ConsultationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const FormInput = styled.input`
  padding: 1rem;
  border: 2px solid #334155;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: #64748B;
  }
`;

const FormTextarea = styled.textarea`
  padding: 1rem;
  border: 2px solid #334155;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: #64748B;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 56px;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #10B981;
  font-weight: 600;
  margin-top: 1rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #64748B;
  font-size: 14px;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LegalLink = styled.a`
  color: #64748B;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #94A3B8;
  }
`;

const PolicyModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const PolicyModalContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  color: #1E293B;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const PolicyCloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: #F1F5F9;
  }
`;

const PolicyTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.5rem;
  padding-right: 3rem;
`;

const PolicyContent = styled.div`
  line-height: 1.6;
  color: #1E293B;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem 0;
    color: #0F172A;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin: 0.5rem 0 1rem 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activePolicy, setActivePolicy] = useState(null);

  const policies = {
    privacy: {
      title: "Privacy Policy",
      content: `
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you contact us or use our services.</p>
        
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services and communicate with you.</p>
        
        <h3>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
        
        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at info@optivaize.nl</p>
      `
    },
    terms: {
      title: "Terms of Service",
      content: `
        <h3>Acceptance of Terms</h3>
        <p>By accessing our website, you agree to be bound by these terms of service.</p>
        
        <h3>Use License</h3>
        <p>Permission is granted to temporarily download one copy of our materials for personal, non-commercial transitory viewing only.</p>
        
        <h3>Disclaimer</h3>
        <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
        
        <h3>Limitations</h3>
        <p>In no event shall Optivaize be liable for any damages arising out of the use or inability to use our materials.</p>
      `
    },
    cookies: {
      title: "Cookie Policy",
      content: `
        <h3>What Are Cookies</h3>
        <p>Cookies are small text files stored on your device when you visit our website.</p>
        
        <h3>How We Use Cookies</h3>
        <p>We use cookies to improve your browsing experience and analyze website traffic.</p>
        
        <h3>Types of Cookies</h3>
        <ul>
          <li>Essential cookies - Required for website functionality</li>
          <li>Analytics cookies - Help us understand how you use our site</li>
        </ul>
        
        <h3>Managing Cookies</h3>
        <p>You can control and delete cookies through your browser settings.</p>
      `
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <FooterSection id="contact" ref={ref}>
        <Container>
          <FooterContent>
            <CompanyInfo
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <Logo>
                <img src="/uploads/optivaize.png" alt="Optivaize" />
              </Logo>
              <Tagline>"Optimize What Matters"</Tagline>
              
              <ContactInfo>
                <ContactItem>
                  <ContactIcon>
                    <Mail size={20} />
                  </ContactIcon>
                  <div>
                    <a href="mailto:info@optivaize.nl?subject=Beste Optivaize&body=Beste Optivaize,%0A%0AIk had een vraag over het volgende:%0A%0A" style={{ color: '#E2E8F0', textDecoration: 'none' }}>info@optivaize.nl</a>
                    <div style={{ fontSize: '14px', color: '#64748B' }}>General Inquiries</div>
                  </div>
                </ContactItem>
                
                <ContactItem>
                  <ContactIcon>
                    <Phone size={20} />
                  </ContactIcon>
                  <div>
                    <a href="tel:+31634354075" style={{ color: '#E2E8F0', textDecoration: 'none' }}>+31634354075</a>
                    <div style={{ fontSize: '14px', color: '#64748B' }}>Business Hours: 9AM - 6PM CET</div>
                  </div>
                </ContactItem>
                
                <ContactItem>
                  <ContactIcon>
                    <MapPin size={20} />
                  </ContactIcon>
                  <div>
                    <div>Groenekanseweg 70, De Bilt</div>
                    <div style={{ fontSize: '14px', color: '#64748B' }}>3732AG, Netherlands</div>
                  </div>
                </ContactItem>
              </ContactInfo>

              <QuickLinks>
                <QuickLink 
                  onClick={() => scrollToSection('home')}
                  whileHover={{ x: 5 }}
                >
                  Home
                </QuickLink>
                <QuickLink 
                  onClick={() => scrollToSection('services')}
                  whileHover={{ x: 5 }}
                >
                  Services
                </QuickLink>
                <QuickLink 
                  onClick={() => scrollToSection('cases')}
                  whileHover={{ x: 5 }}
                >
                  Cases
                </QuickLink>
                <QuickLink 
                  onClick={() => scrollToSection('team')}
                  whileHover={{ x: 5 }}
                >
                  Team
                </QuickLink>
                <QuickLink 
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ x: 5 }}
                >
                  Contact
                </QuickLink>
              </QuickLinks>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.a
                  href="https://www.linkedin.com/company/optivaize"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/optivaize"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a
                  href="https://x.com/optivaize"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter size={20} />
                </motion.a>
              </div>
            </CompanyInfo>

            <ConsultationSection
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <ConsultationTitle>Ready to transform your business?</ConsultationTitle>
              <ConsultationSubtitle>
                Get in touch with us to discover how AI can revolutionize your operations
              </ConsultationSubtitle>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                <motion.a
                  href="tel:+31634354075"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    minHeight: '56px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone size={20} />
                  Call Us
                </motion.a>

                <motion.a
                  href="mailto:info@optivaize.nl?subject=Beste Optivaize&body=Beste Optivaize,%0A%0AIk had een vraag over het volgende:%0A%0A"
                  style={{
                    background: 'transparent',
                    border: '2px solid #3B82F6',
                    color: '#3B82F6',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    minHeight: '56px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={20} />
                  Send Us an Email
                </motion.a>
              </div>
            </ConsultationSection>
          </FooterContent>

          <FooterBottom>
            <Copyright>
              © 2026 Optivaize. All rights reserved. • Optimize What Matters.
            </Copyright>
            <LegalLinks>
              <LegalLink onClick={() => setActivePolicy('privacy')}>Privacy Policy</LegalLink>
              <LegalLink onClick={() => setActivePolicy('terms')}>Terms of Service</LegalLink>
              <LegalLink onClick={() => setActivePolicy('cookies')}>Cookie Policy</LegalLink>
            </LegalLinks>
          </FooterBottom>
        </Container>
      </FooterSection>

      <AnimatePresence>
        {activePolicy && (
          <PolicyModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolicy(null)}
          >
            <PolicyModalContainer
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PolicyCloseButton
                onClick={() => setActivePolicy(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </PolicyCloseButton>
              
              <PolicyTitle>{policies[activePolicy]?.title}</PolicyTitle>
              <PolicyContent dangerouslySetInnerHTML={{ __html: policies[activePolicy]?.content }} />
            </PolicyModalContainer>
          </PolicyModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default Footer;

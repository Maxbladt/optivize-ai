import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

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

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CompanyInfo = styled(motion.div)`
  max-width: 500px;
`;

const Logo = styled.div`
  margin-bottom: 1rem;
  
  img {
    width: 150px;
    height: auto;
    filter: brightness(0) invert(1);
    
    @media (max-width: 768px) {
      width: 120px;
    }
  }
`;

const Tagline = styled.p`
  font-size: 18px;
  color: #94A3B8;
  margin-bottom: 2rem;
  font-style: italic;
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

function Footer({ onOpenModal }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            <Tagline>"Intelligent Solutions for Modern Business"</Tagline>
            
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <Mail size={20} />
                </ContactIcon>
                <div>
                  <div>info@optivize.nl</div>
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
          </CompanyInfo>

          <ConsultationSection
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <ConsultationTitle>Ready to transform your business?</ConsultationTitle>
            <ConsultationSubtitle>
              Get a free consultation and discover how AI can revolutionize your operations
            </ConsultationSubtitle>

            <ConsultationForm onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <FormInput
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <FormInput
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
              <FormTextarea
                name="message"
                placeholder="Tell us about your business challenges and goals..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner />
                    Sending...
                  </>
                ) : (
                  <>
                    Get In Contact
                    <ArrowRight size={20} />
                  </>
                )}
              </SubmitButton>

              {isSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={20} />
                  Thank you! We'll call you within 24 hours.
                </SuccessMessage>
              )}
            </ConsultationForm>

            <div style={{ marginTop: '2rem' }}>
              <motion.button
                onClick={onOpenModal}
                style={{
                  background: 'transparent',
                  border: '2px solid #3B82F6',
                  color: '#3B82F6',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ 
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                Or Get Your Free AI Strategy Guide
              </motion.button>
            </div>
          </ConsultationSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 Optivaize. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink href="#privacy">Privacy Policy</LegalLink>
            <LegalLink href="#terms">Terms of Service</LegalLink>
            <LegalLink href="#cookies">Cookie Policy</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
}

export default Footer;

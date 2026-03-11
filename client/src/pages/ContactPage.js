import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, ArrowRight, Linkedin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const Container = styled.div`
  max-width: 1440px; margin: 0 auto; padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

const PageHero = styled.section`
  padding: 140px 0 4rem;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 80% 50%, rgba(59,130,246,0.08), transparent);
  }
`;

const HeroInner = styled.div`
  position: relative; z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const HeroCallBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.15);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.2s ease;
  &:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); }
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: white;
  margin-bottom: 1.25rem; line-height: 1.1; max-width: 700px;
`;

const Sub = styled(motion.p)`
  font-size: 19px; color: #94A3B8; line-height: 1.7; max-width: 580px;
`;

/* ── Main Content ── */
const MainSection = styled.section`
  padding: 5rem 0 7rem;
  background: white;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: flex-start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const LeftCol = styled.div``;

const RightCol = styled.div``;

const InfoTitle = styled.h2`
  font-size: 1.8rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;
`;

const InfoDesc = styled.p`
  font-size: 16px; color: #64748B; line-height: 1.7; margin-bottom: 2rem;
`;

/* ── CTA Box ── */
const CtaBox = styled(motion.div)`
  background: linear-gradient(135deg, #0F172A, #1E293B);
  border-radius: 20px;
  padding: 2rem 2.25rem;
  margin-bottom: 2rem;
`;

const CtaTitle = styled.h3`
  font-size: 1.2rem; font-weight: 700; color: white; margin-bottom: 0.5rem;
`;

const CtaSub = styled.p`
  font-size: 14px; color: #94A3B8; margin-bottom: 1.5rem; line-height: 1.6;
`;

const CtaBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(59,130,246,0.3);
  text-decoration: none;
`;

const CallBtn = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  background: transparent;
  border: 1.5px solid rgba(255,255,255,0.15);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  margin-top: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;
  &:hover { border-color: rgba(255,255,255,0.4); }
`;

/* ── Contact Items ── */
const ContactList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  background: #F8FAFC;
  border: 1px solid #F1F5F9;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(59,130,246,0.25);
    background: white;
    box-shadow: 0 4px 16px rgba(59,130,246,0.06);
  }
`;

const ItemIcon = styled.div`
  width: 40px; height: 40px; border-radius: 11px;
  background: ${props => props.$bg || 'rgba(59,130,246,0.08)'};
  display: flex; align-items: center; justify-content: center;
  color: ${props => props.$color || '#3B82F6'};
  flex-shrink: 0;
`;

const ItemText = styled.div`
  .label { font-size: 13px; font-weight: 600; color: #0F172A; }
  .value { font-size: 12px; color: #64748B; margin-top: 1px; }
`;

/* ── Office Photo ── */
const OfficeImageWrap = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  position: relative;
`;

const OfficeImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 440px;
  object-fit: cover;
  display: block;
  @media (max-width: 1024px) { min-height: 280px; }
`;

const OfficeOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(0deg, rgba(15,23,42,0.85), transparent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

const AvailabilityBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: rgba(16,185,129,0.06);
  border: 1px solid rgba(16,185,129,0.15);
  border-radius: 10px;
  font-size: 13px;
  color: #064E3B;
`;

const GreenDot = styled.span`
  width: 8px; height: 8px; border-radius: 50%;
  background: #10B981;
  flex-shrink: 0;
`;

function ContactPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  return (
    <>
      <PageHero>
        <Container>
          <HeroInner>
            <div>
              <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {isNL ? 'Laten we kennismaken' : 'Let\'s get acquainted'}
              </H1>
              <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                {isNL
                  ? 'Plan een gratis adviesgesprek. Geen verplichtingen, wel concrete inzichten in wat AI voor je bedrijf kan doen.'
                  : 'Book a free consultation. No obligations, just concrete insights into what AI can do for your business.'}
              </Sub>
            </div>
          </HeroInner>
        </Container>
      </PageHero>

      <MainSection>
        <Container>
          <ContentGrid>
            <LeftCol>
              <FadeIn>
                <InfoTitle>
                  {isNL ? 'Neem contact op' : 'Get in touch'}
                </InfoTitle>
                <InfoDesc>
                  {isNL
                    ? 'Wij reageren op elke aanvraag binnen 24 uur.'
                    : 'We respond to every enquiry within 24 hours.'}
                </InfoDesc>
              </FadeIn>

              <FadeIn delay={0.1}>
                <ContactList>
                  <ContactItem href="mailto:info@optivaize.nl?subject=Contact via website">
                    <ItemIcon $bg="rgba(59,130,246,0.08)" $color="#3B82F6"><Mail size={18} /></ItemIcon>
                    <ItemText>
                      <div className="label">info@optivaize.nl</div>
                      <div className="value">{isNL ? 'Reactie binnen 24 uur' : 'Reply within 24h'}</div>
                    </ItemText>
                  </ContactItem>

                  <ContactItem href="tel:+31642698918">
                    <ItemIcon $bg="rgba(16,185,129,0.08)" $color="#10B981"><Phone size={18} /></ItemIcon>
                    <ItemText>
                      <div className="label">+31 6 42 69 89 18</div>
                      <div className="value">{isNL ? 'Ma–Vr, 9:00–18:00' : 'Mon–Fri, 9:00–18:00'}</div>
                    </ItemText>
                  </ContactItem>

                  <ContactItem href="https://maps.google.com/?q=Groenekanseweg+70+de+Bilt" target="_blank" rel="noopener noreferrer">
                    <ItemIcon $bg="rgba(245,158,11,0.08)" $color="#F59E0B"><MapPin size={18} /></ItemIcon>
                    <ItemText>
                      <div className="label">Groenekanseweg 70</div>
                      <div className="value">3732 AG, De Bilt</div>
                    </ItemText>
                  </ContactItem>

                  <ContactItem href="https://www.linkedin.com/company/optivaize" target="_blank" rel="noopener noreferrer">
                    <ItemIcon $bg="rgba(99,102,241,0.08)" $color="#6366F1"><Linkedin size={18} /></ItemIcon>
                    <ItemText>
                      <div className="label">Optivaize</div>
                      <div className="value">{isNL ? 'Volg ons' : 'Follow us'}</div>
                    </ItemText>
                  </ContactItem>
                </ContactList>

                <AvailabilityBar>
                  <GreenDot />
                  {isNL ? 'Beschikbaar - Ma t/m Vr, 9:00-18:00' : 'Available - Mon to Fri, 9:00-18:00'}
                </AvailabilityBar>
              </FadeIn>
            </LeftCol>

            <RightCol>
              <FadeIn delay={0.15}>
                <OfficeImageWrap
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <OfficeImage
                    src="/uploads/optivaize_office_outside.png"
                    alt={isNL ? 'Optivaize kantoor' : 'Optivaize office'}
                    loading="eager"
                  />
                  <OfficeOverlay>
                    <MapPin size={15} />
                    Groenekanseweg 70, 3732 AG De Bilt
                  </OfficeOverlay>
                </OfficeImageWrap>
              </FadeIn>
            </RightCol>
          </ContentGrid>
        </Container>
      </MainSection>
    </>
  );
}

export default ContactPage;

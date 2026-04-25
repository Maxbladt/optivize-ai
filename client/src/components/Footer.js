'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, X, Linkedin, Instagram, Twitter, MessageCircle, Youtube } from 'lucide-react';
import Link from './Link';
import Image from 'next/image';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const FooterSection = styled.footer`
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

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 2rem;
    text-align: center;

    & > *:first-child {
      grid-column: 1 / -1;
    }
    & > *:last-child {
      grid-column: 1 / -1;
    }
  }
`;

const Brand = styled(motion.div)``;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
  @media (max-width: 640px) { display: flex; justify-content: center; }
  img {
    height: 32px;
    width: auto;
    filter: brightness(0) invert(1);
  }
`;

const Tagline = styled.p`
  font-size: 15px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 280px;
  @media (max-width: 640px) { max-width: 100%; }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 0.625rem;
  @media (max-width: 640px) { justify-content: center; }
`;

const SocialIcon = styled(motion.a)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  transition: all 0.2s ease;

  &:hover {
    background: ${GRADIENT};
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterCol = styled(motion.div)``;

const ContactColInner = styled.div`
  @media (max-width: 640px) {
    display: inline-block;
    text-align: left;
  }
`;

const ColTitle = styled.h4`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #F1F5F9;
  margin-bottom: 1.25rem;
`;

const FooterLink = styled(Link)`
  display: block;
  font-size: 14px;
  color: #64748B;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;

  &:hover {
    color: #10B981;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
  text-align: left;
`;

const ContactIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
`;

const ContactText = styled.div`
  font-size: 14px;

  a {
    color: #E2E8F0;
    display: block;
    transition: color 0.2s ease;
    &:hover { color: #10B981; }
  }

  span {
    display: block;
    font-size: 12px;
    color: #475569;
    margin-top: 1px;
  }
`;


const FooterBottom = styled.div`
  border-top: 1px solid #1E293B;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #334155;
  font-size: 13px;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LegalLink = styled.button`
  color: #334155;
  background: none;
  border: none;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease;
  font-family: inherit;

  &:hover { color: #64748B; }
`;

const PolicyOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const PolicyBox = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 580px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  color: #1E293B;
`;

const PolicyCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  transition: background 0.2s ease;
  &:hover { background: #F1F5F9; }
`;

const PolicyTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1.25rem;
  padding-right: 2.5rem;
`;

const PolicyContent = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: #475569;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #0F172A;
    margin: 1.25rem 0 0.5rem;
  }

  p { margin-bottom: 0.75rem; }
  ul { margin: 0.5rem 0 0.75rem 1.25rem; }
  li { margin-bottom: 0.4rem; }
`;

const policies = {
  privacy: {
    title: 'Privacy Policy',
    content: `<h3>Gegevens die we verzamelen</h3><p>Wij verzamelen informatie die je direct aan ons verstrekt, zoals wanneer je contact met ons opneemt of gebruik maakt van onze diensten.</p><h3>Gebruik van informatie</h3><p>Wij gebruiken de informatie die wij verzamelen om onze diensten te leveren, te onderhouden en te verbeteren en om met je te communiceren.</p><h3>Delen van informatie</h3><p>Wij verkopen, verhandelen of dragen je persoonlijke informatie niet over aan derden zonder je toestemming.</p><h3>Contact</h3><p>Vragen over dit privacybeleid? Stuur een e-mail naar info@optivaize.nl</p>`
  },
  cookies: {
    title: 'Cookiebeleid',
    content: `<h3>Wat zijn cookies</h3><p>Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen wanneer je onze website bezoekt.</p><h3>Hoe wij cookies gebruiken</h3><p>Wij gebruiken cookies om je browse-ervaring te verbeteren en websiteverkeer te analyseren.</p><h3>Beheer van cookies</h3><p>Je kunt cookies beheren en verwijderen via je browserinstellingen.</p>`
  }
};

function Footer() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activePolicy, setActivePolicy] = useState(null);

  return (
    <>
      <FooterSection ref={ref} id="contact">
        <Container>
          <FooterGrid>
            <Brand
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <FooterLogo>
                <Image src="/images/optivaize_logo_new.webp" alt="Optivaize" width={128} height={32} loading="lazy" />
              </FooterLogo>
              <Tagline>
Aan de top van AI-ontwikkeling. Wij bouwen intelligente systemen die je bedrijf versnellen.
              </Tagline>
              <SocialRow>
                <SocialIcon href="https://www.linkedin.com/company/optivaize" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                  <Linkedin size={16} />
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com/optivaize" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                  <Instagram size={16} />
                </SocialIcon>
                <SocialIcon href="https://x.com/optivaize" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                  <Twitter size={16} />
                </SocialIcon>
                <SocialIcon href="https://www.youtube.com/@Optivaize" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                  <Youtube size={16} />
                </SocialIcon>
              </SocialRow>
            </Brand>

            <FooterCol
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ColTitle>Diensten</ColTitle>
              <FooterLink to="/software-platforms">Software & Platforms</FooterLink>
              <FooterLink to="/ai-agents-chatbots">AI Agents & Chatbots</FooterLink>
              <FooterLink to="/ai-marketing">AI Marketing</FooterLink>
            </FooterCol>

            <FooterCol
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <ColTitle>Bedrijf</ColTitle>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/producten">Producten</FooterLink>
              <FooterLink to="/cases">Cases</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/over-ons">Over ons</FooterLink>
              <FooterLink to="/hiring">Vacatures</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterCol>

            <FooterCol
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ColTitle>Contact</ColTitle>
              <ContactColInner>
                <ContactItem>
                  <ContactIcon><Mail size={15} /></ContactIcon>
                  <ContactText>
                    <a href="mailto:info@optivaize.nl">info@optivaize.nl</a>
                    <span>Stuur ons een bericht</span>
                  </ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon><Phone size={15} /></ContactIcon>
                  <ContactText>
                    <a href="tel:+31642698918">+31 6 42 69 89 18</a>
                    <span>Ma-Vr, 9:00-18:00</span>
                  </ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon><MapPin size={15} /></ContactIcon>
                  <ContactText>
                    <a href="https://maps.google.com/?q=Groenekanseweg+70+de+Bilt" target="_blank" rel="noopener noreferrer">Groenekanseweg 70, De Bilt</a>
                    <span>3732 AG, Nederland</span>
                  </ContactText>
                </ContactItem>
                <ContactItem>
                  <ContactIcon><MessageCircle size={15} /></ContactIcon>
                  <ContactText>
                    <a href="https://wa.me/31642698918" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <span>Stuur een bericht</span>
                  </ContactText>
                </ContactItem>
              </ContactColInner>
            </FooterCol>
          </FooterGrid>

          <FooterBottom>
            <Copyright>
              &copy; {new Date().getFullYear()} Optivaize. Alle rechten voorbehouden.
              {' | KvK: 97569186 | BTW: NL868115769B01'}
            </Copyright>
            <LegalLinks>
              <LegalLink onClick={() => setActivePolicy('privacy')}>Privacy</LegalLink>
              <LegalLink onClick={() => setActivePolicy('cookies')}>Cookies</LegalLink>
              <LegalLink as="a" href="/images/Algemene Voorwaarden.pdf" download style={{ textDecoration: 'none' }}>
                Algemene Voorwaarden
              </LegalLink>
            </LegalLinks>
          </FooterBottom>
        </Container>
      </FooterSection>

      <AnimatePresence>
        {activePolicy && (
          <PolicyOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolicy(null)}
          >
            <PolicyBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <PolicyCloseBtn onClick={() => setActivePolicy(null)}>
                <X size={20} />
              </PolicyCloseBtn>
              <PolicyTitle>{policies[activePolicy].title}</PolicyTitle>
              <PolicyContent dangerouslySetInnerHTML={{ __html: policies[activePolicy].content }} />
            </PolicyBox>
          </PolicyOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default Footer;

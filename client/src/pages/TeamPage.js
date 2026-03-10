import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, MapPin } from 'lucide-react';
import Team from '../components/Team';
import InteractiveGlobe from '../components/InteractiveGlobe';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

/* ──── Styled Components ──── */

const PageHero = styled.section`
  padding: 140px 0 0;
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

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const HeroContent = styled.div`
  padding-bottom: 3rem;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  max-width: 700px;
`;

const Sub = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  max-width: 580px;
`;

const HeroImageWrap = styled.div`
  background: linear-gradient(180deg, #0F172A 0%, #0F172A 50%, white 50%, white 100%);
  padding: 0 0 3rem;
`;

const HeroImageInner = styled(motion.div)`
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
  @media (max-width: 768px) { height: 240px; }
`;

const Section = styled.section`
  padding: 7rem 0;
  background: ${props => props.$gray ? '#F8FAFC' : props.$dark ? '#0F172A' : 'white'};
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.$light ? '#60A5FA' : '#3B82F6'};
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: ${props => props.$light ? 'white' : '#0F172A'};
  margin-bottom: 1.25rem;
  line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px;
  color: ${props => props.$light ? '#94A3B8' : '#475569'};
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

/* ── Values Grid ── */

/* ── Globe Section ── */

const GlobeSection = styled.section`
  padding: 6rem 0;
  background: #0F172A;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.06), transparent);
  }
`;

const GlobeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const GlobeCanvasWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LocationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;
`;

const LocationCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.08);
    border-color: rgba(59, 130, 246, 0.2);
  }
`;

const LocIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const LocInfo = styled.div``;

const LocCity = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.15rem;
`;

const LocCountry = styled.div`
  font-size: 13px;
  color: #60A5FA;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const LocDesc = styled.div`
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.5;
`;

/* ── CTA ── */

const CtaSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 80% at 50% 100%, rgba(59,130,246,0.1), transparent);
  }
`;

const CtaInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 auto;
`;

const CtaTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1rem;
`;

const GradientSpan = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CtaSub = styled(motion.p)`
  font-size: 18px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const CtaBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(59,130,246,0.35);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 8px 30px rgba(59,130,246,0.5); }
`;

/* ──── Locations Data ──── */

const locationsNL = [
  { city: 'Utrecht', country: 'Nederland', desc: 'Hoofdkantoor - Strategie, sales & management', flag: '🇳🇱' },
  { city: 'Manila', country: 'Filipijnen', desc: 'Development hub - Full-stack & AI engineering', flag: '🇵🇭' },
  { city: 'Mumbai', country: 'India', desc: 'Development - Machine learning & data science', flag: '🇮🇳' },
  { city: 'Raleigh', country: 'North Carolina, VS', desc: 'R&D - Cloud infrastructure & AI deployment', flag: '🇺🇸' },
];

const locationsEN = [
  { city: 'Utrecht', country: 'Netherlands', desc: 'Headquarters - Strategy, sales & management', flag: '🇳🇱' },
  { city: 'Manila', country: 'Philippines', desc: 'Development hub - Full-stack & AI engineering', flag: '🇵🇭' },
  { city: 'Mumbai', country: 'India', desc: 'Development - Machine learning & data science', flag: '🇮🇳' },
  { city: 'Raleigh', country: 'North Carolina, US', desc: 'R&D - Cloud infrastructure & AI deployment', flag: '🇺🇸' },
];

/* ──── Globe is now in components/InteractiveGlobe.js ──── */

/* ──── Component ──── */

function TeamPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const locations = isNL ? locationsNL : locationsEN;

  return (
    <>
      {/* ── Hero ── */}
      <PageHero>
        <Container>
          <HeroContent>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {isNL ? 'Wij zijn Optivaize' : 'We are Optivaize'}
            </H1>
            <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {isNL
                ? 'Wij helpen bedrijven slimmer werken met AI. Van chatbots en automatisering tot complete AI-transformaties, met een team van 15+ specialisten in 4 landen.'
                : 'We help businesses work smarter with AI. From chatbots and automation to complete AI transformations, with a team of 15+ specialists in 4 countries.'}
            </Sub>
          </HeroContent>
        </Container>
      </PageHero>

      {/* ── Office Photo ── */}
      <HeroImageWrap>
        <Container>
          <HeroImageInner
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroImage
              src="/uploads/optivaize_office_outside.png"
              alt={isNL ? 'Optivaize kantoor' : 'Optivaize office'}
              loading="eager"
            />
          </HeroImageInner>
        </Container>
      </HeroImageWrap>

      {/* ── Team ── */}
      <Team />

      {/* ── 3D Globe — Wereldwijd Netwerk ── */}
      <GlobeSection>
        <Container>
          <GlobeLayout>
            <div>
              <FadeIn>
                <SectionLabel $light>{isNL ? 'Onze internationale workforce' : 'Our international workforce'}</SectionLabel>
                <SectionTitle $light>
                  {isNL ? 'Ons team werkt vanuit 4 landen' : 'Our team works from 4 countries'}
                </SectionTitle>
                <SectionText $light>
                  {isNL
                    ? 'In het gebied van AI zit de expertise niet louter in Nederland. Wij maken gebruik van het talent dat zich wereldwijd aandient, van development in Manila tot development in Mumbai.'
                    : 'In AI, expertise isn\'t limited to one country. We tap into the talent available worldwide, from development in Manila to development in Mumbai.'}
                </SectionText>
              </FadeIn>
              <LocationsList>
                {locations.map((loc, i) => (
                  <FadeIn key={loc.city} delay={i * 0.1}>
                    <LocationCard whileHover={{ x: 6 }} transition={{ duration: 0.2 }}>
                      <LocIcon>
                        <MapPin size={18} />
                      </LocIcon>
                      <LocInfo>
                        <LocCity>{loc.flag} {loc.city}</LocCity>
                        <LocCountry>{loc.country}</LocCountry>
                        <LocDesc>{loc.desc}</LocDesc>
                      </LocInfo>
                    </LocationCard>
                  </FadeIn>
                ))}
              </LocationsList>
            </div>
            <GlobeCanvasWrap>
              <FadeIn delay={0.2}>
                <InteractiveGlobe />
              </FadeIn>
            </GlobeCanvasWrap>
          </GlobeLayout>
        </Container>
      </GlobeSection>

      {/* ── CTA ── */}
      <CtaSection>
        <Container>
          <CtaInner>
            <CtaTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {isNL
                ? <>Klaar om samen te <GradientSpan>bouwen</GradientSpan>?</>
                : <>Ready to <GradientSpan>build</GradientSpan> together?</>}
            </CtaTitle>
            <CtaSub
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isNL
                ? 'Neem contact op en ontdek wat wij voor je bedrijf kunnen betekenen.'
                : 'Get in touch and discover what we can do for your business.'}
            </CtaSub>
            <CtaBtn
              href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isNL ? 'Plan gratis gesprek' : 'Book free call'}
              <ArrowRight size={17} />
            </CtaBtn>
          </CtaInner>
        </Container>
      </CtaSection>
    </>
  );
}

export default TeamPage;

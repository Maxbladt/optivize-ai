'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from '../components/Link';
import { Building2, Search, Cpu, Rocket, TrendingUp, Users, Shield, ArrowRight, CheckCircle, ChevronRight, BarChart3 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #EC4899, #8B5CF6)';

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
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #0F0518 0%, #0F172A 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(236,72,153,0.1), transparent),
                radial-gradient(ellipse 40% 40% at 10% 60%, rgba(139,92,246,0.08), transparent);
  }
`;

const HeroInner = styled.div`
  position: relative; z-index: 2; max-width: 760px;
`;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 0.5rem; font-size: 13px; color: #475569; margin-bottom: 1.5rem;
  a { color: #475569; &:hover { color: #94A3B8; } }
`;

const Badge = styled.div`
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(236,72,153,0.15); border: 1px solid rgba(236,72,153,0.3);
  color: #F9A8D4; font-size: 12px; font-weight: 700; padding: 0.35rem 0.8rem;
  border-radius: 20px; margin-bottom: 1.25rem; letter-spacing: 0.08em; text-transform: uppercase;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: white;
  line-height: 1.1; margin-bottom: 1.5rem;
`;

const Desc = styled(motion.p)`
  font-size: 19px; color: #94A3B8; line-height: 1.7; margin-bottom: 2.5rem; max-width: 620px;
`;

const HeroCTA = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem; background: ${GRADIENT};
  color: white; font-weight: 700; font-size: 16px; padding: 0.875rem 1.75rem;
  border-radius: 12px; box-shadow: 0 6px 20px rgba(236,72,153,0.3);
`;

const Section = styled.section`
  padding: 7rem 0;
  background: ${props => props.$gray ? '#F8FAFC' : props.$dark ? '#0F172A' : 'white'};
`;

const TwoCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const SectionLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${props => props.$light ? '#F9A8D4' : '#EC4899'}; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem); font-weight: 800;
  color: ${props => props.$light ? 'white' : '#0F172A'}; margin-bottom: 1.25rem; line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px; color: ${props => props.$light ? '#94A3B8' : '#475569'}; line-height: 1.7; margin-bottom: 1.25rem;
`;

const Checks = styled.div`
  display: flex; flex-direction: column; gap: 0.75rem;
`;

const CheckRow = styled.div`
  display: flex; align-items: flex-start; gap: 0.75rem; font-size: 15px;
  color: ${props => props.$light ? '#CBD5E1' : '#334155'};
  svg { color: #10B981; flex-shrink: 0; margin-top: 2px; }
`;

const PhaseGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const PhaseCard = styled(motion.div)`
  padding: 2rem 1.5rem;
  border-right: 1px solid #F1F5F9;
  position: relative;

  &:last-child { border-right: none; }

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid #F1F5F9;
    &:last-child { border-bottom: none; }
  }
`;

const PhaseNum = styled.div`
  font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
  color: #3B82F6; margin-bottom: 1rem;
`;

const PhaseIcon = styled.div`
  width: 44px; height: 44px; border-radius: 12px; background: ${props => props.$color}14;
  display: flex; align-items: center; justify-content: center; color: ${props => props.$color}; margin-bottom: 1rem;
`;

const PhaseTitle = styled.h3`
  font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem;
`;

const PhaseDesc = styled.p`
  font-size: 13px; color: #64748B; line-height: 1.6;
`;

/* ─── Stats banner ─── */
const StatsBanner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #0F172A;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCell = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.07);
  &:last-child { border-right: none; }
  @media (max-width: 900px) {
    &:nth-child(2n) { border-right: none; }
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
`;

const StatNum = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.4rem;
`;

const StatText = styled.div`
  font-size: 13px;
  color: #64748B;
  line-height: 1.4;
`;

/* ─── Pricing / model cards ─── */
const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const PricingCard = styled(motion.div)`
  border-radius: 24px;
  padding: 2.5rem;
  border: 2px solid ${props => props.$featured ? 'rgba(236,72,153,0.4)' : '#F1F5F9'};
  background: ${props => props.$featured ? 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(139,92,246,0.06))' : 'white'};
  position: relative;
`;

const PricingBadge = styled.div`
  display: inline-block;
  background: ${GRADIENT};
  color: white;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
`;

const PricingTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const PricingDesc = styled.div`
  font-size: 15px;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const PricingFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const PricingFeature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 14px;
  color: #334155;
  svg { color: #10B981; flex-shrink: 0; margin-top: 2px; }
`;

const PricingCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.$featured ? GRADIENT : '#F8FAFC'};
  color: ${props => props.$featured ? 'white' : '#334155'};
  font-weight: 700;
  font-size: 15px;
  padding: 0.8rem 1.75rem;
  border-radius: 12px;
  border: ${props => props.$featured ? 'none' : '1.5px solid #E2E8F0'};
`;

const ValueGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const ValueCard = styled(motion.div)`
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 2rem;
`;

const ValueIcon = styled.div`
  width: 44px; height: 44px; border-radius: 12px; background: ${props => props.$color}22;
  display: flex; align-items: center; justify-content: center; color: ${props => props.$color}; margin-bottom: 1.25rem;
`;

const ValueTitle = styled.h3`
  font-size: 16px; font-weight: 700; color: white; margin-bottom: 0.5rem;
`;

const ValueDesc = styled.p`
  font-size: 14px; color: #64748B; line-height: 1.6;
`;

/* ─── ROI examples ─── */
const ROIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ROICard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1.5px solid #F1F5F9;
  transition: all 0.25s ease;
  &:hover { border-color: rgba(236,72,153,0.3); box-shadow: 0 6px 24px rgba(236,72,153,0.08); transform: translateY(-4px); }
`;

const ROIStat = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.4rem;
  line-height: 1;
`;

const ROILabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ROIDesc = styled.div`
  font-size: 13px;
  color: #64748B;
  line-height: 1.5;
`;

const CTACard = styled(motion.div)`
  background: ${GRADIENT}; border-radius: 24px; padding: 4rem; text-align: center;
  h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 1rem; }
  p  { font-size: 17px; color: rgba(255,255,255,0.85); margin-bottom: 2rem; }
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const BtnRow = styled.div`
  display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
`;

const BtnWhite = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem; background: white;
  color: #EC4899; font-weight: 700; font-size: 15px; padding: 0.8rem 1.75rem; border-radius: 10px;
`;

const BtnOutline = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.3); color: white; font-weight: 600; font-size: 15px;
  padding: 0.775rem 1.625rem; border-radius: 10px;
`;

function AIBusinessPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const phases = [
    { icon: Search, color: '#3B82F6', num: isNL ? 'FASE 01' : 'PHASE 01', title: isNL ? 'AI Audit' : 'AI Audit', desc: isNL ? 'Wij analyseren elk bedrijfsproces en identificeren waar AI de grootste impact maakt.' : 'We analyse every business process and identify where AI makes the greatest impact.' },
    { icon: Cpu, color: '#10B981', num: isNL ? 'FASE 02' : 'PHASE 02', title: isNL ? 'Strategie & Roadmap' : 'Strategy & Roadmap', desc: isNL ? 'Een concrete AI-roadmap met prioriteiten, tijdlijn en verwachte ROI per initiatief.' : 'A concrete AI roadmap with priorities, timeline and expected ROI per initiative.' },
    { icon: Rocket, color: '#EC4899', num: isNL ? 'FASE 03' : 'PHASE 03', title: isNL ? 'Implementatie' : 'Implementation', desc: isNL ? 'Wij bouwen en implementeren alle AI-oplossingen , van agents tot automatisering.' : 'We build and implement all AI solutions , from agents to automation.' },
    { icon: BarChart3, color: '#F59E0B', num: isNL ? 'FASE 04' : 'PHASE 04', title: isNL ? 'Optimalisatie & Groei' : 'Optimisation & Growth', desc: isNL ? 'Continu meten, bijsturen en uitbreiden. Wij blijven je AI-partner op de lange termijn.' : 'Continuously measuring, adjusting and expanding. We remain your long-term AI partner.' },
  ];

  const values = [
    { icon: TrendingUp, color: '#10B981', title: isNL ? 'Meetbare ROI' : 'Measurable ROI', desc: isNL ? 'Elke investering wordt gekoppeld aan concrete KPIs en meetbare bedrijfsresultaten.' : 'Every investment is linked to concrete KPIs and measurable business results.' },
    { icon: Users, color: '#3B82F6', title: isNL ? 'Langetermijn partner' : 'Long-term partner', desc: isNL ? 'Geen eenmalig project, wij worden onderdeel van je organisatie en groeien mee.' : 'No one-off project, we become part of your organisation and grow with you.' },
    { icon: Shield, color: '#EC4899', title: isNL ? 'Vertrouwelijk & veilig' : 'Confidential & secure', desc: isNL ? 'Je data en bedrijfsprocessen zijn veilig bij ons. Privacy en security staan voorop.' : 'Your data and business processes are safe with us. Privacy and security are paramount.' },
  ];

  const checks = isNL ? [
    'Volledig bedrijfsbreed AI-programma op maat',
    'Cross-functionele samenwerking met je teams',
    'Geen verstoring van bestaande processen',
    'Training en kennisoverdracht voor je medewerkers',
    'Maandelijkse voortgangsrapportages en bijsturing',
    'Doorlopende optimalisaties en nieuwe kansen identificeren',
  ] : [
    'Fully company-wide custom AI programme',
    'Cross-functional collaboration with your teams',
    'No disruption to existing processes',
    'Training and knowledge transfer for your employees',
    'Monthly progress reports and adjustments',
    'Ongoing optimisations and identifying new opportunities',
  ];

  const roiExamples = isNL ? [
    { stat: '40%', label: 'Efficiencystijging', desc: 'Gemiddelde verhoging van operationele efficieny bij onze AI Business klanten' },
    { stat: '6 mnd', label: 'Terugverdientijd', desc: 'Gemiddelde terugverdientijd van de volledige AI-investering' },
    { stat: '3×', label: 'Meer output', desc: 'Teams produceren gemiddeld 3× meer met hetzelfde aantal medewerkers' },
  ] : [
    { stat: '40%', label: 'Efficiency gain', desc: 'Average increase in operational efficiency among our AI Business clients' },
    { stat: '6 mo', label: 'Payback period', desc: 'Average payback period for the full AI investment' },
    { stat: '3×', label: 'More output', desc: 'Teams produce an average of 3× more with the same number of employees' },
  ];

  const projectFeatures = isNL ? [
    'Eenmalige AI-implementatie voor een specifiek proces',
    'Vaste prijs, helder afgesproken deliverables',
    'Oplevering binnen 4-8 weken',
    'Inclusief documentatie en training',
    'Post-launch support voor 30 dagen',
  ] : [
    'One-time AI implementation for a specific process',
    'Fixed price, clearly agreed deliverables',
    'Delivery within 4-8 weeks',
    'Including documentation and training',
    'Post-launch support for 30 days',
  ];

  const retainerFeatures = isNL ? [
    'Doorlopende AI-optimalisatie van je gehele bedrijf',
    'Maandelijks vaste uren toegewijd aan je organisatie',
    'Proactieve identificatie van nieuwe AI-kansen',
    'Prioriteit bij nieuwe ontwikkelingen en updates',
    'Kwartaal AI-audit en roadmap bijstelling',
    'Dedicated contactpersoon en weekelijkse updates',
  ] : [
    'Ongoing AI optimisation of your entire business',
    'Monthly fixed hours dedicated to your organisation',
    'Proactive identification of new AI opportunities',
    'Priority access to new developments and updates',
    'Quarterly AI audit and roadmap adjustment',
    'Dedicated contact person and weekly updates',
  ];

  return (
    <>
      <SEOHead
        title="AI voor Bedrijven | Optivaize, De Bilt"
        description="AI-strategie en implementatie voor je bedrijf. Optivaize helpt organisaties in heel Nederland met AI-transformatie vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/ai-business"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'AI Business', url: 'https://optivaize.nl/ai-business' }
        ]}
      />
      <PageHero>
        <Container>
          <HeroInner>
            <Breadcrumb>
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>{isNL ? 'Diensten' : 'Services'}</span>
              <ChevronRight size={14} />
              <span>AI Business</span>
            </Breadcrumb>
            <Badge><Building2 size={12} /> AI Business Transformatie</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {isNL ? (
                <>Je hele bedrijf. <span style={{ color: '#F9A8D4' }}>Getransformeerd door AI.</span></>
              ) : (
                <>Your entire business. <span style={{ color: '#F9A8D4' }}>Transformed by AI.</span></>
              )}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {isNL
                ? 'Wij gaan door je gehele organisatie, van marketing tot operaties, en implementeren AI op elk niveau. Wij geloven dat elk bedrijf beter kan worden en werken op lange termijn samen voor bewezen resultaat.'
                : 'We go through your entire organisation , from marketing to operations , and implement AI at every level. We believe every business can improve and work long-term together for proven results.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {isNL ? 'Start de transformatie' : 'Start the transformation'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* Stats */}
      <Section>
        <Container>
          <FadeIn>
            <StatsBanner>
              <StatCell><StatNum>40%</StatNum><StatText>{isNL ? 'Gemiddelde efficiencyverbetering' : 'Average efficiency improvement'}</StatText></StatCell>
              <StatCell><StatNum>6 mnd</StatNum><StatText>{isNL ? 'Gemiddelde terugverdientijd' : 'Average payback period'}</StatText></StatCell>
              <StatCell><StatNum>50+</StatNum><StatText>{isNL ? 'Bedrijven getransformeerd' : 'Businesses transformed'}</StatText></StatCell>
              <StatCell><StatNum>3×</StatNum><StatText>{isNL ? 'Meer output, zelfde team' : 'More output, same team'}</StatText></StatCell>
            </StatsBanner>
          </FadeIn>
        </Container>
      </Section>

      {/* Phases */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Ons proces' : 'Our process'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Van audit tot volledig AI-bedrijf' : 'From audit to fully AI-powered business'}</SectionTitle></FadeIn>
          </div>
          <FadeIn>
            <PhaseGrid>
              {phases.map((phase, i) => {
                const Icon = phase.icon;
                return (
                  <PhaseCard key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <PhaseNum>{phase.num}</PhaseNum>
                    <PhaseIcon $color={phase.color}><Icon size={20} /></PhaseIcon>
                    <PhaseTitle>{phase.title}</PhaseTitle>
                    <PhaseDesc>{phase.desc}</PhaseDesc>
                  </PhaseCard>
                );
              })}
            </PhaseGrid>
          </FadeIn>
        </Container>
      </Section>

      {/* Main content */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'Onze aanpak' : 'Our approach'}</SectionLabel>
              <SectionTitle>{isNL ? 'Wij geloven dat elk bedrijf kan worden verbeterd met AI' : 'We believe every business can be improved with AI'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Geen generieke adviezen, wij duiken diep in je specifieke situatie, identificeren de grootste kansen en bouwen oplossingen die echt werken voor je organisatie.'
                  : 'No generic advice , we dive deep into your specific situation, identify the biggest opportunities and build solutions that actually work for your organisation.'}
              </SectionText>
              <Checks>
                {checks.map((c, i) => <CheckRow key={i}><CheckCircle size={16} />{c}</CheckRow>)}
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/optivaize_office_outside.webp" alt="Optivaize office" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ROI examples */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Bewezen resultaten' : 'Proven results'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Wat AI Business oplevert' : 'What AI Business delivers'}</SectionTitle></FadeIn>
          </div>
          <ROIGrid>
            {roiExamples.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ROICard whileHover={{ y: -4 }}>
                  <ROIStat>{r.stat}</ROIStat>
                  <ROILabel>{r.label}</ROILabel>
                  <ROIDesc>{r.desc}</ROIDesc>
                </ROICard>
              </FadeIn>
            ))}
          </ROIGrid>
        </Container>
      </Section>

      {/* Pricing model */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Samenwerkingsmodellen' : 'Collaboration models'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Project of doorlopende samenwerking' : 'Project or ongoing collaboration'}</SectionTitle></FadeIn>
            <FadeIn delay={0.1}><p style={{ fontSize: 17, color: '#64748B', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              {isNL
                ? 'Wij werken zowel op projectbasis als via een doorlopende retainer. Voor maximale impact adviseren wij een langetermijn samenwerking.'
                : 'We work both on a project basis and via an ongoing retainer. For maximum impact we recommend a long-term collaboration.'}
            </p></FadeIn>
          </div>
          <PricingGrid>
            <FadeIn>
              <PricingCard>
                <PricingBadge style={{ background: '#F8FAFC', color: '#334155', border: '1px solid #E2E8F0' }}>
                  {isNL ? 'Project' : 'Project'}
                </PricingBadge>
                <PricingTitle>{isNL ? 'Eenmalige implementatie' : 'One-time implementation'}</PricingTitle>
                <PricingDesc>
                  {isNL
                    ? 'Ideaal voor een specifiek AI-vraagstuk met een duidelijk einddoel en afgebakende scope.'
                    : 'Ideal for a specific AI challenge with a clear end goal and defined scope.'}
                </PricingDesc>
                <PricingFeatures>
                  {projectFeatures.map((f, i) => (
                    <PricingFeature key={i}><CheckCircle size={15} />{f}</PricingFeature>
                  ))}
                </PricingFeatures>
                <PricingCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }}>
                  {isNL ? 'Bespreek je project' : 'Discuss your project'} <ArrowRight size={15} />
                </PricingCTA>
              </PricingCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <PricingCard $featured>
                <PricingBadge>{isNL ? 'Aanbevolen' : 'Recommended'}</PricingBadge>
                <PricingTitle>{isNL ? 'Doorlopende retainer' : 'Ongoing retainer'}</PricingTitle>
                <PricingDesc>
                  {isNL
                    ? 'Wij worden je vaste AI-partner en optimaliseren je bedrijf maandelijks. Maximale impact, continu verbeteren.'
                    : 'We become your permanent AI partner and optimise your business monthly. Maximum impact, continuous improvement.'}
                </PricingDesc>
                <PricingFeatures>
                  {retainerFeatures.map((f, i) => (
                    <PricingFeature key={i}><CheckCircle size={15} />{f}</PricingFeature>
                  ))}
                </PricingFeatures>
                <PricingCTA $featured href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }}>
                  {isNL ? 'Start langetermijn samenwerking' : 'Start long-term collaboration'} <ArrowRight size={15} />
                </PricingCTA>
              </PricingCard>
            </FadeIn>
          </PricingGrid>
        </Container>
      </Section>

      {/* Values (dark) */}
      <Section $dark>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel $light style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Onze belofte' : 'Our promise'}</SectionLabel>
            <FadeIn><SectionTitle $light style={{ textAlign: 'center' }}>{isNL ? 'Wat je van ons kunt verwachten' : 'What you can expect from us'}</SectionTitle></FadeIn>
          </div>
          <ValueGrid>
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <ValueCard whileHover={{ y: -4 }}>
                    <ValueIcon $color={v.color}><Icon size={20} /></ValueIcon>
                    <ValueTitle>{v.title}</ValueTitle>
                    <ValueDesc>{v.desc}</ValueDesc>
                  </ValueCard>
                </FadeIn>
              );
            })}
          </ValueGrid>
        </Container>
      </Section>

      {/* Image + use case section */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn delay={0.1}>
              <Image src="/images/max_ai_presentatie.webp" alt="AI implementatie" width={800} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
            <FadeIn>
              <SectionLabel>{isNL ? 'Toepassingsgebieden' : 'Areas of application'}</SectionLabel>
              <SectionTitle>{isNL ? 'AI in elk onderdeel van je organisatie' : 'AI in every part of your organisation'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Van marketing en sales tot HR, finance en operations, wij identificeren en implementeren AI-kansen in elk onderdeel van je bedrijf.'
                  : 'From marketing and sales to HR, finance and operations , we identify and implement AI opportunities in every part of your business.'}
              </SectionText>
              <Checks>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Marketing: content, SEO, social en advertenties geautomatiseerd' : 'Marketing: content, SEO, social and ads automated'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Sales: prospecting, kwalificatie en follow-up op AI-autopilot' : 'Sales: prospecting, qualification and follow-up on AI autopilot'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Operations: workflows, rapportages en platform-integraties' : 'Operations: workflows, reports and platform integrations'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Finance: AI-analyse van cashflow, prognoses en anomaliedetectie' : 'Finance: AI analysis of cashflow, forecasts and anomaly detection'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'HR: AI-assisted recruiting, onboarding en kennismanagement' : 'HR: AI-assisted recruiting, onboarding and knowledge management'}</CheckRow>
              </Checks>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{isNL ? 'Klaar voor de volgende stap?' : 'Ready for the next step?'}</h2>
              <p>{isNL ? 'Plan een gratis strategiegesprek. Wij analyseren je bedrijf en vertellen je precies welke AI-kansen er liggen.' : 'Book a free strategy call. We analyse your business and tell you exactly which AI opportunities exist.'}</p>
              <BtnRow>
                <BtnWhite href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Vul het formulier in' : 'Fill in the form'} <ArrowRight size={16} />
                </BtnWhite>
                <BtnOutline href="tel:+31642698918" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Bel ons direct' : 'Call us directly'}
                </BtnOutline>
              </BtnRow>
            </CTACard>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}

export default AIBusinessPage;

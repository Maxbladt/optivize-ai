'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from '../components/Link';
import {
  GraduationCap, ArrowRight, CheckCircle, RefreshCw
} from 'lucide-react';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #F97316, #EF4444)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Hero ─── */
const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #1A0A00, #2D1200);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(249,115,22,0.12), transparent),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(239,68,68,0.08), transparent);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(249,115,22,0.12);
  border: 1px solid rgba(249,115,22,0.3);
  color: #FB923C;
  font-size: 12px;
  font-weight: 700;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.1;
`;

const GradientText = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSub = styled(motion.p)`
  font-size: 18px;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 2rem;
`;

const HeroBtns = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BtnPrimary = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(249,115,22,0.35);
`;

const BtnSecondary = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
`;

/* ─── Level card visual ─── */
const LevelCards = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const LevelCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1.125rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LevelDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${p => p.$color};
  flex-shrink: 0;
  box-shadow: 0 0 0 4px ${p => p.$color}25;
`;

const LevelInfo = styled.div`
  flex: 1;
  .title { font-size: 14px; font-weight: 700; color: white; margin-bottom: 2px; }
  .desc { font-size: 12px; color: rgba(255,255,255,0.45); }
`;

const LevelBar = styled.div`
  width: 80px;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${p => p.$pct}%;
    background: ${p => p.$color};
    border-radius: 3px;
    transition: width 1s ease;
  }
`;

/* ─── Sections ─── */
const Section = styled.section`
  padding: 7rem 0;
  background: ${p => p.$dark ? '#0F172A' : p.$gray ? '#F8FAFC' : 'white'};
`;

const SectionLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${p => p.$light ? '#FB923C' : '#F97316'}; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800;
  color: ${p => p.$light ? 'white' : '#0F172A'};
  margin-bottom: 1.25rem; line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px; color: ${p => p.$light ? 'rgba(255,255,255,0.65)' : '#475569'};
  line-height: 1.7; margin-bottom: 1.25rem;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const CheckList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2rem;
`;

const CheckItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 15px;
  color: ${p => p.$light ? 'rgba(255,255,255,0.75)' : '#334155'};
  line-height: 1.55;
  svg { flex-shrink: 0; margin-top: 2px; }
`;

/* ─── Phase cards ─── */
const PhaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const PhaseCard = styled(motion.div)`
  background: white;
  border: 1.5px solid #F1F5F9;
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${p => p.$gradient};
  }
`;

const PhaseNum = styled.div`
  font-size: 3rem;
  font-weight: 900;
  background: ${p => p.$gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  line-height: 1;
`;

const PhaseTitle = styled.div`
  font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 0.625rem;
`;

const PhaseText = styled.p`
  font-size: 14px; color: #64748B; line-height: 1.6;
`;

/* ─── Tools grid ─── */
const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  @media (max-width: 768px) { grid-template-columns: repeat(3, 1fr); }
`;

const ToolCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 1.25rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

const ToolLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${p => p.$bg || 'rgba(255,255,255,0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img { width: 24px; height: 24px; object-fit: contain; }
  span { font-size: 14px; font-weight: 800; color: white; }
`;

const ToolName = styled.div`
  font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.55);
`;

/* ─── Quote ─── */
const QuoteSection = styled.section`
  padding: 6rem 0;
  background: ${GRADIENT};
  text-align: center;
`;

const Quote = styled.div`
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 900;
  color: white;
  line-height: 1.25;
  max-width: 700px;
  margin: 0 auto 0.75rem;
  letter-spacing: -0.01em;
`;

const QuoteSub = styled.div`
  font-size: 16px;
  color: rgba(255,255,255,0.75);
  font-style: italic;
`;

/* ─── Recurring section ─── */
const RecurringCard = styled(motion.div)`
  background: rgba(249,115,22,0.06);
  border: 1px solid rgba(249,115,22,0.18);
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  @media (max-width: 768px) { flex-direction: column; }
`;

const RecurringIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(249,115,22,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FB923C;
  flex-shrink: 0;
`;

/* ─── CTA ─── */
const CTASection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const CTABox = styled(motion.div)`
  background: linear-gradient(135deg, #1A0A00, #2D1200);
  border-radius: 28px;
  padding: 4rem;
  text-align: center;
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
`;

const CTABtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.95rem 2rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 8px 24px rgba(249,115,22,0.35);
`;

function TrainingPage() {

  const levels = [
    { title: 'Beginners', desc: 'Geen AI-kennis vereist', color: '#10B981', pct: 25 },
    { title: 'Intermediair', desc: 'Al wat ervaring met tools', color: '#3B82F6', pct: 55 },
    { title: 'Gevorderd', desc: 'Werkt al met AI dagelijks', color: '#8B5CF6', pct: 80 },
    { title: 'Management', desc: 'Strategisch AI-leiderschap', color: '#F59E0B', pct: 65 },
  ];

  const phases = [
    {
      num: '01', gradient: 'linear-gradient(135deg, #F97316, #EF4444)',
      title: 'Nulmeting & kenniskaart', text: 'Wij starten met een assessment per afdeling. Wie weet al wat? Waar zitten de grootste kansen? Dit geeft ons een scherp beeld van waar we kunnen versnellen.',
    },
    {
      num: '02', gradient: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
      title: 'Maatwerk training', text: 'Per afdeling of team geven wij gerichte sessies. Geen generieke cursus, maar training die aansluit op je specifieke werkzaamheden, tools en uitdagingen.',
    },
    {
      num: '03', gradient: 'linear-gradient(135deg, #10B981, #06B6D4)',
      title: 'Stakeholder buy-in', text: 'AI-adoptie lukt alleen als mensen het willen gebruiken. Wij zorgen voor draagvlak door mensen te laten ervaren hoe AI hen helpt, niet vervangt. Dit is onze specialiteit.',
    },
  ];

  const tools = [
    { name: 'ChatGPT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/960px-ChatGPT-Logo.svg.png', bg: '#10A37F' },
    { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/FFFFFF', bg: '#D97706' },
    { name: 'Copilot', logo: '/images/copilot_logo.jpg', bg: '#0078D4' },
    { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/FFFFFF', bg: '#1C1C1E' },
    { name: 'Midjourney', logo: '/images/midjourney_logo.webp', bg: '#1A1A2E' },
    { name: 'Notion AI', logo: 'https://cdn.simpleicons.org/notion/FFFFFF', bg: '#000000' },
    { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n/FFFFFF', bg: '#EA4B71' },
    { name: 'Make', logo: 'https://cdn.simpleicons.org/make/FFFFFF', bg: '#6D28D9' },
    { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier/FFFFFF', bg: '#FF4A00' },
    { name: 'OpenClaw', logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/openclaw.png', bg: '#1E293B' },
  ];

  return (
    <>
      <SEOHead
        title="AI Training en Workshops | Optivaize, De Bilt"
        description="AI-trainingen en workshops voor teams. Leer effectief werken met AI-tools. Optivaize verzorgt praktische AI-cursussen vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/ai-training"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'AI Training', url: 'https://optivaize.nl/ai-training' }
        ]}
      />
      {/* ── HERO ── */}
      <PageHero>
        <Container>
          <HeroGrid>
            <div>
              <HeroBadge>
                <GraduationCap size={12} />
                {'AI Training · Optivaize'}
              </HeroBadge>
              <H1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {<>Je team klaarstomen voor het <GradientText>AI-tijdperk</GradientText></>}
              </H1>
              <HeroSub initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                Wij meten eerst je huidige AI-kennis, geven dan maatwerk training per afdeling en bouwen structurele AI-adoptie op over tijd. Want AI-kennis bouw je niet in één dag.
              </HeroSub>
              <HeroBtns>
                <BtnPrimary
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {'Plan gratis intake'}
                  <ArrowRight size={16} />
                </BtnPrimary>
                <BtnSecondary href="/cases" whileHover={{ scale: 1.02 }}>
                  {'Bekijk cases'}
                </BtnSecondary>
              </HeroBtns>
            </div>
            <LevelCards initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, marginBottom: '0.5rem' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  {'Kennismeting per niveau'}
                </div>
                {levels.map((l, i) => (
                  <LevelCard key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.5 }}>
                    <LevelDot $color={l.color} />
                    <LevelInfo>
                      <div className="title">{l.title}</div>
                      <div className="desc">{l.desc}</div>
                    </LevelInfo>
                    <LevelBar $pct={l.pct} $color={l.color} />
                  </LevelCard>
                ))}
              </div>
              <div style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 12, padding: '0.875rem 1.125rem', display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <RefreshCw size={14} color="#FB923C" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FB923C' }}>
                  {'Maandelijkse herhalende sessies inbegrepen'}
                </span>
              </div>
            </LevelCards>
          </HeroGrid>
        </Container>
      </PageHero>

      {/* ── QUOTE ── */}
      <QuoteSection>
        <Container>
          <FadeIn>
            <Quote>{'"AI gaat mensen niet vervangen, mensen die AI gebruiken wel."'}</Quote>
            <QuoteSub>- Maximilian Bladt, CEO Optivaize</QuoteSub>
          </FadeIn>
        </Container>
      </QuoteSection>

      {/* ── 3 PHASES ── */}
      <Section $gray>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel>{'Onze aanpak'}</SectionLabel>
              <SectionTitle>
                {'Drie fases naar structurele AI-adoptie'}
              </SectionTitle>
              <SectionText style={{ maxWidth: 560, margin: '0 auto' }}>
                Wij geloven dat AI-kennis wordt opgebouwd over tijd, niet in één workshop. Daarom werken wij in fases met terugkerende sessies.
              </SectionText>
            </div>
          </FadeIn>
          <PhaseGrid>
            {phases.map((p, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <PhaseCard $gradient={p.gradient} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <PhaseNum $gradient={p.gradient}>{p.num}</PhaseNum>
                  <PhaseTitle>{p.title}</PhaseTitle>
                  <PhaseText>{p.text}</PhaseText>
                </PhaseCard>
              </FadeIn>
            ))}
          </PhaseGrid>
        </Container>
      </Section>

      {/* ── WHAT WE DO ── */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <Image src="/images/max_ai_presentatie_2.webp" alt="AI Training sessie" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
            <FadeIn delay={0.15}>
              <SectionLabel>{'Wat we doen'}</SectionLabel>
              <SectionTitle>
                {'Van presentatie tot hands-on workshop'}
              </SectionTitle>
              <SectionText>
                {'Wij bezoeken je bedrijf en starten met een presentatie voor het management: wat kan AI, wat kost het, wat levert het op? Daarna gaan we per afdeling dieper in op de specifieke kansen.'}
              </SectionText>
              <SectionText>
                {'Onze trainingen zijn praktisch van aard. Geen PowerPoints over het belang van AI , maar hands-on sessies waarbij medewerkers direct leren werken met de tools die hun werk veranderen.'}
              </SectionText>
              <CheckList>
                {([
                  'Kick-off presentatie voor management & stakeholders',
                  'Afdelingssessies op maat (sales, marketing, ops, HR)',
                  'Hands-on training met ChatGPT, Claude, Copilot & meer',
                  'Custom GPTs bouwen voor specifieke taken',
                  'Praktische handleiding & toolkit na de training',
                  'Maandelijkse follow-up sessies voor blijvende adoptie',
                ]).map((item, i) => (
                  <CheckItem key={i}>
                    <CheckCircle size={18} color="#F97316" />
                    {item}
                  </CheckItem>
                ))}
              </CheckList>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ── RECURRING ── */}
      <Section $gray>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>{'Langetermijn'}</SectionLabel>
              <SectionTitle>
                {'AI-kennis is nooit klaar'}
              </SectionTitle>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <RecurringCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <RecurringIcon><RefreshCw size={28} /></RecurringIcon>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: '0.625rem' }}>
                  {'Maandelijkse terugkerende sessies'}
                </div>
                <SectionText style={{ marginBottom: 0 }}>
                  AI evolueert razendsnel. Een training van vandaag is over 6 maanden al deels verouderd. Daarom organiseren wij maandelijkse update-sessies waar we de nieuwste tools, workflow-verbeteringen en best practices bespreken. Je team blijft altijd aan de top van AI-ontwikkeling, niet alleen na de eerste training.
                </SectionText>
              </div>
            </RecurringCard>
          </FadeIn>
        </Container>
      </Section>

      {/* ── TOOLS WE TRAIN ── */}
      <Section $dark>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionLabel $light>{'Tools'}</SectionLabel>
              <SectionTitle $light>
                {<>Wij trainen je team op deze leading AI-tools <span style={{ color: '#FB923C' }}>+ 30 meer</span></>}
              </SectionTitle>
            </div>
          </FadeIn>
          <ToolsGrid>
            {tools.map((t, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <ToolCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <ToolLogo $bg={t.bg}>
                    {t.logo
                      ? <img src={t.logo} alt={t.name} />
                      : <span>{t.letter}</span>}
                  </ToolLogo>
                  <ToolName>{t.name}</ToolName>
                </ToolCard>
              </FadeIn>
            ))}
          </ToolsGrid>
        </Container>
      </Section>

      {/* ── CASE: AANHUIS ── */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{'Case studie'}</SectionLabel>
              <SectionTitle>
                {'Hoe Aanhuis 20% efficiënter werd met AI'}
              </SectionTitle>
              <SectionText>
                Aanhuis benaderde ons met een duidelijke vraag: help ons team efficiënter werken met AI, zonder dat medewerkers het gevoel krijgen dat ze vervangen worden. Dat is precies ons specialisme.
              </SectionText>
              <SectionText>
                {'Wij startten met een management presentatie gevolgd door afdelingssessies. We bouwden custom GPTs voor e-mail, offertes en interne rapportages. Het resultaat: 20% tijdwinst op e-mailwerk, volledig team-brede adoptie en een ongoing relatie voor continue verbetering.'}
              </SectionText>
              <CheckList>
                {([
                  '20% tijdwinst op e-mailwerk gerealiseerd',
                  'Custom GPTs gebouwd voor alle afdelingen',
                  'Volledige team-adoptie binnen 6 weken',
                  'Maandelijkse follow-up sessies ingepland',
                ]).map((item, i) => (
                  <CheckItem key={i}>
                    <CheckCircle size={18} color="#F97316" />
                    {item}
                  </CheckItem>
                ))}
              </CheckList>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/aanhuis_voorkant.webp" alt="Aanhuis AI training" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <CTASection>
        <Container>
          <FadeIn>
            <CTABox initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionLabel $light style={{ color: '#FB923C' }}>
                {'Klaar voor de volgende stap?'}
              </SectionLabel>
              <CTATitle>
                {'Laat je team de top van AI-ontwikkeling omarmen'}
              </CTATitle>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                {'Wij starten met een gratis intake om je huidige kennis te meten en het meest impactvolle trainingsplan te ontwerpen.'}
              </p>
              <CTABtn
                href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {'Plan gratis intake'}
                <ArrowRight size={17} />
              </CTABtn>
            </CTABox>
          </FadeIn>
        </Container>
      </CTASection>
    </>
  );
}

export default TrainingPage;

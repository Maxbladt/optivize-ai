'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone, Mail, Bot, Code2, TrendingUp, Terminal, Zap, Cpu } from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';

/**
 * HomePage_composio
 * Developer-dark / Composio-inspired variant.
 * Design system: void-black canvas, white-opacity borders, ultra-tight heading
 * line-heights, dual abcDiatype + JetBrains Mono identity, hard-offset brutalist
 * shadows, glow-accent strategy.
 * Brand bridge: Composio's electric cyan is replaced with Optivaize's
 * blue→green gradient, used for the primary CTA + glow halos.
 */

const VOID_BLACK = '#0f0f0f';
const PURE_BLACK = '#000000';
const SURFACE_DEEP = '#161616';
const CHARCOAL = '#2c2c2c';
const PURE_WHITE = '#ffffff';
const GHOST = 'rgba(255,255,255,0.6)';
const WHISPER = 'rgba(255,255,255,0.5)';
const PHANTOM = 'rgba(255,255,255,0.2)';
const MIST_12 = 'rgba(255,255,255,0.12)';
const MIST_10 = 'rgba(255,255,255,0.10)';
const MIST_08 = 'rgba(255,255,255,0.08)';
const MIST_06 = 'rgba(255,255,255,0.06)';

// Optivaize bridge colors (replacing Composio cyan/cobalt)
const OPTI_BLUE = '#3B82F6';
const OPTI_GREEN = '#10B981';
const OPTI_GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const SANS = "'abcDiatype', 'Inter', system-ui, -apple-system, Arial, sans-serif";
const MONO = "'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace";

/* ============== LAYOUT ============== */
const Page = styled.div`
  background: ${VOID_BLACK};
  color: ${PURE_WHITE};
  font-family: ${SANS};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1.25rem; }
`;

const Section = styled.section`
  padding: ${(p) => p.$pad || '110px 0'};
  background: ${(p) => p.$bg || VOID_BLACK};
  position: relative;
  @media (max-width: 768px) { padding: ${(p) => p.$padMobile || '70px 0'}; }
`;

function FadeIn({ children, delay = 0, y = 16 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

/* ============== GLOW (radial blue/green halo) ============== */
const HeroGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 50% at 25% 30%, rgba(59,130,246,0.18), transparent 60%),
    radial-gradient(ellipse 40% 50% at 80% 70%, rgba(16,185,129,0.14), transparent 60%);
  pointer-events: none;
`;

/* ============== HERO ============== */
const Hero = styled(Section)`
  padding: 200px 0 110px;
  overflow: hidden;
  @media (max-width: 768px) { padding: 140px 0 70px; }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2.5rem; }
`;

const HeroOverline = styled.div`
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 400;
  color: ${GHOST};
  letter-spacing: 0.3px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  &::before { content: '> '; color: ${OPTI_BLUE}; }
`;

const HeroH1 = styled.h1`
  font-family: ${SANS};
  font-weight: 400;
  font-size: clamp(2.5rem, 5.6vw, 4.4rem);
  line-height: 0.92;
  letter-spacing: -0.02em;
  margin: 0 0 1.6rem;
  color: ${PURE_WHITE};
`;

const HeroAccent = styled.span`
  background: ${OPTI_GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const HeroSub = styled.p`
  font-family: ${SANS};
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  line-height: 1.55;
  color: ${GHOST};
  max-width: 520px;
  margin: 0 0 2rem;
`;

const CtaRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${OPTI_GRADIENT};
  color: white;
  text-decoration: none;
  padding: 0.85rem 1.6rem;
  border-radius: 4px;
  font-family: ${SANS};
  font-size: 1rem;
  font-weight: 500;
  box-shadow: rgba(0,0,0,0.4) 4px 4px 0px 0px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: rgba(0,0,0,0.4) 6px 6px 0px 0px;
  }
`;

const GhostCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${PURE_WHITE};
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 4px;
  font-family: ${SANS};
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid ${MIST_12};
  transition: border-color 0.18s ease, background 0.18s ease;
  &:hover { border-color: ${OPTI_BLUE}; background: rgba(59,130,246,0.08); }
`;

const HeroVisual = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_12};
  box-shadow: rgba(0,0,0,0.6) 4px 4px 0px 0px, 0 30px 60px rgba(0,0,0,0.5);
  & img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.92; }
  @media (max-width: 768px) { aspect-ratio: 5/3; }
`;

const HeroVisualOverlay = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 30% 30%, rgba(59,130,246,0.20), transparent 60%),
    radial-gradient(ellipse 60% 40% at 70% 80%, rgba(16,185,129,0.16), transparent 60%);
  pointer-events: none;
`;

/* ============== STATS BAR (mono) ============== */
const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 4rem;
  border-top: 1px solid ${MIST_08};
  border-bottom: 1px solid ${MIST_08};
  padding: 1.5rem 0;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); gap: 1.5rem 0; }
`;

const StatCell = styled.div`
  text-align: center;
  border-right: 1px solid ${MIST_06};
  padding: 0.5rem 0;
  &:last-child { border-right: none; }
  @media (max-width: 768px) { border-right: none; }
`;

const StatNum = styled.div`
  font-family: ${MONO};
  font-size: 1.85rem;
  font-weight: 400;
  color: ${PURE_WHITE};
  letter-spacing: -0.02em;
  line-height: 1;
  & .accent {
    background: ${OPTI_GRADIENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const StatLabel = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  color: ${GHOST};
  margin-top: 0.45rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

/* ============== SECTION HEADERS ============== */
const SectionTag = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  color: ${OPTI_GREEN};
  letter-spacing: 0.7px;
  margin-bottom: 1rem;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  background: rgba(16,185,129,0.05);
`;

const SectionH2 = styled.h2`
  font-family: ${SANS};
  font-weight: 400;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.0;
  letter-spacing: -0.015em;
  margin: 0 0 1rem;
  max-width: 720px;
  color: ${PURE_WHITE};
`;

const SectionLede = styled.p`
  font-family: ${SANS};
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${GHOST};
  margin: 0 0 3rem;
  max-width: 600px;
`;

/* ============== SERVICE / FEATURE CARDS ============== */
const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ServiceCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  padding: 2rem 1.85rem;
  text-decoration: none;
  color: ${PURE_WHITE};
  transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  position: relative;
  &:hover {
    border-color: ${MIST_12};
    background: ${SURFACE_DEEP};
    transform: translate(-2px, -2px);
    box-shadow: rgba(0,0,0,0.5) 4px 4px 0px 0px;
  }
`;

const ServiceIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: ${(p) => p.$tint || 'rgba(59,130,246,0.10)'};
  border: 1px solid ${MIST_10};
  color: ${(p) => p.$color || OPTI_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
`;

const ServiceTag = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  color: ${WHISPER};
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const ServiceTitle = styled.h3`
  font-family: ${SANS};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.20;
  margin: 0 0 0.6rem;
  color: ${PURE_WHITE};
`;

const ServiceCopy = styled.p`
  font-family: ${SANS};
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${GHOST};
  margin: 0 0 1.25rem;
`;

const ServiceLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  font-family: ${MONO};
  font-size: 0.85rem;
  color: ${OPTI_BLUE};
  letter-spacing: 0.3px;
`;

/* ============== TERMINAL CODE-LIKE BLOCK ============== */
const Terminal2 = styled.div`
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  padding: 1.5rem 1.75rem;
  margin-top: 3rem;
  font-family: ${MONO};
  font-size: 0.9rem;
  line-height: 1.65;
  color: ${GHOST};
  position: relative;
  box-shadow: rgba(0,0,0,0.5) 4px 4px 0px 0px;
`;

const TerminalDots = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;
  & span {
    width: 10px; height: 10px; border-radius: 50%;
    background: ${MIST_12};
  }
`;

const TerminalLine = styled.div`
  & .prompt { color: ${OPTI_GREEN}; }
  & .key { color: ${OPTI_BLUE}; }
  & .str { color: #FBBF24; }
  & .ok { color: ${OPTI_GREEN}; }
`;

/* ============== LOGO WALL ============== */
const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0;
  margin-top: 3rem;
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  overflow: hidden;
`;

const LogoTile = styled.div`
  background: ${PURE_BLACK};
  border-right: 1px solid ${MIST_06};
  border-bottom: 1px solid ${MIST_06};
  padding: 1.5rem;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s ease;
  & img {
    max-width: 110px;
    max-height: 50px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: brightness(0) invert(1) opacity(0.78);
    transition: filter 0.18s ease;
  }
  &:hover {
    background: ${SURFACE_DEEP};
    & img { filter: brightness(0) invert(1) opacity(1); }
  }
`;

/* ============== CASES (terminal list) ============== */
const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  overflow: hidden;
  background: ${PURE_BLACK};
`;

const CaseRow = styled(Link)`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid ${MIST_06};
  text-decoration: none;
  color: ${PURE_WHITE};
  transition: background 0.18s ease;
  align-items: center;
  &:last-child { border-bottom: none; }
  &:hover { background: ${SURFACE_DEEP}; }
  @media (max-width: 600px) { grid-template-columns: 50px 1fr; gap: 1rem; padding: 1.25rem; }
`;

const CaseNum = styled.div`
  font-family: ${MONO};
  font-size: 0.95rem;
  color: ${WHISPER};
`;

const CaseHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const CaseTitle = styled.div`
  font-family: ${SANS};
  font-weight: 500;
  font-size: 1.15rem;
  line-height: 1.20;
  color: ${PURE_WHITE};
`;

const CaseSub = styled.div`
  font-family: ${MONO};
  font-size: 12px;
  color: ${GHOST};
  letter-spacing: 0.3px;
`;

const CaseArrow = styled.div`
  color: ${WHISPER};
  display: flex;
  align-items: center;
  @media (max-width: 600px) { display: none; }
`;

/* ============== CTA BLOCK ============== */
const CtaCard = styled.div`
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_12};
  border-radius: 4px;
  padding: 4rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(0,0,0,0.5) 6px 6px 0px 0px;
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CtaGlow = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 60% at 50% 0%, rgba(59,130,246,0.18), transparent 70%);
  pointer-events: none;
`;

const CtaH2 = styled.h2`
  font-family: ${SANS};
  font-weight: 400;
  font-size: clamp(1.85rem, 3.4vw, 2.85rem);
  line-height: 1.0;
  margin: 0 auto 1rem;
  max-width: 680px;
  color: ${PURE_WHITE};
  position: relative;
`;

const CtaSub = styled.p`
  font-family: ${SANS};
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${GHOST};
  margin: 0 auto 2rem;
  max-width: 560px;
  position: relative;
`;

const CtaButtons = styled.div`
  display: inline-flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

/* ============== DATA ============== */
const SERVICES_DATA = [
  {
    icon: <Code2 size={20} strokeWidth={1.6} />,
    tag: '01 / SOFTWARE',
    tint: 'rgba(59,130,246,0.10)',
    color: OPTI_BLUE,
    title: 'Software & Platforms',
    copy: 'Custom dashboards, API\'s, automatisering. Voor bedrijven die rust willen op het IT-vlak en geen abonnementsmoeras.',
    href: '/software-platforms',
  },
  {
    icon: <Bot size={20} strokeWidth={1.6} />,
    tag: '02 / AI AGENTS',
    tint: 'rgba(16,185,129,0.10)',
    color: OPTI_GREEN,
    title: 'AI Agents & Chatbots',
    copy: 'Voice- en chat-agenten die 24/7 klantgesprekken voeren. Stack-agnostic, koppelt aan jouw CRM, agenda en kassa.',
    href: '/ai-agents-chatbots',
  },
  {
    icon: <TrendingUp size={20} strokeWidth={1.6} />,
    tag: '03 / MARKETING',
    tint: 'rgba(139,92,246,0.10)',
    color: '#8B5CF6',
    title: 'AI Marketing',
    copy: 'SEO-content, ad-creatives en social automatisering. Geen vage clicks - direct te koppelen aan marge in jouw boekhouding.',
    href: '/ai-marketing',
  },
];

const LOGO_SLUGS = [
  'shopify','woocommerce','magento','mollie','klarna','postnl','sendcloud','lightspeed',
  'opentable','formitable','thefork','resdiary','untill','eetnu',
  'realworks','funda','skarabee','moveit','hubspot','pipedrive','pro6pp',
  'exquise','promedico','oase','wincare','googlecalendar','microsoftoutlook',
];
const PNG_LOGOS = new Set([
  'eetnu','lightspeed','magento','microsoftoutlook','mollie','oase',
  'sendcloud','shopify','woocommerce',
]);
const logoSrc = (s) => `/logos/${s}.${PNG_LOGOS.has(s) ? 'png' : 'svg'}`;

const FALLBACK_CASES = [
  { slug: 'fashiondraw', title: 'FashionDraw', subtitle: 'Eigen ontwerpsuite voor mode-merken', tag: 'software' },
  { slug: 'hitchcut', title: 'Hitchcut', subtitle: 'AI-coupeur voor textiel- en kleersegment', tag: 'ai_agent' },
  { slug: 'optipic', title: 'Optipic', subtitle: 'Visual AI voor woonbeeld en interieur', tag: 'ai_marketing' },
];

/* ============== COMPONENT ============== */
export default function HomePage_composio({ initialCases = [] }) {
  const cases = (initialCases?.length ? initialCases : FALLBACK_CASES).slice(0, 5);

  return (
    <Page>
      <SEOHead
        title="Optivaize | Developer-grade AI bureau"
        description="Optivaize bouwt voice agents, dashboards en marketing-automatisering. Stack-agnostic, AVG-proof, live in 1-3 dagen."
      />

      {/* ========= HERO ========= */}
      <Hero>
        <HeroGlow />
        <Container>
          <HeroInner>
            <FadeIn>
              <HeroOverline>optivaize.nl // ai_engineering_studio</HeroOverline>
              <HeroH1>
                AI-infrastructuur die <HeroAccent>echt werkt</HeroAccent>, zonder de hype.
              </HeroH1>
              <HeroSub>
                Voice agents, custom dashboards en marketing-automatisering voor Nederlandse bedrijven. Stack-agnostic, AVG-proof, en live binnen een paar dagen, niet maanden.
              </HeroSub>
              <CtaRow>
                <PrimaryCta to="/contact">
                  <Zap size={16} /> Plan een intake
                </PrimaryCta>
                <GhostCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </GhostCta>
              </CtaRow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <HeroVisual>
                <img src="/images/home-variants/home-dark-code.jpg" alt="Code editor met syntax highlighting" loading="lazy" />
                <HeroVisualOverlay />
              </HeroVisual>
            </FadeIn>
          </HeroInner>

          <FadeIn delay={0.2}>
            <StatsBar>
              <StatCell>
                <StatNum><span className="accent">87%</span></StatNum>
                <StatLabel>vragen autonoom</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum>24/7</StatNum>
                <StatLabel>uptime</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum>1-3d</StatNum>
                <StatLabel>tot live</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum><span className="accent">€100</span></StatNum>
                <StatLabel>per maand</StatLabel>
              </StatCell>
            </StatsBar>
          </FadeIn>
        </Container>
      </Hero>

      {/* ========= SERVICES ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Cpu size={11} /> services</SectionTag>
            <SectionH2>Drie disciplines. Eén team. Elke build production-ready.</SectionH2>
            <SectionLede>
              Software, agenten, marketing - geleverd door dezelfde mensen die de keuzes maken. Geen ticket-stack, geen overdracht, geen wachttijd.
            </SectionLede>
          </FadeIn>
          <ServiceGrid>
            {SERVICES_DATA.map((s, i) => (
              <FadeIn key={s.href} delay={0.08 * i}>
                <ServiceCard to={s.href}>
                  <ServiceIcon $tint={s.tint} $color={s.color}>{s.icon}</ServiceIcon>
                  <ServiceTag>{s.tag}</ServiceTag>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceCopy>{s.copy}</ServiceCopy>
                  <ServiceLink>view dienst <ArrowRight size={14} /></ServiceLink>
                </ServiceCard>
              </FadeIn>
            ))}
          </ServiceGrid>

          {/* Terminal-style code preview */}
          <FadeIn delay={0.15}>
            <Terminal2>
              <TerminalDots><span /><span /><span /></TerminalDots>
              <TerminalLine><span className="prompt">$</span> curl https://api.optivaize.nl/agent/<span className="key">tandarts</span></TerminalLine>
              <TerminalLine>{'{'}</TerminalLine>
              <TerminalLine>&nbsp;&nbsp;<span className="key">"status"</span>: <span className="str">"ready"</span>,</TerminalLine>
              <TerminalLine>&nbsp;&nbsp;<span className="key">"voice"</span>: <span className="str">"marin (NL)"</span>,</TerminalLine>
              <TerminalLine>&nbsp;&nbsp;<span className="key">"tools"</span>: [<span className="str">"vrije_tijden_opvragen"</span>, <span className="str">"boek_afspraak"</span>, <span className="str">"verbind_medewerker"</span>],</TerminalLine>
              <TerminalLine>&nbsp;&nbsp;<span className="key">"max_session_seconds"</span>: 180,</TerminalLine>
              <TerminalLine>&nbsp;&nbsp;<span className="key">"latency_p50_ms"</span>: 220</TerminalLine>
              <TerminalLine>{'}'}</TerminalLine>
              <TerminalLine style={{ marginTop: '0.5rem' }}><span className="ok">✓</span> session minted in 84ms</TerminalLine>
            </Terminal2>
          </FadeIn>
        </Container>
      </Section>

      {/* ========= INTEGRATIONS / LOGO WALL ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Terminal size={11} /> integrations</SectionTag>
            <SectionH2>27 native integraties. En jouw stack krijgt er zo één bij.</SectionH2>
            <SectionLede>
              Praktijksoftware, kassasystemen, CRM, e-commerce, betalingen, verzending. Wat we niet out-of-the-box hebben, koppelen we via API of webhook.
            </SectionLede>
          </FadeIn>
          <FadeIn delay={0.08}>
            <LogoGrid>
              {LOGO_SLUGS.map((slug) => (
                <LogoTile key={slug} title={slug}>
                  <img src={logoSrc(slug)} alt={slug} loading="lazy" />
                </LogoTile>
              ))}
            </LogoGrid>
          </FadeIn>
        </Container>
      </Section>

      {/* ========= CASES ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Code2 size={11} /> recent_work</SectionTag>
            <SectionH2>Selectie van het werk.</SectionH2>
            <SectionLede>
              Klein op het label, groot in impact. Van interne tools tot publieke producten met paying users.
            </SectionLede>
          </FadeIn>
          <FadeIn delay={0.08}>
            <CaseList>
              {cases.map((c, i) => (
                <CaseRow key={c.slug || c.id || i} to={c.slug ? `/cases/${c.slug}` : '/cases'}>
                  <CaseNum>{String(i + 1).padStart(2, '0')}/</CaseNum>
                  <CaseHead>
                    <CaseTitle>{c.title || c.name || 'Project'}</CaseTitle>
                    <CaseSub>{(c.tag || c.category || 'project').toString().toLowerCase().replace(/\s+/g, '_')} ::: {c.subtitle || c.description || 'custom build'}</CaseSub>
                  </CaseHead>
                  <CaseArrow><ArrowRight size={20} strokeWidth={1.5} /></CaseArrow>
                </CaseRow>
              ))}
            </CaseList>
          </FadeIn>
        </Container>
      </Section>

      {/* ========= FINAL CTA ========= */}
      <Section $pad="80px 0 140px" $padMobile="50px 0 80px">
        <Container>
          <FadeIn>
            <CtaCard>
              <CtaGlow />
              <CtaH2>Klaar voor een build die <HeroAccent>écht</HeroAccent> werkt?</CtaH2>
              <CtaSub>
                Bel of mail ons. Binnen 24 uur weet je of we passen, en wat het kost.
              </CtaSub>
              <CtaButtons>
                <PrimaryCta to="/contact">
                  <Zap size={16} /> Plan een intake
                </PrimaryCta>
                <GhostCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </GhostCta>
                <GhostCta href="mailto:info@optivaize.nl">
                  <Mail size={16} /> Mail ons
                </GhostCta>
              </CtaButtons>
            </CtaCard>
          </FadeIn>
        </Container>
      </Section>
    </Page>
  );
}

'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Phone, Mail, Bot, Code2, TrendingUp, Sparkles } from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';

/**
 * HomePage_claude
 * Editorial / Claude-inspired variant.
 * Design system: warm parchment canvas, Anthropic serif (Georgia fallback) for headlines,
 * warm-toned neutrals, ring shadows, generous whitespace, alternating light/dark sections.
 * Brand bridge: the only saturated color in the palette is Optivaize's blue→green gradient
 * applied to the primary CTA - replacing Anthropic's terracotta.
 */

const OPTIVAIZE_GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

// Warm palette (per DESIGN.md, Claude-inspired)
const PARCHMENT = '#f5f4ed';
const IVORY = '#faf9f5';
const WARM_SAND = '#e8e6dc';
const BORDER_CREAM = '#f0eee6';
const BORDER_WARM = '#e8e6dc';
const NEAR_BLACK = '#141413';
const DARK_SURFACE = '#30302e';
const CHARCOAL_WARM = '#4d4c48';
const OLIVE_GRAY = '#5e5d59';
const STONE_GRAY = '#87867f';
const WARM_SILVER = '#b0aea5';

const SERIF = "'Anthropic Serif', Georgia, 'Iowan Old Style', 'Times New Roman', serif";
const SANS = "'Anthropic Sans', 'Inter', system-ui, -apple-system, Arial, sans-serif";

/* ============== LAYOUT ============== */
const Page = styled.div`
  background: ${PARCHMENT};
  color: ${NEAR_BLACK};
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
  padding: ${(p) => p.$pad || '120px 0'};
  background: ${(p) => p.$bg || PARCHMENT};
  ${(p) => p.$dark && `
    background: ${NEAR_BLACK};
    color: ${IVORY};
  `}
  position: relative;
  @media (max-width: 768px) { padding: ${(p) => p.$padMobile || '70px 0'}; }
`;

function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

/* ============== HERO ============== */
const Hero = styled(Section)`
  padding: 200px 0 110px;
  @media (max-width: 768px) { padding: 140px 0 70px; }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2.5rem; }
`;

const HeroEyebrow = styled.div`
  font-family: ${SANS};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${OLIVE_GRAY};
  text-transform: uppercase;
  margin-bottom: 1.6rem;
`;

const HeroH1 = styled.h1`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: clamp(2.4rem, 5.4vw, 4rem);
  line-height: 1.10;
  letter-spacing: -0.01em;
  margin: 0 0 1.6rem;
  color: ${NEAR_BLACK};
`;

const HeroSub = styled.p`
  font-family: ${SANS};
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.60;
  color: ${OLIVE_GRAY};
  max-width: 540px;
  margin: 0 0 2.25rem;
`;

const CtaRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${OPTIVAIZE_GRADIENT};
  color: white;
  text-decoration: none;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  font-family: ${SANS};
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 0 0 1px rgba(59,130,246,0.4), 0 14px 32px rgba(59,130,246,0.25);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px rgba(59,130,246,0.45), 0 18px 40px rgba(59,130,246,0.35);
  }
`;

const SecondaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${WARM_SAND};
  color: ${CHARCOAL_WARM};
  text-decoration: none;
  padding: 0.85rem 1.4rem;
  border-radius: 12px;
  font-family: ${SANS};
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 0 0 1px #d1cfc5;
  transition: background 0.18s ease;
  &:hover { background: #ddd9cb; }
`;

const HeroImage = styled.div`
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 30px 60px rgba(20,20,19,0.10);
  & img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 768px) { aspect-ratio: 5/3; border-radius: 22px; }
`;

const HeroBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.85rem;
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: ${SANS};
  font-size: 13px;
  color: ${OLIVE_GRAY};
  background: ${IVORY};
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
`;

/* ============== SECTION HEADERS ============== */
const SectionLabel = styled.div`
  font-family: ${SANS};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${OLIVE_GRAY};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const SectionH2 = styled.h2`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: clamp(2rem, 3.5vw, 3.25rem);
  line-height: 1.15;
  letter-spacing: -0.005em;
  margin: 0 0 1rem;
  max-width: 760px;
  color: ${(p) => p.$light ? IVORY : NEAR_BLACK};
`;

const SectionLede = styled.p`
  font-family: ${SANS};
  font-size: 1.1rem;
  line-height: 1.55;
  color: ${(p) => p.$light ? WARM_SILVER : OLIVE_GRAY};
  margin: 0 0 3rem;
  max-width: 600px;
`;

/* ============== SERVICE CARDS ============== */
const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const ServiceCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${IVORY};
  text-decoration: none;
  color: ${NEAR_BLACK};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
  transition: box-shadow 0.18s ease, transform 0.18s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 18px 40px rgba(20,20,19,0.06);
  }
`;

const ServiceIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${(p) => p.$tint || 'rgba(59,130,246,0.10)'};
  color: ${(p) => p.$color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1.55rem;
  line-height: 1.20;
  margin: 0 0 0.6rem;
  color: ${NEAR_BLACK};
`;

const ServiceCopy = styled.p`
  font-family: ${SANS};
  font-size: 0.98rem;
  line-height: 1.55;
  color: ${OLIVE_GRAY};
  margin: 0 0 1.25rem;
`;

const ServiceLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: auto;
  font-family: ${SANS};
  font-size: 0.95rem;
  font-weight: 500;
  color: #3B82F6;
`;

/* ============== LOGO WALL ============== */
const LogoWall = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-top: 2.5rem;
`;

const LogoCell = styled.div`
  background: ${IVORY};
  border-radius: 14px;
  padding: 1.1rem;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  & img { max-width: 110px; max-height: 50px; width: auto; height: auto; object-fit: contain; }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 10px 24px rgba(20,20,19,0.05);
  }
`;

/* ============== EDITORIAL DARK SECTION ============== */
const EditorialQuote = styled.blockquote`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  line-height: 1.30;
  color: ${IVORY};
  margin: 0 0 2rem;
  max-width: 920px;
  &::before { content: '"'; color: ${WARM_SILVER}; }
  &::after { content: '"'; color: ${WARM_SILVER}; }
`;

const QuoteAttribution = styled.div`
  font-family: ${SANS};
  font-size: 0.95rem;
  color: ${WARM_SILVER};
  & strong { color: ${IVORY}; font-weight: 600; }
`;

const TwoColEditorial = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const EditorialImage = styled.div`
  border-radius: 32px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 0 0 1px ${DARK_SURFACE}, 0 24px 48px rgba(0,0,0,0.40);
  & img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 768px) { aspect-ratio: 5/3; border-radius: 22px; }
`;

/* ============== CASES (numbered list) ============== */
const CaseList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${BORDER_WARM};
`;

const CaseRow = styled(Link)`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1.5rem;
  padding: 2rem 0.5rem;
  border-bottom: 1px solid ${BORDER_WARM};
  text-decoration: none;
  color: ${NEAR_BLACK};
  transition: background 0.18s ease, padding 0.18s ease;
  align-items: center;
  &:hover {
    background: ${IVORY};
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media (max-width: 600px) { grid-template-columns: 60px 1fr; gap: 1rem; }
`;

const CaseNum = styled.div`
  font-family: ${SERIF};
  font-size: 2rem;
  font-weight: 500;
  color: ${STONE_GRAY};
  font-variant-numeric: tabular-nums;
`;

const CaseHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const CaseTitle = styled.div`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1.45rem;
  line-height: 1.20;
  color: ${NEAR_BLACK};
`;

const CaseSub = styled.div`
  font-family: ${SANS};
  font-size: 0.95rem;
  color: ${OLIVE_GRAY};
`;

const CaseArrow = styled.div`
  color: ${STONE_GRAY};
  display: flex;
  align-items: center;
  @media (max-width: 600px) { display: none; }
`;

/* ============== CTA BLOCK ============== */
const CtaCard = styled.div`
  background: ${IVORY};
  border-radius: 32px;
  padding: 4.5rem 3rem;
  text-align: center;
  box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 24px 48px rgba(20,20,19,0.06);
  @media (max-width: 768px) { padding: 3rem 1.5rem; border-radius: 22px; }
`;

const CtaH2 = styled.h2`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: clamp(2rem, 3.4vw, 3rem);
  line-height: 1.15;
  margin: 0 auto 1rem;
  max-width: 720px;
  color: ${NEAR_BLACK};
`;

const CtaSub = styled.p`
  font-family: ${SANS};
  font-size: 1.1rem;
  line-height: 1.55;
  color: ${OLIVE_GRAY};
  margin: 0 auto 2.25rem;
  max-width: 580px;
`;

const CtaButtons = styled.div`
  display: inline-flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
`;

/* ============== DATA ============== */
const SERVICES_DATA = [
  {
    icon: <Code2 size={22} strokeWidth={1.7} />,
    tint: 'rgba(59,130,246,0.10)',
    color: '#3B82F6',
    title: 'Software & Platforms',
    copy: 'Custom dashboards, interne tools en automatisering die jouw team echt versnellen - zonder wachttijd op een groot bureau.',
    href: '/software-platforms',
  },
  {
    icon: <Bot size={22} strokeWidth={1.7} />,
    tint: 'rgba(16,185,129,0.10)',
    color: '#10B981',
    title: 'AI Agents & Chatbots',
    copy: 'Voice- en chatassistenten die 24/7 klantgesprekken voeren, afspraken plannen en bestellingen oplossen. Live in 1-3 dagen.',
    href: '/ai-agents-chatbots',
  },
  {
    icon: <TrendingUp size={22} strokeWidth={1.7} />,
    tint: 'rgba(139,92,246,0.10)',
    color: '#8B5CF6',
    title: 'AI Marketing',
    copy: 'SEO, content, ads en social automatisering - aangedreven door AI, gemeten op marge in plaats van impressies.',
    href: '/ai-marketing',
  },
];

const LOGO_SLUGS = [
  // 27 brands across all niches - all assets live locally in /public/logos/
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
  { slug: 'fashiondraw', title: 'FashionDraw', subtitle: 'Eigen ontwerpsuite voor mode-merken', tag: 'Software' },
  { slug: 'hitchcut', title: 'Hitchcut', subtitle: 'AI-coupeur voor textiel- en kleersegment', tag: 'AI agent' },
  { slug: 'optipic', title: 'Optipic', subtitle: 'Visual AI voor woonbeeld en interieur', tag: 'AI marketing' },
];

/* ============== COMPONENT ============== */
export default function HomePage_claude({ initialCases = [] }) {
  const cases = (initialCases?.length ? initialCases : FALLBACK_CASES).slice(0, 5);

  return (
    <Page>
      <SEOHead
        title="Optivaize | Editorial - AI bureau in De Bilt"
        description="Optivaize bouwt AI-agents, dashboards en marketing-automatisering voor Nederlandse bedrijven."
      />

      {/* ========= HERO ========= */}
      <Hero>
        <Container>
          <HeroGrid>
            <FadeIn>
              <HeroEyebrow>Optivaize · AI-bureau · De Bilt</HeroEyebrow>
              <HeroH1>
                AI die jouw bedrijf{' '}
                <span style={{ fontStyle: 'italic', color: CHARCOAL_WARM }}>écht</span> verder helpt.
              </HeroH1>
              <HeroSub>
                Wij bouwen voice-assistenten, chatbots en custom software die werken op de manier waarop jouw team werkt - rustig, betrouwbaar en zonder ruis. Live binnen een paar dagen, niet maanden.
              </HeroSub>
              <CtaRow>
                <PrimaryCta to="/contact">
                  <Sparkles size={16} /> Plan een intake
                </PrimaryCta>
                <SecondaryCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </SecondaryCta>
              </CtaRow>
              <HeroBadges>
                <HeroBadge>Live in 1-3 dagen</HeroBadge>
                <HeroBadge>AVG-proof, EU-data</HeroBadge>
                <HeroBadge>Maandelijks opzegbaar</HeroBadge>
                <HeroBadge>Gevestigd in De Bilt, NL</HeroBadge>
              </HeroBadges>
            </FadeIn>
            <FadeIn delay={0.15}>
              <HeroImage>
                <img src="/images/home-variants/home-warm-team.jpg" alt="Team aan het werk met laptops aan een houten tafel" loading="lazy" />
              </HeroImage>
            </FadeIn>
          </HeroGrid>
        </Container>
      </Hero>

      {/* ========= SERVICES ========= */}
      <Section $bg={PARCHMENT}>
        <Container>
          <FadeIn>
            <SectionLabel>Wat we doen</SectionLabel>
            <SectionH2>Drie disciplines, één team dat álle drie tegelijk levert.</SectionH2>
            <SectionLede>
              We bouwen software, agenten en marketing met dezelfde mensen - dat scheelt overdracht, miscommunicatie en maanden vertraging.
            </SectionLede>
          </FadeIn>
          <ServiceGrid>
            {SERVICES_DATA.map((s, i) => (
              <FadeIn key={s.href} delay={0.1 * i}>
                <ServiceCard to={s.href}>
                  <ServiceIcon $tint={s.tint} $color={s.color}>{s.icon}</ServiceIcon>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceCopy>{s.copy}</ServiceCopy>
                  <ServiceLink>Bekijk dienst <ArrowUpRight size={14} /></ServiceLink>
                </ServiceCard>
              </FadeIn>
            ))}
          </ServiceGrid>
        </Container>
      </Section>

      {/* ========= LOGO WALL ========= */}
      <Section $bg={IVORY} $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionLabel>Naadloos gekoppeld</SectionLabel>
            <SectionH2>De tools die jouw team al gebruikt - wij koppelen er aan.</SectionH2>
            <SectionLede>
              Praktijksoftware, kassasystemen, CRM, e-commerce en betaalproviders. Onze AI praat ze allemaal aan.
            </SectionLede>
          </FadeIn>
          <LogoWall>
            {LOGO_SLUGS.map((slug) => (
              <LogoCell key={slug} title={slug}>
                <img src={logoSrc(slug)} alt={slug} loading="lazy" />
              </LogoCell>
            ))}
          </LogoWall>
        </Container>
      </Section>

      {/* ========= EDITORIAL DARK ========= */}
      <Section $dark $pad="140px 0" $padMobile="80px 0">
        <Container>
          <TwoColEditorial>
            <FadeIn>
              <SectionLabel style={{ color: WARM_SILVER }}>Wat opdrachtgevers zeggen</SectionLabel>
              <EditorialQuote>
                Optivaize bouwde in een week wat ons interne team niet voor elkaar kreeg in een kwartaal. Geen blockchains, geen demo's - gewoon code die werkt.
              </EditorialQuote>
              <QuoteAttribution>
                <strong>Sandra de Vries</strong> · Operations, Nederlandse retailer
              </QuoteAttribution>
            </FadeIn>
            <FadeIn delay={0.15}>
              <EditorialImage>
                <img src="/images/home-variants/home-warm-desk.jpg" alt="Schetsen op papier naast een laptop" loading="lazy" />
              </EditorialImage>
            </FadeIn>
          </TwoColEditorial>
        </Container>
      </Section>

      {/* ========= CASES (editorial list) ========= */}
      <Section $bg={PARCHMENT}>
        <Container>
          <FadeIn>
            <SectionLabel>Selectie van het werk</SectionLabel>
            <SectionH2>Een handvol projecten die we de afgelopen jaren live brachten.</SectionH2>
            <SectionLede>
              Klein op het label, groot in impact. Van interne tools die uren besparen tot publieke producten met paying users.
            </SectionLede>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CaseList>
              {cases.map((c, i) => (
                <CaseRow key={c.slug || c.id || i} to={c.slug ? `/cases/${c.slug}` : '/cases'}>
                  <CaseNum>{String(i + 1).padStart(2, '0')}</CaseNum>
                  <CaseHead>
                    <CaseTitle>{c.title || c.name || 'Project'}</CaseTitle>
                    <CaseSub>{c.subtitle || c.description || c.tag || 'Custom build'}</CaseSub>
                  </CaseHead>
                  <CaseArrow><ArrowUpRight size={22} strokeWidth={1.5} /></CaseArrow>
                </CaseRow>
              ))}
            </CaseList>
          </FadeIn>
        </Container>
      </Section>

      {/* ========= FINAL CTA ========= */}
      <Section $bg={PARCHMENT} $pad="80px 0 140px" $padMobile="50px 0 80px">
        <Container>
          <FadeIn>
            <CtaCard>
              <CtaH2>Klaar om iets concreets te bouwen?</CtaH2>
              <CtaSub>
                Bel of mail ons. Binnen 24 uur weet je of we passen bij wat jij wilt - en wat het zou kosten.
              </CtaSub>
              <CtaButtons>
                <PrimaryCta to="/contact">
                  <Sparkles size={16} /> Plan een intake
                </PrimaryCta>
                <SecondaryCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </SecondaryCta>
                <SecondaryCta href="mailto:info@optivaize.nl">
                  <Mail size={16} /> Mail ons
                </SecondaryCta>
              </CtaButtons>
            </CtaCard>
          </FadeIn>
        </Container>
      </Section>
    </Page>
  );
}

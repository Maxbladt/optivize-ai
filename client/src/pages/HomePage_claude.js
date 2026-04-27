'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowUpRight, Phone, Mail, Bot, Code2, TrendingUp, Sparkles,
  GraduationCap, ClipboardList, Search, Lightbulb, Wrench, MapPin,
} from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';

/**
 * HomePage_claude - editorial / Anthropic-inspired variant of the real Optivaize home.
 * Same content as HomePage.js, restyled with parchment canvas, serif headlines,
 * warm grays, ring shadows. Optivaize blue→green gradient is the only saturated
 * color (the primary CTA), replacing Anthropic's terracotta.
 */

const OPTIVAIZE_GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

// Warm palette (Claude-inspired)
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
  grid-template-columns: 1.05fr 0.95fr;
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

const Italic = styled.span`
  font-style: italic;
  color: ${CHARCOAL_WARM};
`;

const HeroSub = styled.p`
  font-family: ${SANS};
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.55;
  color: ${OLIVE_GRAY};
  max-width: 540px;
  margin: 0 0 2.25rem;
`;

const HeroStatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2.5rem;
  margin: 0 0 2.25rem;
  @media (max-width: 480px) { gap: 1.5rem; }
`;

const HeroStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const HeroStatNum = styled.div`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  line-height: 1.0;
  color: ${NEAR_BLACK};
`;

const HeroStatLabel = styled.div`
  font-family: ${SANS};
  font-size: 0.78rem;
  color: ${OLIVE_GRAY};
  letter-spacing: 0.3px;
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
  color: ${(p) => p.$light ? WARM_SILVER : OLIVE_GRAY};
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

/* ============== PILLAR CARDS (Identity) ============== */
const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const PillarCard = styled.div`
  background: ${IVORY};
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
  transition: box-shadow 0.18s ease, transform 0.18s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 18px 40px rgba(20,20,19,0.06);
  }
`;

const PillarIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${(p) => p.$tint || 'rgba(59,130,246,0.10)'};
  color: ${(p) => p.$color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.6rem;
`;

const PillarTitle = styled.h3`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1.55rem;
  line-height: 1.20;
  margin: 0;
  color: ${NEAR_BLACK};
`;

const PillarText = styled.p`
  font-family: ${SANS};
  font-size: 0.98rem;
  line-height: 1.55;
  color: ${OLIVE_GRAY};
  margin: 0;
`;

/* ============== CASE GRID ============== */
const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const CaseTile = styled(Link)`
  position: relative;
  display: block;
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 3/4;
  box-shadow: 0 0 0 1px ${BORDER_WARM};
  text-decoration: none;
  color: ${NEAR_BLACK};
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px ${BORDER_WARM}, 0 22px 50px rgba(20,20,19,0.10);
  }
`;

const CaseTileImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CaseTileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(20,20,19,0.78));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.6rem 1.4rem 1.4rem;
  color: white;
`;

const CaseTileClient = styled.div`
  font-family: ${SANS};
  font-size: 0.78rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${WARM_SILVER};
  margin-bottom: 0.4rem;
`;

const CaseTileTitle = styled.div`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1.35rem;
  line-height: 1.20;
  color: white;
`;

/* ============== FEATURED 2-COL ============== */
const TwoColEditorial = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const FeatureImage = styled.div`
  border-radius: 32px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 0 0 1px ${BORDER_WARM};
  & img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 768px) { aspect-ratio: 5/3; border-radius: 22px; }
`;

const FeatureImageDark = styled(FeatureImage)`
  box-shadow: 0 0 0 1px ${DARK_SURFACE}, 0 24px 48px rgba(0,0,0,0.40);
`;

const FeatureBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0;
`;

const FeatureBadge = styled.span`
  font-family: ${SANS};
  font-size: 0.85rem;
  color: ${CHARCOAL_WARM};
  background: ${IVORY};
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
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

/* ============== LOCATIONS ============== */
const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const LocationCard = styled.div`
  background: ${IVORY};
  border-radius: 16px;
  padding: 1.4rem 1.5rem;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LocationIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(59,130,246,0.1);
  color: #3B82F6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/* ============== INTAKE STEPS ============== */
const IntakeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const IntakeCard = styled.div`
  background: ${IVORY};
  border-radius: 18px;
  padding: 1.85rem 1.5rem 1.5rem;
  box-shadow: 0 0 0 1px ${BORDER_CREAM};
  position: relative;
`;

const IntakeNum = styled.div`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1rem;
  color: ${STONE_GRAY};
  letter-spacing: 0.05em;
  margin-bottom: 0.85rem;
`;

const IntakeIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => p.$tint};
  color: ${(p) => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const IntakeTitle = styled.h3`
  font-family: ${SERIF};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.20;
  margin: 0 0 0.4rem;
  color: ${NEAR_BLACK};
`;

const IntakeText = styled.p`
  font-family: ${SANS};
  font-size: 0.92rem;
  line-height: 1.55;
  color: ${OLIVE_GRAY};
  margin: 0;
`;

/* ============== EDITORIAL DARK QUOTE ============== */
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
const PILLARS = [
  { icon: <Bot size={22} strokeWidth={1.7} />, tint: 'rgba(59,130,246,0.10)', color: '#3B82F6',
    title: 'AI inzetten',
    text: 'We implementeren AI in bestaande workflows zodat jouw team direct resultaat ziet. Geen grote transformatietrajecten, gewoon resultaat.' },
  { icon: <GraduationCap size={22} strokeWidth={1.7} />, tint: 'rgba(249,115,22,0.10)', color: '#F97316',
    title: 'AI training',
    text: 'We bouwen het fundament door jouw hele team te trainen. Van management tot uitvoering, iedereen leert AI efficient gebruiken.' },
  { icon: <Code2 size={22} strokeWidth={1.7} />, tint: 'rgba(16,185,129,0.10)', color: '#10B981',
    title: 'AI bouwen',
    text: 'We bouwen ook zelf AI-applicaties op maat. Van automatiseringen tot volledige platformen, sneller dan traditionele bureaus.' },
];

const SERVICES = [
  { icon: <Code2 size={22} strokeWidth={1.7} />, tint: 'rgba(139,92,246,0.10)', color: '#8B5CF6',
    title: 'Software & Platforms',
    copy: 'Custom software, dashboards en automatisering. Van maatwerk platforms tot volledig geautomatiseerde workflows.',
    href: '/software-platforms' },
  { icon: <Bot size={22} strokeWidth={1.7} />, tint: 'rgba(59,130,246,0.10)', color: '#3B82F6',
    title: 'AI Agents & Chatbots',
    copy: 'Autonome AI agents en chatbots die 24/7 taken overnemen, klanten helpen en processen automatiseren.',
    href: '/ai-agents-chatbots' },
  { icon: <TrendingUp size={22} strokeWidth={1.7} />, tint: 'rgba(16,185,129,0.10)', color: '#10B981',
    title: 'AI Marketing',
    copy: 'AI-SEO, content automatisering en Google Ads optimalisatie voor maximale organische groei.',
    href: '/ai-marketing' },
];

const INTAKE = [
  { num: '01', icon: <ClipboardList size={20} />, tint: 'rgba(59,130,246,0.10)', color: '#3B82F6',
    title: 'Jouw case', text: 'Presenteer je bedrijfsvraagstuk. Wat wil je bereiken en waar loop je tegenaan?' },
  { num: '02', icon: <Search size={20} />, tint: 'rgba(16,185,129,0.10)', color: '#10B981',
    title: 'Wij reviewen', text: 'We analyseren je situatie en beoordelen de mogelijkheden grondig.' },
  { num: '03', icon: <Lightbulb size={20} />, tint: 'rgba(245,158,11,0.10)', color: '#F59E0B',
    title: 'Beste oplossing', text: 'We bedenken de meest impactvolle AI-oplossing voor jouw specifieke situatie.' },
  { num: '04', icon: <Wrench size={20} />, tint: 'rgba(139,92,246,0.10)', color: '#8B5CF6',
    title: 'Wij bouwen', text: 'We bouwen en implementeren de oplossing, niet in maanden maar in weken.' },
];

const LOCATIONS = [
  { flag: '🇳🇱', city: 'Utrecht', role: 'AI Research & Hoofdkantoor' },
  { flag: '🇮🇳', city: 'Mumbai', role: 'Development' },
  { flag: '🇵🇭', city: 'Manila', role: 'Development' },
];

const HOME_CASE_SLUGS = ['fonteyn', 'red-button', 'blosh'];
const CASE_IMAGES = {
  fonteyn: '/images/fonteyn_dashboard.webp',
  blosh: '/images/blosh_office.webp',
  'red-button': '/images/magic_apparels_dashboard.webp',
};
const CASE_FALLBACKS = [
  { slug: 'fonteyn', title_nl: 'Fonteyn', preview_nl: 'Volledig AI-platform voor de #1 wellness-importeur', image: CASE_IMAGES.fonteyn },
  { slug: 'red-button', title_nl: 'Red Button', preview_nl: 'AI-dashboard dat productie en design verbindt', image: CASE_IMAGES['red-button'] },
  { slug: 'blosh', title_nl: 'Blosh', preview_nl: 'AI-gedreven content engine voor mode-merk', image: CASE_IMAGES.blosh },
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

/* ============== COMPONENT ============== */
export default function HomePage_claude({ initialCases = [] }) {
  const homeCases = HOME_CASE_SLUGS
    .map((slug) => initialCases.find((c) => c.slug === slug) || CASE_FALLBACKS.find((c) => c.slug === slug))
    .filter(Boolean);

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
                De snelste <Italic>AI partner</Italic> van Nederland.
              </HeroH1>
              <HeroSub>
                Wij helpen jouw bedrijf AI te gebruiken, te bouwen en het hele team te trainen om er efficient mee te werken. Niet in maanden, maar in weken.
              </HeroSub>
              <HeroStatsRow>
                <HeroStat>
                  <HeroStatNum>150+</HeroStatNum>
                  <HeroStatLabel>Bedrijven</HeroStatLabel>
                </HeroStat>
                <HeroStat>
                  <HeroStatNum>40+</HeroStatNum>
                  <HeroStatLabel>uur per week bespaard</HeroStatLabel>
                </HeroStat>
                <HeroStat>
                  <HeroStatNum>3×</HeroStatNum>
                  <HeroStatLabel>sneller bouwen</HeroStatLabel>
                </HeroStat>
              </HeroStatsRow>
              <CtaRow>
                <PrimaryCta to="/contact">
                  <Sparkles size={16} /> Plan gratis gesprek
                </PrimaryCta>
                <SecondaryCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </SecondaryCta>
              </CtaRow>
              <HeroBadges>
                <HeroBadge>Live in 1-3 dagen</HeroBadge>
                <HeroBadge>AVG-proof, EU-data</HeroBadge>
                <HeroBadge>Gevestigd in De Bilt, NL</HeroBadge>
              </HeroBadges>
            </FadeIn>
            <FadeIn delay={0.15}>
              <HeroImage>
                <img src="/images/home-variants/home-warm-team.jpg" alt="Optivaize team" loading="lazy" />
              </HeroImage>
            </FadeIn>
          </HeroGrid>
        </Container>
      </Hero>

      {/* ========= IDENTITY / 3 PILLARS ========= */}
      <Section $bg={PARCHMENT}>
        <Container>
          <FadeIn>
            <SectionLabel>Wie wij zijn</SectionLabel>
            <SectionH2>We bouwen AI in jouw organisatie - niet ernaast.</SectionH2>
            <SectionLede>
              Geen hype, geen powerpoints. We zetten AI rechtstreeks in jouw bedrijfsprocessen, trainen je team, en bouwen de applicaties die jouw concurrentie nog niet heeft.
            </SectionLede>
          </FadeIn>
          <PillarGrid>
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <PillarCard>
                  <PillarIcon $tint={p.tint} $color={p.color}>{p.icon}</PillarIcon>
                  <PillarTitle>{p.title}</PillarTitle>
                  <PillarText>{p.text}</PillarText>
                </PillarCard>
              </FadeIn>
            ))}
          </PillarGrid>
        </Container>
      </Section>

      {/* ========= CASES ========= */}
      <Section $bg={IVORY} $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionLabel>Onze cases</SectionLabel>
            <SectionH2>Resultaten die voor zich spreken.</SectionH2>
            <SectionLede>
              Van AI-agents tot complete integraties. Een korte selectie van wat we voor klanten hebben gebouwd.
            </SectionLede>
          </FadeIn>
          <CaseGrid>
            {homeCases.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.08}>
                <CaseTile to={`/cases/${c.slug}`}>
                  <CaseTileImg src={c.image || CASE_IMAGES[c.slug]} alt={c.title_nl || c.title} loading="lazy" />
                  <CaseTileOverlay>
                    <CaseTileClient>{c.title_nl || c.title}</CaseTileClient>
                    <CaseTileTitle>{c.preview_nl || c.subtitle || ''}</CaseTileTitle>
                  </CaseTileOverlay>
                </CaseTile>
              </FadeIn>
            ))}
          </CaseGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <SecondaryCta as={Link} to="/cases">
              Bekijk alle cases <ArrowUpRight size={14} />
            </SecondaryCta>
          </div>
        </Container>
      </Section>

      {/* ========= WIM HOF FEATURED ========= */}
      <Section $bg={PARCHMENT}>
        <Container>
          <TwoColEditorial>
            <FadeIn>
              <FeatureImage>
                <img src="/images/wimhof.webp" alt="Wim Hof - Passion Ice Baths" loading="lazy" />
              </FeatureImage>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionLabel>Featured case</SectionLabel>
              <SectionH2>Wim Hof's merk groeit organisch met AI-gedreven SEO.</SectionH2>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: OLIVE_GRAY, margin: '0 0 1.25rem' }}>
                Voor Passion Ice Baths, het merk geassocieerd met de legendarische Wim Hof, bouwden we een volledig AI-gedreven SEO systeem. We gebruikten GA4-data en Google Search Console om precies te begrijpen welke zoekwoorden het meeste potentieel hadden.
              </p>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: OLIVE_GRAY, margin: '0 0 1rem' }}>
                We trainden een eigen AI-model op hun merkstijl en doelgroep. Dat model genereert content die authentiek aanvoelt en tegelijk technisch geoptimaliseerd is voor zoekmachines. Daarnaast bouwen we een custom Shopify-app voor het team.
              </p>
              <FeatureBadges>
                <FeatureBadge>GA4 data</FeatureBadge>
                <FeatureBadge>Search Console</FeatureBadge>
                <FeatureBadge>Custom AI model</FeatureBadge>
                <FeatureBadge>Shopify app</FeatureBadge>
              </FeatureBadges>
              <SecondaryCta as={Link} to="/cases">
                Bekijk alle cases <ArrowUpRight size={14} />
              </SecondaryCta>
            </FadeIn>
          </TwoColEditorial>
        </Container>
      </Section>

      {/* ========= SERVICES ========= */}
      <Section $bg={IVORY}>
        <Container>
          <FadeIn>
            <SectionLabel>Wat wij doen</SectionLabel>
            <SectionH2>AI voor elk onderdeel van je bedrijf.</SectionH2>
            <SectionLede>
              Van agents tot automatisering, van software tot strategie - wij bouwen het allemaal, met dezelfde mensen.
            </SectionLede>
          </FadeIn>
          <ServiceGrid>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.href} delay={0.08 * i}>
                <ServiceCard to={s.href}>
                  <ServiceIcon $tint={s.tint} $color={s.color}>{s.icon}</ServiceIcon>
                  <ServiceTitle>{s.title}</ServiceTitle>
                  <ServiceCopy>{s.copy}</ServiceCopy>
                  <ServiceLink>Meer info <ArrowUpRight size={14} /></ServiceLink>
                </ServiceCard>
              </FadeIn>
            ))}
          </ServiceGrid>
        </Container>
      </Section>

      {/* ========= LOGO WALL ========= */}
      <Section $bg={PARCHMENT} $pad="100px 0" $padMobile="60px 0">
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

      {/* ========= ABOUT MAX ========= */}
      <Section $bg={IVORY}>
        <Container>
          <TwoColEditorial>
            <FadeIn>
              <SectionLabel>Over Optivaize</SectionLabel>
              <SectionH2>Gestart vanuit passie voor AI, gegroeid tot een internationaal team.</SectionH2>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: OLIVE_GRAY, margin: '0 0 1.5rem' }}>
                Maximilian Bladt startte Optivaize nadat hij in 2020 de eerste AI-modellen zag opkomen. Na 2 jaar ervaring bij Elevate Digital, een Business bachelor, Econometrie premaster en een master Quantitative Finance aan de UvA, was de stap naar Optivaize logisch.
              </p>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: OLIVE_GRAY, margin: '0 0 1.25rem' }}>
                In de afgelopen vijf jaar bouwden we tientallen AI-tools en platformen voor klanten in heel Nederland - van automatiseringen die duizenden uren besparen tot complete AI-systemen die omzet verhogen.
              </p>
              <SecondaryCta as={Link} to="/over-ons">
                Meer over ons <ArrowUpRight size={14} />
              </SecondaryCta>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FeatureImage style={{ aspectRatio: '3/4' }}>
                <img src="/images/max_bladt_upclose.webp" alt="Maximilian Bladt - oprichter Optivaize" loading="lazy" />
              </FeatureImage>
            </FadeIn>
          </TwoColEditorial>
        </Container>
      </Section>

      {/* ========= GLOBAL TEAM (DARK) ========= */}
      <Section $dark $pad="120px 0" $padMobile="80px 0">
        <Container>
          <FadeIn>
            <SectionLabel $light>Onze internationale workforce</SectionLabel>
            <SectionH2 $light>Ons team werkt vanuit drie landen.</SectionH2>
            <SectionLede $light>
              AI-onderzoek en projectleiding doen we vanuit Nederland. Development vindt plaats in Mumbai en Manila, waar we toegang hebben tot uitzonderlijk talent. De regie en eindverantwoordelijkheid liggen altijd bij ons Nederlandse team.
            </SectionLede>
          </FadeIn>
          <LocationGrid>
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.08}>
                <LocationCard style={{ background: DARK_SURFACE, color: IVORY, boxShadow: `0 0 0 1px ${DARK_SURFACE}` }}>
                  <LocationIcon style={{ background: 'rgba(110,231,183,0.12)', color: '#6EE7B7' }}>
                    <MapPin size={16} />
                  </LocationIcon>
                  <div>
                    <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '1.05rem', color: IVORY }}>{loc.flag} {loc.city}</div>
                    <div style={{ fontFamily: SANS, fontSize: '0.85rem', color: WARM_SILVER, marginTop: 2 }}>{loc.role}</div>
                  </div>
                </LocationCard>
              </FadeIn>
            ))}
          </LocationGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <SecondaryCta as={Link} to="/hiring" style={{ background: 'transparent', color: IVORY, boxShadow: `0 0 0 1px ${WARM_SILVER}` }}>
              Bekijk vacatures <ArrowUpRight size={14} />
            </SecondaryCta>
          </div>
        </Container>
      </Section>

      {/* ========= INTAKE ========= */}
      <Section $bg={PARCHMENT}>
        <Container>
          <FadeIn>
            <SectionLabel>Hoe we werken</SectionLabel>
            <SectionH2>Van idee tot resultaat in weken.</SectionH2>
            <SectionLede>
              Geen eindeloze trajecten. We werken snel, gestructureerd en resultaatgericht.
            </SectionLede>
          </FadeIn>
          <IntakeGrid>
            {INTAKE.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.06}>
                <IntakeCard>
                  <IntakeNum>{s.num}</IntakeNum>
                  <IntakeIcon $tint={s.tint} $color={s.color}>{s.icon}</IntakeIcon>
                  <IntakeTitle>{s.title}</IntakeTitle>
                  <IntakeText>{s.text}</IntakeText>
                </IntakeCard>
              </FadeIn>
            ))}
          </IntakeGrid>
        </Container>
      </Section>

      {/* ========= EDITORIAL DARK QUOTE ========= */}
      <Section $dark $pad="140px 0" $padMobile="80px 0">
        <Container>
          <TwoColEditorial>
            <FadeIn>
              <SectionLabel $light>Wat opdrachtgevers zeggen</SectionLabel>
              <EditorialQuote>
                Optivaize bouwde in een week wat ons interne team niet voor elkaar kreeg in een kwartaal. Geen hype, geen demo's - gewoon code die werkt.
              </EditorialQuote>
              <QuoteAttribution>
                <strong>Operations</strong> · Nederlandse retailer
              </QuoteAttribution>
            </FadeIn>
            <FadeIn delay={0.15}>
              <FeatureImageDark>
                <img src="/images/home-variants/home-warm-desk.jpg" alt="Schetsen op papier naast een laptop" loading="lazy" />
              </FeatureImageDark>
            </FadeIn>
          </TwoColEditorial>
        </Container>
      </Section>

      {/* ========= FINAL CTA ========= */}
      <Section $bg={PARCHMENT} $pad="80px 0 140px" $padMobile="50px 0 80px">
        <Container>
          <FadeIn>
            <CtaCard>
              <CtaH2>Klaar om <Italic>AI</Italic> in te zetten?</CtaH2>
              <CtaSub>
                Plan een gratis gesprek en ontdek binnen 30 minuten hoe AI jouw bedrijf kan transformeren.
              </CtaSub>
              <CtaButtons>
                <PrimaryCta to="/contact">
                  <Sparkles size={16} /> Plan gratis gesprek
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

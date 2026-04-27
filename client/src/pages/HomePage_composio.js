'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, Phone, Mail, Bot, Code2, TrendingUp, Terminal, Zap, Cpu,
  GraduationCap, ClipboardList, Search, Lightbulb, Wrench, MapPin,
} from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';

/**
 * HomePage_composio - developer-dark / Composio-inspired variant of the real
 * Optivaize home. Same content as HomePage.js, restyled with void-black
 * canvas, ultra-tight headings, geometric sans + JetBrains Mono dual font,
 * brutalist hard-offset shadows. Optivaize blue→green gradient replaces
 * Composio's electric cyan as the only saturated accent.
 */

const VOID_BLACK = '#0f0f0f';
const PURE_BLACK = '#000000';
const SURFACE_DEEP = '#161616';
const PURE_WHITE = '#ffffff';
const GHOST = 'rgba(255,255,255,0.6)';
const WHISPER = 'rgba(255,255,255,0.5)';
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

/* ============== CARD GRIDS ============== */
const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const Grid4 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const DarkCard = styled.div`
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  padding: 2rem 1.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    border-color: ${MIST_12};
    background: ${SURFACE_DEEP};
    transform: translate(-2px, -2px);
    box-shadow: rgba(0,0,0,0.5) 4px 4px 0px 0px;
  }
`;

const DarkCardLink = styled(DarkCard).attrs({ as: Link })`
  text-decoration: none;
  color: ${PURE_WHITE};
`;

const SmallIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: ${(p) => p.$tint || 'rgba(59,130,246,0.10)'};
  border: 1px solid ${MIST_10};
  color: ${(p) => p.$color || OPTI_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TagLine = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  color: ${WHISPER};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 0.4rem;
`;

const CardTitle = styled.h3`
  font-family: ${SANS};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.20;
  margin: 0 0 0.5rem;
  color: ${PURE_WHITE};
`;

const CardCopy = styled.p`
  font-family: ${SANS};
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${GHOST};
  margin: 0 0 1.25rem;
`;

const CardLink = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  font-family: ${MONO};
  font-size: 0.85rem;
  color: ${OPTI_BLUE};
  letter-spacing: 0.3px;
`;

/* ============== CASES (terminal grid) ============== */
const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const CaseTile = styled(Link)`
  position: relative;
  display: block;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4/5;
  border: 1px solid ${MIST_10};
  background: ${PURE_BLACK};
  text-decoration: none;
  color: ${PURE_WHITE};
  box-shadow: rgba(0,0,0,0.4) 4px 4px 0px 0px;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: rgba(0,0,0,0.5) 6px 6px 0px 0px;
  }
`;

const CaseTileImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 60%;
  object-fit: cover;
  opacity: 0.85;
`;

const CaseTileBody = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1.4rem;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.92) 30%);
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CaseTileSlug = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  color: ${OPTI_GREEN};
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
  &::before { content: '> '; color: ${WHISPER}; }
`;

const CaseTileTitle = styled.div`
  font-family: ${SANS};
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.20;
  color: ${PURE_WHITE};
`;

const CaseTilePreview = styled.div`
  font-family: ${SANS};
  font-size: 0.85rem;
  color: ${GHOST};
  margin-top: 0.35rem;
  line-height: 1.4;
`;

/* ============== FEATURED 2-COL ============== */
const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const FeaturedImage = styled.div`
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4/3;
  border: 1px solid ${MIST_12};
  box-shadow: rgba(0,0,0,0.5) 4px 4px 0px 0px;
  & img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.95; }
  @media (max-width: 768px) { aspect-ratio: 5/3; }
`;

const FeatureBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1.25rem 0 1.5rem;
`;

const FeatureBadge = styled.span`
  font-family: ${MONO};
  font-size: 12px;
  color: ${PURE_WHITE};
  background: ${PURE_BLACK};
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  border: 1px solid ${MIST_10};
  letter-spacing: 0.3px;
`;

const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${MONO};
  font-size: 0.9rem;
  color: ${OPTI_BLUE};
  text-decoration: none;
  letter-spacing: 0.3px;
  &:hover { text-decoration: underline; }
`;

/* ============== TERMINAL CODE BLOCK ============== */
const Term = styled.div`
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

const TermDots = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 1rem;
  & span {
    width: 10px; height: 10px; border-radius: 50%;
    background: ${MIST_12};
  }
`;

const TermLine = styled.div`
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

/* ============== INTAKE ============== */
const IntakeNum = styled.div`
  font-family: ${MONO};
  font-size: 12px;
  color: ${OPTI_GREEN};
  letter-spacing: 0.5px;
  margin-bottom: 0.85rem;
  &::before { content: '['; color: ${WHISPER}; }
  &::after { content: ']'; color: ${WHISPER}; }
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
  background: ${PURE_BLACK};
  border: 1px solid ${MIST_10};
  border-radius: 4px;
  padding: 1.4rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  & .city {
    font-family: ${SANS};
    font-weight: 500;
    font-size: 1.05rem;
    color: ${PURE_WHITE};
  }
  & .role {
    font-family: ${MONO};
    font-size: 12px;
    color: ${GHOST};
    margin-top: 2px;
    letter-spacing: 0.3px;
  }
`;

const LocIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: rgba(59,130,246,0.10);
  border: 1px solid ${MIST_10};
  color: ${OPTI_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

/* ============== ABOUT MAX ============== */
const AboutImage = styled.div`
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 3/4;
  border: 1px solid ${MIST_12};
  box-shadow: rgba(0,0,0,0.5) 4px 4px 0px 0px;
  & img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.95; }
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
const PILLARS = [
  { tag: '01 / DEPLOY', icon: <Bot size={20} strokeWidth={1.6} />, tint: 'rgba(59,130,246,0.10)', color: OPTI_BLUE,
    title: 'AI inzetten',
    text: 'We zetten AI rechtstreeks in jouw bestaande workflows. Geen lange transformatie-trajecten - direct meetbaar resultaat.' },
  { tag: '02 / TRAIN', icon: <GraduationCap size={20} strokeWidth={1.6} />, tint: 'rgba(249,115,22,0.10)', color: '#F97316',
    title: 'AI training',
    text: 'We bouwen het fundament door je hele team te trainen. Van management tot uitvoering - iedereen leert AI productief gebruiken.' },
  { tag: '03 / BUILD', icon: <Code2 size={20} strokeWidth={1.6} />, tint: 'rgba(16,185,129,0.10)', color: OPTI_GREEN,
    title: 'AI bouwen',
    text: 'Custom AI-applicaties op maat: van automatiseringen tot complete platforms. Sneller dan traditionele bureaus.' },
];

const SERVICES = [
  { tag: '01 / SOFTWARE', icon: <Code2 size={20} strokeWidth={1.6} />, tint: 'rgba(139,92,246,0.10)', color: '#8B5CF6',
    title: 'Software & Platforms',
    copy: 'Custom software, dashboards en automatisering. Van maatwerk platforms tot volledig geautomatiseerde workflows.',
    href: '/software-platforms' },
  { tag: '02 / AI AGENTS', icon: <Bot size={20} strokeWidth={1.6} />, tint: 'rgba(59,130,246,0.10)', color: OPTI_BLUE,
    title: 'AI Agents & Chatbots',
    copy: 'Autonome AI agents en chatbots die 24/7 taken overnemen, klanten helpen en processen automatiseren.',
    href: '/ai-agents-chatbots' },
  { tag: '03 / MARKETING', icon: <TrendingUp size={20} strokeWidth={1.6} />, tint: 'rgba(16,185,129,0.10)', color: OPTI_GREEN,
    title: 'AI Marketing',
    copy: 'AI-SEO, content automatisering en Google Ads optimalisatie voor maximale organische groei.',
    href: '/ai-marketing' },
];

const INTAKE = [
  { num: '[01]', icon: <ClipboardList size={20} />, tint: 'rgba(59,130,246,0.10)', color: OPTI_BLUE,
    title: 'Jouw case', text: 'Presenteer je bedrijfsvraagstuk. Wat wil je bereiken en waar loop je tegenaan?' },
  { num: '[02]', icon: <Search size={20} />, tint: 'rgba(16,185,129,0.10)', color: OPTI_GREEN,
    title: 'Wij reviewen', text: 'We analyseren je situatie en beoordelen de mogelijkheden grondig.' },
  { num: '[03]', icon: <Lightbulb size={20} />, tint: 'rgba(245,158,11,0.10)', color: '#F59E0B',
    title: 'Beste oplossing', text: 'We bedenken de meest impactvolle AI-oplossing voor jouw specifieke situatie.' },
  { num: '[04]', icon: <Wrench size={20} />, tint: 'rgba(139,92,246,0.10)', color: '#8B5CF6',
    title: 'Wij bouwen', text: 'We bouwen en implementeren de oplossing, niet in maanden maar in weken.' },
];

const LOCATIONS = [
  { flag: '🇳🇱', city: 'Utrecht', role: 'ai_research // hq' },
  { flag: '🇮🇳', city: 'Mumbai', role: 'engineering' },
  { flag: '🇵🇭', city: 'Manila', role: 'engineering' },
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
export default function HomePage_composio({ initialCases = [] }) {
  const homeCases = HOME_CASE_SLUGS
    .map((slug) => initialCases.find((c) => c.slug === slug) || CASE_FALLBACKS.find((c) => c.slug === slug))
    .filter(Boolean);

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
                De snelste <HeroAccent>AI partner</HeroAccent> van Nederland.
              </HeroH1>
              <HeroSub>
                Wij helpen jouw bedrijf AI te gebruiken, te bouwen en het hele team te trainen om er efficient mee te werken. Niet in maanden, maar in weken.
              </HeroSub>
              <CtaRow>
                <PrimaryCta to="/contact">
                  <Zap size={16} /> Plan gratis gesprek
                </PrimaryCta>
                <GhostCta href="tel:+31642698918">
                  <Phone size={16} /> Bel ons
                </GhostCta>
              </CtaRow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <HeroVisual>
                <img src="/images/home-variants/home-dark-code.jpg" alt="Code editor" loading="lazy" />
                <HeroVisualOverlay />
              </HeroVisual>
            </FadeIn>
          </HeroInner>

          <FadeIn delay={0.2}>
            <StatsBar>
              <StatCell>
                <StatNum><span className="accent">150+</span></StatNum>
                <StatLabel>bedrijven</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum>40+</StatNum>
                <StatLabel>uur/week bespaard</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum><span className="accent">3×</span></StatNum>
                <StatLabel>sneller bouwen</StatLabel>
              </StatCell>
              <StatCell>
                <StatNum>1-3d</StatNum>
                <StatLabel>tot live</StatLabel>
              </StatCell>
            </StatsBar>
          </FadeIn>
        </Container>
      </Hero>

      {/* ========= IDENTITY / 3 PILLARS ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Cpu size={11} /> who_we_are</SectionTag>
            <SectionH2>We bouwen AI in jouw organisatie - niet ernaast.</SectionH2>
            <SectionLede>
              Geen hype, geen powerpoints. We zetten AI rechtstreeks in jouw bedrijfsprocessen, trainen je team, en bouwen de applicaties die jouw concurrentie nog niet heeft.
            </SectionLede>
          </FadeIn>
          <Grid3>
            {PILLARS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <DarkCard>
                  <SmallIcon $tint={p.tint} $color={p.color}>{p.icon}</SmallIcon>
                  <TagLine>{p.tag}</TagLine>
                  <CardTitle>{p.title}</CardTitle>
                  <CardCopy style={{ marginBottom: 0 }}>{p.text}</CardCopy>
                </DarkCard>
              </FadeIn>
            ))}
          </Grid3>
        </Container>
      </Section>

      {/* ========= CASES ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Code2 size={11} /> recent_work</SectionTag>
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
                  <CaseTileBody>
                    <CaseTileSlug>{(c.slug || 'project').replace(/-/g, '_')}.case</CaseTileSlug>
                    <CaseTileTitle>{c.title_nl || c.title}</CaseTileTitle>
                    <CaseTilePreview>{c.preview_nl || c.subtitle || ''}</CaseTilePreview>
                  </CaseTileBody>
                </CaseTile>
              </FadeIn>
            ))}
          </CaseGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <GhostCta as={Link} to="/cases">
              Bekijk alle cases <ArrowRight size={14} />
            </GhostCta>
          </div>
        </Container>
      </Section>

      {/* ========= WIM HOF FEATURED ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <TwoCol>
            <FadeIn>
              <FeaturedImage>
                <img src="/images/wimhof.webp" alt="Wim Hof - Passion Ice Baths" loading="lazy" />
              </FeaturedImage>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionTag><Zap size={11} /> featured_case</SectionTag>
              <SectionH2>Wim Hof's merk groeit organisch met AI-gedreven SEO.</SectionH2>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: GHOST, margin: '0 0 1.25rem' }}>
                Voor Passion Ice Baths bouwden we een volledig AI-gedreven SEO-systeem op basis van GA4-data en Google Search Console. We trainden een eigen model op hun merkstijl - genereert content die authentiek aanvoelt en tegelijk technisch geoptimaliseerd is.
              </p>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: GHOST, margin: '0 0 1rem' }}>
                Daarbovenop bouwen we een custom Shopify-app die het hele content-publication-proces automatiseert.
              </p>
              <FeatureBadgeRow>
                <FeatureBadge>ga4_data</FeatureBadge>
                <FeatureBadge>search_console</FeatureBadge>
                <FeatureBadge>custom_model</FeatureBadge>
                <FeatureBadge>shopify_app</FeatureBadge>
              </FeatureBadgeRow>
              <FeatureLink to="/cases"> Bekijk alle cases <ArrowRight size={14} /></FeatureLink>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ========= SERVICES ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Cpu size={11} /> services</SectionTag>
            <SectionH2>AI voor elk onderdeel van je bedrijf.</SectionH2>
            <SectionLede>
              Van agents tot automatisering, van software tot strategie - wij bouwen het allemaal, met dezelfde mensen.
            </SectionLede>
          </FadeIn>
          <Grid3>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.href} delay={0.08 * i}>
                <DarkCardLink to={s.href}>
                  <SmallIcon $tint={s.tint} $color={s.color}>{s.icon}</SmallIcon>
                  <TagLine>{s.tag}</TagLine>
                  <CardTitle>{s.title}</CardTitle>
                  <CardCopy>{s.copy}</CardCopy>
                  <CardLink>view dienst <ArrowRight size={14} /></CardLink>
                </DarkCardLink>
              </FadeIn>
            ))}
          </Grid3>

          {/* terminal mock */}
          <FadeIn delay={0.15}>
            <Term>
              <TermDots><span /><span /><span /></TermDots>
              <TermLine><span className="prompt">$</span> curl https://api.optivaize.nl/agent/<span className="key">tandarts</span></TermLine>
              <TermLine>{'{'}</TermLine>
              <TermLine>&nbsp;&nbsp;<span className="key">"status"</span>: <span className="str">"ready"</span>,</TermLine>
              <TermLine>&nbsp;&nbsp;<span className="key">"voice"</span>: <span className="str">"marin (NL)"</span>,</TermLine>
              <TermLine>&nbsp;&nbsp;<span className="key">"tools"</span>: [<span className="str">"vrije_tijden_opvragen"</span>, <span className="str">"boek_afspraak"</span>, <span className="str">"verbind_medewerker"</span>],</TermLine>
              <TermLine>&nbsp;&nbsp;<span className="key">"max_session_seconds"</span>: 180,</TermLine>
              <TermLine>&nbsp;&nbsp;<span className="key">"latency_p50_ms"</span>: 220</TermLine>
              <TermLine>{'}'}</TermLine>
              <TermLine style={{ marginTop: '0.5rem' }}><span className="ok">✓</span> session minted in 84ms</TermLine>
            </Term>
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

      {/* ========= ABOUT MAX ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionTag><Cpu size={11} /> about_us</SectionTag>
              <SectionH2>Gestart vanuit passie voor AI, gegroeid tot een internationaal team.</SectionH2>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: GHOST, margin: '0 0 1.25rem' }}>
                Maximilian Bladt startte Optivaize nadat hij in 2020 de eerste AI-modellen zag opkomen. Na 2 jaar Elevate Digital, een Business bachelor, Econometrie premaster en een master Quantitative Finance aan de UvA, was de stap naar Optivaize logisch.
              </p>
              <p style={{ fontFamily: SANS, fontSize: '1.05rem', lineHeight: 1.55, color: GHOST, margin: '0 0 1.5rem' }}>
                In de afgelopen vijf jaar bouwden we tientallen AI-tools en platformen voor Nederlandse klanten - van automatiseringen die duizenden uren besparen tot complete AI-systemen die omzet verhogen.
              </p>
              <FeatureLink to="/over-ons">Meer over ons <ArrowRight size={14} /></FeatureLink>
            </FadeIn>
            <FadeIn delay={0.1}>
              <AboutImage>
                <img src="/images/max_bladt_upclose.webp" alt="Maximilian Bladt - oprichter Optivaize" loading="lazy" />
              </AboutImage>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ========= GLOBAL TEAM ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><MapPin size={11} /> global_workforce</SectionTag>
            <SectionH2>Ons team werkt vanuit drie landen.</SectionH2>
            <SectionLede>
              AI-onderzoek en projectleiding doen we vanuit Nederland. Development vindt plaats in Mumbai en Manila, waar we toegang hebben tot uitzonderlijk talent. Regie en eindverantwoordelijkheid blijven bij ons Nederlandse team.
            </SectionLede>
          </FadeIn>
          <LocationGrid>
            {LOCATIONS.map((loc, i) => (
              <FadeIn key={loc.city} delay={i * 0.08}>
                <LocationCard>
                  <LocIcon><MapPin size={16} /></LocIcon>
                  <div>
                    <div className="city">{loc.flag} {loc.city}</div>
                    <div className="role">{loc.role}</div>
                  </div>
                </LocationCard>
              </FadeIn>
            ))}
          </LocationGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <GhostCta as={Link} to="/hiring">Bekijk vacatures <ArrowRight size={14} /></GhostCta>
          </div>
        </Container>
      </Section>

      {/* ========= INTAKE / PROCESS ========= */}
      <Section $pad="100px 0" $padMobile="60px 0">
        <Container>
          <FadeIn>
            <SectionTag><Code2 size={11} /> process</SectionTag>
            <SectionH2>Van idee tot resultaat in weken.</SectionH2>
            <SectionLede>
              Geen eindeloze trajecten. We werken snel, gestructureerd en resultaatgericht.
            </SectionLede>
          </FadeIn>
          <Grid4>
            {INTAKE.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.06}>
                <DarkCard>
                  <IntakeNum>{s.num.replace(/[\[\]]/g, '')}</IntakeNum>
                  <SmallIcon $tint={s.tint} $color={s.color}>{s.icon}</SmallIcon>
                  <CardTitle>{s.title}</CardTitle>
                  <CardCopy style={{ marginBottom: 0 }}>{s.text}</CardCopy>
                </DarkCard>
              </FadeIn>
            ))}
          </Grid4>
        </Container>
      </Section>

      {/* ========= FINAL CTA ========= */}
      <Section $pad="80px 0 140px" $padMobile="50px 0 80px">
        <Container>
          <FadeIn>
            <CtaCard>
              <CtaGlow />
              <CtaH2>Klaar om <HeroAccent>AI</HeroAccent> in te zetten?</CtaH2>
              <CtaSub>
                Plan een gratis gesprek en ontdek binnen 30 minuten hoe AI jouw bedrijf kan transformeren.
              </CtaSub>
              <CtaButtons>
                <PrimaryCta to="/contact">
                  <Zap size={16} /> Plan gratis gesprek
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

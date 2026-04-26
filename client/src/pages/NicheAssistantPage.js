'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mic, Phone, Star, Zap, Shield, Sparkles, Headphones, Clock, Users,
  ArrowRight, CheckCircle, ChevronDown, Activity, MessageSquare, Plug,
  RefreshCcw, TrendingUp, BadgeCheck, PhoneCall, ArrowDown,
} from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';
import VoiceDemo from '../components/voice/VoiceDemo';
import { CASE_REGISTRY } from '../components/voice/cases';
import { getNiche } from '../components/voice/niche-content';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';
const DARK_GRADIENT = 'linear-gradient(135deg, #0A0F1F 0%, #131A33 60%, #1E293B 100%)';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >{children}</motion.div>
  );
}

/* ===== HERO ===== */
const Hero = styled.section`
  position: relative;
  padding: 130px 0 60px;
  background: ${DARK_GRADIENT};
  overflow: hidden;
  color: white;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 80% 30%, rgba(59,130,246,0.18), transparent),
      radial-gradient(ellipse 40% 40% at 15% 70%, rgba(16,185,129,0.12), transparent);
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6EE7B7;
  margin-bottom: 1rem;
`;

const H1 = styled.h1`
  font-size: clamp(2.1rem, 5vw, 3.5rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1.2rem;
`;

const Highlight = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  font-size: 1.1rem;
  line-height: 1.55;
  color: #CBD5E1;
  margin: 0 0 1.75rem;
  max-width: 540px;
`;

const HeroCtas = styled.div`
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const Primary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  border: none;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(59,130,246,0.35);
  transition: transform 0.15s;
  &:hover { transform: translateY(-2px); }
`;

const Secondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.06);
  color: white;
  border: 1px solid rgba(255,255,255,0.18);
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.1); }
`;

const HeroBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: #CBD5E1;
  background: rgba(255,255,255,0.05);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.08);
`;

const HeroImageWrap = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 30px 60px rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.08);
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const HeroImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.6));
`;

/* ===== TRUSTPILOT BAR ===== */
const TrustBar = styled.section`
  background: white;
  border-bottom: 1px solid #E2E8F0;
  padding: 1rem 0;
`;

const TrustInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-size: 0.92rem;
  color: #475569;
  @media (max-width: 640px) { gap: 0.75rem; font-size: 0.85rem; }
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StarBox = styled.span`
  width: 24px;
  height: 24px;
  background: #00B67A;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  & svg { fill: white; color: white; }
  ${(p) => p.$half && `
    background: linear-gradient(90deg, #00B67A 50%, #DCFCE7 50%);
  `}
`;

const TrustText = styled.div`
  font-weight: 600;
  color: #0F172A;
  & strong { color: #0F172A; }
`;

const TrustLogo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  color: #00B67A;
  font-size: 1rem;
  letter-spacing: -0.02em;
`;

/* ===== MAIN TWO-COL LAYOUT ===== */
const Section = styled.section`
  padding: ${(p) => p.$pad || '70px 0'};
  background: ${(p) => p.$bg || 'white'};
  position: relative;
  ${(p) => p.$bg === 'dark' && `
    background: linear-gradient(180deg, #0F172A, #1E293B);
    color: white;
  `}
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StickyDemoCol = styled.div`
  position: sticky;
  top: 100px;
  align-self: start;
  @media (max-width: 1024px) {
    position: static;
    order: -1;
    margin-bottom: 1rem;
  }
`;

const SectionEyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #3B82F6;
  margin-bottom: 0.75rem;
`;

const H2 = styled.h2`
  font-size: clamp(1.7rem, 3.2vw, 2.4rem);
  font-weight: 800;
  margin: 0 0 0.85rem;
  letter-spacing: -0.02em;
  color: ${(p) => (p.$light ? 'white' : '#0F172A')};
`;

const SectionSub = styled.p`
  font-size: 1.02rem;
  line-height: 1.6;
  color: ${(p) => (p.$light ? '#94A3B8' : '#475569')};
  margin: 0 0 2rem;
  max-width: 600px;
`;

/* ===== BEWEZEN IN ECHTE TEAMS - PLATFORM LOGOS ===== */
const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.85rem;
`;

const PlatformCard = styled.div`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1.25rem 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 110px;
  transition: all 0.2s;
  &:hover { transform: translateY(-2px); border-color: #3B82F6; box-shadow: 0 10px 24px rgba(59,130,246,0.12); }
`;

const PlatformLogo = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #F8FAFC;
  overflow: hidden;
  & img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PlatformLogoFallback = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: ${GRADIENT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.15rem;
`;

const PlatformName = styled.div`
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
  text-align: center;
`;

function PlatformItem({ name, domain }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    // If the image already errored before React attached the handler (common on
    // SSR'd pages), check its loaded state explicitly.
    if (img.complete) {
      if (!img.naturalWidth) setFailed(true);
      return;
    }
    const handleLoad = () => { if (!img.naturalWidth) setFailed(true); };
    const handleError = () => setFailed(true);
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <PlatformCard title={name}>
      {failed ? (
        <PlatformLogoFallback>{name[0]}</PlatformLogoFallback>
      ) : (
        <PlatformLogo>
          <img
            ref={imgRef}
            src={`https://logo.clearbit.com/${domain}`}
            alt={name}
            onError={() => setFailed(true)}
          />
        </PlatformLogo>
      )}
      <PlatformName>{name}</PlatformName>
    </PlatformCard>
  );
}

/* ===== FLOW GRAPH (% breakdown) ===== */
const FlowWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlowStep = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 1.25rem;
  align-items: center;
  padding: 1.5rem;
  background: ${(p) => p.$bg || 'white'};
  border: 1px solid ${(p) => p.$border || '#E2E8F0'};
  border-radius: 18px;
  position: relative;
  &::after {
    content: '';
    display: ${(p) => (p.$last ? 'none' : 'block')};
    position: absolute;
    left: 60px;
    bottom: -16px;
    width: 2px;
    height: 16px;
    background: ${(p) => p.$lineColor || '#CBD5E1'};
  }
  @media (max-width: 600px) { grid-template-columns: 80px 1fr; padding: 1rem; }
`;

const PercentBubble = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${(p) => p.$bg || GRADIENT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.5rem;
  box-shadow: 0 8px 24px ${(p) => p.$shadow || 'rgba(59,130,246,0.3)'};
  flex-shrink: 0;
  @media (max-width: 600px) { width: 72px; height: 72px; font-size: 1.2rem; }
`;

const FlowText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const FlowLabel = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F172A;
`;

const FlowDesc = styled.div`
  font-size: 0.92rem;
  color: #475569;
  line-height: 1.5;
`;

/* ===== CARDS (benefits, voor de eindgebruiker) ===== */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.1rem;
`;

const InfoCard = styled.div`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  transition: all 0.2s;
  &:hover { transform: translateY(-2px); border-color: #3B82F6; box-shadow: 0 10px 24px rgba(15,23,42,0.06); }
`;

const InfoIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: ${(p) => p.$bg || 'rgba(59,130,246,0.1)'};
  color: ${(p) => p.$color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0F172A;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.55;
`;

/* ===== STEPS ===== */
const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.1rem;
`;

const StepCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const StepNum = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 0.9rem;
`;

/* ===== PHONE INTEGRATION CALLOUT ===== */
const PhoneCallout = styled.div`
  background: ${GRADIENT};
  border-radius: 24px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  color: white;
  box-shadow: 0 24px 50px rgba(59,130,246,0.25);
  @media (max-width: 768px) { grid-template-columns: 1fr; text-align: center; gap: 1rem; }
`;

const PhoneCalloutIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(255,255,255,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  @media (max-width: 768px) { margin: 0 auto; }
`;

/* ===== PRICING ===== */
const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  max-width: 760px;
`;

const PriceCard = styled.div`
  background: white;
  border: 2px solid ${(p) => (p.$featured ? '#3B82F6' : '#E2E8F0')};
  border-radius: 22px;
  padding: 1.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
  ${(p) => p.$featured && `
    box-shadow: 0 24px 50px rgba(59,130,246,0.15);
  `}
`;

const FeatBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${GRADIENT};
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const PriceAmount = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1;
  span { font-size: 0.95rem; color: #64748B; font-weight: 500; }
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const PriceLi = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #334155;
`;

/* ===== FAQ ===== */
const FaqList = styled.div`
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FaqItem = styled.details`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  &[open] { box-shadow: 0 6px 18px rgba(15,23,42,0.05); }
  summary {
    cursor: pointer;
    font-weight: 600;
    color: #0F172A;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  summary::-webkit-details-marker { display: none; }
  summary svg { transition: transform 0.2s; flex-shrink: 0; }
  &[open] summary svg { transform: rotate(180deg); }
  p { margin: 0.85rem 0 0; color: #475569; line-height: 1.6; font-size: 0.95rem; }
`;

/* ===== EXAMPLES (try saying) ===== */
const ExamplesCard = styled.div`
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.85rem;
`;

const ExamplesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #0F172A;
  font-weight: 700;
  font-size: 0.9rem;
`;

const ExampleLine = styled.div`
  font-size: 0.88rem;
  color: #334155;
  line-height: 1.4;
  padding-left: 1rem;
  position: relative;
  &::before {
    content: '"';
    position: absolute;
    left: 0;
    color: #94A3B8;
  }
`;

/* ===== FINAL CTA ===== */
const FinalCta = styled.div`
  background: ${GRADIENT};
  border-radius: 28px;
  padding: 3.5rem 2.5rem;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  box-shadow: 0 30px 60px rgba(59,130,246,0.25);
`;

/* ===== Component ===== */
function getInitialState(caseKey) {
  if (typeof window === 'undefined') return null;
  return CASE_REGISTRY[caseKey].initialState;
}

export default function NicheAssistantPage({ nicheKey }) {
  const niche = getNiche(nicheKey);
  const [mounted, setMounted] = useState(false);
  const [demoState, setDemoState] = useState(null);
  const stateRef = useRef(null);
  const demoTopRef = useRef(null);

  useEffect(() => {
    setDemoState(CASE_REGISTRY[nicheKey].initialState);
    setMounted(true);
  }, [nicheKey]);

  useEffect(() => { stateRef.current = demoState; }, [demoState]);

  const onToolCall = useCallback(async (name, args) => {
    const caseDef = CASE_REGISTRY[nicheKey];
    return caseDef.executeTool(name, args, stateRef.current, setDemoState);
  }, [nicheKey]);

  const FakeBackend = mounted && demoState ? CASE_REGISTRY[nicheKey].Component : null;

  function scrollToDemo() {
    if (demoTopRef.current) demoTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (!niche) return null;

  return (
    <>
      <SEOHead title={niche.seo.title} description={niche.seo.description} keywords={niche.seo.keywords} />

      <Hero>
        <Container>
          <HeroInner>
            <div>
              <Eyebrow>{niche.hero.eyebrow}</Eyebrow>
              <H1>
                {niche.hero.h1Lead} <Highlight>{niche.hero.h1Highlight}</Highlight> {niche.hero.h1Tail}
              </H1>
              <Sub>{niche.hero.sub}</Sub>
              <HeroCtas>
                <Primary onClick={scrollToDemo}><Mic size={18} /> Probeer de live demo</Primary>
                <Secondary href="#pricing"><ArrowDown size={16} /> Bekijk prijzen</Secondary>
              </HeroCtas>
              <HeroBadges>
                <HeroBadge><BadgeCheck size={13} color="#10B981" /> Live binnen 1-3 dagen</HeroBadge>
                <HeroBadge><Clock size={13} color="#10B981" /> 24/7 bereikbaar</HeroBadge>
                <HeroBadge><Shield size={13} color="#10B981" /> AVG-proof, EU data</HeroBadge>
                <HeroBadge><Headphones size={13} color="#10B981" /> Menselijke escalatie</HeroBadge>
              </HeroBadges>
            </div>
            <HeroImageWrap>
              <HeroImg src={niche.hero.image} alt={niche.hero.imageAlt} />
              <HeroImageOverlay />
            </HeroImageWrap>
          </HeroInner>
        </Container>
      </Hero>

      <TrustBar>
        <Container>
          <TrustInner>
            <Stars>
              {[1,2,3,4,5].map(i => (
                <StarBox key={i} $half={i === 5}><Star size={14} fill="white" strokeWidth={0} /></StarBox>
              ))}
            </Stars>
            <TrustText>
              <strong>4.9</strong> op 12 reviews
            </TrustText>
            <TrustLogo>★ Trustpilot</TrustLogo>
            <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Aanbevolen door Nederlandse {niche.pretty}</span>
          </TrustInner>
        </Container>
      </TrustBar>

      <Section ref={demoTopRef} id="demo" $bg="#F8FAFC" $pad="60px 0">
        <Container>
          <TwoCol>
            <ContentCol>
              {/* Bewezen in echte teams */}
              <FadeIn>
                <SectionEyebrow>Bewezen in echte teams</SectionEyebrow>
                <H2>{niche.bewezen.title}</H2>
                <SectionSub>{niche.bewezen.sub}</SectionSub>
                <PlatformGrid>
                  {niche.bewezen.platforms.map(p => (
                    <PlatformItem key={p.name} name={p.name} domain={p.domain} />
                  ))}
                </PlatformGrid>
              </FadeIn>

              {/* Flow graph */}
              <FadeIn>
                <SectionEyebrow>Zo haalt Robin direct werk van je team af</SectionEyebrow>
                <H2>Van eerste oproep tot directe oplossing of slimme overdracht</H2>
                <SectionSub>Niemand wacht. Niemand wordt aan het lijntje gehouden. Wat de assistent niet kan, gaat met volledige context naar een mens - meestal zonder dat de klant het door heeft.</SectionSub>
                <FlowWrap>
                  <FlowStep $bg="#EFF6FF" $border="#BFDBFE" $lineColor="#3B82F6">
                    <PercentBubble $bg={GRADIENT} $shadow="rgba(59,130,246,0.3)">
                      {niche.flow.pickup}%
                    </PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.pickupLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.pickupSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                  <FlowStep $bg="#ECFDF5" $border="#A7F3D0" $lineColor="#10B981">
                    <PercentBubble $bg="linear-gradient(135deg, #10B981, #059669)" $shadow="rgba(16,185,129,0.3)">
                      {niche.flow.solved}%
                    </PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.solvedLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.solvedSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                  <FlowStep $bg="#FEF3C7" $border="#FCD34D" $last>
                    <PercentBubble $bg="linear-gradient(135deg, #F59E0B, #D97706)" $shadow="rgba(245,158,11,0.3)">
                      {niche.flow.escalated}%
                    </PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.escalatedLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.escalatedSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                </FlowWrap>
              </FadeIn>

              {/* Benefits */}
              <FadeIn>
                <SectionEyebrow>Wat het je oplevert</SectionEyebrow>
                <H2>Concrete winst, geen vage AI-beloftes</H2>
                <CardGrid style={{ marginTop: '1rem' }}>
                  {niche.benefits.map((b, i) => (
                    <InfoCard key={i}>
                      <InfoIcon $bg="rgba(16,185,129,0.1)" $color="#10B981">
                        {i === 0 ? <Users size={20} /> : i === 1 ? <Activity size={20} /> : <Clock size={20} />}
                      </InfoIcon>
                      <InfoTitle>{b.title}</InfoTitle>
                      <InfoText>{b.text}</InfoText>
                    </InfoCard>
                  ))}
                </CardGrid>
              </FadeIn>

              {/* Phone integration callout */}
              <FadeIn>
                <PhoneCallout>
                  <PhoneCalloutIcon><PhoneCall size={32} color="white" /></PhoneCalloutIcon>
                  <div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.3rem', fontWeight: 800 }}>Klaar voor jouw +31 telefoonnummer</h3>
                    <p style={{ margin: 0, opacity: 0.92, fontSize: '0.98rem', lineHeight: 1.5 }}>
                      We koppelen de assistent aan je bestaande zakelijke nummer via VoIP. Klanten bellen jouw nummer zoals altijd - de assistent neemt direct op. We regelen alles in de setup, jij hoeft niets te doen.
                    </p>
                  </div>
                  <Link href="/contact" style={{ textDecoration: 'none' }}>
                    <Secondary as="span" style={{ background: 'white', color: '#0F172A', borderColor: 'white', whiteSpace: 'nowrap' }}>
                      Vraag aan <ArrowRight size={16} />
                    </Secondary>
                  </Link>
                </PhoneCallout>
              </FadeIn>
            </ContentCol>

            <StickyDemoCol>
              <div style={{ marginBottom: '0.85rem' }}>
                <Eyebrow style={{ color: '#3B82F6' }}>Live Demo</Eyebrow>
                <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.05rem', color: '#0F172A', fontWeight: 700 }}>Bel nu met de AI</h3>
              </div>
              <VoiceDemo
                caseKey={nicheKey}
                caller={{ name: niche.callerName, sub: niche.callerSub }}
                onToolCall={onToolCall}
              />
              <ExamplesCard>
                <ExamplesTitle><Sparkles size={14} color="#3B82F6" /> Probeer iets als</ExamplesTitle>
                {niche.examples.map((e, i) => (
                  <ExampleLine key={i}>{e.replace(/^"|"$/g, '')}</ExampleLine>
                ))}
              </ExamplesCard>
              {/* Show the live fake backend underneath the demo on mobile, beside otherwise (already inside sticky col) */}
              <div style={{ marginTop: '1rem' }}>
                {FakeBackend && demoState ? (
                  <FakeBackend state={demoState} />
                ) : (
                  <div style={{ background: 'white', borderRadius: 18, padding: '1.5rem', border: '1px solid #E2E8F0', textAlign: 'center', color: '#94A3B8', fontSize: '0.9rem' }}>
                    Demo wordt geladen...
                  </div>
                )}
              </div>
            </StickyDemoCol>
          </TwoCol>
        </Container>
      </Section>

      <Section $bg="dark">
        <Container>
          <SectionEyebrow style={{ color: '#6EE7B7' }}>Zo werkt het</SectionEyebrow>
          <H2 $light>Van eerste gesprek tot live in 1-3 dagen</H2>
          <SectionSub $light>We koppelen aan jouw systemen, trainen de assistent op jouw bedrijfsinfo en testen samen. Klaar voor klantgesprekken binnen een paar dagen.</SectionSub>
          <Steps>
            {[
              { n: 1, icon: <MessageSquare size={20} color="#10B981" />, t: 'Intakegesprek (30 min)', d: 'Vrijblijvend gesprek over jouw branche, processen en welke systemen je gebruikt.' },
              { n: 2, icon: <Plug size={20} color="#10B981" />, t: 'Koppeling & training', d: `We koppelen aan ${niche.bewezen.platforms.slice(0, 2).map(p => p.name).join(' / ')} en trainen op jouw eigen content en tone of voice.` },
              { n: 3, icon: <RefreshCcw size={20} color="#10B981" />, t: 'Live testen', d: 'Je test live, geeft feedback en wij verfijnen. Binnen een paar dagen klaar voor echte klantgesprekken.' },
              { n: 4, icon: <TrendingUp size={20} color="#10B981" />, t: 'Schaal mee', d: 'De assistent leert door en wij optimaliseren maandelijks - zonder extra kosten.' },
            ].map((s) => (
              <FadeIn key={s.n} delay={s.n * 0.05}>
                <StepCard>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <StepNum>{s.n}</StepNum>
                    {s.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1rem', color: 'white' }}>{s.t}</h3>
                  <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.55, fontSize: '0.88rem' }}>{s.d}</p>
                </StepCard>
              </FadeIn>
            ))}
          </Steps>
        </Container>
      </Section>

      <Section id="pricing">
        <Container>
          <SectionEyebrow>Pricing</SectionEyebrow>
          <H2>Eenvoudige prijzen, geen verrassingen</H2>
          <SectionSub>Eenmalige setup om alles aan jouw systemen te koppelen. Daarna een vast laag bedrag per maand met onbeperkt gebruik.</SectionSub>
          <PriceGrid>
            <PriceCard>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>Setup</div>
              <PriceAmount>€750 <span>tot €2.500</span></PriceAmount>
              <SectionSub style={{ fontSize: '0.88rem', margin: 0 }}>Eenmalig - afhankelijk van koppelingen</SectionSub>
              <PriceList>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Branche-specifieke training voor {niche.short.toLowerCase()}</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Koppeling met jouw systemen</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Setup van menselijke escalatie</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Live binnen 1-3 dagen</PriceLi>
              </PriceList>
            </PriceCard>
            <PriceCard $featured>
              <FeatBadge>Maandelijks</FeatBadge>
              <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '1.05rem' }}>Onbeperkt gebruik</div>
              <PriceAmount>€100 <span>per maand</span></PriceAmount>
              <SectionSub style={{ fontSize: '0.88rem', margin: 0 }}>Geen limiet op gesprekken of minuten</SectionSub>
              <PriceList>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Onbeperkt aantal gesprekken</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Doorlopende monitoring & optimalisatie</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Kleine aanpassingen inbegrepen</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Maandelijks opzegbaar</PriceLi>
              </PriceList>
            </PriceCard>
          </PriceGrid>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Primary as="span"><Phone size={18} /> Plan een gratis intakegesprek</Primary>
            </Link>
          </div>
        </Container>
      </Section>

      <Section $bg="#F8FAFC">
        <Container>
          <SectionEyebrow>Vragen</SectionEyebrow>
          <H2>Veelgestelde vragen voor {niche.pretty}</H2>
          <FaqList style={{ marginTop: '1.5rem' }}>
            {niche.faqs.map((f, i) => (
              <FaqItem key={i}>
                <summary>{f.q} <ChevronDown size={18} /></summary>
                <p>{f.a}</p>
              </FaqItem>
            ))}
          </FaqList>
        </Container>
      </Section>

      <Section>
        <Container>
          <FinalCta>
            <H2 $light style={{ color: 'white' }}>Klaar om je {niche.short.toLowerCase()}-team te ontlasten?</H2>
            <SectionSub $light style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 600, margin: 0 }}>
              Plan een gratis intakegesprek van 30 minuten. We laten zien hoe het er voor jouw bedrijf uit gaat zien - inclusief realistische business case.
            </SectionSub>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Primary as="span" style={{ background: 'white', color: '#0F172A', boxShadow: '0 14px 32px rgba(0,0,0,0.15)' }}>
                  <Phone size={18} /> Plan intakegesprek
                </Primary>
              </Link>
              <Secondary as="button" onClick={scrollToDemo} style={{ background: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer' }}>
                <Mic size={16} /> Probeer eerst de demo
              </Secondary>
            </div>
          </FinalCta>
        </Container>
      </Section>
    </>
  );
}

'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mic, Phone, Mail, Star, Shield, Sparkles, Headphones, Clock, Users,
  ArrowRight, CheckCircle, ChevronDown, Activity, MessageSquare, Plug,
  RefreshCcw, TrendingUp, BadgeCheck, PhoneCall, ArrowDown, Quote, Zap,
  CalendarDays,
} from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';
import VoiceDemo from '../components/voice/VoiceDemo';
import { CASE_REGISTRY } from '../components/voice/cases';
import { getNiche, CTA_CONTACT } from '../components/voice/niche-content';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';
const DARK_GRADIENT = 'linear-gradient(135deg, #0A0F1F 0%, #131A33 60%, #1E293B 100%)';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1.1rem; }
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
  @media (max-width: 768px) { padding: 100px 0 40px; }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3rem;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2rem; }
`;

const HeroTextCol = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6EE7B7;
  background: rgba(110,231,183,0.1);
  border: 1px solid rgba(110,231,183,0.25);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  align-self: flex-start;
`;

const H1 = styled.h1`
  font-size: clamp(1.85rem, 5vw, 3.4rem);
  line-height: 1.07;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1.1rem;
`;

const Highlight = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  font-size: clamp(0.98rem, 1.5vw, 1.12rem);
  line-height: 1.55;
  color: #CBD5E1;
  margin: 0 0 1.65rem;
  max-width: 540px;
`;

const HeroCtas = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
  @media (max-width: 480px) { gap: 0.5rem; }
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
  text-decoration: none;
  &:hover { transform: translateY(-2px); }
  @media (max-width: 480px) { padding: 0.85rem 1.25rem; font-size: 0.94rem; flex: 1; justify-content: center; }
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
  @media (max-width: 480px) { padding: 0.85rem 1.25rem; font-size: 0.94rem; flex: 1; justify-content: center; }
`;

const HeroBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 30px 60px rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.08);
  @media (max-width: 480px) { aspect-ratio: 5/3; border-radius: 16px; }
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
  padding: 0.95rem 0;
`;

const TrustInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  font-size: 0.92rem;
  color: #475569;
  text-align: center;
  @media (max-width: 640px) { gap: 0.65rem; font-size: 0.84rem; }
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StarBox = styled.span`
  width: 22px;
  height: 22px;
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
  font-size: 0.95rem;
  letter-spacing: -0.02em;
`;

/* ===== STAT STRIP (right after trust) ===== */
const StatStrip = styled.section`
  background: linear-gradient(180deg, #F8FAFC, white);
  padding: 2.25rem 0;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  text-align: center;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 380px) { grid-template-columns: 1fr; }
`;

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
`;

const StatNum = styled.div`
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.84rem;
  color: #475569;
  font-weight: 500;
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
  @media (max-width: 768px) { padding: ${(p) => p.$padMobile || '50px 0'}; }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 2rem;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  min-width: 0;
  @media (max-width: 768px) { gap: 3rem; }
`;

const StickyDemoCol = styled.div`
  position: sticky;
  top: 100px;
  align-self: start;
  min-width: 0;
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
  color: ${(p) => (p.$light ? '#6EE7B7' : '#3B82F6')};
  margin-bottom: 0.7rem;
`;

const H2 = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  font-weight: 800;
  margin: 0 0 0.8rem;
  letter-spacing: -0.02em;
  color: ${(p) => (p.$light ? 'white' : '#0F172A')};
  line-height: 1.15;
`;

const SectionSub = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${(p) => (p.$light ? '#94A3B8' : '#475569')};
  margin: 0 0 1.75rem;
  max-width: 600px;
`;

/* ===== Section image break ===== */
const SectionImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16/9;
  margin-top: 1.5rem;
  background: #0F172A;
  & img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 768px) { aspect-ratio: 4/3; border-radius: 14px; }
`;

const SectionImageCaption = styled.div`
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  right: 1.25rem;
  color: white;
  font-size: 0.92rem;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
`;

/* ===== PLATFORM LOGOS ===== */
const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.85rem;
  @media (max-width: 480px) { grid-template-columns: repeat(2, 1fr); gap: 0.6rem; }
`;

const PlatformCard = styled.div`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1.1rem 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 110px;
  transition: all 0.2s;
  &:hover { transform: translateY(-2px); border-color: #3B82F6; box-shadow: 0 10px 24px rgba(59,130,246,0.12); }
`;

const PlatformLogoBox = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img { max-width: 100%; max-height: 56px; width: auto; height: auto; object-fit: contain; }
`;

const PlatformName = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  text-align: center;
`;

function PlatformItem({ name, logo }) {
  return (
    <PlatformCard title={name}>
      <PlatformLogoBox>
        <img src={logo} alt={name} loading="lazy" />
      </PlatformLogoBox>
      <PlatformName>{name}</PlatformName>
    </PlatformCard>
  );
}

/* ===== FLOW GRAPH ===== */
const FlowWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlowStep = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 1.1rem;
  align-items: center;
  padding: 1.4rem;
  background: ${(p) => p.$bg || 'white'};
  border: 1px solid ${(p) => p.$border || '#E2E8F0'};
  border-radius: 16px;
  position: relative;
  &::after {
    content: '';
    display: ${(p) => (p.$last ? 'none' : 'block')};
    position: absolute;
    left: 53px;
    bottom: -16px;
    width: 2px;
    height: 16px;
    background: ${(p) => p.$lineColor || '#CBD5E1'};
  }
  @media (max-width: 480px) { grid-template-columns: 64px 1fr; padding: 1rem; gap: 0.85rem; &::after { left: 41px; } }
`;

const PercentBubble = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: ${(p) => p.$bg || GRADIENT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.4rem;
  box-shadow: 0 8px 22px ${(p) => p.$shadow || 'rgba(59,130,246,0.3)'};
  flex-shrink: 0;
  @media (max-width: 480px) { width: 64px; height: 64px; font-size: 1.05rem; }
`;

const FlowText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const FlowLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #0F172A;
`;

const FlowDesc = styled.div`
  font-size: 0.88rem;
  color: #475569;
  line-height: 1.5;
`;

/* ===== CARDS ===== */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
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

/* ===== STORY / TESTIMONIAL ===== */
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const StoryImage = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  & img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (max-width: 480px) { border-radius: 14px; }
`;

const QuoteCard = styled.div`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 22px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  position: relative;
  box-shadow: 0 16px 36px rgba(15,23,42,0.06);
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -16px;
  left: 1.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${GRADIENT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuoteText = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: #0F172A;
  line-height: 1.55;
  font-weight: 500;
  font-style: italic;
`;

const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.4rem;
  border-top: 1px solid #E2E8F0;
  padding-top: 1rem;
`;

const QuoteName = styled.div`
  font-weight: 700;
  color: #0F172A;
  font-size: 0.95rem;
`;

const QuoteRole = styled.div`
  font-size: 0.85rem;
  color: #64748B;
`;

/* ===== STEPS ===== */
const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const StepCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
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
  padding: 2.25rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  color: white;
  box-shadow: 0 24px 50px rgba(59,130,246,0.25);
  @media (max-width: 768px) { grid-template-columns: 1fr; text-align: center; gap: 1rem; padding: 1.85rem 1.25rem; }
`;

const PhoneCalloutIcon = styled.div`
  width: 60px;
  height: 60px;
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
  font-size: 2.1rem;
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

/* ===== CONTACT CTA BLOCK (call/email) ===== */
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
  max-width: 600px;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ContactCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.96);
  border-radius: 16px;
  padding: 1.1rem 1.25rem;
  text-decoration: none;
  color: #0F172A;
  border: 1px solid rgba(15,23,42,0.06);
  transition: all 0.2s;
  &:hover { background: white; transform: translateY(-2px); box-shadow: 0 12px 26px rgba(0,0,0,0.12); }
`;

const ContactIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${GRADIENT};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ContactLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  & > span:first-child { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; font-weight: 700; }
  & > span:last-child { font-weight: 700; color: #0F172A; font-size: 0.98rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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

/* ===== EXAMPLES ===== */
const ExamplesCard = styled.div`
  background: #F1F5F9;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1rem 1.2rem;
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
  font-size: 0.88rem;
`;

const ExampleLine = styled.div`
  font-size: 0.86rem;
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
  padding: 3.25rem 2.25rem;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 30px 60px rgba(59,130,246,0.25);
  @media (max-width: 768px) { padding: 2.25rem 1.25rem; border-radius: 20px; }
`;

/* ===== Component ===== */

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
            <HeroTextCol>
              <Eyebrow><Sparkles size={11} />{niche.hero.eyebrow}</Eyebrow>
              <H1>
                {niche.hero.h1Lead} <Highlight>{niche.hero.h1Highlight}</Highlight> {niche.hero.h1Tail}
              </H1>
              <Sub>{niche.hero.sub}</Sub>
              <HeroCtas>
                <Primary onClick={scrollToDemo}><Mic size={18} /> Probeer de live demo</Primary>
                <Secondary href={CTA_CONTACT.phoneHref}><Phone size={16} /> {CTA_CONTACT.phone}</Secondary>
              </HeroCtas>
              <HeroBadges>
                <HeroBadge><BadgeCheck size={13} color="#10B981" /> Live binnen 1-3 dagen</HeroBadge>
                <HeroBadge><Clock size={13} color="#10B981" /> 24/7 bereikbaar</HeroBadge>
                <HeroBadge><Shield size={13} color="#10B981" /> AVG-proof, EU data</HeroBadge>
                <HeroBadge><Headphones size={13} color="#10B981" /> Menselijke escalatie</HeroBadge>
              </HeroBadges>
            </HeroTextCol>
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
                <StarBox key={i} $half={i === 5}><Star size={13} fill="white" strokeWidth={0} /></StarBox>
              ))}
            </Stars>
            <TrustText><strong>4.9</strong> op 12 reviews</TrustText>
            <TrustLogo>★ Trustpilot</TrustLogo>
            <span style={{ color: '#64748B', fontSize: '0.84rem' }}>Aanbevolen door Nederlandse {niche.pretty}</span>
          </TrustInner>
        </Container>
      </TrustBar>

      <StatStrip>
        <Container>
          <StatGrid>
            <StatBlock><StatNum>{niche.flow.solved}%</StatNum><StatLabel>vragen automatisch</StatLabel></StatBlock>
            <StatBlock><StatNum>24/7</StatNum><StatLabel>bereikbaar</StatLabel></StatBlock>
            <StatBlock><StatNum>1-3d</StatNum><StatLabel>tot live</StatLabel></StatBlock>
            <StatBlock><StatNum>€100</StatNum><StatLabel>per maand, onbeperkt</StatLabel></StatBlock>
          </StatGrid>
        </Container>
      </StatStrip>

      <Section ref={demoTopRef} id="demo" $bg="#F8FAFC" $pad="60px 0" $padMobile="40px 0">
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
                    <PlatformItem key={p.name} name={p.name} logo={p.logo} />
                  ))}
                </PlatformGrid>
                <SectionImage>
                  <img src={niche.images.bewezen} alt={`${niche.short} in actie`} loading="lazy" />
                  <SectionImageCaption>Werkt naadloos met de tools die jouw team al gebruikt</SectionImageCaption>
                </SectionImage>
              </FadeIn>

              {/* Flow graph */}
              <FadeIn>
                <SectionEyebrow>Zo haalt Robin direct werk van je team af</SectionEyebrow>
                <H2>Van eerste oproep tot directe oplossing of slimme overdracht</H2>
                <SectionSub>Niemand wacht. Niemand wordt aan het lijntje gehouden. Wat de assistent niet kan, gaat met volledige context naar een mens - meestal zonder dat de klant het door heeft.</SectionSub>
                <FlowWrap>
                  <FlowStep $bg="#EFF6FF" $border="#BFDBFE" $lineColor="#3B82F6">
                    <PercentBubble $bg={GRADIENT} $shadow="rgba(59,130,246,0.3)">{niche.flow.pickup}%</PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.pickupLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.pickupSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                  <FlowStep $bg="#ECFDF5" $border="#A7F3D0" $lineColor="#10B981">
                    <PercentBubble $bg="linear-gradient(135deg, #10B981, #059669)" $shadow="rgba(16,185,129,0.3)">{niche.flow.solved}%</PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.solvedLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.solvedSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                  <FlowStep $bg="#FEF3C7" $border="#FCD34D" $last>
                    <PercentBubble $bg="linear-gradient(135deg, #F59E0B, #D97706)" $shadow="rgba(245,158,11,0.3)">{niche.flow.escalated}%</PercentBubble>
                    <FlowText>
                      <FlowLabel>{niche.flow.escalatedLabel}</FlowLabel>
                      <FlowDesc>{niche.flow.escalatedSub}</FlowDesc>
                    </FlowText>
                  </FlowStep>
                </FlowWrap>
                <SectionImage>
                  <img src={niche.images.flow} alt={`Klanten geholpen door ${niche.short}`} loading="lazy" />
                  <SectionImageCaption>Klanten worden direct geholpen - geen wachttijd, geen wachtrij</SectionImageCaption>
                </SectionImage>
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

              {/* Story / testimonial */}
              <FadeIn>
                <SectionEyebrow>Wat klanten zeggen</SectionEyebrow>
                <H2>Echte teams, echte resultaten</H2>
                <StoryGrid style={{ marginTop: '1rem' }}>
                  <StoryImage>
                    <img src={niche.images.story} alt="Tevreden klant" loading="lazy" />
                  </StoryImage>
                  <QuoteCard>
                    <QuoteIcon><Quote size={18} /></QuoteIcon>
                    <QuoteText>{niche.storyQuote.text}</QuoteText>
                    <QuoteAuthor>
                      <QuoteName>{niche.storyQuote.author}</QuoteName>
                      <QuoteRole>{niche.storyQuote.role}</QuoteRole>
                    </QuoteAuthor>
                  </QuoteCard>
                </StoryGrid>
              </FadeIn>

              {/* Phone integration callout */}
              <FadeIn>
                <PhoneCallout>
                  <PhoneCalloutIcon><PhoneCall size={28} color="white" /></PhoneCalloutIcon>
                  <div>
                    <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.25rem', fontWeight: 800 }}>Klaar voor jouw +31 telefoonnummer</h3>
                    <p style={{ margin: 0, opacity: 0.94, fontSize: '0.96rem', lineHeight: 1.5 }}>
                      We koppelen de assistent aan je bestaande zakelijke nummer via VoIP. Klanten bellen jouw nummer zoals altijd - de assistent neemt direct op. Wij regelen alles in de setup.
                    </p>
                  </div>
                  <Secondary as="a" href={CTA_CONTACT.phoneHref} style={{ background: 'white', color: '#0F172A', borderColor: 'white', whiteSpace: 'nowrap' }}>
                    <Phone size={16} /> {CTA_CONTACT.phone}
                  </Secondary>
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
          <SectionEyebrow $light>Zo werkt het</SectionEyebrow>
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
              Bel ons direct of stuur een mail. Binnen 24 uur weet je hoe het er voor jouw bedrijf uit gaat zien - inclusief realistische business case.
            </SectionSub>
            <ContactGrid>
              <ContactCard href={CTA_CONTACT.phoneHref}>
                <ContactIconBox><Phone size={20} /></ContactIconBox>
                <ContactLabel>
                  <span>Bel direct</span>
                  <span>{CTA_CONTACT.phone}</span>
                </ContactLabel>
              </ContactCard>
              <ContactCard href={CTA_CONTACT.emailHref}>
                <ContactIconBox><Mail size={20} /></ContactIconBox>
                <ContactLabel>
                  <span>Of stuur een mail</span>
                  <span>{CTA_CONTACT.email}</span>
                </ContactLabel>
              </ContactCard>
            </ContactGrid>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.9 }}>
              <CalendarDays size={14} /> Reactie binnen 24 uur, ook in het weekend
            </div>
          </FinalCta>
        </Container>
      </Section>
    </>
  );
}

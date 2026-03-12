import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Bot, TrendingUp, Target, Zap,
  Linkedin, MessageSquare, Monitor, BarChart3, Users, Building2, Phone,
  ChevronLeft, ChevronRight, Presentation, CheckCircle, Globe, Award,
  Sparkles, Clock, BrainCircuit, Lock, Eye, EyeOff
} from 'lucide-react';

/* ═══════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════ */

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ═══════════════════════════════════════
   GATE SCREENS (password)
   ═══════════════════════════════════════ */

const GateWrapper = styled.div`
  background: #0A0E1A;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: white;
`;

const GateCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 420px;
  margin: 0 1.25rem;
  text-align: center;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(20px);
`;

const GateLogo = styled.img`
  height: 32px;
  margin-bottom: 2rem;
  opacity: 0.8;
`;

const GateTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const GateSubtext = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const GateInput = styled.input`
  width: 100%;
  padding: 0.9rem 3rem 0.9rem 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${p => p.$error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 14px;
  color: white;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  &:focus { border-color: ${p => p.$error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.5)'}; }
  &::placeholder { color: rgba(255, 255, 255, 0.25); }
`;

const ToggleVisibility = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 4px;
  display: flex;
  &:hover { color: rgba(255, 255, 255, 0.6); }
`;

const GateError = styled(motion.div)`
  font-size: 13px;
  color: #F87171;
  margin-bottom: 1rem;
  text-align: left;
`;

const GateBtn = styled(motion.button)`
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LangBtn = styled.button`
  padding: 0.35rem 0.9rem;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid ${p => p.$active ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  background: ${p => p.$active ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.04)'};
  color: ${p => p.$active ? '#60A5FA' : 'rgba(255, 255, 255, 0.4)'};
  transition: all 0.2s;
  &:hover { border-color: rgba(59, 130, 246, 0.3); }
`;

/* ═══════════════════════════════════════
   PRESENTATION LAYOUT
   ═══════════════════════════════════════ */

const PresWrapper = styled.div`
  background: #0A0E1A;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: white;
  position: relative;
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
  box-sizing: border-box;
  position: relative;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1.25rem;
    overflow-y: auto;
    justify-content: flex-start;
    padding-top: 3rem;
  }
`;

const SlideContent = styled.div`
  max-width: 1100px;
  width: 100%;
  position: relative;
  z-index: 2;
`;

/* ═══════════════════════════════════════
   TOP BAR
   ═══════════════════════════════════════ */

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const TopLogo = styled.img`
  height: 24px;
  opacity: 0.7;

  @media (max-width: 768px) {
    height: 20px;
  }
`;

const SlideCounter = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const TopLangRow = styled.div`
  display: flex;
  gap: 0.35rem;
`;

/* ═══════════════════════════════════════
   BOTTOM NAV
   ═══════════════════════════════════════ */

const BottomNav = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(59, 130, 246, 0.4);
    color: white;
  }

  &:disabled {
    opacity: 0.2;
    cursor: default;
    &:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.15); color: rgba(255, 255, 255, 0.6); }
  }
`;

const DotsRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const Dot = styled.button`
  width: ${p => p.$active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${p => p.$active ? 'linear-gradient(90deg, #3B82F6, #10B981)' : 'rgba(255, 255, 255, 0.15)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s;

  &:hover { background: ${p => p.$active ? 'linear-gradient(90deg, #3B82F6, #10B981)' : 'rgba(255, 255, 255, 0.3)'}; }
`;

/* ═══════════════════════════════════════
   BACKGROUND EFFECTS
   ═══════════════════════════════════════ */

const GlowOrb = styled.div`
  position: absolute;
  width: ${p => p.$size || '400px'};
  height: ${p => p.$size || '400px'};
  border-radius: 50%;
  background: ${p => p.$color || 'rgba(59, 130, 246, 0.08)'};
  filter: blur(100px);
  top: ${p => p.$top || 'auto'};
  left: ${p => p.$left || 'auto'};
  right: ${p => p.$right || 'auto'};
  bottom: ${p => p.$bottom || 'auto'};
  pointer-events: none;
`;

const GridBG = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`;

/* ═══════════════════════════════════════
   TYPOGRAPHY
   ═══════════════════════════════════════ */

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${p => p.$bg || 'rgba(59, 130, 246, 0.1)'};
  border: 1px solid ${p => p.$border || 'rgba(59, 130, 246, 0.25)'};
  color: ${p => p.$color || '#60A5FA'};
  font-size: 12px;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  margin-bottom: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const MegaTitle = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 900;
  line-height: 1.08;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
`;

const BigTitle = styled.h2`
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 0.6rem;
  letter-spacing: -0.01em;
`;

const GradientSpan = styled.span`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ShimmerSpan = styled.span`
  background: linear-gradient(90deg, #3B82F6, #10B981, #8B5CF6, #3B82F6);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 4s linear infinite;
`;

const SubText = styled.p`
  font-size: clamp(13px, 1.2vw, 16px);
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.55;
  max-width: 600px;
  margin: 0 auto 1rem;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #60A5FA;
  margin-bottom: 0.5rem;
`;

/* ═══════════════════════════════════════
   STAT CARDS
   ═══════════════════════════════════════ */

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols || 4}, 1fr);
  gap: 0.6rem;
  width: 100%;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 0.7rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${p => p.$accent || 'linear-gradient(90deg, #3B82F6, #10B981)'};
  }
`;

const StatNumber = styled.div`
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 900;
  background: ${p => p.$gradient || 'linear-gradient(135deg, #3B82F6, #10B981)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 0.15rem;
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
`;

/* ═══════════════════════════════════════
   SERVICE CARDS
   ═══════════════════════════════════════ */

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 0.55rem 0.7rem;
  text-align: left;
  transition: all 0.2s;
  &:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(59, 130, 246, 0.2); }
`;

const ServiceIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: ${p => p.$bg || 'rgba(59, 130, 246, 0.15)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color || '#60A5FA'};
  margin-bottom: 0.3rem;
`;

const ServiceTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.1rem;
`;

const ServiceDesc = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.35;
`;

/* ═══════════════════════════════════════
   CASE STUDY CARDS
   ═══════════════════════════════════════ */

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  width: 100%;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const CaseCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  overflow: hidden;
`;

const CaseImage = styled.div`
  width: 100%;
  height: 100px;
  background: ${p => p.$bg || '#1E293B'};
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }

  @media (max-width: 768px) { height: 120px; }
`;

const CaseBody = styled.div`
  padding: 0.5rem 0.7rem;
`;

const CaseCompany = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #60A5FA;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
`;

const CaseTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.4rem;
  line-height: 1.3;
`;

const CaseResults = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const CaseTag = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #34D399;
  font-size: 10px;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
`;

/* ═══════════════════════════════════════
   CLIENT LOGOS
   ═══════════════════════════════════════ */

const LogoStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 0.4rem 0;
`;

const LogoImg = styled.img`
  height: 28px;
  opacity: 0.35;
  filter: grayscale(100%) brightness(2);
  transition: all 0.3s;
  object-fit: contain;
  &:hover { opacity: 0.8; filter: grayscale(0%) brightness(1); }

  @media (max-width: 768px) { height: 22px; }
`;

/* ═══════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════ */

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  width: 100%;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 0.8rem;
  text-align: center;
`;

const TeamAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 auto 0.4rem;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.3);
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const TeamName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: white;
`;

const TeamRole = styled.div`
  font-size: 11px;
  color: #60A5FA;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const TeamBio = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
`;

/* ═══════════════════════════════════════
   PROBLEM / SOLUTION LAYOUT
   ═══════════════════════════════════════ */

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  width: 100%;
  text-align: left;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const PainPoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 10px;
  margin-bottom: 0.35rem;
`;

const PainDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #EF4444;
  flex-shrink: 0;
  margin-top: 5px;
`;

const PainText = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
`;

const SolutionPoint = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 10px;
  margin-bottom: 0.35rem;
`;

const SolutionDot = styled.div`
  flex-shrink: 0;
  margin-top: 1px;
  color: #10B981;
`;

const SolutionText = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  strong { color: white; }
`;

/* ═══════════════════════════════════════
   QUOTE
   ═══════════════════════════════════════ */

const QuoteBlock = styled.div`
  text-align: center;
  padding: 1rem;
  position: relative;
`;

const QuoteText = styled.div`
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  font-weight: 700;
  color: white;
  line-height: 1.3;
  max-width: 600px;
  margin: 0 auto 0.35rem;
  font-style: italic;
`;

const QuoteAuthor = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
`;

/* ═══════════════════════════════════════
   PROCESS STEPS
   ═══════════════════════════════════════ */

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 100%;

  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ProcessCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 0.7rem;
  position: relative;
  text-align: left;

  &::before {
    content: '${p => p.$num}';
    position: absolute;
    top: 0.4rem;
    right: 0.6rem;
    font-size: 1.6rem;
    font-weight: 900;
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.15));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
`;

const ProcessTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.2rem;
`;

const ProcessText = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
`;

/* ═══════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════ */

const PrimaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  cursor: pointer;
  text-decoration: none;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  &:hover { color: white; }
`;

/* ═══════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════ */

const PRESENTATION_PASSWORD = 'Groenekanseweg12!';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function PresentationPage({ skipAuth = false }) {
  const [presLang, setPresLang] = useState('nl');
  const isNL = presLang === 'nl';
  const [screen, setScreen] = useState(skipAuth ? 'presentation' : 'password');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = 7;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === PRESENTATION_PASSWORD) {
      setError('');
      setScreen('presentation');
    } else {
      setError(isNL ? 'Onjuist wachtwoord. Probeer het opnieuw.' : 'Incorrect password. Please try again.');
    }
  };

  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= totalSlides) return;
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  }, [activeSlide, totalSlides]);

  const next = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const prev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (screen !== 'presentation') return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, next, prev]);

  // ── DATA ──

  const services = [
    { icon: <Building2 size={18} />, title: 'AI Business', desc: isNL ? 'Van strategie tot uitvoering: wij transformeren je hele bedrijf met AI' : 'From strategy to execution: we transform your entire business with AI', bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' },
    { icon: <Presentation size={18} />, title: 'AI Training', desc: isNL ? 'Maatwerk training per afdeling. ChatGPT, Claude, Copilot, direct toepasbaar' : 'Tailored training per department. ChatGPT, Claude, Copilot, immediately applicable', bg: 'rgba(249, 115, 22, 0.15)', color: '#FB923C' },
    { icon: <Monitor size={18} />, title: 'Custom Software', desc: isNL ? 'Wij bouwen software 3x sneller, het snelste AI-gedreven softwarebedrijf van NL' : 'We build software 3x faster, the fastest AI-driven software company in NL', bg: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' },
    { icon: <Zap size={18} />, title: 'Automation', desc: isNL ? 'n8n workflows en custom platformen. Koppel je systemen, elimineer handwerk' : 'n8n workflows and custom platforms. Connect your systems, eliminate manual work', bg: 'rgba(16, 185, 129, 0.15)', color: '#34D399' },
    { icon: <Linkedin size={18} />, title: 'AI Sales', desc: isNL ? 'LinkedIn outreach, lead kwalificatie en CRM-integratie, volledig geautomatiseerd' : 'LinkedIn outreach, lead qualification and CRM integration, fully automated', bg: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA' },
    { icon: <Target size={18} />, title: 'AI Marketing', desc: isNL ? 'AI-SEO, content automatisering en Google Ads optimalisatie' : 'AI-SEO, content automation and Google Ads optimisation', bg: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' },
    { icon: <Bot size={18} />, title: 'AI Agents', desc: isNL ? 'OpenClaw agents die 24/7 taken overnemen via WhatsApp, Slack en Teams' : 'OpenClaw agents that take over tasks 24/7 via WhatsApp, Slack and Teams', bg: 'rgba(236, 72, 153, 0.15)', color: '#F472B6' },
    { icon: <MessageSquare size={18} />, title: 'AI Chatbot', desc: isNL ? 'Intelligente chatbots die je producten kennen en leads kwalificeren' : 'Intelligent chatbots that know your products and qualify leads', bg: 'rgba(239, 68, 68, 0.15)', color: '#F87171' },
    { icon: <Globe size={18} />, title: 'Crypto & Blockchain', desc: isNL ? 'Smart contracts, DeFi platforms en blockchain development' : 'Smart contracts, DeFi platforms and blockchain development', bg: 'rgba(6, 182, 212, 0.15)', color: '#22D3EE' },
  ];

  const cases = [
    { company: 'Fonteyn', img: '/uploads/fonteyn_showroom.png', title: isNL ? 'AI SEO Blog Optimalisatie' : 'AI SEO Blog Optimization', results: [isNL ? '-3% Ads kosten' : '-3% Ad costs', isNL ? '+4% conversie' : '+4% conversion', '30.000+ products'] },
    { company: 'Aanhuis', img: '/uploads/aanhuis_voorkant.png', title: isNL ? 'AI Training & Custom GPTs' : 'AI Training & Custom GPTs', results: [isNL ? '+20% efficiëntie' : '+20% efficiency', 'Custom GPTs', isNL ? 'Volledige adoptie' : 'Full adoption'] },
    { company: 'Blosh', img: '/uploads/blosh_office.png', title: isNL ? 'Complete AI Suite' : 'Complete AI Suite', results: ['AI SEO', 'AI Chatbot', isNL ? 'Shopify automatisering' : 'Shopify automation'] },
  ];

  const team = [
    { name: 'Maximilian Bladt', role: 'CEO', img: '/uploads/foto_max.png', bio: isNL ? 'AI-strateeg en ondernemer. Leidt de visie en klantrelaties.' : 'AI strategist and entrepreneur. Leads vision and client relationships.' },
    { name: 'Geronimo Saija', role: 'Head of Operations', img: '/uploads/geronimo.png', bio: isNL ? 'Operationeel leider. Stuurt implementatie en projectmanagement aan.' : 'Operational leader. Drives implementation and project management.' },
    { name: 'Willem Bladt', role: 'Head of Finance', img: '/uploads/willem.png', bio: isNL ? 'Financieel strateeg. Bewaakt groei en duurzaamheid.' : 'Financial strategist. Oversees growth and sustainability.' },
  ];

  const painPoints = isNL
    ? ['Concurrenten gebruiken AI al en lopen voor', 'Medewerkers besteden uren aan repetitief werk', 'Marketing & sales schalen niet zonder meer personeel', 'Geen duidelijk plan om AI te implementeren']
    : ['Competitors are already using AI and pulling ahead', 'Employees spend hours on repetitive work', 'Marketing & sales don\'t scale without more staff', 'No clear plan to implement AI'];

  const solutions = isNL
    ? [{ bold: 'Strategie op maat', text: ': we analyseren je bedrijf en bouwen een AI-roadmap' }, { bold: 'Bewezen implementatie', text: ': 30+ organisaties succesvol getransformeerd' }, { bold: 'Training & adoptie', text: ': je team leert AI gebruiken, niet vrezen' }, { bold: 'Continue optimalisatie', text: ': maandelijkse sessies houden je voorsprong' }]
    : [{ bold: 'Tailored strategy', text: ': we analyze your business and build an AI roadmap' }, { bold: 'Proven implementation', text: ': 30+ organizations successfully transformed' }, { bold: 'Training & adoption', text: ': your team learns to use AI, not fear it' }, { bold: 'Continuous optimization', text: ': monthly sessions keep your competitive edge' }];

  const processSteps = isNL
    ? [{ title: 'Intake', text: 'We bespreken je doelen, uitdagingen en kansen in een vrijblijvend gesprek.' }, { title: 'Analyse & Voorstel', text: 'We leveren een helder plan met prioriteiten, kosten en verwachte resultaten.' }, { title: 'Implementatie', text: 'Ons team bouwt, traint en integreert de oplossingen in je workflow.' }, { title: 'Groei & Optimalisatie', text: 'We monitoren resultaten en optimaliseren continu voor maximaal rendement.' }]
    : [{ title: 'Intake', text: 'We discuss your goals, challenges and opportunities in a no-obligation meeting.' }, { title: 'Analysis & Proposal', text: 'We deliver a clear plan with priorities, costs and expected results.' }, { title: 'Implementation', text: 'Our team builds, trains and integrates solutions into your workflow.' }, { title: 'Growth & Optimization', text: 'We monitor results and continuously optimize for maximum ROI.' }];

  // ── SLIDE RENDERERS ──

  const slides = [
    // SLIDE 1: HOOK
    () => (
      <SlideContainer>
        <GlowOrb $size="500px" $color="rgba(59, 130, 246, 0.08)" $top="-150px" $right="-150px" />
        <GlowOrb $size="350px" $color="rgba(16, 185, 129, 0.06)" $bottom="-80px" $left="-100px" />
        <SlideContent>
          <Badge $bg="rgba(59, 130, 246, 0.1)" $border="rgba(59, 130, 246, 0.25)" $color="#60A5FA"><Sparkles size={12} /> Optivaize · Groenekanseweg · De Bilt</Badge>
          <MegaTitle>Optimize <ShimmerSpan>What Matters</ShimmerSpan></MegaTitle>
          <SubText>{isNL ? 'Wij transformeren bedrijven met AI die daadwerkelijk werkt. Van slimme automatisering tot complete implementatie, wij zorgen dat jouw organisatie klaar is voor de toekomst.' : 'We transform businesses with AI that actually works. From smart automation to full implementation, we make sure your organization is ready for the future.'}</SubText>
          <StatsRow style={{ marginTop: '1rem' }}>
            <StatCard><StatNumber>30+</StatNumber><StatLabel>{isNL ? 'Organisaties getransformeerd' : 'Organizations transformed'}</StatLabel></StatCard>
            <StatCard><StatNumber $gradient="linear-gradient(135deg, #10B981, #06B6D4)">100+</StatNumber><StatLabel>{isNL ? 'Geautomatiseerde taken' : 'Automated tasks'}</StatLabel></StatCard>
            <StatCard><StatNumber $gradient="linear-gradient(135deg, #8B5CF6, #EC4899)">€3M+</StatNumber><StatLabel>{isNL ? 'Bespaard op loonkosten' : 'Saved in wage costs'}</StatLabel></StatCard>
            <StatCard><StatNumber $gradient="linear-gradient(135deg, #F59E0B, #EF4444)">9</StatNumber><StatLabel>{isNL ? 'AI-diensten' : 'AI services'}</StatLabel></StatCard>
          </StatsRow>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 2: PROBLEM
    () => (
      <SlideContainer>
        <GlowOrb $size="400px" $color="rgba(239, 68, 68, 0.06)" $top="10%" $left="-100px" />
        <SlideContent>
          <TwoColGrid>
            <div>
              <Badge $bg="rgba(239, 68, 68, 0.1)" $border="rgba(239, 68, 68, 0.25)" $color="#F87171">{isNL ? 'Het Probleem' : 'The Problem'}</Badge>
              <BigTitle>{isNL ? <>Bedrijven zonder AI-strategie vallen <span style={{ color: '#EF4444' }}>achterop</span></> : <>Businesses without AI strategy are <span style={{ color: '#EF4444' }}>falling behind</span></>}</BigTitle>
              <SubText style={{ margin: '0 0 1rem', textAlign: 'left' }}>{isNL ? '72% van bedrijven wil AI inzetten, maar minder dan 15% heeft een concrete implementatie. Het verschil? Een partner die het daadwerkelijk doet.' : '72% of companies want to use AI, but fewer than 15% have a concrete implementation. The difference? A partner that actually delivers.'}</SubText>
            </div>
            <div>
              {painPoints.map((point, i) => (
                <PainPoint key={i}><PainDot /><PainText>{point}</PainText></PainPoint>
              ))}
            </div>
          </TwoColGrid>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 3: SOLUTION
    () => (
      <SlideContainer>
        <GlowOrb $size="400px" $color="rgba(16, 185, 129, 0.06)" $top="20%" $right="-100px" />
        <SlideContent>
          <TwoColGrid>
            <div>
              <Badge $bg="rgba(16, 185, 129, 0.1)" $border="rgba(16, 185, 129, 0.25)" $color="#34D399">{isNL ? 'De Oplossing' : 'The Solution'}</Badge>
              <BigTitle>{isNL ? <>Optivaize: jouw <GradientSpan>AI-implementatiepartner</GradientSpan></> : <>Optivaize: your <GradientSpan>AI implementation partner</GradientSpan></>}</BigTitle>
              <SubText style={{ margin: '0 0 0.5rem', textAlign: 'left' }}>{isNL ? 'Wij bouwen geen abstracte strategieen. Wij implementeren AI die je team vandaag al kan gebruiken en die morgen nog meer oplevert.' : 'We don\'t build abstract strategies. We implement AI that your team can use today and that delivers even more tomorrow.'}</SubText>
            </div>
            <div>
              {solutions.map((sol, i) => (
                <SolutionPoint key={i}><SolutionDot><CheckCircle size={16} /></SolutionDot><SolutionText><strong>{sol.bold}</strong>{sol.text}</SolutionText></SolutionPoint>
              ))}
            </div>
          </TwoColGrid>
          <QuoteBlock style={{ marginTop: '0.5rem' }}>
            <QuoteText>{isNL ? 'AI gaat mensen niet vervangen. Mensen die AI gebruiken wel.' : 'AI is not going to replace people. People who use AI will.'}</QuoteText>
            <QuoteAuthor>Maximilian Bladt, CEO Optivaize</QuoteAuthor>
          </QuoteBlock>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 4: SERVICES
    () => (
      <SlideContainer>
        <GlowOrb $size="350px" $color="rgba(139, 92, 246, 0.06)" $bottom="-80px" $left="-80px" />
        <SlideContent>
          <Badge><Bot size={12} /> {isNL ? '9 Diensten' : '9 Services'}</Badge>
          <BigTitle>{isNL ? <>Alles wat je nodig hebt voor <GradientSpan>AI-transformatie</GradientSpan></> : <>Everything you need for <GradientSpan>AI transformation</GradientSpan></>}</BigTitle>
          <SubText>{isNL ? 'Van je eerste AI-presentatie tot een volledig geautomatiseerde workflow, wij dekken het hele spectrum.' : 'From your first AI presentation to a fully automated workflow, we cover the full spectrum.'}</SubText>
          <ServicesGrid>
            {services.map((s, i) => (
              <ServiceCard key={i}><ServiceIcon $bg={s.bg} $color={s.color}>{s.icon}</ServiceIcon><ServiceTitle>{s.title}</ServiceTitle><ServiceDesc>{s.desc}</ServiceDesc></ServiceCard>
            ))}
          </ServicesGrid>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 5: PROOF
    () => (
      <SlideContainer>
        <GlowOrb $size="400px" $color="rgba(59, 130, 246, 0.06)" $top="10%" $right="-150px" />
        <SlideContent>
          <Badge $bg="rgba(245, 158, 11, 0.1)" $border="rgba(245, 158, 11, 0.25)" $color="#FBBF24"><Award size={12} /> {isNL ? 'Bewezen Resultaten' : 'Proven Results'}</Badge>
          <BigTitle>{isNL ? <>Echte resultaten bij <GradientSpan>echte bedrijven</GradientSpan></> : <>Real results at <GradientSpan>real companies</GradientSpan></>}</BigTitle>
          <CasesGrid style={{ marginTop: '0.75rem' }}>
            {cases.map((c, i) => (
              <CaseCard key={i}>
                <CaseImage><img src={c.img} alt={c.company} loading="lazy" /></CaseImage>
                <CaseBody><CaseCompany>{c.company}</CaseCompany><CaseTitle>{c.title}</CaseTitle><CaseResults>{c.results.map((r, j) => <CaseTag key={j}>{r}</CaseTag>)}</CaseResults></CaseBody>
              </CaseCard>
            ))}
          </CasesGrid>
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>{isNL ? 'En meer vertrouwd door' : 'And more trusted by'}</div>
            <LogoStrip>
              <LogoImg src="/uploads/fonteyn_logo.png" alt="Fonteyn" /><LogoImg src="/uploads/aanhuis.png" alt="Aanhuis" /><LogoImg src="/uploads/blosh.png" alt="Blosh" /><LogoImg src="/uploads/sony.png" alt="Sony" /><LogoImg src="/uploads/passion_icebaths_logo.png" alt="Passion Ice Baths" /><LogoImg src="/uploads/red_button_logo.png" alt="Red Button" /><LogoImg src="/uploads/marie_stella_maris.png" alt="Marie-Stella-Maris" />
            </LogoStrip>
          </div>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 6: PROCESS
    () => (
      <SlideContainer>
        <GlowOrb $size="350px" $color="rgba(16, 185, 129, 0.06)" $bottom="-100px" $right="-80px" />
        <SlideContent>
          <Badge $bg="rgba(16, 185, 129, 0.1)" $border="rgba(16, 185, 129, 0.25)" $color="#34D399"><Zap size={12} /> {isNL ? 'Hoe We Werken' : 'How We Work'}</Badge>
          <BigTitle>{isNL ? <>Van intake tot <GradientSpan>impact</GradientSpan> in 4 stappen</> : <>From intake to <GradientSpan>impact</GradientSpan> in 4 steps</>}</BigTitle>
          <SubText>{isNL ? 'Geen maandenlange trajecten. Wij leveren snel en meten altijd het resultaat.' : 'No months-long projects. We deliver fast and always measure results.'}</SubText>
          <ProcessGrid>
            {processSteps.map((step, i) => (
              <ProcessCard key={i} $num={`0${i + 1}`}><ProcessTitle>{step.title}</ProcessTitle><ProcessText>{step.text}</ProcessText></ProcessCard>
            ))}
          </ProcessGrid>
          <div style={{ marginTop: '0.75rem' }}>
            <SectionLabel>{isNL ? 'Wat ons anders maakt' : 'What sets us apart'}</SectionLabel>
            <StatsRow $cols={3} style={{ marginTop: '0.4rem' }}>
              <StatCard $accent="linear-gradient(90deg, #F97316, #EF4444)"><ServiceIcon $bg="rgba(249, 115, 22, 0.15)" $color="#FB923C" style={{ margin: '0 auto 0.4rem' }}><Clock size={18} /></ServiceIcon><ServiceTitle style={{ textAlign: 'center' }}>{isNL ? 'Snelle Levering' : 'Fast Delivery'}</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>{isNL ? 'Eerste resultaten binnen weken, niet maanden' : 'First results within weeks, not months'}</ServiceDesc></StatCard>
              <StatCard $accent="linear-gradient(90deg, #3B82F6, #8B5CF6)"><ServiceIcon $bg="rgba(59, 130, 246, 0.15)" $color="#60A5FA" style={{ margin: '0 auto 0.4rem' }}><BarChart3 size={18} /></ServiceIcon><ServiceTitle style={{ textAlign: 'center' }}>{isNL ? 'Data-Gedreven' : 'Data-Driven'}</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>{isNL ? 'Elke implementatie wordt gemeten op concrete KPIs' : 'Every implementation is measured on concrete KPIs'}</ServiceDesc></StatCard>
              <StatCard $accent="linear-gradient(90deg, #10B981, #06B6D4)"><ServiceIcon $bg="rgba(16, 185, 129, 0.15)" $color="#34D399" style={{ margin: '0 auto 0.4rem' }}><Globe size={18} /></ServiceIcon><ServiceTitle style={{ textAlign: 'center' }}>{isNL ? 'Full-Service' : 'Full-Service'}</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>{isNL ? 'Van strategie tot code, alles in-house' : 'From strategy to code, everything in-house'}</ServiceDesc></StatCard>
            </StatsRow>
          </div>
        </SlideContent>
      </SlideContainer>
    ),

    // SLIDE 7: TEAM
    () => (
      <SlideContainer>
        <GlowOrb $size="350px" $color="rgba(139, 92, 246, 0.06)" $top="-80px" $left="-80px" />
        <SlideContent>
          <Badge $bg="rgba(139, 92, 246, 0.1)" $border="rgba(139, 92, 246, 0.25)" $color="#A78BFA"><Users size={12} /> {isNL ? 'Ons Team' : 'Our Team'}</Badge>
          <BigTitle>{isNL ? <>Gestart vanuit passie voor AI, gegroeid tot een <GradientSpan>internationaal team</GradientSpan></> : <>Started from a passion for AI, grown into an <GradientSpan>international team</GradientSpan></>}</BigTitle>
          <SubText>{isNL ? 'AI-onderzoek en projectleiding vanuit Nederland. Development in Mumbai en Manila. Hierdoor verlagen we de kostprijs zonder concessies aan kwaliteit.' : 'AI research and project management from the Netherlands. Development in Mumbai and Manila. This reduces costs without compromising quality.'}</SubText>
          <TeamGrid>
            {team.map((member, i) => (
              <TeamCard key={i}><TeamAvatar><img src={member.img} alt={member.name} loading="lazy" /></TeamAvatar><TeamName>{member.name}</TeamName><TeamRole>{member.role}</TeamRole><TeamBio>{member.bio}</TeamBio></TeamCard>
            ))}
          </TeamGrid>
          <StatsRow $cols={3} style={{ marginTop: '0.75rem' }}>
            <StatCard><div style={{ fontSize: '1.3rem', marginBottom: '0.1rem' }}>&#x1F1F3;&#x1F1F1;</div><ServiceTitle style={{ textAlign: 'center' }}>Utrecht</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>{isNL ? 'AI Research & Hoofdkantoor' : 'AI Research & HQ'}</ServiceDesc></StatCard>
            <StatCard><div style={{ fontSize: '1.3rem', marginBottom: '0.1rem' }}>&#x1F1EE;&#x1F1F3;</div><ServiceTitle style={{ textAlign: 'center' }}>Mumbai</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>Development</ServiceDesc></StatCard>
            <StatCard><div style={{ fontSize: '1.3rem', marginBottom: '0.1rem' }}>&#x1F1F5;&#x1F1ED;</div><ServiceTitle style={{ textAlign: 'center' }}>Manila</ServiceTitle><ServiceDesc style={{ textAlign: 'center' }}>Development</ServiceDesc></StatCard>
          </StatsRow>
        </SlideContent>
      </SlideContainer>
    ),
  ];

  /* ═══════════════════════════════════════
     PASSWORD SCREEN
     ═══════════════════════════════════════ */

  if (screen === 'password') {
    return (
      <GateWrapper>
        <GridBG />
        <GlowOrb $size="500px" $color="rgba(59, 130, 246, 0.06)" $top="-200px" $right="-200px" />
        <GlowOrb $size="400px" $color="rgba(16, 185, 129, 0.05)" $bottom="-100px" $left="-150px" />
        <GateCard
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <GateLogo src="/uploads/optivaize_logo_new.png" alt="Optivaize" />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <LangBtn $active={presLang === 'nl'} onClick={() => setPresLang('nl')}>NL</LangBtn>
            <LangBtn $active={presLang === 'en'} onClick={() => setPresLang('en')}>EN</LangBtn>
          </div>
          <GateTitle><GradientSpan>{isNL ? 'Presentatie' : 'Presentation'}</GradientSpan></GateTitle>
          <GateSubtext>{isNL ? 'Voer het wachtwoord in om de presentatie te bekijken.' : 'Enter the password to view the presentation.'}</GateSubtext>
          <form onSubmit={handlePasswordSubmit}>
            <InputWrapper>
              <GateInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder={isNL ? 'Wachtwoord' : 'Password'}
                $error={!!error}
                autoFocus
              />
              <ToggleVisibility type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </ToggleVisibility>
            </InputWrapper>
            <AnimatePresence>
              {error && (
                <GateError initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{error}</GateError>
              )}
            </AnimatePresence>
            <GateBtn type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Lock size={16} />{isNL ? 'Toegang' : 'Enter'}
            </GateBtn>
          </form>
        </GateCard>
      </GateWrapper>
    );
  }

  /* ═══════════════════════════════════════
     PRESENTATION (page-by-page)
     ═══════════════════════════════════════ */

  return (
    <PresWrapper>
      <GridBG />

      {/* Top bar with logo + slide counter + lang */}
      <TopBar>
        <TopLogo src="/uploads/optivaize_logo_new.png" alt="Optivaize" />
        <SlideCounter>{activeSlide + 1} / {totalSlides}</SlideCounter>
        <TopLangRow>
          <LangBtn $active={presLang === 'nl'} onClick={() => setPresLang('nl')}>NL</LangBtn>
          <LangBtn $active={presLang === 'en'} onClick={() => setPresLang('en')}>EN</LangBtn>
        </TopLangRow>
      </TopBar>

      {/* Slide content with animation */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          {slides[activeSlide]()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom navigation */}
      <BottomNav>
        <NavBtn onClick={prev} disabled={activeSlide === 0}><ChevronLeft size={20} /></NavBtn>
        <DotsRow>
          {slides.map((_, i) => (
            <Dot key={i} $active={activeSlide === i} onClick={() => goToSlide(i)} />
          ))}
        </DotsRow>
        <NavBtn onClick={next} disabled={activeSlide === totalSlides - 1}><ChevronRight size={20} /></NavBtn>
      </BottomNav>
    </PresWrapper>
  );
}

export default PresentationPage;

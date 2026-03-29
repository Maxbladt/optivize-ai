'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from '../components/Link';
import { Zap, ArrowRight, CheckCircle, RefreshCw, Database, Mail, Package, ChevronRight, GitBranch, Clock, BarChart3, Cpu, Server, Layers, XCircle, ArrowDown, Code2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #8B5CF6, #3B82F6)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(139,92,246,0.1), transparent),
                radial-gradient(ellipse 40% 40% at 10% 60%, rgba(59,130,246,0.07), transparent);
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 760px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  color: #475569;
  margin-bottom: 1.5rem;
  a { color: #475569; &:hover { color: #94A3B8; } }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(139,92,246,0.15);
  border: 1px solid rgba(139,92,246,0.3);
  color: #A78BFA;
  font-size: 12px;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
`;

const Desc = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 620px;
`;

const HeroCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(139,92,246,0.35);
`;

/* ─── Flow Diagram (n8n style) ─── */
const flowPulse = keyframes`
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateX(200%); }
`;

const FlowSection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const FlowDiagram = styled.div`
  background: #F8FAFC;
  border-radius: 24px;
  border: 1px solid #E2E8F0;
  padding: 3rem 2.5rem;
  overflow-x: auto;
`;

const FlowTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #94A3B8;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FlowRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 1.25rem;
  flex-wrap: nowrap;
  min-width: 700px;
`;

const FlowBranchRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
  min-width: 700px;
`;

const FlowNode = styled(motion.div)`
  background: white;
  border-radius: 14px;
  border: 2px solid ${props => props.$color || '#E2E8F0'};
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  box-shadow: 0 4px 16px ${props => props.$color ? props.$color + '20' : 'rgba(0,0,0,0.04)'};
  min-width: 180px;
`;

const NodeIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: ${props => props.$color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

const NodeText = styled.div`
  .name { font-size: 13px; font-weight: 700; color: #0F172A; }
  .sub  { font-size: 11px; color: #64748B; margin-top: 1px; }
`;

const ArrowLine = styled.div`
  width: 48px;
  height: 2px;
  background: #E2E8F0;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, #8B5CF6, transparent);
    animation: ${flowPulse} 2s ease-in-out infinite;
  }
`;

const ArrowHead = styled(ChevronRight)`
  color: #8B5CF6;
  flex-shrink: 0;
`;

const BranchNode = styled(motion.div)`
  background: white;
  border-radius: 14px;
  border: 2px solid ${props => props.$color}44;
  padding: 1.125rem;
  box-shadow: 0 4px 16px ${props => props.$color}14;
`;

const BranchIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  margin-bottom: 0.625rem;
`;

const BranchTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.2rem;
`;

const BranchSub = styled.div`
  font-size: 11px;
  color: #64748B;
  line-height: 1.4;
`;

/* ─── Features ─── */
const FeaturesSection = styled.section`
  padding: 7rem 0;
  background: #F8FAFC;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #F1F5F9;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  margin-bottom: 1.25rem;
`;

const FeatureTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.625rem;
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.6;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8B5CF6;
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
  line-height: 1.15;
`;

const SectionSub = styled.p`
  font-size: 17px;
  color: #64748B;
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const SectionText = styled.p`
  font-size: 17px;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const Checks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CheckRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 15px;
  color: #334155;

  svg { color: #10B981; flex-shrink: 0; margin-top: 2px; }
`;

const Section = styled.section`
  padding: 7rem 0;
  background: ${props => props.$gray ? '#F8FAFC' : 'white'};
`;

const CTACard = styled(motion.div)`
  background: ${GRADIENT};
  border-radius: 24px;
  padding: 4rem;
  text-align: center;

  h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 1rem; }
  p  { font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 2rem; }

  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const BtnRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BtnWhite = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #8B5CF6;
  font-weight: 700;
  font-size: 15px;
  padding: 0.8rem 1.75rem;
  border-radius: 10px;
`;

const BtnOutline = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.3);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 0.775rem 1.625rem;
  border-radius: 10px;
`;

/* ─── Platform Bridge ─── */
const BridgeSection = styled.section`
  padding: 7rem 0;
  background: linear-gradient(180deg, #0F172A, #1E293B);
  position: relative;
  overflow: hidden;
`;

const BridgeVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 2rem 0;
  @media (max-width: 900px) { flex-direction: column; gap: 0; }
`;

const PlatformBox = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 2rem 1.75rem;
  text-align: center;
  min-width: 170px;
`;

const PlatformIconWrap = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${p => p.$color}15;
  border: 1.5px solid ${p => p.$color}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin: 0 auto 0.75rem;
`;

const PlatformName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.2rem;
`;

const PlatformSub = styled.div`
  font-size: 12px;
  color: #64748B;
`;

const DataFlowWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0 0.375rem;
  flex-shrink: 0;
  @media (max-width: 900px) {
    padding: 0.75rem 0;
    flex-direction: row;
    gap: 0.375rem;
  }
`;

const DataFlowLine = styled.div`
  width: 56px;
  height: 2px;
  background: #1E293B;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, ${p => p.$color || '#8B5CF6'}, transparent);
    animation: ${flowPulse} ${p => p.$speed || '2s'} ease-in-out infinite;
    animation-delay: ${p => p.$delay || '0s'};
  }

  @media (max-width: 900px) {
    width: 2px;
    height: 32px;
  }
`;

const MiddlewareBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.12));
  border: 2px solid rgba(139,92,246,0.25);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  text-align: center;
  position: relative;
  min-width: 220px;
`;

const MiddlewareIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(139,92,246,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #A78BFA;
  margin: 0 auto 0.75rem;
`;

const AIBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(245,158,11,0.15);
  border: 1px solid rgba(245,158,11,0.3);
  color: #FBBF24;
  font-size: 11px;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 8px;
  margin-top: 0.75rem;
`;

const BridgeTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 0.75rem;
  line-height: 1.15;
`;

const BridgeSub = styled.p`
  font-size: 17px;
  color: #94A3B8;
  text-align: center;
  max-width: 540px;
  margin: 0 auto;
  line-height: 1.7;
`;

/* ─── Before / After Compare ─── */
const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: stretch;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CompareCard = styled(motion.div)`
  background: ${p => p.$type === 'before' ? '#FEF2F2' : '#F5F3FF'};
  border: 1.5px solid ${p => p.$type === 'before' ? '#FECACA' : '#DDD6FE'};
  border-radius: 20px;
  padding: 2rem;
`;

const CompareBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${p => p.$color}15;
  color: ${p => p.$color};
  font-size: 12px;
  font-weight: 700;
  padding: 0.4rem 0.875rem;
  border-radius: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 1.25rem;
`;

const CompareItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 14px;
  color: #334155;
  padding: 0.625rem 0;
  border-bottom: 1px solid ${p => p.$type === 'before' ? '#FEE2E2' : '#EDE9FE'};

  &:last-child { border-bottom: none; }
  svg { flex-shrink: 0; }
`;

const CompareDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8B5CF6;
  @media (max-width: 768px) { justify-content: center; padding: 0.5rem 0; }
`;

/* ─── Dark Flow (improved) ─── */
const DarkFlowDiagram = styled.div`
  background: #0F172A;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.08);
  padding: 2.5rem;
  overflow-x: auto;
`;

const DarkFlowTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DarkFlowNode = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border-radius: 14px;
  border: 2px solid ${p => p.$color}44;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  box-shadow: 0 4px 16px ${p => p.$color}15;
  min-width: 170px;
`;

const DarkNodeText = styled.div`
  .name { font-size: 13px; font-weight: 700; color: white; }
  .sub  { font-size: 11px; color: #94A3B8; margin-top: 1px; }
`;

const DarkNodeIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: ${p => p.$color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  flex-shrink: 0;
`;

const DarkArrowLine = styled.div`
  width: 40px;
  height: 2px;
  background: #1E293B;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, #8B5CF6, transparent);
    animation: ${flowPulse} 2s ease-in-out infinite;
  }
`;

const DarkBranchRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
  min-width: 700px;
`;

const DarkBranchCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border-radius: 14px;
  border: 2px solid ${p => p.$color}30;
  padding: 1.125rem;
  box-shadow: 0 4px 16px ${p => p.$color}10;
`;

const DarkBranchIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${p => p.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin-bottom: 0.625rem;
`;

const DarkBranchTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.2rem;
`;

const DarkBranchSub = styled.div`
  font-size: 11px;
  color: #94A3B8;
  line-height: 1.4;
`;

/* ─── Pipeline (full-width nodes) ─── */
const PipelineGrid = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 1.25rem;
  min-width: 700px;
`;

const PipelineNode = styled(motion.div)`
  flex: 1;
  background: rgba(255,255,255,0.04);
  border-radius: 14px;
  border: 2px solid ${p => p.$color}44;
  padding: 1.125rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 16px ${p => p.$color}15;
`;

const PipelineArrow = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 0.125rem;
`;

/* ─── Transformation Rules (code-style) ─── */
const RulesBlock = styled.div`
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(139,92,246,0.15);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  min-width: 700px;
`;

const RulesTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.625rem;
`;

const RuleLine = styled.div`
  font-family: 'SF Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12.5px;
  color: #CBD5E1;
  padding: 0.3rem 0;
  line-height: 1.6;
`;

const RuleKw = styled.span`color: #C084FC; font-weight: 600;`;
const RuleCond = styled.span`color: #60A5FA;`;
const RuleArr = styled.span`color: #64748B; margin: 0 0.35rem;`;
const RuleRes = styled.span`color: #34D399;`;

/* ─── Build approach cards ─── */
const BuildSection = styled.section`
  padding: 7rem 0;
  background: linear-gradient(180deg, #0F172A, #1E293B);
`;

const BuildGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: stretch;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BuildCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem 2rem;
`;

const BuildCardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${p => p.$color}15;
  border: 1.5px solid ${p => p.$color}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin-bottom: 1.25rem;
`;

const BuildCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const BuildCardDesc = styled.p`
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.65;
  margin-bottom: 1rem;
`;

const BuildTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const BuildTag = styled.span`
  background: ${p => p.$color}12;
  color: ${p => p.$color};
  font-size: 11px;
  font-weight: 600;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  border: 1px solid ${p => p.$color}25;
`;

const BuildDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #475569;
  @media (max-width: 768px) { padding: 0; }
`;

function AutomationPage() {

  const features = [
    { icon: RefreshCw, color: '#8B5CF6', title: 'Platform sync', desc: 'Verbind al je tools en synchroniseer data automatisch in real-time.' },
    { icon: GitBranch, color: '#3B82F6', title: 'Complexe flows', desc: 'Bouw workflows met condities, vertakkingen en foutafhandeling.' },
    { icon: Clock, color: '#10B981', title: 'Tijdgebaseerd', desc: 'Plan taken op specifieke momenten of intervallen , geheel automatisch.' },
    { icon: Database, color: '#F59E0B', title: 'Data mapping', desc: 'Transformeer data van het ene formaat naar het andere zonder handmatig werk.' },
    { icon: Mail, color: '#EF4444', title: 'Notificaties', desc: 'Automatische e-mails, Slack-berichten en alerts op het juiste moment.' },
    { icon: BarChart3, color: '#EC4899', title: 'Rapportages', desc: 'Automatische rapporten en dashboards die altijd up-to-date zijn.' },
  ];

  return (
    <>
      <SEOHead
        title="Automatisering met AI | Optivaize, De Bilt"
        description="Bespaar tijd en kosten met slimme automatisering. Optivaize integreert AI in je bedrijfsprocessen vanuit De Bilt, voor heel Nederland."
        canonicalUrl="https://optivaize.nl/automatisering"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'Automatisering', url: 'https://optivaize.nl/automatisering' }
        ]}
      />
      <PageHero>
        <Container>
          <HeroInner>
            <Breadcrumb>
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>{'Diensten'}</span>
              <ChevronRight size={14} />
              <span>{'Automatisering'}</span>
            </Breadcrumb>
            <Badge><Zap size={12} /> {'Workflow Automatisering'}</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {<>Elimineer handmatig werk. <span style={{ color: '#A78BFA' }}>Volledig.</span></>}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {'Van repetitieve taken tot complexe platform-integraties: wij automatiseren het. Je team focust op wat echt telt, de rest doen de machines.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {'Bespreek je processen'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* ── Platform Bridge ── */}
      <BridgeSection>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <SectionLabel style={{ display: 'flex', justifyContent: 'center', color: '#A78BFA' }}>{'Integratie'}</SectionLabel>
              <BridgeTitle>
                {'Wij bouwen de software die tussen je platformen communiceert'}
              </BridgeTitle>
              <BridgeSub>
                {'Van ERP tot CRM, van webshop tot boekhouding - wij verbinden het. Met een optionele AI-laag die je data slim verwerkt.'}
              </BridgeSub>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <BridgeVisual>
              <PlatformBox initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <PlatformIconWrap $color="#3B82F6"><Server size={24} /></PlatformIconWrap>
                <PlatformName>{'Je Platform A'}</PlatformName>
                <PlatformSub>{'ERP / webshop / CRM'}</PlatformSub>
              </PlatformBox>

              <DataFlowWrap>
                <DataFlowLine $color="#3B82F6" />
                <DataFlowLine $color="#8B5CF6" $speed="2.5s" $delay="0.5s" />
              </DataFlowWrap>

              <MiddlewareBox initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <MiddlewareIcon><Layers size={26} /></MiddlewareIcon>
                <PlatformName>Optivaize</PlatformName>
                <PlatformSub>{'Custom middleware'}</PlatformSub>
                <div><AIBadge><Cpu size={12} /> + AI Layer</AIBadge></div>
              </MiddlewareBox>

              <DataFlowWrap>
                <DataFlowLine $color="#8B5CF6" $speed="2.2s" $delay="0.3s" />
                <DataFlowLine $color="#10B981" $speed="2.5s" />
              </DataFlowWrap>

              <PlatformBox initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <PlatformIconWrap $color="#10B981"><Database size={24} /></PlatformIconWrap>
                <PlatformName>{'Je Platform B'}</PlatformName>
                <PlatformSub>{'Boekhouding / CRM / API'}</PlatformSub>
              </PlatformBox>
            </BridgeVisual>
          </FadeIn>
        </Container>
      </BridgeSection>

      {/* ── Before / After ── */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Transformatie'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>
              {'Van handmatige invoer naar volledige automatisering'}
            </SectionTitle></FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <CompareGrid>
              <CompareCard $type="before" initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <CompareBadge $color="#EF4444">{'Handmatig'}</CompareBadge>
                {([
                  'Handmatige data-invoer tussen systemen',
                  'Fouten door menselijk handelen',
                  'Uren per dag aan repetitief werk',
                  'Data niet gesynchroniseerd',
                  'Geen inzicht in real-time status',
                ]).map((item, i) => (
                  <CompareItem key={i} $type="before"><XCircle size={16} color="#EF4444" />{item}</CompareItem>
                ))}
              </CompareCard>

              <CompareDivider><ArrowRight size={28} /></CompareDivider>

              <CompareCard $type="after" initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <CompareBadge $color="#8B5CF6">{'Geautomatiseerd'}</CompareBadge>
                {([
                  'Automatische data-sync in real-time',
                  'Foutloos en consistent, elke keer',
                  '24/7 zonder menselijke tussenkomst',
                  'Altijd gesynchroniseerd en up-to-date',
                  'Live dashboards en automatische alerts',
                ]).map((item, i) => (
                  <CompareItem key={i} $type="after"><CheckCircle size={16} color="#10B981" />{item}</CompareItem>
                ))}
              </CompareCard>
            </CompareGrid>
          </FadeIn>
        </Container>
      </Section>

      {/* Features */}
      <FeaturesSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Mogelijkheden'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{'Alles wat je nodig hebt'}</SectionTitle></FadeIn>
          </div>
          <FeatureGrid>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <FeatureCard whileHover={{ y: -4 }}>
                    <FeatureIcon $color={f.color}><Icon size={22} /></FeatureIcon>
                    <FeatureTitle>{f.title}</FeatureTitle>
                    <FeatureDesc>{f.desc}</FeatureDesc>
                  </FeatureCard>
                </FadeIn>
              );
            })}
          </FeatureGrid>
        </Container>
      </FeaturesSection>

      {/* ── Magic Apparels Case ── */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Case Study'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>Magic Apparels × Optivaize</SectionTitle></FadeIn>
            <FadeIn delay={0.1}><SectionSub>
              {'Wij bouwden een volledig geautomatiseerde order-to-invoice pipeline tussen Becosoft en Sage Intacct.'}
            </SectionSub></FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <DarkFlowDiagram>
              <DarkFlowTitle>
                <Zap size={14} color="#8B5CF6" />
                {'Automatiseringsflow · Magic Apparels'}
              </DarkFlowTitle>

              <PipelineGrid>
                <PipelineNode $color="#10B981" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                  <DarkNodeIcon $color="#10B981"><Package size={16} /></DarkNodeIcon>
                  <DarkNodeText>
                    <div className="name">Becosoft</div>
                    <div className="sub">{'Nieuwe bestelling'}</div>
                  </DarkNodeText>
                </PipelineNode>
                <PipelineArrow><DarkArrowLine /><ChevronRight size={16} color="#8B5CF6" /></PipelineArrow>

                <PipelineNode $color="#8B5CF6" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                  <DarkNodeIcon $color="#8B5CF6"><Database size={16} /></DarkNodeIcon>
                  <DarkNodeText>
                    <div className="name">Data Mapping</div>
                    <div className="sub">{'Velden koppelen'}</div>
                  </DarkNodeText>
                </PipelineNode>
                <PipelineArrow><DarkArrowLine /><ChevronRight size={16} color="#8B5CF6" /></PipelineArrow>

                <PipelineNode $color="#F59E0B" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <DarkNodeIcon $color="#F59E0B"><Code2 size={16} /></DarkNodeIcon>
                  <DarkNodeText>
                    <div className="name">Transformatie</div>
                    <div className="sub">{'Business rules'}</div>
                  </DarkNodeText>
                </PipelineNode>
              </PipelineGrid>

              <RulesBlock>
                <RulesTitle>{'Transformatie regels'}</RulesTitle>
                <RuleLine><RuleKw>if</RuleKw> <RuleCond>valuta === "EUR"</RuleCond> <RuleArr>→</RuleArr> <RuleRes>BTW = 0%</RuleRes></RuleLine>
                <RuleLine><RuleKw>if</RuleKw> <RuleCond>type === "credit"</RuleCond> <RuleArr>→</RuleArr> <RuleRes>{'bedrag = factuur × -1'}</RuleRes></RuleLine>
                <RuleLine><RuleKw>if</RuleKw> <RuleCond>{'bedrag > €10.000'}</RuleCond> <RuleArr>→</RuleArr> <RuleRes>{'goedkeuring vereist'}</RuleRes></RuleLine>
              </RulesBlock>

              <div style={{ textAlign: 'center', color: '#475569', margin: '0.5rem 0 1rem' }}>
                <ArrowDown size={16} color="#8B5CF6" />
                <div style={{ fontSize: 11, color: '#64748B', marginTop: '0.25rem' }}>{'Parallel uitvoering'}</div>
              </div>

              <DarkBranchRow>
                <DarkBranchCard $color="#F59E0B" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  <DarkBranchIcon $color="#F59E0B"><Database size={16} /></DarkBranchIcon>
                  <DarkBranchTitle>Sage Intacct</DarkBranchTitle>
                  <DarkBranchSub>{'Factuur automatisch aangemaakt'}</DarkBranchSub>
                </DarkBranchCard>
                <DarkBranchCard $color="#EF4444" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
                  <DarkBranchIcon $color="#EF4444"><Mail size={16} /></DarkBranchIcon>
                  <DarkBranchTitle>{'E-mail notificatie'}</DarkBranchTitle>
                  <DarkBranchSub>{'Manager op de hoogte gesteld'}</DarkBranchSub>
                </DarkBranchCard>
                <DarkBranchCard $color="#10B981" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                  <DarkBranchIcon $color="#10B981"><Package size={16} /></DarkBranchIcon>
                  <DarkBranchTitle>{'Voorraad update'}</DarkBranchTitle>
                  <DarkBranchSub>{'Stock bijgewerkt in real-time'}</DarkBranchSub>
                </DarkBranchCard>
              </DarkBranchRow>
            </DarkFlowDiagram>
          </FadeIn>

        </Container>
      </Section>

      {/* How we build automations */}
      <BuildSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center', color: '#A78BFA' }}>{'Onze aanpak'}</SectionLabel>
            <FadeIn><BridgeTitle>
              {'Wij bouwen automatiseringen met de beste tools'}
            </BridgeTitle></FadeIn>
            <FadeIn delay={0.05}><BridgeSub>
              Of het nu maatwerk software is of visuele tools als N8N, wij kiezen de beste aanpak voor je situatie.
            </BridgeSub></FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <BuildGrid>
              <BuildCard whileHover={{ y: -4 }}>
                <BuildCardIcon $color="#8B5CF6"><Code2 size={24} /></BuildCardIcon>
                <BuildCardTitle>Custom Software</BuildCardTitle>
                <BuildCardDesc>
                  {'Voor complexe integraties en unieke business logic. Volledige controle over elke stap in het proces.'}
                </BuildCardDesc>
                <BuildTags>
                  <BuildTag $color="#8B5CF6">Node.js</BuildTag>
                  <BuildTag $color="#8B5CF6">Python</BuildTag>
                  <BuildTag $color="#8B5CF6">REST APIs</BuildTag>
                  <BuildTag $color="#8B5CF6">Webhooks</BuildTag>
                </BuildTags>
              </BuildCard>

              <BuildDivider>+</BuildDivider>

              <BuildCard whileHover={{ y: -4 }}>
                <BuildCardIcon $color="#10B981"><Zap size={24} /></BuildCardIcon>
                <BuildCardTitle>N8N & Low-code</BuildCardTitle>
                <BuildCardDesc>
                  {'Voor snelle integraties met honderden platformen. Visuele workflows die eenvoudig aan te passen zijn.'}
                </BuildCardDesc>
                <BuildTags>
                  <BuildTag $color="#10B981">N8N</BuildTag>
                  <BuildTag $color="#10B981">400+ integraties</BuildTag>
                  <BuildTag $color="#10B981">Visueel</BuildTag>
                  <BuildTag $color="#10B981">Self-hosted</BuildTag>
                </BuildTags>
              </BuildCard>
            </BuildGrid>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: '3rem', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {[
                { icon: BarChart3, color: '#3B82F6', title: 'Analyse' },
                { icon: Layers, color: '#8B5CF6', title: 'Architectuur' },
                { icon: Code2, color: '#EF4444', title: 'Ontwikkeling' },
                { icon: CheckCircle, color: '#10B981', title: 'Testen' },
                { icon: Zap, color: '#F59E0B', title: 'Live' },
              ].map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ textAlign: 'center', minWidth: 90 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${step.color}15`, border: `1.5px solid ${step.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, margin: '0 auto 0.5rem' }}>
                      <step.icon size={18} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#CBD5E1' }}>{step.title}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, marginBottom: '1.5rem' }}>
                      <DarkArrowLine />
                      <ChevronRight size={14} color="#8B5CF6" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </FadeIn>
        </Container>
      </BuildSection>

      {/* N8N Hosting */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{'Hosting & beheer'}</SectionLabel>
              <SectionTitle>{'Wij hosten je n8n-omgeving'}</SectionTitle>
              <SectionText>
                {'Naast het bouwen van automatiseringen hosten en beheren wij ook je volledige n8n-omgeving. Je hebt altijd een betrouwbare, veilige en schaalbare infrastructuur voor je automatisering.'}
              </SectionText>
              <Checks>
                <CheckRow><CheckCircle size={16} />{'Dedicated server, geen gedeelde omgeving'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{'Koppeling met HubSpot, Salesforce of Pipedrive'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{'Automatische back-ups en monitoring'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{'Maandelijkse optimalisaties inbegrepen'}</CheckRow>
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/n8n_banner.webp" alt="n8n automation" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* CTA */}
      <Section $gray>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{'Welk proces wil je automatiseren?'}</h2>
              <p>Beschrijf je situatie en wij bouwen de oplossing. Gratis adviesgesprek, geen verplichtingen.</p>
              <BtnRow>
                <BtnWhite href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {'Vul het formulier in'} <ArrowRight size={16} />
                </BtnWhite>
                <BtnOutline href="tel:+31642698918" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {'Bel ons direct'}
                </BtnOutline>
              </BtnRow>
            </CTACard>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}

export default AutomationPage;

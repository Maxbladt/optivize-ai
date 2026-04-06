'use client';
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from '../components/Link';
import { Code2, Zap, Shield, Layers, GitBranch, Cpu, ArrowRight, CheckCircle, ChevronRight, Clock, Users, FileText, MessageSquare, Rocket, Server, Database, ArrowDown, RefreshCw, Mail, Package, BarChart3 } from 'lucide-react';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #EF4444, #F59E0B)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
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

const flowPulse = keyframes`
  0% { opacity: 0; transform: translateX(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateX(200%); }
`;

const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #1A0505 0%, #0F172A 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(239,68,68,0.1), transparent),
                radial-gradient(ellipse 40% 40% at 10% 60%, rgba(245,158,11,0.06), transparent);
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 760px;
`;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 0.5rem; font-size: 13px; color: #475569; margin-bottom: 1.5rem;
  a { color: #475569; &:hover { color: #94A3B8; } }
`;

const Badge = styled.div`
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3);
  color: #FCA5A5; font-size: 12px; font-weight: 700; padding: 0.35rem 0.8rem;
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
  border-radius: 12px; box-shadow: 0 6px 20px rgba(239,68,68,0.3);
`;

/* ─── Tool strip ─── */
const ToolsStrip = styled.div`
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  padding: 2.5rem 0;
`;

const ToolsLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94A3B8;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ToolsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ToolChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const ToolLogoBg = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ToolLogo = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const SpeedSection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const SpeedHighlight = styled.div`
  background: linear-gradient(135deg, #FFF7ED, #FEF3C7);
  border: 1.5px solid rgba(245,158,11,0.3);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 5rem;
`;

const SpeedNum = styled.div`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.75rem;
`;

const SpeedLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const SpeedSub = styled.div`
  font-size: 16px;
  color: #64748B;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
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
  color: ${props => props.$light ? '#FCA5A5' : '#EF4444'}; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem); font-weight: 800;
  color: ${props => props.$light ? 'white' : '#0F172A'};
  margin-bottom: 1.25rem; line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px; color: ${props => props.$light ? '#94A3B8' : '#475569'}; line-height: 1.7; margin-bottom: 1.25rem;
`;

const Checks = styled.div`
  display: flex; flex-direction: column; gap: 0.75rem;
`;

const CheckRow = styled.div`
  display: flex; align-items: flex-start; gap: 0.75rem; font-size: 15px; color: #334155;
  svg { color: #10B981; flex-shrink: 0; margin-top: 2px; }
`;

const FeatureGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled(motion.div)`
  background: white; border-radius: 20px; padding: 2rem; border: 1.5px solid #F1F5F9;
  transition: all 0.25s ease;
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 6px 24px ${props => props.$color}12; transform: translateY(-4px); }
`;

const FeatureIcon = styled.div`
  width: 48px; height: 48px; border-radius: 14px; background: ${props => props.$color}14;
  display: flex; align-items: center; justify-content: center; color: ${props => props.$color}; margin-bottom: 1.25rem;
`;

const FeatureTitle = styled.h3`
  font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 0.625rem;
`;

const FeatureDesc = styled.p`
  font-size: 14px; color: #64748B; line-height: 1.6;
`;

/* ─── AI Dev Pipeline ─── */
const PipelineDiagram = styled.div`
  background: #0F172A;
  border-radius: 24px;
  padding: 2.5rem;
  overflow-x: auto;
`;

const PipelineHeader = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #475569;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PipelineRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 700px;
`;

const PipelineNode = styled(motion.div)`
  background: rgba(255,255,255,0.06);
  border: 1.5px solid ${props => props.$color}44;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  flex: 1;
  min-width: 120px;
  box-shadow: 0 4px 16px ${props => props.$color}18;
`;

const PipeNodeTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const PipeNodeLogo = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: ${props => props.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const PipeNodeLogoImg = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const PipeNodeName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: white;
`;

const PipeNodeDesc = styled.div`
  font-size: 10px;
  color: #475569;
  line-height: 1.4;
`;

const PipeArrow = styled.div`
  color: #334155;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const PipeArrowLine = styled.div`
  width: 32px;
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
    background: linear-gradient(90deg, transparent, #EF4444, transparent);
    ${css`animation: ${flowPulse} 2.5s ease-in-out infinite;`}
  }
`;

/* ─── Process Steps ─── */
const ProcessSteps = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
  max-width: 920px;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: #E2E8F0;
    z-index: 1;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    &::before { display: none; }
  }
`;

const ProcessStepItem = styled(motion.div)`
  text-align: center;
  flex: 1;
  max-width: 160px;
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 2.5px solid ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin: 0 auto 0.75rem;
  position: relative;
  z-index: 2;
`;

const StepLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.2rem;
`;

const StepDesc = styled.div`
  font-size: 12px;
  color: #64748B;
  line-height: 1.4;
`;

/* ─── AI Pipeline Funnel ─── */
const FunnelContainer = styled.div`
  background: linear-gradient(180deg, #0F172A, #1A2332);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 40% at 50% 0%, rgba(239,68,68,0.08), transparent);
  }
`;

const FunnelLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #EF4444;
  text-align: center;
  margin-bottom: 0.5rem;
  position: relative;
`;

const FunnelHeading = styled.div`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
`;

const FunnelStage = styled(motion.div)`
  max-width: ${p => p.$width};
  margin: 0 auto;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid ${p => p.$color}30;
  border-radius: 16px;
  padding: 1.125rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
`;

const FunnelStageIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${p => p.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  flex-shrink: 0;
`;

const FunnelStageName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.15rem;
`;

const FunnelStageDesc = styled.div`
  font-size: 13px;
  color: #94A3B8;
  line-height: 1.4;
`;

const FunnelArrowDown = styled.div`
  text-align: center;
  padding: 0.5rem 0;
  color: #475569;
  position: relative;
`;

const FunnelOutput = styled(motion.div)`
  max-width: 280px;
  margin: 0 auto;
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 14px;
  padding: 0.875rem 1.5rem;
  text-align: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 20px rgba(16,185,129,0.3);
  position: relative;
`;

/* ─── Self-hosting ─── */
const SelfHostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 2.5rem;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`;

const SelfHostCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
`;

const SelfHostIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${p => p.$color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin: 0 auto 1rem;
`;

/* ─── Automation Section ─── */
const AutoSection = styled.section`
  padding: 7rem 0;
  background: #F8FAFC;
`;

const AutoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const AutoCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #F1F5F9;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 6px 24px ${props => props.$color}12; transform: translateY(-4px); }
  transition: all 0.25s ease;
`;

const AutoCardIcon = styled.div`
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

const AutoCardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.625rem;
`;

const AutoCardDesc = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.6;
`;

const ExamplesGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ExCard = styled(motion.div)`
  border-radius: 20px; overflow: hidden; border: 1px solid #F1F5F9;
`;

const ExContent = styled.div`
  padding: 1.5rem;
  .tag { font-size: 11px; font-weight: 700; color: #3B82F6; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .title { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.4rem; }
  .desc { font-size: 13px; color: #64748B; line-height: 1.5; }
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
  color: #EF4444; font-weight: 700; font-size: 15px; padding: 0.8rem 1.75rem; border-radius: 10px;
`;

const BtnOutline = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.3); color: white; font-weight: 600; font-size: 15px;
  padding: 0.775rem 1.625rem; border-radius: 10px;
`;

const DEV_TOOLS = [
  { name: 'Claude', slug: 'anthropic', bg: '#D97706' },
  { name: 'Cursor', slug: null, bg: '#000000', label: 'CS' },
  { name: 'GitHub Copilot', slug: 'github', bg: '#181717' },
  { name: 'React', slug: 'react', bg: '#61DAFB' },
  { name: 'Node.js', slug: 'nodedotjs', bg: '#339933' },
  { name: 'Python', slug: 'python', bg: '#3776AB' },
  { name: 'Docker', slug: 'docker', bg: '#2496ED' },
  { name: 'AWS', slug: null, customIcon: '/images/aws_logo.svg', bg: '#FF9900' },
  { name: 'Vercel', slug: 'vercel', bg: '#000000' },
  { name: 'PostgreSQL', slug: 'postgresql', bg: '#4169E1' },
  { name: 'n8n', slug: null, bg: '#EA4B71', label: 'n8n' },
];

const PIPELINE_NODES = [
  { name: 'Requirements', descNL: 'Claude analyseert specs', descEN: 'Claude analyses specs', slug: 'anthropic', bg: '#D97706', color: '#F59E0B' },
  { name: 'Cursor IDE', descNL: 'AI-assisted coding', descEN: 'AI-assisted coding', slug: null, bg: '#1A1A1A', label: 'CS', color: '#94A3B8' },
  { name: 'GitHub', descNL: 'Code review + CI', descEN: 'Code review + CI', slug: 'github', bg: '#181717', color: '#6366F1' },
  { name: 'Testing', descNL: 'Automatische tests', descEN: 'Automated tests', slug: null, bg: '#059669', label: 'QA', color: '#10B981' },
  { name: 'Deploy', descNL: 'AWS / Vercel live', descEN: 'AWS / Vercel live', slug: null, customIcon: '/images/aws_logo.svg', bg: '#FF9900', color: '#F59E0B' },
];

function SoftwarePage() {

  const features = [
    { icon: Zap, color: '#EF4444', title: 'AI-assisted development', desc: 'Claude en Cursor in elk stap van het bouwproces , voor maximale snelheid en kwaliteit zonder in te leveren.' },
    { icon: Shield, color: '#3B82F6', title: 'Production-ready', desc: 'Geen prototypes , wij leveren schaalbare, veilige software die direct in productie gaat.' },
    { icon: Layers, color: '#10B981', title: 'Modern tech stack', desc: 'React, Node.js, Python, cloud-native , gebouwd voor de toekomst en volledig schaalbaar.' },
    { icon: GitBranch, color: '#8B5CF6', title: 'Agile & iteratief', desc: 'Wekelijkse sprints, dagelijkse updates. Je ziet de voortgang en hebt volledige controle.' },
    { icon: Cpu, color: '#F59E0B', title: 'AI-integraties', desc: 'Wij integreren de nieuwste AI-modellen (GPT-4, Claude, Gemini) direct in je software.' },
    { icon: Clock, color: '#EC4899', title: 'MVP in 2-4 weken', desc: 'Eerste versie live in 2-4 weken. Geen maanden wachten, wel kwaliteitsproduct.' },
  ];

  const examples = [
    { tag: 'Automatisering Platform', title: 'Magic Apparels', desc: 'Volledig geautomatiseerd orderplatform tussen Becosoft en Sage Intacct, honderden orders per dag.', img: '/images/magic_apparels_dashboard.webp', alt: 'Magic Apparels dashboard' },
    { tag: 'OpenClaw', title: 'Multi-agent platform', desc: 'Custom multi-agent implementatie voor volledige bedrijfsautomatisering via berichtenplatforms.', img: '/images/openclaw_cool.webp', alt: 'OpenClaw platform' },
    { tag: 'AI-Integratie', title: 'Passion Ice Baths', desc: 'AI-gedreven SEO systeem en custom Shopify app voor het merk van Wim Hof.', img: '/images/passion_icebaths.webp', alt: 'Passion Ice Baths' },
    { tag: 'Automatisering', title: 'n8n Workflow Platform', desc: 'Low-code automatiseringen en custom integraties voor complexe bedrijfsprocessen.', img: '/images/n8n_flow.webp', alt: 'n8n workflow automation' },
  ];

  const automationFeatures = [
    { icon: RefreshCw, color: '#8B5CF6', title: 'Platform sync', desc: 'Verbind al je tools en synchroniseer data automatisch in real-time.' },
    { icon: GitBranch, color: '#3B82F6', title: 'Complexe flows', desc: 'Bouw workflows met condities, vertakkingen en foutafhandeling.' },
    { icon: Clock, color: '#10B981', title: 'Tijdgebaseerd', desc: 'Plan taken op specifieke momenten of intervallen, geheel automatisch.' },
    { icon: Database, color: '#F59E0B', title: 'Data mapping', desc: 'Transformeer data van het ene formaat naar het andere zonder handmatig werk.' },
    { icon: Mail, color: '#EF4444', title: 'Notificaties', desc: 'Automatische e-mails, Slack-berichten en alerts op het juiste moment.' },
    { icon: BarChart3, color: '#EC4899', title: 'Rapportages', desc: 'Automatische rapporten en dashboards die altijd up-to-date zijn.' },
  ];

  const checks = [
    'MVP in 2 tot 4 weken live , aantoonbaar snelste in Nederland',
    'Volledige documentatie en kennisoverdracht',
    'Schaalbare cloud-architectuur (AWS, Azure, GCP)',
    'Veilig, GDPR-compliant en pen-tested',
    'Post-launch support en doorlopende iteraties',
    'AI-agents gebouwd in ons eigen OpenClaw framework',
    'n8n workflows, platform integraties en custom automatisering',
  ];

  const processSteps = [
    { icon: Users, color: '#3B82F6', title: 'Kennismaking', desc: 'Requirements opstellen' },
    { icon: FileText, color: '#8B5CF6', title: 'Technisch Plan', desc: 'Onze devs maken een plan' },
    { icon: Code2, color: '#EF4444', title: 'Development', desc: 'AI development pipeline' },
    { icon: MessageSquare, color: '#10B981', title: 'Klant Review', desc: 'Bespreken & goedkeuring' },
    { icon: Rocket, color: '#F59E0B', title: 'Deploy', desc: 'Na toestemming live' },
  ];

  const funnelStages = [
    { icon: Code2, color: '#EF4444', width: '100%', title: 'AI-Assisted Coding', desc: 'Claude, Cursor & Copilot schrijven en reviewen code' },
    { icon: Zap, color: '#3B82F6', width: '78%', title: 'Automated Testing', desc: 'Unit tests, integratie tests en E2E tests' },
    { icon: Shield, color: '#10B981', width: '56%', title: 'Security Testing', desc: 'Penetration testing & OWASP compliance' },
  ];

  return (
    <>
      <SEOHead
        title="Software & Platforms | Optivaize, De Bilt"
        description="Op maat gemaakte software, platforms en automatisering. Optivaize ontwikkelt dashboards, APIs, n8n workflows en platforms met AI-integratie vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/software-platforms"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'Software & Platforms', url: 'https://optivaize.nl/software-platforms' }
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
              <span>Software & Platforms</span>
            </Breadcrumb>
            <Badge><Code2 size={12} /> Software & Platforms</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {<>Software, platforms <span style={{ color: '#FCA5A5' }}>&amp; automatisering</span></>}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {'Dankzij AI-assisted development leveren wij productieklare software in weken, niet maanden. Op maat gebouwd met Claude, Cursor en de nieuwste tools , sneller dan ieder ander in Nederland.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {'Start je project'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* Dev tools strip */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>{'Technologieen en tools die wij gebruiken'}</ToolsLabel>
          <ToolsRow>
            {DEV_TOOLS.map((t, i) => (
              <ToolChip key={i}>
                <ToolLogoBg $bg={t.bg}>
                  {(t.slug || t.customIcon) ? (
                    <ToolLogo
                      src={t.customIcon || `https://cdn.simpleicons.org/${t.slug}/FFFFFF`}
                      alt={t.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'white' }}>{t.label}</span>
                  )}
                </ToolLogoBg>
                {t.name}
              </ToolChip>
            ))}
          </ToolsRow>
        </Container>
      </ToolsStrip>

      <SpeedSection>
        <Container>
          <FadeIn>
            <SpeedHighlight>
              <SpeedNum>#1</SpeedNum>
              <SpeedLabel>{'Snelste AI-softwarebouwer van Nederland'}</SpeedLabel>
              <SpeedSub>
                {'Door AI te integreren in ons ontwikkelproces leveren we wat anderen in 3 maanden bouwen in slechts 4 weken. Zelfde kwaliteit, 3× sneller , gegarandeerd.'}
              </SpeedSub>
            </SpeedHighlight>
          </FadeIn>

          {/* ── Process Steps ── */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Ons ontwikkelproces'}</SectionLabel>
              <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{'Van kennismaking tot live deployment'}</SectionTitle></FadeIn>
            </div>

            <FadeIn>
              <ProcessSteps>
                {processSteps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <ProcessStepItem key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <StepCircle $color={step.color}><Icon size={20} /></StepCircle>
                      <StepLabel>{step.title}</StepLabel>
                      <StepDesc>{step.desc}</StepDesc>
                    </ProcessStepItem>
                  );
                })}
              </ProcessSteps>
            </FadeIn>

            {/* ── AI Pipeline Funnel ── */}
            <FadeIn delay={0.15}>
              <FunnelContainer>
                <FunnelLabel>AI Development Pipeline</FunnelLabel>
                <FunnelHeading>{'Onze AI-pipeline voor development'}</FunnelHeading>

                {funnelStages.map((stage, i) => {
                  const Icon = stage.icon;
                  return (
                    <React.Fragment key={i}>
                      <FunnelStage $width={stage.width} $color={stage.color} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                        <FunnelStageIcon $color={stage.color}><Icon size={22} /></FunnelStageIcon>
                        <div>
                          <FunnelStageName>{stage.title}</FunnelStageName>
                          <FunnelStageDesc>{stage.desc}</FunnelStageDesc>
                        </div>
                      </FunnelStage>
                      {i < funnelStages.length - 1 && (
                        <FunnelArrowDown><ArrowDown size={20} /></FunnelArrowDown>
                      )}
                    </React.Fragment>
                  );
                })}

                <FunnelArrowDown><ArrowDown size={20} /></FunnelArrowDown>
                <FunnelOutput initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <CheckCircle size={18} />
                  {'Klaar voor klant review'}
                </FunnelOutput>
              </FunnelContainer>
            </FadeIn>
          </div>

          <TwoCol>
            <FadeIn>
              <SectionLabel>{'Onze aanpak'}</SectionLabel>
              <SectionTitle>{'Software bouwen aan de top van AI-ontwikkeling'}</SectionTitle>
              <SectionText>
                Wij bouwen niet alleen applicaties, wij integreren AI in ons eigen bouwproces. Van requirements tot deployment, AI versnelt elke stap en verhoogt de kwaliteit.
              </SectionText>
              <Checks>
                {checks.map((c, i) => <CheckRow key={i}><CheckCircle size={16} />{c}</CheckRow>)}
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/magic_apparels_db.webp" alt="Custom software development" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </SpeedSection>

      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Waarom wij sneller zijn'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{'Technologie maakt het verschil'}</SectionTitle></FadeIn>
          </div>
          <FeatureGrid>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <FeatureCard $color={f.color} whileHover={{ y: -4 }}>
                    <FeatureIcon $color={f.color}><Icon size={22} /></FeatureIcon>
                    <FeatureTitle>{f.title}</FeatureTitle>
                    <FeatureDesc>{f.desc}</FeatureDesc>
                  </FeatureCard>
                </FadeIn>
              );
            })}
          </FeatureGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{'Onze projecten'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{'Wat wij hebben gebouwd'}</SectionTitle></FadeIn>
          </div>
          <ExamplesGrid>
            {examples.map((ex, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ExCard whileHover={{ y: -4 }}>
                  <Image src={ex.img} alt={ex.alt} width={800} height={200} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  <ExContent>
                    <div className="tag">{ex.tag}</div>
                    <div className="title">{ex.title}</div>
                    <div className="desc">{ex.desc}</div>
                  </ExContent>
                </ExCard>
              </FadeIn>
            ))}
          </ExamplesGrid>
        </Container>
      </Section>

      {/* ── Self-Hosting & GDPR ── */}
      <Section $dark>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <SectionLabel $light style={{ display: 'flex', justifyContent: 'center' }}>{'Self-hosting'}</SectionLabel>
              <SectionTitle $light style={{ textAlign: 'center' }}>
                {'Software die je zelf kunt hosten'}
              </SectionTitle>
              <SectionText $light style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
                {'Wij bouwen software die volledig op je eigen infrastructuur draait. Dit doen we veel voor bedrijven met strikte GDPR-eisen. Je data blijft altijd bij jou.'}
              </SectionText>
            </div>
          </FadeIn>

          <SelfHostGrid>
            <FadeIn delay={0}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#EF4444"><Server size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {'Self-hosted Software'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {'Volledig op je eigen servers. Geen afhankelijkheid van externe cloud providers, volledige controle over updates en data.'}
                </div>
              </SelfHostCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#3B82F6"><Shield size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {'GDPR-compliant'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {'Gebouwd voor de strengste privacy-eisen. Geen data naar externe servers, alles blijft binnen je netwerk.'}
                </div>
              </SelfHostCard>
            </FadeIn>
            <FadeIn delay={0.2}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#F59E0B"><Database size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {'AI Modellen Zelf Hosten'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {'Wij hosten AI-modellen op je eigen infrastructuur. Geen data naar OpenAI of andere API\'s, maximale privacy.'}
                </div>
              </SelfHostCard>
            </FadeIn>
          </SelfHostGrid>
        </Container>
      </Section>

      {/* ── Automatisering ── */}
      <AutoSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>Automatisering</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>Wij automatiseren ook je bestaande processen</SectionTitle></FadeIn>
          </div>
          <AutoGrid>
            {automationFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <AutoCard $color={f.color} whileHover={{ y: -4 }}>
                    <AutoCardIcon $color={f.color}><Icon size={22} /></AutoCardIcon>
                    <AutoCardTitle>{f.title}</AutoCardTitle>
                    <AutoCardDesc>{f.desc}</AutoCardDesc>
                  </AutoCard>
                </FadeIn>
              );
            })}
          </AutoGrid>
        </Container>
      </AutoSection>

      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>Hosting & beheer</SectionLabel>
              <SectionTitle>Wij hosten je n8n-omgeving</SectionTitle>
              <SectionText>
                Naast het bouwen van automatiseringen hosten en beheren wij ook je volledige n8n-omgeving. Je hebt altijd een betrouwbare, veilige en schaalbare infrastructuur voor je automatisering.
              </SectionText>
              <Checks>
                <CheckRow><CheckCircle size={16} />Dedicated server, geen gedeelde omgeving</CheckRow>
                <CheckRow><CheckCircle size={16} />Koppeling met HubSpot, Salesforce of Pipedrive</CheckRow>
                <CheckRow><CheckCircle size={16} />Automatische back-ups en monitoring</CheckRow>
                <CheckRow><CheckCircle size={16} />Maandelijkse optimalisaties inbegrepen</CheckRow>
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/n8n_banner.webp" alt="n8n automation" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{'Klaar om te bouwen?'}</h2>
              <p>Vertel ons wat je nodig hebt. Wij sturen je binnen 24 uur een concreet voorstel.</p>
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

export default SoftwarePage;

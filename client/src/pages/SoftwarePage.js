'use client';
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../components/Link';
import { Code2, Zap, Shield, Layers, GitBranch, Cpu, ArrowRight, CheckCircle, ChevronRight, Clock, Users, FileText, MessageSquare, Rocket, Server, Database, ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
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
  { name: 'AWS', slug: null, customIcon: '/uploads/aws_logo.svg', bg: '#FF9900' },
  { name: 'Vercel', slug: 'vercel', bg: '#000000' },
  { name: 'PostgreSQL', slug: 'postgresql', bg: '#4169E1' },
];

const PIPELINE_NODES = [
  { name: 'Requirements', descNL: 'Claude analyseert specs', descEN: 'Claude analyses specs', slug: 'anthropic', bg: '#D97706', color: '#F59E0B' },
  { name: 'Cursor IDE', descNL: 'AI-assisted coding', descEN: 'AI-assisted coding', slug: null, bg: '#1A1A1A', label: 'CS', color: '#94A3B8' },
  { name: 'GitHub', descNL: 'Code review + CI', descEN: 'Code review + CI', slug: 'github', bg: '#181717', color: '#6366F1' },
  { name: 'Testing', descNL: 'Automatische tests', descEN: 'Automated tests', slug: null, bg: '#059669', label: 'QA', color: '#10B981' },
  { name: 'Deploy', descNL: 'AWS / Vercel live', descEN: 'AWS / Vercel live', slug: null, customIcon: '/uploads/aws_logo.svg', bg: '#FF9900', color: '#F59E0B' },
];

function SoftwarePage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const features = [
    { icon: Zap, color: '#EF4444', title: isNL ? 'AI-assisted development' : 'AI-assisted development', desc: isNL ? 'Claude en Cursor in elk stap van het bouwproces , voor maximale snelheid en kwaliteit zonder in te leveren.' : 'Claude and Cursor in every step of the build process , for maximum speed and quality without compromise.' },
    { icon: Shield, color: '#3B82F6', title: isNL ? 'Production-ready' : 'Production-ready', desc: isNL ? 'Geen prototypes , wij leveren schaalbare, veilige software die direct in productie gaat.' : 'No prototypes , we deliver scalable, secure software that goes straight to production.' },
    { icon: Layers, color: '#10B981', title: isNL ? 'Modern tech stack' : 'Modern tech stack', desc: isNL ? 'React, Node.js, Python, cloud-native , gebouwd voor de toekomst en volledig schaalbaar.' : 'React, Node.js, Python, cloud-native , built for the future and fully scalable.' },
    { icon: GitBranch, color: '#8B5CF6', title: isNL ? 'Agile & iteratief' : 'Agile & iterative', desc: isNL ? 'Wekelijkse sprints, dagelijkse updates. Je ziet de voortgang en hebt volledige controle.' : 'Weekly sprints, daily updates. You see the progress and have full control.' },
    { icon: Cpu, color: '#F59E0B', title: isNL ? 'AI-integraties' : 'AI integrations', desc: isNL ? 'Wij integreren de nieuwste AI-modellen (GPT-4, Claude, Gemini) direct in je software.' : 'We integrate the latest AI models (GPT-4, Claude, Gemini) directly into your software.' },
    { icon: Clock, color: '#EC4899', title: isNL ? 'MVP in 2-4 weken' : 'MVP in 2-4 weeks', desc: isNL ? 'Eerste versie live in 2-4 weken. Geen maanden wachten, wel kwaliteitsproduct.' : 'First version live in 2-4 weeks. No months of waiting, quality product guaranteed.' },
  ];

  const examples = [
    { tag: isNL ? 'Automatisering Platform' : 'Automation Platform', title: 'Magic Apparels', desc: isNL ? 'Volledig geautomatiseerd orderplatform tussen Becosoft en Sage Intacct, honderden orders per dag.' : 'Fully automated order platform between Becosoft and Sage Intacct, hundreds of orders daily.', img: '/uploads/magic_apparels_dashboard.png', alt: 'Magic Apparels dashboard' },
    { tag: 'OpenClaw', title: isNL ? 'Multi-agent platform' : 'Multi-agent platform', desc: isNL ? 'Custom multi-agent implementatie voor volledige bedrijfsautomatisering via berichtenplatforms.' : 'Custom multi-agent implementation for complete business automation via messaging platforms.', img: '/uploads/openclaw_cool.png', alt: 'OpenClaw platform' },
    { tag: isNL ? 'AI-Integratie' : 'AI Integration', title: 'Passion Ice Baths', desc: isNL ? 'AI-gedreven SEO systeem en custom Shopify app voor het merk van Wim Hof.' : 'AI-driven SEO system and custom Shopify app for the Wim Hof brand.', img: '/uploads/passion_icebaths.png', alt: 'Passion Ice Baths' },
    { tag: isNL ? 'Automatisering' : 'Automation', title: isNL ? 'n8n Workflow Platform' : 'n8n Workflow Platform', desc: isNL ? 'Low-code automatiseringen en custom integraties voor complexe bedrijfsprocessen.' : 'Low-code automations and custom integrations for complex business processes.', img: '/uploads/n8n_flow.png', alt: 'n8n workflow automation' },
  ];

  const checks = isNL ? [
    'MVP in 2 tot 4 weken live , aantoonbaar snelste in Nederland',
    'Volledige documentatie en kennisoverdracht',
    'Schaalbare cloud-architectuur (AWS, Azure, GCP)',
    'Veilig, GDPR-compliant en pen-tested',
    'Post-launch support en doorlopende iteraties',
    'AI-agents gebouwd in ons eigen OpenClaw framework',
  ] : [
    'MVP live in 2 to 4 weeks , demonstrably fastest in the Netherlands',
    'Complete documentation and knowledge transfer',
    'Scalable cloud architecture (AWS, Azure, GCP)',
    'Secure, GDPR-compliant and pen-tested',
    'Post-launch support and ongoing iterations',
    'AI agents built in our own OpenClaw framework',
  ];

  const processSteps = [
    { icon: Users, color: '#3B82F6', title: isNL ? 'Kennismaking' : 'Meeting', desc: isNL ? 'Requirements opstellen' : 'Establish requirements' },
    { icon: FileText, color: '#8B5CF6', title: isNL ? 'Technisch Plan' : 'Technical Plan', desc: isNL ? 'Onze devs maken een plan' : 'Our devs create a plan' },
    { icon: Code2, color: '#EF4444', title: 'Development', desc: isNL ? 'AI development pipeline' : 'AI development pipeline' },
    { icon: MessageSquare, color: '#10B981', title: isNL ? 'Klant Review' : 'Client Review', desc: isNL ? 'Bespreken & goedkeuring' : 'Review & approval' },
    { icon: Rocket, color: '#F59E0B', title: 'Deploy', desc: isNL ? 'Na toestemming live' : 'Live after approval' },
  ];

  const funnelStages = [
    { icon: Code2, color: '#EF4444', width: '100%', title: isNL ? 'AI-Assisted Coding' : 'AI-Assisted Coding', desc: isNL ? 'Claude, Cursor & Copilot schrijven en reviewen code' : 'Claude, Cursor & Copilot write and review code' },
    { icon: Zap, color: '#3B82F6', width: '78%', title: isNL ? 'Automated Testing' : 'Automated Testing', desc: isNL ? 'Unit tests, integratie tests en E2E tests' : 'Unit tests, integration tests and E2E tests' },
    { icon: Shield, color: '#10B981', width: '56%', title: isNL ? 'Security Testing' : 'Security Testing', desc: isNL ? 'Penetration testing & OWASP compliance' : 'Penetration testing & OWASP compliance' },
  ];

  return (
    <>
      <SEOHead
        title="Custom Software Ontwikkeling | Optivaize, De Bilt"
        description="Op maat gemaakte software en webapplicaties. Optivaize ontwikkelt dashboards, APIs en platforms met AI-integratie vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/custom-software"
        ogImage="https://optivaize.nl/uploads/optivaize_logo_new.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'Custom Software', url: 'https://optivaize.nl/custom-software' }
        ]}
      />
      <PageHero>
        <Container>
          <HeroInner>
            <Breadcrumb>
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>{isNL ? 'Diensten' : 'Services'}</span>
              <ChevronRight size={14} />
              <span>Custom Software</span>
            </Breadcrumb>
            <Badge><Code2 size={12} /> Custom Software</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {isNL ? (
                <>De snelste softwarebouwer <span style={{ color: '#FCA5A5' }}>van Nederland</span></>
              ) : (
                <>The fastest software builder <span style={{ color: '#FCA5A5' }}>in the Netherlands</span></>
              )}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {isNL
                ? 'Dankzij AI-assisted development leveren wij productieklare software in weken, niet maanden. Op maat gebouwd met Claude, Cursor en de nieuwste tools , sneller dan ieder ander in Nederland.'
                : 'Thanks to AI-assisted development we deliver production-ready software in weeks, not months. Custom built with Claude, Cursor and the latest tools , faster than anyone in the Netherlands.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {isNL ? 'Start je project' : 'Start your project'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* Dev tools strip */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>{isNL ? 'Technologieen en tools die wij gebruiken' : 'Technologies and tools we use'}</ToolsLabel>
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
              <SpeedLabel>{isNL ? 'Snelste AI-softwarebouwer van Nederland' : 'Fastest AI software builder in the Netherlands'}</SpeedLabel>
              <SpeedSub>
                {isNL
                  ? 'Door AI te integreren in ons ontwikkelproces leveren we wat anderen in 3 maanden bouwen in slechts 4 weken. Zelfde kwaliteit, 3× sneller , gegarandeerd.'
                  : 'By integrating AI into our development process we deliver what others build in 3 months in just 4 weeks. Same quality, 3× faster , guaranteed.'}
              </SpeedSub>
            </SpeedHighlight>
          </FadeIn>

          {/* ── Process Steps ── */}
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Ons ontwikkelproces' : 'Our development process'}</SectionLabel>
              <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Van kennismaking tot live deployment' : 'From meeting to live deployment'}</SectionTitle></FadeIn>
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
                <FunnelHeading>{isNL ? 'Onze AI-pipeline voor development' : 'Our AI pipeline for development'}</FunnelHeading>

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
                  {isNL ? 'Klaar voor klant review' : 'Ready for client review'}
                </FunnelOutput>
              </FunnelContainer>
            </FadeIn>
          </div>

          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'Onze aanpak' : 'Our approach'}</SectionLabel>
              <SectionTitle>{isNL ? 'Software bouwen aan de top van AI-ontwikkeling' : 'Building software at the cutting edge of AI'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Wij bouwen niet alleen applicaties , wij integreren AI in ons eigen bouwproces. Van requirements tot deployment, AI versnelt elke stap en verhoogt de kwaliteit.'
                  : 'We don\'t just build applications , we integrate AI into our own build process. From requirements to deployment, AI accelerates every step and improves quality.'}
              </SectionText>
              <Checks>
                {checks.map((c, i) => <CheckRow key={i}><CheckCircle size={16} />{c}</CheckRow>)}
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/uploads/magic_apparels_db.png" alt="Custom software development" style={{ width: '100%', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </SpeedSection>

      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Waarom wij sneller zijn' : 'Why we are faster'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Technologie maakt het verschil' : 'Technology makes the difference'}</SectionTitle></FadeIn>
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
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Onze projecten' : 'Our projects'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Wat wij hebben gebouwd' : 'What we have built'}</SectionTitle></FadeIn>
          </div>
          <ExamplesGrid>
            {examples.map((ex, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ExCard whileHover={{ y: -4 }}>
                  <img src={ex.img} alt={ex.alt} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} loading="lazy" />
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
              <SectionLabel $light style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Self-hosting' : 'Self-hosting'}</SectionLabel>
              <SectionTitle $light style={{ textAlign: 'center' }}>
                {isNL ? 'Software die je zelf kunt hosten' : 'Software you can host yourself'}
              </SectionTitle>
              <SectionText $light style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
                {isNL
                  ? 'Wij bouwen software die volledig op je eigen infrastructuur draait. Dit doen we veel voor bedrijven met strikte GDPR-eisen. Je data blijft altijd bij jou.'
                  : 'We build software that runs entirely on your own infrastructure. We do this often for companies with strict GDPR requirements. Your data always stays with you.'}
              </SectionText>
            </div>
          </FadeIn>

          <SelfHostGrid>
            <FadeIn delay={0}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#EF4444"><Server size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {isNL ? 'Self-hosted Software' : 'Self-hosted Software'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {isNL
                    ? 'Volledig op je eigen servers. Geen afhankelijkheid van externe cloud providers, volledige controle over updates en data.'
                    : 'Fully on your own servers. No dependency on external cloud providers, full control over updates and data.'}
                </div>
              </SelfHostCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#3B82F6"><Shield size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {isNL ? 'GDPR-compliant' : 'GDPR-compliant'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {isNL
                    ? 'Gebouwd voor de strengste privacy-eisen. Geen data naar externe servers, alles blijft binnen je netwerk.'
                    : 'Built for the strictest privacy requirements. No data to external servers, everything stays within your network.'}
                </div>
              </SelfHostCard>
            </FadeIn>
            <FadeIn delay={0.2}>
              <SelfHostCard initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <SelfHostIcon $color="#F59E0B"><Database size={26} /></SelfHostIcon>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: '0.5rem' }}>
                  {isNL ? 'AI Modellen Zelf Hosten' : 'Self-host AI Models'}
                </div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                  {isNL
                    ? 'Wij hosten AI-modellen op je eigen infrastructuur. Geen data naar OpenAI of andere API\'s, maximale privacy.'
                    : 'We host AI models on your own infrastructure. No data to OpenAI or other APIs, maximum privacy.'}
                </div>
              </SelfHostCard>
            </FadeIn>
          </SelfHostGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{isNL ? 'Klaar om te bouwen?' : 'Ready to build?'}</h2>
              <p>{isNL ? 'Vertel ons wat je nodig hebt. Wij sturen je binnen 24 uur een concreet voorstel.' : 'Tell us what you need. We\'ll send you a concrete proposal within 24 hours.'}</p>
              <BtnRow>
                <BtnWhite href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Vul het formulier in' : 'Fill in the form'} <ArrowRight size={16} />
                </BtnWhite>
                <BtnOutline href="tel:+31642698918" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Bel ons direct' : 'Call us directly'}
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

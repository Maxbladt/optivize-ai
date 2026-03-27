'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../components/Link';
import {
  ArrowRight, Bot, TrendingUp, Target, Zap, Code2, Building2,
  MessageCircle, Cpu, GraduationCap, Blocks, ClipboardList,
  Search, Lightbulb, Wrench, Phone, MapPin
} from 'lucide-react';
import { useLanguage, translations } from '../LanguageContext';
import ClientSlider from '../components/ClientSlider';
import SEOHead from '../components/SEOHead';
import VideoPlayer from '../components/VideoPlayer';
import Image from 'next/image';
const InteractiveGlobe = React.lazy(() => import('../components/InteractiveGlobe'));

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const GradientText = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

/* ─── Hero ─────────────────────────────────────── */
const HeroWrap = styled.section`
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding: 130px 0 80px;
  position: relative;
  overflow: hidden;
  background: #ffffff;
  @media (max-width: 1024px) { min-height: unset; padding: 110px 0 60px; }
  @media (max-width: 768px) { padding: 100px 0 40px; }
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 70% 50%, rgba(59,130,246,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 30% 30%, rgba(16,185,129,0.04) 0%, transparent 70%);
  pointer-events: none;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const HeroLeft = styled(motion.div)`
  @media (max-width: 1024px) { text-align: center; }
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #3B82F6;
  font-size: 13px;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
`;

const HeroH1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  font-weight: 800;
  line-height: 1.1;
  color: #0F172A;
  margin-bottom: 1.5rem;
`;

const HeroSub = styled(motion.p)`
  font-size: 19px;
  line-height: 1.65;
  color: #475569;
  margin-bottom: 2.5rem;
  max-width: 520px;
  @media (max-width: 1024px) { margin-left: auto; margin-right: auto; }
  @media (max-width: 768px) { font-size: 17px; }
`;

const HeroStats = styled(motion.div)`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  @media (max-width: 1024px) { justify-content: center; }
  @media (max-width: 640px) { display: none; }
  @media (max-width: 480px) { gap: 1.5rem; }
`;

const HeroStat = styled.div`
  .num {
    font-size: 28px;
    font-weight: 800;
    background: ${GRADIENT};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
  }
  .lbl { font-size: 13px; color: #64748B; margin-top: 2px; }
`;

const HeroBtns = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 1024px) { justify-content: center; }
`;

const BtnPrimary = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.9rem 1.8rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(59,130,246,0.35);
`;

const BtnSecondary = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid #E2E8F0;
  color: #334155;
  font-weight: 600;
  font-size: 16px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  &:hover { border-color: #3B82F6; color: #3B82F6; }
`;

const BtnCall = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid #E2E8F0;
  color: #334155;
  font-weight: 600;
  font-size: 16px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
  &:hover { border-color: #3B82F6; color: #3B82F6; transform: scale(1.02); }
  &:active { transform: scale(0.98); }
  .call-label { @media (max-width: 640px) { display: none; } }
  @media (max-width: 640px) { padding: 0.875rem; }
`;

/* ─── Hero Video ──────────────────────────────── */
const HeroVideoWrap = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  position: relative;
  background: #0D1117;
`;

/* ─── Chat + Flow Demo ─────────────────────────── */
const DemoContainer = styled(motion.div)`
  background: #0D1117;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
`;

const DemoTitleBar = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span.title {
    font-size: 11.5px;
    color: rgba(255,255,255,0.35);
    font-weight: 500;
    flex: 1;
    text-align: center;
  }
  .dot { width: 9px; height: 9px; border-radius: 50%; }
`;

const ChatSection = styled.div`
  padding: 0.875rem 1rem;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

const ChatMsgRow = styled.div`
  display: flex;
  justify-content: ${p => p.$user ? 'flex-end' : 'flex-start'};
`;

const ChatBubble = styled(motion.div)`
  max-width: 82%;
  padding: 0.55rem 0.8rem;
  border-radius: ${p => p.$user ? '12px 12px 3px 12px' : '12px 12px 12px 3px'};
  font-size: 12px;
  line-height: 1.5;
  background: ${p => p.$user ? GRADIENT : 'rgba(255,255,255,0.07)'};
  color: ${p => p.$user ? 'white' : 'rgba(255,255,255,0.8)'};
  border: ${p => p.$user ? 'none' : '1px solid rgba(255,255,255,0.08)'};
`;

const RoutingPill = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 0.3rem 0.65rem;
  font-size: 10.5px;
  color: rgba(255,255,255,0.45);
  align-self: flex-start;
`;

const AgentReply = styled(motion.div)`
  background: ${p => p.$color}10;
  border: 1px solid ${p => p.$color}25;
  border-left: 2px solid ${p => p.$color};
  border-radius: 4px 12px 12px 12px;
  padding: 0.55rem 0.8rem;
  font-size: 11.5px;
  color: rgba(255,255,255,0.75);
  line-height: 1.5;
`;

const AgentReplyLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${p => p.$color};
  margin-bottom: 0.25rem;
  letter-spacing: 0.04em;
`;

const TaskLine = styled(motion.div)`
  font-size: 10.5px;
  color: rgba(255,255,255,0.6);
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  &::before { content: '✓'; color: ${p => p.$color}; font-weight: 700; }
`;

const FlowSection = styled.div`
  padding: 0.5rem 0.75rem 0.75rem;
`;

const CHAT_DEMOS = [
  {
    agentIdx: 0,
    agentColor: '#10B981',
    agentName: { nl: 'Marketing Agent', en: 'Marketing Agent' },
    userMsg: { nl: 'Kun je onze Google Ads optimaliseren?', en: 'Can you optimize our Google Ads?' },
    tasks: [
      { nl: '14 campagnes geanalyseerd', en: '14 campaigns analysed' },
      { nl: 'Biedingen aangepast, ROAS +12%', en: 'Bids adjusted, ROAS +12%' },
      { nl: 'Dagelijkse check actief', en: 'Daily check activated' },
    ]
  },
  {
    agentIdx: 1,
    agentColor: '#3B82F6',
    agentName: { nl: 'Sales Agent', en: 'Sales Agent' },
    userMsg: { nl: 'Ik wil nieuwe klanten vinden.', en: 'I want to find new clients.' },
    tasks: [
      { nl: '47 gekwalificeerde leads gevonden', en: '47 qualified leads found' },
      { nl: 'Gepersonaliseerde berichten verstuurd', en: 'Personalized messages sent' },
      { nl: 'Leads toegevoegd aan CRM', en: 'Leads added to CRM' },
    ]
  },
  {
    agentIdx: 2,
    agentColor: '#8B5CF6',
    agentName: { nl: 'Operations Agent', en: 'Operations Agent' },
    userMsg: { nl: 'We hebben problemen met onze cashflow.', en: 'We have cashflow problems.' },
    tasks: [
      { nl: '23 open facturen gevonden', en: '23 open invoices found' },
      { nl: 'Vroegbetaling emails verstuurd', en: 'Early payment emails sent' },
      { nl: 'Wekelijkse monitoring actief', en: 'Weekly monitoring active' },
    ]
  },
];

const AGENT_NODES = [
  { label: { nl: 'Marketing', en: 'Marketing' }, color: '#10B981', cx: 80, cy: 110, pathCtrl: '80,65' },
  { label: { nl: 'Sales', en: 'Sales' }, color: '#3B82F6', cx: 200, cy: 118, pathCtrl: '200,70' },
  { label: { nl: 'Operations', en: 'Operations' }, color: '#8B5CF6', cx: 320, cy: 110, pathCtrl: '320,65' },
];

function OptivaizeDemo({ language }) {
  const [demoIdx, setDemoIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visibleTasks, setVisibleTasks] = useState(0);

  useEffect(() => {
    setPhase(0);
    setVisibleTasks(0);
    const t = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 1900),
      setTimeout(() => setVisibleTasks(1), 2400),
      setTimeout(() => setVisibleTasks(2), 3000),
      setTimeout(() => setVisibleTasks(3), 3600),
      setTimeout(() => setDemoIdx(p => (p + 1) % CHAT_DEMOS.length), 6500),
    ];
    return () => t.forEach(clearTimeout);
  }, [demoIdx]);

  const demo = CHAT_DEMOS[demoIdx];
  const isNL = language === 'nl';

  return (
    <DemoContainer
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <DemoTitleBar>
        <span className="dot" style={{ background: '#FC8181' }} />
        <span className="dot" style={{ background: '#FBBF24' }} />
        <span className="dot" style={{ background: '#34D399' }} />
        <span className="title">Optivaize Agent Platform</span>
      </DemoTitleBar>

      <ChatSection>
        <AnimatePresence mode="wait">
          <ChatMsgRow $user key={`u-${demoIdx}`}>
            <ChatBubble $user initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }}>
              {demo.userMsg[language]}
            </ChatBubble>
          </ChatMsgRow>
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 1 && (
            <RoutingPill key={`rp-${demoIdx}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: demo.agentColor, display: 'inline-block' }} />
              {isNL ? `Routing naar ${demo.agentName.nl}` : `Routing to ${demo.agentName.en}`}...
            </RoutingPill>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <ChatMsgRow key={`a-${demoIdx}`}>
              <AgentReply $color={demo.agentColor}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                <AgentReplyLabel $color={demo.agentColor}>{demo.agentName[language]}</AgentReplyLabel>
                {isNL ? 'Ik ga direct aan de slag!' : "On it right away!"}
                {demo.tasks.map((task, i) => visibleTasks > i ? (
                  <TaskLine key={i} $color={demo.agentColor}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}
                  >
                    {task[language]}
                  </TaskLine>
                ) : null)}
              </AgentReply>
            </ChatMsgRow>
          )}
        </AnimatePresence>
      </ChatSection>

      <FlowSection>
        <svg viewBox="0 0 400 150" width="100%" style={{ display: 'block' }}>
          {/* Central AI node */}
          <circle cx="200" cy="22" r="18" fill="#1a2035" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="200" y="27" textAnchor="middle" fill="white" fontSize="9" fontWeight="700">AI</text>

          {AGENT_NODES.map((node, i) => {
            const isActive = demo.agentIdx === i && phase >= 1;
            const op = isActive ? 0.9 : 0.2;
            const sw = isActive ? 2 : 1;
            return (
              <g key={i}>
                <path
                  d={`M200,40 Q${node.pathCtrl} ${node.cx},${node.cy - 18}`}
                  stroke={node.color}
                  strokeWidth={sw}
                  fill="none"
                  strokeOpacity={op}
                  strokeDasharray={isActive ? 'none' : '4,4'}
                >
                  {isActive && (
                    <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="0.7s" repeatCount="indefinite" />
                  )}
                </path>
                <circle cx={node.cx} cy={node.cy} r="16"
                  fill={isActive ? `${node.color}18` : '#1a2035'}
                  stroke={node.color}
                  strokeWidth={sw}
                  strokeOpacity={isActive ? 1 : 0.3}
                >
                  {isActive && (
                    <animate attributeName="r" values="16;17.5;16" dur="1.5s" repeatCount="indefinite" />
                  )}
                </circle>
                <text x={node.cx} y={node.cy + 4} textAnchor="middle" fill={node.color}
                  fontSize="7" fontWeight="700" fillOpacity={isActive ? 1 : 0.35}>
                  {['MKT', 'SALES', 'OPS'][i]}
                </text>
                <text x={node.cx} y={node.cy + 36} textAnchor="middle" fill={node.color}
                  fontSize="8.5" fontWeight="600" fillOpacity={isActive ? 1 : 0.3}>
                  {node.label[language]}
                </text>
              </g>
            );
          })}
        </svg>
      </FlowSection>
    </DemoContainer>
  );
}

/* ─── Services Grid ─────────────────────────── */
const ServicesSection = styled.section`
  padding: 7rem 0;
  background: #F8FAFC;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3B82F6;
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const SectionSub = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
`;

const ServiceCard = styled(motion(Link))`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1.5px solid #F1F5F9;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: all 0.25s ease;
  &:hover {
    border-color: ${p => p.$color}44;
    box-shadow: 0 8px 32px ${p => p.$color}14;
    transform: translateY(-4px);
  }
`;

const ServiceIconWrap = styled.div`
  width: 52px; height: 52px; border-radius: 14px;
  background: ${p => p.$color}14;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color};
`;

const ServiceCardTitle = styled.h3`font-size: 17px; font-weight: 700; color: #0F172A;`;
const ServiceCardDesc = styled.p`font-size: 14px; color: #64748B; line-height: 1.6; flex: 1;`;
const ServiceCardLink = styled.div`
  display: flex; align-items: center; gap: 0.35rem;
  font-size: 13px; font-weight: 700; color: ${p => p.$color};
`;

/* ─── Identity + Cases + Quote ───────────────── */
const IdentitySection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const IdentityTop = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 5rem;
`;

const IdentityHeadline = styled(motion.h2)`
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 900;
  color: #0F172A;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
`;

const IdentitySub = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  line-height: 1.7;
  max-width: 580px;
  margin: 0 auto;
`;

const IdentityPillars = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 5rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const IdentityPillar = styled(motion.div)`
  background: #F8FAFC;
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid #F1F5F9;
  text-align: left;
`;

const PillarIcon = styled.div`
  width: 44px; height: 44px; border-radius: 12px;
  background: ${p => p.$color}14;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color};
  margin-bottom: 1rem;
`;

const PillarTitle = styled.h3`font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem;`;
const PillarText = styled.p`font-size: 14px; color: #64748B; line-height: 1.6;`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 4rem;
  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const CaseCard = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/4;
  background: #0F172A;
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  img {
    width: 100%; height: 100%;
    object-fit: cover; opacity: 0.8;
    transition: opacity 0.4s ease, transform 0.6s ease;
  }
  &:hover img { opacity: 0.65; transform: scale(1.04); }
`;

const CaseOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 55%);
  padding: 1.5rem;
  display: flex; flex-direction: column; justify-content: flex-end;
`;

const CaseClient = styled.div`
  font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 0.4rem;
`;

const CaseTitle = styled.div`
  font-size: 15px; font-weight: 800; color: white; line-height: 1.25; margin-bottom: 0.6rem;
`;

const CaseStat = styled.div`
  display: inline-flex; align-items: center; gap: 0.375rem;
  background: ${p => p.$color || 'rgba(59,130,246,0.9)'};
  color: white; font-size: 11px; font-weight: 700;
  padding: 0.25rem 0.6rem; border-radius: 20px;
`;

/* ─── Home Cases Grid ───────────────────────── */
const HomeCasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px) { grid-template-columns: 1fr; }
`;

const HomeCaseCard = styled(motion(Link))`
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/4;
  background: #0F172A;
  box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  display: block;
  text-decoration: none;
  img {
    width: 100%; height: 100%;
    object-fit: cover; opacity: 0.8;
    transition: opacity 0.4s ease, transform 0.6s ease;
  }
  &:hover img { opacity: 0.65; transform: scale(1.04); }
`;

/* ─── Bottom CTA ────────────────────────────── */
const CtaSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 80% at 50% 100%, rgba(59,130,246,0.12), transparent);
  }
`;

const CtaContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
`;

const CtaTitle = styled(motion.h2)`
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1rem;
`;

const CtaSub = styled(motion.p)`
  font-size: 18px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  @media (max-width: 768px) { font-size: 16px; }
`;

const CtaBtns = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const QuoteWrap = styled(motion.div)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background: #F8FAFC;
  border-radius: 24px;
  border: 1px solid #F1F5F9;
`;

const QuoteText = styled.p`
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 700; color: #0F172A; line-height: 1.5;
  font-style: italic; margin-bottom: 1.5rem;
`;

const QuoteAuthor = styled.div`
  display: flex; align-items: center; justify-content: center; gap: 0.875rem;
`;

const QuoteAvatar = styled.div`
  width: 52px; height: 52px; border-radius: 50%;
  overflow: hidden; flex-shrink: 0;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box, ${GRADIENT} border-box;
`;

const QuoteName = styled.div`
  text-align: left;
  .name { font-size: 15px; font-weight: 700; color: #0F172A; }
  .role { font-size: 13px; color: #64748B; }
`;

/* ─── Wim Hof Featured Section ───────────────── */
const WimHofSection = styled.section`
  padding: 7rem 0;
  background: #0F172A;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(16,185,129,0.08), transparent);
  }
`;

const WimHofGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const WimHofImageWrap = styled(motion.div)`
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 32px 80px rgba(0,0,0,0.4);
  img { width: 100%; display: block; }
`;

const WimHofLogoWrap = styled.div`
  position: absolute;
  top: 1.5rem; left: 1.5rem;
  background: rgba(255,255,255,0.95);
  border-radius: 12px;
  padding: 0.6rem 1rem;
  img { height: 32px; width: auto; display: block; }
`;

const WimHofContent = styled(motion.div)`
  position: relative;
  @media (max-width: 1024px) { text-align: center; }
`;

const WimHofLabel = styled.div`
  font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: #10B981; margin-bottom: 1rem;
`;

const WimHofTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800; color: white; line-height: 1.15; margin-bottom: 1.5rem;
`;

const WimHofText = styled.p`
  font-size: 16px; color: #94A3B8; line-height: 1.7; margin-bottom: 1rem;
`;

const WimHofBadges = styled.div`
  display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem;
  @media (max-width: 1024px) { justify-content: center; }
`;

const WimHofBadge = styled.div`
  display: flex; align-items: center; gap: 0.4rem;
  background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
  color: #34D399; font-size: 12px; font-weight: 600;
  padding: 0.35rem 0.875rem; border-radius: 20px;
`;

const WimHofCta = styled(motion(Link))`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #10B981; color: white; font-weight: 700; font-size: 15px;
  padding: 0.875rem 1.75rem; border-radius: 12px;
  box-shadow: 0 6px 20px rgba(16,185,129,0.35);
  transition: all 0.2s ease;
  &:hover { background: #059669; }
`;

/* ─── About Preview ──────────────────────────── */
const AboutPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
`;

/* ─── Globe Section (Home) ────────────────────── */
const HomeGlobeSection = styled.section`
  padding: 6rem 0;
  background: #0F172A;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.06), transparent);
  }
`;

const HomeGlobeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
`;

const HomeGlobeCanvasWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeGlobeLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #60A5FA;
  margin-bottom: 0.75rem;
`;

const HomeGlobeTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.15;
`;

const HomeGlobeText = styled.p`
  font-size: 17px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const HomeLocations = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 2rem;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const HomeLocCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-align: left;
  &:hover { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.2); }
`;

const HomeLocIcon = styled.div`
  width: 36px; height: 36px; border-radius: 10px;
  background: ${GRADIENT};
  display: flex; align-items: center; justify-content: center;
  color: white; flex-shrink: 0;
`;

const HomeLocText = styled.div`
  .city { font-size: 15px; font-weight: 700; color: white; }
  .role { font-size: 12px; color: #60A5FA; font-weight: 600; }
`;

/* ─── Video Section ──────────────────────────── */
const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const VideoCard = styled.div`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
  position: relative;
  background: #0F172A;
  video { width: 100%; display: block; }
`;

const VideoPauseOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(0,0,0,0.2);
  transition: opacity 0.2s;
  cursor: pointer;
  &:hover { opacity: 1; }
`;

const ThumbOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
`;

const PlayBtn = styled.div`
  position: relative;
  z-index: 3;
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  ${ThumbOverlay}:hover & { transform: scale(1.08); }
`;

/* ─── Intake Process ─────────────────────────── */
const IntakeSection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const IntakeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
`;

const IntakeCard = styled(motion.div)`
  background: #F8FAFC;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #F1F5F9;
  position: relative;
  text-align: center;
`;

const IntakeNumber = styled.div`
  font-size: 48px;
  font-weight: 900;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
`;

const IntakeIcon = styled.div`
  width: 56px; height: 56px; border-radius: 16px;
  background: ${p => p.$color}14;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color};
  margin: 0 auto 1rem;
`;

const IntakeTitle = styled.h3`font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 0.5rem;`;
const IntakeText = styled.p`font-size: 14px; color: #64748B; line-height: 1.6;`;

const IntakeArrow = styled.div`
  position: absolute;
  right: -1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #CBD5E1;
  @media (max-width: 900px) { display: none; }
`;

/* ─── InView wrapper ─────────────────────────── */
function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Pausable autoplay video component */
function AutoplayVideo({ src }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  return (
    <VideoCard style={{ cursor: 'pointer' }} onClick={toggle}>
      <video ref={videoRef} autoPlay muted loop playsInline style={{ width: '100%', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
      <VideoPauseOverlay>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {paused
            ? <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid #3B82F6', marginLeft: 3 }} />
            : <div style={{ display: 'flex', gap: 4 }}><div style={{ width: 5, height: 18, background: '#3B82F6', borderRadius: 2 }} /><div style={{ width: 5, height: 18, background: '#3B82F6', borderRadius: 2 }} /></div>
          }
        </div>
      </VideoPauseOverlay>
    </VideoCard>
  );
}

/* Click-to-play video, copies the working HeroVideo pattern exactly */
function ClickVideo({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 50);
  };

  const videoSrc = src;
  const thumbSrc = thumbnail;

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#0D1117', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
      {!playing && (
        <ThumbOverlay onClick={start} style={{ borderRadius: 0 }}>
          <img src={thumbSrc} alt="Video thumbnail" />
          <PlayBtn>
            <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid #3B82F6', marginLeft: 4 }} />
          </PlayBtn>
        </ThumbOverlay>
      )}
      <video
        ref={videoRef}
        controls={playing}
        playsInline
        preload="metadata"
        poster={thumbSrc}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

/* Image mapping for cases */
const caseImages = {
  fonteyn: '/images/fonteyn_dashboard.webp',
  aanhuis: '/images/aanhuis_voorkant.webp',
  blosh: '/images/blosh_office.webp',
  'red-button': '/images/magic_apparels_dashboard.webp',
  redbutton: '/images/magic_apparels_dashboard.webp',
  stakepvp: '/images/stakepvp_logo.webp',
  'passion-ice-baths': '/images/passion_icebaths.webp',
  passion: '/images/passion_icebaths.webp',
};

const caseStatColors = ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'];

const caseIdToSlug = {
  fonteyn: 'fonteyn',
  aanhuis: 'aanhuis',
  blosh: 'blosh',
  redbutton: 'red-button',
  stakepvp: 'stakepvp',
  passion: 'passion-ice-baths',
};

/* Hero click-to-play video with native controls */
function HeroVideo({ src, thumbnail, isLogo }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 50);
  };

  const videoSrc = src;
  const thumbSrc = thumbnail;

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#0D1117' }}>
      {!playing && (
        <ThumbOverlay onClick={start} style={{ borderRadius: 0, background: isLogo ? '#0F172A' : 'transparent' }}>
          <img src={thumbSrc} alt="Video thumbnail" style={isLogo ? { objectFit: 'contain', padding: '3rem', filter: 'brightness(0) invert(1)' } : {}} />
          <PlayBtn>
            <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid #3B82F6', marginLeft: 4 }} />
          </PlayBtn>
        </ThumbOverlay>
      )}
      <video
        ref={videoRef}
        controls={playing}
        playsInline
        preload="metadata"
        poster={thumbSrc}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

const serviceItems = [
  { icon: Building2, color: '#EC4899', path: '/ai-business',
    nl: { title: 'AI Business', desc: 'Van strategie tot uitvoering: wij transformeren je hele bedrijf met AI op langetermijnbasis.' },
    en: { title: 'AI Business', desc: 'From strategy to execution: we transform your entire business with AI on a long-term basis.' }
  },
  { icon: GraduationCap, color: '#F97316', path: '/ai-training',
    nl: { title: 'AI Training', desc: 'Maatwerk training per afdeling. ChatGPT, Claude, Copilot, Midjourney, praktisch en direct toepasbaar.' },
    en: { title: 'AI Training', desc: 'Tailored training per department. ChatGPT, Claude, Copilot, Midjourney, practical and immediately applicable.' }
  },
  { icon: Code2, color: '#EF4444', path: '/custom-software',
    nl: { title: 'Custom Software', desc: 'Wij bouwen software 3x sneller, het snelste AI-gedreven softwarebedrijf van Nederland.' },
    en: { title: 'Custom Software', desc: 'We build software 3x faster, the fastest AI-driven software company in the Netherlands.' }
  },
  { icon: Zap, color: '#8B5CF6', path: '/automatisering',
    nl: { title: 'Automatisering', desc: 'n8n workflows en custom platforms. Verbind je systemen en elimineer handmatig werk volledig.' },
    en: { title: 'Automation', desc: 'n8n workflows and custom platforms. Connect your systems and eliminate manual work entirely.' }
  },
  { icon: Target, color: '#F59E0B', path: '/ai-sales',
    nl: { title: 'AI Sales', desc: 'LinkedIn outreach, lead kwalificatie en CRM-integratie, volledig geautomatiseerd door AI.' },
    en: { title: 'AI Sales', desc: 'LinkedIn outreach, lead qualification and CRM integration, fully automated by AI.' }
  },
  { icon: TrendingUp, color: '#10B981', path: '/ai-marketing',
    nl: { title: 'AI Marketing', desc: 'AI-SEO, content automatisering en Google Ads optimalisatie voor maximale organische groei.' },
    en: { title: 'AI Marketing', desc: 'AI-SEO, content automation and Google Ads optimisation for maximum organic growth.' }
  },
  { icon: Bot, color: '#3B82F6', path: '/ai-agenten',
    nl: { title: 'AI Agents', desc: 'OpenClaw agents die 24/7 taken overnemen via WhatsApp, Slack en Teams.' },
    en: { title: 'AI Agents', desc: 'OpenClaw agents that take over tasks 24/7 via WhatsApp, Slack and Teams.' }
  },
  { icon: MessageCircle, color: '#06B6D4', path: '/ai-chatbot',
    nl: { title: 'AI Chatbot', desc: 'Intelligente chatbots die je producten kennen, vragen beantwoorden en leads kwalificeren.' },
    en: { title: 'AI Chatbot', desc: 'Intelligent chatbots that know your products, answer questions and qualify leads.' }
  },
  { icon: Blocks, color: '#6366F1', path: '/crypto-blockchain',
    nl: { title: 'Crypto & Blockchain', desc: 'Smart contracts, DeFi platforms en end-to-end blockchain development op Solana, Ethereum en Polygon.' },
    en: { title: 'Crypto & Blockchain', desc: 'Smart contracts, DeFi platforms and end-to-end blockchain development on Solana, Ethereum and Polygon.' }
  },
];

const intakeSteps = [
  {
    num: '01',
    icon: ClipboardList,
    color: '#3B82F6',
    nl: { title: 'Jouw case', text: 'Presenteer je bedrijfsvraagstuk. Wat wil je bereiken en waar loop je tegenaan?' },
    en: { title: 'Your case', text: 'Present your business challenge. What do you want to achieve and what is holding you back?' },
  },
  {
    num: '02',
    icon: Search,
    color: '#10B981',
    nl: { title: 'Wij reviewen', text: 'We analyseren je situatie en beoordelen de mogelijkheden grondig.' },
    en: { title: 'We review', text: 'We analyse your situation and thoroughly assess the possibilities.' },
  },
  {
    num: '03',
    icon: Lightbulb,
    color: '#F59E0B',
    nl: { title: 'Beste oplossing', text: 'We bedenken de meest impactvolle AI-oplossing voor jouw specifieke situatie.' },
    en: { title: 'Best solution', text: 'We design the most impactful AI solution for your specific situation.' },
  },
  {
    num: '04',
    icon: Wrench,
    color: '#8B5CF6',
    nl: { title: 'Wij bouwen', text: 'We bouwen en implementeren de oplossing, niet in maanden maar in weken.' },
    en: { title: 'We build', text: 'We build and implement the solution, not in months but in weeks.' },
  },
];

/* ─── Page ───────────────────────────────────── */
/* ─── Globe is now in components/InteractiveGlobe.js ── */

function HomePage({ initialCases = [] }) {
  const { language } = useLanguage();
  const homeCases = initialCases.filter(c => ['fonteyn', 'red-button', 'blosh'].includes(c.slug));

  return (
    <>
      <SEOHead
        title="Optivaize | AI-bureau De Bilt, Automatisering, Marketing en Software"
        description="Optivaize is een AI-bureau in De Bilt. Wij bouwen AI-agents, automatisering, marketing en custom software voor bedrijven in heel Nederland."
        canonicalUrl="https://optivaize.nl"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[{name:'Home',url:'https://optivaize.nl'}]}
      />
      {/* ── HERO ── */}
      <HeroWrap>
        <HeroBg />
        <Container>
          <HeroGrid>
            <HeroLeft>
              <HeroH1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                {language === 'nl'
                  ? <>De snelste <GradientText>AI partner</GradientText> van Nederland</>
                  : <>The fastest <GradientText>AI partner</GradientText> in the Netherlands</>}
              </HeroH1>

              <HeroSub initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                {language === 'nl'
                  ? 'Wij helpen jouw bedrijf AI te gebruiken, te bouwen en iedereen te trainen dit efficient te gebruiken. Niet in maanden, maar in weken.'
                  : 'We help your business use AI, build with AI, and train everyone to use it efficiently. Not in months, but in weeks.'}
              </HeroSub>

              <HeroStats initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                <HeroStat>
                  <span className="num">150+</span>
                  <span className="lbl">{language === 'nl' ? 'Bedrijven' : 'Companies'}</span>
                </HeroStat>
                <HeroStat>
                  <span className="num">40+</span>
                  <span className="lbl">{language === 'nl' ? 'Uur bespaard/week per bedrijf' : 'Hours saved/week per company'}</span>
                </HeroStat>
                <HeroStat>
                  <span className="num">3x</span>
                  <span className="lbl">{language === 'nl' ? 'Sneller bouwen' : 'Faster builds'}</span>
                </HeroStat>
              </HeroStats>

              <HeroBtns initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
                <BtnPrimary
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(59,130,246,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {language === 'nl' ? 'Plan gratis gesprek' : 'Book free call'}
                  <ArrowRight size={17} />
                </BtnPrimary>
                <BtnCall href="tel:+31642698918">
                  <Phone size={16} />
                  <span className="call-label">{language === 'nl' ? 'Bel ons' : 'Call us'}</span>
                </BtnCall>
              </HeroBtns>
            </HeroLeft>

            <HeroVideoWrap
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <VideoPlayer src="/videos/optivaize_intro_vid.mp4" poster="/images/optivaize_logo_new.webp" isLogo />
            </HeroVideoWrap>
          </HeroGrid>
        </Container>
      </HeroWrap>

      {/* ── CLIENT LOGOS ── */}
      <ClientSlider />

      {/* ── IDENTITY ── */}
      <IdentitySection>
        <Container>
          <IdentityTop>
            <SectionLabel>{language === 'nl' ? 'Wie wij zijn' : 'Who we are'}</SectionLabel>
            <FadeIn>
              <IdentityHeadline>
                {language === 'nl'
                  ? <>We bouwen <GradientText>AI in</GradientText> jouw organisatie</>
                  : <>We build <GradientText>AI into</GradientText> your organisation</>}
              </IdentityHeadline>
            </FadeIn>
            <FadeIn delay={0.1}>
              <IdentitySub>
                {language === 'nl'
                  ? 'Geen hype. Geen powerpoints. Wij implementeren AI direct in jouw bedrijfsprocessen, trainen je team en bouwen de applicaties die jouw concurrentie nog niet heeft.'
                  : "No hype. No PowerPoints. We implement AI directly into your business processes, train your team and build the applications your competition doesn't have yet."}
              </IdentitySub>
            </FadeIn>
          </IdentityTop>

          <IdentityPillars>
            <IdentityPillar
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <PillarIcon $color="#3B82F6"><Bot size={22} /></PillarIcon>
              <PillarTitle>{language === 'nl' ? 'AI inzetten' : 'Deploy AI'}</PillarTitle>
              <PillarText>
                {language === 'nl'
                  ? 'We implementeren AI in bestaande workflows zodat jouw team direct resultaat ziet. Geen grote transformatietrajecten, gewoon resultaat.'
                  : 'We implement AI into existing workflows so your team sees immediate results. No big transformation projects, just results.'}
              </PillarText>
            </IdentityPillar>
            <IdentityPillar
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PillarIcon $color="#F97316"><GraduationCap size={22} /></PillarIcon>
              <PillarTitle>{language === 'nl' ? 'AI training' : 'Train on AI'}</PillarTitle>
              <PillarText>
                {language === 'nl'
                  ? 'We bouwen het fundament door jouw hele team te trainen. Van management tot uitvoering, iedereen leert AI efficient te gebruiken.'
                  : 'We build the foundation by training your entire team. From management to execution, everyone learns to use AI efficiently.'}
              </PillarText>
            </IdentityPillar>
            <IdentityPillar
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PillarIcon $color="#10B981"><Code2 size={22} /></PillarIcon>
              <PillarTitle>{language === 'nl' ? 'AI bouwen' : 'Build with AI'}</PillarTitle>
              <PillarText>
                {language === 'nl'
                  ? 'We bouwen ook zelf AI-applicaties op maat. Van automatiseringen tot volledige platformen, 3x sneller dan traditionele bureaus.'
                  : 'We also build custom AI applications ourselves. From automations to complete platforms, 3x faster than traditional agencies.'}
              </PillarText>
            </IdentityPillar>
          </IdentityPillars>
        </Container>
      </IdentitySection>

      {/* ── CASES ── */}
      <section style={{ padding: '5rem 0', background: '#F8FAFC' }}>
        <Container>
          <SectionHeader>
            <SectionLabel>{language === 'nl' ? 'Onze cases' : 'Our cases'}</SectionLabel>
            <FadeIn>
              <SectionTitle>
                {language === 'nl' ? 'Resultaten die voor zich spreken' : 'Results that speak for themselves'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub>
                {language === 'nl'
                  ? 'Van AI agents tot complete integraties, bekijk wat we voor onze klanten hebben gebouwd.'
                  : 'From AI agents to complete integrations, see what we have built for our clients.'}
              </SectionSub>
            </FadeIn>
          </SectionHeader>
          <HomeCasesGrid>
            {homeCases.map((c, i) => (
              <HomeCaseCard key={c.slug} href={`/cases/${c.slug}`}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Image src={c.image || caseImages[c.slug] || caseImages[c.slug.replace('-', '')]} alt={language === 'nl' ? c.title_nl : c.title_en} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                <CaseOverlay>
                  <CaseClient>{language === 'nl' ? c.title_nl : c.title_en}</CaseClient>
                  <CaseTitle>{language === 'nl' ? c.preview_nl : c.preview_en}</CaseTitle>
                </CaseOverlay>
              </HomeCaseCard>
            ))}
          </HomeCasesGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <BtnSecondary href="/cases" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {language === 'nl' ? 'Bekijk alle cases' : 'View all cases'} <ArrowRight size={15} />
            </BtnSecondary>
          </div>
        </Container>
      </section>

      {/* ── WIM HOF FEATURED ── */}
      <WimHofSection>
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <WimHofGrid>
            <WimHofImageWrap
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image src="/images/wimhof.webp" alt="Wim Hof - Passion Ice Baths" width={600} height={400} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px' }} loading="lazy" />
            </WimHofImageWrap>

            <WimHofContent
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <WimHofLabel>
                {language === 'nl' ? 'Featured case' : 'Featured case'}
              </WimHofLabel>
              <WimHofTitle>
                {language === 'nl'
                  ? <>Wim Hof's merk groeit organisch met <span style={{ color: '#10B981' }}>AI-gedreven SEO</span></>
                  : <>Wim Hof's brand grows organically with <span style={{ color: '#10B981' }}>AI-driven SEO</span></>}
              </WimHofTitle>
              <WimHofText>
                {language === 'nl'
                  ? 'Voor Passion Ice Baths, het merk geassocieerd met de legendarische Wim Hof, bouwden we een volledig AI-gedreven SEO systeem. We gebruikten GA4 data en Google Search Console om precies te begrijpen welke zoekwoorden het meeste potentieel hadden.'
                  : "For Passion Ice Baths, the brand associated with the legendary Wim Hof, we built a fully AI-driven SEO system. We used GA4 data and Google Search Console to understand exactly which keywords had the most potential."}
              </WimHofText>
              <WimHofText>
                {language === 'nl'
                  ? 'We trainden een eigen AI model op hun merkstijl en doelgroep. Dit model genereert content die authentiek aanvoelt en tegelijk technisch geoptimaliseerd is voor zoekmachines. Daarnaast zijn we momenteel een custom Shopify app aan het bouwen.'
                  : "We trained a custom AI model on their brand style and target audience. This model generates content that feels authentic while being technically optimized for search engines. We are also currently building a custom Shopify app."}
              </WimHofText>
              <WimHofBadges>
                <WimHofBadge>GA4 data</WimHofBadge>
                <WimHofBadge>Search Console</WimHofBadge>
                <WimHofBadge>{language === 'nl' ? 'Custom AI model' : 'Custom AI model'}</WimHofBadge>
                <WimHofBadge>Shopify app</WimHofBadge>
              </WimHofBadges>
              <WimHofCta href="/cases" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {language === 'nl' ? 'Bekijk alle cases' : 'View all cases'}
                <ArrowRight size={16} />
              </WimHofCta>
            </WimHofContent>
          </WimHofGrid>
        </Container>
      </WimHofSection>

      {/* ── SERVICES ── */}
      <ServicesSection>
        <Container>
          <SectionHeader>
            <SectionLabel>{language === 'nl' ? 'Wat wij doen' : 'What we do'}</SectionLabel>
            <FadeIn>
              <SectionTitle>
                {language === 'nl' ? 'AI voor elk onderdeel van je bedrijf' : 'AI for every part of your business'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub>
                {language === 'nl'
                  ? 'Van agents tot automatisering, van software tot strategie, wij bouwen het allemaal.'
                  : 'From agents to automation, from software to strategy, we build it all.'}
              </SectionSub>
            </FadeIn>
          </SectionHeader>

          <ServiceGrid>
            {serviceItems.map((item, i) => {
              const Icon = item.icon;
              const copy = item[language];
              return (
                <ServiceCard key={item.path} href={item.path} $color={item.color}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <ServiceIconWrap $color={item.color}><Icon size={22} /></ServiceIconWrap>
                  <ServiceCardTitle>{copy.title}</ServiceCardTitle>
                  <ServiceCardDesc>{copy.desc}</ServiceCardDesc>
                  <ServiceCardLink $color={item.color}>
                    {language === 'nl' ? 'Meer info' : 'Learn more'} <ArrowRight size={13} />
                  </ServiceCardLink>
                </ServiceCard>
              );
            })}
          </ServiceGrid>
        </Container>
      </ServicesSection>

      {/* ── OPENCLAW VIDEO ── */}
      <WimHofSection>
        <Container>
          <WimHofGrid>
            <FadeIn>
              <VideoPlayer src="/videos/Openclaw intro.mp4" />
            </FadeIn>
            <WimHofContent initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.15 }}>
              <WimHofLabel>{language === 'nl' ? 'Bekijk de video' : 'Watch the video'}</WimHofLabel>
              <WimHofTitle>
                {language === 'nl' ? 'Hoe AI agents werken' : 'How AI agents work'}
              </WimHofTitle>
              <WimHofText>
                {language === 'nl'
                  ? 'In deze 1 minuut durende video legt Max uit hoe AI agents werken en hoe jij ze aanstuurt. Ontdek hoe OpenClaw agents 24/7 taken overnemen via WhatsApp, Slack en Teams.'
                  : 'In this 1-minute video, Max explains how AI agents work and how you control them. Discover how OpenClaw agents take over tasks 24/7 via WhatsApp, Slack, and Teams.'}
              </WimHofText>
              <WimHofCta href="/ai-agenten" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                {language === 'nl' ? 'Meer over AI Agents' : 'More about AI Agents'}
                <ArrowRight size={16} />
              </WimHofCta>
            </WimHofContent>
          </WimHofGrid>
        </Container>
      </WimHofSection>

      {/* ── ABOUT PREVIEW ── */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <Container>
          <AboutPreviewGrid>
            <FadeIn>
              <div>
                <SectionLabel>{language === 'nl' ? 'Over Optivaize' : 'About Optivaize'}</SectionLabel>
                <IdentityHeadline style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}>
                  {language === 'nl'
                    ? <>Gestart vanuit passie voor AI, gegroeid tot een <GradientText>internationaal team</GradientText></>
                    : <>Started from a passion for AI, grown into an <GradientText>international team</GradientText></>}
                </IdentityHeadline>
                <IdentitySub style={{ margin: '0 0 1.5rem 0' }}>
                  {language === 'nl'
                    ? 'Maximilian Bladt startte Optivaize nadat hij in 2020 de eerste AI modellen zag opkomen. Na 2 jaar ervaring bij Elevate Digital, een Business bachelor, Econometrie premaster en een master Quantitative Finance aan de UvA, was de stap naar Optivaize logisch. In de afgelopen vijf jaar hebben we tientallen AI-tools en platformen gebouwd die onze klanten een echte voorsprong geven op hun concurrentie. Van automatiseringen die duizenden uren besparen tot complete AI-systemen die omzet verhogen. We hebben inmiddels een sterk internationaal team en fantastische klanten over de hele wereld.'
                    : 'Maximilian Bladt started Optivaize after seeing the first AI models emerge in 2020. After 2 years at Elevate Digital, a Business bachelor, Econometrics premaster and a master in Quantitative Finance at UvA, founding Optivaize was the logical next step. Over the past five years we have built dozens of AI tools and platforms that give our clients a real edge over their competition. From automations saving thousands of hours to complete AI systems driving revenue. We now have a strong international team and fantastic clients around the world.'}
                </IdentitySub>
                <BtnSecondary href="/over-ons" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {language === 'nl' ? 'Meer over ons' : 'More about us'} <ArrowRight size={15} />
                </BtnSecondary>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.12)' }}>
                <Image src="/images/max_bladt_upclose.webp" alt="Maximilian Bladt" width={600} height={800} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
              </div>
            </FadeIn>
          </AboutPreviewGrid>
        </Container>
      </section>

      {/* ── GLOBAL TEAM ── */}
      <HomeGlobeSection>
        <Container>
          <HomeGlobeLayout>
            <div>
              <FadeIn>
                <HomeGlobeLabel>{language === 'nl' ? 'Onze internationale workforce' : 'Our international workforce'}</HomeGlobeLabel>
                <HomeGlobeTitle>
                  {language === 'nl'
                    ? 'Ons team werkt vanuit 3 landen'
                    : 'Our team works from 3 countries'}
                </HomeGlobeTitle>
                <HomeGlobeText>
                  {language === 'nl'
                    ? 'AI-onderzoek en projectleiding doen we vanuit Nederland. Development vindt plaats in Mumbai en Manila, waar we toegang hebben tot uitzonderlijk talent. Hierdoor kunnen we de kostprijs van development aanzienlijk verlagen zonder concessies te doen aan kwaliteit. De regie en eindverantwoordelijkheid liggen altijd bij ons Nederlandse team.'
                    : 'AI research and project management are based in the Netherlands. Development takes place in Mumbai and Manila, where we have access to exceptional talent. This allows us to significantly reduce development costs without compromising quality. Direction and final responsibility always remain with our Dutch team.'}
                </HomeGlobeText>
              </FadeIn>
              <HomeLocations>
                {[
                  { flag: '🇳🇱', city: 'Utrecht', role: { nl: 'AI Research & Hoofdkantoor', en: 'AI Research & HQ' } },
                  { flag: '🇮🇳', city: 'Mumbai', role: { nl: 'Development', en: 'Development' } },
                  { flag: '🇵🇭', city: 'Manila', role: { nl: 'Development', en: 'Development' } },
                ].map((loc, i) => (
                  <FadeIn key={loc.city} delay={i * 0.08}>
                    <HomeLocCard whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <HomeLocIcon><MapPin size={16} /></HomeLocIcon>
                      <HomeLocText>
                        <div className="city">{loc.flag} {loc.city}</div>
                        <div className="role">{loc.role[language]}</div>
                      </HomeLocText>
                    </HomeLocCard>
                  </FadeIn>
                ))}
              </HomeLocations>
              <FadeIn delay={0.4}>
                <div style={{ marginTop: '1.5rem' }}>
                  <BtnSecondary href="/hiring" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    {language === 'nl' ? 'Bekijk vacatures' : 'View open positions'} <ArrowRight size={15} />
                  </BtnSecondary>
                </div>
              </FadeIn>
            </div>
            <HomeGlobeCanvasWrap>
              <FadeIn delay={0.2}>
                <React.Suspense fallback={<div style={{ height: 400 }} />}>
                  <InteractiveGlobe />
                </React.Suspense>
              </FadeIn>
            </HomeGlobeCanvasWrap>
          </HomeGlobeLayout>
        </Container>
      </HomeGlobeSection>

      {/* ── INTAKE PROCESS ── */}
      <IntakeSection>
        <Container>
          <SectionHeader>
            <SectionLabel>{language === 'nl' ? 'Hoe we werken' : 'How we work'}</SectionLabel>
            <FadeIn>
              <SectionTitle>
                {language === 'nl' ? 'Van idee tot resultaat in weken' : 'From idea to result in weeks'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub>
                {language === 'nl'
                  ? 'Geen eindeloze trajecten. Wij werken snel, gestructureerd en resultaatgericht.'
                  : 'No endless projects. We work fast, structured and results-driven.'}
              </SectionSub>
            </FadeIn>
          </SectionHeader>

          <IntakeGrid>
            {intakeSteps.map((step, i) => {
              const Icon = step.icon;
              const copy = step[language];
              return (
                <IntakeCard key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ position: 'relative' }}
                >
                  <IntakeIcon $color={step.color}><Icon size={24} /></IntakeIcon>
                  <IntakeNumber>{step.num}</IntakeNumber>
                  <IntakeTitle>{copy.title}</IntakeTitle>
                  <IntakeText>{copy.text}</IntakeText>
                  {i < 3 && (
                    <IntakeArrow>
                      <ArrowRight size={20} />
                    </IntakeArrow>
                  )}
                </IntakeCard>
              );
            })}
          </IntakeGrid>
        </Container>
      </IntakeSection>

      {/* ── BOTTOM CTA ── */}
      <CtaSection>
        <Container>
          <CtaContent>
            <FadeIn>
              <CtaTitle>
                {language === 'nl'
                  ? <>Klaar om <GradientText>AI</GradientText> in te zetten?</>
                  : <>Ready to deploy <GradientText>AI</GradientText>?</>}
              </CtaTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <CtaSub>
                {language === 'nl'
                  ? 'Plan een gratis gesprek en ontdek binnen 30 minuten hoe AI jouw bedrijf kan transformeren.'
                  : 'Book a free call and discover within 30 minutes how AI can transform your business.'}
              </CtaSub>
            </FadeIn>
            <FadeIn delay={0.2}>
              <CtaBtns>
                <BtnPrimary
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(59,130,246,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {language === 'nl' ? 'Plan gratis gesprek' : 'Book free call'}
                  <ArrowRight size={17} />
                </BtnPrimary>
                <BtnCall href="tel:+31642698918" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  <Phone size={16} />
                  {language === 'nl' ? 'Bel ons' : 'Call us'}
                </BtnCall>
              </CtaBtns>
            </FadeIn>
          </CtaContent>
        </Container>
      </CtaSection>
    </>
  );
}

export default HomePage;

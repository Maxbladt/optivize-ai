'use client';
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from '../components/Link';
import {
  Bot, MessageCircle, ArrowRight, CheckCircle, Zap, Globe, Users, BarChart3, Shield,
  Target, TrendingUp, ChevronRight, RefreshCw, Star, Mail, ShoppingBag, Code2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import VideoPlayer from '../components/VideoPlayer';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #06B6D4)';

const Container = styled.div`
  max-width: 1440px;
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
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}
    >{children}</motion.div>
  );
}

/* ─── Hero ─── */
const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 70% at 80% 50%, rgba(59,130,246,0.1), transparent),
      radial-gradient(ellipse 40% 40% at 10% 60%, rgba(6,182,212,0.06), transparent);
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const Breadcrumb = styled.div`
  display: flex; align-items: center; gap: 0.5rem; font-size: 13px; color: #475569; margin-bottom: 1.5rem;
  a { color: #475569; transition: color 0.2s; &:hover { color: #94A3B8; } }
`;

const Badge = styled.div`
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.3);
  color: #60A5FA; font-size: 12px; font-weight: 700; padding: 0.35rem 0.8rem;
  border-radius: 20px; margin-bottom: 1.25rem; letter-spacing: 0.08em; text-transform: uppercase;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; color: white;
  line-height: 1.1; margin-bottom: 1.5rem;
`;

const GradientText = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSub = styled(motion.p)`
  font-size: 18px; color: rgba(255,255,255,0.65); line-height: 1.7;
  max-width: 560px; margin-bottom: 2rem;
`;

const HeroBtns = styled.div`
  display: flex; gap: 1rem; flex-wrap: wrap;
`;

const BtnPrimary = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem; background: ${GRADIENT};
  color: white; font-weight: 700; font-size: 15px; padding: 0.875rem 1.75rem;
  border-radius: 12px; box-shadow: 0 6px 24px rgba(59,130,246,0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(59,130,246,0.5); }
`;

const BtnSecondary = styled(motion(Link))`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
  color: white; font-weight: 600; font-size: 15px; padding: 0.875rem 1.75rem;
  border-radius: 12px;
`;

/* ─── Tool strip ─── */
const ToolsStrip = styled.div`
  background: #F8FAFC;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  padding: 2.5rem 0;
`;

const ToolsLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: #94A3B8; text-align: center; margin-bottom: 1.5rem;
`;

const ToolsRow = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1rem;
`;

const ToolChip = styled.div`
  display: flex; align-items: center; gap: 0.5rem;
  background: white; border: 1px solid #E2E8F0; border-radius: 10px;
  padding: 0.5rem 1rem; font-size: 13px; font-weight: 600; color: #334155;
`;

const ToolLogoBg = styled.div`
  width: 24px; height: 24px; border-radius: 6px;
  background: ${props => props.$bg};
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
`;

const ToolLogo = styled.img`
  width: 16px; height: 16px; object-fit: contain;
`;

/* ─── Section primitives ─── */
const Section = styled.section`
  padding: ${props => props.$compact ? '5rem 0' : '7rem 0'};
  background: ${props => props.$dark ? '#0F172A' : props.$gray ? '#F8FAFC' : 'white'};
`;

const TwoCol = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const SectionLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${props => props.$light ? '#60A5FA' : '#3B82F6'}; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem); font-weight: 800;
  color: ${props => props.$light ? 'white' : '#0F172A'}; margin-bottom: 1.25rem; line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px; color: ${props => props.$light ? '#94A3B8' : '#475569'};
  line-height: 1.7; margin-bottom: 1.5rem;
`;

/* ─── Feature list (agents) ─── */
const FeatureList = styled.div`
  display: flex; flex-direction: column; gap: 0.875rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex; align-items: flex-start; gap: 0.75rem;
`;

const FeatureCheck = styled.div`
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(16,185,129,0.15);
  display: flex; align-items: center; justify-content: center;
  color: #10B981; flex-shrink: 0; margin-top: 2px;
`;

const FeatureText = styled.div`
  font-size: 15px; color: ${props => props.$light ? '#CBD5E1' : '#334155'}; line-height: 1.5;
`;

/* ─── Agent Network Diagram ─── */
const demoStream = keyframes`
  0% { top: -6px; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { top: calc(100% - 2px); opacity: 0; }
`;

const demoActionIn = keyframes`
  from { opacity: 0; transform: translateX(-6px); }
  to { opacity: 1; transform: translateX(0); }
`;

const DemoWrapAgent = styled.div`
  background: #0F172A; border-radius: 20px; padding: 1.5rem; border: 1px solid #1E293B;
`;

const DemoChat = styled.div`
  display: flex; gap: 0.6rem; align-items: flex-start; margin-bottom: 1.25rem; min-height: 48px;
`;

const DemoChatAvatar = styled.div`
  width: 28px; height: 28px; border-radius: 50%; background: #334155;
  display: flex; align-items: center; justify-content: center; color: #94A3B8; flex-shrink: 0;
`;

const DemoChatBubble = styled(motion.div)`
  background: #1E293B; border-radius: 12px 12px 12px 4px;
  padding: 0.6rem 0.9rem; font-size: 13px; color: #E2E8F0;
  line-height: 1.45; border: 1px solid #334155;
`;

const DemoMainRow = styled.div`
  display: flex; justify-content: center; margin-bottom: 0;
`;

const DemoMainCard = styled.div`
  display: flex; align-items: center; gap: 0.6rem;
  background: ${props => props.$active ? GRADIENT : '#1E293B'};
  border-radius: 12px; padding: 0.6rem 1rem;
  transition: background 0.4s ease;
  border: 1px solid ${props => props.$active ? 'transparent' : '#334155'};
`;

const DemoMainIcon = styled.div`
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,0.15);
  display: flex; align-items: center; justify-content: center;
  color: white; flex-shrink: 0;
`;

const DemoMainInfo = styled.div`
  font-size: 12px; color: white;
  .name { font-weight: 700; font-size: 13px; }
  .status { opacity: 0.7; margin-top: 1px; font-size: 11px; }
`;

const DemoConnStub = styled.div`
  width: 1px; height: 10px; background: #334155; margin: 0 auto;
`;

const DemoLinesRow = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr);
  height: 36px; margin-bottom: 0.5rem; position: relative;
  &::before {
    content: ''; position: absolute; top: 0;
    left: calc(16.67%); right: calc(16.67%);
    height: 1px; background: #334155;
  }
`;

const DemoLineCell = styled.div`
  display: flex; justify-content: center;
`;

const DemoLine = styled.div`
  width: 2px; height: 100%;
  background: ${props => props.$active ? props.$color : '#334155'};
  position: relative; transition: background 0.3s ease;
  ${props => props.$active && `box-shadow: 0 0 8px ${props.$color}40;`}
`;

const DemoDot = styled.div`
  position: absolute; left: -3px; width: 8px; height: 8px;
  border-radius: 50%; background: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color};
  animation: ${demoStream} 0.8s ease-in-out infinite;
`;

const DemoAgentsRow = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;
`;

const DemoAgentCard = styled.div`
  background: ${props => props.$active ? `${props.$color}12` : '#1E293B'};
  border: 1.5px solid ${props => props.$active ? `${props.$color}50` : '#334155'};
  border-radius: 12px; padding: 0.75rem 0.5rem; text-align: center;
  transition: all 0.4s ease; min-height: 90px;
  ${props => props.$active && `box-shadow: 0 0 20px ${props.$color}15;`}
`;

const DemoAgentIconWrap = styled.div`
  width: 32px; height: 32px; border-radius: 8px;
  background: ${props => props.$color}20;
  display: flex; align-items: center; justify-content: center;
  color: ${props => props.$color}; margin: 0 auto 0.4rem;
  transition: all 0.3s ease;
  ${props => props.$active && `background: ${props.$color}30;`}
`;

const DemoAgentLabel = styled.div`
  font-size: 11px; font-weight: 700; color: #CBD5E1; margin-bottom: 0.4rem;
`;

const DemoActions = styled.div`
  display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.4rem;
`;

const DemoAction = styled.div`
  display: flex; align-items: center; gap: 0.3rem;
  font-size: 10px; color: ${props => props.$color};
  animation: ${demoActionIn} 0.3s ease forwards;
  animation-delay: ${props => props.$delay}s; opacity: 0;
  justify-content: center;
  svg { flex-shrink: 0; }
`;

/* ─── Agent Demo Data ─── */
const DEMO_QUERIES = [
  {
    msgNL: 'Schrijf een blog over AI trends en publiceer het',
    targetIdx: 0,
    routeNL: '\u2192 Marketing Agent',
    actionsNL: ['Blog genereren', 'SEO optimaliseren', 'WordPress publiceren'],
  },
  {
    msgNL: 'Volg de nieuwe lead van HubSpot op via LinkedIn',
    targetIdx: 1,
    routeNL: '\u2192 Sales Agent',
    actionsNL: ['Lead analyseren', 'LinkedIn bericht', 'CRM bijwerken'],
  },
  {
    msgNL: 'Sync de facturen met Exact Online',
    targetIdx: 2,
    routeNL: '\u2192 Ops Agent',
    actionsNL: ['Facturen ophalen', 'Data mappen', 'Exact sync'],
  },
];

const DEMO_AGENTS = [
  { name: 'Marketing Agent', icon: TrendingUp, color: '#10B981' },
  { name: 'Sales Agent', icon: Target, color: '#3B82F6' },
  { name: 'Ops Agent', icon: Zap, color: '#8B5CF6' },
];

function AgentDemo() {
  const [qIdx, setQIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQIdx(prev => (prev + 1) % 3);
      setPhase(0);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [qIdx]);

  const q = DEMO_QUERIES[qIdx];

  return (
    <DemoWrapAgent>
      <DemoChat>
        <DemoChatAvatar><Users size={13} /></DemoChatAvatar>
        <DemoChatBubble
          key={qIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {q.msgNL}
        </DemoChatBubble>
      </DemoChat>

      <DemoMainRow>
        <DemoMainCard $active={phase >= 1}>
          <DemoMainIcon><Bot size={16} /></DemoMainIcon>
          <DemoMainInfo>
            <div className="name">OpenClaw Main Agent</div>
            <div className="status">
              {phase === 0 ? '...' : phase === 1 ? 'Analyseren...' : q.routeNL}
            </div>
          </DemoMainInfo>
        </DemoMainCard>
      </DemoMainRow>

      <DemoConnStub />

      <DemoLinesRow>
        {DEMO_AGENTS.map((ag, i) => (
          <DemoLineCell key={i}>
            <DemoLine $active={phase >= 2 && q.targetIdx === i} $color={ag.color}>
              {phase >= 2 && q.targetIdx === i && <DemoDot $color={ag.color} />}
            </DemoLine>
          </DemoLineCell>
        ))}
      </DemoLinesRow>

      <DemoAgentsRow>
        {DEMO_AGENTS.map((ag, i) => {
          const Icon = ag.icon;
          const isActive = phase >= 2 && q.targetIdx === i;
          return (
            <DemoAgentCard key={i} $active={isActive} $color={ag.color}>
              <DemoAgentIconWrap $color={ag.color} $active={isActive}><Icon size={15} /></DemoAgentIconWrap>
              <DemoAgentLabel>{ag.name}</DemoAgentLabel>
              {isActive && (
                <DemoActions>
                  {q.actionsNL.map((action, j) => (
                    <DemoAction key={`${qIdx}-${j}`} $delay={j * 0.3} $color={ag.color}>
                      <CheckCircle size={9} /> {action}
                    </DemoAction>
                  ))}
                </DemoActions>
              )}
            </DemoAgentCard>
          );
        })}
      </DemoAgentsRow>
    </DemoWrapAgent>
  );
}

/* ─── Chatbot Demo ─── */
const DemoWrapChat = styled(motion.div)`
  background: #0D1117; border-radius: 20px; overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
`;

const DemoBar = styled.div`
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  span { width: 9px; height: 9px; border-radius: 50%; }
  .r { background: #FC8181; }
  .y { background: #FBBF24; }
  .g { background: #34D399; }
  .label { margin-left: 0.5rem; font-size: 11.5px; color: rgba(255,255,255,0.3); font-weight: 500; flex: 1; }
`;

const ChatArea = styled.div`
  padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; min-height: 320px;
`;

const ChatMsg = styled(motion.div)`
  display: flex; justify-content: ${p => p.$user ? 'flex-end' : 'flex-start'};
  align-items: flex-end; gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 28px; height: 28px; border-radius: 50%;
  background: ${p => p.$bot ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : '#334155'};
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  font-size: 11px; font-weight: 700; color: white;
`;

const Bubble = styled.div`
  max-width: 78%; padding: 0.625rem 0.875rem;
  border-radius: ${p => p.$user ? '14px 14px 3px 14px' : '14px 14px 14px 3px'};
  font-size: 13px; line-height: 1.5;
  background: ${p => p.$user ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'rgba(255,255,255,0.08)'};
  color: ${p => p.$user ? 'white' : 'rgba(255,255,255,0.85)'};
  border: ${p => p.$user ? 'none' : '1px solid rgba(255,255,255,0.08)'};
`;

const DiscountCard = styled(motion.div)`
  background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25);
  border-radius: 12px; padding: 1rem; margin-top: 0.25rem; font-size: 12px;
  color: rgba(255,255,255,0.8);
  .title { font-size: 13px; font-weight: 700; color: #34D399; margin-bottom: 0.375rem; display: flex; align-items: center; gap: 0.4rem; }
  .code { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; padding: 0.25rem 0.625rem; font-weight: 700; font-family: monospace; color: #34D399; display: inline-block; margin-top: 0.375rem; }
`;

const ProductCard = styled(motion.div)`
  background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.2);
  border-radius: 12px; padding: 0.75rem; margin-top: 0.25rem;
  display: flex; align-items: center; gap: 0.75rem;
`;

const ProductThumb = styled.div`
  width: 48px; height: 48px; border-radius: 10px;
  background: rgba(6,182,212,0.12);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #22D3EE;
`;

const ProductInfo = styled.div`
  flex: 1;
  .name { font-size: 12px; font-weight: 700; color: #22D3EE; }
  .specs { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 1px; }
  .prices { margin-top: 3px; display: flex; align-items: center; gap: 0.4rem; }
  .price { font-size: 13px; font-weight: 800; color: #34D399; }
  .old { font-size: 11px; color: rgba(255,255,255,0.3); text-decoration: line-through; }
`;

const TypingIndicator = styled(motion.div)`
  display: flex; align-items: center; gap: 4px;
  padding: 0.75rem 0.875rem;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px 14px 14px 3px; width: fit-content;
  span {
    width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4);
    animation: bounce 1.2s ease-in-out infinite;
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
`;

const CHAT_SCRIPT = [
  { role: 'user', text: 'Hoi, ik zoek een goede jacuzzi voor in mijn tuin. Budget rond \u20AC3.000.' },
  { role: 'bot', text: 'Welkom bij Fonteyn! Wij verkopen geen Jacuzzi\u00AE (dat is een geregistreerd merk), maar we hebben prachtige buitenspa\'s die minstens zo goed zijn. Voor hoeveel personen zoek je?' },
  { role: 'user', text: '4 personen, en liefst compact want mijn tuin is niet heel groot.' },
  { role: 'bot', text: 'Dan is de Spa Believe van Devine Spas ideaal! Compact (155\u00D7155cm), 40 hydrotherapie jets, LED-verlichting en Bluetooth audio. Nu van \u20AC5.990 voor \u20AC2.900!' },
  { role: 'product', text: '' },
  { role: 'user', text: 'Dat klinkt goed! Zijn er nog extra aanbiedingen?' },
  { role: 'bot', text: 'We hebben even gekeken en speciaal voor je kunnen we een extra korting regelen op deze spa!' },
  { role: 'discount', text: '' },
];

function ChatbotDemo() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (step >= CHAT_SCRIPT.length) {
      const reset = setTimeout(() => setStep(0), 3000);
      return () => clearTimeout(reset);
    }
    if (CHAT_SCRIPT[step]?.role === 'user') {
      const t = setTimeout(() => setStep(s => s + 1), 2000);
      return () => clearTimeout(t);
    }
    setTyping(true);
    const t1 = setTimeout(() => setTyping(false), 1200);
    const t2 = setTimeout(() => setStep(s => s + 1), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step]);

  return (
    <DemoWrapChat initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
      <DemoBar>
        <span className="r" /><span className="y" /><span className="g" />
        <span className="label">Fonteyn Spas &middot; AI Productadvies</span>
      </DemoBar>
      <ChatArea>
        <AnimatePresence>
          {CHAT_SCRIPT.slice(0, step).map((msg, i) => {
            if (msg.role === 'product') {
              return (
                <ProductCard key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <ProductThumb><Star size={18} /></ProductThumb>
                  <ProductInfo>
                    <div className="name">Spa Believe - Devine Spas</div>
                    <div className="specs">4 pers &middot; 155x155cm &middot; 40 jets &middot; Bluetooth</div>
                    <div className="prices">
                      <span className="price">&euro;2.900</span>
                      <span className="old">&euro;5.990</span>
                    </div>
                  </ProductInfo>
                </ProductCard>
              );
            }
            if (msg.role === 'discount') {
              return (
                <DiscountCard key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="title"><Star size={13} />Persoonlijke aanbieding voor jou</div>
                  10% extra korting op de Spa Believe. Je persoonlijke kortingscode:
                  <div className="code">SPA10FONTEYN</div>
                </DiscountCard>
              );
            }
            return (
              <ChatMsg key={i} $user={msg.role === 'user'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {msg.role === 'bot' && <Avatar $bot><Bot size={12} /></Avatar>}
                <Bubble $user={msg.role === 'user'}>{msg.text}</Bubble>
              </ChatMsg>
            );
          })}
          {typing && (
            <ChatMsg key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Avatar $bot><Bot size={12} /></Avatar>
              <TypingIndicator><span /><span /><span /></TypingIndicator>
            </ChatMsg>
          )}
        </AnimatePresence>
      </ChatArea>
    </DemoWrapChat>
  );
}

/* ─── Channels grid (agents) ─── */
const ChannelsGrid = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const ChannelCard = styled(motion.div)`
  background: white; border-radius: 16px; padding: 1.5rem;
  border: 1.5px solid #F1F5F9; text-align: center; transition: all 0.25s ease;
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 4px 16px ${props => props.$color}12; transform: translateY(-3px); }
`;

const ChannelIcon = styled.div`
  width: 44px; height: 44px; border-radius: 12px;
  background: ${props => props.$color}14;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem;
`;

const ChannelName = styled.div`
  font-size: 14px; font-weight: 700; color: #0F172A;
`;

/* ─── Steps section (agents) ─── */
const StepsGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const StepCard = styled(motion.div)`
  background: #F8FAFC; border-radius: 20px; padding: 2rem;
  border: 1px solid #F1F5F9; position: relative; overflow: hidden;
  &::before {
    content: '${props => props.$num}';
    position: absolute; top: -0.5rem; right: 1rem;
    font-size: 6rem; font-weight: 900; color: rgba(59,130,246,0.05); line-height: 1;
  }
`;

const StepIcon = styled.div`
  width: 48px; height: 48px; border-radius: 14px;
  background: ${GRADIENT};
  display: flex; align-items: center; justify-content: center;
  color: white; margin-bottom: 1.25rem;
`;

const StepTitle = styled.h3`
  font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 0.75rem;
`;

const StepDesc = styled.p`
  font-size: 15px; color: #64748B; line-height: 1.6;
`;

/* ─── Stats banner (agents) ─── */
const StatsBanner = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  background: #0F172A; border-radius: 20px; overflow: hidden;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCell = styled.div`
  padding: 2rem 1.5rem; text-align: center;
  border-right: 1px solid rgba(255,255,255,0.07);
  &:last-child { border-right: none; }
  @media (max-width: 900px) {
    &:nth-child(2n) { border-right: none; }
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
`;

const StatNum = styled.div`
  font-size: 2.2rem; font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; margin-bottom: 0.4rem;
`;

const StatText = styled.div`
  font-size: 13px; color: #64748B; line-height: 1.4;
`;

/* ─── Use cases (agents) ─── */
const UseCaseGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const UseCaseCard = styled(motion.div)`
  background: white; border-radius: 20px; padding: 2rem;
  border: 1.5px solid #F1F5F9; display: flex; gap: 1.25rem; align-items: flex-start;
  transition: all 0.25s ease;
  &:hover {
    border-color: ${props => props.$color}44;
    box-shadow: 0 6px 24px ${props => props.$color}12;
    transform: translateY(-3px);
  }
`;

const UCIcon = styled.div`
  width: 48px; height: 48px; border-radius: 14px;
  background: ${props => props.$color}14;
  display: flex; align-items: center; justify-content: center;
  color: ${props => props.$color}; flex-shrink: 0;
`;

const UCText = styled.div`
  .title { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.4rem; }
  .desc  { font-size: 14px; color: #64748B; line-height: 1.6; }
`;

/* ─── Chatbot feature cards ─── */
const CBFeatureGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const CBFeatureCard = styled(motion.div)`
  background: ${p => p.$dark ? 'rgba(255,255,255,0.04)' : 'white'};
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.07)' : '#F1F5F9'};
  border-radius: 20px; padding: 2rem;
`;

const CBFeatureIcon = styled.div`
  width: 48px; height: 48px; border-radius: 14px;
  background: ${p => p.$color}18;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color}; margin-bottom: 1.25rem;
`;

const CBFeatureTitle = styled.h3`
  font-size: 17px; font-weight: 700;
  color: ${p => p.$light ? 'white' : '#0F172A'}; margin-bottom: 0.625rem;
`;

const CBFeatureText = styled.p`
  font-size: 14px; line-height: 1.6;
  color: ${p => p.$light ? 'rgba(255,255,255,0.55)' : '#64748B'};
`;

/* ─── CheckList (chatbot) ─── */
const CheckList = styled.ul`
  list-style: none; display: flex; flex-direction: column; gap: 0.875rem; margin-bottom: 2rem;
`;

const CheckItem = styled.li`
  display: flex; align-items: flex-start; gap: 0.75rem;
  font-size: 15px; color: ${p => p.$light ? 'rgba(255,255,255,0.75)' : '#334155'}; line-height: 1.55;
  svg { flex-shrink: 0; margin-top: 2px; }
`;

/* ─── Channel strip (chatbot) ─── */
const ChannelStrip = styled.div`
  display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem;
`;

const ChannelBadge = styled.div`
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 0.5rem 1rem;
  font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75);
  img { width: 18px; height: 18px; object-fit: contain; }
`;

/* ─── Stats row (chatbot) ─── */
const CBStatsRow = styled.div`
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const CBStatCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px; padding: 1.5rem; text-align: center;
`;

const CBStatNum = styled.div`
  font-size: 2.2rem; font-weight: 800;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; margin-bottom: 0.25rem;
`;

const CBStatLabel = styled.div`
  font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.4;
`;

/* ─── Flow section (chatbot) ─── */
const FlowWrap = styled.div`
  display: flex; flex-direction: column; gap: 0; position: relative;
  &::before {
    content: ''; position: absolute; left: 23px; top: 24px; bottom: 24px;
    width: 2px; background: linear-gradient(to bottom, #06B6D4, #3B82F6, #8B5CF6);
  }
`;

const FlowStep = styled(motion.div)`
  display: flex; align-items: flex-start; gap: 1.25rem; padding: 1.5rem 0;
`;

const FlowNum = styled.div`
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 800; color: white;
  flex-shrink: 0; position: relative; z-index: 1;
`;

const FlowContent = styled.div`
  padding-top: 0.25rem;
`;

const FlowTitle = styled.div`
  font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.375rem;
`;

const FlowDesc = styled.div`
  font-size: 14px; color: #64748B; line-height: 1.6;
`;

/* ─── CTA ─── */
const CTASection = styled.section`
  padding: 6rem 0; background: white;
`;

const CTACard = styled(motion.div)`
  background: ${GRADIENT}; border-radius: 24px; padding: 4rem; text-align: center;
  h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 1rem; }
  p  { font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 2rem; max-width: 520px; margin-left: auto; margin-right: auto; }
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTAButtonRow = styled.div`
  display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
`;

const BtnWhite = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: white; color: #3B82F6; font-weight: 700; font-size: 15px;
  padding: 0.8rem 1.75rem; border-radius: 10px;
`;

const BtnOutline = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.12); border: 2px solid rgba(255,255,255,0.3);
  color: white; font-weight: 600; font-size: 15px;
  padding: 0.775rem 1.625rem; border-radius: 10px;
`;

/* ─── Section divider ─── */
const SectionDivider = styled.div`
  background: ${props => props.$dark ? '#0F172A' : props.$gray ? '#F8FAFC' : 'white'};
  padding: 3rem 0 0;
  text-align: center;
`;

const DividerBadge = styled.div`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: ${props => props.$bg || 'rgba(59,130,246,0.12)'};
  border: 1px solid ${props => props.$border || 'rgba(59,130,246,0.25)'};
  color: ${props => props.$color || '#60A5FA'};
  font-size: 13px; font-weight: 700;
  padding: 0.5rem 1.25rem; border-radius: 24px;
  letter-spacing: 0.06em; text-transform: uppercase;
`;

/* ─── Data ─── */
const COMBINED_TOOLS = [
  { name: 'WhatsApp', slug: 'whatsapp', bg: '#25D366' },
  { name: 'Slack', slug: null, customIcon: '/images/slack_logo.svg', bg: '#4A154B' },
  { name: 'Telegram', slug: 'telegram', bg: '#26A5E4' },
  { name: 'Discord', slug: 'discord', bg: '#5865F2' },
  { name: 'n8n', slug: 'n8n', bg: '#EA4B71' },
  { name: 'OpenAI', slug: null, customIcon: '/images/chatgpt_logo.svg', bg: '#000000' },
  { name: 'Anthropic', slug: 'anthropic', bg: '#D97706' },
  { name: 'Google', slug: 'google', bg: '#4285F4' },
  { name: 'Shopify', slug: 'shopify', bg: '#7AB55C' },
  { name: 'Messenger', slug: 'messenger', bg: '#0099FF' },
];

const CHANNELS_DATA = [
  { name: 'WhatsApp', slug: 'whatsapp', color: '#25D366', bg: '#25D366', customIcon: null },
  { name: 'Slack', slug: 'slack', color: '#4A154B', bg: '#4A154B', customIcon: '/images/slack_logo.svg' },
  { name: 'Telegram', slug: 'telegram', color: '#26A5E4', bg: '#26A5E4', customIcon: null },
  { name: 'Discord', slug: 'discord', color: '#5865F2', bg: '#5865F2', customIcon: null },
  { name: 'Teams', slug: 'microsoftteams', color: '#6264A7', bg: '#6264A7', customIcon: '/images/teams_logo.svg' },
  { name: 'Gmail', slug: 'gmail', color: '#EA4335', bg: '#EA4335', customIcon: null },
  { name: 'Jira', slug: 'jira', color: '#0052CC', bg: '#0052CC', customIcon: null },
  { name: 'Notion', slug: 'notion', color: '#000000', bg: '#000000', customIcon: null },
];

/* ─── Video components ─── */
const ThumbOverlay = styled.div`
  position: absolute; inset: 0; z-index: 2; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
`;

const PlayBtn = styled.div`
  position: relative; z-index: 3;
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  ${ThumbOverlay}:hover & { transform: scale(1.08); }
`;


/* ══════════════════════════════════════════════ */
/* ─── MAIN COMPONENT ─── */
/* ══════════════════════════════════════════════ */

function AIAgentsChatbotsPage() {

  /* Agent data */
  const agentSteps = [
    { icon: MessageCircle, num: '1', title: 'Verzoek indienen', desc: 'Een medewerker stuurt een bericht via Slack, WhatsApp of Teams. Net als een chatgesprek.' },
    { icon: Bot, num: '2', title: 'Hoofd-agent analyseert', desc: 'De OpenClaw Main Agent analyseert het verzoek en bepaalt welke sub-agent(s) het beste kunnen helpen.' },
    { icon: CheckCircle, num: '3', title: 'Sub-agents handelen', desc: 'De juiste sub-agents nemen het over, voeren de taak uit en rapporteren de uitkomst.' },
  ];

  const agentUseCases = [
    { icon: TrendingUp, color: '#10B981', title: 'Marketing automatisering', desc: 'Agent schrijft blogs, optimaliseert SEO, beheert Google Ads en plaatst social content, zonder handmatig werk.' },
    { icon: Target, color: '#3B82F6', title: 'Sales opvolging', desc: 'Leads worden automatisch gekwalificeerd, bijgehouden in HubSpot en opgevolgd via gepersonaliseerde berichten.' },
    { icon: Zap, color: '#8B5CF6', title: 'Operations & rapportages', desc: 'Processen geautomatiseerd, platforms gesynchroniseerd via n8n en rapporten dagelijks gegenereerd.' },
    { icon: Globe, color: '#F59E0B', title: 'Klantenservice 24/7', desc: 'AI chatbot beantwoordt vragen, escaleert complexe gevallen naar mensen en werkt altijd door.' },
    { icon: BarChart3, color: '#EF4444', title: 'Finance & cashflow', desc: 'Agent logt in op boekhoudtools zoals Exact Online, analyseert cashflow en stuurt samenvattingen.' },
    { icon: Users, color: '#EC4899', title: 'HR & onboarding', desc: 'Automatische onboarding flows, taaklijsten en kennisoverdracht voor nieuwe medewerkers.' },
  ];

  const agentFeatures = [
    'Werkt 24/7 zonder pauze of vakantie',
    'Integreert met al je bestaande tools en platforms',
    'Leert van elke interactie en wordt steeds slimmer',
    'Volledig aanpasbaar aan je bedrijfsprocessen',
    'Veilig, privacygericht en zelf te hosten',
    'Gebouwd op ons eigen OpenClaw framework',
  ];

  /* Chatbot data */
  const cbFeatures = [
    { icon: RefreshCw, color: '#06B6D4', title: 'Live training op gesprekken', text: 'Andere chatbots volgen alleen instructies. Ons systeem leert van elk gesprek, automatisch, zonder menselijke tussenkomst. Elke interactie maakt de chatbot slimmer.' },
    { icon: Target, color: '#3B82F6', title: 'A/B-vragen & gebruikersflows', text: 'Wij bouwen conversatieflows in waarbij de chatbot strategisch vragen stelt om de gebruiker richting een aankoop of conversie te leiden, zonder agressief te zijn.' },
    { icon: BarChart3, color: '#8B5CF6', title: 'Conversie-tracking over sessies', text: 'Wij tracken niet alleen een gesprek maar de volledige klantreis over meerdere sessies. Zo zie je exact hoeveel omzet je chatbot genereert.' },
    { icon: Zap, color: '#F59E0B', title: 'Kortingen & tools op regelbasis', text: 'De chatbot kan automatisch kortingen aanbieden op basis van klantgedrag, aankoophistorie of specifieke regels die je instelt. Volledig geautomatiseerd.' },
    { icon: Bot, color: '#10B981', title: 'Getraind op je data', text: 'Wij trainen de chatbot op je producten, FAQs, conversaties en tone of voice. Het resultaat: een assistent die klinkt en denkt als je beste medewerker.' },
    { icon: TrendingUp, color: '#EC4899', title: 'Continu verbeteren', text: 'Maandelijks analyseren wij de chatbot-prestaties, passen we flows aan en trainen we opnieuw op nieuwe conversaties. Je chatbot groeit mee met je bedrijf.' },
  ];

  const cbChannels = [
    { name: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp/25D366' },
    { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack/4A154B' },
    { name: 'Discord', logo: 'https://cdn.simpleicons.org/discord/5865F2' },
    { name: 'Telegram', logo: 'https://cdn.simpleicons.org/telegram/26A5E4' },
    { name: 'Messenger', logo: 'https://cdn.simpleicons.org/messenger/0099FF' },
    { name: 'Website', logo: null },
    { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify/7AB55C' },
    { name: 'Gmail', logo: 'https://cdn.simpleicons.org/gmail/EA4335' },
  ];

  const cbFlowSteps = [
    { title: 'Kennismaking & data-verzameling', desc: 'Wij verzamelen je productdata, bestaande FAQs, eerdere klantgesprekken en je tone of voice. Dit vormt de basis van de training.' },
    { title: 'Conversatieflow ontwerp', desc: 'Samen ontwerpen we de ideale klantreizen, van productadvies tot checkout. Inclusief A/B-vragen en beslisbomen voor conversie-optimalisatie.' },
    { title: 'Training & fine-tuning', desc: 'Wij trainen het taalmodel op je specifieke data en verfijnen het totdat de chatbot precies klinkt en handelt zoals je wilt.' },
    { title: 'Koppeling aan kanalen', desc: 'De chatbot wordt gekoppeld aan alle kanalen die je wilt: website, WhatsApp, Slack, Discord, Shopify en meer.' },
    { title: 'Live & monitoring', desc: 'Zodra de chatbot live gaat, monitoren we conversaties, conversies en leermomenten. Maandelijks draaien we een nieuwe trainingsronde.' },
    { title: 'Doorlopende optimalisatie', desc: 'Elke maand analyseren we prestaties en passen flows aan. Je chatbot wordt elk kwartaal meetbaar beter.' },
  ];

  return (
    <>
      <SEOHead
        title="AI Agents & Chatbots | Optivaize, AI-bureau De Bilt"
        description="Custom AI agents en chatbots die 24/7 taken overnemen. Van autonome workflows tot klantgerichte chatbots getraind op jouw data. Optivaize, De Bilt."
        canonicalUrl="https://optivaize.nl/ai-agents-chatbots"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'AI Agents & Chatbots', url: 'https://optivaize.nl/ai-agents-chatbots' },
        ]}
      />

      {/* ══════════════════════════════════════════ */}
      {/* ─── HERO ─── */}
      {/* ══════════════════════════════════════════ */}
      <PageHero>
        <Container>
          <HeroGrid>
            <div>
              <Breadcrumb>
                <Link to="/">Home</Link>
                <ChevronRight size={14} />
                <span>Diensten</span>
                <ChevronRight size={14} />
                <span>AI Agents & Chatbots</span>
              </Breadcrumb>
              <Badge><Bot size={13} /> AI Agents & Chatbots</Badge>
              <H1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <GradientText>AI agents</GradientText> en <GradientText>chatbots</GradientText> die voor je werken
              </H1>
              <HeroSub
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Autonome AI agents die taken volledig overnemen via je eigen tools, en intelligente chatbots die je klanten helpen, 24/7, in jouw tone of voice. Gebouwd op ons eigen OpenClaw framework.
              </HeroSub>
              <HeroBtns>
                <BtnPrimary
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Plan een gesprek <ArrowRight size={16} />
                </BtnPrimary>
                <BtnSecondary
                  to="/cases"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                >
                  Bekijk resultaten
                </BtnSecondary>
              </HeroBtns>
            </div>
            <ChatbotDemo />
          </HeroGrid>
        </Container>
      </PageHero>

      {/* ══════════════════════════════════════════ */}
      {/* ─── COMBINED TOOLS STRIP ─── */}
      {/* ══════════════════════════════════════════ */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>Platforms en tools waarmee onze agents en chatbots werken</ToolsLabel>
          <ToolsRow>
            {COMBINED_TOOLS.map((t, i) => (
              <ToolChip key={i}>
                <ToolLogoBg $bg={t.bg}>
                  {(t.slug || t.customIcon) ? (
                    <ToolLogo
                      src={t.customIcon || `https://cdn.simpleicons.org/${t.slug}/FFFFFF`}
                      alt={t.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'white' }}>{t.name.substring(0,2)}</span>
                  )}
                </ToolLogoBg>
                {t.name}
              </ToolChip>
            ))}
          </ToolsRow>
        </Container>
      </ToolsStrip>

      {/* ══════════════════════════════════════════ */}
      {/* ─── AI AGENTS SECTION ─── */}
      {/* ══════════════════════════════════════════ */}

      {/* Agent stats */}
      <Section>
        <Container>
          <SectionDivider style={{ background: 'white', padding: '0 0 3rem' }}>
            <DividerBadge $bg="rgba(59,130,246,0.12)" $border="rgba(59,130,246,0.25)" $color="#60A5FA">
              <Bot size={14} /> AI Agents
            </DividerBadge>
          </SectionDivider>
          <FadeIn>
            <StatsBanner>
              <StatCell><StatNum>90%</StatNum><StatText>Van interne verzoeken geautomatiseerd</StatText></StatCell>
              <StatCell><StatNum>24/7</StatNum><StatText>Actief zonder onderbreking</StatText></StatCell>
              <StatCell><StatNum>8+</StatNum><StatText>Communicatiekanalen ondersteund</StatText></StatCell>
              <StatCell><StatNum>3&times;</StatNum><StatText>Meer output met zelfde team</StatText></StatCell>
            </StatsBanner>
          </FadeIn>
        </Container>
      </Section>

      {/* Agent architecture + demo */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>Architectuur</SectionLabel>
              <SectionTitle>Een hoofd-agent, oneindig veel mogelijkheden</SectionTitle>
              <SectionText>
                OpenClaw gebruikt een Gateway-architectuur. De Main Agent is de regisseur die verzoeken analyseert en delegeert aan gespecialiseerde sub-agents. Elke sub-agent heeft zijn eigen tools, geheugen en bevoegdheden.
              </SectionText>
              <FeatureList>
                {agentFeatures.map((f, i) => (
                  <FeatureItem key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <FeatureCheck><CheckCircle size={13} /></FeatureCheck>
                    <FeatureText>{f}</FeatureText>
                  </FeatureItem>
                ))}
              </FeatureList>
            </FadeIn>
            <FadeIn delay={0.2}>
              <AgentDemo />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Agent communication channels */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>Communicatiekanalen</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>Je team communiceert via de tools die ze al kennen</SectionTitle></FadeIn>
          </div>
          <ChannelsGrid>
            {CHANNELS_DATA.map((ch, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <ChannelCard $color={ch.color} whileHover={{ y: -4 }}>
                  <ChannelIcon $color={ch.color}>
                    <ToolLogo
                      src={ch.customIcon || `https://cdn.simpleicons.org/${ch.slug}/${ch.bg.replace('#','')}`}
                      alt={ch.name}
                      style={{ width: 24, height: 24 }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </ChannelIcon>
                  <ChannelName>{ch.name}</ChannelName>
                </ChannelCard>
              </FadeIn>
            ))}
          </ChannelsGrid>
        </Container>
      </Section>

      {/* Agent video section */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn delay={0.1}>
              <VideoPlayer src="/videos/Openclaw intro.mp4" />
            </FadeIn>
            <FadeIn>
              <SectionLabel>Voor je bedrijf</SectionLabel>
              <SectionTitle>Gebouwd voor de manier waarop je team werkt</SectionTitle>
              <SectionText>
                Wij configureren OpenClaw specifiek voor je organisatie. Je medewerkers communiceren via de tools die ze al gebruiken, geen nieuwe software te leren.
              </SectionText>
              <SectionText>
                Of het nu gaat om Slack, WhatsApp, Teams of Discord, OpenClaw werkt via je bestaande communicatiekanalen en koppelt aan je CRM, boekhouding en andere systemen.
              </SectionText>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Agent how it works */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel style={{ justifyContent: 'center', display: 'flex' }}>Hoe het werkt</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>In drie stappen live</SectionTitle></FadeIn>
          </div>
          <StepsGrid>
            {agentSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <StepCard $num={step.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <StepIcon><Icon size={22} /></StepIcon>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDesc>{step.desc}</StepDesc>
                  </StepCard>
                </FadeIn>
              );
            })}
          </StepsGrid>
        </Container>
      </Section>

      {/* Agent use cases */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel style={{ justifyContent: 'center', display: 'flex' }}>Toepassingen</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>Wat kunnen onze agents voor je doen?</SectionTitle></FadeIn>
          </div>
          <UseCaseGrid>
            {agentUseCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <UseCaseCard $color={uc.color}>
                    <UCIcon $color={uc.color}><Icon size={22} /></UCIcon>
                    <UCText>
                      <div className="title">{uc.title}</div>
                      <div className="desc">{uc.desc}</div>
                    </UCText>
                  </UseCaseCard>
                </FadeIn>
              );
            })}
          </UseCaseGrid>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════ */}
      {/* ─── CHATBOT SECTION ─── */}
      {/* ══════════════════════════════════════════ */}

      <Section>
        <Container>
          <SectionDivider style={{ background: 'white', padding: '0 0 3rem' }}>
            <DividerBadge $bg="rgba(6,182,212,0.12)" $border="rgba(6,182,212,0.25)" $color="#22D3EE">
              <MessageCircle size={14} /> AI Chatbots
            </DividerBadge>
          </SectionDivider>
          <TwoCol>
            <FadeIn>
              <SectionLabel>Wat ons anders maakt</SectionLabel>
              <SectionTitle>
                Andere chatbots volgen instructies. De onze leren.
              </SectionTitle>
              <SectionText>
                De meeste chatbots werken op basis van een statische instructieset of kennisbank. Zodra een vraag buiten het script valt, faalt de bot. Bij Optivaize trainen wij chatbots continu opnieuw op basis van echte klantgesprekken.
              </SectionText>
              <SectionText>
                Elke succesvolle conversatie, elke aankoop, elke klantinteractie wordt gebruikt om het model te verbeteren. Na 3 maanden heb je een chatbot die je best-presterende medewerker presteert, 24/7, op alle kanalen tegelijk.
              </SectionText>
              <CheckList>
                {[
                  'Over-the-air training op echte klantgesprekken',
                  'A/B-testvragen voor maximale conversie',
                  'Automatische kortingen op basis van klantgedrag',
                  'Conversie-tracking over meerdere sessies',
                  'Koppeling aan alle kanalen die je gebruikt',
                ].map((item, i) => (
                  <CheckItem key={i}>
                    <CheckCircle size={18} color="#06B6D4" />
                    {item}
                  </CheckItem>
                ))}
              </CheckList>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/passion_icebaths.webp" alt="Passion Ice Baths chatbot" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Chatbot features */}
      <Section $dark>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionLabel $light>Mogelijkheden</SectionLabel>
              <SectionTitle $light>
                Alles wat je chatbot nodig heeft om te converteren
              </SectionTitle>
            </div>
          </FadeIn>
          <CBFeatureGrid>
            {cbFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <CBFeatureCard $dark initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <CBFeatureIcon $color={f.color}><Icon size={22} /></CBFeatureIcon>
                    <CBFeatureTitle $light>{f.title}</CBFeatureTitle>
                    <CBFeatureText $light>{f.text}</CBFeatureText>
                  </CBFeatureCard>
                </FadeIn>
              );
            })}
          </CBFeatureGrid>
        </Container>
      </Section>

      {/* Chatbot channels */}
      <Section $dark style={{ paddingTop: 0 }}>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel $light>Kanalen</SectionLabel>
              <SectionTitle $light>
                Je chatbot werkt overal waar je klanten zijn
              </SectionTitle>
              <SectionText $light>
                Wij koppelen je chatbot aan elk kanaal dat je gebruikt. Een intelligente kern, overal inzetbaar. Hetzelfde getrainde model staat klaar op je website, in WhatsApp, Slack, Discord en meer.
              </SectionText>
              <ChannelStrip>
                {cbChannels.map((ch, i) => (
                  <ChannelBadge key={i}>
                    {ch.logo
                      ? <img src={ch.logo} alt={ch.name} style={{ width: 16, height: 16 }} />
                      : <MessageCircle size={14} color="#06B6D4" />}
                    {ch.name}
                  </ChannelBadge>
                ))}
              </ChannelStrip>
            </FadeIn>
            <FadeIn delay={0.15}>
              <Image src="/images/wimhof.webp" alt="Wim Hof" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Chatbot stats */}
      <Section $dark style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Container>
          <CBStatsRow>
            {[
              { num: '24/7', label: 'Beschikbaar, geen overwerk' },
              { num: '+34%', label: 'Gemiddelde conversiestijging' },
              { num: '3\u00D7', label: 'Sneller reageren dan menselijk team' },
              { num: '90d', label: 'Tot schaalbaar resultaat' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <CBStatCard>
                  <CBStatNum>{s.num}</CBStatNum>
                  <CBStatLabel>{s.label}</CBStatLabel>
                </CBStatCard>
              </FadeIn>
            ))}
          </CBStatsRow>
        </Container>
      </Section>

      {/* Chatbot flow / process */}
      <Section $gray>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>Aanpak</SectionLabel>
              <SectionTitle>
                Van intake tot chatbot die verkoopt
              </SectionTitle>
              <SectionText style={{ maxWidth: 600, margin: '0 auto' }}>
                Wij nemen de volledige implementatie op ons, van data-verzameling en training tot live-gang en maandelijkse optimalisatie.
              </SectionText>
            </div>
          </FadeIn>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <FlowWrap>
              {cbFlowSteps.map((s, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <FlowStep>
                    <FlowNum>{i + 1}</FlowNum>
                    <FlowContent>
                      <FlowTitle>{s.title}</FlowTitle>
                      <FlowDesc>{s.desc}</FlowDesc>
                    </FlowContent>
                  </FlowStep>
                </FadeIn>
              ))}
            </FlowWrap>
          </div>
        </Container>
      </Section>

      {/* ══════════════════════════════════════════ */}
      {/* ─── SHARED CTA ─── */}
      {/* ══════════════════════════════════════════ */}
      <CTASection>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>Klaar voor je eigen AI agent of chatbot?</h2>
              <p>
                Wij bouwen een oplossing op maat voor je organisatie. Van autonome agents tot converterende chatbots. Plan een gratis gesprek.
              </p>
              <CTAButtonRow>
                <BtnWhite href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  Vul het formulier in <ArrowRight size={16} />
                </BtnWhite>
                <BtnOutline href="tel:+31642698918" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  Bel ons direct
                </BtnOutline>
              </CTAButtonRow>
            </CTACard>
          </FadeIn>
        </Container>
      </CTASection>
    </>
  );
}

export default AIAgentsChatbotsPage;

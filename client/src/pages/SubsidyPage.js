'use client';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../components/Link';
import {
  ArrowRight, Code2, CheckCircle, Blocks,
  Zap, TrendingUp, Shield, Server,
  Layers, Coins, Wallet, Gamepad2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

const GRADIENT = 'linear-gradient(135deg, #6366F1, #3B82F6)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.3); }
  50%       { box-shadow: 0 0 0 12px rgba(99,102,241,0); }
`;

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

/* ─── Hero ──────────────────────────────────── */
const HeroWrap = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #0A0520 0%, #0F172A 100%);
  position: relative;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 70% at 80% 50%, rgba(99,102,241,0.1) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 10% 60%, rgba(59,130,246,0.06) 0%, transparent 70%);
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 760px;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.3);
  color: #A5B4FC;
  font-size: 12px;
  font-weight: 700;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const HeroH1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
`;

const GradientText = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroP = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 620px;
`;

const ChainRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const ChainItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(99,102,241,0.4);
    background: rgba(99,102,241,0.1);
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
  span {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255,255,255,0.75);
  }
`;

const HeroBtns = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const BtnPrimary = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.9rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(99,102,241,0.35);
`;

const BtnSecondary = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  font-weight: 600;
  font-size: 15px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
`;

/* ─── Blockchain Graphic ─────────────────────── */
const chainFlow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

const ChainVisual = styled(motion.div)`
  margin-top: 4rem;
  padding: 2rem 2.5rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow-x: auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) { padding: 1.5rem 1rem; }
`;

const ChainNode = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: ${p => p.$center ? '1.25rem 1.75rem' : '1rem 1.25rem'};
  background: ${p => p.$center ? GRADIENT : 'rgba(255,255,255,0.04)'};
  border: 1.5px solid ${p => p.$center ? 'transparent' : 'rgba(99,102,241,0.2)'};
  border-radius: ${p => p.$center ? '18px' : '14px'};
  min-width: ${p => p.$center ? '130px' : '95px'};
  box-shadow: ${p => p.$center ? '0 8px 32px rgba(99,102,241,0.3)' : 'none'};
  flex-shrink: 0;

  img { width: ${p => p.$center ? '28px' : '22px'}; height: ${p => p.$center ? '28px' : '22px'}; object-fit: contain; }
  .node-icon { color: #A5B4FC; }
  .label { font-size: ${p => p.$center ? '13px' : '11px'}; font-weight: 700; color: white; text-align: center; }
  .sub { font-size: 9px; color: rgba(255,255,255,0.4); text-align: center; }
`;

const ChainConnector = styled.div`
  width: 40px;
  height: 2px;
  background: rgba(99,102,241,0.15);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #6366F1, transparent);
    animation: ${chainFlow} 2.5s ease-in-out infinite;
  }

  @media (max-width: 768px) { width: 24px; }
`;

/* ─── Live Demo ──────────────────────────────── */
const DemoWrap = styled(motion.div)`
  background: #0F172A;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 24px 80px rgba(0,0,0,0.2);
`;

const DemoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.05);

  span { width: 10px; height: 10px; border-radius: 50%; }
  span:nth-child(1) { background: #FF5F57; }
  span:nth-child(2) { background: #FEBC2E; }
  span:nth-child(3) { background: #28C840; }

  .title { margin-left: 0.5rem; font-size: 11.5px; color: rgba(255,255,255,0.3); font-weight: 500; flex: 1; }
  .live { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; color: #34D399; letter-spacing: 0.06em; }
  .liveDot { width: 6px; height: 6px; border-radius: 50%; background: #34D399; animation: ${pulse} 1.5s ease-in-out infinite; }
`;

const DemoBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 340px;
`;

const ChatRow = styled.div`
  display: flex;
  justify-content: ${props => props.$user ? 'flex-end' : 'flex-start'};
`;

const ChatBubble = styled(motion.div)`
  max-width: 85%;
  padding: 0.65rem 0.875rem;
  border-radius: ${props => props.$user ? '12px 12px 3px 12px' : '12px 12px 12px 3px'};
  font-size: 13px;
  line-height: 1.5;
  background: ${props => props.$user ? GRADIENT : 'rgba(255,255,255,0.08)'};
  color: ${props => props.$user ? 'white' : 'rgba(255,255,255,0.85)'};
  border: ${props => props.$user ? 'none' : '1px solid rgba(255,255,255,0.08)'};
`;

const StepChip = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.25);
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  font-size: 11px;
  color: #A5B4FC;
`;

const AgentPanel = styled(motion.div)`
  background: rgba(99,102,241,0.06);
  border: 1px solid rgba(99,102,241,0.2);
  border-radius: 10px;
  padding: 0.75rem;
`;

const AgentPanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.625rem;
  font-size: 11px;
  font-weight: 700;
  color: #A5B4FC;
  letter-spacing: 0.03em;

  .pulse { width: 7px; height: 7px; border-radius: 50%; background: #6366F1; animation: demoPulse 1.5s ease-in-out infinite; }

  @keyframes demoPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

const ActionRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  &:last-child { border-bottom: none; }
`;

const ActionIcon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: ${props => props.$bg || 'rgba(99,102,241,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
`;

const ActionText = styled.div`
  font-size: 11.5px;
  color: rgba(255,255,255,0.65);
  flex: 1;
`;

const ActionCheck = styled(motion.div)`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #10B981;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: white;
  font-weight: 700;
  flex-shrink: 0;
`;

const ResultBadge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.2);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 11px;
  font-weight: 600;
  color: #34D399;
`;

/* ─── Sections ───────────────────────────────── */
const HowSection = styled.section`
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
  color: #6366F1;
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const SectionSub = styled.p`
  font-size: 17px;
  color: #64748B;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 16%;
    right: 16%;
    height: 2px;
    background: ${GRADIENT};
    opacity: 0.3;

    @media (max-width: 768px) { display: none; }
  }

  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 1.5rem; }
`;

const StepCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  border: 1.5px solid #F1F5F9;
  text-align: center;
  position: relative;
`;

const StepNum = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${GRADIENT};
  color: white;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 8px 24px rgba(99,102,241,0.3);
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const StepDesc = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.65;
`;

/* ─── Stats ──────────────────────────────────── */
const StatsSection = styled.section`
  padding: 5rem 0;
  background: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: #F8FAFC;
  border: 1px solid #F1F5F9;
`;

const StatNum = styled.div`
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #64748B;
  line-height: 1.4;
`;

/* ─── Capabilities ───────────────────────────── */
const CapSection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const CapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const CapCard = styled(motion.div)`
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  border: 1.5px solid #F1F5F9;
  background: white;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(99,102,241,0.3);
    box-shadow: 0 8px 32px rgba(99,102,241,0.08);
    transform: translateY(-3px);
  }
`;

const CapIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(99,102,241,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366F1;
  margin-bottom: 1rem;
`;

const CapTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const CapDesc = styled.p`
  font-size: 13px;
  color: #64748B;
  line-height: 1.55;
`;

const CapTech = styled.div`
  margin-top: 1rem;
  font-size: 12px;
  font-weight: 700;
  color: #6366F1;
  background: rgba(99,102,241,0.06);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  display: inline-block;
`;

/* ─── Case Study ─────────────────────────────── */
const CaseSection = styled.section`
  padding: 7rem 0;
  background: #0F172A;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.08), transparent);
  }
`;

const CaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const CaseVisual = styled(motion.div)`
  background: rgba(99,102,241,0.08);
  border: 1.5px solid rgba(99,102,241,0.2);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  img {
    width: 180px;
    height: auto;
    filter: drop-shadow(0 8px 32px rgba(99,102,241,0.3));
  }
`;

const CaseVisualChains = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 28px;
    height: 28px;
    opacity: 0.7;
    transition: opacity 0.2s;
    filter: none;

    &:hover { opacity: 1; }
  }
`;

const CaseInfo = styled.div`
  position: relative;
`;

const CaseTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const CaseSub = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.25rem;
  font-weight: 500;
`;

const CaseDesc = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const CaseResults = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const CaseResultCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 1rem;
`;

const CaseResultValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$color || '#A5B4FC'};
  margin-bottom: 0.25rem;
`;

const CaseResultLabel = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
`;

const CasePartners = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);

  .label {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  img {
    height: 26px;
    opacity: 0.55;
    transition: opacity 0.2s;
    &:hover { opacity: 1; }
  }
`;

/* ─── CTA ────────────────────────────────────── */
const CTASection = styled.section`
  padding: 7rem 0;
  background: #F8FAFC;
`;

const CTABox = styled(motion.div)`
  background: ${GRADIENT};
  border-radius: 28px;
  padding: 5rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,255,255,0.08), transparent);
  }

  @media (max-width: 768px) { padding: 3.5rem 1.5rem; }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  position: relative;
`;

const CTASub = styled.p`
  font-size: 17px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2.5rem;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  position: relative;
`;

const CTABtns = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
`;

const CTABtnWhite = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #6366F1;
  font-weight: 700;
  font-size: 16px;
  padding: 0.9rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
`;

/* ─── Data ───────────────────────────────────── */
const CHAINS = [
  { name: 'Solana', logo: 'https://cdn.simpleicons.org/solana/9945FF' },
  { name: 'Ethereum', logo: 'https://cdn.simpleicons.org/ethereum/3C3C3D' },
  { name: 'Polygon', logo: 'https://cdn.simpleicons.org/polygon/7B3FE4' },
];

const DEMO_STEPS_NL = [
  { type: 'user', text: 'Deploy een staking smart contract op Solana met reward mechanisme.' },
  { type: 'chip', text: 'Blockchain development pipeline...' },
  { type: 'agent', text: 'We compileren het Anchor program en deployen naar Solana mainnet.' },
  { type: 'panel', actions: [
    { icon: Code2, bg: '#6366F1', text: 'Anchor program gecompileerd \u00b7 0 errors' },
    { icon: Shield, bg: '#3B82F6', text: 'Security audit passed \u00b7 8 checks' },
    { icon: Blocks, bg: '#8B5CF6', text: 'Deploy naar Solana mainnet \u00b7 Program ID gegenereerd' },
    { icon: Coins, bg: '#10B981', text: 'Staking pool live \u00b7 Eerste stake tx bevestigd' },
  ]},
  { type: 'result', text: 'Smart contract live op Solana \u00b7 Staking operationeel' },
];


const capabilities = [
  {
    icon: Code2,
    title: 'Smart Contracts', desc: 'Solidity voor Ethereum & Polygon, Rust/Anchor voor Solana. Geaudit, gas-geoptimaliseerd en production-ready.', tech: 'Solidity \u00b7 Rust \u00b7 Anchor',
  },
  {
    icon: TrendingUp,
    title: 'DeFi & Staking', desc: 'Staking pools, yield farming, liquidity protocols en token swaps. Volledig on-chain met transparante mechanismen.', tech: 'Staking \u00b7 Yield \u00b7 LP',
  },
  {
    icon: Coins,
    title: 'Token Development', desc: 'Van tokenomics design tot launch. ERC-20, SPL tokens, governance tokens en utility tokens.', tech: 'ERC-20 \u00b7 SPL \u00b7 Governance',
  },
  {
    icon: Wallet,
    title: 'Wallet Integratie', desc: 'Naadloze crypto wallet integratie met Privy, Phantom, MetaMask en WalletConnect voor de beste UX.', tech: 'Privy \u00b7 Phantom \u00b7 MetaMask',
  },
  {
    icon: Layers,
    title: 'dApp Development', desc: 'Full-stack decentralized applications met React, Next.js en blockchain backends. Van frontend tot on-chain logica.', tech: 'React \u00b7 Next.js \u00b7 Web3',
  },
  {
    icon: Server,
    title: 'Blockchain Infra', desc: 'Multi-container hosting, RPC nodes, blockchain indexers en load balancing voor schaalbare crypto platforms.', tech: 'Docker \u00b7 RPC \u00b7 Helius',
  },
];

/* ─── Demo Component ─────────────────────────── */
function BlockchainDemo() {
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const steps = DEMO_STEPS_NL;

  useEffect(() => {
    setStep(0);
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2500),
      setTimeout(() => setStep(4), 3300),
      setTimeout(() => setStep(5), 4100),
      setTimeout(() => setStep(6), 5000),
    ];
    const reset = setTimeout(() => setCycle(c => c + 1), 9000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);

  const panelStep = steps.find(s => s.type === 'panel');

  return (
    <DemoWrap
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <DemoBar>
        <span /><span /><span />
        <span className="title">Optivaize Blockchain Dev</span>
        <span className="live"><span className="liveDot" />LIVE</span>
      </DemoBar>

      <DemoBody>
        <AnimatePresence>
          <ChatRow $user>
            <ChatBubble $user
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {steps[0].text}
            </ChatBubble>
          </ChatRow>
        </AnimatePresence>

        <AnimatePresence>
          {step >= 1 && (
            <ChatRow>
              <StepChip initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6366F1', flexShrink: 0 }} />
                {steps[1].text}
              </StepChip>
            </ChatRow>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <ChatRow>
              <ChatBubble
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ borderLeft: '2px solid #6366F1' }}
              >
                <span style={{ fontSize: '10px', color: '#A5B4FC', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                  {'Blockchain Agent'}
                </span>
                {steps[2].text}
              </ChatBubble>
            </ChatRow>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <AgentPanel initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <AgentPanelHeader>
                <span className="pulse" />
                {'Blockchain Agent \u00b7 Bouwen & Deployen'}
              </AgentPanelHeader>
              {panelStep?.actions.map((action, i) => {
                const Icon = action.icon;
                return step >= 3 + i ? (
                  <ActionRow key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                    <ActionIcon $bg={action.bg}><Icon size={11} /></ActionIcon>
                    <ActionText>{action.text}</ActionText>
                    <ActionCheck initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 320 }}>✓</ActionCheck>
                  </ActionRow>
                ) : null;
              })}
            </AgentPanel>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 6 && (
            <ResultBadge initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle size={12} style={{ flexShrink: 0 }} />
              {steps[4].text}
            </ResultBadge>
          )}
        </AnimatePresence>
      </DemoBody>
    </DemoWrap>
  );
}

/* ─── Page ───────────────────────────────────── */
export default function SubsidyPage() {

  const stepsData = [
    { num: '01', title: 'Architectuur & Design', desc: 'We analyseren je use case en ontwerpen de optimale blockchain architectuur. Welke chain, welk consensus mechanisme, welke token standaard.' },
    { num: '02', title: 'Smart Contract Development', desc: 'We bouwen, testen en auditen je smart contracts. Van Solidity tot Rust/Anchor, met uitgebreide test coverage en security checks.' },
    { num: '03', title: 'Deploy & Integratie', desc: 'We deployen naar mainnet en integreren met je frontend, wallets en backend systemen. Volledig end-to-end, van concept tot live platform.' },
  ];

  const statsData = [
    { num: '3+', label: 'Blockchain platforms' },
    { num: '50+', label: 'Smart contracts deployed' },
    { num: 'End-to-end', label: 'Van concept tot mainnet' },
    { num: '24/7', label: 'On-chain monitoring' },
  ];

  const caseData = {
    title: 'StakePVP',
    sub: 'Game Platform & Blockchain Integratie',
    desc: 'Optivaize bouwde een compleet game platform met 3 volledig functionele games en blockchain integratie op de Solana blockchain. Multi-container hosting, Privy wallet integratie en in-game crypto transacties.',
    results: [
      { value: '3 games', label: 'Volledig functioneel gebouwd', color: '#10B981' },
      { value: 'Solana', label: 'Blockchain integratie met Privy', color: '#3B82F6' },
      { value: 'Schaalbaar', label: 'Multi-container infra', color: '#8B5CF6' },
      { value: '10+ services', label: 'Privy, Solana, Helius', color: '#F59E0B' },
    ],
  };

  const c = caseData;

  return (
    <>
      <SEOHead
        title="Crypto en Blockchain Ontwikkeling | Optivaize, De Bilt"
        description="Blockchain-oplossingen en crypto-integraties voor bedrijven. Smart contracts, DeFi en Web3 ontwikkeling door Optivaize vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/crypto-blockchain"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[{name:"Home",url:"https://optivaize.nl"},{name:"Crypto & Blockchain",url:"https://optivaize.nl/crypto-blockchain"}]}
      />
      {/* ── HERO ── */}
      <HeroWrap>
        <HeroBg />
        <Container>
          <HeroInner>
            <Badge
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Blocks size={12} />
              Blockchain Development
            </Badge>

            <HeroH1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {<>Wij bouwen software op de <GradientText>blockchain</GradientText></>}
            </HeroH1>

            <HeroP
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {'Van smart contracts tot complete crypto platforms. Wij ontwikkelen end-to-end blockchain oplossingen op Solana, Ethereum en Polygon.'}
            </HeroP>

            <ChainRow
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {CHAINS.map((chain, i) => (
                <ChainItem key={i}>
                  <img src={chain.logo} alt={chain.name} />
                  <span>{chain.name}</span>
                </ChainItem>
              ))}
            </ChainRow>

            <HeroBtns
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <BtnPrimary
                href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(99,102,241,0.45)' }}
                whileTap={{ scale: 0.97 }}
              >
                {'Plan een gesprek'}
                <ArrowRight size={17} />
              </BtnPrimary>
              <BtnSecondary href="/cases" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {'Bekijk onze cases'}
              </BtnSecondary>
            </HeroBtns>
          </HeroInner>

          {/* Blockchain Network Graphic */}
          <ChainVisual
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ChainNode initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
              <img src="https://cdn.simpleicons.org/solana/A5B4FC" alt="Solana" />
              <span className="label">Solana</span>
              <span className="sub">Rust / Anchor</span>
            </ChainNode>
            <ChainConnector />
            <ChainNode initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
              <Code2 size={22} className="node-icon" />
              <span className="label">{'Smart Contracts'}</span>
              <span className="sub">{'Geaudit & Getest'}</span>
            </ChainNode>
            <ChainConnector />
            <ChainNode $center initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
              <Blocks size={26} color="white" />
              <span className="label">Optivaize</span>
              <span className="sub" style={{ color: 'rgba(255,255,255,0.6)' }}>End-to-end</span>
            </ChainNode>
            <ChainConnector />
            <ChainNode initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}>
              <Coins size={22} className="node-icon" />
              <span className="label">DeFi & Tokens</span>
              <span className="sub">{'Staking & Yield'}</span>
            </ChainNode>
            <ChainConnector />
            <ChainNode initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
              <img src="https://cdn.simpleicons.org/ethereum/A5B4FC" alt="Ethereum" />
              <span className="label">Ethereum</span>
              <span className="sub">Solidity / EVM</span>
            </ChainNode>
          </ChainVisual>
        </Container>
      </HeroWrap>

      {/* ── STATS ── */}
      <StatsSection>
        <Container>
          <StatsGrid>
            {statsData.map((stat, i) => (
              <StatCard
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <StatNum>{stat.num}</StatNum>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>

      {/* ── HOW IT WORKS ── */}
      <HowSection>
        <Container>
          <SectionHeader>
            <SectionLabel>{'Ons proces'}</SectionLabel>
            <FadeIn>
              <SectionTitle>
                {'Van idee tot mainnet'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub>
                {'Wij begeleiden het hele traject van blockchain development, van architectuur tot deployment.'}
              </SectionSub>
            </FadeIn>
          </SectionHeader>

          <StepsGrid>
            {stepsData.map((s, i) => (
              <StepCard
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <StepNum>{s.num}</StepNum>
                <StepTitle>{s.title}</StepTitle>
                <StepDesc>{s.desc}</StepDesc>
              </StepCard>
            ))}
          </StepsGrid>
        </Container>
      </HowSection>

      {/* ── CAPABILITIES ── */}
      <CapSection>
        <Container>
          <SectionHeader>
            <SectionLabel>{'Wat wij bouwen'}</SectionLabel>
            <FadeIn>
              <SectionTitle>
                {'Blockchain expertise'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub>
                {'Van smart contracts tot volledige decentralized applications, wij bouwen het.'}
              </SectionSub>
            </FadeIn>
          </SectionHeader>

          <CapGrid>
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <CapCard
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <CapIcon><Icon size={22} /></CapIcon>
                  <CapTitle>{cap.title}</CapTitle>
                  <CapDesc>{cap.desc}</CapDesc>
                  <CapTech>{cap.tech}</CapTech>
                </CapCard>
              );
            })}
          </CapGrid>
        </Container>
      </CapSection>

      {/* ── CASE STUDY: STAKEPVP ── */}
      <CaseSection>
        <Container>
          <SectionHeader>
            <SectionLabel style={{ color: '#A5B4FC' }}>Case Study</SectionLabel>
            <FadeIn>
              <SectionTitle style={{ color: 'white' }}>
                {c.title}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.1}>
              <SectionSub style={{ color: 'rgba(255,255,255,0.55)' }}>
                {c.sub}
              </SectionSub>
            </FadeIn>
          </SectionHeader>

          <CaseGrid>
            <CaseVisual
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/images/stakepvp_logo.webp" alt="StakePVP" />
              <CaseVisualChains>
                <img src="https://cdn.simpleicons.org/solana/A5B4FC" alt="Solana" />
                <img src="https://cdn.simpleicons.org/ethereum/A5B4FC" alt="Ethereum" />
                <img src="https://cdn.simpleicons.org/polygon/A5B4FC" alt="Polygon" />
              </CaseVisualChains>
            </CaseVisual>

            <CaseInfo>
              <FadeIn>
                <CaseDesc>{c.desc}</CaseDesc>
                <CaseResults>
                  {c.results.map((r, i) => (
                    <CaseResultCard key={i}>
                      <CaseResultValue $color={r.color}>{r.value}</CaseResultValue>
                      <CaseResultLabel>{r.label}</CaseResultLabel>
                    </CaseResultCard>
                  ))}
                </CaseResults>
                <CasePartners>
                  <span className="label">Tech stack</span>
                  <img src="/images/privy_logo.webp" alt="Privy" />
                  <img src="/images/helius_logo.webp" alt="Helius" />
                  <img src="/images/stakepvp_logo.webp" alt="StakePVP" />
                </CasePartners>
              </FadeIn>
            </CaseInfo>
          </CaseGrid>
        </Container>
      </CaseSection>

      {/* ── CTA ── */}
      <CTASection>
        <Container>
          <FadeIn>
            <CTABox whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              <CTATitle>
                {'Klaar om op de blockchain te bouwen?'}
              </CTATitle>
              <CTASub>
                Van smart contracts tot complete crypto platforms. Vertel ons over je project en wij bouwen het.
              </CTASub>
              <CTABtns>
                <CTABtnWhite
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {'Plan een gesprek'}
                  <ArrowRight size={17} />
                </CTABtnWhite>
              </CTABtns>
            </CTABox>
          </FadeIn>
        </Container>
      </CTASection>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Bot, MessageCircle, Zap, Target, TrendingUp, CheckCircle, ArrowRight, Users, Globe, ChevronRight, BarChart3 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';


const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

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
      radial-gradient(ellipse 40% 40% at 10% 50%, rgba(16,185,129,0.06), transparent);
  }
`;

const PageHeroInner = styled.div`
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
  a { color: #475569; transition: color 0.2s; &:hover { color: #94A3B8; } }
`;

const PageBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(59,130,246,0.15);
  border: 1px solid rgba(59,130,246,0.3);
  color: #60A5FA;
  font-size: 12px;
  font-weight: 700;
  padding: 0.35rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PageH1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
`;

const PageDesc = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 620px;
`;

const PageCTA = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(59,130,246,0.35);
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

const Section = styled.section`
  padding: ${props => props.$compact ? '5rem 0' : '7rem 0'};
  background: ${props => props.$dark ? '#0F172A' : props.$gray ? '#F8FAFC' : 'white'};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.$light ? '#60A5FA' : '#3B82F6'};
  margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem);
  font-weight: 800;
  color: ${props => props.$light ? 'white' : '#0F172A'};
  margin-bottom: 1.25rem;
  line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px;
  color: ${props => props.$light ? '#94A3B8' : '#475569'};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const FeatureCheck = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16,185,129,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10B981;
  flex-shrink: 0;
  margin-top: 2px;
`;

const FeatureText = styled.div`
  font-size: 15px;
  color: ${props => props.$light ? '#CBD5E1' : '#334155'};
  line-height: 1.5;
`;

/* ─── Agent Network Diagram ─── */
const NetworkDiagram = styled.div`
  background: #F8FAFC;
  border-radius: 24px;
  border: 1px solid #E2E8F0;
  padding: 2rem;
`;

const MainAgentCard = styled(motion.div)`
  background: ${GRADIENT};
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(59,130,246,0.25);
`;

const MainAgentIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MainAgentText = styled.div`
  .name { font-size: 15px; font-weight: 700; color: white; }
  .sub  { font-size: 12px; color: rgba(255,255,255,0.75); margin-top: 2px; }
`;

const ConnLine = styled.div`
  width: 1px;
  height: 20px;
  background: #CBD5E1;
  margin: 0 auto;
`;

const SubAgentsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const SubAgentCard = styled(motion.div)`
  background: white;
  border-radius: 14px;
  border: 1.5px solid #E2E8F0;
  padding: 1rem;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${props => props.$color}44;
    box-shadow: 0 4px 16px ${props => props.$color}14;
    transform: translateY(-3px);
  }
`;

const SubAgentIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  margin: 0 auto 0.5rem;
`;

const SubAgentName = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.25rem;
`;

const SubAgentDesc = styled.div`
  font-size: 11px;
  color: #94A3B8;
  line-height: 1.4;
  margin-bottom: 0.5rem;
`;

const ToolTagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
`;

const ToolTag = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 9px;
  font-weight: 600;
  color: ${props => props.$color};
  background: ${props => props.$color}12;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
`;

const ToolTagImg = styled.img`
  width: 10px;
  height: 10px;
  object-fit: contain;
`;

/* ─── Channels ─── */
const ChannelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const ChannelCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1.5px solid #F1F5F9;
  text-align: center;
  transition: all 0.25s ease;
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 4px 16px ${props => props.$color}12; transform: translateY(-3px); }
`;

const ChannelIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
`;

const ChannelName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
`;

/* ─── How it works ─── */
const StepsSection = styled.section`
  padding: 7rem 0;
  background: white;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const StepCard = styled(motion.div)`
  background: #F8FAFC;
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid #F1F5F9;
  position: relative;
  overflow: hidden;

  &::before {
    content: '${props => props.$num}';
    position: absolute;
    top: -0.5rem;
    right: 1rem;
    font-size: 6rem;
    font-weight: 900;
    color: rgba(59,130,246,0.05);
    line-height: 1;
  }
`;

const StepIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1.25rem;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.75rem;
`;

const StepDesc = styled.p`
  font-size: 15px;
  color: #64748B;
  line-height: 1.6;
`;

/* ─── Stats banner ─── */
const StatsBanner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #0F172A;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCell = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.07);
  &:last-child { border-right: none; }
  @media (max-width: 900px) {
    &:nth-child(2n) { border-right: none; }
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
`;

const StatNum = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.4rem;
`;

const StatText = styled.div`
  font-size: 13px;
  color: #64748B;
  line-height: 1.4;
`;

/* ─── Use Cases ─── */
const UseCasesSection = styled.section`
  padding: 7rem 0;
  background: #F8FAFC;
`;

const UseCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const UseCaseCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1.5px solid #F1F5F9;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${props => props.$color}44;
    box-shadow: 0 6px 24px ${props => props.$color}12;
    transform: translateY(-3px);
  }
`;

const UCIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

const UCText = styled.div`
  .title { font-size: 16px; font-weight: 700; color: #0F172A; margin-bottom: 0.4rem; }
  .desc  { font-size: 14px; color: #64748B; line-height: 1.6; }
`;

const PageCTASection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const CTACard = styled(motion.div)`
  background: ${GRADIENT};
  border-radius: 24px;
  padding: 4rem;
  text-align: center;

  h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 1rem; }
  p  { font-size: 17px; color: rgba(255,255,255,0.8); margin-bottom: 2rem; max-width: 480px; margin-left: auto; margin-right: auto; }

  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTAButtonRow = styled.div`
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
  color: #3B82F6;
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

/* ─── Agent Demo ─── */
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

const DemoWrap = styled.div`
  background: #0F172A;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #1E293B;
`;

const DemoChat = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  min-height: 48px;
`;

const DemoChatAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  flex-shrink: 0;
`;

const DemoChatBubble = styled(motion.div)`
  background: #1E293B;
  border-radius: 12px 12px 12px 4px;
  padding: 0.6rem 0.9rem;
  font-size: 13px;
  color: #E2E8F0;
  line-height: 1.45;
  border: 1px solid #334155;
`;

const DemoMainRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
`;

const DemoMainCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${props => props.$active ? GRADIENT : '#1E293B'};
  border-radius: 12px;
  padding: 0.6rem 1rem;
  transition: background 0.4s ease;
  border: 1px solid ${props => props.$active ? 'transparent' : '#334155'};
`;

const DemoMainIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const DemoMainInfo = styled.div`
  font-size: 12px;
  color: white;
  .name { font-weight: 700; font-size: 13px; }
  .status { opacity: 0.7; margin-top: 1px; font-size: 11px; }
`;

const DemoConnStub = styled.div`
  width: 1px;
  height: 10px;
  background: #334155;
  margin: 0 auto;
`;

const DemoLinesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 36px;
  margin-bottom: 0.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(16.67%);
    right: calc(16.67%);
    height: 1px;
    background: #334155;
  }
`;

const DemoLineCell = styled.div`
  display: flex;
  justify-content: center;
`;

const DemoLine = styled.div`
  width: 2px;
  height: 100%;
  background: ${props => props.$active ? props.$color : '#334155'};
  position: relative;
  transition: background 0.3s ease;
  ${props => props.$active && `box-shadow: 0 0 8px ${props.$color}40;`}
`;

const DemoDot = styled.div`
  position: absolute;
  left: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
  box-shadow: 0 0 8px ${props => props.$color};
  animation: ${demoStream} 0.8s ease-in-out infinite;
`;

const DemoAgentsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const DemoAgentCard = styled.div`
  background: ${props => props.$active ? `${props.$color}12` : '#1E293B'};
  border: 1.5px solid ${props => props.$active ? `${props.$color}50` : '#334155'};
  border-radius: 12px;
  padding: 0.75rem 0.5rem;
  text-align: center;
  transition: all 0.4s ease;
  min-height: 90px;
  ${props => props.$active && `box-shadow: 0 0 20px ${props.$color}15;`}
`;

const DemoAgentIconWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.$color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  margin: 0 auto 0.4rem;
  transition: all 0.3s ease;
  ${props => props.$active && `background: ${props.$color}30;`}
`;

const DemoAgentLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #CBD5E1;
  margin-bottom: 0.4rem;
`;

const DemoActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.4rem;
`;

const DemoAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 10px;
  color: ${props => props.$color};
  animation: ${demoActionIn} 0.3s ease forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
  justify-content: center;
  svg { flex-shrink: 0; }
`;

const AGENT_TOOLS = [
  { name: 'WhatsApp', slug: 'whatsapp', bg: '#25D366' },
  { name: 'Slack', slug: null, customIcon: '/uploads/slack_logo.svg', bg: '#4A154B' },
  { name: 'Telegram', slug: 'telegram', bg: '#26A5E4' },
  { name: 'Discord', slug: 'discord', bg: '#5865F2' },
  { name: 'n8n', slug: 'n8n', bg: '#EA4B71' },
  { name: 'OpenAI', slug: null, customIcon: '/uploads/chatgpt_logo.svg', bg: '#000000' },
  { name: 'Anthropic', slug: 'anthropic', bg: '#D97706' },
  { name: 'Google', slug: 'google', bg: '#4285F4' },
];

const CHANNELS_DATA = [
  { name: 'WhatsApp', slug: 'whatsapp', color: '#25D366', bg: '#25D366', customIcon: null },
  { name: 'Slack', slug: 'slack', color: '#4A154B', bg: '#4A154B', customIcon: '/uploads/slack_logo.svg' },
  { name: 'Telegram', slug: 'telegram', color: '#26A5E4', bg: '#26A5E4', customIcon: null },
  { name: 'Discord', slug: 'discord', color: '#5865F2', bg: '#5865F2', customIcon: null },
  { name: 'Teams', slug: 'microsoftteams', color: '#6264A7', bg: '#6264A7', customIcon: '/uploads/teams_logo.svg' },
  { name: 'Gmail', slug: 'gmail', color: '#EA4335', bg: '#EA4335', customIcon: null },
  { name: 'Jira', slug: 'jira', color: '#0052CC', bg: '#0052CC', customIcon: null },
  { name: 'Notion', slug: 'notion', color: '#000000', bg: '#000000', customIcon: null },
];

const SUB_AGENT_DATA = [
  {
    icon: TrendingUp,
    color: '#10B981',
    name: 'Marketing Agent',
    desc: 'Content, SEO, ads',
    tools: [
      { name: 'GA', slug: 'googleanalytics', bg: '#E37400' },
      { name: 'Li', slug: 'linkedin', bg: '#0A66C2' },
      { name: 'WP', slug: 'wordpress', bg: '#21759B' },
    ]
  },
  {
    icon: Target,
    color: '#3B82F6',
    name: 'Sales Agent',
    desc: 'Leads, CRM, outreach',
    tools: [
      { name: 'HS', slug: 'hubspot', bg: '#FF7A59' },
      { name: 'Li', slug: 'linkedin', bg: '#0A66C2' },
      { name: 'n8', slug: 'n8n', bg: '#EA4B71' },
    ]
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    name: 'Ops Agent',
    desc: 'Processen, data, sync',
    tools: [
      { name: 'n8', slug: 'n8n', bg: '#EA4B71' },
      { name: 'SL', slug: 'slack', bg: '#4A154B' },
      { name: 'No', slug: 'notion', bg: '#000000' },
    ]
  },
];

const DEMO_QUERIES = [
  {
    msgNL: 'Schrijf een blog over AI trends en publiceer het',
    msgEN: 'Write a blog about AI trends and publish it',
    targetIdx: 0,
    routeNL: '→ Marketing Agent',
    routeEN: '→ Marketing Agent',
    actionsNL: ['Blog genereren', 'SEO optimaliseren', 'WordPress publiceren'],
    actionsEN: ['Generate blog', 'Optimise SEO', 'Publish to WordPress'],
  },
  {
    msgNL: 'Volg de nieuwe lead van HubSpot op via LinkedIn',
    msgEN: 'Follow up the new HubSpot lead via LinkedIn',
    targetIdx: 1,
    routeNL: '→ Sales Agent',
    routeEN: '→ Sales Agent',
    actionsNL: ['Lead analyseren', 'LinkedIn bericht', 'CRM bijwerken'],
    actionsEN: ['Analyse lead', 'LinkedIn message', 'Update CRM'],
  },
  {
    msgNL: 'Sync de facturen met Exact Online',
    msgEN: 'Sync invoices with Exact Online',
    targetIdx: 2,
    routeNL: '→ Ops Agent',
    routeEN: '→ Ops Agent',
    actionsNL: ['Facturen ophalen', 'Data mappen', 'Exact sync'],
    actionsEN: ['Fetch invoices', 'Map data', 'Exact sync'],
  },
];

const DEMO_AGENTS = [
  { name: 'Marketing Agent', icon: TrendingUp, color: '#10B981' },
  { name: 'Sales Agent', icon: Target, color: '#3B82F6' },
  { name: 'Ops Agent', icon: Zap, color: '#8B5CF6' },
];

function AgentDemo({ isNL }) {
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
    <DemoWrap>
      <DemoChat>
        <DemoChatAvatar><Users size={13} /></DemoChatAvatar>
        <DemoChatBubble
          key={qIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {isNL ? q.msgNL : q.msgEN}
        </DemoChatBubble>
      </DemoChat>

      <DemoMainRow>
        <DemoMainCard $active={phase >= 1}>
          <DemoMainIcon><Bot size={16} /></DemoMainIcon>
          <DemoMainInfo>
            <div className="name">OpenClaw Main Agent</div>
            <div className="status">
              {phase === 0 ? '...' : phase === 1 ? (isNL ? 'Analyseren...' : 'Analysing...') : (isNL ? q.routeNL : q.routeEN)}
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
                  {(isNL ? q.actionsNL : q.actionsEN).map((action, j) => (
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
    </DemoWrap>
  );
}

/* ─── Video Section ──────────────────────────── */
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

function ClickVideo({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) videoRef.current.play();
    }, 50);
  };

  const videoSrc = process.env.PUBLIC_URL + src;
  const thumbSrc = process.env.PUBLIC_URL + thumbnail;

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

function AIAgentsPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const steps = isNL ? [
    { icon: MessageCircle, num: '1', title: 'Verzoek indienen', desc: 'Een medewerker stuurt een bericht via Slack, WhatsApp of Teams. Net als een chatgesprek.' },
    { icon: Bot, num: '2', title: 'Hoofd-agent analyseert', desc: 'De OpenClaw Main Agent analyseert het verzoek en bepaalt welke sub-agent(s) het beste kunnen helpen.' },
    { icon: CheckCircle, num: '3', title: 'Sub-agents handelen', desc: 'De juiste sub-agents nemen het over, voeren de taak uit en rapporteren de uitkomst.' },
  ] : [
    { icon: MessageCircle, num: '1', title: 'Submit a request', desc: 'An employee sends a message via Slack, WhatsApp or Teams. Just like a chat conversation.' },
    { icon: Bot, num: '2', title: 'Main agent analyses', desc: 'The OpenClaw Main Agent analyses the request and determines which sub-agent(s) can best help.' },
    { icon: CheckCircle, num: '3', title: 'Sub-agents execute', desc: 'The right sub-agents take over, execute the task and report the outcome.' },
  ];

  const useCases = [
    { icon: TrendingUp, color: '#10B981', title: isNL ? 'Marketing automatisering' : 'Marketing automation', desc: isNL ? 'Agent schrijft blogs, optimaliseert SEO, beheert Google Ads en plaatst social content, zonder handmatig werk.' : 'Agent writes blogs, optimises SEO, manages Google Ads and posts social content, without manual work.' },
    { icon: Target, color: '#3B82F6', title: isNL ? 'Sales opvolging' : 'Sales follow-up', desc: isNL ? 'Leads worden automatisch gekwalificeerd, bijgehouden in HubSpot en opgevolgd via gepersonaliseerde berichten.' : 'Leads are automatically qualified, tracked in HubSpot and followed up via personalised messages.' },
    { icon: Zap, color: '#8B5CF6', title: isNL ? 'Operations & rapportages' : 'Operations & reporting', desc: isNL ? 'Processen geautomatiseerd, platforms gesynchroniseerd via n8n en rapporten dagelijks gegenereerd.' : 'Processes automated, platforms synchronised via n8n and reports generated daily.' },
    { icon: Globe, color: '#F59E0B', title: isNL ? 'Klantenservice 24/7' : 'Customer service 24/7', desc: isNL ? 'AI chatbot beantwoordt vragen, escaleert complexe gevallen naar mensen en werkt altijd door.' : 'AI chatbot answers questions, escalates complex cases to humans and always keeps working.' },
    { icon: BarChart3, color: '#EF4444', title: isNL ? 'Finance & cashflow' : 'Finance & cashflow', desc: isNL ? 'Agent logt in op boekhoudtools zoals Exact Online, analyseert cashflow en stuurt samenvattingen.' : 'Agent logs into accounting tools like Exact Online, analyses cashflow and sends summaries.' },
    { icon: Users, color: '#EC4899', title: isNL ? 'HR & onboarding' : 'HR & onboarding', desc: isNL ? 'Automatische onboarding flows, taaklijsten en kennisoverdracht voor nieuwe medewerkers.' : 'Automatic onboarding flows, task lists and knowledge transfer for new employees.' },
  ];

  const features = isNL ? [
    'Werkt 24/7 zonder pauze of vakantie',
    'Integreert met al je bestaande tools en platforms',
    'Leert van elke interactie en wordt steeds slimmer',
    'Volledig aanpasbaar aan je bedrijfsprocessen',
    'Veilig, privacygericht en zelf te hosten',
    'Gebouwd op ons eigen OpenClaw framework',
  ] : [
    'Works 24/7 without breaks or holidays',
    'Integrates with all your existing tools and platforms',
    'Learns from every interaction and gets smarter',
    'Fully customisable to your business processes',
    'Secure, privacy-focused and self-hostable',
    'Built on our own OpenClaw framework',
  ];

  return (
    <>
      <PageHero>
        <Container>
          <PageHeroInner>
            <Breadcrumb>
              <Link to="/">Home</Link>
              <ChevronRight size={14} />
              <span>{isNL ? 'Diensten' : 'Services'}</span>
              <ChevronRight size={14} />
              <span>AI Agents</span>
            </Breadcrumb>
            <PageBadge><Bot size={12} /> OpenClaw</PageBadge>
            <PageH1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {isNL ? (
                <>AI Agents die je team <span style={{ color: '#60A5FA' }}>versterken</span></>
              ) : (
                <>AI Agents that <span style={{ color: '#60A5FA' }}>amplify</span> your team</>
              )}
            </PageH1>
            <PageDesc
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {isNL
                ? 'OpenClaw is ons eigen multi-agent framework voor bedrijven. Een hoofd-agent ontvangt verzoeken en distribueert taken naar gespecialiseerde sub-agents, volledig autonoom, via de tools die je team al gebruikt.'
                : 'OpenClaw is our own multi-agent framework for businesses. One main agent receives requests and distributes tasks to specialised sub-agents , fully autonomously, via the tools your team already uses.'}
            </PageDesc>
            <PageCTA
              href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isNL ? 'Plan een demo' : 'Book a demo'}
              <ArrowRight size={17} />
            </PageCTA>
          </PageHeroInner>
        </Container>
      </PageHero>

      {/* Tools strip */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>{isNL ? 'Platforms en tools waarmee onze agents werken' : 'Platforms and tools our agents work with'}</ToolsLabel>
          <ToolsRow>
            {AGENT_TOOLS.map((t, i) => (
              <ToolChip key={i}>
                <ToolLogoBg $bg={t.bg}>
                  {(t.slug || t.customIcon) ? (
                    <ToolLogo
                      src={t.customIcon || `https://cdn.simpleicons.org/${t.slug}/FFFFFF`}
                      alt={t.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'white' }}>{t.label || t.name.substring(0,2)}</span>
                  )}
                </ToolLogoBg>
                {t.name}
              </ToolChip>
            ))}
          </ToolsRow>
        </Container>
      </ToolsStrip>

      {/* Stats */}
      <Section>
        <Container>
          <FadeIn>
            <StatsBanner>
              <StatCell><StatNum>90%</StatNum><StatText>{isNL ? 'Van interne verzoeken geautomatiseerd' : 'Of internal requests automated'}</StatText></StatCell>
              <StatCell><StatNum>24/7</StatNum><StatText>{isNL ? 'Actief zonder onderbreking' : 'Active without interruption'}</StatText></StatCell>
              <StatCell><StatNum>8+</StatNum><StatText>{isNL ? 'Communicatiekanalen ondersteund' : 'Communication channels supported'}</StatText></StatCell>
              <StatCell><StatNum>3×</StatNum><StatText>{isNL ? 'Meer output met zelfde team' : 'More output with same team'}</StatText></StatCell>
            </StatsBanner>
          </FadeIn>
        </Container>
      </Section>

      {/* Agent architecture */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'Architectuur' : 'Architecture'}</SectionLabel>
              <SectionTitle>{isNL ? 'Een hoofd-agent, oneindig veel mogelijkheden' : 'One main agent, infinite possibilities'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'OpenClaw gebruikt een Gateway-architectuur. De Main Agent is de regisseur die verzoeken analyseert en delegeert aan gespecialiseerde sub-agents. Elke sub-agent heeft zijn eigen tools, geheugen en bevoegdheden.'
                  : 'OpenClaw uses a Gateway architecture. The Main Agent is the director that analyses requests and delegates to specialised sub-agents. Each sub-agent has its own tools, memory and permissions.'}
              </SectionText>
              <FeatureList>
                {features.map((f, i) => (
                  <FeatureItem key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <FeatureCheck><CheckCircle size={13} /></FeatureCheck>
                    <FeatureText>{f}</FeatureText>
                  </FeatureItem>
                ))}
              </FeatureList>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AgentDemo isNL={isNL} />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Communication channels */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Communicatiekanalen' : 'Communication channels'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Je team communiceert via de tools die ze al kennen' : 'Your team communicates via the tools they already know'}</SectionTitle></FadeIn>
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

      {/* Video section */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn delay={0.1}>
              <ClickVideo src="/uploads/Openclaw intro.mp4" thumbnail="/uploads/openclaw_cool.png" />
            </FadeIn>
            <FadeIn>
              <SectionLabel>{isNL ? 'Voor je bedrijf' : 'For your business'}</SectionLabel>
              <SectionTitle>{isNL ? 'Gebouwd voor de manier waarop je team werkt' : 'Built for the way your team works'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Wij configureren OpenClaw specifiek voor je organisatie. Je medewerkers communiceren via de tools die ze al gebruiken, geen nieuwe software te leren.'
                  : 'We configure OpenClaw specifically for your organisation. Your employees communicate via the tools they already use , no new software to learn.'}
              </SectionText>
              <SectionText>
                {isNL
                  ? 'Of het nu gaat om Slack, WhatsApp, Teams of Discord, OpenClaw werkt via je bestaande communicatiekanalen en koppelt aan je CRM, boekhouding en andere systemen.'
                  : 'Whether it\'s Slack, WhatsApp, Teams or Discord , OpenClaw works through your existing communication channels and connects to your CRM, accounting and other systems.'}
              </SectionText>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Steps */}
      <StepsSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel style={{ justifyContent: 'center', display: 'flex' }}>{isNL ? 'Hoe het werkt' : 'How it works'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'In drie stappen live' : 'Live in three steps'}</SectionTitle></FadeIn>
          </div>
          <StepsGrid>
            {steps.map((step, i) => {
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
      </StepsSection>

      {/* Use cases */}
      <UseCasesSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel style={{ justifyContent: 'center', display: 'flex' }}>{isNL ? 'Toepassingen' : 'Applications'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Wat kunnen onze agents voor je doen?' : 'What can our agents do for you?'}</SectionTitle></FadeIn>
          </div>
          <UseCaseGrid>
            {useCases.map((uc, i) => {
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
      </UseCasesSection>

      {/* CTA */}
      <PageCTASection>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{isNL ? 'Klaar voor je eigen AI Agent workforce?' : 'Ready for your own AI Agent workforce?'}</h2>
              <p>{isNL ? 'Wij bouwen een OpenClaw implementatie op maat voor je organisatie. Plan een gratis gesprek.' : 'We build a custom OpenClaw implementation for your organisation. Book a free call.'}</p>
              <CTAButtonRow>
                <BtnWhite href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Vul het formulier in' : 'Fill in the form'} <ArrowRight size={16} />
                </BtnWhite>
                <BtnOutline href="tel:+31642698918" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  {isNL ? 'Bel ons direct' : 'Call us directly'}
                </BtnOutline>
              </CTAButtonRow>
            </CTACard>
          </FadeIn>
        </Container>
      </PageCTASection>
    </>
  );
}

export default AIAgentsPage;

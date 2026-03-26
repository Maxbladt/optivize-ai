'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../components/Link';
import { Target, MessageSquare, Users, TrendingUp, Mail, ArrowRight, CheckCircle, ChevronRight, Zap, BarChart3, Monitor, Cpu, Database, Send, Globe, Calendar, ArrowDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #F59E0B, #EF4444)';

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

const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #1C0A00 0%, #0F172A 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(245,158,11,0.1), transparent),
                radial-gradient(ellipse 40% 40% at 10% 60%, rgba(239,68,68,0.06), transparent);
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
  background: rgba(245,158,11,0.15);
  border: 1px solid rgba(245,158,11,0.3);
  color: #FCD34D;
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
  box-shadow: 0 6px 20px rgba(245,158,11,0.3);
`;

const Section = styled.section`
  padding: 7rem 0;
  background: ${props => props.$gray ? '#F8FAFC' : props.$dark ? '#0F172A' : 'white'};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${props => props.$light ? '#FCD34D' : '#F59E0B'};
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 1.5px solid #F1F5F9;
  transition: all 0.25s ease;
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 6px 24px ${props => props.$color}12; transform: translateY(-4px); }
`;

const CardIcon = styled.div`
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

const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.625rem;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.6;
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

/* ─── Stats ─── */
const StatsBanner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #0F172A;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 5rem;
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

/* ─── Pipeline visualisation ─── */
const PipelineWrap = styled.div`
  background: #F8FAFC;
  border-radius: 24px;
  border: 1px solid #E2E8F0;
  padding: 2.5rem;
  overflow-x: auto;
`;

const PipelineTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94A3B8;
  margin-bottom: 2rem;
`;

const PipelineStages = styled.div`
  display: flex;
  gap: 0.5rem;
  min-width: 600px;
`;

const Stage = styled(motion.div)`
  flex: 1;
  background: white;
  border-radius: 14px;
  border: 1.5px solid ${props => props.$color}44;
  padding: 1.25rem 1rem;
  text-align: center;
  box-shadow: 0 2px 8px ${props => props.$color}10;
`;

const StageIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  margin: 0 auto 0.75rem;
`;

const StageName = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.25rem;
`;

const StageCount = styled.div`
  font-size: 11px;
  color: #94A3B8;
`;

const StageArrow = styled.div`
  color: #CBD5E1;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 0.25rem;
`;

const CTACard = styled(motion.div)`
  background: ${GRADIENT};
  border-radius: 24px;
  padding: 4rem;
  text-align: center;
  h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; color: white; margin-bottom: 1rem; }
  p  { font-size: 17px; color: rgba(255,255,255,0.85); margin-bottom: 2rem; }
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
  color: #F59E0B;
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

/* ─── Agent animations ─── */
const agentPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); }
  50% { box-shadow: 0 0 0 24px rgba(245,158,11,0); }
`;

const flowPulse = keyframes`
  0% { opacity: 0; transform: translateY(-100%); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(200%); }
`;

/* ─── AI Agent visual ─── */
const AgentToolsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.875rem;
`;

const AgentToolPill = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: rgba(255,255,255,0.05);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 0.75rem 1.25rem;
`;

const AgentToolLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  img { width: 18px; height: 18px; object-fit: contain; }
`;

const AgentToolLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #CBD5E1;
`;

const AgentFlowArrows = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.25rem 0;
`;

const AgentFlowLine = styled.div`
  width: 2px;
  height: 40px;
  background: #1E293B;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 100%;
    background: linear-gradient(180deg, transparent, ${p => p.$color || '#F59E0B'}, transparent);
    animation: ${flowPulse} 2s ease-in-out infinite;
    animation-delay: ${p => p.$delay || '0s'};
  }
`;

const AgentCircle = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.12));
  border: 2px solid rgba(245,158,11,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  animation: ${agentPulse} 3s ease-in-out infinite;
`;

const AgentName = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: white;
  margin-top: 0.75rem;
  text-align: center;
`;

const AgentSub = styled.div`
  font-size: 11px;
  color: #94A3B8;
  text-align: center;
`;

const AgentActionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const AgentActionCard = styled(motion.div)`
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
`;

const AgentActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${p => p.$color}15;
  border: 1px solid ${p => p.$color}25;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin: 0 auto 0.625rem;
`;

const AgentActionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const AgentActionSub = styled.div`
  font-size: 11px;
  color: #64748B;
  margin-top: 0.2rem;
`;

const CRM_TOOLS = [
  { name: 'HubSpot', slug: 'hubspot', bg: '#FF7A59' },
  { name: 'Salesforce', slug: null, customIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg', bg: '#00A1E0' },
  { name: 'Pipedrive', slug: null, bg: '#28A745', label: 'P' },
  { name: 'LinkedIn Sales', slug: null, customIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png', bg: '#0A66C2' },
  { name: 'n8n', slug: 'n8n', bg: '#EA4B71' },
  { name: 'Gmail', slug: 'gmail', bg: '#EA4335' },
  { name: 'Slack', slug: null, customIcon: '/uploads/slack_logo.svg', bg: '#4A154B' },
  { name: 'ActiveCampaign', slug: null, bg: '#356AE6', label: 'AC' },
];

const PIPELINE_STAGES = [
  { icon: Target, color: '#3B82F6', name: 'Prospecting', countNL: '500+ / maand', countEN: '500+ / month' },
  { icon: MessageSquare, color: '#10B981', name: 'Outreach', countNL: 'Geautomatiseerd', countEN: 'Automated' },
  { icon: Users, color: '#F59E0B', nameNL: 'Kwalificatie', nameEN: 'Qualification', countNL: 'AI-gestuurd', countEN: 'AI-driven' },
  { icon: TrendingUp, color: '#EC4899', name: 'Demo / Call', countNL: 'Geboekt door AI', countEN: 'Booked by AI' },
  { icon: Zap, color: '#8B5CF6', name: 'Closing', countNL: 'CRM bijgewerkt', countEN: 'CRM updated' },
];

function SalesPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const services = [
    { icon: Mail, color: '#0A66C2', title: isNL ? 'LinkedIn Sales Agent' : 'LinkedIn Sales Agent', desc: isNL ? 'Gepersonaliseerde connection requests, follow-ups en berichten , volledig geautomatiseerd en menselijk klinkend.' : 'Personalised connection requests, follow-ups and messages , fully automated and sounding human.' },
    { icon: MessageSquare, color: '#10B981', title: isNL ? 'AI Kwalificatie Chatbot' : 'AI Qualification Chatbot', desc: isNL ? 'Een chatbot die leads kwalificeert, bezwaren beantwoordt en meetings plant , 24/7, ook buiten kantooruren.' : 'A chatbot that qualifies leads, answers objections and books meetings , 24/7, even outside office hours.' },
    { icon: Mail, color: '#3B82F6', title: isNL ? 'Geautomatiseerde E-mail Sequences' : 'Automated Email Sequences', desc: isNL ? 'AI schrijft en verstuurt gepersonaliseerde e-mail sequences op basis van gedrag, profiel en interacties.' : 'AI writes and sends personalised email sequences based on behaviour, profile and interactions.' },
    { icon: Target, color: '#F59E0B', title: isNL ? 'Conversie-optimalisatie' : 'Conversion Optimisation', desc: isNL ? 'Analyseer waar leads afhaken en optimaliseer je funnel continu met AI-inzichten en A/B-testen.' : 'Analyse where leads drop off and continuously optimise your funnel with AI insights and A/B testing.' },
    { icon: BarChart3, color: '#EC4899', title: isNL ? 'CRM Automatisering' : 'CRM Automation', desc: isNL ? 'Leads worden automatisch aangemaakt, gescoord en opgevolgd in HubSpot, Salesforce of je CRM naar keuze.' : 'Leads automatically created, scored and followed up in HubSpot, Salesforce or your CRM of choice.' },
    { icon: Zap, color: '#8B5CF6', title: isNL ? 'Sales Intelligence' : 'Sales Intelligence', desc: isNL ? 'AI analyseert je pipeline en geeft concrete aanbevelingen voor betere conversie, dagelijks bijgewerkt.' : 'AI analyses your pipeline and provides concrete recommendations for better conversion, updated daily.' },
  ];

  return (
    <>
      <SEOHead
        title="AI Sales Automatisering | Optivaize, De Bilt"
        description="Automatiseer je salesproces met AI. LinkedIn outreach, lead generatie en CRM-integraties. Optivaize bouwt slimme sales tools in De Bilt."
        canonicalUrl="https://optivaize.nl/ai-sales"
        ogImage="https://optivaize.nl/uploads/optivaize_logo_new.png"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'AI Sales', url: 'https://optivaize.nl/ai-sales' }
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
              <span>AI Sales</span>
            </Breadcrumb>
            <Badge><Target size={12} /> AI Sales & Conversie</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {isNL ? (
                <>Meer leads. Betere conversie. <span style={{ color: '#FCD34D' }}>Automatisch.</span></>
              ) : (
                <>More leads. Better conversion. <span style={{ color: '#FCD34D' }}>Automatically.</span></>
              )}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {isNL
                ? 'Wij bouwen AI-systemen die je salesproces schalen zonder extra headcount. Van prospecting tot closing, AI doet het zware werk terwijl je team deals sluit.'
                : 'We build AI systems that scale your sales process without extra headcount. From prospecting to closing , AI does the heavy lifting while your team closes deals.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {isNL ? 'Schaal je sales' : 'Scale your sales'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* CRM tools strip */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>{isNL ? 'CRM-platforms en tools die wij ondersteunen' : 'CRM platforms and tools we support'}</ToolsLabel>
          <ToolsRow>
            {CRM_TOOLS.map((t, i) => (
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

      {/* Stats */}
      <Section>
        <Container>
          <FadeIn>
            <StatsBanner>
              <StatCell><StatNum>3×</StatNum><StatText>{isNL ? 'Meer qualified leads' : 'More qualified leads'}</StatText></StatCell>
              <StatCell><StatNum>60%</StatNum><StatText>{isNL ? 'Minder tijd aan prospecting' : 'Less time on prospecting'}</StatText></StatCell>
              <StatCell><StatNum>40%</StatNum><StatText>{isNL ? 'Kortere sales-cycle' : 'Shorter sales cycle'}</StatText></StatCell>
              <StatCell><StatNum>24/7</StatNum><StatText>{isNL ? 'Outreach zonder pauze' : 'Outreach without pause'}</StatText></StatCell>
            </StatsBanner>
          </FadeIn>

          {/* Sales pipeline visual */}
          <FadeIn delay={0.1}>
            <PipelineWrap>
              <PipelineTitle>{isNL ? 'Geautomatiseerde sales pipeline' : 'Automated sales pipeline'}</PipelineTitle>
              <PipelineStages>
                {PIPELINE_STAGES.map((stage, i) => {
                  const Icon = stage.icon;
                  return (
                    <React.Fragment key={i}>
                      <Stage $color={stage.color} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                        <StageIcon $color={stage.color}><Icon size={18} /></StageIcon>
                        <StageName>{isNL ? (stage.nameNL || stage.name) : (stage.nameEN || stage.name)}</StageName>
                        <StageCount>{isNL ? stage.countNL : stage.countEN}</StageCount>
                      </Stage>
                      {i < PIPELINE_STAGES.length - 1 && (
                        <StageArrow><ChevronRight size={16} /></StageArrow>
                      )}
                    </React.Fragment>
                  );
                })}
              </PipelineStages>
            </PipelineWrap>
          </FadeIn>
        </Container>
      </Section>

      {/* AI Agent Browser Visual */}
      <Section $dark>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SectionLabel $light style={{ display: 'flex', justifyContent: 'center' }}>AI Sales Agent</SectionLabel>
            <FadeIn>
              <SectionTitle $light style={{ textAlign: 'center' }}>
                {isNL ? 'Je AI Agent bestuurt de browser' : 'Your AI Agent controls the browser'}
              </SectionTitle>
            </FadeIn>
            <FadeIn delay={0.05}>
              <SectionText $light style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
                {isNL
                  ? 'Onze AI Sales Agent gebruikt je Chrome browser om LinkedIn-profielen te analyseren, e-mails te versturen, CRM bij te werken en meetings te plannen.'
                  : 'Our AI Sales Agent uses your Chrome browser to analyse LinkedIn profiles, send emails, update CRM and schedule meetings.'}
              </SectionText>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <AgentToolsRow>
              {[
                { name: 'LinkedIn', bg: '#0A66C2', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png' },
                { name: 'Gmail', bg: '#EA4335', logo: '/uploads/gmail.png' },
                { name: 'Salesforce', bg: '#00A1E0', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
                { name: 'HubSpot', bg: '#FF7A59', logo: 'https://cdn.simpleicons.org/hubspot/FFFFFF' },
                { name: 'Calendar', bg: '#4285F4', icon: Calendar },
              ].map((tool, i) => (
                <AgentToolPill key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <AgentToolLogo $bg={tool.bg}>
                    {tool.logo ? <img src={tool.logo} alt={tool.name} /> : tool.icon && <tool.icon size={16} color="white" />}
                  </AgentToolLogo>
                  <AgentToolLabel>{tool.name}</AgentToolLabel>
                </AgentToolPill>
              ))}
            </AgentToolsRow>
          </FadeIn>

          <AgentFlowArrows>
            <AgentFlowLine $color="#0A66C2" $delay="0s" />
            <AgentFlowLine $color="#EA4335" $delay="0.3s" />
            <AgentFlowLine $color="#F59E0B" $delay="0.6s" />
          </AgentFlowArrows>

          <FadeIn delay={0.2}>
            <div style={{ textAlign: 'center' }}>
              <AgentCircle
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Monitor size={32} color="#FCD34D" />
              </AgentCircle>
              <AgentName>AI Sales Agent</AgentName>
              <AgentSub>{isNL ? 'Bestuurt je Chrome browser' : 'Controls your Chrome browser'}</AgentSub>
            </div>
          </FadeIn>

          <AgentFlowArrows>
            <AgentFlowLine $color="#10B981" $delay="0s" />
            <AgentFlowLine $color="#8B5CF6" $delay="0.3s" />
            <AgentFlowLine $color="#EC4899" $delay="0.6s" />
          </AgentFlowArrows>

          <FadeIn delay={0.3}>
            <AgentActionRow>
              {[
                { icon: Send, color: '#0A66C2', title: isNL ? 'LinkedIn outreach' : 'LinkedIn outreach', sub: isNL ? 'Gepersonaliseerde berichten' : 'Personalised messages' },
                { icon: Mail, color: '#EA4335', title: isNL ? 'E-mail follow-up' : 'Email follow-up', sub: isNL ? 'Automatische sequences' : 'Automated sequences' },
                { icon: Database, color: '#8B5CF6', title: isNL ? 'CRM bijwerken' : 'Update CRM', sub: isNL ? 'Alle data gesynchroniseerd' : 'All data synchronised' },
                { icon: Calendar, color: '#10B981', title: isNL ? 'Meetings plannen' : 'Schedule meetings', sub: isNL ? 'Direct in je agenda' : 'Directly in your calendar' },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <AgentActionCard key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}>
                    <AgentActionIcon $color={action.color}><Icon size={16} /></AgentActionIcon>
                    <AgentActionTitle>{action.title}</AgentActionTitle>
                    <AgentActionSub>{action.sub}</AgentActionSub>
                  </AgentActionCard>
                );
              })}
            </AgentActionRow>
          </FadeIn>
        </Container>
      </Section>

      {/* Services grid */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Onze AI Sales diensten' : 'Our AI Sales services'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Je salesteam keer tien, zonder extra personeel' : 'Your sales team times ten, without extra staff'}</SectionTitle></FadeIn>
          </div>
          <CardGrid>
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <Card $color={s.color} whileHover={{ y: -4 }}>
                    <CardIcon $color={s.color}><Icon size={22} /></CardIcon>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDesc>{s.desc}</CardDesc>
                  </Card>
                </FadeIn>
              );
            })}
          </CardGrid>
        </Container>
      </Section>

      {/* Lead automation flow */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>
              {isNL ? 'Lead opvolging' : 'Lead follow-up'}
            </SectionLabel>
            <FadeIn>
              <SectionTitle style={{ textAlign: 'center' }}>
                {isNL ? 'Automatische opvolging met AI' : 'Automatic follow-up with AI'}
              </SectionTitle>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <PipelineWrap>
              <PipelineTitle>{isNL ? 'Van lead tot meeting - volledig geautomatiseerd' : 'From lead to meeting - fully automated'}</PipelineTitle>
              <PipelineStages>
                {[
                  { icon: Globe, color: '#3B82F6', name: isNL ? 'Nieuwe lead' : 'New lead', count: isNL ? 'Website of LinkedIn' : 'Website or LinkedIn' },
                  { icon: Cpu, color: '#F59E0B', name: isNL ? 'AI analyseert' : 'AI analyzes', count: isNL ? 'Profiel & bedrijf' : 'Profile & company' },
                  { icon: Send, color: '#10B981', name: isNL ? 'Persoonlijke actie' : 'Personal action', count: isNL ? 'E-mail of LinkedIn' : 'Email or LinkedIn' },
                  { icon: Database, color: '#8B5CF6', name: isNL ? 'CRM bijgewerkt' : 'CRM updated', count: isNL ? 'Automatisch' : 'Automatically' },
                  { icon: Calendar, color: '#EC4899', name: isNL ? 'Meeting geboekt' : 'Meeting booked', count: isNL ? 'In je agenda' : 'In your calendar' },
                ].map((stage, i, arr) => {
                  const Icon = stage.icon;
                  return (
                    <React.Fragment key={i}>
                      <Stage $color={stage.color} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                        <StageIcon $color={stage.color}><Icon size={18} /></StageIcon>
                        <StageName>{stage.name}</StageName>
                        <StageCount>{stage.count}</StageCount>
                      </Stage>
                      {i < arr.length - 1 && <StageArrow><ChevronRight size={16} /></StageArrow>}
                    </React.Fragment>
                  );
                })}
              </PipelineStages>
            </PipelineWrap>
          </FadeIn>

          <div style={{ marginTop: '3rem' }}>
            <FadeIn delay={0.15}>
              <SectionText style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
                {isNL
                  ? 'Wanneer een lead binnenkomt via je website, LinkedIn of e-mail, analyseert onze AI het profiel en bedrijf. Vervolgens verstuurt het systeem automatisch een gepersonaliseerde follow-up, werkt je CRM bij en plant meetings - alles zonder handmatige tussenkomst.'
                  : 'When a lead comes in via your website, LinkedIn or email, our AI analyses the profile and company. Then the system automatically sends a personalised follow-up, updates your CRM and schedules meetings - all without manual intervention.'}
              </SectionText>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{isNL ? 'Klaar om je sales te schalen?' : 'Ready to scale your sales?'}</h2>
              <p>{isNL ? 'Laat AI het zware werk doen terwijl je team zich richt op het sluiten van deals.' : 'Let AI do the heavy lifting while your team focuses on closing deals.'}</p>
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

export default SalesPage;

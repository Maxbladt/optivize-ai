'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from '../components/Link';
import NextImage from 'next/image';
import { TrendingUp, Search, FileText, BarChart3, Target, ArrowRight, CheckCircle, ChevronRight, Image } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SEOHead from '../components/SEOHead';


const GRADIENT = 'linear-gradient(135deg, #10B981, #3B82F6)';

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
  background: linear-gradient(135deg, #064E3B 0%, #0F172A 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(16,185,129,0.12), transparent),
                radial-gradient(ellipse 40% 40% at 10% 60%, rgba(59,130,246,0.06), transparent);
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
  background: rgba(16,185,129,0.15);
  border: 1px solid rgba(16,185,129,0.3);
  color: #34D399;
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
  box-shadow: 0 6px 20px rgba(16,185,129,0.3);
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
  color: ${props => props.$light ? '#34D399' : '#10B981'};
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

const ResultsBar = styled.div`
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid #F1F5F9;
  margin-top: 1.5rem;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid #F8FAFC;
  &:last-child { border-bottom: none; }
`;

const ResultStat = styled.div`
  font-size: 22px;
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-width: 70px;
`;

const ResultDesc = styled.div`
  font-size: 14px;
  color: #475569;
`;

/* ─── Tool logo strip ─── */
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

const ToolLogo = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
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

/* ─── Channel grid ─── */
const ChannelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const ChannelCard = styled(motion.div)`
  background: white;
  border-radius: 18px;
  padding: 1.75rem 1.5rem;
  border: 1.5px solid #F1F5F9;
  text-align: center;
  transition: all 0.25s ease;
  &:hover { border-color: ${props => props.$color}44; box-shadow: 0 6px 20px ${props => props.$color}12; transform: translateY(-4px); }
`;

const ChannelIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${props => props.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const ChannelIconImg = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const ChannelName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.4rem;
`;

const ChannelDesc = styled.div`
  font-size: 12px;
  color: #64748B;
  line-height: 1.5;
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

/* ─── Process steps ─── */
const StepsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  position: relative;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 1rem; }
`;

const StepCell = styled(motion.div)`
  text-align: center;
  padding: 0 1rem;
  position: relative;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 28px;
    right: -0.5px;
    width: 1px;
    height: 24px;
    background: #E2E8F0;
    @media (max-width: 900px) { display: none; }
  }
`;

const StepNum = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${GRADIENT};
  color: white;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const StepTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.4rem;
`;

const StepDesc = styled.div`
  font-size: 12px;
  color: #64748B;
  line-height: 1.5;
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
  color: #10B981;
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

const TOOLS = [
  { name: 'Google Ads', slug: 'googleads', bg: '#4285F4', textColor: 'white' },
  { name: 'Google Analytics', slug: 'googleanalytics', bg: '#E37400', textColor: 'white' },
  { name: 'LinkedIn', slug: null, bg: '#0A66C2', textColor: 'white', customIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png' },
  { name: 'Meta Ads', slug: 'meta', bg: '#0866FF', textColor: 'white' },
  { name: 'SEMrush', slug: null, bg: '#FF642B', textColor: 'white', label: 'SR' },
  { name: 'Ahrefs', slug: null, bg: '#FF8C00', textColor: 'white', label: 'AH' },
  { name: 'WordPress', slug: 'wordpress', bg: '#21759B', textColor: 'white' },
];

const CHANNELS = [
  { name: 'Google Ads', slug: 'googleads', color: '#4285F4', bg: '#4285F4', descNL: 'Search, Display & Shopping campaigns geoptimaliseerd door AI', descEN: 'Search, Display & Shopping campaigns optimised by AI' },
  { name: 'LinkedIn', slug: 'linkedin', color: '#0A66C2', bg: '#0A66C2', descNL: 'B2B targeting, thought leadership en sponsored content', descEN: 'B2B targeting, thought leadership and sponsored content', customIcon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/3840px-LinkedIn_icon.svg.png' },
  { name: 'Meta Ads', slug: 'meta', color: '#0866FF', bg: '#0866FF', descNL: 'Facebook en Instagram ads met AI-gestuurde creatives', descEN: 'Facebook and Instagram ads with AI-driven creatives' },
  { name: 'SEO / Content', slug: 'googlesearchconsole', color: '#10B981', bg: '#10B981', descNL: 'Organische groei via AI-SEO en geautomatiseerde content', descEN: 'Organic growth via AI-SEO and automated content' },
  { name: 'E-mail', slug: 'gmail', color: '#EA4335', bg: '#EA4335', descNL: 'Gepersonaliseerde campagnes met AI-gegenereerde copy', descEN: 'Personalised campaigns with AI-generated copy' },
  { name: 'WhatsApp', slug: 'whatsapp', color: '#25D366', bg: '#25D366', descNL: 'Conversational marketing via WhatsApp Business API', descEN: 'Conversational marketing via WhatsApp Business API' },
  { name: 'Google Search', slug: 'google', color: '#4285F4', bg: '#4285F4', descNL: 'Featured snippets, AI Overviews en position zero', descEN: 'Featured snippets, AI Overviews and position zero' },
  { name: 'Analytics', slug: 'googleanalytics', color: '#F59E0B', bg: '#E37400', descNL: 'Realtime dashboards en AI-gestuurde rapportages', descEN: 'Real-time dashboards and AI-driven reports' },
];

const STEPS = [
  { num: '1', titleNL: 'Audit', titleEN: 'Audit', descNL: 'Analyse van huidige marketing prestaties en concurrenten', descEN: 'Analysis of current marketing performance and competitors' },
  { num: '2', titleNL: 'Strategie', titleEN: 'Strategy', descNL: 'AI-marketing roadmap per kanaal met KPIs', descEN: 'AI marketing roadmap per channel with KPIs' },
  { num: '3', titleNL: 'Opbouw', titleEN: 'Build', descNL: 'Bouw van systemen, agents en content pipelines', descEN: 'Building systems, agents and content pipelines' },
  { num: '4', titleNL: 'Launch', titleEN: 'Launch', descNL: 'Activatie op alle kanalen, meten en optimaliseren', descEN: 'Activation on all channels, measure and optimise' },
  { num: '5', titleNL: 'Doorgroeien', titleEN: 'Scale', descNL: 'Maandelijks bijsturen op basis van data en resultaten', descEN: 'Monthly adjustments based on data and results' },
];

function MarketingPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const services = [
    { icon: Search, color: '#10B981', title: isNL ? 'AI-SEO Systeem' : 'AI-SEO System', desc: isNL ? 'Wij scrapen je bedrijfsdata en concurrentiedata, analyseren hiaten en genereren geoptimaliseerde content die rankt.' : 'We scrape your business data and competitor data, analyse gaps and generate optimised content that ranks.' },
    { icon: FileText, color: '#3B82F6', title: isNL ? 'AI Blog Writer' : 'AI Blog Writer', desc: isNL ? 'Geautomatiseerde blog-productie op basis van keyword-onderzoek, concurrentie-analyse en je merkvoice.' : 'Automated blog production based on keyword research, competitor analysis and your brand voice.' },
    { icon: Image, color: '#8B5CF6', title: isNL ? 'AI Beeldgeneratie' : 'AI Image Generation', desc: isNL ? 'Onze AI-beeldgenerator maakt unieke, merkgebonden visuals voor al je marketingkanalen, zonder fotostudio.' : 'Our AI image generator creates unique, on-brand visuals for all your marketing channels, no photo studio needed.' },
    { icon: BarChart3, color: '#F59E0B', title: isNL ? 'Content Analytics' : 'Content Analytics', desc: isNL ? 'AI analyseert welke content converteert en optimaliseert je strategie continu op basis van data.' : 'AI analyses which content converts and continuously optimises your strategy based on data.' },
    { icon: Target, color: '#EC4899', title: isNL ? 'Conversie-optimalisatie' : 'Conversion optimisation', desc: isNL ? 'A/B-testen, landingspagina-optimalisatie en call-to-action verbetering , allemaal data-gedreven.' : 'A/B testing, landing page optimisation and call-to-action improvement , all data-driven.' },
    { icon: TrendingUp, color: '#EF4444', title: isNL ? 'Featured Snippets & AI-zoeken' : 'Featured Snippets & AI Search', desc: isNL ? 'Wij optimaliseren je content specifiek voor AI-zoekresultaten, Google AI Overviews en position zero.' : 'We optimise your content specifically for AI search results, Google AI Overviews and position zero.' },
  ];

  const seoChecks = isNL ? [
    'Automatische concurrentie-analyse en keyword-mapping elke dag',
    'Blog-content gegenereerd, geoptimaliseerd en gepubliceerd zonder handmatig werk',
    'SEO-scores real-time gemonitord en verbeterd via AI-agent',
    'Productteksten geoptimaliseerd voor zoekintentie en conversie',
    'Backlink-analyse en outreach geautomatiseerd',
  ] : [
    'Automatic competitor analysis and keyword mapping every day',
    'Blog content generated, optimised and published without manual work',
    'SEO scores monitored and improved in real-time via AI agent',
    'Product texts optimised for search intent and conversion',
    'Backlink analysis and outreach automated',
  ];

  const results = isNL ? [
    { stat: '+180%', desc: 'Gemiddelde stijging organisch verkeer in 3 maanden' },
    { stat: '+65%', desc: 'Meer gekwalificeerde leads via organisch zoeken' },
    { stat: '10×', desc: 'Meer content geproduceerd dan met traditioneel team' },
    { stat: '40+', desc: 'Blogs per maand volledig geautomatiseerd' },
  ] : [
    { stat: '+180%', desc: 'Average increase in organic traffic in 3 months' },
    { stat: '+65%', desc: 'More qualified leads via organic search' },
    { stat: '10×', desc: 'More content produced than with traditional team' },
    { stat: '40+', desc: 'Blogs per month fully automated' },
  ];

  return (
    <>
      <SEOHead
        title="AI Marketing Automatisering | Optivaize, De Bilt"
        description="Versterk je marketing met AI. Van SEO en content tot social media automatisering. Optivaize helpt bedrijven groeien vanuit De Bilt."
        canonicalUrl="https://optivaize.nl/ai-marketing"
        ogImage="https://optivaize.nl/images/optivaize_logo_new.webp"
        breadcrumbs={[
          { name: 'Home', url: 'https://optivaize.nl' },
          { name: 'AI Marketing', url: 'https://optivaize.nl/ai-marketing' }
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
              <span>AI Marketing</span>
            </Breadcrumb>
            <Badge><TrendingUp size={12} /> AI Marketing</Badge>
            <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {isNL ? (
                <>Domineer Google. <span style={{ color: '#34D399' }}>Met AI.</span></>
              ) : (
                <>Dominate Google. <span style={{ color: '#34D399' }}>With AI.</span></>
              )}
            </H1>
            <Desc initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              {isNL
                ? 'Wij bouwen AI-systemen die je content produceren, SEO optimaliseren en je merk laten groeien, sneller en slimmer dan een menselijk marketingteam.'
                : 'We build AI systems that produce your content, optimise SEO and grow your brand , faster and smarter than a human marketing team.'}
            </Desc>
            <HeroCTA href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            >
              {isNL ? 'Start je AI-marketing' : 'Start your AI marketing'} <ArrowRight size={17} />
            </HeroCTA>
          </HeroInner>
        </Container>
      </PageHero>

      {/* Tools strip */}
      <ToolsStrip>
        <Container>
          <ToolsLabel>{isNL ? 'Platforms en tools die wij gebruiken' : 'Platforms and tools we use'}</ToolsLabel>
          <ToolsRow>
            {TOOLS.map((t, i) => (
              <ToolChip key={i}>
                <ToolLogoBg $bg={t.bg}>
                  {t.customIcon ? (
                    <ToolLogo src={t.customIcon} alt={t.name} />
                  ) : t.slug ? (
                    <ToolLogo
                      src={`https://cdn.simpleicons.org/${t.slug}/FFFFFF`}
                      alt={t.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '9px', fontWeight: 800, color: t.textColor }}>{t.label}</span>
                  )}
                </ToolLogoBg>
                {t.name}
              </ToolChip>
            ))}
          </ToolsRow>
        </Container>
      </ToolsStrip>

      {/* Stats banner */}
      <Section>
        <Container>
          <FadeIn>
            <StatsBanner>
              <StatCell><StatNum>+180%</StatNum><StatText>{isNL ? 'Organisch verkeer' : 'Organic traffic'}</StatText></StatCell>
              <StatCell><StatNum>10×</StatNum><StatText>{isNL ? 'Meer content output' : 'More content output'}</StatText></StatCell>
              <StatCell><StatNum>60+</StatNum><StatText>{isNL ? 'Klanten geholpen' : 'Clients helped'}</StatText></StatCell>
              <StatCell><StatNum>3 mnd</StatNum><StatText>{isNL ? 'Gemiddeld terugverdientijd' : 'Average payback period'}</StatText></StatCell>
            </StatsBanner>
          </FadeIn>
        </Container>
      </Section>

      {/* SEO Section */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'AI-SEO Systeem' : 'AI-SEO System'}</SectionLabel>
              <SectionTitle>{isNL ? 'Je concurrenten analyseren, jij wint' : 'Analyse your competitors, you win'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Ons AI-SEO systeem scrapet dagelijks de data van je concurrenten, identificeert keyword-gaps en genereert automatisch content die hoger rankt. Geen handwerk, wel resultaat.'
                  : 'Our AI-SEO system scrapes your competitors\' data daily, identifies keyword gaps and automatically generates content that ranks higher. No manual work, just results.'}
              </SectionText>
              <Checks>
                {seoChecks.map((c, i) => (
                  <CheckRow key={i}><CheckCircle size={16} />{c}</CheckRow>
                ))}
              </Checks>
              <ResultsBar>
                {results.map((r, i) => (
                  <ResultRow key={i}>
                    <ResultStat>{r.stat}</ResultStat>
                    <ResultDesc>{r.desc}</ResultDesc>
                  </ResultRow>
                ))}
              </ResultsBar>
            </FadeIn>
            <FadeIn delay={0.15}>
              <NextImage src="/images/fonteyn_dashboard.webp" alt="Fonteyn SEO dashboard" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Services grid */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Onze AI Marketing diensten' : 'Our AI Marketing services'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Alles wat een marketingteam doet, maar 10× sneller' : 'Everything a marketing team does, but 10× faster'}</SectionTitle></FadeIn>
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

      {/* Marketing channels */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Alle kanalen' : 'All channels'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Wij optimaliseren elk marketingkanaal' : 'We optimise every marketing channel'}</SectionTitle></FadeIn>
          </div>
          <ChannelGrid>
            {CHANNELS.map((ch, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <ChannelCard $color={ch.color} whileHover={{ y: -4 }}>
                  <ChannelIcon $color={ch.color}>
                    <ChannelIconImg
                      src={ch.customIcon || `https://cdn.simpleicons.org/${ch.slug}/${ch.bg.replace('#','')}`}
                      alt={ch.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </ChannelIcon>
                  <ChannelName>{ch.name}</ChannelName>
                  <ChannelDesc>{isNL ? ch.descNL : ch.descEN}</ChannelDesc>
                </ChannelCard>
              </FadeIn>
            ))}
          </ChannelGrid>
        </Container>
      </Section>

      {/* Process */}
      <Section $gray>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel style={{ display: 'flex', justifyContent: 'center' }}>{isNL ? 'Hoe het werkt' : 'How it works'}</SectionLabel>
            <FadeIn><SectionTitle style={{ textAlign: 'center' }}>{isNL ? 'Van nul naar volledig AI-marketing in 5 stappen' : 'From zero to full AI marketing in 5 steps'}</SectionTitle></FadeIn>
          </div>
          <StepsRow>
            {STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <StepCell>
                  <StepNum>{step.num}</StepNum>
                  <StepTitle>{isNL ? step.titleNL : step.titleEN}</StepTitle>
                  <StepDesc>{isNL ? step.descNL : step.descEN}</StepDesc>
                </StepCell>
              </FadeIn>
            ))}
          </StepsRow>
        </Container>
      </Section>

      {/* Fonteyn case */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn delay={0.1}>
              <NextImage src="/images/max_ai_presentatie_2.webp" alt="AI Marketing presentatie" width={800} height={500} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
            <FadeIn>
              <SectionLabel>{isNL ? 'Case Study' : 'Case Study'}</SectionLabel>
              <SectionTitle>Fonteyn</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Voor Fonteyn bouwden wij een volledig AI-gestuurd SEO- en contentplatform. Van keyword-strategie tot blog-publicatie, volledig geautomatiseerd en gescaleerd naar 40+ blogs per maand.'
                  : 'For Fonteyn we built a fully AI-driven SEO and content platform. From keyword strategy to blog publication, fully automated and scaled to 40+ blogs per month.'}
              </SectionText>
              <Checks>
                <CheckRow><CheckCircle size={16} />{isNL ? '+180% organisch verkeer in 3 maanden' : '+180% organic traffic in 3 months'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? '40+ blogs per maand zonder handmatig schrijven' : '40+ blogs per month without manual writing'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Top 3 posities voor 60+ keywords' : 'Top 3 positions for 60+ keywords'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Google Ads campagnes automatisch geoptimaliseerd' : 'Google Ads campaigns automatically optimised'}</CheckRow>
              </Checks>
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* Elevate Digital partnership */}
      <Section $gray>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'Samenwerking' : 'Partnership'}</SectionLabel>
              <SectionTitle>{isNL ? 'Samen met Elevate Digital' : 'Together with Elevate Digital'}</SectionTitle>
              <SectionText>
                {isNL
                  ? 'Als het gaat om marketing werken wij veel samen met Elevate Digital. Van strategie tot uitvoering combineren wij onze AI-expertise met hun marketingkennis voor het beste resultaat.'
                  : 'When it comes to marketing, we work closely with Elevate Digital. From strategy to execution, we combine our AI expertise with their marketing knowledge for the best results.'}
              </SectionText>
              <Checks>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Gecombineerde expertise in AI en marketing' : 'Combined expertise in AI and marketing'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Gezamenlijke content- en campagnestrategie' : 'Joint content and campaign strategy'}</CheckRow>
                <CheckRow><CheckCircle size={16} />{isNL ? 'Van SEO tot paid ads, volledig afgedekt' : 'From SEO to paid ads, fully covered'}</CheckRow>
              </Checks>
            </FadeIn>
            <FadeIn delay={0.15}>
              <NextImage src="https://cdn.prod.website-files.com/621ceace3251175ba0fe61f9/643d156d65a741346cbdccf1_BvprPfyGOec9pyXEYDTUBzz9_KcTWBrE9iulta0Znbc.jpeg" alt="Elevate Digital samenwerking" width={600} height={400} style={{ width: '100%', height: 'auto', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <FadeIn>
            <CTACard whileHover={{ scale: 1.01 }}>
              <h2>{isNL ? 'Klaar om Google te domineren?' : 'Ready to dominate Google?'}</h2>
              <p>{isNL ? 'Wij bouwen een AI-marketingsysteem op maat voor je bedrijf. Plan een gratis gesprek.' : 'We build a custom AI marketing system for your business. Book a free call.'}</p>
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

export default MarketingPage;

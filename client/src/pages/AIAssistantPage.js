'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mic, Phone, MessageSquare, Calendar, ShoppingBag, UtensilsCrossed, Home,
  Zap, Shield, Sparkles, Headphones, Clock, Users, ArrowRight, CheckCircle,
  Plug, RefreshCcw, TrendingUp, ChevronDown, BadgeCheck, Bot,
} from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';
import VoiceDemo from '../components/voice/VoiceDemo';
import { CASE_REGISTRY, CASE_KEYS } from '../components/voice/cases';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const Container = styled.div`
  max-width: 1280px;
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
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
    >{children}</motion.div>
  );
}

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const Hero = styled.section`
  padding: 130px 0 70px;
  background: linear-gradient(135deg, #0A0F1F 0%, #131A33 60%, #1E293B 100%);
  position: relative;
  overflow: hidden;
  color: white;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 80% 30%, rgba(59,130,246,0.18), transparent),
      radial-gradient(ellipse 40% 40% at 15% 70%, rgba(16,185,129,0.12), transparent);
    pointer-events: none;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16,185,129,0.12);
  border: 1px solid rgba(16,185,129,0.3);
  color: #6EE7B7;
  font-size: 12px;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const H1 = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.05;
  font-weight: 800;
  margin: 0 0 1.2rem;
  letter-spacing: -0.02em;
`;

const Highlight = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  font-size: 1.15rem;
  line-height: 1.55;
  color: #CBD5E1;
  margin: 0 0 1.75rem;
  max-width: 560px;
`;

const HeroCtas = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Primary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  border: none;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(59,130,246,0.35);
  transition: transform 0.15s;
  &:hover { transform: translateY(-2px); }
`;

const Secondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.06);
  color: white;
  border: 1px solid rgba(255,255,255,0.18);
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  &:hover { background: rgba(255,255,255,0.1); }
`;

const HeroBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: #94A3B8;
  background: rgba(255,255,255,0.04);
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.08);
`;

const HeroVisual = styled.div`
  position: relative;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 960px) { height: 280px; }
`;

const PhoneCard = styled.div`
  width: 280px;
  background: linear-gradient(180deg, #1E293B, #0F172A);
  border-radius: 32px;
  padding: 1.5rem;
  border: 1px solid rgba(59,130,246,0.25);
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  animation: ${float} 4s ease-in-out infinite;
  position: relative;
  z-index: 2;
`;

const WaveRing = styled.div`
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  border: 2px solid rgba(59,130,246,0.2);
  animation: ${keyframes`
    0% { transform: scale(0.85); opacity: 0.5; }
    100% { transform: scale(1.4); opacity: 0; }
  `} 2.5s ease-out infinite;
`;

const PhoneIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(16,185,129,0.4);
`;

const Mock = styled.div`
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #E2E8F0;
  margin-bottom: 0.5rem;
  border-left: 3px solid ${(p) => (p.$ai ? '#10B981' : '#3B82F6')};
`;

const Section = styled.section`
  padding: ${(p) => p.$pad || '90px 0'};
  background: ${(p) => p.$bg || 'white'};
  position: relative;
  ${(p) => p.$bg === 'dark' && `
    background: linear-gradient(180deg, #0F172A, #1E293B);
    color: white;
  `}
`;

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const Eyebrow = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #3B82F6;
  margin-bottom: 0.75rem;
`;

const H2 = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  color: ${(p) => (p.$light ? 'white' : '#0F172A')};
`;

const SubH = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${(p) => (p.$light ? '#94A3B8' : '#475569')};
  margin: 0;
`;

// Demo section
const DemoLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;

const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.05rem;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$active ? 'transparent' : '#E2E8F0')};
  background: ${(p) => (p.$active ? GRADIENT : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#475569')};
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.18s;
  &:hover { border-color: #3B82F6; color: ${(p) => (p.$active ? 'white' : '#3B82F6')}; }
`;

// Industry cards
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
`;

const InfoCard = styled.div`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s;
  &:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(15,23,42,0.08); border-color: #3B82F6; }
`;

const InfoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${(p) => p.$bg || 'rgba(59,130,246,0.1)'};
  color: ${(p) => p.$color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0F172A;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: #475569;
  line-height: 1.55;
`;

const Stat = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #10B981;
  margin: 0.4rem 0 0;
`;

// How it works
const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  position: relative;
`;

const StepCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const StepNum = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
`;

// Pricing
const PriceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 880px;
  margin: 0 auto;
`;

const PriceCard = styled.div`
  background: white;
  border: 2px solid ${(p) => (p.$featured ? '#3B82F6' : '#E2E8F0')};
  border-radius: 22px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  ${(p) => p.$featured && `
    box-shadow: 0 24px 50px rgba(59,130,246,0.15);
    transform: scale(1.02);
  `}
`;

const PriceName = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0F172A;
`;

const PriceAmount = styled.div`
  font-size: 2.4rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1;
  span { font-size: 1rem; color: #64748B; font-weight: 500; }
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const PriceLi = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: #334155;
`;

const FeatBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: ${GRADIENT};
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

// FAQ
const FaqList = styled.div`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const FaqItem = styled.details`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 1rem 1.25rem;
  &[open] { box-shadow: 0 6px 18px rgba(15,23,42,0.05); }
  summary {
    cursor: pointer;
    font-weight: 600;
    color: #0F172A;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  summary::-webkit-details-marker { display: none; }
  summary svg { transition: transform 0.2s; flex-shrink: 0; }
  &[open] summary svg { transform: rotate(180deg); }
  p { margin: 0.85rem 0 0; color: #475569; line-height: 1.6; font-size: 0.95rem; }
`;

// Integrations
const IntList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const IntChip = styled.div`
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: #CBD5E1;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
`;

const IntCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Final CTA
const FinalCta = styled.div`
  background: ${GRADIENT};
  border-radius: 28px;
  padding: 3.5rem 2.5rem;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(59,130,246,0.25);
`;

// --- Data ---

const TAB_META = {
  tandarts: { icon: <Calendar size={16} />, color: '#3B82F6' },
  webshop: { icon: <ShoppingBag size={16} />, color: '#8B5CF6' },
  restaurant: { icon: <UtensilsCrossed size={16} />, color: '#F59E0B' },
  makelaar: { icon: <Home size={16} />, color: '#10B981' },
};

const INDUSTRY_DETAILS = {
  tandarts: {
    title: 'Tandartspraktijken',
    text: 'Afspraken inplannen, verzetten en annuleren. Beantwoordt vragen over behandelingen en prijzen, 24 uur per dag.',
    stat: '67% minder receptie',
    statSub: 'Van 3 receptionisten naar 1',
    integrations: ['Exquise', 'Promedico-ASP', 'OASE', 'Wincare', 'Google Calendar', 'Outlook'],
  },
  webshop: {
    title: 'E-commerce & webshops',
    text: 'Bestellingen opzoeken, pakketten tracken, retouren starten en adressen wijzigen. Direct, zonder wachtrij.',
    stat: '92% automatisch',
    statSub: 'Alleen complexe gevallen naar mensen',
    integrations: ['Shopify', 'WooCommerce', 'Magento', 'Lightspeed', 'PostNL', 'Mollie', 'Sendcloud'],
  },
  restaurant: {
    title: 'Restaurants & horeca',
    text: 'Tafels reserveren, verzetten en annuleren - ook tijdens diensttijden of buiten openingstijden.',
    stat: '20+ uur/week',
    statSub: 'Tijd terug voor de gastvrouw',
    integrations: ['Untill', 'Lightspeed K-Series', 'Formitable', 'ResDiary', 'OpenTable', 'Eet.nu'],
  },
  makelaar: {
    title: 'Makelaardij & vastgoed',
    text: 'Kwalificeert leads, plant bezichtigingen en beantwoordt veel gestelde vragen - ook in het weekend.',
    stat: '88% van leads',
    statSub: 'Buiten kantooruren gekwalificeerd',
    integrations: ['Realworks', 'Skarabee', 'Funda API', 'Move.it', 'Pro6PP', 'CRM systemen'],
  },
};

const FAQS = [
  {
    q: 'Hoe snel staat de assistent live?',
    a: 'Standaard binnen 1 tot 3 werkdagen. Wij koppelen aan jouw bestaande systemen (agenda, CRM, webshop, kassa) en trainen de assistent op jouw bedrijfsinformatie. Vanaf dat moment is hij 24/7 bereikbaar.',
  },
  {
    q: 'Wat als de AI iets niet weet of niet kan oplossen?',
    a: 'De assistent verbindt naadloos door naar een mens. Hij geeft eerlijk aan wanneer iets te complex is en draagt het gesprek over met de juiste context, zodat jouw medewerker direct verder kan.',
  },
  {
    q: 'Aan welke systemen kan jullie assistent koppelen?',
    a: 'We werken met de meest gebruikte systemen per branche - van Exquise en Promedico in de tandheelkunde tot Shopify en WooCommerce voor webshops, en Realworks voor makelaars. Andere systemen koppelen we via API of webhook.',
  },
  {
    q: 'Kan het ook via een echte telefoonlijn?',
    a: 'Ja. We kunnen de assistent koppelen aan jouw zakelijke nummer via een VoIP-koppeling, zodat klanten gewoon kunnen blijven bellen. De koppeling met telefonie is onderdeel van de setup.',
  },
  {
    q: 'Hoe zit het met de privacy van klantgegevens (AVG)?',
    a: 'Alle gesprekken verlopen versleuteld. We slaan alleen op wat nodig is voor het verlenen van de dienst, en gegevens blijven in de EU. Op verzoek leveren we een verwerkersovereenkomst.',
  },
  {
    q: 'Is €100 per maand echt onbeperkt gebruik?',
    a: 'Ja. Geen limieten op het aantal gesprekken of minuten. Bij extreem hoog gebruik (10.000+ gesprekken per maand) kijken we samen naar een passend pakket, maar dat is voor de meeste bedrijven niet nodig.',
  },
  {
    q: 'Klinkt de stem natuurlijk en kan hij Nederlands?',
    a: 'Ja, hij spreekt vloeiend Nederlands met natuurlijke intonatie. Tijdens de demo hoor je precies hoe het klinkt. Klanten merken vaak pas na een paar zinnen dat ze met een AI praten.',
  },
  {
    q: 'Wat als ik tussentijds iets wil aanpassen?',
    a: 'Aanpassingen zoals nieuwe behandelingen, productinformatie of openingstijden zijn standaard inbegrepen in het maandbedrag. Grotere uitbreidingen bespreken we apart.',
  },
];

// --- Page ---

function getInitialCase() {
  if (typeof window === 'undefined') return 'tandarts';
  const h = window.location.hash.replace('#', '').toLowerCase();
  return CASE_KEYS.includes(h) ? h : 'tandarts';
}

export default function AIAssistantPage() {
  const [activeCase, setActiveCase] = useState('tandarts');
  const [stateMap, setStateMap] = useState(() =>
    Object.fromEntries(CASE_KEYS.map((k) => [k, CASE_REGISTRY[k].initialState]))
  );
  const stateMapRef = useRef(stateMap);
  const activeCaseRef = useRef(activeCase);
  const demoRef = useRef(null);

  useEffect(() => { stateMapRef.current = stateMap; }, [stateMap]);
  useEffect(() => { activeCaseRef.current = activeCase; }, [activeCase]);

  // Hash routing
  useEffect(() => {
    setActiveCase(getInitialCase());
    const onHash = () => setActiveCase(getInitialCase());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  function pickCase(key) {
    if (key === activeCase) return;
    setActiveCase(key);
    setStateMap((m) => ({ ...m, [key]: CASE_REGISTRY[key].initialState }));
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.hash = key;
      window.history.replaceState(null, '', url.toString());
    }
  }

  const setCaseState = useCallback((key, updater) => {
    setStateMap((m) => ({
      ...m,
      [key]: typeof updater === 'function' ? updater(m[key]) : updater,
    }));
  }, []);

  const onToolCall = useCallback(async (name, args) => {
    const key = activeCaseRef.current;
    const caseDef = CASE_REGISTRY[key];
    const currentState = stateMapRef.current[key];
    return caseDef.executeTool(name, args, currentState, (updater) => setCaseState(key, updater));
  }, [setCaseState]);

  const ActiveComponent = CASE_REGISTRY[activeCase].Component;
  const activeState = stateMap[activeCase];
  const activeMeta = INDUSTRY_DETAILS[activeCase];

  function scrollToDemo() {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <>
      <SEOHead
        title="AI Voice Assistent - Onbeperkt klantgesprek vanaf €100/maand | Optivaize"
        description="Live spraakassistent voor jouw bedrijf. Tandarts, webshop, restaurant, makelaar - 24/7 bereikbaar, koppelt aan jouw systemen, live binnen 1-3 dagen."
        keywords="voice assistent, AI telefoon, klantenservice automatisering, AI receptionist, tandarts AI, webshop chatbot, restaurant reserveringen AI"
      />

      <Hero>
        <Container>
          <HeroInner>
            <div>
              <Pill><Sparkles size={12} /> Live Demo - Nederlandse AI</Pill>
              <H1>Een AI die <Highlight>écht klinkt als jouw beste medewerker</Highlight>, 24/7</H1>
              <Sub>
                Boekt afspraken, beantwoordt klantvragen, verwerkt bestellingen en plant bezichtigingen.
                Volledig Nederlandstalig, gekoppeld aan jouw systemen, en altijd met menselijke escalatie als het nodig is.
              </Sub>
              <HeroCtas>
                <Primary onClick={scrollToDemo}><Mic size={18} /> Probeer de live demo</Primary>
                <Secondary href="#pricing"><ArrowRight size={16} /> Bekijk prijzen</Secondary>
              </HeroCtas>
              <HeroBadges>
                <HeroBadge><BadgeCheck size={13} color="#10B981" /> Live binnen 1-3 dagen</HeroBadge>
                <HeroBadge><Clock size={13} color="#10B981" /> 24/7 bereikbaar</HeroBadge>
                <HeroBadge><Shield size={13} color="#10B981" /> AVG-proof, EU-data</HeroBadge>
                <HeroBadge><Headphones size={13} color="#10B981" /> Menselijke escalatie</HeroBadge>
              </HeroBadges>
            </div>
            <HeroVisual>
              <WaveRing />
              <PhoneCard>
                <PhoneIcon><Phone size={26} color="white" /></PhoneIcon>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Inkomend gesprek</div>
                <div style={{ fontWeight: 700, marginBottom: 14, color: 'white' }}>Tandartspraktijk Optivaize</div>
                <Mock $ai>"Goedendag, u spreekt met de assistent. Waarmee kan ik u helpen?"</Mock>
                <Mock>"Ik wil graag een afspraak verzetten naar volgende week."</Mock>
                <Mock $ai>"Natuurlijk, op naam van wie staat de afspraak?"</Mock>
              </PhoneCard>
            </HeroVisual>
          </HeroInner>
        </Container>
      </Hero>

      <Section ref={demoRef} id="demo" $bg="#F8FAFC">
        <Container>
          <SectionHead>
            <Eyebrow>Live demo</Eyebrow>
            <H2>Praat nu met de assistent en zie hem werken</H2>
            <SubH>
              Kies een branche, klik op "Start gesprek" en spreek Nederlands. Aan de rechterkant zie je hoe afspraken,
              bestellingen of reserveringen live worden bijgewerkt door de AI - precies zoals het in jouw eigen systeem zou gaan.
            </SubH>
          </SectionHead>

          <Tabs>
            {CASE_KEYS.map((k) => {
              const meta = TAB_META[k];
              return (
                <Tab key={k} $active={activeCase === k} onClick={() => pickCase(k)}>
                  {meta.icon} {CASE_REGISTRY[k].short}
                </Tab>
              );
            })}
          </Tabs>

          <DemoLayout>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <VoiceDemo caseKey={activeCase} onToolCall={onToolCall} />
              <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#0F172A', fontWeight: 700 }}>
                  <Bot size={16} color="#3B82F6" /> Probeer iets als
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                  {activeCase === 'tandarts' && (
                    <>
                      <li>"Hoi, ik wil graag een controle inplannen voor donderdag rond 11 uur."</li>
                      <li>"Mijn afspraak voor van Bakker wil ik verzetten naar vrijdag 14:30."</li>
                      <li>"Wat kost een gebitsreiniging en hoe lang duurt dat?"</li>
                    </>
                  )}
                  {activeCase === 'webshop' && (
                    <>
                      <li>"Waar blijft mijn bestelling OPT-100234?"</li>
                      <li>"Ik wil bestelling OPT-100256 retourneren, hij is beschadigd."</li>
                      <li>"Kan ik het bezorgadres van OPT-100271 nog wijzigen?"</li>
                    </>
                  )}
                  {activeCase === 'restaurant' && (
                    <>
                      <li>"Ik wil graag reserveren voor zaterdag, met 4 personen om 19:00."</li>
                      <li>"Kunnen jullie ook vegetarisch koken?"</li>
                      <li>"Mijn reservering op naam van Hendriks wil ik annuleren."</li>
                    </>
                  )}
                  {activeCase === 'makelaar' && (
                    <>
                      <li>"Ik zoek een huis in Utrecht tot 700.000 met minimaal 3 kamers."</li>
                      <li>"Kan ik volgende week een bezichtiging plannen voor Maliebaan 12?"</li>
                      <li>"Mijn naam is Jan, budget 800k, ik wil binnen 3 maanden iets vinden."</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <ActiveComponent state={activeState} />
          </DemoLayout>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead>
            <Eyebrow>Voor wie</Eyebrow>
            <H2>Bewezen toepassingen, klaar voor jouw branche</H2>
            <SubH>Voor elke branche een vooraf getrainde versie. Wij voegen jouw eigen content, prijzen en agenda toe.</SubH>
          </SectionHead>
          <CardGrid>
            {CASE_KEYS.map((k) => {
              const det = INDUSTRY_DETAILS[k];
              const meta = TAB_META[k];
              return (
                <FadeIn key={k}>
                  <InfoCard>
                    <InfoIcon $bg={`${meta.color}1A`} $color={meta.color}>{meta.icon}</InfoIcon>
                    <InfoTitle>{det.title}</InfoTitle>
                    <InfoText>{det.text}</InfoText>
                    <Stat>{det.stat}</Stat>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{det.statSub}</div>
                    <button onClick={() => { pickCase(k); scrollToDemo(); }} style={{ background: 'transparent', border: 'none', color: '#3B82F6', fontWeight: 600, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.92rem', marginTop: '0.4rem' }}>
                      Probeer deze demo <ArrowRight size={14} />
                    </button>
                  </InfoCard>
                </FadeIn>
              );
            })}
          </CardGrid>
        </Container>
      </Section>

      <Section $bg="dark">
        <Container>
          <SectionHead>
            <Eyebrow>Hoe werkt het</Eyebrow>
            <H2 $light>Van eerste gesprek tot live in 1 tot 3 dagen</H2>
            <SubH $light>We doen het zware werk. Jij blijft je bezighouden met je klanten en je groei.</SubH>
          </SectionHead>
          <Steps>
            {[
              { n: 1, icon: <MessageSquare size={20} color="#10B981" />, t: 'Intake gesprek', d: 'We bespreken jouw branche, processen en welke systemen je gebruikt. Duurt 30-45 minuten, vrijblijvend.' },
              { n: 2, icon: <Plug size={20} color="#10B981" />, t: 'Koppeling & training', d: 'We koppelen aan je agenda, CRM of webshop en trainen de assistent op jouw eigen content, prijzen en tone of voice.' },
              { n: 3, icon: <RefreshCcw size={20} color="#10B981" />, t: 'Live testen & verfijnen', d: 'Je test live, geeft feedback en wij verfijnen. Binnen een paar dagen klaar voor klantgesprekken.' },
              { n: 4, icon: <TrendingUp size={20} color="#10B981" />, t: 'Schaal mee', d: 'De assistent leert van elk gesprek. Wij monitoren prestaties en optimaliseren continu - zonder extra kosten.' },
            ].map((s) => (
              <FadeIn key={s.n} delay={s.n * 0.05}>
                <StepCard>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <StepNum>{s.n}</StepNum>
                    {s.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>{s.t}</h3>
                  <p style={{ margin: 0, color: '#94A3B8', lineHeight: 1.55, fontSize: '0.92rem' }}>{s.d}</p>
                </StepCard>
              </FadeIn>
            ))}
          </Steps>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead>
            <Eyebrow>Voor de eindgebruiker</Eyebrow>
            <H2>Klanten worden niet langer in de wachtrij gezet</H2>
            <SubH>De grootste winst zit niet alleen bij jou - ook jouw klanten merken direct het verschil.</SubH>
          </SectionHead>
          <CardGrid>
            <FadeIn>
              <InfoCard>
                <InfoIcon $bg="rgba(16,185,129,0.1)" $color="#10B981"><Zap size={22} /></InfoIcon>
                <InfoTitle>Direct antwoord, geen wachttijd</InfoTitle>
                <InfoText>Geen "u bent nummer 7 in de wachtrij". De assistent neemt op binnen 1 seconde, ook midden in de spits.</InfoText>
              </InfoCard>
            </FadeIn>
            <FadeIn delay={0.05}>
              <InfoCard>
                <InfoIcon $bg="rgba(59,130,246,0.1)" $color="#3B82F6"><Clock size={22} /></InfoIcon>
                <InfoTitle>24/7 beschikbaar</InfoTitle>
                <InfoText>Klanten bellen 's avonds en in het weekend - juist dan zijn ze thuis. De assistent staat altijd aan.</InfoText>
              </InfoCard>
            </FadeIn>
            <FadeIn delay={0.1}>
              <InfoCard>
                <InfoIcon $bg="rgba(245,158,11,0.1)" $color="#F59E0B"><Headphones size={22} /></InfoIcon>
                <InfoTitle>Altijd menselijke escalatie</InfoTitle>
                <InfoText>Kan de AI iets niet oplossen? Hij verbindt direct door naar een mens, mét gespreksinhoud erbij.</InfoText>
              </InfoCard>
            </FadeIn>
            <FadeIn delay={0.15}>
              <InfoCard>
                <InfoIcon $bg="rgba(139,92,246,0.1)" $color="#8B5CF6"><Users size={22} /></InfoIcon>
                <InfoTitle>Consistente kwaliteit</InfoTitle>
                <InfoText>Geen slechte dag, geen vergeten informatie. Elke klant krijgt hetzelfde correcte antwoord.</InfoText>
              </InfoCard>
            </FadeIn>
          </CardGrid>
        </Container>
      </Section>

      <Section $bg="dark">
        <Container>
          <SectionHead>
            <Eyebrow>Integraties</Eyebrow>
            <H2 $light>Werkt samen met de systemen die je al gebruikt</H2>
            <SubH $light>We koppelen aan de meest gebruikte software per branche - geen vervanging, maar uitbreiding.</SubH>
          </SectionHead>
          <CardGrid>
            {CASE_KEYS.map((k) => {
              const det = INDUSTRY_DETAILS[k];
              const meta = TAB_META[k];
              return (
                <FadeIn key={k}>
                  <IntCard>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <InfoIcon $bg={`${meta.color}26`} $color={meta.color}>{meta.icon}</InfoIcon>
                      <h3 style={{ margin: 0, color: 'white', fontSize: '1.05rem' }}>{det.title}</h3>
                    </div>
                    <IntList>
                      {det.integrations.map((n) => (
                        <IntChip key={n}>{n}</IntChip>
                      ))}
                    </IntList>
                  </IntCard>
                </FadeIn>
              );
            })}
          </CardGrid>
          <p style={{ textAlign: 'center', color: '#64748B', marginTop: '2rem', fontSize: '0.9rem' }}>
            Jouw systeem niet gezien? We koppelen ook via API of webhook - in 9 van de 10 gevallen geen probleem.
          </p>
        </Container>
      </Section>

      <Section id="pricing">
        <Container>
          <SectionHead>
            <Eyebrow>Pricing</Eyebrow>
            <H2>Eenvoudige prijzen, geen verrassingen</H2>
            <SubH>Eenmalige setup om alles aan jouw systemen te koppelen. Daarna een vast laag bedrag per maand met onbeperkt gebruik.</SubH>
          </SectionHead>
          <PriceGrid>
            <PriceCard>
              <PriceName>Setup</PriceName>
              <PriceAmount>€750 <span>tot €2.500</span></PriceAmount>
              <SubH style={{ fontSize: '0.92rem' }}>Eenmalig - afhankelijk van koppelingen en complexiteit</SubH>
              <PriceList>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Branche-specifieke training</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Koppeling met jouw systemen</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Setup van escalatie naar mens</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Live binnen 1-3 dagen</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Test- en verfijnsessies</PriceLi>
              </PriceList>
            </PriceCard>
            <PriceCard $featured>
              <FeatBadge>Maandelijks</FeatBadge>
              <PriceName>Onbeperkt gebruik</PriceName>
              <PriceAmount>€100 <span>per maand</span></PriceAmount>
              <SubH style={{ fontSize: '0.92rem' }}>Geen limiet op gesprekken of minuten</SubH>
              <PriceList>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Onbeperkt aantal gesprekken</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Doorlopende monitoring & optimalisatie</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Kleine aanpassingen inbegrepen</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Updates van het AI-model</PriceLi>
                <PriceLi><CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} /> Maandelijks opzegbaar</PriceLi>
              </PriceList>
            </PriceCard>
          </PriceGrid>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Primary as="span"><Phone size={18} /> Plan een gratis intakegesprek</Primary>
            </Link>
          </div>
        </Container>
      </Section>

      <Section $bg="#F8FAFC">
        <Container>
          <SectionHead>
            <Eyebrow>Vragen</Eyebrow>
            <H2>Veelgestelde vragen</H2>
          </SectionHead>
          <FaqList>
            {FAQS.map((f, i) => (
              <FaqItem key={i}>
                <summary>{f.q} <ChevronDown size={18} /></summary>
                <p>{f.a}</p>
              </FaqItem>
            ))}
          </FaqList>
        </Container>
      </Section>

      <Section>
        <Container>
          <FinalCta>
            <Pill style={{ background: 'rgba(255,255,255,0.2)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              <Sparkles size={12} /> Gratis & vrijblijvend
            </Pill>
            <H2 $light style={{ color: 'white' }}>Klaar om 67-92% van je klantgesprekken te automatiseren?</H2>
            <SubH $light style={{ color: 'rgba(255,255,255,0.92)', maxWidth: 600 }}>
              Plan een gratis intakegesprek van 30 minuten. Wij laten zien hoe het er voor jouw bedrijf uit gaat zien - inclusief realistische business case.
            </SubH>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Primary as="span" style={{ background: 'white', color: '#0F172A', boxShadow: '0 14px 32px rgba(0,0,0,0.15)' }}>
                  <Phone size={18} /> Plan intakegesprek
                </Primary>
              </Link>
              <Secondary as="button" onClick={scrollToDemo} style={{ background: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer' }}>
                <Mic size={16} /> Probeer eerst de demo
              </Secondary>
            </div>
          </FinalCta>
        </Container>
      </Section>
    </>
  );
}

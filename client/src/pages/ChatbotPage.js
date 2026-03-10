import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  MessageCircle, ArrowRight, CheckCircle, Zap, TrendingUp, RefreshCw,
  Star, Bot, Target, BarChart3, Mail, MapPin, ShoppingBag, Globe, Code2
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';


const GRADIENT = 'linear-gradient(135deg, #06B6D4, #3B82F6)';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Hero ─── */
const PageHero = styled.section`
  padding: 140px 0 80px;
  background: linear-gradient(135deg, #0C1929, #0F2847);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 70% 50%, rgba(6,182,212,0.12), transparent),
                radial-gradient(ellipse 40% 40% at 20% 80%, rgba(59,130,246,0.08), transparent);
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

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(6,182,212,0.12);
  border: 1px solid rgba(6,182,212,0.3);
  color: #22D3EE;
  font-size: 12px;
  font-weight: 700;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.2rem, 4.5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.1;
`;

const Gradient = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSub = styled(motion.p)`
  font-size: 18px;
  color: rgba(255,255,255,0.65);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 2rem;
`;

const HeroBtns = styled.div`
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
  font-size: 15px;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(6,182,212,0.35);
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

/* ─── Interactive Demo ─── */
const DemoWrap = styled(motion.div)`
  background: #0D1117;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
`;

const DemoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);

  span { width: 9px; height: 9px; border-radius: 50%; }
  .r { background: #FC8181; }
  .y { background: #FBBF24; }
  .g { background: #34D399; }
  .label { margin-left: 0.5rem; font-size: 11.5px; color: rgba(255,255,255,0.3); font-weight: 500; flex: 1; }
  .badge { font-size: 10px; font-weight: 700; color: #22D3EE; background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.25); border-radius: 12px; padding: 2px 8px; }
`;

const ChatArea = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 320px;
`;

const ChatMsg = styled(motion.div)`
  display: flex;
  justify-content: ${p => p.$user ? 'flex-end' : 'flex-start'};
  align-items: flex-end;
  gap: 0.5rem;
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${p => p.$bot ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : '#334155'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  color: white;
`;

const Bubble = styled.div`
  max-width: 78%;
  padding: 0.625rem 0.875rem;
  border-radius: ${p => p.$user ? '14px 14px 3px 14px' : '14px 14px 14px 3px'};
  font-size: 13px;
  line-height: 1.5;
  background: ${p => p.$user ? 'linear-gradient(135deg, #06B6D4, #3B82F6)' : 'rgba(255,255,255,0.08)'};
  color: ${p => p.$user ? 'white' : 'rgba(255,255,255,0.85)'};
  border: ${p => p.$user ? 'none' : '1px solid rgba(255,255,255,0.08)'};
`;

const DiscountCard = styled(motion.div)`
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.25rem;
  font-size: 12px;
  color: rgba(255,255,255,0.8);

  .title { font-size: 13px; font-weight: 700; color: #34D399; margin-bottom: 0.375rem; display: flex; align-items: center; gap: 0.4rem; }
  .code { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 6px; padding: 0.25rem 0.625rem; font-weight: 700; font-family: monospace; color: #34D399; display: inline-block; margin-top: 0.375rem; }
`;

const ProductCard = styled(motion.div)`
  background: rgba(6,182,212,0.06);
  border: 1px solid rgba(6,182,212,0.2);
  border-radius: 12px;
  padding: 0.75rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProductThumb = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(6,182,212,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #22D3EE;
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
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.75rem 0.875rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px 14px 14px 3px;
  width: fit-content;

  span {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.4);
    animation: bounce 1.2s ease-in-out infinite;
    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
`;

const CHAT_SCRIPT_NL = [
  { role: 'user', text: 'Hoi, ik zoek een goede jacuzzi voor in mijn tuin. Budget rond \u20AC3.000.' },
  { role: 'bot', text: 'Welkom bij Fonteyn! Wij verkopen geen Jacuzzi\u00AE (dat is een geregistreerd merk), maar we hebben prachtige buitenspa\'s die minstens zo goed zijn. Voor hoeveel personen zoekt u?' },
  { role: 'user', text: '4 personen, en liefst compact want mijn tuin is niet heel groot.' },
  { role: 'bot', text: 'Dan is de Spa Believe van Devine Spas ideaal! Compact (155\u00D7155cm), 40 hydrotherapie jets, LED-verlichting en Bluetooth audio. Nu van \u20AC5.990 voor \u20AC2.900!' },
  { role: 'product', text: '' },
  { role: 'user', text: 'Dat klinkt goed! Zijn er nog extra aanbiedingen?' },
  { role: 'bot', text: 'We hebben even gekeken en speciaal voor u kunnen we een extra korting regelen op deze spa!' },
  { role: 'discount', text: '' },
];

const CHAT_SCRIPT_EN = [
  { role: 'user', text: "Hi, I'm looking for a good jacuzzi for my garden. Budget around \u20AC3,000." },
  { role: 'bot', text: "Welcome to Fonteyn! We don't sell Jacuzzi\u00AE (that's a registered brand), but our outdoor spas are just as good! How many people are you looking for?" },
  { role: 'user', text: "4 people, and preferably compact as my garden isn't very large." },
  { role: 'bot', text: "The Spa Believe by Devine Spas is perfect! Compact (155\u00D7155cm), 40 hydrotherapy jets, LED lighting and Bluetooth audio. Now from \u20AC5,990 for \u20AC2,900!" },
  { role: 'product', text: '' },
  { role: 'user', text: "Sounds great! Any extra offers available?" },
  { role: 'bot', text: "We've checked and we can offer you an extra discount on this spa!" },
  { role: 'discount', text: '' },
];

function ChatbotDemo({ language }) {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const isNL = language === 'nl';
  const CHAT_SCRIPT = isNL ? CHAT_SCRIPT_NL : CHAT_SCRIPT_EN;

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
  }, [step, CHAT_SCRIPT]);

  return (
    <DemoWrap initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
      <DemoBar>
        <span className="r" /><span className="y" /><span className="g" />
        <span className="label">{isNL ? 'Fonteyn Spas · AI Productadvies' : 'Fonteyn Spas · AI Product Advice'}</span>
      </DemoBar>
      <ChatArea>
        <AnimatePresence>
          {CHAT_SCRIPT.slice(0, step).map((msg, i) => {
            if (msg.role === 'product') {
              return (
                <ProductCard key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <ProductThumb><Star size={18} /></ProductThumb>
                  <ProductInfo>
                    <div className="name">Spa Believe – Devine Spas</div>
                    <div className="specs">4 pers · 155×155cm · 40 jets · Bluetooth</div>
                    <div className="prices">
                      <span className="price">€2.900</span>
                      <span className="old">€5.990</span>
                    </div>
                  </ProductInfo>
                </ProductCard>
              );
            }
            if (msg.role === 'discount') {
              return (
                <DiscountCard key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="title"><Star size={13} />{isNL ? 'Persoonlijke aanbieding voor jou' : 'Personal offer for you'}</div>
                  {isNL ? '10% extra korting op de Spa Believe. Je persoonlijke kortingscode:' : '10% extra off the Spa Believe. Your personal discount code:'}
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
    </DemoWrap>
  );
}

/* ─── Section components ─── */
const Section = styled.section`
  padding: 7rem 0;
  background: ${p => p.$dark ? '#0F172A' : p.$gray ? '#F8FAFC' : 'white'};
`;

const SectionLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: ${p => p.$light ? '#22D3EE' : '#06B6D4'}; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800;
  color: ${p => p.$light ? 'white' : '#0F172A'};
  margin-bottom: 1.25rem; line-height: 1.15;
`;

const SectionText = styled.p`
  font-size: 17px; color: ${p => p.$light ? 'rgba(255,255,255,0.65)' : '#475569'};
  line-height: 1.7; margin-bottom: 1.25rem;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`;

const CheckList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 2rem;
`;

const CheckItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 15px;
  color: ${p => p.$light ? 'rgba(255,255,255,0.75)' : '#334155'};
  line-height: 1.55;

  svg { flex-shrink: 0; margin-top: 2px; }
`;

/* ─── Feature cards ─── */
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const FeatureCard = styled(motion.div)`
  background: ${p => p.$dark ? 'rgba(255,255,255,0.04)' : 'white'};
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.07)' : '#F1F5F9'};
  border-radius: 20px;
  padding: 2rem;
`;

const FeatureIcon = styled.div`
  width: 48px; height: 48px; border-radius: 14px;
  background: ${p => p.$color}18;
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color}; margin-bottom: 1.25rem;
`;

const FeatureTitle = styled.h3`
  font-size: 17px; font-weight: 700;
  color: ${p => p.$light ? 'white' : '#0F172A'}; margin-bottom: 0.625rem;
`;

const FeatureText = styled.p`
  font-size: 14px; line-height: 1.6;
  color: ${p => p.$light ? 'rgba(255,255,255,0.55)' : '#64748B'};
`;

/* ─── Channel strip ─── */
const ChannelStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const ChannelBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.75);

  img { width: 18px; height: 18px; object-fit: contain; }
`;

/* ─── Flow section ─── */
const FlowWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 23px;
    top: 24px;
    bottom: 24px;
    width: 2px;
    background: linear-gradient(to bottom, #06B6D4, #3B82F6, #8B5CF6);
  }
`;

const FlowStep = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem 0;
`;

const FlowNum = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #06B6D4, #3B82F6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
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

/* ─── Stats ─── */
const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatCard = styled(motion.div)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
`;

const StatNum = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.4;
`;

/* ─── Follow-up pipeline ─── */
const PipelineWrap = styled.div`
  margin-top: 3rem;
`;

const PipelineLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #06B6D4;
  text-align: center;
  margin-bottom: 1.25rem;
`;

const PipelineRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
`;

const PipelineStep = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.6rem;
`;

const PipelineIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${p => p.$color}14;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$color};
  margin-bottom: 0.5rem;
`;

const PipelineStepLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #0F172A;
`;

const PipelineStepSub = styled.div`
  font-size: 9px;
  color: #94A3B8;
  margin-top: 2px;
`;

const PipelineArrow = styled.div`
  color: #CBD5E1;
  flex-shrink: 0;
  margin-bottom: 1rem;
`;

/* ─── CTA ─── */
const CTASection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const CTABox = styled(motion.div)`
  background: linear-gradient(135deg, #0C1929, #0F2847);
  border-radius: 28px;
  padding: 4rem;
  text-align: center;
  @media (max-width: 768px) { padding: 2.5rem 1.5rem; }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
`;

const CTABtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-weight: 700;
  font-size: 16px;
  padding: 0.95rem 2rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 8px 24px rgba(6,182,212,0.35);
`;

function ChatbotPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const features = isNL ? [
    { icon: RefreshCw, color: '#06B6D4', title: 'Live training op gesprekken', text: 'Andere chatbots volgen alleen instructies. Ons systeem leert van elk gesprek , automatisch, zonder menselijke tussenkomst. Elke interactie maakt de chatbot slimmer.' },
    { icon: Target, color: '#3B82F6', title: 'A/B-vragen & gebruikersflows', text: 'Wij bouwen conversatieflows in waarbij de chatbot strategisch vragen stelt om de gebruiker richting een aankoop of conversie te leiden , zonder agressief te zijn.' },
    { icon: BarChart3, color: '#8B5CF6', title: 'Conversie-tracking over sessies', text: 'Wij tracken niet alleen één gesprek maar de volledige klantreis over meerdere sessies. Zo zie je exact hoeveel omzet je chatbot genereert.' },
    { icon: Zap, color: '#F59E0B', title: 'Kortingen & tools op regelbasis', text: 'De chatbot kan automatisch kortingen aanbieden op basis van klantgedrag, aankoophistorie of specifieke regels die je instelt, volledig geautomatiseerd.' },
    { icon: Bot, color: '#10B981', title: 'Getraind op je data', text: 'Wij trainen de chatbot op je producten, FAQs, conversaties en tone of voice. Het resultaat: een assistent die klinkt en denkt als je beste medewerker.' },
    { icon: TrendingUp, color: '#EC4899', title: 'Continu verbeteren', text: 'Maandelijks analyseren wij de chatbot-prestaties, passen we flows aan en trainen we opnieuw op nieuwe conversaties. Je chatbot groeit mee met je bedrijf.' },
  ] : [
    { icon: RefreshCw, color: '#06B6D4', title: 'Live training on conversations', text: 'Other chatbots only follow instructions. Our system learns from every conversation , automatically, without human intervention. Each interaction makes the chatbot smarter.' },
    { icon: Target, color: '#3B82F6', title: 'A/B questions & user flows', text: 'We build conversation flows where the chatbot strategically asks questions to guide the user towards a purchase or conversion , without being aggressive.' },
    { icon: BarChart3, color: '#8B5CF6', title: 'Cross-session conversion tracking', text: 'We track not just one conversation but the full customer journey across multiple sessions. See exactly how much revenue your chatbot generates.' },
    { icon: Zap, color: '#F59E0B', title: 'Discounts & rule-based tools', text: 'The chatbot can automatically offer discounts based on customer behaviour, purchase history or specific rules you set , fully automated.' },
    { icon: Bot, color: '#10B981', title: 'Trained on your data', text: 'We train the chatbot on your products, FAQs, conversations and tone of voice. The result: an assistant that sounds and thinks like your best employee.' },
    { icon: TrendingUp, color: '#EC4899', title: 'Continuous improvement', text: 'Monthly we analyse chatbot performance, adjust flows and retrain on new conversations. Your chatbot grows with your business.' },
  ];

  const channels = [
    { name: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp/25D366' },
    { name: 'Slack', logo: 'https://cdn.simpleicons.org/slack/4A154B' },
    { name: 'Discord', logo: 'https://cdn.simpleicons.org/discord/5865F2' },
    { name: 'Telegram', logo: 'https://cdn.simpleicons.org/telegram/26A5E4' },
    { name: 'Messenger', logo: 'https://cdn.simpleicons.org/messenger/0099FF' },
    { name: 'Website', logo: null },
    { name: 'Shopify', logo: 'https://cdn.simpleicons.org/shopify/7AB55C' },
    { name: 'Gmail', logo: 'https://cdn.simpleicons.org/gmail/EA4335' },
  ];

  const flowSteps = isNL ? [
    { title: 'Kennismaking & data-verzameling', desc: 'Wij verzamelen je productdata, bestaande FAQs, eerdere klantgesprekken en je tone of voice. Dit vormt de basis van de training.' },
    { title: 'Conversatieflow ontwerp', desc: 'Samen ontwerpen we de ideale klantreizen, van productadvies tot checkout. Inclusief A/B-vragen en beslisbomen voor conversie-optimalisatie.' },
    { title: 'Training & fine-tuning', desc: 'Wij trainen het taalmodel op je specifieke data en verfijnen het totdat de chatbot precies klinkt en handelt zoals je wilt.' },
    { title: 'Koppeling aan kanalen', desc: 'De chatbot wordt gekoppeld aan alle kanalen die je wilt, website, WhatsApp, Slack, Discord, Shopify en meer.' },
    { title: 'Live & monitoring', desc: 'Zodra de chatbot live gaat, monitoren we conversaties, conversies en leermomenten. Maandelijks draaien we een nieuwe trainingsronde.' },
    { title: 'Doorlopende optimalisatie', desc: 'Elke maand analyseren we prestaties en passen flows aan. Je chatbot wordt elk kwartaal meetbaar beter.' },
  ] : [
    { title: 'Intake & data collection', desc: 'We collect your product data, existing FAQs, past customer conversations and your tone of voice. This forms the foundation of training.' },
    { title: 'Conversation flow design', desc: 'Together we design ideal customer journeys , from product advice to checkout. Including A/B questions and decision trees for conversion optimisation.' },
    { title: 'Training & fine-tuning', desc: 'We train the language model on your specific data and refine it until the chatbot sounds and acts exactly as you want.' },
    { title: 'Channel integration', desc: 'The chatbot is connected to all channels you want , website, WhatsApp, Slack, Discord, Shopify and more.' },
    { title: 'Live & monitoring', desc: 'Once live, we monitor conversations, conversions and learning moments. Monthly we run a new training round.' },
    { title: 'Ongoing optimisation', desc: 'Every month we analyse performance and adjust flows. Your chatbot measurably improves every quarter.' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <PageHero>
        <Container>
          <HeroGrid>
            <div>
              <HeroBadge>
                <MessageCircle size={12} />
                {isNL ? 'AI Chatbot · Optivaize' : 'AI Chatbot · Optivaize'}
              </HeroBadge>
              <H1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {isNL ? (
                  <>De chatbot die <Gradient>leert van elk gesprek</Gradient></>
                ) : (
                  <>The chatbot that <Gradient>learns from every conversation</Gradient></>
                )}
              </H1>
              <HeroSub initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                {isNL
                  ? 'Wij zijn de enigen die chatbots bouwen die over-the-air getraind worden op echte gesprekken. Geen statische instructieset, maar een systeem dat elke dag slimmer wordt en je conversies structureel verhoogt.'
                  : 'We are the only ones building chatbots that are over-the-air trained on real conversations. No static instruction set , a system that gets smarter every day and structurally increases your conversions.'}
              </HeroSub>
              <HeroBtns>
                <BtnPrimary
                  href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isNL ? 'Gratis chatbot demo' : 'Free chatbot demo'}
                  <ArrowRight size={16} />
                </BtnPrimary>
                <BtnSecondary to="/cases" whileHover={{ scale: 1.02 }}>
                  {isNL ? 'Bekijk resultaten' : 'View results'}
                </BtnSecondary>
              </HeroBtns>
            </div>
            <ChatbotDemo language={language} />
          </HeroGrid>
        </Container>
      </PageHero>

      {/* ── UNIQUE CLAIM ── */}
      <Section>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel>{isNL ? 'Wat ons anders maakt' : 'What makes us different'}</SectionLabel>
              <SectionTitle>
                {isNL
                  ? 'Andere chatbots volgen instructies. De onze leren.'
                  : 'Other chatbots follow instructions. Ours learn.'}
              </SectionTitle>
              <SectionText>
                {isNL
                  ? 'De meeste chatbots werken op basis van een statische instructieset of kennisbank. Zodra een vraag buiten het script valt, faalt de bot. Bij Optivaize trainen wij chatbots continu opnieuw op basis van echte klantgesprekken.'
                  : 'Most chatbots work from a static instruction set or knowledge base. When a question falls outside the script, the bot fails. At Optivaize we continuously retrain chatbots based on real customer conversations.'}
              </SectionText>
              <SectionText>
                {isNL
                  ? 'Elke succesvolle conversatie, elke aankoop, elke klantinteractie wordt gebruikt om het model te verbeteren. Na 3 maanden heb je een chatbot die je best-presterende medewerker presteert, 24/7, op alle kanalen tegelijk.'
                  : 'Every successful conversation, every purchase, every customer interaction is used to improve the model. After 3 months you have a chatbot performing like your best employee , 24/7, on all channels simultaneously.'}
              </SectionText>
              <CheckList>
                {(isNL ? [
                  'Over-the-air training op echte klantgesprekken',
                  'A/B-testvragen voor maximale conversie',
                  'Automatische kortingen op basis van klantgedrag',
                  'Conversie-tracking over meerdere sessies',
                  'Koppeling aan alle kanalen die u gebruikt',
                ] : [
                  'Over-the-air training on real customer conversations',
                  'A/B test questions for maximum conversion',
                  'Automatic discounts based on customer behaviour',
                  'Conversion tracking across multiple sessions',
                  'Integration with all channels you use',
                ]).map((item, i) => (
                  <CheckItem key={i}>
                    <CheckCircle size={18} color="#06B6D4" />
                    {item}
                  </CheckItem>
                ))}
              </CheckList>
            </FadeIn>
            <FadeIn delay={0.15}>
              <img src="/uploads/passion_icebaths.png" alt="Passion Ice Baths chatbot" style={{ width: '100%', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ── FEATURES ── */}
      <Section $dark>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionLabel $light>{isNL ? 'Mogelijkheden' : 'Capabilities'}</SectionLabel>
              <SectionTitle $light>
                {isNL ? 'Alles wat je chatbot nodig heeft om te converteren' : 'Everything your chatbot needs to convert'}
              </SectionTitle>
            </div>
          </FadeIn>
          <FeatureGrid>
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <FeatureCard $dark initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <FeatureIcon $color={f.color}><Icon size={22} /></FeatureIcon>
                    <FeatureTitle $light>{f.title}</FeatureTitle>
                    <FeatureText $light>{f.text}</FeatureText>
                  </FeatureCard>
                </FadeIn>
              );
            })}
          </FeatureGrid>
        </Container>
      </Section>

      {/* ── CHANNELS ── */}
      <Section $dark style={{ paddingTop: 0 }}>
        <Container>
          <TwoCol>
            <FadeIn>
              <SectionLabel $light>{isNL ? 'Kanalen' : 'Channels'}</SectionLabel>
              <SectionTitle $light>
                {isNL ? 'Je chatbot werkt overal waar je klanten zijn' : 'Your chatbot works everywhere your customers are'}
              </SectionTitle>
              <SectionText $light>
                {isNL
                  ? 'Wij koppelen je chatbot aan elk kanaal dat je gebruikt. Eén intelligente kern, overal inzetbaar. Hetzelfde getrainde model staat klaar op je website, in WhatsApp, Slack, Discord en meer.'
                  : 'We connect your chatbot to every channel you use. One intelligent core , deployable everywhere. The same trained model is ready on your website, in WhatsApp, Slack, Discord and more.'}
              </SectionText>
              <ChannelStrip>
                {channels.map((ch, i) => (
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
              <img src="/uploads/wimhof.png" alt="Wim Hof" style={{ width: '100%', borderRadius: '20px', display: 'block' }} loading="lazy" />
            </FadeIn>
          </TwoCol>
        </Container>
      </Section>

      {/* ── STATS ── */}
      <Section $dark style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Container>
          <StatsRow>
            {[
              { num: '24/7', label: isNL ? 'Beschikbaar, geen overwerk' : 'Available, no overtime' },
              { num: '+34%', label: isNL ? 'Gemiddelde conversiestijging' : 'Average conversion increase' },
              { num: '3×', label: isNL ? 'Sneller reageren dan menselijk team' : 'Faster response than human team' },
              { num: '90d', label: isNL ? 'Tot schaalbaar resultaat' : 'To scalable results' },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <StatCard>
                  <StatNum>{s.num}</StatNum>
                  <StatLabel>{s.label}</StatLabel>
                </StatCard>
              </FadeIn>
            ))}
          </StatsRow>
        </Container>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section $gray>
        <Container>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionLabel>{isNL ? 'Aanpak' : 'Approach'}</SectionLabel>
              <SectionTitle>
                {isNL ? 'Van intake tot chatbot die verkoopt' : 'From intake to chatbot that sells'}
              </SectionTitle>
              <SectionText style={{ maxWidth: 600, margin: '0 auto' }}>
                {isNL
                  ? 'Wij nemen de volledige implementatie op ons, van data-verzameling en training tot live-gang en maandelijkse optimalisatie.'
                  : 'We handle the entire implementation, from data collection and training to go-live and monthly optimisation.'}
              </SectionText>
            </div>
          </FadeIn>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <FlowWrap>
              {flowSteps.map((s, i) => (
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

      {/* ── CTA ── */}
      <CTASection>
        <Container>
          <FadeIn>
            <CTABox initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionLabel $light style={{ color: '#22D3EE' }}>
                {isNL ? 'Klaar om te starten?' : 'Ready to get started?'}
              </SectionLabel>
              <CTATitle>
                {isNL
                  ? 'Laat je chatbot voor jou werken, 24/7'
                  : 'Let your chatbot work for you , 24/7'}
              </CTATitle>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                {isNL
                  ? 'Wij starten met een gratis intake. Binnen 2 weken heb je een werkende chatbot op je eerste kanaal.'
                  : 'We start with a free intake. Within 2 weeks you have a working chatbot on your first channel.'}
              </p>
              <CTABtn
                href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isNL ? 'Plan gratis intake' : 'Book free intake'}
                <ArrowRight size={17} />
              </CTABtn>
            </CTABox>
          </FadeIn>
        </Container>
      </CTASection>
    </>
  );
}

export default ChatbotPage;

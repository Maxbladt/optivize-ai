'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Sparkles, Phone, Calendar, ShoppingBag, UtensilsCrossed, Home } from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const PageHero = styled.section`
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 60% at 80% 50%, rgba(59,130,246,0.08), transparent);
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const H1 = styled(motion.h1)`
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  max-width: 700px;
`;

const Sub = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.7;
  max-width: 580px;
`;

const Section = styled.section`
  padding: 80px 0;
  background: #F8FAFC;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 22px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(15,23,42,0.1);
    border-color: #3B82F6;
  }
`;

const CardCover = styled.div`
  height: 180px;
  background: ${(p) => p.$bg || GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 80% 30%, rgba(255,255,255,0.18), transparent 60%);
  }
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 1;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(16,185,129,0.1);
  color: #047857;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  align-self: flex-start;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #0F172A;
`;

const CardText = styled.p`
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #F1F5F9;
  color: #475569;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  font-size: 0.78rem;
`;

const PriceLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  margin-top: auto;
  border-top: 1px solid #E2E8F0;
  font-size: 0.85rem;
  color: #64748B;
  strong { color: #0F172A; }
`;

const CtaRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
`;

const ButtonPrimary = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${GRADIENT};
  color: white;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
`;

const ButtonGhost = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid #E2E8F0;
  color: #475569;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
`;

const ComingSoon = styled(Card)`
  opacity: 0.7;
  &:hover { transform: none; box-shadow: none; border-color: #E2E8F0; }
`;

const PRODUCTS = [
  {
    slug: 'ai-assistent',
    href: '/ai-assistent',
    cover: GRADIENT,
    icon: <Mic size={56} color="white" />,
    pill: 'Live & beschikbaar',
    title: 'AI Voice Assistent',
    text: 'Nederlandstalige spraakassistent die afspraken plant, vragen beantwoordt en bestellingen verwerkt. 24/7 bereikbaar, koppelt aan jouw systemen, live binnen 1-3 dagen.',
    tags: [
      { icon: <Calendar size={11} />, label: 'Tandarts' },
      { icon: <ShoppingBag size={11} />, label: 'Webshop' },
      { icon: <UtensilsCrossed size={11} />, label: 'Restaurant' },
      { icon: <Home size={11} />, label: 'Makelaar' },
    ],
    price: 'Setup vanaf €750 - €100/maand',
    primaryLabel: 'Probeer demo',
  },
];

function ProductenPage() {
  return (
    <>
      <SEOHead
        title="Producten - Onze AI oplossingen | Optivaize"
        description="Bekijk onze AI-producten: voice assistenten, chatbots en automatiseringen voor Nederlandse bedrijven. Live binnen dagen, gekoppeld aan jouw systemen."
        keywords="AI producten, voice assistent, AI chatbot, automatisering Nederland"
      />
      <PageHero>
        <Container>
          <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Onze producten
          </H1>
          <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Kant-en-klare AI oplossingen die we koppelen aan jouw bestaande systemen. Probeer ze live - geen installatie nodig.
          </Sub>
        </Container>
      </PageHero>

      <Section>
        <Container>
          <Grid>
            {PRODUCTS.map((p, i) => (
              <Link key={p.slug} href={p.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  <CardCover $bg={p.cover}>{p.icon}</CardCover>
                  <CardBody>
                    <Pill><Sparkles size={10} /> {p.pill}</Pill>
                    <CardTitle>{p.title}</CardTitle>
                    <CardText>{p.text}</CardText>
                    <Tags>
                      {p.tags.map((t) => (
                        <Tag key={t.label}>{t.icon} {t.label}</Tag>
                      ))}
                    </Tags>
                    <PriceLine>
                      <span><strong>Prijs:</strong> {p.price}</span>
                    </PriceLine>
                    <CtaRow>
                      <ButtonPrimary>{p.primaryLabel} <ArrowRight size={14} /></ButtonPrimary>
                    </CtaRow>
                  </CardBody>
                </Card>
              </Link>
            ))}

            <ComingSoon initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CardCover $bg="linear-gradient(135deg, #475569, #1E293B)"><Phone size={56} color="white" /></CardCover>
              <CardBody>
                <Pill style={{ background: 'rgba(148,163,184,0.15)', color: '#475569' }}>Binnenkort</Pill>
                <CardTitle>AI Telefonie</CardTitle>
                <CardText>Onze voice assistent gekoppeld aan jouw zakelijke telefoonnummer via VoIP. Werk wordt momenteel uitgerold bij eerste klanten.</CardText>
                <PriceLine>
                  <span style={{ fontStyle: 'italic' }}>Op aanvraag beschikbaar</span>
                </PriceLine>
                <CtaRow>
                  <Link href="/contact" style={{ textDecoration: 'none' }}>
                    <ButtonGhost>Vraag het aan <ArrowRight size={14} /></ButtonGhost>
                  </Link>
                </CtaRow>
              </CardBody>
            </ComingSoon>

            <ComingSoon initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <CardCover $bg="linear-gradient(135deg, #475569, #1E293B)"><Sparkles size={56} color="white" /></CardCover>
              <CardBody>
                <Pill style={{ background: 'rgba(148,163,184,0.15)', color: '#475569' }}>In ontwikkeling</Pill>
                <CardTitle>Meer komt eraan</CardTitle>
                <CardText>We bouwen continu aan nieuwe AI-producten voor Nederlandse bedrijven. Heb je een idee of een use case in gedachten? We horen het graag.</CardText>
                <PriceLine>
                  <span style={{ fontStyle: 'italic' }}>Custom op verzoek</span>
                </PriceLine>
                <CtaRow>
                  <Link href="/contact" style={{ textDecoration: 'none' }}>
                    <ButtonGhost>Praat met ons <ArrowRight size={14} /></ButtonGhost>
                  </Link>
                </CtaRow>
              </CardBody>
            </ComingSoon>
          </Grid>
        </Container>
      </Section>
    </>
  );
}

export default ProductenPage;

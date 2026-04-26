'use client';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mic, ArrowRight, Sparkles, Phone, Calendar, ShoppingBag, UtensilsCrossed, Home as HomeIcon } from 'lucide-react';
import Link from '../components/Link';
import SEOHead from '../components/SEOHead';
import { NICHES } from '../components/voice/niche-content';

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

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(15,23,42,0.1);
    border-color: #3B82F6;
  }
`;

const CardCover = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  background: ${GRADIENT};
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(15,23,42,0.55));
  }
`;

const CardCoverBadge = styled.span`
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255,255,255,0.92);
  color: #0F172A;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
`;

const CardCoverIcon = styled.div`
  position: absolute;
  bottom: 14px;
  left: 14px;
  z-index: 2;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255,255,255,0.95);
  color: #0F172A;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0F172A;
`;

const CardText = styled.p`
  margin: 0;
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.55;
  flex: 1;
`;

const CardCta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #3B82F6;
  font-weight: 700;
  font-size: 0.92rem;
  margin-top: 0.4rem;
`;

const SubHeader = styled.div`
  margin-top: 3rem;
`;

const ComingSoonGrid = styled(Grid)`
  margin-top: 1rem;
`;

const ComingCard = styled(Card)`
  opacity: 0.7;
  cursor: default;
  &:hover { transform: none; box-shadow: none; border-color: #E2E8F0; }
`;

const NICHE_ICONS = {
  tandarts: <Calendar size={22} />,
  webshop: <ShoppingBag size={22} />,
  restaurant: <UtensilsCrossed size={22} />,
  makelaar: <HomeIcon size={22} />,
};

function ProductenPage() {
  const niches = Object.values(NICHES);

  return (
    <>
      <SEOHead
        title="Producten - Onze AI oplossingen | Optivaize"
        description="Bekijk onze kant-en-klare AI voice assistenten voor tandartsen, webshops, restaurants en makelaars. Live binnen dagen, gekoppeld aan jouw systemen."
        keywords="AI producten, voice assistent tandarts, voice assistent webshop, AI restaurant, AI makelaar"
      />
      <PageHero>
        <Container>
          <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Onze producten
          </H1>
          <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Kant-en-klare AI voice assistenten per branche. Probeer ze live - geen installatie nodig, geen creditcard nodig.
          </Sub>
        </Container>
      </PageHero>

      <Section>
        <Container>
          <SectionTitle><Mic size={20} color="#3B82F6" /> AI Voice Assistenten</SectionTitle>
          <Grid>
            {niches.map((n, i) => (
              <Link key={n.key} href={`/ai-assistent/${n.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  <CardCover>
                    <img src={n.hero.image.replace(/&w=\d+/, '&w=600')} alt={n.hero.imageAlt} loading="lazy" />
                    <CardCoverBadge><Sparkles size={10} /> Live demo</CardCoverBadge>
                    <CardCoverIcon>{NICHE_ICONS[n.key]}</CardCoverIcon>
                  </CardCover>
                  <CardBody>
                    <CardTitle>Voor {n.pretty}</CardTitle>
                    <CardText>{n.hero.sub}</CardText>
                    <CardCta>Probeer demo <ArrowRight size={14} /></CardCta>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>

          <SubHeader>
            <SectionTitle><Phone size={20} color="#94A3B8" /> Binnenkort</SectionTitle>
            <ComingSoonGrid>
              <ComingCard initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <CardCover style={{ background: 'linear-gradient(135deg, #475569, #1E293B)' }}>
                  <CardCoverBadge style={{ background: 'rgba(148,163,184,0.18)', color: '#475569' }}>In ontwikkeling</CardCoverBadge>
                  <CardCoverIcon><Phone size={22} /></CardCoverIcon>
                </CardCover>
                <CardBody>
                  <CardTitle>Branche op maat</CardTitle>
                  <CardText>Werk je in een andere branche? We bouwen voice assistenten op maat voor accountants, advocatenkantoren, kapsalons, autobedrijven en meer.</CardText>
                  <Link href="/contact" style={{ textDecoration: 'none' }}>
                    <CardCta style={{ color: '#475569' }}>Vraag het aan <ArrowRight size={14} /></CardCta>
                  </Link>
                </CardBody>
              </ComingCard>
            </ComingSoonGrid>
          </SubHeader>
        </Container>
      </Section>
    </>
  );
}

export default ProductenPage;

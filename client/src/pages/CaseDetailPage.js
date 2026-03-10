import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage, translations } from '../LanguageContext';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

/* ── Slug ↔ ID mapping ── */
const slugToId = {
  'fonteyn': 'fonteyn',
  'aanhuis': 'aanhuis',
  'blosh': 'blosh',
  'red-button': 'redbutton',
  'stakepvp': 'stakepvp',
  'passion-ice-baths': 'passion',
};

export const idToSlug = {
  fonteyn: 'fonteyn',
  aanhuis: 'aanhuis',
  blosh: 'blosh',
  redbutton: 'red-button',
  stakepvp: 'stakepvp',
  passion: 'passion-ice-baths',
};

const caseStaticConfig = {
  fonteyn: { logo: '/uploads/fonteyn_logo.png', image: '/uploads/fonteyn_dashboard.png', partnerLogos: [] },
  aanhuis: { logo: '/uploads/aanhuis.png', image: '/uploads/aanhuis_voorkant.png', partnerLogos: [] },
  blosh: { logo: '/uploads/blosh.png', image: '/uploads/blosh_office.png', partnerLogos: [] },
  redbutton: { logo: '/uploads/red_button_logo.png', image: '/uploads/magic_apparels_dashboard.png', partnerLogos: ['/uploads/sage_intacct_logo.png', '/uploads/becosoft_logo.png'] },
  stakepvp: { logo: '/uploads/stakepvp_logo.png', image: '/uploads/stakepvp_logo.png', partnerLogos: ['/uploads/privy_logo.png', '/uploads/helius_logo.png'] },
  passion: { logo: '/uploads/passion_icebaths_logo.png', image: '/uploads/passion_icebaths.png', partnerLogos: [] },
};

/* ──── Styled Components ──── */

const BackBar = styled.div`
  padding: 110px 0 0;
  background: linear-gradient(135deg, #0F172A, #1E293B);
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: 768px) { padding: 0 1rem; }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748B;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
  padding: 1.25rem 0 0;
  &:hover { color: white; }
`;

/* Hero */
const HeroSection = styled.section`
  position: relative;
  padding: 2.5rem 0 4rem;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  overflow: hidden;
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const Company = styled(motion.div)`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.75rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1.25rem;
`;

const HeroIntro = styled(motion.p)`
  font-size: 19px;
  color: #94A3B8;
  line-height: 1.75;
  max-width: 640px;
`;

/* Featured Image */
const FeaturedImageWrap = styled.div`
  background: linear-gradient(180deg, #0F172A 0%, #0F172A 50%, white 50%, white 100%);
  padding: 0 0 3rem;
`;

const FeaturedImageInner = styled(motion.div)`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.6) 100%);
`;

const FeaturedLogo = styled.div`
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  background: rgba(255,255,255,0.95);
  padding: 0.6rem 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  backdrop-filter: blur(8px);

  img {
    height: 32px;
    width: auto;
    display: block;
  }
`;

/* Article */
const ArticleSection = styled.section`
  padding: 4.5rem 0 5rem;
  background: white;
`;

const ArticleWrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const ArticleBody = styled.div`
  font-size: 18px;
  color: #334155;
  line-height: 1.85;

  p {
    margin-bottom: 1.5rem;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #E2E8F0;
  margin: 3rem 0;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3B82F6;
  margin-bottom: 0.75rem;
`;

const SectionHeading = styled.h2`
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 800;
  color: #0F172A;
  margin-bottom: 1.75rem;
  line-height: 1.2;
`;

/* Deliverables */
const DeliverablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const DeliverableCard = styled(motion.div)`
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  background: #FAFBFC;
  transition: all 0.2s;
  &:hover {
    border-color: rgba(59,130,246,0.25);
    box-shadow: 0 4px 20px rgba(59,130,246,0.06);
  }
`;

const DeliverableTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.35rem;
`;

const DeliverableDesc = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.55;
`;

/* Tech Stack */
const TechBox = styled.div`
  margin-top: 2.5rem;
  padding: 1.5rem 2rem;
  background: #F8FAFC;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
`;

const TechLogos = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  img {
    height: 34px;
    width: auto;
    object-fit: contain;
    filter: grayscale(0.2);
    transition: filter 0.2s;
    &:hover { filter: none; }
  }
`;

/* CTA */
const CtaSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;
  text-align: center;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 80% at 50% 100%, rgba(59,130,246,0.1), transparent);
  }
`;

const CtaInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 auto;
`;

const CtaTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1rem;
`;

const GradientSpan = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CtaSub = styled(motion.p)`
  font-size: 18px;
  color: #94A3B8;
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const CtaBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 0.875rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(59,130,246,0.35);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 8px 30px rgba(59,130,246,0.5); }
`;

/* ──── Component ──── */

function CaseDetailPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const isNL = language === 'nl';

  const caseId = slugToId[slug];
  if (!caseId) return <Navigate to="/cases" replace />;

  const t = translations[language].cases;
  const caseData = t.items.find(item => item.id === caseId);
  const config = caseStaticConfig[caseId];

  if (!caseData || !config) return <Navigate to="/cases" replace />;

  /* Split description into readable paragraphs */
  const paragraphs = caseData.description
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .filter(Boolean);

  return (
    <>
      <BackBar>
        <Container>
          <BackLink to="/cases">
            <ArrowLeft size={16} />
            {isNL ? 'Ga terug naar cases' : 'Back to cases'}
          </BackLink>
        </Container>
      </BackBar>

      {/* ── Hero ── */}
      <HeroSection>
        <Container>
          <HeroInner>
            <Company
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {caseData.company}
            </Company>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              {caseData.title}
            </HeroTitle>
            <HeroIntro
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {caseData.preview}
            </HeroIntro>
          </HeroInner>
        </Container>
      </HeroSection>

      {/* ── Featured Image ── */}
      <FeaturedImageWrap>
        <Container>
          <FeaturedImageInner
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <FeaturedImage src={config.image} alt={caseData.company} />
            <FeaturedOverlay />
            <FeaturedLogo>
              <img src={config.logo} alt={caseData.company} />
            </FeaturedLogo>
          </FeaturedImageInner>
        </Container>
      </FeaturedImageWrap>

      {/* ── Article ── */}
      <ArticleSection>
        <Container>
          <ArticleWrap>
            <ArticleBody>
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {p}
                </motion.p>
              ))}
            </ArticleBody>

            {config.partnerLogos.length > 0 && (
              <>
                <Divider />
                <TechBox>
                  <SectionLabel>Tech Stack</SectionLabel>
                  <TechLogos>
                    {config.partnerLogos.map((logo, i) => (
                      <img key={i} src={logo} alt="Technology" />
                    ))}
                  </TechLogos>
                </TechBox>
              </>
            )}

            <Divider />

            <SectionLabel>
              {isNL ? 'WAT WIJ HEBBEN OPGELEVERD' : 'WHAT WE DELIVERED'}
            </SectionLabel>
            <SectionHeading>
              {isNL ? 'Resultaten & opleveringen' : 'Results & deliverables'}
            </SectionHeading>

            <DeliverablesGrid>
              {caseData.detailedResults.map((result, i) => (
                <DeliverableCard
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <DeliverableTitle>{result.title}</DeliverableTitle>
                  <DeliverableDesc>{result.description}</DeliverableDesc>
                </DeliverableCard>
              ))}
            </DeliverablesGrid>
          </ArticleWrap>
        </Container>
      </ArticleSection>

      {/* ── CTA ── */}
      <CtaSection>
        <Container>
          <CtaInner>
            <CtaTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {isNL
                ? <>Vergelijkbare resultaten voor <GradientSpan>je bedrijf</GradientSpan>?</>
                : <>Similar results for <GradientSpan>your business</GradientSpan>?</>}
            </CtaTitle>
            <CtaSub
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isNL
                ? 'Plan een gratis gesprek en ontdek wat wij voor je bedrijf kunnen bouwen.'
                : 'Book a free call and discover what we can build for your business.'}
            </CtaSub>
            <CtaBtn
              href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isNL ? 'Plan gratis gesprek' : 'Book free call'}
              <ArrowRight size={17} />
            </CtaBtn>
          </CtaInner>
        </Container>
      </CtaSection>
    </>
  );
}

export default CaseDetailPage;

'use client';
import React, { useState, useEffect } from 'react';
import Link from '../components/Link';
import { useParams, useRouter } from '../hooks';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import SEOHead from '../components/SEOHead';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

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
  @media (max-width: 768px) { height: 260px; }
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
  img { height: 32px; width: auto; display: block; }
`;

/* Article */
const ArticleSection = styled.section`
  padding: 4.5rem 0 5rem;
  background: white;
`;

const ArticleWrap = styled.div`
  max-width: 810px;
  margin: 0 auto;
`;

const ArticleBody = styled.div`
  font-size: 18px;
  color: #334155;
  line-height: 1.85;
  p { margin-bottom: 1.5rem; }
  h1, h2, h3 { color: #0F172A; margin: 2rem 0 0.75rem; }
  h2 { font-size: 24px; font-weight: 700; }
  h3 { font-size: 20px; font-weight: 700; }
  ul, ol { margin: 0.5rem 0 1.25rem 1.5rem; }
  li { margin-bottom: 0.5rem; }
  img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
  a { color: #3B82F6; }

  .dark-section {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding-left: calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
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
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const [caseData, setCaseData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/cases/${slug}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then(data => data && setCaseData(data))
      .catch(() => setNotFound(true));
  }, [slug]);

  useEffect(() => {
    if (notFound) router.replace('/cases');
  }, [notFound, router]);
  if (notFound) return null;
  if (!caseData) return null;

  const title = isNL ? caseData.title_nl : caseData.title_en;
  const preview = isNL ? caseData.preview_nl : caseData.preview_en;
  const description = isNL ? caseData.description_nl : caseData.description_en;
  const partnerLogos = caseData.partner_logos || [];

  // Detect if description contains HTML tags
  const isHTML = /<[a-z][\s\S]*>/i.test(description);
  const paragraphs = !isHTML ? description.split(/\n\n+/).filter(Boolean) : [];

  return (
    <>
      <SEOHead
        title={`${caseData.title_nl || caseData.title_en} | Optivaize Cases`}
        description={caseData.preview_nl || caseData.preview_en || ''}
        canonicalUrl={`https://optivaize.nl/cases/${caseData.slug}`}
        ogImage={caseData.image ? `https://optivaize.nl${caseData.image}` : "https://optivaize.nl/uploads/optivaize_logo_new.png"}
        breadcrumbs={[{name:"Home",url:"https://optivaize.nl"},{name:"Cases",url:"https://optivaize.nl/cases"},{name: caseData.title_nl || caseData.title_en, url:`https://optivaize.nl/cases/${caseData.slug}`}]}
      />
      <BackBar>
        <Container>
          <BackLink to="/cases">
            <ArrowLeft size={16} />
            {isNL ? 'Ga terug naar cases' : 'Back to cases'}
          </BackLink>
        </Container>
      </BackBar>

      {/* Hero */}
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
              {title}
            </HeroTitle>
            <HeroIntro
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {preview}
            </HeroIntro>
          </HeroInner>
        </Container>
      </HeroSection>

      {/* Featured Image */}
      <FeaturedImageWrap>
        <Container>
          <FeaturedImageInner
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <FeaturedImage src={caseData.image} alt={caseData.company} />
            <FeaturedOverlay />
            <FeaturedLogo>
              <img src={caseData.logo} alt={caseData.company} />
            </FeaturedLogo>
          </FeaturedImageInner>
        </Container>
      </FeaturedImageWrap>

      {/* Article */}
      <ArticleSection>
        <Container>
          <ArticleWrap>
            <ArticleBody>
              {isHTML ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    {p}
                  </motion.p>
                ))
              )}
            </ArticleBody>

            {partnerLogos.length > 0 && (
              <>
                <Divider />
                <TechBox>
                  <SectionLabel>Tech Stack</SectionLabel>
                  <TechLogos>
                    {partnerLogos.map((logo, i) => (
                      <img key={i} src={logo} alt="Technology" />
                    ))}
                  </TechLogos>
                </TechBox>
              </>
            )}

          </ArticleWrap>
        </Container>
      </ArticleSection>

      {/* CTA */}
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

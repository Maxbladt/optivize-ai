'use client';
import React from 'react';
import Link from '../components/Link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Image from 'next/image';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

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

const HeroSection = styled.section`
  padding: 2.5rem 0 4rem;
  background: linear-gradient(135deg, #0F172A, #1E293B);
`;

const HeroInner = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 1.25rem;
`;

const HeroMeta = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 14px;
  color: #94A3B8;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const FeaturedImageWrap = styled.div`
  background: linear-gradient(180deg, #0F172A 0%, #0F172A 50%, white 50%, white 100%);
  padding: 0 0 3rem;
`;

const FeaturedImageInner = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  position: relative;
  height: 420px;
  @media (max-width: 768px) { height: 260px; }
`;

const ArticleSection = styled.section`
  padding: 3rem 0 5rem;
  background: white;
`;

const ArticleWrap = styled.div`
  max-width: 810px;
  margin: 0 auto;
`;

const ArticleContent = styled.div`
  font-size: 18px;
  color: #334155;
  line-height: 1.85;

  h1 { font-size: 32px; font-weight: 800; color: #0F172A; margin: 2rem 0 1rem; }
  h2 { font-size: 26px; font-weight: 700; color: #0F172A; margin: 2rem 0 0.75rem; }
  h3 { font-size: 20px; font-weight: 700; color: #0F172A; margin: 1.5rem 0 0.5rem; }
  p { margin-bottom: 1.25rem; }
  ul, ol { margin: 0.5rem 0 1.25rem 1.5rem; }
  li { margin-bottom: 0.5rem; }
  img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
  a { color: #3B82F6; text-decoration: underline; }
  blockquote {
    border-left: 4px solid #3B82F6;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
    color: #64748B;
    font-style: italic;
    background: #F8FAFC;
    border-radius: 0 8px 8px 0;
  }
  table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
  th, td { padding: 0.75rem; border: 1px solid #E2E8F0; text-align: left; }
  th { background: #F8FAFC; font-weight: 600; }
  code { background: #F1F5F9; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
  pre { background: #0F172A; color: #E2E8F0; padding: 1.25rem; border-radius: 12px; overflow-x: auto; margin: 1.5rem 0; }
  pre code { background: none; padding: 0; color: inherit; }

  .dark-section {
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
    padding-left: calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
  }
`;

const CtaSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  text-align: center;
`;

const CtaTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: white;
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
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
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
`;

export default function BlogDetailPage({ blog }) {
  if (!blog) return null;

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <>
      <BackBar>
        <Container>
          <BackLink to="/blog"><ArrowLeft size={16} /> Terug naar blog</BackLink>
        </Container>
      </BackBar>

      <HeroSection>
        <Container>
          <HeroInner>
            <HeroTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {blog.title}
            </HeroTitle>
            <HeroMeta
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <MetaItem><User size={15} /> {blog.author}</MetaItem>
              <MetaItem><Calendar size={15} /> {formatDate(blog.published_at)}</MetaItem>
            </HeroMeta>
          </HeroInner>
        </Container>
      </HeroSection>

      {blog.featured_image && (
        <FeaturedImageWrap>
          <Container>
            <FeaturedImageInner
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 1000px"
                priority
              />
            </FeaturedImageInner>
          </Container>
        </FeaturedImageWrap>
      )}

      <ArticleSection>
        <Container>
          <ArticleWrap>
            <ArticleContent dangerouslySetInnerHTML={{ __html: blog.content_html }} />
          </ArticleWrap>
        </Container>
      </ArticleSection>

      <CtaSection>
        <Container>
          <CtaTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Klaar om te <GradientSpan>starten</GradientSpan>?
          </CtaTitle>
          <CtaSub
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Neem contact op en ontdek wat AI voor jouw bedrijf kan betekenen.
          </CtaSub>
          <CtaBtn
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Neem contact op
          </CtaBtn>
        </Container>
      </CtaSection>
    </>
  );
}

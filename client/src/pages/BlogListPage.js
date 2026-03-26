'use client';
import React, { useState, useEffect } from 'react';
import Link from '../components/Link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const HeroSection = styled.section`
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 4vw, 3rem);
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

const HeroSub = styled(motion.p)`
  font-size: 18px;
  color: #94A3B8;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
`;

const BlogSection = styled.section`
  padding: 4rem 0 6rem;
  background: #F8FAFC;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const BlogCard = styled(motion(Link))`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid #E2E8F0;
  transition: all 0.25s;
  display: flex;
  flex-direction: column;
  &:hover {
    border-color: rgba(59,130,246,0.3);
    box-shadow: 0 8px 30px rgba(59,130,246,0.08);
    transform: translateY(-4px);
  }
`;

const BlogImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${p => p.src ? `url(${p.src})` : GRADIENT};
  background-size: cover;
  background-position: center;
`;

const BlogBody = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BlogTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  font-size: 15px;
  color: #64748B;
  line-height: 1.65;
  flex: 1;
  margin-bottom: 1rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 13px;
  color: #94A3B8;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #3B82F6;
  font-size: 14px;
  font-weight: 600;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #F1F5F9;
`;

const Empty = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #94A3B8;
  font-size: 17px;
`;

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(r => r.json())
      .then(setBlogs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <>
      <SEOHead
        title="Blog | Optivaize, AI-bureau De Bilt"
        description="Lees de laatste inzichten over AI, automatisering en digitale transformatie. Tips, trends en praktische kennis van het Optivaize team in De Bilt."
        keywords="AI blog, automatisering, machine learning, digitale transformatie, Optivaize"
        canonicalUrl="https://optivaize.nl/blog"
        ogImage="https://optivaize.nl/uploads/optivaize_logo_new.png"
        breadcrumbs={[{name:'Home',url:'https://optivaize.nl'},{name:'Blog',url:'https://optivaize.nl/blog'}]}
      />

      <HeroSection>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Optivaize <GradientSpan>Blog</GradientSpan>
          </HeroTitle>
          <HeroSub
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            De laatste inzichten over AI, automatisering en digitale transformatie.
          </HeroSub>
        </Container>
      </HeroSection>

      <BlogSection>
        <Container>
          {loading ? null : blogs.length === 0 ? (
            <Empty>Binnenkort verschijnen hier onze eerste blogposts.</Empty>
          ) : (
            <BlogGrid>
              {blogs.map((blog, i) => (
                <BlogCard
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <BlogImage src={blog.featured_image} />
                  <BlogBody>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <BlogExcerpt>{blog.excerpt || blog.meta_description}</BlogExcerpt>
                    <BlogMeta>
                      <MetaItem><User size={13} /> {blog.author}</MetaItem>
                      <MetaItem><Calendar size={13} /> {formatDate(blog.published_at)}</MetaItem>
                    </BlogMeta>
                    <ReadMore>Lees meer <ArrowRight size={15} /></ReadMore>
                  </BlogBody>
                </BlogCard>
              ))}
            </BlogGrid>
          )}
        </Container>
      </BlogSection>
    </>
  );
}

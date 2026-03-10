import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../LanguageContext';
import { ArrowRight, MapPin, Clock, Briefcase, Brain, Eye, Layout, Code2, Cpu, ChevronDown, Send } from 'lucide-react';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

/* ──── Styled Components ──── */

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
  max-width: 1440px;
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
  padding: 5rem 0 7rem;
  background: white;
`;

const SectionHead = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SectionLabel = styled.div`
  font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: #3B82F6; margin-bottom: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.7rem, 2.5vw, 2.4rem); font-weight: 800;
  color: #0F172A; line-height: 1.15;
`;

/* ── Filter Tabs ── */

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  font-size: 13px;
  font-weight: 600;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  border: 1.5px solid ${props => props.$active ? '#3B82F6' : '#E2E8F0'};
  background: ${props => props.$active ? 'rgba(59,130,246,0.08)' : 'transparent'};
  color: ${props => props.$active ? '#3B82F6' : '#64748B'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3B82F6;
    color: #3B82F6;
  }
`;

/* ── Job Cards ── */

const JobsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 860px;
  margin: 0 auto;
`;

const JobCard = styled(motion.div)`
  background: white;
  border: 1.5px solid ${props => props.$expanded ? 'rgba(59,130,246,0.3)' : '#E2E8F0'};
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$expanded ? '0 8px 30px rgba(59,130,246,0.08)' : '0 2px 8px rgba(0,0,0,0.03)'};

  &:hover {
    border-color: rgba(59, 130, 246, 0.25);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.06);
  }
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem 2rem;
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding: 1.25rem 1.25rem;
    gap: 1rem;
  }
`;

const JobIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: ${props => props.$bg || GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const JobInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const JobTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.3rem;
`;

const JobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 13px;
  color: #94A3B8;
  font-weight: 500;
  svg { flex-shrink: 0; }
`;

const LocationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 12px;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: ${props => props.$remote ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)'};
  color: ${props => props.$remote ? '#059669' : '#2563EB'};
`;

const ExpandIcon = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  flex-shrink: 0;
  transition: all 0.2s ease;

  ${JobCard}:hover & {
    background: rgba(59,130,246,0.08);
    color: #3B82F6;
  }
`;

const JobBody = styled(motion.div)`
  overflow: hidden;
`;

const JobBodyInner = styled.div`
  padding: 0 2rem 2rem;
  border-top: 1px solid #F1F5F9;
  padding-top: 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem 1.5rem;
    padding-top: 1.25rem;
  }
`;

const JobDesc = styled.p`
  font-size: 15px;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (max-width: 640px) { grid-template-columns: 1fr; }

  li {
    font-size: 14px;
    color: #64748B;
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.5;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${GRADIENT};
    }
  }
`;

const ApplyBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${GRADIENT};
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(59,130,246,0.25);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 6px 24px rgba(59,130,246,0.4); }
`;

/* ── CTA ── */

const CtaSection = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 50% 80% at 50% 100%, rgba(59,130,246,0.1), transparent);
  }
`;

const CtaTitle = styled(motion.h2)`
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800; color: white; line-height: 1.15; margin-bottom: 1rem;
  position: relative; z-index: 2;
`;

const GradientSpan = styled.span`
  background: ${GRADIENT};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const CtaSub = styled(motion.p)`
  font-size: 18px; color: #94A3B8; line-height: 1.7; margin-bottom: 2.5rem;
  max-width: 520px; margin-left: auto; margin-right: auto;
  position: relative; z-index: 2;
`;

const CtaBtn = styled(motion.a)`
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: ${GRADIENT}; color: white; font-size: 16px; font-weight: 600;
  padding: 0.875rem 2rem; border-radius: 10px;
  box-shadow: 0 4px 20px rgba(59,130,246,0.35);
  transition: box-shadow 0.2s; position: relative; z-index: 2;
  &:hover { box-shadow: 0 8px 30px rgba(59,130,246,0.5); }
`;

/* ──── Jobs Data ──── */

const jobsNL = [
  {
    icon: Brain, bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    title: 'AI/ML Engineer',
    desc: 'Train en fine-tune grote taalmodellen en foundation models. Bouw AI-pipelines die direct waarde opleveren voor onze klanten. Je werkt met de nieuwste technieken in deep learning en MLOps.',
    location: 'Remote', type: 'Fulltime', level: 'Senior', locationType: 'remote',
    requirements: ['Ervaring met PyTorch / TensorFlow', 'Fine-tuning van LLMs', 'MLOps & model deployment', 'Python, cloud infra (AWS/GCP)', 'Begrip van RAG architecturen', 'Ervaring met vector databases'],
  },
  {
    icon: Eye, bg: 'linear-gradient(135deg, #EC4899, #DB2777)',
    title: 'Computer Vision & Inference Engineer',
    desc: 'Werk met state-of-the-art beeldmodellen. Optimaliseer inferentie, deploy vision pipelines en bouw real-time beeldherkenning. Focus op productie-ready computer vision oplossingen.',
    location: 'Remote', type: 'Fulltime', level: 'Medior / Senior', locationType: 'remote',
    requirements: ['Ervaring met computer vision modellen', 'Inference optimalisatie (ONNX, TensorRT)', 'Real-time image processing', 'Python, C++', 'Diffusion models kennis is een plus', 'Edge deployment ervaring'],
  },
  {
    icon: Layout, bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
    title: 'UX Designer - AI Products',
    desc: 'Ontwerp intuïtieve interfaces voor complexe AI-producten. Maak de kracht van AI toegankelijk voor eindgebruikers. Je werkt op kantoor samen met ons development team.',
    location: 'Utrecht', type: 'Fulltime', level: 'Medior', locationType: 'utrecht',
    requirements: ['Figma expert', 'Ervaring met complexe SaaS producten', 'Design systems kennis', 'User research & testing', 'Prototyping & wireframing', 'Oog voor micro-interacties'],
  },
  {
    icon: Code2, bg: 'linear-gradient(135deg, #10B981, #059669)',
    title: 'Full-Stack Engineer',
    desc: 'Bouw snelle, mooie applicaties met React, Node.js en moderne tooling. Je werkt direct samen met ons AI-team aan producten die klanten dagelijks gebruiken.',
    location: 'Remote', type: 'Fulltime', level: 'Medior / Senior', locationType: 'remote',
    requirements: ['React / Next.js / TypeScript', 'Node.js / Python backends', 'Database design (SQL & NoSQL)', 'API design & integraties', 'CI/CD & cloud deployment', 'Ervaring met AI-integraties is een plus'],
  },
  {
    icon: Cpu, bg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    title: 'AI Solutions Architect',
    desc: 'Ontwerp end-to-end AI-architecturen voor enterprise klanten. Van cloud-infra tot model deployment en monitoring. Je bent de brug tussen klant en technisch team.',
    location: 'Utrecht / Hybride', type: 'Fulltime', level: 'Senior', locationType: 'utrecht',
    requirements: ['Cloud architectuur (AWS/Azure/GCP)', 'AI/ML pipeline design', 'Klantcommunicatie & consultancy', 'Infrastructure as Code', 'Monitoring & observability', 'Minimaal 5 jaar ervaring'],
  },
];

const jobsEN = [
  {
    icon: Brain, bg: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    title: 'AI/ML Engineer',
    desc: 'Train and fine-tune large language models and foundation models. Build AI pipelines that directly deliver value for our clients. You work with the latest deep learning and MLOps techniques.',
    location: 'Remote', type: 'Full-time', level: 'Senior', locationType: 'remote',
    requirements: ['Experience with PyTorch / TensorFlow', 'LLM fine-tuning', 'MLOps & model deployment', 'Python, cloud infra (AWS/GCP)', 'Understanding of RAG architectures', 'Experience with vector databases'],
  },
  {
    icon: Eye, bg: 'linear-gradient(135deg, #EC4899, #DB2777)',
    title: 'Computer Vision & Inference Engineer',
    desc: 'Work with state-of-the-art image models. Optimize inference, deploy vision pipelines and build real-time image recognition. Focus on production-ready computer vision solutions.',
    location: 'Remote', type: 'Full-time', level: 'Mid / Senior', locationType: 'remote',
    requirements: ['Experience with computer vision models', 'Inference optimization (ONNX, TensorRT)', 'Real-time image processing', 'Python, C++', 'Diffusion models knowledge is a plus', 'Edge deployment experience'],
  },
  {
    icon: Layout, bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
    title: 'UX Designer - AI Products',
    desc: 'Design intuitive interfaces for complex AI products. Make the power of AI accessible to end users. You work on-site with our development team.',
    location: 'Utrecht', type: 'Full-time', level: 'Mid-level', locationType: 'utrecht',
    requirements: ['Figma expert', 'Experience with complex SaaS products', 'Design systems knowledge', 'User research & testing', 'Prototyping & wireframing', 'Eye for micro-interactions'],
  },
  {
    icon: Code2, bg: 'linear-gradient(135deg, #10B981, #059669)',
    title: 'Full-Stack Engineer',
    desc: 'Build fast, beautiful applications with React, Node.js and modern tooling. You work directly with our AI team on products that clients use daily.',
    location: 'Remote', type: 'Full-time', level: 'Mid / Senior', locationType: 'remote',
    requirements: ['React / Next.js / TypeScript', 'Node.js / Python backends', 'Database design (SQL & NoSQL)', 'API design & integrations', 'CI/CD & cloud deployment', 'AI integration experience is a plus'],
  },
  {
    icon: Cpu, bg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    title: 'AI Solutions Architect',
    desc: 'Design end-to-end AI architectures for enterprise clients. From cloud infra to model deployment and monitoring. You are the bridge between client and technical team.',
    location: 'Utrecht / Hybrid', type: 'Full-time', level: 'Senior', locationType: 'utrecht',
    requirements: ['Cloud architecture (AWS/Azure/GCP)', 'AI/ML pipeline design', 'Client communication & consultancy', 'Infrastructure as Code', 'Monitoring & observability', 'Minimum 5 years experience'],
  },
];

/* ──── Component ──── */

function HiringPage() {
  const { language } = useLanguage();
  const isNL = language === 'nl';
  const allJobs = isNL ? jobsNL : jobsEN;
  const [expandedJob, setExpandedJob] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredJobs = filter === 'all'
    ? allJobs
    : allJobs.filter(j => j.locationType === filter);

  const toggleJob = (i) => {
    setExpandedJob(expandedJob === i ? null : i);
  };

  return (
    <>
      <PageHero>
        <Container>
          <H1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {isNL ? 'Werk bij Optivaize' : 'Work at Optivaize'}
          </H1>
          <Sub initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {isNL
              ? 'Wij groeien hard en zoeken versterking. Bekijk onze openstaande vacatures hieronder.'
              : 'We\'re growing fast and looking for reinforcements. Check out our open positions below.'}
          </Sub>
        </Container>
      </PageHero>

      <Section>
        <Container>
          <FadeIn>
            <SectionHead>
              <SectionLabel>{isNL ? 'Open posities' : 'Open positions'}</SectionLabel>
              <SectionTitle>{isNL ? 'Vind jouw plek' : 'Find your role'}</SectionTitle>
            </SectionHead>
          </FadeIn>

          <FilterRow>
            <FilterTab $active={filter === 'all'} onClick={() => setFilter('all')}>
              {isNL ? 'Alle posities' : 'All positions'} ({allJobs.length})
            </FilterTab>
            <FilterTab $active={filter === 'remote'} onClick={() => setFilter('remote')}>
              Remote ({allJobs.filter(j => j.locationType === 'remote').length})
            </FilterTab>
            <FilterTab $active={filter === 'utrecht'} onClick={() => setFilter('utrecht')}>
              Utrecht ({allJobs.filter(j => j.locationType === 'utrecht').length})
            </FilterTab>
          </FilterRow>

          <JobsGrid>
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, i) => {
                const Icon = job.icon;
                const globalIndex = allJobs.indexOf(job);
                const isExpanded = expandedJob === globalIndex;
                return (
                  <motion.div
                    key={job.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <JobCard $expanded={isExpanded}>
                      <JobHeader onClick={() => toggleJob(globalIndex)}>
                        <JobIcon $bg={job.bg}>
                          <Icon size={22} />
                        </JobIcon>
                        <JobInfo>
                          <JobTitle>{job.title}</JobTitle>
                          <JobMeta>
                            <LocationBadge $remote={job.locationType === 'remote'}>
                              <MapPin size={11} /> {job.location}
                            </LocationBadge>
                            <MetaItem><Clock size={12} /> {job.type}</MetaItem>
                            <MetaItem><Briefcase size={12} /> {job.level}</MetaItem>
                          </JobMeta>
                        </JobInfo>
                        <ExpandIcon
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={18} />
                        </ExpandIcon>
                      </JobHeader>

                      <AnimatePresence>
                        {isExpanded && (
                          <JobBody
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <JobBodyInner>
                              <JobDesc>{job.desc}</JobDesc>

                              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                                {isNL ? 'Wat we zoeken' : 'What we look for'}
                              </div>
                              <RequirementsList>
                                {job.requirements.map((req, ri) => (
                                  <li key={ri}>{req}</li>
                                ))}
                              </RequirementsList>

                              <ApplyBtn
                                href={`mailto:info@optivaize.nl?subject=Sollicitatie%20-%20${encodeURIComponent(job.title)}`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                <Send size={15} />
                                {isNL ? 'Solliciteer nu' : 'Apply now'}
                              </ApplyBtn>
                            </JobBodyInner>
                          </JobBody>
                        )}
                      </AnimatePresence>
                    </JobCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </JobsGrid>
        </Container>
      </Section>

      <CtaSection>
        <Container>
          <CtaTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {isNL
              ? <>Geen match? Stuur een <GradientSpan>open sollicitatie</GradientSpan></>
              : <>No match? Send an <GradientSpan>open application</GradientSpan></>}
          </CtaTitle>
          <CtaSub
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {isNL
              ? 'Wij zijn altijd op zoek naar talent. Stuur ons een mail met je CV en motivatie.'
              : 'We are always looking for talent. Send us an email with your CV and motivation.'}
          </CtaSub>
          <CtaBtn
            href="mailto:info@optivaize.nl?subject=Open%20Sollicitatie%20-%20Optivaize"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {isNL ? 'Mail ons' : 'Email us'}
            <ArrowRight size={17} />
          </CtaBtn>
        </Container>
      </CtaSection>
    </>
  );
}

export default HiringPage;

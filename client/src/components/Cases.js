import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { 
  ChevronDown, 
  TrendingUp, 
  Users, 
  Clock,
  DollarSign,
  Target,
  Zap,
  X
} from 'lucide-react';

const CasesSection = styled.section`
  id: cases;
  padding: 6rem 0;
  background: #F8FAFC;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 42px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 18px;
  color: #64748B;
  max-width: 600px;
  margin: 0 auto;
`;

const CasesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CaseCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

const FullscreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(15, 23, 42, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10001;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(15, 23, 42, 0.2);
    transform: scale(1.1);
  }
`;

const CaseHeader = styled.div`
  position: relative;
  overflow: hidden;
`;

const CaseImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CaseCard}:hover & {
    transform: scale(1.05);
  }
`;

const CaseOverlay = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
`;

const CompanyLogo = styled.img`
  height: 50px;
  width: auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CaseContent = styled.div`
  padding: 2rem;
`;

const CaseTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 1rem;
`;

const CasePreview = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3B82F6;
  font-weight: 600;
  cursor: pointer;
`;

const ResultsPreview = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ResultBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const DetailedResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const ResultCard = styled(motion.div)`
  background: #F8FAFC;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${props => props.color || '#3B82F6'};
`;

const ResultIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ResultDescription = styled.p`
  font-size: 14px;
  color: #64748B;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const ResultValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${props => props.color || '#3B82F6'};
`;

const CaseDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 2rem;
`;

const casesData = [
  {
    id: 'fonteyn',
    title: 'Fonteyn: AI SEO Blog Optimization',
    company: 'Fonteyn',
    logo: '/uploads/fonteyn.png',
    image: '/uploads/fonteyn_showroom.png',
    preview: 'Transformed SEO strategy for luxury furniture supplier generating 10+ million revenue annually through AI-powered blog optimization.',
    results: ['Avg ranking increase', '3% Google Ads reduction', '4% conversion boost'],
    description: `Fonteyn is one of the biggest suppliers of furniture, spas, and everything for luxurious living, generating over 10 million in revenue per year. We implemented our AI-powered blog optimization system to create better posts and achieve higher rankings using organic methods.

    Our comprehensive approach involved competitor analysis using advanced tools like Ahrefs to understand which keywords competitors were ranking for and investing in. We then used sophisticated AI models to identify high-value keywords that were costing Fonteyn significant money in their Google Ads campaigns.

    Instead of continuing to pay premium prices for expensive keywords in advertising, we strategically wrote blog content targeting these costly terms. This allowed them to optimize content for expensive keywords while shifting their paid advertising budget to cheaper, less competitive terms - maximizing their overall marketing ROI.

    We fine-tuned a specialized AI model specifically for Fonteyn's brand and industry, training the AI to seamlessly integrate target keywords into naturally flowing, engaging content that reads authentically. The model learned their brand voice, tone, and messaging style while creating keyword-rich content that didn't feel forced or robotic.

    Our AI SEO integration positioned their content to appear prominently in Google's AI-generated search results and featured snippets. We implemented comprehensive auto-publishing systems that work seamlessly with their platform, publishing optimized blog content on a strategic schedule with complete automation.`,
    detailedResults: [
      {
        icon: TrendingUp,
        title: 'Google Ranking',
        description: 'Average ranking position improvement',
        value: 'Significant increase',
        color: '#10B981'
      },
      {
        icon: DollarSign,
        title: 'Google Ads Cost',
        description: 'Reduced advertising spend',
        value: '-3%',
        color: '#3B82F6'
      },
      {
        icon: Target,
        title: 'Conversion Rate',
        description: 'Relative conversion increase',
        value: '+4%',
        color: '#8B5CF6'
      },
      {
        icon: Zap,
        title: 'Products Optimized',
        description: 'Total products enhanced',
        value: '30,000+',
        color: '#F59E0B'
      },
      {
        icon: Clock,
        title: 'Labor Saved',
        description: 'Hours of manual work eliminated',
        value: '3,000 hrs',
        color: '#EF4444'
      }
    ]
  },
  {
    id: 'aanhuis',
    title: 'Aanhuis: AI Presentation & Training',
    company: 'Aanhuis',
    logo: '/uploads/aanhuis.png',
    image: '/uploads/aanhuis_kantoor.png',
    preview: 'Transformed workplace efficiency through comprehensive AI training presentations and custom GPT implementation.',
    results: ['20% efficiency boost', 'Custom GPTs built', 'Team-wide adoption'],
    description: `For Aanhuis.nl, we delivered our comprehensive AI presentation service, focusing on improving work efficiency through strategic AI implementation. We realized a 20% better work efficiency in writing emails by building custom GPTs tailored to their specific needs.

    Our engagement began with an initial session where we discussed time-consuming processes that were hindering efficiency and preventing people from working at their absolute best. We analyzed their workflows and looked for opportunities where they could improve before delivering the presentation and discussed these findings with management.

    We conducted tailored presentations for both management and the core team working at Aanhuis. These weren't just generic AI overviews - we sat with their team for open conversations, actively listening and looking for opportunities while creating alignment. The key was ensuring that stakeholders (the people actually doing the work) felt that AI would help them work more efficiently rather than replace them.

    Following the successful initial presentation, we conducted specialized breakout sessions with different departments. In these focused sessions, we examined their specific processes and identified opportunities to automate them using AI or introduce tools they could start using directly.

    We created a comprehensive guide containing all the insights from our discussions, including detailed instructions on how to use ChatGPT within their organization, how to train custom GPTs for specific tasks, and identification of additional AI opportunities. Later, we provided them with a PDF reference guide they could use whenever they had questions.

    The team expressed enthusiasm about the results and told us they plan to schedule future meetings to make their processes even more efficient. This commitment to continuous improvement shows the lasting impact of our AI integration approach.`,
    detailedResults: [
      {
        icon: TrendingUp,
        title: 'Email Efficiency',
        description: 'Improvement in email writing efficiency',
        value: '+20%',
        color: '#10B981'
      },
      {
        icon: Zap,
        title: 'Custom GPTs',
        description: 'Tailored AI tools created',
        value: 'Multiple built',
        color: '#3B82F6'
      },
      {
        icon: Target,
        title: 'Department Coverage',
        description: 'Breakout sessions completed',
        value: 'All depts',
        color: '#F59E0B'
      },
      {
        icon: Clock,
        title: 'Follow-up Planned',
        description: 'Continuous improvement commitment',
        value: 'Ongoing',
        color: '#EF4444'
      }
    ]
  },
  {
    id: 'blosh',
    title: 'Blosh: Custom AI Solutions Suite',
    company: 'Blosh',
    logo: '/uploads/blosh.png',
    image: '/uploads/blosh_kantoor.png',
    preview: 'Comprehensive custom AI solution development including SEO automation, intelligent chatbot, and Shopify price management.',
    results: ['AI SEO system', 'Custom chatbot', 'Shopify automation'],
    description: `Blosh approached us with multiple operational challenges that were limiting their growth potential. They needed better search visibility, faster client support, and more efficient e-commerce management. Rather than implementing generic solutions, we developed a completely custom AI suite tailored to their specific business needs.

    We started by building them an advanced AI SEO system that automatically optimizes their content for search engines. This system analyzes competitor strategies, identifies high-value keywords, and generates content that improves their search rankings while reducing advertising costs. The AI continuously monitors search trends and adjusts their content strategy to maintain competitive advantage.

    For their client support challenges, we developed an intelligent chatbot trained specifically on Blosh's historical conversations. The chatbot learned their unique communication patterns, problem-solving approaches, and brand voice to provide instant, personalized responses that maintain the human touch their clients expect. This dramatically improved response times and client satisfaction.

    Finally, we created an intelligent automation system for their Shopify platform that allows them to efficiently manage pricing across their entire product catalog. The system automatically adjusts prices based on market conditions, competitor analysis, inventory levels, and sales performance, saving countless hours of manual work while optimizing revenue.

    These custom solutions demonstrate our approach to building AI products that integrate perfectly with existing workflows and scale with business growth, delivering real measurable value rather than one-size-fits-all solutions.`,
    detailedResults: [
      {
        icon: TrendingUp,
        title: 'AI SEO System',
        description: 'Custom search optimization automation',
        value: 'Deployed',
        color: '#10B981'
      },
      {
        icon: Users,
        title: 'Smart Chatbot',
        description: 'Client support automation with personality',
        value: 'Active',
        color: '#3B82F6'
      },
      {
        icon: DollarSign,
        title: 'Shopify Integration',
        description: 'Automated price management system',
        value: 'Operational',
        color: '#8B5CF6'
      },
      {
        icon: Zap,
        title: 'Custom Solutions',
        description: 'Tailored AI products built',
        value: '3 systems',
        color: '#F59E0B'
      },
    ]
  }
];

function Cases() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCase, setSelectedCase] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].cases;

  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  return (
    <CasesSection id="cases" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.title}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <CasesGrid>
          {casesData.map((caseItem, index) => (
            <CaseCard
              key={caseItem.id}
              onClick={() => handleCaseClick(caseItem)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1] 
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CaseHeader>
                <CaseImage src={caseItem.image} alt={caseItem.company} />
                <CaseOverlay>
                  <CompanyLogo src={caseItem.logo} alt={caseItem.company} />
                </CaseOverlay>
              </CaseHeader>

              <CaseContent>
                <CaseTitle>{caseItem.title}</CaseTitle>
                <CasePreview>{caseItem.preview}</CasePreview>
                
                <ResultsPreview>
                  {caseItem.results.map((result, idx) => (
                    <ResultBadge key={idx}>{result}</ResultBadge>
                  ))}
                </ResultsPreview>

                <ExpandButton>
                  <span>{t.viewFullCase}</span>
                  <ChevronDown size={20} />
                </ExpandButton>
              </CaseContent>
            </CaseCard>
          ))}
        </CasesGrid>

        <AnimatePresence>
          {selectedCase && (
            <FullscreenModal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              <ModalContent
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <CloseButton
                  onClick={closeModal}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </CloseButton>

                <CaseHeader>
                  <CaseImage src={selectedCase.image} alt={selectedCase.company} />
                  <CaseOverlay>
                    <CompanyLogo src={selectedCase.logo} alt={selectedCase.company} />
                  </CaseOverlay>
                </CaseHeader>

                <div style={{ padding: '2rem' }}>
                  <CaseTitle>{selectedCase.title}</CaseTitle>
                  <CasePreview>{selectedCase.preview}</CasePreview>
                  
                  <ResultsPreview>
                    {selectedCase.results.map((result, idx) => (
                      <ResultBadge key={idx}>{result}</ResultBadge>
                    ))}
                  </ResultsPreview>

                  <CaseDescription style={{ marginTop: '2rem' }}>
                    {selectedCase.description}
                  </CaseDescription>

                  <DetailedResults>
                    {selectedCase.detailedResults.map((result, resultIndex) => {
                      const Icon = result.icon;
                      return (
                        <ResultCard
                          key={resultIndex}
                          color={result.color}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: resultIndex * 0.1 
                          }}
                        >
                          <ResultIcon color={result.color}>
                            <Icon size={24} />
                          </ResultIcon>
                          <ResultTitle>{result.title}</ResultTitle>
                          <ResultDescription>{result.description}</ResultDescription>
                          <ResultValue color={result.color}>
                            {result.value}
                          </ResultValue>
                        </ResultCard>
                      );
                    })}
                  </DetailedResults>
                </div>
              </ModalContent>
            </FullscreenModal>
          )}
        </AnimatePresence>
      </Container>
    </CasesSection>
  );
}

export default Cases;

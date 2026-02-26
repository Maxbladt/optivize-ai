import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage, translations } from '../LanguageContext';
import { 
  Brain, 
  Mail, 
  ShoppingBag, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  Target,
  Crown,
  ChevronDown,
  X
} from 'lucide-react';

const ServicesSection = styled.section`
  id: services;
  padding: 6rem 0;
  background: white;
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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  border: 2px solid transparent;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

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
  max-width: 900px;
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

const CardHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, ${props => props.primaryColor}, ${props => props.secondaryColor});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const CardContent = styled.div`
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const ServiceDescription = styled.div`
  font-size: 16px;
  color: #3B82F6;
  font-weight: 600;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  border-left: 4px solid #3B82F6;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 600;
  color: #3B82F6;
`;

const InfographicContainer = styled.div`
  padding: 2rem 0;
`;

const ProcessFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: ${props => props.background || '#F8FAFC'};
  position: relative;
  border-radius: 16px;
  margin-bottom: 2.5rem;
  border: 2px solid ${props => props.accent || '#3B82F6'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid ${props => props.accent || '#3B82F6'};
  }
  
  &:last-child::after {
    display: none;
  }
  
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.color || '#3B82F6'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  font-size: 16px;
  color: #64748B;
  line-height: 1.5;
`;

const servicesData = [
  {
    id: 'ai-strategy',
    title: 'AI Presentation',
    icon: Brain,
    description: 'Onboard your team with the latest AI trends and tools. We help your organization understand and implement AI efficiently through tailored presentations and sessions.',
    primaryColor: '#3B82F6',
    secondaryColor: '#1D4ED8',
    steps: [
      { 
        title: 'Initial Session', 
        description: 'We sit and discuss the time-consuming processes that are bringing back efficiency and having people work their absolute best', 
        number: 1 
      },
      { 
        title: 'Analysis & Management Discussion', 
        description: 'From this initial session we analyze and look for opportunities where you could improve before doing the presentation and discuss them with management', 
        number: 2 
      },
      { 
        title: 'Tailored Presentation', 
        description: 'We sit with the core team of the company for an open conversation, looking for opportunities while listening. Creating alignment by having the stakeholders "the people working" feel like it is gonna help them work more efficiently and not replace them.', 
        number: 3 
      },
      { 
        title: 'Department Breakout Sessions', 
        description: 'With each different department, we conduct breakout sessions where we examine their specific processes and identify opportunities to automate them using AI or introduce tools they can start using directly.', 
        number: 4 
      },
      { 
        title: 'Full Guide Creation', 
        description: 'A comprehensive guide is made together with all the insights we discussed, including how to use ChatGPT within an organization, how to train custom GPTs for specific tasks, and more AI opportunities', 
        number: 5 
      },
      { 
        title: 'Follow Up', 
        description: 'Only following up is the best way to make sure people keep using AI efficiently. That is why we recommend doing after 1 month another session where we discuss the gains and also the points where we can improve', 
        number: 6 
      }
    ],
  },
  {
    id: 'email-ai',
    title: 'AI Mail Agent',
    icon: Mail,
    description: 'AI email assistant that suggests or automatically sends replies trained on your historic email data to match your personal writing style and decision patterns.',
    primaryColor: '#10B981',
    secondaryColor: '#059669',
    steps: [
      { 
        title: 'Email Collection', 
        description: 'For training the AI model, we need to have access to your emails so the model can learn your unique communication style and make responses which feel like you wrote them. We collect and scrape your historical emails to understand your tone, language patterns, and decision-making process.', 
        number: 1 
      },
      { 
        title: 'Data Processing', 
        description: 'We clean the emails using advanced string manipulation techniques to remove clutter, signatures, and unnecessary formatting. This ensures responses are clean and the data is properly structured into clear request-response pairs (JSON format), making it ready to be trained by the AI model (LLM).', 
        number: 2 
      },
      { 
        title: 'Model Training', 
        description: 'We fine-tune a GPT model like ChatGPT to talk and behave exactly the same as you would communicate. By training on your specific email patterns, vocabulary, and response style, the AI learns to generate emails that feel personal and authentically from you.', 
        number: 3 
      },
      { 
        title: 'Validation', 
        description: 'We need to test the model to ensure it\'s performing well, so we validate it against new emails in your inbox. This testing phase ensures the AI generates accurate responses that match your tone and maintains professional quality before going live.', 
        number: 4 
      },
      { 
        title: 'Using Your AI Email Companion', 
        description: 'The most efficient way to use your AI model is through a lightweight app that integrates seamlessly with Outlook, Gmail, or other email clients. When someone sends you an email, the model automatically reads the email chain and suggests a response for you to send. If you modify the suggestion, the model becomes even smarter and saves you significant time.', 
        number: 5 
      }
    ],
  },
  {
    id: 'product-text',
    title: 'AI Product Text Writer',
    icon: ShoppingBag,
    description: 'AI-powered product text optimization that rewrites descriptions to be more engaging and SEO-optimized while maintaining your brand voice across all platforms.',
    primaryColor: '#8B5CF6',
    secondaryColor: '#7C3AED',
    steps: [
      { 
        title: 'Product Collection', 
        description: 'First, we collect all your existing product texts and export them into a CSV file (Excel-type format). This gives us a complete overview of your current product descriptions and allows us to transform them systematically. We handle the technical extraction process for you, whether it\'s from Shopify, WooCommerce, or custom e-commerce platforms.', 
        number: 1 
      },
      { 
        title: 'AI Model Training', 
        description: 'We train an AI model specifically on product texts that have been manually refined to match your brand voice and style. This means the AI learns to write like your brand, understanding your tone, vocabulary, and messaging approach. When the model rewrites your old text or creates new descriptions, it feels authentically like your brand created them.', 
        number: 2 
      },
      { 
        title: 'Text Transformation', 
        description: 'Using the trained AI model, we transform all your existing product texts into improved, optimized versions. The AI rewrites each description to be more engaging, clear, and conversion-focused while maintaining your brand\'s unique voice. We provide the updated texts in a file format that you can review before implementation.', 
        number: 3 
      },
      { 
        title: 'SEO Optimization', 
        description: 'SEO is crucial for product visibility, and AI SEO (stay tuned if you\'re unfamiliar with this concept) is becoming increasingly important for Google rankings. We analyze seasonality patterns in how people search for your products and automatically integrate high-value keywords into the AI-generated texts. This ensures your products rank higher in search results and attract more organic traffic throughout the year.', 
        number: 4 
      },
      { 
        title: 'Review & Integration', 
        description: 'Before going live, we provide you with the complete file of new product texts for manual review by your team. Once approved, we assist you fully in uploading the optimized texts back into your system. We have extensive experience working with various platforms including Shopify, WooCommerce, and custom e-commerce solutions, ensuring seamless integration regardless of your setup.', 
        number: 5 
      }
    ],
  },
  {
    id: 'blog-writer',
    title: 'AI Blog Writer',
    icon: FileText,
    description: 'Automated SEO blog creation that targets competitor keywords and reduces advertising costs through strategic content and automated publishing.',
    primaryColor: '#F59E0B',
    secondaryColor: '#D97706',
    steps: [
      { 
        title: 'Competitor Analysis', 
        description: 'We start by analyzing your competitors\' keyword strategies using advanced tools like Ahrefs. By indexing and understanding which keywords your competitors are ranking for and investing in, we can identify opportunities to make your content more relevant to Google\'s algorithm. This competitive intelligence forms the foundation of our content strategy, ensuring we target the same valuable search terms that are driving traffic to your competitors.', 
        number: 1 
      },
      { 
        title: 'Keyword Selection', 
        description: 'Using sophisticated AI models, we identify high-value keywords that are currently costing you significant money in your SEA (Google Ads) campaigns. Instead of continuing to pay premium prices for these expensive keywords in advertising, we strategically write blog content targeting these costly terms. This allows you to optimize your content for the expensive keywords while shifting your paid advertising budget to cheaper, less competitive terms - maximizing your overall marketing ROI.', 
        number: 2 
      },
      { 
        title: 'AI Model Training', 
        description: 'We fine-tune a specialized AI model specifically for your brand and industry. This involves training the AI to seamlessly integrate your target keywords into naturally flowing, engaging content that reads authentically and provides real value to your audience. The model learns your brand voice, tone, and messaging style while mastering the art of creating keyword-rich content that doesn\'t feel forced or robotic - ensuring both search engines and human readers find your content compelling.', 
        number: 3 
      },
      { 
        title: 'AI SEO Integration', 
        description: 'AI SEO represents the next frontier in search optimization, as Google increasingly uses AI to generate content summaries and featured snippets. We\'ve researched Google\'s AI content processing methods and developed strategic techniques to ensure your content appears prominently in these AI-generated results. By structuring your content to align with how Google\'s AI interprets and summarizes information, we position your blogs to show up first in AI-powered search features, giving you a significant competitive advantage.', 
        number: 4 
      },
      { 
        title: 'Automated Publishing', 
        description: 'We implement comprehensive auto-publishing systems that work seamlessly across various platforms including custom websites, Shopify, WordPress, and WooCommerce. Our automated system publishes your optimized blog content on a strategic schedule, ensuring consistent content flow without manual intervention. We handle all the technical integration, from API connections to content management system plugins, making the entire process completely hands-off for your team while maintaining full control over timing and frequency.', 
        number: 5 
      }
    ],
  },
  {
    id: 'linkedin-automation',
    title: 'AI Linkedin Sales Bot',
    icon: Target,
    description: 'Fully automated LinkedIn sales system that identifies prospects, creates personalized campaigns, and converts connections into customers using AI.',
    primaryColor: '#EF4444',
    secondaryColor: '#DC2626',
    steps: [
      { 
        title: 'Target Audience Research', 
        description: 'We begin by identifying your ideal prospects on LinkedIn using advanced search parameters and AI-powered analysis. Our system analyzes company sizes, job titles, industries, and engagement patterns to build comprehensive prospect lists. We research their pain points, interests, and business challenges to create highly targeted outreach strategies that resonate with your specific audience segments.', 
        number: 1 
      },
      { 
        title: 'Campaign Strategy & Hook Development', 
        description: 'Our team creates compelling campaign strategies tailored to your target audience. We develop multiple sales approaches including free PDF offers, consultation bookings, and direct sales pitches. Each campaign features carefully crafted hooks designed to capture attention and drive engagement. We analyze what resonates with your prospects and create diverse touchpoints to maximize conversion opportunities.', 
        number: 2 
      },
      { 
        title: 'Custom LLM Training', 
        description: 'We train a custom Large Language Model specifically on your previous LinkedIn messages, sales conversations, and communication style. The AI learns your unique voice, tone, and successful messaging patterns to create authentic, personalized outreach that sounds genuinely human. This ensures every message maintains your brand personality while scaling your outreach exponentially.', 
        number: 3 
      },
      { 
        title: 'Automated Campaign Execution & Optimization', 
        description: 'Our platform launches your campaigns and continuously optimizes performance using real-time data. We monitor connection request acceptance rates, message open rates, and response rates, then fine-tune the AI model to maximize each metric. The system automatically adjusts messaging, timing, and approach based on performance data to drive the highest conversion rates possible.', 
        number: 4 
      },
      { 
        title: 'Multi-Channel Integration & Sales Tracking', 
        description: 'We expand successful LinkedIn connections to email marketing and create comprehensive follow-up sequences across multiple channels. Our integrated platform tracks the entire customer journey from initial LinkedIn connection to final sale, providing detailed analytics on conversion rates, revenue generated, and ROI. The system automatically creates new campaigns based on successful patterns and continuously scales your sales pipeline.', 
        number: 5 
      }
    ],
  },
  {
    id: 'chatbot',
    title: 'AI Chatbot',
    icon: MessageCircle,
    description: 'AI chatbot trained on your conversations to replicate your tone and service style, with optional personal shopping features for e-commerce stores.',
    primaryColor: '#06B6D4',
    secondaryColor: '#0891B2',
    steps: [
      { 
        title: 'Historical Data Collection & Analysis', 
        description: 'We begin by gathering all your historical client conversations from multiple sources including email threads, live chat logs, phone call transcripts, support tickets, and social media interactions. Our AI analyzes thousands of these conversations to understand your unique communication style, common customer questions, problem-solving approaches, and brand voice. This deep analysis ensures the chatbot will respond exactly as your best customer service representatives would, maintaining the personal touch your customers expect.', 
        number: 1 
      },
      { 
        title: 'Conversation Pattern & Tone Analysis', 
        description: 'Using advanced Natural Language Processing, we map your conversation patterns, identify your preferred responses to specific situations, and analyze the emotional tone of successful interactions. The AI learns your brand\'s personality traits, whether you\'re friendly and casual, professional and formal, or somewhere in between. We also identify your go-to phrases, problem resolution strategies, and the specific language that converts prospects into customers, ensuring authentic conversations.', 
        number: 2 
      },
      { 
        title: 'Custom Model Training & Validation', 
        description: 'We fine-tune a specialized language model using your conversation data to create a chatbot that thinks and responds like your team. The model undergoes rigorous testing with real conversation scenarios to ensure accuracy, appropriate responses, and brand consistency. We validate the chatbot\'s performance against your historical successful interactions and continuously refine its responses until it achieves human-like conversation quality that matches your established customer service standards.', 
        number: 3 
      },
      { 
        title: 'E-commerce Personal Shopping Integration (Optional)', 
        description: 'For online stores, we integrate an AI personal shopping assistant that analyzes customer preferences, browsing history, and conversation context to provide personalized product recommendations. The AI can suggest outfit combinations, recommend complementary items, help with sizing questions, and even create styled looks based on customer preferences. It presents recommendations in beautifully formatted cards with images, descriptions, and direct purchase links, significantly increasing average order value.', 
        number: 4 
      },
      { 
        title: 'Seamless Platform Integration', 
        description: 'We deploy your custom chatbot across all your customer touchpoints including your website, Shopify store, social media platforms, and mobile apps. The integration includes a sophisticated handoff system that seamlessly transfers complex queries to human agents when needed, complete with full conversation context. The chatbot maintains consistent personality and knowledge across all platforms while adapting to each platform\'s unique interface and user behavior patterns.', 
        number: 5 
      },
      { 
        title: 'Continuous Learning & Optimization', 
        description: 'The chatbot continuously improves through machine learning, analyzing customer feedback, successful conversation outcomes, and conversion rates. We implement a feedback system where customers can rate interactions, and the AI learns from both positive and negative responses. Regular performance reports show conversation success rates, customer satisfaction scores, and areas for improvement. The system automatically updates its knowledge base with new products, policies, and frequently asked questions.', 
        number: 6 
      }
    ],
  },
  {
    id: 'tiktok-optimization',
    title: 'AI TikTok Domination',
    icon: TrendingUp,
    description: 'AI system that identifies viral TikToks, generates perfect comments with hidden CTAs, and boosts them to top positions for maximum viral exposure.',
    primaryColor: '#EC4899',
    secondaryColor: '#DB2777',
    steps: [
      { 
        title: 'High-Engagement Creator Database Building', 
        description: 'We deploy specialized bots to identify and continuously monitor TikTok creators in your target niche who consistently achieve substantial views and engagement (typically 100K+ views per post). Our system builds a comprehensive database of these creators, analyzing their posting patterns, peak engagement times, and audience demographics. We track creators across multiple niches to ensure we capture viral content the moment it\'s posted, giving us the crucial early positioning advantage before videos explode.', 
        number: 1 
      },
      { 
        title: 'Real-Time Viral Detection & Response System', 
        description: 'Our advanced monitoring bots scan the feeds of identified creators 24/7, instantly detecting new posts within minutes of publication. The system analyzes early engagement signals (initial like-to-view ratios, comment velocity, share rates) to predict which posts will go viral. When a potentially viral video is detected, our system immediately triggers the comment generation process, ensuring we\'re among the first to comment before the video gains massive traction and competition increases.', 
        number: 2 
      },
      { 
        title: 'Custom LLM Training for Contextual Comment Generation', 
        description: 'We train a specialized Large Language Model specifically on millions of top-performing TikTok comments, analyzing what makes comments go viral (humor patterns, emotional triggers, trending phrases, perfect timing). This custom LLM learns to craft comments that feel completely natural and engaging while strategically incorporating hidden calls-to-action for your product or service. The AI adapts to current trends, slang, and platform-specific communication styles to ensure maximum engagement and authenticity.', 
        number: 3 
      },
      { 
        title: 'AI-Powered Comment Creation & CTA Integration', 
        description: 'When a viral-potential video is detected, our LLM analyzes the content, creator\'s style, audience sentiment, and current trends to generate the perfect comment. The AI crafts responses that appear genuinely engaged with the content while subtly weaving in calls-to-action that don\'t feel promotional. These CTAs are designed as natural conversation starters, curiosity gaps, or helpful suggestions that drive viewers to your profile or website without triggering TikTok\'s promotional content detection systems.', 
        number: 4 
      },
      { 
        title: 'Strategic Botnet Like Deployment', 
        description: 'Once the perfect comment is posted, we deploy our sophisticated botnet system to strategically boost the comment with artificial likes. The system uses carefully timed like deployment patterns that mimic organic engagement to avoid detection. We scale the likes based on the video\'s performance - if a video hits 100K views, we ensure your comment gets proportional likes to reach the top position. The timing and velocity of likes are optimized to appear completely natural while guaranteeing top placement.', 
        number: 5 
      },
      { 
        title: 'Massive View Multiplication & ROI Tracking', 
        description: 'As the targeted videos go viral (often reaching 1-3M+ views), your top-positioned comment receives massive exposure - typically 15-30% of the video\'s total views see your comment prominently. This translates to 500K-1M+ impressions of your hidden CTA for just the cost of strategic like deployment. We provide detailed analytics showing comment performance, click-through rates to your profile/website, and conversion tracking. The system continues monitoring for weeks as videos can resurge in virality, providing ongoing value.', 
        number: 6 
      }
    ],
  },
  {
    id: 'featured-snippets',
    title: 'AI SEO Intergration',
    icon: Crown,
    description: 'Reverse-engineered Google AI algorithm optimization that ensures your content gets featured prominently in AI-generated search summaries and featured snippets.',
    primaryColor: '#F97316',
    secondaryColor: '#EA580C',
    steps: [
      { 
        title: 'AI Algorithm Analysis & Ranking Factor Discovery', 
        description: 'We conduct deep analysis of Google\'s AI content selection algorithm to understand exactly what signals determine which sources get featured in AI-generated summaries. This includes studying content structure patterns, authority signals, semantic relevance markers, and citation preferences that Google\'s AI prioritizes. We reverse-engineer the specific formatting, keyword density, and content architecture that consistently gets selected for featured snippets across your industry, creating a blueprint for guaranteed inclusion.', 
        number: 1 
      },
      { 
        title: 'Strategic Question & Intent Mapping', 
        description: 'We identify the exact questions and search intents your target audience uses when they have problems your product solves. This goes beyond basic keyword research to understand the complete customer journey - from initial problem awareness to solution comparison. We map out question variations, related searches, and semantic clusters that trigger AI summaries, ensuring we target every possible entry point where prospects might discover your solution through Google\'s AI responses.', 
        number: 2 
      },
      { 
        title: 'Authority-Based Content Architecture Development', 
        description: 'We create a comprehensive content strategy that positions your company as the definitive expert source. This includes developing authoritative blog posts, detailed solution guides, FAQ sections, and case studies that directly answer your target questions with your company\'s methodology. Each piece is structured using the exact format patterns that Google\'s AI prefers for featured snippets, with clear problem-solution frameworks that naturally lead to your product as the recommended solution.', 
        number: 3 
      },
      { 
        title: 'Meta Description & Schema Optimization for AI Extraction', 
        description: 'We optimize all meta descriptions, headers, and structured data markup to maximize the chances of your content being selected and quoted by Google\'s AI. This includes implementing specific schema markup that helps Google understand your content\'s authority and relevance, crafting meta descriptions that serve as perfect snippet candidates, and structuring page content with clear, quotable statements that AI systems can easily extract and attribute to your company.', 
        number: 4 
      },
      { 
        title: 'Competitive Displacement & Position Hijacking', 
        description: 'We analyze which competitors currently appear in AI summaries for your target keywords and develop strategies to displace them. This involves creating superior content that better answers the target questions, building stronger authority signals, and optimizing for the specific content patterns that outrank existing featured snippets. We systematically target and replace competitor mentions in AI responses with your company\'s content and recommendations.', 
        number: 5 
      },
      { 
        title: 'AI Attribution & Quote Engineering', 
        description: 'We craft content specifically designed to generate natural, quotable statements that Google\'s AI will attribute to your company. This includes developing signature methodologies, memorable frameworks, and authoritative recommendations that AI systems can easily cite. When prospects search for solutions, they\'ll consistently see phrases like "<your company> recommends this approach" or "<your company> suggests this solution" in Google\'s AI-generated responses, establishing your brand as the trusted authority.', 
        number: 6 
      },
      { 
        title: 'Performance Monitoring & Snippet Domination Scaling', 
        description: 'We continuously monitor your featured snippet performance, tracking which content pieces are being selected by Google\'s AI and how often your company is being cited in search results. We measure click-through rates from AI snippets, brand mention frequency, and conversion rates from AI-driven traffic. Based on performance data, we scale successful content patterns and expand to capture more AI summary real estate across related keywords and topics.', 
        number: 7 
      }
    ],
  }
];

function Services() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedService, setSelectedService] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].services;

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <ServicesSection id="services" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.title}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            {t.subtitle}
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid>
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <ServiceCard
                key={service.id}
                onClick={() => handleCardClick(service)}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1] 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader>
                  <IconContainer 
                    primaryColor={service.primaryColor}
                    secondaryColor={service.secondaryColor}
                  >
                    <Icon size={32} />
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{service.title}</CardTitle>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                    <ExpandButton>
                      {t.howItWorks}
                      <ChevronDown size={16} />
                    </ExpandButton>
                  </CardContent>
                </CardHeader>
              </ServiceCard>
            );
          })}
        </ServicesGrid>

        <AnimatePresence>
          {selectedService && (
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

                <CardHeader>
                  <IconContainer 
                    primaryColor={selectedService.primaryColor}
                    secondaryColor={selectedService.secondaryColor}
                  >
                    <selectedService.icon size={32} />
                  </IconContainer>
                  <CardContent>
                    <CardTitle>{selectedService.title}</CardTitle>
                    <ServiceDescription>
                      {selectedService.description}
                    </ServiceDescription>
                  </CardContent>
                </CardHeader>

                <InfographicContainer style={{ padding: '0 2rem 2rem' }}>
                  <ProcessFlow>
                    {selectedService.steps.map((step, stepIndex) => (
                      <ProcessStep
                        key={step.number}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: stepIndex * 0.05 
                        }}
                        background={`${selectedService.primaryColor}10`}
                        accent={selectedService.primaryColor}
                      >
                        <StepNumber color={selectedService.primaryColor}>
                          {step.number}
                        </StepNumber>
                        <StepContent>
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </StepContent>
                      </ProcessStep>
                    ))}
                  </ProcessFlow>

                </InfographicContainer>
              </ModalContent>
            </FullscreenModal>
          )}
        </AnimatePresence>
      </Container>
    </ServicesSection>
  );
}

export default Services;
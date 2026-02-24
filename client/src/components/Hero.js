import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = styled.section`
  id: home;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.03) 0%, 
    rgba(16, 185, 129, 0.03) 50%, 
    rgba(99, 102, 241, 0.03) 100%
  );
  padding-top: 90px;
  
  @media (max-width: 768px) {
    min-height: 80vh;
    padding-top: 80px;
  }
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
  filter: blur(1px);
`;

const ParticleCanvas = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }
`;

const HeroContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Headline = styled(motion.h1)`
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;
  color: #0F172A;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subheadline = styled(motion.p)`
  font-size: 20px;
  line-height: 1.6;
  color: #64748B;
  max-width: 600px;
  margin: 0 auto 3rem;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-width: 280px;
  height: 56px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 480px) {
    min-width: 240px;
    font-size: 16px;
    padding: 0.875rem 2rem;
  }
`;

const CircuitPattern = styled(motion.div)`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  opacity: 0.1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function Hero() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Service titles from Services.js
  const servicesTitles = [
    'AI Presentation',
    'AI Mail Agent',
    'AI Product Text Writer',
    'AI Blog Writer',
    'AI Linkedin Sales Bot',
    'AI Chatbot',
    'AI TikTok Domination',
    'AI SEO Intergration'
  ];

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycle through services every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => 
        (prevIndex + 1) % servicesTitles.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [servicesTitles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const serviceVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const currentService = servicesTitles[currentServiceIndex];
  const baseText = "Transform your business with";
  const headlineWords = `${baseText} ${currentService}`.split(' ');

  return (
    <HeroSection id="home" ref={ref}>
      <AnimatedBackground>
        <ParticleCanvas />
        
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <FloatingShape
            key={i}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              top: `${10 + i * 15}%`,
              left: `${5 + i * 15}%`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Circuit pattern */}
        <CircuitPattern
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        >
          <svg viewBox="0 0 200 200" fill="none">
            <motion.path
              d="M50 50 L150 50 L150 150 L50 150 Z M100 50 L100 150 M50 100 L150 100"
              stroke="url(#circuit-gradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <defs>
              <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
          </svg>
        </CircuitPattern>
      </AnimatedBackground>

      <HeroContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Headline>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              custom={0}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              Transform
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              custom={1}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              your
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              custom={2}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              business
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              custom={3}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              with
            </motion.span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentServiceIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={serviceVariants}
                style={{ display: 'inline-block' }}
              >
                <GradientText>{currentService}</GradientText>
              </motion.span>
            </AnimatePresence>
          </Headline>

          <Subheadline variants={itemVariants}>
            We optimize your operations, automate your workflows, and accelerate your growth 
            with cutting-edge AI technology tailored to your business needs.
          </Subheadline>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="tel:+31634354075"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                minWidth: '200px',
                height: '56px',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Call Us
            </motion.a>

            <motion.a
              href="mailto:info@optivaize.nl?subject=Beste Optivaize&body=Beste Optivaize,%0A%0AIk had een vraag over het volgende:%0A%0A"
              style={{
                background: 'transparent',
                border: '2px solid #3B82F6',
                color: '#3B82F6',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                minWidth: '200px',
                height: '56px',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                backgroundColor: '#3B82F6',
                color: 'white',
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Send Us an Email
            </motion.a>
          </motion.div>
        </motion.div>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;

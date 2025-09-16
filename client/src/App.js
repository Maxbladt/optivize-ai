import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ClientSlider from './components/ClientSlider';
import PresentationSection from './components/PresentationSection';
import Services from './components/Services';
import Cases from './components/Cases';
import Team from './components/Team';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  color: #1E293B;
  overflow-x: hidden;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const LoadingLogo = styled(motion.div)`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 300px;
    height: auto;
    filter: brightness(0) invert(1);
    
    @media (max-width: 768px) {
      width: 220px;
    }
  }
`;

const ProgressBar = styled(motion.div)`
  width: 300px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: white;
  border-radius: 2px;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <AppContainer>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingLogo
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src="/uploads/optivaize.png" alt="Optivaize" />
            </LoadingLogo>
            <ProgressBar>
              <ProgressFill
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </ProgressBar>
          </LoadingScreen>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navigation />
          <Hero />
          <ClientSlider />
          <PresentationSection />
          <Services />
          <Cases />
          <Team />
          <Footer />
        </>
      )}
    </AppContainer>
  );
}

export default App;

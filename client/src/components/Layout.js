import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: auto;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: #ffffff;
    color: #1E293B;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  ::selection {
    background: rgba(59, 130, 246, 0.15);
    color: #1E40AF;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
  }

  @keyframes flowLine {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;

const LoadingLogoWrap = styled(motion.div)`
  margin-bottom: 3rem;

  img {
    width: 180px;
    height: auto;
  }
`;

const LoadingBarTrack = styled.div`
  width: 220px;
  height: 2px;
  background: #E2E8F0;
  border-radius: 1px;
  overflow: hidden;
`;

const LoadingBarFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #10B981);
  border-radius: 1px;
`;

const LoadingCaption = styled(motion.p)`
  margin-top: 1.25rem;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #CBD5E1;
  font-family: 'DM Sans', sans-serif;
`;

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('optivaize_loaded');
    if (!hasLoaded && location.pathname === '/') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('optivaize_loaded', 'true');
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <LoadingLogoWrap
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <img src="/uploads/optivaize_logo_new.png" alt="Optivaize" />
            </LoadingLogoWrap>
            <LoadingBarTrack>
              <LoadingBarFill
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </LoadingBarTrack>
            <LoadingCaption
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI voor je bedrijf
            </LoadingCaption>
          </LoadingScreen>
        )}
      </AnimatePresence>

      {!isLoading && (
        <AppContainer>
          <Navigation />
          {children}
          <Footer />
        </AppContainer>
      )}
    </>
  );
}

export default Layout;

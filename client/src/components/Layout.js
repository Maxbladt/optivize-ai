'use client';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
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


function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        {children}
        <Footer />
      </AppContainer>
    </>
  );
}

export default Layout;

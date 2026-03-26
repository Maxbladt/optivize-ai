'use client';
import React from 'react';
import Link from '../components/Link';
import styled from 'styled-components';
import SEOHead from '../components/SEOHead';

const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  padding-top: 120px;
`;

const Title = styled.h1`
  font-size: 72px;
  font-weight: 800;
  background: linear-gradient(135deg, #3B82F6, #10B981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: #64748B;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  background: linear-gradient(135deg, #3B82F6, #10B981);
  color: white;
  padding: 0.875rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Pagina niet gevonden | Optivaize"
        description="Deze pagina bestaat niet."
        noindex
      />
      <Wrapper>
        <Title>404</Title>
        <Subtitle>Pagina niet gevonden</Subtitle>
        <HomeLink to="/">Terug naar home</HomeLink>
      </Wrapper>
    </>
  );
}

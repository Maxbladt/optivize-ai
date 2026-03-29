'use client';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Bot, TrendingUp, Target, Zap, Code2, Building2, MessageCircle, GraduationCap, Blocks, Users, Briefcase, Phone } from 'lucide-react';
import Link from './Link';
import { useLocation } from '../hooks';
import Image from 'next/image';

const GRADIENT = 'linear-gradient(135deg, #3B82F6, #10B981)';

const serviceItems = [
  {
    label: 'AI Business',
    sublabel: 'Je hele bedrijf transformeren met AI',
    path: '/ai-business', icon: Building2, color: '#EC4899',
  },
  {
    label: 'AI Training',
    sublabel: 'Je team klaarstomen voor het AI-tijdperk',
    path: '/ai-training', icon: GraduationCap, color: '#F97316',
  },
  {
    label: 'Custom Software',
    sublabel: 'AI-first development, 3x sneller bouwen',
    path: '/custom-software', icon: Code2, color: '#EF4444',
  },
  {
    label: 'Automatisering',
    sublabel: 'n8n workflows & platform integraties',
    path: '/automatisering', icon: Zap, color: '#8B5CF6',
  },
  {
    label: 'AI Sales',
    sublabel: 'CRM, LinkedIn automation & lead generatie',
    path: '/ai-sales', icon: Target, color: '#F59E0B',
  },
  {
    label: 'AI Marketing',
    sublabel: 'Google Ads, SEO, content & social automatisering',
    path: '/ai-marketing', icon: TrendingUp, color: '#10B981',
  },
  {
    label: 'AI Agents',
    sublabel: 'Autonome agents die taken volledig overnemen',
    path: '/ai-agenten', icon: Bot, color: '#3B82F6',
  },
  {
    label: 'AI Chatbot',
    sublabel: 'Chatbots die leren van elk gesprek',
    path: '/ai-chatbot', icon: MessageCircle, color: '#06B6D4',
  },
  {
    label: 'Crypto & Blockchain',
    sublabel: 'Smart contracts & blockchain development',
    path: '/crypto-blockchain', icon: Blocks, color: '#6366F1',
  },
];

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9000;
`;

const AnnouncementBar = styled.div`
  background: ${GRADIENT};
  color: white;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem 1rem;
  letter-spacing: 0.01em;

  a {
    color: white;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 2px;
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
  }

  @media (max-width: 640px) {
    font-size: 11px;
  }
`;

const NavBar = styled(motion.nav)`
  height: 76px;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.08);
  transition: box-shadow 0.3s ease;
  ${props => props.$scrolled && 'box-shadow: 0 2px 24px rgba(0,0,0,0.07);'}

  @media (max-width: 768px) {
    height: 64px;
  }
`;

const NavContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  img {
    height: 34px;
    width: auto;
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  transition: all 0.18s ease;
  white-space: nowrap;

  &:hover, &.active {
    color: #3B82F6;
    background: rgba(59, 130, 246, 0.07);
  }
`;

const DienstenBtn = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: ${props => props.$active ? '#3B82F6' : '#334155'};
  background: ${props => props.$active ? 'rgba(59, 130, 246, 0.07)' : 'transparent'};
  border: none;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.18s ease;

  &:hover {
    color: #3B82F6;
    background: rgba(59, 130, 246, 0.07);
  }

  svg {
    transition: transform 0.2s ease;
    transform: ${props => props.$open ? 'rotate(180deg)' : 'none'};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const CTABtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: ${GRADIENT};
  padding: 0.55rem 1.2rem;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);

  &:hover {
    box-shadow: 0 4px 18px rgba(59, 130, 246, 0.45);
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: #1E293B;
  cursor: pointer;
  min-width: 48px;
  min-height: 48px;
  padding: 0.5rem;

  @media (max-width: 1100px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

/* ---- OVER ONS DROPDOWN ---- */
const OverOnsWrap = styled.div`
  position: relative;
`;

const OverOnsDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: white;
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 14px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 200px;
  z-index: 9001;
`;

const OverOnsItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(59, 130, 246, 0.06);
    color: #3B82F6;
  }
`;

const OverOnsIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: ${props => props.$color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

/* ---- MEGA MENU ---- */
const MegaWrap = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  z-index: 8999;
`;

const MegaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 2rem 2.5rem;
`;

const MegaLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94A3B8;
  margin-bottom: 1.25rem;
`;

const MegaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ServiceTile = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.125rem;
  border-radius: 12px;
  border: 1px solid #F1F5F9;
  transition: all 0.18s ease;

  &:hover {
    background: ${props => props.$color}0C;
    border-color: ${props => props.$color}44;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${props => props.$color}18;
  }
`;

const TileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.$color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
  margin-top: 1px;
`;

const TileTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 0.2rem;
`;

const TileSub = styled.div`
  font-size: 13px;
  color: #64748B;
  line-height: 1.4;
`;

/* ---- MOBILE MENU ---- */
const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: white;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileHead = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border-bottom: 1px solid #F1F5F9;
  flex-shrink: 0;
`;

const MobileItems = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const MobileLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: #1E293B;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  display: block;
  transition: all 0.15s ease;

  &:hover {
    background: #F8FAFC;
    color: #3B82F6;
  }
`;

const MobileDienstenBtn = styled.button`
  font-size: 16px;
  font-weight: 500;
  color: #1E293B;
  background: transparent;
  border: none;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover { background: #F8FAFC; }

  svg {
    transition: transform 0.2s ease;
    transform: ${props => props.$open ? 'rotate(180deg)' : 'none'};
  }
`;

const MobileDienstenList = styled(motion.div)`
  overflow: hidden;
  padding: 0.25rem 0 0.5rem 1rem;
`;

const MobileDienstenItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-size: 14px;
  color: #334155;
  transition: all 0.15s ease;

  &:hover {
    background: #F8FAFC;
    color: #3B82F6;
  }
`;

const MobileDienstenIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: ${props => props.$color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  flex-shrink: 0;
`;

const MobileBottom = styled.div`
  padding: 1rem 1rem 2rem;
  border-top: 1px solid #F1F5F9;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const MobileCTA = styled(Link)`
  display: block;
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: white;
  background: ${GRADIENT};
  padding: 0.875rem;
  border-radius: 10px;
`;

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [overOnsOpen, setOverOnsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDiensten, setMobileDiensten] = useState(false);
  const [mobileOverOns, setMobileOverOns] = useState(false);
  const megaTimeout = useRef(null);
  const overOnsTimeout = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setOverOnsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const openMega = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const openOverOns = () => {
    clearTimeout(overOnsTimeout.current);
    setOverOnsOpen(true);
  };

  const closeOverOns = () => {
    overOnsTimeout.current = setTimeout(() => setOverOnsOpen(false), 120);
  };

  const isActive = (path) => location.pathname === path;
  const isDienstenActive = serviceItems.some(s => location.pathname === s.path);
  const isOverOnsActive = location.pathname === '/over-ons' || location.pathname === '/hiring';

  return (
    <NavWrapper>
      <AnnouncementBar>
        Aan de top van AI-ontwikkeling. Wij bouwen wat anderen nog niet durven.
        <a href="https://cloud.teamleader.eu/optivaize/forms/ai-of-automatiseringsaanvraag/" target="_blank" rel="noopener noreferrer">
          Plan gratis gesprek
        </a>
      </AnnouncementBar>

      <NavBar
        $scrolled={scrolled}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <NavContent>
          <Logo to="/">
            <Image src="/images/optivaize_logo_new.webp" alt="Optivaize" width={136} height={34} priority />
          </Logo>

          <DesktopLinks>
            <NavLink to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </NavLink>
            <DienstenBtn
              $active={isDienstenActive}
              $open={megaOpen}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              Diensten
              <ChevronDown size={14} />
            </DienstenBtn>
            <NavLink to="/cases" className={isActive('/cases') ? 'active' : ''}>
              Cases
            </NavLink>
            <OverOnsWrap onMouseEnter={openOverOns} onMouseLeave={closeOverOns}>
              <DienstenBtn
                $active={isOverOnsActive}
                $open={overOnsOpen}
              >
                Over ons
                <ChevronDown size={14} />
              </DienstenBtn>
              <AnimatePresence>
                {overOnsOpen && (
                  <OverOnsDropdown
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <OverOnsItem to="/over-ons">
                      <OverOnsIcon $color="#3B82F6"><Users size={15} /></OverOnsIcon>
                      Over ons
                    </OverOnsItem>
                    <OverOnsItem to="/hiring">
                      <OverOnsIcon $color="#10B981"><Briefcase size={15} /></OverOnsIcon>
                      Vacatures
                    </OverOnsItem>
                  </OverOnsDropdown>
                )}
              </AnimatePresence>
            </OverOnsWrap>
            <NavLink to="/contact" className={isActive('/contact') ? 'active' : ''}>
              Contact
            </NavLink>
          </DesktopLinks>

          <NavActions>
            <CTABtn as="a" href="tel:+31642698918">
              <Phone size={14} />
              Bel ons
            </CTABtn>
            <HamburgerBtn onClick={() => setMobileOpen(true)}>
              <Menu size={24} />
            </HamburgerBtn>
          </NavActions>
        </NavContent>
      </NavBar>

      {/* Mega menu */}
      <AnimatePresence>
        {megaOpen && (
          <MegaWrap
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
          >
            <MegaInner>
              <MegaLabel>
                Onze diensten
              </MegaLabel>
              <MegaGrid>
                {serviceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <ServiceTile key={item.path} to={item.path} $color={item.color}>
                      <TileIcon $color={item.color}>
                        <Icon size={18} />
                      </TileIcon>
                      <div>
                        <TileTitle>{item.label}</TileTitle>
                        <TileSub>{item.sublabel}</TileSub>
                      </div>
                    </ServiceTile>
                  );
                })}
              </MegaGrid>
            </MegaInner>
          </MegaWrap>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileOverlay
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <MobileHead>
              <Logo to="/" onClick={() => setMobileOpen(false)}>
                <Image src="/images/optivaize_logo_new.webp" alt="Optivaize" width={136} height={34} priority />
              </Logo>
              <button
                onClick={() => setMobileOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1E293B', padding: '0.75rem', minWidth: '48px', minHeight: '48px' }}
              >
                <X size={24} />
              </button>
            </MobileHead>

            <MobileItems>
              <MobileLink to="/">Home</MobileLink>

              <MobileDienstenBtn
                $open={mobileDiensten}
                onClick={() => setMobileDiensten(!mobileDiensten)}
              >
                Diensten
                <ChevronDown size={18} />
              </MobileDienstenBtn>

              <AnimatePresence>
                {mobileDiensten && (
                  <MobileDienstenList
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <MobileDienstenItem key={item.path} to={item.path}>
                          <MobileDienstenIcon $color={item.color}>
                            <Icon size={15} />
                          </MobileDienstenIcon>
                          {item.label}
                        </MobileDienstenItem>
                      );
                    })}
                  </MobileDienstenList>
                )}
              </AnimatePresence>

              <MobileLink to="/cases">Cases</MobileLink>

              <MobileDienstenBtn
                $open={mobileOverOns}
                onClick={() => setMobileOverOns(!mobileOverOns)}
              >
                Over ons
                <ChevronDown size={18} />
              </MobileDienstenBtn>

              <AnimatePresence>
                {mobileOverOns && (
                  <MobileDienstenList
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <MobileDienstenItem to="/over-ons">
                      <MobileDienstenIcon $color="#3B82F6"><Users size={15} /></MobileDienstenIcon>
                      Over ons
                    </MobileDienstenItem>
                    <MobileDienstenItem to="/hiring">
                      <MobileDienstenIcon $color="#10B981"><Briefcase size={15} /></MobileDienstenIcon>
                      Vacatures
                    </MobileDienstenItem>
                  </MobileDienstenList>
                )}
              </AnimatePresence>

              <MobileLink to="/contact">Contact</MobileLink>
            </MobileItems>

            <MobileBottom>
              <MobileCTA as="a" href="tel:+31642698918">
                Bel ons
              </MobileCTA>
            </MobileBottom>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </NavWrapper>
  );
}

export default Navigation;

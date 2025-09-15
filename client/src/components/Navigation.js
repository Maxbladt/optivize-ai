import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  z-index: 9999;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: 80px;
  }

  ${props => props.scrolled && `
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  `}
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

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 200px;
    height: auto;
    
    @media (max-width: 768px) {
      width: 150px;
    }
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  font-size: 16px;
  font-weight: 500;
  color: #1E293B;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3B82F6;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #3B82F6, #10B981);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  ${props => props.active && `
    color: #3B82F6;
    font-weight: 700;
    
    &::after {
      width: 100%;
    }
  `}
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: #1E293B;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const MobileNavLink = styled(motion.a)`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3B82F6;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 1rem;
`;

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Cases', href: '#cases' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'cases', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavContainer
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <NavContent>
          <Logo
            onClick={() => scrollToSection('#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/uploads/optivaize.png" alt="Optivize AI" />
          </Logo>

          <DesktopMenu>
            {menuItems.map((item) => (
              <NavLink
                key={item.label}
                active={activeSection === item.href.replace('#', '')}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </NavLink>
            ))}
          </DesktopMenu>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton
              onClick={() => setMobileMenuOpen(false)}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </CloseButton>

            {menuItems.map((item, index) => (
              <MobileNavLink
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;

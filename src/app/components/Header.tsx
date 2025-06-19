// src/app/components/Header.tsx

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// --- Styled Components ---

const StyledHeader = styled(motion.header)`
  position: fixed;
  top: 0; left: 0; width: 100%;
  padding: 25px 8%;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.a`
  font-size: 24px;
  font-weight: 700;
  position: relative;
  overflow: hidden;
  
  span { color: var(--color-primary); }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(31, 214, 214, 0.5), transparent);
    top: 0;
    left: -100%;
    transition: left 0.4s ease;
  }
  &:hover::before {
    left: 100%;
  }
`;

const Navbar = styled.nav`
  display: flex;
  gap: 30px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a<{ $isActive?: boolean }>`
  font-size: 18px;
  font-weight: 500;
  position: relative;
  color: ${({ $isActive }) => ($isActive ? 'var(--color-primary)' : 'var(--color-text)')};
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px;
    width: 0%;
    height: 2px;
    background: var(--color-primary);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  z-index: 1001;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;


// --- The Main Component ---

const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'technologies', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollSpy(navLinks.map(link => link.id), { offset: 150 });

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } }
  };
  
  return (
    <>
      <StyledHeader variants={headerVariants} initial="hidden" animate="visible">
        <Logo href="#home">Saiganesh<span>waran</span></Logo>
        
        <Navbar>
          {navLinks.map(link => (
            <NavLink 
              key={link.id}
              href={`#${link.id}`}
              $isActive={activeSection === link.id}
              className={activeSection === link.id ? 'active' : ''}
            >
              {link.name}
            </NavLink>
          ))}
        </Navbar>
        
        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
        </MobileMenuButton>
      </StyledHeader>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
          >
            {navLinks.map(link => (
              <motion.a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={() => setIsMenuOpen(false)}
                style={{ fontSize: '2rem', fontWeight: 600 }}
              >
                {link.name}
              </motion.a>
            ))}
          </MobileNav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
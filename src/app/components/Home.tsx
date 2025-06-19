// src/app/components/Home.tsx

'use client';
import { motion, useMotionValue } from 'framer-motion';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

// --- Styled Components ---

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8%;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #1a1a1a 0%, var(--color-background) 70%);
`;

const DotGridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, #2a2a2a 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 0;
`;

const Spotlight = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--x) var(--y),
    rgba(31, 214, 214, 0.15) 0%,
    rgba(31, 214, 214, 0.05) 20%,
    transparent 40%
  );
`;

const HeroContent = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  z-index: 2;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContainer = styled(motion.div)`
  h1 {
    font-size: clamp(3rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    
    span.primary-color {
      color: var(--color-primary);
    }
  }
  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    margin-bottom: 2rem;
    letter-spacing: 0.5px;
    
    background: linear-gradient(90deg, var(--color-primary), #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text-dark);
    line-height: 1.7;
    margin-bottom: 2.5rem;
    max-width: 550px;
    @media (max-width: 992px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const Button = styled.a`
  padding: 14px 32px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.primary { background: var(--color-primary); color: var(--color-background); }
  &.secondary { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 380px;
  height: 380px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    background: conic-gradient(from 180deg at 50% 50%, var(--color-primary), transparent, var(--color-primary));
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`;

const ImageMask = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  background: #1c1c1c;
`;

// --- The Main Component ---

const Home = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <HeroSection id="home" onMouseMove={handleMouseMove}>
      <DotGridBackground />
      <Spotlight style={{ '--x': `${mouseX.get()}px`, '--y': `${mouseY.get()}px` } as React.CSSProperties} />
      
      <HeroContent 
        initial="hidden" 
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.4 } } }}
      >
        <TextContainer variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <motion.h1
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
            initial="hidden"
            animate="visible"
          >
            {'Hi, I\'m '.split('').map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>{char}</motion.span>
            ))}
            <br />
            <span className="primary-color">
              {'Saiganeshwaran'.split('').map((char, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>{char}</motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <TypeAnimation
              sequence={[
  'An Aspiring Software Developer', 2000,
  'A Passionate Full-Stack Learner', 2000,
  'A Curious Problem Solver', 2000
]}
              wrapper="h3"
              speed={40}
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
            initial="hidden"
            animate="visible"
          >
            {'Passionate about building innovative technology solutions. Welcome to my creative space.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
                variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          
          <ButtonsContainer>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
              <Button as={motion.a} href="/final.pdf" download className="secondary" whileHover={{ scale: 1.05, y: -5 }}>Download CV</Button>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
              <Button as={motion(Link)} href="#contact" className="primary" whileHover={{ scale: 1.05, y: -5 }}>Let's Talk</Button>
            </motion.div>
          </ButtonsContainer>
        </TextContainer>

        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <ImageMask>
            <Image
              src="/Images/my photo.jpg"
              alt="Saiganeshwaran"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 380px"
              priority
            />
          </ImageMask>
        </ImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

export default Home;
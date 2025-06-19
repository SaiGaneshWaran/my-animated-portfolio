// src/app/components/About.tsx

'use client';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from './Section';
import Image from 'next/image';
import { useRef } from 'react';

// --- Styled Components ---

const AboutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 380px;
  height: 380px;
  border-radius: 50%;
  margin: 0 auto;
  
  // This is the "mask" for the reveal effect
  overflow: hidden; 
`;

const TextContainer = styled.div`
  // The heading is now part of this container
  h2 {
    text-align: left;
    margin-bottom: 2rem;
    @media (max-width: 992px) {
      text-align: center;
    }
  }

  p {
    color: var(--color-text-dark);
    line-height: 1.8;
    font-size: 1.1rem;
    max-width: 600px;
    @media (max-width: 992px) {
      margin: 0 auto;
    }
  }
`;

// --- The Main Component ---

const aboutText = "As a dedicated CS student, I am passionate about leveraging technology to solve real-world problems. My academic journey has equipped me with a strong foundation in programming, software development, and system design. I enjoy collaborating on innovative projects and am constantly seeking opportunities to apply my knowledge in impactful ways.";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate the text word by word
  const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.02 } }
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Section id="about" light>
      <AboutContainer ref={containerRef}>
        <ImageContainer>
         <motion.div
  style={{
    position: 'absolute',
    inset: 0,
  }}
  initial={{ x: '-40%' }}
  whileInView={{ x: '0%' }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
>
  <Image
    src="/Images/photo.jpg"
    alt="About Me"
    fill
    style={{ objectFit: 'cover' }}
    sizes="(max-width: 768px) 100vw, 380px"
  />
</motion.div>
        </ImageContainer>

        <TextContainer>
          <h2>About <span>Me</span></h2>
          <motion.p
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {aboutText.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </TextContainer>
      </AboutContainer>
    </Section>
  );
};

export default About;
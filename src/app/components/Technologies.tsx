'use client';
import styled, { keyframes } from 'styled-components';
import Section from './Section';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const marqueeAnimation = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
  position: relative;
  
  &:hover > div {
    animation-play-state: paused;
  }

  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    width: 150px;
    height: 100%;
    z-index: 2;
  }
  
  &:before {
    left: 0;
    background: linear-gradient(to right, 
      var(--color-background) 0%, 
      rgba(10, 10, 10, 0) 100%
    );
  }
  
  &:after {
    right: 0;
    background: linear-gradient(to left, 
      var(--color-background) 0%, 
      rgba(10, 10, 10, 0) 100%
    );
  }
`;

const MarqueeContent = styled(motion.div)`
  display: flex;
  width: fit-content;
  animation: ${marqueeAnimation} 40s linear infinite;
  &.reverse {
    animation-direction: reverse;
  }
`;

const TechIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  margin: 0 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(31, 214, 214, 0.1);
    border-color: var(--color-primary);
    transform: translateY(-5px);
  }

  i {
    font-size: 2rem;
    color: var(--color-primary);
    transition: transform 0.3s ease;
  }

  span {
    font-size: 1.1rem;
    font-weight: 500;
    background: linear-gradient(90deg, #fff, var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover i {
    transform: scale(1.2) rotate(5deg);
  }
`;

const technologies = [
  { name: 'JavaScript', icon: 'bxl-javascript' },
  { name: 'React', icon: 'bxl-react' },
  { name: 'Next.js', icon: 'bxl-nextjs' },
  { name: 'HTML5', icon: 'bxl-html5' },
  { name: 'CSS3', icon: 'bxl-css3' },
  { name: 'Java', icon: 'bxl-java' },
  { name: 'Spring Boot', icon: 'bxl-spring-boot' },
  { name: 'Node.js', icon: 'bxl-nodejs' },
  { name: 'MongoDB', icon: 'bxl-mongodb' },
  { name: 'SQL', icon: 'bxl-postgresql' },
  { name: 'Git', icon: 'bxl-git' },
  { name: 'Figma', icon: 'bxl-figma' },
  { name: 'Angular', icon: 'bxl-angular' },   // <-- Added
  { name: '.NET', icon: 'bxl-netlify' }       // <-- Added (Boxicons does not have a .NET icon, so 'bxl-netlify' is a close alternative)
];

const Technologies = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const techIconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <Section id="technologies">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Technologies I <span>Work With</span>
      </motion.h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <MarqueeWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <MarqueeContent style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
            {[...technologies, ...technologies].map((tech, i) => (
              <TechIcon
                key={`t1-${i}`}
                variants={techIconVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <i className={`bx ${tech.icon}`}></i>
                <span>{tech.name}</span>
              </TechIcon>
            ))}
          </MarqueeContent>
        </MarqueeWrapper>

        <MarqueeWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <MarqueeContent
            style={{
              animationDirection: 'reverse',
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          >
            {[...technologies, ...technologies].reverse().map((tech, i) => (
              <TechIcon
                key={`t2-${i}`}
                variants={techIconVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <i className={`bx ${tech.icon}`}></i>
                <span>{tech.name}</span>
              </TechIcon>
            ))}
          </MarqueeContent>
        </MarqueeWrapper>
      </motion.div>
    </Section>
  );
};

export default Technologies;
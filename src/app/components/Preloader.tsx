'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

const PreloaderContainer = styled(motion.div)`
  position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
  background: var(--color-background); display: flex;
  justify-content: center; align-items: center; z-index: 9999;
`;

const TypingWrapper = styled.div`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  color: var(--color-primary);
  text-align: left;
  width: 350px;
`;

const Preloader = () => (
  <PreloaderContainer exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.5 } }}>
    <TypingWrapper>
      <TypeAnimation
        sequence={[
          'Glad to have you here, lets go!', 1000,
          'Loading components...', 500,
          'Compiling assets...', 800,
          'Launching portfolio...', 500,
        ]}
        wrapper="span"
        speed={50}
        cursor={true}
      />
    </TypingWrapper>
  </PreloaderContainer>
);

export default Preloader;
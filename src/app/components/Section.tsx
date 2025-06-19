'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledSection = styled(motion.section).attrs<{ id?: string }>(props => ({
  id: props.id,
}))<{ $light?: boolean }>`
  padding: 120px 8%;
  position: relative;
  background: ${(props) => (props.$light ? 'var(--color-background-light)' : 'var(--color-background)')};
  h2 {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4rem;
    span { color: var(--color-primary); }
  }
`;

const Section = ({ children, id, light = false }: { children: React.ReactNode, id: string, light?: boolean }) => (
  <StyledSection
    id={id}
    $light={light}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </StyledSection>
);

export default Section;
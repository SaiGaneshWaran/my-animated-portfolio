'use client';
import styled, { keyframes } from 'styled-components';
import Section from './Section';
import { motion } from 'framer-motion';
import React from 'react';

const morph = keyframes`
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
`;

const ContactWrapper = styled.div`
  max-width: 800px; margin: 0 auto; padding: 3rem; text-align: center;
  position: relative; overflow: hidden; border-radius: 20px;
  background: rgba(28, 28, 28, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Blob = styled(motion.div)`
  position: absolute; top: 50%; left: 50%;
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--color-primary) 0%, rgba(31, 214, 214, 0) 70%);
  opacity: 0.15;
  animation: ${morph} 15s ease-in-out infinite;
  z-index: -1;
`;

// CHANGE 1: Define 'Form' based on the simple 'form' tag, not 'motion.form'
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled(motion.div)`
  position: relative;
  
  input, textarea {
    width: 100%;
    padding: 15px 20px;
    background: rgba(28, 28, 28, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: var(--color-text);
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 15px rgba(31, 214, 214, 0.1);
    }
    
    &::placeholder {
      color: var(--color-text-dark);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

// CHANGE 2: Define 'SubmitButton' based on the simple 'button' tag
const SubmitButton = styled.button`
  padding: 16px 32px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-background);
  margin-top: 1rem;
  transition: transform 0.3s ease;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Form submitted! (Placeholder)');
    };
    return (
        <Section id="contact" light>
            <h2>Get In <span>Touch</span></h2>
            <ContactWrapper>
                <Blob /* ... */ />
                <p style={{ marginBottom: '2rem', color: 'var(--color-text-dark)' }}>
                    Have a project in mind? I would love to hear from you.
                </p>
                {/* FIX: Use the 'as' prop pattern */}
                <Form as={motion.form} onSubmit={handleSubmit} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <InputGroup><input type="text" placeholder="Your Name" required /></InputGroup>
                    <InputGroup><input type="email" placeholder="Your Email" required /></InputGroup>
                    <InputGroup><textarea placeholder="Your Message" required /></InputGroup>
                    <SubmitButton as={motion.button} type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Send Message
                    </SubmitButton>
                </Form>
            </ContactWrapper>
        </Section>
    );
};

export default Contact;
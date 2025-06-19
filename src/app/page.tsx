'use client';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Technologies from './components/Technologies'; // Import new component
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    setInit(true);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {init && <Particles id="tsparticles" init={particlesInit} options={{ background: { color: { value: "#0A0A0A" } }, fpsLimit: 120, particles: { color: { value: "#1FD6D6" }, move: { direction: "none", enable: true, outModes: { default: "out" }, random: true, speed: 0.3, straight: false }, number: { density: { enable: true, area: 1200 }, value: 50 }, opacity: { value: { min: 0.1, max: 0.3 } }, shape: { type: "circle" }, size: { value: { min: 1, max: 2 } }, }, detectRetina: true, style: { position: 'fixed', zIndex: '-1' } }} />}
          <Header />
          <main>
            <Home />
            <About />
            <Technologies />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
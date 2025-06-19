// src/app/components/Projects.tsx

'use client';
import styled from 'styled-components';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Section from './Section';
import Image from 'next/image';
import { useRef } from 'react';

// --- Data (with keywords for highlighting) ---
const projectData = [
  { imgSrc: "/Images/Leonardo_Phoenix_09_A_sleek_modern_realestate_web_app_interfac_2.jpg", title: "Real Estate Website – AI-Integrated Smart Property Discovery", description: "...", link: "..." },
  { imgSrc: "/Images/Andrew_T_A_modern_cover_photo_for_a_Plane_Ticket_Management_cdde834e-7134-43ff-9328-4c820a1b9b15.png", title: "Plane Ticket Management – End-to-End Airline Booking Solution", description: "...", link: "..." },
  { imgSrc: "/Images/Leonardo_Phoenix_09_A_dynamic_and_energetic_digital_ticketing_0.jpg", title: "Real-Event Ticketing – Live, Scalable & Interactive Platform", description: "...", link: "..." },
  { imgSrc: "/Images/DALL·E 2024-11-02 14.48.01 - An eye-catching cover photo for an e-commerce app, designed to evoke the experience of online shopping. Include vibrant shopping icons like a shopping.webp", title: "E-Commerce Website – Full-Stack Intelligent Shopping Experience", description: "...", link: "..." },
  { imgSrc: "/Images/Leonardo_Phoenix_09_A_futuristic_construction_management_web_a_0.jpg", title: "InnovaStruct – Smart Construction Management with AI Bidding", description: "...", link: "..." },
  { imgSrc: "/Images/auc.jpg", title: "Auction Master – Interactive Player Bidding for Cricket Tournaments", description: "...", link: "..." },
  { imgSrc: "/Images/movie.jpg", title: "Movie Explorer – Personalized Film Discovery & Watchlist App", description: "...", link: "..." }
];

// --- Styled Components ---

const ProjectsContainer = styled.div`
  height: ${projectData.length * 60}vh;
  position: relative;
`;

const Card = styled(motion.div)`
  position: sticky;
  top: 150px;
  height: 350px;
  width: 700px;
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: 25px;
  border-radius: 15px;
  overflow: hidden;
  background: #2c2c2c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transform-origin: center;
`;

const CardLinkWrapper = styled.a``;

const CardImage = styled.div`
  position: absolute;
  inset: 0;
  transition: transform 0.4s ease;
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardHeader = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0) 100%);
`;

const StyledProjectTitle = styled(motion.h3)`
  color: #fff; // Corrected base color
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  // Use a different color for the highlighted span
  span {
    color: var(--color-primary);
  }
`;

// --- Child Components ---

// NEW Component to handle the two-tone title logic
const ProjectTitle = ({ title }: { title: string }) => {
  const parts = title.split('–');
  const mainTitle = parts[0];
  const subTitle = parts[1];

  return (
    <StyledProjectTitle
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {mainTitle}
      {subTitle && <span>–{subTitle}</span>}
    </StyledProjectTitle>
  );
};

interface ProjectCardProps {
  i: number;
  project: typeof projectData[0];
  scrollYProgress: MotionValue<number>;
}

const ProjectCard = ({ i, project, scrollYProgress }: ProjectCardProps) => {
  const scale = useTransform(scrollYProgress, [i / projectData.length, 1], [1, 1 - (projectData.length - i) * 0.05]);
  const opacity = useTransform(scrollYProgress, [(i - 0.5) / projectData.length, i / projectData.length], [0.5, 1]);

  return (
    <CardLinkWrapper href={project.link} target="_blank" rel="noopener noreferrer">
      <Card style={{ scale, opacity, top: `calc(150px + ${i * 25}px)` }}>
        <CardImage>
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </CardImage>
        <CardHeader>
          <ProjectTitle title={project.title} />
        </CardHeader>
      </Card>
    </CardLinkWrapper>
  );
};

// --- Main Parent Component ---

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  return (
    <Section id="projects">
      <h2 style={{ paddingBottom: '2rem' }}>
        Featured <span>Projects</span>
      </h2>
      <ProjectsContainer ref={scrollRef}>
        {projectData.map((project, i) => (
          <ProjectCard
            key={project.title}
            i={i}
            project={project}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </ProjectsContainer>
    </Section>
  );
};

export default Projects;
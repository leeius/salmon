import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/layout/Footer/Footer';
import { Navbar } from '../components/layout/Navbar/Navbar';
import { About } from '../components/sections/About/About';
import { BrandStory } from '../components/sections/BrandStory/BrandStory';
import { VisionValues } from '../components/sections/VisionValues/VisionValues';
import { Why } from '../components/sections/Why/Why';
import { BrandDetails } from '../components/sections/BrandDetails/BrandDetails';
import { Contact } from '../components/sections/Contact/Contact';
import { Hero } from '../components/sections/Hero/Hero';
import { Projects } from '../components/sections/Projects/Projects';
import { Services } from '../components/sections/Services/Services';
import { useIntersection } from '../hooks/useIntersection';

function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const { ref, isIntersecting } = useIntersection<HTMLElement>({ threshold: 0.12 });
  return (
    <section id={id} ref={ref as any} className={`fade-section ${isIntersecting ? 'in-view' : 'out-view'}`}>
      {children}
    </section>
  );
}

export function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <SectionWrapper id="home">
          <Hero
            title={
              <>
                <strong>Salmon Innovation</strong>
                That Rises Above
              </>
            }
            subtitle="Salmon Innovations Inc. is an innovation-led company delivering resilient solutions that rise above challenges and drive lasting progress."
          />
        </SectionWrapper>

        <SectionWrapper id="about">
          <About />
        </SectionWrapper>

        <SectionWrapper id="brand">
          <BrandStory />
        </SectionWrapper>

        <SectionWrapper id="vision">
          <VisionValues />
        </SectionWrapper>

        <SectionWrapper id="services">
          <Services />
        </SectionWrapper>

        <SectionWrapper id="why">
          <Why />
        </SectionWrapper>

        <SectionWrapper id="work">
          <Projects />
        </SectionWrapper>

        <SectionWrapper id="brand-details">
          <BrandDetails />
        </SectionWrapper>

        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;

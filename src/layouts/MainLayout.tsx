import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../components/layout/Footer/Footer';
import { Navbar } from '../components/layout/Navbar/Navbar';
import { About } from '../components/sections/About/About';
import { Careers } from '../components/sections/Careers/Careers';
import { Hero } from '../components/sections/Hero/Hero';
import { Projects } from '../components/sections/Projects/Projects';
import { Services } from '../components/sections/Services/Services';

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
        <section id="home">
          <Hero
            title={
              <>
                <strong>Innovation</strong>
                That Rises Above
              </>
            }
            subtitle="Salmon Innovations Inc. delivers smart, scalable, and impactful solutions that help businesses grow and lead in a digital world."
          />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="work">
          <Projects />
        </section>
        <section id="careers">
          <Careers />
        </section>
      </main>
      <Footer />
    </>
  );
}

import { About } from '../../components/sections/About/About';
import { CTA } from '../../components/sections/CTA/CTA';
import { Hero } from '../../components/sections/Hero/Hero';
import { Projects } from '../../components/sections/Projects/Projects';
import { Services } from '../../components/sections/Services/Services';
import styles from './Home.module.css';

export function Home() {
  return (
    <main className={styles.home}>
      <Hero
        title={
          <>
            <strong>Innovation</strong>
            That Rises Above
          </>
        }
        subtitle="Salmon Innovations Inc. delivers smart, scalable, and impactful solutions that help businesses grow and lead in a digital world."
      />
      <About />
      <Services />
      <Projects />
      <CTA />
    </main>
  );
}

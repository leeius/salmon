import { About } from '../../components/sections/About/About';
import { CTA } from '../../components/sections/CTA/CTA';
import { Hero } from '../../components/sections/Hero/Hero';
import { Projects } from '../../components/sections/Projects/Projects';
import { BrandStory } from '../../components/sections/BrandStory/BrandStory';
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
        subtitle="Salmon Innovations Inc. is an innovation-led company delivering resilient solutions that rise above challenges and drive lasting progress."
      />
      <About />
      <BrandStory />
      <Services />
      <Projects />
      <CTA />
    </main>
  );
}

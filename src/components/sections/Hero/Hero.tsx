import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import type { HeroProps } from './Hero.types';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
      >
        <h1>{title}</h1>
        <span className={styles.rule} />
        <p>{subtitle}</p>
        <button className={styles.cta} onClick={() => scrollTo('services')} type="button">
          Our services
          <FiArrowRight aria-hidden="true" />
        </button>
      </motion.div>
      <div className={styles.visual} aria-hidden="true">
        <motion.div
          className={styles.fishWrapper}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <img src="/fish-mark.svg" alt="Salmon Innovations" />
        </motion.div>
        <div className={styles.waves}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

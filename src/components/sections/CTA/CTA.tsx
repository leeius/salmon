import { FiArrowRight } from 'react-icons/fi';
import styles from './CTA.module.css';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CTA() {
  return (
    <section className={styles.cta}>
      <img src="/fish-mark.svg" alt="" />
      <h2>
        Let's Build
        <strong>Something Great Together</strong>
      </h2>
      <p>Have a project in mind? Let's turn your ideas into innovative solutions.</p>
      <button className={styles.ctaBtn} onClick={() => scrollTo('footer-contact')} type="button">
        Get in touch
        <FiArrowRight aria-hidden="true" />
      </button>
    </section>
  );
}

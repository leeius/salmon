import { FiArrowRight, FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer} id="footer-contact">
      <div className={styles.top}>
        <div className={styles.brand}>
          <img src="/fish-mark.svg" alt="" />
          <div>
            <strong>Salmon</strong>
            <span>Innovations Inc.</span>
            <small>Innovation That Rises Above</small>
          </div>
        </div>
        <div className={styles.pitch}>
          <h2>Let's talk about your next build.</h2>
          <p>
            Tell us what you want to improve, launch, or automate. We'll help turn it into a clear
            digital solution.
          </p>
        </div>
        <a className={styles.button} href="mailto:hello@salmoninnovations.com">
          Email us
          <FiArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className={styles.contactGrid}>
        <a href="mailto:hello@salmoninnovations.com">
          <FiMail aria-hidden="true" />
          <span>Email</span>
          <strong>hello@salmoninnovations.com</strong>
        </a>
        <a href="tel:+630000000000">
          <FiPhone aria-hidden="true" />
          <span>Phone</span>
          <strong>+63 000 000 0000</strong>
        </a>
        <div>
          <FiMapPin aria-hidden="true" />
          <span>Location</span>
          <strong>Philippines and remote delivery</strong>
        </div>
        <div>
          <FiClock aria-hidden="true" />
          <span>Response</span>
          <strong>Within 1 business day</strong>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Salmon Innovations Inc.</span>
        <span>Smart, scalable, impactful digital solutions.</span>
      </div>
    </footer>
  );
}

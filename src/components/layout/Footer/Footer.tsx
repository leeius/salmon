import {
  FiArrowRight,
  FiArrowUp,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiHeadphones,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiTrendingUp,
  FiYoutube,
} from 'react-icons/fi';
import { FaFacebookF } from 'react-icons/fa';
import styles from './Footer.module.css';

const companyLinks = [
  { label: 'About Us', target: '#about' },
  { label: 'Our Work', target: '#work' },
  { label: 'Careers', target: '#careers' },
  { label: 'Contact Us', target: '#contact' },
];

const values = [
  {
    icon: <FiShield />,
    title: 'Quality First',
    text: 'We deliver with precision and care.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Built to Scale',
    text: 'Solutions designed to grow with you.',
  },
  {
    icon: <FiHeadphones />,
    title: 'Reliable Support',
    text: "We're here when you need us.",
  },
  {
    icon: <FiClock />,
    title: 'On-Time Delivery',
    text: 'Your time is important. We deliver on it.',
  },
];

export function Footer() {
  return (
    <footer className={styles.footer} id="footer-contact">
      <div className={styles.main}>
        <div className={styles.brandBlock}>
          <div className={styles.brand}>
            <img src="/images/new_salmon.png" alt="" />
            <div>
              <strong>Salmon</strong>
              <span>Innovations Inc.</span>
              <small>Innovation That Rises Above</small>
            </div>
          </div>
          <p>
            We design and develop smart, scalable, and impactful digital solutions that help
            businesses grow and stay ahead.
          </p>
          <div className={styles.socials}>
            <a href="#home" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#home" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="#home" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#home" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>
        <nav className={styles.column} aria-label="Company links">
          <h2>Company</h2>
          {companyLinks.map((link) => (
            <a href={link.target} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.column}>
          <h2>Get in touch</h2>
          <a href="mailto:hello@salmoninnovations.com">
            <FiMail />
            hello@salmoninnovations.com
          </a>
          <a href="tel:+630000000000">
            <FiPhone />
            +63 000 000 0000
          </a>
          <span>
            <FiMapPin />
            Philippines
          </span>
          <span>
            <FiGlobe />
            Remote Worldwide
          </span>
        </div>
        <div className={styles.newsletter}>
          <h2>Stay updated</h2>
          <p>Subscribe to get insights, updates, and our latest work.</p>
          <form>
            <input aria-label="Email address" placeholder="Your email address" type="email" />
            <button aria-label="Subscribe" type="submit">
              <FiArrowRight />
            </button>
          </form>
          <small>We respect your privacy. Unsubscribe anytime.</small>
        </div>
      </div>
      <div className={styles.values}>
        {values.map((item) => (
          <article key={item.title}>
            <span>{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.bottom}>
        <p>(c) 2026 Salmon Innovations Inc.</p>
        <p>PH based - Serving clients worldwide</p>
        <p>Smart, scalable, impactful digital solutions.</p>
        <a className={styles.topButton} href="#home" aria-label="Back to top">
          <FiArrowUp />
        </a>
      </div>
    </footer>
  );
}

import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useActiveSection } from '../../../hooks/useActiveSection';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Our Work', id: 'work' },
  { label: 'Careers', id: 'careers' },
];

function scrollTo(id: string, navigate: ReturnType<typeof useNavigate>) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  navigate(`/#${id}`);
}

export function Navbar() {
  const navigate = useNavigate();
  const activeId = useActiveSection(NAV_ITEMS.map((i) => i.id));

  return (
    <header className={styles.navbar}>
      <button
        className={styles.brand}
        onClick={() => scrollTo('home', navigate)}
        aria-label="Go to top"
      >
        <img src="/fish-mark.svg" alt="" />
        <span>
          <strong>Salmon</strong>
          Innovations Inc.
          <small>Innovation That Rises Above</small>
        </span>
      </button>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            className={activeId === item.id ? styles.active : undefined}
            key={item.id}
            onClick={() => scrollTo(item.id, navigate)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className={styles.cta} onClick={() => scrollTo('footer-contact', navigate)} type="button">
        Get in touch
        <FiArrowRight aria-hidden="true" />
      </button>
    </header>
  );
}

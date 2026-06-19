import { useEffect, useState } from 'react';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useActiveSection } from '../../../hooks/useActiveSection';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about' },
  { label: 'Brand Story', id: 'brand' },
  { label: 'Services', id: 'services' },
  { label: 'Our Work', id: 'work' },
  { label: 'Contact Us', id: 'contact' },
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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const activeId = useActiveSection(NAV_ITEMS.map((i) => i.id));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleNavigate = (id: string) => {
    scrollTo(id, navigate);
    setIsOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <button
        className={styles.brand}
        onClick={() => handleNavigate('home')}
        aria-label="Go to top"
      >
        <img src="/images/logo_salmon.png" alt="Salmon Innovations Inc." />
      </button>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={styles.menuToggle}
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <button
        aria-label="Close navigation menu"
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onPointerDown={() => setIsOpen(false)}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerBrand}>
            <img src="/images/logo_salmon.png" alt="Salmon Innovations Inc." />
          </div>
          <button aria-label="Close navigation menu" onClick={() => setIsOpen(false)} type="button">
            <FiX aria-hidden="true" />
          </button>
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            className={activeId === item.id ? styles.active : undefined}
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
        <button className={styles.mobileCta} onClick={() => handleNavigate('contact')} type="button">
          Get in touch
          <FiArrowRight aria-hidden="true" />
        </button>
      </nav>
      <button className={styles.cta} onClick={() => handleNavigate('contact')} type="button">
        Get in touch
        <FiArrowRight aria-hidden="true" />
      </button>
    </header>
  );
}

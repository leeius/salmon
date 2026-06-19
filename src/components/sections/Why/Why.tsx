import { FiShield, FiZap, FiUsers, FiTrendingUp, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import styles from './Why.module.css';

const items = [
  { icon: <FiShield />, title: 'Resilient by Design', subtitle: 'Built to scale and adapt.' },
  { icon: <FiZap />, title: 'Innovation with Purpose', subtitle: 'Not trends, but impact.' },
  { icon: <FiUsers />, title: 'Client-Centered Approach', subtitle: 'Long-term partnerships.' },
  { icon: <FiTrendingUp />, title: 'Bold Thinking', subtitle: 'Solutions that rise above the ordinary.' },
];

export function Why() {
  return (
    <section id="why" className={styles.why}>
      <Container>
        <div className={styles.header}> 
          <p className={styles.eyebrow}>WHY</p>
          <h2 className={styles.title}>WHY SALMON INNOVATIONS INC.</h2>
          <p className={styles.lead}>
            We go beyond solutions—we build impact. Here’s what makes us the partner of choice
            for forward-thinking organizations.
          </p>
        </div>

        <div className={styles.inner}>
          <aside className={styles.left}>
            <div className={styles.calloutBox}>
              <div className={styles.quoteIcon}>
                <FiMessageSquare aria-hidden="true" />
              </div>
              <h3>
                We don't just follow the current—
                <br />
                we <span>rise above it.</span>
              </h3>
              <p>Salmon Innovations Inc. is your partner in building a stronger, smarter, and more resilient tomorrow.</p>
              <img src="/images/new_salmon.png" alt="Salmon leaping" className={styles.fishImage} />
            </div>
          </aside>

          <div className={styles.right}>
            <div className={styles.list}>
              {items.map((it) => (
                <div key={it.title} className={styles.item}>
                  <div className={styles.icon}>{it.icon}</div>
                  <div>
                    <h4>{it.title}</h4>
                    <p className={styles.itemSub}>{it.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.bottomCallout}>
              <span className={styles.bottomIcon}>🐟</span>
              <div className={styles.bottomText}>
                <p>We combine resilience, creativity, and commitment to deliver solutions that <strong>transform challenges into lasting success.</strong></p>
              </div>
            </div>
            <button className={styles.cta}>
              LET'S RISE TOGETHER
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Why;

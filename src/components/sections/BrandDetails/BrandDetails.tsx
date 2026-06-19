import { FiTarget, FiZap, FiUsers, FiTrendingUp, FiArrowRight, FiFlag, FiBarChart2, FiGift } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import styles from './BrandDetails.module.css';

const personalityItems = [
  { icon: <FiTarget />, title: 'Confident & Visionary', desc: 'We see beyond immediate challenges and create solutions for what comes next.' },
  { icon: <FiZap />, title: 'Innovative with Purpose', desc: 'Every idea is designed to create measurable value, not just attention.' },
  { icon: <FiUsers />, title: 'Professional & Approachable', desc: 'Expertise backed by transparency, collaboration, and trust.' },
  { icon: <FiTrendingUp />, title: 'Bold in Action', desc: 'We embrace ambitious goals and execute with precision.' },
];

const promiseItems = [
  { icon: <FiFlag />, label: 'RISE ABOVE COMPLEXITY' },
  { icon: <FiBarChart2 />, label: 'DELIVER MEANINGFUL RESULTS' },
  { icon: <FiGift />, label: 'EMPOWER SUSTAINABLE GROWTH' },
];

export function BrandDetails() {
  return (
    <section id="brand-details" className={styles.brandDetails}>
      <Container>
        {/* Brand Personality */}
        <div className={styles.personality}>
          <aside className={styles.personalityLeft}>
            <img src="/images/new_salmon.png" alt="Salmon" className={styles.personalityImage} />
            <div className={styles.personalityQuote}>
              <p className={styles.quoteText}>
                We don't just<br />
                <span>imagine the future.</span><br />
                We help build it.
              </p>
            </div>
          </aside>

          <div className={styles.personalityRight}>
            <p className={styles.eyebrow}>BRAND PERSONALITY</p>
            <h2 className={styles.title}>THE WAY WE THINK.<br /><span>THE WAY WE DELIVER.</span></h2>
            <p className={styles.lead}>
              Our personality defines how we show up, how we work, and how we build relationships that last.
            </p>

            <div className={styles.features}>
              {personalityItems.map((item) => (
                <div key={item.title} className={styles.feature}>
                  <span className={styles.icon}>{item.icon}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Promise */}
        <div className={styles.promise}>
          <div className={styles.promiseIntro}>
            <p className={styles.eyebrow}>BRAND PROMISE</p>
            <h2 className={styles.promiseTitle}>OUR PROMISE TO EVERY CLIENT</h2>
            <p className={styles.promiseLead}>Innovation that delivers value today and growth for tomorrow.</p>
          </div>

          <div className={styles.promiseFlow}>
            {promiseItems.map((item, idx) => (
              <div key={item.label}>
                <div className={styles.promiseCard}>
                  <div className={styles.promiseIcon}>{item.icon}</div>
                  <h3>{item.label}</h3>
                </div>
                {idx < promiseItems.length - 1 && (
                  <div className={styles.promiseArrow}>
                    <FiArrowRight aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* One-line Company Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryInner}>
            <div className={styles.summaryText}>
              <p className={styles.eyebrow}>ONE-LINE COMPANY SUMMARY</p>
              <h2 className={styles.summaryTitle}>INNOVATION<br />THAT RISES<br /><span>ABOVE.</span></h2>
              <p className={styles.summaryLead}>
                Salmon Innovations Inc. is an innovation-led company delivering resilient solutions that rise above challenges and drive lasting progress.
              </p>
              <button className={styles.summaryButton}>
                LET'S BUILD TOGETHER
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
            <aside className={styles.summaryImage}>
              <img src="/images/new_salmon.png" alt="Salmon" />
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BrandDetails;

import { FiActivity, FiShield, FiZap, FiFastForward } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import styles from './BrandStory.module.css';

const pillars = [
  { icon: <FiActivity />, title: 'RESILIENCE', text: 'We push forward, no matter the current.' },
  { icon: <FiShield />, title: 'INTEGRITY', text: "We do what's right, always." },
  { icon: <FiZap />, title: 'INNOVATION', text: 'We turn challenges into opportunities.' },
  { icon: <FiFastForward />, title: 'FORWARD MOMENTUM', text: 'We build solutions that last.' },
];

export function BrandStory() {
  return (
    <section id="brand" className={styles.brand}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>BRAND STORY</p>
            <h2 className={styles.title}>Innovation That Rises Above</h2>
            <p className={styles.lead}>
              In nature, the salmon represents resilience, strength, and purposeful movement
              against the current. While others follow the flow, the salmon pushes forward—driven
              by instinct and vision.
            </p>

            <p>
              At Salmon Innovations Inc., this philosophy defines our identity. We were founded on
              the belief that innovation should not merely follow trends but rise above challenges.
              Our team embraces complexity, transforms obstacles into opportunities, and builds
              solutions designed to endure.
            </p>

            <p>
              Every innovation we create reflects our commitment to excellence, integrity, and
              forward momentum.
            </p>

            <div className={styles.pillars}>
              {pillars.map((p) => (
                <div key={p.title} className={styles.pillar}>
                  <span className={styles.icon}>{p.icon}</span>
                  <h4>{p.title}</h4>
                  <p className={styles.pillarText}>{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.art} aria-hidden="true">
            <div className={styles.artInner}>
              <img src="/images/new_salmon.png" alt="Salmon leaping" />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export default BrandStory;

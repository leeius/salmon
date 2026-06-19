import { FiCpu, FiShield, FiUsers, FiTrendingUp, FiZap } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import styles from './VisionValues.module.css';

const pillars = [
  { icon: <FiCpu />, title: 'UPSTREAM THINKING', text: 'We challenge conventions and create beyond boundaries.' },
  { icon: <FiTrendingUp />, title: 'RESILIENCE', text: 'We push forward, no matter the current.' },
  { icon: <FiZap />, title: 'PURPOSEFUL INNOVATION', text: 'Every idea must solve a real problem and create value.' },
  { icon: <FiShield />, title: 'INTEGRITY', text: "We operate with transparency, accountability, and trust." },
  { icon: <FiUsers />, title: 'COLLABORATION', text: 'Progress is achieved through teamwork and shared vision.' },
];

export function VisionValues() {
  return (
    <section id="vision" className={styles.vision}>
      <Container>
        <div className={styles.gridTop}>
          <article className={styles.card}>
            <p className={styles.eyebrow}>VISION</p>
            <h3>To be a globally respected innovation company</h3>
            <p className={styles.desc}>known for building resilient solutions that shape the future of industries.</p>
          </article>

          <article className={styles.card}>
            <p className={styles.eyebrow}>MISSION</p>
            <h3>To deliver intelligent, scalable, and future-ready innovations</h3>
            <p className={styles.desc}>that help organizations overcome challenges, drive transformation, and achieve sustainable growth.</p>
          </article>
        </div>

        <div className={styles.core}>
          <p className={styles.eyebrow}>CORE VALUES</p>
          <h2 className={styles.coreTitle}>The principles that drive <span>everything we create.</span></h2>

          <div className={styles.pillars}>
            {pillars.map((p) => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.icon}>{p.icon}</div>
                <h4>{p.title}</h4>
                <p className={styles.pillarText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default VisionValues;

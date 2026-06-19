import { FiCpu, FiLayers, FiShield } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import styles from './About.module.css';

const stats = [
  { value: '5', label: 'Core innovation values' },
  { value: '360°', label: 'Transformation mindset' },
  { value: 'Future', label: 'Ready by design' },
];

const principles = [
  {
    icon: <FiCpu />,
    title: 'Upstream Thinking',
    text: 'We challenge conventions and create beyond boundaries.',
  },
  {
    icon: <FiLayers />,
    title: 'Purposeful Innovation',
    text: 'Every idea must solve a real problem and create measurable value.',
  },
  {
    icon: <FiShield />,
    title: 'Resilience',
    text: 'We build solutions that endure change and perform under pressure.',
  },
];

export function About() {
  return (
    <section id="about" className={styles.about}>
      <Container>
        <div className={styles.header}>
          <SectionTitle eyebrow="Company Overview" title="" />
          <p>
            Salmon Innovations Inc. is a forward-thinking innovation and technology company
            dedicated to creating solutions that rise above conventional limitations. Inspired by
            the salmon's instinct to swim upstream, we exist to challenge norms, overcome
            complexity, and deliver meaningful progress.
          </p>
        </div>
        <div className={styles.story}>
          <div className={styles.copy}>
            <h3>We challenge complexity with resilient, future-ready innovation.</h3>
            <p>
              We specialize in designing resilient, scalable, and purpose-driven innovations that
              empower businesses to adapt, grow, and succeed in an ever-evolving digital and
              operational landscape.
            </p>
          </div>
          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.principles}>
          {principles.map((item) => (
            <article key={item.title}>
              <span>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

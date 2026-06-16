import { FiCpu, FiLayers, FiShield } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import styles from './About.module.css';

const stats = [
  { value: '30+', label: 'Product builds supported' },
  { value: '6', label: 'Core technology services' },
  { value: '24/7', label: 'Cloud-ready mindset' },
];

const principles = [
  {
    icon: <FiCpu />,
    title: 'Smart Systems',
    text: 'We design tools that simplify operations, reporting, and everyday decision-making.',
  },
  {
    icon: <FiLayers />,
    title: 'Scalable Delivery',
    text: 'Our builds are structured to grow from first launch to long-term platform use.',
  },
  {
    icon: <FiShield />,
    title: 'Reliable Support',
    text: 'We focus on secure, maintainable solutions that teams can trust after launch.',
  },
];

export function About() {
  return (
    <section className={styles.about}>
      <Container>
        <div className={styles.header}>
          <SectionTitle eyebrow="Who We Are" title="Building Smarter Solutions for a Better Tomorrow" />
          <p>
            We are a team of passionate innovators, developers, and problem-solvers committed to
            delivering technology that creates real-world impact for growing businesses.
          </p>
        </div>
        <div className={styles.story}>
          <div className={styles.copy}>
            <h3>We turn complex business needs into clear digital products.</h3>
            <p>
              Salmon Innovations Inc. works with organizations that need practical systems, modern
              interfaces, and dependable technology partners. From planning to deployment, we help
              teams move faster without losing clarity.
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

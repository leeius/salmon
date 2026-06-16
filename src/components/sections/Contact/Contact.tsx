import { FiClock, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import { Container } from '../../layout/Container/Container';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import styles from './Contact.module.css';

const contactItems = [
  { icon: <FiMail />, label: 'Email', value: 'hello@salmoninnovations.com' },
  { icon: <FiMapPin />, label: 'Location', value: 'Philippines and remote delivery' },
  { icon: <FiClock />, label: 'Response', value: 'Usually within 1 business day' },
  { icon: <FiMessageSquare />, label: 'Project fit', value: 'Web apps, automation, cloud, consulting' },
];

export function Contact() {
  return (
    <section className={styles.contact}>
      <Container>
        <div className={styles.layout}>
          <div>
            <SectionTitle eyebrow="Contact" title="Tell us what you are building." />
            <p>
              Share your idea, workflow problem, or platform goal. We'll help shape the next step
              and recommend a practical path forward.
            </p>
            <a href="mailto:hello@salmoninnovations.com">hello@salmoninnovations.com</a>
          </div>
          <div className={styles.cards}>
            {contactItems.map((item) => (
              <article key={item.label}>
                <span>{item.icon}</span>
                <h3>{item.label}</h3>
                <p>{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

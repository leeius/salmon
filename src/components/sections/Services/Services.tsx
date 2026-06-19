import { motion } from 'framer-motion';
import { FiBarChart2, FiCloud, FiCode, FiSmartphone, FiLayers } from 'react-icons/fi';
import { services } from '../../../data/servicesData';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import { Container } from '../../layout/Container/Container';
import { ServiceCard } from './ServiceCard';
import styles from './Services.module.css';

const icons = [<FiCode />, <FiSmartphone />, <FiCloud />, <FiBarChart2 />, <FiLayers />];

export function Services() {
  return (
    <section id="services" className={styles.services}>
      <Container>
        <div className={styles.header}>
          <SectionTitle eyebrow="Our Services" title="What We Can Build for You" />
          <p>
            Salmon Innovations Inc. provides innovation-driven solutions across multiple domains,
            including but not limited to:
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              key={service.title}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              viewport={{ once: true, amount: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <ServiceCard icon={icons[index]} service={service} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

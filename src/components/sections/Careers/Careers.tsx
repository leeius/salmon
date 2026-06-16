import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import { SectionTitle } from '../../common/SectionTitle/SectionTitle';
import { Container } from '../../layout/Container/Container';
import styles from './Careers.module.css';

const openings = [
  {
    role: 'Senior Full-Stack Engineer',
    type: 'Full-time - Remote',
    dept: 'Engineering',
  },
  {
    role: 'UI/UX Designer',
    type: 'Full-time - Hybrid',
    dept: 'Design',
  },
  {
    role: 'Cloud Solutions Architect',
    type: 'Full-time - Remote',
    dept: 'Infrastructure',
  },
  {
    role: 'Project Coordinator',
    type: 'Contract - Hybrid',
    dept: 'Delivery',
  },
];

const benefits = ['Remote-friendly setup', 'Mentorship and code reviews', 'Product ownership', 'Growth-focused culture'];

export function Careers() {
  return (
    <section className={styles.careers}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <SectionTitle eyebrow="Careers" title="Build the Future With Us" />
            <p className={styles.lead}>
              We're a team of passionate builders. Join us and work on practical platforms,
              business systems, and digital products that help teams operate better.
            </p>
            <div className={styles.benefits}>
              {benefits.map((benefit) => (
                <span key={benefit}>{benefit}</span>
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {openings.map((job, index) => (
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                key={job.role}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                viewport={{ once: true, amount: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className={styles.icon}>
                  <FiBriefcase />
                </span>
                <div>
                  <h3>{job.role}</h3>
                  <span className={styles.dept}>{job.dept}</span>
                  <p>{job.type}</p>
                </div>
                <button className={styles.apply} type="button">
                  Apply now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

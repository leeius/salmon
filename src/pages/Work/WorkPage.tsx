import { FiArrowRight, FiCode, FiEdit3, FiZap } from 'react-icons/fi';
import { Footer } from '../../components/layout/Footer/Footer';
import { Navbar } from '../../components/layout/Navbar/Navbar';
import { Container } from '../../components/layout/Container/Container';
import { projects } from '../../data/projectsData';
import styles from './WorkPage.module.css';

const strengths = [
  {
    icon: <FiZap />,
    title: 'Strategic Solutions',
    text: 'Tailored digital strategies that align with your business goals.',
  },
  {
    icon: <FiEdit3 />,
    title: 'Creative Design',
    text: 'Engaging designs that create strong brand experiences.',
  },
  {
    icon: <FiCode />,
    title: 'Powerful Development',
    text: 'Scalable and reliable solutions built for long-term success.',
  },
];

const projectDetails = {
  'Master Driving School': {
    category: 'Education / Driving School',
    description:
      'A modern and user-friendly website for Master Driving School that showcases driving programs, schedules, and learning resources.',
  },
  Masterauto: {
    category: 'Automotive / Car Services',
    description:
      'A sleek and professional website for Masterauto featuring car care services such as ceramic coating, detailing, and paint protection.',
  },
  LIsensyaGo: {
    category: 'Government / Licensing Services',
    description:
      'A digital platform that simplifies the licensing process with easy booking, real-time guidance, and customer-focused service information.',
  },
};

const tags = ['Web Design', 'UI/UX', 'Development'];

export function WorkPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Container>
          <section className={styles.hero}>
            <div className={styles.intro}>
              <p>Our Work</p>
              <h1>Solutions That Make an Impact</h1>
              <span>
                We partner with businesses across industries to turn ideas into powerful digital
                solutions.
              </span>
            </div>
            <div className={styles.strengths}>
              {strengths.map((item) => (
                <article key={item.title}>
                  <span>{item.icon}</span>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.list} aria-label="Project list">
            {projects.map((project) => {
              const detail = projectDetails[project.title as keyof typeof projectDetails];

              return (
                <article className={styles.project} key={project.title}>
                  <a className={styles.imageLink} href={project.url} rel="noreferrer" target="_blank">
                    <img src={project.image} alt={`${project.title} website preview`} />
                  </a>
                  <div className={styles.content}>
                    <h2>{project.title}</h2>
                    <p className={styles.category}>{detail.category}</p>
                    <p className={styles.description}>{detail.description}</p>
                    <div className={styles.tags}>
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <a className={styles.link} href={project.url} rel="noreferrer" target="_blank">
                      View Project
                      <FiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}

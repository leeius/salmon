import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { projects } from '../../../data/projectsData';
import { Container } from '../../layout/Container/Container';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

const projectLoop = [...projects, ...projects];
const tags = ['Web Design', 'UI/UX', 'Development'];

const projectDetails = {
  'Master Driving School':
    'A modern and user-friendly website for Master Driving School that showcases driving programs, schedules, and learning resources.',
  Masterauto:
    'A sleek and professional website for Masterauto featuring car care services, customer engagement, and brand trust.',
  LIsensyaGo:
    'A digital platform that simplifies the licensing process with easy booking, real-time guidance, and customer-focused service information.',
};

export function Projects() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className={styles.projects}>
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p>Our Work</p>
            <h2>Solutions That Make an Impact</h2>
            <span>
              We partner with businesses across industries to turn ideas into powerful digital
              solutions.
            </span>
            <button
              className={styles.viewBtn}
              onClick={() => setIsExpanded((value) => !value)}
              type="button"
            >
              {isExpanded ? 'Close Work' : 'View Our Work'}
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className={styles.showcase}>
            <div className={styles.slider} aria-label="Selected work carousel">
              <div className={styles.track}>
              {projectLoop.map((project, index) => (
                <ProjectCard
                  ariaHidden={index >= projects.length}
                  key={`${project.title}-${index}`}
                  project={project}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className={styles.expanded}>
            {projects.map((project) => (
              <article className={styles.expandedCard} key={project.title}>
                <a className={styles.expandedImage} href={project.url} rel="noreferrer" target="_blank">
                  <img src={project.image} alt={`${project.title} website preview`} />
                </a>
                <div className={styles.expandedContent}>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>
                    {projectDetails[project.title as keyof typeof projectDetails] ??
                      project.description}
                  </span>
                  <div className={styles.tags}>
                    {tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                  <a href={project.url} rel="noreferrer" target="_blank">
                    Live Preview
                    <FiArrowRight aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
